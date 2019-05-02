export default class {
  private activeClassName: string
  private elem: Element | null
  private path: string

  public constructor(
    elem: Element | null,
    activeClassName: string,
    path: string
  ) {
    this.elem = elem
    this.activeClassName = activeClassName
    this.path = path
  }

  public changeClass(currentPath: string): void {
    if (!this.elem) return

    if (currentPath === this.path) {
      this.elem.classList.remove(this.activeClassName)
    } else {
      this.elem.classList.add(this.activeClassName)
    }
  }
}
