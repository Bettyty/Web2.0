/*	14331083 HanYifan 11/12 Version1.0 
	有错漏欢迎指正。
*/

//设置变量避免重复getElementById
var start;
var clock;
var random_index;
var Score;
var score;
var Moles;

window.onload= function() {
	//  一次性创建60个圆圈
	CreateMoles();
	//  分别获取设置分数、设置开始结束、容纳60个圆圈的object
	Score = document.getElementById("Score-number");
	Moles = document.getElementById("Moles");
	var start_end = document.getElementById("start-end");

	//  点击开始或结束按钮后的事件
	start_end.onclick= function() {
		//开始游戏
		if (!start) {
			start = true;
			score = 0;
			document.getElementById('Time-number').innerHTML = 30;
			document.getElementById('period').innerHTML = 'Playing';
			clock = setInterval(Time_go, 1000);
			random_index = Math.floor(Math.random() * 60);
			Moles.childNodes[random_index].className += ' moles-active';
		}
		//停止游戏 将所有内容恢复为初始状态
		else {
			clearInterval(clock);
			start = false;
			document.getElementById("Time-number").innerHTML = 0;
			document.getElementById('period').innerHTML = 'Game Over';
			Score.innerHTML = 0;
			var cur_name = Moles.childNodes[random_index].className;
			if (cur_name.indexOf('moles-foot') > 0) Moles.childNodes[random_index].className = "moles moles-foot";
			else if (cur_name.indexOf('moles-head') > 0) Moles.childNodes[random_index].className = "moles moles-head";
			else Moles.childNodes[random_index].className = "moles";
		}
	}
}

// 一次性创建60个圆圈的具体实现 用createDocumentFragment()
function CreateMoles() {
	 var oFragment = document.createDocumentFragment();
	 for(var i =0; i < 60; i++) {
	 	div = document.createElement("div");
	 	//给每个圆圈添加onclick事件
	 	div.onclick = function() {
	 		if (start) {
	 			var this_className = this.className;
	 			//玩家点击正误用className判断，不会让分数小于0
	 			if (this_className.indexOf('moles-active') > 0) {
	 				score++;
	 				if (this_className.indexOf('moles-head') > 0)
	 					this.className = "moles moles-head";
	 				else if (this_className.indexOf('moles-foot') > 0)
	 					this.className = "moles moles-foot";
	 				else this.className = "moles";
	 				//玩家点击正确目标后，重新设置目标mole的位置
	 				random_index = Math.floor(Math.random() * 60);
					Moles.childNodes[random_index].className += ' moles-active';
	 			} else {
	 				if (score != 0)
	 				score--;
	 			}
	 			Score.innerHTML = score;
	 		}
	 	}
	 	//让被正确点击的圆圈恢复成普通的样式
	 	div.className = "moles";
	 	if (i >= 0 && i < 10)
	 		div.className += " moles-head";
	 	if (i >= 50 && i < 60)
	 		div.className += " moles-foot";
	 	oFragment.appendChild(div);
	 }
	 //打包后将碎片添加到html中
	 var Moles = document.getElementById("Moles");
	 Moles.appendChild(oFragment);
}

//控制时间的函数
function Time_go () {
	var Time = document.getElementById("Time-number");
	var Time_number = Time.innerHTML;
	Time_number--;
	Time.innerHTML = Time_number;
	//时间剩余0游戏结束 将所有内容恢复为初始状态
	if (start && Time_number == 0) {
		var output = "Game Over.\nyour score is: ";
		output += score;
		alert(output);
		clearInterval(clock);
		document.getElementById('period').innerHTML = 'Game Over';
		start = false;
		Time.innerHTML = 0;
		Score.innerHTML = 0;
		var cur_name = Moles.childNodes[random_index].className;
		if (cur_name.indexOf('moles-foot') > 0) Moles.childNodes[random_index].className = "moles moles-foot";
		else if (cur_name.indexOf('moles-head') > 0) Moles.childNodes[random_index].className = "moles moles-head";
		else Moles.childNodes[random_index].className = "moles";
	}
}
