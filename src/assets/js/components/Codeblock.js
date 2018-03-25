import hljs from '../lib/highlight'

export default class {
  constructor (node) {
    this.node = node
  }

  run () {
    this.node.forEach(node => {
      hljs.highlightBlock(node)
    })
  }
}
