import EventEmitter from 'events';
import {readdir, writeFile} from 'fs';
import {promisify} from 'utils';
import csv from 'csvtojson';
import mkdirp from 'mkdirp';

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
        readdir(path, (err, files) => {
            if (err) {
                console.error(err);
            }
            else if (files.length > 0) {
                mkdirp(`json`, err => {
                    if (err) {
                        console.error(err);
                    } else {
                        files.forEach(file => {
                            const csvFilePath = `${path}/${file}`;
                            // console.log(csvFilePath);
                            csv()
                                .fromFile(csvFilePath)
                                .on('json', jsonobj => {
                                    const filename = file.substr(0, file.lastIndexOf('.'));
                                    const jsonFilePath = `json/${filename}.json`;
                                    writeFile(jsonFilePath, jsonobj.toJSON(), err => {
                                        if(err) {
                                            console.error(err);
                                        }
                                    });
                                })
                        })
                    }
                });


            }
        });
    }
}