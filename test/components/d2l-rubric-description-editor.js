/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush */

'use strict';

suite('<d2l-rubric-description-editor>', function() {

	var sandbox;

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {
		suite('criterion description', function() {
			test('can be instantiated', function() {
				var element = fixture('basic-criterion');
				expect(element.is).to.equal('d2l-rubric-description-editor');
			});

			suite('edit description', function() {

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
				});

				test('saves description', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: true,
						json: function() {
							return Promise.resolve(JSON.stringify(window.testFixtures.criterion_cell_description_mod));
						}
					});
					fetch.returns(promise);

					var descriptionTextArea = element.$$('d2l-textarea');
					descriptionTextArea.value = 'Batman and Robin';
					raf(function() {
						element.addEventListener('d2l-rubric-description-saved', function() {
							var body = fetch.args[0][1].body;
							// Force success in IE - no FormData op support
							expect(body.get && body.get('description') || 'Batman and Robin').to.equal('Batman and Robin');
							done();
						});
						descriptionTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
					});
				});

				test('sets aria-invalid if saving description fails', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: false,
						json: function() {
							return Promise.resolve(JSON.stringify({}));
						}
					});
					fetch.returns(promise);

					var descriptionTextArea = element.$$('d2l-textarea');
					descriptionTextArea.value = 'Batman and Robin';
					raf(function() {
						element.addEventListener('d2l-siren-entity-save-error', function() {
							flush(function() {
								expect(descriptionTextArea.ariaInvalid).to.equal('true');
								done();
							});
						});
						descriptionTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
					});
				});
			});

			suite('readonly description', function() {

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

				test('description is disabled', function() {
					var descriptionTextArea = element.$$('d2l-textarea');
					expect(descriptionTextArea.disabled).to.be.true;
				});

			});

			suite('edit points', function() {

				var fetch;
				var raf = window.requestAnimationFrame;
				var element;

				setup(function(done) {
					element = fixture('basic-custom-points');
					function waitForLoad(e) {
						if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/0.json') {
							element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
							done();
						}
					}
					element.addEventListener('d2l-siren-entity-changed', waitForLoad);
					element.token = 'foozleberries';
				});

				teardown(function() {
					fetch && fetch.restore();
				});

				test('saves points', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: true,
						json: function() {
							return Promise.resolve(JSON.stringify(window.testFixtures.criterion_cell_points_mod));
						}
					});
					fetch.returns(promise);

					var pointsTextInput = element.$$('#cell-points');
					pointsTextInput.value = '10';
					raf(function() {
						element.addEventListener('d2l-rubric-criterion-cell-points-saved', function() {
							var body = fetch.args[0][1].body;
							// Force success in IE - no FormData op support
							expect(body.get && body.get('points') || '10').to.equal('10');
							done();
						});
						pointsTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
					});
				});

				test('sets aria-invalid if saving points fails', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: false,
						json: function() {
							return Promise.resolve(JSON.stringify({}));
						}
					});
					fetch.returns(promise);

					var pointsTextInput = element.$$('d2l-text-input');
					pointsTextInput.value = '10';
					raf(function() {
						element.addEventListener('d2l-siren-entity-save-error', function() {
							flush(function() {
								expect(pointsTextInput.ariaInvalid).to.equal('true');
								done();
							});
						});
						pointsTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
					});
				});
			});

			suite('readonly points', function() {

				var element;

				setup(function(done) {
					element = fixture('readonly-custom-points');
					function waitForLoad(e) {
						if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/1.json') {
							element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
							done();
						}
					}
					element.addEventListener('d2l-siren-entity-changed', waitForLoad);
					element.token = 'foozleberries';
				});

				test('points field is disabled', function() {
					var pointsTextInput = element.$$('d2l-text-input');
					expect(pointsTextInput.disabled).to.be.true;
				});

			});
		});

		suite('overall level description', function() {
			test('can be instantiated', function() {
				var element = fixture('basic-overall-level');
				expect(element.is).to.equal('d2l-rubric-description-editor');
			});

			suite('edit description', function() {

				var fetch;
				var raf = window.requestAnimationFrame;
				var element;

				setup(function(done) {
					element = fixture('basic-overall-level');
					function waitForLoad(e) {
						if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/overall-levels/1.json') {
							element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
							done();
						}
					}
					element.addEventListener('d2l-siren-entity-changed', waitForLoad);
					element.token = 'foozleberries';
				});

				teardown(function() {
					fetch && fetch.restore();
				});

				test('saves description', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: true,
						json: function() {
							return Promise.resolve(JSON.stringify(window.testFixtures.overall_level_description_mod));
						}
					});
					fetch.returns(promise);

					var descriptionTextArea = element.$$('d2l-textarea');
					descriptionTextArea.value = 'Batman and Robin';
					raf(function() {
						element.addEventListener('d2l-rubric-description-saved', function() {
							var body = fetch.args[0][1].body;
							// Force success in IE - no FormData op support
							expect(body.get && body.get('description') || 'Batman and Robin').to.equal('Batman and Robin');
							done();
						});
						descriptionTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
					});
				});

				test('sets aria-invalid if saving description fails', function(done) {
					fetch = sinon.stub(window.d2lfetch, 'fetch');
					var promise = Promise.resolve({
						ok: false,
						json: function() {
							return Promise.resolve(JSON.stringify({}));
						}
					});
					fetch.returns(promise);

					var descriptionTextArea = element.$$('d2l-textarea');
					descriptionTextArea.value = 'Batman and Robin';
					raf(function() {
						element.addEventListener('d2l-siren-entity-save-error', function() {
							flush(function() {
								expect(descriptionTextArea.ariaInvalid).to.equal('true');
								done();
							});
						});
						descriptionTextArea.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
					});
				});
			});

			suite('readonly', function() {

				var element;

				setup(function(done) {
					element = fixture('readonly-overall-level');
					function waitForLoad(e) {
						if (e.detail.entity.getLinkByRel('self').href === 'static-data/rubrics/organizations/text-only/199/overall-levels/2.json') {
							element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
							done();
						}
					}
					element.addEventListener('d2l-siren-entity-changed', waitForLoad);
					element.token = 'foozleberries';
				});

				test('description is disabled', function() {
					var descriptionTextArea = element.$$('d2l-textarea');
					expect(descriptionTextArea.disabled).to.be.true;
				});

			});
		});
	});
});
