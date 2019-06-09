import { TimeoutError } from '../error/TimeoutError'

export const fetchWithTimeout = <T>(...task: Promise<T>[]): Promise<T> => {
  return Promise.race([
    ...task,
    new Promise((resolve): void => {
      setTimeout(resolve, 5000)
    }).then((): Promise<T> => Promise.reject(new TimeoutError(`timeout`))),
  ])
}
