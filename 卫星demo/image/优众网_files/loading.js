var loading = {
  initialize : function(){
    var self = this,
      url = window.location.search.replace(/\?path\=/,'');
      $('header, #nav').addClass('hide');
      $('.requesting').css('height', DeviceInfo.height);
      if(get_cookie('Mark') && get_cookie('No') ){
        $('#main').append('<input type="hidden" id="'+ get_cookie('Mark') +'" data-id="'+ get_cookie('No') +'">');
        // app.clear_cookie('Mark');
        // app.clear_cookie('No');
      }
    if(window.location.href.indexOf("?path=") != -1){
      user.set_cookie(function(res){
        if(res && res.user_id){
          user.get_current(function(conn){
            if(conn && conn.connection){
              self.id = conn.connection.id;
            }
            cart.get_new(function(data){
              if(data && data.retail_carts){
                var amount = data.retail_carts.length,
                  flag = false;
                if(amount == 1) flag = true;
                if(!flag) url = url.replace(/trades\/new/,'carts');
                self.show_binding(res.user_id, url, amount, flag);
              }else{
                self.show_binding(res.user_id, url, 0, false);
              }

            });
          });
        }else{
          window.location.href = '/';
        }
      });
    }else{
      window.location.href = '/';
    } 
  },

  show_binding : function(user_id, url, amount, flag){
    var self = this;
    if(!get_cookie('skip')){
      self.if_has_email(user_id, function(data){
        window.set_cookie('skip', true, 365);
        if(data && !data.flag){
          $('.requesting').addClass('need');
          self.btn_method(url);
        }else if(data && data.flag){
          login_register_controller.login_href(amount, flag);
        }
      });
    }else{
      login_register_controller.login_href(amount, flag);
    }
  },

  btn_method : function(url){
    var self = this;
    contact_new_controller.keyup_event($('.read_in.name input'), 20);
    contact_new_controller.keyup_event($('.read_in.psd input'), 20);
  
    $('#binding_form').submit(function(e){
      e.preventDefault();
      var $binding_btn = $('#binding_submit');
      if($binding_btn.hasClass('push')) return;
      $binding_btn.addClass('push');
      $.each($('input'), function(i, k){
        $(k).blur();
      });
      setTimeout(function(){
        login_register_controller.login_check($('#binding_form'), $('.binding_btn'), self.id);
      }, 300);
    });

    $('#binding_submit').unbind(itap_event).bind(itap_event, function(e){
      e.preventDefault();
      $('#binding_form').submit();
    });
    $('.create_btn').unbind(itap_event).bind(itap_event, function(e){
      e.preventDefault();
      window.location.href = url;
    });
  },

  if_has_email : function(id, callback){
    user.get_account(id, function(res){
      if(res && res.account){
        if(res.account.has_email && res.account.has_password){
          app.handle_cookie('has_email', true);
          callback({flag:true});
        }else{
          $('.requesting').addClass('need');
          app.handle_cookie('has_email', false);
          callback({flag:false});
        }
      }else{
        $('.requesting').addClass('need');
        callback({flag:false});
      }
    });
  }
};