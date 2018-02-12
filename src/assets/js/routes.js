import page from 'page'
import fetchPage from './components/fetchPage'

/**
 * routes
 */
export default () => {
  const mainElem = document.getElementById('main')
  const progressElem = document.getElementById('progress')
  const progressBarElem = progressElem.querySelector('.progress__bar')

  page.base('/')

  page('*', async (ctx, next) => {
    const pageTypeMatch = ctx.canonicalPath.match(/^\/([a-z]+)\//)
    const pageType = pageTypeMatch ? pageTypeMatch[1] : 'home'

    if (ctx.init) {
      // initial loading
      next()
    } else {
      try {
        progressElem.classList.add('progress--active')

        const content = await fetchPage(ctx.canonicalPath + 'index.tpl')
        progressElem.classList.add('progress--finish')

        const pageTitleElem = document.getElementById('content-title')
        mainElem.innerHTML = content

        const siteTitle = 'hbsnow.github.io'
        const pageTitle = pageTitleElem
          ? pageTitleElem.textContent + ' | ' + siteTitle
          : siteTitle
        document.title = pageTitle

        const progressTransitionEndHandler = event => {
          console.log('finish')
          progressElem.classList.remove('progress--active', 'progress--finish')
          event.target.removeEventListener('transitionend', progressTransitionEndHandler)
        }
        progressBarElem.addEventListener('transitionend', progressTransitionEndHandler, false)
      } catch (error) {
        console.error(error)
        mainElem.innerHTML = `<p>データ取得に失敗したため、処理を中断しました。</p>`
      }

      // ナビゲーションの表示切替
      console.log(pageType)

      next()
    }
  })

  page()
}
