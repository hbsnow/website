export default class {
  constructor(elem, activeClassName) {
    this.elem = elem
    this.activeClassName = activeClassName
  }

  changeClass(path) {
    if (path === '/') {
      this.elem.classList.remove(this.activeClassName)
    } else {
      this.elem.classList.add(this.activeClassName)
    }
  }
}
