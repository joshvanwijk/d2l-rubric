import '@polymer/polymer/polymer-legacy.js';
import './localize-behavior.js';
import './assessment-result-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import 'd2l-inputs/d2l-input-textarea.js';
import './siren-entity.js';
import '@polymer/iron-media-query/iron-media-query.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-tooltip/d2l-tooltip.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-feedback">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
			.feedback-arrow,
			.feedback-arrow-focused {
				margin-top: calc(-0.5rem - 25px);
				width: 0;
				height: 0;
				border: 12px solid transparent;
				position: absolute;
				-moz-box-sizing: border-box;
				transition-property: border-color;
				transition-timing-function: ease;
				transition: border-color 0.5s;
			}
			.feedback-arrow {
				border-bottom-color: var(--d2l-table-border-color);
			}
			.feedback-arrow[data-mobile] {
				display: none;
			}
			.feedback-arrow-focused {
				border-bottom-color: var(--d2l-color-celestine);
			}
			.feedback-arrow-inner,
			.feedback-arrow-inner-focused
			 {
				position: relative;
				left: -12px;
				width: 0;
				height: 0;
				border-left: 12px solid transparent;
				border-right: 12px solid transparent;
				border-bottom: 12px solid white;
				z-index: 1;
				-moz-box-sizing: border-box;
			}
			.feedback-arrow-inner {
				top: 2px;
			}
			.feedback-arrow-inner-focused {
				top: 3px;
			}
			.clear-feedback-button {
				margin-top: -1px;
				margin-left: auto;
				border-radius: 5px;
				padding: 5px;
				border: solid transparent 1px;
			}
			.clear-feedback-button:hover {
				border-color: darkgray;
			}
			.feedback-wrapper[data-desktop] {
				padding: 0.5rem;
				padding-left: 1rem;
				padding-bottom: calc(0.5rem - 1px);
			}
			.feedback-wrapper-editable:hover {
				background: var(--d2l-color-sylvite);
				background-color: var(--d2l-color-sylvite);
				cursor: pointer;
			}
			.feedback-wrapper-editable:hover .feedback-arrow-inner {
				border-bottom: 12px solid var(--d2l-color-sylvite);
			}
			.feedback-wrapper-focused {
				cursor: text;
				padding: calc(0.5rem - 1px);
				padding-left: calc(1rem - 1px);
			}
			.feedback-heading {
				@apply --d2l-label-text;
				margin-top: -1px;
				color: var(--d2l-color-galena);
				padding-top: 0.6rem;
			}
			.feedback-text {
				@apply --d2l-body-compact-text;
				margin: 0.5rem 0;
			}
			.feedback-container[data-mobile] {
				margin-top: 24px;
				margin-bottom: 18px;
				border: 1px solid var(--d2l-color-mica);
				border-radius: 8px;
				padding: 18px;
				padding-bottom: 24px;
			}
			.feedback-header-wrapper {
				display: flex;
			}

		</style>
		<iron-media-query query="(min-width: 615px)" query-matches="{{_largeScreen}}"></iron-media-query>
		<siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></siren-entity>
		<siren-entity href="[[criterionHref]]" token="[[token]]" entity="{{criterionEntity}}"></siren-entity>
		<div class="feedback-wrapper" data-desktop$="[[_largeScreen]]">
			<div class="feedback-arrow" data-mobile$="[[!_largeScreen]]">
				<div class="feedback-arrow-inner"></div>
			</div>
			<div hidden="[[!_canEditFeedback(criterionEntity, assessmentResult)]]">
				<div class="feedback-header-wrapper">
					<div class="feedback-heading">
						[[localize('criterionFeedback')]]
					</div>
					<d2l-icon id="clear-feedback" class="clear-feedback-button" tabindex="0" icon="d2l-tier1:close-small" on-tap="_clearFeedback"></d2l-icon>
					<d2l-tooltip for="clear-feedback" position="bottom">[[localize('clearFeedback')]]</d2l-tooltip>
				</div>
				<d2l-input-textarea no-border no-padding id="text-area" value="[[getAssessmentFeedbackText(criterionEntity, assessmentResult)]]">
				</d2l-input-textarea>
			</div>
			<div hidden="[[_hasReadonlyFeedback(criterionEntity, assessmentResult)]]">
				<div class="feedback-container" data-mobile$="[[!_largeScreen]]">
					<div class="feedback-heading">[[localize('criterionFeedback')]]</div>
					<div class="feedback-text">
						<s-html html="[[getAssessmentFeedbackHtml(criterionEntity, assessmentResult)]]"></s-html>
					</div>
				</div>
			</div>
		</div>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-feedback',

	properties: {
		criterionHref: String,
		criterionEntity: Object,
		assessmentHref: {
			type: String,
			value: null
		},
		token: String,
		_boundBlurHandler: {
			type: Function,
			value: function() {
				return this._blurHandler.bind(this);
			}
		},
		addingFeedback: {
			type: Boolean,
			value: false
		},
		_feedbackInFocus: {
			type: Boolean,
			value: false
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentResultBehavior
	],

	attached: function() {
		var elem = dom(this.root).querySelector('d2l-input-textarea');
		if (!elem) {
			return;
		}
		elem.addEventListener('blur', this._boundBlurHandler);
	},

	detached: function() {
		var elem = dom(this.root).querySelector('d2l-input-textarea');
		if (!elem) return;
		elem.removeEventListener('blur', this._boundBlurHandler);
	},

	focus: function() {
		var elem = dom(this.root).querySelector('d2l-input-textarea');
		elem.focus();
		this._feedbackInFocus = true;
		this.addFocusStylingToFeedbackWrapper();
	},

	_blurHandler: function(event) {
		var feedback = event.target.$.textarea.value;
		this.saveFeedback(feedback);
		this._feedbackInFocus = false;
		this.removeFocusStylingFromFeedbackWrapper();
	},

	addFocusStylingToFeedbackWrapper: function() {
		var feedbackWrapper = dom(this.root).querySelector('.feedback-wrapper');
		if (feedbackWrapper === null) {
			feedbackWrapper = dom(this.root).querySelector('.feedback-wrapper-focused');
		}
		var feedbackArrow = dom(this.root).querySelector('.feedback-arrow');
		var feedbackArrowInner = dom(this.root).querySelector('.feedback-arrow-inner');
		feedbackWrapper.classList.add('feedback-wrapper-focused');
		feedbackWrapper.classList.remove('feedback-wrapper');
		feedbackArrow.classList.add('feedback-arrow-focused');
		feedbackArrowInner.classList.add('feedback-arrow-inner-focused');
	},

	removeFocusStylingFromFeedbackWrapper: function() {
		if (!this._feedbackInFocus) {
			var feedbackWrapper = dom(this.root).querySelector('.feedback-wrapper-focused');
			if (feedbackWrapper === null) {
				feedbackWrapper = dom(this.root).querySelector('.feedback-wrapper');
			}
			var feedbackArrow = dom(this.root).querySelector('.feedback-arrow');
			var feedbackArrowInner = dom(this.root).querySelector('.feedback-arrow-inner');
			feedbackWrapper.classList.add('feedback-wrapper');
			feedbackWrapper.classList.remove('feedback-wrapper-focused');
			feedbackArrow.classList.remove('feedback-arrow-focused');
			feedbackArrowInner.classList.remove('feedback-arrow-inner-focused');
		}
	},

	saveFeedback: function(feedback) {
		this.saveAssessmentFeedback(this.criterionHref, feedback);
	},

	_clearFeedback: function() {
		this.saveFeedback('');
		this.fire('close-feedback');
	},

	_canEditFeedback: function(criterionEntity, assessmentEntity) {
		if (this.readOnly || !criterionEntity || !assessmentEntity) {
			return false;
		}
		return this.canAddFeedback(criterionEntity);
	},

	_hasReadonlyFeedback: function(criterionEntity, assessmentEntity) {
		return this._canEditFeedback(criterionEntity, assessmentEntity) || this.addingFeedback;
	},

	getAssessmentFeedbackHtml: function(criterionEntity, assessmentResult) {
		return this.getAssessmentFeedback(criterionEntity, assessmentResult, true);
	},

	getAssessmentFeedbackText: function(criterionEntity, assessmentResult) {
		return this.getAssessmentFeedback(criterionEntity, assessmentResult, false);
	}
});
