import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './rubric-siren-entity.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-assessment-cache-primer">
	<template strip-whitespace="">
		<style>
			:host {
				display: none;
			}
		</style>
		<rubric-siren-entity href="[[_cachePrimerHref]]" token="[[token]]" entity="{{_cachePrimerEntity}}"></rubric-siren-entity>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-rubric-assessment-cache-primer',

	properties: {
		primed: {
			type: Boolean,
			readOnly: true,
			notify: true,
			value: false
		},
		_cachePrimerHref: String,
		_cachePrimerEntity: Object
	},

	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		D2L.Hypermedia.HMConstantsBehavior
	],

	observers: [
		'_onCachePrimed(_cachePrimerEntity)'
	],

	_onEntityChanged: function(entity) {
		if (!entity || !entity.links || this.primed) {
			return;
		}
		const cachePrimer = entity.getLinkByRel(this.HypermediaRels.cachePrimer);
		if (!cachePrimer) {
			// No cache primer, nothing to do
			this._setPrimed(true);
			return;
		}
		this._cachePrimerHref = cachePrimer.href;
	},

	_onCachePrimed: function(entity) {
		if (entity) {
			this._setPrimed(true);
		}
	}

});
