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
      author: 'hbsnow'
    }
  })
  .source('src')
  .destination('build')
  .use(define({
    moment: require('moment')
  }))
  .use(drafts())
  .use(asciidoc())
  .use(collections({
    posts: {
      pattern: '_posts/*.html',
      sortBy: 'date',
      reverse: true
    },
    apps: {
      pattern: 'work/*.adoc',
      sortBy: 'type'
    }
  }))
  .use(branch('_posts/*.html')
    .use(fileMetadata([
      {
        pattern: '_posts/*',
        metadata: {
          template: 'posts/blog.jade',
          autotoc: true
        }
      }
    ]))
    .use(path())
    .use(replace({
      path: function(path) {
        return path.replace(/_posts.[0-9]{4}-[0-9]{2}-[0-9]{2}-/, 'blog/');
      }
    }))
    .use(copy({
      move: true,
      pattern: '_posts/*.html',
      transform: function(file) {
        return file.replace(/_posts.[0-9]{4}-[0-9]{2}-[0-9]{2}-/, 'blog/');
      }
    }))
    .use(autotoc({
      selector: 'h2, h3'
    }))
    .use(tags({
      handle: 'tags',
      path: 'blog/tag/:tag.html',
      template: 'pages/blog/tag.jade',
      sortBy: 'date',
      reverse: true
    }))
    .use(highlight())
  )
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
