export default async filepath => {
  try {
    const response = await fetch(filepath)
    const content = await response.text()

    return content
  } catch (error) {
    console.error(`fetch failed: ${error}`)
  }
}
