const fs = require('fs');

const publicDirectory = process.cwd() + "/public";

var dinamicRoutes = {}

function Request(req,res) {
	this.req = req
	this.res = res

	if(!this.staticFile()) {
		if(!this.dinamicFile()) {
			this.errorFile()
		}
	}
	//res.end(content)
}

Request.prototype.staticFile = function() {
	let file =  (this.req.url == '/')
				? 	'index.html'
				: 	''

	var content = ''

	try {
		content = fs.readFileSync(publicDirectory + "/" + file)
		return this.res.end(content)
	} catch(e) {
		return null
	}
}

Request.prototype.dinamicFile = function() {
	//this.res.end()
	console.log("dinamic!")

	if(typeof dinamicRoutes[this.res.url] != 'undefined')
		return dinamicRoutes[this.res.url]()
	else
		return null 
}

Request.prototype.errorFile = function() {
	this.res.end(fs.readFileSync(publicDirectory + "/404.html"))
}

function server() {
	console.log("empieza la party")
	this.Request = function(req,res) {
		console.log("Me envias una petición")
		new Request(req,res)
	}
}

server.prototype.get = function(path,cb) {
	//console.log(cb)
	dinamicRoutes[path] = cb
}

module.exports = server
