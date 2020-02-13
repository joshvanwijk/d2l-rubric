import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};
window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior = window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior || {};

/*
 * Tr lang terms
 * @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangTrBehavior
 */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangTrBehavior = {
	tr: {
		'addCriteriaGroup': 'Kriter Grubu Ekle',
		'addCriterion': 'Kriter Ekle',
		'addFeedback': 'Geri Bildirim Ekle',
		'addLevel': 'Seviye Ekle',
		'addLevelAppend': '{name} sonrasına yeni bir seviye ekle',
		'addLevelPrepend': '{name} öncesine yeni bir seviye ekle',
		'addOverallLevelAppend': '{name} sonrasına yeni bir genel seviye ekle',
		'addOverallLevelPrepend': '{name} öncesine yeni bir genel seviye ekle',
		'advancedAvailabilityHeader': 'Gelişmiş Kullanılabilirlik',
		'alignmentOptionAutomatic': 'Automatically map achievement levels to percentage scores',
		'alignmentOptionManual': 'Manually map achievement levels to rubric levels',
		'associationsSaveFailed': 'İlişkiler kaydedilemedi',
		'cellPoints': 'Kriter hücresi puanları',
		'changeConfirmationNo': 'İptal',
		'changeConfirmationYes': 'Devam',
		'changeRubricStatusSuccessful': 'Rubrik durumu {status} olarak değiştirildi',
		'changeRubricTypeSuccessful': 'Rubrik türü {rubricType} olarak değiştirildi',
		'changeRubricTypeWarnMessage': 'Analitik rubrik türünüzü holistik olarak değiştirmek veri kaybına neden olabilir.',
		'changeRubricTypeWarnTitle': 'Rubrik türü değiştirilsin mi?',
		'changeScoringSuccessful': 'Puanlama yöntemi {method} olarak değiştirildi',
		'clearFeedback': 'Geri Bildirimi Temizle',
		'clearOverride': 'Etkisizleştirmeyi Temizle',
		'closeDialog': 'Kapat',
		'criteriaHeading': 'Kriterler',
		'criterionAdded': 'Yeni bir kriter eklendi',
		'criterionAriaLabel': 'Kriter {index, number} / {count, number}',
		'criterionDeleted': '{name} kriteri silindi',
		'criterionDescriptionAriaLabel': '{criterionName} kriteri açıklaması, {levelName} seviyesi',
		'criterionFeedback': 'Kriter Geri Bildirimi',
		'criterionFeedbackAriaLabel': '{criterionName} kriterine geri bildirim, {levelName} seviyesi',
		'criterionMoved': '{name}, artık kriter {position}',
		'criterionNameAriaLabel': 'Kriter adı',
		'criterionOutOf': '{name} kriteri, {value} puan üzerindendir',
		'criterionPlaceholder': 'Kriteri düzenlemek için tıklayın',
		'dashOutOf': '— / {outOf}',
		'deleteConfirmationNo': 'İptal',
		'deleteConfirmationYes': 'Sil',
		'deleteCriterionConfirmationText': 'Bu eylem, bu kriteri ve içeriğini kalıcı olarak silecek.',
		'deleteCriterionConfirmationTitle': 'Bu kriter silinsin mi?',
		'deleteLevelConfirmationText': 'Bu eylem, bu seviyeyi ve içeriğini kalıcı olarak silecek.',
		'deleteLevelConfirmationTitle': 'Bu seviye silinsin mi?',
		'description': 'Açıklama',
		'descriptionInfo': 'Kişisel referansınız için bir açıklama ekleyin. Öğrencilerle paylaşılmayacaktır.',
		'descriptionReadOnlyMode': 'Açıklama (Öğrencilere görünmez)',
		'descriptionReadOnlyPlaceholder': 'Açıklama yok',
		'descriptionSaveFailed': 'Açıklama kaydedilemedi',
		'editFeedback': 'Geri Bildirimi Düzenle',
		'editRubric': 'Rubriği Düzenle',
		'errorText': 'Üzgünüz! Bağlantı kurulurken bir sorunla karşılaşıldı. Sayfayı yenileyin veya daha sonra tekrar deneyin.',
		'feedback': 'Geri Bildirim',
		'feedbackSaveFailed': 'Geri bildirim kaydedilemedi',
		'groupAdded': 'Yeni bir kriter grubu eklendi',
		'groupName': 'Kriter grubu adı',
		'groupNameSaveFailed': 'Kriter grubu adını kaydetme işlemi başarısız oldu',
		'groupRegion': 'Kriter grubu {name}',
		'helpAssociations': 'İlişkiler nelerdir?',
		'hideScore': 'Puanları öğrencilerden gizle',
		'hideScoreHeader': 'Puan Görünürlüğü',
		'initialFeedback': 'İlk Geri Bildirim',
		'learningOutcomes': 'Learning Outcomes',
		'levelAchieved': 'Ulaşılan Seviye:',
		'levelAppended': '{name} sonrasına yeni bir seviye eklendi',
		'levelDeleted': '{name} seviyesi silindi',
		'levelName': 'Seviye adı',
		'levelNameAndBulletPoint': '{levelName} •',
		'levelPoints': 'Seviye puanları',
		'levelPrepended': '{name} öncesine yeni bir seviye eklendi',
		'loaLevelLabelMultiRubric': '"{loaLevelName}" başarı düzeyi, {otherRubricLevelNames} ve {lastRubricLevelName} rubrik düzeyleri ile eşleşiyor',
		'loaLevelLabelSingleRubric': '"{loaLevelName}" başarı düzeyi, {rubricLevelName} rubrik düzeyi ile eşleşiyor',
		'loaLevelUpdatedLabelMultiRubric': '"{loaLevelName}" başarı düzeyi, şu anda {otherRubricLevelNames} ve {lastRubricLevelName} rubrik düzeyleri ile eşleşiyor',
		'loaLevelUpdatedLabelSingleRubric': '"{loaLevelName}" başarı düzeyi, şu anda {rubricLevelName} rubrik düzeyi ile eşleşiyor',
		'loaOverlayHeading': 'Başarı Düzeyleri',
		'loaSliderLabel': 'Achievement threshold between "{loaLevel1}" and "{loaLevel2}". Use left and right arrow keys to move the threshold.',
		'loaThresholdMovementNotif': 'Eşik taşındı: {direction, select, left {sol} right {sağ}}',
		'lockedAlertText': 'Öğrenci çalışmalarını değerlendirmek için zaten kullanıldığından bu rubrik düzenlenemiyor',
		'makeRubricAvailableHeader': 'Şunların rubriği kullanmasına izin ver:',
		'moveCriterionDown': 'Kriteri {position} aşağı taşı',
		'moveCriterionUp': 'Kriteri {position} yukarı taşı',
		'name': 'Ad',
		'nameIsRequired': 'Ad gerekli',
		'nameSaveFailed': 'Ad kaydedilemedi',
		'newAssociationLabel': 'Şurada yeni ilişkilere izin ver',
		'numberAndPercentage': '%{number}',
		'numberAndPoints': '{number} {number, plural, =1 {puan} other {puan}}',
		'options': 'Seçenekler',
		'outOf': '/ {outOf}',
		'overallDescriptionAriaLabel': '{levelName} seviyesi için genel açıklama',
		'overallFeedback': 'Genel Geri Bildirim',
		'overallFeedbackAriaLabel': '{levelName} seviyesi için genel geri bildirim',
		'overallLevelDeleted': '{name} genel seviyesi silindi',
		'overallLevelName': 'Genel seviye adı',
		'overallLevelRangeStart': 'Genel Seviye Başlangıç Aralığı',
		'overallScore': 'Toplam Puan',
		'overallScoreDescription': 'Her gönderi, genel rubrik puanına göre bir başarı seviyesine atanır.',
		'overallScoreHeader': 'Toplam Puan',
		'overriddenScoreTip': 'Kriter puanı etkisizleştirildi',
		'overriddenTotalScoreTip': 'Toplam rubrik puanı etkisizleştirildi. Puan, şu andan itibaren rubrik üzerinde yapılan değişikliklere bağlı olarak güncellenmeyecek.',
		'overrideLabel': 'Etkisizleştir',
		'percentage': '%{number}',
		'points': '{number} {number, plural, =1 {puan} other {puan}}',
		'pointsAbbreviation': 'puan',
		'pointsAreRequired': 'Puan değeri gereklidir',
		'pointsMinimum': '{number} {number, plural, =1 {puan} other {puan}} minimum',
		'pointsSaveFailed': 'Puan kaydedilemedi',
		'preview': 'Önizle',
		'rangeStartInvalid': 'Aralık Başlangıç değeri geçersiz',
		'rangeStartOrMore': 'veya daha fazlası',
		'rangeStartRequired': 'Aralık Başlangıç değeri gereklidir',
		'refreshText': 'sayfayı yenile',
		'removeCriterion': '{name} Kriterini Kaldır',
		'removeLevel': '{name} Seviyesini Kaldır',
		'removeOverallLevel': '{name} Genel Seviyesini Kaldır',
		'reverseLevelOrder': 'Seviye Sırasını Tersine Çevir',
		'reverseLevelsSuccessful': 'Seviye sırası tersine çevrildi',
		'rubricAlignmentSaveFailed': 'Changing rubric alignment failed.',
		'rubricLevelsHeading': 'Rubrik Düzeyleri',
		'rubricLoadingErrorAriaAlert': 'Rubrik yüklenirken bir sorun oluştu. Görüntülenemiyor.',
		'rubricLoadingErrorMessage': 'Üzgünüz; rubrik görüntülenemedi.',
		'rubricSavingErrorAriaAlert': 'Rubrik kaydedilirken bir sorun oluştu.',
		'rubricSavingErrorMessage': 'Bir sorun oluştu. Lütfen rubriği kontrol edin.',
		'rubricStatus': 'Durum: {status}',
		'rubricStatusArchived': 'Durum: Arşivlenmiş',
		'rubricStatusDraft': 'Durum: Taslak',
		'rubricStatusPublished': 'Durum: Yayınlanmış',
		'rubricSummaryA11y': 'Bu tablo, ilk sütundaki kriter ve kriter grubu adlarını listeler. İlk satır seviye adlarını listeler ve rubrik sayısal bir puanlama yöntemi kullanıyorsa puanları içerir.',
		'rubricType': 'Tür: {rubricType}',
		'rubricVisibility': 'Rubrik Görünürlüğü',
		'rubricVisibilityAlways': 'Rubrik, öğrenciler tarafından görülebilir',
		'rubricVisibilityNever': 'Rubrik, öğrencilerden gizlendi',
		'rubricVisibilityOnceFeedbackPosted': 'Rubrik, geri bildirim yayımlanana kadar öğrencilerden gizlendi',
		'rubricVisibilitySaveFailed': 'Rubrik görünürlüğünü değiştirme işlemi başarısız oldu.',
		'scoreOutOf': '{score} / {outOf}',
		'scoresVisibilityHidden': 'Puanlar öğrencilerden gizlendi',
		'scoresVisibilityVisible': 'Puanlar öğrenciler tarafından görülebilir',
		'scoring': 'Puanlama Yöntemi: {method}',
		'selectNextLevel': 'Sonraki Seviyeyi Seçin',
		'selectPreviousLevel': 'Önceki Seviyeyi Seçin',
		'setScoreVisibilityFailed': 'Puan görünürlüğünü ayarlama işlemi başarısız oldu.',
		'sharedAlertText': 'Bu rubrik, yalnızca paylaşan organizasyon biriminden düzenlenebilir',
		'shareRubricSaveFailed': 'Organizasyon birimi kullanılabilirliği değiştirilemedi',
		'statistics': 'İstatistikler',
		'total': 'Toplam',
		'totalMobile': 'Toplam Puan',
		'totalScoreAriaLabel': 'Rubrik, toplam {value} puandan oluşur.',
		'totalScoreLabel': 'Rubrik Toplam Puan'
	}
};
