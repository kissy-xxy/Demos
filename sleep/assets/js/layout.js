$(function(){
	console.log($("#main_nav").child);
	
	console.log(basePath("/user/url"));
	function basePath(href){
		try{
			return href.split("/")[1];
		}catch(e){
			return "";
		}

	}
	function highlightNav($ele){
		var path=$("#path").val();
		$ele.each(function(index,ele){
			if(basePath($(ele.children).attr("href"))==basePath(path)){
				$ele.removeClass("active");
				$(ele).addClass("active");
				//父级也要高亮
				if($ele.parent().parent().attr("class")=="dropdown"){
					$(ele).parent().parent().addClass('active');	
				}
			}
		});
	}
	highlightNav($("#main_nav > li"));
	highlightNav($("#main_msg_nav > li"));

});