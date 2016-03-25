var cart = {
  /***************************************************************/
  // 加入购物车新接口
  add_new : function(data, callback){
    $.ajax({
      type : 'post',
      url : CONFIG.host + '/retail/carts.json',
      data : data,
      dataType : 'json',
      success : function(data){
        callback(data);
      },
      error : function(){
        callback(false);
      }
    });
  },

  // 获取购物车新接口
  get_new : function(callback){
    $.ajax({
      type : 'get',
      url : CONFIG.host + '/retail/carts.json',
      dataType : 'json',
      success : function(data){
        callback(data);
      },
      error : function(){
        callback(false);
      }
    });
  },
  // 删除购物车新接口
  del_new : function(id, callback){
    $.ajax({
      type:'POST',
      url: CONFIG.host + '/retail/carts/' + id + '.json',
      data: '_method=delete',
      dataType: 'json',
      success: function(data, status, xhr){
        callback(data);
      },
      error: function(data){
        callback(false);
      }
    });
  },
  /************************************************************************/
  // 获取ulife商品
  get : function(callback){
    var string = this.cart_cookie('ulife='), new_string = {}, num = 0;
    if(string != ''){
      string = JSON.parse(decodeURIComponent(string));
      for(var i in string){
        num ++;
      }
    }
    new_string = {
      'cart' : string,
      'num' : num
    };
    callback(new_string);
  },

  cart_cookie : function(name){
    var string = '';
    for(var i in document.cookie.split(';')){
      var cookie = document.cookie.split(';')[i].trim();
      if(cookie.indexOf(name) > -1) string = cookie.replace(name, '');
    }
    return string;
  },

  // 只能结算一件(ulife)
  add_only : function(id, size, flag, callback){
    var new_string = {}, str = md5(id + size);
    new_string[str] = {
      'product_id' : id,
      'measure' : size,
      'if_product': flag
    };
    document.cookie = 'ulife=' + encodeURIComponent(JSON.stringify(new_string)) + ';path=/;';
    callback(new_string);
  }
};