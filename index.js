const fs = require('fs');
const http = require('http');
const path = require('path');
const rpio = require('rpio');

const pin = 12;
rpio.open(pin, rpio.INPUT);

function handleAPI(request, response) {
    const isLightOn = rpio.read(pin) == 1;
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({isLightOn}));
}

function handleClient(request, response) {
    const file = path.join(__dirname, 'client/index.html');

    fs.readFile(file, (err, content) => {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(content, 'utf-8');
    });
}

function handleRequest(request, response) {
    if(request.url.match(/^\/api/)) {
        handleAPI(request, response);
    }
    else {
        handleClient(request, response);
    }
}

const port = 8080;
http.createServer(handleRequest)
    .listen(port, () => {
        console.log(`Server started on port ${port}.`);
    });
