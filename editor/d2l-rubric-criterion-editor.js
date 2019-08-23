import '@polymer/polymer/polymer-legacy.js';
import 'd2l-activity-alignments/d2l-select-outcomes.js';
import 'd2l-activity-alignments/d2l-activity-alignment-tags.js';
import 'd2l-table/d2l-table-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-inputs/d2l-input-textarea.js';
import 'd2l-inputs/d2l-input-text.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-table/d2l-tspan.js';
import '../d2l-rubric-entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../localize-behavior.js';
import './d2l-rubric-description-editor.js';
import '../d2l-rubric-feedback.js';
import './d2l-rubric-feedback-editor.js';
import './d2l-rubric-editor-cell-styles.js';
import './d2l-rubric-dialog-behavior.js';
import './d2l-rubric-error-handling-behavior.js';
import './simple-overlay.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-criterion-editor">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			:host {
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				background-color: white;
				border: 0;
				opacity: 0;
				max-height: 0;
				transition: opacity 100ms ease-out, max-height 400ms ease-out;

				--d2l-input-textarea: {
					display: block;
					height: 100%;
					min-height: 0;
					overflow: hidden;
					hyphens: auto;
					border-color: transparent;
					box-shadow: none;
					border-radius: 0;
					transition-property: none;
				};
			}

			:host(.show) {
				max-height: none;
				opacity: 1;
			}

			* {
				box-sizing: border-box;
			}

			d2l-input-textarea {
				display: block;
				flex-grow: 1;
				width: 100%;
			}

			.criterion-feedback-header {
				background-color: var(--d2l-table-header-background-color);
			}

			.criterion-name {
				display: flex;
				flex-direction: column;
			}

			.criterion-detail {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
			}

			.criterion-detail .cell {
				display: flex;
				flex-direction: column;
			}

			.criterion-text, .criterion-feedback {
				display: flex;
				flex-direction: row;
			}

			#outcometag{
				border-right: 1px solid var(--d2l-color-galena);
				margin-right: 50px;
				display: inline-flex;
			}

			#tag{
				margin-left: 10px;
				margin-top: 6px;
				margin-bottom: 6px;
			}

			#outcomeText{
				margin-left: 16px;
				margin-top: 13px;
				margin-bottom: 3px;
			}

			.feedback-arrow {
				margin-top: -25px;
				margin-left: 30px;
				width: 0;
				height: 0;
				border: 12px solid transparent;
				position: absolute;
				transition-property: border-color;
				transition-timing-function: ease;
				transition: border-color 0.5s;
				border-bottom-color: var(--d2l-color-galena);
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

			.criterion-text {
				flex: 2 1 auto;
			}

			.criterion-feedback {
				flex: 1 1 auto;
			}

			/* note start: to fix border overflow clipping */
			.criterion-text .cell {
				padding: 1px;
			}

			.criterion-feedback .cell {
				padding: 1px;
			}
			/* note end */

			.out-of {
				display: flex;
				justify-content: center;
				padding-top: 1.4rem;
			}

			.criterion-detail .criterion-feedback-header {
				@apply --d2l-body-compact-text;
				flex: 0 0 auto;
				padding: 0.3rem 0.5rem;
				font-weight: 700;
			}

			.criterion-detail[is-holistic] {
				border-right: 1px solid var(--d2l-color-galena);
				border-bottom: 1px solid var(--d2l-color-galena);
				border-bottom-right-radius: var(--d2l-table-border-radius);
				border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			.criterion-detail[is-holistic] .criterion-feedback div:first-of-type {
				border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			:dir(rtl) .criterion-detail[is-holistic] .criterion-feedback div:first-of-type {
				border-bottom-left-radius: 0;
			}

			:dir(rtl) .criterion-detail[is-holistic] .criterion-feedback div:last-of-type {
				border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			.col-last d2l-input-text {
				width: 2.5rem;
			}

			.gutter-left, .gutter-right {
				margin-top: 1rem;
			}

			.gutter-left[is-holistic] {
				width: calc(var(--d2l-rubric-editor-start-gutter-width) + 2.6rem);
			}
			.gutter-right[is-holistic] {
				width: calc(var(--d2l-rubric-editor-end-gutter-width) + 2.6rem);
			 }

			.gutter-left[text-only], .gutter-right[text-only] {
				margin-top: 0;
			}

			.with-margin {
				margin: 24px 40px;
			}

			.scrollable {
				border: 1px solid lightgray;
				padding: 24px;
				display: flex;
				flex-direction: column;
			}

			:dir(rtl) .criterion-remove {
				right: auto;
				left: -2.5rem;
			}

			#out-of-textbox {
				margin: 0 0.5rem;
				min-width: calc(2.25rem + 1em);
			}

			#browseOutcomesButton{
				margin-bottom: 5px;
				margin-left: 5px;
			}

			#closeButton{
				right: 0;
				margin-top: -60px;
				position: absolute;
				margin-right: 5px;
			}

			[hidden] {
				display: none;
			}

		</style>
		<div class="gutter-left" text-only$="[[!_hasOutOf]]" is-holistic$="[[isHolistic]]">
			<slot name="gutter-left"></slot>
		</div>

		<simple-overlay id="overlay" tabindex="-1" scroll-action="lock" class="with-margin scrollable"  with-backdrop>
			<div>
				<h2>[[browseOutcomesText]]</h2>
				<d2l-button-icon autofocus aria-label$="[[localize('closeDialog')]]" icon="d2l-tier1:close-large" id="closeButton" on-tap= "_closeBrowseOutcomes"></d2l-button-icon>
			</div>

			<d2l-select-outcomes
			  rel= "[[_getOutcomeRel(_isFlagOn, isHolistic, _isAlignmentTagListEmpty)]]"
              href="[[_getOutcomeHref(entity, _isFlagOn, isHolistic, _isAlignmentTagListEmpty)]]"
			  token="[[token]]"
			  empty="{{_isOutcomeEmpty}}"
			>
			</d2l-select-outcomes>
		</simple-overlay>

		<div style="display:flex; flex-direction:column;">
			<div style="display:flex">
				<div class="cell col-first criterion-name" hidden$="[[isHolistic]]">
					<d2l-input-textarea id="name" aria-invalid="[[isAriaInvalid(_nameInvalid)]]" aria-label$="[[localize('criterionNameAriaLabel')]]" disabled="[[!_canEdit]]" value="[[entity.properties.name]]" placeholder="[[_getNamePlaceholder(localize, displayNamePlaceholder)]]" on-change="_saveName" on-input="_saveNameOnInput">
					</d2l-input-textarea>
					<d2l-button-subtle id= "browseOutcomesButton" hidden$="[[_hideBrowseOutcomesButton]]" type="button" on-tap= "_showBrowseOutcomes" text="[[outcomesTitle]]"></d2l-button-subtle>
					<template is="dom-if" if="[[_nameInvalid]]">
						<d2l-tooltip id="criterion-name-bubble" class="is-error" for="name" position="bottom">
							[[_nameInvalidError]]
						</d2l-tooltip>
					</template>
				</div>
				<div class="criterion-detail" is-holistic$="[[isHolistic]]" style$="width: [[criterionDetailWidth]]px;">
					<div class="criterion-text">
						<template is="dom-repeat" as="criterionCell" items="[[_getCriterionCells(entity)]]">
							<div class="cell">
								<d2l-rubric-description-editor key-link-rels="[[_getCellKeyRels()]]" href="[[_getSelfLink(criterionCell)]]" token="[[token]]" aria-label-langterm="criterionDescriptionAriaLabel" criterion-name="[[entity.properties.name]]" rich-text-enabled="[[richTextEnabled]]"></d2l-rubric-description-editor>
							</div>
						</template>
					</div>
					<template is="dom-if" if="[[!isHolistic]]" restamp>
						<div class="cell criterion-feedback-header">[[localize('initialFeedback')]]</div>
						<div class="criterion-feedback">
							<template is="dom-repeat" as="criterionCell" items="[[_getCriterionCells(entity)]]">
								<div class="cell">
									<d2l-rubric-feedback-editor key-link-rels="[[_getCellKeyRels()]]" href="[[_getSelfLink(criterionCell)]]" token="[[token]]" aria-label-langterm="criterionFeedbackAriaLabel" criterion-name="[[entity.properties.name]]" rich-text-enabled="[[richTextEnabled]]">
									</d2l-rubric-feedback-editor>
								</div>
							</template>
						</div>
					</template>
				</div>
				<div text-only$="[[!_hasOutOf]]" class="cell col-last out-of" hidden$="[[isHolistic]]">
					<span hidden="[[!_hasOutOf]]">
						<template is="dom-if" if="[[!_outOfIsEditable]]">
							<div tabindex="0" aria-label$="[[localize('criterionOutOf', 'name', entity.properties.name, 'value', _outOf)]]">
								/ [[_outOf]]
							</div>
						</template>
						<template is="dom-if" if="[[_outOfIsEditable]]">
							/ <d2l-input-text id="out-of-textbox" on-change="_saveOutOf" on-input="_saveOutOfOnInput" value="[[_outOf]]" aria-invalid="[[isAriaInvalid(_outOfInvalid)]]" aria-label$="[[localize('criterionOutOf', 'name', entity.properties.name, 'value', _outOf)]]" prevent-submit="">
							</d2l-input-text>
							<template is="dom-if" if="[[_outOfInvalid]]">
								<d2l-tooltip id="out-of-bubble" class="is-error" for="out-of-textbox" position="bottom">
									[[_outOfInvalidError]]
								</d2l-tooltip>
							</template>
						</template>
					</span>
				</div>

				<div class="gutter-right" text-only$="[[!_hasOutOf]]" is-holistic$="[[isHolistic]]">
					<d2l-button-icon id="remove" hidden$="[[!_canDelete]]" icon="d2l-tier1:delete" text="[[localize('removeCriterion', 'name', entity.properties.name)]]" on-tap="_handleDeleteCriterion" type="button"></d2l-button-icon>
				</div>
				</div>
				<div class="cell" id="outcometag" hidden$="[[_hideOutcomes]]">
					<div class="feedback-arrow" data-mobile$="[[!_largeScreen]]" hidden$="[[_hideOutcomes]]">
						<div class="feedback-arrow-inner" hidden$="[[_hideOutcomes]]"></div>
					</div>
					<h5 id="outcomeText" hidden$="[[_hideOutcomes]]">[[outcomesTitle]]</h4>
					<d2l-activity-alignment-tags  hidden$="[[_hideOutcomes]]" empty="{{_isAlignmentTagListEmpty}}" id="tag" href="[[_getOutcomeHref(entity, _isFlagOn, isHolistic, _isAlignmentTagListEmpty)]]" token="[[token]]" browse-outcomes-text="[[browseOutcomesText]]">
					</d2l-activity-alignment-tags>
				</div>
			</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criterion-editor',

	properties: {
		criterionDetailWidth: {
			type: Number,
			value: 0
		},
		/**
		* Outcomes langterm set in config variables
		*/
		outcomesTitle: {
			type: String
		},
		browseOutcomesText: {
			type: String
		},
		_canEdit: {
			type: Boolean,
			computed: '_canEditCriterion(entity)',
		},
		_canDelete: {
			type: Boolean,
			computed: '_canDeleteCriterion(entity)',
		},
		_nameRequired: {
			type: Boolean,
			computed: '_isNameRequired(entity)',
		},
		_hideBrowseOutcomesButton:{
			type: Boolean,
			computed: '_canHideBrowseOutcomesButton(_isFlagOn, isHolistic, _isAlignmentTagListEmpty, _isOutcomeEmpty, outcomesToolIntegrationEnabled)',
		},
		_hideOutcomes:{
			type: Boolean,
			value: true,
			computed: '_canHideOutcomes(isHolistic, _isAlignmentTagListEmpty)',
		},
		_isAlignmentTagListEmpty:{
			type:Boolean,
		},
		_isOutcomeEmpty: {
			type: Boolean,
		},
		_nameInvalid: {
			type: Boolean,
			value: false,
		},
		_nameInvalidError: {
			type: String,
			value: null,
		},
		_hasOutOf: {
			type: Boolean,
			computed: '_computeHasOutOf(entity)'
		},
		isHolistic: {
			type: Boolean,
			value: false
		},
		_isFlagOn: {
			type: Boolean,
			computed: '_computeIsFlagOn(entity)'
		},
		_outOfIsEditable: {
			type: Boolean,
			computed: '_isOutOfEditable(entity)'
		},
		_outOf: {
			type: Number,
			computed: '_getOutOfValue(entity)',
		},
		_outOfInvalid: {
			type: Boolean,
			value: false
		},
		_outOfInvalidError: {
			type: String,
			value: null
		},
		outcomesToolIntegrationEnabled: Boolean,
		displayNamePlaceholder: {
			type: Boolean,
		},
		animating: {
			type: Boolean,
			value: false
		},
		richTextEnabled: Boolean
	},
	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.DialogBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior,
	],
	observers: ['_widthChange(criterionDetailWidth)'],

	ready: function() {
		this.addEventListener('d2l-activity-alignment-tags-update', this._showBrowseOutcomes);
		this.addEventListener('d2l-alignment-list-added', this._closeBrowseOutcomes);
		this.addEventListener('d2l-alignment-list-cancelled', this._closeBrowseOutcomes);
		this.addEventListener('d2l-select-outcomes-closed', this._closeBrowseOutcomes);
		this.addEventListener('siren-entity-loading-fetched', this._resizeOverlay);
	},
	// eslint-disable-next-line no-unused-vars
	_widthChange: function(criterionDetailWidth) {
		this.fire('d2l-rubric-criterion-detail-width-changed', {});
	},
	_onEntityChanged: function(entity, oldEntity) {
		if (!entity) {
			return;
		}
		if (!this.animating && !oldEntity) {
			setTimeout(function() {
				this.$$('#name').textarea.select();
				this._transitionElement(this, 10);
				this.scrollIntoView();
			}.bind(this));
		} else {
			this.classList.add('show');
		}
	},

	_getCriterionCells: function(entity) {
		var entities = entity && entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterionCell);
		return entities || [];
	},

	_computeHasOutOf: function(entity) {
		return entity && entity.properties && entity.properties.outOf;
	},

	_saveName: function(e) {
		var action = this.entity.getActionByName('update');
		if (action) {
			if (this._nameRequired && !e.target.value.trim()) {
				this.handleValidationError('criterion-name-bubble', '_nameInvalid', 'nameIsRequired');
				return;
			} else {
				this.toggleBubble('_nameInvalid', false, 'criterion-name-bubble');
			}
			var fields = [{ 'name': 'name', 'value': e.target.value }];
			this.performSirenAction(action, fields).then(function() {
				this.fire('d2l-rubric-criterion-saved');
			}.bind(this)).catch(function(err) {
				this.handleValidationError('criterion-name-bubble', '_nameInvalid', 'nameSaveFailed', err);
			}.bind(this));
		}
	},

	_saveNameOnInput: function(e) {
		var action = this.entity.getActionByName('update');
		var value = e.target.value;
		this.debounce('input', function() {
			if (action) {
				if (this._nameRequired && !value.trim()) {
					this.handleValidationError('criterion-name-bubble', '_nameInvalid', 'nameIsRequired');
					return;
				} else {
					this.toggleBubble('_nameInvalid', false, 'criterion-name-bubble');
				}
				var fields = [{ 'name': 'name', 'value': value }];
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-criterion-saved');
				}.bind(this)).catch(function(err) {
					this.handleValidationError('criterion-name-bubble', '_nameInvalid', 'nameSaveFailed', err);
				}.bind(this));
			}
		}.bind(this), 500);
	},

	_saveOutOf: function(e) {
		var action = this.entity.getActionByName('update-outof');
		if (action) {
			if (!e.target.value.trim()) {
				this.handleValidationError('out-of-bubble', '_outOfInvalid', 'pointsAreRequired');
				return;
			} else {
				this.toggleBubble('_outOfInvalid', false, 'out-of-bubble');
			}
			var fields = [{ 'name': 'outOf', 'value': e.target.value }];
			this.performSirenAction(action, fields).then(function() {
				this.fire('d2l-rubric-criterion-saved');
			}.bind(this)).catch(function(err) {
				this.handleValidationError('out-of-bubble', '_outOfInvalid', 'pointsSaveFailed', err);
			}.bind(this));
		}
	},

	_saveOutOfOnInput: function(e) {
		var action = this.entity.getActionByName('update-outof');
		var value = e.target.value;
		this.debounce('input', function() {
			if (action) {
				if (!value.trim()) {
					this.handleValidationError('out-of-bubble', '_outOfInvalid', 'pointsAreRequired');
					return;
				} else {
					this.toggleBubble('_outOfInvalid', false, 'out-of-bubble');
				}
				var fields = [{'name': 'outOf', 'value': value}];
				this.performSirenAction(action, fields).then(function() {
					this.fire('d2l-rubric-criterion-saved');
				}.bind(this)).catch(function(err) {
					this.handleValidationError('out-of-bubble', '_outOfInvalid', 'pointsSaveFailed', err);
				}.bind(this));
			}
		}.bind(this), 500);
	},

	_canEditCriterion: function(entity) {
		return entity && entity.hasActionByName('update');
	},

	_canDeleteCriterion: function(entity) {
		return entity && entity.hasActionByName('delete');
	},

	_isNameRequired: function(entity) {
		var action = entity && entity.getActionByName('update');
		if (!action) {
			return false;
		}
		var field = action.getFieldByName('name');
		if (!field) {
			return false;
		}
		return field.hasClass('required');
	},

	_getNamePlaceholder: function(localize, displayNamePlaceholder) {
		if (displayNamePlaceholder) {
			return localize('criterionPlaceholder');
		}
		return '';
	},

	_handleDeleteCriterion: function(e) {
		var action = this.entity.getActionByName('delete');
		if (!action) return;
		var deleteButton = e.currentTarget;
		deleteButton.setAttribute('disabled', '');
		this.openConfirm({
			title: this.localize('deleteCriterionConfirmationTitle'),
			secondaryMessage: this.localize('deleteCriterionConfirmationText'),
			positiveButtonText: this.localize('deleteConfirmationYes'),
			negativeButtonText: this.localize('deleteConfirmationNo')
		}).then(function() {
			var name = this.entity.properties.name;
			this._transitionElement(this, 0);
			this.fire('iron-announce', { text: this.localize('criterionDeleted', 'name', name) }, { bubbles: true });
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-criterion-deleted');
			}.bind(this)).then(function() {
				deleteButton.removeAttribute('disabled');
			}).catch(function(err) {
				deleteButton.removeAttribute('disabled');
				this.fire('d2l-rubric-editor-save-error', { message: err.message });
			}.bind(this));
		}.bind(this), function() {
			deleteButton.removeAttribute('disabled');
		});
	},
	_getOutOfValue: function(entity) {
		if (entity && entity.properties && entity.properties.outOf) {
			return entity.properties.outOf;
		}
	},

	_isOutOfEditable: function(entity) {
		return entity && entity.hasActionByName('update-outof');
	},

	_getCellKeyRels: function() {
		return [this.HypermediaRels.Rubrics.level, 'self'];
	},

	// hide browse outcomes button when holistic or LD flag is off or tag list is empty
	// there is no outcome to browse
	_canHideBrowseOutcomesButton: function(_isFlagOn, isHolistic, _isAlignmentTagListEmpty, _isOutcomeEmpty, outcomesToolIntegrationEnabled) {
		return !_isFlagOn || isHolistic || !_isAlignmentTagListEmpty || _isOutcomeEmpty || !outcomesToolIntegrationEnabled;
	},

	_canHideOutcomes: function(isHolistic, _isAlignmentTagListEmpty) {
		return isHolistic || _isAlignmentTagListEmpty;
	},

	_computeIsFlagOn: function(entity) {
		return entity &&
			this.HypermediaRels.Activities &&
			this.HypermediaRels.Activities.activityUsage &&
			entity.getLinkByRel(this.HypermediaRels.Activities.activityUsage);
	},

	_canCheckOutcomes: function(_isFlagOn, isHolistic, _isAlignmentTagListEmpty) {
		return _isFlagOn && !isHolistic && _isAlignmentTagListEmpty;
	},

	_getOutcomeRel: function(_isFlagOn, isHolistic, _isAlignmentTagListEmpty) {
		if (this.HypermediaRels && this.HypermediaRels.Activities && this._canCheckOutcomes(_isFlagOn, isHolistic, _isAlignmentTagListEmpty)) {
			return this.HypermediaRels.Activities.activityUsage;
		}
	},

	_getOutcomeHref: function(entity, _isFlagOn, isHolistic, _isAlignmentTagListEmpty) {
		if (entity && this.HypermediaRels.Activities && this._canCheckOutcomes(_isFlagOn, isHolistic, _isAlignmentTagListEmpty)) {
			return entity.getLinkByRel(this.HypermediaRels.Activities.activityUsage).href;
		}
	},

	_showBrowseOutcomes: function() {
		this.$.overlay.open();
	},

	_closeBrowseOutcomes: function() {
		this.$.overlay.close();
	},

	_resizeOverlay: function() {
		this.$.overlay.refit();
	}
});
