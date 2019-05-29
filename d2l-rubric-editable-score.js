import '@polymer/polymer/polymer-legacy.js';
import './localize-behavior.js';
import './assessment-result-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import 'd2l-inputs/d2l-input-text.js';
import './rubric-siren-entity.js';
import 'd2l-tooltip/d2l-tooltip.js';
import '@polymer/iron-media-query/iron-media-query.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-editable-score">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
			:host([overridden-styling]) {
					border-radius: 0.3rem;
					background-color: var(--d2l-color-celestine-plus-2);
			}
			@media screen and (min-width: 615px) {
				:host(:not([editor-styling])) {
					padding: 0.5rem 0.5rem 0.5rem 0.6rem;
				}
				:host(:hover:not([editor-styling])) {
					padding: calc(0.5rem - 1px) calc(0.5rem - 1px) calc(0.5rem - 1px) calc(0.6rem - 1px);
					border-radius: 0.3rem;
					border: 1px solid var(--d2l-color-celestine);
				}
			}
			.total-score-container {
				display: flex;
				justify-content: center;
			}
			.criterion-score-container {
				display: flex;
				justify-content: space-between;
			}
			.editing-component {
				display: inline;
			}
			d2l-input-text {
				width: 75px;
			}
			.score-out-of.overridden {
				color: var(--d2l-color-celestine);
				display: inline-flex;
			}
			.star {
				display: none;
			}
			.score-out-of.overridden .star {
				display: inline-flex;
			}
			.right {
				@apply --d2l-body-compact-text;
				margin-left: 3px;
				display: inline;
				line-height: 2.2rem;
			}
			.clear-override-button-mobile {
				display: none;
			} 
			.override-label {
				display: none;
			} 
			@media screen and (max-width: 614px) {
				.clear-override-button-mobile {
					display: inline-flex;
					padding: 6px 0;
				}
				.override-label {
					margin-left: 12px;	
					padding: 6px 0;
					display: inline-flex;
					font-size: 15px;
					font-weight: bold;
					color: var(--d2l-color-ferrite) !important;
					align-items : center;
				}
				.editing-component {
				 	margin-right: 0;
					display: inline-flex;
					padding: 6px 12px 6px 0;
					align-items : center;
				}
			}
			[hidden] {
				display: none;
			}
		</style>
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[criterionHref]]" token="[[token]]" entity="{{entity}}"></rubric-siren-entity>
		<iron-media-query query="(min-width: 615px)" query-matches="{{_largeScreen}}"></iron-media-query>
		<div id="editable-container">
			<div class$="[[_getContainerClassName(criterionHref)]]" hidden="[[!_isEditingScore(criterionNum, editingScore)]]">
				<template is="dom-if" if="[[!totalScore]]">
					<d2l-button-subtle class="clear-override-button-mobile" id="clear-button" text="[[localize('clearOverride')]]" on-tap="_clearCriterionOverride" hidden$="[[!scoreOverridden]]">
					</d2l-button-subtle>
					<div class="override-label" hidden$="[[scoreOverridden]]">[[localize('overrideLabel')]]</div>
				</template>
				<div class="editing-component">
					<d2l-input-text id="text-area" value="[[getScore(entity, assessmentResult, totalScore)]]" type="number" step="any" min="0" max="100000" on-blur="_blurHandler" on-keypress="_handleKey" prevent-submit="">
					</d2l-input-text>
					<div id="out-of" class="right">[[_localizeOutOf(entity)]]</div>
				</div>	
			</div>
			<template is="dom-if" if="[[!_isEditingScore(criterionNum, editingScore)]]">
				<div class$="[[_getOutOfClassName(scoreOverridden)]]" id="out-of-container">
					[[_localizeOutOf(entity, assessmentResult, totalScore)]]
					<div class="star" id="score-overridden-star">*</div>
				</div>
			</template>
		</div>
		<d2l-tooltip id="override-tooltip" hidden="[[_handleTooltip(scoreOverridden,criterionNum, editingScore)]]" for="editable-container" position="top">[[_localizeStarLabel(totalScore)]]</d2l-tooltip>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-editable-score',

	properties: {
		criterionHref: String,

		/* Entity could be a criterionEntity or a rubricEntity */
		entity: Object,
		_largeScreen: Boolean,
		assessmentHref: {
			type: String,
			value: null
		},
		token: String,

		/* For desktop criteria, this will be the criterion number.
		   For mobile and total score, this will be 1 for true, -1 for false */
		editingScore: {
			type: Number,
			value: -1,
			notify: true,
			observer: '_editingScoreChanged'
		},
		scoreOverridden: {
			type: Boolean,
			value: false
		},
		overriddenStyling: {
			type: Boolean,
			value: false,
			reflectToAttribute: true,
			notify: true
		},
		editorStyling: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		totalScore: {
			type: String,
			value: null
		},
		criterionNum: {
			type: Number,
			value: 1
		},
		readOnly: {
			type: Boolean,
			value: true
		},
		parentCell: {
			type: Object,
			value: null
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentResultBehavior
	],

	observers: [
		'_onAssessmentResultChanged(entity, assessmentResult)',
		'_totalScoreChanged(totalScore, entity)',
		'_editingState(entity,criterionNum, editingScore)'
	],
	ready: function() {
		if (this._largeScreen && this.criterionHref) {
			this.$['override-tooltip'].setAttribute(
				'boundary',
				'{left: 0, right: 200}');
		}
	},

	_onAssessmentResultChanged: function(entity, assessmentResult) {
		if (!entity || !assessmentResult) {
			return;
		}

		if (this.totalScore) {
			this.scoreOverridden = this.isTotalScoreOverridden();
			this.overriddenStyling = this.scoreOverridden;
			return;
		}
		this.scoreOverridden = this.isScoreOverridden(this.criterionHref);
		this.overriddenStyling = this.scoreOverridden;
	},

	focus: function() {
		var elem = this.$['text-area'];
		elem.focus();
		var inputElem = elem.$$('input');
		if (inputElem && this._largeScreen) {
			elem.$$('input').select();
		}
	},

	_editingScoreChanged: function(newValue) {
		if (this._isEditingScore(this.criterionNum, newValue)) {
			afterNextRender(this, function() {
				this.focus();
			}.bind(this));
		}
	},

	_handleKey: function(event) {
		if (event.keyCode === 13) { // enter key
			event.target.blur();
			event.stopPropagation();
			if (this.parentCell) {
				setTimeout(function() { this.parentCell.focus(); }.bind(this), 0);
			}
			return;
		}
	},

	_blurHandler: function(event) {
		if (event.relatedTarget && event.relatedTarget.id === 'clear-button') {
			return;
		}
		var innerInput = event.target.$$('input');
		if (!innerInput || !innerInput.checkValidity()) {
			return;
		}
		this.editingScore = -1;
		var newScore = event.target.value;
		if (newScore === '') {
			this._clearOverride();
			return;
		}
		var oldScore = this.getScore(this.entity, this.assessmentResult, this.totalScore);
		if (newScore === oldScore) {
			// score didn't change so don't save it
			return;
		}
		this._saveScore(newScore);
	},

	_saveScore: function(score) {
		if (this.criterionHref) {
			this.saveCriterionPoints(this.criterionHref, score);
		} else {
			this.saveTotalPoints(score);
		}
	},

	_clearOverride: function() {
		if (this.criterionHref) {
			this.clearCriterionOverride(this.criterionHref);
		} else {
			this.clearTotalScoreOverride();
		}
	},

	_clearCriterionOverride: function(event) {
		event.stopPropagation();
		this.editingScore = -1;
		this.clearCriterionOverride(this.criterionHref);
	},

	getScore: function(entity, assessmentResult, totalScore) {
		if (!entity || !assessmentResult) {
			return;
		}
		if (totalScore) {
			return totalScore;
		}
		return this.getAssessedScore(entity, assessmentResult);
	},

	_localizeOutOf: function(entity, assessmentResult, totalScore) {
		if (!entity || !entity.properties || !entity.properties.outOf) {
			return null;
		}

		var score = null;
		if (totalScore) {
			score = totalScore;
		} else if (assessmentResult) {
			score = this.getAssessedScore(entity, assessmentResult);
		}
		if (score || score === 0) {
			return this.localize('scoreOutOf', 'score', score.toString(), 'outOf', entity.properties.outOf.toString());
		}
		return this.localize('outOf', 'outOf', entity.properties.outOf.toString());
	},

	_getOutOfClassName: function(scoreOverridden) {
		var className = 'score-out-of';
		if (scoreOverridden && !this.readOnly) {
			className += ' overridden';
		}
		return className;
	},

	_getContainerClassName: function(criterionHref) {
		if (!criterionHref) {
			return 'total-score-container';
		}
		return 'criterion-score-container';
	},

	_isEditingScore: function(criterionNum, editingScore) {
		return criterionNum === editingScore;
	},

	_localizeStarLabel: function(totalScore) {
		if (totalScore) {
			return this.localize('overriddenTotalScoreTip');
		} else {
			return this.localize('overriddenScoreTip');
		}
	},

	_totalScoreChanged: function(score, entity) {
		var outOf;
		if (entity && entity.properties) {
			outOf = entity.properties.outOf;
		}
		if (score && outOf) {
			this.fire('d2l-rubric-total-score-changed', {score:score, outOf: outOf.toString()});
		} else if (score) {
			this.fire('d2l-rubric-total-score-changed', {score:score});
		}
	},
	_editingState: function(entity, criterionNum, editingScore) {
		if (!entity) {
			return;
		}
		if (this._isEditingScore(criterionNum, editingScore)) {
			this.editorStyling = true;
			this.overriddenStyling = false;
		}
		if (!this._isEditingScore(criterionNum, editingScore)) {
			this.editorStyling = false;
			if (this.scoreOverridden) {
				this.overriddenStyling = true;
			}
		}
	},
	_handleTooltip: function(scoreOverridden, criterionNum, editingScore) {
		return !scoreOverridden || this._isEditingScore(criterionNum, editingScore);
	}
});
