const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models");

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findByPk(id, {
    attributes: { exclude: ['password'] },
  })
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const [user, created] = await db.User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            email: profile.emails[0].value,
            name: profile.displayName,
            img_url: profile.photos[0].value,
          },
        });

        if (created) {
          await createPrivateHousehold(user);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [user, created] = await db.User.findOrCreate({
          where: { facebookId: profile.id },
          defaults: {
            email: profile.emails ? profile.emails[0].value : null,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
          },
        });

        if (created) {
          await createPrivateHousehold(user);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

async function createPrivateHousehold(user) {
  const household = await db.Household.create({
    name: `${user.name}'s Household`,
    privacy: true,
  });
  await db.User_Household.create({
    user_id: user.id,
    household_id: household.id,
    role_id: 2,
  });

  return household;
}

module.exports = passport;