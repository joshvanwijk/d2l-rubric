import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};
window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior = window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior || {};

/*
* Nl lang terms
* @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangNlBehavior
 */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangNlBehavior = {
	nl: {
		'addCriteriaGroup': 'Criteriagroep toevoegen',
		'addCriterion': 'Criterium toevoegen',
		'addFeedback': 'Feedback toevoegen',
		'addLevel': 'Niveau toevoegen',
		'addLevelPrepend': 'Nieuw niveau toevoegen voor {name}',
		'addLevelAppend': 'Nieuw niveau toevoegen na {name}',
		'addOverallLevelAppend': 'Nieuw algemeen niveau toevoegen na {name}',
		'addOverallLevelPrepend': 'Nieuw algemeen niveau toevoegen voor {name}',
		'cellPoints': 'Criterium-celpunten',
		'changeScoringSuccessful': 'Scoringsmethode is gewijzigd in {method}',
		'clearOverride': 'OVERSCHRIJVEN WISSEN',
		'clearTotalScoreOverride': 'Overschrijven wissen',
		'clearFeedback': 'Feedback wissen',
		'criterionAdded': 'Er is een nieuw criterium toegevoegd.',
		'criterionAriaLabel': 'Criterium {index, number} van {count, number}',
		'criterionDeleted': '{name} criterium verwijderd',
		'criterionDescriptionAriaLabel': 'Beschrijving van criterium {criterionName}, niveau {levelName}',
		'criterionFeedbackAriaLabel': 'Feedback voor criterium {criterionName}, niveau {levelName}',
		'criterionNameAriaLabel': 'Criteriumnaam',
		'criterionOutOf': 'Het criterium {name} is gebaseerd op een totale score van {value} punten',
		'criterionPlaceholder': 'Klik om het criterium te bewerken',
		'dashOutOf': '— / {outOf}',
		'description': 'Beschrijving',
		'descriptionInfo': 'Voeg een beschrijving toe voor uw persoonlijke referentie. Deze wordt niet met cursisten gedeeld',
		'descriptionSaveFailed': 'Opslaan van beschrijving mislukt',
		'editFeedback': 'Feedback bewerken',
		'errorText': 'Oeps! Er zijn problemen met het tot stand brengen van een verbinding. U kunt de pagina vernieuwen of het later opnieuw proberen.',
		'feedback': 'Feedback',
		'feedbackSaveFailed': 'Opslaan van feedback mislukt',
		'groupAdded': 'Een nieuwe criteriagroep is toegevoegd',
		'groupName': 'Naam criteriagroep',
		'groupRegion': 'Criteriagroep {name}',
		'helpAssociations': 'Wat zijn koppelingen?',
		'hideScore': 'Scores verbergen voor cursisten',
		'hideScoreHeader': 'Scorezichtbaarheid',
		'levelAchieved': 'Behaald niveau: ',
		'levelAppended': 'Een nieuw niveau is toegevoegd na {name}',
		'levelDeleted': '{name} niveau verwijderd',
		'levelName': 'Niveaunaam',
		'levelNameAndPoints': '{levelName} - {number} {number, plural, one {punt} other {punten}}',
		'levelNameAndPercentage': '{levelName} - {number} %',
		'levelPoints': 'Niveaupunten',
		'levelPrepended': 'Een nieuw niveau is toegevoegd voor {name}',
		'name': 'Naam',
		'nameIsRequired': 'Naam vereist',
		'nameSaveFailed': 'Opslaan van naam mislukt',
		'options': 'Opties',
		'outOf': '/ {outOf}',
		'overallDescriptionAriaLabel': 'Algemene beschrijving voor niveau {levelName}',
		'overallFeedback': 'Algemene feedback',
		'overallFeedbackAriaLabel': 'Algemene feedback voor niveau {levelName}',
		'overallLevelDeleted': 'Algemeen niveau {name} verwijderd',
		'overallLevelName': 'Algemene niveaunaam',
		'overallScoreDescription': 'Elk middel wordt een niveau van voltooiing toegewezen op basis van de algemene rubricscore.',
		'overallScoreHeader': 'Algemene score',
		'overallScore': 'Algemene score',
		'overriddenScoreTip': 'Criteriumscore is overschreven',
		'overriddenTotalScoreTip': 'De algemene rubricscore is overschreven. De score wordt niet meer bijgewerkt op basis van wijzigingen aan de rubric.',
		'points': '{number} {number, plural, one {punt} other {punten}}',
		'pointsAbbreviation': 'punt',
		'pointsAreRequired': 'Puntwaarde is vereist',
		'pointsMinimum': 'Minimaal {number} {number, plural, one {punt} other {punten}}',
		'pointsSaveFailed': 'Opslaan van punten mislukt',
		'percentage': '\{number\} %',
		'preview': 'Voorbeeldweergave',
		'initialFeedback': 'Eerste feedback',
		'refreshText': 'de pagina vernieuwen',
		'removeCriterion': 'Criterium {name} verwijderen',
		'removeLevel': 'Niveau {name} verwijderen',
		'removeOverallLevel': 'Algemene niveau {name} verwijderen',
		'reverseLevelOrder': 'Niveauvolgorde omkeren',
		'reverseLevelsSuccessful': 'De niveauvolgorde is omgekeerd',
		'rubricLoadingErrorAriaAlert': 'Er is een probleem met het laden van uw rubric. Deze kan niet worden weergegeven.',
		'rubricLoadingErrorMessage': 'We kunnen de rubric niet weergeven.',
		'rubricSavingErrorAriaAlert': 'Er is een probleem met het opslaan van uw rubric.',
		'rubricSavingErrorMessage': 'Er is iets fout gegaan. Controleer uw rubric.',
		'rubricSummaryA11y': 'In de eerste kolom van deze tabel staan de criteria en de criteriagroepnaam. In de eerste rij staan de niveaunamen en eventueel de scores als de rubric gebruikmaakt van een numerieke scoremethode.',
		'rubricVisibility': 'Rubric-zichtbaarheidsinstellling',
		'rubricVisibilityAlways': 'Rubric is zichtbaar voor cursisten',
		'rubricVisibilityOnceFeedbackPosted': 'Rubric wordt verborgen voor cursisten totdat feedback is gepubliceerd',
		'rubricVisibilityNever': 'Rubric wordt verborgen voor cursisten',
		'rubricVisibilitySaveFailed': 'Wijzigen van rubriczichtbaarheid mislukt.',
		'scoreOutOf': '{score} / {outOf}',
		'scoring': 'Score: {method}',
		'setScoreVisibilityFailed': 'Instellen van scorezichtbaarheid mislukt.',
		'scoresVisibilityHidden': 'Scores zijn verborgen voor cursisten',
		'scoresVisibilityVisible': 'Scores zijn zichtbaar voor cursisten',
		'statistics': 'Statistieken',
		'total': 'Totaal',
		'totalScoreAriaLabel': 'De rubric is gebaseerd op een totale score van {value} punten.',
		'moveCriterionUp': 'Criterium {position} omhoog verplaatsen',
		'moveCriterionDown': 'Criterium {position} omlaag verplaatsen',
		'criterionMoved': '{name} is nu criterium {position}',
		'rangeStartOrMore': 'of meer',
		'overallLevelRangeStart': 'Startbereik algemeen niveau',
		'rangeStartRequired': 'De startwaarde van het bereik is vereist',
		'rangeStartInvalid': 'De startwaarde van het bereik is ongeldig',
		'closeDialog': 'Sluiten',
		'deleteConfirmationYes': 'Verwijderen',
		'deleteConfirmationNo': 'Annuleren',
		'deleteLevelConfirmationTitle': 'Dit niveau verwijderen?',
		'deleteLevelConfirmationText': 'Hierdoor wordt het niveau en de inhoud permanent gewist.',
		'deleteCriterionConfirmationTitle': 'Dit criterium verwijderen?',
		'deleteCriterionConfirmationText': 'Hierdoor wordt het criterium en de inhoud permanent verwijderd.',
		'rubricType': 'Type: {rubricType}',
		'changeRubricTypeSuccessful': 'Rubrictype veranderd in {rubricType}',
		'changeConfirmationYes': 'Doorgaan',
		'changeConfirmationNo': 'Annuleren',
		'changeRubricTypeWarnTitle': 'Rubrictype veranderen?',
		'changeRubricTypeWarnMessage': 'Het veranderen van uw rubric van analytisch naar holistisch kan resulteren in gegevensverlies.',
		'rubricStatus': 'Status: {status}',
		'changeRubricStatusSuccessful': 'Rubricstatus veranderd in {status}',
		'editRubric': 'Rubric bewerken',
		'advancedAvailabilityHeader': 'Geavanceerde beschikbaarheid',
		'newAssociationLabel': 'Nieuwe koppelingen toestaan in',
		'associationsSaveFailed': 'Opslaan van koppelingen mislukt',
		'descriptionReadOnlyMode': 'Omschrijving (niet zichtbaar voor studenten)',
		'descriptionReadOnlyPlaceholder': 'Geen beschrijving',
		'groupNameSaveFailed': 'Opslaan van naam criteriagroep mislukt'
	}
};
