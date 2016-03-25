/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');
var passport = require('passport');

module.exports = {
	'new': function(req, res) {
		res.view();
	},
	/**
		公司邮箱登录
	*/
	login:function(req,res,next){
		var LdapStrategy = require('passport-ldapauth');

		passport.use(new LdapStrategy({
		    server: {
		       url: 'ldap://mail.ihaveu.net:389',
			   bindDn: 'uid=zimbra,cn=admins,cn=zimbra',
			   bindCredentials: 'OKfh_meB',
			   searchBase: 'dc=ihaveu,dc=net',
			   searchFilter: '(uid={{username}})'
		    }
		  }));

		passport.authenticate('ldapauth', {session: false},function(err,user,info){
		 	if(err) {res.send(err);}
		 	if(user){
				//创建新用户
				var userObj = {
					name: user.sn+user.givenName,
					email: user.zimbraMailDeliveryAddress
				};

				User.find({where:{email:userObj.email}},function(err,users){
					console.log("find",err);	
					if(err || users.length==0){
						//如果没在数据库中 直接返回，不自动添加
						req.session.flash = {
							err:[{name:"name",message:"您没有权限登陆"}]
						}; 
						res.redirect('/');
						return;
						//创建用户
						User.create(userObj,function(err,user){
							if(err){
								console.log("err:",err);
								req.session.flash={
									err:err
								}
								return res.redirect('/session/login');
							}
							console.log("user created ");
							req.session.authenticated = true;
							req.session.User = user;
							res.redirect("/");
						});

					}else{
						req.session.authenticated = true;
						req.session.User = users[0];
						res.redirect("/");
					}
				});
		 	}else{
				req.session.flash = {
					err:[{name:"name",message: info?info.message:"登录失败，请重试"}]
				};
				res.redirect('/');
				return;
		 	}

		})(req,res);
	},

	//无用
	create: function(req, res, next) {

		// Check for email and password in params sent via the form, if none
		// redirect the browser back to the sign-in form.
		if (!req.param('username') || !req.param('password')) {
			// return next({err: ["Password doesn't match password confirmation."]});

			var usernamePasswordRequiredError = [{
				name: 'usernamePasswordRequired',
				message: 'You must enter both a username and password.'
			}]

			// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
			// the key of usernamePasswordRequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError
			}

			res.redirect('/session/new');
			return;
		}

		// Try to find the user by there email address. 
		// findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
		// User.findOneByEmail(req.param('email')).done(function(err, user) {
		User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			if (err) return next(err);

			// If no user is found...
			if (!user) {
				var noAccountError = [{
					name: 'noAccount',
					message: 'The email address ' + req.param('email') + ' not found.'
				}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}

			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					var usernamePasswordMismatchError = [{
						name: 'usernamePasswordMismatch',
						message: 'Invalid username and password combination.'
					}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.User = user;

				// Change status to online
				user.online = true;
				user.save(function(err, user) {
					if (err) return next(err);

					// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
					User.publishUpdate(user.id, {
						loggedIn: true,
						id: user.id,
						name: user.name,
						action: ' has logged in.'
					});

					// If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
					// This is used in conjunction with config/policies.js file
					if (req.session.User.admin) {
						res.redirect('/user');
						return;
					}

					//Redirect to their profile page (e.g. /views/user/show.ejs)
					res.redirect('/user/show/' + user.id);
				});
			});
		});
	},

	destroy: function(req, res, next) {

		User.findOne(req.session.User.id, function foundUser(err, user) {

			var userId = req.session.User.id;

			if (user) {
				// The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
				User.update(userId, {
					online: false
				}, function(err) {
					if (err) return next(err);

					// Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
					User.publishUpdate(userId, {
						loggedIn: false,
						id: userId,
						name: user.name,
						action: ' has logged out.'
					});

					// Wipe out the session (log out)
					req.session.destroy();

					// Redirect the browser to the sign-in screen
					res.redirect('/');
				});
			} else {

				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/');
			}
		});
	}
};

