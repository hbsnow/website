import page from 'page'
import init from './middleware/init'
import render from './middleware/render'
import index from './page/index'
import blog from './page/blog'
import notfound from './page/notfound'

page('*', init, render)

page('/', index)
page('/blog/:slug', blog)
page('*', notfound)

page()
