import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};
window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior = window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior || {};

/*
 * Sv lang terms
 * @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangSvBehavior
 */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangSvBehavior = {
	sv: {
		'addCriteriaGroup': 'Lägg till kriteriegrupp',
		'addCriterion': 'Lägg till kriterium',
		'addFeedback': 'Lägg till feedback',
		'addLevel': 'Lägg till nivå',
		'addLevelAppend': 'Lägg till ny nivå efter {name}',
		'addLevelPrepend': 'Lägg till ny nivå före {name}',
		'addOverallLevelAppend': 'Lägg till ny övergripande nivå efter {name}',
		'addOverallLevelPrepend': 'Lägg till ny övergripande nivå före {name}',
		'advancedAvailabilityHeader': 'Avancerad tillgänglighet',
		'alignmentOptionAutomatic': 'Mappa uppnådda nivåer till procentuellt resultat automatiskt',
		'alignmentOptionManual': 'Mappa uppnådda nivåer till rubriceringsnivåer manuellt',
		'associationsSaveFailed': 'Associationerna kunde inte sparas',
		'cellPoints': 'Poäng för kriteriecell',
		'changeConfirmationNo': 'Avbryt',
		'changeConfirmationYes': 'Fortsätt',
		'changeRubricStatusSuccessful': 'Rubriceringsstatus ändrad till {status}',
		'changeRubricTypeSuccessful': 'Rubriceringstyp ändrad till {rubricType}',
		'changeRubricTypeWarnMessage': 'Ändring av rubricering från analytisk till holistisk kan leda till dataförlust.',
		'changeRubricTypeWarnTitle': 'Ändra rubriceringstyp?',
		'changeScoringSuccessful': 'Betygsättningsmetod ändrad till {method}',
		'clearFeedback': 'Rensa feedback',
		'clearOverride': 'Rensa åsidosättning',
		'closeDialog': 'Stäng',
		'criteriaHeading': 'Kriterier',
		'criterionAdded': 'Ett nytt kriterium har lagts till',
		'criterionAriaLabel': 'Kriterium {index, number} av {count, number}',
		'criterionDeleted': 'Kriteriet {name} borttaget',
		'criterionDescriptionAriaLabel': 'Beskrivning för kriteriet {criterionName}, nivå {levelName}',
		'criterionFeedback': 'Kriteriefeedback',
		'criterionFeedbackAriaLabel': 'Feedback för kriteriet {criterionName}, nivå {levelName}',
		'criterionFeedbackWithCopy': 'will be included in the overall feedback and visible to students',
		'criterionMoved': '{name} är nu kriterium {position}',
		'criterionNameAriaLabel': 'Namn på kriterium',
		'criterionOutOf': 'Kriteriet {name} är av {value} poäng',
		'criterionPlaceholder': 'Klicka för att redigera kriteriet',
		'dashOutOf': '–/{outOf}',
		'deleteConfirmationNo': 'Avbryt',
		'deleteConfirmationYes': 'Ta bort',
		'deleteCriterionConfirmationText': 'Det här tar bort kriteriet och dess innehåll permanent.',
		'deleteCriterionConfirmationTitle': 'Vill du ta bort kriteriet?',
		'deleteLevelConfirmationText': 'Det här tar bort nivån och dess innehåll permanent.',
		'deleteLevelConfirmationTitle': 'Vill du ta bort nivån?',
		'description': 'Beskrivning',
		'descriptionInfo': 'Lägg till en beskrivning för ditt personliga bruk. Den kommer inte att delas med eleverna.',
		'descriptionReadOnlyMode': 'Beskrivning (inte synlig för elever)',
		'descriptionReadOnlyPlaceholder': 'Ingen beskrivning',
		'descriptionSaveFailed': 'Beskrivningen kunde inte sparas',
		'editFeedback': 'Redigera feedback',
		'editRubric': 'Redigera rubricering',
		'errorText': 'Hoppsan! Vi kan inte ansluta dig. Pröva att uppdatera sidan eller försök igen senare.',
		'feedback': 'Feedback',
		'feedbackOn': 'Feedback on {criterionName}',
		'feedbackSaveFailed': 'Feedback kunde inte sparas',
		'groupAdded': 'En ny kriteriegrupp har lagts till',
		'groupName': 'Namn på kriteriegrupp',
		'groupNameSaveFailed': 'Namn på kriteriegrupp kunde inte sparas',
		'groupRegion': 'Kriteriegrupp {name}',
		'helpAssociations': 'Vad är associationer?',
		'hideScore': 'Dölj betyg från elever',
		'hideScoreHeader': 'Synlighet för betyg',
		'initialFeedback': 'Inledande feedback',
		'learningOutcomes': 'Utbildningsresultat',
		'levelAchieved': 'Uppnådd nivå:',
		'levelAppended': 'En ny nivå har lagts till efter {name}',
		'levelDeleted': 'Nivå för {name} borttagen',
		'levelName': 'Nivånamn',
		'levelNameAndBulletPoint': '{levelName} •',
		'levelPoints': 'Nivåpoäng',
		'levelPrepended': 'En ny nivå har lagts till före {name}',
		'loaLevelLabelMultiRubric': 'Uppfyllelsenivån \'{loaLevelName}\' är mappad till rubriceringsnivåerna {otherRubricLevelNames} och {lastRubricLevelName}',
		'loaLevelLabelSingleRubric': 'Uppfyllelsenivån \'{loaLevelName}\' är mappad till rubriceringsnivån {rubricLevelName}',
		'loaLevelUpdatedLabelMultiRubric': 'Uppfyllelsenivån \'{loaLevelName}\' har nu mappats till rubriceringsnivåerna {otherRubricLevelNames} och {lastRubricLevelName}',
		'loaLevelUpdatedLabelSingleRubric': 'Uppfyllelsenivån \'{loaLevelName}\' har nu mappats till rubriceringsnivån {rubricLevelName}',
		'loaOverlayHeading': 'Uppfyllelsenivåer',
		'loaSliderLabel': 'Tröskelvärde för prestation mellan \'{loaLevel1}\' och \'{loaLevel2}\'. Använd vänster och höger piltangent för att flytta tröskeln.',
		'loaThresholdMovementNotif': 'Tröskeln har flyttats {direction, select, left {left} right {right}}',
		'lockedAlertText': 'Denna rubricering kan inte redigeras eftersom den redan har använts för utvärdering av elevarbete',
		'makeRubricAvailableHeader': 'Gör rubricering tillgänglig för',
		'moveCriterionDown': 'Flytta ned kriterium {position}',
		'moveCriterionUp': 'Flytta upp kriterium {position}',
		'name': 'Namn',
		'nameIsRequired': 'Namn krävs',
		'nameSaveFailed': 'Namnet kunde inte sparas',
		'newAssociationLabel': 'Tillåt nya associationer i',
		'numberAndPercentage': '{number} %',
		'numberAndPoints': '{number} {number, plural, =1 {poäng} other {poäng}}',
		'options': 'Alternativ',
		'outOf': '/{outOf}',
		'overallDescriptionAriaLabel': 'Övergripande beskrivning för nivå {levelName}',
		'overallFeedback': 'Övergripande feedback',
		'overallFeedbackAriaLabel': 'Övergripande feedback för nivå {levelName}',
		'overallLevelDeleted': 'Övergripande nivå {name} borttagen',
		'overallLevelName': 'Övergripande nivånamn',
		'overallLevelRangeStart': 'Startintervall för övergripande nivå',
		'overallScore': 'Totalbetyg',
		'overallScoreDescription': 'Varje inlämning tilldelas en prestationsnivå baserat på dess övergripande rubriceringsbetyg.',
		'overallScoreHeader': 'Totalbetyg',
		'overriddenScoreTip': 'Kriteriebetyg har åsidosatts',
		'overriddenTotalScoreTip': 'Det övergripande rubriceringsbetyget har åsidosatts. Betyget uppdateras inte längre baserat på ändringar av rubriceringen.',
		'overrideLabel': 'Åsidosätt',
		'percentage': '{number} %',
		'points': '{number} {number, plural, =1 {poäng} other {poäng}}',
		'pointsAbbreviation': 'pt',
		'pointsAreRequired': 'Poängvärde krävs',
		'pointsMinimum': 'Minst {number} {number, plural, =1 {poäng} other {poäng}}',
		'pointsSaveFailed': 'Poängen kunde inte sparas',
		'preview': 'Förhandsgranska',
		'rangeStartInvalid': 'Startvärdet för intervall är ogiltigt',
		'rangeStartOrMore': 'eller mer',
		'rangeStartRequired': 'Startvärde för intervall krävs',
		'refreshText': 'uppdatera sidan',
		'removeCriterion': 'Ta bort kriteriet {name}',
		'removeLevel': 'Ta bort nivån {name}',
		'removeOverallLevel': 'Ta bort den övergripande nivån {name}',
		'reverseLevelOrder': 'Byt ordning på nivåer',
		'reverseLevelsSuccessful': 'Nivåordningen har bytts',
		'rubricAlignmentSaveFailed': 'Det gick inte att ändra rubriceringsjustering.',
		'rubricFeedbackCopyOption': 'Inkludera rubrikfeedback i den allmänna feedbacken',
		'rubricLevelsHeading': 'Rubriceringsnivåer',
		'rubricLoadingErrorAriaAlert': 'Ett problem uppstod med att ladda rubriceringen. Den kan inte visas.',
		'rubricLoadingErrorMessage': 'Tyvärr, vi kunde inte visa rubricering.',
		'rubricSavingErrorAriaAlert': 'Ett problem uppstod med att spara rubriceringen.',
		'rubricSavingErrorMessage': 'Något gick fel. Kontrollera rubriceringen.',
		'rubricStatus': 'Status: {status}',
		'rubricStatusArchived': 'Status: Arkiverad',
		'rubricStatusDraft': 'Status: Utkast',
		'rubricStatusPublished': 'Status: Publicerad',
		'rubricSummaryA11y': 'Denna tabell innehåller kriterier och namn på kriteriegrupp i den första kolumnen. På den första raden listas nivånamn och betyg inkluderas om rubriceringen använder en numerisk betygsättningsmetod.',
		'rubricType': 'Typ: {rubricType}',
		'rubricVisibility': 'Rubriceringens synlighet',
		'rubricVisibilityAlways': 'Rubriceringen är synlig för elever',
		'rubricVisibilityNever': 'Rubriceringen är dold för elever',
		'rubricVisibilityOnceFeedbackPosted': 'Rubriceringen är dold för elever tills feedback har publicerats',
		'rubricVisibilitySaveFailed': 'Det gick inte att ändra synlighet för rubricering.',
		'scoreOutOf': '{score}/{outOf}',
		'scoresVisibilityHidden': 'Betygen är dolda för elever',
		'scoresVisibilityVisible': 'Betygen är synliga för elever',
		'scoring': 'Betygsättning: {method}',
		'selectNextLevel': 'Välj nästa nivå',
		'selectPreviousLevel': 'Välj föregående nivå',
		'setScoreVisibilityFailed': 'Det gick inte att ställa in synlighet för betyg.',
		'shareRubricSaveFailed': 'Det gick inte att ändra tillgängligheten för organisationsenheten',
		'sharedAlertText': 'Den här rubriceringen kan bara redigeras från den organisationsenhet den delades från',
		'statistics': 'Statistik',
		'total': 'Totalt antal',
		'totalMobile': 'Totala poäng',
		'totalScoreAriaLabel': 'Rubriceringen är av totalt {value} poäng.',
		'totalScoreLabel': 'Totala rubriceringspoäng'
	}
};
