export default class {
  constructor(rootElem) {
    this.rootElem = rootElem
    this.barElem = rootElem.querySelector('.progress__bar')
  }

  active() {
    this.rootElem.classList.add('progress--active')
  }

  finish() {
    const transitionEndHandler = event => {
      this.rootElem.classList.remove('progress--active', 'progress--finish')
      event.target.removeEventListener('transitionend', transitionEndHandler)
    }

    this.rootElem.classList.add('progress--finish')
    this.barElem.addEventListener('transitionend', transitionEndHandler, false)
  }
}
