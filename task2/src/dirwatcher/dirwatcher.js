import EventEmitter from 'events';
import {stat} from 'fs';
import colors from 'colors';

import {Importer} from "../importer/importer";

export class DirWatcher extends EventEmitter {

    // Watch path with delay and emit event
    watch(path, delay) {
        let lastModifiedDate = 0;

        setInterval(() => {
            stat(path, (err, stats) => {
                if (lastModifiedDate !== stats.mtimeMs) {
                    lastModifiedDate = stats.mtimeMs;

                    console.log(`Directory ${colors.green(path)} changed. Emitting event...`);
                    this.emit('dirwatcher:changed', path);
                }
            });
        }, delay);

        this.on('dirwatcher:changed', path => {
            console.log(`Event for directory ${colors.green(path)} was caught`);

            Importer.importSync(path);
        });
    }
}