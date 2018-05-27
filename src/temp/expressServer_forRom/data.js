var http = require('http');


var port = 4000;

var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');

var app = express();

app.use(express.static('expressServer'));


var client = mysql.createConnection({

        host : '0.0.0.0',

        user : 'Drfts',

        password : 'drfts1234',

        database : 'drfts_tz'


        });


//웹서버를 생성합니다.

var app = express();

// app.use(express.static('expressServer'));

//app.use(express.bodyParser());

// app.use(express.json());

// app.use(express.urlencoded());


// app.use(app.router);


/*client.query('SELECT * FROM products', function (error, result, fields) {

        if (error) {

        console.log('쿼리 문장에 오류가 있습니다.');

        } else {

        console.log(result); //매개변수 result로 결과 출력

        }


});*/


app.get('/test', function (request, response) {
  //데이터베이스 요청을 수행합니다.

  client.query('SELECT * FROM DrftsTeaser', function (error, data) {

    response.type('text/xml');

    //response.header("Access-Control-Allow-Origin" , "*");

    response.set('Access-Control-Allow-Origin', '*');

    response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');

    response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

    response.send(data);

    });


  // fs.readFile('drfts.html', function(error, data) {
  // //   response.send(data.toString());
  // // });
  // // fs.readFile('drfts.html');


  // var sql = "SELECT * FROM DrftsTeaser";
  // response.type('text/xml');
  // client.query(sql, function(err, result) {
  //     if(err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log("index페이지에서 comment 테이블 select 완료");
  //     for(var i in result) {
  //       console.log(result[i]);
  //     }
  //     response.send(result);
  //   });
  //   console.log(data.toString());
        //데이터베이스 요청을 수행합니다.

        // client.query('SELECT * FROM DrftsTeaser', function (error, data) {

        // //response.type('text/xml');

        // //response.header("Access-Control-Allow-Origin" , "*");

        // response.set('Access-Control-Allow-Origin', '*');

        // response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');

        // response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

        // response.send(data);
        // console.log("왜 안읽히지..?");
        // });
  });

app.get('/:userId', function (request, response) {

  //변수 선언
  var id = Number(request.param('userId'));
console.log("아이디는 ::: " + id);
 // var comment = request.param('comment');


  //데이터베이스 요청을 수행합니다.

  client.query('SELECT * FROM DrftsTeaser WHERE userId=?', [id], function(error, data) {


  response.set('Access-Control-Allow-Origin', '*');

  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');

  response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  response.send(data);

  });


});

app.post('/test', function (request, response) {

        //변수를 선언합니다.

        var comment = request.param('comment');// request.body.comment;request객체를 사용해서, 보낸 comment를 받는다.
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


        //데이터베이스 요청을 수행합니다.

        client.query('INSERT INTO DrftsTeaser(comment, day) VALUES(?,?)', [comment, date], function (error, data) {

        response.set('Access-Control-Allow-Origin', '*');

        response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');

        response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

        //     response.send(data);

        response.send({

        message: '데이터를 추가했습니다.',

        data: item

        });
        });
});


app.put('/test/:id', function (request, response) {

        //변수를 선언합니다.
        var id = Number(request.param('id'));

        var comment = request.param('comment');
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

        var comment = request.param('comment');

        var query = 'UPDATE DrftsTeaser SET';


        //쿼리를 생성합니다.

        if (comment)

        query += 'comment="' + comment + '" ';

        if(date)

        query += 'day="' + date + '" ';


        //데이터베이스 요청을 수행합니다.
        console.log("쿼리내용 ::: ");
        console.log(query);

        client.query(query, function (error, data) {

        response.set('Access-Control-Allow-Origin', '*');

        response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');

        response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

        response.send(data);

        });


});




//웹서버를 실행

http.createServer(app).listen(port, function () {

        console.log('Server Running at http://0.0.0.0:4000/test');

});

