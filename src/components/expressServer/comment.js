//모듈을 추출한다
var fs = require('fs');//fs 미들웨어에 대해서는 따로 npm을 설치해주지 않아도 되는 node.js의 기본 내장 미들웨어인 거 같다. 우와 신기하다...
var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;

//서버를 생성한다
var app = express();

//미들웨어를 설정한다
app.use(bodyParser());


//일단 그냥 글씨가 써져있는 루트 페이지를 만든다.

//라우터를 설정한다
app.get('/', function(request, response) {
    response.send('<h1> 루트페이지입니다. 나중엔 써서 전송한 코멘트가 보여질 거에요. </h1><br/> <a href = "/comment"> Go To Comment page!!</a>');
    console.log("루트페이지가 잘 나온다.");
});

//comment.html파일을 읽고, error가 나면 error를 내고, 성공하면 data(html로 작성한 내용을)를 스트링으로 뿌려주는 페이지인 것 같다.
//이건 그냥 html 파일을 웹에 뿌려주는 기능을 가진 거 같다.
app.get('/comment', function(request, response){
  fs.readFile('comment.html', function(error, data) { //아.. fs는 파일을 추출해주는(읽어오는) 미들웨어인가보다. 위에서 왜 require를 해주었는지 알게 되었다. node.js의 기본 내장 모듈인 듯 하다.
    response.send(data.toString());
    console.log("data.toString()은 어떻게 나올까 ?? :::: " + data.toString());//내 예상대로 data.toString()은 내가 작성한 comment.html파일을 스트링으로 다 읽어오는 거였다. 헤헤
  });
});

app.post('/comment', function(request, response){
  var comment = request.param('comment');

  //출력한다
  console.log("코멘트 내용  ::: " + comment);
  console.log("request의 body 출력(request.body는 요청시 보내는(우리가 적어서 submit하는 id와 password였다.) 데이터를 의미하는 거였다. 전달되는 body가 json으로 출력되는 구나)");
  console.log(request.body);

  //입력한 comment값의 null여부를 확인한다.
  if(comment != "") {
    //response.send(comment.toString());
    //리다이렉트
    response.redirect('/');
    console.log("comment ::: " + comment);

  } else {//실패시, 코멘트 페이지로 리다이렉트된다.
    response.redirect('/comment');
    //response.send("코멘트를 입력하세요");
    console.log("코멘트를 입력하세요");
  }
});


//서버를 실행한다.
app.listen(port, function() {
  console.log("Drfts 루트페이지에 오신 것을 환영합니다.");
})