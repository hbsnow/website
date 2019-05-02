import Progress from '../components/Progress'
import { fetchWithTimeout } from '../app/fetchWithTimeout'

const progress = new Progress(
  document.querySelector('.progress__svg'),
  document.querySelector('.progress__bar')
)

export default async (ctx: PageJS.Context, next: () => void): Promise<void> => {
  ctx.state.referrer = location.pathname

  if (!ctx.init) {
    progress.active()

    try {
      const content = await fetchWithTimeout(
        fetch(`${ctx.canonicalPath}index.tpl`)
      )

      ctx.state.content = await content.text()
    } catch (error) {
      console.error(error)
      ctx.state.content = require('../pug/error.pug')
    }

    progress.finish()
  }

  ctx.save()
  next()
}
