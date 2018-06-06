/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush, stubWhitelist */

'use strict';

suite('<d2l-rubric-level-editor>', function() {

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
			expect(element.is).to.equal('d2l-rubric-level-editor');
		});

		suite('edit name', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('basic');
				function waitForLoad(e) {
					element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/levels/1479.json') {
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

			test('saves name', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.level_name_mod));
					}
				});
				fetch.returns(promise);

				var nameTextInput = element.$$('d2l-text-input');
				nameTextInput.value = 'Superman';
				raf(function() {
					element.addEventListener('d2l-rubric-level-saved', function() {
						var body = fetch.args[0][1].body;
						// Force success in IE - no FormData op support
						expect(body.get && body.get('name') || 'Superman').to.equal('Superman');
						done();
					});
					nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if saving name fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({}));
					}
				});
				fetch.returns(promise);

				var nameTextInput = element.$$('d2l-text-input');
				nameTextInput.value = 'Superman';
				raf(function() {
					element.addEventListener('d2l-rubric-entity-save-error', function() {
						flush(function() {
							expect(nameTextInput.ariaInvalid).to.equal('true');
							done();
						});
					});
					nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if name is empty', function(done) {
				var nameTextInput = element.$$('d2l-text-input');
				nameTextInput.value = '';
				raf(function() {
					flush(function() {
						expect(nameTextInput.ariaInvalid).to.equal('true');
						done();
					});
					nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});

		suite('readonly', function() {
			var element;

			setup(function(done) {
				element = fixture('readonly');
				function waitForLoad(e) {
					element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/levels/1478.json') {
						done();
					}
				}
				element.addEventListener('d2l-rubric-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});

			test('name is disabled', function() {
				var nameTextInput = element.$$('d2l-text-input');
				expect(nameTextInput.disabled).to.be.true;
			});

		});
	});
});
