const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '635863895667-j9l6fc9e1ffrh99kemqk65aaeo2ipn4h.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://expense-tracker-aaron-calahorra.onrender.com/google/callback",
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
