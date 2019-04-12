class List{
	constructor(){
		this.load();
	}
	load(){
		var that = this;
		$.ajax({
			type:"get",
			url:"./data/index.json",
			dataType:"json",
			success:function(res){
				that.display(res);
//				console.log(res);
			}
		});
	}
	display(res){
		this.res = res;
		var str = "";
		for(var i = 0;i<this.res.length;i++){
			str +=`<li index="${res[i].id}">
							<div>
								<a target="_blank">
								<img src="${res[i].src}"> 
								<p class="over">${res[i].title}</p> 
								<p><span class="price"> ${res[i].price}</span></p> 
								
								</a>
							</div>
						</li>`
		}
		$(".float").children("ul").html(str);
		$("ul").children("li").on("click",function(){				
//			console.log($(this).attr("index"))
				setCookie("id",$(this).attr("index"))
				 $(location).attr('href', './detail.html')
		})
	}
}


new List(); 
