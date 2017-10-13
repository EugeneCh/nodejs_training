import minimist from 'minimist';

function  inputOutput(filepath) {
    console.log('hello from IO function');
}

function transformFile(filePath) {
    console.log('Hello from transformFile function');
}

function transform() {
    console.log('Hello from transform function');
}

function httpClient() {

}

function httpServer() {

}

function printHelpMessage() {
    console.log('HELP');
}


const args = minimist(process.argv.slice(2), {
    boolean: true,
    alias: {'help': 'h', 'action': 'a', 'file': 'f'},
    // default: { 'help': true },
    unknown: (arg) => {
        if (arg !== 'help' && arg !== 'h' && arg !== 'abc') {
            console.error('Unknown option: ', arg);
            return false;
        }
    }
});

console.dir(args.length);
