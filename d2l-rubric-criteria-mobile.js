import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './d2l-rubric-criterion-mobile.js';
import './d2l-rubric-levels-mobile.js';
import './d2l-rubric-feedback.js';
import './d2l-rubric-entity-behavior.js';
import './assessment-behavior.js';
import './localize-behavior.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import 'fastdom/fastdom.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

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
			.line:last-of-type {
				display: none;
			}

			.add-feedback-button {
				margin-left:1.8rem;
			}
			d2l-rubric-feedback {
				margin: 0 22px;
			}
			[hidden] {
				display: none !important;
			}
		</style>
		<template is="dom-repeat" items="[[_criteria]]" as="criterion" index-as="criterionNum">
			<d2l-rubric-criterion-mobile
				href="[[_getSelfLink(criterion)]]"
				levels-href="[[levelsHref]]"
				assessment-criterion-href="[[_getCriterionAssessmentHref(criterion, criterionResultMap)]]"
				cell-assessment-map="[[cellAssessmentMap]]"
				token="[[token]]"
				is-holistic="[[isHolistic]]"
				is-numeric="[[isNumeric]]"
				read-only="[[readOnly]]"
				compact="[[compact]]">
			</d2l-rubric-criterion-mobile>
			<d2l-button-subtle
				class="add-feedback-button"
				hidden="[[!_showAddFeedback(criterion, criterionResultMap, criterionNum, _addingFeedback, readOnly,  _savingFeedback.*, _feedbackInvalid.*)]]"
				text="[[localize('addFeedback')]]"
				description="[[_localizeAddFeedbackButtonDescription(criterion)]]"
				on-click="_handleAddFeedback"
				data-criterion$="[[criterionNum]]">
			</d2l-button-subtle>
			<template is="dom-if" if="[[_displayFeedback(criterion, criterionResultMap, criterionNum, _addingFeedback, _savingFeedback.*, _feedbackInvalid.*)]]">
				<d2l-rubric-feedback
					id="feedback[[criterionNum]]"
					criterion-href="[[_getSelfLink(criterion)]]"
					criterion-assessment-href="[[_getCriterionAssessmentHref(criterion, criterionResultMap)]]"
					token="[[token]]"
					adding-feedback="[[_cellAddingFeedback(criterionNum, _addingFeedback)]]"
					on-save-feedback="_handleSaveFeedback"
					on-save-feedback-finished="_handleSaveFinished"
					on-close-feedback="_closeFeedback"
					read-only=[[readOnly]]
					enable-feedback-copy="[[enableFeedbackCopy]]"
					compact="">
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
		assessmentEntity: Object,
		criterionResultMap: Object,
		cellAssessmentMap: Object,
		isHolistic: Boolean,
		isNumeric: Boolean,
		readOnly: Boolean,
		enableFeedbackCopy: Boolean,
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
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior
	],

	observers: [
		'_onEntityChanged(entity)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._criteria = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterion);
	},

	_getSelfLink: function(entity) {
		return entity && (entity.getLinkByRel('self') || {}).href || '';
	},

	_hasFeedback: function(criterionEntity, criterionResultMap) {
		return !!this.CriterionAssessmentHelper.getFeedbackText(this._lookupMap(criterionEntity, criterionResultMap));
	},

	_showAddFeedback: function(entity, criterionResultMap, criterionNum, addingFeedback, readOnly) {
		if (!entity || readOnly) {
			return false;
		}

		const criterionResult = this._lookupMap(entity, criterionResultMap);
		if (!criterionResult || !criterionResult.getActionByName('update-critierion-assessment')) {
			return false;
		}
		if (criterionNum === addingFeedback || this._savingFeedback[criterionNum] || this._feedbackInvalid[criterionNum]) {
			return false;
		}
		return !this.CriterionAssessmentHelper.getFeedbackText(criterionResult);
	},

	_displayFeedback: function(criterionEntity, criterionResultMap, criterionNum, addingFeedback) {
		return this._hasFeedback(criterionEntity, criterionResultMap) || criterionNum === addingFeedback || this._savingFeedback[criterionNum] || this._feedbackInvalid[criterionNum];
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

	_handleSaveStart: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this.set(['_savingFeedback', criterionNum], event.detail.hasPendingSaves);
		this.set(['_feedbackInvalid', criterionNum], false);
	},

	_handleSaveFinished: function(event) {
		var criterionNum = event.model.get('criterionNum');
		this.set(['_savingFeedback', criterionNum], event.detail.hasPendingSaves);
		this.set(['_feedbackInvalid', criterionNum], !event.detail.success);
	},

	_closeFeedback: function() {
		this._addingFeedback = -1;
	},

	_getCriterionAssessmentHref: function(rubricCriterionEntity, criterionResultMap) {
		if (!rubricCriterionEntity || !criterionResultMap) {
			return null;
		}

		const selfLink = rubricCriterionEntity.getLinkByRel('self');
		if (!selfLink || !selfLink.href) {
			return null;
		}

		const assessmentCriterion = criterionResultMap[selfLink.href];
		if (!assessmentCriterion) {
			return null;
		}
		return assessmentCriterion.getLinkByRel('self').href;
	},

	_lookupMap: function(entity, map) {
		if (!entity || !map) {
			return null;
		}
		const entityHref = this._getSelfLink(entity);
		return entityHref && map[entityHref];
	},

	_localizeAddFeedbackButtonDescription: function(criterion) {
		if (!criterion || !criterion.properties || !criterion.properties.name) {
			return null;
		}

		return this.localize('addFeedbackFor', 'criterionName', criterion.properties.name);
	}
});
