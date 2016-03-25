var trade = {
  /*
  *  查询某个交易在招商银行是否完成付款
  *
  *  @param {integer} id 订单id
  *  @param {function} callback 回调函数
  *
  *  @return 成功trade对象,失败null
  */
  cmbchina_query : function(id, callback){
    var url = CONFIG.host + '/auction/trades/' + id + '/cmbchina_query.json';
    $.ajax({
      url: url,
      data: '_method=put',
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response.trade);
      },
      error: function(){
        callback(null);
      }
    });
  },
  /*
  *  查询某个交易在支付宝是否完成付款
  *
  *  @param {integer} id 订单id
  *  @param {function} callback 回调函数
  *
  *  @return 成功trade对象,失败null
  */
  alipay_query : function(id, callback){
  	var url = CONFIG.host + '/auction/trades/' + id + '/alipay_query.json';
    $.ajax({
      url: url,
      data: '_method=put',
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response.trade);
      },
      error: function(){
        callback(null);
      }
    });
  },

  //微信验证
  wechat_query : function(id, callback){
    var url = CONFIG.host + '/auction/trades/' + id + '/wechat_query.json';
    $.ajax({
      url: url,
      data: '_method=put',
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response.trade);
      },
      error: function(){
        callback(null);
      }
    });
  },
  /**
  * 为订单选择货到付款
  *
  * @params
  *   trade_id 订单ID
  *   callback 回调函数
  *
  * @response
  *   {id: 交易ID} 或 null
  */
  _express_pay : function(id, callback){
    var url = CONFIG.host + '/auction/trades/' + id + '/express_pay.json';
    $.ajax({
      url: url,
      data: '_method=put',
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response.trade);
      },
      error: function(){
        callback(null);
      }
    });
  },
  /*
  *  获取外部支付页面
  *
  *  @param {integer} id 订单id
  *  @param {string} redirect 付款成功后跳转地址
  *  @param {function} callback 回调函数
  *  @param {string} type  付款方式  默认为手机招行在线支付(cmbchina_wap)
  *  @param {string} url_type  获取数据形式  html|json
  *
  *  @return 成功:支付页面地址; 失败null    请求类型为html直接返回,json则callback
  */
  checkout : function(id, redirect, type, url_type, callback){
  	type = type || 'cmbchina_wap';
    url_type = url_type || 'html';
    if(url_type === 'html'){
      var api_url = [
        CONFIG.host,
        '/auction/trades/',
        id,
        '/checkout',
        '?trade[payment_service]=' + type,
        '&redirect=',
        redirect
      ].join('');
      return api_url;
    }else{
      var url = CONFIG.host + '/auction/trades/' + id + '/checkout.json',
        data = 'trade[payment_service]=' + type + '&redirect=' + redirect;

      $.ajax({
        url: url,
        data: data,
        type: 'get',
        // async: false,
        success: function(response){
          var res = JSON.parse(response);
          callback(res.url?res.url:response);
        },
        error: function(){
          callback(null);
        }
      });
    }
  },

  cancel: function(trade_id, callback){
    var url = CONFIG.host + '/auction/trades/' + trade_id + '/cancel.json';
    $.ajax({
      url: url,
      data: '_method=put',
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response.trade);
      },
      error: function(){
        callback(null);
      }
    });
  },

  receive: function(trade_id, callback){
    var url = CONFIG.host + '/auction/trades/' + trade_id + '/receive.json';
    $.ajax({
      url: url,
      data: '_method=put',
      dataType: 'json',
      type: 'post',
      success: function(response){
        callback(response.trade);
      },
      error: function(){
        callback(null);
      }
    });
  },

  create : function(params, callback){
    var url = CONFIG.host + '/auction/trades.json';
    $.ajax({
      url: url,
      data: params,
      type: 'POST',
      dataType: 'json',
      success: function(response){
        var trade = response.trade;
        if(!trade){
          callback(null);
          return false;
        };
        callback(trade);
      }
    });

  },

  get_trade : function(id, callback){
    var url = CONFIG.host + '/auction/trades/' + id + '.json';
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'get',
      success: function(response){
        callback(response.trade);
      },
      error: function(){
        callback(null);
      }
    });
  },

  get_delivery : function(id, callback){
    var url = CONFIG.host + '/auction/trades/'+id+'/delivery_query.json';
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'get',
      success: function(response){
        callback(response);
      },
      error: function(){
        callback(null);
      }
    });
  }
};