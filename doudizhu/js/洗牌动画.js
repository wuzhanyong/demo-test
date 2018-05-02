
//定义一个点击数的值
	var click = 0;
//点击一次与以后多次效果不一样
$('body').on('click','.all_poker',function(){
	if(click <= 0){
		clearPoker();					
			$('body').append('<audio src="./music/洗牌.mp3" autoplay="autoplay"></audio>');
		setTimeout(function(){
			deal(0);//调用发牌的方法
			$('body').append('<audio src="./music/发牌.mp3" autoplay="autoplay"></audio>');
			$('#bgm').append('<audio src="./music/欢乐斗地主背景音乐.mp3" autoplay="autoplay" loop="loop"></audio>');
		},24000);
		
		setTimeout(function(){
			getBoss();
			},30000);
			click++;
	}else{
		return false;
	}
});




//绑定洗牌动画
function clearPoker(){
	all_poker_data.sort(function(){
	//把顺序打乱利用数学的随机数和数组的sort的顺序排列
		return 0.5-Math.random();
	});
	//把牌堆开始的状态取出来赋值给all_poker
	var all_poker = $('.mid_top').html();
	//将牌堆移除
	$('.all_poker').remove();

	//用js动态创建三个牌堆
	var $ul = $('<ul />').attr('class','all_poker');
	for(var j=0;j<54;j++){
		var $li = $('<li />').attr('class','back');
		//在$ul后面添加$li
		$ul.append($li);
	}
	$('.mid_top').append($ul);

	// 洗牌动画
	for(var i=0;i<54;i++){
		// 左右洗牌
		$('.all_poker li').delay(20).eq(i).animate({left:-530+20*i+'px',top:0+'px'},200).delay(20).animate({top:200+'px'},200).delay(20).animate({left:0+'px'},200).delay(20).animate({left:0+'px'},200);
	};

	// 分成三堆层叠的牌面
	setTimeout(function(){
		for(var i=0;i<9;i++){	
			$('.all_poker li').eq(53-i).animate({top:10+13*i+'px'},800).delay(20).animate({left:400+10*i+'px'},800);
			$('.all_poker li').eq(44-i).animate({top:10+13*i+'px'},800).delay(20).animate({left:400-10*i+'px'},800);
			$('.all_poker li').eq(35-i).animate({top:10+13*i+'px'},800).delay(20).animate({left:-400-10*i+'px'},800);
			$('.all_poker li').eq(26-i).animate({top:10+13*i+'px'},800).delay(20).animate({left:-400+10*i+'px'},800);
			$('.all_poker li').eq(17-i).animate({top:10+13*i+'px'},800).delay(20).animate({left:10*i+'px'},800);
			$('.all_poker li').eq(8-i).animate({top:10+13*i+'px'},800).delay(20).animate({left:-10*i+'px'},800);
		}	
	},1000);

	// 三堆层叠的牌面集和成一堆牌
	setTimeout(function(){
		for(var i=0;i<18;i++){	
			$('.all_poker li').delay(20).eq(53-i).animate({left:0+'px',top:0+'px'},150);
			$('.all_poker li').delay(20).eq(35-i).animate({left:0+'px',top:0+'px'},150);
			$('.all_poker li').delay(20).eq(17-i).animate({left:0+'px',top:0+'px'},150);
		}
	},2000);

	// 三堆层叠的牌面集和成一堆牌之后生成一副牌
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').eq(i).animate({left:0+'px',top:-i+'px'},0).css('transition','0.5s');
		}
	},5200);

	// 在原地旋转形成一个圆
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').eq(i).delay(10*i).animate({top:0+'px'},150).css('transform', 'rotateZ('+6.8*i+'deg)').css('transition','0.9s');
		}
	},5900);

	// 形成一个有棱角规则的牌面
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').eq(i).delay(10*i).css('transform', 'translateY(200px) rotateZ('+45*i+'deg) translateX(63px)').css('transition','1.5s');
		}
	},7450);

	// 在有棱角规则的牌面基础上旋转成正八边形
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').eq(i).delay(10*i).css('transform', 'translateY(200px) rotateZ('+45*i+'deg) translateX(126px)').css('transition','1.5s');
		}
	},7450);

	// 形成一个空心的圆，纸牌的下面部分显示出来，上面部分挡住
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').eq(i).delay(10*i).css('transform', 'translateY(200px) rotateZ('+6.8*i+'deg) translateX(-200px) perspective(500px)').css('transition','1.5s');
		}
	},9250);

	// 形成一个空心的圆，纸牌的上面部分显示出来，下面部分挡住
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').eq(i).delay(10*i).css('transform', 'translateY(200px) rotateZ('+6.8*i+'deg) translateX(200px)');
		}
	},11000);

	// 右下角旋转形成一个圆
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').css('transform-origin','right bottom');
			$('.all_poker li').eq(i).delay(i).css('transform', 'rotateZ('+6.8*i+'deg)');
		}
	},12500);

	// 以底部中点旋转形成一个圆
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').css('transform-origin','bottom center');
			$('.all_poker li').eq(i).delay(i).css('transform', 'rotateZ('+6.8*i+'deg)');
		}
	},14300);

	// 形成一个180度扇面向上的扇形
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').css('transform-origin','bottom center');
			$('.all_poker li').eq(i).delay(i).css('transform', 'rotateZ('+3.4*i+'deg)');
			$('.all_poker').css('transform', 'rotateZ(-90deg)').css('transition','1.5s');
		}
	},16000);

	// 在180度扇面向上的扇形基础上在原地形成一个圆
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').css('transform-origin','center center');
			$('.all_poker li').eq(i).delay(10*i).css('transform', 'rotateZ('+6.8*i+'deg)');
			$('.all_poker').css('transform', 'rotateZ(0deg)').css('transition','1.5s');
		}
	},18000);

	// 在圆的基础上形成一副牌
	setTimeout(function(){
		for(var i=0;i<54;i++){	
			$('.all_poker li').eq(i).delay(25*i).animate({left:0+'px',top:-i+'px'},2).css('transform','rotateZ('+0+'deg)');
		}
	},20000);

	// 动画结束后复原到起点
	setTimeout(function(){
		$('.mid_top').html(all_poker);
	},23000);

	};



	//发牌的方法
	function deal(number){
		//数越大，发牌时间越慢默认值12最好
		var i=12;	
		//发左边的牌
		$('.all_poker li:last').animate({left:'-515px',top:'-30px'},10);
		setTimeout(function(){
			//如果移除最后一张那么下一张就会变成这个牌堆的最后一张
			$('.all_poker li:last').remove();
			//把删除后的返回值，当做玩家1牌堆的插入值
				all_play[0].poker.push(all_poker_data.pop());

		var poker_html = makePoker(all_play[0].poker[all_play[0].poker.length-1]);

				$('.play_1').append(poker_html);
				$('.play_1 li:last').css({top:number*24+'px'});
				$('.play_1').css({top:'50px',left:'50px'});	
		},7*i);

//发中间的牌

setTimeout(function(){
	$('.all_poker li:last').animate({top:'570px'},10);

	setTimeout(function(){
		$('.all_poker li:last').remove();

		// 把牌堆中随后一张数据添加到玩家2的数据中，并删除掉该数据
		all_play[1].poker.push(all_poker_data.pop());

		// console.log(play_2.poker);
		var poker_html = makePoker(all_play[1].poker[all_play[1].poker.length-1]);

		$('.play_2').append(poker_html);
		$('.play_2 li:last').css({left:number*18+'px'});
		$('.play_2').css({left:-9*number+'px',top:'150px'});

	},7*i);

},8*i);

//发右边的牌
setTimeout(function(){
$('.all_poker li:last').animate({left:'515px',top:'-30px'},10);
setTimeout(function(){
	$('.all_poker li:last').remove();
	//把删除后的返回值，当做玩家3牌堆的插入值
	
	all_play[2].poker.push(all_poker_data.pop());

	var poker_html = makePoker(all_play[2].poker[all_play[2].poker.length-1]);

		$('.play_3').append(poker_html);
		$('.play_3 li:last').css({top:number*23+'px'});
		$('.play_3').css({top:'50px',right:'50px'});
	number++;
	if(number < 17){
		//利用返回的number实现17次的循环
		deal(number);
	}else{
		//准备一个排序的方法
		//把乱的数据传进去，返回排序好的数据
		all_play[0].poker = sortPoker(all_play[0].poker);
		all_play[1].poker = sortPoker(all_play[1].poker);
		all_play[2].poker = sortPoker(all_play[2].poker);
		// console.log(all_play[0].poker);
		// console.log(all_play[1].poker);
		// console.log(all_play[2].poker);
		// console.log(play_2.poker);
			setTimeout(function(){
				// 等一秒的时候，把玩家的牌变成背面
				// $('.play_2 li').attr('class','back').css({background:''});
				for(var i=0;i<54;i++){	
					$('.play_2 li').attr('class','back').eq(i).css({background:''}).css('transform','rotateZ(360deg)').css('transition',i/17+'s');
				}


			setTimeout(function(){
				//删除当前li
				$('.play_2 li').remove();
				//z循环里面每个值，传到makepoker
				for(var i=0;i<all_play[1].poker.length;i++){
					var temp_li = makePoker(all_play[1].poker[i]);

					//得到返回值，添加到html中
					$('.play_2').append(temp_li);

					//调整位置
					$('.play_2 li:last').css({left:i*18+'px'});
					}
				},1000);
			},1000);
			

			setTimeout(function(){
				// 等一秒的时候，把玩家的牌变成背面
				// $('.play_1 li').attr('class','back').css({background:''});
				for(var i=0;i<54;i++){	
					$('.play_1 li').attr('class','back').eq(i).css({background:''}).css('transform','rotateZ(360deg)').css('transition',i/17+'s');
				}


			setTimeout(function(){
				//删除当前li
				$('.play_1 li').remove();
				//z循环里面每个值，传到makepoker
				for(var i=0;i<all_play[0].poker.length;i++){
					var temp_li = makePoker(all_play[0].poker[i]);

					//得到返回值，添加到html中
					$('.play_1').append(temp_li);

					//调整位置
					$('.play_1 li:last').css({top:i*20+'px'});
					}
				},1000);
			},1000);


			setTimeout(function(){
				// 等一秒的时候，把玩家的牌变成背面
				// $('.play_3 li').attr('class','back').css({background:''});
				for(var i=0;i<54;i++){	
					$('.play_3 li').attr('class','back').eq(i).css({background:''}).css('transform','rotateZ(360deg)').css('transition',i/17+'s');
				}


			setTimeout(function(){
				//删除当前li
				$('.play_3 li').remove();
				//z循环里面每个值，传到makepoker
				for(var i=0;i<all_play[2].poker.length;i++){
					var temp_li = makePoker(all_play[2].poker[i]);

					//得到返回值，添加到html中
					$('.play_3').append(temp_li);

					//调整位置
					$('.play_3 li:last').css({top:i*20+'px'});
					}

				},1000);
			},1000);

		}
   },7*i);
 },12*i);
}
