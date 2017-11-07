import {Router} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import localStrategy from 'passport-local';

import {Products} from '../controllers/products.controller';
import {Users} from '../controllers/users.controller';
import {getErrorResponse, getTokenResponse} from '../utils/utils';
import {checkToken} from '../middlewares/check-token';
import {PRIVATE_KEY} from '../utils/constants';

const routes = Router();

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

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.get('/api/products', checkToken, (req, res) => {
    const products = Products.all();
    res.json(products);
});

routes.get('/api/products/:id', checkToken, (req, res) => {
    const product = Products.getProductById(+req.params.id);
    res.json(product);
});

routes.get('/api/products/:id/reviews', checkToken, (req, res) => {
    const review = Products.getReviewsById(+req.params.id);
    res.json(review);
});

routes.post('/api/products', checkToken, (req, res) => {
    let newProduct = Products.addNewProduct();
    res.json(newProduct);
});

routes.get('/api/users', checkToken, (req, res) => {
    const users = Users.all();
    res.json(users);
});

routes.post('/auth', (req, res) => {
    const {username, password} = req.body;
    const users = Users.all();
    const user = users.find(user => user.username === username);

    res.setHeader('Content-Type', 'application/json');

    if (user && user.password === password) {
        jwt.sign({username: user.username}, PRIVATE_KEY, (err, token) => {
            res.send(JSON.stringify(getTokenResponse(user.username, user.email, token)));
        });
    } else {
        res.send(JSON.stringify(getErrorResponse()));
    }

});

routes.post('/authenticate', passport.authenticate('local', {session: false}), (req, res) => {
    const {username, email} = req.user;

    jwt.sign({username: username}, PRIVATE_KEY, (err, token) => {
        res.send(JSON.stringify(getTokenResponse(username, email, token)));
    });
});

export default routes;