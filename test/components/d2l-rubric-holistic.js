/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon */

'use strict';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

suite('<d2l-rubric-text-only>', function() {

	var element, sandbox;

	suiteSetup(function(done) {
		sandbox = sinon.sandbox.create();
		element = fixture('holistic-rubric');
		/* global getLoadedElement */
		element = getLoadedElement(element, 'data/rubrics/organizations/holistic/226.json', done);
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('Holistic Rubric', function() {
		test('Overall Score section is not rendered for holistic rubrics', function() {
			var overallScoreElement = dom(element.root).querySelector('d2l-rubric-overall-score');
			expect(overallScoreElement).to.be.null;
		});
	});
});
