## vue 的核心、优点

- 组件化 可以实现页面上功能的复用
- 数据驱动 会让代码变得简单，不用去操作 DOM，只要更新数据，视图会跟着变化
- 虚拟 dom 不用频繁操作真实的 DOM（真实 DOM 操作性能很慢） 性能会高一些

## v-el:通过 v-el 可以获取到 DOM 对象

## 单向数据流 (a 能到 b a->b 反过来不行)

- 父组件通过 props 向子组件传值 父组件中的数据变了，子组件中 props 数据也跟着变，子组件不能修改 props 里的数据 因为 props 是只读的
- 特殊情况：如果是引用类型数据，子组件只要不修改数据的地址，是可以在子组件中修改的（可以改属性）

### vue 的修饰符

1. 事件修饰符：

- .stop 阻止事件继续传播
- .prevent 阻止标签默认行为
- .self 只当在 event.target 是当前元素自身时触发处理函数
- .once 事件将只会触发一次
- .sync 当我们想在父组件和子组件之间对某个属性值进行双向绑定时

2. v-model 修饰符:

- .lazy 默认情况下，v-model 同步输入框的值和数据。可以通过这个修饰符，转变为在 change 事件再同步。
- .number 自动将用户的输入值转化为数值类型
- .trim 自动过滤用户输入的首尾空格

3. 键盘事件的修饰符

- .enter 敲击回车触发

### MVVM 和 MVC 的区别

1. MVC:

- model:(数据模型)数据访问层 view:视图 controller:(控制器)业务逻辑层
- view 通过一些事件操作去通知 controller controller 去改变 model model 处理数据后通知 view 去更新
- 开发过程不灵活 一个小的事件操作也要走一遍这个流程
- MVC 是单向通信，也就是将 Model 渲染到 View 上，必须通过 Controller 来承上启下

2. MVVM:

- MVVM 是三个单词的缩写 model(数据模型) + view(视图) + viewmodel(公共属性)
- view 和 model 没有直接关联 通过 viewmodel 进行通信
  - model 和 view 就像现实中房东和租客一样，他们是不认识，通过中介 viewmodel
- 好处
  - 数据驱动
    - 数据与页面的双向绑定
  - 解耦（降低了耦合性）
    - 由于 model 和 view 是没有关系的，是通过 viewmodel 结合在一起的，所以维护起来很方便

## 事件传参

- @click="fn" 在回调函数直接通过参数可以拿到事件对象
- @click="fn($event)" 这个时候$event 是固定写法

## 对$event 的理解

- 在原生 DOM 原生事件中，$event 指的是事件源对象
- 在组件自定义事件，$event 代表的是子组件抛出的数据

## 自定义指令：directive

- 你平时用过自定义指令

  - v-imgerror 我们公司项目中有的用户头像可能加载报错，可以给他一张默认图片， onerror this.img=默认图片
  - v-focus 打开带有搜索的页面的时候，想实现自动把光标定位到 input 中

- 自定义指令的钩子函数
  - bind 属性绑定的时候执行 只会有一次
  - inserted 当前指令所在的元素插入到页面中的时候执行一次
  - update 当前指令所在的组件中的 data 数据有更新就会执行，可以执行多次

```js
// 指令的钩子有三个 bind inserted update
// bind inserted 只会执行一次
// update 会反复执行
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  },
})

Vue.directive('red', {
  bind(el) {
    el.style.color = 'red'
  },
})

Vue.directive('check', {
  update(el) {
    const reg = /^[a-zA-Z0-9]+$/
    if (reg.test(el.value)) {
      el.style.color = 'green'
    } else {
      el.style.color = 'red'
    }
  },
})
```

## v-model 语法糖原理

通过 v-bind:value 绑定一个 str 变量，绑定一个 input 事件，每次输入内容时触发 input 事件，
通过事件对象参数$event.target.value 获得输入的内容,把内容赋给 str 变量
然后更改 str 变量的值时 input 输入框的内容会发生变化，更改 input 输入框内容时 str 变量也会变

### Keep-alive:缓存组件

1. 组件在进行切换的时候默认会进行销毁，如果有一个需求要切换组件后不销毁 保留原状态 就可以用 keepalive 进行缓存
2. include - 只有名称匹配的组件会被缓存。  
   exclude - 任何名称匹配的组件都不会被缓存  
   max （数字）最多可以缓存多少组件实例
