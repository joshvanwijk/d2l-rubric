/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon */

'use strict';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

suite('<d2l-rubric-text-only>', function() {

	var element, sandbox;

	suiteSetup(function(done) {
		sandbox = sinon.sandbox.create();
		element = fixture('default-rubric');
		/* global getLoadedElement */
		element = getLoadedElement(element, '/rubrics/text-only', done);
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('Text Only Rubric', function() {
		test('Out of container is hidden if using a text only rubric', function() {
			var outOfContainer;
			outOfContainer = dom(element.root).querySelector('.out-of-container');
			expect(outOfContainer.attributes).to.have.ownProperty('hidden');
		});
	});
});
