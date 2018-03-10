import page from 'page'
import index from './middleware/index'
import Codeblock from './components/Codeblock'

/**
 * routes
 */
export default () => {
  page.base('/')

  // middleware
  page('*', index)

  page('blog/:slug', (ctx, next) => {
    // const pageType = getPageType(ctx.canonicalPath)

    document.title = ctx.title

    const codeblock = new Codeblock(document.querySelectorAll('pre'))
    codeblock.run()

    console.log(ctx)

    next()
  })

  page()
}
