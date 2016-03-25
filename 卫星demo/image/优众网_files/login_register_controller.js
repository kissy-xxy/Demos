var login_register_controller = {
  initialize : function(){
    var $this = this,
      $log_btn = $('.log_btn'),
      $reg_btn = $('.reg_btn'),
      $login_box = $('#login_layer'),
      $register_box = $('#register_layer'),
      $turnoff = $('.turnoff_ico');

    $this.login_event($log_btn, $login_box, $register_box);
    $this.register_event($reg_btn, $login_box, $register_box);
    $this.close_event($turnoff);
    contact_new_controller.keyup_event($('.read_in.name input'), 20);
    contact_new_controller.keyup_event($('.read_in.psd input'), 20);
    contact_new_controller.keyup_event($('.read_in.rpsd input'), 20);
    contact_new_controller.keyup_event($('.captcha_input'), 4);
    // 登录
    $('#login').submit(function(e){
      e.preventDefault();
      $.each($('input'), function(i, k){
        $(k).blur();
      });
      setTimeout(function(){
        $this.login_check($('#login'), $('.login_btn'));
      }, 300);
    });
    $('#login_submit').unbind(itap_event).bind(itap_event, function(e){
      e.preventDefault();
      $('#login').submit();
    });
    // 注册
    var username_valid = false,
      captcha_valid = true,
      captcha_validing = false,
      flag = null;
    $this.password_blur();
    $this.email_blur(flag, username_valid, captcha_valid, function(res){
      flag = res['flag'];
      username_valid = res['username_valid'];
      captcha_valid = res['captcha_valid'];
    });
    $this.captcha_blur(captcha_validing, captcha_valid, function(res){
      captcha_validing = res['captcha_validing'];
      captcha_valid = res['captcha_valid'];
    });
    $this.name_blur();
    $('#register').submit(function(e){
      e.preventDefault();
      $.each($('input'), function(i, k){
        $(k).blur();
      });
      setTimeout(function(){
        $this.register_check(username_valid, flag, captcha_validing, captcha_valid);
      }, 300);
      
    });
    $('#register_submit').unbind(itap_event).bind(itap_event, function(e){
      e.preventDefault();
      $('#register').submit();
      
    });
    var $clear = $('#login_register_layer .clear_txt, #page_layer .clear_txt'),
      $input = $('#login_register_layer input, #page_layer input');
    $this.input_event($input);
    $this.clear_text($clear);
  },

  input_event : function(dom){
    var self = this;
    $.each($('.email.read_in input'), function(i, j){
      $(j).bind('input', function(){
        var $this = $(this),
          index = $this.val().indexOf('@'),
          $suffix = $('.suffix_tip');
        if(index !== -1){
          var suffix = $this.val().slice(index + 1);
          var mail_suffix = self.get_email_suffix(suffix);
          if(mail_suffix.length > 0){
            var html = '';
            for(var i = 0; i < mail_suffix.length; i++){
              html+= '<span class="left">' + mail_suffix[i] + '</span>';
            }
            html = '<div class="tip_angle"></div>' + html + '<div class="clear"></div>';
            $suffix.removeClass('hide').html(html);
            self.read_in($this, $('.suffix_tip span'), $suffix);
          }else{
            $suffix.addClass('hide');
          }
        }else{
          $suffix.addClass('hide');
        }
      });
    })
    
    dom.bind('input', function(){
      $(this).parent().find('.clear_txt').removeClass('hide');
    });
    dom.bind('blur', function(){
      $('#login_register_layer, #account_set_layer').css('position', 'fixed');
      $(this).parent().find('.clear_txt').addClass('hide');
      $('.suffix_tip').addClass('hide');
    });
    dom.bind('focus', function(){
      if((!$(this).hasClass('captcha_input') && $(this).parent().parent('form')[0].id == 'register') || $(this).hasClass('captcha_input') || $(this).parent().parent('form')[0].id == 'manage_binding_form'){
        $('#login_register_layer, #account_set_layer').css('position', 'relative');
        $('#main, header').addClass('hide');
      }
      $(this).parent().find('.clear_txt').toggleClass('hide', $(this).val() == '');
      $(this).parent().find('.right_ico').addClass('hide');
    });
  },

  get_email_suffix: function(val){
    var email_suffix = ['sina.com', '163.com', 'qq.com', '126.com', 'hotmail.com', 'yahoo.com', 'gmail.com', 'sohu.com', 'yahoo.com.cn', 'yahoo.cn', 'live.com', 'sina.cn', 'vip.sina.com', 'vip.sohu.com', 'tom.com', 'yeah.net', '21cn.com', '139.com', 'ihaveu.net'],
      count = 0, 
      suffix_array = [];
    for(var i = 0; i < email_suffix.length; i++){
      if(val == '' || ((email_suffix[i].indexOf(val) == 0) && (val !== email_suffix[i]))) {
        suffix_array.push(email_suffix[i]);
        count++;
      }
      if(count == 6) break;
    }
    return suffix_array;
  },
  
  read_in : function($input, dom, $suffix){
    $(dom).bind(itap_event, function(){
      var $this = $(this),
        text = $input.val(),
        add_text = $this.text();
      $input.val(text.slice(0, text.indexOf('@') + 1) + add_text);
      $suffix.addClass('hide');
    })
  },

  clear_text : function(dom){
    dom.bind(itap_event, function(){
      $(this).parent().find('input').val('');
      $(this).addClass('hide');
    });
  },
  
  // 切换登录页面
  login_event : function($log_btn, $login_box, $register_box){
    $log_btn.bind(itap_event, function(){
      var $this = $(this),
        $clear = $('#login_register_layer .clear_txt'),
        $input = $('#login_register_layer input');
      if($('.register_btn').hasClass('push')) return;
      $this.addClass('push');
      $('input').val('');
      $.each($('input'), function(i, k){
        $(k).blur();
      });
      $('.clear_txt').addClass('hide');
      setTimeout(function(){
        $this.removeClass('push');
        $login_box.removeClass('hide');
        $register_box.addClass('hide');
      }, 100);
    })
  },

  // 切换注册页面
  register_event : function($reg_btn, $login_box, $register_box){
    $reg_btn.bind(itap_event, function(){
      var $this = $(this),
        $clear = $('#login_register_layer .clear_txt'),
        $input = $('#login_register_layer input');
        $em = $('#login_register_layer em.right_ico');
      if($('.login_btn').hasClass('push')) return;
      $this.addClass('push');
      $('input').val('');
      $.each($('input'), function(i, k){
        $(k).blur();
      });
      $('input').blur();
      $em.addClass('hide');
      $('.captcha_need').addClass('hide');
      setTimeout(function(){
        $this.removeClass('push');
        $register_box.removeClass('hide');
        $login_box.addClass('hide');
      }, 100);
    })
  },

  //关闭浮层
  close_event : function($turnoff){
    $turnoff.bind(itap_event, function(e){
      e.preventDefault();
      var $this = $(this),
        $layer = $('#login_register_layer, #address_layer, #account_set_layer');
      $this.addClass('push');
      $.each($('input'), function(i, j){
        $(j).blur();
        if($(j).attr('id') != 'zipcode'){
          $(j).val('');
        }  
      });
      $('textarea').val('');
      $('.captcha_need').addClass('hide');
      if(get_cookie('favorite') != 'true'){
        $('.collect_ico').removeClass('push');
      }
      if(get_cookie('fanship') != 'true'){
        $('.collect_fav_ico').removeClass('push');
      }
      $('#main, header').removeClass('hide');
      app.layer_disappear($layer);
      setTimeout(function(){
        $this.removeClass('push');
        $('#login_layer, #register_layer, #address_layer, #login_register_layer, #account_set_layer, #manage_layer, #complete_layer').addClass('hide');
      },300)
      setTimeout(function(){
        $('#user, #favorite, #go_pay, #fanship').remove();
        app.clear_cookie('favorite');
        app.clear_cookie('fanship');
      },400);
    })
  },

  //错误提示
  error : function(text){
    alert(text);
    return false;
  },
  
  // 登录
  login_check : function($form, $login_btn, id){
    var $name = $form.find('input[name=username]'),
      $password = $form.find('input[name=password]'),
      name_txt = $.trim($name.val()),
      psd_txt = $.trim($password.val()),
      $this = this;

    if(!name_txt){
      $login_btn.removeClass('push');
      return $this.error('账号不能为空');
    }
    if(!Fv.checker.email_phone(name_txt)) {
      $login_btn.removeClass('push');
      return $this.error('账号格式错误');
    }
    if(!psd_txt){
      $login_btn.removeClass('push');
      return $this.error('密码不能为空');
    } 
    if(psd_txt.length < 6 && psd_txt.length > 0){
      $login_btn.removeClass('push');
      return $this.error('密码格式错误');  
    } 
    $this.login(name_txt, psd_txt, $login_btn, id);
  },

  login : function(name, psd, $login_btn, id){
    var $this = this;

    if($login_btn.hasClass('push')){
      $login_btn.attr('disabled', true);
    }else{
      $login_btn.addClass('push');
    }
    user.login(name, psd, function(response){
      if(response){
        if(response.account && response.account.id > 0){
          if($($login_btn).hasClass('binding_btn') || $($login_btn).hasClass('manage_binding_btn')){
            if(id){
              user.bind_account(id, function(res){
                if(res){
                  $this.return_page();
                } 
              });
            }else{
              $this.return_page();
            }
          }else{
            $this.return_page();
          }
        }else{
          $login_btn.removeClass('push');
          return alert(response.error.message);
        }
      }else{
        $login_btn.removeClass('push');
        return alert('网络错误');

      }
    });
  },

  // 注册
  register_check : function(username_valid, flag, captcha_validing, captcha_valid){
    var $email = $('input[name="account[email]"]'),
      $name = $('input[name="user[name]"]'),
      $psd = $('input[name="account[password]"]'),
      $repsd = $('input[name="account[password_confirmation]"]'),
      $coupon = $('input[name="coupon[code]"]'),
      $captcha = $('input[name=captcha]'),
      email_txt = $.trim($email.val()),
      name_txt = $.trim($name.val()),
      psd_txt = $.trim($psd.val()),
      repsd_txt = $.trim($repsd.val()),
      coupon_txt = $.trim($coupon.val()),
      captcha_txt = $.trim($captcha.val()),
      $register_btn = $('.register_btn'),
      $captcha_need = $('.captcha_need'),
      $this = this;

    if(email_txt.length === 0){
      $register_btn.removeClass('push');
      return $this.error('邮箱不能为空!');
    } 
    if(!username_valid){
      if($email.data('checked') === 'true'){
        $register_btn.removeClass('push');
        return $this.error('该邮箱已注册优众网!');
      }else if ($email.data('checked') === 'false'){
        $register_btn.removeClass('push');
        return $this.error('邮箱格式不正确!');
      } 
    } 
    if(name_txt.length === 0) {$name.blur(); $register_btn.removeClass('push'); return $this.error('姓名不能为空!');}
    if(psd_txt.length < 6 || repsd_txt.length < 6){
      $psd.blur(); $register_btn.removeClass('push');  return $this.error('密码长度不能小于6位!');
    }else if(psd_txt.length > 20 || repsd_txt.length > 20){
      $psd.blur(); $register_btn.removeClass('push'); return $this.error('密码长度不能超过20位!');
    }
    if(psd_txt !== repsd_txt){$repsd.blur();$psd.blur();$register_btn.removeClass('push'); return $this.error('两次密码输入不一致!');} 
    if(!$captcha_need.hasClass('hide') && captcha_txt.length == 0) {
      $register_btn.removeClass('push');
      return $this.error('验证码不能为空!');
    }
    if(captcha_validing){
      $captcha.one('captcha_complete', function(){
        if(!captcha_valid){
          $register_btn.removeClass('push');
          return $this.error('验证码不正确!');
        }else{
          $this.register(email_txt, name_txt, psd_txt, repsd_txt, captcha_txt, coupon_txt, $register_btn);
        }
      });
    }else{
      if(!captcha_valid){
        $register_btn.removeClass('push');
        return $this.error('验证码不正确!');
      }else{
        $this.register(email_txt, name_txt, psd_txt, repsd_txt, captcha_txt, coupon_txt, $register_btn);
      }
    }
  },

  // 登录之后跳转
  login_href : function(amount, flag){
    var $this = this,
        $user = $('#user'), 
        $favorite = $('#favorite'),
        $fanship = $('#fanship'),
        $go_pay = $('#go_pay');

    //个人中心
    if($user.length === 1){
      $user.remove();
      window.location.href = '/user_center';
      return;
    }
    //品牌收藏
    if($fanship.length === 1){
      var brand_id = $fanship.data('id');
      fanship.add(brand_id, function(data){
        if(data &&　data.fanship){
          $('.collect_fav_ico').addClass('push').data('id', data.fanship['id']);
        }
      });
      $fanship.remove();
      app.handle_cookie('fanship', 'true');
      if(amount && amount > 0){
        $('.nav_cart > div').html('<span class="sprites"></span><em>' + amount + '</em>');
      }
      $this.close_event($('.turnoff_ico').trigger(itap_event));
      return;
    }
    // 登录返回收藏
    if($favorite.length === 1){
      var id = $('.product_img').data('id');
      favorite.add(id , function(data){
        if(data && data.favorite){
          $('.collect_ico').addClass('push').attr('data-id', data.favorite.id);
        }
      });
      $favorite.remove();
      app.handle_cookie('favorite','true');
      if(amount && amount > 0){
        $('.nav_cart > div').html('<span class="sprites"></span><em>' + amount + '</em>');
      }
      $this.close_event($('.turnoff_ico').trigger(itap_event));
      return;
    }
    // 结算
    if($go_pay.length == 1 || get_cookie('Mark') === 'go_pay'){
      app.clear_cookie('go_pay');
      $go_pay.remove();
      setTimeout(function(){
        $this.close_event($('.turnoff_ico').trigger(itap_event));
      }, 500);
      $('.page_layer').addClass('hide');
      if(flag){
        window.location.href = '/trades/new';
      }else{
        window.location.href = '/carts';
      }
      return;
    }
    // 其他
    if(window.location.href.indexOf('ref=') != -1){
      $('.page_layer').addClass('hide');
      window.location.href = window.location.search.replace(/\?ref=/,'');
    }
    if(window.location.href.indexOf('path=') != -1){
      window.set_cookie('skip', true, 365);
      window.location.href = window.location.search.replace(/\?path=/,'');

    }
  },

  cookie_num : function(){
    var arr = [];
    $.map(JSON.parse(decodeURIComponent(get_cookie('carts'))), function(v){
      arr.push(v);
    })
    return arr.length;
  },
  
  return_page : function(){
    var $this = this;
    user.set_cookie(function(res){
      if(res.user_id){
        cart.get_new(function(data){
          if(data && data.retail_carts){
            var num = data.retail_carts.length,
              flag = false;
            if(num == 1) flag = true
            $this.login_href(num, false);
          }else{
            $this.login_href(0, false);
          }
        });
      }
    });
  },

  register : function(email, name, psd, repsd, captcha, coupon, $register_btn){
    var $this = this;
    if($register_btn.hasClass('push')){
      $register_btn.attr('disabled', true);
    }else{
      $register_btn.addClass('push');
    }
    user.register(email, name, psd, repsd, captcha, coupon, function(response){
      if(response){
        if(response.account && response.account.id > 0){
          //发送注册成功事件
          _gaq.push(['_trackEvent', '注册', '注册成功', response.account.id + '']);
          setTimeout(function(){ 
            $this.return_page();
          }, 1500);
        }else{
          $register_btn.removeClass('push');
          alert('注册失败, 请重新注册!');
        }
      }else{
        $register_btn.removeClass('push');
        alert('注册失败, 请重新注册!');
      }
    });
  },

  // 密码blur
  password_blur : function(){
    var $this = this,
      $psd = $('input[name="account[password]"]'),
      $repsd = $('input[name="account[password_confirmation]"]');
    $psd.blur(function(){
      var psd_txt = $.trim($psd.val()),
        len = psd_txt.length;
      if(len > 5 && len < 21){
        $psd.next().removeClass('hide');
      }else{
        $psd.next().addClass('hide');
      }
    });
    $repsd.blur(function(){
      var psd_txt = $.trim($psd.val()),
      repsd_txt = $.trim($repsd.val()),
      len = psd_txt.length,
      re_len = repsd_txt.length;
      if(re_len>5 && re_len < 21){
        if(psd_txt == repsd_txt){
          $repsd.next().removeClass('hide');
        }else{
          $repsd.next().addClass('hide');
        }
      }else{
        $repsd.next().addClass('hide');
      }
    });
  },

  // 邮箱或者手机号
  email_blur : function(flag, username_valid, captcha_valid, callback){
    
    var $email = $('input[name="account[email]"]'),
      $captcha_need = $('.captcha_need'); 
    $email.blur(function(){
      var email_txt = $.trim($email.val());
      
      //去除信息正确标识
      $email.next().addClass('hide');
      username_valid = false;

      if(!email_txt) return;
      if(!Fv.checker.email_phone(email_txt)){
        // 解决原生浏览器多次alert问题   见507
        // if($email.data('checked') == 'true'){
        //   $email.data('checked', 'false');
        //   return;
        // }
        $email.data('checked', 'false');
        flag = 0;
        $email[0].blur();
        callback({"flag":flag, "username_valid":username_valid, "captcha_valid":captcha_valid});
      }else{
        user.need_captcha(email_txt, function(response){
          if(!response) return;
          if(response.account){
            $email.data('checked', 'true');
            flag = 1;
          }else{
            flag = null;
            $email.data('checked', '');
            username_valid = true;
            $email.next().removeClass('hide');
            if (/^1\d{10}$/.test(email_txt)){
              $email.attr('name', 'account[phone]');
            }else{
              $email.attr('name', 'account[email]');
            } 
            if(response.need_captcha){
              captcha_valid = false;
              user.get_captcha(function(r){
                $captcha_need.removeClass('hide').find('img').attr('src', r);
              });
            }
          }
          callback({"flag":flag, "username_valid":username_valid, "captcha_valid":captcha_valid});
        });
      }
    });
  },

  // 姓名框
  name_blur : function(){
    var $name = $('input[name="user[name]"]');
    $name.blur(function(){
      var name_txt = $.trim($name.val());
      if(name_txt.length > 0 ){
        $name.next().removeClass('hide');
      }else{
        $name.next().addClass('hide');
      }
      if(name_txt.length > 20) $name.val(name_txt.slice(0, 20));
    });
  },

  // 验证码
  captcha_blur : function(captcha_validing, captcha_valid, callback){
    var $captcha = $('input[name=captcha]'),
      $captcha_need = $('.captcha_need');
    $captcha.blur(function(){
      var $this = $(this),
        val = $.trim($this.val());
      if(val.length !== 4){
        captcha_valid = false;
        $captcha_need.children('em').addClass('hide');
        return;
      }
      captcha_validing = true;
      user.valid_captcha(val, function(response){
        if(response){
          captcha_valid = true;
          $captcha_need.children('em').removeClass('hide');
        }else{
          captcha_valid = false;
          $captcha_need.children('em').addClass('hide');
        }
        $captcha.trigger('captcha_complete');
        captcha_validing = false;

        callback({'captcha_validing':captcha_validing, 'captcha_valid':captcha_valid});
      });
    }); 
  }
};