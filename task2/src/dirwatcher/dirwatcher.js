import EventEmitter from 'events';
import {stat} from 'fs';

import {Importer} from "../importer/importer";

export class DirWatcher extends EventEmitter {
    // Watch path with delay and emit event
    watch(path, delay) {
        let lastModifiedDate = 0;

        setInterval(() => {
            stat(path, (err, stats) => {
                if (lastModifiedDate !== stats.mtimeMs) {
                    lastModifiedDate = stats.mtimeMs;

                    console.log(`Directory ${path} changed. Emitting event...`);
                    this.emit('dirwatcher:changed', path);
                }
            });
        }, delay);

        this.on('dirwatcher:changed', path => {
            console.log(path);
            console.log(`Event for directory ${path} was caught`);

            Importer.importSync(path);
        });
    }
}