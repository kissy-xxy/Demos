/**
 * VersionsController
 *
 * @description :: Server-side logic for managing versions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res,next){
		Versions.find().populate("app").exec(function(err,versions){
			return res.view({versions:versions});
		});
	},
	edit:function(req,res,next){
		Versions.findOne(req.param('id'),function(err,version){
			Apps.find(function(err,apps){
				if(err) {
					req.session.flash={
						err:{
							name:'错误',message:'参数错误'
						}
					};
				}
				res.view({
					version:version,
					apps:apps
				});
			});
		});
	},
	show:function(req,res,next){
		Versions.findOne(req.param('id'),function(err,version){
			return res.view({
				version:version
			});
		});
	},
	'new':function(req,res,next){
		Apps.find(function(err,apps){
			return res.view({
				apps:apps
			});
		});
	},
	update:function(req,res){
		var version = {
			number:req.param("number"),
			os_type:req.param("os_type"),
			app:req.param("app"),
			desc:req.param("desc"),
			mode:req.param("mode")=='on',
			download_url:req.param("download_url")
		};
		console.log("version",version);
		Versions.update(req.param('id'),version,function(err,version){
			if(err){
				req.session.flash={
					err:err
				}
				res.redirect('/versions/edit/'+req.param('id'));
				return;
			}
			return res.redirect("/versions/index");
		});

	},
	create:function(req,res){
		var version = {
			number:req.param("number"),
			os_type:req.param("os_type"),
			app:req.param("app"),
			desc:req.param("desc"),
			mode:req.param("mode")=='on',
			download_url:req.param("download_url")
		};
		console.log("version",version);
		Versions.create(version,function(err,version){
			if(err){
				req.session.flash={
					err:err
				}
				res.redirect('/versions/new');
				return;
			}
			return res.redirect("/versions/index");
		});
	},
	destroy:function (req,res,next) {
		Versions.destroy(req.param('id'),function(err,version) {
			console.log("err:",err);
			res.redirect('/Versions/index');
		});
	}

};

