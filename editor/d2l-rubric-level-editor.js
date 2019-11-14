import '@polymer/polymer/polymer-legacy.js';
import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import '../d2l-rubric-entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../localize-behavior.js';
import './d2l-rubric-dialog-behavior.js';
import './d2l-rubric-error-handling-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-level-editor">
	<template strip-whitespace="">
		<style>
			:host {
			}

			* {
				box-sizing: border-box;
			}

			.operations {
				display: flex;
				justify-content: space-between;
				padding-top: 0.5rem;
			}

			.operations[noPoints] {
				justify-content: flex-end;
			}

			.points {
				display: flex;
				align-items: center;
			}

			.points[alt-percent-format] {
				flex-direction: row-reverse;
			}

			.points div {
				margin-left: 0.5rem;
				@apply --d2l-body-compact-text;
			}

			.points[alt-percent-format] div {
				margin-left: 0;
				margin-right: 0.5rem;
			}

			:dir(rtl) .points div {
				margin-right: 0.5rem;
				margin-left: 0;
			}

			:dir(rtl) .points[alt-percent-format] div {
				margin-right: 0;
				margin-left: 0.5rem;
			}

			[hidden] {
				display: none;
			}

			#level-points {
				min-width: calc(2.25rem + 1em);
			}
		</style>

		<d2l-input-text
			id="level-name"
			value="{{_getDisplayedValue(_levelNameFocused,_nameInvalid,_pendingNameSaves,_enteredLevelName,_levelName)}}"
			on-focus="_nameFocusHandler"
			on-blur="_nameBlurHandler"
			on-input="_nameInputHandler"
			aria-invalid="[[isAriaInvalid(_nameInvalid)]]"
			aria-label$="[[localize('_levelName')]]"
			disabled="[[!_canEditName]]"
			prevent-submit=""
		>
		</d2l-input-text>
		<div class="operations" nopoints$="[[!_showPoints]]">
			<div class="points" hidden="[[!_showPoints]]" alt-percent-format$="[[_showAltPercentFormat(percentageFormatAlternate,_usesPercentage)]]">
				<d2l-input-text
					id="level-points"
					value="{{_getDisplayedValue(_levelPointsFocused,_pointsInvalid,_pendingPointsSaves,_enteredLevelPoints,_levelPoints)}}"
					on-focus="_pointsFocusHandler"
					on-blur="_pointsBlurHandler"
					on-input="_pointsInputHandler"
					aria-invalid="[[isAriaInvalid(_pointsInvalid)]]"
					aria-label$="[[localize('_levelPoints')]]"
					disabled="[[!_canEditPoints]]"
					size="1"
					prevent-submit=""
				>
				</d2l-input-text>
				<div>[[_getPointsUnitText(entity)]]</div>
			</div>
			<d2l-button-icon id="remove" icon="d2l-tier1:delete" text="[[localize('removeLevel', 'name', _levelName)]]" on-click="_handleDeleteLevel" hidden="[[!_canDelete]]" type="button">
			</d2l-button-icon>
		</div>
		<template is="dom-if" if="[[_nameInvalid]]">
			<d2l-tooltip id="level-name-bubble" class="is-error" for="level-name" position="bottom">
				[[_nameInvalidError]]
			</d2l-tooltip>
		</template>
		<template is="dom-if" if="[[_pointsInvalid]]">
			<d2l-tooltip id="points-bubble" for="level-points" position="bottom">
				[[_pointsInvalidError]]
			</d2l-tooltip>
		</template>

	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-level-editor',

	properties: {
		hasOutOf: Boolean,
		percentageFormatAlternate: Boolean,
		_canDelete: {
			type: Boolean,
			computed: '_canDeleteLevel(entity)',
		},
		_levelName: {
			type: String
		},
		_enteredLevelName: {
			type: String
		},
		_levelNameFocused: {
			type: Boolean,
			vaue: false
		},
		_canEditName: {
			type: Boolean,
			computed: '_canEditLevelName(entity)',
		},
		_nameRequired: {
			type: Boolean,
			computed: '_isNameRequired(entity)',
		},
		_nameInvalid: {
			type: Boolean,
			value: false
		},
		_nameInvalidError: {
			type: String,
			value: null
		},
		_nameChanging: {
			type: Boolean,
			value: false
		},
		_pendingNameSaves: {
			type: Number,
			value: 0
		},
		_levelPoints: {
			type: Number
		},
		_enteredLevelPoints: {
			type: String
		},
		_levelPointsFocused: {
			type: Boolean,
			value: false
		},
		_canEditPoints: {
			type: Boolean,
			computed: '_canEditLevelPoints(entity)',
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
			computed: '_computeShowPoints(hasOutOf, entity)'
		},
		_pointsChanging: {
			type: Boolean,
			value: false
		},
		_pendingPointsSaves: {
			type: Number,
			value: 0
		},
		_usesPercentage: {
			type: Boolean,
			computed: '_computeUsesPercentage(entity)'
		},
		updatingLevels: {
			type: Boolean,
			notify: true
		}
	},
	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.DialogBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior
	],

	_onEntityChanged: function(entity, oldEntity) {
		this._nameInvalid = false;
		this._pointsInvalid = false;

		if (entity) {
			var selfLinkChanged = this._getSelfLink(entity) !== this._getSelfLink(oldEntity);
			var nameChanged = oldEntity ? entity.properties.name !== oldEntity.properties.name : true;
			if (selfLinkChanged || nameChanged) {
				this._updateName(entity, selfLinkChanged);
			}
			var pointsChanged = oldEntity ? entity.properties.points !== oldEntity.properties.points : true;
			if (selfLinkChanged || pointsChanged) {
				this._updatePoints(entity, selfLinkChanged);
			}
		}
	},
	_canEditLevelPoints: function(entity) {
		return entity && entity.hasActionByName('update-points');
	},
	_canEditLevelName: function(entity) {
		return entity && entity.hasActionByName('update-name');
	},
	_computeUsesPercentage: function(entity) {
		return entity && entity.hasClass(this.HypermediaClasses.rubrics.percentage);
	},
	_isNameRequired: function(entity) {
		var action = entity && entity.getActionByName('update-name');
		if (!action) {
			return false;
		}
		var field = action.getFieldByName('name');
		if (!field) {
			return false;
		}
		return field.hasClass('required');
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
	_computeShowPoints: function(hasOutOf, entity) {
		return hasOutOf && entity && !entity.hasClass(this.HypermediaClasses.rubrics.overridden);
	},
	_getPointsUnitText: function(entity) {
		if (entity) {
			if (this._usesPercentage) {
				return '%';
			}
			return this.localize('pointsAbbreviation');
		}
		return '';
	},
	_showAltPercentFormat: function(percentageFormatAlternate, usesPercentage) {
		return usesPercentage && percentageFormatAlternate;
	},
	_nameFocusHandler: function(e) {
		this._enteredLevelName = e.target.value;
		this._levelNameFocused = true;
	},
	_nameBlurHandler: function(e) {
		if (this._nameChanging || !this._pendingNameSaves && this._nameInvalid) {
			this._saveName(e.target.value);
		}
		this._levelNameFocused = false;
	},
	_nameInputHandler: function(e) {
		this._nameChanging = true;
		this._enteredLevelName = e.target.value;
		var value = e.target.value;
		this.debounce('input', function() {
			if (this._nameChanging) {
				this._saveName(value);
			}
		}.bind(this), 500);
	},
	_saveName: function(value) {
		this._nameChanging = false;
		var action = this.entity.getActionByName('update-name');
		if (action) {
			if (this._nameRequired && !value.trim()) {
				this.handleValidationError('level-name-bubble', '_nameInvalid', 'nameIsRequired');
			} else {
				this.toggleBubble('_nameInvalid', false, 'level-name-bubble');
				var fields = [{'name':'name', 'value': value}];
				this._pendingNameSaves++;
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-level-saved');
				}.bind(this)).catch(function(err) {
					this.handleValidationError('level-name-bubble', '_nameInvalid', 'nameSaveFailed', err);
				}.bind(this)).finally(function() {
					this._pendingNameSaves--;
					if (!this._nameInvalid) {
						this._updateName(this.entity, false);
					}
				}.bind(this));
			}
		}
	},
	_updateName: function(entity, selfLinkChanged) {
		if (selfLinkChanged || (!this._nameChanging && !this._pendingNameSaves)) {
			this.toggleBubble('_nameInvalid', false, 'level-name-bubble');
			this._levelName = entity.properties.name;
		}
	},
	_pointsFocusHandler: function(e) {
		this._enteredLevelPoints = e.target.value;
		this._levelPointsFocused = true;
	},
	_pointsBlurHandler: function(e) {
		if (this._pointsChanging || !this._pendingPointsSaves && this._pointsInvalid) {
			this._savePoints(e.target.value);
		}
		this._levelPointsFocused = false;
	},
	_pointsInputHandler: function(e) {
		this._pointsChanging = true;
		this._enteredLevelPoints = e.target.value;
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
				if (this._usesPercentage) {
					this.handleValidationError('points-bubble', '_pointsInvalid', 'rangeStartRequired');
				} else {
					this.handleValidationError('points-bubble', '_pointsInvalid', 'pointsAreRequired');
				}
			} else {
				this.toggleBubble('_pointsInvalid', false, 'points-bubble');
				var fields = [{'name':'points', 'value':value}];
				this._pendingPointsSaves++;
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-level-points-saved');
				}.bind(this)).catch(function(err) {
					if (this._usesPercentage) {
						this.handleValidationError('points-bubble', '_pointsInvalid', 'rangeStartInvalid', err);
					} else {
						this.handleValidationError('points-bubble', '_pointsInvalid', 'pointsSaveFailed', err);
					}
				}.bind(this)).finally(function() {
					this._pendingPointsSaves--;
					if (!this._pointsInvalid) {
						this._updatePoints(this.entity, false);
					}
				}.bind(this));
			}
		}
	},
	_updatePoints: function(entity, selfLinkChanged) {
		if (selfLinkChanged || (!this._pointsChanging && !this._pendingPointsSaves)) {
			this.toggleBubble('_pointsInvalid', false, 'points-bubble');
			this._levelPoints = entity.properties.points;
		}
	},
	_canDeleteLevel: function(entity) {
		return entity && entity.hasActionByName('delete');
	},
	_handleDeleteLevel: function(e) {
		var action = this.entity.getActionByName('delete');
		if (!action) return;
		var deleteButton = e.currentTarget;
		deleteButton.setAttribute('disabled', '');
		this.openConfirm({
			title: this.localize('deleteLevelConfirmationTitle'),
			secondaryMessage: this.localize('deleteLevelConfirmationText'),
			positiveButtonText: this.localize('deleteConfirmationYes'),
			negativeButtonText: this.localize('deleteConfirmationNo')
		}).then(function() {
			var name = this._levelName;
			this.fire('iron-announce', { text: this.localize('levelDeleted', 'name', name) }, { bubbles: true });
			this.updatingLevels = true;
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-level-deleted');
			}.bind(this)).then(function() {
				deleteButton.removeAttribute('disabled');
			}).catch(function(err) {
				deleteButton.removeAttribute('disabled');
				this.fire('d2l-rubric-editor-save-error', { message: err.message });
			}.bind(this)).finally(function() {
				this.updatingLevels = false;
			}.bind(this));
		}.bind(this), function() {
			deleteButton.removeAttribute('disabled');
		});
	},
	_getDisplayedValue: function(hasFocus, isInvalid, pendingSaves, enteredValue, actualValue) {
		return (hasFocus || isInvalid || pendingSaves > 0) ? enteredValue : actualValue;
	}
});
