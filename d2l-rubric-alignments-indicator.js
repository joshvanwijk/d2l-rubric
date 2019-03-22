import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';

import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-tooltip/d2l-tooltip.js';
import './d2l-siren-entity-resolver.js';

class RubricAlignmentsIndicator extends mixinBehaviors([
	D2L.Hypermedia.HMConstantsBehavior,
	D2L.PolymerBehaviors.Siren.EntityBehavior
], PolymerElement) {
	static get properties() {
		return {
			outcomesTitleText: {
				type: String
			},
			_alignmentCollectionMap: {
				type: Object,
				value: {}
			},
			_alignmentMap: {
				type: Object,
				value: {}
			},
			_intentMap: {
				type: Object,
				value: {}
			},
			_outcomeMap: {
				type: Object,
				value: {}
			}
		};
	}

	static get template() {
		return html`
<style>
	:host {
		display: inline-block;
	}
	
	d2l-tooltip {
		margin-left: 8px;
	}

	d2l-icon:hover {
		color: var(--d2l-color-primary-accent-action);
		cursor: pointer;
	}

	[hidden] {
		display: none !important;
	}
</style>

<template is="dom-if" if="[[_hasOutcomes(_outcomeMap)]]">
	<d2l-icon id="alignments-icon" icon="d2l-tier1:bullseye"></d2l-icon>
	<d2l-tooltip for="alignments-icon" position="right">
		<div><b>[[outcomesTitleText]]</b></div>
		<template is="dom-repeat" items="[[_getOutcomeNames(_outcomeMap)]]">
			<div>[[item]]</div>
		</template>
	</d2l-tooltip>
</template>
<div style="display: none;">
	<d2l-siren-entity-resolver href="[[_getAlignmentsLink(entity)]]" token="[[token]]" map="{{_alignmentCollectionMap}}"></d2l-siren-entity-resolver>
	<template is="dom-repeat" items="[[_getAlignmentLinks(_alignmentCollectionMap)]]">
		<d2l-siren-entity-resolver href="[[item]]" token="[[token]]" map="{{_alignmentMap}}"></d2l-siren-entity-resolver>
	</template>
	<template is="dom-repeat" items="[[_getIntentLinks(_alignmentMap)]]">
		<d2l-siren-entity-resolver href="[[item]]" token="[[token]]" map="{{_intentMap}}"></d2l-siren-entity-resolver>
	</template>
	<template is="dom-repeat" items="[[_getOutcomeLinks(_intentMap)]]">
		<d2l-siren-entity-resolver href="[[item]]" token="[[token]]" map="{{_outcomeMap}}"></d2l-siren-entity-resolver>
	</template>
</div>
		`;
	}

	_getAlignmentsLink(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Alignments.alignments);
		return link && link.href || '';
	}

	_getAlignmentLinks(alignmentCollectionMap) {
		if (!alignmentCollectionMap || !Object.keys(alignmentCollectionMap).length) return [];

		const alignmentCollectionEntity = Object.values(alignmentCollectionMap)[0];
		const alignmentEntities = alignmentCollectionEntity.getSubEntitiesByClass('alignment');
		const hrefs = alignmentEntities.map(alignment => alignment.href);
		return hrefs;
	}

	_getIntentLinks(alignmentMap) {
		if (!alignmentMap || !Object.keys(alignmentMap).length) return [];

		return Object.values(alignmentMap).map(alignment => {
			const link = alignment.getLinkByRel(this.HypermediaRels.Outcomes.intent);
			return link && link.href || null;
		}).filter(href => !!href);
	}

	_getOutcomeLinks(intentMap) {
		if (!intentMap || !Object.keys(intentMap).length) return [];

		return Object.values(intentMap).map(intent => {
			const link = intent.getLinkByRel(this.HypermediaRels.Outcomes.outcome);
			return link && link.href || null;
		}).filter(href => !!href);
	}

	_getOutcomeNames(outcomeMap) {
		if (!outcomeMap || !Object.keys(outcomeMap).length) return [];

		return Object.values(outcomeMap).map(outcome => {
			return `${outcome.properties.label} ${outcome.properties.listId}`;
		});
	}

	_hasOutcomes(outcomeMap) {
		return outcomeMap && Object.keys(outcomeMap).length > 0;
	}
}

customElements.define('d2l-rubric-alignments-indicator', RubricAlignmentsIndicator);
