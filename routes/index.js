
var base;

exports.constructor = function(basesini){
	base = basesini;
};

exports.index = function(req, res){
	res.render('index', { title: 'Forini nene' });
};

exports.listar = function(req, res){
	base.find({}, function(error, documento){
		if(error){
			res.send('Error.');
		}else{
			res.send(documento);
		}
	})
};

exports.guardar = function(req, res){
	var basesoni = new base({
			nombre: req.query.nombre,
			apellido: req.query.apellido,
			mensaje: req.query.mensaje
		});
	basesoni.save(function(error, documento){
		if(error){
			res.send('Error.');
		}else{
			res.send(documento);
		}
	});
};