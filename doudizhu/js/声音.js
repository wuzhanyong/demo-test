function music(){
if(desktop_poker.type==1){
	//单张
	if(desktop_poker.max==1){
		$('body').append('<audio src="./music/Leaflet_1.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==2){
		$('body').append('<audio src="./music/Leaflet_2.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==3){
		$('body').append('<audio src="./music/Leaflet_3.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==4){
		$('body').append('<audio src="./music/Leaflet_4.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==5){
		$('body').append('<audio src="./music/Leaflet_5.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==6){
		$('body').append('<audio src="./music/Leaflet_6.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==7){
		$('body').append('<audio src="./music/Leaflet_7.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==8){
		$('body').append('<audio src="./music/Leaflet_8.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==9){
		$('body').append('<audio src="./music/Leaflet_9.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==10){
		$('body').append('<audio src="./music/Leaflet_10.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==11){
		$('body').append('<audio src="./music/Leaflet_11.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==12){
		$('body').append('<audio src="./music/Leaflet_12.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==13){
		$('body').append('<audio src="./music/Leaflet_13.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==14 ){
		$('body').append('<audio src="./music/Leaflet_14.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==15 ){
		$('body').append('<audio src="./music/Leaflet_15.ogg" autoplay="autoplay"></audio>')
	}
}else if(desktop_poker.type==2){
	//对子
	if(desktop_poker.max==1){
		$('body').append('<audio src="./music/twins_1.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==2){
		$('body').append('<audio src="./music/twins_2.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==3){
		$('body').append('<audio src="./music/twins_3.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==4){
		$('body').append('<audio src="./music/twins_4.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==5){
		$('body').append('<audio src="./music/twins_5.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==6){
		$('body').append('<audio src="./music/twins_6.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==7){
		$('body').append('<audio src="./music/twins_7.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==8){
		$('body').append('<audio src="./music/twins_8.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==9){
		$('body').append('<audio src="./music/twins_9.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==10){
		$('body').append('<audio src="./music/twins_10.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==11){
		$('body').append('<audio src="./music/twins_11.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==12){
		$('body').append('<audio src="./music/twins_12.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==13){
		$('body').append('<audio src="./music/twins_13.ogg" autoplay="autoplay"></audio>')
	}
}else if(desktop_poker.type==3){
	//三张
	if(desktop_poker.max==1){
		$('body').append('<audio src="./music/three_1.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==2){
		$('body').append('<audio src="./music/three_2.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==3){
		$('body').append('<audio src="./music/three_3.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==4){
		$('body').append('<audio src="./music/three_4.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==5){
		$('body').append('<audio src="./music/three_5.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==6){
		$('body').append('<audio src="./music/three_6.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==7){
		$('body').append('<audio src="./music/three_7.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==8){
		$('body').append('<audio src="./music/three_8.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==9){
		$('body').append('<audio src="./music/three_9.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==10){
		$('body').append('<audio src="./music/three_10.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==11){
		$('body').append('<audio src="./music/three_11.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==12){
		$('body').append('<audio src="./music/three_12.ogg" autoplay="autoplay"></audio>')
	}else if(desktop_poker.max==13){
		$('body').append('<audio src="./music/three_13.ogg" autoplay="autoplay"></audio>')
	}
  }else if(desktop_poker.type==999){
		$('body').append('<audio src="./music/炸弹.ogg" autoplay="autoplay"></audio>')
				//炸弹
		setTimeout(function(){
			$('<div class="boom"></div>').appendTo('body').css({width:'580px',height:'580px',position:'absolute',top:'0%',left:'35%',background:'url(./images/炸弹.gif) no-repeat'});
			$('body').append('<audio src="./music/boom.ogg" autoplay="autoplay"></audio>'	)
		},1000)
		setTimeout(function(){
			$('.boom').remove();
		},3000)

  }else if(desktop_poker.type==4){
		$('body').append('<audio src="./music/三带一.ogg" autoplay="autoplay"></audio>')
  }else if(desktop_poker.type==5){
		$('body').append('<audio src="./music/三带二.ogg" autoplay="autoplay"></audio>')
  }else if(desktop_poker.type==6){
		$('body').append('<audio src="./music/四带二.ogg" autoplay="autoplay"></audio>')
  }else if(desktop_poker.type==222){
		$('body').append('<audio src="./music/连对.ogg" autoplay="autoplay"></audio>')
  }else if(desktop_poker.type==666){
		$('body').append('<audio src="./music/顺子.ogg" autoplay="autoplay"></audio>')

		setTimeout(function(){
			$('<div class="straight"></div>').appendTo('body').css({width:'360px',height:'229px',position:'absolute',top:'40%',left:'40%',background:'url(./images/顺子.gif) no-repeat'});
			$('body').append('<audio src="./music/顺子音效.ogg" autoplay="autoplay"></audio>');
		},1000)
		setTimeout(function(){
			$('.straight').remove();
		},3000)
  }else if(desktop_poker.type==123){
		$('body').append('<audio src="./music/飞机.ogg" autoplay="autoplay"></audio>')

		setTimeout(function(){
			$('<div class="fly"></div>').appendTo('body').css({width:'370px',height:'211px',position:'absolute',top:'29%',left:'41%',background:'url(./images/飞机.gif) no-repeat'});
			$('body').append('<audio src="./music/飞机音效.mp3" autoplay="autoplay"></audio>');
		},1000)
		setTimeout(function(){
			$('.fly').remove();
		},3000)
  }else if(desktop_poker.type==8){
		$('body').append('<audio src="./music/四带二对.ogg" autoplay="autoplay"></audio>')
  }else if(desktop_poker.type==110){
		$('body').append('<audio src="./music/王炸.ogg" autoplay="autoplay"></audio>')

		setTimeout(function(){
			$('<div class="kingboom"></div>').appendTo('body').css({width:'347px',height:'200px',position:'absolute',top:'40%',left:'40%',background:'url(./images/王炸.gif) no-repeat'});
			$('body').append('<audio src="./music/boom.ogg" autoplay="autoplay"></audio>');
		},1000)
		setTimeout(function(){
			$('.kingboom').remove();
		},3000)
	}
}