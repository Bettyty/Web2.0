/*路由部分*/

var url = require("url");
var fs = require("fs");

function route(handle, path, response, postData) {
  var route_name = path;
  var ext = path.match(/(\.[^.]+|)$/)[0];
  console.log("path: " + path);
  console.log("ext: " + ext);

  //用handle处理css、js、jpg等其他文件的请求
  if (ext != null && ext.length > 1) {
  	handle["ext"](response, path);
  	return;
  }

  //处理注册页面
  if (path == '/') {
  	handle["/"](response, "");
  	return;
  }
  if (path.length > 1) route_name = route_name.substr(2, 8);
  console.log("route_name: " + route_name);

  console.log("About to route a request for " + route_name);

  //处理注册成功后的返回页面 以及 用户详细信息页面
  if (typeof handle[route_name] == 'function') {
  	if (postData == "") {
  		handle[route_name](response, path);
  		return;
  	}
  	var message = "";
  	if (postData.length != 0)
    	message += CheckInfor(postData);
    console.log("message: " + message);
    if (message == "") {
    	postData += "\n";
    	fs.appendFile("user.txt", postData, function(error) {
			if (error) throw error;
			console.log("File Saved: " + postData);
			handle[route_name](response, path);
		})
    } 

    //输入信息有误或者发生冲突，返回错误信息
    else {
    	handle["wrong"](response, message);
    	console.log("message: " + message);
    }
  } else {
    console.log("No request handler found for " + path);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}


//检测用户信息是否合法；是否冲突；
function CheckInfor(string) {
	var username, ip, phone, mail;
	var error = "";
	string = string.split("&");
	username = string[0].substr(5);
	ip = string[1].substr(3);
	phone = string[2].substr(6);
	mail = string[3].substr(5);
	console.log(username);
	console.log(ip);
	console.log(phone);
	console.log(mail);
	if (!username.match("^[a-zA-Z][a-zA-Z0-9_]{5,17}$")) error += "name&";
	if (ip[0] == '0' || !ip.match("^[0-9]{8}$")) error += "ip&";
	if (phone[0] == '0' || !phone.match("^[0-9]{11}$")) error += "phone&";
	if (!mail.match("^[a-zA-Z0-9_\-]+%40(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$")) error += "mail&";
	var element = fs.readFileSync('user.txt','utf-8');
	if (element.indexOf("name=" + username) != -1) error += "name="+username + "|";
	if (element.indexOf("ip=" + ip) != -1) error += "ip=" + ip + "|";
	if (element.indexOf("phone=" + phone) != -1) error += "phone=" + phone + "|";
	if (element.indexOf("mail=" + mail) != -1) error += "mail=" + mail + "|";
	return error;
}

exports.route = route;