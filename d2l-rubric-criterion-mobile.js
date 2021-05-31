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
			<div id="level-description-panel" class="criterion-middle" aria-labelledby$="level-tab" role="tabpanel">
				<div class$="[[_getLevelNameClass(criterionCell, cellAssessmentMap)]]">
					<div class="level-text">[[_getVisibleLevelTitle(_selected, _hovered, _focused, _levelEntities)]]</div>
					<d2l-rubric-editable-score
						criterion-href="[[href]]"
						assessment-href="[[assessmentCriterionHref]]"
						token="[[token]]"
						read-only="[[readOnly]]"
						score="[[_getVisibleLevelPoints(_selected, _hovered, _focused, _levelEntities, _criterionCells)]]"
					>
					</d2l-rubric-editable-score>
				</div>
				<div hidden="[[!_getVisibleLevelDescription(_selected, _hovered, _focused, _criterionCells)]]" class="criterion-description">
					<p class="criterion-description-html">
						[[_getVisibleLevelDescription(_selected, _hovered, _focused, _criterionCells)]]
					</p>
				</div>
			</div>
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

	_moveIterator: function(delta) {
		if (!this._criterionCells) {
			return;
		}
		const min = 0;
		const max = this._criterionCells.length - 1;
		let level;
		if (this._selected === -1 && delta === -1) {
			level = min;
		} else if (this._selected === -1 && delta === 1) {
			level = max;
		} else if (this.readOnly) {
			level = this._focused + delta;
		} else {
			level = this._selected + delta;
		}
		if (level < min) {
			level = min;
			this.say(this.localize('noMoreLevels'));
		} else if (level > max) {
			level = max;
			this.say(this.localize('noMoreLevels'));
		}
		this._focus(level);
		if (!this.readOnly) {
			this._select(level);
		}
	},

	_handleTapLeft: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this._moveIterator(-1);
		e.currentTarget.nextSibling.focusSlider();
	},

	_handleTapRight: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this._moveIterator(1);
		e.currentTarget.previousSibling.focusSlider();
	},

	_resolveSelection: function(selected, hovered, focused, items) {
		return items
			&& (items[hovered]
			|| items[focused]
			|| items[selected]);
	},

	_getVisibleLevelTitle: function(selected, hovered, focused, levels) {
		const level = this._resolveSelection(selected, hovered, focused, levels);
		return level && level.properties.name || this.localize('notScored');
	},

	_getVisibleLevelPoints: function(selected, hovered, focused, levels, cells) {
		const level = this._resolveSelection(selected, hovered, focused, levels);
		if (!level) {
			return null;
		}
		// check for overrides
		let points = level.properties.points;
		const cell = this._resolveSelection(selected, hovered, focused, cells);
		if (cell && cell.hasClass(this.HypermediaClasses.rubrics.overridden)) {
			points = cell.properties.points;
		}
		return points;
	},

	_getVisibleLevelDescription: function(selected, hovered, focused, cells) {
		const cell = this._resolveSelection(selected, hovered, focused, cells);
		const desc = cell && cell.getSubEntityByClass(this.HypermediaClasses.text.description);
		return desc && desc.properties.text;
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
