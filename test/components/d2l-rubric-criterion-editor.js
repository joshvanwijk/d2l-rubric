/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush */

'use strict';

suite('<d2l-rubric-criterion-editor>', function() {

	var sandbox;
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	var isVisible = function(elem) {
		var style = elem && getComputedStyle(elem);
		return style && style.visibility !== 'hidden' && style.display !== 'none' && !elem.hasAttribute('hidden');
	};

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
				/* global getLoadedElement */
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/623.json', done);
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
						return Promise.resolve(JSON.stringify(window.testFixtures.criterion_name_mod));
					}
				});
				fetch.returns(promise);

				var nameTextArea = element.$$('d2l-input-textarea');
				nameTextArea.value = 'Batman and Robin';
				raf(function() {
					element.addEventListener('d2l-rubric-criterion-saved', function() {
						var body = fetch.args[0][1].body;
						// Force success in IE - no FormData op support
						expect(body.get && body.get('name') || 'Batman and Robin').to.equal('Batman and Robin');
						done();
					});
					nameTextArea.dispatchEvent(new CustomEvent('focus', { bubbles: true, cancelable: false, composed: true }));
					nameTextArea.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: false, composed: true }));
					nameTextArea.dispatchEvent(new CustomEvent('blur', { bubbles: true, cancelable: false, composed: true }));
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

				var nameTextArea = element.$$('d2l-input-textarea');
				nameTextArea.value = 'Batman and Robin';
				raf(function() {
					element.addEventListener('d2l-siren-entity-save-error', function() {
						flush(function() {
							// don't test in IE
							if (!isIE) {
								expect(nameTextArea.ariaInvalid).to.equal('true');
							}
							done();
						});
					});
					nameTextArea.dispatchEvent(new CustomEvent('focus', { bubbles: true, cancelable: false, composed: true }));
					nameTextArea.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: false, composed: true }));
					nameTextArea.dispatchEvent(new CustomEvent('blur', { bubbles: true, cancelable: false, composed: true }));
				});
			});

			test('sets aria-invalid if name is empty', function(done) {
				var nameTextArea = element.$$('d2l-input-textarea');
				nameTextArea.value = '';
				raf(function() {
					flush(function() {
						// don't test in IE
						if (!isIE) {
							expect(nameTextArea.ariaInvalid).to.equal('true');
						}
						done();
					});
					nameTextArea.dispatchEvent(new CustomEvent('focus', { bubbles: true, cancelable: false, composed: true }));
					nameTextArea.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: false, composed: true }));
					nameTextArea.dispatchEvent(new CustomEvent('blur', { bubbles: true, cancelable: false, composed: true }));
				});
			});
		});

		suite('readonly', function() {

			var element;

			setup(function(done) {
				element = fixture('readonly');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/624.json', done);
			});

			teardown(function() {
				window.D2L.Siren.EntityStore.clear();
			});

			test('name is disabled', function() {
				var nameTextArea = element.$$('d2l-input-textarea');
				expect(nameTextArea.disabled).to.be.true;
			});

			test('remove is hidden', function() {
				var removeButton = element.$.remove;
				expect(isVisible(removeButton)).to.be.false;
			});
		});

		suite('delete criterion', function() {

			var fetch;
			var element;

			setup(function(done) {
				element = fixture('basic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176/criteria/623.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('remove is visible', function() {
				var removeButton = element.$.remove;
				expect(isVisible(removeButton)).to.be.true;
			});

			test('generates event if deleting fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({}));
					}
				});
				fetch.returns(promise);

				element.addEventListener('d2l-siren-entity-save-error', function() {
					done();
				});
				element.$$('#remove').click();
			});
		});

		suite('custom points', function() {

			var fetch;
			var raf = window.requestAnimationFrame;
			var element;

			setup(function(done) {
				element = fixture('custom');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('out-of value is editable', function() {
				element.async(function() {
					var outOfTextBox = element.$$('#out-of-textbox');
					expect(isVisible(outOfTextBox)).to.be.true;
				});
			});

			test('generates event if saving fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify({}));
					}
				});
				fetch.returns(promise);

				element.async(function() {
					var outOfTextArea = element.$$('#out-of-textbox').$.input;
					outOfTextArea.value = 'five';
					raf(function() {
						element.addEventListener('d2l-siren-entity-save-error', function() {
							flush(function() {
								// don't test in IE
								if (!isIE) {
									expect(outOfTextArea.ariaInvalid).to.equal('true');
								}
								done();
							});
						});
						outOfTextArea.dispatchEvent(new CustomEvent('focus', { bubbles: true, cancelable: false, composed: true }));
						outOfTextArea.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: false, composed: true }));
						outOfTextArea.dispatchEvent(new CustomEvent('blur', { bubbles: true, cancelable: false, composed: true }));
					});
				});
			});
		});

		suite('holistic', function() {

			var element;

			setup(function(done) {
				element = fixture('holistic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/holistic/199/groups/176/criteria/623.json', done);
			});

			teardown(function() {
				window.D2L.Siren.EntityStore.clear();
			});

			test('name is hidden', function() {
				var criterionNameDiv = element.$$('.criterion-name');
				expect(isVisible(criterionNameDiv)).to.be.false;
			});

			test('remove is hidden', function() {
				var removeButton = element.$.remove;
				expect(isVisible(removeButton)).to.be.false;
			});
		});
	});
});
