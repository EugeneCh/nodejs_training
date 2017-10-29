import http from 'http';

http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Hello World');
    })
    .listen(3000);

// nodemon src/http-servers/plain-text-server.js --exec babel-node