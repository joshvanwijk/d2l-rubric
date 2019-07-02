import '@polymer/polymer/polymer-legacy.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './localize-behavior.js';
import './d2l-rubric-levels-mobile.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './d2l-rubric-entity-behavior.js';
import 's-html/s-html.js';
import './assessment-result-behavior.js';
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
			.criterion-prev-container,
			.criterion-next-container {
				position: relative;
				width: 34px;
				flex: 0 0 34px;
				cursor: pointer;
			}
			.criterion-prev-container {
				margin-left: -7px;
				margin-right: 22px;
			}
			.criterion-next-container {
				margin-left: 22px;
				margin-right: -7px;
			}
			d2l-button-icon {
				height: 100%;
				position: absolute;
				top: 50%;
				transform: translate(-50%, -50%);
				--d2l-button-icon-min-height: 100%;
			}
			#left-chevron {
				left: 85%;
			}
			.level-name {
				display: flex;
			}
			.level-text {
				font-weight: bold;
			}
			.level-bullet.assessed,
			.level-name.assessed {
				color: var(--d2l-color-celestine-minus-1);
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
		</style>
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>
		<div class="criterion-name">
			<template is="dom-if" if="[[_showCompetencies(assessmentEntity, href, readOnly)]]">
				<d2l-rubric-competencies-icon
					competency-names="[[_getCompetencies(assessmentEntity, href)]]"
					tooltip-position="left"
					mobile
				></d2l-rubric-competencies-icon>
			</template>
			<template is="dom-if" if="[[!isHolistic]]" restamp>
				<d2l-rubric-alignments-indicator 
					href="[[_getActivityLink(_entity)]]" 
					token="[[token]]"
					outcomes-title-text="[[_getOutcomesTitleText()]]"
					mobile
				></d2l-rubric-alignments-indicator>
			</template>
			<span>[[_name]]</span>
		</div>
		<d2l-rubric-levels-mobile href="[[levelsHref]]" assessment-href="[[assessmentHref]]" token="[[token]]" selected="{{_selected}}" level-entities="{{_levelEntities}}" total="{{_total}}" out-of="[[_outOf]]" score="[[_score]]" assessed-level-href="[[_assessedLevelHref]]" read-only="[[readOnly]]" criterion-cells="[[_criterionCells]]" criterion-href="[[_getSelfLink(entity)]]">
		</d2l-rubric-levels-mobile>

		<div id="description" class="criterion-description-container">
			<div class="criterion-prev-container" hidden="[[_hideLeftChevron(_selected)]]" on-tap="_handleTapLeft">
				<d2l-button-icon aria-label$="[[localize('selectNextLevel')]]" id="left-chevron" icon="d2l-tier1:chevron-left"></d2l-button-icon>
			</div>
			<template is="dom-repeat" items="[[_criterionCells]]" as="criterionCell" indexas="index">
				<div id="level-description-panel[[index]]" class="criterion-middle" aria-labelledby$="level-tab[[index]]" role="tabpanel" hidden="[[!_isLevelSelected(index, _selected)]]">
					<div class$="[[_getLevelNameClass(_levelEntities, _selected, _assessedLevelHref)]]">
						<div class="level-text"> [[_getSelectedLevelText(_selected, _levelEntities)]] </div>
						<d2l-icon hidden="[[!_showLevelBullet()]]" class$="[[_getLevelBulletClass(_levelEntities, _selected, _assessedLevelHref)]]" icon="d2l-tier1:bullet"></d2l-icon>
						<div> [[_getSelectedNumberText(_selected, _levelEntities, criterionCell)]] </div>
					</div>
					<div hidden="[[!_hasDescription(criterionCell)]]" class="criterion-description">
						<s-html class="criterion-description-html" html="[[_getCriterionCellText(criterionCell)]]"></s-html>
					</div>
				</div>
			</template>
			<div class="criterion-next-container" hidden="[[_hideRightChevron(_selected)]]" on-tap="_handleTapRight">
				<d2l-button-icon aria-label$="[[localize('selectPreviousLevel')]]" id="right-chevron" icon="d2l-tier1:chevron-right"></d2l-button-icon>
			</div>
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

		assessmentHref: String,

		_levelEntities: Object,

		isHolistic: Boolean,

		isNumeric: Boolean,

		_entity: Object,

		_name: String,

		_outOf: {
			type: Number,
			value: null
		},

		_selected: {
			type: Number,
			value: 0,
			observer: '_selectedChanged'
		},

		_total: Number,

		_criterionCells: Array,

		_assessedLevelHref: String,

		_score: String,

		readOnly: Boolean
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentResultBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior
	],

	observers: [
		'_onEntityChanged(entity)',
		'_onAssessmentResultChanged(_entity, assessmentResult)',
		'_selectAssessedLevel(_levelEntities, _assessedLevelHref)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._name = entity.properties.name;
		this._outOf = entity.properties.outOf;
		this._criterionCells = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterionCell);
		this._entity = entity;
	},

	_onAssessmentResultChanged: function(entity, assessmentResult) {
		if (!entity || !assessmentResult) {
			return;
		}

		this._assessedLevelHref = this.getAssessedLevelHref(entity, assessmentResult);
		if (!this._assessedLevelHref && !this.readOnly) {
			this._assessedLevelHref = null; /* hack for Polymer 1 */
			this._selected = -1;
		}

		var score = this.getAssessedScore(entity, assessmentResult);
		if (score || score === 0) {
			this._score = score.toString();
		} else {
			this._score = score;
		}
	},

	_selectAssessedLevel: function(levelEntities, assessedLevelHref) {
		if (!levelEntities || !assessedLevelHref) {
			return;
		}
		for (var i = 0; i < levelEntities.length; i++) {
			if (this._getSelfLink(levelEntities[i]) === assessedLevelHref) {
				this._selected = i;
				return;
			}
		}
	},

	_hasDescription: function(criterionCell) {
		var description = criterionCell.getSubEntityByClass(this.HypermediaClasses.text.description);
		return !!(description && description.properties && description.properties.html);
	},

	_showCompetencies: function(assessmentEntity, href, readOnly) {
		return !readOnly && !!this._getCompetencies(assessmentEntity, href).length;
	},

	_getCompetencies: function(assessmentEntity, href) {
		if (!assessmentEntity || !assessmentEntity.entities || !href) {
			return [];
		}

		for (var i = 0; i < assessmentEntity.entities.length; i++) {
			var criterionEntity = assessmentEntity.entities[i];
			if (!criterionEntity.hasClass(this.HypermediaClasses.rubrics.criterionCellSelector)) {
				continue;
			}
			var criterionLink = criterionEntity.getLinkByRel(this.HypermediaRels.Rubrics.criterion);
			if (criterionLink && criterionLink.href === href) {
				if (criterionEntity.properties) {
					return criterionEntity.properties.competencies || [];
				} else {
					return [];
				}
			}
		}

		return [];
	},

	_selectedChanged: function(newValue, oldValue) {
		if (oldValue === undefined || newValue === undefined || newValue === oldValue) {
			return;
		}

		this._handledDescriptionAnimation(newValue > oldValue ? 'slide-from-right' : 'slide-from-left', newValue);
	},

	_handleTapLeft: function() {
		if (this._selected > 0) {
			this._selected--;
			this._assessSelected();
		}
	},

	_handleTapRight: function() {
		if (this._selected < this._total - 1) {
			this._selected++;
			this._assessSelected();
		}
	},

	_assessSelected: function() {
		if (!this.readOnly) {
			this.assessCriterionCell(this._getSelfLink(this._criterionCells[this._selected]));
		}
	},

	_handledDescriptionAnimation: function(animation, selected) {
		var element = this.$.description.querySelector('#' + 'level-description-panel' + selected);
		if (!element) {
			return;
		}
		element.classList.remove('slide-from-right');
		element.classList.remove('slide-from-left');
		element.classList.add(animation);
	},

	_hideLeftChevron: function(selected) {
		return selected === 0 || selected === -1;
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
			return this.localize('numberAndPoints', 'number', points.toString());
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

	_getLevelNameClass: function(levelEntities, selected, assessedLevelHref) {
		var className = 'level-name';
		if (levelEntities && levelEntities[selected] && assessedLevelHref) {
			if (this._getSelfLink(levelEntities[selected]) === assessedLevelHref) {
				className += ' assessed';
			}
		}
		return className;
	},
	_getLevelBulletClass: function(levelEntities, selected, assessedLevelHref) {
		var className = 'level-bullet';
		if (levelEntities && levelEntities[selected] && assessedLevelHref) {
			if (this._getSelfLink(levelEntities[selected]) === assessedLevelHref) {
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
	_showLevelBullet: function() {
		return !!(this.isNumeric || this.isHolistic);
	}
});
