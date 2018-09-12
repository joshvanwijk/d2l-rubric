/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon */

'use strict';

suite('<d2l-rubric>', function() {

	var element, sandbox;

	suiteSetup(function(done) {
		sandbox = sinon.sandbox.create();
		element = fixture('basic');

		function waitForLoad(e) {
			if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199.json') {
				element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
				done();
			}
		}
		element.addEventListener('d2l-siren-entity-changed', waitForLoad);
		element.href = 'static-data/rubrics/organizations/text-only/199.json';
		element.token = 'foozleberries';
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {

		test('can be instantiated', function() {
			expect(element.is).to.equal('d2l-rubric');
		});

		test('can show content', function() {
			expect(element._showContent).to.be.true;
		});

		test('has no assessment', function() {
			expect(element.assessmentHref).to.be.undefined;
			expect(element.assessmentEntity).to.be.null;
			expect(element._score).to.be.null;
		});
	});

	suite('do not show content until entity loaded', function() {
		suiteSetup(function() {
			element = fixture('basic');
		});

		test('do not show content without href', function() {
			expect(element._showContent).to.be.false;
		});

		test('show content after loading', function(done) {
			element = fixture('basic');
			function waitForLoad(e) {
				if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199.json') {
					expect(element._showContent).to.be.true;
					element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
					done();
				}
			}
			element.addEventListener('d2l-siren-entity-changed', waitForLoad);
			element.href = 'static-data/rubrics/organizations/text-only/199.json';
			element.token = 'foozleberries';
			expect(element._showContent).to.be.false;
		});

		test('check for spinner on page', function() {
			var loaderElement = element.$$('d2l-rubric-loading');
			expect(loaderElement).to.exist;
		});
	});

	suite ('Ally Test',function(){
		suiteSetup(function(){
			if (!isAttestInstalled()){
				this.skip();
			}
		});
		test('d2l-rubric ally checks',function(){
			ally_tests();
		});
	});
});
