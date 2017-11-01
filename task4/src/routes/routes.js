import {Router} from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.get('/api/products', (req, res) => {
    res.json({product: 'all products'});
});

routes.get('/api/products/:id', (req, res) => {
    res.json({product: 'specific product'});
});

routes.get('/api/products/:id/reviews', (req, res) => {
    res.json({review: 'reviews for product'});
});

routes.post('/api/products', (req, res) => {
    res.json({ok: true});
});

routes.get('/api/users', (req, res) => {
    res.json({users: 'all users'});
});

export default routes;