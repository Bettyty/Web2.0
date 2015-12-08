var fs = require("fs");
var jade = require("jade");

//返回注册页面
function start(response, path) {
	console.log("Request handler 'start' was called\n");
	fs.readFile('./html/Register.html', 'utf-8', function(error, data) {
		if (error) throw error;

		response.writeHead(200, {"Content-Type": "text/html"});
    	response.write(data);
		response.end();
	})
}

//返回注册成功页面 和 详细信息页面；
function show(response, path) {
	var username = path.substr(11);
	console.log("username: " + username);
	
	var output = find_element(username);
	
	if (output == "-1") {
	 	start(response, "");
	 	return;
	}
	//information
	output = output.split("&");
	var name = output[0].substr(5), ip = output[1].substr(3);
	var phone = output[2].substr(6), mail = output[3].substr(5).replace("%40", "@");
	jade.renderFile('./jade/test.jade', { "name":name, "ip":ip, "phone":phone, "mail":mail}, function(err, html){
		console.log(html);
		response.writeHead(200, {'Content-Type': 'text/html'});
  		response.end(html); 
	});
}

//返回错误信息页面；
function wrong(response, message) {
		fs.readFile('./html/Register.html', 'utf-8', function(error, data) {
			if (error) throw error;
			response.writeHead(200, {"Content-Type": "text/html"});
    		response.write(data);
    		if (message.indexOf("name&") != -1) 
    			{ response.write("<p>用户名须为6~18位英文字母、数字或下划线，必须以英文字母开头</p>");}
    		if (message.indexOf("name&") == -1 && message.indexOf("name=") != -1) 
    			{ 
    				var name = "", i = message.indexOf("name="), i = i + 5;
    				while (message[i] != '|') name += message[i++];
    				response.write("<p>用户名\"" + name + "\"已被占用</p>");}

    		if (message.indexOf("ip&") != -1)
    			{ response.write("<p>学号须为8位数字，不能以0开头</p>");}
    		if (message.indexOf("ip&") == -1&&message.indexOf("ip=") != -1)
    			{ 
					var ip = "", i = message.indexOf("ip="), i =i + 3;
    				while (message[i] != '|') ip += message[i++];
    				response.write("<p>学号\"" + ip + "\"已被占用</p>");}

    		if (message.indexOf("phone&") != -1)
    			{ response.write("<p>电话须为11位数字，不能以0开头</p>");}
    		if (message.indexOf("phone&") == -1&&message.indexOf("phone=") != -1)
    			{ 
    				var phone = "", i = message.indexOf("phone="), i =i + 6;
    				while (message[i] != '|') phone += message[i++];
    				response.write("<p>电话\"" + phone + "\"已被占用</p>");}

    		if (message.indexOf("mail&") != -1)
    			{ response.write("<p>请按正确的邮箱格式输入</p>");}
    		if (message.indexOf("mail&") == -1&&message.indexOf("mail=") != -1)
    			{ 
    				var mail = "", i = message.indexOf("mail="), i = i + 5;
    				while (message[i] != '|') mail += message[i++];
    				mail = mail.replace("%40", "@");
    				response.write("<p>邮箱\"" + mail + "\"已被占用</p>");}
			response.end();
	})
}

//处理除html文件外的其他文件请求
function ext(response, path) {
	var ext = path.match("\.[^.]+$");
	console.log("ext funk?");
	if (ext == ".ico") return;
	if (ext != ".jpg") {
	fs.readFile("."+ path, 'utf-8', function (err, data) {//读取内容 
        if (err) throw err; 
        response.writeHead(200, { 
          "Content-Type": { 
          ".css":"text/css", 
          ".js":"application/javascript", 
          }[ext] 
        }); 
    response.write(data); 
    response.end(); 
    });} else {
		fs.readFile("."+ path, function(error, data) {
			if (error) throw error;
			response.writeHead(200, {"Content-Type":'text/html'});
			response.write(data); 
   		    response.end(); 
		})
    }
}

//查找本地用户数据
function find_element(username) {
	var element;
	var output = "";
	element = fs.readFileSync('user.txt','utf-8'); 
	console.log(element);
	if (username == "current") {
		var i = element.lastIndexOf("name=");
		while(element[i] != '\n') {
			output += element[i];
			i++;
		}
	}
	else if (element.indexOf("name=" + username + "&") == -1) return -1;
	else {
		var i = element.indexOf("name=" + username + "&");
		while(element[i] != '\n') {
			output += element[i];
			i++;
		}
	}
	console.log("output: " + output);
	return output;
}

exports.start = start;
exports.show = show;
exports.wrong = wrong;
exports.ext = ext;