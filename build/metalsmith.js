'use strict'

const path = require('path')
const metalsmith = require('metalsmith')
const copy = require('metalsmith-copy')
const branch = require('metalsmith-branch')
const inPlace = require('metalsmith-in-place')
const layouts = require('metalsmith-layouts')
const collections = require('metalsmith-collections')
const collectionMetadata = require('metalsmith-collection-metadata')
const when = require('metalsmith-if')
const drafts = require('metalsmith-drafts')
const posixPath = require('metalsmith-posix-path')
const jsonMetadata = require('metalsmith-json-metadata')
const feed = require('metalsmith-rssfeed')
const watch = require('metalsmith-watch')
const markdown = require('metalsmith-markdownit')
const posthtml = require('metalsmith-posthtml')
const rename = require('metalsmith-rename')
const debug = require('metalsmith-debug')

const htmlnano = require('htmlnano')
const inlineAssets = require('posthtml-inline-assets')


const configs = {
  site: require('../configs.json'),
  moment: require('moment'),
  urlJoin: require('url-join'),
  escape: require('recursive-escape'),
  nodePath: path
}

const branchPattern = {
  tpl: '**/index.tpl.{html,md,pug}',
  amp: '{blog,reviews}/*/index.{html,md,pug}',
  blog: 'blog/*/index.{html,md,pug}',
  reviews: 'reviews/*/index.{html,md,pug}'
}



const watches = process.argv.some(val => val === '--watch')

metalsmith(path.join(__dirname, '../'))
  .metadata(configs)
  .source('src/html')
  .destination('docs')
  .use(posixPath())
  .use(jsonMetadata())
  .use(drafts())

  // コンテンツのみを含むテンプレートファイルを作成
  .use(copy({
    pattern: '**/index.{html,md,pug}',
    transform: file => file.replace(/index.(html|md|pug)$/g, 'index.tpl.$1')
  }))

  // AMP用ファイルの作成
  .use(copy({
    pattern: branchPattern.amp,
    transform: file => file.replace(/index.md$/g, 'amp.md')
  }))

  .use(collections({
    tpl: {
      pattern: branchPattern.tpl,
      refer: false
    },
    blog: {
      pattern: branchPattern.blog,
      sortBy: 'date',
      reverse: true,
      refer: false
    },
    reviews: {
      pattern: branchPattern.reviews,
      sortBy: 'date',
      reverse: true,
      refer: false
    }
  }))
  .use(collectionMetadata({
    'collections.tpl': {
      layout: 'tpl.pug'
    },
    'collections.blog': {
      layout: 'blog/default.pug',
      hasAmp: true,
      pagetype: 'BlogPosting',
      feed: {
        href: '/blog/feed.xml',
        title: 'hbsnow.github.io/blog'
      }
    },
    'collections.reviews': {
      layout: 'reviews/default.pug',
      hasAmp: true,
      pagetype: 'Review',
      feed: {
        url: '/reviews/feed.xml',
        title: 'hbsnow.github.io/reviews'
      }
    }
  }))
  .use(feed({
    author: configs.site.author.name,
    collection: ['blog', 'reviews'],
    limit: 10,
    name: ':collection/feed.xml'
  }))

  // docs
  .use(branch(branchPattern.docs)
    .use(drafts())
  )

  // reviews
  .use(branch(branchPattern.reviews)
    .use(drafts())
  )

  // products
  .use(branch(branchPattern.products)
    .use(drafts())
  )

  .use(inPlace())
  .use(markdown('commonmark', {
    xhtmlOut: false
  }))
  .use(layouts({
    engine: 'pug',
    pattern: '**/*!(.tpl).html',
    default: 'default.pug',
    directory: 'src/layouts'
  }))
  .use(debug())

  .use(rename([
    [/\.tpl\.html$/, '.tpl']
  ]))

  // .html
  .use(branch('**/index.html')
    .use(posthtml(
      [
        htmlnano()
      ],
      {}
    ))
  )

  // .amp
  .use(branch('**/amp.html')
    .use(posthtml(
      [
        htmlnano()
        inlineAssets()
      ],
      {}
    ))
  )

  // .tpl
  .use(branch('**/index.tpl')
    .use(posthtml(
      [
        htmlnano()
      ],
      {}
    ))
  )

  .use(when(
    watches,
    watch({
      paths: {
        '${source}/**/*': true,
        'src/layouts/**/*': '**/*'
      }
    })
  ))
  .build(err => {
    if (err) throw err

    console.log('Site build complete!!')
  })
