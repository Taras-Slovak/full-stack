import chalk from 'chalk';
import dedent from 'dedent-js';

export function printError  (error) {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

export function printSuccess  (message) {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

export function printHelp ()  {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Without parameters - weather output
		-s [CITY] to city installation
		-h to withdraw assistance
		-t [API_KEY] to save the token
		`
	);
};

export function printWeather (res, icon)  {
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} City weather ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed}
		`
	);
};

