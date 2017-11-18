import {Users} from '../controllers/users.controller';

export function passportConfigLocal(passport, localStrategy) {
    passport.use(new localStrategy.Strategy({
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            const users = Users.all();
            const user = users.find(user => user.username === username);

            if (user && user.password === password) {
                done(null, user);
            } else {
                done(null, false, 'Bad username/password combination');
            }
        }
    ));
}

export function passportConfigFacebook(passport, facebookStrategy) {
    passport.use(new facebookStrategy.Strategy({
            clientID: 'FACEBOOK_APP_ID',
            clientSecret: 'FACEBOOK_APP_SECRET',
            callbackURL: 'http://localhost:8080/authenticate/facebook/callback'
        }, (accessToken, refreshToken, profile, cb) => {
            const users = Users.all();
            const user = users.find(user => user.username === profile.username);

            if (user) {
                return cb(user);
            } else {
                cb(null, false, 'Bad username/password combination');
            }
        }
    ));
}

export function passportConfigTwitter(passport, twitterStrategy) {
    passport.use(new twitterStrategy.Strategy({
            consumerKey: 'TWITTER_CONSUMER_KEY',
            consumerSecret: 'TWITTER_CONSUMER_SECRET',
            callbackURL: 'http://localhost:8080/auth/twitter/callback'
        }, (token, tokenSecret, profile, cb) => {
            const users = Users.all();
            const user = users.find(user => user.username === profile.username);

            if (user) {
                return cb(user);
            } else {
                cb(null, false, 'Bad username/password combination');
            }
        }
    ));
}

export function passportConfigGoogle(passport, googleStrategy) {
    passport.use(new googleStrategy.Strategy({
            clientID:     'GOOGLE_CLIENT_ID',
            clientSecret: 'GOOGLE_CLIENT_SECRET',
            callbackURL: 'http://yourdormain:3000/auth/google/callback',
            passReqToCallback   : true
        }, (request, accessToken, refreshToken, profile, done) => {
            const users = Users.all();
            const user = users.find(user => user.username === profile.username);

            if (user) {
                return done(user);
            } else {
                done(null, false, 'Bad username/password combination');
            }
        }
    ));
}