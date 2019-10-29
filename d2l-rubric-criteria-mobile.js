import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './d2l-rubric-criterion-mobile.js';
import './d2l-rubric-levels-mobile.js';
import './d2l-rubric-feedback.js';
import 'd2l-colors/d2l-colors.js';
import './d2l-rubric-entity-behavior.js';
import './assessment-result-behavior.js';
import './rubric-siren-entity.js';
import './localize-behavior.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import 'fastdom/fastdom.js';
import 'd2l-button/d2l-button-subtle.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criteria-mobile">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
			.line {
				border: solid 0.5px var(--d2l-color-mica);
			}
			.add-feedback-button {
				margin-left:1.8rem;
			}
			d2l-rubric-feedback {
				margin-left: 48px;
				margin-right: 42px;
			}
			[hidden] {
				display: none !important;
			}
		</style>
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>
		<hr class="line">
		<template is="dom-repeat" items="[[_criteria]]" as="criterion" index-as="criterionNum">
			<d2l-rubric-criterion-mobile href="[[_getSelfLink(criterion)]]" levels-href="[[levelsHref]]" assessment-href="[[assessmentHref]]" token="[[token]]" is-holistic="[[isHolistic]]" is-numeric="[[isNumeric]]" read-only="[[readOnly]]">
			</d2l-rubric-criterion-mobile>
			<d2l-button-subtle class="add-feedback-button" hidden="[[!_addFeedback(criterion, assessmentResult, criterionNum, _addingFeedback, _savingFeedback, _feedbackInvalid)]]" text="[[localize('addFeedback')]]" on-click="_handleAddFeedback" data-criterion$="[[criterionNum]]"></d2l-button-subtle>
			<template is="dom-if" if="[[_displayFeedback(_feedbackDisplay, criterionNum, _addingFeedback, _savingFeedback, _feedbackInvalid)]]">
				<d2l-rubric-feedback id="feedback[[criterionNum]]" criterion-href="[[_getSelfLink(criterion)]]" assessment-href="[[assessmentHref]]" token="[[token]]" adding-feedback="[[_cellAddingFeedback(criterionNum, _addingFeedback)]]" on-save-feedback="_handleSaveFeedback" on-save-feedback-finished="_handleSaveFinished" on-close-feedback="_closeFeedback">
				</d2l-rubric-feedback>
			</template>
			<hr class="line">
		</template>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criteria-mobile',

	properties: {
		_criteria: {
			type: Array
		},

		/**
		 * The href of the rubric criteria
		 */
		levelsHref: String,
		assessmentHref: String,
		isHolistic: Boolean,
		isNumeric: Boolean,
		readOnly: Boolean,
		_feedbackDisplay: {
			type: Array,
			value: null
		},
		_addingFeedback: {
			type: Number,
			value: -1
		},
		_savingFeedback: {
			type: Array,
			value: function() {
				return [];
			}
		},
		_feedbackInvalid: {
			type: Array,
			value: function() {
				return [];
			}
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentResultBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior
	],

	observers: [
		'_onEntityChanged(entity)',
		'_updateFeedbackDisplay(_criteria, assessmentResult)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._criteria = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterion);
	},

	_updateFeedbackDisplay: function(criteriaEntities, assessmentResult) {
		if (!criteriaEntities || !assessmentResult) {
			return;
		}

		var feedbackDisplay = [];
		for (var i = 0; i < criteriaEntities.length; i++) {
			feedbackDisplay[i] = this._hasFeedback(criteriaEntities[i], assessmentResult);
		}
		this._feedbackDisplay = feedbackDisplay;
	},

	_getSelfLink: function(entity) {
		return entity && (entity.getLinkByRel('self') || {}).href || '';
	},

	_hasFeedback: function(criterionEntity, assessmentResult) {
		return !!this.getAssessmentFeedback(criterionEntity, assessmentResult);
	},

	_getFeedback: function(entity, assessmentResult) {
		if (entity && assessmentResult) {
			return this.getAssessmentFeedback(entity, assessmentResult);
		}
	},

	_addFeedback: function(entity, assessmentResult, criterionNum, addingFeedback, savingFeedback, feedbackInvalid) {
		if (!entity || !assessmentResult) {
			return false;
		}
		if (this.readOnly) {
			return false;
		}
		if (!this.canAddFeedback(entity)) {
			return false;
		}
		if (criterionNum === addingFeedback || savingFeedback.includes(criterionNum) || feedbackInvalid[criterionNum]) {
			return false;
		}
		return !this._hasFeedback(entity, assessmentResult);
	},

	_displayFeedback: function(feedbackDisplay, criterionNum, addingFeedback, savingFeedback, feedbackInvalid) {
		if (!feedbackDisplay) {
			return;
		}
		return feedbackDisplay[criterionNum] || criterionNum === addingFeedback || savingFeedback.includes(criterionNum) || feedbackInvalid[criterionNum];
	},

	_cellAddingFeedback: function(addingFeedback, criterionNum) {
		return criterionNum === addingFeedback;
	},

	_handleAddFeedback: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this._addingFeedback = criterionNum;
		fastdom.mutate(function() {
			dom(this.root).querySelector('#feedback' + criterionNum).focus();
		}.bind(this));
	},

	_handleSaveFeedback: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this.push('_savingFeedback', criterionNum);
	},

	_handleSaveFinished: function(event) {
		var criterionNum = event.model.get('criterionNum');
		var index = this._savingFeedback.indexOf(criterionNum);
		this.splice('_savingFeedback', index, 1);

		this.set(['_feedbackInvalid', criterionNum], !event.detail.success);
	},

	_closeFeedback: function() {
		this._addingFeedback = -1;
	}
});
