var fruits = ["apple", "banana", "orange", "strawberry"];

console.log(fruits.length);

var first = fruits[0];
console.log(first);


var newOne = "new";

fruits.push(newOne);
console.log(fruits[fruits.length - 1]);

fruits.pop(newOne);
console.log(fruits[fruits.length - 1]);
//array에 push를 계속 해주면 되고, 읽어오는 건 그냥 마지막 index 애를 읽어오면 될 거다.

 console.log(fruits);

 var comment = [];
 comment.push("1");
 comment.push("7");
 comment.push("16");
 comment.push("5");
 comment.push("4");
 comment.push("#");
 comment.push("@");


 console.log(comment);