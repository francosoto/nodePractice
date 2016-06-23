console.log('Server web 1.0, class2')

const http = require('http');
const fs = require('fs');
const myserver = require('./lib/server');

console.log(process.cwd());
//console.log(myserver.ehAmeo())
const publicDirectory = process.cwd() + "/public";
//
const server = http.createServer((req,res) => {
	//console.log(req.headers)
	let file =  (req.url == '/')
				? 	'index.html'
				: 	''
	//if(req.url == '/')
	try {
		content = fs.readFileSync(publicDirectory + "/" + file)
	} catch(e) {
		content = fs.readFileSync(publicDirectory + "/404.html")
	}

	res.end(content)
});


server.on('clientError',(err,socket)=>{
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
});

server.listen(8000);
