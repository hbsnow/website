import Animation from '../class/Utils/Animation'
import Nav from '../components/Nav'
import configs from '../../../../configs'
import compareUrlHierarchy from 'compare-url-hierarchy'

const nav = new Nav(
  document.getElementById('nav-icon'),
  'nav__icon--active',
  '/'
)
const menu = new Nav(
  document.getElementById('menu-icon'),
  'menu__icon--active',
  '/about/'
)

const toFadeType = (referrer, path) => {
  const hierarchy = compareUrlHierarchy(referrer, path)
  console.log(path)

  if (path === '/about/') return 'main--in-top'
  if (hierarchy < 0) return 'main--in-left'
  if (hierarchy > 0) return 'main--in-right'

  return 'main--in'
}

export default (ctx, next) => {
  nav.changeClass(ctx.path)
  menu.changeClass(ctx.path)

  if (ctx.init) {
    next()
    return
  }

  const fadeOutElem = document.getElementsByClassName('main')[0]
  if (fadeOutElem.parentNode.childElementCount > 1) return
  Animation.fadeOut(fadeOutElem, 'main--out', true)

  const div = document.createElement('div')
  div.className = 'main'
  div.innerHTML = ctx.state.content
  fadeOutElem.parentNode.insertBefore(div, fadeOutElem.nextSibling)

  const fadeInElem = document.getElementsByClassName('main')[1]
  Animation.fadeIn(fadeInElem, toFadeType(ctx.state.referrer, ctx.state.path))

  const titleElem = div.getElementsByClassName('content-header__title')
  document.title = titleElem.length
    ? `${titleElem[0].textContent} | ${configs.name}`
    : configs.name

  next()
}
