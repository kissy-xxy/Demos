/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	update:function(req,res,next){
		console.log("update.. todo");
		var params = req.params.all();
		var id = params.id;
		var done = params.done;
		var content = params.content;

		if(!id) res.redirect("/");
		var old_todo = {};
		old_todo.done = !!done;
		old_todo.content = content;
		
		Home.update(id,old_todo,function(err,new_todo){
			if(err) return next(err);
			res.redirect("/");
		});

	},

	new :function(req,res,next){
		console.log(" new "+!!res);
		return res.view({});
	},

	show:function(req,res,next){
		console.log("show ");
		var params = req.params.all();
		var id = params.id;
		if(!id) res.redirect("/");
		Home.findOne(id,function(err,old_todo){
			if(err) return next(err);
			if(old_todo===undefined) return next(err);
			res.view(old_todo);			
		});
	},

	edit:function(req,res,next){
		var params = req.params.all();
		var id = params.id;
		if(!id) res.redirect("/");
		Home.findOne(id,function(err,old_todo){
			if(err) return next(err);
			if(old_todo===undefined) return next(err);
			res.view(old_todo);			
		});
	},

	create:function(req,res,next){
		var self =this;
		var params = req.params.all();	
		console.log("params:",params);
		if(!params || !params.content) next();
		var newTodo = {
			content:params.content,
			done:false,
		};


		Home.create(newTodo,function(err,todo){
			console.log("todo: ",todo);
			if(err) return next(err);
			res.status(201);
			//
			res.redirect("/");	
		});
	},

	home:function(req,res){
		var homeData= {todos:[],todos_done:[]};
		Home.find({sort:'updatedAt desc'},function(err,todos){
			if(todos !== undefined) {
				_.each(todos,function(todo){
					if(!todo.done) homeData.todos.push(todo)
					else homeData.todos_done.push(todo);
				});

				return res.view(homeData);
			}
			return res.view(homeData);
		});
	},

	destroy:function(req,res){
		console.log("destroy");
		var params = req.params.all();
		var id = params.id;
		Home.destroy(id,function(err){
			res.redirect("/");
		});
	}

};

