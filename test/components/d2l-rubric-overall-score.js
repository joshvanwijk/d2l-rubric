/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon */

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
	
	suite('Ally Test', function() {
		/* eslint no-invalid-this:0 */
		/* global isAttestInstalled */
		/* global ally_tests */
		suiteSetup(function() {
			if (!isAttestInstalled()) {
				this.skip();
			}
		});
		test('d2l-rubric-overall-score ally checks', function() {
			ally_tests();
		});
	});

});