3. 两个钩子函数：activated:进入已缓存的组件时触发 deactivated:离开缓存组件时触发
4. 应用场景：比如用户从商品列表页 去到其他页面，然后再回到商品列表页 希望页面的滚动位置是上一次用户离开的位置
5. 实现方法:给路由外面包裹 keep-alive，让 商品列表 组件切换出去后不被销毁，而是缓存 然后：

```js
data(){
  return:{
    saceY:0
  }
}
 activated(){
   // 进入的时候给固定的位置
   this.$refs.scroll.scroll.scrollTo(0,this.saceY,200) //z轴, y轴, 时间
 	},
  ///然后处理用户离开之前的滚动位置
deactivated(){
    // 切换出去后赋值
 this.saceY = this.$refs.scroll.getScrollY()
 	},
```

### vue 性能优化

1. 路由懒加载 component:() => import() 按需加载
2. keepalive 对组件进行缓存
3. v-show 复用组件
4. 第三方组件库按需引入 比如 element-ui
5. 图片懒加载 v-lazyload 插件
6. 函数式组件(将只展示数据的组件转为函数式组件(标记为 Function))

## v-if 和 v-for 为什么要避免使用同一个组件或元素上

- 原因：v-for 的优先级要高 同时作用再一个元素上 每次渲染都会先循环再进行条件判断 会带来性能方面的浪费
- 比如数据里面有个 isShow 变量 为 true 才去显示他 总不能每次循环都去判断一下 对性能浪费 可以在 computed 里提前过滤
- 解决：
- 在外层嵌套 template v-if 再外层判断 再里层循环
- 如果再循环内部出现条件 可以用计算属性 computed 提前过滤掉不需要显示的项

## 为什么 data 是一个函数

1. Vue 组件可能存在多个实例，如果使用对象定义 data，数据就会共用一个 data 对象，当一个状态发生变化大的时候 另一个也会受到影响
2. 采用函数形式定义 实例被创建的时候每次都执行一次这个函数 所以会每次都创建一个新的 data 对象，指向不同的引用，相互不会影响
3. 为什么跟实例没有这个限制：跟实例在整个应用程序中只有一个 不会创建多个

## v-if 和 v-show 的区别

- 相同点：v-if,v-show 实现的效果是一样的，都是控制显示和隐藏

- 不同点:
- 原理上
-      v-show是通过控制样式的display:none来实现的
-      v-if是通过创建和销毁元素来实现的
- 适用场景
-     v-show哪怕是false的时候也会创建并隐藏，适合频繁切换(显示隐藏一般用的v-if 对大的组件需要复用的可以用v-show  提高性能)
-     v-if如果是false直接不创建，适合切换不频繁的时候

### nextTick()

- 应用场景：再 cerated 中进行 DOM 操作一定要放在 Vue.nextTick()的回调函数中。
- 原因：Vue 在更新 data 之后并不会立即更新 DOM 上的数据，如果修改了 data 中的数据，再马上获取 DOM 上的值，取得的是旧值，把获取 DOM 上值的操作放在$nextTick()里就可以得到更新后的数据

### Vuex

1. vuex 是多个组件用来共享数据的一个状态管理容器
2. 核心概念：  
   state：存放数据的地方
   Mutations：用于修改 state 里的数据 类似于组件里的 methods
   Actions：提交 mutations 通过 mutations 修改 state 可以写异步代码
   Getters：将 state 里的数据处理成新的数据 类似于计算属性  
   Modeles：把 store 进行模块化
3. 辅助函数：mapstate mapMutations mapActions mapGetters createNamespateHelpers
4. vuex 的数据是响应式的，组件可以方便的用 vuex 进行数据存取 但是不能刷新页面会导致数据的丢失 需要结合本地存储实现数据的持久化
5. 项目中 vuex 代码是怎么组织的：store 目录说一下

### 组件通信

1. 父子:  
   props 父向子
   $emit 子向父
   $parent $children
   ref
2. 兄弟：  
   Event bus  
   在使用数据的地方 EventBus.$on  
   在传数据的地方用EventBUs.$emit
