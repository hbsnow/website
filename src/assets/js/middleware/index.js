import fetchPage from '../utils/fetchPage'
import Progress from '../components/Progress'

const mainElem = document.getElementById('main')
const progress = new Progress(document.getElementById('progress'))

export default async (ctx, next) => {
  if (ctx.init) {
    // initial loading
    next()
  } else {
    progress.active()
    try {
      const content = await fetchPage(`${ctx.canonicalPath}index.tpl`)

      mainElem.innerHTML = content
    } catch (error) {
      console.error(error)
      mainElem.innerHTML = `<p>データ取得に失敗したため、処理を中断しました。</p>`
    }
    progress.finish()

    next()
  }
}
