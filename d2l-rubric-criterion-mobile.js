import '@polymer/polymer/polymer-legacy.js';
import '@brightspace-ui/core/components/button/button-icon.js';
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
				width: 100%;
				margin-top: 4px;
				margin-bottom: 0.5rem;
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
				color: var(--d2l-color-celestine);
			}

			.level-text {
				padding: calc(0.5rem + 3px) 0;
			}

			:host([compact]) .level-name {
				justify-content: space-between;
				align-items: center;
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

			.sr-only {
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				border: 0;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				white-space: nowrap;
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
				aria-label$="[[_getLeftIteratorText()]]"
				on-mousedown="_handleTapLeft"
				on-keydown="_handleLeftIteratorKeyDown"
			>
				<div class="level-iterator">
					<d2l-icon icon="d2l-tier1:chevron-left"></d2l-icon>
				</div>
			</div>
			<d2l-rubric-levels-mobile
				href="[[levelsHref]]"
				assessment-criterion-href="[[assessmentCriterionHref]]"
				cell-assessment-map="[[cellAssessmentMap]]"
				token="[[token]]"
				selected="{{_selected}}"
				hovered="{{_hovered}}"
				focused="{{_focused}}"
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
				aria-label$="[[_getRightIteratorText()]]"
				on-mousedown="_handleTapRight"
				on-keydown="_handleRightIteratorKeyDown"
			>
				<div class="level-iterator">
					<d2l-icon icon="d2l-tier1:chevron-right"></d2l-icon>
				</div>
			</div>
		</div>

		<div id="description" class="criterion-description-container">
			<template is="dom-if" if="[[!_getVisibleLevel(_selected, _hovered, _focused, _levelEntities)]]" restamp>
				<div id="level-description-panel" class="criterion-middle" aria-labelledby$="level-tab" role="tabpanel">
					<div class="level-name">
						<div class="level-text">[[localize('notScored')]]</div>
						<d2l-rubric-editable-score
							criterion-href="[[href]]"
							assessment-href="[[assessmentCriterionHref]]"
							token="[[token]]"
							read-only="[[readOnly]]"
						>
						</d2l-rubric-editable-score>
					</div>
				</div>
			</template>
			<template is="dom-repeat" items="[[_criterionCells]]" as="criterionCell" indexas="index">
				<div
					id="level-description-panel[[index]]"
					class="criterion-middle"
					aria-labelledby$="level-tab[[index]]"
					role="tabpanel"
					hidden="[[!_isLevelVisible(index, _selected, _hovered, _focused)]]"
				>
					<div class$="[[_getLevelNameClass(criterionCell, cellAssessmentMap)]]">
						<div class="level-text">[[_getVisibleLevelTitle(_selected, _hovered, _focused, _levelEntities)]]</div>
						<d2l-icon
							hidden="[[!_showLevelBullet()]]"
							class$="[[_getLevelBulletClass(criterionCell, cellAssessmentMap)]]"
							icon="d2l-tier1:bullet">
						</d2l-icon>
						<div
							hidden="[[!_isLevelHovered(index, _hovered, _focused)]]"
							class="level-number"
						>
							[[_getVisibleLevelScore(_selected, _hovered, _focused, _levelEntities)]]
						</div>
						<d2l-rubric-editable-score
							hidden="[[_isLevelHovered(index, _hovered, _focused)]]"
							criterion-href="[[href]]"
							assessment-href="[[assessmentCriterionHref]]"
							token="[[token]]"
							read-only="[[readOnly]]"
						>
						</d2l-rubric-editable-score>
					</div>
					<div hidden="[[!_hasDescription(criterionCell)]]" class="criterion-description">
						<s-html class="criterion-description-html" html="[[_getCriterionCellText(criterionCell)]]"></s-html>
					</div>
				</div>
			</template>
		</div>

		<p class="criterion-status sr-only" role="status" aria-live="polite"></p>
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

		_hovered: {
			type: Number,
			value: -1
		},

		_focused: {
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

	say: function(text) {
		const status = this.shadowRoot.querySelector('.criterion-status');
		status.textContent = text;
		setTimeout(() => {
			status.textContent = '';
		}, 1000);
	},

	_moveIteratorLeft: function() {
		if (this._focused === 0) {
			return this.say(this.localize('noMoreLevels'));
		}
		if (this.readOnly) {
			this._focus(Math.max(0, this._focused - 1));
		} else {
			this._select(Math.max(0, this._selected - 1));
		}
	},

	_moveIteratorRight: function() {
		if (!this._criterionCells) {
			return;
		}
		const max = this._criterionCells.length - 1;
		if (this._focused === max) {
			return this.say(this.localize('noMoreLevels'));
		}
		let index;
		if (this._selected === -1) {
			index = max;
		} else if (this.readOnly) {
			index = Math.min(max, this._focused + 1);
		} else {
			index = Math.min(max, this._selected + 1);
		}
		if (this.readOnly) {
			this._focus(index);
		} else {
			this._select(index);
		}
	},

	_handleTapLeft: function(e) {
		e.stopPropagation();
		this._moveIteratorLeft();
		e.currentTarget.nextSibling.focusSlider();
	},

	_handleTapRight: function(e) {
		e.stopPropagation();
		this._moveIteratorRight();
		e.currentTarget.previousSibling.focusSlider();
	},

	_hideLeftChevron: function(selected) {
		return selected <= 0;
	},

	_hideRightChevron: function(selected) {
		return selected === this._total - 1 || selected === -1;
	},

	_getSelectedLevel: function(selected, levels) {
		return levels && levels[selected];
	},

	_getHoveredLevel: function(hovered, levels) {
		return levels && levels[hovered];
	},

	_getFocusedLevel: function(focused, levels) {
		return levels && levels[focused];
	},

	_getVisibleLevel: function(selected, hovered, focused, levels) {
		return this._getHoveredLevel(hovered, levels)
			|| this._getFocusedLevel(focused, levels)
			|| this._getSelectedLevel(selected, levels);
	},

	_getVisibleLevelTitle: function(selected, hovered, focused, levels) {
		var level = this._getVisibleLevel(selected, hovered, focused, levels);
		return level && level.properties && level.properties.name || null;
	},

	_getVisibleLevelPoints: function(selected, hovered, focused, levels, criterionCell) {
		var level = this._getVisibleLevel(selected, hovered, focused, levels);
		if (!level) {
			return null;
		}
		// check for overrides
		var points = level.properties.points;
		if (criterionCell && criterionCell.hasClass(this.HypermediaClasses.rubrics.overridden)) {
			points = criterionCell.properties.points;
		}
		return points;
	},

	_getVisibleLevelScore: function(selected, hovered, focused, levels, criterionCell) {
		var points = this._getVisibleLevelPoints(selected, hovered, focused, levels, criterionCell);
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
		return levelIndex === selected;
	},

	_isLevelHovered: function(levelIndex, hovered, focused) {
		return levelIndex === hovered
			|| levelIndex === focused && hovered === -1;
	},

	_isLevelVisible: function(levelIndex, selected, hovered, focused) {
		return this._isLevelHovered(levelIndex, hovered, focused)
			|| this._isLevelSelected(levelIndex, selected)
				&& (typeof hovered !== 'number' || hovered < 0)
				&& (typeof focused !== 'number' || focused < 0);
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
	_getLeftIteratorText: function() {
		return getComputedStyle(this).direction === 'rtl'
			? this.localize('selectNextLevel')
			: this.localize('selectPreviousLevel');
	},
	_getRightIteratorText: function() {
		return getComputedStyle(this).direction === 'rtl'
			? this.localize('selectPreviousLevel')
			: this.localize('selectNextLevel');
	},
	_getScore: function(assessmentCriterionEntity) {
		const score = this.CriterionAssessmentHelper.getScore(assessmentCriterionEntity);
		if (score !== undefined && score !== null) {
			return score.toString();
		}
		return '';
	},
	_select: function(index) {
		if (index === this._selected) {
			return;
		}

		const prevIndex = this._selected;
		this._selected = index;

		const element = this.$.description.querySelector('#level-description-panel' + index);
		if (element) {
			element.classList.remove('slide-from-right');
			element.classList.remove('slide-from-left');
			if (prevIndex >= 0 && index >= 0) {
				element.classList.add(index > prevIndex ? 'slide-from-right' : 'slide-from-left');
			}
		}
	},
	_focus: function(index) {
		if (index !== this._focused) {
			this._focused = index;
		}
	}
});
