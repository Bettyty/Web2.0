/*服务器部分*/

//获取模块
var http = require("http");
var url = require("url");
var fs = require("fs");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var path = url.parse(request.url).path;
    console.log("before-change: " + path);

    request.setEncoding("utf-8");
    //监听post信息
    request.addListener("data", function(appendData) {
    	postData += appendData;
    	console.log("Received data: " + postData);
    });

    //将完整信息返回给路由
    request.addListener("end", function() {
    	route(handle, path, response, postData);
    });
  }

  //服务器监听请求
  http.createServer(onRequest).listen(8000);
  console.log("Server has started.");
}

exports.start = start;