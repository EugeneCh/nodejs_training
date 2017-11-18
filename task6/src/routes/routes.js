import {Router} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import {getErrorResponse, getTokenResponse} from '../utils/utils';
import {checkToken} from '../middlewares/check-token';
import {PRIVATE_KEY} from '../utils/constants';

const User = require('./../models').User;
const Product = require('./../models').Product;
const Review = require('./../models').Review;

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.get('/api/products', checkToken, (req, res) => {
    Product.all()
        .then(products => res.send(JSON.stringify(products)))
        .error(error => res.send(error));
});

routes.get('/api/products/:id', checkToken, (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.send(JSON.stringify(product)))
        .error(error => res.send(error));
});

// routes.get('/api/products/:id/reviews', checkToken, (req, res) => {
//     const review = Products.getReviewsById(+req.params.id);
//     res.json(review);
// });

routes.post('/api/products', checkToken, (req, res) => {
    Product.create({
        name: 'New Product',
        value: '1',
        review: ['review']
    })
        .then(product => res.send(JSON.stringify(product)))
        .error(error => res.send(error));
});

routes.get('/api/users', checkToken, (req, res) => {
    User.all()
        .then(users => res.send(JSON.stringify(users)))
        .error(error => res.send(error));
});

routes.post('/auth', (req, res) => {
    const {username, password} = req.body;
    User.findOne({ where: {username: username} })
        .then(user => {
            res.setHeader('Content-Type', 'application/json');

            if (user && user.password === password) {
                jwt.sign({username: user.username}, PRIVATE_KEY, (err, token) => {
                    res.send(JSON.stringify(getTokenResponse(user.username, user.email, token)));
                });
            } else {
                res.send(JSON.stringify(getErrorResponse()));
            }
        })
        .error(error => res.send(error));
});

// routes.post('/authenticate', passport.authenticate('local', {session: false}), (req, res) => {
//     const {username, email} = req.user;
//
//     jwt.sign({username: username}, PRIVATE_KEY, (err, token) => {
//         res.send(JSON.stringify(getTokenResponse(username, email, token)));
//     });
// });

export default routes;