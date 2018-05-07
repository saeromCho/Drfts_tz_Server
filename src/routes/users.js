var express = require('express');
var router = express.Router();

//라우터 객체 router의 get()메소드를 이용해, GET /users 프로토콜에 대한 로직을 구현하였다.
//프로토콜의 메소드에 따라 라우터 객체의 메소드구문들을 사용할 수 있다.
//GET :: router.get()
//POST :: router.post()
//PUT :: router.put()
//DELETE :: router.delete()

//GET users listing.
router.get('/', function(req, res, next) {//URL을 '/'만 해준 이유는, app.js에서 어떻게 해주냐에 따라 달라진다. 
//app.js에서는 app.use('/users', users);로 라우팅을 설정해주었기 때문에 users.js모듈에서는 / 만으로 라우팅 설정을 할 수 있다.
//만약 app.js에서 app.use('/otherRouting/users', users);로 라우팅을 설정해 주었다면 users.js모듈에선 /otherRouting/이 될 것이다.
//두번째 파라미터는 콜백함수이며, URL에 접속했을 때 실행되는 함수이다.
  res.send('respond with a resource');
});