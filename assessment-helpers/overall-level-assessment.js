const _getPrimaryAction = function(entity) {
	return (
		entity.getActionByName('select-overall-level') ||
		entity.getActionByName('remove-overall-level-override')
	);
};

class OverallLevelAssessmentHelper {

	constructor(actionRunner) {
		this._exec = actionRunner;
	}

	isSelected(entity) {
		return entity && entity.hasClass('selected');
	}

	isOverridden(entity) {
		return entity && entity.hasClass('overridden');
	}

	canSelect(entity) {
		return entity && entity.hasActionByName('select-overall-level');
	}

	canClearOverride(entity) {
		return entity && entity.hasActionByName('remove-overall-level-override');
	}

	selectAsync(entityGetter) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && entity.getActionByName('select-overall-level');
		});
	}

	clearOverrideAsync(entityGetter) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && entity.getActionByName('remove-overall-level-override');
		});
	}

	canSelectOrClear(entity) {
		return entity && !!_getPrimaryAction(entity);
	}

	selectOrClearAsync(entityGetter) {
		return this._exec(() => {
			const entity = entityGetter();
			return entity && _getPrimaryAction(entity);
		});
	}
}

export default OverallLevelAssessmentHelper;
