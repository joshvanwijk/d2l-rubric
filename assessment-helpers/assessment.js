class AssessmentHelper {

	constructor(actionRunner) {
		this._exec = actionRunner;
	}

	overrideTotalScoreAsync(entityGetter, points) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && entity.getActionByName('override-total-score');
		}, {
			OverallScore: points,
			TotalScoreOverridden: true
		});
	}

	clearTotalScoreOverrideAsync(entityGetter) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && entity.getActionByName('clear-total-score-override');
		}, { TotalScoreOverridden: false });
	}

	canOverrideTotalScore(entity) {
		return entity && !!entity.getActionByName('override-total-score');
	}

	canClearTotalScoreOverride(entity) {
		return entity && !!entity.getActionByName('clear-total-score-override');
	}

	getTotalScore(entity) {
		if (!entity || entity.properties.score === undefined) {
			return null;
		}
		return entity.properties.score;
	}

	getFeedbackText(entity) {
		if (!entity) {
			return null;
		}
		const feedbackEntity = entity.getSubEntityByClass('overall-feedback');
		return feedbackEntity && feedbackEntity.properties.text || '';
	}

	getFeedbackHtml(entity) {
		if (!entity) {
			return null;
		}
		const feedbackEntity = entity.getSubEntityByClass('overall-feedback');
		return feedbackEntity && feedbackEntity.properties.html || '';
	}

}

export default AssessmentHelper;
