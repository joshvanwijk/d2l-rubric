import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};

/*
* Behavior for performing siren actions and logging API errors
* @polymerBehavior
*/
D2L.PolymerBehaviors.Rubric.ActionBehaviorImpl = {
	performSirenAction: function(action, fields, immediate) {
		const base = D2L.PolymerBehaviors.Siren.SirenActionBehaviorImpl;
		return base.performSirenAction.call(this, action, fields, immediate).catch(err => {
			this.dispatchEvent(new CustomEvent('d2l-rubric-action-error', {
				detail: {
					url: (base.getEntityUrl.call(this, action, fields) || '').toString(),
					method: action.method,
					error: err
				},
				composed: true,
				bubbles: true,
			}));
			throw err;
		});
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.Rubric.ActionBehavior = [
	D2L.PolymerBehaviors.Siren.SirenActionBehavior,
	D2L.PolymerBehaviors.Rubric.ActionBehaviorImpl
];
