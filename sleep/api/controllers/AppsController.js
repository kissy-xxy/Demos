/**
 * AppsController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res,next){
		Apps.find(function(err,apps){
			return res.view({apps:apps});
		});
	},
	edit:function(req,res,next){
		Apps.findOne(req.param('id'),function(err,app){
			if(err) {
				req.session.flash={
					err:{
						name:'错误',message:'参数错误'
					}
				};
			}
			res.view({
				app:app
			});
		});
	},
	'new':function(req,res,next){
		return res.view();
	},
	update:function(req,res){

		var fileSavePath = "../../upload/";
		//{dirname:fileSavePath},
		req.file('ios_cert').upload({dirname:fileSavePath},function(err,files){
			if(err){
				req.session.flash={err:err};
				return res.redirect("/apps/edit/"+req.param("id"));
			}

			if(files.length==0){
				console.log("files length = 0 ");
				req.session.flash={
					err:{
						invalidAttributes:{
							ios_cert:[{
								name:'ios_cert',
								message:'请上传文件'}
							]
						}
					}
				};
				res.redirect("/apps/edit/"+req.param('id'));
				return;
			}

			var fd = files[0].fd;
			var fileName = fd.substring(fd.lastIndexOf("/")+1);
			var app= {
				name:req.param('name'),
				ios_cert:fileName,
			};

			//TODO: 另一个文件	
			req.file('ios_pem').upload({dirname:fileSavePath},function(err,files){
				if(!err&&files.length>0){
					app.ios_key=files[0].fd.substring(files[0].fd.lastIndexOf("/")+1);
				}else {
					req.session.flash={
						err:err||{
							invalidAttributes:{
								ios_cert:[{
									name:'ios_pem',
									message:'请上传文件'}
								]
							}
						}
					};
					res.redirect('/apps/edit/'+req.param("id"));
					return;
				}
				Apps.update(req.param('id'),app,function(err,app){
					if(err){
						req.session.flash={
							err:err
						}
						res.redirect('/apps/edit/'+req.param('id'));
						return;
					}
					return res.redirect("/apps/index");
				});

			});

			
		});
	},
	create:function(req,res){
		// var app= {
		// 	name:req.param("name"),
		// };

		// var file_pem= req.file('ios_pem');
		// var file_cert= req.file('ios_cert');


		var fileSavePath = "../../upload/";
		//{dirname:fileSavePath},
		req.file('ios_cert').upload({dirname:fileSavePath},function(err,files){
			if(err){
				req.session.flash={err:err};
				return res.redirect("/apps/new");
			}

			if(files.length==0){
				console.log("files length = 0 ");
				req.session.flash={
					err:{
						invalidAttributes:{
							ios_cert:[{
								name:'ios_cert',
								message:'请上传文件'}
							]
						}
					}
				};
				res.redirect("/apps/new");
				return;
			}

			var fd = files[0].fd;
			var fileName = fd.substring(fd.lastIndexOf("/")+1);
			var app= {
				name:req.param('name'),
				ios_cert:fileName,
			};

			//TODO: 另一个文件	
			req.file('ios_pem').upload({dirname:fileSavePath},function(err,files){
				if(!err&&files.length>0){
					app.ios_key=files[0].fd.substring(files[0].fd.lastIndexOf("/")+1);
				}else if(err){
					req.session.flash={
						err:err
					}
					res.redirect('/apps/new');
					return;
				}
				Apps.create(app,function(err,app){
					if(err){
						req.session.flash={
							err:err
						}
						res.redirect('/apps/new');
						return;
					}
					return res.redirect("/apps/index");
				});

			});

			
		});


		
	},
	destroy:function (req,res,next) {
		Apps.destroy(req.param('id'),function(err,app) {
			console.log("err:",err);
			res.redirect('/apps/index');
		});
	}
};

