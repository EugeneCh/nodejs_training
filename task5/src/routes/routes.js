import {Router} from 'express';

import {Products} from "../controllers/products.controller";
import {Users} from "../controllers/users.controller";
import {getErrorResponse, getTokenResponse} from "../utils/utils";

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.get('/api/products', (req, res) => {
    const products = Products.all();
    res.json(products);
});

routes.get('/api/products/:id', (req, res) => {
    const product = Products.getProductById(+req.params.id);
    res.json(product);
});

routes.get('/api/products/:id/reviews', (req, res) => {
    const review = Products.getReviewsById(+req.params.id);
    res.json(review);
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
        res.send(JSON.stringify(getTokenResponse(user.username, user.email)));
    } else {
        res.send(JSON.stringify(getErrorResponse()));
    }

});

export default routes;