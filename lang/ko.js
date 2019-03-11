import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};
window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior = window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior || {};

/*
* Ko lang terms
* @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangKoBehavior
 */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangKoBehavior = {
	ko: {
		'addCriteriaGroup': '기준 그룹 추가',
		'addCriterion': '기준 추가',
		'addFeedback': '피드백 추가',
		'addLevel': '수준 추가',
		'addLevelPrepend': '{name} 앞에 새 수준 추가',
		'addLevelAppend': '{name} 뒤에 새 수준 추가',
		'addOverallLevelAppend': '{name} 뒤에 새 전체 수준 추가',
		'addOverallLevelPrepend': '{name} 앞에 새 전체 수준 추가',
		'cellPoints': '기준 셀 점수',
		'changeScoringSuccessful': '{method}(으)로 점수 산정법 변경됨',
		'clearOverride': '재설정 지우기',
		'clearFeedback': '피드백 지우기',
		'criterionAdded': '새 기준이 추가되었습니다.',
		'criterionAriaLabel': '기준 {index, number}/{count, number}',
		'criterionDeleted': '{name} 기준 삭제됨',
		'criterionDescriptionAriaLabel': '기준 {criterionName}, 수준 {levelName}에 대한 설명',
		'criterionFeedback': '기준 피드백',
		'criterionFeedbackAriaLabel': '기준 {criterionName}, 수준 {levelName}에 대한 피드백',
		'criterionNameAriaLabel': '기준 이름',
		'criterionOutOf': '기준 {name}에 {value}점 부족',
		'criterionPlaceholder': '클릭하여 기준 편집',
		'dashOutOf': '— / {outOf}',
		'description': '설명',
		'descriptionInfo': '개인 참조에 대한 설명을 추가합니다. 학생과 공유되지 않습니다',
		'descriptionSaveFailed': '설명 저장 실패',
		'editFeedback': '피드백 편집',
		'errorText': '죄송합니다. 연결하는 데 문제가 있습니다. 페이지를 새로 고치거나 나중에 다시 시도하십시오.',
		'feedback': '피드백',
		'feedbackSaveFailed': '피드백 저장 실패',
		'groupAdded': '새 기준 그룹이 추가되었습니다.',
		'groupName': '기준 그룹 이름',
		'groupRegion': '기준 그룹 {name}',
		'helpAssociations': '소속이란 무엇입니까?',
		'hideScore': '학생에게 점수 표시하지 않기',
		'hideScoreHeader': '점수 표시 여부',
		'levelAchieved': '성취된 수준: ',
		'levelAppended': '{name} 뒤에 새 수준이 추가되었습니다.',
		'levelDeleted': '{name} 수준 삭제됨',
		'levelName': '수준 이름',
		'levelNameAndPoints': '{levelName} - {number} {number, plural, one {점수} other {점수}}',
		'levelNameAndPercentage': '{levelName} - {number} %',
		'levelPoints': '수준 점수',
		'levelPrepended': '{name} 앞에 새 수준이 추가되었습니다.',
		'name': '이름',
		'nameIsRequired': '이름이 필요함',
		'nameSaveFailed': '이름 저장 실패',
		'options': '옵션',
		'outOf': '/{outOf}',
		'overallDescriptionAriaLabel': '수준 {levelName}에 대한 전체 설명',
		'overallFeedback': '전체 피드백',
		'overallFeedbackAriaLabel': '수준 {levelName}에 대한 전체 피드백',
		'overallLevelDeleted': '{name} 전체 수준 삭제됨',
		'overallLevelName': '전체 수준 이름',
		'overallScoreDescription': '전체 루브릭 점수에 따라 각 제출에 성취 수준이 할당됩니다.',
		'overallScoreHeader': '전체 점수',
		'overallScore': '전체 점수',
		'overriddenScoreTip': '기준 점수가 재설정되었음',
		'overriddenTotalScoreTip': '전체 루브릭 점수가 재설정되었습니다. 이제는 루브릭의 변경 사항에 따라 점수가 업데이트되지 않습니다.',
		'points': '{number} {number, plural, one {점수} other {점수}}',
		'pointsAbbreviation': '점수',
		'pointsAreRequired': '점수 값이 필요함',
		'pointsMinimum': '{number} 최소 {number, plural, one {포인트} other {포인트}}',
		'pointsSaveFailed': '점수 저장 실패',
		'percentage': '{number}%',
		'preview': '미리 보기',
		'initialFeedback': '최초 피드백',
		'refreshText': '페이지 새로 고침',
		'removeCriterion': '기준 {name} 제거',
		'removeLevel': '수준 {name} 제거',
		'removeOverallLevel': '전체 수준 {name} 제거',
		'reverseLevelOrder': '수준 순서 뒤집기',
		'reverseLevelsSuccessful': '수준 순서가 뒤바뀌었습니다.',
		'rubricLoadingErrorAriaAlert': '루브릭 로드 중 문제가 발생했습니다. 표시할 수 없습니다.',
		'rubricLoadingErrorMessage': '죄송합니다, 루브릭을 표시할 수 없습니다.',
		'rubricSavingErrorAriaAlert': '루브릭 저장 중 문제가 발생했습니다.',
		'rubricSavingErrorMessage': '문제가 발생했습니다. 루브릭을 확인하십시오.',
		'rubricSummaryA11y': '이 표에는 첫 번째 열에 기준 및 기준 그룹 이름이 나열됩니다. 루브릭이 숫자 점수 산정법을 사용할 경우, 첫 번째 행에 수준 이름이 나열되고 점수가 포함됩니다.',
		'rubricVisibility': '루브릭 표시 여부',
		'rubricVisibilityAlways': '루브릭을 학생에게 표시',
		'rubricVisibilityOnceFeedbackPosted': '피드백을 발행할 때까지 루브릭을 학생에게 표시하지 않음',
		'rubricVisibilityNever': '루브릭을 학생에게 표시하지 않음',
		'rubricVisibilitySaveFailed': '루브릭 표시 여부 변경 실패',
		'scoreOutOf': '{score} / {outOf}',
		'scoring': '점수 산정: {method}',
		'setScoreVisibilityFailed': '점수 표시 여부 설정 실패',
		'scoresVisibilityHidden': '점수를 학생에게 표시하지 않음',
		'scoresVisibilityVisible': '점수를 학생에게 표시',
		'statistics': '통계',
		'total': '총',
		'totalScoreAriaLabel': '루브릭이 총 {value}점의 점수에서 벗어났습니다.',
		'moveCriterionUp': '위로 기준 {position} 이동',
		'moveCriterionDown': '아래로 기준 {position} 이동',
		'criterionMoved': '{name}은(는) 현재 기준 {position}임',
		'rangeStartOrMore': '이상',
		'overallLevelRangeStart': '전체 수준 시작 범위',
		'rangeStartRequired': '범위 시작 값이 필요함',
		'rangeStartInvalid': '범위 시작 값이 잘못되었음',
		'closeDialog': '닫기',
		'deleteConfirmationYes': '삭제',
		'deleteConfirmationNo': '취소',
		'deleteLevelConfirmationTitle': '이 수준을 삭제하시겠습니까?',
		'deleteLevelConfirmationText': '그러면 수준과 해당 콘텐츠가 영구적으로 삭제됩니다.',
		'deleteCriterionConfirmationTitle': '이 기준을 삭제하시겠습니까?',
		'deleteCriterionConfirmationText': '그러면 기준과 해당 콘텐츠가 영구적으로 삭제됩니다.',
		'rubricType': '유형: {rubricType}',
		'changeRubricTypeSuccessful': '루브릭 유형이 {rubricType}(으)로 변경되었음',
		'changeConfirmationYes': '계속',
		'changeConfirmationNo': '취소',
		'changeRubricTypeWarnTitle': '루브릭 유형을 변경하시겠습니까?',
		'changeRubricTypeWarnMessage': '분석적 루브릭을 총체적 루브릭으로 변경하면 데이터가 손실될 수 있습니다.',
		'rubricStatus': '상태: {status}',
		'changeRubricStatusSuccessful': '루브릭 상태가 {status}(으)로 변경되었음',
		'editRubric': '루브릭 편집',
		'advancedAvailabilityHeader': '고급 가용성',
		'newAssociationLabel': '다음에 새 연결 허용',
		'associationsSaveFailed': '소속 저장 실패',
		'descriptionReadOnlyMode': '설명(학생에게 표시되지 않음)',
		'descriptionReadOnlyPlaceholder': '설명 없음',
		'groupNameSaveFailed': '기준 그룹 이름 저장 실패'
	}
};
