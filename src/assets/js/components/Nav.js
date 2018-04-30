export default class {
  constructor(elem, activeClassName, path) {
    this.elem = elem
    this.activeClassName = activeClassName
    this.path = path
  }

  changeClass(currentPath) {
    if (currentPath === this.path) {
      this.elem.classList.remove(this.activeClassName)
    } else {
      this.elem.classList.add(this.activeClassName)
    }
  }
}
