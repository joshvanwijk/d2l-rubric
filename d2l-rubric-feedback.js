import '@polymer/polymer/polymer-legacy.js';
import './localize-behavior.js';
import './assessment-behavior.js';
import './editor/d2l-rubric-error-handling-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import '@brightspace-ui/core/components/inputs/input-textarea.js';
import './rubric-siren-entity.js';
import '@polymer/iron-media-query/iron-media-query.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-button/d2l-button-subtle.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-feedback">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				word-wrap: break-word;
			}

			:host([_feedback-invalid]) .feedback-wrapper[data-desktop]{
				border-color: var(--d2l-color-cinnabar);
			}

			:host([_feedback-invalid]) .feedback-arrow {
				border-bottom-color: var(--d2l-color-cinnabar);
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
			:host([_focus-styling]:not([_feedback-invalid])) .feedback-arrow {
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
			:host([_focus-styling]:not([_feedback-invalid])) .feedback-arrow-inner {
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
				border: solid transparent 1px;
				transition-property: border-color;
				transition-timing-function: ease;
				transition: border-color 0.5s;
			}
			.feedback-wrapper-editable:hover {
				background: var(--d2l-color-sylvite);
				background-color: var(--d2l-color-sylvite);
				cursor: pointer;
			}
			.feedback-wrapper-editable:hover .feedback-arrow-inner {
				border-bottom: 12px solid var(--d2l-color-sylvite);
			}
			:host([_focus-styling]:not([_feedback-invalid])) .feedback-wrapper {
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
				display: inherit;
			}
			.feedback-heading-extra {
				@apply --d2l-label-text;
				margin-left: 6px;
				color: var(--d2l-color-tungsten);
				font-weight: normal;
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
				padding: 18px
			}
			d2l-input-textarea {
				margin-bottom: 8px;
			}
		</style>
		<rubric-siren-entity href="[[criterionAssessmentHref]]" token="[[token]]" entity="{{criterionAssessment}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[criterionHref]]" token="[[token]]" entity="{{criterionEntity}}"></rubric-siren-entity>
		<div class="feedback-wrapper" data-desktop$="[[!compact]]" on-mouseover="_addFocusStylingToFeedbackWrapper" on-mouseout="_removeFocusStylingFromFeedbackWrapper" on-focusin="_focusInHandler" on-focusout="_focusOutHandler" on-click="_handleTap">
			<div class="feedback-arrow" data-mobile$="[[compact]]">
				<div class="feedback-arrow-inner"></div>
			</div>
			<div hidden="[[!_canEditFeedback(criterionEntity, criterionAssessment)]]">
				<div class="feedback-header-wrapper">
					<div class="feedback-heading">
						[[localize('criterionFeedback')]]
						<div class="feedback-heading-extra">
							[[_feedbackHeadingExtra]]
						</div>
					</div>
					<d2l-icon aria-hidden="true" id="clear-feedback" class="clear-feedback-button" tabindex="-1" icon="d2l-tier1:close-small" on-click="_clearFeedbackHandler" on-focusin="_handleVisibleFocusin"></d2l-icon>
					<d2l-tooltip for="clear-feedback" force-show="[[_handleTooltip(_clearFeedbackInFocus)]]" position="bottom">[[localize('clearFeedback')]]</d2l-tooltip>
				</div>
				<d2l-input-textarea no-border$="[[!compact]]" no-padding$="[[!compact]]" rows="1" max-rows="-1" id="text-area" value="{{_feedback}}" on-input="_handleInputChange" aria-invalid="[[isAriaInvalid(_feedbackInvalid)]]" on-focusin="_onFocusInTextArea" aria-label="[[_ariaLabelForTextArea]]">
				</d2l-input-textarea>
				<template is="dom-if" if="[[_feedbackInvalid]]">
					<d2l-tooltip announced id="feedback-bubble" hidden=[[!_feedbackInFocus]] class="is-error" for="text-area" position="top">
						[[_feedbackInvalidError]]
					</d2l-tooltip>
				</template>
				<d2l-offscreen>
					<d2l-button-subtle aria-label$="[[localize('clearFeedback')]]" id="clear-feedback-invisible" on-focusin="_handleInvisibleFocusin" on-focusout="_handleInvisibleFocusout" on-click="_clearFeedbackHandler">
				</d2l-offscreen>
			</div>
			<div hidden="[[_hasReadonlyFeedback(criterionEntity, criterionAssessment, addingFeedback)]]">
				<div class="feedback-container" data-mobile$="[[compact]]">
					<div class="feedback-heading">[[localize('criterionFeedback')]]</div>
					<div class="feedback-text">
						<s-html style="white-space: pre-line;" html="[[getAssessmentFeedbackHtml(criterionAssessment, _pendingFeedbackSaves, _feedback)]]"></s-html>
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
		criterionAssessmentHref: {
			type: String,
			value: null
		},
		criterionAssessment: Object,
		token: String,
		addingFeedback: {
			type: Boolean,
			value: false
		},
		_feedback: {
			type: String,
			value: null
		},
		_feedbackModified: {
			type: Boolean,
			value: false
		},
		_feedbackInvalid: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		_feedbackInvalidError: {
			type: String,
			value: null
		},
		_pendingFeedbackSaves: {
			type: Number,
			value: 0
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
		compact: {
			type: Boolean,
			value: false
		},
		enableFeedbackCopy: {
			type: Boolean,
			value: false,
		},
		_feedbackHeadingExtra: {
			type: String
		},
		_ariaLabelForTextArea: {
			type: String,
			computed: '_computeAriaLabelForTextArea(criterionEntity)'
		},
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior
	],

	observers: [
		'_updateFeedback(criterionAssessment)'
	],

	attached: function() {
		var elem = dom(this.root).querySelector('d2l-input-textarea');
		if (!elem) {
			return;
		}

		var isIOS = /iPad|iPhone/.test(navigator.userAgent) && !window.MSStream;
		if (isIOS) {
			// on ios mouseleave fires when the user taps on another clickable item, including those outside the current window
			// but blur doesn't fire if the item is outside the current window
			elem.addEventListener('mouseleave', this._saveFeedbackHandler.bind(this));
		} else {
			elem.addEventListener('blur', this._saveFeedbackHandler.bind(this));
		}

		this._feedbackHeadingExtra = this._getFeedbackHeadingExtra(this.enableFeedbackCopy);
	},

	detached: function() {
		var elem = dom(this.root).querySelector('d2l-input-textarea');
		if (!elem) return;
	},

	focus: function() {
		var elem = dom(this.root).querySelector('d2l-input-textarea');
		elem.focus();
	},

	_updateFeedback: function(criterionAssessment) {
		if (criterionAssessment && !this._feedbackInvalid) {
			this.updateAssessmentFeedbackText(criterionAssessment);
		}
	},

	_focusInHandler: function() {
		if (this.readOnly || !this.criterionAssessmentHref || this._feedbackInvalid) {
			return;
		}
		this._feedbackInFocus = true;
		this._addFocusStylingToFeedbackWrapper();
	},

	_onFocusInTextArea: function() {
		const title = this.localize('criterionFeedback');
		const extra = this._feedbackHeadingExtra;
		announce(`${title}${extra}`);
	},

	_focusOutHandler: function() {
		this._feedbackInFocus = false;
		this._removeFocusStylingFromFeedbackWrapper();
	},

	_addFocusStylingToFeedbackWrapper: function() {
		if (this.readOnly || !this.criterionAssessmentHref || !!this.compact || this._feedbackInvalid) {
			return;
		}
		this._focusStyling = true;
	},

	_removeFocusStylingFromFeedbackWrapper: function() {
		if (!this._feedbackInFocus) {
			this._focusStyling = false;
		}
	},

	_handleInputChange: function() {
		this._feedbackModified = true;
	},

	_handleTap: function() {
		fastdom.mutate(function() {
			dom(this.root).querySelector('#text-area').focus();
		}.bind(this));
	},

	_saveFeedbackHandler: function(e) {
		if (this._feedbackModified || !this._pendingFeedbackSaves && this._feedbackInvalid) {
			var value = e.target.value;
			this._saveFeedback(value);
		}
	},

	_clearFeedbackHandler: function() {
		this._saveFeedback('').finally(function() {
			if (!this._feedbackInvalid) {
				this.dispatchEvent(new CustomEvent('close-feedback', {
					bubbles: true,
					composed: true,
				}));
			}
		}.bind(this));
	},

	_saveFeedback: function(value) {
		this._feedbackModified = false;
		this._pendingFeedbackSaves++;
		this.toggleBubble('_feedbackInvalid', false, 'feedback-bubble');
		this.dispatchEvent(new CustomEvent('save-feedback-start', {
			detail: {
				hasPendingSaves: true,
			},
			bubbles: true,
			composed: true,
		}));
		return this.CriterionAssessmentHelper.updateFeedbackAsync(() => this.criterionAssessment, value, false).finally(function() {
			this._pendingFeedbackSaves--;
		}.bind(this)).then(function() {
			this.updateAssessmentFeedbackText(this.criterionAssessment);
		}.bind(this)).catch(function(err) {
			this.handleValidationError('feedback-bubble', '_feedbackInvalid', 'feedbackSaveFailed', err);
		}.bind(this)).finally(function() {
			this.dispatchEvent(new CustomEvent('save-feedback-finished', {
				detail: {
					success: !this._feedbackInvalid,
					hasPendingSaves: this._pendingFeedbackSaves > 0
				},
				bubbles: true,
				composed: true,
			}));
		}.bind(this));
	},

	_canEditFeedback: function(criterionEntity, criterionAssessment) {
		if (this.readOnly || !criterionEntity || !criterionAssessment) {
			return false;
		}
		return this.CriterionAssessmentHelper.canUpdateAssessment(criterionAssessment);
	},

	_hasReadonlyFeedback: function(criterionEntity, criterionAssessment, addingFeedback) {
		return addingFeedback || this._canEditFeedback(criterionEntity, criterionAssessment);
	},

	getAssessmentFeedbackHtml: function(criterionAssessment, pendingSaves, tentativeFeedback) {
		return pendingSaves > 0 ? tentativeFeedback : this.CriterionAssessmentHelper.getFeedbackHtml(criterionAssessment);
	},

	updateAssessmentFeedbackText: function(criterionAssessment) {
		if (!this._feedbackModified && !this._pendingFeedbackSaves) {
			this.toggleBubble('_feedbackInvalid', false, 'feedback-bubble');
			this._feedback = this.CriterionAssessmentHelper.getFeedbackText(criterionAssessment);
		}
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
	},

	_getFeedbackHeadingExtra: function(enableFeedbackCopy) {
		const text = this.localize('criterionFeedbackWithCopy');
		return enableFeedbackCopy ? `- ${text}` : '';
	},

	_computeAriaLabelForTextArea: function(criterionEntity) {
		if (!criterionEntity) return;
		const name = criterionEntity.properties && criterionEntity.properties.name || '';
		return this.localize('feedbackOn', 'criterionName', name);
	}
});
