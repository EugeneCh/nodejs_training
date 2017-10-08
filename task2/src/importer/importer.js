import EventEmitter from 'events';
import {readdir, writeFile} from 'fs';
import csv from 'csvtojson';
import mkdirp from 'mkdirp';
import colors from 'colors';

export class Importer extends EventEmitter {
    // should return a promise
    static importAsync(path) {

    }

    static importSync(path) {
        console.log(`Reading directory ${colors.green(path)}`);

        readdir(path, (err, files) => {
            if (err) {
                console.error(err);
            }
            else if (files.length > 0) {
                console.log(`Creating directory ${colors.green("json")} for new files`);

                mkdirp(`json`, err => {
                    if (err) {
                        console.error(err);
                    } else {
                        files.forEach(file => {
                            const csvFilePath = `${path}/${file}`;
                            const filename = file.substr(0, file.lastIndexOf('.'));
                            const jsonFilePath = `json/${filename}.json`;
                            csv()
                                .fromFile(csvFilePath)
                                .on('end_parsed', jsonArrayObj => {
                                    writeFile(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2), 'utf-8', err => {
                                        if(err) {
                                            console.error(err);
                                        }

                                        console.log(`File ${colors.green(filename)} was converted and saved!`);
                                    });
                                });
                        })
                    }
                });
            }
        });
    }
}