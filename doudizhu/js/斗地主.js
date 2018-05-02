
//1.初始化牌堆为54张牌
for(var i=0;i<54;i++){
	$('.all_poker').append('<li class="back" style="top:-'+i+'px"></li>');
}

//2.创建扑克牌的数组
var all_poker_data=['14_0','15_0'];
for(var i=1;i<14;i++){
	for(var j=0;j<4;j++){
		//利用循环增加数组
		all_poker_data.push(i+'_'+j);
	}
}
//自己设定的一副牌组方便调试
// var all_poker_data=['13_1','13_2','13_3','1_1','5_1','9_1','1_2','5_2','9_2','1_3','5_3','9_3','1_0','5_0','9_0','2_1','6_1','10_1','2_2','6_2','10_2','2_3','6_3','10_3','2_0','6_0','10_0','3_1','7_1','11_1','3_2','7_2','11_2','3_3','7_3','11_3','3_0','7_0','11_0','4_1','8_1','12_1','4_2','8_2','12_2','4_3','8_3','12_3','4_0','8_0','12_0','14_0','15_0','13_0'];

//3.初始化玩家的数据由于玩家数据可能有很多不同方向的内容，所以我们使用对象数据类型进行保存
var all_play = [];
//role:玩家角色
all_play.push({name:'章鱼哥',integtal:1000,role:0,poker:[]});
all_play.push({name:'海绵宝宝',integtal:1000,role:0,poker:[]});
all_play.push({name:'派大星',integtal:1000,role:0,poker:[]});

var ready_poker = {poker:[],type:0,max:0};//玩家准备出的牌的内容数据，poker选牌具体数据，type是牌的类型，max是该牌的	用于判断大小的判断值

var game_status = {boss:-1,player:-1,cancle:0};//初始化当前游戏状态

var desktop_poker = {poker:[],type:0,max:0};//初始化桌面上的牌型

var multiple =10;//初始化倍数值
var lowScore =15;//初始化低分值	
	
//玩家准备出牌
//绑定选择事件
	
	$('.play_1').on('click','li',function(){
		//把现在的数据获取到
		var right = $(this).css('right');

		if(right != '-10px'){
			$(this).css({right:'-10px'});
			$('body').append('<audio src="./music/keyMusic.ogg" autoplay="autoplay"></audio>')
			ready_poker.poker.push($(this).attr('data-value'));
			console.log(ready_poker.poker);
		
		}else{
			$('body').append('<audio src="./music/keyMusic.ogg" autoplay="autoplay"></audio>')
			$(this).css({right:'0px'});
			//把每一个点击牌面的值读取
			var index = ready_poker.poker.indexOf($(this).attr('data-vaule'));
			// 读取后的值放进ready_poker的数组里
			ready_poker.poker.splice(index,1);
			console.log(ready_poker.poker);
		}
	});	


	$('.play_2').on('click','li',function(){		
		//把现在的数据获取到
		var top = $(this).css('top');

		if(top != '-10px'){
			$('body').append('<audio src="./music/keyMusic.ogg" autoplay="autoplay"></audio>')
			$(this).css({top:'-10px'});
		ready_poker.poker.push($(this).attr('data-value'));
		}else{
			$('body').append('<audio src="./music/keyMusic.ogg" autoplay="autoplay"></audio>')
			$(this).css({top:'0px'});
			//把每一个点击牌面的值读取
			var index = ready_poker.poker.indexOf($(this).attr('data-vaule'));
			// 读取后的值放进ready_poker的数组里
			ready_poker.poker.splice(index,1);
			console.log(ready_poker.poker);
		}
	});

	$('.play_3').on('click','li',function(){
		
		//把现在的数据获取到
		var left = $(this).css('left');

		if(left != '-10px'){
			$('body').append('<audio src="./music/keyMusic.ogg" autoplay="autoplay"></audio>')
			$(this).css({left:'-10px'});
		ready_poker.poker.push($(this).attr('data-value'));
		}else{
			$('body').append('<audio src="./music/keyMusic.ogg" autoplay="autoplay"></audio>')
			$(this).css({left:'0px'});
			//把每一个点击牌面的值读取
			var index = ready_poker.poker.indexOf($(this).attr('data-vaule'));
			// 读取后的值放进ready_poker的数组里
			ready_poker.poker.splice(index,1);
			console.log(ready_poker.poker);
		}
	});


