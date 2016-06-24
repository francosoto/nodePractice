console.log('Server web 1.0, class2')

const http = require('http');
const serverLoco = require('./lib/server');
//
/*const server = http.createServer((req, res)=>{
	new myserver(req, res);
});*/

var myServer = new serverLoco()

myServer.get('/time',(req,res)=>{
	res.end(new Date().getTime().toString())
})

const server = http.createServer(myServer.Request);
/*
server.on('clientError',(err,socket)=>{
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
});
*/
server.listen(8000);
