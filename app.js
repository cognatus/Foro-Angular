
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//Conexión a Mongoose.
mongoose.connect('mongodb://localhost/foro', function(error){
	if(error){
		throw error; 
	}else{
		console.log('Conectado a MongoDB');
	}
});

/*
 *Base del foro
 *Como este es un ejemplo y todavia no se implementa
 *lo pongo aqui y no en carpeta aparte
 */
var Foro = mongoose.Schema({
	nombre: String,
	mensaje: String,
	fecha: {type: Date, default: Date.now}
});
var Cliente = mongoose.model('Foro', Foro);
routes.constructor(Cliente);

app.get('/', routes.index);
app.get('/listar', routes.listar);
app.post('/guardar', routes.guardar);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
