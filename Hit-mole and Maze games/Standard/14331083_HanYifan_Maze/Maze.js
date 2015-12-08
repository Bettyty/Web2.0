/*	14331083 By HanYifan  11/12 Version1.0
	判断有没有作弊的方法是在E左右两边各放置一个div，
	从左边的div经过设置bool变量check为true，
	右边为false，再判断check变量就可以了，
	其它基本参照老师的例子。
	有错漏欢迎指正。
*/


window.onload = Maze;

function Maze() {
	//设置判断游戏进行状态的变量
	var start = false;
	var finish = true;
	var check = false;

	//一次性获取需要的Objects
	var box_start = document.getElementById("S");
	var box_end = document.getElementById("E");
	var walls = document.getElementsByClassName('walls');
	var output = document.getElementById('result');
	var box_check_1 = document.getElementById('box-check-1');
	var box_check_2 = document.getElementById('box-check-2');

	//鼠标放在S上时触发函数
	box_start.onmouseover = function() {
		if (start) {
			return;
		}
		start = true;
		finish = false;
		check = false;
		output.innerHTML = "";
	}

	//鼠标放在E上时触发函数
	box_end.onmouseover = function() {
		//check判断是否作弊
		if (check) {
			output.innerHTML = "You Win!";
		} else {
			if (!finish || !start)
			output.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
		}
		start = false;
		finish = true;
		check = false;
	}

	//用来判断是否作弊的盒子1 放在E的左边
	box_check_1.onmouseover = function() {
		if (start) {
			check = true;
		}
	}

	//用来判断是否作弊的盒子2 放在E的右边
	box_check_2.onmouseover = function() {
		if (start) {
			check = false;
		}
	}

	//给每一堵墙创建事件 触碰后改变样式 游戏结束
	for (var i = 0; i < walls.length; i++) {
		walls[i].onmouseover = function() {
			if (start && !finish) {
				this.className += ' walls_change';
				output.innerHTML = "You lose!";
				start = false;
				finish = true;
			}
		}
		walls[i].onmouseout = function() {
			this.className = 'walls';
		}
	}
}
