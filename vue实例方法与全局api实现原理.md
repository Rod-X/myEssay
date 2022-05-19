## 5个函数向Vue的原型挂载方法
```javascript
function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
```
## 数据相关实例方法
+ $props
+ $data
+ $watch
+ $delete
+ $set

```javascript
function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = "callback for immediate watcher \"" + (watcher.expression) + "\"";
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}
```

## 事件相关实例方法
+ $once
+ $on
+ $off
+ $emit

存储在Vue实例的的_events属性中
var cbs = vm._events[event];

```javascript
function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}
```

## 生命周期相关实例方法
+ $forceUpdate
迫使vue实例重新渲染，仅仅影响实例本身以及插入插槽内容的子组件。而不是所有子组件
把自动的update化为手动的update
+ $destroy
会触发beforeDestroy 和destroyed生命周期。先断掉父子组件的联系再将依赖项从watcher中移除
用户自己绑定的$watcher会放进watchers中所有需要再清除watchers中的数组
再去除$on的方法，再解除循环引用
+ $el
+ $el
+ $el

```javascript
function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
    // 每个组件内都有watcher收集组件的数据data，当数据发生变化时，会触发_watch属性里面的update方法
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
```

## vm.$nextTick
```javascript
function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}
```


### 为什么vue使用异步更新队列
数据变化-> 通知watcher->下一个事件循环->虚拟dom进行diff->更改dom->渲染
队列中不存在当前watcher才会进行添加，等待状态全部修改完毕后再一次性渲染

### 什么时事件循环
就是Javascript是一个单线程非阻塞语言，意味着javascript执行代码时，只会有一个主线程处理所有的任务。非阻塞是值当前代码需要处理异步任务时，主线程会挂起这个任务，当异步任务完成之后，主线程会去执行相应的回调。
事实上，当任务处理完毕后，javascriipt会将这个事件加入一个队列中，我们成为事件队列。
被放入事件队列的事件不会立刻执行其回调 ，而是等待当前执行栈中的所有任务执行完毕后，主线程再去查询事件队列中是否有任务
异步任务分为-微任务-宏任务

### 什么是执行栈
当我们执行一个方法时，JavaScript会生成一个与这个发方法对应的执行环境，又叫做执行上下文。
执行环境中有这个方法的私有作用域/上层作用域/方法的参数/苏体育作用域中定义的变量以及thsi对象
这个执行环境会被添加到一个栈中，这个栈就是执行栈

当一个方法执行完毕后，js会推出这个执行上下文，并再栈中销毁，回到上一个方法的执行环境。这个过程方法进行，直到执行栈中的代码全部执行完毕。


### 下次dom更新周期
其实时下次微任务执行时跟新DOm。而vm$nextTick其实时将回调添加到微任务之中，只有特殊情况会降级为宏任务。
因为更新dom的回调也是使用的$nextTick
所有数据改变要再this。nextTick之前使用，否则不能获取到最新的dom


## vm.$mount
让Vue实例具有关联的dom元素
1. options上无render函数，对template, el做处理，获取template内容。
1. 调用compileToFunctions方法，获取render函数，添加到options.render上
1. 调用mount.call，实际上是调用mountComponent函数
1. 调用beforeMount钩子
1. 实例化渲染watcher，执行回调
1. 根据render函数获取VNode节点树 （其实是一个js对象）
1. 执行update方法，实际上是patch过程，vue会执行diff算法，完成一次渲染
1. 调用mounted钩子


```javascript
var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

```
### 函数劫持
保持原来函数fn，接下来将中间插入一些方法最后return fn.apply(this,aguments)
```javascript
var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  return mount.call(this, el, hydrating)
};

```

## 全局api实现原理
全局api和实例方法不同，后者时挂载在prototype上的

### vue.extend
vue.extend就是一个扩展构造器。可以对自定义标签进行更容易的数据绑定

1. 应用场景
在 vue 项目中，初始化的根实例后，所有页面基本上都是通过 router 来管理，组件也是通过 import 来进行局部注册，所以组件的创建不需要去关注，相比 extend 要更省心一点点。但是这样做会有几个缺点：

