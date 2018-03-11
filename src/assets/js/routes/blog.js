import Codeblock from '../components/Codeblock'

export default ctx => {
  const codeblock = new Codeblock(document.querySelectorAll('pre'))
  codeblock.run()
}
