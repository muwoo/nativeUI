/**
 * @author monkeywang
 * Date: 17/3/7
 */
export class Dialog {
  constructor(container) {
    this.container = container;
    this.modalDIV = '';
  }

  /**
   * 初始化dialog事件
   */
  initDialogEvent(){
    addEvent(document, 'click', (e) => {
      e.preventDefault();
      if (e.target !== this.container.getElementsByClassName('nv-dialog__container')[0] && e.target === this.container) {
        this.hideDialog();
      }
    });
    let closeBtns = this.container.getElementsByClassName('nv-dialog-close');
    for(let closeBtn of closeBtns){
      addEvent(closeBtn, 'click', (e) => {
        e.preventDefault();
        this.hideDialog();
      });
    }
  }
  /**
   * 显示对话框
   */
  showDialog() {
    this.container.style.zIndex = -parseInt(getComputedStyle(this.container).zIndex) + 2;
    this.container.style.opacity = 1;
    this.container.getElementsByClassName('nv-dialog__container')[0].style.top = '15%';
    this.modalDIV = document.createElement('div');
    this.modalDIV.style.zIndex = parseInt(this.container.style.zIndex) - 1;
    this.modalDIV.setAttribute('class', 'nv-modal');
    document.getElementsByTagName('body')[0].appendChild(this.modalDIV);
    this.modalDIV.style.opacity = 0.5;
  }

  /**
   * 隐藏对话框
   */
  hideDialog() {
    this.container.getElementsByClassName('nv-dialog__container')[0].style.top = '10%';
    this.container.style.opacity = 0;
    this.modalDIV.style.opacity = 0;
    this.container.style.zIndex = -parseInt(getComputedStyle(this.container).zIndex) + 2;
    setTimeout(() => {
      document.getElementsByTagName('body')[0].removeChild(this.modalDIV);
    }, 350);

  }
}
/**
 * 外观模式 适配事件
 * @param dom
 * @param type
 * @param fn
 */
function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  }
  else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  }
  else {
    dom['on' + type] = fn;
  }
}