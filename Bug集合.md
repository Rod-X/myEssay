### 1.垃圾回收导致数据流部分丢失

因为一些低版本浏览器的实现存在bug，在这些浏览器下使用report函数进行数据上报会丢失30%左右的数据，也就是说，report函数并不是每一次都成功发起了HTTP请求。丢失数据的原因是img是report函数中的局部变量，当report函数的调用结束后，img局部变量随即被销毁，而此时或许还没来得及发出HTTP请求，所以此次请求就会丢失掉。

```javascript
var report = function(src){
  var img = new Image()
  img.src = src
}
report('http://xxx.com/imgsrc')

//把变量闭包保存起来 
var report = (funciton(){
  var imgs = []
  return function(src){
    var img = new Image()
    imgs.push(img)
    img.src = src
  }
})()

```



### 2.内存泄漏

在IE浏览器中，由于BOM和DOM中的对象是使用C++以COM对象的方式实现的，而COM对象的垃圾收集机制采用的是引用计数策略。在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收，但循环引用造成的内存泄露在本质上也不是闭包造成的。