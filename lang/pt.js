import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};
window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior = window.D2L.PolymerBehaviors.Rubric.LocalizeBehavior || {};

/*
* Pt lang terms
* @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangPtBehavior
 */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangPtBehavior = {
	pt: {
		'addCriteriaGroup': 'Adicionar Grupo de Critérios',
		'addCriterion': 'Adicionar Critério',
		'addFeedback': 'Adicionar Comentário',
		'addLevel': 'Adicionar Nível',
		'addLevelPrepend': 'Adicionar novo nível antes de {name}',
		'addLevelAppend': 'Adicionar novo nível depois de {name}',
		'addOverallLevelAppend': 'Adicionar novo nível geral depois de {name}',
		'addOverallLevelPrepend': 'Adicionar novo nível geral antes de {name}',
		'cellPoints': 'Pontos da célula do critério',
		'changeScoringSuccessful': 'Método de pontuação alterado para {method}',
		'clearOverride': 'LIMPAR SUBSTITUIR',
		'clearTotalScoreOverride': 'Limpar Substituir',
		'clearFeedback': 'Limpar Comentário',
		'criterionAdded': 'Um novo critério foi adicionado',
		'criterionAriaLabel': 'Critério {index, number} de {count, number}',
		'criterionDeleted': 'Critério {name} excluído',
		'criterionDescriptionAriaLabel': 'Descrição para o critério {criterionName}, nível {levelName}',
		'criterionFeedback': 'Criterion Feedback',
		'criterionFeedbackAriaLabel': 'Comentário para o critério {criterionName}, nível {levelName}',
		'criterionNameAriaLabel': 'Nome do critério',
		'criterionOutOf': 'O critério {name} vale {value} pontos',
		'criterionPlaceholder': 'Clique para editar o critério',
		'dashOutOf': '— / {outOf}',
		'description': 'Descrição',
		'descriptionInfo': 'Adicione uma descrição para sua referência pessoal. Não será compartilhado com os alunos',
		'descriptionSaveFailed': 'Falha ao salvar descrição',
		'editFeedback': 'Editar Comentários',
		'errorText': 'Opa! Estamos com problemas para conectar você. Recomendamos atualizar a página ou tentar novamente mais tarde.',
		'feedback': 'Comentários',
		'feedbackSaveFailed': 'Falha ao salvar os comentários',
		'groupAdded': 'Um novo grupo de critérios foi adicionado',
		'groupName': 'Nome do grupo de critérios',
		'groupRegion': 'Grupo de critérios {name}',
		'helpAssociations': 'O que são associações?',
		'hideScore': 'Oculta pontuações nas exibições dos alunos',
		'hideScoreHeader': 'Pontuação Visibilidade',
		'levelAchieved': 'Nível alcançado: ',
		'levelAppended': 'Um novo nível foi adicionado depois de {name}',
		'levelDeleted': 'Nível {name} excluído',
		'levelName': 'Nome do nível',
		'levelNameAndPoints': '{levelName} - {number} {number, plural, one {ponto} other {pontos}}',
		'levelNameAndPercentage': '{levelName} - {number} %',
		'levelPoints': 'Pontos de nível',
		'levelPrepended': 'Um novo nível foi adicionado antes de {name}',
		'name': 'Nome',
		'nameIsRequired': 'O nome é obrigatório',
		'nameSaveFailed': 'Falha ao salvar o nome',
		'options': 'Opções',
		'outOf': '/ {outOf}',
		'overallDescriptionAriaLabel': 'Descrição geral do nível {levelName}',
		'overallFeedback': 'Comentário geral',
		'overallFeedbackAriaLabel': 'Comentário geral do nível {levelName}',
		'overallLevelDeleted': 'Nível geral {name} excluído',
		'overallLevelName': 'Nome do nível geral',
		'overallScoreDescription': 'Um nível de desempenho é atribuído a cada envio com base na pontuação geral da rubrica.',
		'overallScoreHeader': 'Pontuação geral',
		'overallScore': 'Pontuação geral',
		'overriddenScoreTip': 'A pontuação do critério foi substituída',
		'overriddenTotalScoreTip': 'A pontuação geral da rubrica foi substituída. A pontuação não será mais atualizada com base nas alterações da rubrica.',
		'points': '{number} {number, plural, one {ponto} other {pontos}}',
		'pointsAbbreviation': 'pt',
		'pointsAreRequired': 'O valor do ponto é obrigatório',
		'pointsMinimum': '{number} {number, plural, one {ponto} other {pontos}} no mínimo',
		'pointsSaveFailed': 'Falha ao salvar os pontos',
		'percentage': '\{number\} %',
		'preview': 'Visualizar',
		'initialFeedback': 'Comentário inicial',
		'refreshText': 'atualizar a página',
		'removeCriterion': 'Remover o critério {name}',
		'removeLevel': 'Remover o nível {name}',
		'removeOverallLevel': 'Remover o nível geral {name}',
		'reverseLevelOrder': 'Reverter Ordem do Nível',
		'reverseLevelsSuccessful': 'A ordem do nível foi revertida',
		'rubricLoadingErrorAriaAlert': 'Houve um problema ao carregar sua rubrica. Ela não pode ser exibida.',
		'rubricLoadingErrorMessage': 'Infelizmente, não foi possível exibir a rubrica.',
		'rubricSavingErrorAriaAlert': 'Ocorreu um problema ao salvar sua rubrica.',
		'rubricSavingErrorMessage': 'Algo deu errado. Verifique sua rubrica.',
		'rubricSummaryA11y': 'A tabela lista critérios e nomes de grupos de critérios na primeira coluna. A primeira linha lista nomes de nível e inclui pontuações caso a rubrica use um método de pontuação numérica.',
		'rubricVisibility': 'Visibilidade da rubrica',
		'rubricVisibilityAlways': 'A rubrica é visível para os alunos',
		'rubricVisibilityOnceFeedbackPosted': 'A rubrica fica oculta até que os comentários sejam publicados',
		'rubricVisibilityNever': 'Rubrica é escondida dos estudantes',
		'rubricVisibilitySaveFailed': 'A alteração da visibilidade da rubrica falhou.',
		'scoreOutOf': '{score} / {outOf}',
		'scoring': 'Pontuação: {method}',
		'setScoreVisibilityFailed': 'A definição da visibilidade da pontuação falhou.',
		'scoresVisibilityHidden': 'As pontuações estão escondidas dos alunos',
		'scoresVisibilityVisible': 'As pontuações são visíveis para os alunos',
		'statistics': 'Estatísticas',
		'total': 'Total',
		'totalScoreAriaLabel': 'A rubrica vale uma pontuação total de {value} pontos.',
		'moveCriterionUp': 'Mover critério {position} para cima',
		'moveCriterionDown': 'Mover critério {position} para baixo',
		'criterionMoved': '{name} é agora o critério {position}',
		'rangeStartOrMore': 'ou mais',
		'overallLevelRangeStart': 'Intervalo de início de nível geral',
		'rangeStartRequired': 'O valor do início do intervalo é obrigatório',
		'rangeStartInvalid': 'O valor do início do intervalo é inválido',
		'closeDialog': 'Fechar',
		'deleteConfirmationYes': 'Excluir',
		'deleteConfirmationNo': 'Cancelar',
		'deleteLevelConfirmationTitle': 'Excluir este nível?',
		'deleteLevelConfirmationText': 'A ação excluirá permanentemente o nível e seu conteúdo.',
		'deleteCriterionConfirmationTitle': 'Excluir este critério?',
		'deleteCriterionConfirmationText': 'A ação excluirá permanentemente o critério e seu conteúdo.',
		'rubricType': 'Tipo: {rubricType}',
		'changeRubricTypeSuccessful': 'Tipo de rubrica alterado para {rubricType}',
		'changeConfirmationYes': 'Continuar',
		'changeConfirmationNo': 'Cancelar',
		'changeRubricTypeWarnTitle': 'Alterar o tipo de rubrica?',
		'changeRubricTypeWarnMessage': 'Alterar sua rubrica de analítica para holística pode resultar em perda de dados.',
		'rubricStatus': 'Status: {status}',
		'changeRubricStatusSuccessful': 'Tipo de rubrica alterado para {status}',
		'editRubric': 'Editar Rubrica',
		'advancedAvailabilityHeader': 'Disponibilidade Avançada',
		'newAssociationLabel': 'Permitir novas associações em',
		'associationsSaveFailed': 'Falha ao salvar o nome',
		'descriptionReadOnlyMode': 'agora está visível para os alunos',
		'descriptionReadOnlyPlaceholder': 'uma descrição',
		'groupNameSaveFailed': 'O nome do grupo de critérios de salvamento falhou'
	}
};
