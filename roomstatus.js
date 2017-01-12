var rpio = require('rpio');

rpio.open(12, rpio.INPUT);
function handleRequest(request, response)
{
  response.setHeader('Content-Type', 'text/html');
  response.end(`
<!DOCTYPE html>
<html>
<body style="overflow: hidden">
<div style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
    <h1 style="font-family: monospace; font-size: 48px;">
        ${rpio.read(12) == 1 ? "Licht aus" : "Licht an"}
    </h1>
</div>
</body>`);
}


var http = require('http');
var server = http.createServer(handleRequest);

server.listen(8080, function(){
console.log('Server is started');
});

