/**
* Messages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    //外键
  	category:{
      model:'Categories',
  	},	
  	content:{
  		type:'string',
  		required: true
  	},
    // json 数据
  	payloads:{
  		type:'json'
  	},
  	app:{
      model:'Apps',
  		required: true
  	},
  	user_ids:{
  		type:'array'
  	},
    // 消息的指定版本 Version 表的 id
  	android_version:{
      type:'string',
  	},
  	ios_version:{
      type:'string'
  	},
    // 昵称， 接口调用 或者本地
  	creator:{
  		type:'string',
      defaultsTo:'ihaveu'
  	},
    // 发送设备数
  	count_ios:{
  		type:'integer',
      defaultsTo:0
  	},
  	count_android:{
  		type:'integer',
      defaultsTo:0
  	}
  }
};

