import anime from 'animejs'

export default class {
  private elem: Element | null
  private elemBar: Element | null
  private activeAnimation: anime.AnimeTimelineInstance | null
  private finishAnimation: anime.AnimeTimelineInstance | null

  public constructor(elem: Element | null, elemBar: Element | null) {
    this.elem = elem
    this.elemBar = elemBar
    this.activeAnimation = this.createActiveAnimation()
    this.finishAnimation = this.createFinishAnimation()
  }

  private createActiveAnimation(): anime.AnimeTimelineInstance | null {
    if (!(this.elem && this.elemBar)) return null

    return anime
      .timeline({
        autoplay: false,
      })
      .add({
        targets: this.elem,
        opacity: 1,
        easing: 'linear',
        duration: 200,
      })
      .add({
        targets: this.elemBar,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInQuad',
        duration: 5000,
      })
  }

  private createFinishAnimation(): anime.AnimeTimelineInstance | null {
    if (!(this.elem && this.elemBar)) return null

    return anime
      .timeline({
        autoplay: false,
      })
      .add({
        targets: this.elemBar,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: 300,
      })
      .add({
        targets: this.elem,
        opacity: 0,
        easing: 'linear',
        duration: 300,
      })
  }

  public active(): void {
    if (!this.activeAnimation) return

    this.activeAnimation.restart()
  }

  public finish(): void {
    if (!(this.activeAnimation && this.finishAnimation)) return

    this.activeAnimation.pause()
    this.finishAnimation.restart()
  }
}
