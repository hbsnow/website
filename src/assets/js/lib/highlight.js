import highlight from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'

highlight.registerLanguage('javascript', javascript)
highlight.registerLanguage('json', json)

export default highlight
