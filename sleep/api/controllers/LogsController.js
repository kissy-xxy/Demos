/**
 * LogController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index:function(req,res,next){
		Logs.find().populate('message').exec(function(err,logs){
			return res.view({
				logs:logs
			});
		});
	}		
};

