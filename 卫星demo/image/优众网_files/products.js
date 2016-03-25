var products = {
  // 获取类似商品
  get_recommend : function(id, callback){
    $.ajax({
      type : 'get',
      url : CONFIG.epm_host + '/api/products/view_units.json?product_id=' + id,
      dataType : 'json',
      success : function(data, status, xhr){
        callback(data);
      },
      error : function(){
        callback(false);
      }
    });
  },

  //获取筛选信息
  get_pros : function(params, callback){
    if(params.indexOf('unsold_count') == -1) params += '&where[unsold_count][gt]=0';
    if(params.indexOf('mall_id') == -1) params += '&where[mall_id]=1';
    $.ajax({
      type : 'get',
      url : '/products.json?filter=true&per_page=99999&response=simple',
      data : params,
      dataType : 'json',
      success : function(response){
        callback(response);
      },
      error : function(){
        callback(false);
      }
    });
  },

  //获取类别信息
  get_category : function(params, callback){
    params = 'ids=' + params;
    $.ajax({
      type : 'get',
      url : '/categories.json?response=summary',
      data : params,
      dataType : 'json',
      success : function(response){
        callback(response);
      },
      error : function(){
        callback(false);
      }
    });
  },

  //获取品牌信息
  get_brand : function(params, callback){
    params = 'ids=' + params;
    $.ajax({
      type : 'get',
      url :'/brands.json?response=summary',
      data : params,
      dataType : 'json',
      success : function(response){
        callback(response);
      },
      error : function(){
        callback(false);
      }
    });
  },



  // 获取商品
  get_info : function(ids, callback){
    $.ajax({
      type : 'get',
      url :'/products.json?response=summary&ids=' + ids,
      dataType : 'json',
      success : function(data, status, xhr){
        callback(data);
      },
      error : function(){
        callback(false);
      }
    });
  },

  // 获取精选商品
  // get_pick : function(callback){
  //   $.ajax({
  //     type : 'get',
  //     // url : CONFIG.product_host + '/auction/products.json?response=summary&where[recommend]=featured&where[unsold_count][gt]=0&order[updated_at]=DESC',
  //     url : '/products.json?response=summary&where[recommend]=featured&where[unsold_count][gt]=0&order[updated_at]=DESC',
  //     dataType : 'json',
  //     success : function(data, status, xhr){
  //       callback(data);
  //     },
  //     error : function(){
  //       callback(false);
  //     }
  //   });
  // },

  // 获取商品图片地址
  get_src : function(path, callback){
    var size = parseInt(DeviceInfo.width * 0.344);
    if(get_cookie('ratio')) size = size * get_cookie('ratio'); 
    $.ajax({
      type : 'get',
      url : "/utilities/dynamic_pic?pages_path=" + path + "&pages_size=" + size ,
      dataType : 'text',
      success : function(data, status, xhr){
        callback(data);
      },
      error : function(){
        callback(false);
      }
    });
  }
};