import highlight from 'highlight.js/lib/highlight'

export default class {
  constructor (elem) {
    this.elem = elem
    console.log('init code')
  }

  run () {
    console.log('highlight')
    console.log(highlight)
  }
}
