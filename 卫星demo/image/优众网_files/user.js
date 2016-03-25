var user = {
  // 登录
  login : function(name, password, callback){
    var data = "account[login]=" + name + "&account[password]=" + password;
    $.ajax({
      url: CONFIG.host + '/sessions.json',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(response){
        callback(response);
      },
      error: function(){
        callback(null);
      }
    });
  },

	// 注册
	register : function(email, name, psd, repsd, captcha, coupon, callback){
		var account_type = email.indexOf('@') === -1 ? 'phone' : 'email',
		  data = "account[" + account_type + "]=" + email + "&account[password]=" + psd + "&account[client]=phone_web&account[password_confirmation]=" + repsd + "&user[name]=" + name + "&captcha=" + captcha + "&coupon[code]=" + coupon;
    $.ajax({
      url: CONFIG.host + '/accounts.json',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(response){
        callback(response);
      },
      error: function(){
        callback(null);
      }
    });
	},
  
  // 获取用户账号信息
  get_account : function(id, callback){
    $.ajax({
      url: CONFIG.host + '/accounts/' + id,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        callback(data);
      },
      error: function(){
        callback(null);
      }
    });
  },

  // 获取当前账号
  get_current : function(callback){
    $.ajax({
      url: CONFIG.wechat_host + '/connections/current.json?',
      type: 'GET',
      dataType: 'json',
      success: function(response){
        callback(response);
      },
      error: function(){
        callback(null);
      }
    });
  },
  // 账号授权
  
  // 绑定现有优众账号
  bind_account : function(account_id, callback){
    $.ajax({
      url: CONFIG.wechat_host + '/connections/' + account_id + '.json',
      data: '_method=put',
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response);
      },
      error: function(){
        callback(false);
      }
    });
  },

  // 微信中增加邮箱和密码接口
  update_account : function(email, password, callback){
    $.ajax({
      url: CONFIG.host + '/core/accounts/0/update_email_and_password.json',
      data: '_method=put&core_account[password]='+ password+ '&core_account[email]=' + email,
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response);
      },
      error: function(){
        callback(null);
      }
    });
  },
	// 需要验证码
	need_captcha : function(login, callback){
    $.ajax({
      url: CONFIG.host + '/accounts/0.json?account[login]=' + login,
      type: 'GET',
      dataType: 'json',
      success: function(data, status, xhr){
        callback(data);
      },
      error: function(){
        callback(null);
      }
    });
	},

	// 获取验证图片
	get_captcha : function(callback){
		$.ajax({
      url: CONFIG.host + '/accounts/captcha_image.json',
      type: 'GET',
      dataType: 'json',
      success: function(data, status, xhr){
        callback(data.url || '');
      },
      error: function(){
        callback(null);
      }
    });
	},

	// 验证验证码
	valid_captcha : function(captcha, callback){
		$.ajax({
      url: CONFIG.host + '/accounts/validate_captcha.json',
      type: 'POST',
      data: $.param({captcha: captcha}),
      dataType: 'json',
      success: function(data, status, xhr){
        callback(data.is_valid);
      },
      error: function(){
        callback(null);
      }
    });
	},

  // 微信授权
  get_wechat : function(callback, site, type, redirect){
    var url = CONFIG.wechat_host + '/connections/new.json?site='+ site + '&type=' + type + '&redirect=' + redirect;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(response){
        callback(response);
      },
      error: function(){
        callback(null);
      }
    });
  },
  
  // 获取用户信息
  get_info : function(id, callback){
    $.ajax({
      url: CONFIG.host + '/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        callback(data);
      },
      error: function(){
        callback(null);
      }
    });
  },

  set_cookie : function(callback){
    $.ajax({
      url: '/set_cookies',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        callback(data);
      },
      error: function(){
        callback(null);
      }
    });
  }
};