/* global suite, test, fixture, expect, setup, teardown, suiteSetup, suiteTeardown, sinon */

'use strict';

suite('<d2l-rubric-criteria-group-editor>', function() {

	var sandbox;
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

		test('can be instantiated', function(done) {
			var element = fixture('basic');
			/* global getLoadedElement */
			element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176.json', done);
			expect(element.is).to.equal('d2l-rubric-criteria-group-editor');
		});

		suite('edit group name', function() {

			var element;
			var fetch;

			setup(function(done) {
				element = fixture('basic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176.json', done);
			});

			teardown(function() {
				fetch && fetch.restore();
				window.D2L.Siren.EntityStore.clear();
			});

			test('group name editor enabled with action', function(done) {
				expect(element.$$('#group-name').disabled).to.be.false;
				done();
			});

			test('saves group name', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: true,
					json: function() {
						return Promise.resolve(JSON.stringify(window.testFixtures.group_name_mod));
					}
				});
				fetch.returns(promise);

				var nameTextInput = element.$$('#group-name');
				nameTextInput.value = 'New Group Name';
				element.addEventListener('d2l-rubric-group-name-saved', function() {
					expect(nameTextInput.value).to.equal('New Group Name');
					done();
				});
				nameTextInput.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
			});

			test('generates error if saving fails', function(done) {
				fetch = sinon.stub(window.d2lfetch, 'fetch');
				var promise = Promise.resolve({
					ok: false,
					json: function() {
						return Promise.resolve(JSON.stringify(
							{'class':['error'], 'properties':{'status':'BadRequest', 'code':400, 'type':'https://rubrics.api.brightspace.com/rels/errors/invalid-number-points-error', 'title':'InvalidNumberPointsError', 'detail':'Point value must be a valid number'}}
						));
					}
				});
				fetch.returns(promise);
				element.addEventListener('d2l-siren-entity-save-error', function() {
					done();
				});
				element.$$('#group-name').dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: false, composed: true }));
			});
		});

		suite('readonly', function() {
			var element;

			setup(function(done) {
				element = fixture('readonly');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176-readonly.json', done);
			});

			test('group name is disabled', function() {
				expect(element.$$('#group-name').disabled).to.be.true;
			});
		});

		suite('holistic', function() {
			var element;

			setup(function(done) {
				element = fixture('holistic');
				element = getLoadedElement(element, 'static-data/rubrics/organizations/text-only/199/groups/176.json', done);
			});

			test('group name is hidden', function() {
				var groupName = element.$$('#group-name');
				expect(isVisible(groupName)).to.be.false;
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
		test('d2l-rubric-criteria-group-editor ally checks', function() {
			return ally_tests();
		});
	});
});
