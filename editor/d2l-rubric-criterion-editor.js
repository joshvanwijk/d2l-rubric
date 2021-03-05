import '@brightspace-ui/core/components/dialog/dialog.js';
import '@polymer/polymer/polymer-legacy.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import 'd2l-activity-alignments/d2l-select-outcomes.js';
import 'd2l-activity-alignments/d2l-select-outcomes-hierarchical.js';
import 'd2l-activity-alignments/d2l-activity-alignment-tags.js';
import 'd2l-table/d2l-table-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import '@brightspace-ui/core/components/inputs/input-textarea.js';
import 'd2l-inputs/d2l-input-text.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/dropdown/dropdown-more.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
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
import './d2l-rubric-autosaving-input.js';
import '../telemetry-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');
import 'fastdom/fastdom.js';

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criterion-editor">
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
					background-color: transparent;
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
				z-index: 0;
				--d2l-input-border-radius: 0;
				--d2l-input-border-color: transparent;
			}

			d2l-dropdown-more {
				margin: 6px 6px 0px 0px;
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

			#hierarchicaloverlay {
				width: 800px;
			}

			#outcometag:not([hidden]){
				border-left: 1px solid var(--d2l-color-galena);
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

			.criterion-detail .cell {
				padding: 0px;
			}

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
				border-bottom: 1px solid var(--d2l-color-galena);
				border-bottom-right-radius: var(--d2l-table-border-radius);
				border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			:dir(ltr) .criterion-detail[is-holistic] .criterion-text div:first-of-type {
				border-left: 1px solid var(--d2l-color-galena);
				border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			:dir(ltr) .criterion-detail[is-holistic] .criterion-text div:last-of-type {
				border-right: 1px solid var(--d2l-color-galena);
				border-bottom-right-radius: var(--d2l-table-border-radius);
			}

			:dir(rtl) .criterion-detail[is-holistic] .criterion-text div:first-of-type {
				border-right: 1px solid var(--d2l-color-galena);
				border-bottom-right-radius: var(--d2l-table-border-radius);
			}

			:dir(rtl) .criterion-detail[is-holistic] .criterion-text div:last-of-type {
				border-left: 1px solid var(--d2l-color-galena);
				border-bottom-left-radius: var(--d2l-table-border-radius);
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

			.select-outcomes-hierarchical {
				overflow-y: auto;
			}

			:dir(rtl) .criterion-remove {
				right: auto;
				left: -2.5rem;
			}

			#out-of-textbox {
				margin: 0 0.5rem;
				display: inline-block;
				width: 2.5rem;
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

			.input-action {
				display: flex;
				align-items: flex-start;
			}

		</style>

		<rubric-siren-entity href="[[rubricLevelsHref]]" token="[[token]]" entity="{{_rubricLevelsEntity}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[_loaMappingHref]]" token="[[token]]" entity="{{_loaMappingEntity}}"></rubric-siren-entity>

		<div class="gutter-left" text-only$="[[!_hasOutOf]]" is-holistic$="[[isHolistic]]">
			<slot name="gutter-left"></slot>
		</div>

		<d2l-dialog title-text="[[browseOutcomesText]]" id="overlay">
			<d2l-select-outcomes
				rel= "[[_getOutcomeRel(_isFlagOn, isHolistic)]]"
				href="[[_getOutcomeHref(entity, _isFlagOn, isHolistic)]]"
				token="[[token]]"
				empty="{{_isOutcomeEmpty}}"
			>
			</d2l-select-outcomes>
		</d2l-dialog>

		<d2l-dialog title-text="[[browseOutcomesText]]" id="hierarchicaloverlay">
			<d2l-select-outcomes-hierarchical
				class="select-outcomes-hierarchical"
				rel= "[[_getOutcomeRel(_isFlagOn, isHolistic)]]"
				href="[[_getOutcomesHierarchicalHref(entity, isHolistic)]]"
				align-button-text="[[alignOutcomesText]]"
				token="[[token]]"
				empty="{{_isOutcomeEmpty}}"
				max-height="[[_hierarchicalHeight]]"
			>
			</d2l-select-outcomes-hierarchical>
		</d2l-dialog>

		<div style="display:flex; flex-direction:column;">
			<div style="display:flex">
				<div class="cell col-first criterion-name" hidden$="[[isHolistic]]">
					<div class="input-action">
						<d2l-input-textarea id="name" aria-invalid="[[isAriaInvalid(_nameInvalid)]]" aria-label$="[[_criterionNameAriaLabel]]" disabled="[[!_canEdit]]" max-rows="-1" value="{{_getDisplayedName(_nameFocused,_nameInvalid,_pendingNameSaves,_enteredName,_criterionName)}}" placeholder="[[_getNamePlaceholder(localize, displayNamePlaceholder, positionNumber)]]" on-blur="_nameBlurHandler" on-focus="_nameFocusHandler" on-input="_nameInputHandler">
						</d2l-input-textarea>
						<d2l-dropdown-more hidden$="[[_hideActionMenu(rubricsCriterionAction, _canCopy, _canDelete)]]" text="[[localize('actionsforCriterion', 'criterionName', _criterionName)]]">
							<d2l-dropdown-menu>
								<d2l-menu>
									<d2l-menu-item text="[[localize('copyRow')]]" aria-label="[[localize('copyCriterion', 'criterionName', _criterionName)]]" hidden$="[[!_canCopy]]" on-d2l-menu-item-select="_handleCopyCriterion"></d2l-menu-item>
									<d2l-menu-item text="[[localize('deleteRow')]]" aria-label="[[localize('deleteCriterion', 'criterionName', _criterionName)]]" hidden$="[[!_canDelete]]" on-d2l-menu-item-select="_handleDeleteCriterion"></d2l-menu-item>
								</d2l-menu>
							</d2l-dropdown-menu>
						</d2l-dropdown-more>
					</div>
					<d2l-button-subtle id= "browseOutcomesButton" hidden$="[[_hideBrowseOutcomesButton]]" type="button" on-click= "_showBrowseOutcomes" text="[[outcomesTitle]]"></d2l-button-subtle>
					<template is="dom-if" if="[[_nameInvalid]]">
						<d2l-tooltip announced id="criterion-name-bubble" class="is-error" for="name" position="bottom">
							[[_nameInvalidError]]
						</d2l-tooltip>
					</template>
				</div>
				<div class="criterion-detail" is-holistic$="[[isHolistic]]" style$="width: [[criterionDetailWidth]]px;">
					<div class="criterion-text">
						<template is="dom-repeat" as="criterionCell" index-as="cellIndex" items="[[_getCriterionCells(entity)]]" rendered-item-count="{{criterionCellCount}}">
							<div class="cell" style$="[[_getCellStyle(criterionCell, cellIndex, _rubricLevels, _loaLevels, rubricLevelLoaMapping, firstRow)]]">
								<d2l-rubric-description-editor key-link-rels="[[_getCellKeyRels()]]" href="[[_getSelfLink(criterionCell)]]" token="[[token]]" aria-label-langterm="criterionDescriptionAriaLabel" criterion-name="[[_criterionName]]" rich-text-enabled="[[richTextEnabled]]" updating-levels="{{updatingLevels}}" first-and-corner$="[[_isFirstAndCorner(isHolistic, index, criterionCellCount)]]" last-and-corner$="[[_isLastAndCorner(isHolistic, index, criterionCellCount)]]"></d2l-rubric-description-editor>
							</div>
						</template>
					</div>
					<template is="dom-if" if="[[!isHolistic]]" restamp>
						<div class="cell criterion-feedback-header">[[localize('initialFeedback')]]</div>
						<div class="criterion-feedback">
							<template is="dom-repeat" as="criterionCell" index-as="cellIndex" items="[[_getCriterionCells(entity)]]">
								<div class="cell" style$="[[_getCellStyle(criterionCell, cellIndex, _rubricLevels, _loaLevels, rubricLevelLoaMapping)]]">
									<d2l-rubric-feedback-editor key-link-rels="[[_getCellKeyRels()]]" href="[[_getSelfLink(criterionCell)]]" token="[[token]]" aria-label-langterm="criterionFeedbackAriaLabel" criterion-name="[[_criterionName]]" rich-text-enabled="[[richTextEnabled]]" updating-levels="{{updatingLevels}}">
									</d2l-rubric-feedback-editor>
								</div>
							</template>
						</div>
					</template>
				</div>
				<div text-only$="[[!_hasOutOf]]" class="cell col-last out-of" hidden$="[[isHolistic]]">
					<span hidden="[[!_hasOutOf]]">
						<template is="dom-if" if="[[!_outOfIsEditable]]">
							<div tabindex="0" aria-label$="[[localize('criterionOutOf', 'name', _criterionName, 'value', _outOf)]]">
								/ [[_outOf]]
							</div>
						</template>
						<template is="dom-if" if="[[_outOfIsEditable]]">
							/ <d2l-rubric-autosaving-input
								id="out-of-textbox"
								value="{{_outOf}}"
								on-save="_saveOutOf"
								invalid="[[_outOfInvalid]]"
								label="[[localize('criterionOutOf', 'name', _criterionName, 'value', _outOf)]]"
								enabled="[[_canEdit]]"
								pending-saves="[[_pendingOutOfSaves]]"
								editing="{{_outOfChanging}}"
							></d2l-rubric-autosaving-input>
							<template is="dom-if" if="[[_outOfInvalid]]">
								<d2l-tooltip announced id="out-of-bubble" class="is-error" for="out-of-textbox" position="bottom">
									[[_outOfInvalidError]]
								</d2l-tooltip>
							</template>
						</template>
					</span>
				</div>

				<div class="gutter-right" text-only$="[[!_hasOutOf]]" is-holistic$="[[isHolistic]]">
					<d2l-button-icon id="remove" hidden$="[[_canHideDeleteIcon(_canDelete, rubricsCriterionAction)]]" icon="d2l-tier1:delete" text="[[localize('removeCriterion', 'name', _criterionName)]]" on-click="_handleDeleteCriterion" type="button"></d2l-button-icon>
				</div>
			</div>
			<div class="cell" id="outcometag" hidden$="[[_hideOutcomes]]">
				<div class="feedback-arrow" data-mobile$="[[!_largeScreen]]" hidden$="[[_hideOutcomes]]">
					<div class="feedback-arrow-inner" hidden$="[[_hideOutcomes]]"></div>
				</div>
				<h5 id="outcomeText" hidden$="[[_hideOutcomes]]">[[outcomesTitle]]</h4>
				<d2l-activity-alignment-tags  hidden$="[[_hideOutcomes]]" empty="{{_isAlignmentTagListEmpty}}" id="tag" href="[[_getOutcomeHref(entity, _isFlagOn, isHolistic)]]" token="[[token]]" browse-outcomes-text="[[browseOutcomesText]]">
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
		criterionCellCount: {
			type: Number
		},
		positionNumber: {
			type: String,
			observer: '_getCriterionNameAriaLabel'
		},
		_criterionNameAriaLabel: {
			type: String
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
		alignOutcomesText: {
			type: String
		},
		firstRow: {
			reflectToAttribute: true,
			type: Boolean,
			value: false
		},
		rubricLevelsHref: {
			reflectToAttribute: true,
			type: String
		},
		_rubricLevels: Array,
		_rubricLevelsEntity: {
			type: Object,
			value: null
		},
		_loaLevels: Array,
		_loaMappingHref: String,
		_loaMappingEntity: {
			type: Object,
			value: null
		},
		_canEdit: {
			type: Boolean,
			computed: '_canEditCriterion(entity)',
		},
		_canDelete: {
			type: Boolean,
			computed: '_canDeleteCriterion(entity)',
		},
		_canCopy: {
			type: Boolean,
			computed: '_canCopyCriterion(entity)',
		},
		_criterionName: {
			type: String
		},
		_nameRequired: {
			type: Boolean,
			computed: '_isNameRequired(entity)',
		},
		_enteredName: {
			type: String
		},
		_nameFocused: {
			type: Boolean,
			value: false
		},
		_nameChanging: {
			type: Boolean,
			value: false
		},
		_pendingNameSaves: {
			type: Number,
			value: 0
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
		_isHierarchicalFlagOn: {
			type: Boolean,
			computed: '_computeIsHierarchicalFlagOn(entity, _isFlagOn)'
		},
		_outOfIsEditable: {
			type: Boolean,
			computed: '_isOutOfEditable(entity)'
		},
		_outOf: {
			type: Number
		},
		_outOfInvalid: {
			type: Boolean,
			value: false
		},
		_outOfInvalidError: {
			type: String,
			value: null
		},
		_outOfChanging: {
			type: Boolean,
			value: false
		},
		_pendingOutOfSaves: {
			type: Number,
			value: 0
		},
		outcomesToolIntegrationEnabled: Boolean,
		displayNamePlaceholder: {
			type: Boolean,
		},
		animating: {
			type: Boolean,
			value: false
		},
		richTextEnabled: Boolean,
		updatingLevels: {
			type: Boolean
		},
		rubricLevelLoaMapping: {
			type: Object
		},
		_hierarchicalHeight: {
			type: Number
		},
		rubricsCriterionAction: {
			type: Boolean,
			value: false
		},
		shouldFocus: {
			type: Boolean,
			value: false
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Rubric.SirenAutosaveActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.DialogBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior,
		D2L.PolymerBehaviors.Rubric.DropdownMenuBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],
	observers: [
		'_onLoaMappingEntityChanged(_loaMappingEntity)',
		'_onRubricLevelsEntityChanged(_rubricLevelsEntity)',
		'_widthChange(criterionDetailWidth)'
	],

	ready: function() {
		this.addEventListener('d2l-activity-alignment-tags-update', this._showBrowseOutcomes);
		this.addEventListener('d2l-alignment-list-added', this._closeBrowseOutcomes);
		this.addEventListener('d2l-alignment-list-cancelled', this._closeBrowseOutcomes);
	},
	// eslint-disable-next-line no-unused-vars
	_widthChange: function(criterionDetailWidth) {
		this.dispatchEvent(new CustomEvent('d2l-rubric-criterion-detail-width-changed', {
			bubbles: true,
			composed: true,
		}));
	},
	_onEntityChanged: function(entity, oldEntity) {
		if (!entity) {
			return;
		}

		var selfLinkChanged = this._getSelfLink(entity) !== this._getSelfLink(oldEntity);
		var nameChanged = oldEntity ? entity.properties.name !== oldEntity.properties.name : true;
		if (selfLinkChanged || nameChanged) {
			this._updateName(entity, selfLinkChanged);
		}
		var outOfChanged = oldEntity ? entity.properties.outOf !== oldEntity.properties.outOf : true;
		if (selfLinkChanged || outOfChanged) {
			this._updateOutOf(entity, selfLinkChanged);
		}

		if (!this.animating && this.shouldFocus) {
			this.shouldFocus = false;
			setTimeout(function() {
				this.$$('#name').select();
				this._transitionElement(this, 10);

				fastdom.mutate(function() {
					this.style.maxHeight = null;
				}.bind(this));

				this.scrollIntoView();
			}.bind(this));
		} else {
			this.classList.add('show');
		}
	},

	_onRubricLevelsEntityChanged: function(entity) {
		if (!entity) {
			return;
		}

		this._rubricLevels = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level);
		this._loaMappingHref = this._getLoaMappingLink(entity);

		if (!this._loaMappingHref) {
			this._loaMappingEntity = null;
		}
	},

	_onLoaMappingEntityChanged: function(entity) {
		if (!entity) {
			this._loaLevels = [];
			return;
		}

		this._loaLevels = entity.getSubEntitiesByClass('level-of-achievement');
	},

	_resolveRubricLevel: function(rubricLevels, rubricLevelHref) {
		if (!rubricLevelHref || !rubricLevels || !rubricLevels.length) {
			return null;
		}

		for (let i = 0; i < rubricLevels.length; i++) {
			const rubricLevel = rubricLevels[i];

			if (this._getSelfLink(rubricLevel) === rubricLevelHref) {
				return rubricLevel;
			}
		}

		return null;
	},

	_resolveLoaLevel: function(loaLevels, loaLevelHref) {
		if (!loaLevelHref || !loaLevels || !loaLevels.length) {
			return null;
		}

		for (let i = 0; i < loaLevels.length; i++) {
			const loaLevel = loaLevels[i];

			if (this._getSelfLink(loaLevel) === loaLevelHref) {
				return loaLevel;
			}
		}

		return null;
	},

	_getLoaMappingLink: function(entity) {
		var link = entity && entity.getLinkByRel('loa-levels');
		return link && link.href || '';
	},

	_getRubricLevelLink: function(entity) {
		var link = entity && entity.getLinkByRel('https://rubrics.api.brightspace.com/rels/level');
		return link && link.href || '';
	},

	_getLoaLevelLink: function(entity) {
		var link = entity && entity.getLinkByRel && entity.getLinkByRel('https://achievements.api.brightspace.com/rels/level');
		return link && link.href || '';
	},

	_getCellStyle: function(cell, cellIndex, rubricLevels, loaLevels, rubricLevelLoaMapping, topBorder) {
		const styles = [];

		if (loaLevels && loaLevels.length) {
			const rubricLevelHref = this._getRubricLevelLink(cell);
			const rubricLevelEntity = this._resolveRubricLevel(rubricLevels, rubricLevelHref);
			const loaLink = rubricLevelLoaMapping[rubricLevelHref]
				? rubricLevelLoaMapping[rubricLevelHref].loaLevel
				: this._getLoaLevelLink(rubricLevelEntity);
			const loaLevelEntity = this._resolveLoaLevel(loaLevels, loaLink);

			if (loaLevelEntity) {
				const c = loaLevelEntity.properties.color;

				const isOverrideBound = rubricLevelLoaMapping[rubricLevelHref] && rubricLevelLoaMapping[rubricLevelHref].isBound;
				const isStandardBound = !rubricLevelLoaMapping[rubricLevelHref] && this._getRubricLevelLink(loaLevelEntity) === rubricLevelHref;

				const side = rubricLevelLoaMapping.reversed ? 'left' : 'right';
				const hiddenSide = rubricLevelLoaMapping.reversed ? 'right' : 'left';

				styles.push(`border-${side}: 1px solid var(--d2l-color-galena)`);
				if (!rubricLevelLoaMapping.reversed || cellIndex < this._getCriterionCells(this.entity).length - 1) {
					styles.push(`border-${hiddenSide}-style: hidden`);
				}

				if (isStandardBound || isOverrideBound) {
					styles.push(`border-${side}-color: ${c}`);
					styles.push(`border-${side}-width: 2px`);
				}

				if (topBorder) {
					styles.push(`border-top-color: ${c}`);
					styles.push('border-top-width: 2px');
				}
			}
		}

		return styles.join(';');
	},

	_getCriterionCells: function(entity) {
		var entities = entity && entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterionCell);
		return entities || [];
	},

	_computeHasOutOf: function(entity) {
		return entity && entity.properties && entity.properties.outOf;
	},

	_nameFocusHandler: function(e) {
		this._enteredName = e.target.value;
		this._nameFocused = true;
	},

	_nameBlurHandler: function(e) {
		if (this._nameChanging || !this._pendingNameSaves && this._nameInvalid) {
			this._saveName(e.target.value);
		}
		this._nameFocused = false;
	},

	_nameInputHandler: function(e) {
		this._nameChanging = true;
		this._enteredName = e.target.value;
		var value = e.target.value;
		this.debounce('input', function() {
			if (this._nameChanging) {
				this._saveName(value);
			}
		}.bind(this), 500);
	},

	_saveName: function(value) {
		this._nameChanging = false;
		var action = this.entity.getActionByName('update');
		if (action) {
			if (this._nameRequired && !value.trim()) {
				this.handleValidationError('criterion-name-bubble', '_nameInvalid', 'nameIsRequired');
				return;
			} else {
				this.toggleBubble('_nameInvalid', false, 'criterion-name-bubble');
			}
			var fields = [{ 'name': 'name', 'value': value }];
			this.performAutosaveAction(action, fields, '_pendingNameSaves').then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-criterion-saved', {
					bubbles: true,
					composed: true,
				}));
				this._updateName(this.entity, false);
			}.bind(this)).catch(function(err) {
				this.handleValidationError('criterion-name-bubble', '_nameInvalid', 'nameSaveFailed', err);
			}.bind(this));
		}
	},

	_updateName: function(entity, selfLinkChanged) {
		if (selfLinkChanged || !this._nameChanging && !this._pendingNameSaves) {
			this.toggleBubble('_nameInvalid', false, 'criterion-name-bubble');
			this._criterionName = entity.properties.name;
		}
	},

	_saveOutOf: function(saveEvent) {
		var action = this.entity.getActionByName('update-outof');
		if (action) {
			if (!saveEvent.value.trim()) {
				this.handleValidationError('out-of-bubble', '_outOfInvalid', 'pointsAreRequired');
				return;
			} else {
				this.toggleBubble('_outOfInvalid', false, 'out-of-bubble');
			}
			var fields = [{ 'name': 'outOf', 'value': saveEvent.value }];
			this.performAutosaveAction(action, fields, '_pendingOutOfSaves').then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-criterion-saved', {
					bubbles: true,
					composed: true,
				}));
				this._updateOutOf(this.entity, false);
			}.bind(this)).catch(function(err) {
				this.handleValidationError('out-of-bubble', '_outOfInvalid', 'pointsSaveFailed', err);
			}.bind(this));
		}
	},

	_updateOutOf: function(entity, selfLinkChanged) {
		if (selfLinkChanged || !this._outOfChanging && !this._pendingOutOfSaves) {
			this.toggleBubble('_outOfInvalid', false, 'out-of-bubble');
			this._outOf = entity.properties.outOf;
		}
	},

	_canCopyCriterion: function(entity) {
		return entity && entity.hasActionByName('copy');
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

	_getNamePlaceholder: function(localize, displayNamePlaceholder, positionNumber) {
		if (displayNamePlaceholder) {
			return localize('criterionPlaceholder', 'positionNumber', positionNumber);
		}
		return '';
	},

	_getCriterionNameAriaLabel: function(positionNumber) {
		this._criterionNameAriaLabel = this.localize('criterionNameAriaLabel', 'positionNumber', positionNumber);
	},

	_handleCopyCriterion: function(e) {
		var action = this.entity.getActionByName('copy');
		if (!action) return;
		var copyButton = e.currentTarget;
		copyButton.setAttribute('disabled', '');

		const uuid = this.getUUID();
		this.perfMark(`criterionCopiedStarted-${uuid}`);
		announce(this.localize('copiedCriterionLoading', 'name', this._criterionName));
		this.performSirenAction(action).then(function() {
			setTimeout(function() {
				announce('criterionCopied');
			}.bind(this), 2000);

			this.perfMark(`criterionAddedEnd=${uuid}`);
			this.logCriterionCopiedAction(`criterionCopiedStarted-${uuid}`, `criterionCopiedEnd=${uuid}`);
		}.bind(this)).then(function() {
			copyButton.removeAttribute('disabled');
		}).catch(function(err) {
			copyButton.removeAttribute('disabled');
			this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
				detail: {
					message: err.message,
				},
				bubbles: true,
				composed: true,
			}));
		}.bind(this));
	},

	_handleDeleteCriterion: function(e) {
		var action = this.entity.getActionByName('delete');
		if (!action) return;
		var deleteButton = e.currentTarget;
		deleteButton.setAttribute('disabled', '');
		this.openConfirm({
			title: this.localize('deleteCriterionConfirmationTitle'),
			secondaryMessage: action.title || this.localize('deleteCriterionConfirmationText'),
			positiveButtonText: this.localize('deleteConfirmationYes'),
			negativeButtonText: this.localize('deleteConfirmationNo')
		}).then(function() {
			var name = this._criterionName;
			this._transitionElement(this, 0);

			announce(this.localize('criterionDeleted', 'name', name));

			this.performSirenAction(action).then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-criterion-deleted', {
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

	_computeIsHierarchicalFlagOn: function(entity, isFlagOn) {
		return isFlagOn && entity &&
			entity.getLinkByRel('https://alignments.api.brightspace.com/rels/activity-alignments-hierarchical');
	},

	_canCheckOutcomes: function(_isFlagOn, isHolistic, _isAlignmentTagListEmpty) {
		return _isFlagOn && !isHolistic && _isAlignmentTagListEmpty;
	},

	_getOutcomeRel: function(_isFlagOn, isHolistic) {
		if (this.HypermediaRels && this.HypermediaRels.Activities && _isFlagOn && !isHolistic) {
			return this.HypermediaRels.Activities.activityUsage;
		}
	},

	_getOutcomeHref: function(entity, _isFlagOn, isHolistic) {
		if (entity && this.HypermediaRels.Activities && _isFlagOn && !isHolistic) {
			return entity.getLinkByRel(this.HypermediaRels.Activities.activityUsage).href;
		}
	},

	_getOutcomesHierarchicalHref: function(entity, isHolistic) {
		if (entity && this.HypermediaRels.Activities && entity.getLinkByRel('https://alignments.api.brightspace.com/rels/activity-alignments-hierarchical') && !isHolistic) {
			return entity.getLinkByRel('https://alignments.api.brightspace.com/rels/activity-alignments-hierarchical').href;
		}
	},

	_updateHierarchicalHeight: function() {
		const maxHeight = this.$.hierarchicaloverlay && this.$.hierarchicaloverlay.style['max-height'];
		if (!maxHeight) return;

		const height = Math.round(parseInt(maxHeight, 10) * 0.55);
		this._hierarchicalHeight = `${height}px`;
	},

	_showBrowseOutcomes: function() {
		this._isHierarchicalFlagOn ? this.$.hierarchicaloverlay.open() : this.$.overlay.open();
		this._updateHierarchicalHeight();
	},

	_closeBrowseOutcomes: function() {
		this._isHierarchicalFlagOn ? this.$.hierarchicaloverlay.opened = false : this.$.overlay.opened = false;
		this._updateHierarchicalHeight();
	},

	// eslint-disable-next-line no-unused-vars
	_isFirstAndCorner: function(isHolistic, index, criterionCellCount) {
		return isHolistic && index === 0;
	},
	_isLastAndCorner: function(isHolistic, index, criterionCellCount) {
		return isHolistic && index === criterionCellCount - 1;
	},
	_getDisplayedName: function(isFocused, isInvalid, pendingSaves, enteredValue, savedValue) {
		return (isFocused || isInvalid || pendingSaves > 0) ? enteredValue : savedValue;
	},
	_canHideDeleteIcon: function(canDelete, actionMenuTurnedOn) {
		return !canDelete || actionMenuTurnedOn;
	},
	_hideActionMenu: function(actionMenuFlag, canCopy, canDelete) {
		return !actionMenuFlag || (!canCopy && !canDelete);
	}
});
