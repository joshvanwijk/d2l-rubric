import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';

import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-icons/d2l-icon.js';
import './d2l-siren-entity-resolver.js';
import './localize-behavior.js';

const _trim = str => str ? str.trim() : str;

class RubricAlignmentsIndicator extends mixinBehaviors([
	D2L.Hypermedia.HMConstantsBehavior,
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior
], PolymerElement) {
	static get properties() {
		return {
			outcomesTitleText: {
				type: String
			},
			criterionName: {
				type: String
			},
			mobile: {
				type: Boolean,
				value: false
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
			},
			_hasFocus: {
				type: Boolean,
				value: false
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
		font-size: 14px;
	}

	d2l-icon:hover {
		color: var(--d2l-color-primary-accent-action);
		cursor: pointer;
	}

	.outcome-item {
		margin-bottom: 6px;
		max-width: 360px;
		line-height: 1.3em;
		white-space: pre-wrap;
	}

	[hidden] {
		display: none !important;
	}
</style>

<template is="dom-if" if="[[_hasOutcomes(_outcomeMap)]]">
	<d2l-icon aria-label$="[[_getCriterionText(criterionName)]]" id="alignments-icon" tabindex="0" icon="d2l-tier1:bullseye"> </d2l-icon>
	<d2l-tooltip for="alignments-icon" position="[[_getTooltipPosition(mobile)]]" force-show="[[_hasFocus]]">
		<div><b>[[outcomesTitleText]]</b></div>
		<template is="dom-repeat" items="[[_getTooltipOutcomes(_outcomeMap)]]">
			<div class="outcome-item">[[item]]</div>
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

	ready() {
		super.ready();
		this.addEventListener('blur', () => this._hasFocus = false);
		this.addEventListener('focus', () => this._hasFocus = true);
	}

	_getCriterionText(criterionName) {
		if (criterionName && criterionName.length > 0) {
			return this.localize('standardsAligned', 'standardsName', this.outcomesTitleText, 'name', criterionName);
		}
		return '';
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

	_getTooltipOutcomes(outcomeMap) {
		if (!outcomeMap || !Object.keys(outcomeMap).length) return [];

		return Object.values(outcomeMap)
			.map(this._getOutcomeText)
			.filter(text => !!text);
	}

	_getTooltipPosition(mobile) {
		return mobile ? 'left' : 'right';
	}

	_getOutcomeText(outcome) {
		if (!outcome || !outcome.properties) {
			return null;
		}

		const props = outcome.properties;
		return _trim(props.notation)
			|| _trim(props.altNotation)
			|| _trim(props.description);
	}

	_hasOutcomes(outcomeMap) {
		return this._getTooltipOutcomes(outcomeMap).length > 0;
	}
}

customElements.define('d2l-rubric-alignments-indicator', RubricAlignmentsIndicator);
