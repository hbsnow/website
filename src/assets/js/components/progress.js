export default class {
  constructor (target, progress = 0) {
    this._target = target
    this._progress = progress
  }

  start () {
    console.log(this._progress)
    const initAnimate = this._target.animate([
      { strokeDasharray: this._progress + ' 100' },
      { strokeDasharray: '40, 100' }
    ], 300)

    initAnimate.addEventListener('finish', () => {
      this._target.style.strokeDasharray = '40, 100'
    })
  }

  increase () {
    if (this._progress >= 0 && this._progress < 0.2) { return 0.1 }
    if (this._progress >= 0.2 && this._progress < 0.5) { return 0.04 }
    if (this._progress >= 0.5 && this._progress < 0.8) { return 0.02 }
    if (this._progress >= 0.8 && this._progress < 1) { return 0.01 }

    return 0
  }
}
