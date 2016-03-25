/**
 * SleepController
 *
 * @description :: Server-side logic for managing sleeps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	new :function(req,res,next){

	},
	create: function (req,res,next) {
		var params = req.params.all();
		Sleep.create(params,function(err,sleep){
			if(err) return next(err);

			res.status(201);
			res.json(sleep);

		});
	},

	find: function (req,res,next){
		var id = req.param('id');
		var idShortCut = isShortcut(id);

		if(idShortCut === true){
			return next();
		}

		// 查找一个
		if(id){
			Sleep.findOne(id,function(err,sleep){
				// my code
				console.log('found sleep :',sleep);
				if(err || sleep === undefined) return res.json({error:'not found'});

//				if(sleep === undefined) return res.notFound();

				if(err) return next(err);

				res.json(sleep);
			});
		// 条件查找
		}else{
			var where = req.param('where');

			if(_.isString(where)){
				where = JSON.parse(where);
			}

			var options = {
				limit: req.param('limit') || undefined,// 这里是坑，如果加上这句话，下面的查询会无效，limit 不可为undefined
				skip: req.param("skip") || undefined,
				sort: req.param("sort") || undefined,
				where: where || undefined
			}

			console.log("This is the options ",options);

			// Sleep.find(options,function(err,sleep){

			// 	console.log("find : err :",err);
			// 	console.log("find : sleep :",sleep);

			// 	if(sleep === undefined) return res.notFound();
			// 	if(err) return next(err);

			// 	res.json(sleep);
			// });

			  Sleep.find(options, function(err, sleep) {

		          if(sleep === undefined) return res.notFound();

		          if (err) return next(err);

		          res.json(sleep);

		      });
		}

		function isShortcut(id){
			if(id === 'find' || id === 'update' || id==='create' || id === 'destroy'){
				return true;
			}
		}
	},

	show:function(req,res,next){

	},

	edit:function(req,res,next){

	},

	update: function(req,res,next){

		console.log(" req :",req);
		// console.log(" res :",res);
		// console.log(" next :",next);

		var criteria = {};
		criteria = _.merge({},req.params.all(),req.body);
		var id = req.param('id');
		if(!id){
			return res.badRequest('No id provided.');
		}
		Sleep.update(id,criteria,function(err,sleep){
			if(sleep.length === 0) return res.notFound();
			if(err) return next(err);
			res.json(sleep);
		});
	},
	destroy: function(req,res,next){
		var id = req.param('id');
		if(!id){
			return res.badRequest('No id provided');
		}

		Sleep.findOne(id).done(function(err,result){
			if(err) return res.serverError(err);
			if(!result) return res.notFound();
			Sleep.destroy(id,function(err){
				if(err) return next(err);
				return res.json(result);
			});
		});
	},
	index:function(req,res){
		return res.view({title:"123123"});
	},

	_config:{}
};

