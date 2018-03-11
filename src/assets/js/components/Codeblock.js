import hljs from '../lib/highlight'

export default class {
  constructor (elem) {
    this.elem = elem
  }

  run () {
    hljs.initHighlightingOnLoad()
  }
}
