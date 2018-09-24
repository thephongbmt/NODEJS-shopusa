/*eslint no-console: ["error", { allow: ["log"] }] */
import chalk from 'chalk';

class Log {
  success(message) {
    this.color(message, 'green');
  }
  info(message) {
    this.color(message, 'blue');
  }
  error(message) {
    this.color(message, 'red');
  }
  warn(message) {
    this.color(message, 'yellow');
  }
  color(message, color = 'white') {
    console.log(chalk[color](message));
  }
}
export default new Log();
