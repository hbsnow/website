import routes from './routes'
import Progress from './components/progress'

routes()

const progressBar = document.getElementsByClassName('svg-progress__bar')[0]
const progres = new Progress(progressBar)

progres.start()
