import chalk from "chalk"

export function serverListenMessage() {
  console.log(chalk.cyan.bold("===================================="));
  console.log(chalk.yellow.bold("🚀  CodeClash SERVER STARTED  🚀"));
  console.log(chalk.green.bold("Project: CodeClash"));
  console.log(chalk.magenta.bold("Contributors: Mayank Kansal & Dipish Bisht"));
  console.log(chalk.blue(`Server running at: ${process.env.ORIGIN_URL}`));
  console.log(chalk.cyan.bold("===================================="));
}
