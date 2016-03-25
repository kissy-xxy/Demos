/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  schema: true,

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true
  	},

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	}

  	// encryptedPassword: {
  	// 	type: 'string'
  	// },

    // online: {
    //   type: 'boolean',
    //   defaultsTo: false
    // },

    // admin: {
    //   type: 'boolean',
    //   defaultsTo: false
    // },

    // toJSON: function() {
    //   var obj = this.toObject();
    //   delete obj.password;
    //   delete obj.confirmation;
    //   delete obj.encryptedPassword;
    //   delete obj._csrf;
    //   return obj;
    // }

  },


  // beforeValidation: function (values, next) {
  //   if (typeof values.admin !== 'undefined') {
  //     if (values.admin === 'unchecked') {
  //       values.admin = false;
  //     } else  if (values.admin[1] === 'on') {
  //       values.admin = true;
  //     }
  //   }
  //    next();
  // },

  // beforeCreate: function (values, next) {

  //   // This checks to make sure the password and password confirmation match before creating record
    
  //   // 验证密码
  //   if (!values.password || values.password != values.confirmation) {
  //     return next({err: ["Password doesn't match password confirmation."]});
  //   }
  //   //为密码加密
  //   require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
  //     if (err) return next(err);
  //     values.encryptedPassword = encryptedPassword;
  //     // values.online= true;
  //     next();
  //   });
    
  // }

};
