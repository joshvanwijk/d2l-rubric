/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon, stubWhitelist */

'use strict';

suite('<d2l-rubric-overall-score>', function() {

	var myElement, sandbox;
	function myAsyncFunction(callback) {
		// 500ms delay before callback
		setTimeout(function() {
		  callback(myElement);
		}, 500);
	  }

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
		myElement = fixture('rub-overall-score');
		stubWhitelist();
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('Rubric with Overall Score', function() {
		
		test('Overall Score section is rendered', function(done) {
			myAsyncFunction(function(myElement){
				expect(!!Polymer.dom(myElement.root).querySelector('.overall-levels'));
				done();
			});
		});
	});
	

});
