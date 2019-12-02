import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};

/**
 * Behavior for autosave requests using siren actions
 * @polymerBehavior
 */
D2L.PolymerBehaviors.Rubric.SirenAutosaveActionBehaviorImpl = {

	performAutosaveAction: function(action, fields, pendingPropPath) {
		if (!action) {
			return;
		}

		this.set(pendingPropPath, this.get(pendingPropPath) + 1);

		return this.performSirenAction(action, fields).finally(function() {
			this.set(pendingPropPath, this.get(pendingPropPath) - 1);
		}.bind(this));
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.Rubric.SirenAutosaveActionBehavior = [
	D2L.PolymerBehaviors.Siren.SirenActionBehavior,
	D2L.PolymerBehaviors.Rubric.SirenAutosaveActionBehaviorImpl
];
