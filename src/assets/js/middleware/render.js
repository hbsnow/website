const mainElem = document.getElementById('main')

export default (ctx, next) => {
  if (!ctx.init) {
    document.title = ctx.title
    mainElem.innerHTML = ctx.state.content
  }

  next()
}
