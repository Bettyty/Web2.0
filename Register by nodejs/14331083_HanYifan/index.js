/*主函数部分*/

//获取模块
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandler");

//不同的处理动作
var handle = {}
handle["/"] = requestHandlers.start;
handle["username"] = requestHandlers.show;   
handle["wrong"] = requestHandlers.wrong;
handle["ext"] = requestHandlers.ext;

//主函数
server.start(router.route, handle);   			
