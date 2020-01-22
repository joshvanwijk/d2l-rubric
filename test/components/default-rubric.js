/* global suite, test, fixture, expect, suiteSetup, suiteTeardown, sinon */

'use strict';

suite('Preview Mode', function() {

	var element, table, firstRow;
	setup(function() {
		element = fixture('default-rubric');
		element.href = '/rubrics/default-rubric';
		/* global waitForLastSirenChangeEvent */
		return waitForLastSirenChangeEvent(element, 'd2l-siren-entity-changed', 'Criterion 3').then(function() {
			table = element.$$('d2l-rubric-criteria-groups').$$('d2l-rubric-criteria-group').$$('d2l-table');
			firstRow = table.querySelector('d2l-tbody').querySelector('d2l-tr');
		});

	});
	suite('smoke test', function() {

		test('can be instantiated', function() {
			expect(element.is).to.equal('d2l-rubric');
		});

		test('can show content', function() {
			expect(element._showContent).to.be.true;
		});

		test.skip('has no assessment', function() {
			expect(element.assessmentHref).to.be.undefined;
			expect(element.assessmentEntity).to.be.null;
			expect(element._score).to.be.null;
		});
	});

	suite('do not show content until entity loaded', function() {
		var new_element;
		suiteSetup(function() {
			new_element = fixture('default-rubric');
		});

		test('do not show content without href', function() {
			expect(new_element._showContent).to.be.false;
		});

		test('check for spinner on page', function() {
			var loaderElement = element.$$('d2l-rubric-loading');
			expect(loaderElement).to.exist;
		});
	});

	test('No Add Feedback Button Available', function() {
		var feedback_button = firstRow.querySelector('d2l-td').querySelector('d2l-button-subtle');
		expect(feedback_button.hidden).to.be.true;
	});

	test('cant edit scores', function() {
		var styles = getComputedStyle(firstRow.querySelector('d2l-td.out-of'));
		expect(styles.pointerEvents).to.equal('none');
	});

	test('Overall Score section is rendered', function() {
		var overallScoreElement = element.$$('d2l-rubric-overall-score');
		var scrollWrapperElement = overallScoreElement.$$('d2l-scroll-wrapper');
		expect(!!scrollWrapperElement.querySelector('.overall-levels')).to.be.true;
	});

});
