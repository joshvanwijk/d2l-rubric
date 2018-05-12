/* global suite, test, fixture, expect, teardown, suiteSetup, suiteTeardown, sinon */

'use strict';

suite('<d2l-rubric-criterion-editor>', function() {

	var element, sandbox;

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
		element = fixture('basic');
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {

		test('can be instantiated', function() {
			expect(element.is).to.equal('d2l-rubric-criterion-editor');
		});

		suite('edit name', function() {

			var fetch;
			var raf = window.requestAnimationFrame;

			teardown(function() {
				fetch && fetch.restore();
			});

			// setup(function() {
			// 	fetch = sinon.stub(window.d2lfetch, 'fetch');
			// 	var promise = Promise.resolve({
			// 		ok: true,
			// 		json: function() {
			// 			return Promise.resolve(JSON.stringify(window.testFixtures.assignmentHomeCanCreate));
			// 		}
			// 	});
			// 	window.d2lfetch.fetch.returns(promise);
			// });

			test.only('saves name', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(element.entity));
					}
				});
				fetch.returns(promise);

				raf(function() {
					var nameTextArea = element.$$('d2l-textarea');
					nameTextArea.value = 'Batman and Robin';
					nameTextArea.textarea.dispatchEvent(new Event('change', { bubbles: true, cancelable: false, composed: false }));
					element.addEventListener('d2l-rubric-criterion-saved', function() {
						var body = fetch.args[0][1].body;
						expect(body.get('name')).to.equal('Batman and Robin');
						done();
					});
				});
			});
		});
	});
});
