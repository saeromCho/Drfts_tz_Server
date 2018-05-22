


router.get('/getajax', function(req, res, next) {
  //res.render("main/ajax");
  response.sendFile(__dirname + '/test.html');
});





/* POST 호출 처리 */
router.post('/ajax', function(req, res, next) {
  console.log('POST 방식으로 서버 호출됨');

  //view에 있는 data 에서 던진 값을 받아서
  var msg = req.body.msg;
  msg = '[에코]' + msg;

  //json 형식으로 보내 준다.
  res.send({result:true, msg:msg});
});

