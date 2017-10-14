import minimist from 'minimist';
import colors from 'colors';

import {createReadStream} from 'fs';

const BASE_PATH = '../../data/';

function  inputOutput(filepath) {
    let path = BASE_PATH + filepath;
    console.log('hello from IO function');
    console.log(path);
}

function transformFile(filePath) {
    let path = BASE_PATH + filePath;
    console.log('Hello from transformFile function');
    console.log(path);

    let readStream = createReadStream(path);
    readStream.on('data', (data) => {
        console.log(data);
    });
}

function transform() {
    console.log('Hello from transform function');
}

function httpClient() {

}

function httpServer() {

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