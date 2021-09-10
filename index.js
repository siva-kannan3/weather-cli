#! /usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const boxen = require("boxen");

const { showHelp, getWeatherReport } = require("./utils");

const usage =
  "\nUsage: weather -c --city <city_name> name of the city to fetch the weather";
const options = yargs
  .usage(usage)
  .option("c", {
    alias: "city",
    describe: "name of the city",
    type: "string",
    demandOption: false,
  })
  .help(true).argv;

if ((!yargs.argv.city && !yargs.argv.c) || !yargs.argv._) {
  clear();

  console.log(
    chalk.yellow(figlet.textSync("weather cli", { horizontalLayout: "full" }))
  );
  showHelp(usage);
  return;
}

var city = yargs.argv.city.toLowerCase();

var response = getWeatherReport(city);

console.log(
  response.then((res) => {
    clear();
    if (res?.cod) {
      console.log(
        "\n" +
          boxen(
            chalk.red(
              `\nError: The registered city list does not contain your city name\n`
            ),
            {
              padding: 1,
              borderColor: "red",
              dimBorder: true,
            }
          ) +
          "\n"
      );
      return;
    }
    console.log(
      "\n" +
        boxen(chalk.green(`\n${city}'s temperature is ${res}° celsius\n`), {
          padding: 1,
          borderColor: "green",
          dimBorder: true,
        }) +
        "\n"
    );
  })
);
