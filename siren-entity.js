import '@polymer/polymer/polymer-legacy.js';
import './d2l-rubric-entity-behavior.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({
	is: 'siren-entity',

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior
	]
});
