/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush*/

'use strict';

suite('<d2l-rubric-visibility-editor>', function() {

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
			expect(element.is).to.equal('d2l-rubric-visibility-editor');
		});

		suite('render', function() {
			var fetch;
			var element;

			setup(function(done) {
				element = fixture('basic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('populates fields from action', function() {
				var checkedRadio = element.$$('#VisibleOnceFeedbackPosted');
				expect(checkedRadio.checked).to.be.true;
			});
		});

		suite('change rubric visibility', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('basic');
				/* global getLoadedElement */
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('saves visibility change', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.rubric_visibility_mod));
					}
				});
				fetch.returns(promise);

				expect(element.$$('#VisibleOnceFeedbackPosted').checked).to.be.true;
				raf(function() {
					element.addEventListener('d2l-rubric-visibility-saved', function() {
						expect(element.$$('#VisibleOnceFeedbackPosted').checked).to.be.false;
						expect(element.$$('#AlwaysVisible').checked).to.be.true;
						done();
					});
					element.$$('#AlwaysVisible').click();
				});
			});

			test('sets aria-invalid if visibility fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({}));
					}
				});
				fetch.returns(promise);

				raf(function() {
					element.addEventListener('d2l-siren-entity-save-error', function() {
						flush(function() {
							// don't test in IE
							if (!isIE) {
								expect(element.getAttribute('aria-invalid')).to.equal('true');
							}
							done();
						});
					});
					element.$$('#AlwaysVisible').click();
				});
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
		test('d2l-rubric-visibility-editor ally checks', function() {
			ally_tests();
		});
	});
});
