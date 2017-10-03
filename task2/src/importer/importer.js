import EventEmitter from 'events';

export class Importer extends EventEmitter {
    constructor() {
        super();
        this.on('dirwatcher:changed', path => {
            console.log(path);
        });
    }

    importAsync(path) {

    }

    importSync(path) {

    }
}