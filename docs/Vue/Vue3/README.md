### vue3 相关的 UI 组件库

1. PC 端 element plus https://element-plus.gitee.io/zh-CN/
2. PC 端 ant design vue https://antdv.com/docs/vue/introduce-cn/
3. 移动端 vant https://vant-contrib.gitee.io/vant/#/zh-CN

### 为什么发明 vue3

1. vue2 用的是 option api 选项 api 缺点是代码过于松散 要完成一个功能需要一会儿在 data,一会儿在 methods -> composition api 组合式 api
2. 响应式实现底层用的是 Object.defineProperty 这个 api 是对属性进行劫持 万一对象有 100 个属性 需要不停的遍历和递归，并且考虑性能直接让数组的索引操作以及对象的后添加的属性不是响应式，为了解决这个问题，vue2 还搞了一个$set -> 把底层变成 Proxy 对整个对象进行劫持

### vue3 的新特性

1. options api -> composition api
2. Object.defineProperty -> Proxy
3. template 中可以有多个根标签
4. 所有的 api 都是按需引入的，可以实现 tree shaking 优化
5. vue3 有一个新的前端构建工具叫 vite,更快
6. 代码都是在 setup 里面写，没有 this
7. 没有 event bus,可对用 mitt 第三方库替代
8. vue3 推荐用 typscript

### 为什么 vite 更快

1. 用的是浏览器本来就支持的 esm 模块化，不用打包
2. 构建的时候是按需方式  
    yarn create vite  
   composition api 组合式 api 的好处

3. 完成同样的功能的逻辑都是写在一起
4. 可以抽出来做成一个 hook (use 开头的)  
   vueuse

### setup 特点

1. 比 beforeCreate 更早
2. 里面没有 this
3. 自动执行

### reactive vs ref

1. ref 用于基本数据类型和复杂数据类型
2. reactive 只能用于复杂数据
   基于性能考虑 推荐只用 ref

### ref

1. 在模板中不需要加 value
2. 在 js 中需要加

### watch,watchEffect

1. watch 需要显式指定到底监视谁 并且默认第一次没效果，需要 immediate:true,对象需要 deep:true
2. watchEffect 不需要

### 钩子函数

setup -> ajax -> 相当于 vue2 中的 created
onMounted -> 操作 dom --> mounted
onUpdated -> 数据更新之后，可以拿最新的 DOM --> updated
onUnMounted -> 移除 DOM 事件和定时器 -> beforeDestroy

### 组件通信

1. 父向子 props defineProps
2. 子向父 defineEmits
3. 兄弟组件 mitt
4. 隔代 provide(祖先组件) inject(在后代中任意一层)
5. 任意组件 vuex pinia

### toRefs

// 使用场景: 如果对一个响应数据, 进行解构 或者 展开, 会丢失他的响应式特性,这个时候可以用到 toRefs

- vue3 没有过滤器 filters
