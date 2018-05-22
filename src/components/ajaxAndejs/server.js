var express = require('express');
var app = express();


 
app.set('view engine', 'ejs');// view engine으로 ejs를 사용하겠다는 의미.
app.set('views', './views');
app.use(express.static('ajaxAndejs'));//이미지, css파일 및 JavaScript파일과 같은 정적인 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인


app.get('/',function(req,res){
  res.sendFile(__dirname + '/main.html');
  console.log("겟 되긴 된거니");
})
 
app.post('/',function(req,res){//tamplate.ejs에 txt1, txt2라는 키워드로 'hi'와 'welcome'라는 메세지를 전달.
  res.render('template',{txt1:"hi",txt2:"welcome"});
  console.log("포스트 되긴 된거니");                                               
})
 
app.listen(3000, function(){
  console.log("Start server on port 3000");
})
 

// express.static()을 사용한다.
// 정적 리소스가 포함된 디렉토리 이름을 express.static 미들웨어 함수에 전달하면, 파일의 직접적인 제공을 시작할 수 있다.
// 예를 들면, 다음과 같은 코드를 이용하여 public이라는 이름의 디렉토리에 포함된 이미지, css파일, JavaScript파일을 제공함을 의미한다.
// app.use(express.static('public'));
// public앞에 어떤 공통적인 경로가 있다면 이렇게 설정해주면 된다. 
// app.use('/AnyDir', express('public'));