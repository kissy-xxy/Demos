var sidebar = {
  initialize : function($nav, $nav_layer, $nav_body, $nav_other, $nav_link, $back_btn){
    var $this = this;
    $this.nav_event($nav, $nav_layer, $nav_body);
    $this.close_layer($nav, $nav_layer, $nav_body, $nav_other);
    $this.go_link($nav_link, $nav_layer, $nav_body, $nav);
    $this.go_back($back_btn);
    $this.move_nav($nav);
    $('header').unbind().bind('click touchstart', function(e){
      e.preventDefault();
    });
  },

  // 控制nav键位置
  move_nav : function($nav){
    $nav.bind('touchstart', function(e){
      e.preventDefault();
      app.iscroll.disable();
    }).bind('touchmove',function(e){

      e.preventDefault();
      var x = e.touches[0].pageX-25,
        y = e.touches[0].pageY-25;
      if(x < 0) x= 0;
      if(x > DeviceInfo.width - 51) x = DeviceInfo.width - 51;
      if(y < 0) y = 0;
      if(y > DeviceInfo.height - 51) y = DeviceInfo.height - 51;
      $nav.css({'left': x , 'top': y});
    }).bind('touchend', function(e){
      var x = $nav.offset().left,
        y = $nav.offset().top;
      if(x < 0) x= 0;
      if(x > DeviceInfo.width - 51) x = DeviceInfo.width - 51;
      if(y < 0) y = 0;
      if(y > DeviceInfo.height - 51) y = DeviceInfo.height - 51;
      app.handle_cookie('x', x);
      app.handle_cookie('y', y);
      e.preventDefault();
      app.iscroll.enable();
    })
  },

  go_back : function(dom){
    // 第一次进入的页面不显示回退按钮
    if(window.history.length > 1 && (window.location.href != window.location.origin + '/') && document.referrer){
      $(dom).removeClass('hide');
    }
    // if(get_cookie('ulife_app')){
    //   alert(window.history.length + "******" + document.referrer);
    // }
    
    dom.bind(itap_event, function(){
      dom.addClass('push');
      if(get_cookie('app') != 'true'){
        app.handle_cookie('app', 'true');
      }
      window.history.go(-1);
    });
  },

  // 点击展开导航事件
  nav_event : function($nav, $nav_layer, $nav_body){
    $nav.bind(itap_event, function(){
      $nav.addClass('push');
      $nav_layer.removeClass('hide');
      var height = DeviceInfo.height - 18;
      if(height < 432){
        $nav_body.find('.nav_auto').css({'height': height, 'margin-top' : -height/2});
      }else{
        $nav_body.bind('touchstart', function(e){
          e.preventDefault();
        });
      }
      setTimeout(function(){
        $nav_body.addClass('appear');
        $nav.removeClass('push').addClass('hide');
      },100);
    });
  },

  // 关闭浮层事件
  close_layer : function($nav, $nav_layer, $nav_body, $nav_other){
    $nav_other.bind('click touchstart', function(e){
      $nav.removeClass('hide');
      $nav_body.removeClass('appear');
      // setTimeout(function(){
        $nav_layer.addClass('hide');
      // },300);
    });
  },

  // 浮层链接跳转事件
  go_link : function($nav_link, $nav_layer, $nav_body, $nav){
    $nav_link.bind(itap_event, function(e){
      var  $this = $(this), 
        link = $this.data('href');
      $this.addClass('push');
      if(link){
        setTimeout(function(){
          window.location.href = link;
          $this.removeClass('push');
          $nav_layer.addClass('hide');
          $nav_body.removeClass('appear');
          $nav.removeClass('hide');
        }, 100);
      }else{
        if(app.get_user()){
          $this.removeClass('push');
          $nav.removeClass('hide');
          $nav_body.removeClass('appear');
          window.location.href = "/user_center";
        }else{
          var ua = navigator.userAgent.toLowerCase(), site;
          if(ua.match(/MicroMessenger/i) == "micromessenger"){
            site = 'wechat';
          }else if(ua.match(/AliApp/i) == "aliapp"){
            site = 'alipay';
          }
          if(site){
            app.authorize_login(site, "/user_center");
          }else{
            $this.removeClass('push');
            $nav.removeClass('hide');
            $nav_layer.addClass('hide');
            $nav_body.removeClass('appear');
            $('#login_layer, #login_register_layer').removeClass('hide');
            app.layer_appear($('#login_register_layer'));
            $('#main').append('<input type="hidden" id="user">');
          }
        }
      }
      if(get_cookie('app') != 'true'){
        app.handle_cookie('app', 'true');
      }
    });
  }
};