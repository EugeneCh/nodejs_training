import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import localStrategy from 'passport-local';
import facebookStrategy from 'passport-facebook';
import twitterStrategy from 'passport-twitter';
import googleStrategy from 'passport-google-oauth20';

import mongoose from 'mongoose';

import routes from './routes/routes';
import {passportConfigLocal, passportConfigFacebook, passportConfigTwitter, passportConfigGoogle} from './config/passport';
import {generateFakeUsers, generateFakeProducts, generateFakeCities} from './utils/utils';

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/local', {
    useMongoClient: true
});

generateFakeCities(5);
generateFakeUsers(5);
generateFakeProducts(5);

passportConfigLocal(passport, localStrategy);
passportConfigFacebook(passport, facebookStrategy);
passportConfigTwitter(passport, twitterStrategy);
passportConfigGoogle(passport, googleStrategy);

export default app;