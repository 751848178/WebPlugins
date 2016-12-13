$(function () {
	$(document).on("click",".radio-box:not(.disable)",function(){
		var formGroup = $(this).attr("form-group");  // logistics
		$(this).toggleClass("active").siblings(".radio-box[form-group=" + formGroup + "]").removeClass("active");
	});
	$(document).on("click",".check-box:not(.disable)",function(){$(this).toggleClass("active");});
	$(".open-addrs").on("click",function(){$(this).parents(".addrs").toggleClass("section");});
	//$(".").on("click",".",function(){});
});