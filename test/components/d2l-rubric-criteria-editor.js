/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, flush, sinon, getLoadedElement */

'use strict';

suite('<d2l-rubric-criteria-editor>', function() {

	var sandbox;

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {

		test('can be instantiated', function() {
			var element = fixture('basic');
			expect(element.is).to.equal('d2l-rubric-criteria-editor');
		});

		suite('reorder criterion', function() {

			var fetch;
			var element;

			setup(function(done) {
				element = fixture('basic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176/criteria.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('enables drag and drop', function(done) {
				flush(function() {
					var dragHandle = element.$$('.dnd-drag-handle');
					expect(dragHandle.icon).to.equal('d2l-tier1:dragger');
					done();
				});
			});
		});

		suite('readonly', function() {

			var element;

			setup(function(done) {
				element = fixture('readonly');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176/criteria-readonly.json', done);
			});

			teardown(function() {
				window.D2L.Siren.EntityStore.clear();
			});

			test('drag drop is disabled', function() {
				var dragHandle = element.$$('d2l-dnd-sortable');
				expect(dragHandle.disabled).to.be.true;
			});
		});

		suite('holistic', function() {

			var element;

			setup(function(done) {
				element = fixture('holistic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/holistic/199/groups/176/criteria.json', done);
			});

			teardown(function() {
				window.D2L.Siren.EntityStore.clear();
			});

			test('drag drop is disabled', function() {
				var dragHandle = element.$$('d2l-dnd-sortable');
				expect(dragHandle.disabled).to.be.true;
			});
		});
	});
});
