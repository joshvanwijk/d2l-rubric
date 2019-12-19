import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './assessment-result-behavior.js';
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
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>
		<div class="levels-container">
			<div class="levels" role="tablist" hidden$="[[_isEditingScore(editingScore, scoreInvalid)]]">
				<template is="dom-repeat" items="[[levelEntities]]">
					<div
						id="level-tab[[index]]"
						class$="[[_getLevelClassName(index, selected, item, assessedLevelHref)]]"
						on-click="handleTap"
						data-index="[[index]]"
						role="tab"
						on-keydown="_onKeyDown"
						tabindex="0"
						aria-selected$="[[_isSelected(index, selected)]]"
						aria-controls$="level-description-panel[[index]]"
						aria-label$="[[_getLevelLabelName(item, assessedLevelHref)]]"
						data-cell-href$="[[_getCriterionCellHref(criterionCells, index)]]">
						<div class="level-tab-focus">
							<d2l-icon
								hidden$="[[!_isAssessedLevel(item, assessedLevelHref)]]"
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
		 * The total number of levels
		 */
		total: {
			type: Number,
			notify: true
		},

		/**
		 * The selected level
		 */
		selected: {
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

		assessmentHref: {
			type: String,
			value: null
		},

		assessedLevelHref:{
			type: String,
			value:null
		},

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
		D2L.PolymerBehaviors.Rubric.AssessmentResultBehavior
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
					this.assessCriterionCell(e.currentTarget.dataset.cellHref);
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
		if (e.currentTarget.dataIndex !== this.total - 1) {
			e.currentTarget.nextSibling.focus();
			e.preventDefault();
		}
	},

	_isSelected: function(index, selected) {
		return selected >= 0
			? index === selected
			: index === 0;
	},

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this.total = entity.properties.total;
		this.levelEntities = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level);
	},

	_getLevelClassName: function(index, selected, level, assessedLevelHref) {
		var className = 'level';
		if (index === selected) {
			className += ' selected';
		}
		if (this._isAssessedLevel(level, assessedLevelHref)) {
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

	_hasScore: function(score) {
		return !!score || score === 0;
	},

	_isAssessedLevel: function(levelEntity, assessedLevelHref) {
		if (this.getSelfLink(levelEntity) === assessedLevelHref) {
			return true;
		}
		return false;
	},

	getSelfLink: function(entity) {
		return entity && (entity.getLinkByRel('self') || {}).href || '';
	},

	_getLevelLabelName: function(item, assessedLevelHref) {
		if (this._isAssessedLevel(item, assessedLevelHref)) {
			return item.properties.name;
		}
	},

	_getCriterionCellHref: function(criterionCells, index) {
		return this.getSelfLink(criterionCells[index]);
	},

	handleTap: function(event) {
		this._selectLevel(event);
		if (this.readOnly) {
			return;
		}
		this.assessCriterionCell(event.currentTarget.dataset.cellHref);
	},

	_canEditScore: function(criterionHref) {
		return !this.readOnly && this.canOverrideScore(criterionHref);
	},

	_getScoreWrapperClassName: function(criterionHref, editingScore, scoreInvalid) {
		var className = 'score-wrapper';
		if (this._canEditScore(criterionHref)) {
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
	}
});
