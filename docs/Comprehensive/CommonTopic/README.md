### substr 和 substring 的区别

**substr**:

1. substr 方法 返回一个从指定位置开始的指定长度的子字符串。
2. stringvar.substr(start [, length ])。参数 stringvar 必选项。要提取子字符串的字符串文字或 String 对象
3. start 必选项。所需的子字符串的起始位置,字符串中的第一个字符的索引为 0
4. length 可选项。在返回的子字符串中应包括的字符个数。

```js
function SubstrDemo() {
  var s, ss // 声明变量。
  var s = 'jie ni gui'
  ss = s.substr(7, 3) // 获取子字符串。
  console.log(ss)
  return ss // 返回 "gui"。
}
SubstrDemo()
```

**substring**:

1. str.substring(indexA, indexB),以下标从零开始计数；包含 indexA，不包含 indexB
   如果 indexA 与 indexB 相等，则返回一个空字符串
2. 当有一个参数时，就是从 indexA 往后所有的字符

```js
str1 = 'helloworld'.substr(2, 4)
console.log(str1) // 'llow'
str2 = 'helloworld'.substring(2, 4)
console.log(str2) // 'll'
```

#### 区别:

1. substr 第二个参数是要截取的字符串的长度
2. substring 第二个参数是要截取到的结尾的索引

### slice 和 splice 的区别

1. **slice:** 表示截取，slice(start,end)，不改变原数组，返回新数组;  
   start 表示从何处开始选取，end 表示从何处开始结束选取，表示一个选取的范围  
   start 可以为负数，此时它规定从数组尾部开始算起的位置。也就是-1 ，指最后一个元素，-2 指倒数第二个元素，以此类推  
   end 如果没有被指定参数，数组会包含从 start 到最后一个数组元素的所有元素  
   slice()方法不会修改数组本身，而是返回所选取范围的数组元素

   ```js
   var arr = ['A', 'B', 'C', 'D', 'E']
   var arr1 = arr.slice(-2)
   console.log(arr1)
   ```

2. **splice:** 从数组中添加或删除元素，然后返回被删除的数组元素  
    array.splice(start[, deleteCount,item1,.....,itemX)  
    index 表示从什么位置开始添加或删除数组元素  
    deleteCount 表示删除的元素数量  
    tem1,.....,itemX 表示新增的数组元素

   ```js
   var arr = ['A', 'B', 'C', 'D', 'E']
   arr.splice(2, 1, 'New')
   console.log(arr) //从c开始删除一个字符并插入'New'
   ```

   **区别** :

   - slice 会返回一个新的数组 可以用于截取数组
   - splice 会改变原始数组 可以用来删除 替换 添加数组

   ### watch 和计算属性:

   1. **计算属性：**

   - 变量不在 data 中定义，而是在 computed 中
   - 会根据现有的数据去生成一个新的数据，让这两个数据建立关系和缓存，当无关数据改变时不会重新计算而是用缓存里的值
   - computed 内部不能执行异步操作

   2. **watch:**

   - watch 监听的是 data 中定义的变量，当这个变量变化时会触发 watch 中的方法
   - watch 内部可以执行异步操作
   - 只能监听简单数据类型，如果监听复杂数据类型，如对象，无法监听对象具体某个属性
   - 如果监听复杂数据类型需要开启 deep:true

   ```js
   data() {
   return {
   queryData: {
   　　　  name: '',
   　　　　creator: '',
   　　　　electedStatus: '',
   　　　　time: []
              }
   　　　　}
          }，
          watch: {
   　　　　 queryData: {
   　　　　　　　　handler: function() {
   　　　　　　　　　　//do something
   　　　　　　　　},
   　　　　　　　 deep: true
   　　　　　          }
                 }
   ```

   - 想监听对象中的某个属性比如 name：

   ```js
   watch: {
   　　'queryData.name': {
   　　　　handler: function() {
   　　　　　　//do something
   　　　　},
   　　　　deep: true
   　　}
   }
   ```

### link 和@import 到底有什么区别？:

- @import 有兼容性问题，link 是 HTML 标签不存在兼容性问题
- ink 是 html 的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等；而@import 是 css 的语法，只有导入样式表的作用

## 数组去重方法：

**sort 排序** ：

```js
var arr = [1, 2, 3, 4, 5, 6, 4, 3, 7, 1]
// 数组去重：
// 方法3： for + sort
function newArrFn(arr) {
  arr = arr.sort()
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    arr[i] === arr[i - 1] ? newArr : newArr.push(arr[i])
  }
  return newArr
}
console.log(newArrFn(arr)) /// [1, 2, 3, 4, 5, 6, 7]
```

**Set**:Set 函数可以接受一个数组（或类数组对象）作为参数来初始化，利用该特性也能做到给数组去重

```js
var arr = [1, 2, 3, 4, 5, 6, 4, 3, 7, 1]
// 数组去重：
// 方法4： set
function newArrFn(arr) {
  // .new Set方法，返回是一个类数组，需要结合 ...运算符，转成真实数组
  return [...new Set(arr)]
}
console.log(newArrFn(arr))
```

**filter + indexOf** indexOf，可以检测某一个元素在数组中出现的位置，找到返回该元素的下标，没找到返回 -1

```js
var arr = [1, 2, 3, 4, 5, 6, 4, 3, 7, 1]
// 数组去重：
// 方法6 ：filter + findIndex
function newArrFn(arr) {
  // 利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，
  // 如果相等，说明数组中没有重复的
  return Array.prototype.filter.call(arr, function (item, index) {
    return arr.indexOf(item) === index
  })
}
console.log(newArrFn(arr))
```

**includes** :利用 includes 检查新数组是否包含原数组的每一项。 如果不包含，就 push 进去

```js
var arr = [1, 2, 3, 4, 5, 6, 4, 3, 7, 1]
// 数组去重：
// 方法7 ：for + includes
function newArrFn(arr) {
  // 利用includes 检查新数组是否包含原数组的每一项
  // 如果不包含，就push进去
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.includes(arr[i]) ? newArr : newArr.push(arr[i])
  }
  return newArr
}
console.log(newArrFn(arr))
```
