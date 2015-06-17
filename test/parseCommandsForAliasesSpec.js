/**
*
* parseCommandsSpec.js - Mocha test
*
**/

var chai = require('chai');
var expect = require('chai').expect;

var parser = require('../src/parseCommandsForAliases.js');

describe('parseCommandsForAliases.js', function () {

	before(function () {
		this.commands = [
		'jshint',
		'test',
		'mocha'];

		this.aliases = {
			'test': ['jshint, mocha, --chai --sinon --proxyquire']
		}
	})

	it('should return an empty array if no commands provided', function () {
		expect(parser()).to.be.instanceof(Array);
	});

	it('should return back commands if no commands provided', function () {
		expect(parser(this.commands)).to.be.eql(this.commands);
	});

	it('should concat aliases into commands and remove duplications', function () {
		var result = parser(this.commands, this.aliases);

		console.log(result);

	})
});