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

		<d2l-input-text id="level-name" value="[[entity.properties.name]]" on-change="_saveName" on-input="_saveNameOnInput" aria-invalid="[[isAriaInvalid(_nameInvalid)]]" aria-label$="[[localize('levelName')]]" disabled="[[!_canEditName]]" prevent-submit="">
		</d2l-input-text>
		<div class="operations" nopoints$="[[!_showPoints]]">
			<div class="points" hidden="[[!_showPoints]]" alt-percent-format$="[[_showAltPercentFormat(percentageFormatAlternate,_usesPercentage)]]">
				<d2l-input-text id="level-points" value="[[entity.properties.points]]" on-change="_savePoints" on-input="_savePointsOnInput" aria-invalid="[[isAriaInvalid(_pointsInvalid)]]" aria-label$="[[localize('levelPoints')]]" disabled="[[!_canEditPoints]]" size="1" prevent-submit="">
				</d2l-input-text>
				<div>[[_getPointsUnitText(entity)]]</div>
			</div>
			<d2l-button-icon id="remove" icon="d2l-tier1:delete" text="[[localize('removeLevel', 'name', entity.properties.name)]]" on-click="_handleDeleteLevel" hidden="[[!_canDelete]]" type="button">
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
		_usesPercentage: {
			type: Boolean,
			computed: '_computeUsesPercentage(entity)'
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
	// eslint-disable-next-line no-unused-vars
	_onEntityChanged: function(entity) {
		this._nameInvalid = false;
		this._pointsInvalid = false;
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
	_saveName: function(e) {
		var action = this.entity.getActionByName('update-name');
		if (action) {
			if (this._nameRequired && !e.target.value.trim()) {
				this.handleValidationError('level-name-bubble', '_nameInvalid', 'nameIsRequired');
			} else {
				this.toggleBubble('_nameInvalid', false, 'level-name-bubble');
				var fields = [{'name':'name', 'value':e.target.value}];
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-level-saved');
				}.bind(this)).catch(function(err) {
					this.handleValidationError('level-name-bubble', '_nameInvalid', 'nameSaveFailed', err);
				}.bind(this));
			}
		}
	},
	_savePoints: function(e) {
		var action = this.entity.getActionByName('update-points');
		if (action) {
			if (this._pointsRequired && !e.target.value.trim()) {
				if (this._usesPercentage) {
					this.handleValidationError('points-bubble', '_pointsInvalid', 'rangeStartRequired');
				} else {
					this.handleValidationError('points-bubble', '_pointsInvalid', 'pointsAreRequired');
				}
			} else {
				this.toggleBubble('_pointsInvalid', false, 'points-bubble');
				var fields = [{'name':'points', 'value':e.target.value}];
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-level-points-saved');
				}.bind(this)).catch(function(err) {
					if (this._usesPercentage) {
						this.handleValidationError('points-bubble', '_pointsInvalid', 'rangeStartInvalid', err);
					} else {
						this.handleValidationError('points-bubble', '_pointsInvalid', 'pointsSaveFailed', err);
					}
				}.bind(this));
			}
		}
	},
	_saveNameOnInput: function(e) {
		var action = this.entity.getActionByName('update-name');
		var value = e.target.value;
		this.debounce('input', function() {
			if (action) {
				if (this._nameRequired && !value.trim()) {
					this.handleValidationError('level-name-bubble', '_nameInvalid', 'nameIsRequired');
				} else {
					this.toggleBubble('_nameInvalid', false, 'level-name-bubble');
					var fields = [{'name': 'name', 'value': value}];
					this.performSirenAction(action, fields).then(function() {
						this.fire('d2l-rubric-level-saved');
					}.bind(this)).catch(function(err) {
						this.handleValidationError('level-name-bubble', '_nameInvalid', 'nameSaveFailed', err);
					}.bind(this));
				}
			}
		}.bind(this), 500);
	},
	_savePointsOnInput: function(e) {
		var action = this.entity.getActionByName('update-points');
		var value = e.target.value;
		this.debounce('input', function() {
			if (action) {
				if (this._pointsRequired && !value.trim()) {
					if (this._usesPercentage) {
						this.handleValidationError('points-bubble', '_pointsInvalid', 'rangeStartRequired');
					} else {
						this.handleValidationError('points-bubble', '_pointsInvalid', 'pointsAreRequired');
					}
				} else {
					this.toggleBubble('_pointsInvalid', false, 'points-bubble');
					var fields = [{'name': 'points', 'value': value}];
					this.performSirenAction(action, fields).then(function() {
						this.fire('d2l-rubric-level-points-saved');
					}.bind(this)).catch(function(err) {
						if (this._usesPercentage) {
							this.handleValidationError('points-bubble', '_pointsInvalid', 'rangeStartInvalid', err);
						} else {
							this.handleValidationError('points-bubble', '_pointsInvalid', 'pointsSaveFailed', err);
						}
					}.bind(this));
				}
			}
		}.bind(this), 500);
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
			this.fire('iron-announce', { text: this.localize('levelDeleted', 'name', name) }, { bubbles: true });
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-level-deleted');
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
