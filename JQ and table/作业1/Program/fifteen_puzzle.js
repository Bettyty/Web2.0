/*	14331083 By HanYifan  11/27 Version2.0
	通过8个class来定位， 通过id来决定每块的内容；
	添加了计分与不同的难度；

	更新：功能不变，除了主体函数，其他方法基本在10行左右；
*/

$(document).ready(Puzzle);

//用命名空间防止变量冲突
var Global= {};

//改变背景图片具体操作
function ChangeBackImg() {
	for (var j =0; j < 16; j++) {
		var new_classname = "left-" + (j%4 + 1) + " top-" + (Math.floor(j/4) + 1);
		if (j != 15) new_classname += Global.plus_class;
		Global.li[j].className = new_classname;
	}
}

//选择模式 改变类名来改变背景图
function SelectMode() {
	for (var i = 0; i < 3; i++)
		Global.mode[i].onclick = function() {
			Global.start = false;
			$("#result").html("成绩：无");
			if ($(this).html() == "小白模式") {
				Global.plus_class = " img-1";
			} else if ($(this).html() == "达人模式") {
				Global.plus_class = " img-2";
			} else if ($(this).html() == "大神模式") {
				Global.plus_class = " img-3";
			}	
			ChangeBackImg();
		}
}

//初始化图片
function Init() {
	var name;
	for (var i =0; i < 16; i++) {
		name = "pic-" + (i + 1);
		Global.li[i] = document.getElementById(name);
		if (i != 15)
		Global.li[i].className += " img-1";
		Global.plus_class = " img-1";
		Global.pos[i] = i + 1;
	}
}

//将打乱后的图片体现
function ChangeRandomPic() {
	for (var i =0; i < 16; i++) {
		var id = Global.pos[i] - 1;
		var new_classname = "left-" + (i%4 + 1)+ " top-" + (Math.floor(i/4) + 1);
		if (id != 15) new_classname += Global.plus_class;
		Global.li[id].className = new_classname;
	}
}

//结算并重置游戏
function Win() {
	alert("Congratulations!\nYour final score is " + Global.score);
}

//随机打乱序列，方法：板块三轮换，还原性可证；
function RandomPicture() {
	Global.start = true, Global.score = 100;
	$('#result').html("成绩 : " + Global.score);
	for (var j = 0; j < 25; j++) {
		var i = Math.floor(Math.random() * 13);
		var temp_1 = Global.pos[i];
		var temp_2 = Global.pos[i + 1];
		Global.pos[i] = Global.pos[i + 2];
		Global.pos[i + 1] = temp_1;
		Global.pos[i + 2] = temp_2;
	}
	ChangeRandomPic();
}

//主体函数
function Puzzle() {
	Global.mode = $("li");
	Global.li = new Array(16), 
	Global.pos = new Array(16);

	Init();
	SelectMode();

	//随机生成puzzle
	$("#restart").click(RandomPicture);

	//点击可移动的方块后 与空白位置交换 通过交换className实现;
	for (var i =0; i < 16; i++) {
		Global.li[i].onclick = function(i) {
			return function() {
				if (Global.start) {
					var cur_pos; 
					for (var j = 0; j <= 15; j++)
						if (Global.pos[j] == i + 1) cur_pos = j;
					
					var around = new Array(cur_pos - 4, cur_pos + 4, cur_pos - 1, cur_pos + 1);
					for (var j = 0; j < 4; j++) {
						var around_pos = around[j];
						if (around_pos >= 0 && around_pos <= 15 && Global.pos[around_pos] == 16) {
							var temp = this.className;
							this.className = Global.li[Global.pos[around_pos] - 1].className + Global.plus_class;
							Global.li[Global.pos[around_pos] - 1].className = temp.substr(0, 12);
							Global.pos[cur_pos] = 16;
							Global.pos[around_pos] = i + 1;
						}
					}
					//判断是否胜利
					for (var j = 0; j < 16; j++)
						if (Global.pos[j] != j + 1) break;

					//若胜利 则调用Win()函数 重置游戏
					if (j == 16) Win();

					//更新成绩
					if (i != 15) Global.score--;
					if (Global.score < 0) Global.score = 0;
					$("#result").html("成绩 : " + Global.score);
				}
			}
		} (i)
	}
}
