
//모듈을 추출한다
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
//포트설정
var port = 3000;

//서버를 생성한다
app = express();

//미들웨어를 설정한다
app.use(cookieParser());
//session의 이름과 유지시간을 설정해줄 수 있다. key는 세션의 이름이고, cookie는 생성할 쿠키와 관련된 정보를 지정한다. maxAge는 해당 쿠키의 유지시간이다. secret이 뭔지 궁금하다.
app.use(session({secret: 'secret key',
                 key: 'Drfts',
                 cookie: {
                   maxAge: 60 * 1000}}));
app.use(bodyParser());
app.use(function(request, response) {

  //변수를 선언한다
  var output = { };
  console.log("output에 담긴 내용이 궁금해 ::: " + output); //죄다 object Object로 출력된다.
  output.cookies = request.cookies;
  console.log("그럼 request.cookies는 출력되나 ?? ::: " + request.cookies);//이 또한 오브젝트로 출력됨.
  console.log("output.cookies에 담긴 내용이 궁금해 ::: " + output.cookies);//죄다 object Object로 출력된다.
  output.session = request.session;
  console.log("그럼 request.session은 출력되나 ?? ::: " + request.session);//얘도 마찬가지.....
  console.log("output.session에 담긴 내용이 궁금해 ::: " + output.session);//죄다 object Object로 출력된다.

  //세션을 저장한다
  request.session.now = (new Date().toUTCString());
  console.log("output.session에 담긴 내용이 바꼈는지 궁금해 ::: " + output.session);//죄다 object Object로 출력된다.
  console.log("request.session.now에 담긴 내용이 궁금해 ::: " + request.session.now); //Date객체가 생성해준 현재 시간이 담기네

  //응답한다 => 하나 알게 된 사실... 정확한 건 아니지만 디버깅 하면서 알게 된 사실 !!!! response.send()는 한 개만 보낼 수 있다. 여러개면 오류난다...
  
  //response.send("output ::: " + output);//스트링이랑 같이 쓰면, 잘 나오던 애도 오브젝트 값으로 뜸.(object)
  
  //response.send(output.session);//request.session.now값이 뜨네.
  //response.send(request.session)//reqeust.session이나 output.session이나 같은 값이 뜬다.
  
  //response.send(output.cookies);//저장한 쿠키값이 다 뜸.
  response.send(request.cookies);//session과 마찬가지로 output.cookies와 같은 값이 뜨네

  //response.send(output);//output.cookies과는 다른 값이 뜸.(세션값과 쿠키값까지 다 담긴 값인거지)

  //response.send(session);//얘는 아무 값도 안적혀있는 파일이 다운로드가 되는데?
  //response.send(cookies);//얘는 cookies 변수가 없다고 에러가 나고
  console.log("output에 다 담겼나 궁금해 ::: " + output);//죄다 object Object로 출력된다.
});

//서버를 실행한다 , app.response가 아니라 app.listen이야...
app.listen(port, function(request, response) {
  console.log("세션 쿠키 미들웨어가 실행되었습니다.");
})