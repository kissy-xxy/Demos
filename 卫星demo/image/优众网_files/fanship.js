
var fanship = {
  // 删除收藏
  remove : function(id, callback){
    $.ajax({
      type: 'POST',
      data: {"_method":"delete"},
      url: CONFIG.host + '/auction/fanships/'+ id +'.json',
      dataType: 'json',
      success: function(data, status, xhr){
        callback(true);
      },
      error: function(){
        callback(false);
      }
    });
  },
  // 获取收藏
  get : function(brand_id, callback){
    $.ajax({
      type: 'GET',
      data: 'where[brand_id]=' + brand_id,
      url: CONFIG.host + '/auction/fanships.json',
      dataType: 'json',
      success: function(data, status, xhr){
        callback(data);
      },
      error: function(){
        callback([]);
      }
    });
  },
  // 添加收藏
  add : function(brand_id, callback){
    $.ajax({
      type: 'POST',
      url: CONFIG.host + '/auction/fanships.json',
      data: 'fanship[brand_id]=' + brand_id,
      dataType: 'json',
      success: function(data, status, xhr){
        callback(data);
      },
      error: function(){
        callback({});
      }
    });
  },
};