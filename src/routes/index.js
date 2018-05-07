//index.js는 라우팅을 위한 파일이다.
var express = require('express');//node의 express모듈을 임포트.
var router = express.Router();//express모듈 내의 Router()메소드를 이용해 라우팅 로직을 설정함.

//라우팅 로직 메소드
//router는 get()메소드를 이용해 /로 URL이 호출되었을 경우, 밑의 로직이 수행되게 된다.
//클라이언트로부터 GET/ 호출이 있을 경우, 밑의 내용을 토대로 렌더링 한다는 의미이다.
//두번째 param인 콜백함수는 세 개의 param을 갖는다.
//req: 클라이언트의 요청정보를 담은 객체, res: 요청한 클라이언트로 응답을 해주기 위한 객체, next: 다음 로직 수행을 위한 함수명
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

module.exports = router;