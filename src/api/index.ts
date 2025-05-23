import axios from 'axios'
import chalk from 'chalk'
import moment from 'moment'

export async function ping() {
  console.log('API_URL', import.meta.env.VITE_API_BASE_URL)
  const result = await axios.get(import.meta.env.VITE_API_BASE_URL + '/v2/ping')
  console.log(result)
  console.log(moment(Date.now()).format('HH:mm:ss'))
  console.log(chalk.white.bgBlack('lalal'))
}
