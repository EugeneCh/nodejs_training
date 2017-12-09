import jwt from 'jsonwebtoken';
import {PRIVATE_KEY} from '../utils/constants';

export function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, PRIVATE_KEY, (err) => {
            if (err) {
                res.send('Wrong token');
            } else {
                next();
            }
        });
    } else {
        res.send('No token was found');
    }
}