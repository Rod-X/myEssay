## 生命周期阶段
初始化阶段
模板编译阶段
挂载阶段
卸载阶段

## 生命周期钩子
所有生命周期钩子的 this 上下文将自动绑定至实例中，因此你可以访问 data、computed 和 methods。这意味着你不应该使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())。因为箭头函数绑定了父级上下文，所以 this 不会指向预期的组件实例，并且this.fetchTodos 将会是 undefined。

beforeCreate
created
beforemount
mounted
beforeUpdate
updated
beforeDestroy
destroyed

activated
deactivated

errorCaptured
在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

错误传播规则

默认情况下，如果全局的 config.errorHandler 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。

如果一个组件的 inheritance chain (继承链)或 parent chain (父链)中存在多个 errorCaptured 钩子，则它们将会被相同的错误逐个唤起。

如果此 errorCaptured 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 config.errorHandler。

一个 errorCaptured 钩子能够返回 false 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 errorCaptured 钩子和全局的 config.errorHandler。


### 初始化阶段
new Vue() 到created之前的阶段叫做初始化阶段
初始化一些属性，事件以及响应式数据，如props/method/data/computeed/watch/provide/inject

### 模板编译阶段
created钩子函数与beforemount钩子函数之间的阶段时模板编译阶段
主要目的时将模板编译为渲染函数，只存在于完整版
使用vue-loader时，打包好的代码中时不需要编译器的，用运行时版本即可

所以生产环境中，不存在模板编译阶段

### 挂载阶段
beforemount狗子函数到mounted钩子函数之间时挂载阶段
这个阶段dom'其实例挂载到dom元素上，就是将模板渲染到指定的dom元素中。
在挂载过程中，vue会开启watcher来持续追踪依赖的变化

已挂载钻状态下，vue会持续追踪状态的变化。当数据发生变化时，watcher会通知虚拟dom重新渲染/并且会触发beforeUpdate钩子函数。虚弱完毕后会触发updated钩子函数
这个过程也就是我们说的响应式

### 卸载阶段
vue会将自身冲父组件中删除，取消实例上所有依赖的追踪并且移除所有的事件监听其


### vue父子组件生命周期
挂载阶段
父beforeCreate -> 父created -> 父beforeMount -> 
子beforeCreate -> 子created -> 子beforeMount -> 子mounted 
-> 父mounted

更新阶段
父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated

销毁阶段
父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed


### 从源码角度了解生命周期
```javascript
new Vue(option) 
👇
function Vue (options) {
    // 简单判断，vue应该用vnew来执行
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

this._init(options);
👇
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
      ...
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    ...
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');
    ...
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
```

#### 初始化阶段源码流程
合并option（用户或者符实例的属性）->
initLifecycle->
initEvents->
initRender->
callHook(vm, 'beforeCreate');->
initInjections->
initState->
initProvide->
callHook(vm, 'created');->挂载


provide / inject
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。
提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

```javascript
// 祖先组件
data() {
  return {
    obj:{name:'dax1'},
  }
}
provide(){
  return{
    username:this.obj	// 此处provide一个对象
  }
},
// 后代组件
export default {
    inject: ['username']    
}
// 此时 username是响应式的数据，因为对象的属性是响应的。

```
### callHook原理
```javascript
function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  const handlers = vm.$options[hook];
  const info = `${hook} hook`;
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

// 回去触发vm.$options中生命周期数组进行辩论触发对应函数

```

### 初始化实例属性 initLifecycle
`$`开头属性都是提供用户使用的，内部属性都是以下划线_;

```javascript
$options
$parent
$children
$root
$refs

```

```javascript

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    // 子组件时自行添加到本组件的￥chidren数组中
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
```

### 初始化事件 initEvnet
初始化事件是指，我们v-on注册的事件

```javascript
function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
// 判断是否存在修饰符
var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});
```

### 初始化inject
会使用while自定向上查找 每个父实例的 provide提供的属性

### 初始化属性
先初始化prop
再初始化methods
再初始化data data中可以使用prop属性
再初始化computed 
最后初始watch 所有这里能监听data和props中的数据
```javascript
function initState (vm) {
  // 搜集所有的watche/￥watcher和watchr中添加的
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```
#### 初始化prop
vue所有组件都是vue实例，组件进行模板解析是，会将标签上的属性解析成数据，最终生成渲染函数
渲染函数执行时，会生成真实的dom节点，便渲染到试图中，
如果某个节点时组件节点，也就是模板中，某个标签的名字时组件名，那么虚拟dom渲染的过程中会将子组件实例化，
这会模板解析时从变迁属性上解析出的数据当作参数传递给子组件，其中包含props数据

父组件 传入a-name 
在子组件 props需要用驼峰化解析 aName

```javascript
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      // 驼峰化解析
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}
```

### 初始化method
遍历事件，
每个method属性
是否合法
是
依次挂载到vm上
```javascript
function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}
```

### 初始化data

最终会保存在vm._data中
如果是一个函数会被理解执行，获得返回值，否则是返回空对象
属性名不能以$或者下划线开头
名字不重复才能被注册
props中不存在才能被注册
数据在调用observe方法转换为响应式数据

```javascript
function initData (vm) {
  var data = vm.$options.data;
  // 如果是一个函数会被理解执行，获得返回值，否则是返回空对象
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    // props中不存在才能被注册
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}
```

### 初始化compute
vm是ViewModel的缩写,是视图模型--vue实例上下文 this
简单说compute是一个定义在vm上简单的getter方法
计算属性的结果会被缓存，只有在计算属性所依赖的响应式属性或者说计算属性的返回值发生变化时才会重新计算

