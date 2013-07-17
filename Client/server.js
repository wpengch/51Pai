var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io')
    , url = require("url") ;
 
var server = http.createServer(function(req, res) {
	var path=url.parse(req.url).pathname;
	//页面请求分发
	switch (path){
		case '/':
		res.writeHead(200, { 'Content-type': 'text/html'});
    	res.end(fs.readFileSync(__dirname + '/html/index.html'));
    	break;
    	case '/auction':
    	res.writeHead(200, { 'Content-type': 'text/html'});
    	res.end(fs.readFileSync(__dirname + '/html/auction.html'));
    	break;
    	case '/faq':
    	res.writeHead(200, { 'Content-type': 'text/html'});
    	res.end(fs.readFileSync(__dirname + '/html/faq.html'));
    	break;
    	case '/integral':
    	res.writeHead(200, { 'Content-type': 'text/html'});
    	res.end(fs.readFileSync(__dirname + '/html/integral.html'));
    	break;
    	case '/item':
    	res.writeHead(200, { 'Content-type': 'text/html'});
    	res.end(fs.readFileSync(__dirname + '/html/item.html'));
    	break;
    	case '/personal':
    	res.writeHead(200, { 'Content-type': 'text/html'});
    	res.end(fs.readFileSync(__dirname + '/html/personal.html'));
    	break;
		case '/winners':
    	res.writeHead(200, { 'Content-type': 'text/html'});
    	res.end(fs.readFileSync(__dirname + '/html/winners.html'));
    	break;
        case '/login':
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end(fs.readFileSync(__dirname + '/html/login.html'));
        break;
        case '/register':
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end(fs.readFileSync(__dirname + '/html/register.html'));
        break;
    	
    	default: send404(res);
	}
}),send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8080);

var io = require('socket.io').listen(server);

// io.sockets.on('connection', function(socket){
//     //console.log("Connection " + socket.id + " accepted.");
//     socket.on('message', function(message){
//         console.log("Received message: " + message + " - from client " + socket.id);
//         socket.broadcast.emit('message', message);
//     });

//     //竞拍
//     socket.on('auction', function(auction){
//         socket.broadcast.emit('acution', auction);
//     });

//     socket.on('disconnect', function(){
//         // console.log("Connection " + socket.id + " terminated.");
//     });
// });
io.sockets.on('connection', function(socket) {
    socket.on('auction', function(auction) {
        console.log(auction);
        socket.broadcast.emit('auction', auction);
    });
});



// var html = juicer(tpl, data);
