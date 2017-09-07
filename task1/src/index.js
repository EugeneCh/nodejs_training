import config from '../config/config.json';

import User from './models/user';
import Product from './models/product';

console.log(`Name ${config.name} from config`);

new User();
new Product();