1.项目：简单拼图，可更换背景，可调整难度，成绩按点击次数递减；

2.使用jquery-2.1.4；

3.更新前代码：133行；更新后代码：129行；
  将多数方法行数控制在10行左右，主体函数除外。
  函数复用率低，所以代码行数减少不明显。

4.Toolkit:
  （1）用"$"获取的object，只能用jQuery的方法，跟js的方法混用无法执行；
  （2）控制全局变量感觉用命名空间比较方便；
   参考：{http://www.cnblogs.com/langzs/archive/2010/12/30/1921682.html}
  （3）标签是字符串，原生js：
	             {
		     	var id="input1"; 
		     	var obj=document.getElementById(id); }

		     jquery： 
	             {
		     	var id="input1"; 
		     	var obj=$('#'+id);}
  (4)遍历数组用each据说比较方便；
	$.each(Array, function(arguments){});
	也可以：$("..").each(function(){});
        参考：[http://www.jb51.net/article/42806.htm]

