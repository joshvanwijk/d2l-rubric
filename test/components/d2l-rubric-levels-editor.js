/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, stubWhitelist */

'use strict';

suite('<d2l-rubric-levels-editor>', function() {

	var sandbox;

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
		stubWhitelist();
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {

		test('can be instantiated', function() {
			var element = fixture('basic');
			expect(element.is).to.equal('d2l-rubric-levels-editor');
		});

		suite('add level', function() {

			var fetch;
			var element;

			setup(function(done) {
				element = fixture('basic');
				function waitForLoad(e) {
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/levels.json') {
						element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
						done();
					}
				}
				element.addEventListener('d2l-rubric-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Rubric.EntityStore.clear();
			});

			test('prepends level', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.level_prepended));
					}
				});
				fetch.returns(promise);

				element.addEventListener('d2l-rubric-level-added', function() {
					expect(element._levels.length).to.equal(5);
					expect(element._levels[0].getLinkByRel('self').href).to.equal('static-data/rubrics/organizations/text-only/199/groups/176/levels/1475.json');
					done();
				});

				element.$$('.col-first d2l-button-icon').click();
			});

			test('appends level', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.level_appended));
					}
				});
				fetch.returns(promise);

				element.addEventListener('d2l-rubric-level-added', function() {
					expect(element._levels.length).to.equal(5);
					expect(element._levels[4].getLinkByRel('self').href).to.equal('static-data/rubrics/organizations/text-only/199/groups/176/levels/1480.json');
					done();
				});

				element.$$('.col-last d2l-button-icon').click();
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

				element.addEventListener('d2l-rubric-entity-save-error', function() {
					done();
				});
				element.$$('d2l-button-icon').click();
			});
		});

		suite('readonly', function() {

			var element;

			setup(function(done) {
				element = fixture('readonly');
				function waitForLoad(e) {
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/levels-readonly.json') {
						element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
						done();
					}
				}
				element.addEventListener('d2l-rubric-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});

			test('add is disabled', function() {
				var addButton = element.$$('d2l-button-icon');
				expect(addButton.disabled).to.be.true;
			});
		});
	});
});
