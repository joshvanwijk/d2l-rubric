import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './assessment-behavior.js';
import './d2l-rubric-entity-behavior.js';
import './localize-behavior.js';
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
				justify-content: center;
				align-items: center;
				text-align: center;
				color: var(--d2l-color-galena);
				outline: none;
				flex: 1;
				height: 24px;
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
				border-radius: 6px;
				height: 36px;
			}

			.level.selected.assessed:focus {
				background-color: var(--d2l-color-celestine-plus-2);
				border: solid 1px var(--d2l-color-celestine);
			}
			
			.level:hover {
				cursor: pointer;
				background-color: var(--d2l-color-gypsum);
			}

			.level.focused {
				box-shadow: inset 0 0 0 2px white,
							inset 0 0 0 3px var(--d2l-color-celestine-minus-1);
			}

			.level.focused:hover {
				box-shadow: inset 0 0 0 2px var(--d2l-color-gypsum),
							inset 0 0 0 3px var(--d2l-color-celestine-minus-1);
			}

			.level-slider {
				pointer-events: none;
				width: 0;
				opacity: 0;
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
				height: 18px;
			}
			.level.selected:focus .level-tab-focus {
				border-radius: 4px;
				height: 30px;
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
			<input
				type="range"
				class="level-slider"
				min="0"
				max$="[[_getLevelMax(levelEntities)]]"
				value$="[[selected]]"
				aria-valuemin="0"
				aria-valuemax$="[[_getLevelMax(levelEntities)]]"
				aria-valuenow$="[[selected]]"
				aria-valuetext$="[[_getLevelText(selected)]]"
				on-change="_handleChange"
				on-focus="_handleFocus"
				on-blur="_handleBlur"
			/>
			<div
				class="levels"
				role="tablist"
				hidden$="[[_isEditingScore(editingScore, scoreInvalid)]]"
			>
				<template is="dom-repeat" items="[[levelEntities]]">
					<div
						id="level-tab[[index]]"
						class$="[[_getLevelClassName(index, selected, hovered, focused, criterionCells, cellAssessmentMap)]]"
						role="tab"
						data-cell-href$="[[_getCriterionCellHref(criterionCells, index)]]"
						data-index="[[index]]"
						on-mousedown="_handleMouseDown"
						on-mouseover="_handleMouseOver"
						on-mouseout="_handleMouseOut"
						on-click="_handleClick"
						on-track="_handleTrack"
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
		 * The focused level
		 */
		focused: {
			type: Number
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
		this._selectLevel(e.currentTarget.previousSibling);
		e.preventDefault();
	},

	_focusNextLevel: function(e) {
		this._selectLevel(e.currentTarget.nextSibling);
		e.preventDefault();
	},

	_focusLevel: function(index) {
		this.focused = index;
		this.selected = index;
	},

	_selectLevel: function(level) {
		this._focusLevel(level.dataIndex);
		if (!this.readOnly) {
			this.CriterionCellAssessmentHelper.selectAsync(
				() => this.cellAssessmentMap[level.dataset.cellHref]
			);
		}
	},

	focusSlider: function() {
		const slider = this.shadowRoot.querySelector('input.level-slider');
		slider.focus();
	},

	_isSelected: function(index, selected) {
		return selected >= 0 && index === selected;
	},

	_isHovered: function(index, hovered) {
		return hovered >= 0 && index === hovered;
	},

	_isFocused: function(index, focused) {
		return focused >= 0 && index === focused;
	},

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this.levelEntities = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level);
	},

	_getLevelMax: function(levelEntities) {
		return levelEntities.length - 1; // Offset by -1 for zero-indexing
	},

	_getLevelClassName: function(index, selected, hovered, focused, criterionCells, cellAssessmentMap) {
		var className = 'level';
		if (this._isSelected(index, selected)) {
			className += ' selected';
		}
		if (this._isHovered(index, hovered)) {
			className += ' hovered';
		}
		if (this._isFocused(index, focused)) {
			className += ' focused';
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

	_getLevelText: function(index) {
		const item = this.criterionCells[index];
		const levelName = item && item.properties && item.properties.levelName;
		const levelEntity = item && item.getSubEntityByClass(this.HypermediaClasses.text.description);
		const levelDesc = levelEntity && levelEntity.properties && levelEntity.properties.text || '';
		const criterionName = this._getCriterionName();
		return levelName
			? `${levelName}: ${levelDesc}`
			: criterionName
				? `${this._getCriterionName()}: ${this.localize('notScored')}`
				: this.localize('notScored');
	},

	_getCriterionName: function() {
		return this.getRootNode().host._name;
	},

	_getCriterionCellHref: function(criterionCells, index) {
		if (!criterionCells[index]) {
			return null;
		}
		return this._getSelfLink(criterionCells[index]);
	},

	_handleChange: function(evt) {
		const index = parseInt(evt.target.value);
		const level = this.shadowRoot.querySelector(`#level-tab${index}`);
		this._selectLevel(level);
	},

	_handleMouseOver: function(evt) {
		this.hovered = evt.currentTarget.dataIndex;
	},

	_handleMouseOut: function() {
		this.hovered = -1;
	},

	_handleFocus: function() {
		this.focused = Math.max(0, this.selected);
	},

	_handleBlur: function() {
		this.focused = -1;
	},

	_handleMouseDown: function(evt) {
		this.focused = evt.currentTarget.dataIndex;
	},

	_handleClick: function(evt) {
		if (this._preventClick) {
			return;
		}
		this.focusSlider(evt);
		this._selectLevel(evt.currentTarget);
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

		this._focusLevel(e.currentTarget.dataIndex);
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
			this._selectLevel(e.currentTarget);
		});
	}
});
