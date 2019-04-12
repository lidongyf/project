class MyData{
	constructor(){
		this.init();
	}
	init(){
		var that = this;
		$.ajax({
			type:"get",
			url:"./data/real.json",
			dataType:"JSON",
			success:function(res){
				console.log(res);
                that.display(res);
			}
		});
	}
	display(res){
		var str = "";
		for(var i=0;i<res.length;i++){
			str+=`<li>
					<a href="#">
						<h3 class="show1">${"res[i].show1"}</h3>
						<span class="show2">${"res[i].show2"}</span>
						<img src=${"res[i].src"}/>
					</a>
				</li>`
			$(".showwww").html(str);
		}
	}
}




new MyData();
