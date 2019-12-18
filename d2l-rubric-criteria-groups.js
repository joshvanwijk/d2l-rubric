import '@polymer/polymer/polymer-legacy.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-fetch/d2l-fetch.js';
import './d2l-rubric-criteria-group.js';
import './d2l-rubric-criteria-group-mobile.js';
import './d2l-rubric-loading.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import '@polymer/iron-media-query/iron-media-query.js';
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

		<template is="dom-if" if="[[!compact]]" restamp>
			<template is="dom-repeat" items="[[_groups]]">
				<d2l-rubric-criteria-group
					href="[[_getSelfLink(item)]]"
					assessment-href="[[assessmentHref]]"
					token="[[token]]"
					rubric-type="[[rubricType]]"
					read-only="[[readOnly]]"
					hidden$="[[!_showContent]]"
					telemetry-data="[[telemetryData]]">
				</d2l-rubric-criteria-group>
			</template>
			<slot name="total-score"></slot>
			<slot></slot>
		</template>
		<template is="dom-if" if="[[compact]]" restamp>
			<slot name="total-score"></slot>
			<template is="dom-repeat" items="[[_groups]]">
				<d2l-rubric-criteria-group-mobile
					href="[[_getSelfLink(item)]]"
					assessment-href="[[assessmentHref]]"
					token="[[token]]"
					read-only="[[readOnly]]"
					compact="[[compact]]"
					hidden$="[[!_showContent]]"
					telemetry-data="[[telemetryData]]">
				</d2l-rubric-criteria-group-mobile>
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
		rubricType: {
			type: String
		},
		readOnly: Boolean,
		telemetryData: {
			type: Object
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior
	],

	observers: [
		'_onEntityChanged(entity)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._groups = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criteriaGroup);
		this._showContent = true;
	},

	_getSelfLink: function(entity) {
		return entity && (entity.getLinkByRel('self') || {}).href || '';
	}
});
