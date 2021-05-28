import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './assessment-behavior.js';
import './localize-behavior.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-icons/d2l-icon.js';
import './rubric-siren-entity.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-levels-mobile">
	<template strip-whitespace="">
		<style>
			:host{
				display:block;
			}
			:host([overridden-styling]) .out-of {
				background-color: var(--d2l-color-celestine-plus-2);
			}
			.levels-container {
				display: flex;
				width: 100%;
			}
			.levels {
				display: inline-flex;
				width: 100%;
			}

			.level {
				position: relative;
				border: solid 1px var(--d2l-color-celestine);
				display: flex;
				overflow: hidden;
				text-align: center;
				color: var(--d2l-color-galena);
				outline: none;
				flex: 1;
				height: 18px;
				align-self: center;
			}
			.level:not(.selected):not(:last-of-type),
			:dir(rtl) .level.selected + .level:not(:first-of-type) {
				border-right: none;
			}
			:dir(rtl) .level:not(.selected):not(:last-of-type),
			.level.selected + .level {
				border-left: none;
			}
			:dir(rtl) .level:not(.selected):not(:last-of-type) {
				border-right: solid 1px var(--d2l-color-celestine);
			}

			.level.selected.assessed {
				background-color: var(--d2l-color-celestine-plus-2);
				border-color: var(--d2l-color-celestine);
			}

			.level:last-of-type {
				border-radius: 0 6px 6px 0;
				border-right: 1px solid var(--d2l-color-celestine);
			}
			.level:first-of-type,
			:dir(rtl) .level:last-of-type {
				border-radius: 6px 0 0 6px;
				border-left: 1px solid var(--d2l-color-celestine);
			}
			:dir(rtl) .level:first-of-type {
				border-radius: 0 6px 6px 0;
				border-right: 1px solid var(--d2l-color-celestine);
			}

			.level.selected {
				background-color: var(--d2l-color-gypsum);
				border: 1px solid var(--d2l-color-galena);
				border-radius: 6px !important;
				height: 30px;
			}
			.level:hover {
				cursor: pointer;
				background-color: var(--d2l-color-gypsum);
			}
			.level.selected.assessed:focus {
				background-color: var(--d2l-color-celestine-plus-2);
				border: solid 1px var(--d2l-color-celestine);
			}
			.level-name {
				@apply --d2l-body-small-text;
				margin: 5px auto 5px auto;
				padding-left: 5px;
				padding-right: 5px;
				word-break: break-all;
				overflow: hidden;
			}
			.level-name.selected {
				font-weight: 700;
				color: var(--d2l-color-ferrite);
			}

			.level-tab-focus {
				display: inline-flex;
				width: 100%;
				height: 100%;
				justify-content: space-around;
				align-items: center;
			}
			.level:focus .level-tab-focus {
				border: 1px solid var(--d2l-color-celestine-minus-1);
				margin: 2px;
				height: 12px;
			}
			.level.selected:focus .level-tab-focus {
				border-radius: 6px;
				height: 24px;
			}
			.level:not(.selected):focus:last-of-type .level-tab-focus,
			:dir(rtl) .level:not(.selected):focus:first-of-type .level-tab-focus {
				border-radius: 0px 4px 4px 0px;
			}
			.level:not(.selected):focus:first-of-type .level-tab-focus,
			:dir(rtl) .level:not(.selected):focus:last-of-type .level-tab-focus {
				border-radius: 4px 0px 0px 4px;
			}

			.out-of {
				height: 100%;
				border-radius: 6px;
				border: solid 1px var(--d2l-color-mica);
				min-width: 40px;
				margin-left: 15px;
				margin-right: 5px;
				padding: 0 6px;
				flex: 0 0 auto;
			}
			.out-of:hover {
				cursor: default;
				background-color: transparent;
			}
			.out-of.editing {
				width: calc(100% - 20px);
				height: 55px;
				margin-bottom: 5px;
				margin-left: 5px;
				display: block;
			}
			.check-icon {
				color: var(--d2l-color-celestine-minus-1);
			}
			.score-wrapper {
				pointer-events: none;
			}
			.score-wrapper.assessable {
				pointer-events: auto;
			}
			.score-wrapper.assessable:hover {
				color: var(--d2l-color-celestine);
				cursor: pointer;
			}
			[hidden] {
				display: none !important;
			}
		</style>
		<rubric-siren-entity href="[[assessmentCriterionHref]]" token="[[token]]" entity="{{assessmentCriterionEntity}}"></rubric-siren-entity>
		<div class="levels-container">
			<div class="levels" role="tablist" hidden$="[[_isEditingScore(editingScore, scoreInvalid)]]">
				<template is="dom-repeat" items="[[levelEntities]]">
					<div
						id="level-tab[[index]]"
						class$="[[_getLevelClassName(index, selected, hovered, criterionCells, cellAssessmentMap)]]"
						role="tab"
						tabindex="0"
						data-cell-href$="[[_getCriterionCellHref(criterionCells, index)]]"
						data-index="[[index]]"
						on-click="_handleClick"
						on-mouseover="_handleMouseOver"
						on-mouseout="_handleMouseOut"
						on-keydown="_onKeyDown"
						on-track="_handleTrack"
						aria-selected$="[[_isSelected(index, selected)]]"
						aria-controls$="level-description-panel[[index]]"
						aria-label$="[[_getLevelLabelName(item, criterionCells, cellAssessmentMap)]]">
						<div class="level-tab-focus">
							<d2l-icon
								hidden$="[[!_isAssessedLevel(index, criterionCells, cellAssessmentMap)]]"
								class="check-icon"
								icon="d2l-tier1:check">
							</d2l-icon>
						</div>
					</div>
				</template>
			</div>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-levels-mobile',

	properties: {

		/**
		 * The selected level
		 */
		selected: {
			type: Number,
			notify: true
		},

		/**
		 * The hovered level
		 */
		hovered: {
			type: Number,
			notify: true
		},

		/**
		 * The maximum number of points for any level
		 */
		outOf: {
			type: Number
		},

		levelEntities: {
			type: Array,
			notify: true
		},

		score: {
			type: Number,
			value: null
		},

		assessmentCriterionHref: String,
		assessmentCriterionEntity: Object,
		cellAssessmentMap: Object,

		readOnly: {
			type: Boolean
		},

		criterionCells: {
			type: Array,
			value: null
		},

		criterionHref: {
			type: String,
			value: null
		},

		editingScore: {
			type: Object,
			value: false
		},

		scoreInvalid: {
			type: Boolean,
			value: false
		},

		overriddenStyling: {
			type: Boolean,
			reflectToAttribute: true,
			value: false
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior
	],

	observers: [
		'_onEntityChanged(entity)'
	],

	_keyCodes: {
		ENTER: 13,
		LEFT: 37,
		RIGHT: 39
	},

	_onKeyDown: function(e) {
		switch (e.keyCode) {
			case this._keyCodes.ENTER:
				this.selected = e.currentTarget.dataIndex;
				if (!this.readOnly) {
					this.CriterionCellAssessmentHelper.selectAsync(
						() => this.cellAssessmentMap[e.currentTarget.dataset.cellHref]
					);
				}
				break;
			case this._keyCodes.LEFT:
				if (getComputedStyle(this).direction === 'rtl') {
					this._focusNextLevel(e);
				} else {
					this._focusPrevLevel(e);
				}
				break;
			case this._keyCodes.RIGHT:
				if (getComputedStyle(this).direction === 'rtl') {
					this._focusPrevLevel(e);
				} else {
					this._focusNextLevel(e);
				}
				break;
		}
	},

	_focusPrevLevel: function(e) {
		if (e.currentTarget.dataIndex !== 0) {
			e.currentTarget.previousSibling.focus();
			e.preventDefault();
		}
	},

	_focusNextLevel: function(e) {
		if (this.levelEntities && event.currentTarget.dataIndex !== this.levelEntities.length - 1) {
			e.currentTarget.nextSibling.focus();
			e.preventDefault();
		}
	},

	_isSelected: function(index, selected) {
		return selected >= 0
			? index === selected
			: index === 0;
	},

	_isHovered: function(index, hovered) {
		return index === hovered;
	},

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this.levelEntities = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level);
	},

	_getLevelClassName: function(index, selected, hovered, criterionCells, cellAssessmentMap) {
		var className = 'level';
		if (this._isSelected(index, selected)) {
			className += ' selected';
		}
		if (this._isHovered(index, hovered)) {
			className += ' hovered';
		}
		if (criterionCells && this._isAssessedLevel(index, criterionCells[index], cellAssessmentMap)) {
			className += ' assessed';
		}

		return className;
	},

	_getLevelTextClassName: function(index, selected) {
		if (index === selected) {
			return 'level-name selected';
		}
		return 'level-name';
	},

	_selectLevel: function(event) {
		this.selected = event.currentTarget.dataIndex;
	},

	_hoverLevel: function(index) {
		this.hovered = index;
	},

	_unhoverLevel: function() {
		this.hovered = -1;
	},

	_hasScore: function(score) {
		return !!score || score === 0;
	},

	_isAssessedLevel: function(index, criterionCells, cellAssessmentMap) {
		if (!criterionCells || !criterionCells[index] || !cellAssessmentMap) {
			return false;
		}

		const rubricCellHref = this._getCriterionCellHref(criterionCells, index);
		if (!rubricCellHref) {
			return false;
		}
		return this.CriterionCellAssessmentHelper.isSelected(cellAssessmentMap[rubricCellHref]);
	},

	getSelfLink: function(entity) {
		return entity && (entity.getLinkByRel('self') || {}).href || '';
	},

	_getLevelLabelName: function(item, criterionCells, cellAssessmentMap) {
		if (this._isAssessedLevel(item, criterionCells, cellAssessmentMap)) {
			return item.properties.name;
		}
	},

	_getCriterionCellHref: function(criterionCells, index) {
		if (!criterionCells[index]) {
			return null;
		}
		return this._getSelfLink(criterionCells[index]);
	},

	_handleClick: function(evt) {
		if (this._preventClick) {
			return;
		}

		this._selectLevel(evt);
		if (this.readOnly) {
			return;
		}

		this.CriterionCellAssessmentHelper.selectAsync(
			() => this.cellAssessmentMap[evt.currentTarget.dataset.cellHref]
		);
	},

	_handleMouseOver: function(evt) {
		this._hoverLevel(evt.currentTarget.dataIndex);
	},

	_handleMouseOut: function() {
		this._unhoverLevel();
	},

	_canEditScore: function(assessmentCriterionEntity) {
		return !this.readOnly && this.CriterionAssessmentHelper.canUpdateAssessment(assessmentCriterionEntity);
	},

	_getScoreWrapperClassName: function(assessmentCriterionEntity, editingScore, scoreInvalid) {
		var className = 'score-wrapper';
		if (this._canEditScore(assessmentCriterionEntity)) {
			className += ' assessable';
		}
		if ((!editingScore || editingScore === -1) && !scoreInvalid) {
			className += ' level-name';
		}
		return className;
	},

	_handleOverrideScore: function() {
		if (this.readOnly) {
			return;
		}
		this.editingScore = 1;
	},

	_handleOverrideScoreKeypress: function(event) {
		if (event.keyCode === 13) {
			this._handleOverrideScore();
		}
	},

	_isEditingScore: function(editingScore, scoreInvalid) {
		return editingScore && editingScore !== -1 || scoreInvalid;
	},

	// eslint-disable-next-line no-unused-vars
	_handleTrack: function(e) {
		switch (e.detail.state) {
			case 'start':
				this._handleTrackStart(e);
				break;
			case 'track':
				this._handleTrackMove(e);
				break;
			case 'end':
				this._handleTrackEnd(e);
				break;
		}

		// Prevent text from being unintentionally selected during tracking
		e.preventDefault();
	},

	_handleTrackStart: function(e) {
		if (this._currentDragContext) {
			return;
		}

		const levelsContainer = this.shadowRoot.querySelector('.levels');
		const levelElements = this.shadowRoot.querySelectorAll('.level');
		const bounds = levelsContainer.getBoundingClientRect();
		const stepWidth = bounds.width / levelElements.length;

		this._currentDragContext = {
			target: e.target,
			origin: {
				x: e.detail.x,
				y: e.detail.y,
			},
			bounds: bounds,
			stepWidth: stepWidth,
			maxLevelIndex: levelElements.length - 1,
		};

		this._selectLevel(e);
	},

	_handleTrackMove: function(e) {
		const fromEdge = (e.detail.x - this._currentDragContext.bounds.left);
		const clampedLevel = Math.floor(fromEdge / this._currentDragContext.stepWidth);
		const normalizedClampedLevel = getComputedStyle(this).direction === 'rtl'
			? (this._currentDragContext.maxLevelIndex) - clampedLevel
			: clampedLevel;
		const nextSelected = Math.max(0, Math.min(normalizedClampedLevel, this._currentDragContext.maxLevelIndex));

		if (nextSelected !== this.selected) {
			this.selected = nextSelected;
			this.shadowRoot.querySelector('.selected').focus();
		}
	},

	// eslint-disable-next-line no-unused-vars
	_handleTrackEnd: function(e) {
		this._currentDragContext = null;

		/**
		 * A `click` event will be fired on the level even after track events start
		 * firing (`track` doesn't prevent pending `click`s), which doesn't seem preventable
		 * via the track event. So, prevent clicks for a single microtask after track end,
		 * so sliding away/back to a level doesn't (un)assess it, which may be unexpected.
		 */
		this._preventClick = true;

		setTimeout(() => {
			this._preventClick = false;
		});
	}
});
