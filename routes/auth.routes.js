const express = require("express");
const bcrypt = require("bcrypt");
const { User, Household, User_Household } = require("../models");
const passport = require("../config/passport");
const router = express.Router();

async function createPrivateHousehold(user) {
  const household = await Household.create({
    name: `${user.name ? user.name : user.email.split("@")[0]}'s Household`,
    privacy: true,
  });

  await User_Household.create({
    user_id: user.id,
    household_id: household.id,
    role_id: 2,
  });

  return household;
}

async function getOrCreatePrivateHousehold(user) {
  const userHousehold = await User_Household.findOne({
    where: { user_id: user.id },
    include: {
      model: Household,
      where: { privacy: true },
    },
  });

  if (!userHousehold) {
    const household = await createPrivateHousehold(user);
    return { household, roleId: 2 };
  }

  return { household: userHousehold.Household, roleId: userHousehold.role_id };
}

router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      if (!user) {
        console.warn("Login failed:", info.message);
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, async (err) => {
        if (err) {
          console.error("Login session error:", err);
          return next(err);
        }
        const { household, roleId } = await getOrCreatePrivateHousehold(user);
        req.session.currentHouseholdId = household.dataValues.id;
        req.session.roleId = roleId;
        const userData = await User.findByPk(user.id, {
          attributes: { exclude: ['password'] },
        });
        res.status(200).json({
          user: userData,
          currentHouseholdId: req.session.currentHouseholdId,
          roleId: req.session.roleId,
        });
      });
    })(req, res, next);
  }
);

router.post("/register", (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    try {
      const user = await User.create({
        email,
        password: hashedPassword,
      });

      const household = await createPrivateHousehold(user);

      req.logIn(user, async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error logging in after registration" });
        }
        req.session.currentHouseholdId = household.id;
        req.session.roleId = 2;
        const userData = await User.findByPk(user.id, {
          attributes: { exclude: ['password'] },
        });
        return res.status(201).json({
          user: userData,
          currentHouseholdId: req.session.currentHouseholdId,
          roleId: req.session.roleId,
        });
      });
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.FAILURE_REDIRECT_URL }),
  async (req, res) => {
    const user = req.user;

    if (user) {
      const { household, roleId } = await getOrCreatePrivateHousehold(user);
      console.log("HOUSEHOLD: ", household.dataValues);
      req.session.currentHouseholdId = household.dataValues.id;
      req.session.roleId = roleId;
    }
    res.redirect(process.env.SUCCESS_REDIRECT_URL);
  }
);

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: process.env.FAILURE_REDIRECT_URL }),
  async (req, res) => {
    const user = req.user;

    if (user) {
      const { household, roleId } = await getOrCreatePrivateHousehold(user);
      req.session.currentHouseholdId = household.dataValues.id;
      req.session.roleId = roleId;
    }
    res.redirect(process.env.SUCCESS_REDIRECT_URL);
  }
);

router.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      authenticated: true,
      user: req.user,
      currentHouseholdId: req.session.currentHouseholdId || null,
      roleId: req.session.roleId || null,
    });
  } else {
    res.status(200).json({ authenticated: false, user: null });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FAILURE_REDIRECT_URL);
});

module.exports = router;