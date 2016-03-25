var app = {
  reset_height : function(){
    var h = 51;
    if($('.bottom_fix').length === 1){
      h = 100;
    }
    $(window).resize(function(){
      $('#main').css('height', window.innerHeight - h);
      $('body, .pay_layer, .nav_layer, .success_order_layer, .fail_order_layer').css('height', window.innerHeight);
    });
  },
  // scroll 
  scroll : function(){
    var dom = $('#main');
    if(dom.length != 0)
    this.iscroll = new IScroll(dom[0], {
      scrollX: false,
      scrollY: true,
      momentum: true,
      scrollbars: true,
      fadeScrollbars: true,
      shrinkScrollbars: 'clip'
    });
  },

  // 收起键盘
  keyboard_event : function(){
    $('form').on('submit',function(e){
      var field = document.createElement('input');
      field.setAttribute('type', 'text');
      document.body.appendChild(field);
      setTimeout(function() {
        field.focus();
        setTimeout(function() {
          field.setAttribute('style', 'display:none;');
        }, 50);
      }, 50);
    });
  },

  get_user : function(){
    var cookies = document.cookie.split(';'), flag = false;
    for(var i in cookies){
      if(cookies[i].indexOf('mobile_user_id') > -1){
        if(cookies[i].trim().split('=')[1] != '' && cookies[i].trim().split('=')[1] > 0) flag = true;
      } 
    }
    return flag;
  },

  // 微信/支付宝授权登陆
  authorize_login : function(site, href){
    var url = encodeURIComponent(window.location.origin + '/loading?path='+ href);
    user.get_wechat(function(res){
      if(res){
        window.location.href = res.url;
      }
    }, site, 'default', url);
  },
  
  //验证登陆
  // check_login : function(callback, flag){
  //   if(this.get_user()){
  //     callback(true);
  //   }else if(flag){
  //     $('#login_layer, #login_register_layer').removeClass('hide');
  //     this.layer_appear($('#login_register_layer'));
  //   }
  // },
  
  //设置cookie过期
  clear_cookie : function(name){
    var date = new Date(); 
    date.setTime(date.getTime()-10000);
    document.cookie= name + "=; expires=" + date.toGMTString()+"; path=/";
  },

  //操作cookie
  handle_cookie : function(name, val){
    document.cookie = name + '=' + val + ';path=/';
  },

  // 异步加载图片
  _lasy_load : function(dom, callback){
    var $img = $(dom),
      $img_wrapper = $img.parent(),
      src = $img.data('src'), 
      img = new Image();

    if(!$img[0]) return;

    if($img_wrapper.hasClass('loaded') || src === '') return;

    $(img).bind('load', function(){
      $img.attr('src', src);
      $img_wrapper.addClass('loaded');
      callback && callback(true);
    }).bind('error', function(){
      if($img.complete){
        $img_wrapper.addClass('failed');
        callback && callback(false);  
      }
    });
    img.src = src;
  },
  
  lasy_load : function(dom){
    for(var i=0; i< $(dom).length ; i++){
      this._lasy_load($(dom)[i]);
    }
  },

  // 编辑总开关事件
  on_off_event : function(dom, $cancel, $estop, $bottom){
    $(dom).bind(itap_event, function(e){
      e.preventDefault();
      e.stopPropagation();
      if(document.referrer.indexOf(window.location.host) != -1){
        $('.back_ico').toggleClass('hide');
      }
      var $this = $(this);
      $this.toggleClass('active push');
      setTimeout(function(){
        $this.toggleClass('edit');
        $this.removeClass('push');
      }, 200);
      if(!$this.hasClass('edit')){
        $estop.removeClass('hide');
        $('.bag_cancel').removeClass('active');
        if(window.location.pathname.match(/carts/)){
          $bottom.addClass('edit');
        }
      }else{
        $estop.addClass('hide');
        if(window.location.pathname.match(/carts/)){
          if($this.hasClass('edit push')) $('.delete_pro').html('已选定0件商品');
          $bottom.removeClass('edit');
        }
      }
    });
  },

  // 阻止跳转
  stop_link : function(dom){
    $(dom).bind(itap_event,function(e){
      e.preventDefault();
      e.stopPropagation();
      return;
    });
  },
  
  //阻止浮层移动
  layer : function($layer){
    $layer.unbind().bind('click touchstart', function(e){
      e.preventDefault();
    });
  },

  // 关闭app浮层
  close_app : function(dom){
    var self = this;
    $(dom).bind(itap_event, function(){
      var $this = $(this);
      $this.addClass('push');
      self.handle_cookie('app', 'true');
      $('#app').addClass('hide');
    });
  },

  // 页面浮层展开
  layer_appear : function($layer){
    app.iscroll.disable();
    setTimeout(function(){
      $layer.css('height', DeviceInfo.height).addClass('appear');
    },100);
  },

  // 页面浮层关闭
  layer_disappear : function($layer){
    app.iscroll.enable();
    $layer.css('height', DeviceInfo.height).removeClass('appear');
  },

  // 简单事件按下效果
  push_event : function(dom, time){
    var self = this;
    $(dom).bind(itap_event, function(){
      var $this= $(this);
      if($this.hasClass('push')) return;
      $this.addClass('push');
      if(get_cookie('app') != 'true'){
        self.handle_cookie('app', 'true');
      }
      if($('input').length != 0){
        $.each($('input'), function(i, k){
          $(k).blur();
        });
      }
      setTimeout(function(){
        $this.removeClass('push');
        if($this.data('href') && $this.data('href') != ''){
          if($this.hasClass('success_back')){
            if(get_cookie('ulife_app') == "true"){
              if(window.UAPPJSBridge){
                UAPPJSBridge.goto_ushop_page();
              }else{
                $(document).on('UAPPJSBridgeReady', function(){
                  UAPPJSBridge.goto_ushop_page();
                });
              }
            }else{
              window.location.href = $this.data('href');
            }
            // if(window.UAPPJSBridge){
            //   UAPPJSBridge.goto_ushop_page();
            // }else{
            //   window.location.href = $this.data('href');
            // }
          }else{
            window.location.href = $this.data('href');
          }
        }
      }, time);
    });
  },
  // app下载提示
  app_download : function(dom){
    var ua = navigator.userAgent.toLowerCase(), self = this;
    $(dom).bind(itap_event, function(){
      var $this= $(this);
      if($this.hasClass('push')) return;
      
      if(ua.match(/MicroMessenger/i)=="micromessenger" && $this.hasClass('client_download')){
        $('#wechat_app_tip').removeClass('hide');
        return;
      }
      setTimeout(function(){
        $this.removeClass('push');
        window.location.href = $this.data('href');
      }, 200);
      if(get_cookie('app') != 'true'){
        self.handle_cookie('app', 'true');
      }
    })
  },

  // 关闭透明图层
  close_tip_layer : function(dom){
    $(dom).bind(itap_event, function(){
      $(this).addClass('hide');
    })
  },

  /*
  * 获取完整地址
  * @param url:图片相对地址， size:图片尺寸大小(可选，若为空则只补全cdn部分)，lm：组图large或大图major
  *
  * @return 带cdn的图片相应尺寸完整地址
  */
  pic: function(url, size, lm){
    if(!url) return '';
    var sa = [40, 50, 65, 80, 90, 110, 130, 145, 160, 180, 220, 225, 290, 300, 320, 350, 450, 640, 750, 1000]; //没有包含320x175
    size = this.close_size(size, sa);
    var suffix = "", ext = (url.split('.')[1] || 'jpg').toLowerCase();
    if(size){

      //根据屏幕选择尺寸
      // if(window.devicePixelRatio == 2){
      //   //var dou = isNaN(parseInt(size)) ? size : size * 2;
      //   var dou = size * 2;
      //   var temp = dou.toString();
      //   if(this.size_table[temp]){ size = temp; }
      // }
      if(!lm) lm = "major";
      if(this.size_table[size] && this.size_table[size][lm]){
        suffix = this.size_table[size][lm];
        suffix = "." + suffix + '.' + ext;
      }

    }
    var result = this.generate_cdn(url) + url + suffix;
    return result;
  },

 /* 获取完整大图地址 */
  slide : function(url, size){
    var sa = [240, 300, 320, 460, 480, 540, 600, 640, 720, 800];
    size = this.close_size(size, sa), result = '';
    if(size){
      result = url + this.suffix_hash[size]
    }
    return result;
  },

  /*
  * 尺寸,后缀对照表
  */
  size_table: {
    "40": {major: 'thumb', large: 'thumb'},
    "50": {large: 'small'},
    "65": {major: 'thumb65'},
    '80': {major: 'm80', large: 'm80'},
    "90": {major: 'm90', large: 'm90'},
    '110': {major: 'm110', large: 'm110'},
    "130": {major: 'm130', large: 'm130'},
    "145": {major: 'thumb145', large: 'm145'},
    "160": {major: 'm160', large: 'm160'},
    "180": {major:'small'},
    '220': {major: 'm220', large: 'm220'},
    "225": {major: 'm225', large: 'm225'},
    "290": {major: 'm290', large: 'm290'},
    "300": {major: 'middle', large: 'middle'},
    "320*175": {major: 'm320x175', large: 'm320x175'},
    "350": {major: 'promote', large: 'promote'},
    "450": {large: 'medium', major: 'moderate'},   //450 145尺寸图片需要特别注意
    "640": {major: 'm640', large: 'm640'},
    '750': {major: 'large', large: 'large'},
  },

  /*
  * 轮换大图,后缀对照表
  */
  suffix_hash : {
    "240" : ".t240.jpg",
    "320" : ".t320.jpg",
    "460" : ".t460.jpg",
    "480" : ".t480.jpg",
    "540" : ".t540.jpg",
    "640" : ".t640.jpg",
    "720" : ".t720.jpg",
    "800" : ".t800.jpg",
    "300" : ".m300.jpg",
    "600" : ".m600.jpg",
  },

  // 接近尺寸
  close_size : function(size, sa){
    size = parseInt(size);
    // var sa = [40, 50, 65, 80, 90, 110, 130, 145, 160, 180, 220, 225, 290, 300, 320, 350, 450, 640, 750, 1000]; //没有包含320x175
    for(var i in sa){
      if(sa[i] == size){
        return size;
      }
      
      else if(sa[i] > size){
        return sa[i];
      }
    }
    return size;
  },

  //生成 [0, n) 的随机数
  rand: function(n){
    return Math.floor((Math.random() * n));
  },

  // 根据图片url后的十六进制数生成唯一的cdn houst
  generate_cdn: function(url){
    var hosts = CONFIG.cdn_host,
      cl = hosts.length;
    try{
      var l = url.length;
      return hosts[(parseInt(url.substring(l-5, l-4), 16) || 0) % cl];
    }catch(e){
      return hosts[this.rand(cl)];
    }
  }
};
