/*
 *	sicily测试通过：http://soj.sysu.edu.cn/problem_list.php
 *			http://soj.sysu.edu.cn/courses.php
 *      直接将本文档复制粘贴到console控制台，按回车即可；
 */


//$(document).ready(Sorter);

var Global = {};

//主体函数
function Sorter() {
	CreateElements();
	InitElements();
	for (var i= 0; i < Global.number; i++)
		$.each(Global.th[i], OnClick);
}

//获取页面所有table , 给每个table添加id
function CreateElements() {
	Global.table = $('table');
	Global.number = Global.table.length;
	Global.td = new Array(Global.number);
	Global.up = new Array(Global.number);
	Global.th = new Array(Global.number);
	Global.td_length = new Array(Global.number);
	Global.th_length = new Array(Global.number);
}

//获取所有table的数据
function InitElements() {
	for (var i = 0; i < Global.number; i++) {
		Global.table[i].setAttribute('id', 'table-' + i);
		Global.td[i] = $('#table-' + i + ' td');
		Global.th[i] = $('#table-' + i + ' th');
		Global.td_length[i] = Global.td[i].length; 
		Global.th_length[i] = Global.th[i].length;
		Global.up[i] = new Array(Global.th_length[i]);
		for (var j =0; j < Global.th_length[i]; j++) {
			Global.up[i][j] = false;
		}
	}
}

//点击表头后触发一系列函数
function OnClick(index) {
	this.onclick = function() {
		Global.ind = index;
		Global.ss = $(this).parents('table').attr('id');

		GetInfor()
		Period();
		SortContent();
		Update();
	}
}

//点击后：获取当前状态，决定升序或者降序
function Period() {
	if (!Global.up[Global.s][Global.ind]) {
		for (var i = 0; i < Global.th_length[Global.s]; i++) {
			Global.up[Global.s][i] = false;
			Global.th[Global.s][i].className = '';
		}
	}
	if (Global.th[Global.s][Global.ind].className == 'ascend')
		Global.th[Global.s][Global.ind].className = 'descend';
	else Global.th[Global.s][Global.ind].className = 'ascend';
	Global.up[Global.s][Global.ind] = !Global.up[Global.s][Global.ind];
}

//点击后：获取该列信息并删除原来的表格，当前table的下标为s, 行数为row, 点击的列的内容为contents；
function GetInfor() {
	Global.s = parseInt(Global.ss[Global.ss.length - 1]);
	$("#table-" + Global.s + " tbody").children().remove();
	Global.row = Global.td_length[Global.s] / Global.th_length[Global.s];
	Global.contents = new Array(Global.row);
}

//点击后：对获取的contents排序
function SortContent() {
	for (var i = 0, j = 0; i < Global.td_length[Global.s]; i++) {
		if (i % Global.th_length[Global.s] == Global.ind) {
			Global.contents[j] = Global.td[Global.s][i].innerText;
			if (!isNaN(parseFloat(Global.contents[j]))) Global.contents[j] = parseFloat(Global.contents[j]);
			j++;
		}          
	}
	if (Global.up[Global.s][Global.ind]) {
		Global.contents.sort(function(a, b) {return a > b ? 1 : -1;})
	}
	else
		Global.contents.sort(function(a, b) { return a < b ? 1 : -1;});
}

//点击后：将排序后的列表装填到tbody
function Update() {
	var pos = new Array(Global.td_length[Global.s]);
	for (var i =0; i < Global.td_length[Global.s]; i++) pos[i] = false;
	for (var i =0; i < Global.row; i++) {
		for (var j = Global.ind; j < Global.td_length[Global.s]; j +=Global.th_length[Global.s]) {
			if (pos[j] == true) continue;
			var compare = Global.td[Global.s][j].innerText;
			if (!isNaN(Global.contents[i])) compare = parseFloat(compare);
			if (Global.contents[i] == compare) {
				var move_in = '<tr>'
				for (var k = 0; k < Global.th_length[Global.s]; k++) {
					move_in += '<td>' +  Global.td[Global.s][j - Global.ind + k].innerText + '</td>';
				}
				move_in += '</tr>';
				$("#table-" + Global.s + " tbody").append(move_in);
				pos[j] = true;
				break;
			}
		}
	}
	$.each($("#table-" + Global.s + " tbody").children(), ChangeClass);
}

//点击后：改变样式：偶数行背景为灰色
function ChangeClass(index) {
	if (index % 2 != 0)
		$(this).addClass('alternate');
}


Sorter();