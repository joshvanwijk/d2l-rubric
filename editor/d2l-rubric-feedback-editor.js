import '@brightspace-ui/core/components/tooltip/tooltip.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import '../d2l-rubric-entity-behavior.js';
import './d2l-rubric-siren-autosave-action-behavior.js';
import '../localize-behavior.js';
import './d2l-rubric-text-editor.js';
import './d2l-rubric-error-handling-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-feedback-editor">
	<template strip-whitespace="">
		<style>
			:host {
				display: flex;
				flex-grow: 1;

				--d2l-input-textarea: {
					min-height: 0;
					overflow: hidden;
					hyphens: auto;
					border-color: transparent;
					box-shadow: none;
					border-radius: 0;
					transition-property: none;
					background-color: transparent;
				};
			}

			* {
				box-sizing: border-box;
			}

			d2l-rubric-text-editor {
				flex-grow: 1;
			}

		</style>
		<d2l-rubric-text-editor
			id="feedback"
			token="[[token]]"
			key="[[_key]]"
			aria-invalid="[[isAriaInvalid(_feedbackInvalid)]]"
			aria-label$="[[_getAriaLabel(ariaLabelLangterm, criterionName, entity.properties)]]"
			disabled="[[!_canEdit]]"
			value="{{_feedbackText}}"
			input-changing="{{_feedbackChanging}}"
			pending-saves="[[_pendingFeedbackSaves]]"
			on-text-changed="_saveFeedback"
			rich-text-enabled="[[_richTextAndEditEnabled(entity, richTextEnabled,_canEdit)]]">
		</d2l-rubric-text-editor>
		<template is="dom-if" if="[[_feedbackInvalid]]">
			<d2l-tooltip announced id="feedback-bubble" class="is-error" for="feedback" position="bottom">
				[[_feedbackInvalidError]]
			</d2l-tooltip>
		</template>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-feedback-editor',

	properties: {
		/**
		 * textarea aria-label langterm
		 */
		ariaLabelLangterm: {
			type: String,
			value: ''
		},
		criterionName: {
			type: String,
			value: ''
		},
		_feedbackText: {
			type: String
		},
		_canEdit: {
			type: Boolean,
			computed: '_canEditFeedback(entity, updatingLevels)',
		},
		_feedbackInvalid: {
			type: Boolean,
			value: false
		},
		_feedbackInvalidError: {
			type: String,
			value: null
		},
		_feedbackChanging: {
			type: Boolean,
			value: false
		},
		_pendingFeedbackSaves: {
			type: Number,
			value: 0
		},
		keyLinkRels: {
			type: Array,
			value: function() { return ['self']; }
		},
		_key: {
			type: String,
			computed: '_constructKey(keyLinkRels, entity)',
		},
		updatingLevels: {
			type: Boolean
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Rubric.SirenAutosaveActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior
	],

	_onEntityChanged: function(entity, oldEntity) {
		if (entity) {
			var feedbackChanged = oldEntity ? this._getFeedback(entity) !== this._getFeedback(oldEntity) : true;
			if (feedbackChanged) {
				this._updateFeedback(entity);
			}
		}
	},

	_getAriaLabel: function(langTerm, criterionName, properties) {
		var levelName = properties && properties.levelName || properties && properties.name;
		return this.localize(langTerm, 'criterionName', criterionName, 'levelName', levelName);
	},

	_getFeedback: function(entity) {
		var action = this._getFeedbackAction(entity);
		if (action) {
			return action.getFieldByName('feedback').value;
		}
		return '';
	},

	_getFeedbackAction: function(entity) {
		var action;
		var feedback = entity && entity.getSubEntityByClass(this.HypermediaClasses.rubrics.feedback);
		if (feedback) {
			action = feedback.getActionByName('update-feedback');
		}
		return action;
	},

	_canEditFeedback: function(entity, updatingLevels) {
		var feedback = entity && entity.getSubEntityByClass(this.HypermediaClasses.rubrics.feedback);
		return feedback && feedback.hasActionByName('update-feedback') && !updatingLevels;
	},

	_saveFeedback: function(e) {
		var action = this._getFeedbackAction(this.entity);
		if (action) {
			this.toggleBubble('_feedbackInvalid', false, 'feedback-bubble');
			var fields = [{'name':'feedback', 'value':e.detail.value}];
			this.performAutosaveAction(action, fields, '_pendingFeedbackSaves').then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-feedback-saved', {
					bubbles: true,
					composed: true,
				}));
				this._updateFeedback(this.entity);
			}.bind(this)).catch(function(err) {
				this.handleValidationError('feedback-bubble', '_feedbackInvalid', 'feedbackSaveFailed', err);
			}.bind(this));
		}
	},

	_constructKey: function(keyLinkRels, entity) {
		var constructed = '';
		if (entity && entity.hasLinkByRel) {
			keyLinkRels.forEach(function(rel) {
				if (entity.hasLinkByRel(rel)) {
					constructed += entity.getLinkByRel(rel).href;
					constructed += '|';
				}
			});
		}
		return constructed;
	},

	_richTextAndEditEnabled: function(entity, richTextEnabled, canEditFeedback) {
		var feedback = entity && entity.getSubEntityByClass(this.HypermediaClasses.rubrics.feedback);
		return richTextEnabled && canEditFeedback && feedback.hasClass(this.HypermediaClasses.text.richtext);
	},

	_updateFeedback: function(entity) {
		if (!this._feedbackChanging && !this._pendingFeedbackSaves) {
			this.toggleBubble('_feedbackInvalid', false, 'feedback-bubble');
			this._feedbackText = this._getFeedback(entity);
		}
	}

});
