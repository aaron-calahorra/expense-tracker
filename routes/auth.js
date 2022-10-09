const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '635863895667-niludofb5vl2dguol30uik45s8tiv96f.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
});

passport.deserializeUser(function(user, done) {
    done(null, user)
});
