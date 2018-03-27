'use strict'

const path = require('path')
const metalsmith = require('metalsmith')
const copy = require('metalsmith-copy')
const branch = require('metalsmith-branch')
const inPlace = require('metalsmith-in-place')
const layouts = require('metalsmith-layouts')
const collections = require('metalsmith-collections')
const collectionMetadata = require('metalsmith-collection-metadata')
const fileMetadata = require('metalsmith-filemetadata')
const when = require('metalsmith-if')
const drafts = require('metalsmith-drafts')
const posixPath = require('metalsmith-posix-path')
const jsonMetadata = require('metalsmith-json-metadata')
const watch = require('metalsmith-watch')
const markdown = require('./metalsmith-markdown')
const posthtml = require('metalsmith-posthtml')
const rename = require('metalsmith-rename')
const git = require('metalsmith-git')
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

const watches = process.argv.some(val => val === '--watch')

const Metalsmith = metalsmith(path.join(__dirname, '../'))
  .metadata(configs)
  .source('src/html')
  .destination('docs')
  .use(drafts())

  // 他のassetファイルまで削除されるので、Metalsmithからは削除しない
  .clean(false)

  .use(posixPath())
  .use(jsonMetadata())
  .use(
    collections({
      blog: {
        pattern: 'blog/*/index.md',
        sortBy: 'date',
        reverse: true,
        refer: false
      }
    })
  )
  .use(
    collectionMetadata({
      'collections.blog': {
        layout: 'blog/default.pug',
        hasAmp: true,
        pagetype: 'BlogPosting'
      }
    })
  )
  .use(git({ pattern: 'blog/*/index.html' }))
  .use(markdown())
  .use(inPlace())

  // コンテンツのみのテンプレートファイルを作成
  .use(
    copy({
      pattern: '**/index.html',
      transform: file => file.replace(/index.html$/g, 'index.tpl')
    })
  )

  // AMP用ファイルの作成
  .use(
    copy({
      pattern: 'blog/*/index.html',
      transform: file => file.replace(/index.html$/g, 'amp.html')
    })
  )

  // tplとAMP用ファイルの使用するlayoutを変更
  .use(
    fileMetadata([
      {
        pattern: '**/index.tpl',
        metadata: {
          layout: 'tpl.pug'
        }
      },
      {
        pattern: 'blog/*/amp.html',
        metadata: {
          layout: 'blog/amp.pug'
        }
      }
    ])
  )

  .use(
    layouts({
      engine: 'pug',
      pattern: ['**/index.{html,tpl}', '**/amp.html'],
      default: 'default.pug',
      directory: 'src/layouts'
    })
  )
  .use(debug())

  // .html
  .use(branch('**/index.html').use(posthtml()))

  // .amp
  .use(branch('**/amp.html').use(posthtml()))

  // .tpl
  .use(branch('**/index.tpl').use(posthtml()))

  .use(
    when(
      watches,
      watch({
        paths: {
          '${source}/**/*': true,
          'src/layouts/**/*': '**/*'
        }
      })
    )
  )
  .build(err => {
    if (err) throw err

    console.log('Site build complete!!')
  })
