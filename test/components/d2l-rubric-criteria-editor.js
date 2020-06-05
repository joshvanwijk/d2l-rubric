/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, flush, sinon */

'use strict';

suite('<d2l-rubric-criteria-editor>', function() {

	var sandbox;
	var isVisible = function(elem) {
		var style = elem && getComputedStyle(elem);
		return style && style.visibility !== 'hidden' && style.display !== 'none' && !elem.hasAttribute('hidden');
	};

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

		suite('add criterion', function() {

			var fetch;
			var element;

			setup(function(done) {
				element = fixture('basic');
				/* global getLoadedElement */
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176/criteria.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('adds criterion', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.criterion_added));
					}
				});
				fetch.returns(promise);

				element.addEventListener('d2l-rubric-criterion-added', function() {
					expect(element.criterionCount).to.equal(4);
					done();
				});

				element.$$('d2l-button-subtle').click();
			});

			test('generates event if adding fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({}));
					}
				});
				fetch.returns(promise);

				element.addEventListener('d2l-siren-entity-save-error', function() {
					done();
				});
				element.$$('d2l-button-subtle').click();
			});
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

			test('add is disabled', function() {
				var addButton = element.$$('d2l-button-subtle');
				expect(addButton.disabled).to.be.true;
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

			test('add footer is hidden', function() {
				var addFooter = element.$$('.footer');
				expect(isVisible(addFooter)).to.be.false;
			});

			test('drag drop is disabled', function() {
				var dragHandle = element.$$('d2l-dnd-sortable');
				expect(dragHandle.disabled).to.be.true;
			});
		});
	});
});
