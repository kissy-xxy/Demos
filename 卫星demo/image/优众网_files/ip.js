var ip ={
	// 获取ip信息
	get : function(callback){
		$.ajax({
      url: 'http://t.ihaveu.com/qqips.jsonp',
      dataType: 'script',
      success: function(){
        if(result.error){
          callback(null);
        }else{
          callback(result);
        }
      },
      error: function(){
        callback(null);
      }
    });  
	}
};