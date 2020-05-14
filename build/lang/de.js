import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};
window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior = window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior || {};

/*
 * De lang terms
 * @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangDeBehavior
 */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangDeBehavior = {
	de: {
		'actionsforEditRubric': 'Actions for Edit Rubric',
		'addCriteriaGroup': 'Kriteriengruppe hinzufügen',
		'addCriterion': 'Kriterium hinzufügen',
		'addFeedback': 'Feedback hinzufügen',
		'addLevel': 'Stufe hinzufügen',
		'addLevelAppend': 'Neue Stufe nach {name} hinzufügen',
		'addLevelPrepend': 'Neue Stufe vor {name} hinzufügen',
		'addOverallLevelAppend': 'Neue Gesamtstufe nach {name} hinzufügen',
		'addOverallLevelPrepend': 'Neue Gesamtstufe vor {name} hinzufügen',
		'advancedAvailabilityHeader': 'Erweiterte Verfügbarkeit',
		'alignmentOptionAutomatic': 'Leistungsstufen automatisch den Prozentwerten zuordnen',
		'alignmentOptionManual': 'Leistungsstufen manuell den Bewertungsstufen zuordnen',
		'associationsSaveFailed': 'Speichern der Zuordnungen fehlgeschlagen',
		'cellPoints': 'Kriteriumszellen-Punkte',
		'changeConfirmationNo': 'Abbrechen',
		'changeConfirmationYes': 'Weiter',
		'changeRubricStatusSuccessful': 'Bewertungsschema-Status zu {status} geändert',
		'changeRubricTypeSuccessful': 'Bewertungsschema-Typ zu {rubricType} geändert',
		'changeRubricTypeWarnMessage': 'Beim Ändern Ihres Bewertungsschemas von analytisch zu holistisch könnte es zu Datenverlust kommen.',
		'changeRubricTypeWarnTitle': 'Bewertungsschema-Typ ändern?',
		'changeScoringSuccessful': 'Bewertungsmethode zu {method} geändert',
		'clearFeedback': 'Feedback löschen',
		'clearOverride': 'Außerkraftsetzung aufheben',
		'closeDialog': 'Schließen',
		'criteriaHeading': 'Kriterien',
		'criterionAdded': 'Ein neues Kriterium wurde hinzugefügt',
		'criterionAriaLabel': 'Kriterium {index, number} von {count, number}',
		'criterionDeleted': 'Kriterium {name} gelöscht',
		'criterionDescriptionAriaLabel': 'Beschreibung für Kriterium {criterionName}, Stufe {levelName}',
		'criterionFeedback': 'Feedback zum Kriterium',
		'criterionFeedbackAriaLabel': 'Feedback zum Kriterium {criterionName}, Stufe {levelName}',
		'criterionFeedbackWithCopy': 'will be included in the overall feedback and visible to students',
		'criterionMoved': '{name} ist jetzt Kriterium {position}',
		'criterionNameAriaLabel': 'Name des Kriteriums',
		'criterionOutOf': 'Kriterium {name} entspricht {value} Punkten',
		'criterionPlaceholder': 'Zum Bearbeiten des Kriteriums hier klicken',
		'criterionScore': 'Criterion Score',
		'dashOutOf': '—/{outOf}',
		'deleteConfirmationNo': 'Abbrechen',
		'deleteConfirmationYes': 'Löschen',
		'deleteCriterionConfirmationText': 'Hiermit werden das Kriterium und seine Inhalte dauerhaft gelöscht.',
		'deleteCriterionConfirmationTitle': 'Dieses Kriterium löschen?',
		'deleteLevelConfirmationText': 'Hiermit werden diese Stufe und ihre Inhalte dauerhaft gelöscht.',
		'deleteLevelConfirmationTitle': 'Diese Stufe löschen?',
		'description': 'Beschreibung',
		'descriptionInfo': 'Fügen Sie eine Beschreibung als persönliche Referenz hinzu. Sie wird für die Teilnehmer nicht angezeigt.',
		'descriptionReadOnlyMode': 'Beschreibung (nicht für Kursteilnehmer sichtbar)',
		'descriptionReadOnlyPlaceholder': 'Keine Beschreibung',
		'descriptionSaveFailed': 'Speichern der Beschreibung fehlgeschlagen',
		'editFeedback': 'Feedback bearbeiten',
		'editRubric': 'Bewertungsschema bearbeiten',
		'errorText': 'Hoppla! Beim Verbindungsaufbau gibt es Probleme. Aktualisieren Sie die Seite, oder versuchen Sie es später erneut.',
		'feedback': 'Feedback',
		'feedbackOn': 'Feedback on {criterionName}',
		'feedbackSaveFailed': 'Speichern des Feedbacks fehlgeschlagen',
		'groupAdded': 'Eine neue Kriteriengruppe wurde hinzugefügt',
		'groupName': 'Name der Kriteriengruppe',
		'groupNameSaveFailed': 'Speichern der Kriteriengruppe fehlgeschlagen',
		'groupRegion': 'Kriteriengruppe {name}',
		'helpAssociations': 'Was sind Zuordnungen?',
		'hideScore': 'Punktzahlen aus den Ansichten der Kursteilnehmer ausblenden',
		'hideScoreHeader': 'Sichtbarkeit der Punktzahl',
		'initialFeedback': 'Erstes Feedback',
		'learningOutcomes': 'Lernergebnisse',
		'levelAchieved': 'Erreichte Stufe:',
		'levelAppended': 'Eine neue Stufe wurde nach {name} hinzugefügt',
		'levelDeleted': 'Stufe {name} gelöscht',
		'levelName': 'Name der Stufe',
		'levelNameAndBulletPoint': '{levelName} •',
		'levelPoints': 'Stufenpunkte',
		'levelPrepended': 'Eine neue Stufe wurde vor {name} hinzugefügt',
		'loaLevelLabelMultiRubric': 'Die Leistungsstufe „{loaLevelName}“ ist den Bewertungsstufen {otherRubricLevelNames} und {lastRubricLevelName} zugeordnet',
		'loaLevelLabelSingleRubric': 'Die Leistungsstufe „{loaLevelName}“ ist der Bewertungsstufe {rubricLevelName} zugeordnet',
		'loaLevelUpdatedLabelMultiRubric': 'Die Leistungsstufe „{loaLevelName}“ ist nun den Bewertungsstufen {otherRubricLevelNames} und {lastRubricLevelName} zugeordnet',
		'loaLevelUpdatedLabelSingleRubric': 'Die Leistungsstufe „{loaLevelName}“ ist nun der Bewertungsstufe {rubricLevelName} zugeordnet',
		'loaOverlayHeading': 'Leistungsstufen',
		'loaSliderLabel': 'Mindestergebnis zwischen „{loaLevel1}“ und „{loaLevel2}“. Benutzen Sie die Nach-links- und Nach-rechts-Taste um das Mindestergebnis zu verändern.',
		'loaThresholdMovementNotif': 'Mindestergebnis nach {direction, select, left {links} right {rechts}} verschoben',
		'lockedAlertText': 'Dieses Bewertungsschema kann nicht bearbeitet werden, da damit bereits auf Arbeit von Lernern bewertet wurde.',
		'makeRubricAvailableHeader': 'Bewertungsschema verfügbar machen für',
		'moveCriterionDown': 'Kriterium {position} nach unten verschieben',
		'moveCriterionUp': 'Kriterium {position} nach oben verschieben',
		'name': 'Name',
		'nameIsRequired': 'Name erforderlich',
		'nameSaveFailed': 'Speichern des Namen fehlgeschlagen',
		'newAssociationLabel': 'Neue Zuordnungen zulassen in',
		'numberAndPercentage': '{number} %',
		'numberAndPoints': '{number} {number, plural, =1 {Punkt} other {Punkte}}',
		'options': 'Optionen',
		'outOf': '/{outOf}',
		'overallDescriptionAriaLabel': 'Gesamtbeschreibung für Stufe {levelName}',
		'overallFeedback': 'Gesamtfeedback',
		'overallFeedbackAriaLabel': 'Gesamtfeedback für Stufe {levelName}',
		'overallLevelDeleted': 'Gesamtstufe {name} gelöscht',
		'overallLevelName': 'Name der Gesamtstufe',
		'overallLevelRangeStart': 'Startbereich der Gesamtstufe',
		'overallScore': 'Gesamtpunktzahl',
		'overallScoreDescription': 'Jeder Abgabe wird basierend auf der Bewertungsschema-Gesamtpunktzahl eine Leistungsstufe zugewiesen.',
		'overallScoreHeader': 'Gesamtpunktzahl',
		'overriddenScoreTip': 'Kriterium-Punktzahl wurde außer Kraft gesetzt',
		'overriddenTotalScoreTip': 'Die Bewertungsschema-Gesamtpunktzahl wurde außer Kraft gesetzt. Die Punktzahl wird nicht mehr durch Änderungen am Bewertungsschema aktualisiert.',
		'overrideLabel': 'Außerkraftsetzung',
		'percentage': '{number} %',
		'points': '{number} {number, plural, =1 {Punkt} other {Punkte}}',
		'pointsAbbreviation': 'Pkt',
		'pointsAreRequired': 'Punktwert erforderlich',
		'pointsMinimum': 'Mindestens {number} {number, plural, =1 {Punkt} other {Punkte}}',
		'pointsSaveFailed': 'Speichern der Punkte fehlgeschlagen',
		'preview': 'Vorschau',
		'rangeStartInvalid': 'Der Anfangswert des Bereichs ist ungültig',
		'rangeStartOrMore': 'oder mehr',
		'rangeStartRequired': 'Ein Anfangswert des Bereichs ist erforderlich',
		'refreshText': 'Seite aktualisieren',
		'removeCriterion': 'Kriterium {name} entfernen',
		'removeLevel': 'Stufe {name} entfernen',
		'removeOverallLevel': 'Gesamtstufe {name} entfernen',
		'reverseLevelOrder': 'Stufenreihenfolge umkehren',
		'reverseLevelsSuccessful': 'Die Stufenreihenfolge wurde umgekehrt',
		'rubricAlignmentSaveFailed': 'Ändern der Anpassung des Bewertungsschemas fehlgeschlagen.',
		'rubricFeedbackCopyOption': 'Einfügen von Bewertungsschema-Feedback in das Gesamtfeedback',
		'rubricLevelsHeading': 'Bewertungsstufen',
		'rubricLoadingErrorAriaAlert': 'Beim Laden Ihres Bewertungsschemas ist ein Problem aufgetreten. Es kann nicht angezeigt werden.',
		'rubricLoadingErrorMessage': 'Das Bewertungsschema konnte leider nicht angezeigt werden.',
		'rubricSavingErrorAriaAlert': 'Beim Speichern Ihres Bewertungsschemas ist ein Problem aufgetreten.',
		'rubricSavingErrorMessage': 'Etwas ist schiefgelaufen. Bitte überprüfen Sie Ihr Bewertungsschema.',
		'rubricStatus': 'Status: {status}',
		'rubricStatusArchived': 'Status: Archiviert',
		'rubricStatusDraft': 'Status: Entwurf',
		'rubricStatusPublished': 'Status: Veröffentlicht',
		'rubricSummaryA11y': 'In der ersten Spalte dieser Tabelle wird der Name der Kriterien und Kriteriengruppen aufgeführt. Die erste Zeile enthält die Namen der Niveaus sowie Punktzahlen, sofern für das Bewertungsschema eine numerische Bewertungsmethode verwendet wird.',
		'rubricType': 'Typ: {rubricType}',
		'rubricVisibility': 'Sichtbarkeit des Bewertungsschemas',
		'rubricVisibilityAlways': 'Bewertungsschema wird für Kursteilnehmer angezeigt',
		'rubricVisibilityNever': 'Bewertungsschema wird für Kursteilnehmer ausgeblendet',
		'rubricVisibilityOnceFeedbackPosted': 'Bewertungsschema ist für Kursteilnehmer ausgeblendet, bis Feedback veröffentlicht wird',
		'rubricVisibilitySaveFailed': 'Ändern der Sichtbarkeit des Bewertungsschemas fehlgeschlagen.',
		'scoreOutOf': '{score}/{outOf}',
		'scoresVisibilityHidden': 'Punktzahlen für Kursteilnehmer ausgeblendet',
		'scoresVisibilityVisible': 'Punktzahlen für Kursteilnehmer sichtbar',
		'scoring': 'Bewertungsmethode: {method}',
		'selectNextLevel': 'Nächste Stufe wählen',
		'selectPreviousLevel': 'Vorherige Stufe wählen',
		'setScoreVisibilityFailed': 'Einstellung der Sichtbarkeit der Punktzahl fehlgeschlagen.',
		'sharedAlertText': 'Dieses Bewertungsschema kann nur von der freigebenden Organisationseinheit bearbeitet werden',
		'shareRubricSaveFailed': 'Ändern der Verfügbarkeit der Organisationseinheit fehlgeschlagen',
		'statistics': 'Statistik',
		'total': 'Gesamt',
		'totalMobile': 'Gesamtpunktzahl',
		'totalScoreAriaLabel': 'Das Bewertungsschema hat eine maximale Punktzahl von {value}.',
		'totalScoreLabel': 'Gesamtpunktzahl Bewertungsschema'
	}
};
