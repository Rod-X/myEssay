// 寄生组合式继承
// 1.通过call调用父类函数的方式，获得属性
// 2.通过空函数f（）{} 将其的prototype指向父类的prototype，实例化后赋值给子类的prototype，获取父类方法
// 3.把子类的prototype。contructor属性指向子类函数
// 4.最后定义子类prototype上的私有方法

  // 实现继承的核心函数
  function inheritPrototype(subType,superType) {
    function F() {};
    //F()的原型指向的是superType
    F.prototype = superType.prototype; 
    //subType的原型指向的是F()
    subType.prototype = new F(); 
    // 重新将构造函数指向自己，修正构造函数
    subType.prototype.constructor = subType; 
 }
 // 设置父类
 function SuperType(name) {
     this.name = name;
     this.colors = ["red", "blue", "green"];
     SuperType.prototype.sayName = function () {
       console.log(this.name)
     }
 }
 // 设置子类
 function SubType(name, age) {
     //构造函数式继承--子类构造函数中执行父类构造函数
     SuperType.call(this, name);
     this.age = age;
 }
 // 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
 inheritPrototype(SubType, SuperType)
 // 添加子类私有方法
 SubType.prototype.sayAge = function () {
    console.log(this.age);
 }
 var instance = new SubType("Taec",18)
 console.dir(instance)

 