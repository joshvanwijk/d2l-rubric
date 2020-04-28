class CriterionAssessmentHelper {

	constructor(actionRunner) {
		this._exec = actionRunner;
	}

	updateFeedbackAsync(entityGetter, feedback, isHtml) {
		const entity = entityGetter();
		if (!entity || !entity.getActionByName('update-critierion-assessment')) {
			return Promise.resolve();
		}

		let feedbackHtml, feedbackText;
		if (isHtml) {
			feedbackHtml = feedback;
			const div = document.createElement('div');
			div.innerHTML = feedback;
			feedbackText = div.innerText;
		} else {
			feedbackText = feedback;
			const div = document.createElement('div');
			div.appendChild(document.createTextNode(feedback));
			feedbackHtml = div.innerHTML;
		}

		return this._exec(() => {
			const updatedEntity = entityGetter();
			return updatedEntity && updatedEntity.getActionByName('update-critierion-assessment');
		}, {
			feedbackHtml: feedbackHtml,
			feedbackText: feedbackText
		});
	}

	clearFeedbackAsync(entityGetter) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && entity.getActionByName('update-critierion-assessment');
		}, {
			feedbackHtml: '',
			feedbackText: ''
		});
	}

	getScore(entity) {
		if (!entity || !entity.properties || entity.properties.score === undefined) {
			return null;
		}
		return entity.properties.score;
	}

	getCompetencyNames(entity) {
		if (!entity || !entity.properties || entity.properties.competencies === undefined) {
			return [];
		}
		return entity.properties.competencies;
	}

	getFeedbackHtml(entity) {
		if (!entity) {
			return null;
		}
		const feedbackEntity = entity.getSubEntityByClass('feedback');
		return feedbackEntity ? feedbackEntity.properties.html : null;
	}

	getFeedbackText(entity) {
		if (!entity) {
			return null;
		}
		const feedbackEntity = entity.getSubEntityByClass('feedback');
		return feedbackEntity ? feedbackEntity.properties.text : null;
	}

	getIsFeedbackOverridden(entity) {
		if (!entity) {
			return false;
		}
		const feedbackEntity = entity.getSubEntityByClass('feedback');
		return !!feedbackEntity && feedbackEntity.hasClass('overridden');
	}

	canUpdateAssessment(entity) {
		return entity && entity.hasActionByName('update-critierion-assessment');
	}

	overrideScoreAsync(entityGetter, score) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && entity.getActionByName('update-critierion-assessment');
		}, { score: score });
	}

	clearScoreOverride(entityGetter) {
		const currentEntity = entityGetter();
		const currentAction = currentEntity && currentEntity.getActionByName('update-critierion-assessment');
		if (!currentAction) {
			return Promise.resolve();
		}

		const defaultScoreField = currentAction.getFieldByName('defaultScore');
		const newScore = defaultScoreField && typeof defaultScoreField.value !== 'undefined'
			? defaultScoreField.value
			: null; // Clear override when no level selected

		return this._exec(() => {
			const updatedEntity = entityGetter();
			return updatedEntity && updatedEntity.getActionByName('update-critierion-assessment');
		}, { score: newScore });
	}
}

export default CriterionAssessmentHelper;
