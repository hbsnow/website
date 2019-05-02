import highlight from 'highlight.js/lib/highlight'

highlight.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'))
highlight.registerLanguage('php', require('highlight.js/lib/languages/php'))

export const hljs = highlight
