const timeout = (ms, promise) => {
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

export default async filepath => {
  try {
    const response = await timeout(5000, fetch(filepath))
    const content = await response.text()

    return content
  } catch (error) {
    console.error(`fetch failed: ${error}`)
  }
}
