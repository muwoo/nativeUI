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
    autoPlayTime: 3000, //播放时间间隔
    animationStyle: '0.4s cubic-bezier(0,.95,.36,.99)' //平移样式
  }) {
    this.imagesArray = imgArr;
    this.container = container;
    this.ulDom = '';
    this.timer = null;
    this.opt = opt;
  }

  /**
   * 创建轮播图片
   */
  createImages() {
    let containerDOM = this.container;
    let containerW = parseInt(containerDOM.style.width); // 容器宽度
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
        let i = this.imagesArray.length-1;
        for (let src of this.imagesArray) {
          let li = document.createElement('li');
          setStyle(li, {
            width: containerDOM.style.width,
            height: containerDOM.style.height,
            background: `url(${src}) no-repeat`,
            backgroundSize: '100% 100%',
            listStyle: 'none',
            position:'absolute',
            top: 0,
            left: 0,
            transform: `translateX(${containerW*(1-i)}px)`
          });
          ulDom.style.width = containerW + parseInt(ulDom.style.width) + 'px';
          ulDom.appendChild(li);
          i--;
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

  /**
   * 创建切换按钮
   */
  createSlideButton() {
    let index = 0;
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
        index++;
        this.changeImages('right', index); //开始播放图片

      });
      leftSpan.addEventListener('click', (e) => {      //按钮点击事件
        e.preventDefault();
        if (this.timer) {
          return;
        }
        index--;
        this.changeImages('left', index)
      });
      this.container.appendChild(leftSpan);
      this.container.appendChild(rightSpan);
    }
  }

  /**
   * 开始轮播函数
   * @param direction // 轮播方向
   */
  changeImages(direction) {
    let lis = this.ulDom.childNodes;  //轮播图的子元素
    let containerStyle = this.container.style; //轮播图主容器样式类
    if (direction === 'left') {       //判断图片轮播的方向 默认像右侧播放
      translation(lis, parseInt(containerStyle.width)*(lis.length - 2), -parseInt(containerStyle.width), this.opt.animationStyle);
      return
    }
    translation(lis, -parseInt(containerStyle.width)*(lis.length - 2), parseInt(containerStyle.width), this.opt.animationStyle);
  }

  /**
   * 自动播放
   */
  autoPlay() {
    //设置定时器 自动播放图片
    setInterval(() => {
      if (this.timer) {
        return;
      }
      this.changeImages()
    }, this.opt.autoPlayTime);
  }

}
/**
 * 创建平移效果
 * @param domArray //容器内所有li集合
 * @param Offset // 平移偏移量
 * @param containerW // 容器的宽度
 * @param animation //过渡样式
 */
function translation(domArray, Offset, containerW, animation) {
  for(let i=0; i<domArray.length; i++){
    let translate = parseInt(domArray[i].style.transform.match(/translateX\((.*)\)/)[1]); //当前li偏移量
    if(translate === Offset){ //如果当前li偏移量等于平移偏移量 把当前li调换到下一个将要播放的位置
      domArray[i].style.transition = ''; //取消动画样式
      domArray[i].style.transform = `translateX(${containerW}px)`;
    }
    else{ //其余的继续进行偏移动画
      if(translate - containerW ==0 || translate==0){
        domArray[i].style.transition = animation;
      }
      domArray[i].style.transform = `translateX(${translate - containerW}px)`;
    }
  }
}
/**
 * 设置dom节点样式
 * @param element //dom标签
 * @param styleObj //样式类
 */
function setStyle(element, styleObj) {
  for (let key in styleObj) {
    element.style[key] = styleObj[key];
  }
}