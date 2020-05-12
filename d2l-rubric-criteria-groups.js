import '@polymer/polymer/polymer-legacy.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-fetch/d2l-fetch.js';
import './d2l-rubric-criteria-group.js';
import './d2l-rubric-criteria-group-mobile.js';
import './d2l-rubric-loading.js';
import './telemetry-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import '@polymer/iron-media-query/iron-media-query.js';
import './d2l-rubric-assessment-criterion-entity-loader.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criteria-groups">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
			d2l-rubric-criteria-group {
				padding-bottom: 24px;
			}
		</style>

		<d2l-rubric-loading hidden$="[[_showContent]]"></d2l-rubric-loading>
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>

		<template is="dom-repeat" items="[[_getCriterionAssessmentHrefs(assessmentEntity)]]" as="criterionAssessmentHref" on-dom-change="_onAssessmentDomChanged">
			<d2l-rubric-assessment-criterion-entity-loader
				href="[[criterionAssessmentHref]]"
				token="[[token]]"
				criterion-assessment-map="{{_criterionResultMap}}"
				cell-assessment-map="{{_cellAssessmentMap}}"
			></d2l-rubric-assessment-criterion-entity-loader>
		</template>

		<template is="dom-if" if="[[!compact]]" restamp>
			<template is="dom-repeat" items="[[_groups]]">
				<d2l-rubric-criteria-group
					href="[[_getSelfLink(item)]]"
					assessment-entity="[[assessmentEntity]]"
					token="[[token]]"
					rubric-type="[[rubricType]]"
					enable-feedback-copy="[[enableFeedbackCopy]]"
					read-only="[[readOnly]]"
					hidden$="[[!_showContent]]"
					criterion-result-map="[[_criterionResultMap]]"
					cell-assessment-map="[[_cellAssessmentMap]]"
				></d2l-rubric-criteria-group>
			</template>
			<slot name="total-score"></slot>
			<slot></slot>
		</template>
		<template is="dom-if" if="[[compact]]" restamp>
			<slot name="total-score"></slot>
			<template is="dom-repeat" items="[[_groups]]">
				<d2l-rubric-criteria-group-mobile
					href="[[_getSelfLink(item)]]"
					assessment-entity="[[assessmentEntity]]"
					token="[[token]]"
					read-only="[[readOnly]]"
					compact="[[compact]]"
					hidden$="[[!_showContent]]"
					criterion-result-map="[[_criterionResultMap]]"
					cell-assessment-map="[[_cellAssessmentMap]]"
					enable-feedback-copy="[[enableFeedbackCopy]]"
				></d2l-rubric-criteria-group-mobile>
				<slot></slot>
			</template>
		</template>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criteria-groups',

	properties: {
		compact: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		_groups: {
			type: Array,
			value: function() { return []; }
		},
		_showContent: {
			type: Boolean,
			value: false
		},
		assessmentHref: {
			type: String
		},
		assessmentEntity: Object,
		rubricType: {
			type: String
		},
		readOnly: Boolean,
		enableFeedbackCopy: {
			type: Boolean,
		},
		_criterionResultMap: Object,
		_cellAssessmentMap: Object
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],

	observers: [
		'_onEntityChanged(entity)'
	],

	created: function() {
		this._criterionResultMap = {};
		this._cellAssessmentMap = {};
	},

	_onAssessmentDomChanged: function() {
		if (this.telemetryData.hasAssessment && this.assessmentEntity) {
			this.markRubricLoadedEventEnd('assessment');
		}
	},

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._groups = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criteriaGroup);
		this._showContent = true;
	},

	_getSelfLink: function(entity) {
		return entity && (entity.getLinkByRel('self') || {}).href || '';
	},

	_getCriterionAssessmentHrefs: function(assessmentEntity) {
		if (!assessmentEntity) {
			return [];
		}
		const criterionLinks = assessmentEntity.getSubEntitiesByClass('criterion-assessment-links');
		const criterionHrefs = [];
		criterionLinks.forEach(criterionLinkEntity => {
			const criterionAssessmentLink = criterionLinkEntity.getLinkByRel('https://assessments.api.brightspace.com/rels/assessment-criterion');
			if (criterionAssessmentLink) {
				criterionHrefs.push(criterionAssessmentLink.href);
			}
		});
		return criterionHrefs;
	}
});
