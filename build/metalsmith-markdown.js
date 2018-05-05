'use strict'

const path = require('path')
const markdown = require('metalsmith-markdownit')

module.exports = () => {
  const md = markdown('commonmark', {
    html: false,
    xhtmlOut: false,
    quotes: ''
  })

  md.parser.use(require('markdown-it-table').markdownItTable)

  md.parser.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const info = token.info
      ? md.parser.utils.unescapeAll(token.info).trim()
      : ''
    const fileName = info && info.split(/\s+/g)[0]
    const parsed = path.parse(fileName)
    const ext = parsed.ext.slice(1) || parsed.name

    return (
      `<div class="codeblock">` +
      `<div class="codeblock__title">${fileName}</div>` +
      `<pre class="codeblock__content ${ext}">` +
      `<code class="codeblock__code codeblock__code--${ext}">` +
      md.parser.utils.escapeHtml(token.content) +
      `</code>` +
      `</pre>\n` +
      `</div>\n`
    )
  }

  return md
}
