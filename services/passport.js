const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: [profile.id] }).then((existingUser) => {
        if (existingUser) {
          //we already have a record with the given profile ID
          done(null, existingUser)
        } else {
          //we don't have an user record with this ID
          new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user));
        }
      });

      console.log("access token ", accessToken);
      console.log("refresh token ", refreshToken);
      console.log("profile ", profile);
    }
  )
);
