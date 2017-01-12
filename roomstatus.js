var rpio = require('rpio');

rpio.open(12, rpio.INPUT);
function handleRequest(request, response)
{
  response.end(rpio.read(12) == 1 ? "Licht aus" : "Licht an" );
}


var http = require('http');
var server = http.createServer(handleRequest);

server.listen(8080, function(){
console.log('Server is started');
});

