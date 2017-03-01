/**
 * @author monkeyWang
 */

/**
 * 图片轮播类
 * @param imgArr
 * @param container
 */
export class LoopImages {
  constructor(imgArr = [], container = '') {
    this.imagesArray = imgArr;
    this.container = container;
    this.divDom = '';
    this.timer = null;
  }

  //创建轮播图片
  createImages() {
    let containerDOM = this.container;
    if (typeof containerDOM === 'object') {
      let divDom = document.createElement('div');
      containerDOM.appendChild(divDom);
      divDom.style.position = 'absolute';
      divDom.style.left = 0;
      divDom.style.top = 0;
      divDom.style.width = 0;
      let index = 0;
      containerDOM.style.position = 'relative';
      for (let src of this.imagesArray) {
        let img = new Image();
        img.src = src;
        img.onload = () => {
          index++;
          containerDOM.style.overflow = 'hidden';
          img.style.width = containerDOM.style.width;
          img.style.height = containerDOM.style.height;
          img.style.zIndex = 999 - index;
          divDom.style.width = parseInt(containerDOM.style.width) + parseInt(divDom.style.width) + 'px';
          divDom.appendChild(img);
        }
      }
      this.divDom = divDom;
      this.divDom.addEventListener('click', () => {
        this.changeImages()
      });
    }
    else {
      throw new Error(`expect a object but a ${typeof containerDOM}`)
    }
  }

  //切换下一张图片
  changeImages() {
    if (Math.abs(parseInt(this.divDom.style.left)) === parseInt(this.divDom.style.width) - parseInt(this.container.style.width)) {
      let child = this.divDom.childNodes[0];
       this.divDom.removeChild(child);
       this.divDom.appendChild(child)

      this.divDom.style.left = parseInt(this.divDom.style.left) + parseInt(this.container.style.width) + 'px';
      //return;
    }

    this.startMover(parseInt(this.divDom.style.left) - parseInt(this.container.style.width));
  }

  // 自动播放
  autoPlay() {
    setInterval(() => {
      this.changeImages()
    }, 5000)
  }


  startMover(itarget) {//目标值
    this.timer = setInterval(() => {
      var speed = 0;
      if(this.divDom.offsetLeft > itarget){
        speed = -1;
      }
      else{
        speed = 1;
      }
      if(this.divDom.offsetLeft == itarget){
        clearInterval(this.timer);
      }
      else{
        this.divDom.style.left = this.divDom.offsetLeft+speed+'px';
      }
    },3)
  }
}