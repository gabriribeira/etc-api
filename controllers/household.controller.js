const {
  Household,
  User,
  List,
  Expense,
  Goal,
  Tag,
  User_Household,
  Request,
  Household_Tag,
  Household_Goal,
} = require("../models");
const { Op } = require("sequelize");
const jsend = require("jsend");

// Controller function to get all households
exports.getAllHouseholds = async (req, res) => {
  try {
    const households = await Household.findAll();
    res.status(200).json(jsend.success(households));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single household by ID
exports.getHouseholdById = async (req, res) => {
  const { id } = req.params;
  try {
    const household = await Household.findByPk(id);
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }
    res.status(200).json(jsend.success(household));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single household by the authenticated session id
exports.getHouseholdAuth = async (req, res) => {
  try {
    const { currentHouseholdId } = req.session;
    if (!currentHouseholdId) {
      return res
        .status(400)
        .json(jsend.error("Household ID not found in session"));
    }
    const household = await Household.findByPk(currentHouseholdId, {
      include: [{ model: User, as: "Users" }],
    });
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }
    res.status(200).json(jsend.success(household));
  } catch (error) {
    console.error("Error fetching household:", error);
    res.status(500).json(jsend.error("Server error"));
  }
};

exports.createHousehold = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.session.passport.user;
    let img_url;
    if (req.file) {
      img_url = `${process.env.PLATFORM_BACKEND_URL}/uploads/images/${req.file.filename}`;
    }
    const household = await Household.create({
      name,
      img_url: img_url || null,
      description,
      privacy: false,
    });

    await User_Household.create({
      user_id: userId,
      household_id: household.id,
      role_id: 2, // Admin role
    });

    res.status(201).json(household);
  } catch (error) {
    console.error("Error creating household:", error);
    res.status(500).json({ message: "Error creating household", error });
  }
};

// Controller function to update an existing household
exports.updateHousehold = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  let img_url;
  if (req.file) {
    img_url = `${process.env.PLATFORM_BACKEND_URL}/uploads/images/${req.file.filename}`;
  }

  try {
    const household = await Household.findByPk(id);
    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }
    household.name = name;
    household.description = description;
    if (img_url) {
      household.img_url = img_url;
    }
    await household.save();
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: "Error updating household", error });
  }
};

exports.searchHouseholds = async (req, res) => {
  const { query } = req.query;

  try {
    const households = await Household.findAll({
      where: {
        name: { [Op.like]: `%${query}%` },
        privacy: false,
      },
    });

    res.status(200).json(households);
  } catch (error) {
    console.error("Error searching households:", error);
    res.status(500).json({ message: "Error searching households", error });
  }
};
exports.addHouseholdTags = async (req, res) => {
  const { householdId } = req.params;
  const { tags } = req.body;

  try {
    const household = await Household.findByPk(householdId);

    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }

    const promises = tags.map((tag) => {
      return Household_Tag.create({
        household_id: householdId,
        tag_id: tag,
      });
    });

    await Promise.all(promises);

    res.status(200).json({ message: "Tags added successfully" });
  } catch (error) {
    console.error("Error adding tags:", error);
    res.status(500).json({ message: "Error adding tags", error });
  }
};

