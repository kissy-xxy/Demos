var voucher = {
	// 新增代金券
	add : function(id, callback){
		$.ajax({
      type: 'POST',
      url: CONFIG.host + '/auction/vouchers/1.json',
      data: '_method=put&voucher[identifier]=' + id,
      dataType: 'json',
      success: function(data, status, xhr){
        callback(data);
      },
      error: function(){
      	callback(false);
      }
    });
	}
};