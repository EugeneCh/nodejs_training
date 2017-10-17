import minimist from 'minimist';
import colors from 'colors';

import {createReadStream, createWriteStream, readdir, readFile, writeFile} from 'fs';
import through2 from 'through2';
import csv from 'csvtojson';
import split2 from 'split2';
import mkdirp from 'mkdirp';
import async from 'async';
import request from 'request';

const BASE_PATH = '../../data/';

function  inputOutput(filepath) {
    let path = BASE_PATH + filepath;
    createReadStream(path)
        .pipe(process.stdout);
}

function transformFile(filePath) {
    let path = BASE_PATH + filePath;
    let newPath = `../../json/${filePath.substr(0, filePath.lastIndexOf('.'))}.json`;
    let readStream = createReadStream(path);
    let writeStream;

    console.log(`Creating directory ${colors.green("json")} for new files`);

    mkdirp(`../../json`, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Reading file ${colors.green(filePath)}`);

            writeStream = createWriteStream(newPath);
            readStream
                .pipe(through2({objectMode: true}, function (chunk, encoding, callback) {
                    csv()
                        .fromString(chunk.toString())
                        .on('json', json => {
                            this.push(JSON.stringify(json));
                        });
                    callback();
                }))
                .pipe(writeStream)
                .on('finish', () => {
                    console.log(`File ${colors.green(filePath.substr(0, filePath.lastIndexOf('.')) + '.json')} was created`);
                });
        }
    });
}

function transform() {
    let readStream = through2({ objectMode: true }, function(chunk, enc, callback) {
        let string = chunk.toString();
        let result = string.replace(/\n/, '').toUpperCase().split(/[ \t]/);

        this.push(result);
        callback()
    });

    readStream.on('data', data => {
        process.stdout.write(data.join(' '));
        process.stdout.write('\n');
    });

    process.stdin
        .pipe(split2())
        .pipe(readStream);
}

function printHelpMessage() {
    const message = `\n Help for ${colors.green('streams.js')} module: \n
        flag ${colors.green('--action (-a)')} can be set to ${colors.red('io')}, ${colors.red('transform')} or ${colors.red('transform-file')} \n
        you can path there ${colors.green('--flag (-f)')} as an optional parameter with file path`;
    console.log(message);
}

function cssBundler(path) {
    const CSS_EXTERNAL = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
    const dirPath = '../../' + path;
    const bundlePath = dirPath + '/bundle.css';
    readdir('../../' + path, (err, files) => {
        if (err) {
            console.error(err);
        }
        files = files.map(file => `${dirPath}/${file}`);

        async.map(files, readFile, (err, results) => {
            if (err) {
                console.error(err);
            }
            request(CSS_EXTERNAL, (error, response, body) => {
                if (error) {
                    return console.error(error);
                }
                results.push(body);

                writeFile(bundlePath, results, err => {
                    if(err) {
                        console.error(err);
                    }

                    console.log(`File ${colors.green('bundle.css')} has been created!`);
                });
            });
        });
    });
}


const args = minimist(process.argv.slice(2), {
    boolean: true,
    alias: {'help': 'h', 'action': 'a', 'file': 'f', 'path': 'p'},
    stopEarly: true,
    unknown: (arg) => {
        if (arg !== 'help' && arg !== 'h' && arg !== 'abc') {
            console.error(colors.red('Unknown option: ', arg));
            return false;
        }
    }
});
const keys = Object.keys(args);

if (keys.length <= 1) {
    console.log(`Please call this module only with some arguments. Check ${colors.green('--help')} flag for help.`);
} else {
    if (keys[1] === 'help' || keys[1] === 'h') {
        printHelpMessage();
    } else if (keys[1] === 'a' || keys === 'action') {
        if (args.action === 'io') {
            inputOutput(args.file);
        } else if (args.action === 'transform-file') {
            transformFile(args.file);
        } else if (args.action === 'transform') {
            transform();
        } else if (args.action === 'bundle-css') {
            cssBundler(args.path);
        }
    }
}