import {DirWatcher} from "./dirwatcher/dirwatcher";

let dirwatcher = new DirWatcher();
dirwatcher.watch("data", 3000);