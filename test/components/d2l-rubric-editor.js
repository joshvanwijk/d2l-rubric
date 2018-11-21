/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush */

'use strict';

suite('<d2l-rubric-editor>', function() {

	var sandbox;
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {

		test('can be instantiated', function() {
			var element = fixture('basic');
			expect(element.is).to.equal('d2l-rubric-editor');
		});

		suite('edit name', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('basic');
				function waitForLoad(e) {
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199.json') {
						element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
						done();
					}
				}
				element.addEventListener('d2l-siren-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('saves name', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.rubric_name_mod));
					}
				});
				fetch.returns(promise);

				var nameTextInput = element.$$('#rubric-name-input');
				nameTextInput.value = 'Superman Rubric';
				raf(function() {
					element.addEventListener('d2l-rubric-name-saved', function() {
						var body = fetch.args[0][1].body;
						// Force success in IE - no FormData op support
						expect(body && body.get && body.get('name') || 'Superman Rubric').to.equal('Superman Rubric');
						done();
					});
					nameTextInput.value = 'Superman Rubric';
					nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if saving name fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({
							'class': ['error'], 'properties': { 'status': 'BadRequest', 'code': 400, 'type': 'https://rubrics.api.brightspace.com/rels/errors/invalid-name-error', 'title': 'InvalidNameError', 'detail': 'Name must be valid' }
						}));
					}
				});
				fetch.returns(promise);

				var nameTextInput = element.$$('#rubric-name-input');
				nameTextInput.value = 'Superman Rubric';
				raf(function() {
					element.addEventListener('d2l-siren-entity-save-error', function() {
						flush(function() {
							// don't test in IE
							if (!isIE) {
								expect(nameTextInput.ariaInvalid).to.equal('true');
							}
							done();
						});
					});
					nameTextInput.value = 'Superman Rubric';
					nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if name is empty', function(done) {
				var nameTextInput = element.$$('#rubric-name-input');
				nameTextInput.value = '';
				raf(function() {
					flush(function() {
						// don't test in IE
						if (!isIE) {
							expect(nameTextInput.ariaInvalid).to.equal('true');
						}
						done();
					});
					nameTextInput.value = '';
					nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});

		suite('readonly', function() {
			var element;

			setup(function(done) {
				element = fixture('readonly');
				function waitForLoad(e) {
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/200.json') {
						element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
						done();
					}
				}
				element.addEventListener('d2l-siren-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});

			test('name is disabled', function() {
				var nameTextInput = element.$$('#rubric-name-input');
				expect(nameTextInput.disabled).to.be.true;
			});
		});
	});

	suite('Ally Test', function() {
		/* eslint no-invalid-this:0 */
		/* global isAttestInstalled */
		/* global ally_tests */
		suiteSetup(function() {
			if (!isAttestInstalled()) {
				this.skip();
			}
		});
		test('d2l-rubric-editor ally checks', function() {
			ally_tests();
		});
	});
});
