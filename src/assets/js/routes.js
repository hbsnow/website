import page from 'page'

/**
 * routes
 */
export default app => {
  page.base('/')

  // Middleware
  // @todo これだと404が……
  page('*', async (ctx, next) => {
    const pageName = ctx.canonicalPath.match(/^\/([a-z]+)\//)
    app.page = pageName ? pageName[1] : 'home'

    if (ctx.init) {
      // initial loading
      next()
    } else {
      const mainElem = document.getElementById('main')
      try {
        const response = await fetch(ctx.canonicalPath + 'index.tpl')
        const content = await response.text()
        mainElem.innerHTML = content

        // titleの変更
        const pageTitleNode = document.getElementById('page-title')
        document.title = pageTitleNode ? pageTitleNode.textContent : 'HOME'

        await next()
      } catch (err) {
        console.error('fetch failed:', err)
        mainElem.innerHTML = `<p>データ取得に失敗したため、処理を中断しました。</p>`
      }
    }
  })

  page()
}
