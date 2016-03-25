$(function(){

	var mAddBtn = $("#add_btn");
	var mContent = $("#todo_content");
	//Add
	mAddBtn.on('click',function(){
		addTodo(mContent.val());
	});

	function addTodo(content){
	}

});