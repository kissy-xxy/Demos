var contacts = {
  // 存地址
  save : function(data, callback){
    $.ajax({
      type : 'post',
      url : CONFIG.host + '/auction/contacts.json',
      data : data,
      dataType : 'json',
      success : function(data, status, xhr){
        callback(data);
      },
      error : function(){
        callback(false);
      }
    });
  }

  // 获取地址
  // get : function(callback){
  //   $.ajax({
  //     type : 'get',
  //     url : CONFIG.host + '/auction/contacts.json',
  //     dataType : 'json',
  //     success : function(data, status, xhr){
  //       callback(data);
  //     },
  //     error : function(){
  //       callback(false);
  //     }
  //   });
  // }
};