/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon, flush*/

'use strict';

suite('<d2l-rubric-alignment-editor>', function() {

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
			expect(element.is).to.equal('d2l-rubric-alignment-editor');
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
				var checkedRadio = element.$$('#AutomaticAlignment');
				expect(checkedRadio.checked).to.be.true;
			});
		});

		suite('change rubric alignment', function() {

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

			test('saves alignment change', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify({
							alignment: true
						}));
					}
				});
				fetch.returns(promise);

				expect(element.$$('#AutomaticAlignment').checked).to.be.true;
				raf(function() {
					element.addEventListener('d2l-rubric-alignment-saved', function() {
						expect(element.$$('#AutomaticAlignment').checked).to.be.false;
						expect(element.$$('#ManualAlignment').checked).to.be.true;
						done();
					});
					element.$$('#ManualAlignment').click();
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
					element.$$('#ManualAlignment').click();
				});
			});

		});
	});
});
