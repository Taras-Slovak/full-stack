#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";
import { printHelp, printSuccess, printError} from './services/log.service.js';


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

const initCLI = ()=>{
  const args = getArgs(process.argv); 
  if (args.h) {
    printHelp();
  }
  if (args.s) {
    //...
  }

  if (args.t) {
    saveKeyValue('token',args.t);
  }
}

initCLI();