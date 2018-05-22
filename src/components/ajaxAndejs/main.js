// main.js 내용
// 그리고선 자바스크립트 코드를 작성한다.
// 간단하게 버튼을 클릭하면, Ajax을 요청하는 이벤트를 등록해준다.
// 또한 Ajax로부터 들어온 HTML 데이터를 화면에 렌더링 시켜주도록 한다.

// 쿼리 셀렉터를 지정해준다. class이름이 ajaxsend인 애를 등록해주고 이를 click했을 때 발생하는 이벤트리스너이다.
// 버튼을 클릭하면 localhost:3000인 애로 값이 보내질텐데, 그때 사용되는 함수는 sendAjax라는 함수이다. 밑에서 선언해주었다
document.querySelector('.ajaxsend').addEventListener("click",function(){
  sendAjax('http://localhost:3000/');
})

// sendAjax 함수는 url을 인자로 받아서 실행되는 함수다.
//
function sendAjax(url){
  var oReq = new XMLHttpRequest();//XMLHttpRequest란? Ajax로 실행되는 HTTP통신은 XMLHttpRequest규격을 이용하고 있다. 가장 기본통신으로 많이 사용되고 있는 규격이다.
  // Ajax(Asynchronos Javascript And XML)의 핵심인 XMLHttpRequest에 의한 송수신 흐름으로는,
  // 1. 사용자 쪽에서는 XMLHttpRequest 오브젝트 생성. => new XMLHttpReuqest()
  // 2. HTTP 요청 발생 => open()메소드(POST, GET, 요청할 URL, 동기/비동기 방식의 지정), send()메소드(데이터 송신)
  // 3. 서버 쪽에서는 

  oReq.open('POST', url);
  oReq.setRequestHeader('Content-Type', "application/json")                                        
  oReq.send();

  oReq.addEventListener('load', function(){
    var result = oReq.responseText;
    console.log(oReq.responseText)
    document.querySelector('.result').innerHTML = result
  })
}


// Ajax란 Asynchronos Javascript And XML이다. 
// 쉽게 말하면, 자바스크립트를 통해서 서버에 데이터를 요청하는 것이다. HTML form태그가 아니라 자바스크립트를 통해서!
// 따라서 우리는 서버에서 로딩된 데이터를 페이지에 보여주기 위해 새로운 HTML페이지로 갈 필요도 없고, '새로고침'을 할 필요도 없는 것이다.
// 부분 부분만 로딩되므로 속도도 빠르다.

// Asynchoromos : 해석하면 '비동기적'이라는 뜻. '비동기적'이라는 것은, 클라이언트에서 서버에 요청을 보낼 때 요청을 보내놓고 프로그램은 계속 돌아간다는 것이다. 
// 즉, 먼저 요청한 것에 대한 콜백함수가 먼저 실행되지 않는다는 것이다.

// XML : XML은 데이터형식의 일종이다. 'Extensible Markup Language'의 준말로, '확장가능한 표시 언어' 라는 것이다.
// 그렇담, markuo language이란 무엇인가? 이것은 데이터에 태그로 항목 표시를 해준다는 것이다. HTML도 마크업 랭귀지의 일종이다.
// 만약 사람의 키, 나이 등을 표현하고 싶다면 XML에서는 <person> <height><age></age></height> </person> 이런 식으로 작성할 것이다.

//웹서버 : AJAX는 웹서버가 있어야만 동작한다. 그저 HTML페이지처럼 브라우저만 있다고 돌아가는 것이 아니다.

// AJAX의 본래 명칭은, XHR(XML Http Request)이다. 즉 HTTP Request를 서버에 보낸다는 것이다.
// AJAX의 4가지 과정에 대해서 알아보자.
// 1. XML Http Request Object를 만든다. => 브라우저에게 request 보내는 걸 준비시키는 과정이다. 이를 위해서 그 기능의 메소드를 갖고 있는 object객체가 필요하다.
// 2. Callback 함수를 만든다. => 서버에서 response가 왔을 때 실행시키는 함수이다. html페이지를 업데이트한다.
// 3. Open a request => 여기서 브라우저에게 두 가지 정보를 넘긴다. 브라우저가 request를 보내기 위해 사용할 method(예: post, get) / 그리고 request가 갈 URL
// 4. send a Request

