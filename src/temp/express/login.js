//모듈을 추출한다
var fs = require('fs');//fs 미들웨어에 대해서는 따로 npm을 설치해주지 않아도 되는 node.js의 기본 내장 미들웨어인 거 같다. 우와 신기하다...
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = 3000;

//서버를 생성한다.
var app = express();

//미들웨어를 설정한다
app.use(cookieParser());
app.use(bodyParser());

//라우터를 설정한다
app.get('/', function(request, response) {
  if(request.cookies.auth) { //auth가 무엇일까?, 코드를 해석해보자면 요청한 쿠키가 성공하면 send메세지로 "Login is SUCCESS!!!!"가 뜨고
    response.send('<h1> 로그인에 성공해서 쿠키가 생성되었으며, 해당 페이지로 쿠키가 전달되었습니다. _Login is SUCCESS !!!!_ </h1>');
    console.log("성공 시, request.cookies.auth의 정체는 무엇일까? ::: " + request.cookies.auth);//성공하면, request.cookies.auth의 정체는 true였다. true가 콘솔에 찍힌다.
  } else { // 실패하면 리다이렉트로 URL이 '/login'인 로그인 페이지로 이동한다
    response.redirect('/login');
    console.log("/login페이지로 리다이렉트될 시, request.cookies.auth의 정체는 무엇일까? ::: " + request.cookies.auth);
  }
});

//login페이지는 login.html파일을 읽고, error가 나면 error를 내고, 성공하면 data(html로 작성한 내용을)를 스트링으로 뿌려주는 페이지인 것 같다.
//이건 그냥 html 파일을 웹에 뿌려주는 기능을 가진 거 같다.
app.get('/login', function(request, response){
  fs.readFile('login.html', function(error, data) { //아.. fs는 파일을 추출해주는(읽어오는) 미들웨어인가보다. 위에서 왜 require를 해주었는지 알게 되었다. node.js의 기본 내장 모듈인 듯 하다.
    response.send(data.toString());
    console.log("data.toString()은 어떻게 나올까 ?? :::: " + data.toString());//내 예상대로 data.toString()은 내가 작성한 login.html파일을 스트링으로 다 읽어오는 거였다. 헤헤
  });
});

//로그인 페이지에서 post로 데이터를 작성하여 보낸다.
app.post('/login', function(request, response){
  //성공시 id와 password에 대한 쿠키를 담을, 각 변수를 설정해준다.
  var id = request.param('id');
  var password = request.param('password');

  //출력한다
  console.log("아이디 ::: " + id);
  console.log("비밀번호 ::: " + password);
  console.log("request의 body 출력(request.body는 요청시 보내는(우리가 적어서 submit하는 id와 password였다.) 데이터를 의미하는 거였다. 전달되는 body가 json으로 출력되는 구나)");
  console.log(request.body);

  //로그인이 잘 됐는지 아이디와 패스워드를 확인한다.
  if(id == 'drfts' && password == '1234') {
    //로그인이 성공하면 auth 쿠키를 생성한다.
    response.cookie('auth', true);
    // Login is SUCCESS!!!!가 뜨는 페이지로 리다이렉트 되면서 해당 페이지로 쿠키가 전달된다.
    //리다이렉트
    response.redirect('/');
    //console.log("auth는 무엇이지?? :::" + auth); //auth에 대해선 변수가 설정되지 않아서 undefined가 뜨는구나
    console.log("그럼 response.cookie 이건 ? :::: " + response.cookie);//response.cookie는 이 자체에 대한 메소드다.

  } else {//실패시, 쿠키고 뭐고 없고 로그인페이지로 리다이렉트된다.
    response.redirect('/login');
  }
});

//서버를 실행한다.
app.listen(port, function() {
  console.log("Drfts 로그인 페이지에 오신 것을 환영합니다.");
})