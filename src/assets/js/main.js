import routes from './routes'
import Progress from './components/progress'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  }).then(reg => {
    if (reg.installing) {
      console.log('Service worker installing')
    } else if (reg.waiting) {
      console.log('Service worker installed')
    } else if (reg.active) {
      console.log('Service worker active')
    }
  }).catch(error => {
    // registration failed
    console.log('Registration failed with ' + error)
  })
}

routes()

const progressBar = document.getElementsByClassName('svg-progress__bar')[0]
const progres = new Progress(progressBar)

progres.start()
