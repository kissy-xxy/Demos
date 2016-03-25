/**
* Log.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	message:{
      model:'Messages',
  		required:true	
  	},
  	error_code:{
  		type:'string',
  		required:true
  	}
  }
};

