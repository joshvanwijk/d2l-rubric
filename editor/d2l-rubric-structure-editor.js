/**
`d2l-rubric-structure-editor`
Creates and edits a rubric structue

@demo demo/d2l-rubric-structure-editor.html

*/
import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/dropdown/dropdown-button-subtle.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-rubric-criteria-groups-editor.js';
import './d2l-rubric-dialog-behavior.js';
import './d2l-rubric-dropdown-menu-behavior.js';
import './d2l-rubric-editor-header.js';
import './d2l-rubric-overall-levels-editor.js';
import '../d2l-rubric-entity-behavior.js';
import '../d2l-rubric-loading.js';
import '../localize-behavior.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-structure-editor">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			:host {
				display: block;
			}

			.out-of-loader {
				margin-top: 24px;
				border: 1px solid var(--d2l-color-galena);
				border-radius: 8px;
				text-align: right;
				height: 30px;
			}

			:dir(rtl) #rubric-structure-editor-header {
				text-align: right;
			}

			#rubric-structure-editor-header-content {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-left: var(--d2l-rubric-editor-start-gutter-width); /* ie11 fix */
				margin-left: calc(var(--d2l-rubric-editor-start-gutter-width) - 0.1rem);
				margin-right: var(--d2l-rubric-editor-end-gutter-width); /* ie11 fix */
				margin-right: calc(var(--d2l-rubric-editor-end-gutter-width));
			}

			:dir(rtl) #rubric-structure-editor-header-content {
				margin-right: var(--d2l-rubric-editor-start-gutter-width); /* ie11 fix */
				margin-right: calc(var(--d2l-rubric-editor-start-gutter-width) - 0.1rem);
				margin-left: var(--d2l-rubric-editor-end-gutter-width); /* ie11 fix */
				margin-left: calc(var(--d2l-rubric-editor-end-gutter-width));
			}
			#header-start-container {
				margin-left: -0.58rem; /* [by design] to shift header a bit so the subtle button will align with the grid instead of shifting each buttons */
			}
			:dir(rtl) #header-start-container {
				margin-left: unset;
				margin-right: -0.58rem;
			}
			#header-start-container > * {
				margin-top: 0.75rem;
				margin-bottom: 0.75rem;
				margin-right: 0.6rem;
			}
			:dir(rtl) #header-start-container > * {
				margin-left: 0.6rem;
				margin-right: unset;
			}

			d2l-alert {
				margin: 0;
				margin-left: var(--d2l-rubric-editor-start-gutter-width);
				margin-right: var(--d2l-rubric-editor-end-gutter-width);
			}
			:dir(rtl) d2l-alert {
				margin-right: var(--d2l-rubric-editor-start-gutter-width);
				margin-left: var(--d2l-rubric-editor-end-gutter-width);
			}
			.gutter-right {
				width: calc( var(--d2l-rubric-editor-end-gutter-width) - 0.6rem );
			}

			.gutter-right[holistic] {
				width: calc( var(--d2l-rubric-editor-end-gutter-width) + 42px );
			}

			[hidden] {
				display: none;
			}

		</style>
		<template is="dom-if" if="[[!isSinglePageRubric]]">
			<d2l-rubric-editor-header id="rubric-header"></d2l-rubric-editor-header>
		</template>
		<template is="dom-repeat" items="[[_alerts]]">
			<d2l-alert type="[[item.alertType]]" has-close-button="">
				[[item.alertMessage]]
			</d2l-alert>
		</template>
		<slot></slot>
		<d2l-rubric-loading hidden$="[[_hideLoading(_showContent,_hasAlerts)]]"></d2l-rubric-loading>
		<div hidden$="[[_hideLoading(_showContent,_hasAlerts)]]" class="out-of-loader">
		</div>
		<div id="rubric-structure-editor-header">
			<div id="rubric-structure-editor-header-content">
				<div id="header-start-container">
					<d2l-dropdown-button-subtle text="[[_rubricTypeText]]" hidden$="[[!_canConvertType]]" on-d2l-menu-item-change="_handleTypeChange">
						<d2l-dropdown-menu>
							<d2l-menu id="rubric-type-menu" label="Type"></d2l-menu>
						</d2l-dropdown-menu>
					</d2l-dropdown-button-subtle>

					<d2l-dropdown-button-subtle text="[[_scoringText]]" hidden$="[[!_canConvertScoring]]" on-d2l-menu-item-change="_handleScoringChange">
						<d2l-dropdown-menu>
							<d2l-menu id="scoring-menu" label="Scoring"></d2l-menu>
						</d2l-dropdown-menu>
					</d2l-dropdown-button-subtle>

					<d2l-button-subtle hidden$="[[!_present(_reverseLevels)]]" on-click="_handleReverseLevels" icon="d2l-tier1:reverse-order" text="[[localize('reverseLevelOrder')]]" type="button">
					</d2l-button-subtle>
				</div>
			</div>
			<div class="gutter-right" holistic$="[[_isHolistic]]"></div>
		</div>
		<div id="rubric-structure-editor-container" hidden="">
			<d2l-rubric-criteria-groups-editor href="[[_getHref(_criteriaGroups)]]" token="[[token]]" total-score="[[_totalScore]]" is-holistic="[[_isHolistic]]" percentage-format-alternate="[[percentageFormatAlternate]]" rubrics-criterion-action="[[rubricsCriterionAction]]" rich-text-enabled="[[richTextEnabled]]" outcomes-title="[[outcomesTitle]]" browse-outcomes-text="[[browseOutcomesText]]" align-outcomes-text="[[alignOutcomesText]]" outcomes-tool-integration-enabled="[[outcomesToolIntegrationEnabled]]" updating-levels="{{_updatingLevels}}">
			</d2l-rubric-criteria-groups-editor>
			<div id="overall-score" hidden$="[[!_present(_overallLevels)]]">
				<d2l-rubric-overall-levels-editor href="[[_getHref(_overallLevels)]]" token="[[token]]" rich-text-enabled="[[richTextEnabled]]" updating-levels="[[_updatingLevels]]"></d2l-rubric-overall-levels-editor>
			</div>
		</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-structure-editor',

	properties: {
		rubricsCriterionAction: {
			type: Boolean,
			value: false
		},
		percentageFormatAlternate: {
			type: Boolean,
			value: false
		},
		richTextEnabled: {
			type: Boolean,
			value: false
		},
		outcomesToolIntegrationEnabled: {
			type: Boolean,
			value: false
		},
		isSinglePageRubric: {
			type: Boolean,
			value: false,
		},
		errorLoggingEndpoint: {
			type: String,
			value: null
		},
		/**
		* Outcomes langterm set in config variables
		*/
		outcomesTitle: {
			type: String
		},
		browseOutcomesText: {
			type: String
		},
		alignOutcomesText: {
			type: String
		},
		_isHolistic: {
			type: Boolean,
			value: false
		},
		_criteriaGroups: {
			type: Object
		},
		_overallLevels: {
			type: Object,
			value: null
		},
		_updatingLevels: {
			type: Boolean,
			value: false
		},
		_reverseLevels: {
			type: Object
		},
		_showContent: {
			type: Boolean,
			value: false
		},
		_totalScore: {
			type: String,
			computed: '_getTotalScore(entity)'
		},
		_scoringText: {
			type: String,
			value: null
		},
		_scoringMethod: {
			type: String,
			value: null
		},
		_canConvertScoring: {
			type: Boolean,
			value: false
		},
		_refreshScoring: {
			type: Boolean,
			value: false
		},
		_canConvertType: {
			type: Boolean,
			value: false
		},
		_rubricTypeText: {
			type: String,
			value: null
		},
		_rubricTypeValue: {
			type: String,
			value: null
		},
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.DialogBehavior,
		D2L.PolymerBehaviors.Rubric.DropdownMenuBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],

	listeners: {
		'd2l-siren-entity-save-start': '_onEntitySave',
		'd2l-rubric-editor-save-error': '_onEntitySave',
		'd2l-siren-entity-save-end': '_onEntitySave'
	},

	ready: function() {
		this.addEventListener('d2l-siren-entity-error', this._handleError.bind(this));
		this.addEventListener('d2l-rubric-editor-save-error', this._handleSaveError.bind(this));
		if (this.dataset.telemetryEndpoint && this.errorLoggingEndpoint) {
			this.setTelemetryData({
				endpoint: this.dataset.telemetryEndpoint,
				errorEndpoint: this.errorLoggingEndpoint
			});
		}
	},

	_onEntitySave: function(e) {
		var rubricHeader = this.$$('#rubric-header');
		if (!this.isSinglePageRubric && rubricHeader) {
			rubricHeader.onEntitySave(e);
		}
	},

	_onEntityChanged: function(entity) {
		if (entity) {
			this._isHolistic = entity.hasClass(this.HypermediaClasses.rubrics.holistic);
			if (entity.hasLinkByRel(this.HypermediaRels.Rubrics.criteriaGroups)) {
				this._showContent = true;
				this._displayEditor(true);
				this._criteriaGroups = entity.getLinkByRel(this.HypermediaRels.Rubrics.criteriaGroups);
				this._reverseLevels = entity.getActionByName('reverse-levels') || null;
			}
			if (entity.hasLinkByRel(this.HypermediaRels.Rubrics.overallLevels)) {
				this._overallLevels = entity.getLinkByRel(this.HypermediaRels.Rubrics.overallLevels) || null;
			} else {
				this._overallLevels = null;
			}
			if (entity.hasSubEntityByRel(this.HypermediaRels.richTextEditorConfig)) {
				window.D2L.Siren.EntityStore.update(
					this.HypermediaRels.richTextEditorConfig,
					this.token,
					entity.getSubEntityByRel(this.HypermediaRels.richTextEditorConfig)
				);
			}

			if (entity.hasActionByName('update-scoring')) {
				var options = entity.getActionByName('update-scoring')
					.getFieldByName('scoring-method').value || [];

				//Only re-populate the menu if _canConvertScoring was previously null/undefined or false
				if (!this._canConvertScoring  || this._refreshScoring) {
					var selected = this.populateDropdownMenuOptions('scoring-menu', options);
					if (selected) {
						this._scoringMethod = selected.value;
						this._scoringText = this.localize('scoring', 'method', selected.title);
					}
					this._refreshScoring = false;
				}
				this._canConvertScoring = true;
			}

			if (entity.hasActionByName('update-type')) {
				// eslint-disable-next-line no-redeclare
				var options = entity.getActionByName('update-type')
					.getFieldByName('rubric-type').value || [];

				//Only re-populate the menu if _canConvertType was previously null/undefined or false
				if (!this._canConvertType) {
					// eslint-disable-next-line no-redeclare
					var selected = this.populateDropdownMenuOptions('rubric-type-menu', options);
					if (selected) {
						this._rubricTypeValue = selected.value;
						this._rubricTypeText = this.localize('rubricType', 'rubricType', selected.title);
					}
				}
				this._canConvertType = true;
			}
		}
	},

	_getHref: function(link) {
		return link && link.href;
	},

	_present: function(obj) {
		return !!obj;
	},

	_hasOutOf: function(entity) {
		return entity && typeof entity.properties.outOf !== 'undefined';
	},

	_hideLoading: function(showContent, hasAlerts) {
		return showContent || hasAlerts;
	},

	_displayEditor: function(show) {
		this.$['rubric-structure-editor-container'].hidden = !show;
	},

	_handleReverseLevels: function() {
		if (this._reverseLevels) {
			this._updatingLevels = true;
			this.performSirenAction(this._reverseLevels).then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-levels-reversed', {
					bubbles: true,
					composed: true,
				}));

				announce(this.localize('reverseLevelsSuccessful'));
			}.bind(this)).catch(function(err) {
				this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
					detail: {
						message: err.messagem
					},
					bubbles: true,
					composed: true,
				}));
			}.bind(this)).finally(function() {
				this._updatingLevels = false;
			}.bind(this));
		}
	},

	_handleSaveError: function(e) {
		this._clearAlerts();
		e.stopPropagation();

		announce(this.localize('rubricSavingErrorAriaAlert'));

		this._addAlert('error', e.message, this.localize('rubricSavingErrorMessage'));
	},

	_handleError: function(e) {
		if (e && e['target']) {
			this.logApiError(
				e.target.href,
				'GET',
				(e.detail && typeof e.detail['error'] === 'number') ? e.detail.error : null,
				(e.detail && e.detail.error && e.detail.error.message) || null
			);
		}

		if (this._errored) {
			return;
		}
		this._errored = true;
		this._clearAlerts();

		announce(this.localize('rubricLoadingErrorAriaAlert'));

		this._addAlert(
			'error',
			e.message || (e.detail && e.detail.error && e.detail.error.message) || null,
			this.localize('rubricLoadingErrorMessage')
		);
		this._displayEditor(false);
	},

	_getTotalScore: function(entity) {
		if (this._hasOutOf(entity)) {
			return entity.properties.outOf.toString();
		}
	},

	_handleTypeChange: function(e) {
		var menuButton = e.currentTarget;
		var menuItem = e.target;
		var dropdownMenu = dom(menuButton).querySelector('d2l-dropdown-menu');
		if (!this._canConvertType || menuItem.value === this._rubricTypeValue) return;

		dom(dropdownMenu).removeAttribute('opened');
		var confirm = this._rubricTypeValue === 'Analytic' && menuItem.value === 'Holistic';

		var performAction = function() {
			this.disableMenu(menuButton);
			var action = this.entity.getActionByName('update-type');
			var fields = [{'name':'rubricType', 'value':menuItem.value}];
			this._refreshScoring = true;
			this.performSirenAction(action, fields).then(function() {
				this._rubricTypeText = this.localize('rubricType', 'rubricType', menuItem.text);
				this._rubricTypeValue = menuItem.value;
				this.dispatchEvent(new CustomEvent('d2l-rubric-type-changed', {
					bubbles: true,
					composed: true,
				}));

				announce(this.localize('changeRubricTypeSuccessful', 'rubricType', menuItem.text));
			}.bind(this)).then(function() {
				this.enableMenu(menuButton);
				menuButton.focus();
			}.bind(this)).catch(function(err) {
				this.resetSelectedMenuItem(menuButton, this._rubricTypeValue);
				this.enableMenu(menuButton);
				this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
					detail: {
						message: err.message,
					},
					bubbles: true,
					composed: true,
				}));
				menuButton.focus();
			}.bind(this));
		}.bind(this);

		if (!confirm) {
			performAction();
		} else {
			this.openConfirm({
				title: this.localize('changeRubricTypeWarnTitle'),
				secondaryMessage: this.localize('changeRubricTypeWarnMessage'),
				positiveButtonText: this.localize('changeConfirmationYes'),
				negativeButtonText: this.localize('changeConfirmationNo')
			}).then(performAction, function() {
				this.resetSelectedMenuItem(menuButton, this._rubricTypeValue);
				menuButton.focus();
			}.bind(this));
		}
	},
	_handleScoringChange: function(e) {
		var menuButton = e.currentTarget;
		var menuItem = e.target;
		var dropdownMenu = dom(menuButton).querySelector('d2l-dropdown-menu');

		if (!this._canConvertScoring || menuItem.value === this._scoringMethod)
			return;

		this.disableMenu(menuButton);
		var action = this.entity.getActionByName('update-scoring');
		var fields = [{'name':'scoringMethod', 'value':menuItem.value}];
		this.performSirenAction(action, fields).then(function() {
			this._scoringText = this.localize('scoring', 'method', menuItem.text);
			this._scoringMethod = menuItem.value;
			this.dispatchEvent(new CustomEvent('d2l-rubric-scoring-changed', {
				bubbles: true,
				composed: true,
			}));

			announce(this.localize('changeScoringSuccessful', 'method', menuItem.text));
		}.bind(this)).then(function() {
			this.enableMenu(menuButton);
		}.bind(this)).catch(function(err) {
			this.resetSelectedMenuItem(menuButton, this._scoringMethod);
			this.enableMenu(menuButton);
			this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
				detail: {
					message: err.message,
				},
				bubbles: true,
				composed: true,
			}));
		}.bind(this));

		dom(dropdownMenu).removeAttribute('opened');
	}
});
