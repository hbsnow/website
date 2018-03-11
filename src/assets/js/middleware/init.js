import fetchPage from '../utils/fetchPage'
import Progress from '../components/Progress'

const progress = new Progress(document.getElementById('progress'))

export default async (ctx, next) => {
  if (ctx.init) {
    // initial loading
    next()
  } else {
    progress.active()

    try {
      ctx.state.content = await fetchPage(`${ctx.canonicalPath}index.tpl`)
    } catch (error) {
      console.error(error)
      ctx.state.content = `<p>データ取得に失敗したため、処理を中断しました。</p>`
    }

    ctx.save()
    progress.finish()

    next()
  }
}
