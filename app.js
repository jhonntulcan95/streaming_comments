var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Log = require('log'),
    log = new Log('debug');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
  res.redirect('index.html');
});

io.on('connection',function(socket){
    socket.on('stream',function(image){
      socket.broadcast.emit('stream',image);
    });
    socket.on('message',function(msj){
    	io.emit('message',msj,socket.id);
    });
    socket.on('disconnect',function(){
    	console.log('Usuario Desconectado : %s', socket.id)
    });
    console.log("usuario id : %s", socket.id);
});
http.listen(port,function(){
  log.info('Servidor escuchando a traves del puerto %s', port);
});
