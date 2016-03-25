/**
* Devices.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	// appple token , Android 自定
	  token:{
	  	type:'string',
  		required:true
	  },
	  //泛指， 用户系统的user_id 对应message user_ids， 
	  user_id:{
	  	type:'string'
	  },
	  device_type:{
	  	type:'string',
  		required:true
	  },
	  // Android or IOS
	  os_type:{
	  	type:'string',
  		required:true
	  },
	  // 系统版本,从user_agent中取 正则
	  os_version:{
	  	type:'string',
  		required:true
	  },
	  // 卸载时间
	  uninstalled_at:{
	  	type:'date',
	  },
	  //
	  user_agent:{
	  	type:'string',
  		required:true
	  },
	  //外键
	  app:{
	  	model:'Apps',
  		required:true
	  },

	  //应用版本号 n.n.n  对应 Version.number
	  version:{
	  	model:'Versions',
  		required:true
	  }
  }
};

