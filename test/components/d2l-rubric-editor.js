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
				/* global getLoadedElement */
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199.json', done);
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

				var nameTextInput = element.$$('#rubric-name').$.input;
				nameTextInput.value = 'Superman Rubric';
				raf(function() {
					element.addEventListener('d2l-rubric-name-saved', function() {
						var body = fetch.args[0][1].body;
						// Force success in IE - no FormData op support
						expect(body && body.get && body.get('name') || 'Superman Rubric').to.equal('Superman Rubric');
						done();
					});
					nameTextInput.value = 'Superman Rubric';
					nameTextInput.dispatchEvent(new CustomEvent('focus', { bubbles: true, cancelable: false, composed: true }));
					nameTextInput.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: false, composed: true }));
					nameTextInput.dispatchEvent(new CustomEvent('blur', { bubbles: true, cancelable: false, composed: true }));
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

				var nameTextInput = element.$$('#rubric-name').$.input;
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
					nameTextInput.dispatchEvent(new CustomEvent('focus', { bubbles: true, cancelable: false, composed: true }));
					nameTextInput.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: false, composed: true }));
					nameTextInput.dispatchEvent(new CustomEvent('blur', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if name is empty', function(done) {
				var nameTextInput = element.$$('#rubric-name').$.input;
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
					nameTextInput.dispatchEvent(new CustomEvent('focus', { bubbles: true, cancelable: false, composed: true }));
					nameTextInput.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: false, composed: true }));
					nameTextInput.dispatchEvent(new CustomEvent('blur', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});

		suite('edit description', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('basic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('saves description', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.rubric_description_mod));
					}
				});
				fetch.returns(promise);

				var descriptionTextEditor = element.$$('#rubric-description');
				descriptionTextEditor.value = 'Batman and Robin';
				raf(function() {
					element.addEventListener('d2l-rubric-description-saved', function() {
						var body = fetch.args[0][1].body;
						// Force success in IE - no FormData op support
						expect(body && body.get && body.get('description') || 'Batman and Robin').to.equal('Batman and Robin');
						done();
					});
					descriptionTextEditor.dispatchEvent(new CustomEvent(
						'text-changed',
						{
							bubbles: true,
							cancelable: false,
							composed: true,
							detail: { value: 'Batman and Robin' }
						}));
				});
			});

			test('sets aria-invalid if saving description fails', function(done) {
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

				var descriptionTextEditor = element.$$('#rubric-description');
				descriptionTextEditor.value = 'Batman and Robin';
				raf(function() {
					element.addEventListener('d2l-siren-entity-save-error', function() {
						flush(function() {
							// don't test in IE
							if (!isIE) {
								expect(descriptionTextEditor.ariaInvalid).to.equal('true');
							}
							done();
						});
					});
					descriptionTextEditor.dispatchEvent(new CustomEvent(
						'text-changed',
						{
							bubbles: true,
							cancelable: false,
							composed: true,
							detail: { value: 'Batman and Robin' }
						}));
				});
			});
		});

		suite('set score visibility', function() {

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

			test('saves visibility change', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.rubric_score_vis_mod));
					}
				});
				fetch.returns(promise);

				var hideScoreCheckbox = element.$$('#hide-score-checkbox');
				expect(hideScoreCheckbox.checked).to.be.false;
				raf(function() {
					element.addEventListener('d2l-rubric-score-visibility-set', function() {
						expect(hideScoreCheckbox.checked).to.be.true;
						done();
					});
					expect(hideScoreCheckbox.disabled).to.be.false;
					hideScoreCheckbox.checked = true;
					hideScoreCheckbox.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if saving score visibility change fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({}));
					}
				});
				fetch.returns(promise);

				var hideScoreCheckbox = element.$$('#hide-score-checkbox');
				raf(function() {
					element.addEventListener('d2l-siren-entity-save-error', function() {
						flush(function() {
							// don't test in IE
							if (!isIE) {
								expect(hideScoreCheckbox.ariaInvalid).to.equal('true');
							}
							done();
						});
					});
					hideScoreCheckbox.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});

		suite('set association', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('basic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('saves association change', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.rubric_association_mod));
					}
				});
				fetch.returns(promise);

				raf(function() {
					element.addEventListener('d2l-rubric-associations-saved', function() {
						expect(associationCheckbox.checked).to.be.false;
						done();
					});
					var associationCheckbox = element.$$('.association');
					expect(associationCheckbox.checked).to.be.true;
					associationCheckbox.checked = false;
					associationCheckbox.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if saving association change fails', function(done) {
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
								expect(associationFieldDiv.getAttribute('aria-invalid')).to.equal('true');
							}
							done();
						});
					});
					var associationCheckbox = element.$$('.association');
					var associationFieldDiv = element.$$('#associations div');
					associationCheckbox.checked = false;
					associationCheckbox.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});

		suite('readonly', function() {
			var element;

			setup(function(done) {
				element = fixture('readonly');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/200.json', done);
			});

			test('name is disabled', function() {
				var nameTextInput = element.$$('#rubric-name').$.input;
				expect(nameTextInput.disabled).to.be.true;
			});

			test('description is disabled', function() {
				var descriptionTextEditor = element.$$('#rubric-description');
				expect(descriptionTextEditor.disabled).to.be.true;
			});

			test('associations are disabled', function() {
				flush(function() {
					var association = element.$$('.association');
					expect(association.disabled).to.be.true;
				});
			});
		});
	});
});
