import config from '../config/config.json';

import {User, Product} from './models';

import {DirWatcher} from "./dirwatcher/dirwatcher";
import {Importer} from "./importer/importer";

console.log(`Name ${config.name} from config`);

new User();
new Product();

let importer = new Importer();
let dirwatcher = new DirWatcher();

dirwatcher.watch("data", 10000);

importer.importSync("data");