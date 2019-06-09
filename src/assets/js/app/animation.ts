/**
 * Common process for animationend
 * @param elem target element
 * @param className remove className to elem
 * @param onCompleted if callable, it run
 */
const animationEnd = (
  elem: Element | null,
  className: string,
  onCompleted: { (): void } | null = null
): void => {
  if (!elem) return

  const handler = (event: Event): void => {
    elem.classList.remove(className)

    if (!event.target) return
    event.target.removeEventListener('animationend', handler)

    if (onCompleted) {
      onCompleted()
    }
  }

  elem.addEventListener('animationend', handler, false)
}

/**
 * fadeIn animation
 * @param elem
 * @param className
 */
export const fadeIn = (elem: Element | null, className: string): void => {
  if (!elem) return

  elem.classList.add(className)
  animationEnd(elem, className)
}

/**
 * fadeOut animation
 * @param elem fadeOut target element
 * @param className add className to elem
 * @param remove if true, remove elem when animationend
 */
export const fadeOut = (
  elem: Element | null,
  className: string,
  remove = false
): void => {
  if (!elem) return

  elem.classList.add(className)
  animationEnd(elem, className, (): void => {
    if (!remove) return

    elem.remove()
  })
}
