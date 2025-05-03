import axios from "axios";
import chalk from "chalk";
import moment from "moment";

export async function ping() {
    const result = await axios.get(import.meta.env.VITE_API_BASE_URL + '/api/v2/ping')
    console.log(result);
    console.log(moment(Date.now()).format('HH:mm:ss'))
    console.log(chalk.white.bgBlack('lalal'))
}