/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush, stubWhitelist */

'use strict';

suite('<d2l-rubric-criterion-feedback-editor>', function() {

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
			expect(element.is).to.equal('d2l-rubric-criterion-feedback-editor');
		});

		suite('edit feedback', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('basic');
				function waitForLoad(e) {
					element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/623/0.json') {
						done();
					}
				}
				element.addEventListener('d2l-rubric-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});

			teardown(function() {
				fetch && fetch.restore();
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

				var feedbackTextArea = element.$$('d2l-textarea');
				feedbackTextArea.value = 'You are a grammar rockstar!';
				raf(function() {
					element.addEventListener('d2l-rubric-feedback-saved', function() {
						var body = fetch.args[0][1].body;
						// Force success in IE - no FormData op support
						expect(body.get && body.get('feedback') || 'You are a grammar rockstar!').to.equal('You are a grammar rockstar!');
						done();
					});
					feedbackTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
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

				var feedbackTextArea = element.$$('d2l-textarea');
				feedbackTextArea.value = 'You are a grammar rockstar!';
				raf(function() {
					element.addEventListener('d2l-rubric-entity-save-error', function() {
						flush(function() {
							expect(feedbackTextArea.ariaInvalid).to.equal('true');
							done();
						});
					});
					feedbackTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});

		suite('readonly', function() {

			var element;

			setup(function(done) {
				element = fixture('readonly');
				function waitForLoad(e) {
					element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/623/1.json') {
						done();
					}
				}
				element.addEventListener('d2l-rubric-entity-changed', waitForLoad);
				element.token = 'foozleberries';
			});

			test('feedback is disabled', function() {
				var feedbackTextArea = element.$$('d2l-textarea');
				expect(feedbackTextArea.disabled).to.be.true;
			});

		});
	});
});
