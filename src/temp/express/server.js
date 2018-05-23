//모듈을 추출한다
var fs = require('fs');//fs 미들웨어에 대해서는 따로 npm을 설치해주지 않아도 되는 node.js의 기본 내장 미들웨어인 거 같다. 우와 신기하다...
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var port = 3000;

//서버를 생성한다
var app = express();
//어레이를 생성한다.
var commentArray = [];

//미들웨어를 설정한다
app.use(bodyParser());


/**
 * 라우팅설정
 */

//기본 index페이지고, index.html을 읽어와서 화면에 뿌려준다.
//index.html은 post형식으로 form을 구성해놓았다.
//action은 라우터가 /savecomment라는 곳이다. (적은 코멘트 값들을 저장해주는, 최종 view에 가기 전에 중간에 들르는 곳인 임시 저장소다.)
app.get('/index', function(request, response){
  fs.readFile('index.html', function(error, data) { //아.. fs는 파일을 추출해주는(읽어오는) 미들웨어인가보다. 위에서 왜 require를 해주었는지 알게 되었다. node.js의 기본 내장 모듈인 듯 하다.
    response.send(data.toString());
  });
});


//index.html에서 보낸 코멘트들을 server에서 생성해뒀던 array에 저장해주는, 중간 단계의 라우터다.
//index.html에서 comment라는 이름으로 보낸 값을 받아서
//server에 있던 array인 commentArray에 해당 값을 담는다(push)
//array에 담은 즉시, view에 해당하는 라우터(/viewcomment) 에게 바로 redirect 해준다.
app.post('/savecomment', function(request, response) {
  var comment = request.param('comment');//index.html에서 comment라는 이름으로 보낸 값을 받는 변수 설정
  commentArray.push(comment);//보낸 comment값 받아서, commentArray에 담아주기
  
  console.log("코멘트 어레이 내용 ::: " + commentArray);

  response.redirect('/viewcomment');//라우터가 /viewcomment인 애에다가, commentArray를 전송한다(redirect)
});

/**
 * 뭔가 여기서 commentArray를 받은 다음에,,, viewcomment.html로 해당 값(코멘트 어레이값들)을 보내줘야 할 거 같은데...
 *  그 값을 보내면 viewcomment.html 내부에서는, 보낸 값을 받아서 화면에 뿌려줘야 할 거 같고.
 * app.post('/viewcomment', function(request, response) {
 * });
 */

//받은 commentArray를 받아서 바로 뿌려준다.
//리다이렉트를 해줘서 그런지, commentArray의 값이 유지가 되는 거 같다.(이건 더 확인이 필요하다)
//내가 viewcomment.html이라고 따로 html을 읽게 해줬는데, 왜 안읽는거지..? => data.toString()이어야 html값들을 읽어오는데, 얘를 안해줬었잖아...
//viewcomment.html에서 값 받아서 뿌려주는 걸 html로 작성해야할듯?
app.get('/viewcomment', function(request, response) {
  /**얘는 html 이용안하고 바로 뿌려줄 수 있는 방식.*/
  response.send(commentArray + "<br/><br/><a href = '/index'> Go To index page!!</a>");

  /**얘는 html 이용해서, 걔에다가 값 보내면 걔가 값 읽어서 뿌려주는 방식. 얘로 해야 정석이지 않을까 생각함.
  fs.readFile('viewcomment.html', function(error, data) { //아.. fs는 파일을 추출해주는(읽어오는) 미들웨어인가보다. 위에서 왜 require를 해주었는지 알게 되었다. node.js의 기본 내장 모듈인 듯 하다.
    response.send(data.toString());
  });
  */
});

//서버를 실행한다.
app.listen(port, function() {
  console.log("Drfts 루트페이지에 오신 것을 환영합니다.");
})
