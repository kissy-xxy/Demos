var contact_new_controller = {
	initialize : function($form, name, phone, address, province, city, area, zipcode){
		var $province = $(province),
		  $this = this,
		  get_province = '',
      get_city = '';
    $this.close_layer($('#address_layer .turnoff_ico'));
    $this.input_event($('#address_layer .read_in input, #address_layer .detail textarea'));
    $this.clear_txt($('.clear_txt'));
    ip.get(function(res){
    	if(res){
    		get_province = result.province_name;
	      get_city = result.city_name;
    	}

    	if(get_province != ''){
        for(var i=0; i < $province[0].length; i ++){
          if($province[0][i].value == get_province){
            $province[0][i].selected = true;
          }  
        }
      }

      $this.keyup_event(name,20);
      $this.keyup_event(phone,11);
      $this.keyup_event(zipcode,6);
      $this.keyup_event(address,60);
      $this.textarea_blur(address);
      $this.textarea_focus(address);
      $this.textarea_blur(zipcode);
      $this.textarea_focus(zipcode);
      $this.change_event(province, city, city, area, zipcode, function(res){
      	var $city = $(city),
      	    $area = $(area),
            $zipcode = $(zipcode);
        if($city[0].length > 1){
        	for(var i=0; i < $city[0].length; i ++){
            if($city[0][i].value == get_city){
              $city[0][i].selected = true; 
            }  
          }
        }
        $this.fill_area_option($area, $city.val());
        $this.fill_zipcode($zipcode, $city.val(), $area.val());
      });
      $this.change_event(city, city, city, area, zipcode, function(res){
        var $city = $(city),
            $area = $(area),
            $zipcode = $(zipcode);
        $this.fill_zipcode($zipcode, $city.val(), $area.val());
      });
      $this.change_event(area, null, city, area, zipcode, function(){
      });
    });

    function keysubmit(e){
      if(event.keyCode == 13){ 
        event.cancel = true; 
        event.preventDefault();
        $form.submit();
      } 
    }
    $('textarea').bind('keyup', function(){
      keysubmit();
    });
    $('.address_box input').bind('blur', function(){
      var $this = $(this);
      $this.next().addClass('hide');
      $('#address_layer').css('position', 'fixed');
    });

    $('#address').submit(function(e){
      e.preventDefault();
      $.each($('input'), function(i, k){
        $(k).blur();
      });
      $.each($('textarea'), function(i, k){
        $(k).blur();
      });
      setTimeout(function(){
        if($this.check_info($('#address'),name, phone, province, city, area, address, zipcode)){
          $this.save_contacts();
        }else{
          $('.affirm').removeClass('push');
        }
      }, 300);
    });

    $('.affirm').unbind(itap_event).bind(itap_event, function(e){
      e.preventDefault();
      var self = $(this);
      if(self.hasClass('push')) return;
      self.addClass('push');
      $('#address').submit();
    });   
	},

  save_contacts : function(){
    contacts.save($('#address').serialize(), function(res){
      if(res.contact){
        var param = '124';
        if(window.location.href.indexOf('from=ulife') > -1) param = "?from=ulife";
        $('.affirm').removeClass('push');
        window.location.href = '/contacts/'+ res.contact.id + param;
      }
    });
  },

  clear_txt : function(dom){
    dom.bind(itap_event, function(){
      $(this).prev().val('');
      $(this).next().addClass('hide');
      $(this).addClass('hide');
    });
  },

  input_event : function(dom){
    dom.bind('input', function(){
      var $this = $(this), val = $.trim($this.val());
      if($this.next().hasClass('clear_txt')) $this.next().toggleClass('hide', val == '');
      if($this.attr('id') == 'phone') $this.parent().find('em.right_ico').toggleClass('hide', val.length != 11 || !Fv.checker.phone(val));
      else if($this.attr('id') == 'zipcode') $this.parent().find('em').toggleClass('hide', !/^[0-9]{6}$/.exec(val));
      else $this.parent().find('em').toggleClass('hide', val == ''); 
      
    });
    dom.bind('focus', function(){
      var $this = $(this), val = $.trim($this.val());
      if($this.next().hasClass('clear_txt')) $this.next().toggleClass('hide', val == '');
      $('#address_layer').css('position', 'relative');
      $('#main, header').addClass('hide');
    });
  },

  close_layer : function(dom){
    dom.bind(itap_event, function(){
      var $this = $(this);
      $('input').blur();
      $('textarea').blur();
      $('#name,#phone,.address_txt').parent('.read_in').find('.right_ico').addClass('hide');
      $('#main, header').removeClass('hide');
      $this.addClass('push');
      $('#address_layer').removeAttr('style');
      app.layer_disappear($('#address_layer'));

      // $('#address_layer').css('position', 'fixed');
      setTimeout(function(){
        $this.removeClass('push');
      }, 300);
    });
  },

	error : function(text){
    alert(text);
    return false;
	},

	render_option : function(options){
    var res = "";
    $(options).each(function(i, j){
      if(j instanceof Object){
        res += '<option value="' + j.name + '">' + j.name + '</option>';
      }else{
        res += '<option value="' + j + '">' + j + '</option>';
      }
      
    });
    return res;
	},

	fill_city_option : function(dom, province){
		var cities = ChinaArea.cities[province];
    $(dom).html(this.render_option(cities));
	},

	fill_area_option : function(dom, city){
    var areas = ChinaArea.areas[city];
    $(dom).html(this.render_option(areas));
	},

  fill_zipcode : function(dom, city, town){
    var areas = ChinaArea.areas[city];
    for ( var i in areas){
      if(areas[i].name == town){
        $(dom)[0].value = areas[i].zipcode;
        return;
      }
    }
  },

	keyup_event : function(dom, length){
		$(dom).bind('keyup', function(){
			var $this = $(this), val = $.trim($this.val());
	    if(val.length > length) $this.val(val.slice(0, length));
		})
	},

  textarea_blur : function(dom){
    $(dom).bind('blur', function(){
      $(this)[0].scrollTop = 0;
      if(navigator.userAgent.toLowerCase().indexOf('ucbrowser') != -1 && navigator.userAgent.toLowerCase().indexOf('android') != -1){
        $('#address_layer').css('-webkit-transform','translate(0px, 0px)');
        $('.address_box').css('position', 'relative').css('top','0px');         
      }
    })
  },

  textarea_focus : function(dom){
    var self = this ;
    $(dom).bind('focus', function(){
    if(navigator.userAgent.toLowerCase().indexOf('ucbrowser') != -1 && navigator.userAgent.toLowerCase().indexOf('android') != -1){
      $('.address_box').css('position', 'absolute').css('top','-170px').css('z-index','4');
      $('#address_layer').css('height',$('#address_layer').css('height')+110+'px');
      // self.silde_touch($('.address_layer'),$(dom));
    }
     return ;
    })
  },

  // silde_touch : function(dom1,dom2){
  //   var self = this ;
  //   $(dom1).unbind('touchstart').bind('touchstart',function(){
  //   }).unbind('touchmove').bind('touchmove',function(){
  //     $(dom2).blur();
  //     self.textarea_blur(dom2);
  //   }).unbind('touchend').bind('touchend',function(){
  //   });
  // },

	change_event : function(dom, object, city, area, zipcode, callback){
		var $object = $(object),
		  $city = $(city),
		  $area = $(area),
      self = this;

		$(dom).bind('change', function(){
			var $this = $(this);
			if(dom.selector == "#province_select"){
        self.fill_city_option($city, $this.val());
        callback($object);
			}else if(dom.selector == "#city_select"){
        self.fill_area_option($area, $this.val());
        callback($object);
			}else if(dom.selector == "#area_select"){
        self.fill_zipcode($('#zipcode'), $city[0].value, $this.val());
      }
		});
		$(dom).trigger('change');
	},

  check_info : function(dom, name, phone, province, city, area, address, zipcode){
    var $this = this,
        $name = $(name),
        $phone = $(phone),
        $province = $(province),
        $city = $(city),
        $area = $(area),
        $address = $(address),
        $zipcode = $(zipcode);
    if (!Fv.checker.min($.trim($name.val()), 1)) return $this.error($name.data('msg'));
    if (!Fv.checker.phone($.trim($phone.val()))) return $this.error($phone.data('msg'));
    if (!Fv.checker.min($.trim($province.val()), 1)) return $this.error($province.data('msg'));
    if (!Fv.checker.min($.trim($city.val()), 1)) return $this.error($city.data('msg'));
    if (!Fv.checker.min($.trim($area.val()), 1)) return $this.error($area.data('msg'));
    if (!Fv.checker.min($.trim($address.val()), 1)) return $this.error($address.data('msg'));
    if (!Fv.checker.zip($.trim($zipcode.val()))) return $this.error($zipcode.data('msg'));
    return true;
  }
};