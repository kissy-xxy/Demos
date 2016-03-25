var contact_index_controller ={
  initialize : function(){
    var $this = this;
    $('.add_ico').removeClass('hide');
    
    $this.select_address($('.contact_box >div'));
    $this.go_new($('.add_ico'));
    $('#nav').addClass('hide');
  },

  // 选择收货地址
  select_address : function(dom){
    $(dom).bind(itap_event, function(){
      var $this = $(this);
      $('.clear_fix.push').removeClass('push');
      $this.addClass('push');
      setTimeout(function(){
        var href = $this.data('href'),
          time = md5(new Date().getTime().toString());
        if(href.indexOf('?from') > -1){
          href = href + '&' + time;
        }else{
          href = href + '?' + time;
        }
        window.location.href = href;
        $this.removeClass('push');
      }, 200);
    });
  },

  auto_address : function(){
    var $name = $('#name'),
        $phone = $('#phone'),
        $province = $('#province_select'),
        $city = $('#city_select'),
        $area = $('#area_select'),
        $address = $('.address_txt'),
        $zipcode = $('#zipcode');
     contact_new_controller.initialize($('#address'), $name, $phone, $address, $province, $city, $area, $zipcode);
  },

  // 新建地址浮层
  go_new : function(dom){
    var self = this;
    $(dom).bind(itap_event, function(){
      var $this = $(this), 
        $address_layer = $('#address_layer');
      $this.addClass('push');
      $address_layer.removeClass('hide');
      $address_layer.css('height', DeviceInfo.height);
      // $address_layer.css('-webkit-transform','translate(0,0)');
      app.layer_appear($address_layer);
      setTimeout(function(){
        $this.removeClass('push');
      }, 200);
    });
  }
};