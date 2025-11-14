const chalk = require("chalk");

function serverListenMessage() {
  console.log(chalk.cyan.bold("===================================="));
  console.log(chalk.yellow.bold("🚀  DEV CONNECT SERVER STARTED  🚀"));
  console.log(chalk.green.bold("Project: Dev Connect"));
  console.log(chalk.magenta.bold("Contributors: Mayank Kansal & Dipish Bisht"));
  console.log(chalk.blue(`Server running at: ${process.env.ORIGIN_URL}`));
  console.log(chalk.cyan.bold("===================================="));
}

module.exports = serverListenMessage;
