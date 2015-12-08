/*
 *	sicily����ͨ����http://soj.sysu.edu.cn/problem_list.php
 *			http://soj.sysu.edu.cn/courses.php
 *      ֱ�ӽ����ĵ�����ճ����console����̨�����س����ɣ�
 */


//$(document).ready(Sorter);

var Global = {};

//���庯��
function Sorter() {
	CreateElements();
	InitElements();
	for (var i= 0; i < Global.number; i++)
		$.each(Global.th[i], OnClick);
}

//��ȡҳ������table , ��ÿ��table���id
function CreateElements() {
	Global.table = $('table');
	Global.number = Global.table.length;
	Global.td = new Array(Global.number);
	Global.up = new Array(Global.number);
	Global.th = new Array(Global.number);
	Global.td_length = new Array(Global.number);
	Global.th_length = new Array(Global.number);
}

//��ȡ����table������
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

//�����ͷ�󴥷�һϵ�к���
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

//����󣺻�ȡ��ǰ״̬������������߽���
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

//����󣺻�ȡ������Ϣ��ɾ��ԭ���ı�񣬵�ǰtable���±�Ϊs, ����Ϊrow, ������е�����Ϊcontents��
function GetInfor() {
	Global.s = parseInt(Global.ss[Global.ss.length - 1]);
	$("#table-" + Global.s + " tbody").children().remove();
	Global.row = Global.td_length[Global.s] / Global.th_length[Global.s];
	Global.contents = new Array(Global.row);
}

//����󣺶Ի�ȡ��contents����
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

//����󣺽��������б�װ�tbody
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

//����󣺸ı���ʽ��ż���б���Ϊ��ɫ
function ChangeClass(index) {
	if (index % 2 != 0)
		$(this).addClass('alternate');
}


Sorter();