import minimist from 'minimist';
import colors from 'colors';

import {createReadStream, createWriteStream} from 'fs';
import through2 from 'through2';
import csvParse from 'csv-parse';
import split2 from 'split2';
import mkdirp from 'mkdirp';

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
    let writeStream = createWriteStream(newPath);

    console.log(`Creating directory ${colors.green("json")} for new files`);

    mkdirp(`../../json`, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Reading file ${colors.green(filePath)}`);

            readStream
                .pipe(csvParse({auto_parse: true}))
                .pipe(through2({objectMode: true}, function (chunk, encoding, callback) {
                    this.push(JSON.stringify({
                        id: chunk[0],
                        name: chunk[1],
                        brand: chunk[2],
                        company: chunk[3],
                        price: chunk[4],
                        isbn: chunk[5]
                    }));
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


const args = minimist(process.argv.slice(2), {
    boolean: true,
    alias: {'help': 'h', 'action': 'a', 'file': 'f'},
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
        }
    }
}


//node streams.js -a io -f MOCK_DATA.csv
//node streams.js -a transform-file -f MOCK_DATA.csv