//生成html牌面
function  makePoker(poker){
	//把参数poker里的值有‘_’进行分成2个数组
	var poker_arr = poker.split('_');
	return '<li style="width: 125px; height: 175px; background-image: url(./images/'+poker_arr[0]+'-'+poker_arr[1]+'.png) ;background-size:100% 100% ;" data-value="'+poker+'"></li>';
}

	// 时钟函数
	var int = null;
	function clock(role,second){
		//每次调用时间的时候清除定时器
		clearInterval(int);
		//先隐藏时间
		$('.clock1,.clock2,.clock3').hide();
		//然后显到那个玩家出牌的时间
		$('.clock1,.clock2,.clock3').eq(role).show();
		$('.clock1,.clock2,.clock3').eq(role).find('p').text(second)
		int = setInterval(function(){
			$('.clock1,.clock2,.clock3').eq(role).find('p').text(second)
			second--;
			//如果小于9秒，调整位置
			if(second<9){
			$('.clock1,.clock2,.clock3').eq(role).find('p').css({left:24+'px'});
		}
		//如果时间到0秒，清除定时器
			if(second < 0){
				clearInterval(int);			
			}
			//如果时间还剩三秒，声音催促快点出牌
			if(second==3){
			$('body').append('<audio src="./music/快点.ogg" autoplay="autoplay"></audio>')
			}
		},1000);

	}	

	
