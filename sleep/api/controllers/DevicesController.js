/**
 * DevicesController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res,next){
		Devices.find().populate('app').populate('version').exec(function(err,devices){
			return res.view({devices:devices});
		});
	}	
	//TODO： create 接口做关联判断， app id
};

