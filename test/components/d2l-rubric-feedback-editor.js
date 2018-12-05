/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush */

'use strict';

suite('<d2l-rubric-feedback-editor>', function() {

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
		suite('criterion feedback', function() {
			test('can be instantiated', function() {
				var element = fixture('basic-criterion');
				expect(element.is).to.equal('d2l-rubric-feedback-editor');
			});

			suite('edit feedback', function() {

				var fetch;
				var raf = window.requestAnimationFrame;
				var element;

				setup(function(done) {
					element = fixture('basic-criterion');
					function waitForLoad(e) {
						if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/623/0.json') {
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

				test('saves feedback', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: true,
						json: function() {
							return Promise.resolve(JSON.stringify(window.testFixtures.criterion_cell_feedback_mod));
						}
					});
					fetch.returns(promise);

					var feedbackTextArea = element.$$('d2l-rubric-text-editor');
					feedbackTextArea.value = 'You are a grammar rockstar!';
					raf(function() {
						element.addEventListener('d2l-rubric-feedback-saved', function() {
							var body = fetch.args[0][1].body;
							// Force success in IE - no FormData op support
							expect(body.get && body.get('feedback') || 'You are a grammar rockstar!').to.equal('You are a grammar rockstar!');
							done();
						});
						feedbackTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true, detail: {value: feedbackTextArea.value} }));
					});
				});

				test('sets aria-invalid if saving feedback fails', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: false,
						json: function() {
							return Promise.resolve(JSON.stringify({}));
						}
					});
					fetch.returns(promise);

					var feedbackTextArea = element.$$('d2l-rubric-text-editor');
					feedbackTextArea.value = 'You are a grammar rockstar!';
					raf(function() {
						element.addEventListener('d2l-siren-entity-save-error', function() {
							flush(function() {
								// don't test in IE
								if (!isIE) {
									expect(feedbackTextArea.ariaInvalid).to.equal('true');
								}
								done();
							});
						});
						feedbackTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true, detail: {value: feedbackTextArea.value} }));
					});
				});
			});

			suite('readonly', function() {

				var element;

				setup(function(done) {
					element = fixture('readonly-criterion');
					function waitForLoad(e) {
						if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/623/1.json') {
							element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
							done();
						}
					}
					element.addEventListener('d2l-siren-entity-changed', waitForLoad);
					element.token = 'foozleberries';
				});

				test('feedback is disabled', function() {
					var feedbackTextArea = element.$$('d2l-rubric-text-editor');
					expect(feedbackTextArea.disabled).to.be.true;
				});

			});
		});
	});
});
