import {Router} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import {getErrorResponse, getTokenResponse, oneFakeCity, oneFakeProduct} from '../utils/utils';
import {PRIVATE_KEY} from '../utils/constants';

import City from "../schemas/City";
import Product from "../schemas/Product";
import User from "../schemas/User";

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.get('/api/cities', (req, res) => {
    City.find({}, (err, cities) => {
        let cityMap = {};

        cities.forEach(city => {
            cityMap[city._id] = city;
        });

        res.send(cityMap);
    });
});

routes.post('/api/cities', (req, res) => {
    const city = new City(oneFakeCity());
    city.save((err, city) => {
        res.send(city);
    });
});

routes.put('/api/cities/:id', (req, res) => {
    const {newId} = req.body;
    const query = {id: req.params.id};
    const update = {id: newId};
    const options = {upsert: true, new: true};

    City.findOneAndUpdate(query, update, options, (err, city) => {
        if (err) {
            res.send(err);
        }
        res.send(city);
    });
});

routes.delete('/api/cities/:id', (req, res) => {
    City.findByIdAndRemove(req.params.id, (err, city) => {
        city ? res.json({ success: true, message: 'Deleted'}) : res.json({ success: false, message: 'Not found' });
    });
});

routes.get('/api/products', (req, res) => {
    Product.find({}, (err, products) => {
        let productMap = {};

        products.forEach(product => {
            productMap[product._id] = product;
        });

        res.send(productMap);
    });
});

routes.get('/api/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        product ? res.send(product) : res.send('Sorry, such product does not exists');
    });
});

routes.post('/api/products', (req, res) => {
    const product = new Product(oneFakeProduct());
    product.save((err, product) => {
        res.send(product);
    });
});

routes.delete('/api/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        product ? res.json({ success: true, message: 'Deleted'}) : res.json({ success: false, message: 'Not found' });
    });
});

routes.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        let userMap = {};

        users.forEach(user => {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});

routes.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        user ? res.send(user) : res.send('Sorry, such user does not exists');
    });
});

routes.delete('/api/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        user ? res.json({ success: true, message: 'Deleted'}) : res.json({ success: false, message: 'Not found' });
    });
});

routes.post('/auth', (req, res) => {
    const {username, password} = req.body;

    User.findOne({username: username}, (err, user) => {
        res.setHeader('Content-Type', 'application/json');

        if (user && user.password === password) {
            jwt.sign({username: user.username}, PRIVATE_KEY, (err, token) => {
                res.send(JSON.stringify(getTokenResponse(user.username, user.email, token)));
            });
        } else {
            res.send(JSON.stringify(getErrorResponse()));
        }
    });
});

routes.post('/authenticate', passport.authenticate('local', {session: false}), (req, res) => {
    const {username, email} = req.user;

    jwt.sign({username: username}, PRIVATE_KEY, (err, token) => {
        res.send(JSON.stringify(getTokenResponse(username, email, token)));
    });
});

export default routes;