'use strict'

const gulpsmith = require('gulpsmith')
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
const sitemap = require('metalsmith-sitemap')
const rename = require('metalsmith-rename')
const markdown = require('./metalsmith-markdown')

const configs = {
  site: require('../configs.json'),
  moment: require('moment'),
  escape: require('recursive-escape'),
  url: require('url')
}

module.exports = () => {
  return gulpsmith()
    .metadata(configs)
    .use(drafts())
    .use(
      collections({
        blog: {
          pattern: 'blog/*/index.md',
          sortBy: 'datePublished',
          reverse: true,
          refer: false
        }
      })
    )
    .use(
      collectionMetadata({
        'collections.blog': {
          pagetype: 'BlogPosting'
        }
      })
    )
    .use(posixPath())
    .use(jsonMetadata())
    .use(inPlace())
    .use(markdown())
    .use(
      copy({
        pattern: '**/index.html',
        transform: file => file.replace(/index.html$/g, 'index.tpl')
      })
    )
    .use(
      copy({
        pattern: 'blog/*/index.html',
        transform: file => file.replace(/index.html$/g, 'amp.html')
      })
    )
    .use(
      fileMetadata([
        {
          pattern: '**/index.tpl',
          metadata: {
            pagetype: 'Template'
          }
        },
        {
          pattern: 'blog/*/amp.html',
          metadata: {
            pagetype: 'Amp'
          }
        }
      ])
    )
    .use(
      layouts({
        engine: 'pug',
        pattern: ['**/*'],
        default: 'start.pug',
        directory: 'src/layouts'
      })
    )
    .use(
      sitemap({
        hostname: configs.site.url,
        urlProperty: 'posixPath',
        pattern: '**/index.html'
      })
    )
    .use(rename([['feed.html', 'feed.xml']]))
}
