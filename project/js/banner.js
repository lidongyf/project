;(function($){
	"use strict";
	
	$.fn.extend({
		banner:function(options){
			this.LOCAL = {
				//解析参数，并给定默认值，绑定成属性
				isList: options.isList ? options.isList : false,
				delayTime:options.delayTime ? options.delayTime : 2000,
				moveTime:options.moveTime ? options.moveTime : 200,
//				在左右按钮中,index表示进来的,iPrev表示要走的
				index:0,
				iPrev:options.items.length-1
			}
			if(options.autoPlay ||options.autoPlay ===undefined){
				this.LOCAL.autoPlay = true;
			}else{
				options.autoPlay = false;
			}
			var that = this;
			this.LOCAL.rightBtn = function(){
					//b3-2计算索引
					if(that.LOCAL.index == options.items.length-1){
						that.LOCAL.index = 0;
						that.LOCAL.iPrev = options.items.length-1;
						
					}else{
						that.LOCAL.index ++;
						that.LOCAL.iPrev = that.LOCAL.index-1;
					}
//					b4-2开始移动
                    that.LOCAL.btnMove(-1);
				}
			that.LOCAL.btnMove = function(type){
					options.items.eq(that.LOCAL.iPrev).css({
						left:0
					}).stop().animate({
						left:options.items.eq(0).width()*type
					},that.LOCAL.moveTime).end().eq(that.LOCAL.index).css({
						left:-options.items.eq(0).width()*type
			    }).stop().animate({
						left:0
			},that.LOCAL.moveTime)
					//l9在按钮中操作list的当前项
			if(that.LOCAL.isList){
			$(".list").children("li").eq(that.LOCAL.index).css({
                	background:"red"
                }).siblings().css({
                		background:""
                })
			}
		}
//			b1判断是否有左右按钮
			if(options.left !=undefined && options.left.length>0 && options.right !=undefined && options.right.length>0){
				//b2开始做左右功能，绑定事件
				options.left.on("click",function(){
					//b3-1计算索引
					if(that.LOCAL.index ==0){
						that.LOCAL.index = options.items.length-1;
						that.LOCAL.iPrev = 0;
					}else{
						that.LOCAL.index --;
						that.LOCAL.iPrev = that.LOCAL.index+1;
					}
//					b4-1开始移动
                    that.LOCAL.btnMove(1);
				})
				options.right.on("click",this.LOCAL.rightBtn)
				//通过类型的不同，定义移动的功能
				
			}
			
			
//			l1.判断是否需要list
			if(this.LOCAL.isList){
//				l2.创建list:结构为ul>li*4
				var str = "";
				for(var i=0;i<options.items.length;i++){
					str +=`<li>${i+1}</li>`
				}
				this.append($("<ul>").html(str).addClass("list"));
				//设置ul和li的初始样式
				$(".list").css({
					position:"absolute",
					bottom:0,
					left:0,
					right:0,
					display:'flex',
					textAlign:"center",
					lineHeight:'20px',
					height:20,
					background:"rgba(200,200,200,.6)",
					zIndex:1,
					margin:0,
					padding:0,
					listStyle:"none"
				}).children("li").css({
					flex:1,
					position:'relative',
					borderLeft:"1px solid black",
					borderRight:"1px solid black",
					
				}).eq(this.LOCAL.index).css({
					background:"red"
				})
//				l4.绑定事件,点击切换图片
                $(".list").children("li").on("click",function(){
                	if($(this).index() > that.LOCAL.index){
//              		console.log("向左")
//                      l6-1.向左移动，调用move方法
                        that.LOCAL.listMove(1,$(this).index()); 
                	}
                	if($(this).index() < that.LOCAL.index){
//              		console.log("向右")
//                      l6-2.向右移动，调用move方法
                        that.LOCAL.listMove(-1,$(this).index()); 
                	}
                	//l8.设置list的当前颜色
                	$(".list").children("li").eq($(this).index()).css({
                	 	background:"red"
                	}).siblings().css({background:""})
                	//l5.设置点击的索引，为当前索引
                	that.LOCAL.index = $(this).index()
                })
//              l7.定义移动功能
                this.LOCAL.listMove = function(type,iNow){
                	options.items.eq(that.LOCAL.index).css({
                		left:0
                	}).stop().animate({
                		left:-options.items.eq(0).width() *type
                	},that.LOCAL.moveTime).end().eq(iNow).css({
                		left:options.items.eq(0).width() *type
                	}).stop().animate({
                		left:0
                	},that.LOCAL.moveTime)
                }
			}
			if(this.LOCAL.autoPlay){
				this.LOCAL.timer = setInterval(()=>{
                   this.LOCAL.rightBtn();
				},this.LOCAL.delayTime)
				this.hover(function(){
					clearInterval(that.LOCAL.timer)
				},function(){
					that.LOCAL.timer = setInterval(()=>{
                   that.LOCAL.rightBtn();
				},that.LOCAL.delayTime)
				})
			}
		}
	});
})(jQuery);