import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-inputs/d2l-input-shared-styles.js';
import 'd2l-inputs/d2l-input-radio-styles.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../d2l-rubric-entity-behavior.js';
import '../localize-behavior.js';
import './d2l-rubric-error-handling-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { useShadow } from '@polymer/polymer/lib/utils/settings.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-alignment-editor">
	<template strip-whitespace="">
		<style include="d2l-input-radio-styles d2l-input-styles">
			:host([aria-invalid="true"]) {
				padding: var(--d2l-input-padding);
				border: solid 1px var(--d2l-color-cinnabar);;
				border-radius: var(--d2l-input-border-radius);
			}
			:host([aria-invalid="true"]):hover,
			:host([aria-invalid="true"]):focus {
				padding: var(--d2l-input-padding-focus);
				border-width: 2px;
			}
			[hidden] {
				display: none;
			}
			label {
				@apply --d2l-label-text;
			}
			.heading {
				display: block;
				margin-bottom: 0.7rem;
				margin-top: 2.15rem;
			}
			#static-alignment-text {
				padding-top: 0.5rem;
			}
		</style>
		<div hidden$="[[!_showControl]]">
			<label class="heading">[[localize('learningOutcomes')]]</label>
			<div>
				<label class="d2l-input-radio-label">
					<input type="radio"
						id="AutomaticAlignment"
						on-focus="_handleFocus"
						on-blur="_handleBlur"
						value="false"
						name="alignment"
						on-change="_changeAlignment">[[localize('alignmentOptionAutomatic')]]
				</label>
				<label class="d2l-input-radio-label">
					<input type="radio"
						id="ManualAlignment"
						on-focus="_handleFocus"
						on-blur="_handleBlur"
						value="true"
						name="alignment"
						on-change="_changeAlignment">[[localize('alignmentOptionManual')]]
				</label>
			</div>
			<template is="dom-if" if="[[_alignmentInvalid]]">
				<d2l-tooltip id="alignment-bubble" class="is-error" position="bottom">[[_alignmentInvalidError]]</d2l-tooltip>
			</template>
		</div>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-alignment-editor',
	properties: {
		_debounceSelected: {
			type: String,
		},
		ariaInvalid: {
			type: String,
			reflectToAttribute: true,
			computed: '_computeAriaInvalid(_alignmentInvalid)'
		},
		_alignmentInvalid: {
			type: Boolean,
			value: false
		},
		_alignmentInvalidError: {
			type: String,
			value: null
		},
		_showControl: {
			type: Boolean,
			computed: '_computeShowControl(entity)',
			value: false,
		},
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior,
	],

	_onEntityChanged: function(entity) {
		if (this.isDebouncerActive('change')) {
			return;
		}
		var action = entity && entity.getActionByName('update-alignment');
		if (action) {
			var field = action.getFieldByName('alignment');
			if (field && Array.isArray(field.value)) {
				for (var i = 0; i < field.value.length; i++) {
					dom(this.root).querySelector('#' + field.value[i].id).checked = field.value[i].selected || false;
					dom(this.root).querySelector('#' + field.value[i].id).disabled = field.value[i].disabled || false;
				}
			}
		}
	},

	_changeAlignment: function(e) {
		this._debounceSelected = e.target.value;
		this.debounce('change', function() {
			var action = this.entity.getActionByName('update-alignment');
			if (action) {
				this.toggleBubble('_alignmentInvalid', false, 'alignment-bubble');
				var fields = [{ 'name': 'alignment', 'value': this._debounceSelected }];
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-alignment-saved');
					this.fire('d2l-loa-overlay-refresh');
				}.bind(this)).catch(function(err) {
					this.handleValidationError('alignment-bubble', '_alignmentInvalid', 'rubricAlignmentSaveFailed', err);
				}.bind(this));
			}
		}.bind(this), 200);
	},

	_computeAriaInvalid: function(_alignmentInvalid) {
		return _alignmentInvalid ? 'true' : 'false';
	},

	_handleFocus: function() {
		if (!useShadow) {
			this.dispatchEvent(new CustomEvent(
				'focus',
				{bubbles: true, composed: true}
			));
		}
	},

	_handleBlur: function() {
		if (!useShadow) {
			this.dispatchEvent(new CustomEvent(
				'blur',
				{bubbles: true, composed: true}
			));
		}
	},

	_computeShowControl: function(entity) {
		return entity && entity.hasActionByName('update-alignment');
	}
});
