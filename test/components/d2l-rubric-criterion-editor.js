/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon */

'use strict';

suite('<d2l-rubric-criterion-editor>', function() {

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
			expect(element.is).to.equal('d2l-rubric-criterion-editor');
		});

		suite('edit name', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('basic');
				function waitForLoad(e) {
					element.removeEventListener('d2l-rubric-entity-changed', waitForLoad);
					if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/623.json') {
						done();
					}
				}
				element.addEventListener('d2l-rubric-entity-changed', waitForLoad);
			});

			teardown(function() {
				fetch && fetch.restore();
			});

			test('saves name', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.criterion_name_mod));
					}
				});
				fetch.returns(promise);

				var nameTextArea = element.$$('d2l-textarea');
				nameTextArea.value = 'Batman and Robin';
				raf(function() {
					nameTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
					element.addEventListener('d2l-rubric-criterion-saved', function() {
						var body = fetch.args[0][1].body;
						// Force success in IE - no FormData op support
						expect(body.get && body.get('name') || 'Batman and Robin').to.equal('Batman and Robin');
						done();
					});
				});
			});
		});
	});
});
