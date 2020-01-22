class CriterionCellAssessmentHelper {

	constructor(actionRunner) {
		this._exec = actionRunner;
	}

	isSelected(entity) {
		return entity && entity.hasClass('selected');
	}

	canSelect(entity) {
		return entity && entity.hasActionByName('select-criterion-cell');
	}

	selectAsync(entityGetter) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && entity.getActionByName('select-criterion-cell');
		});
	}

}

export default CriterionCellAssessmentHelper;