3. 隔代：  
    在祖先身上写 provide (依赖注入)
   在任何一个子代中通过 inject 拿数据

   ```js
   expoer defaule{
     provide:{
       c:400  //祖先级 提供数据
     }
   }

   export default {
     inject: ['c'], //子孙级别 拿数据
   }

   ```

   **生命周期的概念**

- 组件从创建到销毁的过程称为生命周期
- 四大阶段 八个钩子函数 ：
  1. 初始化： beforeCreate： 组件实列创建了，自身的方法也有了，data 和 methods 数据和方法还没有初始化  
     created： data 和 methods 数据和方法有了 可以发送 ajax 请求获取数据
  2. 挂载：beforeMount： 模板已经在内存在编辑完成了 但是还没有渲染到页面  
     mounted:dom 挂载好了 页面一进来需要操作 dom 可以在这里
  3. 更新：beforeUpdate:数据更新了 视图还没更新  
     updated:数据和视图都是最新的
  4. 销毁：beforeDestroy：实例的 data 和 methods 还可以用销毁前(清除定时器，事件)  
     destroyed：组件已经销毁了 组件中的实例和方法都无法使用了

### Vue 的父组件和子组件生命周期执行顺序

1. 初始化和挂载过程  
   父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
2. 更新过程  
   父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
3. 销毁过程  
   父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

   ### v-model 底层原理:

   - 在输入框给 v-bind:value 绑定一个 str 变量，绑定一个 input 事件，每次输入内容都会触发 input 事件，
   - 通过事件对象参数$event.target.value 获取到输入的内容，把内容赋给 str 变量
   - 此时修改 str 变量的值输入框的内容会发生变化，修改输入框的内容 str 变量也会跟着变

## 路由守卫

### 全局守卫

```js
// 全局路由前置守卫
//路由进入之前触发
// 可做权限控制
router.beforeEach((to, from, next) => {
  // to：到哪去  from:从哪来
  console.log('触发路由前置守卫')
  next()
})

// 全局路由后置首位
// 路由进入之后触发
// 可做登录后弹出欢迎提示等
router.afterEach((to, from) => {
  // 场景：判断用户是否登录 如果未登录 且当前处于非登录页面 则自动跳转到登录页
  console.log('触发路由后置守卫')
})
```

### 路由独享守卫 :可以直接在路由配置上定义

```js
{
        path: '/user',
        component: User,
        beforeEnter: () => {
            // to from next 三个参数
            //next() 通过
            return false //跳转不到user路由
        }
    }
```

### 组件内置守卫:在组件内执行的钩子函数(写在组件里)

```js
beforeRouterEnter(to,from,next){
  //再进入组件对应的路由时被调用
  //不能获取组件实例this 因为该组件执行时，组件实例还没创建
  // 写next() 才能进入该组件
}

beforeRouterUpdate(to,from,next){
  // 在当前路由改变但组件被复用时调用
}

beforeRoureLeave(to,from,next){
  // 离开该组件对应的路由时会被调用
  // 应用场景:比如拼多多提示就差0.01分就能拆红包了 确定要离开吗
  // next() 写这个才能离开
}
```

### vue 路由的两种模式：

1. 出现原因：vue 项目是单页面应用 只有一个 html 文件 切换页面要让访问的 url 发生变化 又不能让 html 重新加载 所以 VueRouter 提供了两种加载和跳转方式
2. hash:hash 模式是把前端路由的路径用#拼接在真实路径之后的，当#后面的路径发生变化时 浏览器不会重新发起请求而是会触发 hashchange 事件
3. history 模式：是通过 H5 新增的 api：pushState()和 replaceState()这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录

### router 和 route 的区别:

- **router** $router 是 VueRouter 的实例对象，它包含所有的路由，用来实现路由之间跳转，以及钩子函数 beforeEach,afterEach
- **route** 是路由信息对象，每一个路由都会有一个 route 对象，主要包含路由的一些基本信息比如 params.query

## 路由传参

1. params 传参:path:'/home/:id'(通过/传参) 接收参数： this.$route.params.id
2. query 传参: '/home?id=10'(通过?传参) 接收参数： this.$route.query.id

### 路由传值的区别

- params 穿的参数刷新页面就会丢失 query 参数不会丢失
- query 在浏览器地址栏中显示参数，params 不显示