#### 如何指定计算属性的返回值是否发生了变化
结合watcher的dirry属性来分别：当dirty属性，是否为脏属性，true时触发重新计算。false说明是一个未发生变化的属性/不需要重新计算
当计算属性中的内容发生变化后，计算属性的watcher与组件的watcher都会得到通知
计算属性的wacher会将自己的dirty设置为true，当下一次读取计算属性时，就会重新计算一次值。
然后自考的watcher也会得到通知，从而执行render函数进行重新渲染的操作
由于要重新执行render函数，所有会重新读取计算属性的值，这时候计算属性的watcher已经把自己的dirty设置为true，所有会重新计算一次计算属性的值，用于本次渲染

1.模板读取计算属性
2.计算属性，运行计算函数并使用warcher观察数据变化
3.数据发生变化，计算属性的watcher将dirty设置为true，同时会通知模板，需要重新渲染，
4.模板会重新运行计算属性函数，因为（dirty）为true，计算完后，dirty变为false

新的改动--当计算属性收集的依赖发生变化时,计算属性的值没有发生变化,依旧会走一遍渲染函数.
          此时就改动为,依赖发生变化,执行异步计算函数,再比较新旧值是否发生变化,没有变化则不通知渲染,dirty再次设置为false

getter方法被触发时会发生两件事
1.计算当前计算属性的值，此时会使用wathcer去观察计算属性中用到的所有其他数据的变化。同时将计算属性的wathcer的dirty属性设置为true
2.当计算属性中用到的数据发生变化时，将得到通知从而进行重新渲染操作

```javascript
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4

// 实现响应式和缓存功能
// 每次读取都会执行computergetter
function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
        // warcher。depend方法会遍历deps属性，并一次执行dep实例的depend方法
        // dep实例的depend方法就是将组件的wathcer 一次加入到这些dep实例中,这就实现了组件键的watcher观察计算属性中用到的所有状态变化时,组件的wather会受到通知,从而重新渲染
        // depend () {
        //   let i = this.deps.length
        //   while (i--) {
        //     this.deps[i].depend()
        //   }
        // }

      }
      return watcher.value
    }
  }
}

function initComputed (vm, computed) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  const isSSR = isServerRendering();

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm);
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(`The computed property "${key}" is already defined as a method.`, vm);
      }
    }
  }
}
```
#### 实现原理解析compute
1、每个computed属性都会生成对应的Watcher实例，watcher拥有value属性和get方法，computed的getter函数会在get方法中调用，并返回赋值给value。初始设置dirty和lazy为true，当lazy为true时不会立即执行get方法，而是会在读取computed值时执行；

2、将computed属性添加到组件实例上，通过get、set进行属性值的获取或设置，并且重新定义getter方法；

3、页面初始化时，会读取computed属性值，触发重新定义的getter，由于观察者的dirty值为true，将会调用原始的getter函数，当getter方法读取data数据时会触发原始的get方法(数据劫持中的get方法)，将computed对应的watcher添加到data依赖收集器(dep)中。观察者的get方法执行完后，更新观察者的value，并将dirty置为false，表示value值已更新，之后执行观察者的depend方法，将上层观察者也添加到getter函数中data的依赖收集器(dep)中，最后返回computed的value值；

4、当更改了computed属性getter函数依赖的data值时，将会触发之前dep收集的watcher，依次调用watcher的update方法，先调用computed的观察者的update方法，由于lazy为true，会将dirty先设置为true，表示computed属性getter函数依赖data发生变化，但不调用观察者的get方法更新value值。这时调用包含更新页面方法的观察者的update方法，在更新页面时会读取computed属性值，触发重新定义的getter函数，由于dirty为true，调用该观察者的get方法，更新value并返回，完成页面渲染；


### 初始化watcher
初始化状态最后一步就是初始化watch,
遍历options中watch属性,watch创建的内部调用vm.$watch实现响应式

注意，不应该使用箭头函数来定义 watcher 函数 (例如 searchQuery: newValue => this.updateAutocomplete(newValue))。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined。



```javascript
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true
    },
    // 你可以传入回调数组，它们会被逐一调用
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1

function initWatch (vm, watch) {
  for (const key in watch) {
    const handler = watch[key];
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}
```
### 初始化provide
如果时函数则将其执行后返回值,存储,不然直接存储提供给值
```javascript
function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}
```
### callHook(vm, 'beforeMount')
会递归挂载完子组件,再进行当前实例的mounted
### callHook(vm, 'mounted')
1. 先得到渲染函数options.render
1. 执行beformount钩子函数
1. 更新组件属性,并执行渲染函数,将虚拟dom挂载到el真实dom上(也叫做渲染视图)
1. 执行mounted方法

```javascript
function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  let updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = () => {
      const name = vm._name;
      const id = vm._uid;
      const startTag = `vue-perf-start:${id}`;
      const endTag = `vue-perf-end:${id}`;

      mark(startTag);
      const vnode = vm._render();
      mark(endTag);
      measure(`vue ${name} render`, startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(`vue ${name} patch`, startTag, endTag);
    };
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

```
### callHook(vm, 'beforeUpdate')
在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。

该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。
挂载完成后,组件wacher触发update前
```javascript
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
```
### callHook(vm, 'deactivated')
在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 vm.$nextTick：
```javascript
function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
```
### callHook(vm, 'activated')
### callHook(vm, 'deactivated')


### callHook(vm, 'beforeDestroy')
先递归销毁完子组件后,再销毁当前实例组件
### callHook(vm, 'destroyed')
当组件被消耗时会调用$destroy方法
1. 调用销毁钱钩子函数beforeDestroy
1. 从父组件中移除,当前实例.
1. 卸载vm中的watch
1. 执行一次null的pathc将虚拟dom已经渲染的dom卸载
1. 执行destory钩子函数,执行off卸载,绑定事件,解除与el的绑定
```javascript
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
```


