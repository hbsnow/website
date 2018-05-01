import anime from 'animejs'

export default class {
  constructor(elem, elemBar) {
    this.elem = elem
    this.elemBar = elemBar

    this.activeAnimation = this.createActiveAnimation()
    this.finishAnimation = this.createFinishAnimation()
  }

  createActiveAnimation() {
    return anime
    .timeline({
      autoplay: false
    })
    .add({
      targets: this.elem,
      opacity: [0, 1],
      easing: 'linear',
      duration: 200
    })
    .add({
      targets: this.elemBar,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInQuad',
      duration: 5000
    })
  }

  createFinishAnimation() {
    return anime
      .timeline({
        autoplay: false
      })
      .add({
        targets: this.elemBar,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: 300
      })
      .add({
        targets: this.elem,
        opacity: [1, 0],
        easing: 'linear',
        duration: 300
      })
  }

  active() {
    console.log('hoge')
    this.activeAnimation.restart()
  }

  finish() {
    this.activeAnimation.pause()
    this.finishAnimation.restart()
  }
}
