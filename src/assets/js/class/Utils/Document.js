export default class {
  static timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('timeout'))
      }, ms)

      promise.then(
        res => {
          clearTimeout(timeoutId)
          resolve(res)
        },
        err => {
          clearTimeout(timeoutId)
          reject(err)
        }
      )
    })
  }

  static async fetch(filepath) {
    try {
      const response = await this.timeout(5000, fetch(filepath))
      const content = await response.text()

      return content
    } catch (error) {
      throw new Error(`fetch failed: ${error}`)
    }
  }
}
