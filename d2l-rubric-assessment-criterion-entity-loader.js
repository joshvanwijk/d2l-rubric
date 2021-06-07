import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-assessment-criterion-entity-loader">
	<template strip-whitespace="">
		<style>
			:host {
				display: none;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-rubric-assessment-criterion-entity-loader',

	properties: {
		criterionAssessmentMap: {
			type: Object,
			notify: true
		},
		cellAssessmentMap: {
			type: Object,
			notify: true
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		D2L.Hypermedia.HMConstantsBehavior
	],

	_onEntityChanged: function(entity) {
		if (!entity || !entity.links) {
			return;
		}

		this.criterionAssessmentMap[this.href] = entity;
		const rubricCriterionLink = entity.getLinkByRel(this.HypermediaRels.Rubrics.criterion);
		if (rubricCriterionLink) {
			this.criterionAssessmentMap[rubricCriterionLink.href] = entity;
		}

		entity.getSubEntitiesByClass('assessment-criterion-cell').forEach(cell => {
			const rubricCellLink = cell.getLinkByRel(this.HypermediaRels.Rubrics.criterionCell);
			if (rubricCellLink) {
				this.cellAssessmentMap[rubricCellLink.href] = cell;
			}
		});

		// notify object changed
		const criterionMapping = this.criterionAssessmentMap;
		const cellMapping = this.cellAssessmentMap;
		this.set('criterionAssessmentMap', {});
		this.set('cellAssessmentMap', {});
		this.set('criterionAssessmentMap', criterionMapping);
		this.set('cellAssessmentMap', cellMapping);
	}

});