//创建一个显示地主倍数和底分的函数
function score(mul,low){
	$('.score').show();
	//倍数显示
	$('.multiple').text(mul);
	//底分显示
	$('.lowScore').text(low);
}
//创建一个出现地主和农民标识的方法
function headPortrait(role){
	var peasantA,peasantB;//声明农明
	//抢到地主地主显示的地主头像
	if(role==0){
		$('.role').eq(role).append().css({width:'100px',height:'100px',position:'absolute',top:'360px',right:'-50px',background:'url(./images/地主.png) no-repeat'});
			peasantA = 1;
			peasantB = 2;
		}else if(role==1){
		$('.role').eq(role).append().css({width:'100px',height:'100px',position:'absolute',top:'70px',right:'333px',background:'url(./images/地主.png) no-repeat'});
			peasantA = 0;
			peasantB = 2;
		}else if(role==2){
		$('.role').eq(role).append().css({width:'100px',height:'100px',position:'absolute',top:'360px',right:'290px',background:'url(./images/地主.png) no-repeat'});
			peasantA = 0;
			peasantB = 1;
		}	
		//其他的为农民头像
	if(peasantA==0){
		$('.role').eq(peasantA).append().css({width:'100px',height:'100px',position:'absolute',top:'360px',right:'-50px',background:'url(./images/农民_1.png) no-repeat'});
		}else if(peasantA==1){
		$('.role').eq(peasantA).append().css({width:'100px',height:'100px',position:'absolute',top:'70px',right:'333px',background:'url(./images/农民_1.png) no-repeat'});
		}else if(peasantA==2){
		$('.role').eq(peasantA).append().css({width:'100px',height:'100px',position:'absolute',top:'360px',right:'290px',background:'url(./images/农民_1.png) no-repeat'});
		}
		//其他为农民头像
	if(peasantB==0){
		$('.role').eq(peasantB).append().css({width:'100px',height:'100px',position:'absolute',top:'360px',right:'-50px',background:'url(./images/农民_2.png) no-repeat'});
		}else if(peasantB==1){
		$('.role').eq(peasantB).append().css({width:'100px',height:'100px',position:'absolute',top:'70px',right:'333px',background:'url(./images/农民_2.png) no-repeat'});
		}else if(peasantB==2){
		$('.role').eq(peasantB).append().css({width:'100px',height:'100px',position:'absolute',top:'360px',right:'290px',background:'url(./images/农民_2.png) no-repeat'});
		}		
}
//创建一个排序的方法扑克牌整理数据的方法（从大到小）
function sortPoker(poker){
	poker = poker.sort(function(x,y){
		var x_arr = x.split('_');
		var y_arr = y.split('_');

		if(x_arr[0] != y_arr[0]){
			//点数不相同，使用点数进行排序
			return y_arr[0] - x_arr[0];
		}else{
			//点数相同，进行花色排序
			return y_arr[1] - x_arr[1];
		}
	});
	return poker;
}
//定义是否为叫地主还是抢地主
	select = false;
	//抢地主流程的方法
	function getBoss(start,cancle,time){

	cancle = cancle || 1;
	time = time || 1;
	if(cancle > 3){
		alert('抢地主啊扑街');
		var url = window.location.href
		window.location.href = url;
		return false;
	}

	if(start == undefined){
		start =Math.round(Math.random()*2);
	}
	var value = 0;
	//先把所以玩家叫地主的组件隐藏
	$('.getBoss').hide();
	//把叫地主的人的页面组件显示
	// console.log(start);
	$('.getBoss').eq(start).show();

	//头像显示
	$('#display1').css('display','block');
	$('#display2').css('display','block');
	$('#display3').css('display','block');
	//时钟函数，用来计时
	 clock(start,30);
	 //显示倍数和低分组件
	score(multiple,lowScore);
	//显示每个玩家的积分
	$('.everyIntegtal').show();
	$('.figure').eq(0).text(all_play[0].integtal);
	$('.figure').eq(1).text(all_play[1].integtal);
	$('.figure').eq(2).text(all_play[2].integtal);
	//调每个积分出现的位置
	$('.everyIntegtal').eq(0).css({left:0+'px',top:275+'px'});
	$('.everyIntegtal').eq(1).css({right:135+'px',top:340+'px'});
	$('.everyIntegtal').eq(2).css({right:20+'px',top:275+'px'});
		//通过判断点击抢地主和不抢判断谁是地主
		if(time==2 && cancle==3 || time==5 || time==4 && cancle==2 || time==3 && cancle==3){
		//通过绑定点击到那个玩家抢到地主的值来判断谁做地主
		var value = Number($('.getBoss').eq(inStart).find('input').eq(0).attr('data-value'));
		all_play[value-1].role = 1;
		game_status.boss = value -1;
		game_status.player = value -1;
		all_play[game_status.boss].poker = all_play[game_status.boss].poker.concat(all_poker_data);		
		openThreeBoss(game_status.boss);
		//地主和农民的头像判断值
		 headPortrait(inStart);
		 //把每个玩家的牌排序好
		 for(var i=0;i<3;i++){
			rearRangement(i);
		}
		//清空数据
		ready_poker.poker = [];
		//抢完地主后清除所有抢地主的按键
		$('.getBoss').hide();
		//抢完地主后清除所有时间的按键
		$('.clock1,.clock2,.clock3').hide();
	}

	
	//当点击次数是第二次以上时，叫地主动态改变成抢地主
	if(time==2 || time==3 || time==4 || time==5){
			$('.getBoss').eq(start).find('input').detach();
			//分数函数，用来计算分值	 
			 score(multiple,lowScore);
			 //每抢一次地主，底分翻倍
			 lowScore*= 2
		if(start==0){
			$('.getBoss').eq(start).append('<input type="button" value="抢地主" data-value="1"  class="rob_boss">');
			$('.getBoss').eq(start).append('<input type="button" value="不抢"  data-value="1" class="rob_boss">' ); 			
		}else if(start==1){
			$('.getBoss').eq(start).append('<input type="button" value="抢地主" data-value="2" class="rob_boss">');
			$('.getBoss').eq(start).append('<input type="button" value="不抢"  data-value="2" class="rob_boss">'); 
		}else if(start==2){
			$('.getBoss').eq(start).append('<input type="button" value="抢地主" data-value="3" class="rob_boss">');
			$('.getBoss').eq(start).append('<input type="button" value="不抢"  data-value="3" class="rob_boss">');
			}		
		}	

	
	//绑定叫地主的方法按钮
	$('.getBoss').eq(start).find('input').eq(0).on('click',(function(){
				//设置点击第一次叫地主的声音
		if(!select){
			$('body').append('<audio src="./music/叫地主.ogg" autoplay="autoplay" class="jiaodizhu"></audio>');
			select = true; 
		}else{
		//设置第二次点击叫地主变成抢地主的声音
				timer =Math.round(Math.random()*2);	
			$('body').append('<audio src="./music/抢地主_'+timer+'.ogg" autoplay="autoplay" class="jiaodizhu"></audio>');
		}
	 
			//inStart是保存点击地主最后的值，用来反馈给上面
			inStart = start;
			//点击要地主后传递给下一个玩家
			start=(++start>2)? 0:start;
			//time是记录点击抢地主的次数
			getBoss(start,cancle,time+1);

			//抢地主时清空准备出的牌
			ready_poker.poker = [];
	

	}));
	//绑定不叫地主按钮的方法
	$('.getBoss').eq(start).find('input').eq(1).unbind().on('click',(function(){
	//select一开始是false，要点击一次叫地主后才是true
	if(!select){
	$('body').append('<audio src="./music/不叫.ogg" autoplay="autoplay"></audio>');
	}else{
	$('body').append('<audio src="./music/不抢.ogg" autoplay="autoplay"></audio>');
	}		
	//start自加一，当大于2时，则为0，否则自加一
			start=(++start>2)? 0:start;
			//调用本身
			getBoss(start,cancle+1,time);		
	}));


};
		//把剩下的三张牌翻开
	function openThreeBoss(boss){		
		//把剩下的三张牌移出
		$('.all_poker li').remove();
		//重新生成三张牌
		for(var i=0;i<3;i++){
			var temp_li = makePoker(all_poker_data[i]);	
			$('.all_poker').append(temp_li);

			$('.play_'+(boss+1)).append(temp_li);
			$('.play_'+(boss+1)+' li:last').css({left:288+18*(i+1)+'px'});
		}
		//地主牌上移的动画效果
	$('.all_poker li').eq(0).animate({left:'-100px'},1000).animate({top:'-50px'},1000).css({width:'75px',height:'105px'});
	$('.all_poker li').eq(1).animate({left:'100px'},1000).animate({top:'-50px'},1000).css({width:'75px',height:'105px'});
	$('.all_poker li').eq(2).animate({left:'-0px'},1000).animate({top:'-50px'},1000).css({width:'75px',height:'105px'});


	//由于地主牌更新了牌，所以需要重新排序一次，进行一次排序动画
	setTimeout(function(){
		//把地主牌的牌面改成牌背
		for(var i=0;i<54;i++){
			$('.play_'+(boss+1)+' li').eq(i).css({background:''}).attr('class','back').css('transform','rotateZ(360deg)').css('transition',i/17+'s');
		}
		//加入三张牌后重新排序
		all_play[boss].poker = sortPoker(all_play[boss].poker);

		setTimeout(function(){
			//调用排序好卡牌的函数
		rearRangement(boss);
		//开始斗地主
			startGame();
		},1000);
	},1000);
	}
		


		
	//开始斗地主的方法
	function startGame(){
	
	$('.action').hide();
	$('.action').eq(game_status.player).show();
	clock(game_status.player,30);
	//绑定出牌事件
	$('.action').eq(game_status.player).find('input').eq(0).unbind('click').on('click',(function(){
		//排序好准备出牌
		ready_poker.poker = sortPoker(ready_poker.poker);
		
		//判断牌型的方法 
/*		checkPosers(ready_poker.poker);
		console.log(checkPosers(ready_poker.poker));
		console.log(pokerVs());
		console.log(desktop_poker.max);
		console.log(desktop_poker.type);*/
	 
		// 调用一个函数专门用来判断是否能出牌
		if(!checkPosers(ready_poker.poker)){
			alert('你出的牌不符合规则，请重新出来');
			//重新调整卡牌的位置
			rearRangement(game_status.player);
			//清空准备出的牌
			ready_poker.poker = [];
			return false;
		}else if(!pokerVs()){
			alert('你打不过人家,快收回来~~~');
			//重新调整卡牌的位置	
			rearRangement(game_status.player);
			//清空准备出的牌
			ready_poker.poker = [];
			return false;
		}else{
			console.log(ready_poker.poker);
			// 出牌的完整流程
			// 把桌面的牌换成玩家选择的牌
			$('.desk_poker li').remove() 
			//将出牌的类型判断值赋值给桌面的类型和判断值
			desktop_poker.type = ready_poker.type;
			desktop_poker.max = ready_poker.max;
			//声明有个桌面数组
			desktop_poker.poker = [];

			// 出后的牌的牌数据赋值给桌面数组
			for(var i=0;i<ready_poker.poker.length;i++){
				desktop_poker.poker.push(ready_poker.poker[i]);

				// 玩家出牌后把玩家牌中的数据找到存进index里
				var index = all_play[game_status.player].poker.indexOf(ready_poker.poker[i]);
				//把出牌的数据移出
				all_play[game_status.player].poker.splice(index,1);
				//把出牌的html的牌移出
	        $('.play_'+(game_status.player+1)+ ' li').eq(index).remove()
	        //出牌的声音和效果的函数
					music();
	        	//牌打出后重新排序一下
	        	var temp_li = makePoker(desktop_poker.poker[i]);
	        	//添加到html里
	        $('.desk_poker').append(temp_li);
	        $('.desk_poker li:last').css({left:20*i+'px'});


	         //玩家的牌组需要出的长度，出现html5的位置调整成居中
	        	if(ready_poker.poker.length == 20){
	        		$('.desk_poker').css({left:35+'%'});
	        	}else if(ready_poker.poker.length >= 15){
	        		$('.desk_poker').css({left:37+'%'});
	        	}else if(ready_poker.poker.length >= 10){
	        		$('.desk_poker').css({left:39+'%'});
	        	}else if(ready_poker.poker.length >= 5){
	        		$('.desk_poker').css({left:41+'%'});
	        	}else if(ready_poker.poker.length >= 3){
	        		$('.desk_poker').css({left:44+'%'});
	        	}else if(ready_poker.poker.length >= 2){
	        		$('.desk_poker').css({left:45+'%'});
	        	}else if(ready_poker.poker.length >= 1){
	        		$('.desk_poker').css({left:46+'%'});
	        	}
			}
			// 玩家出牌后出牌数据初始化

			// 把出牌的玩家牌组重新生成
	   		 $('.play_'+(game_status.player+1)+ ' li').remove();
			//循环里面每个值，传到makepoker
			for(var i=0;i<all_play[game_status.player].poker.length;i++){
				var temp_li = makePoker(all_play[game_status.player].poker[i]);

				//得到返回值，添加到html中
				 $('.play_'+(game_status.player+1)).append(temp_li);

				//调整位置
				if(game_status.player==1){
					$('.play_'+(game_status.player+1)+' li:last').css({left:18*i+'px'});
				}else{
					$('.play_'+(game_status.player+1)+' li:last').css({top:20*i+'px'});							
				}
			}
			//当遇到炸弹是倍数加倍
			if(desktop_poker.type==999 || desktop_poker.type==110){
				score(multiple*=2,lowScore);
			}
			//当牌的长度为0，代表你赢了
			if(all_play[game_status.player].poker.length == 0){
				//判断为地主
					if(all_play[game_status.player].role==1){
				setTimeout(function(){
						alert('你赢了');
						// 添加音效和效果
						$('#bgm').remove();
						$('body').append('<audio src="./music/Win.ogg" autoplay="autoplay"></audio>')
						$('<div class="win"></div>').appendTo('body').css({width:'500px',height:'500px',position:'absolute',top:'29%',left:'36%',background:'url(./images/地主-win.png) no-repeat'});
						// console.log(game_status.boss);
						// 积分数据显示
						$('.victory').show();

						//计算打完地主后各个玩家的积分(地主的)
						if(game_status.boss==0){
							//显示名字和每个玩家获取到的积分
							$('.name').find('div').eq(0).text(all_play[0].name);
							$('.name').find('div').eq(1).text(all_play[1].name);
							$('.name').find('div').eq(2).text(all_play[2].name);

							integtal_A = all_play[0].integtal + multiple*lowScore*2;
							integtal_B = all_play[1].integtal - multiple*lowScore;
							integtal_C = all_play[2].integtal - multiple*lowScore;

							$('.integtal').find('div').eq(0).text(integtal_A);
							$('.integtal').find('div').eq(1).text(integtal_B);
							$('.integtal').find('div').eq(2).text(integtal_C);

						}else if(game_status.boss==1){

							$('.name').find('div').eq(0).text(all_play[0].name);
							$('.name').find('div').eq(1).text(all_play[1].name);
							$('.name').find('div').eq(2).text(all_play[2].name);

							integtal_A = all_play[1].integtal + multiple*lowScore*2;
							integtal_B = all_play[0].integtal - multiple*lowScore;
							integtal_C = all_play[2].integtal - multiple*lowScore;

							$('.integtal').find('div').eq(1).text(integtal_A);
							$('.integtal').find('div').eq(0).text(integtal_B);
							$('.integtal').find('div').eq(2).text(integtal_C);

						}else if(game_status.boss==2){

							$('.name').find('div').eq(0).text(all_play[0].name);
							$('.name').find('div').eq(1).text(all_play[1].name);
							$('.name').find('div').eq(2).text(all_play[2].name);

							integtal_A = all_play[2].integtal + multiple*lowScore*2;
							integtal_B = all_play[1].integtal - multiple*lowScore;
							integtal_C = all_play[0].integtal - multiple*lowScore;

							$('.integtal').find('div').eq(2).text(integtal_A);
							$('.integtal').find('div').eq(1).text(integtal_B);
							$('.integtal').find('div').eq(0).text(integtal_C);
						}
						return false;
					},500);
				}else{
					setTimeout(function(){
						alert('你赢了');
						$('#bgm').remove();
						$('body').append('<audio src="./music/Win.ogg" autoplay="autoplay"></audio>')
						$('<div class="win"></div>').appendTo('body').css({width:'500px',height:'500px',position:'absolute',top:'29%',left:'36%',background:'url(./images/农民-win.png) no-repeat'});
						$('.victory').show();
						$('.victory').css({background:'url(./images/农民胜利.png)'})
						//计算打完地主后各个玩家的积分(农民的)
						if(game_status.boss==0){

							$('.name').find('div').eq(0).text(all_play[0].name);
							$('.name').find('div').eq(1).text(all_play[1].name);
							$('.name').find('div').eq(2).text(all_play[2].name);

							integtal_A = all_play[0].integtal - multiple*lowScore*2;
							integtal_B = all_play[1].integtal + multiple*lowScore;
							integtal_C = all_play[2].integtal + multiple*lowScore;

							$('.integtal').find('div').eq(0).text(integtal_A);
							$('.integtal').find('div').eq(1).text(integtal_B);
							$('.integtal').find('div').eq(2).text(integtal_C);

						}else if(game_status.boss==1){

							$('.name').find('div').eq(0).text(all_play[0].name);
							$('.name').find('div').eq(1).text(all_play[1].name);
							$('.name').find('div').eq(2).text(all_play[2].name);

							integtal_A = all_play[1].integtal - multiple*lowScore*2;
							integtal_B = all_play[0].integtal + multiple*lowScore;
							integtal_C = all_play[2].integtal + multiple*lowScore;

							$('.integtal').find('div').eq(1).text(integtal_A);
							$('.integtal').find('div').eq(0).text(integtal_B);
							$('.integtal').find('div').eq(2).text(integtal_C);

						}else if(game_status.boss==2){

							$('.name').find('div').eq(0).text(all_play[0].name);
							$('.name').find('div').eq(1).text(all_play[1].name);
							$('.name').find('div').eq(2).text(all_play[2].name);

							integtal_A = all_play[2].integtal - multiple*lowScore*2;
							integtal_B = all_play[1].integtal + multiple*lowScore;
							integtal_C = all_play[0].integtal + multiple*lowScore;

							$('.integtal').find('div').eq(2).text(integtal_A);
							$('.integtal').find('div').eq(1).text(integtal_B);
							$('.integtal').find('div').eq(0).text(integtal_C);
						}
						return false;
					},500);
				}
			}

			//当手牌剩下2张时提醒
			if(all_play[game_status.player].poker.length == 2){
		switch(game_status.player){
			case 0:
				setTimeout(function(){
					$('body').append('<audio src="./music/剩2张.ogg" autoplay="autoplay"></audio>');
					$('body').append('<audio src="./music/警报.ogg" autoplay="autoplay"></audio>');
				$('.alarm').eq(0).append().css({width:'50px',height:'50px',position:'absolute',top:'285px',right:'0px',background:'url(./images/警报.gif) '});
				},500);
				setTimeout(function(){
					$('.alarm').remove();
				},3000)
			break;
			case 1:
				setTimeout(function(){
					$('body').append('<audio src="./music/剩2张.ogg" autoplay="autoplay"></audio>');
					$('body').append('<audio src="./music/警报.ogg" autoplay="autoplay"></audio>');
				$('.alarm').eq(1).append().css({width:'50px',height:'50px',position:'absolute',top:'90px',right:'540px',background:'url(./images/警报.gif) '});
				},500);
				setTimeout(function(){
					$('.alarm').remove();
				},3000)
			break;
			case 2:
				setTimeout(function(){
					$('body').append('<audio src="./music/剩2张.ogg" autoplay="autoplay"></audio>');
					$('body').append('<audio src="./music/警报.ogg" autoplay="autoplay"></audio>');
			$('.alarm').eq(2).append().css({width:'50px',height:'50px',position:'absolute',top:'276px',right:'308px',background:'url(./images/警报.gif)'});
				},500);
				setTimeout(function(){
					$('.alarm').remove();
				},3000)
			break;

			setTimeout(function(){
					$('.alarm').remove();
				},3000)
			}
		}
			//出完牌后，准备出牌的数据清空和类型和判断值清空
			ready_poker = {poker:[],type:0,max:0};
			//出牌时不要的次数清0
			game_status.cancle = 0;

			game_status.player=(++game_status.player>2)? 0:game_status.player;	
			// 自己调用自己
			startGame();
		}
		
	}));

	//绑定不出牌事件
	$('.action').eq(game_status.player).find('input').eq(1).unbind('click').on('click',(function(){
		//若桌面没牌
		if(desktop_poker.type == 0){
			alert('选择一种牌丢出去');
			// 重新排序好卡牌
			rearRangement(game_status.player);
			return false;
		}else{
			//随机给一个不要的声音
				timer =Math.round(Math.random()*3);
			$('body').append('<audio src="./music/不要_'+timer+'.ogg" autoplay="autoplay"></audio>');
			// 每不出一次就取消次数加1
			game_status.cancle +=1;

			// 当取消次数累积到2时，清空桌面的牌
			if(game_status.cancle == 2){
				game_status.cancle=0;
				ready_poker = {poker:[],type:0,max:0};
				desktop_poker.poker = [];
				desktop_poker.type = 0;
				$('.desk_poker li').remove();
			}
			// 重新排序好卡牌
			rearRangement(game_status.player);
			//清空准备出的牌
			ready_poker.poker = [];
			game_status.player=(++game_status.player>2)? 0:game_status.player;	
		startGame();
		}	
	}));
	}
		function rearRangement(role){
			//重新排序好卡牌
				 $('.play_'+(role+1)+' li').remove();
				for(var i=0;i<all_play[role].poker.length;i++){
					var temp_li = makePoker(all_play[role].poker[i]);
					$('.play_'+(role+1)).append(temp_li);
					if(role==1){
						$('.play_'+(role+1)+' li:last').css({left:18*i+'px'});
					}else{
						$('.play_'+(role+1)+' li:last').css({top:20*i+'px'});							
					}	
				}
				
		} 

	// 判断牌型的方法
	/*
	牌型代号说明：
	0      桌面没牌
	0  		无效牌型
	1 		单张
	2 		对子（王炸）
	3 		三张
	4		三带一
	5 		三带二
	6     	四带二
	8		四带二对
	222 	连对
	123 	飞机
	666		顺子
	999 	普通炸弹
	110 	王炸
	*/
	// 牌型对决的方法
		function pokerVs(){
			// 桌面上没有牌，任何牌型都可以出
			console.log(desktop_poker.type);
			if(desktop_poker.type == 0){
				return true;
			}else if(ready_poker.type == 110){//出牌的是王炸可以直接出
				return true;
			}else if(desktop_poker.type !=999 && desktop_poker.type !=110 && ready_poker.type == 999){
				//桌面上的牌不是炸弹和王炸，那玩家的牌只要是炸弹就可以出
				return true;
			}else if(desktop_poker.type == ready_poker.type && ready_poker.poker.length == desktop_poker.poker.length && Number(ready_poker.max)>Number(desktop_poker.max)){
			//普通牌型大小的判断
				return true;
			}else{
				return false;
			}
		}


