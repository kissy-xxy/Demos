/*
 * 权限验证
 */
module.exports = function(req,res,next){
	 if (req.session.authenticated) {
	    return next();
	  }
	else{
		return res.redirect("/session/new");
	}
}