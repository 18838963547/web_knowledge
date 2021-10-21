var a=10;
var foo={
  a:20,
  bar:function(){
      var a=30;
      return this.a;
    }
}
console.log(foo.bar()); // 20
console.log((foo.bar)()); // 10
console.log((foo.bar=foo.bar)()); //30
console.log((foo.bar,foo.bar)());

