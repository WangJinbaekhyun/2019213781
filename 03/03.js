"use strict"
     var start=document.querySelector("#start");
	 var stonelist=document.querySelector("#stonelist");
	 var submarine=document.querySelector("#submarine");//获取潜水艇元素
	 var score = document.querySelector("#scoring");
	 var createStoneTimer = null;
	 var isDel = false;
	 var gameover = document.querySelector("#gameover");
	 var speed = 3;

	 start.onclick = function(){
		 this.parentNode.style.display="none";//隐藏开始按钮
		 submarine.style.display="block";//出现潜水艇
		 submarine.speed = 2;
		 document.oncontextmenu = function(){
				return false;
			}



		 //碰撞检测
		 var pz_timer = setInterval(function(){
		 	var stonerow = document.querySelectorAll(".stonerow");
	         for(var i = 0;i < stonerow.length;i++){
				 var isCrash = Crash(submarine,stonerow[i]);
				 console.log(stonerow[i].offsetLeft);
				 if(isCrash == true){
					 //游戏结束
					 clearInterval(submarine.moveTimer);//清除sub移动
					 clearInterval(createStoneTimer);//清除管道创建
					 clearInterval(pz_timer);//清除管道创建
					 isDel = true;
					 gameover.style.display = "block";//出现游戏结束画面
					 game_over()
				 }
			 }
		 },10)
		 


		 
		 document.onkeydown = function(e){
		 	if(e.keyCode==38){
		 		speed++;
		 		if(speed>=40){
		 			speed = 40
		 		}
		 	}else if(e.keyCode==40){
		 		speed--;
		 		if(speed<=0){
		 			speed = 0
		 		}
		 	}
		 	console.log(speed)
		 }


		 document.onmousedown = function(e){
		 	if(isDel){
		 		return;
		 	}
			 var ev = e||window.event;
			 ev.preventDefault();//防止鼠标点击时出现默认事件
			 //console.log(submarine.speed);

			 submarine.moveTimer = setInterval(function(){
				 //碰到顶部或底部失败
				 if(submarine.offsetTop <= 0){
					submarine.style.top = "0px";
					clearInterval(submarine.moveTimer);
					clearInterval(createStoneTimer);
					//clearInterval(stone.moveTimer);
					isDel = true;
					gameover.style.display = "block";
					game_over()
				 }else if(submarine.offsetTop >= 534){
					submarine.style.top = "534px";
					clearInterval(submarine.moveTimer);
					clearInterval(createStoneTimer);
					//clearInterval(stone.moveTimer);
					isDel = true;
					gameover.style.display = "block";
					game_over()
				 }
				//左键上移，右键下移
				if(e.button == 2){
					submarine.style.top = submarine.offsetTop+submarine.speed+"px";
				 }else if(e.button == 0){
					submarine.style.top = submarine.offsetTop-submarine.speed+"px";
				 }
				 
			 },5);
			
			 document.onmouseup = function(e){
				 clearInterval(submarine.moveTimer);
			 }
			 //submarine.speed +=5;
			 
			 //console.log(submarine.offsetTop);
			 //console.log(submarine.style.top);
		}


		function game_over(){
			document.onkeydown = function(e){
			 	if(e.keyCode==65){
			 		window.location.reload();
			 	}else if(e.keyCode==66){
			 		window.close();
			 	}
			}
		}
		 
		 
		 //创建管道,在点击开始按钮之前，通过循环计时器创建
		 function addZhuzi(){
			 var stone = document.createElement("li");
             var upHeight = Math.random()*350;//随机生成管道高度
			 var downHeight = 600 - upHeight - (Math.random()*100+80);
			 stone.innerHTML='<div class = "stoneup stonerow" style = "height:'+upHeight+'px"><img src = "stone1.png"></div><div class = "stonedown stonerow" style = "height:'+downHeight+'px"><img src = "stone.png"></div>';
			 stone.l=800;
			 stone.score = true;
			 stone.moveTimer = setInterval(function(){
				 //每隔28ms向左移动3px
				 stone.l -= speed;
				 stone.style.left = stone.l + "px";
				 //碰壁时停止移动，停止产生
				 if(isDel == true){
					clearInterval(stone.moveTimer);
				 }
				 //移出画面外时清除管道，停止移动
				 if(stone.l<=-93){
					 stonelist.removeChild(stone);
					 clearInterval(stone.moveTimer);
				 }else if(stone.l<=240){//得分
					 if(stone.score == true){
						score.innerHTML = parseInt(score.innerHTML)+1;
					 }
                     stone.score = false;//防止因为结束时卡在那里造成不断得分
				 }
			 },28)
			 stonelist.appendChild(stone);

			 if(isDel == true){
				clearInterval(stone.moveTimer);
				clearInterval(createStoneTimer);
			 }else{
			 	setTimeout(function(){
				 	addZhuzi()
				 },8100/speed)
			 }
			 
		 }
		 addZhuzi()

		 //碰撞检测 获取潜水艇和管道的位置 obj1:潜水艇 obj2：障碍物
		 function Crash(obj1,obj2){
             var obj1Left = obj1.offsetLeft;
			 var obj1Right = obj1Left+obj1.offsetWidth;
			 var obj1Top = obj1.offsetTop;
			 var obj1Bottom = obj1Top+obj1.offsetHeight;


			 var obj2Left = obj2.parentNode.offsetLeft;
			 var obj2Right = obj2Left+obj2.offsetWidth;


			 var obj2Top = obj2.offsetTop;
			 var obj2Bottom = obj2Top+obj2.offsetHeight;

			 console.log(obj2.parentNode.offsetLeft);
			 console.log(obj2.offsetLeft);
			 if(obj1Right>=obj2Left && obj1Left<=obj2Right && obj1Bottom>=obj2Top && obj1Top<=obj2Bottom){
				 //碰撞发生 游戏结束
				 return true;
			 }else{
				 return false;}//未发生碰撞 游戏继续
		 }
	 }
