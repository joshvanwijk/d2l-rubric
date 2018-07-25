/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, stubWhitelist */

'use strict';

suite('<d2l-rubric-criteria-group-editor>', function() {

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
			expect(element.is).to.equal('d2l-rubric-criteria-group-editor');
		});

		suite('edit group name', function() {

			var element;
			var fetch;
			var raf = window.requestAnimationFrame;

			setup(function(done) {
				element = fixture('basic');
				function waitForLoad(e) {
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176.json') {
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

			test('group name editor enabled with action', function(done) {
				expect(element.$$('#group-name').disabled).to.be.false;
				done();
			});

			test('saves group name', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.group_name_mod));
					}
				});
				fetch.returns(promise);

				var nameTextInput = element.$$('#group-name');
				nameTextInput.value = 'New Group Name';
				element.addEventListener('d2l-rubric-group-name-saved', function() {
					expect(nameTextInput.value).to.equal('New Group Name');
					done();
				});
				nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
			});

			test('generates error if saving fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({}));
					}
				});
				fetch.returns(promise);

				var groupTextArea = element.$$('#group-name');
				groupTextArea.value = 'New Group Name';
				raf(function() {
					element.addEventListener('d2l-rubric-entity-save-error', function() {
						flush(function() {
							done();
						});
					});
					groupTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});
		
		suite('readonly', function() {

			var element;

			setup(function(done) {
				element = fixture('readonly');
				function waitForLoad(e) {
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176.json') {
						element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
						done();
					}
				}
				element.addEventListener('d2l-rubric-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});
			
			test('group name is disabled without action', function() {
				expect(element.$$('#group-name').disabled).to.be.true;
			});
		});
	});
});
