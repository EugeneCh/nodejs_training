import {Router} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import {Products} from '../controllers/products.controller';
import {Users} from '../controllers/users.controller';
import {getErrorResponse, getTokenResponse} from '../utils/utils';
import {PRIVATE_KEY} from '../utils/constants';

import City from "../schemas/City";
import Product from "../schemas/Product";
import User from "../schemas/User";

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.get('/cities', (req, res) => {
    City.find({}, function(err, cities) {
        let cityMap = {};

        cities.forEach(function(city) {
            cityMap[city._id] = city;
        });

        res.send(cityMap);
    });
});

routes.get('/api/products', (req, res) => {
    const products = Products.all();
    res.json(products);
});

routes.get('/api/products/:id', (req, res) => {
    const product = Products.getProductById(+req.params.id);
    res.json(product);
});

routes.post('/api/products', (req, res) => {
    let newProduct = Products.addNewProduct();
    res.json(newProduct);
});

routes.get('/api/users', (req, res) => {
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