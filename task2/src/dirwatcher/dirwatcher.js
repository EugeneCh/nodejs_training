import EventEmitter from 'events';
import {stat} from 'fs';

export class DirWatcher extends EventEmitter {
    // Watch path with delay and emit event
    watch(path, delay) {
        let lastModifiedDate = 0;

        setInterval(() => {
            stat(path, (err, stats) => {
                if (lastModifiedDate !== stats.mtimeMs) {
                    lastModifiedDate = stats.mtimeMs;

                    console.log(path);
                    this.emit('dirwatcher:changed', path);
                }
            });
        }, delay);
    }
}