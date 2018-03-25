export default class {
  static fadeOut (fadeOutElem, className, removeElem = false) {
    fadeOutElem.classList.add(className)
    this.animationend(fadeOutElem, className, () => {
      if (!removeElem) return

      fadeOutElem.remove()
    })
  }

  static fadeIn (fadeInElem, className) {
    fadeInElem.classList.add(className)
    this.animationend(fadeInElem, className)
  }

  static animationend (elem, className, onCompleted = false) {
    const handler = event => {
      elem.classList.remove(className)
      event.target.removeEventListener('animationend', handler)
      if (onCompleted) {
        onCompleted()
      }
    }

    elem.addEventListener('animationend', handler, false)
  }
}
