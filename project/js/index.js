class MyData{
	constructor(){
		this.init()
	}
	init(){
		var that = this
	$.ajax({
	type:"get",
	url:"./data/index.json",
	dataType:"JSON",
	success:function(res){
		console.log(res)
	    that.display(res);
	}
	})
	}
	display(res){
		var str = "";
		str+=`
			<div class="floor-l">
				<a href="#">
					<img src="${res[0].src}"/>
					<span class="title">${res[0].title}</span>
					<span class="price">${res[0].price}</span>
				</a> 
			</div>
			<div class="floor-r">
				<div class="floor-r-t">
					<div class="product2">
					    <a href="#">
					     	<img src="${res[1].src}"/>
					     	<span class="title">${res[1].title}</span>
					     	<span class="price">${res[1].price}</span>
					    </a> 
				    </div>
				    <div class="product3">
					    <a href="#">
					     	<img src="${res[2].src}"/>
					     	<span class="title">${res[2].title}</span>
					     	<span class="price">${res[2].price}</span>
					    </a> 
				    </div>
				</div>
				<div class="floor-r-b">
					<div class="product4">
					    <a href="#">
					     	<img src="${res[3].src}"/>
					     	<span class="title">${res[3].title}</span>
					     	<span class="price">${res[3].price}</span>
					    </a> 
				    </div>
				    <div class="product5">
				    	<a href="#">
					     	<img src="${res[4].src}"/>
					     	<span class="title">${res[4].title}</span>
					     	<span class="price">${res[4].price}</span>
					    </a> 
			        </div>	
				</div>
				
		    </div>`;
		console.log(str);
		$("#floor").html(str)
	}
}

new MyData();
