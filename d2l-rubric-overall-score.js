import '@polymer/polymer/polymer-legacy.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-colors/d2l-colors.js';
import './localize-behavior.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './rubric-siren-entity.js';
import 's-html/s-html.js';
import 'd2l-table/d2l-scroll-wrapper.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-offscreen/d2l-offscreen.js';
import './d2l-rubric-action-behavior.js';
import './assessment-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import './d2l-rubric-competencies-icon.js';
import '@brightspace-ui/core/components/button/button-subtle.js';

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

			:host([compact]) .overall-level:not([data-achieved]) {
				display: none;
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
			:host(:not([compact])) .overall-level-text {
				margin: 0;
			}

			h4 > d2l-icon[icon="d2l-tier1:check"] {
				display: none;
				color: var(--d2l-color-celestine);
				align-self: flex-start;
			}

			.clear-override-label {
				color: var(--d2l-color-celestine);
				text-align: center;
				font-size: 0.85rem;
				margin-bottom: -1rem;
				width: 100%;
			}

			.content-container {
				display: inline-flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
			}

			.info-container {
				display: flex;
				flex-direction: column;
			}
			:host([compact]) .info-container {
				flex-direction: row;
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

		<rubric-siren-entity href="[[overallLevelAssessmentHref]]" token="[[token]]" entity="{{_assessmentEntity}}"></rubric-siren-entity>
		<template is="dom-if" if="[[_showOverallScore(compact, _overallLevel)]]">
			<h3>
				<span>[[localize('overallScore')]]</span>
				<template is="dom-if" if="[[_showCompetencies(_competencies,readOnly)]]">
					<d2l-rubric-competencies-icon
						competency-names="[[_competencies]]"
						mobile="[[compact]]"
						tooltip-position="[[_competenciesIconTooltipPosition(compact)]]"
					></d2l-rubric-competencies-icon>
				</template>
			</h3>
			<d2l-scroll-wrapper show-actions="" role="group" aria-labelledby="overall-grouping-label">
				<d2l-offscreen id="overall-grouping-label">[[localize('overallScore')]]</d2l-offscreen>
				<div class="overall-levels" data-mobile$="[[compact]]" role$="[[_ifAssessible(readOnly, 'radiogroup')]]">
					<template is="dom-repeat" items="[[_levels]]" as="level" index-as="i">
						<div
							class="overall-level"
							role$="[[_ifAssessible(readOnly, 'radio')]]"
							aria-labelledby$="level-content-[[i]]"
							aria-checked$="[[_ariaChecked(readOnly, level, _version)]]"
							data-achieved$="[[_isAchieved(level, _version)]]"
							data-clickable$="[[_isClickable(level, readOnly, _version)]]"
							on-click="_levelClicked"
							on-keypress="_handleKeypress"
							tabindex$="[[_handleTabIndex(readOnly, overallLevelAssessmentHref)]]">
							<h4 class="content-container">
								<div class="info-container" id="level-content-[[i]]">
									<span>[[_getLevelName(level, _version)]]</span>
									<span class="overall-level-text">
										<span>[[_localizePoints(level)]]</span>
										<template is="dom-if" if="[[!compact]]">
											<br hidden="[[!_scoreVisible(level)]]">
											<s-html hidden="[[!_getDescriptionHtml(level)]]" html$="[[_getDescriptionHtml(level)]]"></s-html>
										</template>
										<template is="dom-if" if="[[compact]]">
											<d2l-icon icon="tier1:bullet"></d2l-icon>
											<span>[[_getDescriptionText(level)]]</span>
										</template>
									</span>
								</div>
								<d2l-icon icon="d2l-tier1:check"></d2l-icon>
							</h4>
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
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-overall-score',

	properties: {
		compact: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		readOnly: Boolean,
		_levels: Array,
		_competencies: Array,
		overallLevelAssessmentHref: String,
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
		D2L.PolymerBehaviors.Rubric.ActionBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior
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
		afterNextRender(this, () => {
			const scrollWrapper = this.shadowRoot.querySelector('d2l-scroll-wrapper');
			if (scrollWrapper) {
				scrollWrapper.checkScrollbar();
			}
		});
	},

	_onAssessmentEntityChanged: function(assessmentEntity) {
		this._assessmentMap = {};
		this._competencies = [];

		if (!assessmentEntity) {
			return;
		}

		this._competencies = assessmentEntity.properties.competencies || [];
		assessmentEntity.getSubEntitiesByClass('assessment-overall-level').forEach(level => {
			const rubricOverallLevelLink = level.getLinkByRel(this.HypermediaRels.Rubrics.overallLevel);
			this._assessmentMap[rubricOverallLevelLink.href] = level;
		});
		this._version = (this._version || 0) + 1;
	},

	_getAssessmentLevel: function(levelEntity) {
		return this._assessmentMap[levelEntity.getLinkByRel('self').href];
	},

	_isAchieved: function(levelEntity) {
		const assessmentLevel = this._getAssessmentLevel(levelEntity);
		return this.OverallLevelAssessmentHelper.isSelected(assessmentLevel);
	},

	_showCompetencies: function(competencies, readOnly) {
		return competencies && competencies.length && !readOnly;
	},

	_competenciesIconTooltipPosition: function(compact) {
		return compact ? 'left' : 'top';
	},

	_getDescriptionHtml: function(levelEntity) {
		return levelEntity.getSubEntityByClass(this.HypermediaClasses.rubrics.description).properties.html;
	},

	_getDescriptionText: function(levelEntity) {
		return levelEntity.getSubEntityByClass(this.HypermediaClasses.rubrics.description).properties.text;
	},

	_localizePoints: function(levelEntity) {
		return this._scoreVisible(levelEntity) ? this.localize('pointsMinimum', 'number', levelEntity.properties.rangeStart.toString()) : '';
	},

	_scoreVisible: function(levelEntity) {
		if (this.readOnly && this.overallLevelAssessmentHref) {
			// Minimum points is not shown in graded view
			return false;
		}
		var rangeStart = levelEntity.properties.rangeStart;
		return rangeStart !== null && rangeStart !== undefined;
	},

	_showClearOverrideButton: function(levelEntity) {
		const levelAssessment = this._getAssessmentLevel(levelEntity);
		return this.OverallLevelAssessmentHelper.canClearOverride(levelAssessment);
	},

	_isClickable: function(levelEntity, readOnly) {
		const levelAssessment = this._getAssessmentLevel(levelEntity);
		return !readOnly && this.OverallLevelAssessmentHelper.canSelectOrClear(levelAssessment);
	},

	_levelClicked: function(event) {
		if (this.readOnly) {
			return;
		}
		this.OverallLevelAssessmentHelper.selectOrClearAsync(
			() => this._getAssessmentLevel(event.model.get('level'))
		);
	},

	_handleKeypress: function(event) {
		if (event.keyCode === 13 && !this.readOnly) {
			event.preventDefault();
			this._levelClicked(event);
		}
	},

	_overallLevelChanged: function(levelName) {
		this.dispatchEvent(new CustomEvent('d2l-rubric-overall-level-changed', {
			detail: {
				name: levelName,
			},
			bubbles: true,
			composed: true,
		}));
	},

	_handleTabIndex: function(readOnly, overallLevelAssessmentHref) {
		if (readOnly || !overallLevelAssessmentHref) {
			return undefined;
		}
		return 0;
	},

	_showOverallScore: function(compact, overallLevel) {
		return !compact || !!overallLevel;
	},

	_getLevelName: function(level) {
		let name = level.properties.name || '';
		if (this._showClearOverrideButton(level)) {
			name += ' *';
		}
		return name;
	},

	_ifAssessible: function(readOnly, value) {
		return readOnly ? undefined : value;
	},

	_ariaChecked: function(readOnly, levelEntity) {
		return (!readOnly && this._isAchieved(levelEntity)) ? 'true' : 'false';
	}
});