组件模板都是事先定义好的，如果我要从接口动态渲染组件怎么办？
所有内容都是在 #app 下渲染，注册组件都是在当前位置渲染。如果我要实现一个类似于 window.alert() 提示组件要求像调用 JS 函数一样调用它，该怎么办？
这时候，Vue.extend + vm.$mount 组合就派上用场了
```javascript
<html>
<head>
    <title>Vue.extend扩展实例构造器</title>
</head>
<body>
    <baidu></baidu>
    <!-- <span id='baidu'>跳转</span> -->
    <script type="text/javascript" src="https://cdn.bootcss.com/vue/2.2.2/vue.min.js"></script>
    <script type="text/javascript">
 
        //使用Vue.extend，用它来编写一个扩展实例构造器。
        var baiduExtend=Vue.extend({
            template:"<p><a :href='bdurl'>{{bdname}}</a></p>",
            data:function(){
                return {
                    bdname:'百度',
                    bdurl:'https://www.baidu.com'
                }
            }
        })
        //扩展实例构造器是需要挂载的，我们再进行一次挂载
        new baiduExtend().$mount('baidu');
        //还可以通过HTML标签上的id或者class来生成扩展实例构造器，Vue.extend里的代码是一样的
        // new baiduExtend().$mount('#baidu');
    </script>
</body>
</html>
```

### vue.nextTick
跟this.$nextTick一样

###  Vue.set
跟this.$set(target,key,value)
对象不能时vue实例或者实例的根数据对象

### vue.delete（target,key）
跟this.$delete一样
删除对象属性，如果对象时响应式的，确保进行视图更新

### vue.directive
有些情况下，仍需要对普通的Dom元素进行底层操作。这时候就需要用到自定义指令
5个方法函数 bind inserted update compinentupdate unbind
el：指令所绑定的元素，可以用来直接操作 DOM。
binding：一个对象，包含以下 property：
+ name：指令名，不包括 v- 前缀。
+ value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
+ oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
+ expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
+ arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
+ modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。
```javascript
vue.directive('id',{
    // 只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置
    bind:(el, binding, vnode){},
    // 被绑定元素插入父节点时调用（仅保证父节点存在，但不一定被插入文档中）
    inserted:(){},
    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
    update:(){},
    // 指令所在组件的vnode及其子vnode全部更新后调用
    componentUpdate:(){},
    // 只调用一次，指令与元素解绑时调用
    unbind:(){},
})

vue.directive('id',()=>{
    // 这里会被bind和update调用
})



// 1、输入框聚焦
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus();
  },
});
 
// 2、绑定背景颜色
Vue.directive('pin', function(el, binding) { //背景颜色
    el.style.background = binding.value
})


Vue.directive("img", {
    bind:function(el){    
    var color = Math.floor(Math.random() * 1000000);
    el.style.backgroundColor = "#" + color;
    },
  inserted: function (el, binding) {
    var img = new Image();
    img.src = binding.value;
    img.onload = function () {
      el.style.backgroundImage = "url(" + binding.value + ")";
    };
  },
});

```

## vue.filter
过滤器
Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：


```javascript
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

{{ message | filterA('arg1', arg2) }}
//这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。
```

### vue.component


```javascript
Arguments:
    {string} id
    {Function | Object} [definition]

Usage:

Register or retrieve a global component. Registration also automatically sets the component’s name with the given id.

// register an extended constructor
Vue.component('my-component', Vue.extend({ /* ... */ }))

// register an options object (automatically call Vue.extend)
Vue.component('my-component', { /* ... */ })

// retrieve a registered component (always return constructor)
var MyComponent = Vue.component('my-component')

See also: Components

```

### vue.use
vue.use(plugin)
{Object | Fucction} plugin
安装过的插件会被收集起来，防止再次注册，需要在new Vue之前使用这个

```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

### vue.mixin
全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。

此方法时会改变vue.options/将这个方法传入的属性

```javascript
function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}
```

### vue.compile
将一个模板字符串编译成 render 函数。只在完整版时可用。
完整版包含编译器，所有能使用此方法
```javascript
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})

```
完整版是同时包含编译器和运行时的版本；可以把视图写在HTML或template里，有编译器可以将含有占位符{{}}或者条件语句变成真实的DOM节点，但是会增加代码体积。保证了开发体验，可直接在vue文件里写html标签，而不写h函数。
运行时的版本就是非完整版，用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。需要把视图写在render函数里，用h来创建标签，没有了编译器,不能将HTML变成节点。保证了用户体验，需下载的文件体积更小，但只支持h函数。
最佳选择：总是使用非完整版，然后配合vue-loader和vue文件，vue-loader会把vue文件里的HTML转成为h函数

### vue.version
细节：提供字符串形式的 Vue 安装版本号。这对社区的插件和组件来说非常有用，你可以根据不同的版本号采取不同的策略。

会读取package。json中的版本号

```javascript
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```

### vue.observable(object)
{Object} object
让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：
```javascript
  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```