// Controller function to delete a household
exports.deleteHousehold = async (req, res) => {
  const { id } = req.params;
  try {
    const household = await Household.findByPk(id);
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }
    await household.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users of a household
exports.getHouseholdUsers = async (req, res) => {
  const { householdId } = req.params;

  try {
    const users = await User.findAll({
      include: {
        model: User_Household,
        where: { household_id: householdId },
      },
      attributes: ["id", "name", "img_url"],
    });

    if (!users.length) {
      return res.status(404).json({ message: "No users found for this household" });
    }

    res.status(200).json(jsend.success(users));
  } catch (error) {
    console.error("Error fetching household users:", error);
    res.status(500).json({ message: "Error fetching household users", error });
  }
};

// Controller function to get all lists associated with a household
exports.getHouseholdLists = async (req, res) => {
  const { householdId } = req.params;
  try {
    const lists = await List.findAll({ where: { household_id: householdId } });
    res.status(200).json(jsend.success(lists));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all expenses associated with a household
exports.getHouseholdExpenses = async (req, res) => {
  const { householdId } = req.params;
  try {
    const expenses = await Expense.findAll({
      where: { household_id: householdId },
    });
    res.status(200).json(jsend.success(expenses));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all goals associated with a household
exports.getHouseholdGoals = async (req, res) => {
  const { householdId } = req.params;
  try {
    const goals = await Goal.findAll({ where: { household_id: householdId } });
    res.status(200).json(jsend.success(goals));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all tags associated with a household
exports.getHouseholdTags = async (req, res) => {
  const { householdId } = req.params;
  try {
    const household = await Household.findByPk(householdId, {
      include: [Tag],
    });
    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }
    res.status(200).json(jsend.success(household.Tags));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tags", error });
  }
};

// Controller function to get updated a household tags
exports.updateHouseholdTags = async (req, res) => {
  const { householdId } = req.params;
  const { tags } = req.body;

  try {
    const household = await Household.findByPk(householdId);
    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }

    await Household_Tag.destroy({
      where: { household_id: householdId },
    });

    const tagPromises = tags.map(tagId => {
      return Household_Tag.create({
        household_id: householdId,
        tag_id: tagId,
      });
    });

    await Promise.all(tagPromises);

    res.status(200).json({ message: "Tags updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating tags", error });
  }
};

exports.switchHousehold = async (req, res) => {
  const { householdId } = req.body;
  const userId = req.session.passport.user;

  console.log("HOUSEHOLD ID: ", householdId);
  console.log("USER ID: ", userId);

  try {
    // Correctly find the match in the User_Household table
    const match = await User_Household.findOne({
      where: { household_id: householdId, user_id: userId },
    });

    if (!match) {
      return res.status(404).json(jsend.error("Match not found"));
    }

    // Update the session with the new household ID
    req.session.currentHouseholdId = householdId;
    res.status(200).json(jsend.success({ currentHouseholdId: householdId }));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

exports.addMembersToHousehold = async (req, res) => {
  try {
    const { householdId, userIds } = req.body;

    if (!householdId || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    const promises = userIds.map((userId) => {
      return User_Household.findOrCreate({
        where: { user_id: userId, household_id: householdId },
        defaults: {
          user_id: userId,
          household_id: householdId,
          role_id: 1, // Assuming 1 is the default role for new members
        },
      });
    });

    await Promise.all(promises);

    res.status(200).json({ message: "Members added successfully." });
  } catch (error) {
    console.error("Error adding members:", error);
    res.status(500).json({ message: "Error adding members", error });
  }
};

exports.getRequestsForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains the authenticated user

    // Find requests where the user is invited
    const invitedRequests = await Request.findAll({
      where: {
        user_id: userId,
        type: 'invite',
        status: 'pending'
      },
      include: [
        { model: User, as: 'user' },
        { model: Household, as: 'household' },
      ],
    });

    // Find households where the user is an administrator
    const adminHouseholds = await User_Household.findAll({
      where: {
        user_id: userId,
        role_id: 1 // Assuming role_id 1 means administrator
      },
    });

    const adminHouseholdIds = adminHouseholds.map(h => h.household_id);

    // Find requests where the user is an admin and the type is join
    const adminRequests = await Request.findAll({
      where: {
        household_id: adminHouseholdIds,
        type: 'join',
        status: 'pending'
      },
      include: [
        { model: User, as: 'user' },
        { model: Household, as: 'household' },
      ],
    });

    const allRequests = [...invitedRequests, ...adminRequests];

    res.status(200).json(jsend.success(allRequests));
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const { householdId, userId, type } = req.body;

    if (!householdId || !userId || !type) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    const existingRequest = await Request.findOne({
      where: {
        household_id: householdId,
        user_id: userId,
        type,
        status: "pending",
      },
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A pending request already exists." });
    }

    const request = await Request.create({
      household_id: householdId,
      user_id: userId,
      type,
      status: "pending",
    });

    res.status(201).json({ message: "Request created successfully.", request });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Error creating request", error });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    if (!requestId || !status) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    const request = await Request.findByPk(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (status === "accepted") {
      await User_Household.create({
        user_id: request.user_id,
        household_id: request.household_id,
        role_id: 1,
      });
    } else if (status === "rejected") {
      await Request.destroy({
        where: { id: requestId },
      });
    } else {
      return res.status(400).json({ message: "Invalid status provided." });
    }

    request.status = status;
    await request.save();

    res
      .status(200)
      .json({ message: "Request status updated successfully.", request });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Error updating request status", error });
  }
};