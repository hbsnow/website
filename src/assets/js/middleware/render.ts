import { fadeIn, fadeOut } from '../app/animation'
import Nav from '../components/Nav'
import configs from '../../../../configs.json'
import { compare } from '@hbsnow/compare-url-hierarchy'

enum FadeType {
  UNKNOWN = 'main--in',
  TOP = 'main--in-top',
  START = 'main--in-start',
  END = 'main--in-end',
}

const nav = new Nav(document.getElementById('nav-icon'), 'is-active', '/')
const menu = new Nav(
  document.getElementById('menu-icon'),
  'is-active',
  '/about/'
)

const toFadeType = (referrer: string, path: string): string => {
  const hierarchy = compare(referrer, path)
  console.log(path, hierarchy)

  if (path === '/about/') return FadeType.TOP
  if (hierarchy < 0) return FadeType.START
  if (hierarchy > 0) return FadeType.END

  return FadeType.UNKNOWN
}

export default (ctx: PageJS.Context, next: () => void): void => {
  nav.changeClass(ctx.path)
  menu.changeClass(ctx.path)

  if (ctx.init) {
    next()
    return
  }

  const fadeOutElem = document.getElementsByClassName('main')[0]
  console.log(fadeOutElem)
  if (
    !(
      fadeOutElem &&
      fadeOutElem.parentNode &&
      fadeOutElem.parentNode.childElementCount <= 1
    )
  )
    return

  fadeOut(fadeOutElem, 'main--out', true)

  const div = document.createElement('div')
  div.className = 'main'
  div.innerHTML = ctx.state.content
  fadeOutElem.parentNode.insertBefore(div, fadeOutElem.nextSibling)

  const fadeInElem = document.getElementsByClassName('main')[1]
  console.log(fadeInElem)
  fadeIn(fadeInElem, toFadeType(ctx.state.referrer, ctx.state.path))

  const titleElem = div.querySelector('.content-header__title')
  document.title = titleElem
    ? `${titleElem.textContent} | ${configs.name}`
    : configs.name

  next()
}
