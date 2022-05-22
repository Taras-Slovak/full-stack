#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from './services/api.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';


async function saveToken  (token)  {
	if (!token.length) {
		printError('Token not passed');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token is saved');
	} catch (e) {
		printError(e.message);
	}
}

async function saveCity (city) {
	if (!city.length) {
		printError('City not assigned');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('The city is saved');
	} catch (e) {
		printError(e.message);
	}
}

async function getForecast ()  {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Invalid city');
		} else if (e?.response?.status == 401) {
			printError('Invalid token');
		} else {
			printError(e.message);
		}
	}
}

const initCLI = ()=>{
  const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForecast ();
}

initCLI();