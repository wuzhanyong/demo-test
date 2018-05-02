
// 判断牌型的方法
/*
牌型代号说明：
-1      桌面没牌
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


function checkPosers(poker){
// console.log(poker);

var length = poker.length;
var poker_data = [];
for(var i=0;i<length;i++){
	poker_data.push(poker[i].split('_'));
}
switch(length){
	case 1:
	//设置出牌值为单张
		ready_poker.type = 1; 
	//设置该牌型的判断值
		ready_poker.max = poker_data[0][0];	
		// console.log(poker_data);
		
		return true;
	break;

	//牌的数量为2的牌型判断
	case 2:
		if(poker_data[0][0]==poker_data[1][0]){
				//设置出牌类型为对子
				ready_poker.type = 2;

				//设置该牌型判断值
				ready_poker.max = poker_data[0][0];
				return true;
			}else if(poker_data[0][0]==15 && poker_data[1][0]==14){
				//设置出牌类型为王炸
				ready_poker.type = 110;

				//设置该牌型判断值
				ready_poker.max = 110;
				return true;
			}else{
			//如果两个牌的点数不一样，则牌型无效
			ready_poker.type = 0;
			ready_poker.max = 0;
			return false;
		}
		break;

		//牌的数量为3的牌型判断
		case 3:
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]){

				//设置出牌为三张
				ready_poker.type = 3;

				//设置该牌型为判断值
				ready_poker.max = poker_data[0][0];
				return true;
			}else{
				//如果两个牌的点数不一样，则牌型无效
			ready_poker.type = 0;
			ready_poker.max = 0;
			return false;
			}
		break;

		//牌的数量为4张的牌型判断
		case 4:
			if(poker_data[0][0]==poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]&&poker_data[2][0]==poker_data[3][0]){
				//设置出牌为普通炸弹
				ready_poker.type = 999;

				// 设置该牌型判断值
				ready_poker.max = poker_data[0][0];
				return true;
			}else if(poker_data[0][0]=poker_data[1][0]&&poker_data[1][0]==poker_data[2][0]||poker_data[1][0]==poker_data[2][0]&&poker_data[3][0]){
				//设置出牌为三带一
				ready_poker.type = 4;
				ready_poker.max = poker_data[1][0];
				return true;
			}else{
					//如果两个牌的点数不一样，则牌型无效
			ready_poker.type = 0;
			ready_poker.max = 0;
			return false
			}
		break;	

		//出牌数量为5
		case 5:
			//判断牌型是否为顺子
			if(checkStraight(poker_data)){
				//设置出牌类型为顺子
				ready_poker.type=666;

				//设置giant牌型的判断值
				ready_poker.max=poker_data[0][0];
				return true;
			}else if(ready_poker.max=checkThreeWith(poker_data)){
				//设置出牌类型为三代二
				ready_poker.type=5;

				//设置出牌类型的判断值
				return true;
			}else{
				//牌型无效
				ready_poker.type=0;
				ready_poker.max=0;
				return false;
			}
		break;

	//出牌数量为6
		case 6:     
					//判断牌型是否为顺子
				if(checkStraight(poker_data)){
					//设置出牌类型为顺子
					ready_poker.type=666;

					//设置giant牌型的判断值
					ready_poker.max=poker_data[0][0];
					return true;
				}else if(checkStraightPair(poker_data)){
			  		//设置出牌类型为连对
			  		ready_poker.type = 222;

			  		//设置出牌的判断值
			  		ready_poker.max = poker_data[0][0];
			  		return true;
			  	}else if(checkThree(poker_data)){
			  		//设置出牌类型为飞机
			  		ready_poker.type = 123;

			  		ready_poker.max = poker_data[0][0];
			  		return true;
			  	}else if(ready_poker.max=checkFourBandsTwoOne(poker_data)){
					//设置出牌类型为四带二
			  		ready_poker.type = 6;

					return true;
			  	} else{
				//牌型无效
				ready_poker.type=0;
				ready_poker.max=0;
				return false;
			}
	break;

	// 出牌数量为7
	case 7:
	// 判断是否为顺子
	if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
	}else{
			//牌型无效
			ready_poker.type=0;
			ready_poker.max=0;
			return false;
			}
	break;

	//出牌数量为8
	case 8:
	if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(checkBombFaceConnect(poker_data)){
		 //设置出牌类型为连炸飞机
  		ready_poker.type = 999;

  		//设置出牌判断值
  		ready_poker.max=poker_data[0][0];
  		return true;
  	}else if(checkAircraft(poker_data)){
		 //设置出牌类型为飞机
  		ready_poker.type = 123;

  		//设置出牌判断值
  		ready_poker.max=checkAircraft(poker_data)
  		return true;
	  	}else if(checkStraightPair(poker_data)){
  		//设置出牌类型为连对
  		ready_poker.type = 222;

  		//设置出牌的判断值
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(ready_poker.max=checkFourBandsTwoTwo(poker_data)){

	  		//设置类型为四带二对
	  		ready_poker.type = 8;
	  		return true;
	  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	}
  	break;

  	//出牌数量为9
	case 9:
	if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(checkThree(poker_data)){
  		//设置出牌类型为飞机
  		ready_poker.type = 123;

  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	}
  	break;
	
	//出牌数量为10
  	case 10:
    if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(ready_poker.max=checkThreeWith(poker_data)){
		//设置出牌类型为飞机
		ready_poker.type=123;

		//设置出牌类型的判断值
		return true;
	}else if(checkStraightPair(poker_data)){
  		//设置出牌类型为连对
  		ready_poker.type = 222;

  		//设置出牌的判断值
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	}
  	break;

	//出牌数量为11
  	case 11:
	if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	} 
  	break;

  	//出牌数量为12
  	case 12:
  	if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(checkStraightPair(poker_data)){
  		//设置出牌类型为连对
  		ready_poker.type = 222;

  		//设置出牌的判断值
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(ready_poker.max=checkAircraft(poker_data)){
		 //设置出牌类型为飞机
  		ready_poker.type = 123;

  		return true;
	}else if(checkThree(poker_data)){
  		//设置出牌类型为飞机
  		ready_poker.type = 123;

  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(ready_poker.max=checkFourBandsTwoOne(poker_data)){

  		//设置类型为四带二
  		ready_poker.type = 6;

  		return true;
  	}else if(checkBombFaceConnect(poker_data)){
		 //设置出牌类型为连炸
  		ready_poker.type = 999;

  		//设置出牌判断值
  		ready_poker.max=poker_data[0][0];
  		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	} 
  	break;

  	//出牌类型为13张
  	case 13:
  	if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	}  
  	break;

  	//出牌类型为14张
  	case 14:
  	if(checkStraight(poker_data)){
		//设置出牌为顺子
  		ready_poker.type = 666;

  		//设置该牌型判断值,由于排序是由大到小，所以第一个最大
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(checkStraightPair(poker_data)){
  		//设置出牌类型为连对
  		ready_poker.type = 222;

  		//设置出牌的判断值
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	}  
  	break;

	//出牌类型为15张
  	case 15:
  	if(ready_poker.max=checkThreeWith(poker_data)){
		//设置出牌类型为三代二
		ready_poker.type=5;

		//设置出牌类型的判断值
		return true;
	}else if(checkThree(poker_data)){
  		//设置出牌类型为飞机
  		ready_poker.type = 123;

  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	} 
  	break;

  	//出牌类型为16张
  	case 16:
    if(checkStraightPair(poker_data)){
  		//设置出牌类型为连对
  		ready_poker.type = 222;

  		//设置出牌的判断值
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(checkBombFaceConnect(poker_data)){
		 //设置出牌类型为连炸飞机
  		ready_poker.type = 999;

  		//设置出牌判断值
  		ready_poker.max=poker_data[0][0];
  		return true;
  	}else if(ready_poker.max=checkFourBandsTwoTwo(poker_data)){

  		//设置类型为四带二 对
  		ready_poker.type = 8;

  		return true;
  	}else if(ready_poker.max=checkAircraft(poker_data)){
	 	//设置出牌类型为飞机
		ready_poker.type = 123;


		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	} 
  	break;


  	//出牌类型为17张
  	case 17:
  	//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
  	break;

  	//出牌类型为18张
  	case 18:
	if(ready_poker.max=checkFourBandsTwoOne(poker_data)){
		//设置出牌类型为四带二
  		ready_poker.type = 6;

  	}else if(checkStraightPair(poker_data)){
  		//设置出牌类型为连对
  		ready_poker.type = 222;

  		//设置出牌的判断值
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(checkThree(poker_data)){
  		//设置出牌类型为飞机
  		ready_poker.type = 123;

  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else{
  		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
  	}
  	break;

  	//出牌类型为19张
  	case 19:
  	//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
  	break;


  	//出牌类型为20张
  	case 20:
  	if(checkStraightPair(poker_data)){
  		//设置出牌类型为连对
  		ready_poker.type = 222;

  		//设置出牌的判断值
  		ready_poker.max = poker_data[0][0];
  		return true;
  	}else if(checkBombFaceConnect(poker_data)){
		 //设置出牌类型为连炸飞机
  		ready_poker.type = 999;

  		//设置出牌判断值
  		ready_poker.max=poker_data[0][0];
  		return true;
  	}else if(ready_poker.max=checkThreeWith(poker_data)){
		//设置出牌类型为三代二
		ready_poker.type=5;

		//设置出牌类型的判断值
		return true;
	}else if(ready_poker.max=checkAircraft(poker_data)){
		 //设置出牌类型为飞机
		ready_poker.type = 123;

		return true;
  	}else{
		//牌型无效
		ready_poker.type=0;
		ready_poker.max=0;
		return false;
	}
  	break;


}
}

//检测牌型是否为顺子的方法
function checkStraight(arr){	
for(var i=0;i<arr.length-1;i++){
	if(arr[i][0]-1 != arr[i+1][0]){
		return false;
		}			
   }
		return true;
}

//检测牌型是否为连对的方法
function checkStraightPair(arr){

		switch(arr.length){
			//998877
			case 6:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0]){
				return true;
			}
			break;

			case 8:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0]&& arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0] && arr[5][0]-1==arr[6][0]){
				return true;
			}
			break; 

			case 10:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[9][0]&& arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0] && arr[5][0]-1==arr[6][0] && arr[7][0]-1==arr[8][0]){
				return true;
			}
			break; 

			case 12:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[9][0] && arr[10][0]==arr[11][0]&& arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0] && arr[5][0]-1==arr[6][0] && arr[7][0]-1==arr[8][0] && arr[9][0]-1==arr[10][0]){
				return true;
			}
			break;

			case 14:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[9][0] && arr[10][0]==arr[11][0] && arr[12][0]==arr[13][0] && arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0] && arr[5][0]-1==arr[6][0] && arr[7][0]-1==arr[8][0] && arr[9][0]-1==arr[10][0] && arr[11][0]-1==arr[12][0]){
				return true;
			}
			break; 

			case 16:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[9][0] && arr[10][0]==arr[11][0] && arr[12][0]==arr[13][0]  && arr[14][0]==arr[15][0] && arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0] && arr[5][0]-1==arr[6][0] && arr[7][0]-1==arr[8][0] && arr[9][0]-1==arr[10][0] && arr[11][0]-1==arr[12][0] && arr[13][0]-1==arr[14][0]){
				return true;
			}
			break; 

			case 18:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[9][0] && arr[10][0]==arr[11][0] && arr[12][0]==arr[13][0]  && arr[14][0]==arr[15][0] && arr[16][0]==arr[17][0] && arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0] && arr[5][0]-1==arr[6][0] && arr[7][0]-1==arr[8][0] && arr[9][0]-1==arr[10][0] && arr[11][0]-1==arr[12][0] && arr[13][0]-1==arr[14][0] && arr[15][0]-1==arr[16][0]){
				return true;
			}
			break;

			case 20:
			if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[9][0] && arr[10][0]==arr[11][0] && arr[12][0]==arr[13][0]  && arr[14][0]==arr[15][0] && arr[16][0]==arr[17][0] && arr[18][0]==arr[19][0]&& arr[1][0]-1==arr[2][0] && arr[3][0]-1==arr[4][0] && arr[5][0]-1==arr[6][0] && arr[7][0]-1==arr[8][0] && arr[9][0]-1==arr[10][0] && arr[11][0]-1==arr[12][0] && arr[13][0]-1==arr[14][0] && arr[15][0]-1==arr[16][0] && arr[17][0]-1==arr[18][0]){
				return true;
			}
			break;
		}
}

//检测牌型是否为三代二
function checkThreeWith(arr){
	//555 xx
	//xx 555
	switch(arr.length){
		case 5:
			if(arr[0][0]==arr[1][0]&&arr[1][0]==arr[2][0]&&arr[3][0]==arr[4][0] || arr[0][0]==arr[1][0]&&arr[2][0]==arr[3][0]&&arr[3][0]==arr[4][0]){
				max = arr[2][0];
			}
		break;
	//888 777 xx zz	
	//xx 888 777 zz
	//xx zz 888 777
	case 10:
		if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[9][0]){
			max = arr[0][0];
		}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[6][0] && arr[7][0]==arr[9][0]){
			max = arr[2][0];
		}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[4][0] && arr[5][0]==arr[7][0] && arr[8][0]==arr[9][0]){
			max = arr[2][0];
		}
	break;

	case 15:
	//999 888 777 xx cc zz
	//xx 999 888 777 cc zz
	//xx cc 999 888 777 zz
	//xx cc zz 999 888 777
	if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[6][0]==arr[8][0] && arr[9][0]==arr[10][0] && arr[11][0]==arr[12][0] && arr[13][0]==arr[14][0]){
		max = arr[0][0];
	}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[4][0] && arr[5][0]==arr[7][0] && arr[8][0]==arr[10][0] && arr[11][0]==arr[12][0] && arr[13][0]==arr[14][0]){
		max = arr[2][0];
	}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[6][0] && arr[7][0]==arr[9][0] && arr[10][0]==arr[12][0] && arr[13][0]==arr[14][0]){
		max = arr[4][0];
	}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[8][0] && arr[9][0]==arr[11][0] && arr[12][0]==arr[14][0]){
		max = arr[7][0];
	}
	break;

	case 20:
	//999 888 777 666 xx zz cc vv
	//xx 999 888 777 666 zz cc vv
	//xx zz 999 888 777 666 cc vv
	//xx zz cc 999 888 777 666 vv
	//xx zz cc vv 999 888 777 666
	if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[6][0]==arr[8][0] && arr[9][0]==arr[11][0] && arr[12][0]==arr[13][0] && arr[14][0]==arr[15][0] && arr[16][0]==arr[17][0] && arr[18][0]==arr[19][0]){
		max = arr[0][0];
	}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[4][0] && arr[5][0]==arr[7][0] && arr[8][0]==arr[10][0] && arr[11][0]==arr[13][0] && arr[14][0]==arr[15][0] && arr[16][0]==arr[17][0] && arr[18][0]==arr[19][0]){
		max = arr[2][0];
	}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[6][0] && arr[7][0]==arr[9][0] && arr[10][0]==arr[12][0] && arr[13][0]==arr[15][0] && arr[16][0]==arr[17][0] && arr[18][0]==arr[19][0]){
		max = arr[4][0];
	}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[8][0] && arr[9][0]==arr[11][0] && arr[12][0]==arr[14][0] && arr[15][0]==arr[17][0] && arr[18][0]==arr[19][0]){
		max  = arr[6][0];
	}else if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0] && arr[8][0]==arr[10][0] && arr[11][0]==arr[13][0] && arr[14][0]==arr[16][0] && arr[17][0]==arr[19][0]){
		max = arr[8][0];
	}
	break;
	}
return max;	
}
//检测是否四带二对相连
function checkFourBandsTwoTwo(arr){

	switch(arr.length){
			//1个四带(双)二
			case 8:
			//6666 (xx) (yy) x与y是对子
			//(xx) 6666 (yy)
			//(xx) (yy) 6666
			if(arr[0][0]==arr[3][0] && arr[4][0]==arr[5][0] && arr[6][0]==arr[7][0]||arr[0][0]==arr[1][0] && arr[2][0]==arr[5][0] && arr[6][0]==arr[7][0]){
					max = arr[2][0];
			}else{
				if(arr[0][0]==arr[1][0] && arr[2][0]==arr[3][0] && arr[4][0]==arr[7][0]){
					max = arr[4][0];
				}
			}
			break;

			

			//2个四带（双）二
			case 16:
			//7777 6666 (xx) (yy) (zz) (gg)x与y是对子
			//(xx) 7777 6666 (yy) (zz) (gg)
			//(xx) (yy) 7777 6666 (zz) (gg)
			//(xx) (yy) (zz) 7777 6666 (gg)
			//(xx) (yy) (zz) (gg) 7777 6666
			for(var i=0;i<5;i++){
				if(arr[i+0][0]==arr[i+3][0] && arr[i+4][0]==arr[i+7][0] && arr[i+3][0]-1==arr[i+4][0]){
					max = arr[i][0];
				}
			}
			break;
		}
		return max;	
	}

//检测是否为连炸
function checkBombFaceConnect(arr){
	switch(arr.length){
		case 8:
			if(arr[0][0]==arr[3][0] && arr[4][0]==arr[7][0] && arr[3][0]-1==arr[4][0]){
				return true
			}
		break;

		case 12:
		for(var i=0;i<8;i+=4){
			if(arr[i+0][0]==arr[i+3][0] && arr[i+4][0]==arr[i+7][0] && arr[i+3][0]-1==arr[i+4][0]){
				return true
			}
		}
		break;

		case 16:
		for(var i=0;i<12;i+=4){
			if(arr[i+0][0]==arr[i+3][0] && arr[i+4][0]==arr[i+7][0] && arr[i+3][0]-1==arr[i+4][0]){
				return true
			}
		}
		break;

		case 20:
		for(var i=0;i<16;i+=4){
			if(arr[i+0][0]==arr[i+3][0] && arr[i+4][0]==arr[i+7][0] && arr[i+3][0]-1==arr[i+4][0]){
				return true
			}
		}
		break;

	}
}
//检测是否四带二张相连
function checkFourBandsTwoOne(arr){
	switch(arr.length){
			case 6:
			//6666  xx
			//xx  6666
			//x 6666 x
			for(var i=0;i<3;i++){
			if(arr[i+0][0]==arr[i+3][0]){
					max = arr[i][0];
				}
			}
			break;	
	

	//2个四带(单)二
			case 12:
			//7777 6666 xx xx     0
			//x 7777 6666 xxx     1  
			//xx 7777 6666 xx 	  2
			//xxx 7777 6666 x     3
			//xxxx 7777 6666      4
			for(var i=0;i<5;i++){
				if(arr[i+0][0]==arr[i+3][0] && arr[i+4][0]==arr[i+7][0] && arr[i+3][0]-1==arr[i+4][0]){
					max = arr[i][0];
				}
			}
			break;

	//3个四带（单）二
			case 18:
			//7777 6666 5555  xxxxxx    0
			//x 7777 6666 5555 xxxxx    1
			//xx 7777 6666 5555 xxxx    2
			//xxx 7777 6666 5555 xxx    3
			//xxxx 7777 6666 5555 xx    4
			//xxxxx 7777 6666 5555 x    5
			//xxxxxx 7777 6666 5555     6
			for(var i=0;i<7;i++){
				if(arr[i+0][0]==arr[i+3][0] && arr[i+4][0]==arr[i+7][0] && arr[i+3][0]-1==arr[i+4][0] && arr[i+8]==arr[i+11] && arr[i+7][0]-1==arr[i+8][0]){
					max = arr[i][0];
				}
			}
			break;			
		}
		return max;		
}

//检测是否三张（飞机）
function checkThree(arr){
	switch(arr.length){
		case 6:
			if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[2][0]-1==arr[3][0]){
				return true;
			}
		break;

		case 9:
		if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[6][0]==arr[8][0] && arr[2][0]-1==arr[3][0] &&arr[5][0]-1==arr[6][0]){
				return true;
			}
		break;

		case 12:
		if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[6][0]==arr[8][0]  && arr[9][0]==arr[11][0] && arr[2][0]-1==arr[3][0] && arr[5][0]-1==arr[6][0] && arr[8][0]-1==arr[9][0]){
				return true;
			}
		break;

		case 15:
		if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[6][0]==arr[8][0]  && arr[9][0]==arr[11][0]  && arr[12][0]==arr[14][0] && arr[2][0]-1==arr[3][0] && arr[5][0]-1==arr[6][0] && arr[8][0]-1==arr[9][0] && arr[11][0]-1==arr[12][0]){
				return true;
			}
		break;

		case 18:
		if(arr[0][0]==arr[2][0] && arr[3][0]==arr[5][0] && arr[6][0]==arr[8][0]  && arr[9][0]==arr[11][0]  && arr[12][0]==arr[14][0]  && arr[15][0]==arr[17][0] && arr[2][0]-1==arr[3][0] && arr[5][0]-1==arr[6][0] && arr[8][0]-1==arr[9][0] && arr[11][0]-1==arr[12][0] && arr[14][0]-1==arr[15][0]){
				return true;
			}
		break;
	}
}
//检测牌型是否为飞机(三带一)
function checkAircraft(arr){
var max = false;
//判断是不是三带一相连
if(!max){
	switch(arr.length){
		case 8:
			//66655543
			//76555444
			//76665553
			if(arr[0][0]==arr[2][0] && arr[2][0]-1==arr[3][0] && arr[3][0]==arr[5][0]){
				max = arr[0][0];
			}else if(arr[2][0]==arr[4][0] && arr[5][0]==arr[7][0] && arr[2][0]-1==arr[5][0]){
				max = arr[2][0];
			}else if(arr[1][0]==arr[3][0] && arr[4][0]==arr[6][0] && arr[1][0]-1==arr[4][0]){
				max = arr[1][0];
			}
		break;
		//3连对飞机
		case 12:
		//999888777  xxx    i=0
		//x 999888777 54	i=1
		//xx 999888777 4    i=2
		//xxx  999888777	i=3
		for(var i=0;i<4;i++){
		if(arr[i][0]==arr[i+2][0] && arr[i+2][0]-1 == arr[i+3][0] && arr[i+3][0] == arr[i+5][0] && arr[i+5][0]-1 == arr[i+6][0] && arr[i+6][0] == arr[i+8][0]){
			max = arr[i][0];
		}
	}
		break;
		//4连对飞机
		case 16:
		//999888777666  xxxx
		//x 999888777666 xxx
		//xx 999888777666 xx
		//xxx 999888777666 x
		//xxxx  999888777666 
	
	for(var i=0;i<5;i++){
	if(arr[i][0]==arr[i+2][0] && arr[i+2][0]-1 == arr[i+3][0] && arr[i+3][0] == arr[i+5][0] && arr[i+5][0]-1 == arr[i+6][0] && arr[i+6][0] == arr[i+8][0] && arr[i+8][0]-1 == arr[i+9][0] && arr[i+9][0] ==arr[i+11]){
			max = arr[i][0];
		}
	}
		break;
		//5连对飞机
		case 20:
			//999888777666555  xxxxx
			//x 999888777666555 xxxx
			//xx 999888777666555 xxx
			//xxx 999888777666555 xx
			//xxxx 999888777666555 x
			//xxxxx  999888777666555 
		for(var i=0;i<6;i++){
		if(arr[i][0]==arr[i+2][0] && arr[i+2][0]-1 == arr[i+3][0] && arr[i+3][0] == arr[i+5][0] && arr[i+5][0]-1 == arr[i+6][0] && arr[i+6][0] == arr[i+8][0] && arr[i+8][0]-1 == arr[i+9][0] && arr[i+9][0] ==arr[i+11] && arr[i+11][0]-1 == arr[i+12][0] && arr[i+12][0] ==arr[i+14]){
				max = arr[i][0];
			}
		}
			break;
	}
  }
return max;
}
