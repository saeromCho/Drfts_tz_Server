
// mySql모듈 인클루드
var mysql = require('mysql');
var express = require('express');
var port = 3000;


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

//서버를 생성한다.
var app = express();

dbConnection.connect(function(err) {
  if(err) console.log(err);
  console.log("DB에 잘 접속되었습니다.");
  var sql = 'select * from comment';
  dbConnection.query(sql, function(err, result) {
    if(err) console.log(err);
    console.log("comment 테이블 select 완료....");
  })
})

//라우터를 설정한다.
app.get('', function(request, response) {
  dbConnection.query('select * from comment', function(err, result, fields) {//콜백함수가 갖고 있는 참조인자의 err는 에러 상태를, result는 쿼리가 실행되고 나서의 결과값인 data이다.
    console.log("결과값? ::: " + result);
    response.send(result);
  });
});

//서버를 실행시킨다.
app.listen(port, function() {
  console.log("서버에 접속되었습니댜.");
  
});