import config from '../config/config.json';

import {User, Product} from './models';

console.log(`Name ${config.name} from config`);

new User();
new Product();