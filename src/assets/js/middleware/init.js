import Document from '../class/Utils/Document'
import Progress from '../components/Progress'
import errorHtml from '../pug/error.pug'

const progress = new Progress(
  document.querySelector('.progress__svg'),
  document.querySelector('.progress__bar')
)

export default async (ctx, next) => {
  ctx.state.referrer = location.pathname

  if (!ctx.init) {
    progress.active()

    try {
      ctx.state.content = await Document.fetch(`${ctx.canonicalPath}index.tpl`)
    } catch (error) {
      console.error(error)
      ctx.state.content = errorHtml()
    }
    progress.finish()
  }
  ctx.save()
  next()
}
