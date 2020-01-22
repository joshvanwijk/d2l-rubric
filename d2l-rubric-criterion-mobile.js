import '@polymer/polymer/polymer-legacy.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './localize-behavior.js';
import './d2l-rubric-levels-mobile.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './d2l-rubric-entity-behavior.js';
import 's-html/s-html.js';
import './assessment-behavior.js';
import './d2l-rubric-alignments-indicator';
import './rubric-siren-entity.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import './d2l-rubric-competencies-icon.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criterion-mobile">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
			.criterion-name {
				@apply --d2l-body-compact-text;
				margin-top: 0.9rem;
				margin-bottom: 0.9rem;
			}
			.criterion-description-container {
				@apply --d2l-body-small-text;
				display: inline-flex;
				width:100%;
				margin-top: 24px;
				margin-bottom: 0.33rem;
			}
			.criterion-description {
				padding-top: 6px;
			}
			.criterion-description-html {
				display: block;
				overflow-x: hidden;
			}
			@keyframes slide-from-right-animation {
				from {
					opacity: 0;
					transform: translateX(20px);
				}

				to {
					opacity: 1.0;
					transform: none;
				}
			}
			.slide-from-right {
				animation-duration: 500ms;
				animation-name: slide-from-right-animation;
				animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
			}
			@keyframes slide-from-left-animation {
				from {
					opacity: 0;
					transform: translateX(-20px);
				}

				to {
					opacity: 1.0;
					transform: none;
				}
			}
			.slide-from-left {
				animation-duration: 500ms;
				animation-name: slide-from-left-animation;
				animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
			}
			.criterion-middle {
				display: block;
				flex-grow: 1;
				flex-shrink: 1;
			}
			:host([compact]) .criterion-middle {
				margin-left: 40px;
				margin-right: 40px;
			}

			.level-name {
				display: flex;
			}
			:host([compact]) .level-name {
				justify-content: space-between;
			}

			.level-text {
				font-weight: bold;
			}

			.level-bullet.assessed,
			.level-name.assessed {
				color: var(--d2l-color-celestine-minus-1);
			}
			:host([compact]) .level-bullet {
				display: none;
			}

			[hidden] {
				display: none !important;
			}

			d2l-rubric-competencies-icon {
				margin-top: 3px;
				float: right;
			}

			d2l-rubric-alignments-indicator {
				margin-right: 5px;
				float: right;
			}

			.levels-row {
				display: flex;
				align-items: center;
			}

			.level-iterator > d2l-icon {
				flex-grow: 0;
				flex-shrink: 0;
				width: 32px;
				margin: 8px;
				user-select: none;
			}

			.level-iterator-container {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: space-around;
				outline: none;
				user-select: none;
			}

			.level-iterator {
				width: 24px;
				height: 24px;
				border: 1px solid var(--d2l-color-ferrite);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
			.level-iterator-container:hover .level-iterator,
			.level-iterator-container:focus .level-iterator {
				width: 32px;
				height: 32px;
				border: 2px solid var(--d2l-color-celestine);
			}

			d2l-rubric-levels-mobile {
				flex-grow: 1;
			}
		</style>
		<rubric-siren-entity href="[[assessmentCriterionHref]]" token="[[token]]" entity="{{assessmentCriterionEntity}}"></rubric-siren-entity>
		<div class="criterion-name">
			<template is="dom-if" if="[[_showCompetencies(assessmentCriterionEntity, readOnly)]]">
				<d2l-rubric-competencies-icon
					competency-names="[[_getCompetencies(assessmentCriterionEntity)]]"
					tooltip-position="left"
					mobile
				></d2l-rubric-competencies-icon>
			</template>
			<template is="dom-if" if="[[!isHolistic]]" restamp>
				<d2l-rubric-alignments-indicator
					href="[[_getActivityLink(entity)]]"
					token="[[token]]"
					outcomes-title-text="[[_getOutcomesTitleText()]]"
					mobile
				></d2l-rubric-alignments-indicator>
			</template>
			<span>[[_name]]</span>
		</div>
		<div class="levels-row">
			<div
				class="level-iterator-container"
				role="button"
				aria-label$="[[localize('selectNextLevel')]]"
				on-click="_handleTapLeft"
				on-keydown="_handleLeftIteratorKeyDown"
				tabindex$="[[_getIteratorTabIndex('left', _selected, _criterionCells)]]">
				<div class="level-iterator" hidden$="[[_hideIterator('left', _selected, _criterionCells)]]">
					<d2l-icon icon="d2l-tier1:chevron-left"></d2l-icon>
				</div>
			</div>
			<d2l-rubric-levels-mobile
				href="[[levelsHref]]"
				assessment-criterion-href="[[assessmentCriterionHref]]"
				cell-assessment-map="[[cellAssessmentMap]]"
				token="[[token]]"
				selected="{{_selected}}"
				level-entities="{{_levelEntities}}"
				out-of="[[_outOf]]"
				score="[[_score]]"
				read-only="[[readOnly]]"
				criterion-cells="[[_criterionCells]]"
				criterion-href="[[_getSelfLink(entity)]]">
			</d2l-rubric-levels-mobile>
			<div
				class="level-iterator-container"
				role="button"
				aria-label$="[[localize('selectPreviousLevel')]]"
				on-click="_handleTapRight"
				on-keydown="_handleRightIteratorKeyDown"
				tabindex$="[[_getIteratorTabIndex('right', _selected, _criterionCells)]]">
				<div class="level-iterator" hidden$="[[_hideIterator('right', _selected, _criterionCells)]]">
					<d2l-icon icon="d2l-tier1:chevron-right"></d2l-icon>
				</div>
			</div>
		</div>

		<div id="description" class="criterion-description-container">
			<template is="dom-repeat" items="[[_criterionCells]]" as="criterionCell" indexas="index">
				<div id="level-description-panel[[index]]" class="criterion-middle" aria-labelledby$="level-tab[[index]]" role="tabpanel" hidden="[[!_isLevelSelected(index, _selected)]]">
					<div class$="[[_getLevelNameClass(criterionCell, cellAssessmentMap)]]">
						<div class="level-text"> [[_getSelectedLevelText(_selected, _levelEntities)]] </div>
						<d2l-icon
							hidden="[[!_showLevelBullet()]]"
							class$="[[_getLevelBulletClass(criterionCell, cellAssessmentMap)]]"
							icon="d2l-tier1:bullet">
						</d2l-icon>
						<div> [[_getSelectedNumberText(_selected, _levelEntities, criterionCell)]] </div>
					</div>
					<div hidden="[[!_hasDescription(criterionCell)]]" class="criterion-description">
						<s-html class="criterion-description-html" html="[[_getCriterionCellText(criterionCell)]]"></s-html>
					</div>
				</div>
			</template>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criterion-mobile',

	properties: {
		/**
		 * The href of the levels for this criteria group
		 */
		levelsHref: String,

		assessmentCriterionHref: String,

		assessmentCriterionEntity: Object,

		cellAssessmentMap: Object,

		_levelEntities: Object,

		isHolistic: Boolean,

		isNumeric: Boolean,

		_name: String,

		_outOf: {
			type: Number,
			value: null
		},

		_selected: {
			type: Number,
			value: -1
		},

		_criterionCells: {
			type: Array,
			value: []
		},

		_score: {
			type: String,
			computed: '_getScore(assessmentCriterionEntity)'
		},

		readOnly: Boolean,

		compact: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior
	],

	observers: [
		'_onEntityChanged(entity)',
		'_selectAssessedLevel(_criterionCells, cellAssessmentMap, assessmentCriterionEntity)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._name = entity.properties.name;
		this._outOf = entity.properties.outOf;
		this._criterionCells = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterionCell);
	},

	_selectAssessedLevel: function(cells, cellAssessmentMap) {
		if (!cells || !cellAssessmentMap) {
			return;
		}
		for (let i = 0; i < cells.length; i++) {
			const assessmentCriterion = cellAssessmentMap[this._getSelfLink(cells[i])];
			if (this.CriterionCellAssessmentHelper.isSelected(assessmentCriterion)) {
				this._selected = i;
				return;
			}
		}
		this._selected = -1;
	},

	_hasDescription: function(criterionCell) {
		var description = criterionCell.getSubEntityByClass(this.HypermediaClasses.text.description);
		return !!(description && description.properties && description.properties.html);
	},

	_showCompetencies: function(assessmentCriterionEntity, readOnly) {
		return readOnly && this._getCompetencies(assessmentCriterionEntity).length > 0;
	},

	_getCompetencies: function(assessmentCriterionEntity) {
		return this.CriterionAssessmentHelper.getCompetencyNames(assessmentCriterionEntity);
	},

	_moveIteratorLeft: function() {
		if (this._selected > 0) {
			this._select(this._selected - 1, this._criterionCells, this.cellAssessmentMap);
		}
	},

	_moveIteratorRight: function() {
		if (this._criterionCells && this._selected < this._criterionCells.length - 1) {
			this._select(this._selected + 1, this._criterionCells, this.cellAssessmentMap);
		}
	},

	_handleTapLeft: function(e) {
		e.stopPropagation();

		this._moveIteratorLeft();
	},

	_handleTapRight: function(e) {
		e.stopPropagation();

		this._moveIteratorRight();
	},

	_hideLeftChevron: function(selected) {
		return selected <= 0;
	},

	_hideRightChevron: function(selected) {
		return selected === this._total - 1 || selected === -1;
	},

	_getPoints: function(selected, levels, criterionCell) {
		// check for overrides
		var points = levels[selected].properties.points;
		if (criterionCell && criterionCell.hasClass(this.HypermediaClasses.rubrics.overridden)) {
			points = criterionCell.properties.points;
		}
		return points;
	},

	_getSelectedLevelText: function(selected, levels) {
		if (!levels || !levels[selected]) {
			return null;
		}

		var levelTitle = levels[selected].properties.name;
		return levelTitle;
	},

	_getSelectedNumberText: function(selected, levels, criterionCell) {
		if (!levels || !levels[selected]) {
			return null;
		}

		var points = this._getPoints(selected, levels, criterionCell);
		if (points === null || points === undefined) {
			return null;
		}

		if (this.isHolistic) {
			return this.localize('numberAndPercentage', 'number', points.toString());
		}
		if (this.isNumeric) {
			return this.localize('scoreOutOf', 'score', points.toString(), 'outOf', this._outOf.toString());
		}
	},

	_getCriterionCellText: function(criterionCell) {
		var descHtml = criterionCell.getSubEntityByClass(this.HypermediaClasses.text.description).properties.html;
		if (descHtml) {
			// Remove the margin of any paragraph elements in the description
			var paragraphStyle = '<style> p { margin: 0; } </style>';
			return paragraphStyle + descHtml;
		}
		return descHtml;
	},

	_isLevelSelected: function(levelIndex, selected) {
		return levelIndex === selected || ((typeof selected !== 'number' || selected < 0) && levelIndex === 0);
	},

	_getLevelNameClass: function(criterionCell, cellAssessmentMap) {
		let className = 'level-name';
		if (criterionCell && cellAssessmentMap) {
			const cellAssessment = cellAssessmentMap[this._getSelfLink(criterionCell)];
			if (this.CriterionCellAssessmentHelper.isSelected(cellAssessment)) {
				className += ' assessed';
			}
		}
		return className;
	},

	_getLevelBulletClass: function(criterionCell, cellAssessmentMap) {
		let className = 'level-bullet';
		if (criterionCell && cellAssessmentMap) {
			const cellAssessment = cellAssessmentMap[this._getSelfLink(criterionCell)];
			if (this.CriterionCellAssessmentHelper.isSelected(cellAssessment)) {
				className += ' assessed';
			}
		}
		return className;
	},

	_getActivityLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Activities.activityUsage);
		return link && link.href || '';
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
	_showLevelBullet: function(isNumeric, isHolistic) {
		return !isNumeric && !isHolistic;
	},
	_hideIterator: function(which, selected, criterionCells) {
		const shouldHide = which === 'left'
			? selected === 0
			: selected === (criterionCells.length - 1);

		return shouldHide;
	},
	_getIteratorTabIndex: function(which, selected, criterionCells) {
		const isHidden = this._hideIterator(which, selected, criterionCells);

		return isHidden ?  undefined : '0';
	},
	_handleLeftIteratorKeyDown: function(e) {
		if (e.keyCode === 13) {
			this._moveIteratorLeft();
		}
	},
	_handleRightIteratorKeyDown: function(e) {
		if (e.keyCode === 13) {
			this._moveIteratorRight();
		}
	},
	_getScore: function(assessmentCriterionEntity) {
		const score = this.CriterionAssessmentHelper.getScore(assessmentCriterionEntity);
		if (score !== undefined && score !== null) {
			return score.toString();
		}
		return '';
	},
	_select: function(index, criterionCells, cellAssessmentMap) {
		if (index === this._selected) {
			return;
		}

		const prevIndex = this._selected;
		this._selected = index;

		const element = this.$.description.querySelector('#' + 'level-description-panel' + index);
		if (element) {
			element.classList.remove('slide-from-right');
			element.classList.remove('slide-from-left');
			if (prevIndex >= 0 && index >= 0) {
				element.classList.add(index > prevIndex ? 'slide-from-right' : 'slide-from-left');
			}
		}

		if (this.readOnly || !criterionCells || !cellAssessmentMap) {
			return;
		}

		const helper = this.CriterionCellAssessmentHelper;
		if (index < 0) {
			for (let i = 0; i < criterionCells.length; i++) {
				const cellLink = this._getSelfLink(criterionCells[i]);
				const cellAssessment = cellAssessmentMap[cellLink];
				if (helper.isSelected(cellAssessment) && helper.canSelect(cellAssessment)) {
					helper.selectAsync(() => this.cellAssessmentMap[cellLink]);
					break;
				}
			}
			return;
		}

		const cellLink = this._getSelfLink(criterionCells[index]);
		const cellAssessment = cellAssessmentMap[cellLink];
		if (cellAssessment && helper.canSelect(cellAssessment) && !helper.isSelected(cellAssessment)) {
			helper.selectAsync(() => this.cellAssessmentMap[cellLink]);
		}
	}
});
