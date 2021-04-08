import '@polymer/polymer/polymer-legacy.js';
import 'd2l-table/d2l-table.js';
import 'd2l-table/d2l-td.js';
import 'd2l-table/d2l-tr.js';
import 'd2l-table/d2l-thead.js';
import 'd2l-table/d2l-tbody.js';
import 'd2l-table/d2l-th.js';
import 'd2l-table/d2l-tspan.js';
import './telemetry-behavior.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-colors/d2l-colors.js';
import './d2l-rubric-loading.js';
import './d2l-rubric-feedback.js';
import './localize-behavior.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-rubric-criterion-cell.js';
import './rubric-siren-entity.js';
import './assessment-behavior.js';
import 's-html/s-html.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import 'fastdom/fastdom.js';
import './d2l-rubric-editable-score.js';
import './d2l-rubric-alignments-indicator';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { beforeNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import './d2l-rubric-competencies-icon.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criteria-group">
	<template strip-whitespace="">
		<style include="d2l-table-style">
			:host {
				display: block;
				position: relative;
				--level-column-count: 0;
			}
			d2l-table[type="default"] d2l-td.out-of {
				text-align: left;
				vertical-align: top;
				min-width: 0;
				pointer-events: none;
			}
			d2l-table[type="default"] d2l-td.out-of.assessable {
				pointer-events: auto;
				max-width: 75px;
			}
			d2l-td.out-of.assessable:hover {
				color: var(--d2l-color-celestine);
				cursor: pointer;
			}
			d2l-th  {
				text-align: center;
			}
			d2l-rubric-editable-score {
				min-width: 70px;
			}
			d2l-rubric-criterion-cell {
				padding-top: 0.5rem;
			}
			.level-name {
				font-weight: 700;
			}
			.group-name {
				@apply --d2l-body-compact-text;
				font-weight: bold;
				text-align: left;
				background-color: var(--d2l-table-header-background-color);
			}
			d2l-table[type="default"] d2l-tbody d2l-tr {
				height: 100%;
			}
			#loa-container #float {
				padding: 0px;
			}
			#loa-labels {
				display: flex;
				height: 100%;
				margin: -1rem;
				position: absolute;
				width: 100%;
			}
			#loa-labels > div {
				align-items: center;
				background-color: #F1F5FB;
				border: 1px solid var(--d2l-table-border-color);
				border-width: 0px 1px 0px 0px;
				box-sizing: border-box;
				display: flex;
				font-size: 14px;
				height: 100%;
				justify-content: flex-start;
				overflow: hidden;
				padding-bottom: 0px;
				padding-top: 0px;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			#loa-labels > div:not(:first-child) {
				justify-content: center;
			}
			#loa-labels > .loa-heading {
				font-weight: bold;
			}
			#loa-labels .loa-label .loa-label-text {
				padding: 0px 1rem;
			}
			#loa-labels .loa-end {
				border-width: 0px;
			}
			d2l-table[type="default"] d2l-td.criteria {
				@apply --d2l-body-compact-text;
				text-align: left;
				background-color: var(--d2l-table-header-background-color);
				vertical-align: top;
			}
			.criteria-row-header-container {
				display: flex;
				flex-direction:column;
				justify-content:space-between;
				height: calc(100% - 0.5rem);
				padding-top: 0.5rem;
			}
			d2l-table[type="default"] d2l-td.criterion-cell {
				@apply --d2l-body-compact-text;
				vertical-align: top;
				position: relative;
			}
			.feedback-wrapper {
				border: none;
				margin: -1rem;
				height: 100%;
				position: relative;
			}
			.feedback-button-focused {
				padding: 0;
				border-radius: 0.3rem;
				border: 1px solid var(--d2l-color-celestine);
			}
			.criterion-cell:focus-within {
				box-shadow: 0 0 0 4px inset rgba(0, 111, 191, 0.4); /* celestine with 0.4 opacity */
			}
			.criterion-cell.selected {
				position: relative;
				border-color: var(--d2l-color-celestine);
				background-color: var(--d2l-color-celestine-plus-2);
				text-decoration-color: var(--d2l-color-celestine-minus-1);
				color: var(--d2l-color-celestine-minus-1);
				box-shadow: -2px 0 0 var(--d2l-color-celestine); /* left border */
				border-width: 2px;
			}
			.criterion-cell.selected:focus-within {
				box-shadow: -2px 0 0 var(--d2l-color-celestine), 0 0 0 4px inset rgba(0, 111, 191, 0.4);
			}
			.criterion-cell.selected.has-bottom {
				box-shadow: -2px 0 0 var(--d2l-color-celestine), -2px 2px 0 var(--d2l-color-celestine), 0 2px 0 var(--d2l-color-celestine);
				z-index: 1; /* Need bottom border to render over feedback cell border */
			}
			.criterion-cell.selected.has-bottom:focus-within {
				box-shadow: -2px 0 0 var(--d2l-color-celestine), 0 2px 0 var(--d2l-color-celestine), 0 0 0 4px inset rgba(0, 111, 191, 0.4);
			}
			.criterion-cell.selected.is-last {
				border-bottom-color: var(--d2l-color-celestine);
				border-bottom-width: 2px;
			}
			.criterion-cell.assessable {
				cursor: pointer;
			}
			.criterion-cell.assessable:hover {
				background-color: var(--d2l-color-sylvite);
			}
			.criterion-cell.assessable.selected {
				background-color: var(--d2l-color-celestine-plus-2);
			}
			.criterion-cell.first.holistic {
				border-left: var(--d2l-table-border);
			}
			.criterion-cell.first.holistic:focus {
				border-left-color: var(--d2l-color-celestine);
				border-width: 2px;
			}
			.criterion-cell.first.holistic.selected {
				border-left-color: var(--d2l-color-celestine);
				border-width: 2px;
			}

			d2l-button-subtle {
				margin-left: -13px;
				margin-bottom: -2px;
				padding: 1px 1px 1px 1px;
				align-self: flex-start;
			}

			d2l-button-subtle:hover {
				padding: 0;
				border-radius: 0.3rem;
				border: 1px solid var(--d2l-color-celestine);
			}

			d2l-rubric-alignments-indicator {
				float: right;
				margin-left: 8px;
			}

			d2l-rubric-competencies-icon {
				float: right;
				margin-top: 3px;
			}

			[hidden] {
				display: none !important;
			}

			d2l-tspan {
				position: relative;
			}

			@media print {

				d2l-table { 
					page-break-inside: auto;
				}			
				.table-content-container {
					width: 100%;
				}
				d2l-thead {
					display: table-header-group;
					page-break-inside: avoid;
				}
				d2l-tbody d2l-tr {
					page-break-inside: avoid;
					page-break-after: auto;
				}
				d2l-td {
					word-break: break-word;
					padding: calc(7vw / var(--level-column-count)) !important;
				}
				d2l-th {
					word-break: break-word;
					padding: calc(7vw / var(--level-column-count)) !important;
				}
				d2l-td.criterion-cell:not(.selected) {
					border-bottom: var(--d2l-table-border);
					margin-bottom: -1px; /* hides "double borders" on adjacent table row cells */
				}
				d2l-td.criteria {
					border-bottom: var(--d2l-table-border);
					margin-bottom: -1px;
				}
				d2l-td.out-of {
					border-bottom: var(--d2l-table-border);
					margin-bottom: -1px;
				}
			}
		</style>

		<d2l-rubric-loading hidden$="[[_showContent]]"></d2l-rubric-loading>
		<rubric-siren-entity href="[[_levelsHref]]" token="[[token]]" entity="{{_levelsEntity}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[_loaMappingHref]]" token="[[token]]" entity="{{_loaLevelEntity}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[_criteriaCollectionHref]]" token="[[token]]" entity="{{_criteriaCollectionEntity}}"></rubric-siren-entity>
		<d2l-table aria-colcount$="[[_getColumnCount(_levels, entity, criterionResultMap, rubricType)]]" aria-rowcount$="[[_getRowCount(_criteriaEntities)]]" hidden$="[[!_showContent]]">
			<div class="table-content-container">
			<d2l-offscreen>
				[[localize('rubricSummaryA11y')]]
			</d2l-offscreen>
			<d2l-thead>
				<d2l-tr aria-rowindex="1">
					<template is="dom-if" if="[[_showRowHeaders(rubricType)]]">
						<d2l-td role="columnheader" class="group-name">
							[[entity.properties.name]]
						</d2l-td>
					</template>
					<template is="dom-repeat" items="[[_levels]]" as="level">
						<d2l-th>
							<div>
								<div class="level-name">[[level.properties.name]]</div>
								<div hidden="[[!_isNumeric(entity, level)]]">[[_localizeLevelOutOf('points', level.properties.points)]]</div>
								<div hidden="[[!_isHolistic(entity, level)]]">[[_localizeLevelOutOf('percentage', level.properties.points)]]</div>
							</div>
						</d2l-th>
					</template>
					<template is="dom-if" if="[[_hasOutOf(entity)]]">
						<d2l-th class="out-of">
							<div class="level-name">[[localize('criterionScore')]]</div>
						</d2l-th>
					</template>
				</d2l-tr>
				<template is="dom-if" if="[[_hasLoaScale(_levelsEntity)]]">
					<d2l-tspan id="loa-container">
						<d2l-resize-aware id="loa-labels" on-d2l-resize-aware-resized="_setLoaCellsWidth">
							<div class="loa-label">
								<div class="loa-label-text">[[_getLoaHeadingLangTerm()]]</div>
							</div>
							<template is="dom-repeat" items="[[_loaLevels]]" as="loaLevel" on-dom-change="_setLoaCellsWidth">
								<div class="loa-heading" style$="[[_getHeaderStyle(loaLevel, _sortedLevels, _loaLevels, _levelsReversed)]]">
									<div class="loa-label-text">[[loaLevel.properties.name]]</div>
								</div>
							</template>
							<template is="dom-if" if="[[_hasOutOf(entity)]]">
								<div class="loa-end"></div>
							</template>
						</d2l-resize-aware>
					</d2l-tspan>
				</template>
			</d2l-thead>
			<d2l-tbody>
				<template is="dom-repeat" items="[[_criteriaEntities]]" as="criterion" index-as="criterionNum">
					<d2l-tr aria-rowindex$="[[_getRowIndex(criterionNum)]]" aria-owns$="[[_getFeedbackID(criterion, criterionResultMap, criterionNum)]]" style="max-width: 80%;">
						<template is="dom-if" if="[[_showRowHeaders(rubricType)]]" on-dom-change="_rowHeaderDomChange">
							<d2l-td class="criteria" role="rowheader">
								<div class="criteria-row-header-container">
									<div>
										<d2l-rubric-alignments-indicator
											href="[[_getActivityLink(criterion)]]"
											token="[[token]]"
											outcomes-title-text="[[_getOutcomesTitleText()]]"
											criterion-name="[[criterion.properties.name]]"
										></d2l-rubric-alignments-indicator>
										<template is="dom-if" if="[[_showCompetencies(criterionResultMap, criterion, readOnly)]]">
											<d2l-rubric-competencies-icon
												competency-names="[[_getCriterionCompetencies(criterionResultMap, criterion)]]"
											></d2l-rubric-competencies-icon>
										</template>
										<div class="criterion-name">
											<span>
												[[criterion.properties.name]]
											</span>
										</div>
									</div>
									<d2l-button-subtle
										aria-hidden="true"
										tabindex="-1"
										id="addFeedback[[_getRowIndex(criterionNum)]]"
										on-click="_handleAddFeedback"
										on-focusin="_handleVisibleFeedbackFocusin"
										on-focusout="_handleVisibleFeedbackFocusout"
										hidden="[[!_showAddFeedback(criterion, criterionResultMap, criterionNum, _addingFeedback, _savingFeedback.*, _feedbackInvalid.*)]]"
										text="[[localize('addFeedback')]]"
										data-criterion$="[[criterionNum]]"
									></d2l-button-subtle>
								</div>
							</d2l-td>
						</template>
						<template is="dom-repeat" items="[[_getCriterionCells(criterion)]]" as="criterionCell" index-as="cellNum" on-dom-change="_onCriterionCellDomChanged">
							<d2l-td
								class$="[[_getCriteriaClassName(criterionCell, criterionResultMap, cellAssessmentMap, criterionNum, _criteriaEntities, cellNum, readOnly, _addingFeedback)]]"
								style$="[[_getCriteriaStyle(criterionCell, criterionNum, cellNum, _levels, _loaLevels, _levelsReversed)]]"
								on-click="_handleTap"
								data-href$="[[_getSelfLink(criterionCell)]]"
							>
								<d2l-rubric-criterion-cell href="[[_getSelfLink(criterionCell)]]" token="[[token]]" cell-assessment="[[_lookupMap(criterionCell,cellAssessmentMap)]]">
								</d2l-rubric-criterion-cell>
								<d2l-offscreen>
									<input hidden="[[_isStaticView()]]" on-keypress="_handleKey" name="[[criterionNum]]" type="radio" checked="[[_isSelected(criterionCell, cellAssessmentMap)]]" id="criterion-cell-input[[criterionNum]]_[[cellNum]]">
								</d2l-offscreen>
							</d2l-td>
						</template>
						<template is="dom-if" if="[[_hasOutOf(entity)]]">
							<d2l-td class$="[[_getOutOfClassName(criterion, criterionResultMap, readOnly)]]">
								<d2l-rubric-editable-score
									id="score-inner[[criterionNum]]"
									criterion-href="[[_getSelfLink(criterion)]]"
									assessment-href="[[_getCriterionResultHref(criterion,criterionResultMap)]]"
									token="[[token]]"
									read-only="[[readOnly]]"
									editing-score="{{editingScore}}"
									criterion-num="[[criterionNum]]"
									criterion-name="[[criterion.properties.name]]">
								</d2l-rubric-editable-score>
							</d2l-td>
						</template>
					</d2l-tr>
					<d2l-offscreen>
						<d2l-button-subtle
							id="invisible-addFeedback[[_getRowIndex(criterionNum)]]"
							on-click="_handleAddFeedback"
							on-focusin="_handleInvisibleFeedbackFocusin"
							on-focusout="_handleInvisibleFeedbackFocusout"
							description="[[_localizeAddFeedbackButtonDescription(criterion)]]"
							hidden="[[!_showAddFeedback(criterion, criterionResultMap, criterionNum, _addingFeedback, _savingFeedback.*, _feedbackInvalid.*)]]"
							data-criterion$="[[criterionNum]]"
						></d2l-button-subtle>
					</d2l-offscreen>
					<template is="dom-if" if="[[_displayFeedback(criterion, criterionResultMap, criterionNum, _addingFeedback, _savingFeedback.*, _feedbackInvalid.*)]]" restamp="true">
						<d2l-tspan id="feedback[[criterionNum]]" role="cell" focused-styling$="[[_isFocusedStyling(_feedbackInvalid.*, criterionNum)]]">
							<d2l-rubric-feedback
								id="feedback-inner[[criterionNum]]"
								class="feedback-wrapper"
								criterion-href="[[_getSelfLink(criterion)]]"
								criterion-assessment-href="[[_getCriterionResultHref(criterion,criterionResultMap)]]"
								token="[[token]]"
								read-only="[[readOnly]]"
								enable-feedback-copy="[[enableFeedbackCopy]]"
								data-criterion$="[[criterionNum]]"
								on-save-feedback-start="_handleSaveStart"
								on-save-feedback-finished="_handleSaveFinished"
								on-close-feedback="_closeFeedback"
								on-focus="_handleFeedbackTextFocus">
							</d2l-rubric-feedback>
						</d2l-tspan>
					</template>
				</template>
			</d2l-tbody>
			</div>
		</d2l-table>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criteria-group',

	properties: {
		_levelsHref: String,
		_levelsEntity: {
			type: Object,
			value: null
		},
		_levels: Array,
		_sortedLevels: Array,
		_levelsReversed: {
			type: Boolean,
			value: false
		},
		_loaLevels: Array,
		_loaMappingHref: String,
		_loaLevelEntity: {
			type: Object,
			value: null
		},
		_criteriaCollectionHref: String,
		_criteriaCollectionEntity: {
			type: Object,
			value: null
		},
		_criteriaEntities: Array,
		_showContent: {
			type: Boolean,
			value: false
		},
		_loaded: {
			type: Boolean,
			value: false
		},
		assessmentEntity: Object,
		rubricType: {
			type: String,
			value: null
		},
		readOnly: Boolean,
		_feedbackInvalid: {
			type: Array,
			value: function() {
				return [];
			}
		},
		_addingFeedback: {
			type: Number,
			value: -1
		},
		_savingFeedback: {
			type: Array,
			value: function() {
				return [];
			}
		},
		editingScore: {
			type: Number,
			value: -1
		},
		enableFeedbackCopy: {
			type: Boolean,
		},
		criterionResultMap: Object,
		cellAssessmentMap: Object
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		IronResizableBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],

	observers: [
		'_onLevelsEntityChanged(_levelsEntity)',
		'_onLoaLevelEntityChanged(_loaLevelEntity)',
		'_onCriteriaCollectionEntityChanged(_criteriaCollectionEntity)'
	],

	ready: function() {
		const table = this.root.querySelector('d2l-table');
		const scrollWrappers = table && table.shadowRoot && table.shadowRoot.querySelector('d2l-scroll-wrapper');
		const wrapper = scrollWrappers && scrollWrappers.shadowRoot && scrollWrappers.shadowRoot.querySelector('#wrapper');
		if (wrapper) {
			wrapper.addEventListener('scroll', () => this._setLoaCellsWidth());
		}
	},

	attached: function() {
		this.addEventListener('d2l-rubric-editable-score-commit', (e) => {
			e.stopPropagation();
			e.target.parentNode && e.target.parentNode.host && e.target.parentNode.host.focus();
		});
	},

	_rowHeaderDomChange: function() {
		// set styling to have the criteria-row-header-container be the same height as the table cell in firefox
		if (/rv:.+Gecko\/.+Firefox\//.test(navigator.userAgent)) {
			var criteria = dom(this.root).querySelectorAll('.criteria');
			criteria.forEach(function(el) {
				el.style.height = '100%';
			});
		}
	},

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		// The first time that the entity loads, we send out an Open event
		if (!this._loaded) {
			var entityId = this._getSelfLink(entity);
			this.logViewRubricEvent({ id: entityId });
			this._loaded = true;
		}
		this._levelsHref = this._getLevelsLink(entity);
		this._criteriaCollectionHref = this._getCriteriaLink(entity);
	},

	_onLevelsEntityChanged: function(levelsEntity) {
		if (!levelsEntity) {
			return;
		}

		this._levels = levelsEntity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level);
		this._sortedLevels = this._sortRubricLevels(this._levels);
		this._loaMappingHref = this._getLoaMappingLink(levelsEntity);
		
		//Track the number of levels in a css variable for styling
		this.updateStyles({'--level-column-count': this._levels.length.toString()});

		// trigger a resize event so that the table resizes with the new levels
		if (PolymerElement) {
			beforeNextRender(this, function() {
				this.notifyResize();
			}.bind(this));
		} else {
			requestAnimationFrame(function() {
				this.notifyResize();
			}.bind(this));
		}
	},

	_onLoaLevelEntityChanged: function(loaLevelEntity) {
		if (!loaLevelEntity) {
			return;
		}

		const loaLevelEntities = loaLevelEntity.getSubEntitiesByClass('level-of-achievement');

		const lastRubric = this._resolveRubricLevel(this._levels, this._getRubricLevelLink(loaLevelEntities[loaLevelEntities.length - 1]));
		const lastRubricIndex = this._getRubricLevelIndex(this._sortedLevels, lastRubric);

		if (lastRubricIndex === 0) {
			loaLevelEntities.reverse();
			this._levelsReversed = true;
		} else {
			this._levelsReversed = false;
		}

		this._loaLevels = loaLevelEntities;
	},

	_resolveRubricLevel: function(allLevels, rubricLevelHref) {
		if (!allLevels || !allLevels.length) {
			return null;
		}

		for (let i = 0; i < allLevels.length; i++) {
			const rubricLevel = allLevels[i];

			if (this._getSelfLink(rubricLevel) === rubricLevelHref) {
				return rubricLevel;
			}
		}

		return null;
	},

	_resolveLoaLevel: function(loaLevels, loaLevelHref) {
		if (!loaLevels || !loaLevels.length) {
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

	_onCriteriaCollectionEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._showContent = true;
		this._criteriaEntities = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterion);
	},

	_onCriterionCellDomChanged: function() {
		this.markRubricLoadedEventEnd('rubric');
	},

	_closeFeedback: function(event) {
		this._addingFeedback = -1;
		const criterionNum = +event.currentTarget.dataset.criterion;
		var elem = dom(this.root).querySelector('#invisible-addFeedback' + this._getRowIndex(criterionNum));
		setTimeout(function() {
			elem.focus();
		}.bind(this), 500); //adding a 0.5sec delay to handle moving focus between shadow roots

	},

	_getSelfLink: function(entity) {
		var link = entity && entity.getLinkByRel('self');
		return link && link.href || '';
	},

	_getCriteriaLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Rubrics.criteria);
		return link && link.href || '';
	},

	_getLevelsLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Rubrics.levels);
		return link && link.href || '';
	},

	_getActivityLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Activities.activityUsage);
		return link && link.href || '';
	},

	_getCriterionCells: function(entity) {
		var entities = entity && entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterionCell);
		return entities || [];
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
		var link = entity && entity.getLinkByRel('https://achievements.api.brightspace.com/rels/level');
		return link && link.href || '';
	},

	_hasLoaScale: function(levelsEntity) {
		return this._getLoaMappingLink(levelsEntity) !== '';
	},

	_hasFeedback: function(criterionEntity, criterionResultMap) {
		const criterionResult = this._lookupMap(criterionEntity, criterionResultMap);
		return !!this.CriterionAssessmentHelper.getFeedbackText(criterionResult);
	},

	_showAddFeedback: function(entity, assessmentCriterionMap, criterionNum, addingFeedback) {
		if (!entity || this.readOnly) {
			return false;
		}
		const criterionResult = this._lookupMap(entity, assessmentCriterionMap);
		if (!criterionResult || !criterionResult.getActionByName('update-critierion-assessment')) {
			return false;
		}
		if (criterionNum === addingFeedback || this._savingFeedback[criterionNum] || this._feedbackInvalid[criterionNum]) {
			return false;
		}
		return !this.CriterionAssessmentHelper.getFeedbackText(criterionResult);
	},

	_hasOutOf: function(entity) {
		var outOf = entity && entity.properties && entity.properties.outOf;
		return !!outOf || outOf === 0;
	},

	_showRowHeaders: function(rubricType) {
		return rubricType !== 'holistic';
	},

	_isHolistic: function(entity, level) {
		var hasPoints = level.properties.points !== null;
		var isHolistic = entity && entity.hasClass(this.HypermediaClasses.rubrics.percentage);
		return hasPoints && isHolistic;
	},

	_isNumeric: function(entity, level) {
		var hasPoints = level.properties.points !== null && level.properties.points !== undefined;
		var isNumeric = entity && entity.hasClass(this.HypermediaClasses.rubrics.numeric);
		return hasPoints && isNumeric;
	},

	_localizeLevelOutOf: function(type, points) {
		if (points === undefined || points === null) {
			return;
		}
		return this.localize(type, 'number', points.toString());
	},

	_getRowCount: function(criteria) {
		if (!criteria) {
			return 0;
		}
		return criteria.length + 1; // criteria + levels row
	},

	_getColumnCount: function(levels, entity, assessmentMap, rubricType) {
		if (!levels) {
			return 0;
		}

		var count = levels.length;

		if (this._hasAnyFeedback(assessmentMap)) {
			count += 1; // extra "column" for feedback
		}
		if (this._hasOutOf(entity)) {
			count += 1;
		}
		if (this._showRowHeaders(rubricType)) {
			count += 1;
		}

		return count; // levels + (feedback) + (OutOf) + (criteria)
	},

	_getRowIndex: function(criterionIndex) {
		return criterionIndex + 2; // index + levels row + 1
	},

	_getFeedbackID: function(criterion, criterionResultMap, index) {
		if (this._hasFeedback(criterion, criterionResultMap)) {
			return 'feedback' + index;
		}
	},

	_isSelected: function(criterionCell, cellAssessmentMap) {
		const cellResult = this._lookupMap(criterionCell, cellAssessmentMap);
		return cellResult && this.CriterionCellAssessmentHelper.isSelected(cellResult);
	},

	_hasBottom: function(criterionCell, criterionResultMap, criterionNum, criteria, addingFeedback) {
		if (criterionNum === addingFeedback || criterionNum >= criteria.length - 1) {
			return true;
		}

		if (!this.CriterionCellAssessmentHelper.isSelected(criterionCell)) {
			return true;
		}

		const criterionEntity = criteria[criterionNum];
		const criterionResult = this._lookupMap(criterionEntity, criterionResultMap);

		if (this.CriterionAssessmentHelper.getFeedbackText(criterionResult)) {
			return true;
		}

		const selectedCellIndex = this._getSelectedLevelIndex(criterionResult);
		if (selectedCellIndex < 0) {
			return true;
		}

		const criterionResultBelow = this._lookupMap(criteria[criterionNum + 1], criterionResultMap);
		return selectedCellIndex !== this._getSelectedLevelIndex(criterionResultBelow);
	},

	_getSelectedLevelIndex: function(criterionResult) {
		const cells = criterionResult.getSubEntitiesByClass('assessment-criterion-cell');
		for (let i = 0; i < cells.length; i++) {
			if (this.CriterionCellAssessmentHelper.isSelected(cells[i])) {
				return i;
			}
		}
		return -1;
	},

	_getCriteriaClassName: function(criterionCell, criterionResultMap, cellAssessmentMap, criterionNum, criteriaEntities, cellNum, readOnly, addingFeedback) {
		var className = 'criterion-cell';
		var isLastCell = criterionNum === criteriaEntities.length - 1;
		if (cellNum === 0 && this.rubricType === 'holistic') {
			className += ' first holistic';
		}
		if (this._isSelected(criterionCell, cellAssessmentMap)) {
			className += ' selected';
		}
		const cellAssessment = this._lookupMap(criterionCell, cellAssessmentMap);
		if (!readOnly && this.CriterionCellAssessmentHelper.canSelect(cellAssessment)) {
			className += ' assessable';
		}
		if (this._hasBottom(criterionCell, criterionResultMap, criterionNum, criteriaEntities, addingFeedback)) {
			className += ' has-bottom';
		}
		if (isLastCell) {
			className += ' is-last';
		}

		return className;
	},

	_getHeaderStyle: function(loaLevel, sortedRubricLevels, loaLevels, levelsReversed) {
		const colSpan = this._getLoaLevelSpan(loaLevel, sortedRubricLevels, loaLevels, levelsReversed);
		const side = levelsReversed ? 'left' : 'right';
		const hiddenSide = levelsReversed ? 'right' : 'left';

		if (colSpan === 0) {
			return 'display: none;';
		}

		return [
			`border-${side}-color: ${loaLevel.properties.color}`,
			`border-${side}-width: 2px`,
			`border-${hiddenSide}-style: hidden`,
		].join(';');
	},

	_getCriteriaStyle: function(criterionCell, rowIndex, cellIndex, rubricLevels, loaLevels, reversed) {
		const styles = [];

		const rubricLevelHref = this._getRubricLevelLink(criterionCell);
		const rubricLevelEntity = this._resolveRubricLevel(rubricLevels, rubricLevelHref);

		if (rubricLevelEntity) {
			const loaLevelHref = this._getLoaLevelLink(rubricLevelEntity);
			const loaLevelEntity = this._resolveLoaLevel(loaLevels, loaLevelHref);

			if (loaLevelEntity) {
				const color = loaLevelEntity.properties.color;

				if (rowIndex === 0) {
					styles.push('border-top-width: 2px');
					styles.push(`border-top-color: ${color}`);
				}

				const side = reversed ? 'left' : 'right';
				const hiddenSide = reversed ? 'right' : 'left';

				styles.push(`border-${side}: 1px solid var(--d2l-table-border-color)`);
				if (!reversed || cellIndex < this._getCriterionCells(this._criteriaEntities[rowIndex]).length - 1) {
					styles.push(`border-${hiddenSide}-style: hidden`);
				}

				if (this._getRubricLevelLink(loaLevelEntity) === rubricLevelHref) {
					styles.push(`border-${side}-width: 2px`);
					styles.push(`border-${side}-color: ${color}`);
				}
			}
		}

		return styles.join(';');
	},
	_getOutOfClassName: function(criterionEntity, criterionResultMap, readOnly) {
		var className = 'out-of';
		if (this._canEditScore(criterionEntity, criterionResultMap, readOnly)) {
			className += ' assessable';
		}
		return className;
	},

	_showCompetencies: function(criterionResultMap, criterion, readOnly) {
		return !readOnly && !!this._getCriterionCompetencies(criterionResultMap, criterion).length;
	},

	_getCriterionCompetencies: function(criterionResultMap, criterion) {
		const criterionResult = this._lookupMap(criterion, criterionResultMap);
		return this.CriterionAssessmentHelper.getCompetencyNames(criterionResult);
	},

	_handleTap: function(event) {
		if (this._isStaticView()) {
			return;
		}

		const uuid = this.getUUID();
		this.perfMark(`criterionCellTappedStart-${uuid}`);
		this.CriterionCellAssessmentHelper.selectAsync(
			() => this._lookupMap(event.model.get('criterionCell'), this.cellAssessmentMap)
		).then(() => {
			if (this._addingFeedback === -1) {
				this._focusCriterionCell(event);
			}

			this.perfMark(`criterionCellTappedEnd-${uuid}`);
			this.logCriterionCellTappedAction(`criterionCellTappedStart-${uuid}`, `criterionCellTappedEnd-${uuid}`);
		});

		this._addingFeedback = -1;
		this.editingScore = -1;
	},

	_handleKey: function(event) {
		var criterionCell = event.model.get('criterionCell');
		if (event.keyCode === 13 || (this._isSelected(criterionCell, this.cellAssessmentMap) === true && event.keyCode === 32)) { // enter or space key
			this._handleTap(event);
		}
	},

	_displayFeedback: function(criterionEntity, criterionResultMap, criterionNum, addingFeedback) {
		return this._hasFeedback(criterionEntity, criterionResultMap) || criterionNum === addingFeedback || this._savingFeedback[criterionNum] || this._feedbackInvalid[criterionNum];
	},

	_handleAddFeedback: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this._addingFeedback = criterionNum;
		fastdom.mutate(function() {
			dom(this.root).querySelector('#feedback-inner' + criterionNum).focus();
		}.bind(this));
	},

	_canEditScore: function(criterionEntity, criterionResultMap, readOnly) {
		if (readOnly) {
			return false;
		}
		const criterionResult = this._lookupMap(criterionEntity, criterionResultMap);
		return this.CriterionAssessmentHelper.canUpdateAssessment(criterionResult);
	},

	_getOutcomesTitleText: function() {
		if (D2L
			&& D2L.Custom
			&& D2L.Custom.Outcomes
			&& D2L.Custom.Outcomes.TermTitleText
		) {
			return D2L.Custom.Outcomes.TermTitleText;
		}
	},

	_isStaticView: function() {
		return this.readOnly || !this.assessmentEntity;
	},

	_handleInvisibleFeedbackFocusin: function(event) {
		var criterionNum = event.model.get('criterionNum');
		var elem = dom(this.root).querySelector('#addFeedback' + this._getRowIndex(criterionNum));
		elem.classList.add('feedback-button-focused');
	},

	_handleInvisibleFeedbackFocusout: function(event) {
		var criterionNum = event.model.get('criterionNum');
		var elem = dom(this.root).querySelector('#addFeedback' + this._getRowIndex(criterionNum));
		elem.classList.remove('feedback-button-focused');
	},

	_handleVisibleFeedbackFocusin: function(event) {
		event.target.classList.add('feedback-button-focused');
	},

	_handleVisibleFeedbackFocusout: function(event) {
		event.target.classList.remove('feedback-button-focused');
	},

	_handleFeedbackTextFocus: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this._addingFeedback = criterionNum;
	},

	_focusCriterionCell: function(event) {
		var elem = dom(this.root).querySelector('#criterion-cell-input' + event.model.get('criterionNum') + '_' + event.model.get('cellNum'));
		fastdom.mutate(function() {
			// Refocus criterion cell input
			elem.focus();
		}.bind(this));
	},

	_handleSaveStart: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this.set(['_savingFeedback', criterionNum], event.detail.hasPendingSaves);
		this.set(['_feedbackInvalid', criterionNum], false);
	},

	_handleSaveFinished: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this.set(['_savingFeedback', criterionNum], event.detail.hasPendingSaves);
		this.set(['_feedbackInvalid', criterionNum], !event.detail.success);

		if (!event.detail.success) {
			var elem = dom(this.root).querySelector('#feedback' + criterionNum);
			elem.removeAttribute('_feedback-in-focus');
		}
	},

	_isFocusedStyling: function(changeRecord, criterionNum) {
		var feedbackInvalid = changeRecord.base[criterionNum];
		return !this._isStaticView() && !feedbackInvalid;
	},

	_setLoaCellsWidth: function() {
		this.debounce('set-loa-cells-width', () => {
			if (!this._hasLoaScale(this._levelsEntity)) {
				return;
			}

			const table = this.root.querySelector('d2l-table');
			const tableRect = table.getBoundingClientRect();

			const firstRow = this.root.querySelector('.d2l-table-row-first');
			const firstHeaderRect = firstRow.firstChild.getBoundingClientRect();
			const startLabel = this.root.querySelectorAll('.loa-label')[0];
			const startlabelTextDiv = startLabel.querySelector('div');
			let startLabelWidth = 0;
			if (firstHeaderRect.left < tableRect.left && firstHeaderRect.right > tableRect.left) {
				// achievement label is clipped but still visible
				startLabelWidth = firstHeaderRect.right - tableRect.left;
				startlabelTextDiv.style.marginLeft = `${startLabelWidth - firstHeaderRect.width}px`;
			} else if (firstHeaderRect.right > tableRect.left) {
				// achievement label is not clipped
				startLabelWidth = firstHeaderRect.width - 1;
				startlabelTextDiv.style.marginLeft = '0';
			}
			startLabel.style.flexBasis = `${startLabelWidth}px`;
			if (startLabelWidth === 0) {
				startLabel.style.borderRightWidth = '0';
			} else {
				startLabel.style.borderRightWidth = '1px';
			}

			const endLabel = this.root.querySelectorAll('.loa-end')[0];
			if (endLabel) {
				const outOfRect = firstRow.querySelectorAll('d2l-th.out-of')[0].getBoundingClientRect();
				if (outOfRect.right > tableRect.right && outOfRect.left < tableRect.left) {
					endLabel.style.flexBasis = `${tableRect.right - outOfRect.left}px`;
				} else if (outOfRect.right < tableRect.right) {
					endLabel.style.flexBasis = `${outOfRect.width - 1}px`;
				}
			}

			if (!this._loaLevels) {
				return;
			}

			const levelHeaders = firstRow.querySelectorAll('d2l-th');
			let startLevelIndex = 0;
			this._loaLevels.forEach((loaLevel, index) => {
				const colSpan = this._getLoaLevelSpan(loaLevel, this._sortedLevels, this._loaLevels, this._levelsReversed);
				let width = 0;
				let labelMarginLeft = 0;
				for (let i = startLevelIndex; i < startLevelIndex + colSpan; i++) {
					const levelRect = levelHeaders[i].getBoundingClientRect();

					if (levelRect.right > tableRect.right) {
						// right side of level is clipped by table scroll
						labelMarginLeft += levelHeaders[i].offsetWidth;
						if (levelRect.left < tableRect.right) {
							// level is still visible
							width += tableRect.right - levelRect.left;
							labelMarginLeft -= (tableRect.right - levelRect.left);
						}
					} else if (levelRect.left < tableRect.left) {
						// left side of level is clipped by table scroll
						labelMarginLeft -= levelHeaders[i].offsetWidth;
						if (levelRect.right > tableRect.left) {
							// level is still visible
							width += levelRect.right - tableRect.left;
							labelMarginLeft += (levelRect.right - tableRect.left);
						}
					} else if (levelRect.left >= tableRect.left && levelRect.right <= tableRect.right) {
						// level is not clipped by table scroll
						width += levelHeaders[i].offsetWidth;
					}
				}
				const loaHeading = this.root.querySelectorAll('.loa-heading')[index];
				loaHeading.style.flexBasis = `${width}px`;

				const borderSide = this._levelsReversed ? 'Left' : 'Right';
				if (width === 0 || !this._levelsReversed && labelMarginLeft > 0 || this._levelsReversed && labelMarginLeft < 0) {
					loaHeading.style[`border${borderSide}Width`] = '0px';
				} else {
					loaHeading.style[`border${borderSide}Width`] = '2px';
				}

				const textDiv = loaHeading.querySelector('.loa-label-text');
				textDiv.style.marginLeft = `${labelMarginLeft}px`;

				startLevelIndex += colSpan;
			});
		}, 50);
	},
	_getLoaLevelSpan: function(loaLevel, sortedRubricLevels, loaLevels, reversed) {
		const adjLoa = reversed ? this._getNextLoaLevel(loaLevels, loaLevel) : this._getPrevLoaLevel(loaLevels, loaLevel);

		const currentRubric = this._resolveRubricLevel(sortedRubricLevels, this._getRubricLevelLink(loaLevel));
		const adjRubric = this._resolveRubricLevel(sortedRubricLevels, this._getRubricLevelLink(adjLoa));

		const dist = this._getRubricLevelDist(sortedRubricLevels, adjRubric, currentRubric, reversed) * (reversed ? -1 : 1);
		return dist;
	},

	_getRubricLevelDist: function(sortedRubricLevels, rubricLevelEntity1, rubricLevelEntity2, reversed) {
		const l = this._getRubricLevelIndex(sortedRubricLevels, rubricLevelEntity1, reversed);
		const r = this._getRubricLevelIndex(sortedRubricLevels, rubricLevelEntity2, reversed);

		return r - l;
	},

	_getRubricLevelIndex: function(sortedRubricLevels, rubricLevelEntity, reversed) {
		for (let i = 0; i < sortedRubricLevels.length; i++) {
			if (this._getSelfLink(rubricLevelEntity) === this._getSelfLink(sortedRubricLevels[i])) {
				return i;
			}
		}

		return reversed ? sortedRubricLevels.length : -1;
	},

	_sortRubricLevels: function(levelEntities) {
		const sorted = [];

		let first = null;
		for (let i = 0; i < levelEntities.length; i++) {
			if (this._getPrevLink(levelEntities[i]) === this._getPrevLink(null)) {
				first = levelEntities[i];
				break;
			}
		}

		if (first === null) {
			return [];
		}

		let current = first;
		while (current !== null) {
			sorted.push(current);
			current = this._getNextRubricLevel(levelEntities, current);
		}

		return sorted;
	},

	_getPrevLink: function(entity) {
		var link = entity && entity.getLinkByRel('prev');
		return link && link.href || '';
	},

	_getNextLink: function(entity) {
		var link = entity && entity.getLinkByRel('next');
		return link && link.href || '';
	},

	_getNextRubricLevel: function(allRubricLevels, rubricLevelEntity) {
		const nextHref = this._getNextLink(rubricLevelEntity);
		return this._resolveRubricLevel(allRubricLevels, nextHref);
	},

	_getPrevLoaLevel: function(loaLevels, loaLevelEntity) {
		for (let i = 1; i < loaLevels.length; i++) {
			const level = loaLevels[i];

			if (this._getSelfLink(level) === this._getSelfLink(loaLevelEntity)) {
				return loaLevels[i - 1];
			}
		}

		return null;
	},

	_getNextLoaLevel: function(loaLevels, loaLevelEntity) {
		for (let i = 1; i < loaLevels.length; i++) {
			const level = loaLevels[i - 1];

			if (this._getSelfLink(level) === this._getSelfLink(loaLevelEntity)) {
				return loaLevels[i];
			}
		}

		return null;
	},

	_getLoaHeadingLangTerm: function() {
		return this.localize('loaOverlayHeading');
	},

	_lookupMap: function(entity, map) {
		if (!entity || !map) {
			return null;
		}

		const selfLink = entity.getLinkByRel('self');
		if (!selfLink || !selfLink.href) {
			return null;
		}

		return map[selfLink.href];
	},

	_hasAnyFeedback: function(assessmentMap) {
		for (const i in assessmentMap) {
			if (this.CriterionAssessmentHelper.getFeedbackText(assessmentMap[i])) {
				return true;
			}
		}
		return false;
	},

	_getCriterionResultHref: function(rubricCriterionEntity, criterionResultMap) {
		const criterionResult = this._lookupMap(rubricCriterionEntity, criterionResultMap);
		if (!criterionResult) {
			return null;
		}
		return this._getSelfLink(criterionResult);
	},

	_localizeAddFeedbackButtonDescription: function(criterion) {
		if (!criterion || !criterion.properties || !criterion.properties.name) {
			return null;
		}

		return this.localize('addFeedbackFor', 'criterionName', criterion.properties.name);
	}
});
