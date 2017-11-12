import http from 'http';
import {readFileSync} from 'fs';

http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let data = readFileSync('data/html-server/index.html');
        res.end(data);
    })
    .listen(3000);

// nodemon src/http-servers/html-server.js --exec babel-node