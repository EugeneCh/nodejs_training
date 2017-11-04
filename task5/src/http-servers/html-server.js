import http from 'http';
import {createReadStream} from 'fs';

http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let readStream = createReadStream('data/html-server/index.html');
        readStream.pipe(res);
    })
    .listen(3000);

// nodemon src/http-servers/html-server.js --exec babel-node