/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon, stubWhitelist */

'use strict';

suite('<d2l-rubric-editor>', function() {

	var element, sandbox;

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
		element = fixture('basic');
		stubWhitelist();
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {

		test('can be instantiated', function() {
			expect(element.is).to.equal('d2l-rubric-editor');
		});

	});

	suite ('Ally Test',function(){
		suiteSetup(function(){
			if (!isAttestInstalled()){
				this.skip();
			}
		});
		test('d2l-rubric-editor ally checks',function(){
			ally_tests();
		});
	});
});
