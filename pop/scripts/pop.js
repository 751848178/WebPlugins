(function(win){
	// JavaScript Document
	/** 
	  * 显示弹窗
	  * 
	  * @param option 弹窗可选参数
	  * 	opton.title // 弹窗标题
	  * 	option.content // 弹窗内容
	  * 	option.confirmBtn // 确认按钮相关属性对象
	  * 		confirmBtn.btnEvent // 按钮点击事件
	  * 		confirmBtn.EventParams // 按钮点击事件
	  * 		confirmBtn.title // 按钮标题
	  * 		confirmBtn.isShow // 按钮是否显示
	  * 		confirmBtn.isClickClosePop // 点击按钮是否关闭弹窗
	  * 	option.cancelBtn // 取消按钮相关属性对象
	  * 		cancelBtn.btnEvent // 按钮点击事件
	  * 		confirmBtn.EventParams // 按钮点击事件
	  * 		cancelBtn.title // 按钮标题
	  * 		cancelBtn.isShow // 按钮是否显示
	  * 	option.isShowMask // 是否显示遮罩
	  * @eg:showPop({title:"删除提示",content:contentHtml,confirmEvent:function(){alert("确认按钮事件~");},cancelEvent:function(){alert("取消事件~~~");},isConfirmClosePop:false});
	  * 
	  * @return
	  * 
	  */
	var showPop = function(option){
		var title = option.title; // 弹窗标题
			content = option.content; // 弹窗内容
			confirmBtn = option.confirmBtn; // 弹窗点击确认按钮后执行的事件
			cancelBtn = option.cancelBtn; // 点击关闭弹窗按钮后执行的事件
			isShowMask = option.isShowMask; // 点击确定后是否关闭弹窗
			// 关闭弹窗事件
			var closePopFun = function(){$(this).parents(".pop").remove();}
			// 弹窗遮罩部分
			popMask = isShowMask?$("<div>").addClass("pop-mask"):"";
			/* 弹窗头部 */
			// 头部标题
			popTitle = $("<p>").addClass("pop-title").html(title?title:"提示");
			// 关闭按钮部分
			popClose = $("<div>").addClass("pop-close").append($("<a href='javascript:void(0);'>").html("×").addClass("pop-close-btn").click(cancelBtn.btnEvent?function(){cancelBtn.btnEvent(cancelBtn.EventParams);}:null).click(closePopFun));
			popHead = $("<div>").addClass("pop-header").append(popTitle).append(popClose);
			/* End 弹窗头部 */
			/* 弹窗主体部分 */
			popBodyContent = $("<div>").addClass("pop-body-content").html(content? content.clone().show() : "").css({ "max-height": $(win).height() - 345, "max-width": $(win).width() - 150 });
			popBody = $("<div>").addClass("pop-body").append(popBodyContent);
			/* End 弹窗主体部分 */
			// 弹窗底部内容部分
			popConfirm = confirmBtn.isShow?$("<button>").html(confirmBtn.title?confirmBtn.title:"确定").addClass("pop-confirm").click(confirmBtn.btnEvent?function(){confirmBtn.btnEvent(confirmBtn.EventParams);}:null).click(confirmBtn.isClickClosePop?closePopFun:null):"";
			popCancel = cancelBtn.isShow?$("<button>").html(cancelBtn.title?cancelBtn.title:"取消").addClass("pop-cancel").click(cancelBtn.btnEvent?function(){cancelBtn.btnEvent(cancelBtn.EventParams);}:null).click(closePopFun):"";
			popFoot = $("<div>").addClass("pop-footer").append(popConfirm).append(popCancel);
			// 弹窗内容部分
			popContent = $("<div>").addClass("pop-content");
			popContent.append(popHead).append(popBody).append(popFoot);
			// 弹窗div
			pop = $("<div>").addClass("pop");
			pop.append(popMask).append(popContent);
		$("body").append(pop);
		var positionChange = function(){
			popBodyContent.css({"max-height":$(win).height()-345,"max-width":$(win).width()-150});
			var popTop = ($(win).height()-popContent.height())/2;
			var popLeft = ($(win).width()-popContent.width())/2;
			popContent.css({"top":popTop,"left":popLeft});
		}
		positionChange();
		$(win).resize(positionChange);
	}
	win.ShowPop = showPop;
})(window);