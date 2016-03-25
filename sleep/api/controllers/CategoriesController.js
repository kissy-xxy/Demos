/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res,next){
		Categories.find(function(err,cates){
			return res.view({categories:cates});
		});
	},
	edit:function(req,res,next){
		Categories.findOne(req.param('id'),function(err,cate){
			if(err) {
				req.session.flash={
					err:{
						name:'错误',message:'参数错误'
					}
				};
			}
			res.view({
				category:cate
			});
		});
	},
	'new':function(req,res,next){
		return res.view();
	},
	update:function(req,res){
		var cate = {
			name:req.param('name')
		};
		Categories.update(req.param('id'),cate,function(err,cate){
			if(err){
				req.session.flash={
					err:err
				}
				res.redirect('/categories/edit/'+req.param('id'));
				return;
			}
			return res.redirect("/categories/index");
		});
	},
	create:function(req,res){
		var cate = {
			name:req.param("name"),
		};
		Categories.create(cate,function(err,cate){
			if(err){
				req.session.flash={
					err:err
				}
				res.redirect('/categories/new');
				return;
			}
			return res.redirect("/categories/index");
		});
	},
	destroy:function (req,res,next) {
		Categories.destroy(req.param('id'),function(err,cate) {
			console.log("err:",err);
			res.redirect('/categories/index');
		});
	}

};

