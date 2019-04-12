class Car{
			constructor(options){
				this.product = getCookie("id")
				this.url = options.url;
				this.tbody = options.tbody;
				this.totalPrice = options.totalPrice;
				this.totalNum = options.totalNum;
//				用来保存相应的总数和总价
				this.totalNumV = 0;
				this.totalPriceV = 0;
				this.selectAll = options.selectAll;
				this.selectAll.checked = false;
				this.getData();
				this.addEvent();
		
			}
			getData(){
				var that = this;
				ajax({
					url:this.url,
					success:function(res){
						that.res = JSON.parse(res)
						that.getCookie();
//						console.log(that.res)
					}
				})
			}
			getCookie(){
				this.product = getCookie("product");
				this.product = JSON.parse(this.product);
				this.display();
			}
			display(){
				var str = "";
				for(var i=0;i<this.res.length;i++){
					for(var j=0;j<this.product.length;j++){
						if(this.res[i].id == this.product[j].id){
//							console.log(1)
//							var oid=this.product[j].id;
//							var src=this.res[i].src;
							str += `<tr index="${this.product[j].id}">
										<td><input type="checkbox" id="checkbox"></td>
										<td><img class="img1" src="${this.res[i].src}"></td>
										<td>${this.res[i].title}</td>
										<td>${this.res[i].price}</td>
										<td><input type="number" value="${this.product[j].num}" id="num"></td>
										<td><span>删除</span></td>
									</tr>`;
						}
					}
				}
				this.tbody.innerHTML = str;
			}
			addEvent(){
				var that = this;
				this.tbody.addEventListener("click",function(eve){
					var e = eve || window.event;
					var target = e.target || e.srcElement;
					if(target.nodeName == "SPAN"){
						that.id = target.parentNode.parentNode.getAttribute("index");
						target.parentNode.parentNode.remove();
						that.changeCookie(function(index){
							that.product.splice(index,1);
						});
					}
				})
				this.tbody.addEventListener("input",function(eve){
					var e = eve || window.event;
					var target = e.target || e.srcElement;
					if(target.id == "num"){
						that.id = target.parentNode.parentNode.getAttribute("index");
						that.num = target.value;
						that.changeCookie(function(index){
							that.product[index].num = that.num;
						})
					}
				})
				this.tbody.addEventListener("change",function(eve){
					var e = eve || window.event;
					var target = e.target || e.srcElement;
					console.log(1);
//					判断引起改变事件的事件源是否为要选择的复选框
					if(target.id == "checkbox"){
//						判断复选框的状态是否为选中状态
						if(target.checked ==  true){
//							如果复选框的状态为选中状态则计算相应的数量的总价
							that.totalNumV +=  parseInt(target.parentNode.parentNode.children[4].children[0].value);
							console.log(target.parentNode.parentNode.children[3].innerHTML)
							that.totalPriceV += (target.parentNode.parentNode.children[4].children[0].value) * parseInt(target.parentNode.parentNode.children[3].innerHTML);
						}
//						判断改变后,复选框的状态是否未选中的状态
						if(target.checked == false){
//							如果复选框的状态解除选中则要减去相应的数量和总价;
							that.totalNumV -=  parseInt(target.parentNode.parentNode.children[4].children[0].value);
							that.totalPriceV -= (target.parentNode.parentNode.children[4].children[0].value) * parseInt(target.parentNode.parentNode.children[3].innerHTML);
							that.selectAll.checked = false;
						}
						console.log(that.totalNumV)
						that.totalNum.innerHTML = "总数量为：" + that.totalNumV;
						that.totalPrice.innerHTML = that.totalPriceV;
					}
				})
				this.selectAll.addEventListener("change",function(){
//					这里需要清空之前单个的选项数据,不然全选会造成与之前的叠加问题
					that.totalNumV = 0;
					that.totalPriceV = 0;
					that.tr = document.querySelectorAll("tbody tr");;
					if(this.checked == true){
						for(var i=0;i<that.tr.length;i++){
							that.tr[i].children[0].children[0].checked = true;
							that.totalNumV += parseInt(that.tr[i].children[4].children[0].value);
							that.totalPriceV += parseInt(that.tr[i].children[4].children[0].value) * that.tr[i].children[3].innerHTML;
						}
					}else{
						for(var i=0;i<that.tr.length;i++){
							that.tr[i].children[0].children[0].checked = false;
							that.totalNumV = 0;
							that.totalPriceV = 0;
						}
					}
					that.totalNum.innerHTML = "总数量为：" + that.totalNumV;
					that.totalPrice.innerHTML = that.totalPriceV;
				})
			}
			changeCookie(callback){
				for(var i=0;i<this.product.length;i++){
					if(this.product[i].id == this.id){
						break;
					}
				}
				callback(i);
				setCookie("product",JSON.stringify(this.product));
			}
		}
		new Car({
			url:"./data/index.json",
			tbody:document.querySelector("tbody"),
			totalPrice:document.querySelector("#totalPrice"),
			totalNum:document.querySelector("#totalNum"),
			selectAll:document.querySelector("#selectAll")
		})