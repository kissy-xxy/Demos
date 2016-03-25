/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	email:"@ihaveu.net",
	test:function(req,res,next){
		res.ok();
	},
	'new':function(req,res){
		res.view();
	},
	create:function(req,res,next){
		var userObj = {
			name: req.param('name'),
			email: req.param('email')+this.email,
		};

		console.log("userObj",userObj);

		//创建用户
		User.create(userObj,function(err,user){
			if(err){
				console.log("err:",err);
				req.session.flash={
					err:err
				}
				return res.redirect('user/new');
			}
			req.session.authenticated = true;
			req.session.User = user;

			user.online = true;
			user.save(function(err,user){
				if(err) return next(err);
				user.action=" signed-up and logged-in.";

				User.publishCreate(user);
				res.redirect('user/show/'+user.id);
			});
		});
	},
	show:function(req,res,next){
		User.findOne(req.param('id'),function(err,user){
			if(err) return next(err);
			if(!user) return next("");
			res.view({
				user:user
			});
		});
	},
	index:function(req,res,next){
		User.find(function(err,users){
			if(err) return next(err);
			res.view({
				users:users
			});
		});
	},
	edit:function(req,res,next){
		User.findOne(req.param("id"),function(err,user){
			if(err) return next(err);
			if(!user) return next('User doesn\'t exist.');
			res.view({
				user:user
			});
		});
	},
	update: function(req,res,next){

		if(req.session.User && req.session.User.admin){
			var userObje = {
				name: req.param('name'),
				title: req.param('title'),
				email: req.param('email'),
				admin: req.param('admin'),
			}
		}else{
			var userObj = {
				name: req.param('name'),
				title: req.param('title'),
				email: req.param('email'),
			}
		}

		User.update(req.param('id'),userObj,function(err){
			if(err){
				console.log("err:",err);
				return res.redirect('/user/edit/'+req.param('id'));
			}
			res.redirect('/user/show/'+req.param('id'));
		});
	},
	destroy: function(req,res,next){
		var id = req.param('id')
		User.findOne(id,function(err,user){
			if(err) return next(err);
			if(!user) return next('User not exist.');
			User.destroy(id,function(err){
				if(err) return next(err);
				User.publishUpdate(user.id,{
					name: user.name,
					action: ' has been destroyed.'
				});

				User.publishDestroy(user.id);
			});

			res.redirect('/user');

		});
	}
};

