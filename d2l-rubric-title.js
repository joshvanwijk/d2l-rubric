import '@polymer/polymer/polymer-legacy.js';
import './d2l-rubric-entity-behavior.js';
import 'd2l-fetch/d2l-fetch.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-title">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
		</style>
		[[_title]]
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-title',

	properties: {
		_title: String
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior
	],

	observers: [
		'_onEntityChanged(entity)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._title = entity.properties.name;
	}
});
