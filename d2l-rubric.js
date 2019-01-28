/**
`d2l-rubric`
Polymer Web-Component to display rubrics

@demo demo/index.html
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-fetch/d2l-fetch.js';
import './d2l-rubric-criteria-groups.js';
import './d2l-rubric-loading.js';
import './d2l-rubric-overall-score.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './localize-behavior.js';
import './assessment-result-behavior.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-alert/d2l-alert.js';
import 's-html/s-html.js';
import 'd2l-save-status/d2l-save-status.js';
import 'd2l-button/d2l-button-subtle.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;

				--shtml-h1 : {
					display: block;
					font-weight: bold;
					font-size: 2em;
					margin: .67em 0;
				};

				--shtml-h2: {
					display: block;
					font-weight: bold;
					font-size: 1.5em;
					margin: .83em 0;
				};

				--shtml-h3: {
					display: block;
					font-weight: bold;
					font-size: 1.17em;
					margin: 1em 0;
				};

				--shtml-h4: {
					display: block;
					font-weight: bold;
					margin: 1.33em 0;
				};

				--shtml-h5: {
					display: block;
					font-weight: bold;
					font-size: 0.83em;
					margin: 1.67em 0;
				};

				--shtml-h6: {
					display: block;
					font-weight: bold;
					font-size: 0.67em;
					margin: 2.33em 0;
				};
			}
			.score-wrapper {
				pointer-events: none;
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;
				padding-left: 0.6rem;
			}
			.score-wrapper.assessable {
				pointer-events: auto;
			}
			.score-wrapper.assessable:hover {
				color: var(--d2l-color-celestine);
				cursor: pointer;
			}
			.out-of-score-container {
				margin-left: auto;
				display: inline-flex;
			}
			.clear-override-button {
				flex-grow: 1;
				flex-shrink: 1;
			}
			.out-of-container {
				border: 1px solid var(--d2l-color-mica);
				border-radius: 8px;
				text-align: right;
			}
			.out-of-text {
				@apply --d2l-body-compact-text;
				margin-right: 1rem;
				margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				display: flex;
			}
			.out-of-loader {
				margin-top: 24px;
				border: 1px solid var(--d2l-color-mica);
				border-radius: 8px;
				text-align: right;
				height: 30px;
			}
			.left {
				width: 100%;
				text-align: left;
				padding-left: 20px;
			}
			.total {
				width: auto;
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;
			}
			:dir(rtl) .left {
				text-align: right;
				padding-left: 0;
				padding-right: 20px;
			}
			:host(:dir(rtl)) .left {
				text-align: right;
				padding-left: 0;
				padding-right: 20px;
			}
			.right {
				text-align: right;
			}
			:dir(rtl) .right {
				text-align: left;
				padding-left: 20px;
			}
			:host(:dir(rtl)) .right {
				text-align: left;
				padding-left: 20px;
			}
			@media screen and (max-width: 614px) {
				.out-of-container {
					margin-top: 24px;
				}
			}
			.overall-feedback-header {
				@apply --d2l-label-text;
				padding-top: 1.5rem;
			}
			.overall-feedback-text {
				@apply --d2l-body-compact-text;
				display: inline-block;
			}
			.quotation-mark-icon{
				margin-right: 20px
			}
			#editor-save-status-container {
				padding-right: 0.12rem
			}

			:dir(rtl) #editor-save-status-container {
				padding-left: 0.12rem
			}

			:host(:dir(rtl)) #editor-save-status-container {
				padding-left: 0.12rem
			}

			/* Fix for Polymer 2 */
			[hidden] {
				display: none;
			}

		</style>
		<siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></siren-entity>
		<div id="editor-save-status-container">
			<d2l-save-status id="rubric-save-status" class="right"></d2l-save-status>
		</div>
		<template is="dom-repeat" items="[[_alerts]]">
			<d2l-alert type="[[item.alertType]]" button-text="[[localize('refreshText')]]">
				[[item.alertMessage]]
			</d2l-alert>
		</template>
		<slot></slot>
		<d2l-rubric-loading hidden$="[[_hideLoading(_showContent,_hasAlerts)]]"></d2l-rubric-loading>
		<div hidden$="[[_hideLoading(_showContent,_hasAlerts)]]" class="out-of-loader"></div>
		<div hidden$="[[_hideOutOf(_showContent,_hasAlerts)]]">
			<d2l-rubric-criteria-groups href="[[_getHref(_criteriaGroups)]]" assessment-href="[[assessmentHref]]" token="[[token]]" rubric-type="[[rubricType]]" read-only="[[readOnly]]" telemetry-data="[[_telemetryData]]"></d2l-rubric-criteria-groups>
			<div class="out-of-container" hidden="[[!_hasOutOf(entity)]]">
				<div class="out-of-text">
					<div class="left total">[[localize('total')]]</div>
					<div class="out-of-score-container">
						<d2l-button-subtle class="clear-override-button" icon="d2l-tier1:close-small" text="[[localize('clearTotalScoreOverride')]]" on-tap="clearTotalScoreOverride" hidden$="[[!_showClearTotalScoreButton(assessmentEntity)]]">
						</d2l-button-subtle>
						<d2l-rubric-editable-score id="total-score-inner" class$="[[_getOutOfClassName(assessmentEntity)]]" assessment-href="[[assessmentHref]]" token="[[token]]" read-only="[[readOnly]]" editing-score="{{editingScore}}" total-score="[[_score]]" entity="[[entity]]" on-tap="_handleOverrideScore" on-keypress="_handleScoreKeypress" tabindex="0">
						</d2l-rubric-editable-score>
					</div>
				</div>
			</div>
		</div>
		<template is="dom-if" if="[[_hasOverallScore(entity, overallScoreFlag)]]">
			<d2l-rubric-overall-score read-only="[[readOnly]]" href="[[_getOverallLevels(entity)]]" assessment-href="[[assessmentHref]]" token="[[token]]"></d2l-rubric-overall-score>
		</template>
		<div hidden$="[[!_hasOverallFeedback(_feedback)]]">
			<div class="overall-feedback-header"><h2>[[localize('overallFeedback')]]</h2></div>
			<img class="quotation-mark-icon"src="../editor/images/quotation-mark-icon.svg"> </img>
			<s-html class="overall-feedback-text" html$="[[_feedback]]"></s-html>
		</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric',

	properties: {
		readOnly: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		_criteriaGroups: {
			type: Object
		},
		_showContent: {
			type: Boolean,
			value: false
		},
		_score: {
			type: String,
			value: null
		},
		editingScore: {
			type: Number,
			value: -1
		},
		_feedback: {
			type: String,
			value: null
		},
		assessmentHref: {
			type: String,
			reflectToAttribute: true
		},
		rubricType: {
			type: String,
			value: null
		},
		assessmentEntity: {
			type: Object,
			value: null
		},
		_telemetryData: {
			type: Object,
			value: null
		},
		overallScoreFlag: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		_errored: {
			type: Boolean,
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
		'_onEntityChanged(entity)',
		'_onAssessmentEntityChanged(assessmentEntity)'
	],

	listeners: {
		'd2l-siren-entity-save-start': '_onEntitySave',
		'd2l-siren-entity-save-error': '_onEntitySave',
		'd2l-siren-entity-save-end': '_onEntitySave',
		'd2l-siren-entity-error': '_handleError',
		'd2l-alert-button-pressed': '_pageReload'
	},

	_onEntityChanged: function(entity) {
		if (entity) {
			this._telemetryData = {};
			this._telemetryData.rubricMode = this.dataset.rubricMode;
			this._telemetryData.originTool = this.dataset.originTool;
			this._telemetryData.endpoint = this.dataset.telemetryEndpoint;
			this.rubricType = this._findRubricType(entity);
			this._criteriaGroups = entity.getLinkByRel(this.HypermediaRels.Rubrics.criteriaGroups);
			this._showContent = true;
		}
	},

	_onEntitySave: function(e) {
		var saveStateEl = this.$['rubric-save-status'];
		({
			'd2l-siren-entity-save-start': function() { saveStateEl.start(); },
			'd2l-siren-entity-save-end': function() {
				// for Polymer 1 sometimes we aren't getting all end events so reset on end event
				saveStateEl._saving = 1;
				saveStateEl.end();
			},
			'd2l-siren-entity-save-error': function() { saveStateEl.error(); }
		})[e.type]();
	},

	_onAssessmentEntityChanged: function(assessmentEntity) {
		if (assessmentEntity) {
			this._score = this._getScore(assessmentEntity);
			var feedback = assessmentEntity.getSubEntityByClass(this.HypermediaClasses.rubrics.overallFeedback);
			this._feedback = feedback && feedback.properties && feedback.properties.html || '';
		}
	},

	_getHref: function(link) {
		return link.href;
	},

	_getScore: function(entity) {
		var score = entity && entity.properties && entity.properties.score;
		if (!!score || score === 0) {
			return score.toString();
		}
	},

	_findRubricType: function(entity) {
		if (entity.hasClass(this.HypermediaClasses.rubrics.holistic)) {
			return 'holistic';
		} else if (entity.hasClass(this.HypermediaClasses.rubrics.analytic)) {
			return 'analytic';
		} else {
			return null;
		}
	},

	_hasOutOf: function(entity) {
		var outOf = entity && entity.properties && entity.properties.outOf;
		return !!outOf || outOf === 0;
	},

	_hasOverallScore: function(entity, overallScoreFlag) {
		return (
			overallScoreFlag &&
			entity &&
			entity.hasLink(this.HypermediaRels.Rubrics.overallLevels) &&
			!entity.hasClass(this.HypermediaClasses.rubrics.holistic)
		);
	},

	_getOverallLevels: function(entity) {
		return entity.getLink(this.HypermediaRels.Rubrics.overallLevels).href;
	},

	_localizeDashOutOf: function(entity) {
		if (!this._hasOutOf(entity)) return;
		return this.localize('dashOutOf', 'outOf', entity.properties.outOf.toString());
	},

	_localizeOutOf: function(entity, score) {
		if (!this._hasOutOf(entity) || !score) return;
		return this.localize('scoreOutOf', 'score', score, 'outOf', entity.properties.outOf.toString());
	},

	_hideLoading: function(showContent, hasAlerts) {
		return showContent || hasAlerts;
	},
	_hideOutOf: function(showContent, hasAlerts) {
		return !showContent || hasAlerts;
	},

	_hasOverallFeedback: function(feedback) {
		return feedback !== null && feedback !== '';
	},

	_canEditScore: function(assessmentEntity) {
		return !this.readOnly && this.canOverrideTotal(assessmentEntity);
	},

	_getOutOfClassName: function(assessmentEntity) {
		var className = 'score-wrapper right';
		if (this._canEditScore(assessmentEntity)) {
			className += ' assessable';
		}
		return className;
	},

	_handleOverrideScore: function() {
		if (this.readOnly) {
			return;
		}
		this.editingScore = 1;
	},

	_handleScoreKeypress: function(event) {
		if (event.keyCode === 13) {
			this._handleOverrideScore();
		}
	},

	_handleError: function(e) {
		if (this._errored) {
			return;
		}
		this._errored = true;
		this._clearAlerts();
		this.fire('iron-announce', { text: this.localize('rubricLoadingErrorAriaAlert') }, { bubbles: true });
		this._addAlert('error', e.detail.error.message, this.localize('errorText'));
	},

	_pageReload: function() {
		window.location.reload();
	},

	_showClearTotalScoreButton: function(assessmentEntity) {
		if (this.readOnly) {
			return false;
		}
		if (!assessmentEntity) {
			return false;
		}
		if (!this._canEditScore(assessmentEntity)) {
			return false;
		}
		return this.isTotalScoreOverridden();
	}
});
