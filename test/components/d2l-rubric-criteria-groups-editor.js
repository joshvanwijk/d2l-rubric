/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon */

'use strict';

suite('<d2l-rubric-criteria-groups-editor>', function() {

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
			expect(element.is).to.equal('d2l-rubric-criteria-groups-editor');
		});

		suite('add criteria group', function() {

			var fetch;
			var element;

			setup(function(done) {
				element = fixture('basic');
				/* global getLoadedElement */
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test.skip('adds criteria group', function(done) { // Hangs even though done is called, no errors
				expect(element._groups.length).to.equal(1);

				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.criteria_group_added));
					}
				});
				fetch.returns(promise);

				element.addEventListener('d2l-rubric-criteria-group-added', function() {
					expect(element._groups.length).to.equal(2);
					done();
				});

				element.$$('d2l-button').click();
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
				element.$$('d2l-button').click();
			});
		});

		suite('readonly', function() {

			var element;

			setup(function(done) {
				element = fixture('readonly');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups-readonly.json', done);
			});

			test('add is disabled', function() {
				var addButton = element.$$('d2l-button');
				expect(addButton.hidden).to.be.true;
			});
		});
	});
});
