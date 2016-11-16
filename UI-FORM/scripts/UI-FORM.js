$(function () {
	$(document).on("click",".addr",function(){
		$(this).siblings(".addr").removeClass("active");
		$(this).toggleClass("active");
	});
	$(document).on("click",".radio-box",function(){
		var formGroup = $(this).attr("form-group");  // logistics
		$(this).toggleClass("active").siblings(".radio-box[form-group=" + formGroup + "]").removeClass("active");
	});
	$(document).on("click",".check-box",function(){$(this).toggleClass("active");});
	$(".open-addrs").on("click",function(){$(this).parents(".addrs").toggleClass("section");});
	//$(".").on("click",".",function(){});
});