import '@polymer/polymer/polymer-legacy.js';
import './telemetry-behavior.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './d2l-rubric-criteria-mobile.js';
import './d2l-rubric-levels-mobile.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criteria-group-mobile">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
			h3 {
				@apply --d2l-heading-3;
				margin-top: 0;
				margin-bottom: 0.9rem;
			}
		</style>
		<h3>
			[[_name]]
		</h3>
		<d2l-rubric-criteria-mobile
			href="[[_criteriaHref]]"
			levels-href="[[_levelsHref]]"
			assessment-entity="[[assessmentEntity]]"
			cell-assessment-map="[[cellAssessmentMap]]"
			criterion-result-map="[[criterionResultMap]]"
			token="[[token]]"
			is-holistic="[[isHolistic]]"
			is-numeric="[[_isNumeric]]"
			read-only="[[readOnly]]"
			enable-feedback-copy="[[enableFeedbackCopy]]"
			compact="[[compact]]">
		</d2l-rubric-criteria-mobile>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criteria-group-mobile',

	properties: {
		compact: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		_name: String,
		_criteriaHref: String,
		_levelsHref: String,
		assessmentEntity: Object,
		criterionResultMap: Object,
		cellAssessmentMap: Object,
		isHolistic: Boolean,
		_isNumeric: Boolean,
		_loaded: Boolean,
		readOnly: Boolean,
		enableFeedbackCopy: Boolean,
	},

	observers: [
		'_onEntityChanged(entity)'
	],

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		// The first time that the entity loads, we send out an Open event
		if (!this._loaded) {
			var entityId = this._getSelfLink(entity);
			this.logViewRubricEvent({ id: entityId, isMobile: true });
			this._loaded = true;
		}
		this._name = entity.properties.name;
		this._levelsHref = this._getLevelsLink(entity);
		this._criteriaHref = this._getCriteriaLink(entity);
		this._isNumeric = entity.hasClass(this.HypermediaClasses.rubrics.numeric);
	},

	_getCriteriaLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Rubrics.criteria);
		return link && link.href || '';
	},

	_getLevelsLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Rubrics.levels);
		return link && link.href || '';
	}
});
