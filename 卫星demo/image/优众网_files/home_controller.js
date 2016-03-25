var home_controller = {
	initialize : function(){
    $('#main').append('<input type="hidden" id="page" data-page="home">');
    $('.search_ico').removeClass('hide');
    $('.turn_points li:first-child').addClass('active');
    // 微信绑定中含有open_id字段
    // var params = window.location.search.replace(/\?/,'').split('&'), flag = false;
    // for(var i in params){
    //   if(params[i].indexOf('open_id') == 0){
    //     flag = true;
    //     return;
    //   } 
    // }
    
          // if(ua.match(/MicroMessenger/i) == "micromessenger"){
          //   site = 'wechat';
          // }else if(ua.match(/AliApp/i) == "aliapp"){
          //   site = 'alipay';
          // }
    // if(window.location.href.indexOf('ref=') != -1 && !flag){
    if(window.location.href.indexOf('ref=') != -1){
      var url = window.location.search.replace(/\?ref=/,'');
      if(app.get_user()){
        window.location.href =url;
      }else{
        $('#login_layer, #login_register_layer').removeClass('hide');
        app.layer_appear($('#login_register_layer'));
        
      }
    }

    setTimeout(function(){
      $.each($('.home_turn img'), function(i, k){
        var $img = $(k),
            img_src = $img.data('src');
        if(img_src.indexOf('utilities/dynamic_pic') != -1){
          img_src = app.slide(img_src.split('=')[1], DeviceInfo.width * get_cookie('ratio'));
          var new_img = document.createElement('img');
          $(new_img).bind('load', function(){
            $img[0].src = new_img.src;
          }).bind('error', function(){});
          new_img.src = img_src;
        }
      })
      $.each($('.home_new img'), function(i, k){
        var $img = $(k),
            img_src = $img.data('small-src'),
            origin_src = $img.attr('src');
        if(get_cookie('ratio') != 1)  img_src = $img.data('big-src');

        if(!origin_src || origin_src != img_src){
          var new_img = document.createElement('img');
          $(new_img).bind('load', function(){
            $img[0].src = new_img.src;
          }).bind('error', function(){});
          new_img.src = img_src;
        }
      });
    },200)
    
	},
  // 幻灯
  slide : function(wrapper, slide, body){
    var $wrapper = $(wrapper),
      $slide = $(slide),
      auto_slide,
      stop_slide,
      $body = $(body),
      direction = 'landscape',
      $this = this,
      flag = false;

    scroll = new IScroll($wrapper[0], {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true
    });
    scroll.on('beforeScrollStart',function(){});
    scroll.on('scrollEnd',function(){
      $this.indicator_update($slide, scroll.currentPage.pageX + 1);
    });

    function interval(){
      if(auto_slide){
        clearInterval(auto_slide);
      };
      var slide_num = $wrapper.find('a').length;
      auto_slide = setInterval(function(){
        if($('.home_turn a:first-child').hasClass('loaded') || $('.home_turn a:first-child').hasClass('failed')){
          var page = scroll.currentPage.pageX + 1;
          if($('.home_turn a:nth-child('+ page +')').hasClass('loaded') || $('.home_turn a:nth-child('+ page +')').hasClass('failed')){
            scroll.goToPage(page % slide_num, 0 , 500);
          }
        }
      }, 5000);
    };
    interval();
    this.handle_option($body, direction);
    $wrapper.unbind('touchstart').bind('touchstart', function(){
      if(auto_slide) clearInterval(auto_slide);
    }).unbind('touchmove').bind('touchmove', function(){
      if(auto_slide) clearInterval(auto_slide);
    }).unbind('touchend').bind('touchend', function(){
      if(auto_slide) clearInterval(auto_slide);
      interval();
    });
  },

  //幻灯提示点同步
  indicator_update : function(dom, x){
    var $dom = $(dom);
    $dom.children('.active').removeClass('active');
    $dom.find('li:nth-child(' + x + ')').addClass('active');
  },

  // 手动幻灯
  handle_option :function(dom, direction){
    var $dom = $(dom);
    $dom.bind('touchstart', function(e){
      var point = e.touches[0],
        startPageX = point.pageX,
        startPageY = point.pageY;
      $dom.bind('touchmove', function(e){
        var point = e.touches[0],
          movePageX = point.pageX,
          movePageY = point.pageY;
        if(Math.abs(movePageX - startPageX) < Math.abs(movePageY - startPageY)){
          direction = 'portrait';
        }else{
          direction = 'landscape';
        }
        $dom.unbind('touchmove');
      });
    });
  },
};