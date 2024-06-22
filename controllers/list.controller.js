const { List, Item, User, User_List } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");
const OpenAI = require("openai");

// async function main2() {
//   const transcription = await openai.audio.transcriptions.create({
//     file: fs.createReadStream("./uploads/audio/audio.mp3"),
//     model: "whisper-1",
//   });

//   console.log(transcription.text);
// }

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

// Controller function to get all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.findAll();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all lists from household
exports.getAllListsFromHousehold = async (req, res) => {
  try {
    const { currentHouseholdId } = req.session;
    const lists = await List.findAll({
      where: { household_id: currentHouseholdId },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "name", "email"],
        },
        {
          model: Item,
          as: "Items",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single list by ID
exports.getListById = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new list
exports.createList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentHouseholdId } = req.session;

    // Extracting data from the request body
    const { name, description, user_id, userIds } = req.body;

    // Creating a new list
    const newList = await List.create(
      {
        name,
        description,
        user_id,
        household_id: currentHouseholdId,
      },
      {
        // Pass authenticated user ID as an option
        req,
      }
    );

    let usersToAdd = userIds;

    if (!usersToAdd) {
      const householdUsers = await User.findAll({ where: { household_id: householdId } });
      usersToAdd = householdUsers.map(user => user.id);
    }

    const userListPromises = usersToAdd.map(userId => User_List.create({ user_id: userId, list_id: newList.id }));
    await Promise.all(userListPromises);

    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

exports.createListFromRecipe = async (req, res) => {
  try {
    const { currentHouseholdId } = req.session;
    const { name, description, user_id } = req.body;

    async function recipe(userRecipe) {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              'You are an assistant designed to output just the necessary items for a given recipe with the dietary restrictions for each one and the Portuguese market value for the respective products in JSON providing the. Always follow this structure:{\n "recipe": "Recipe Name",\n "instructions": "Recipe Instructions",\n "items": [\n    {\n      "name": "Item Name",\n"quantity": "Quantity",\n"unit": "Unit",\n"dietary_restrictions": ["Restriction1", "Restriction2"],\n"market_value": "Value"\n},\n ...\n  ]\n. Now, based on the provided recipe, output the shopping list in the same JSON structure}',
          },
          {
            role: "user",
            content: userRecipe,
          },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" }, // Adjust as necessary
      });

      return JSON.parse(completion.choices[0].message.content);
    }

    const recipeData = await recipe(description);

    if (!recipeData || !recipeData.items) {
      throw new Error("Invalid recipe data returned from AI");
    }

    const newList = await List.create({
      name,
      description: recipeData.instructions,
      user_id,
      household_id: currentHouseholdId,
    });

    await Promise.all(
      recipeData.items.map(async (item) => {
        await Item.create({
          name: item.name,
          category_id: 1,
          amount: item.quantity,
          unit: item.unit,
          // dietary_restrictions: item.dietary_restrictions.join(', '), // Adjust if you want to store as a comma-separated string
          value: item.market_value,
          list_id: newList.id,
          is_suggestion: false,
          is_expense: false,
        });
      })
    );

    res.status(201).json({ success: true, data: newList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createListFromEvent = async (req, res) => {
  try {
    const { currentHouseholdId } = req.session;
    const { name, description, user_id } = req.body;

    async function event(userEvent) {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              'You are an assistant designed to output just the necessary items for a given event with the dietary restrictions for each one and the Portuguese market value for the respective products in JSON. Always follow this structure:{\n "event": "Event Name",\n "description": "Description of the event",\n "items": [\n {\n "name": "Item Name",\n"quantity": "Quantity",\n"unit": "Unit",\n"dietary_restrictions": ["Restriction1", "Restriction2"],\n"market_value": "Value"\n},\n ...\n  ]\n. Now, based on the provided recipe, output the shopping list in the same JSON structure}',
          },
          {
            role: "user",
            content: userEvent,
          },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      return JSON.parse(completion.choices[0].message.content);
    }

    const eventData = await event(description);

    if (!eventData || !eventData.items) {
      throw new Error("Invalid event data returned from AI");
    }

    const newList = await List.create({
      name,
      description: eventData.instructions,
      user_id,
      household_id: currentHouseholdId,
    });

    await Promise.all(
      eventData.items.map(async (item) => {
        await Item.create({
          name: item.name,
          category_id: 1,
          amount: item.quantity,
          unit: item.unit,
          // dietary_restrictions: item.dietary_restrictions.join(', '), // Adjust if you want to store as a comma-separated string
          value: item.market_value,
          list_id: newList.id,
          is_suggestion: false,
          is_expense: false,
        });
      })
    );

    res.status(201).json({ success: true, data: newList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    // Extracting data from the request body
    const { id } = req.params;
    const {
      name,
      description,
    } = req.body;

    // Finding the list by its ID
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    // Updating the list
    await list.update({
      name,
      description,
    });
    res.status(200).json(jsend.success(list));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

exports.lockList = async (req, res) => {
  try {
    const listId = req.params.id;
    const userId = req.session.passport.user;
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    list.is_closed = true;
    list.user_id_closed = userId;
    await list.save();

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.unlockList = async (req, res) => {
  try {
    const listId = req.params.id;
    const userId = req.session.passport.user;
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    if (list.user_id_closed !== userId) {
      return res
        .status(403)
        .json({ error: "Only the user who locked the list can unlock it" });
    }

    list.is_closed = false;
    list.user_id_closed = null;
    await list.save();

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.finishList = async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await List.findOne(
      { where: { id: listId, is_finished: false } }
    );

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    list.is_finished = true;
    await list.save();

    res.status(200).json(jsend.success(list));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.unfinishList = async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const listId = req.params.id;
    const list = await List.findOne(
      { where: { id: listId, is_finished: true } }
    );

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    list.is_finished = false;
    list.estimated_value = null;
    list.user_id_closed = null;
    list.is_closed = false;
    list.user_id = userId;

    await list.save();

    res.status(200).json(jsend.success(list));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to estimate the value of a list
exports.estimateListValue = async (req, res) => {
  const { listId } = req.params;

  try {
    const items = await Item.findAll({ where: { list_id: listId } });

    if (!items.length) {
      return res.status(404).json(jsend.error("No items found for the list"));
    }

    let totalValue = 0;
    const nonSuggestionItems = [];

    for (const item of items) {
      if (item.is_suggestion) {
        totalValue += item.value * item.amount;
      } else {
        nonSuggestionItems.push(item);
      }
    }

    console.log("Non-suggestion items:", nonSuggestionItems);

    if (nonSuggestionItems.length > 0) {
      const itemDescriptions = nonSuggestionItems
        .map(
          (item) =>
            `${item.amount || 1} ${item.unit || 'unit'} ${item.name}`
        )
        .join(", ");
      console.log("Item descriptions to be sent to OpenAI:", itemDescriptions);

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              'You are an assistant designed to estimate the portuguese market value of given shopping items. Always try to pick the cheapest products on the portuguese market. Always return the response in this JSON format: { "totalValue": Value, "items": [ { "name": "Item Name", "estimated_value": Value }, ... ] }',
          },
          {
            role: "user",
            content: `Estimate the market value of these items: ${itemDescriptions}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log("OpenAI completion response:", completion);

      const responseContent = completion.choices[0].message.content;
      console.log("Response content from OpenAI:", responseContent);

      // Ensure the response content is a valid JSON string
      let estimatedItems;
      try {
        estimatedItems = JSON.parse(responseContent);
      } catch (jsonError) {
        console.error("Error parsing JSON response from OpenAI:", jsonError);
        return res
          .status(500)
          .json(jsend.error("Invalid response format from OpenAI"));
      }

      console.log("Estimated items from OpenAI:", estimatedItems);

      for (const estimatedItem of estimatedItems.items) {
        const item = nonSuggestionItems.find(
          (i) => i.name === estimatedItem.name
        );
        if (item) {
          const estimatedValue = parseFloat(estimatedItem.estimated_value);
          if (!isNaN(estimatedValue)) {
            totalValue += estimatedValue * (item.amount || 1);
          } else {
            console.warn(
              `Skipping item with non-numeric estimated value: ${estimatedItem.name}`
            );
          }
        }
      }
    }

    const list = await List.findByPk(listId);
    list.estimated_value = totalValue;
    await list.save();

    res.status(200).json(jsend.success({ estimatedValue: totalValue }));
  } catch (error) {
    console.error("Error in estimateListValue:", error);
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to delete a list
exports.deleteList = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    await list.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all items in a list
exports.getListItems = async (req, res) => {
  const { listId } = req.params;
  try {
    const items = await Item.findAll({ where: { list_id: listId } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users who have access to a list
exports.getListUsers = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await List.findByPk(listId, { include: User });
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    const users = list.Users;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
