import Codeblock from '../components/Codeblock'

export default ctx => {
  const codeblock = new Codeblock(
    document.querySelectorAll('.codeblock__content')
  )
  codeblock.run()
}
