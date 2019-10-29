import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../localize-behavior.js';
import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-button/d2l-button-icon.js';
import '../d2l-rubric-entity-behavior.js';
import './d2l-rubric-dialog-behavior.js';
import './d2l-rubric-error-handling-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-overall-level-editor">
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

			.operations[text-only] {
				justify-content: flex-end;
			}

			.points {
				flex-grow: 1;
				display: flex;
				align-items: center;
			}

			#range-start {
				margin-right: 0.5rem;
				width: auto;
				min-width: calc(2.25rem + 1em);
			}

			:dir(rtl) #range-start {
				margin-left: 0.5rem;
				margin-right: 0;
			}

			.points div {
				@apply --d2l-body-compact-text;
			}

			[hidden] {
				display: none;
			}
		</style>

		<d2l-input-text id="overall-level-name" value="{{_overallLevelName}}" on-blur="_nameBlurHandler" on-input="_nameInputHandler" aria-invalid="[[isAriaInvalid(_nameInvalid)]]" aria-label$="[[localize('overallLevelName')]]" disabled="[[!_canEditName]]" prevent-submit="">
		</d2l-input-text>
		<div class="operations" text-only$="[[!_hasRangeStart]]">
			<div class="points" hidden="[[!_hasRangeStart]]">
				<d2l-input-text id="range-start" value="{{_rangeStart}}" on-blur="_rangeStartBlurHandler" on-input="_rangeStartInputHandler" aria-invalid="[[isAriaInvalid(_rangeStartInvalid)]]" aria-label$="[[localize('overallLevelRangeStart')]]" disabled="[[!_canEditRangeStart]]" size="1" prevent-submit="">
				</d2l-input-text>
				<div>[[localize('rangeStartOrMore')]]</div>
			</div>
			<d2l-button-icon id="remove" icon="d2l-tier1:delete" text="[[localize('removeOverallLevel', 'name', entity.properties.name)]]" on-click="_handleDeleteLevel" hidden="[[!_canDelete]]" type="button">
			</d2l-button-icon>
		</div>
		<template is="dom-if" if="[[_nameInvalid]]">
			<d2l-tooltip id="overall-level-name-bubble" class="is-error" for="overall-level-name" position="bottom">
				[[_nameInvalidError]]
			</d2l-tooltip>
		</template>
		<template is="dom-if" if="[[_rangeStartInvalid]]">
			<d2l-tooltip id="range-start-bubble" for="range-start" position="bottom">
				[[_rangeStartInvalidError]]
			</d2l-tooltip>
		</template>

	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-overall-level-editor',

	properties: {
		_canEditName: {
			type: Boolean,
			computed: '_canEditNameValue(entity)',
		},
		_canEditRangeStart: {
			type: Boolean,
			computed: '_canEditRangeStartValue(entity)'
		},
		_canDelete: {
			type: Boolean,
			computed: '_canDeleteLevel(entity)',
		},
		_overallLevelName: {
			type: String
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
		_rangeStart: {
			type: Number
		},
		_hasRangeStart: {
			type: Boolean,
			computed: '_hasRangeStartValue(entity)'
		},
		_rangeStartRequired: {
			type: Boolean,
			computed: '_isRangeStartRequired(entity)',
		},
		_rangeStartInvalid: {
			type: Boolean,
			value: false
		},
		_rangeStartInvalidError: {
			type: String,
			value: null
		},
		_rangeStartChanging: {
			type: Boolean,
			value: false
		},
		_pendingRangeStartSaves: {
			type: Number,
			value: 0
		},
	},
	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.DialogBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior
	],

	_onEntityChanged: function(entity, oldEntity) {
		this._rangeStartInvalid = false;
		this._nameInvalid = false;

		if (entity) {
			var selfLinkChanged = this._getSelfLink(entity) !== this._getSelfLink(oldEntity);
			var nameChanged = oldEntity ? entity.properties.name !== oldEntity.properties.name : true;
			if (selfLinkChanged || nameChanged) {
				this._updateName(entity, selfLinkChanged);
			}
			var rangeStartChanged = oldEntity ? entity.properties.rangeStart !== oldEntity.properties.rangeStart : true;
			if (selfLinkChanged || rangeStartChanged) {
				this._updateRangeStart(entity, selfLinkChanged);
			}
		}
	},
	_hasRangeStartValue: function(entity) {
		return entity && entity.hasProperty('rangeStart') && entity.properties.rangeStart !== null;
	},
	_isRangeStartRequired: function(entity) {
		var action = entity && entity.getActionByName('update-range-start');
		if (!action) {
			return false;
		}
		var field = action.getFieldByName('rangeStart');
		if (!field) {
			return false;
		}
		return field.hasClass('required');
	},
	_canEditNameValue: function(entity) {
		return entity && entity.hasActionByName('update-name');
	},
	_canEditRangeStartValue: function(entity) {
		return entity && entity.hasActionByName('update-range-start');
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
	_nameBlurHandler: function(e) {
		if (this._nameChanging || !this._pendingNameSaves && this._nameInvalid) {
			this._saveName(e.target.value);
		}
	},
	_nameInputHandler: function(e) {
		this._nameChanging = true;
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
				this.handleValidationError('overall-level-name-bubble', '_nameInvalid', 'nameIsRequired');
			} else {
				this.toggleBubble('_nameInvalid', false, 'overall-level-name-bubble');
				var fields = [{ 'name': 'name', 'value': value }];
				this._pendingNameSaves++;
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-overall-level-saved');
					this._pendingNameSaves--;
					this._updateName(this.entity, false);
				}.bind(this)).catch(function(err) {
					this._pendingNameSaves--;
					this.handleValidationError('overall-level-name-bubble', '_nameInvalid', 'nameSaveFailed', err);
				}.bind(this));
			}
		}
	},
	_updateName: function(entity, selfLinkChanged) {
		if (selfLinkChanged || !this._nameChanging && !this._pendingNameSaves) {
			this.toggleBubble('_nameInvalid', false, 'overall-level-name-bubble');
			this._overallLevelName = entity.properties.name;
		}
	},
	_rangeStartBlurHandler: function(e) {
		if (this._rangeStartChanging || !this._pendingRangeStartSaves && this._rangeStartInvalid) {
			this._saveRangeStart(e.target.value);
		}
	},
	_rangeStartInputHandler: function(e) {
		this._rangeStartChanging = true;
		var value = e.target.value;
		this.debounce('input', function() {
			if (this._rangeStartChanging) {
				this._saveRangeStart(value);
			}
		}.bind(this), 500);
	},
	_saveRangeStart: function(value) {
		this._rangeStartChanging = false;
		var action = this.entity.getActionByName('update-range-start');
		if (action) {
			if (this._rangeStartRequired && !value.trim()) {
				this.handleValidationError('range-start-bubble', '_rangeStartInvalid', 'rangeStartRequired');
			} else {
				this.toggleBubble('_rangeStartInvalid', false, 'range-start-bubble');
				var fields = [{'name':'rangeStart', 'value': value}];
				this._pendingRangeStartSaves++;
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-overall-level-range-start-saved');
					this._pendingRangeStartSaves--;
					this._updateRangeStart(this.entity, false);
				}.bind(this)).catch(function(err) {
					this._pendingRangeStartSaves--;
					this.handleValidationError('range-start-bubble', '_rangeStartInvalid', 'rangeStartInvalid', err);
				}.bind(this));
			}
		}
	},
	_updateRangeStart: function(entity, selfLinkChanged) {
		if (selfLinkChanged || !this._rangeStartChanging && !this._pendingRangeStartSaves) {
			this.toggleBubble('_rangeStartInvalid', false, 'range-start-bubble');
			this._rangeStart = entity.properties.rangeStart;
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
			var name = this.entity.properties.name;
			this.fire('iron-announce', { text: this.localize('overallLevelDeleted', 'name', name) }, { bubbles: true });
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-overall-level-deleted');
			}.bind(this)).then(function() {
				deleteButton.removeAttribute('disabled');
			}).catch(function(err) {
				deleteButton.removeAttribute('disabled');
				this.fire('d2l-rubric-editor-save-error', { message: err.message });
			}.bind(this));
		}.bind(this), function() {
			deleteButton.removeAttribute('disabled');
		});
	}
});
