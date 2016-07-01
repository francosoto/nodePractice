console.log('clase 3!')

const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const mongojs = require('mongojs')
const db = mongojs('cervezas', ['cervezas'])
const exphbs  = require('express-handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

//nota: para no añadir trabajo al garbage collector, saber cuándo trabajar con funciones estáticas o dinámicas.
var mymw = function(req,res,next) {
	req.auth = "Franco"
	console.log("middle")
	next()
}

app.use(mymw)

app.use(express.static('./public'))
/*
var persona = {
	nombre: "Cacho"
,	apellido: "Garay"
,	edad: 65
}

app.get('/',(req,res) => {
	res.set('Maty', 'gato');
	console.log('Es lo que hay, pero alguien llego => '+req.auth)
	console.log('El Ip del chabon es: '+req.ip)
	res.send('Gracias por su visita! Hola: '+req.auth);

});
*/
/*
app.get('/person',(req,res,next) => {
	res.json(persona);	
});*/

app.get('/cervezas',(req,res) => {
	db.cervezas.find({},{},(err,docs)=>{
		if(err) {
			console.log("error",err)
		}
		else {
			//console.log(docs)
			res.render("index", {birras: docs});

			//res.json(docs.pretty())
		}
	})	
})

app.post('/cervezas',(req,res) => {
	let toSave = {
		nombre: req.body.nombre || "Unnamed"
	,	sabor: req.body.sabor || "-"
	,	ciudad: req.body.ciudad || "-"
	,	pais: req.body.pais || "-"
	};

	db.cervezas.save(toSave, (err, doc)=>{
		res.redirect("/cervezas");
	});	
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
