import http from 'http';

http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200);
        req.pipe(res);
    })
    .listen(3000);

// nodemon src/http-servers/echo-server.js --exec babel-node