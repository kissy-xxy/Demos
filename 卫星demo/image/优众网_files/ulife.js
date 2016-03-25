var ulife = {
	// 发送校验码接口
  sent_activation_code : function(phone, callback){
    var data = "phone=" + phone;
    $.ajax({
      url: '/ulife/send_activation_code.json',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(data){
        callback(data.response);
      },
      error: function(data){
        callback(data.response);  
      }
    });
  },

  // ulife注册接口
  register : function(phone, activation_code, password, task_id, callback){
    var data = "phone=" + phone + "&activation_code=" + activation_code;
    if(password) data = data + "&password=" + password;
    if(task_id) data = data + "&task_id=" + task_id;

    $.ajax({
      url: '/ulife/register.json',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(data){
        callback(data);
      },
      error: function(data){
        callback(data);
      }
    });
  },

  get_deal : function(product_id, callback){
    $.ajax({
      url: CONFIG.host + '/pay/deals.json?where[product_id]=' + product_id,
      type: 'get',
      dataType: 'json',
      success: function(data){
        callback(data.pay_deals);
      },
      error: function(data){
        callback(null);
      }
    });
  }
};