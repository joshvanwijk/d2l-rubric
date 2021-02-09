import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};
window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior = window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior || {};

/*
 * Ja lang terms
 * @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangJaBehavior
 */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangJaBehavior = {
	ja: {
		'actionsforEditRubric': '注釈の編集のアクション',
		'addCriteriaGroup': '条件グループの追加',
		'addCriterion': '条件の追加',
		'addedOverallLevelAppend': '新規の全体スコアレベルが {name} の後ろに追加されました',
		'addedOverallLevelPrepend': '新規の全体スコアレベルが {name} の前に追加されました',
		'addFeedback': 'フィードバックの追加',
		'addLevel': 'レベルの追加',
		'addLevelAppend': '{name} の後ろに新しいレベルを追加',
		'addLevelPrepend': '{name} の前に新しいレベルを追加',
		'addOverallLevelAppend': '{name} の後ろに新しい全体レベルを追加',
		'addOverallLevelPrepend': '{name} の前に新しい全体レベルを追加',
		'advancedAvailabilityHeader': '高度な使用',
		'alignmentOptionAutomatic': '達成レベルをパーセントスコアに自動的にマッピング',
		'alignmentOptionManual': '達成レベルを注釈レベルに手動でマッピング',
		'associationsSaveFailed': '関連付けを保存できませんでした',
		'cellPoints': '条件セルのポイント',
		'changeConfirmationNo': 'キャンセル',
		'changeConfirmationYes': '続行',
		'changeRubricStatusSuccessful': '注釈ステータスが {status} に変更されました',
		'changeRubricTypeSuccessful': '注釈タイプが {rubricType} に変更されました',
		'changeRubricTypeWarnMessage': '注釈を分析から総合に変更すると、データが失われる可能性があります。',
		'changeRubricTypeWarnTitle': '注釈タイプを変更しますか？',
		'changeScoringSuccessful': 'スコアリング方法が {method} に変更されました',
		'clearFeedback': 'フィードバックのクリア',
		'clearOverride': '上書きのクリア',
		'closeDialog': '閉じる',
		'criteriaGroup': '条件グループ',
		'criteriaHeading': '条件',
		'criterion': '条件',
		'criterionAdded': '新規条件が追加されました',
		'criterionAriaLabel': '条件 {index, number}、{count, number} 個',
		'criterionDeleted': '{name} 条件が削除されました',
		'criterionDescriptionAriaLabel': '条件 {criterionName}、レベル {levelName} の説明',
		'criterionFeedback': '条件のフィードバック',
		'criterionFeedbackAriaLabel': '条件 {criterionName}、レベル {levelName} のフィードバック',
		'criterionFeedbackWithCopy': 'は全体のフィードバックに含まれ、受講者に表示されます',
		'criterionMoved': '{name} は条件 {position} になりました',
		'criterionNameAriaLabel': '条件名',
		'criterionOutOf': '条件 {name} が {value} ポイントの範囲外です',
		'criterionPlaceholder': 'クリックして条件を編集します',
		'criterionScore': '条件スコア',
		'dashOutOf': '— / {outOf}',
		'deleteConfirmationNo': 'キャンセル',
		'deleteConfirmationYes': '削除:',
		'deleteCriterionConfirmationText': '実行すると、この条件とその内容が完全に削除されます。',
		'deleteCriterionConfirmationTitle': 'この条件を削除しますか？',
		'deleteLevelConfirmationText': '実行すると、このレベルとその内容が完全に削除されます。',
		'deleteLevelConfirmationTitle': 'このレベルを削除しますか？',
		'description': '説明',
		'descriptionInfo': '個人用参照の説明を追加します。これは受講者と共有されません。',
		'descriptionReadOnlyMode': '説明（受講者には表示されません）',
		'descriptionReadOnlyPlaceholder': '説明なし',
		'descriptionSaveFailed': '説明を保存できませんでした',
		'editFeedback': 'フィードバックの編集',
		'editRubric': '注釈の編集',
		'errorText': '申し訳ありません。接続で問題が発生しています。ページをリフレッシュするか、後でもう一度お試しください。',
		'feedback': 'フィードバック',
		'feedbackOn': '{criterionName} に関するフィードバック',
		'feedbackSaveFailed': 'フィードバックを保存できませんでした',
		'groupAdded': '新しい条件グループが追加されました',
		'groupName': '条件グループ名',
		'groupNameSaveFailed': '条件グループ名を保存できませんでした',
		'groupRegion': '条件グループ {name}',
		'helpAssociations': '関連付けとは？',
		'hideScore': '受講者にスコアを表示しない',
		'hideScoreHeader': 'スコアの表示',
		'initialFeedback': '最初のフィードバック',
		'learningOutcomes': '学習結果',
		'levelAchieved': '達成済みレベル:',
		'levelAppended': '新規レベルが {name} の後ろに追加されました',
		'levelDeleted': '{name} レベルが削除されました',
		'levelLoading': '新規 {name} を読み込み中',
		'levelName': 'レベル名',
		'levelNameAndBulletPoint': '{levelName} •',
		'levelPoints': 'レベルポイント',
		'levelPrepended': '新規レベルが {name} の前に追加されました',
		'loaLevelLabelMultiRubric': '達成レベル「{loaLevelName}」は、注釈レベル {otherRubricLevelNames} と {lastRubricLevelName} にマッピングされています',
		'loaLevelLabelSingleRubric': '達成レベル「{loaLevelName}」は、注釈レベル {rubricLevelName} にマッピングされています',
		'loaLevelUpdatedLabelMultiRubric': '現在、達成レベル「{loaLevelName}」は、注釈レベル {otherRubricLevelNames} と {lastRubricLevelName} にマッピングされています',
		'loaLevelUpdatedLabelSingleRubric': '現在、達成レベル「{loaLevelName}」は、注釈レベル {rubricLevelName} にマッピングされています',
		'loaOverlayHeading': '達成レベル',
		'loaSliderLabel': '「{loaLevel1}」と「{loaLevel2}」の間の達成のしきい値。左矢印キーと右矢印キーを使用して、しきい値を移動させます。',
		'loaThresholdMovementNotif': 'しきい値は {direction, select, left {左} right {右}} に移動されました',
		'lockedAlertText': 'この注釈はすでに受講者の作業を評価するために使用されているため、編集できません',
		'makeRubricAvailableHeader': '次に対して注釈を使用可能にする',
		'moveCriterionDown': '条件 {position} を下に移動',
		'moveCriterionUp': '条件 {position} を上に移動',
		'name': '名前',
		'nameIsRequired': '名前は必須です',
		'nameSaveFailed': '名前を保存できませんでした',
		'newAssociationLabel': '以下で新しい関連付けを許可:',
		'numberAndPercentage': '{number} %',
		'numberAndPoints': '{number} {number, plural, =1 {ポイント} other {ポイント}}',
		'options': 'オプション',
		'outOf': '/ {outOf}',
		'overallDescriptionAriaLabel': 'レベル {levelName} の全体の説明',
		'overallFeedback': '全体のフィードバック',
		'overallFeedbackAriaLabel': 'レベル {levelName} の全体のフィードバック',
		'overallLevelDeleted': '{name} 全体レベルが削除されました',
		'overallLevelName': '全体レベル名',
		'overallLevelRangeStart': '全体レベルの開始範囲',
		'overallScore': '全体のスコア',
		'overallScoreDescription': '各提出物には、その全体の注釈スコアに基づいて、達成レベルが指定されます。',
		'overallScoreHeader': '全体のスコア',
		'overallScoreLevel': '全体のスコアレベル',
		'overriddenScoreTip': '条件スコアが上書きされました',
		'overriddenTotalScoreTip': '全体の注釈スコアが上書きされました。注釈の変更に基づくスコアの更新が行われなくなります。',
		'overrideLabel': '上書き',
		'percentage': '{number} %',
		'points': '{number} {number, plural, =1 {ポイント} other {ポイント}}',
		'pointsAbbreviation': 'ポイント',
		'pointsAreRequired': 'ポイントの値は必須です',
		'pointsMinimum': '最低 {number} {number, plural, =1 {ポイント} other {ポイント}}',
		'pointsSaveFailed': 'ポイントを保存できませんでした',
		'preview': 'プレビュー',
		'rangeStartInvalid': '範囲の開始値が無効です',
		'rangeStartOrMore': 'その他',
		'rangeStartRequired': '範囲の開始値は必須です',
		'refreshText': 'ページの更新',
		'removeCriterion': '条件 {name} の削除',
		'removeLevel': 'レベル {name} の削除',
		'removeOverallLevel': '全体レベル {name} の削除',
		'reverseLevelOrder': 'レベル順序の反転',
		'reverseLevelsSuccessful': 'レベル順序が反転されました',
		'rubricAlignmentSaveFailed': '注釈の配置を変更できませんでした。',
		'rubricFeedbackCopyOption': '全体のフィードバックには注釈のフィードバックが含まれます',
		'rubricLevel': '注釈レベル',
		'rubricLevelsHeading': '注釈レベル',
		'rubricLoadingErrorAriaAlert': '注釈の読み込み中に問題が発生しました。表示できません。',
		'rubricLoadingErrorMessage': '申し訳ありません。注釈を表示できませんでした。',
		'rubricSavingErrorAriaAlert': '注釈の保存中に問題が発生しました。',
		'rubricSavingErrorMessage': '問題が発生しました。注釈を確認してください。',
		'rubricStatus': 'ステータス: {status}',
		'rubricStatusArchived': 'ステータス: アーカイブ済み',
		'rubricStatusDraft': 'ステータス: 下書き',
		'rubricStatusPublished': 'ステータス: 公開済み',
		'rubricSummaryA11y': 'この表では 1 列目に条件と条件グループの名前が表示されます。注釈で数値によるスコアリング方法が使用されている場合、1 行目にレベル名が表示され、スコアが記載されます。',
		'rubricType': 'タイプ: {rubricType}',
		'rubricVisibility': '注釈の表示',
		'rubricVisibilityAlways': '注釈は受講者に表示されます',
		'rubricVisibilityNever': '注釈は受講者に表示されません',
		'rubricVisibilityOnceFeedbackPosted': '注釈は、フィードバックの発行まで受講者に表示されません',
		'rubricVisibilitySaveFailed': '注釈の表示を変更できませんでした。',
		'scoreOf': 'Score of {criterion},',
		'scoreOfEditable': 'Score of {criterion}. You can press enter to adjust the score with a spin button.',
		'scoreOutOf': '{score} / {outOf}',
		'scoresVisibilityHidden': 'スコアは受講生に表示されません',
		'scoresVisibilityVisible': 'スコアは受講生に表示されます',
		'scoring': 'スコアリング: {method}',
		'selectNextLevel': '次のレベルの選択',
		'selectPreviousLevel': '前のレベルの選択',
		'setScoreVisibilityFailed': 'スコアの表示を設定できませんでした。',
		'sharedAlertText': 'この注釈は、これを共有している組織単位からのみ編集できます',
		'shareRubricSaveFailed': '組織単位の使用可能期間の変更に失敗しました',
		'standardsAligned': '{standardsName} aligned to {name}',
		'statistics': '統計',
		'total': '合計',
		'totalMobile': '合計スコア',
		'totalScoreAriaLabel': '注釈は最大スコア合計 {value} ポイントです。',
		'totalScoreLabel': '注釈の合計スコア'
	}
};
