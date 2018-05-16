// var http = require('http');


// var server = http.createServer(function(request,response){
//   // 1. post로 전달된 데이터를 담을 변수를 선언
//   var comment;// = request.param('comment');
//   // 2. request객체에 on( ) 함수로 'data' 이벤트를 연결
//   request.on('data', function (data) {
//     // 3. data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 저장
//     commentArray.push(comment);
//     //postdata = postdata + data;
//   });

//   // 4. request객체에 on( ) 함수로 'end' 이벤트를 연결
//   request.on('end', function () {
//     // 5. end 이벤트가 발생하면(end는 한버만 발생한다) 3번에서 저장해둔 postdata 를 querystring 으로 객체화
//     var commentArrayQuery = querystring.parse(commentArray);
//     // 6. 객체화된 데이터를 로그로 출력
//     console.log(commentArrayQuery);
//     // 7. 성공 HEADER 와 데이터를 담아서 클라이언트에 응답처리
//     response.writeHead(200, {'Content-Type':'text/html'});
//     //response.end(commentArrayQuery);
//   });

// });

// server.listen(port, function(){
//     console.log('Server is running...');
// });


 
// http.createServer(app).listen(8000, function() {
//   console.log('Express server listening on port ');
// });
