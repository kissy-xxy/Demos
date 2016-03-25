/**
* Apps.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:{
  		type:'string',
  		required:true
  	},
    // 文件地址
  	ios_cert:{
  		type:'string'
  	},
    // 文件地址
  	ios_key:{
  		type:'string'
  	},
  }
};

