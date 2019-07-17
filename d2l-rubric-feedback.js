import '@polymer/polymer/polymer-legacy.js';
import './localize-behavior.js';
import './assessment-result-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import 'd2l-inputs/d2l-input-textarea.js';
import './rubric-siren-entity.js';
import '@polymer/iron-media-query/iron-media-query.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-button/d2l-button-subtle.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-feedback">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
			.feedback-arrow {
				margin-top: calc(-0.5rem - 25px);
				width: 0;
				height: 0;
				border: 12px solid transparent;
				position: absolute;
				transition-property: border-color;
				transition-timing-function: ease;
				transition: border-color 0.5s;
				border-bottom-color: var(--d2l-table-border-color);
			}
			.feedback-arrow[data-mobile] {
				display: none;
			}
			:host([_focus-styling]) .feedback-arrow {
				border-bottom-color: var(--d2l-color-celestine);
			}
			.feedback-arrow-inner {
				position: relative;
				top: 2px;
				left: -12px;
				width: 0;
				height: 0;
				border-left: 12px solid transparent;
				border-right: 12px solid transparent;
				border-bottom: 12px solid white;
				z-index: 1;
			}
			:host([_focus-styling]) .feedback-arrow-inner {
				top: 3px;
			}
			.clear-feedback-button {
				margin-top: -1px;
				margin-left: auto;
				border-radius: 5px;
				padding: 5px;
				border: solid transparent 1px;
				cursor: pointer;
			}
			.clear-feedback-button.is-focused,
			.clear-feedback-button:hover {
				border-color: var(--d2l-color-celestine);
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
			:host([_focus-styling]) .feedback-wrapper {
				cursor: text;
				padding: calc(0.5rem - 1px);
				padding-left: calc(1rem - 1px);
			}
			.feedback-heading {
				@apply --d2l-label-text;
				margin-top: -1px;
				color: var(--d2l-color-galena);
				padding-top: 5px;
				padding-bottom: 5px;
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
				padding-top: 0.6rem;
			}

		</style>
		<iron-media-query query="(min-width: 615px)" query-matches="{{_largeScreen}}"></iron-media-query>
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[criterionHref]]" token="[[token]]" entity="{{criterionEntity}}"></rubric-siren-entity>
		<div class="feedback-wrapper" data-desktop$="[[_largeScreen]]" on-mouseover="_addFocusStylingToFeedbackWrapper" on-mouseout="_removeFocusStylingFromFeedbackWrapper" on-focusin="_focusInHandler" on-focusout="_focusOutHandler" on-tap="_handleTap">
			<div class="feedback-arrow" data-mobile$="[[!_largeScreen]]">
				<div class="feedback-arrow-inner"></div>
			</div>
			<div hidden="[[!_canEditFeedback(criterionEntity, assessmentResult)]]">
				<div class="feedback-header-wrapper">
					<div class="feedback-heading">
						[[localize('criterionFeedback')]]
					</div>
					<d2l-icon aria-hidden="true" id="clear-feedback" class="clear-feedback-button" tabindex="-1" icon="d2l-tier1:close-small" on-tap="_clearFeedback" on-focusin="_handleVisibleFocusin"></d2l-icon>
					<d2l-tooltip for="clear-feedback" force-show="[[_handleTooltip(_clearFeedbackInFocus)]]" position="bottom">[[localize('clearFeedback')]]</d2l-tooltip>
				</div>
				<d2l-input-textarea no-border$="[[_largeScreen]]" no-padding$="[[_largeScreen]]" id="text-area" value="[[getAssessmentFeedbackText(criterionEntity, assessmentResult)]]">
				</d2l-input-textarea>
				<d2l-offscreen>
					<d2l-button-subtle aria-label$="[[localize('clearFeedback')]]" id="clear-feedback-invisible" on-focusin="_handleInvisibleFocusin" on-focusout="_handleInvisibleFocusout" on-tap="_clearFeedback">
				</d2l-offscreen>
			</div>
			<div hidden="[[_hasReadonlyFeedback(criterionEntity, assessmentResult)]]">
				<div class="feedback-container" data-mobile$="[[!_largeScreen]]">
					<div class="feedback-heading">[[localize('criterionFeedback')]]</div>
					<div class="feedback-text">
						<s-html style="white-space: pre-line;" html="[[getAssessmentFeedbackHtml(criterionEntity, assessmentResult)]]"></s-html>
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
		},
		_clearFeedbackInFocus: {
			type: Boolean,
			value: false
		},
		_focusStyling: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		_largeScreen: Boolean
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
	},

	focus: function() {
		var elem = dom(this.root).querySelector('d2l-input-textarea');
		elem.focus();
	},

	_focusInHandler: function() {
		if (this.readOnly || !this.assessmentHref) {
			return;
		}
		this._feedbackInFocus = true;
		this._addFocusStylingToFeedbackWrapper();
	},

	_focusOutHandler: function() {
		this._feedbackInFocus = false;
		this._removeFocusStylingFromFeedbackWrapper();
	},

	_blurHandler: function(event) {
		var feedback = event.target.$.textarea.value;
		this.saveFeedback(feedback);
	},

	_addFocusStylingToFeedbackWrapper: function() {
		if (this.readOnly || !this.assessmentHref || !this._largeScreen) {
			return;
		}
		this._focusStyling = true;
	},

	_removeFocusStylingFromFeedbackWrapper: function() {
		if (!this._feedbackInFocus) {
			this._focusStyling = false;
		}
	},

	_handleTap: function() {
		fastdom.mutate(function() {
			dom(this.root).querySelector('#text-area').focus();
		}.bind(this));
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
	},

	_handleInvisibleFocusin: function() {
		var elem = dom(this.root).querySelector('#clear-feedback');
		elem.classList.add('is-focused');
		this._clearFeedbackInFocus = true;
	},

	_handleInvisibleFocusout: function() {
		var elem = dom(this.root).querySelector('#clear-feedback');
		elem.classList.remove('is-focused');
		this._clearFeedbackInFocus = false;
	},

	_handleVisibleFocusin: function() {
		var elem = dom(this.root).querySelector('#clear-feedback-invisible');
		fastdom.mutate(function() {
			elem.focus();
		}.bind(this));
	},

	_handleTooltip: function(_clearFeedbackInFocus) {
		return _clearFeedbackInFocus;
	}
});
