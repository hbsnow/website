'use strict';

var Metalsmith = require('metalsmith');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
var copy = require('metalsmith-copy');
var templates = require('metalsmith-templates');
var asciidoc = require('metalsmith-asciidoc');
var autotoc = require('metalsmith-autotoc');
var drafts = require('metalsmith-drafts');
var tags = require('metalsmith-tags');
var define = require('metalsmith-define');
var fileMetadata = require('metalsmith-filemetadata');
var path = require('metalsmith-path');
var replace = require('metalsmith-replace');
var highlight = require('metalsmith-highlight');

var metalsmith = new Metalsmith(__dirname);

metalsmith
  .metadata({
    site: {
      title: '4uing',
      author: 'hbsnow',
      url: 'https://4uing.net/'
    }
  })
  .source('src')
  .destination('build')
  .use(define({
    moment: require('moment')
  }))
  .use(drafts())
  .use(asciidoc())
  .use(branch('_posts/*/index.html')
    .use(fileMetadata([
      {
        pattern: '_posts/*/index.html',
        metadata: {
          template: 'posts/blog.jade',
          autotoc: true
        }
      }
    ]))
    .use(autotoc({
      selector: 'h2, h3'
    }))
    .use(highlight())
    .use(copy({
      move: true,
      pattern: '_posts/*/index.html',
      transform: function(file) {
        return file.replace('_posts', 'blog');
      }
    }))
    .use(tags({
      handle: 'tags',
      path: 'blog/tag/:tag/index.html',
      template: 'pages/blog/tag.jade',
      sortBy: 'date',
      reverse: true
    }))
    .use(branch('blog/tag/*/index.html')
      .use(fileMetadata([
        {
          pattern: 'blog/tag/*/index.html',
          metadata: {
            description: '投稿の新しい日付順にソートされた指定タグに所属する記事の全件表示。'
          }
        }
      ]))
    )
  )
  .use(path())
  .use(replace({
    path: function(path) {
      return path.replace('_posts', 'blog')
                 .replace('index.html', '')
                 .replace(/\\/g, '/');
    }
  }))
  .use(collections({
    posts: {
      pattern: 'blog/*/index.html',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(templates({
    engine: 'jade',
    directory: 'templates'
  }))
  .use(copy({
    pattern: '**/*.html',
    extension: '.tpl'
  }))
  .use(branch('**/*.html')
    .use(fileMetadata([
      {
        pattern: '**/*.html',
        metadata: {
          template: 'master.jade',
        }
      }
    ]))
    .use(templates({
      engine: 'jade',
      directory: 'templates'
    }))
  )
  .build(function(error) {
    if(error) {
      console.log(error);
    } else {
      console.log('Site build complete!');
    }
  });
