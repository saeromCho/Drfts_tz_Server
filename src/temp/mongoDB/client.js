

//필요한 모듈(mongodb)를 인클루드 한다.
//그 후, 해당 모듈에서 mongoClient 객체를 가져온다.
//클라이언트 객체를 변수에 담는다.
var Client = require('mongodb').MongoClient;


//라우터를 설정한다.
//디비에 접속하기 위한 라우터 설정인 듯 하다.
//아까 본 내용에 따르면, 디비 이름은 school이다
//클라이언트 객체가 school의 디비 collection에 접속한다.
Client.connect('mongodb://localhost:27017/school', function(error, db){
    if(error) {//접속 실패시, 에러로그
        console.log(error);
    } else {//성공시, 성공로그
        console.log("connected:"+db);
        db.close();
    }
});