/**
* Records.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
/**
  打开记录
**/
module.exports = {

  attributes: {
    //全 外键
  	user_id:{
  		type:'integer',
  		required: true
  	},
  	device_id:{
  		type:'integer',
  		required: true
  	},
  	message_id:{
  		type:'integer',
  		required: true
  	}
  }
};

