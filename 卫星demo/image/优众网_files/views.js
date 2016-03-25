var views = {
	// ulife 样式
	ulife_style: function(){
		var width = DeviceInfo.width;
		$('.tip_info').css('width', width*(1-0.05*3)-64);
		var h =(126 - parseInt($('.tip_info').css('height')))/2;
		$('.tip_info').css('margin-top',h);
    $('.product.ulife').css('width','100%');
    $('.ele_coupons').css('height',$('.ele_coupons').width()/1.8);
	},
  //tickets 样式
  tickets_style: function(){
    var width = DeviceInfo.width;
    var height = DeviceInfo.height;
    var h = screen.height * 0.65;
    $('.u_money').css('width', width * (0.9 - 0.4375) - 49);
    $('.split_line').css('height', width * 0.4375 + 24);
    $('.rule_layer').css('height',height);
    if(get_cookie('ulife_app')=="true" && $('body').hasClass('ios')){
    	$('.rule_content').css('height',h).css('bottom',0-h);
    	$('#rule_wrapper').css('height',h-51);
  	}else{
  		$('#rule_wrapper').css('height',height * 0.65 - 51);
  	}
    $('.tickets_new').css('height', width);
  },
	// 侧导航样式
	nav_style : function(){
    var width = DeviceInfo.width,
      height = DeviceInfo.height, style;
    if(height > 640){
    	style = [
        '<style type="text/css">',
        '.nav_enter > div{margin-top:18px;}',
        '.nav_enter{height:99px;}',
        '.nav_auto{height:auto;margin-top:-297px;}',
	      '.nav_other{width:' + (width -100) + 'px;}',
	      '</style>'
      ];
    }else{
    	style = [
        '<style type="text/css">',
	      '.nav_other{width:' + (width -100) + 'px;}',
	      '</style>'
      ];
    }
    
    $('head').append(style.join(' '));
	},

	// 品牌index 字母索引样式
	letters_style : function(){
		var height = DeviceInfo.height - 50;
		if(height - 20 > 414){
			h = parseInt((height-364)/7);
		}else{
			h = 10;
		}
    var width = DeviceInfo.width - 23,
      style = [
        '<style type="text/css">',
        '.brand_index{height:' + height + 'px}',
	      '.index_inner{height:' + (height - h * 2) + 'px; margin-top:'+ h +'px}',
	      '.index_inner > div{margin-top:' + h + 'px}',
	      '</style>'
      ];
    $('head').append(style.join(' '));
	},

	// 筛选品牌字母索引样式
	filter_style : function(){
    var $brand = $('.brand_index'),
      height = DeviceInfo.height - 50,
      para = parseInt($brand.data('length'));
      num = parseInt($brand.data('letters')),
      inner_h = (para-1) * 10 + num * 13;
		if(height - 20 > inner_h){
			h = parseInt((height - num * 13)/(para + 1));
		}else{
			h = 10;
		}
    var width = DeviceInfo.width - 23,
      style = [
        '<style type="text/css">',
	      '.index_inner{height:' + (height - h * 2) + 'px; margin-top:'+ h +'px}',
	      '.index_inner div{margin-top:' + h + 'px',
	      '</style>'
      ];
    $('head').append(style.join(' '));
	},
  
  // 为空样式
  empty_style : function(){
    var h = (DeviceInfo.height - 157)/2,
      style = [
        '<style type="text/css">',
	      '.fav_empty,.vip_shop_empty{margin-top:' + h + 'px}',
	      '.fan_empty{margin-top:' + (h-1) + 'px}',
	      '.trade_empty{margin-top:' + (h-32) + 'px}',
	      '.search_empty{margin-top:' + (h-52) + 'px}',
	      '.voucher_empty{margin-top:' + (h-50) + 'px}',
	      '</style>'
      ];
    $('head').append(style.join(' '));
  },

	// 首页滑动大图
	slide_style : function(num){
		var width = DeviceInfo.width,
		  height = (width / 2),
		  h = width*0.9/2,
		  style = [
	      '<style type="text/css">',
	      '.slide_layer{height:' + (DeviceInfo.height -50) + 'px !important;}',
	      // '.slide_content{top:'+ (-h-56) +'px}',
	      '.slide_other{height:' + (DeviceInfo.height - h) + 'px;}',
	      '.turn_width{width:' + width + 'px !important;}',
	      '.turn_height{height:' + height + 'px !important;}',
	      '.turn_scroll_width{width:' + width * num + 'px !important;}',
	      // '.slide_layer .turn_btn{top:' + (height-4) + 'px !important;}',
	      // '@keyframes Down{from {transform:translate(0,0);} to {transform:translate(0,'+ (h+56)+'px);}}',
	      // '@-webkit-keyframes Down{from {-webkit-transform:translate(0,0);} to {-webkit-transform:translate(0,'+ (h+56)+'px);}}',
	      // '@-moz-keyframes Down{from {-moz-transform:translate(0,0);}to {-moz-transform:translate(0,'+ (h+56)+'px);}}',
				// '@-o-keyframes Down{from {-o-transform:translate(0,0);}to {-o-transform:translate(0,'+ (h+56)+'px);}}',
				// '@keyframes Up{from {transform:translate(0,0);}to {transform:translate(0,'+ (-h-56)+'px);}}',
				// '@-webkit-keyframes Up{from {-webkit-transform:translate(0,0);}to {-webkit-transform:translate(0,'+ (-h-56)+'px);}}',
				// '@-moz-keyframes Up{from {-moz-transform:translate(0,0);}to {-moz-transform:translate(0,'+ (-h-56)+'px);}}',
				// '@-o-keyframes Up{from {-o-transform:translate(0,0);}to {-o-transform:translate(0,'+ (-h-56)+'px);}}',
	      '</style>'
	    ];
    $('head').append(style.join(' '));
	},

	// 专场大图
	store_style : function(percent){
		var width, height, style;
		if(percent == 1){
			width = DeviceInfo.width;
		}else if(percent == 2){
			width = DeviceInfo.width - 20;
		}else{
			width = DeviceInfo.width * percent;
		}
	  height = width / 2,
	  style = [
		  '<style type="text/css">',
		  '.store_width{width:' + width + 'px !important;margin:0 auto;}',
		  '.store_height{height:' + height + 'px !important;}',
		  '.store_box{height:' + (height + 55) + 'px !important}',
		  '.popularize_area p{width:' + (width * 0.483) + 'px !important;}',
		  '</style>'
		];
    $('head').append(style.join(' '));
	},

	// 首页分类图
	category_style : function(){
    var cate_width = parseInt(DeviceInfo.width/3),
      cate_height = parseInt(cate_width/1.18) ,
      width = DeviceInfo.width,
      height = cate_height*2,
      h = DeviceInfo.width/3*59/107,
      cate_style = [
	      '<style type="text/css">',
	      '.brand_row{height:'+ h +'px}',
	      '.brand_row div {padding-top:'+ (h-30)/2 +'px}',
	      '.btn_zone{height:' + cate_height/2 +'px;}',
	      '.btn_zone > div{height:' + (cate_height/2-20) + 'px;line-height:' + (cate_height/2-20) + 'px !important}',
	      '.home_men,.home_women,.home_other{height:' + cate_height + 'px}',
	      '.h_women_pic,.h_men_pic,.h_furniture_pic,.h_curio_pic,.h_outdoor_pic{height:'+ cate_height +'px;width:'+ cate_width+'px}',
	      '.cates{background-size:' + width + 'px '+ height +'px;}',
	      '.cates.h_men_pic{background-position:0 0}',
	      '.cates.h_women_pic{background-position:' + (-cate_width)+ 'px 0}',
	      '.h_women_other,.h_men_other{width:' + (width-cate_width) + 'px;height:'+ cate_height +'px;}',
	      '.h_women_other p,.h_men_other p{height:' + cate_height/2 +'px;line-height:'+ cate_height/2 +'px;width:'+ (width-cate_width)/3 +'px}',
	      '.cates.h_furniture_pic{background-position:' + (-cate_width-1)*2 + 'px 0}',
	      '.cates.h_curio_pic{background-position: 0' + (-cate_height) + 'px}',
	      '.cates.h_outdoor_pic{background-position: '+ (-cate_width-1) + 'px ' + (-cate_height)+ 'px}',
	      '</style>'
	    ];
	  $('head').append(cate_style.join(' '));
	},

	// 首页新品图
	new_style :function(){
		var width = DeviceInfo.width,
		  new_style = [
	      '<style type="text/css">',
	      '.home_new .index_0,.home_new .index_0 img{width:' + width*0.43 + 'px; height:' + width*0.43*30/29+ 'px}',
	      '.home_new .index_1,.home_new .index_1 img,.home_new .index_2,.home_new .index_2 img{width:' + (width*0.46-1) + 'px; height:' + width*0.46*14/29+ 'px}',
	      '</style>'
	    ];
	  $('head').append(new_style.join(' '));
	},

	// 商品图
	product_style : function(percent){
		add_style(percent);
	},

	// 推荐商品大小控制
	recommend_style : function(percent){
		var wid = parseInt(DeviceInfo.width * percent);
		var style = [
      '<style type="text/css">',
      '.recommend_width{width:' + wid + 'px}',
      '.recommend_height{height:' + wid + 'px;',
      '</style>'
    ];
    $('head').append(style.join(' '));
	},

	// 单品图居中
	single_style : function(){
    var h = $('.single_pro').height(),
	  	style = [
	      '<style type="text/css">',
	      '.single_pro{margin-top:' + (-h/2) + 'px !important;}',
	      '.box_left{width:' + (DeviceInfo.width * 0.81 - 26) + 'px;}',
	      '.product_img a{width:'+ DeviceInfo.width +'px;}',
	      '.product_img a .order_load{height:'+ DeviceInfo.width*0.75 +'px;position:relative;}',
	      '.ticket_img{width:'+ parseInt(DeviceInfo.width*0.9) +'px !important;height:'+ parseInt(DeviceInfo.width*0.9)+'px !important;}',
	      '</style>'
	    ];
	  $('head').append(style.join(' '));
	},

	// page页面图--热销图
	popular_style : function(percent){
		var width = DeviceInfo.width * percent;
	    style = [
	      '<style type="text/css">',
	      '.popular_width{width:' + width + 'px !important;}',
	      '.popular_height{height:' + width + 'px !important;}',
	      '</style>'
	    ];
		
    $('head').append(style.join(' '));
	},

	// 活动推广
	cooperate_style : function(percent){
    var width = DeviceInfo.width * percent,
      w = (1- ($('.co_recommend a').width() + 34)/width)/2 * width,
      img_w = DeviceInfo.width * 0.375,
		style = [
      '<style type="text/css">',
      '.co_recommend > span{width:' + w + 'px !important;}',
      'header .title div span:first-child{width:100%;}',
      '.co_width{width:'+ img_w +'px !important;}',
      '.co_height{height:'+ (img_w * 1.4) +'px !important;}',
      '</style>'
    ];
    $('head').append(style.join(' '));
	},

	// 购物车样式
	cart_style : function(){
		var width = DeviceInfo.width * 0.25,
      style = [
	      '<style type="text/css">',
	      '.sale_out > span, .vip_pro > span{left:' + (-width)/2 + 'px; top:'+ ((-width)/4 + 3) +'px;}',
	      '.empty{margin-top:' + (DeviceInfo.height - 296)/2 + 'px;}',
	      '.no_empty{min-height' + (DeviceInfo.height - 76) + 'px;}',
	      '</style>'
	    ];
    $('head').append(style.join(' '));
	},
};