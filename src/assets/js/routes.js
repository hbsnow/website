import page from 'page'
import fetchPage from './components/fetchPage'

/**
 * routes
 */
export default () => {
  const mainElem = document.getElementById('main')

  page.base('/')

  page('*', async (ctx, next) => {
    const pageTypeMatch = ctx.canonicalPath.match(/^\/([a-z]+)\//)
    const pageType = pageTypeMatch ? pageTypeMatch[1] : 'home'

    if (ctx.init) {
      // initial loading
      next()
    } else {
      try {
        const content = await fetchPage(ctx.canonicalPath + 'index.tpl')
        const pageTitleElem = document.getElementById('content-title')

        mainElem.innerHTML = content
        const siteTitle = 'hbsnow.github.io'
        const pageTitle = pageTitleElem ? pageTitleElem.textContent + ' | ' + siteTitle : siteTitle

        document.title = pageTitle
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
