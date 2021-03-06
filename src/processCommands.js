/**
*
* processCommands.js - processes the user's astro command and options
*
* @param command - the astro command
* @param options - the options to apply to the command
**/
var chalk = require('chalk')
	;

var noModuleFound = require('./messages/noModuleFound')
	, processInstallCommands = require('./processInstallCommands')
	, cwd = process.cwd()
	, executeCommand = require('./executeCommand')
	, checkForModule = require('./checkForModule')
	;

// execute
function executeModule(module, options) {
	var command = require(module)(cwd, options);

	// if the module returns a command execute it
	if (command.cmd) {
		return executeCommand(command.cmd, command.args, cwd, function (err, code) {
			if (!options.watch) {
				process.exit(code);
			}

			if (code !== 0) {
				console.log(chalk['bgRed']['white'](`  Process completed but with the code "${code}"`));
				console.log(chalk['bgRed']['white'](`  ${err}`));
			}
		});
	}
}

// process the command
function processCommand (cmd, options) {
	var module = checkForModule(cmd);

	// execute module if exists
	if (module) {
		return executeModule(module, options);
	} else {
		processInstallCommands(['install', cmd], options, function (err) {
			if (err) {
				noModuleFound(cmd);
			}
			module = checkForModule(cmd);

			// execute module if exists now
			if (module) {
				executeModule(module, options);
			}
		});
	}
}

module.exports = function (commands, options) {
	// process each command
	commands.forEach(function (cmd) {
		processCommand(cmd, options);
	});
};