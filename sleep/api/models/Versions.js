/**
* Versions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

/**
版本更新
*/

module.exports = {

  attributes: {
    //版本号 n.n.n  ,android or ios
  	number:{
  		type:'string',
  		required:true
  	},
    // android or ios
  	os_type:{
  		type:'string',
  		required:true
  	},
    // 外键
  	app:{
      model:'Apps',
  		required:true
  	},
    // 更新描述
  	desc:{
  		type:'string'
  	},
    // 是否强制更新
  	mode:{
  		type:'boolean',
  		required:true
  	},
    // 下载地址
  	download_url:{
  		type:'string',
  		required:true
  	}
  }
};

