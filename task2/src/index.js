import {DirWatcher} from "./dirwatcher/dirwatcher";
import {Importer} from "./importer/importer";

// let importer = new Importer();
let dirwatcher = new DirWatcher();

dirwatcher.watch("data", 10000);

// importer.importSync("data");