import axios from "axios";
import chalk from "chalk";
import moment from "moment";

export async function ping() {
    const result = await axios.get('http://localhost:4555/ping')
    console.log(result);
    console.log(moment(Date.now()).format('HH:mm:ss'))
    console.log(chalk.white.bgBlack('lalal'))
}