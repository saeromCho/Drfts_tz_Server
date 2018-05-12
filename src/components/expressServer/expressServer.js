//간단한 예제 따라해보기

const http = require('http');
const express = require('express');//모듈 인클루드
const morgan = require('morgan');
const app = express();//서버 생성
const port = 3000;//애플리케이션은 로컬의 3000번 포트에서 동작하는 웹 서버이다.

//app.get을 이용해 라우팅 정의 => 첫번째 파라메터는 라우팅 경로를 의미함(*이라고 입력하면 모든 문자를 통해 URL을 이동함을 의미함)
//미들웨어 설정
// app.get('/', function(request, response) {
//   response.send('welcome saeromCho express server!!! with node!!'); //두번째 매개변수는 요청핸들러....
//});


// app.use(function (request, response, next) {
//   //데이터 추가
//   request.year = 2018;
//   request.month = 5;
//   request.day = 12;
//   next();
// });

// app.use(function(request, response, next) {
//   response.send('<h1> 오늘은 ' + request.year + '/' + request.month + '/' + request.day + ' 입니다.</h1>');
//   next();
// });

app.use(morgan('combined'), function(request, response, next) {
  next();
});

app.get('/a', function(request, response) {
  response.send('<a href = "/b"> Go To B </a>');
});

app.get('/b', function(request, response) {
  response.send('<a href = "/a"> Go To A </a>');
});

//app.use(express.logger());

// app.get('/name/:user_name', function(req, res) {
//   res.status(200);
//   res.set('Content-type', 'text/html');
//   res.send('<html><body>' + '<h1>Hello ' + req.params.user_name + '</h1>' + '</body></html>');
// });

//서버 실행
app.listen(port, function(err) {
  console.log('Connected port %s',  port);
  console.log(express());
  if (err) {
    return console.log('Found error', err);
  }
});

// morgan미들웨어는 웹 요청이 들어왔을 때 로그를 출력하는 미들웨어다.
// 모둘을 설치했는데, 왜 작동을 안하는지 잘 모르겠다ㅠㅠ
// 로그 한 번 확인해보고 싶었는데, 작동을 하지 않는다..ㅠㅠ

// router미들웨어는 페이지 라우팅을 구현하는 미들웨어다.
// 페이지 라우팅은 클라이언트 요청에 적절한 페이지를 제공하는 기술이다.
// app.router 속성을 사용하고 다른 미들웨어와는 다르게 express 객체에 들어있지 않고, 함수를 호출하는 것도 아니다.
// 따라서 var router = require('router');로 선언해주지 않는다.
// app.use(app.router);를 바로 사용하면 되는 듯 하다. 하지만 express 4.x 버전부터는 app.use(app.router)가 되지 않고, 바로 get() 또는 post()로 사용해야 한다.
// app.get()과 app.post()가 이에 해당한다. 내가 계속 사용하던 미들웨어 라우팅 방법이 이에 해당하는 것을 알게 되었다.....ㅎ.... 역시 사람은 배워야 한다.
// app.get('/a', function(request, response) {
//   response.send('<a href = "/b"> Go To B </a>');
// });

// app.get('/b', function(request, response) {
//   response.send('<a href = "/a"> Go To A </a>');
// });