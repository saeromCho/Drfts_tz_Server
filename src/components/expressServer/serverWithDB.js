var fs = require('fs');
var bodyParser = require('body-parser');
// mySql모듈 인클루드
var mysql = require('mysql');
var express = require('express');
var port = 3000;


//서버를 생성한다.
var app = express();

//미들웨어를 설정한다.
app.use(bodyParser());


// DB 접속을 위한 설정 코드,
// host는 접속하고자하는 서버 url 주소이다.
// user는 접속하고자하는 user명이다.(root가 디폴트값이다.)
// password는 user의 비밀번호고
// database는 접속하고자하는 database의 스키마를 설정해주면 된다.
var dbConnection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'tofha0605',
  database : 'drfts_tz'
});


// 이로써 node.js와 mySql의 접속은 끝났다. 사용법도 간단하다.
// server.js나 다른 모듈에서 db를 사용하고자 할때는, dbConnection.query를 사용한다.
// (예) 
// dbConnection.query의 첫번째 인자는 실행하고자하는 쿼리내용을, 두번째는 쿼리가 실행되고 나서의 CallBack Function을 명시해주면 된다.
// dbConnection.query('select * from test', function(err, result, fields) {//콜백함수가 갖고 있는 참조인자의 err는 에러 상태를, result는 쿼리가 실행되고 나서의 결과값인 data이다.
//   console.log(result);
// });

// 만약 조건에 맞는 쿼리를 뽑아내고 싶다면?
// 인자값이 하나가 더 늘었다. 쿼리에서는 변수를 넘기기 위해 ? 라는 얘를 사용한다. 그리고 ? 안에는 배열 안에 id값을 넣었다.
// 이처럼, 배열 안에 인자값을 추가함으로서 쿼리 안에 변수를 넣어 where절을 실행할 수 있다.
// 변수값은 ?에 따라 차례대로 입력되고, 순서나 개수가 맞지 않으면 에러가 난다.
// dbConnection.query('select * from test where id = ?', [id], function(err, result, fields) {
//   console.log(result);
//   console.log("id가 궁그매 ::: " + id); 
// });

// dbConnection.connect(function(err) {
//   if(err) {
//     console.log(err);
//     return;
//   } 
//   console.log("DB에 잘 접속되었습니다.");
//   var sql = 'select * from comment';
//   dbConnection.query(sql, function(err, result) {
//     if(err) {
//       console.log(err);
//       return;
//     }
//     console.log("comment 테이블 select 완료....");
//   });
// });

// //라우터를 설정한다.
// app.get('', function(request, response) {
//   dbConnection.query('select * from comment', function(err, result, fields) {//콜백함수가 갖고 있는 참조인자의 err는 에러 상태를, result는 쿼리가 실행되고 나서의 결과값인 data이다.
//     console.log("결과값? ::: " + result);
//     response.send(result);
//   });
// });

//서버를 실행시킨다.
app.listen(port, function() {
  console.log("서버에 접속되었습니댜.");
});


//index.html에서 보낸 코멘트 값을 받는다.
//받은 라우터에서는 그 값을 쿼리 내용에 넣는 거고, 그 쿼리를 통해 코멘트를 받을 때마다 디비에 저장한다.
//showComment.html에서는 디비에 있던 값을 하나하나 뿌려주면 될 것이다.
//저번에 작성했던 server.js를 참고해서 구현해보자

//index.html의 파일을 읽어서 화면으로 뿌려주는 라우터이다.
//해당 url에서는 코멘트를 입력하고 전송버튼을 누르는 것까지의 행동을 수행한다.
//버튼은 submit의 역할이고 post형식의 액션으로, 방향은 /savecomment로 향하게 했다.
app.get('/index', function(request, response) {
  fs.readFile('index.html', function(error, data) {
    response.send(data.toString());
  });
});


//index.html에서 post로 보낸 값을 post로 받는다.
//디비를 사용한다면, 이 url에서 받은 코멘트들을 디비에 저장해주는 행동을 수행해주면 될 듯하다.
//
app.post('/savecomment', function(request, response) {
  var comment = request.param('comment');//request객체를 사용해서, 보낸 comment를 받는다.
  // dbConnection.connect(function(err) {
  //   if(err) {
  //     console.log(err);
  //     return;
  //   }
    //받은 코멘트를 insert구문을 사용해서 삽입해준다. 공부해서 적자. 다까먹었다 시발.
    //INSERT INTO Reservation(ID, Name, ReserveDate, RoomNum) VALUES(5, '이순신', '2016-02-16', 1108);
    //var sql = "insert into comment(userid, comment, day) values(0, '첫번째 코멘트', '2018-05-19')";//
    //일단 코멘트만 쿼리값으로 갖는 애를 넣어보자. 쉬운 거 먼저!
    var sql = "INSERT INTO onlyComment(comment) VALUES(?);";//여기서 필요한 건 values에 넣어줄 comment값을 쿼리에 어떻게 받아서 넣어주느냐 이다.
    dbConnection.query(sql, [comment], function(err, result) {//전달해줄 인자를 쿼리 내에서는 ?로 적어주고, 두번째 파라메터에 []와 같이, 배열형식으로 ?의 개수만큼 전달해줄 값들을 나열해주면서 써주면 된다.
      if(err) {
        console.log(err);
        return;
      }
      console.log("comment 테이블 insert 완료!!!!!!!!!!");
    });
  //});

  // var comment = request.param('comment');//index.html에서 comment라는 이름으로 보낸 값을 받는 변수 설정
  // commentArray.push(comment);//보낸 comment값 받아서, commentArray에 담아주기
  
  // console.log("코멘트 어레이 내용 ::: " + commentArray);

  response.redirect('/viewcomment');//라우터가 /viewcomment인 애에다가, commentArray를 전송한다(redirect)
});

app.get('/viewcomment', function(request, response) {
  //db를 읽어와서 뿌려주는 방법을 알아보자.
  //response.send(comment + "<br/><br/><a href = '/index'> Go To index page!!</a>");comment라는 값을 못찾아버리네

  var comment = request.param('comment');//request객체를 사용해서, 보낸 comment를 받는다.
  // dbConnection.connect(function(err) {
  //   if(err) {
  //     console.log(err);
  //     return;
  //   }
    //받은 코멘트를 insert구문을 사용해서 삽입해준다. 공부해서 적자. 다까먹었다 시발.
    //INSERT INTO Reservation(ID, Name, ReserveDate, RoomNum) VALUES(5, '이순신', '2016-02-16', 1108);
    //var sql = "insert into comment(userid, comment, day) values(0, '첫번째 코멘트', '2018-05-19')";//
    //일단 코멘트만 쿼리값으로 갖는 애를 넣어보자. 쉬운 거 먼저!
    var sql = "SELECT * FROM onlyComment";//여기서 필요한 건 values에 넣어줄 comment값을 쿼리에 어떻게 받아서 넣어주느냐 이다.
    dbConnection.query(sql, function(err, result) {//전달해줄 인자를 쿼리 내에서는 ?로 적어주고, 두번째 파라메터에 []와 같이, 배열형식으로 ?의 개수만큼 전달해줄 값들을 나열해주면서 써주면 된다.
      if(err) {
        console.log(err);
        return;
      }
      response.send(result);// + "<br/><a href = '/index'> Go To index page!!</a>");
      console.log("comment 테이블 select 완료!!!!!!!!!!");
    });
  //});
});