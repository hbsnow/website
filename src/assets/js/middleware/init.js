import Document from '../class/Utils/Document'
import Progress from '../components/Progress'

const progress = new Progress(document.getElementById('progress'))

export default async (ctx, next) => {
  ctx.state.referrer = location.pathname

  if (!ctx.init) {
    progress.active()

    try {
      ctx.state.content = await Document.fetch(`${ctx.canonicalPath}index.tpl`)
    } catch (error) {
      console.error(error)
      ctx.state.content = `<p>データ取得に失敗したため、処理を中断しました。</p>`
    }
    progress.finish()
  }
  ctx.save()
  next()
}
