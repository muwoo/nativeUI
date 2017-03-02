/**
 * @author monkeyWang
 */

/**
 * 图片轮播类
 * @param imgArr
 * @param container
 * @param opt
 *
 */
export class LoopImages {
  constructor(imgArr = [], container = '', opt = {
    checkBtnSize: 20,//轮播切换按钮大小
    speed: 10, //轮播速度
    autoPlayTime: 3000 //播放时间间隔
  }) {
    this.imagesArray = imgArr;
    this.container = container;
    this.ulDom = '';
    this.timer = null;
    this.opt = opt;
  }

  //创建轮播图片
  createImages() {
    let containerDOM = this.container;
    if(this.imagesArray instanceof Array) {
      if (typeof containerDOM === 'object') { //容器类型检测 需要是一个doom对象
        let ulDom = document.createElement('ul'); //创建ul容器
        containerDOM.appendChild(ulDom);
        //设置父容器和ul的默认样式
        setStyle(ulDom, {
          position: 'absolute',
          left: 0,
          top: 0,
          width: 0,
          margin: 0,
          padding: 0
        });
        setStyle(containerDOM, {
          position: 'relative',
          overflow: 'hidden'
        });

        //遍历图片数组 设置li的背景图片
        for (let src of this.imagesArray) {
          let li = document.createElement('li');
          setStyle(li, {
            width: containerDOM.style.width,
            height: containerDOM.style.height,
            background: `url(${src}) no-repeat`,
            backgroundSize: '100% 100%',
            listStyle: 'none',
            float: 'left'
          });
          ulDom.style.width = parseInt(containerDOM.style.width) + parseInt(ulDom.style.width) + 'px';
          ulDom.appendChild(li);
        }
        this.ulDom = ulDom;
      }
      else {
        throw new Error(`params container expect a element but is a ${typeof containerDOM}`)
      }
    }
    else{
      throw new Error(`params imgArr expect a Array but is a ${typeof this.imagesArray}`)
    }

  }

  //创建切换按钮
  createSlideButton() {
    let leftSpan = document.createElement('span');  //创建左边按钮
    let rightSpan = document.createElement('span'); //创建右边按钮
    let spanStyle = {                               //设置按钮样式
      position: 'absolute',
      top: parseInt(this.container.style.height) / 2 - this.opt.checkBtnSize + 'px',
      border: 'none',
      background: 'none',
      fontSize: this.opt.checkBtnSize + 'px',
      cursor: 'pointer'
    };
    {
      leftSpan.innerText = '<';
      rightSpan.innerText = '>';
      leftSpan.style.left = '5px';
      rightSpan.style.right = '5px';
      setStyle(leftSpan, spanStyle);
      setStyle(rightSpan, spanStyle);
      rightSpan.addEventListener('click', (e) => {    //按钮点击事件
        e.preventDefault();
        if (this.timer) {   //如果正处于自动轮播状态 则返回
          return;
        }
        this.changeImages(); //开始播放图片
      });
      leftSpan.addEventListener('click', (e) => {      //按钮点击事件
        e.preventDefault();
        if (this.timer) {
          return;
        }
        this.changeImages('left')
      });
      this.container.appendChild(leftSpan);
      this.container.appendChild(rightSpan);
    }
  }

  //切换下一张图片
  changeImages(direction) {
    let lis = this.ulDom.childNodes;  //轮播图的子元素
    let ulStyle = this.ulDom.style;   // 轮播图容器ul的样式类
    let containerStyle = this.container.style; //轮播图主容器样式类
    if (direction === 'left') {       //判断图片轮播的方向 默认像右侧播放
      if (Math.abs(parseInt(ulStyle.left)) === 0) {   //轮播图片到达左侧首部；则进行图片顺序调换
        let child = lis[lis.length - 1];
        this.ulDom.removeChild(child);
        this.ulDom.insertBefore(child, lis[0]);
        ulStyle.left = parseInt(ulStyle.left) - parseInt(containerStyle.width) + 'px';
      }
      this.startMover(parseInt(ulStyle.left) + parseInt(containerStyle.width));
      return;
    }
    if (Math.abs(parseInt(ulStyle.left)) === parseInt(ulStyle.width) - parseInt(containerStyle.width)) { //轮播图片向右侧播放时
      let child = lis[0];
      this.ulDom.removeChild(child);
      this.ulDom.appendChild(child);
      ulStyle.left = parseInt(ulStyle.left) + parseInt(containerStyle.width) + 'px';
    }
    this.startMover(parseInt(ulStyle.left) - parseInt(containerStyle.width));
  }

  // 自动播放
  autoPlay() {
    //设置定时器 自动播放图片
    setInterval(() => {
      if (this.timer) {
        return;
      }
      this.changeImages()
    }, this.opt.autoPlayTime);
  }

  /*
  * function 平移动画
  * speed 移动速度（单位：像素）
  * @params itarget 平移动画的目标值
  */

  startMover(itarget) {
    this.timer = setInterval(() => {
      let speed = 0;
      if (this.ulDom.offsetLeft > itarget) {
        speed = -this.opt.speed;
      }
      else {
        speed = this.opt.speed;
      }
      if (this.ulDom.offsetLeft == itarget) {
        clearInterval(this.timer);
        this.timer = null;
      }
      else {
        this.ulDom.style.left = this.ulDom.offsetLeft + speed + 'px';
      }
    }, 3)
  }
}
//设置dom节点样式属性
function setStyle(element, styleObj) {
  for (let key in styleObj) {
    element.style[key] = styleObj[key];
  }
}