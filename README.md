# nativeUI安装
###1.npm install 
###2.webpack --watch

##使用方法
```javascript
<script src="./dist/nativeUI.js"></script>
```


####轮播
![image](https://github.com/monkeyWangs/nativeUI/blob/master/images/carousel.gif)
```html
 <div id="carousel" style="width: 500px; height: 300px;"></div>
 ```
```javascript
//创建轮播数组
var imgArray = [
    'https://img.alicdn.com/simba/img/TB1DtYSPFXXXXcWXXXXSutbFXXX.jpg',
    'https://img.alicdn.com/simba/img/TB12F_9PpXXXXcvXpXXSutbFXXX.jpg',
    'http://img1.imgtn.bdimg.com/it/u=3081053742,1983158129&fm=23&gp=0.jpg',
    'http://img0.imgtn.bdimg.com/it/u=4195805644,827754888&fm=23&gp=0.jpg'
  ];
var carouselDom = document.getElementById('carousel');
//创建轮播对象
var loopImages = new LoopImages(imgArray, carouselDom);
loopImages.createImages();
//自动播放
loopImages.autoPlay();
//切换按钮
loopImages.createSlideButton();
```
