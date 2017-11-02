import {Router} from 'express';

import {Products} from "../controllers/products.controller";
import {Users} from "../controllers/users.controller";

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.get('/api/products', (req, res) => {
    const products = Products.all();
    res.json(products);
});

routes.get('/api/products/:id', (req, res) => {
    const product = Products.getProductById(req.params.id);
    res.json(product);
});

routes.get('/api/products/:id/reviews', (req, res) => {
    const review = Products.getReviewsById(req.params.id);
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

export default routes;