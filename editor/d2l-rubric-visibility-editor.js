import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/tooltip/tooltip.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-inputs/d2l-input-shared-styles.js';
import 'd2l-inputs/d2l-input-radio-styles.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../d2l-rubric-entity-behavior.js';
import '../localize-behavior.js';
import './d2l-rubric-error-handling-behavior.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { useShadow } from '@polymer/polymer/lib/utils/settings.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-visibility-editor">
	<template strip-whitespace="">
		<style include="d2l-input-radio-styles d2l-input-styles">
			:host {
				display: inline-block;
			}
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
			}
			#static-visibility-text {
				padding-top: 0.5rem;
			}
		</style>
		<label class="heading">[[localize('rubricVisibility')]]</label>
		<div id="static-visibility-text" hidden$="[[canEdit]]">[[_staticVisibilityText]]</div>
		<div hidden$="[[!_canEdit]]">
			<label class="d2l-input-radio-label">
				<input type="radio"
					id="AlwaysVisible"
					on-focus="_handleFocus"
					on-blur="_handleBlur"
					value="AlwaysVisible"
					name="visibility"
					on-change="_changeVisibility">[[localize('rubricVisibilityAlways')]]
			</label>
			<label class="d2l-input-radio-label">
				<input type="radio"
					id="NeverVisible"
					on-focus="_handleFocus"
					on-blur="_handleBlur"
					value="NeverVisible"
					name="visibility"
					on-change="_changeVisibility">[[localize('rubricVisibilityNever')]]
			</label>
			<d2l-input-checkbox
				id="enable-feedback-copy"
				style="margin-left: 32px;"
				on-change="_toggleFeedbackCopy"
			>
				[[localize('rubricFeedbackCopyOption')]]
			</d2l-input-checkbox>
			<label class="d2l-input-radio-label">
				<input type="radio"
					id="VisibleOnceFeedbackPosted"
					on-focus="_handleFocus"
					on-blur="_handleBlur"
					value="VisibleOnceFeedbackPosted"
					name="visibility"
					on-change="_changeVisibility">[[localize('rubricVisibilityOnceFeedbackPosted')]]
			</label>
		</div>
		<template is="dom-if" if="[[_visibilityInvalid]]">
			<d2l-tooltip announced id="visibility-bubble" class="is-error" position="bottom">[[_visibilityInvalidError]]</d2l-tooltip>
		</template>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-visibility-editor',
	properties: {
		/**
		* The href for this siren entity
		*/
		href: {
			type: String,
			reflectToAttribute: true
		},
		/**
		* The user access token
		*/
		token: {
			type: Object,
		},
		_debounceSelected: {
			type: String,
		},
		_debounceFeedbackCopyChecked: {
			type: Boolean,
		},
		ariaInvalid: {
			type: String,
			reflectToAttribute: true,
			computed: '_computeAriaInvalid(_visibilityInvalid)'
		},
		_visibilityInvalid: {
			type: Boolean,
			value: false
		},
		_visibilityInvalidError: {
			type: String,
			value: null
		},
		_canEdit: {
			type: Boolean,
			computed: '_computeCanEdit(entity)',
		},
		_staticVisibilityText: {
			type: String
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
		var action = entity && entity.getActionByName('update-visibility');
		if (action) {
			var field = action.getFieldByName('visibility');
			if (field && Array.isArray(field.value)) {
				for (var i = 0; i < field.value.length; i++) {
					if (field.value[i].selected) {
						dom(this.root).querySelector('#' + field.value[i].value).checked = true;
					}
				}
			}

			const feedbackCopyAction = entity && entity.getActionByName('enable-feedback-copy');
			const copyOption = dom(this.root).querySelector('#enable-feedback-copy');
			copyOption.hidden = feedbackCopyAction ? false : true;
			if (feedbackCopyAction) {
				const field = feedbackCopyAction.getFieldByName('feedbackCopy');
				copyOption.disabled = field && field.value && field.value.disabled || false;
				copyOption.checked = field && field.value && field.value.selected || false;
			}
		} else {
			const visibilitySelected = entity && entity.properties && entity.properties.visibility;
			if (visibilitySelected) {
				switch (visibilitySelected) {
					case 'AlwaysVisible':
						this._staticVisibilityText = this.localize('rubricVisibilityAlways');
						break;
					case 'VisibleOnceFeedbackPosted':
						this._staticVisibilityText = this.localize('rubricVisibilityOnceFeedbackPosted');
						break;
					case 'NeverVisible':
						this._staticVisibilityText = this.localize('rubricVisibilityNever');
						break;
				}
			}
		}
	},

	_changeVisibility: function(e) {
		this._debounceSelected = e.target.value;
		this.debounce('change', function() {
			var action = this.entity.getActionByName('update-visibility');
			if (action) {
				this.toggleBubble('_visibilityInvalid', false, 'visibility-bubble');
				var fields = [{ 'name': 'visibility', 'value': this._debounceSelected }];
				this.performSirenAction(action, fields).then(function() {
					this.dispatchEvent(new CustomEvent('d2l-rubric-visibility-saved', {
						bubbles: true,
						composed: true,
					}));
				}.bind(this)).catch(function(err) {
					this.handleValidationError('visibility-bubble', '_visibilityInvalid', 'rubricVisibilitySaveFailed', err);
				}.bind(this));
			}
		}.bind(this), 200);
	},

	_toggleFeedbackCopy: function(e) {
		this._debounceFeedbackCopyChecked = e.target.checked;
		this.debounce('toggleFeedbackCopy', function() {
			var action = this.entity.getActionByName('enable-feedback-copy');
			if (action) {
				this.toggleBubble('_visibilityInvalid', false, 'visibility-bubble');
				var fields = [{ 'name': 'feedbackCopy', 'value': this._debounceFeedbackCopyChecked }];
				this.performSirenAction(action, fields).then(function() {
					this.dispatchEvent(new CustomEvent('d2l-rubric-visibility-saved', {
						bubbles: true,
						composed: true,
					}));
				}.bind(this)).catch(function(err) {
					this.handleValidationError('visibility-bubble', '_visibilityInvalid', 'rubricVisibilitySaveFailed', err);
				}.bind(this));
			}
		}.bind(this), 200);
	},

	_computeAriaInvalid: function(_visibilityInvalid) {
		return _visibilityInvalid ? 'true' : 'false';
	},

	_handleFocus: function() {
		// in shady DOM the input's "focus" event does not bubble,
		// so  need to fire it
		if (!useShadow) {
			this.dispatchEvent(new CustomEvent(
				'focus',
				{bubbles: true, composed: true}
			));
		}
	},

	_handleBlur: function() {
		// in shady DOM the input's "blur" event does not bubble,
		// so need to fire it
		if (!useShadow) {
			this.dispatchEvent(new CustomEvent(
				'blur',
				{bubbles: true, composed: true}
			));
		}
	},

	_computeCanEdit: function(entity) {
		return entity && entity.hasActionByName('update-visibility');
	}
});
