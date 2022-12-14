### 浏览器的渲染机制以及性能优化

1. 页面初始化得时候：先把 html 解析成一棵 DOM 树，然后把 css 代码解析成一棵 CSS 规则树，这两棵树组合成一个 render 渲染树,然后绘制页面
2. 页面再 js 代码运行后还会重新再改变外观和尺寸布局分为重绘和回流
   - 重绘：颜色类的样式改变
   - 回流：尺寸布局显示隐藏
3. 性能优化：
   - 浏览器本身对 UI 渲染有优化，他会把要绘制的东西放在队列中异步渲染
   - 我们在操作之前可以把这块东西隐藏，做好再显示（只有两次重绘和回流）
   - 不要频繁用行内样式，用 className
   - 克隆元素可以复用之前的各种东西
   - 可以把要操作的东西脱离文档流(position float)

### 异步的理解 和 event loop

1. js 是单线程的 单线程一次只能做一件事 如果某一块代码特别耗时，会让浏览器卡住 后面的代码没机会执行，所以把 js 代码分为两种一种是同步代码，一种是耗时的异步代码
2. js 线程遇到同步代码直接执行，遇到异步代码交给浏览器去处理，等浏览器处理好了就把对应 callback 放到队列中去排队，然后等 js 线程空闲下去就去队列按顺序把 callback 拿到并执行，回调函数里面可能还要同步和异步，所以会导致这个过程重复循环,称为 event loop

### 宏任务和微任务

1. ajax 和定时器这些不是 js 本身的东西,需要单独开一个线程，是宏任务
2. promise,async await 这些是 ecmascript 语法本身的东西，是微任务
3. 执行顺序 同步代码 -> 微任务 -> 宏任务 -> 微任务 -> 宏任务  
   ( new Promise 是同步的 只有 then,catch 是异步 ; async,await --> await 后面写的相当于写在 then 里面,是微任务)

### 防抖和节流

防抖和节流本质都是为了优化高频率执行代码或任务的一种手段。

1. 防抖：在规定时间后去执行该事件，如果在规定时间内被重复触发，则会从头开始计算执行时间
2. 节流：在规定时间内连续，频繁的触发事件，只会执行最后一次触发的事件处理函数
3. 相同点：

- 都可以通过 setTimeout 实现
- 最终目的都是降低回调执行的频率，节省资源

3. 不同点：

- 函数防抖在一段连续操作结束之后再去处理回调函数；函数节流不管触发事件有多频繁，在规定时间内只执行最一次事件函数处理

4. 使用场景：

- 防抖：用户在输入框连续输入一串字符时只在输入完后,才执行查询的请求,这样可以有效减少请求次数,节约请求资源.
- 节流：鼠标连续不断地触发某事件（如点击），在规定时间内只触发一次；

### get 和 post 的区别

1. Get 提交请求的参数会附在 URL 之后，POST 提交，把提交的数据放置在 HTTP 的请求主体中
2. POST 安全性要比 GET 安全性高
3. GET 请求提交的数据有长度限制,POST 没有限制

### 图片懒加载

1. 简介：图片懒加载是一种对网页性能优化的方式，比如当访问一个页面的时候，优先显示可视区域的图片而不是一次性加载所有图片，当需要显示时在发送图片请求，避免打开网页时加载过多资源
2. 先将 Img 标签的 src 链接设为同一张图片(比如空白图片)，然后给 img 标签设置自定义属性(比如 data-src),然后将真正的图片地址存储到 data-src 中，当 js 监听到该图片元素进入可视窗口时，将自定义属性中的地址存储到 src 中，达到懒加载的效果
3. 作用：防止页面一次性向服务器发送大量请求，导致服务器相应页面卡顿或崩溃

### 浏览器缓存机制

1. 强缓存；第一次打开这个网站，把资源存到本地，下次再用这个资源，强制使用本地资源(后端处理的) Expires:缓存过期时间，用来指定资源到期的时间，是服务器的具体时间点

### 敲回车的一瞬间发生了什么?

1. URL 解析 解析 HTTP 协议，端口，资源地址
2. DNS 查询：首先查询本地 host 在访问 DNS 服务器将域名解析成 ip 地址
3. 建立 TCP 连接
4. 服务器收到请求后处理，并相应返回给客户端
5. 渲染页面

### 创建的状态码

- 100 - 收到请求的第一部分，正在等待其他部分
- 200 - 服务器成功返回网页；202 - 服务器已接受请求，但尚未处理; 204 - 服务器成功处理了请求，但没有返回任何内容; 206 - 服务器成功处理了部分 GET 请求
- 404 - 请求的网页不存在; 403 - 服务器拒接请求； 401 - 要求身份验证
- 500 - 服务器内部错误; 503 - 服务器超时
