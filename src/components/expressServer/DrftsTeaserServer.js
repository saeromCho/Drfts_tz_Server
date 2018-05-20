var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var port = 3000;

var app = express();

app.use(bodyParser());



var dbConnection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'tofha0605',
  database : 'drfts_tz'
});


app.get('/index', function(request, response) {
  fs.readFile('index.html', function(error, data) {
    response.send(data.toString());
  });
});

app.post('/savecomment', function(request, response) {
  var comment = request.param('comment');//request객체를 사용해서, 보낸 comment를 받는다.
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  
  if(month < 10) {
    month = "0" + month;
  } else {
    month = month;
  }
  date = year.toString() + month.toString() + day.toString();
    var sql = "INSERT INTO DrftsTeaser(comment, day) VALUES(?, ?);";
    dbConnection.query(sql, [comment, date], function(err, result) {
      if(err) {//20180518이 날짜 형식임
        console.log(err);
        return;
      }
      console.log("comment 테이블 insert 완료!!!!!!!!!!");
    });
  
  response.redirect('/viewcomment');
});

app.get('/viewcomment', function(request, response) {
    var sql = "SELECT * FROM DrftsTeaser";
    dbConnection.query(sql, function(err, result) {
      if(err) {
        console.log(err);
        return;
      }
      response.send(result);
      console.log("comment 테이블 select 완료!!!!!!!!!!");
    });
});



app.listen(port, function() {
  console.log("서버에 접속되었습니댜.");
});