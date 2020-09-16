import '@polymer/polymer/polymer-legacy.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import './d2l-rubric-siren-autosave-action-behavior.js';
import '../localize-behavior.js';
import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-button/d2l-button-icon.js';
import '../d2l-rubric-entity-behavior.js';
import './d2l-rubric-dialog-behavior.js';
import './d2l-rubric-error-handling-behavior.js';
import './d2l-rubric-autosaving-input.js';
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

		<d2l-rubric-autosaving-input
			id="overall-level-name"
			value="{{_overallLevelName}}"
			on-save="_saveName"
			invalid="[[_nameInvalid]]"
			label="[[localize('overallLevelName')]]"
			enabled="[[_canEditName]]"
			pending-saves="[[_pendingNameSaves]]"
			editing="{{_nameChanging}}"
		></d2l-rubric-autosaving-input>
		<div class="operations" text-only$="[[!_hasRangeStart]]">
			<div class="points" hidden="[[!_hasRangeStart]]">
				<d2l-rubric-autosaving-input
					id="range-start"
					value="{{_rangeStart}}"
					on-save="_saveRangeStart"
					invalid="[[_rangeStartInvalid]]"
					label="[[localize('overallLevelRangeStart')]]"
					enabled="[[_canEditRangeStart]]"
					pending-saves="[[_pendingRangeStartSaves]]"
					editing="{{_rangeStartChanging}}"
				></d2l-rubric-autosaving-input>
				<div>[[localize('rangeStartOrMore')]]</div>
			</div>
			<d2l-button-icon id="remove" icon="d2l-tier1:delete" text="[[localize('removeOverallLevel', 'name', entity.properties.name)]]" on-click="_handleDeleteLevel" hidden="[[!_canDelete]]" type="button">
			</d2l-button-icon>
		</div>
		<template is="dom-if" if="[[_nameInvalid]]">
			<d2l-tooltip announced id="overall-level-name-bubble" class="is-error" for="overall-level-name" position="bottom">
				[[_nameInvalidError]]
			</d2l-tooltip>
		</template>
		<template is="dom-if" if="[[_rangeStartInvalid]]">
			<d2l-tooltip announced id="range-start-bubble" for="range-start" position="bottom">
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
		_unsavedRangeStart: {
			type: String
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
		D2L.PolymerBehaviors.Rubric.SirenAutosaveActionBehavior,
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
	_saveName: function(saveEvent) {
		var action = this.entity.getActionByName('update-name');
		if (action) {
			if (this._nameRequired && !saveEvent.value.trim()) {
				this.handleValidationError('overall-level-name-bubble', '_nameInvalid', 'nameIsRequired');
			} else {
				this.toggleBubble('_nameInvalid', false, 'overall-level-name-bubble');
				var fields = [{ 'name': 'name', 'value': saveEvent.value }];
				this.performAutosaveAction(action, fields, '_pendingNameSaves').then(function() {
					this.dispatchEvent(new CustomEvent('d2l-rubric-overall-level-saved', {
						bubbles: true,
						composed: true,
					}));
					this._updateName(this.entity, false);
				}.bind(this)).catch(function(err) {
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
	_saveRangeStart: function(saveEvent) {
		var action = this.entity.getActionByName('update-range-start');
		if (action) {
			if (this._rangeStartRequired && !saveEvent.value.trim()) {
				this.handleValidationError('range-start-bubble', '_rangeStartInvalid', 'rangeStartRequired');
			} else {
				this.toggleBubble('_rangeStartInvalid', false, 'range-start-bubble');
				var fields = [{'name':'rangeStart', 'value': saveEvent.value}];
				this._unsavedRangeStart = saveEvent.value;
				this.performAutosaveAction(action, fields, '_pendingRangeStartSaves').then(function() {
					this.dispatchEvent(new CustomEvent('d2l-rubric-overall-level-range-start-saved', {
						bubbles: true,
						composed: true,
					}));
					this._updateRangeStart(this.entity, false);

					var link = this.entity.getLinkByRel('self');
					if (link) {
						const saveRangeStartEvent = new CustomEvent('save-range-start', {
							detail: {
								href: link.href
							},
						});

						this.dispatchEvent(saveRangeStartEvent);
					}
				}.bind(this)).catch(function(err) {
					this.handleValidationError('range-start-bubble', '_rangeStartInvalid', 'rangeStartInvalid', err);
				}.bind(this));
			}
		}
	},
	saveRangeStartAfterError: function() {
		var action = this.entity.getActionByName('update-range-start');
		if (action && this._rangeStartInvalid) {
			var fields = [{'name':'rangeStart', 'value': this._unsavedRangeStart}];
			this.performAutosaveAction(action, fields, '_pendingRangeStartSaves').then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-overall-level-range-start-saved', {
					bubbles: true,
					composed: true,
				}));
				this._updateRangeStart(this.entity, false);
			}.bind(this)).catch(function(err) {
				this.handleValidationError('range-start-bubble', '_rangeStartInvalid', 'rangeStartInvalid', err);
			}.bind(this));
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
			secondaryMessage: action.title || this.localize('deleteLevelConfirmationText'),
			positiveButtonText: this.localize('deleteConfirmationYes'),
			negativeButtonText: this.localize('deleteConfirmationNo')
		}).then(function() {
			var name = this.entity.properties.name;

			announce(this.localize('overallLevelDeleted', 'name', name));

			this.performSirenAction(action).then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-overall-level-deleted', {
					bubbles: true,
					composed: true,
				}));
			}.bind(this)).then(function() {
				deleteButton.removeAttribute('disabled');
			}).catch(function(err) {
				deleteButton.removeAttribute('disabled');
				this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
					detail: {
						message: err.message,
					},
					bubbles: true,
					composed: true,
				}));
			}.bind(this));
		}.bind(this), function() {
			deleteButton.removeAttribute('disabled');
		});
	}
});
