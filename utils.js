const fetch = require("axios");
const { APP_KEY } = require("./config");

const showHelp = (usage) => {
  console.log(usage);
  console.log("\nOptions:\r");
  console.log(
    "\t--version\t      " + "Show version number." + "\t\t" + "[boolean]\r"
  );
  console.log(
    "    -c, --city\t" +
      "      " +
      "\t      name of the city" +
      "\t\t\t" +
      "[boolean]\r"
  );
  console.log("\t--help\t\t      " + "Show help." + "\t\t\t" + "[boolean]\n");
};

const getWeatherReport = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}`;
  return fetch
    .get(url)
    .then((res) => kelvinToCelsius(res.data.main.temp))
    .catch((err) => err.response.data);
};

const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

module.exports = { showHelp, getWeatherReport };
