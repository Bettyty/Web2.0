/*Done By 14331083_HanYifan Nov.7*/
/*Version 2.0*/
window.onload = Calculator;

function Calculator() {
	var finish = false;
	var way = false;

	var list = document.getElementsByTagName("li");
	for (var i = 0; i < list.length; i++) {					//遍历每个按钮；
		list[i].onclick = function() {
			var invalue = this.firstChild.nodeValue;
			var display = document.getElementById('display');
			var output = display.firstChild.nodeValue;

			if (finish) {									//每次‘=’后清空显示框；
				output = '0';
				finish = false;
			}

			if (output.length >= 13 && invalue != 'CE' && invalue != '←' && invalue != '=') {
				alert("Attention!\nIt's too long to hold.");
				return;										//长度超过显示框，提醒；
			}												

												

			if (invalue == '←') {							//消除操作；
				if (output != '0') {
				output = output.substring(0, output.length - 1);
				if (output.length == 0)
					output = '0';
				}			
			} 
			else if (invalue == 'CE') {						//清空操作；
				output = '0';
			}
			else if (invalue == '=') {						//‘=’保留3位小数，结果长度超过显示框，提醒；
				if (way)									//非法输入，报错，清空；
				finish = true;
				try {
					output = eval(output).toFixed(3);
					if (output.length > 16)
						alert("It's too long to hold,\nsome message may be missing!");
				} 
				catch (err) {
					alert("Wrong expression!\nPlease try again.");
					finish = true;
				}
			}
			else if (invalue == '.') {						//小数点；
				output += invalue;
			}
			else {											//四则运算、括号；
				if (invalue == '+' || invalue == '-' || invalue == '*' || invalue == '/')
					way = true;

				if (output == '0')
					output = invalue;
				else output += invalue;
			}
			display.firstChild.nodeValue = output;
		}
	}
}