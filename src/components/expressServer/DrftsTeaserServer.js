var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var port = 3000;

var app = express();

app.use(bodyParser());
app.use(express.static('expressServer'));



var dbConnection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'tofha0605',
  database : 'drfts_tz'
});


app.get('/index', function(request, response) {
  
  //fs.readFile(__dirname + '/index.html');

  var sql = "SELECT * FROM DrftsTeaser";
    dbConnection.query(sql, function(err, result) {
      if(err) {
        console.log(err);
        return;
      }
      //response.send(result.toString());
      //response.send(result);
      //response.render('template',{txt1:result});
      console.log("index페이지에서 comment 테이블 select 완료");
      // var data = "<html><head><title>Node.js with Input COMMENT PAGE</title></head><body id='body'>";
      //     data += "<h1>Drfts_ Write COMMENT PAGE</h1>";
      //     data += "<input type='text' id='comment' name='comment'/>";
      //     data += "<input type='button' class='ajaxsend' value='ajax_test' />";
      //     data += "<hr/><div class='result'>";
      for(var i in result) {
        console.log(result[i]);
        
        //data += "<div>" + result[i] + "</div>";
      }
      // data += "</div>";
      // data += "</body></html>";
      //response.send(result);
      // response.send(data);
    });
  // fs.readFile('index.html', function(error, data) {
    response.sendFile(__dirname + '/index.html');
  // });
});

//서버에서 app.post()는 클라이언트 단에서 post로 보낸 값을 처리해주기 위함이다.
app.post('/index', function(request, response) {
  // console.log(request.body.comment);
  // console.log(request.param('comment'));
  var responseData = {'result' : 'ok', 'comment' : request.body.comment};
  // console.log(responseData);
  response.json(responseData);

  var comment = request.param('comment');// request.body.comment;request객체를 사용해서, 보낸 comment를 받는다.
  // console.log("코멘트내용 ::: " + comment);
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
      console.log("comment 테이블 insert 완료");
    });

    // var sql = "SELECT * FROM DrftsTeaser";
    // dbConnection.query(sql, function(err, result) {
    //   if(err) {
    //     console.log(err);
    //     return;
    //   }
    //   response.send(result);
    //   //response.render('template',{txt1:result});
    //   console.log("comment 테이블 select 완료");
    // });
    
  //response.redirect('/viewcomment');
  //response.redirect('/index');
});

// app.get('/viewcomment', function(request, response) {
//     var sql = "SELECT * FROM DrftsTeaser";
//     dbConnection.query(sql, function(err, result) {
//       if(err) {
//         console.log(err);
//         return;
//       }
//       //response.send(result);
//       response.render('template',{txt1:result,txt2:"welcome"});
//       console.log("comment 테이블 select 완료!!!!!!!!!!");
//     });
//     //response.redirect('/index');
// });


// app.get('/viewcomment', function(request, response) {
//   var sql = "SELECT * FROM DrftsTeaser";
//   dbConnection.query(sql, function(err, result) {
//     if(err) {
//       console.log(err);
//       return;
//     }
//     response.send(result);
//     console.log("comment 테이블 select 완료!!!!!!!!!!");
//   });
// });



app.listen(port, function() {
  console.log("서버에 접속되었습니댜.");
});