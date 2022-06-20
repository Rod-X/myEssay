// ## state

const store = new Vuex.Store({
    state: {
      todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ]
    },
    getters: {
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      }
    }
  })

//   getter
store.commit('increment')
// action
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。

store.dispatch('actionA').then(() => {
    // ...
  })

  // 假设 getData() 和 getOtherData() 返回的是 Promise

// common muation
actions: {
    async actionA ({ commit }) {
        commit('gotData', await getData())
    },
    async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
    }
}

// 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

// 与pinia对比
// 安装Pinia：
npm install pinia
// 配置main.js文件：
import {createPinia} from 'pinia'
//创建Pinia实例
const pinia = createPinia()
//挂载到Vue根实例
createApp(App).use(pinia).mount('#app')

// 创建store/index.js文件：
import {defineStore} from 'pinia'
//定义容器并导出
//main为容器ID，也就是模块名称，必须唯一
export const useMainStore = defineStore('main',{
  //state必须返回剪头函数，为了更好的TS类型推导
  state=()=>{
    return {
      counter:1000
    }
  },
  getters:{
    count10(state){
      return state.counter +10;
    }
  },
  //在action中直接用this获取并修改数据，和vue组件非常相似
  actions:{
    //不要使用剪头函数，会导致this丢失
    changeState(num){
      this.counter+=num;
    }
  }
})

// 读取State数据：

<script setup>
  import {storeToRefs} from 'pinia'
  import {useMainStore} from '../store'
  const mainStore = useMainStore()
  console.log(mainStore.counter);//1000
  //解构出来的属性不是响应式数据，state的数据都处理成reactive数据了
  const {counter} = mainStore;
  //使用storeToRefs进行解构
  const {counter} = storeToRefs(mainStore);
  //转换成ref,依然使用.value取值
  console.log(counter.value)
</script>

// 修改State数据：

//方式一.直接通过实例修改数据
mainStore.counter++
//方式二.需要修改多个数据，建议使用$patch批量更新
mainStore.$patch({
  counter:mainStore.counter+1,
  num:100,
  list:[...mainStore.list,'new element']
})
//方式三.有复杂的逻辑直接调用actions,和普通函数调用一样
mainStore.changeState(num)

// 读取Getters：

<script setup>
    import {useMainStore} from '../store'
    const mainStore = useMainStore()
    mainStore.count10;//1010
</script>


