//모듈을 인클루드한다.(추출한다)
//var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');//express 4.x부터 express.cookieParser()가 사용되지 않으므로, 이렇게 사용한다고 한다.
var port = 3000;

//서버를 생성한다.
var app = express();
//app.use(app.router) 또한 express 4.x부터 사용되지 않는다.
app.use(cookieParser());//express 4.x부터 이렇게 사용한다.

//라우터를 설정한다
app.get('/getCookie', function(request, response) {
  //응답한다
  response.send(request.cookies);
});

app.get('/setCookie', function(request, response) {
  //쿠키를 생성한다
  response.cookie('string', 'cookie');
  response.cookie('json', {
    name: 'Drfts_',
    property: '!!!!!!!!!!my fav!!!!!!!',
  });

  //응답한다
  response.redirect('/getCookie');
});

//서버를 실행한다
// http.createServer(app).listen(port, function() {
//   console.log("Server running port is " + port);  
// });

app.listen(port, function() {
  console.log("Server running port is " + port);  
});