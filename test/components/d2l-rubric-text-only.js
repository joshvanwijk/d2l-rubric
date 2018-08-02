/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon, stubWhitelist */

'use strict';

suite('<d2l-rubric-text-only>', function() {

	var myElement, sandbox;
	function myAsyncFunction(callback) {
		// 500ms delay before callback
		setTimeout(function() {
		  callback(myElement);
		}, 500);
	  }

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
		myElement = fixture('rub-text-only');
		stubWhitelist();
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('Text Only Rubric', function() {
		test('Out of container is hidden if using a text only rubric', function(done) {
			myAsyncFunction(function(myElement){
				var outOfContainer;
				outOfContainer = Polymer.dom(myElement.root).querySelector('.out-of-container');
				expect(outOfContainer.attributes).to.have.ownProperty('hidden');
				done();
			});
		});
		
		test('Overall Score section is not rendered if the rubric has no overall score', function(done) {
			myAsyncFunction(function(myElement){
				expect(!Polymer.dom(myElement.root).querySelector('.overall-levels'));
				done();
			});
		});
	});
	

});
