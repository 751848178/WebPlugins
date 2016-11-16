(function(window){
    var pageTurn = function(option){
        var pageIndex = option.pageIndex;
            rollLong = option.rollLong;
            direction = option.direction;
            parentEle = option.parentEle;
            listEle = option.listEle;
            sliderBtn = option.sliderBtn;
            activeClass = option.activeClass;
            visibleClass = option.visibleClass;
            listBlock = option.listBlock;
            speed = option.speed?option.speed:200;
            isRound = option.isRound;
        var visibleLi = $(parentEle).find('.' + visibleClass);
        // 计算要移动长度
        var long = pageIndex * rollLong;
        // 判断是否横向移动
        if (direction == 'left') {
            // 获取可视区父元素的宽度
            var parentEleWidth = $(parentEle).width();
                // 列表的宽度
                listEleWidth = $(listEle).width();
                // 用作判断是否执行回调函数
                flag = false;
            if (Math.abs(listEleWidth - parentEleWidth) < Math.abs(long) || long > 0) { // 判断欲滚动的长度是否大于可滚动长度
                // 判断长度是否小于0
                if (long < 0) {
                    // 判断列表宽度大于可视区父元素的宽度
                    if (listEleWidth > parentEleWidth) {
                        // 计算实际要移动的宽度
                        long = -(listEleWidth - parentEleWidth);
                        // 判断是否要轮播 并且判断列表的总长度减去第一个或者最后一个元素的宽度是是否大于可视区父元素的宽度
                        if(isRound && (listEleWidth - $(listEle).find(listBlock).first().width()) > parentEleWidth){
                            if(pageIndex < -Math.ceil(Math.abs(listEleWidth - parentEleWidth) / Math.abs(rollLong))){
                                // 如果移动像素为负，则移动第一个listBlock
                                $(listEle).append($(listEle).find(listBlock).first());
                                $(listEle).css("left",long + $(listEle).find(listBlock).first().width() + "px");
                                pageIndex = 0;
                                flag = true;
                            }
                        }else{
                            // 计算当前页
                            pageIndex = -Math.ceil(Math.abs(listEleWidth - parentEleWidth) / Math.abs(rollLong));
                        }
                    } else {
                        return 0;
                    }
                } else {
                    // 判断是否要轮播 并且判断列表的总长度减去第一个或者最后一个元素的宽度是是否大于可视区父元素的宽度
                    if(isRound && (listEleWidth - $(listEle).find(listBlock).last().width()) > parentEleWidth){
                        if(pageIndex == 1){
                            // 如果移动像素为正，则移动最后一个listBlock
                            $(listEle).prepend($(listEle).find(listBlock).last());
                            $(listEle).css("left",-$(listEle).find(listBlock).last().width() + "px");
                            pageIndex = -($(sliderBtn).find("li").length - 1);
                            long = 0;
                            flag = true;
                        }
                    }else{
                        return 0;
                    }
                }
            }
            // 执行移动动画
            $(listEle).animate({ 'left': long + 'px' }, speed, function () { 
                
                if(flag){
                    if(pageIndex == 0){
                        $(listEle).prepend($(listEle).find(listBlock).last());
                        $(listEle).css("left",0);
                    }else{
                        $(listEle).append($(listEle).find(listBlock).first());
                        $(listEle).css("left",pageIndex*$(listEle).find(listBlock).width());
                    }
                    flag = false;
                }
            });
        } else {
            // 获取可视区的高度
            var parentEleHeight = $(parentEle).height();

            // 获取列表的高度
            var listEleHeight = $(listEle).height();
            if (Math.abs(listEleHeight - parentEleHeight) < Math.abs(long) || long > 0) { // 判断欲滚动的长度是否大于可滚动长度
                // 判断移动的长度是否小于0
                if (long < 0) {
                    // 判断列表长度是否大于可视区父元素
                    if (listEleHeight > parentEleHeight) {
                        // 计算实际要移动的长度
                        long = -(listEleHeight - parentEleHeight);
                        // 判断是否要轮播 并且判断列表的总长度减去第一个或者最后一个元素的宽度是是否大于可视区父元素的宽度
                        if(isRound && (listEleHeight - $(listEle).find(listBlock).first().height()) > parentEleHeight){
                            if(pageIndex < -Math.ceil(Math.abs(listEleHeight - parentEleHeight) / Math.abs(rollLong))){
                                // 如果移动像素为负，则移动第一个listBlock
                                $(listEle).append($(listEle).find(listBlock).first());
                                $(listEle).css("left",long + $(listEle).find(listBlock).first().height() + "px");
                                pageIndex = 0;
                                flag = true;
                            }
                        }else{  
                            // 计算当前页
                            pageIndex = -Math.ceil(Math.abs(listEleHeight - parentEleHeight) / Math.abs(rollLong));
                        }
                    } else {
                        return 0;
                    }
                } else {
                    // 判断是否要轮播 并且判断列表的总长度减去第一个或者最后一个元素的宽度是是否大于可视区父元素的宽度
                    if(isRound && (listEleHeight - $(listEle).find(listBlock).last().height()) > parentEleHeight){
                        if(pageIndex == 1){
                            // 如果移动像素为正，则移动最后一个listBlock
                            $(listEle).prepend($(listEle).find(listBlock).last());
                            $(listEle).css("left",-$(listEle).find(listBlock).last().height() + "px");
                            pageIndex = -($(sliderBtn).find("li").length - 1);
                            long = 0;
                            flag = true;
                        }
                    }else{
                        return 0;
                    }
                    return 0;
                }
            }
            // 执行移动动画
            $(listEle).animate({ 'top': long + 'px' }, speed, function () { });
        }
        // 如果有需要则添加当前显示区域的样式
        visibleLi.removeClass(visibleClass);
        // 
        $(listEle).children(listBlock).eq(pageIndex).addClass(visibleClass);
        $(sliderBtn).find('.' + activeClass).removeClass(activeClass);
        $(sliderBtn).children("li").eq(Math.abs(pageIndex)).addClass(activeClass);
        return pageIndex;
    };
    /**
     * option 参数列表
     *      option.listBlock 显示部分的区块
     *      option.direction 移动方向
     *      option.speed 移动动画时长
     *      option.parentEle 移动列表的父元素
     *      option.list 移动的列表
     *      option.isRound 是否轮播
     *      option.sliderBtn 页数按钮
     *      option.btnActiveClass 当前页按钮的选中样式
     *      option.index 开始执行事件时的事件
     *      option.btnEv 点击上一页、下一页、页数按钮事件
     * 
     */
    var listRoll = function(option){
        var listObj = new ListObj()();
        listObj.setIndex(option.index);
        listObj.setSliderBtn(option.parentEle + " " + option.sliderBtn + " li");
        // obj:ListRoll对象,isSlider:是否是底部页数按钮,increment:增量
        var btnClick = function(ev,obj,isSlider,increment){
            if(isSlider){
                obj.setIndex(rollFunc(-$(listObj.getSliderBtn()).index($(ev.target))));
            }else{
                obj.setIndex(rollFunc(obj.getIndex() + increment));
            }
            if(option.btnEv){
                option.btnEv();
            }
        }
        var rollFunc = function(to){
            return pageTurn({pageIndex : to,
                rollLong : $(option.list).find(option.listBlock).eq(0).width(),
                direction : option.direction,
                speed : option.speed,
                parentEle : option.parentEle,
                listEle : option.list,
                listBlock : option.listBlock,
                sliderBtn : option.parentEle + " " + option.sliderBtn,
                activeClass : option.btnActiveClass,
                isRound : option.isRound
            });
        }
        $(option.parentEle + " .last").click(function(ev){btnClick(ev,listObj,false,+1);});
        $(option.parentEle + " .next").click(function(ev){btnClick(ev,listObj,false,-1);});
        $(option.parentEle + " " + option.sliderBtn + " li").click(function(ev){btnClick(ev,listObj,true);});
    }
    function ListObj(){
        var Index = 0;
        var SliderBtn = null;
        var listObj = function(){
    　　　　var getIndex = function (){
    　　　　　　return Index 
    　　　　}
            var setIndex = function(index){
                Index = index;
            }
    　　　　var getSliderBtn = function (){
    　　　　　　return SliderBtn 
    　　　　}
            var setSliderBtn = function(sliderBtn){
                SliderBtn = sliderBtn;
            }
            return {getIndex:getIndex,setIndex:setIndex,getSliderBtn:getSliderBtn,setSliderBtn:setSliderBtn};
        };
　　　　return listObj;
    }
    window.ListRoll = listRoll;
    /* End 翻页 */

    var drag = function(option){
        var moveEles = option.moveEles;
            callBack = option.callBack;
            receiveEle = null;
        $(document).on("mousedown",moveEles,function(ev){
            var pointX = ev.pageX;
                pointY = ev.pageY;
            $(this).after($(this).clone(false).empty().css({"background":"gray"}).attr("id","dragClone"));
            // $(this).clone().empty().css({"background":"gray"}).attr("id","dragClone").appendTo($(this).parent());
            $(this).bind("mousemove",function(ev){
                var pointer = {X:ev.pageX,Y:ev.pageY},
                    left = $(this).position().left + (pointer.X - pointX),
                    top = $(this).position().top + (pointer.Y - pointY);
                pointX = pointer.X;
                pointY = pointer.Y;
                $(this).css({"position":"absolute","z-index":"2","top":top,"left":left});
                if((receiveEle = getReceiveEle(pointer,moveEles,$(this))) != null){
                    receiveEle.addClass("dragActive").siblings().removeClass("dragActive");
                }else{
                    $(moveEles).removeClass("dragActive");
                }
            });
        });
        $(document).on("mouseup",moveEles,function(ev){
            if(receiveEle == null){
                $(this).css({"position":"relative","z-index":"1","top":0,"left":0});
                $("#dragClone").remove();
            }else{
                dragObj = {receiveEle:receiveEle,dragEle:$(this)};
                $("#dragClone").remove();
                callBack(dragObj);
            }
            $(this).unbind("mousemove");
        });
    }
    var getReceiveEle = function(pointer,moveEles,dragEle){
        var receiveEle = null;
        $(moveEles + ":not(#dragClone)").not(dragEle).each(function(i,item){
            item = $(item);
            ele = {X:item.position().left,Y:item.position().top,X2:(item.position().left + item.width()),Y2:(item.position().top + item.height())};
            if(pointer.X > ele.X && pointer.Y > ele.Y && pointer.X < ele.X2 && pointer.Y < ele.Y2){
                receiveEle = item;
                return false;
            }
        });
        return receiveEle;
    }
    window.Drag = drag;
})(window);



