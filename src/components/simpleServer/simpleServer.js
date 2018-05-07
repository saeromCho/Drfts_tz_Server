

var http = require('http');//http라는 node.js 내장 모듈을 가져옴

var hostName = '127.0.0.1';//로컬호스트로 hostName설정
var port = 3000;//포트번호 설정

http.createServer(function(req, res) {//http모듈 내에 있는 createServer라는 메소드를 실행, req와 res를 매개변수로 갖음. 이 메소드는 server인스턴스를 생성해준다.
  res.writeHead(200, {'Content-Type': 'text/plane'});//사용자 요청에 대한 Http Header를 보내준다.요청 타입
  res.end('saeromCho Challenge');//요청 메세지가 들어오면 출력할 메세지
}).listen(port, hostName);//listen메소드는 입력된 port로 서버를 여는 메소드. port와 hostName이 들어오길 들으면서 기다리고 있음.

console.log('Server running at http://' + hostName + ':' + port);//해당 메세지를 콘솔로 출력

console.log('Server running at http://' + hostName + ':' + port);//해당 메세지를 콘솔로 출력

console.log('Server running at http://' + hostName + ':' + port);//해당 메세지를 콘솔로 출력

console.log('Server running at http://' + hostName + ':' + port);//해당 메세지를 콘솔로 출력

