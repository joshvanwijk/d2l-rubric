import AssessmentHelper from './assessment-helpers/assessment.js';
import CriterionAssessmentHelper from './assessment-helpers/criterion-assessment.js';
import CriterionCellAssessmentHelper from './assessment-helpers/criterion-cell-assessment.js';
import OverallLevelAssessmentHelper from './assessment-helpers/overall-level-assessment.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';

window.D2L = window.D2L || {};

window.D2L.Rubric = window.D2L.Rubric || {};
window.D2L.Rubric.Assessment = window.D2L.Rubric.Assessment || {};
window.D2L.Rubric.Assessment.promise = window.D2L.Rubric.Assessment.promise || Promise.resolve();

window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};

D2L.PolymerBehaviors.Rubric.AssessmentBehaviorImpl = {

	properties: {
		AssessmentHelper: AssessmentHelper,
		CriterionAssessmentHelper: CriterionAssessmentHelper,
		CriterionCellAssessmentHelper: CriterionCellAssessmentHelper,
		OverallLevelAssessmentHelper: OverallLevelAssessmentHelper
	},

	created: function() {
		const actionRunner = this._execAssessmentAction.bind(this);
		this.AssessmentHelper = new AssessmentHelper(actionRunner);
		this.CriterionAssessmentHelper = new CriterionAssessmentHelper(actionRunner);
		this.CriterionCellAssessmentHelper = new CriterionCellAssessmentHelper(actionRunner);
		this.OverallLevelAssessmentHelper = new OverallLevelAssessmentHelper(actionRunner);
	},

	_execAssessmentAction: function(actionGetter, fieldOverrides) {
		fieldOverrides = fieldOverrides || {};
		const promise = window.D2L.Rubric.Assessment.promise.then(() => {
			const action = actionGetter();
			if (!action) {
				return;
			}

			const fields = [];
			(action.fields || []).forEach(actionField => {
				const valueOverride = fieldOverrides[actionField.name];
				fields.push({
					name: actionField.name,
					value: valueOverride !== undefined ? valueOverride : actionField.value
				});
			});
			return this.performSirenAction(action, fields);
		});

		window.D2L.Rubric.Assessment.promise = promise.catch(() => null);
		return promise;
	}

};

/** @polymerBehavior */
D2L.PolymerBehaviors.Rubric.AssessmentBehavior = [
	D2L.PolymerBehaviors.Rubric.AssessmentBehaviorImpl,
	D2L.PolymerBehaviors.Siren.SirenActionBehavior
];
