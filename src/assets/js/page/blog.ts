import Codeblock from '../components/Codeblock'

export default (): void => {
  const codeblock = new Codeblock(
    document.querySelectorAll('.codeblock__content')
  )
  codeblock.run()
}
