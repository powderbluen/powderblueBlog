### flex:1

1. flex 是一个复合属性，是 flex-grow flex-shrink flex-basis 的简写
2. flex:1 分配剩余空间 相当于 flex-grow:1;flex-shrink:1;flex-basis:0%

### defer 和 async 的

1. **共同点**：async，defer 都可以让 js 和 html 同时下载
1. **区别**：async 会在在下载完之后立即执行,不会等 html 下载完  
   defer 会等 html 下载完了才会执行

### 盒子模型

1. 标准盒子：元素的宽高值为盒模型 content 的宽高值，内容区不包含 paddind 和 border,比如宽 200px，padding 是 20px 那么总宽度就是 240px
2. 怪异盒子：content 包含 paddind 和 border，如宽为 200px，paddind 为 20px，那么 content 值就是 160px，总宽度为 200px
3. 转换盒子模型：box-sizing:border-box 转为怪异盒子；box-sizing:content-box 转为标准盒子

### 盒子水平垂直居中的方式

1. 父元素加 display:flex;justify-content:center;align-items:center;
2. 子绝父相 子元素 left:50%;top:50%; 负 margin（宽和高一半） 必须知道子元素宽高
3. 子绝父相 子元素 left:50%;top:50%;transform:translate(-50%,-50%)
4. 父 display:flex;子元素 margin:auto;
5. 子绝父相 子元素 left:0;top:0;right:0;bottom:0;margin:auto;

### css 新的属性

1.  border-radius 实现圆角
2.  transform 实现水平垂直居中
3.  transition 实现过渡效果
4.  box-sizing 转换盒子模型变成 IE 怪异盒子
5.  flex 布局 justify-content

### bfc 是什么：

BFC（Block Formatting Context），即块级格式化上下文,它是标签的一个样式属性，标签有了这个属性之后，可以让自己内部与外界隔离 （结界 封印）
触发条件：

1. html 根元素就是有 bfc
2. 浮动元素
3. overflow 不是 visible
4. display 值是 Inline-block,table,flex,flex-root
5. Position 值是 absolute 或 fixed
   平时用的是 overflow:hidden;因为其他的都有副作用，但是其实 overflow:hidden;会把溢出的元素隐藏，所以新语法有一个 display:flex-root 这个是完全没有副作用  
    使用场景：  
   防止 margin 重叠  
   防止 margin 塌陷  
   清浮动  
   实现自适应布局

### CSS 如何画一个三角形

```css
.border {
  width: 0px;
  height: 0px;
  border: 50px solid;
  border-width: 0 50px 50px;
  border-color: transparent transparent #d9534f;
}
```

### 如何实现 chrome 浏览器上小于 12px 的文字

1. 针对 chrome 浏览器,加 webkit 前缀，用 transform:scale()这个属性进行放缩,注意的是，使用 scale 属性只对可以定义宽高的元素生效(行内元素可以转为行内块元素)

### CSS 性能优化

1. 把多个样式合并成一个样式文件并且进行压缩
2. 合理使用选择器 不要嵌套使用过多复杂选择器，最好不要三层以上 减少查找时间
3. css 精灵图（雪碧图） 把多个图片合并成一张图片
4. 用 iconfont 来做图标 减少图片使用量
5. 把小的图片转换成 base64 字符串，减少 http 请求数量

### flex 相关的属性背下来

1. 父盒子  
   Justify-content  
   Align-items  
   Flex-direction  
   Display:flex  
   Flex-wrap  
   Flex-flow

2. 子盒子：
   Align-self  
   Flex-grow  
   Flex-shrink  
   Flex-basis
