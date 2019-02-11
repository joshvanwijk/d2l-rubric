import '@polymer/polymer/polymer-legacy.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-tooltip/d2l-tooltip.js';
import '../d2l-rubric-entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
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
				};
			}

			* {
				box-sizing: border-box;
			}

			d2l-rubric-text-editor {
				flex-grow: 1;
			}

		</style>
		<d2l-rubric-text-editor id="feedback" token="[[token]]" key="[[_key]]" aria-invalid="[[isAriaInvalid(_feedbackInvalid)]]" aria-label$="[[_getAriaLabel(ariaLabelLangterm, criterionName, entity.properties)]]" disabled="[[!_canEdit]]" value="[[_getFeedback(entity)]]" on-change="_saveFeedback" rich-text-enabled="[[_richTextAndEditEnabled(richTextEnabled,_canEdit)]]">
		</d2l-rubric-text-editor>
		<template is="dom-if" if="[[_feedbackInvalid]]">
			<d2l-tooltip id="feedback-bubble" for="feedback" position="bottom">
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

		_canEdit: {
			type: Boolean,
			computed: '_canEditFeedback(entity)',
		},
		_feedbackInvalid: {
			type: Boolean,
			value: false
		},
		_feedbackInvalidError: {
			type: String,
			value: null
		},
		keyLinkRels: {
			type: Array,
			value: function() { return ['self']; }
		},
		_key: {
			type: String,
			computed: '_constructKey(keyLinkRels, entity)',
		},
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior
	],

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

	_canEditFeedback: function(entity) {
		var feedback = entity && entity.getSubEntityByClass(this.HypermediaClasses.rubrics.feedback);
		return feedback && feedback.hasActionByName('update-feedback');
	},

	_saveFeedback: function(e) {
		var action = this._getFeedbackAction(this.entity);
		if (action) {
			this.toggleBubble('_feedbackInvalid', false, 'feedback-bubble');
			var fields = [{'name':'feedback', 'value':e.detail.value}];
			this.performSirenAction(action, fields).then(function() {
				this.fire('d2l-rubric-feedback-saved');
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

	_richTextAndEditEnabled: function(richTextEnabled, canEditDescription) {
		return richTextEnabled && canEditDescription;
	}

});
