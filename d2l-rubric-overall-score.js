import '@polymer/polymer/polymer-legacy.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-colors/d2l-colors.js';
import './localize-behavior.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './rubric-siren-entity.js';
import 's-html/s-html.js';
import '@polymer/iron-media-query/iron-media-query.js';
import 'd2l-table/d2l-scroll-wrapper.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import './d2l-rubric-competencies-icon.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-overall-score">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				width: 100%;
			}

			h4 {
				@apply --d2l-heading-4;
				margin: 0;
			}

			h3 {
				@apply --d2l-heading-3;
			}

			.overall-levels {
				width: 100%;
				display: flex;
				align-items: stretch;
			}

			.overall-levels[data-mobile] {
				flex-direction: column;
			}

			.overall-level {
				box-sizing: border-box;
				min-width: 165px;
				flex-grow: 1;
				padding: 1rem;
				margin-right: 0.6rem;
				border: 1px solid var(--d2l-color-mica);
				border-radius: 8px;
			}

			.overall-level[data-achieved] {
				background-color: var(--d2l-color-celestine-plus-2) !important;
				border-color: var(--d2l-color-celestine);
			}

			.overall-level[data-achieved] h4 > d2l-icon {
				display: block;
			}

			.overall-level[data-clickable] {
				cursor: pointer;
			}

			.overall-level[data-clickable]:hover, .overall-level[data-clickable]:focus {
				background-color: var(--d2l-color-sylvite);
			}

			.overall-levels[data-mobile] .overall-level {
				flex-grow: 0;
				margin-right: 0;
				margin-bottom: 0.6rem;
				min-width: 0;
			}

			.overall-level:last-child {
				margin-right: 0;
			}

			.overall-level-text {
				@apply --d2l-body-small-text;
			}

			h4 > d2l-icon {
				display: none;
				float: right;
				color: var(--d2l-color-celestine);
			}

			.clear-override-label {
				color: var(--d2l-color-celestine);
				text-align: center;
				font-size: 0.85rem;
				margin-bottom: -1rem;
				width: 100%;
			}

			.clear-override-label[hidden] {
				display:none;
			}

			d2l-scroll-wrapper {

				--d2l-scroll-wrapper-h-scroll: {
					border-left: 1px dashed var(--d2l-color-mica);
					border-right: 1px dashed var(--d2l-color-mica);
				};

				--d2l-scroll-wrapper-left: {
					border-left: none;
				};

				--d2l-scroll-wrapper-right: {
					border-right: none;
				};

				--d2l-scroll-wrapper-border-color: var(--d2l-color-mica);
				--d2l-scroll-wrapper-background-color: var(--d2l-color-regolith);
			}
			
			d2l-rubric-competencies-icon {
				margin-top: 1px;
				margin-left: 10px;
			}
			
			d2l-rubric-competencies-icon[mobile] {
				float: right;
				margin-left: 2px;
			}

			s-html {
				overflow: hidden;
				width: 100%;
				word-wrap: break-word;
			}
		</style>

	<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{_assessmentEntity}}"></rubric-siren-entity>
	<iron-media-query query="(min-width: 615px)" query-matches="{{_largeScreen}}"></iron-media-query>
	<h3>
		<span>[[localize('overallScore')]]</span>
		<template is="dom-if" if="[[_showCompetencies(_competencies,readOnly)]]">
			<d2l-rubric-competencies-icon
				competency-names="[[_competencies]]"
				mobile="[[!_largeScreen]]"
				tooltip-position="[[_competenciesIconTooltipPosition(_largeScreen)]]"
			></d2l-rubric-competencies-icon>
		</template>
	</h3>
	<d2l-scroll-wrapper show-actions="" role="group" aria-labelledby="overall-grouping-label">
		<d2l-offscreen id="overall-grouping-label">[[localize('overallScore')]]</d2l-offscreen>
		<div class="overall-levels" data-mobile$="[[!_largeScreen]]">
			<template is="dom-repeat" items="[[_levels]]" as="level">
				<div class="overall-level" data-achieved$="[[_isAchieved(level, _version)]]" data-clickable$="[[_isClickable(level, _version)]]" on-click="_levelClicked" on-keypress="_handleKeypress" tabindex$="[[_handleTabIndex()]]">
					<h4>
						<span>[[level.properties.name]]</span>
						<span hidden="[[!_showClearOverrideButton(level, _version)]]">&nbsp;*</span>
						<d2l-icon icon="d2l-tier1:check"></d2l-icon>
					</h4>
					<span class="overall-level-text">
						<span>[[_localizePoints(level)]]</span>
						<br hidden="[[!_scoreVisible(level)]]">
						<s-html hidden="[[!_getDescriptionHtml(level)]]" html$="[[_getDescriptionHtml(level)]]"></s-html>
					</span>
					<span class="clear-override-label">
					<d2l-button-subtle
					class="clear-override-label"
					hidden="[[!_showClearOverrideButton(level, _version)]]"
					icon="d2l-tier1:close-small"
					text="[[localize('clearOverride')]]"
					></d2l-button-subtle>
					</span>
				</div>
			</template>
		</div>
	</d2l-scroll-wrapper>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-overall-score',

	properties: {
		readOnly: Boolean,
		_levels: Array,
		_competencies: Array,
		_largeScreen: Boolean,
		_assessmentEntity: {
			type: Object,
			value: null
		},
		_assessmentMap: {
			type: Object,
			value: {}
		},
		_version: {
			type: Number,
			value: 0
		},
		_overallLevel: {
			type: String,
			value: null,
			observer: '_overallLevelChanged'
		},
		hasOutOf: {
			type: Boolean
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior
	],

	observers: [
		'_onAssessmentEntityChanged(_assessmentEntity)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._levels = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.overallLevel) || [];
		this._version = (this._version || 0) + 1;
		afterNextRender(this, function() {
			this.$$('d2l-scroll-wrapper').checkScrollbar();
		}.bind(this));
	},

	_onAssessmentEntityChanged: function(assessmentEntity) {
		this._assessmentMap = {};
		this._competencies = [];

		if (!assessmentEntity) {
			return;
		}

		var selector = assessmentEntity.getSubEntityByClass(this.HypermediaClasses.rubrics.overallLevelSelector);
		if (!selector) {
			return;
		}

		if (selector.properties && selector.properties.competencies) {
			this._competencies = selector.properties.competencies;
		}

		selector.entities.forEach(function(assessmentLevel) {
			if (assessmentLevel.hasClass(this.HypermediaClasses.rubrics.selected)) {
				this._overallLevel = assessmentLevel.properties.name;
			}
			var rubricLevelLink = assessmentLevel.getLinkByRel(this.HypermediaRels.Rubrics.overallLevel);
			if (rubricLevelLink && rubricLevelLink.href) {
				this._assessmentMap[rubricLevelLink.href] = assessmentLevel;
			}
		}.bind(this));
		this._version = (this._version || 0) + 1;
	},

	_getAssessmentLevel: function(levelEntity) {
		return this._assessmentMap[levelEntity.getLinkByRel('self').href];
	},

	_isAchieved: function(levelEntity) {
		var assessmentLevel = this._getAssessmentLevel(levelEntity);
		return assessmentLevel && assessmentLevel.hasClass(this.HypermediaClasses.rubrics.selected);
	},

	_showCompetencies: function(competencies, readOnly) {
		return competencies && competencies.length && !readOnly;
	},

	_competenciesIconTooltipPosition: function(largeScreen) {
		return largeScreen ? 'top' : 'left';
	},

	_getDescriptionHtml: function(levelEntity) {
		return levelEntity.getSubEntityByClass(this.HypermediaClasses.rubrics.description).properties.html;
	},

	_localizePoints: function(levelEntity) {
		return this._scoreVisible(levelEntity) ? this.localize('pointsMinimum', 'number', levelEntity.properties.rangeStart.toString()) : '';
	},

	_scoreVisible: function(levelEntity) {
		if (this.readOnly && this.assessmentHref) {
			// Minimum points is not shown in graded view
			return false;
		}
		var rangeStart = levelEntity.properties.rangeStart;
		return rangeStart !== null && rangeStart !== undefined;
	},

	_showClearOverrideButton: function(levelEntity) {
		// clear override button should not show up for text-only rubrics
		if (!this.hasOutOf) {
			return false;
		}
		var action = this._getOnClickAction(levelEntity);
		return action && action.name === 'remove-overall-level-override';
	},

	_getOnClickAction: function(levelEntity) {
		if (this.readOnly || !this._assessmentEntity) {
			return null;
		}

		var assessmentLevelEntity = this._getAssessmentLevel(levelEntity);
		if (!assessmentLevelEntity) {
			return null;
		}

		return (
			assessmentLevelEntity.getActionByName('select-overall-level') ||
			assessmentLevelEntity.getActionByName('remove-overall-level-override')
		);
	},

	_isClickable: function(levelEntity) {
		return !!this._getOnClickAction(levelEntity);
	},

	_levelClicked: function(event) {
		var levelEntity = event.model.level;
		if (!levelEntity) {
			return;
		}

		window.D2L.Rubric.Assessment.promise = window.D2L.Rubric.Assessment.promise.then(
			function() {
				// Gets the most up-to-date version of the action
				var action = this._getOnClickAction(levelEntity);
				if (!action) {
					return;
				}

				return this.performSirenAction(action);
			}.bind(this)
		).catch(console.error); // eslint-disable-line no-console
	},

	_handleKeypress: function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			this._levelClicked(event);
		}
	},

	_overallLevelChanged: function(levelName) {
		this.fire('d2l-rubric-overall-level-changed', {name: levelName});
	},

	_handleTabIndex: function() {
		if (this.readOnly || !this.assessmentHref) {
			return undefined;
		}
		return 0;
	}
});
