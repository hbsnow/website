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
const posthtml = require('metalsmith-posthtml')
const debug = require('metalsmith-debug')

const configs = {
  site: require('./configs.json'),
  moment: require('moment'),
  urlJoin: require('url-join'),
  escape: require('recursive-escape'),
  nodePath: require('path')
}

const branchPattern = {
  docs: 'docs/*/index.{html,md,pug}',
  reviews: 'reviews/*/index.{html,md,pug}'
}

const watches = process.argv.every((val, index) => val === '--watch')


const m = metalsmith(__dirname)
m
  .metadata(configs)
  .source('src/html')
  .destination('docs')
  .use(posixPath())
  .use(jsonMetadata())
  .use(drafts())
  .use(copy({
    pattern: branchPattern.docs,
    transform: file => {
      return file.replace(/index.md$/g, 'amp.md')
    }
  }))
  .use(copy({
    pattern: branchPattern.reviews,
    transform: file => {
      return file.replace(/index.md$/g, 'amp.md')
    }
  }))
  .use(collections({
    docs: {
      pattern: branchPattern.docs,
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
    'collections.docs': {
      layout: 'docs/default.pug',
      hasAmp: true,
      pagetype: 'BlogPosting',
      feed: {
        href: '/docs/feed.xml',
        title: 'hbsnow.github.io/docs'
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
    collection: ['docs', 'reviews'],
    limit: 10,
    name: ':collection/feed.xml'
  }))



// docs
m
  .use(branch(branchPattern.docs)
    .use(drafts())
  )



// reviews
m
  .use(branch(branchPattern.reviews)
    .use(drafts())
  )



// products
m
  .use(branch(branchPattern.products)
    .use(drafts())
  )



m
  .use(inPlace())
  .use(layouts({
    engine: 'pug',
    pattern: '**/*.{html,md,pug}',
    default: 'default.pug',
    directory: 'src/layouts'
  }))
  .use(debug())
  .use(posthtml())
  .use(when(
    watches,
    watch({
      paths: {
        '${source}/**/*': true,
        'src/layouts/**/*': '**/*'
      }
    })
  ))
  .build((err) => {
    if (err) throw err

    console.log('Site build complete!!')
  })
