import page from 'page'
import init from './middleware/init'
import render from './middleware/render'
import index from './routes/index'
import blog from './routes/blog'
import notfound from './routes/notfound'

/**
 * routes
 */
page('*', init, render)

page('/', index)
page('/blog/:slug', blog)
page('*', notfound)

page()
