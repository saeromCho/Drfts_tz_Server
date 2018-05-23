//간단한 예제 따라해보기


const express = require('express');//라이브러리 인클루드
const app = express();//애플리케이션 생성
const port = 3000;//애플리케이션은 로컬의 3000번 포트에서 동작하는 웹 서버이다.

//app.get을 이용해 라우팅 정의 => 첫번째 파라메터는 라우팅 경로를 의미함(*이라고 입력하면 모든 문자를 통해 URL을 이동함을 의미함)
app.get('/', function(request, response) {
  response.send('welcome saeromCho express server!!! with node!!'); //두번째 매개변수는 요청핸들러....
});

app.get('/name/:user_name', function(req, res) {
  res.status(200);
  var user_name = req.param('user_name');
  //res.set('Content-type', 'text/html');
  res.send('<html><body>' + '<h1>Hello ' + user_name + '</h1>' + '</body></html>');
  //res.json('<html><body>' + '<h1>Hello ' + req.params.user_name + '</h1>' + '</body></html>');
});
app.listen(port, function(err) {
  console.log('Connected port %s',  port);
  if (err) {
    return console.log('Found error', err);
  }
})


