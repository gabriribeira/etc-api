const { List, Item, User } = require("../models");
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
    const { name, description, user_id } = req.body;

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

// Controller function to update an existing list
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
      user_id,
      household_id,
      user_id_closed,
      is_closed,
      is_finished,
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
      user_id,
      household_id,
      user_id_closed,
      is_closed,
      is_finished,
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
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
