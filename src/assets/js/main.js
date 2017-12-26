import Vue from 'vue'
import page from 'page'

Vue.config.debug = true

const appNav = new Vue({
  el: '#nav',
  data: {
    page: ''
  }
})

page.base('/')

// Middleware
// @todo これだと404が……
page('*', async (ctx, next) => {
  const pageName = ctx.canonicalPath.match(/^\/([a-z]+)\//)
  appNav.page = pageName ? 'page' : 'home'

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
      const pageTitleNode = document.getElementById('content-title')
      const siteTitle = 'hbsnow.github.io'
      document.title = pageTitleNode ? pageTitleNode.textContent + ' | ' + siteTitle : siteTitle

      await next()
    } catch (err) {
      console.error('fetch failed:', err)
      mainElem.innerHTML = `<p>データ取得に失敗したため、処理を中断しました。</p>`
    }
  }
})

page()
