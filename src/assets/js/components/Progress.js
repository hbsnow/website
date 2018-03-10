export default class {
  constructor (rootElem) {
    this.rootElem = rootElem
    this.barElem = rootElem.querySelector('.progress__bar')
  }

  active () {
    this.rootElem.classList.add('progress--active')
  }

  finish () {
    this.rootElem.classList.add('progress--finish')

    const progressTransitionEndHandler = event => {
      this.rootElem.classList.remove('progress--active', 'progress--finish')
      event.target.removeEventListener('transitionend', progressTransitionEndHandler)
    }

    this.barElem.addEventListener('transitionend', progressTransitionEndHandler, false)
  }
}
