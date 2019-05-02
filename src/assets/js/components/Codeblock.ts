import { hljs } from '../app/highlight'

export default class {
  private node: NodeListOf<Element>

  public constructor(node: NodeListOf<Element>) {
    this.node = node
  }

  public run(): void {
    this.node.forEach(
      (node): void => {
        hljs.highlightBlock(node)
      }
    )
  }
}
