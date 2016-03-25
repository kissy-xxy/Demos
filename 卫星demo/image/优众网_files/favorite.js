var favorite ={
	// 获取收藏商品
	get : function(product_id, callback){
		$.ajax({
			type : 'get',
			url : CONFIG.host + '/auction/favorites.json',
			data : $.param({'where[product_id]': product_id}),
			dataType : 'json',
			success : function(data, status, xhr){
				callback(data);
			},
			error : function(){
				callback(false);
			}
		});

	},

	// 添加收藏商品
	add : function(product_id, callback){
		$.ajax({
	      type: 'POST',
	      url: CONFIG.host + '/auction/favorites.json',
	      data: $.param({'favorite[product_id]': product_id}),
	      dataType: 'json',
	      success: function(data, status, xhr){
	        if(status === 'success'){
	          callback(data);
	        }
	      },
	      error: function(){
	      	callback(false);
	      }
	    });
	},

	// 删除收藏商品
	remove : function(favorite_id, callback){
		$.ajax({
		    type:'POST',
		    url: CONFIG.host + '/auction/favorites/' + favorite_id + '.json',
		    data: '_method=delete',
		    dataType: 'json',
		    success: function(data, status, xhr){
		      callback(true);
		    },
		    error: function(data){
		    	callback(false);
		    }
		  });
	}
};