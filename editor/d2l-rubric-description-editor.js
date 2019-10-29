import '@polymer/polymer/polymer-legacy.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-inputs/d2l-input-text.js';
import '../d2l-rubric-entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../localize-behavior.js';
import './d2l-rubric-text-editor.js';
import './d2l-rubric-error-handling-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-description-editor">
	<template strip-whitespace="">
		<style>
			:host {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				min-height: 4rem;

				--d2l-input-textarea: {
					min-height: 0;
					overflow: hidden;
					hyphens: auto;
					border-color: transparent;
					box-shadow: none;
					border-radius: 0 0 var(--input-border-bottom-right-radius, 0) var(--input-border-bottom-left-radius, 0);
					transition-property: none;
				};
			}

			* {
				box-sizing: border-box;
			}

			d2l-rubric-text-editor {
				flex-grow: 1;
				min-height: 4rem;
			}

			d2l-input-text {
				width: auto;
			}

			.points {
				display: flex;
				align-items: center;
				padding: 0.5rem;
			}

			.points div {
				margin-left: 0.5rem;
				@apply --d2l-body-compact-text;
			}

			:dir(rtl) .points div {
				margin-right: 0.5rem;
				margin-left: 0;
			}

			#cell-points {
				min-width: calc(2.25rem + 1em);
			}

			:host([first-and-corner]) {
				--input-border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			:host([last-and-corner]){
				--input-border-bottom-right-radius: var(--d2l-table-border-radius);
			}

			:host([first-and-corner]) :dir(rtl) {
				--input-border-bottom-right-radius: var(--d2l-table-border-radius);
			}

			:host([first-and-corner]:not([last-and-corner])) :dir(rtl) {
				--input-border-bottom-left-radius: 0;
			}

			:host([last-and-corner]) :dir(rtl) {
				--input-border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			:host([last-and-corner]:not([first-and-corner])) :dir(rtl) {
				--input-border-bottom-right-radius: 0;
			}

			[hidden] {
				display: none !important;
			}
		</style>

		<div class="points" hidden="[[!_showPoints]]">
			<d2l-input-text
				id="cell-points"
				value="{{_points}}"
				on-blur="_pointsBlurHandler"
				on-input="_pointsInputHandler"
				aria-invalid="[[isAriaInvalid(_pointsInvalid)]]"
				aria-label$="[[localize('cellPoints')]]"
				disabled="[[!_canEditPoints]]"
				size="1"
				prevent-submit="">
			</d2l-input-text>
			<div>[[localize('pointsAbbreviation')]]</div>
		</div>
		<d2l-rubric-text-editor
			id="description"
			token="[[token]]"
			key="[[_key]]"
			aria-invalid="[[isAriaInvalid(_descriptionInvalid)]]"
			aria-label$="[[_getAriaLabel(ariaLabelLangterm, criterionName, entity.properties)]]"
			disabled="[[!_canEditDescription]]"
			value="{{_description}}"
			input-changing="{{_descriptionChanging}}"
			pending-saves="[[_pendingDescriptionSaves]]"
			on-text-changed="_saveDescription"
			rich-text-enabled="[[_richTextAndEditEnabled(richTextEnabled,_canEditDescription)]]">
		</d2l-rubric-text-editor>
		<template is="dom-if" if="[[_descriptionInvalid]]">
			<d2l-tooltip id="description-bubble" class="is-error" for="description" position="bottom">
				[[_descriptionInvalidError]]
			</d2l-tooltip>
		</template>
		<template is="dom-if" if="[[_pointsInvalid]]">
			<d2l-tooltip id="cell-points-bubble" for="cell-points" position="bottom">
				[[_pointsInvalidError]]
			</d2l-tooltip>
		</template>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-description-editor',

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
		keyLinkRels: {
			type: Array,
			value: function() { return ['self']; }
		},
		_key: {
			type: String,
		},
		_canEditDescription: {
			type: Boolean,
			computed: '_computeCanEditDescription(entity, updatingLevels)',
			observer: '_canEditDescriptionChanged'
		},
		_canEditPoints: {
			type: Boolean,
			computed: '_computeCanEditPoints(entity, updatingLevels)',
		},
		_description: {
			type: String,
		},
		_descriptionInvalid: {
			type: Boolean,
			value: false
		},
		_descriptionInvalidError: {
			type: String,
			value: null
		},
		_descriptionChanging: {
			type: Boolean,
			value: false
		},
		_pendingDescriptionSaves: {
			type: Number,
			value: 0
		},
		_points: {
			type: Number,
		},
		_pointsRequired: {
			type: Boolean,
			computed: '_arePointsRequired(entity)',
		},
		_pointsInvalid: {
			type: Boolean,
			value: false
		},
		_pointsInvalidError: {
			type: String,
			value: null
		},
		_showPoints: {
			type: Boolean,
			computed: '_computeShowPoints(entity)'
		},
		_pointsChanging: {
			type: Boolean,
			value: false
		},
		_pendingPointsSaves: {
			type: Number,
			value: 0
		},
		richTextEnabled: Boolean,
		updatingLevels: {
			type: Boolean,
			value: false
		}
	},
	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior
	],
	_onEntityChanged: function(entity, oldEntity) {
		if (entity) {
			var descriptionChanged = oldEntity ? this._getDescription(entity) !== this._getDescription(oldEntity) : true;
			if (descriptionChanged) {
				this._updateDescription(entity);
			}
			var pointsChanged = oldEntity ? entity.properties.points !== oldEntity.properties.points : true;
			if (pointsChanged) {
				this._updatePoints(entity);
			}
			// key needs to be updated after description so that the html-editor uses the updated value when its observer runs
			this._key = this._constructKey(this.keyLinkRels, entity);
		}
	},
	_getAriaLabel: function(langTerm, criterionName, properties) {
		var levelName = properties && properties.levelName || properties && properties.name;
		return this.localize(langTerm, 'criterionName', criterionName, 'levelName', levelName);
	},

	_getDescriptionAction: function(entity) {
		// Default to 'update' if 'update-description' is not present. Mostly for BG purposes
		// while the overall levels API is updated to use 'update-description'. Can be removed
		// later.
		var action;
		var description = entity && entity.getSubEntityByClass(this.HypermediaClasses.rubrics.description);
		if (description) {
			action = description.getActionByName('update-description');
			if (!action) {
				action = description.getActionByName('update');
			}
		}
		return action;
	},

	_getDescription: function(entity) {
		var description = entity.getSubEntityByClass(this.HypermediaClasses.rubrics.description);
		if (description) {
			return this._richTextAndEditEnabled(this.richTextEnabled, this._canEditDescription) ? description.properties.html : description.properties.text;
		}
		return '';
	},

	_saveDescription: function(e) {
		var action = this._getDescriptionAction(this.entity);
		if (action) {
			this.toggleBubble('_descriptionInvalid', false, 'description-bubble');
			var fields = [{'name':'description', 'value':e.detail.value}];
			this._pendingDescriptionSaves++;
			this.performSirenAction(action, fields).then(function() {
				this.fire('d2l-rubric-description-saved');
			}.bind(this)).catch(function(err) {
				this.handleValidationError('description-bubble', '_descriptionInvalid', 'descriptionSaveFailed', err);
			}.bind(this)).finally(function() {
				this._pendingDescriptionSaves--;
				if (!this._descriptionInvalid) {
					this._updateDescription(this.entity);
				}
			}.bind(this));
		}
	},
	_arePointsRequired: function(entity) {
		var action = entity && entity.getActionByName('update-points');
		if (!action) {
			return false;
		}
		var field = action.getFieldByName('points');
		if (!field) {
			return false;
		}
		return field.hasClass('required');
	},
	_computeCanEditDescription: function(entity, updatingLevels) {
		var description = entity && entity.getSubEntityByClass(this.HypermediaClasses.rubrics.description);
		return description && (description.hasActionByName('update-description') || description.hasActionByName('update')) && !updatingLevels;
	},

	_canEditDescriptionChanged: function() {
		if (this.entity && this.richTextEnabled) {
			this._updateDescription(this.entity);
		}
	},

	_computeCanEditPoints: function(entity, updatingLevels) {
		return entity && entity.hasActionByName('update-points') && !updatingLevels;
	},

	_computeShowPoints: function(entity) {
		return entity && entity.hasClass(this.HypermediaClasses.rubrics.overridden);
	},

	_pointsBlurHandler: function(e) {
		if (this._pointsChanging || !this._pendingPointsSaves && this._pointsInvalid) {
			this._savePoints(e.target.value);
		}
	},

	_pointsInputHandler: function(e) {
		this._pointsChanging = true;
		var value = e.target.value;
		this.debounce('input', function() {
			if (this._pointsChanging) {
				this._savePoints(value);
			}
		}.bind(this), 500);
	},

	_savePoints: function(value) {
		this._pointsChanging = false;
		var action = this.entity.getActionByName('update-points');
		if (action) {
			if (this._pointsRequired && !value.trim()) {
				this.toggleBubble('_pointsInvalid', true, 'cell-points-bubble', this.localize('pointsAreRequired'));
				this.fire('iron-announce', { text: this.localize('pointsAreRequired') }, { bubbles: true });
			} else {
				this.toggleBubble('_pointsInvalid', false, 'cell-points-bubble');
				var fields = [{ 'name': 'points', 'value': value }];
				this._pendingPointsSaves++;
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-criterion-cell-points-saved');
				}.bind(this)).catch(function(err) {
					this.handleValidationError('cell-points-bubble', '_pointsInvalid', 'pointsSaveFailed', err);
				}.bind(this)).finally(function() {
					this._pendingPointsSaves--;
					if (!this._pointsInvalid) {
						this._updatePoints(this.entity);
					}
				}.bind(this));
			}
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
	},

	_updateDescription: function(entity) {
		if (!this._descriptionChanging && !this._pendingDescriptionSaves) {
			this.toggleBubble('_descriptionInvalid', false, 'description-bubble');
			this._description = this._getDescription(entity);
		}
	},

	_updatePoints: function(entity) {
		if (!this._pointsChanging && !this._pendingPointsSaves) {
			this.toggleBubble('_pointsInvalid', false, 'cell-points-bubble');
			this._points = entity.properties.points;
		}
	}
});
