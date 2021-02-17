import '@polymer/polymer/polymer-legacy.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import 'd2l-table/d2l-table-shared-styles.js';
import 'd2l-table/d2l-scroll-wrapper.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-offscreen/d2l-offscreen.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import 'd2l-tooltip/d2l-tooltip.js';
import '../d2l-rubric-entity-behavior.js';
import '../d2l-rubric-loading.js';
import '../localize-behavior.js';
import '../rubric-siren-entity.js';
import '../telemetry-behavior.js';
import './d2l-rubric-levels-editor.js';
import './d2l-rubric-loa-overlay.js';
import './d2l-rubric-criteria-editor.js';
import './d2l-rubric-error-handling-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criteria-group-editor">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			:host {
				display: block;
			}

			* {
				box-sizing: border-box;
			}

			d2l-alert {
				margin-bottom: 1rem;
			}

			#group-name {
				align-self: flex-start;
			}

			#group-name {
				padding-right: 0.5rem;
			}

			:dir(rtl) #group-name {
				padding-left: 0.5rem;
			}

			[hidden] {
				display: none;
			}

			.stretch-child {
				display: flex;
			}

			/*
				This extra padding is needed to counteract the collapsing of the d2l-alert
				margin with the negative margin applied by the d2l-scroll-wrapper sticky buttons
			*/
			.d2l-alert-container:last-of-type {
				padding-bottom: 1px;
			}
			.d2l-alert-container {
				padding: 0;
				padding-left: var(--d2l-rubric-editor-start-gutter-width);
				padding-right: var(--d2l-rubric-editor-end-gutter-width);
			}
			:dir(rtl) .d2l-alert-container {
				padding-right: var(--d2l-rubric-editor-start-gutter-width);
				padding-left: var(--d2l-rubric-editor-end-gutter-width);
			}

			.footer {
				display: flex;
			}

			.footer-buttons {
				text-align: center;
				padding: 0.45rem;
				flex: 1 1 auto;
				border: 1px solid var(--d2l-color-galena);
				border-bottom-left-radius: var(--d2l-table-border-radius);
				border-bottom-right-radius: var(--d2l-table-border-radius);
				background-color: var(--d2l-table-header-background-color);
			}

			.screen-reader {
				height: 1px;
				left: -99999px;
				overflow: hidden;
				position: absolute;
				width: 1px;
			}
		</style>

		<template is="dom-repeat" items="[[_alerts]]">
			<div class="d2l-alert-container">
				<d2l-alert type="[[item.alertType]]" has-close-button="">
					[[item.alertMessage]]
				</d2l-alert>
			</div>
		</template>

		<d2l-scroll-wrapper id="scroll-wrapper" start-icon="d2l-tier1:chevron-left" end-icon="d2l-tier1:chevron-right" show-actions="" check-scroll-delta-value="1">
			<h2 class="screen-reader">[[_getGroupHeadingText(_groupName, showGroupName)]]</h2>
			<d2l-offscreen>[[_getRubricStructureLabel(_levelCount, _criterionCount)]]</d2l-offscreen>
			<div class="criteria-group">
				<d2l-rubric-loading hidden$="[[_showContent]]"></d2l-rubric-loading>
				<h3 class="screen-reader">[[localize('rubricLevelsHeading')]]</h3>
				<d2l-rubric-levels-editor
					href="[[_levelsHref]]"
					token="[[token]]"
					has-out-of="[[_hasOutOf(entity)]]"
					is-holistic="[[isHolistic]]"
					percentage-format-alternate="[[percentageFormatAlternate]]"
					on-d2l-siren-entity-changed="_notifyResize"
					updating-levels="{{updatingLevels}}"
					level-count="{{_levelCount}}"
				>
					<d2l-input-text
						id="group-name"
						slot="group-name-slot"
						value="[[_groupName]]"
						hidden="[[!showGroupName]]"
						disabled="[[!_canEditGroupName(entity)]]"
						on-blur="_nameBlurHandler"
						on-input="_nameInputHandler"
						aria-invalid="[[isAriaInvalid(_nameInvalid)]]"
						aria-label$="[[localize('groupName')]]. [[_getRubricStructureLabel(_levelCount, _criterionCount)]]"
						prevent-submit
						novalidate
					></d2l-input-text>
						
				</d2l-rubric-levels-editor>
				<d2l-rubric-loa-overlay
					href="[[_levelsHref]]"
					token="[[token]]"
					has-out-of="[[_hasOutOf(entity)]]"
					outcome-alignments="[[_outcomeAlignments]]"
				>
				</d2l-rubric-loa-overlay>
				<template is="dom-if" if="[[_nameInvalid]]">
					<d2l-tooltip announced id="group-name-bubble" class="is-error" for="group-name" position="bottom">
						[[_nameInvalidError]]
					</d2l-tooltip>
				</template>
				<!--
				This flex wrapper div is required to ensure that the d2l-rubric-criteria-editor
				fills the full width of it's parent when the d2l-rubric-criterion-editor components overflow.
				This ensures that the criteria footer which encapsulates the Add Criteria button
				also stretches to utilize all the available space, particularly when we are shrinking
				the size of the editor
				-->
				<h4 class="screen-reader">[[localize('criteriaHeading')]]</h4>
				<div class="stretch-child">
					<d2l-rubric-criteria-editor
						href="[[_criteriaCollectionHref]]"
						token="[[token]]"
						rich-text-enabled="[[richTextEnabled]]"
						is-holistic="[[isHolistic]]"
						outcomes-title="[[outcomesTitle]]"
						browse-outcomes-text="[[browseOutcomesText]]"
						align-outcomes-text="[[alignOutcomesText]]"
						outcomes-tool-integration-enabled="[[outcomesToolIntegrationEnabled]]"
						rubric-level-loa-mapping="[[_rubricLevelLoaMapping]]"
						updating-levels="[[updatingLevels]]"
						criterion-count="{{_criterionCount}}"
					>
					</d2l-rubric-criteria-editor>
				</div>
			</div>
		</d2l-scroll-wrapper>
		<rubric-siren-entity href="[[_criteriaCollectionHref]]" token="[[token]]" entity="{{_criteriaEntity}}"></rubric-siren-entity>
		<div class="footer" hidden$="[[isHolistic]]">
			<div class="gutter-left"></div>
			<div class="footer-buttons">
				<d2l-button-subtle on-click="_handleAddCriterion" icon="d2l-tier1:plus-default" text="[[localize('addCriterion')]]" disabled="[[!_canCreate]]" type="button">
				</d2l-button-subtle>
			</div>
			<div class="gutter-right"></div>
		</div>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criteria-group-editor',

	properties: {
		_levelCount: {
			type: Number,
			value: 0,
		},
		_criterionCount: {
			type: Number,
			value: 0,
		},
		showGroupName: {
			type: Boolean,
			value: false
		},
		isHolistic: {
			type: Boolean,
			value: false
		},
		percentageFormatAlternate: Boolean,
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
		_levelsHref: String,
		_criteriaCollectionHref: String,
		_canCreate: {
			type: Boolean,
			computed: '_canCreateCriterion(_criteriaEntity)',
		},

		_criteriaEntity: {
			type: Object,
			value: null
		},

		_showContent: {
			type: Boolean,
			value: false
		},
		_nameInvalid: {
			type: Boolean,
			value: false
		},
		_nameInvalidError: {
			type: String,
			value: null
		},
		_groupName: {
			type: String
		},
		_groupNameChanging: {
			type: Boolean,
			value: false
		},
		_pendingGroupNameSaves: {
			type: Number,
			value: 0
		},
		updatingLevels: {
			type: Boolean,
			notify: true
		},
		richTextEnabled: Boolean,
		outcomesToolIntegrationEnabled: Boolean,
		_outcomeAlignments: {
			type: Object,
			value: {}
		},
		_rubricLevelLoaMapping: {
			type: Object,
			value: {}
		},
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Rubric.SirenAutosaveActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],

	ready: function() {
		this.addEventListener('d2l-rubric-editor-save-error', this._handleSaveError.bind(this));
		this.addEventListener('d2l-rubric-editor-levels-width-changed', function(e) {
			this.$$('d2l-rubric-criteria-editor').criterionDetailWidth = e.detail.width;
		}.bind(this));

		this.addEventListener('d2l-rubric-criterion-detail-width-changed', (function() {
			afterNextRender(this, (function() {
				this.$$('d2l-scroll-wrapper').notifyResize();
			}).bind(this));
		}).bind(this));

		this.addEventListener('d2l-rubric-loa-overlay-level-mapping-changed', (e) => {
			this._rubricLevelLoaMapping = e.detail;
		});

		this.addEventListener('d2l-activity-alignment-outcomes-updated', (e) => {
			this._outcomeAlignments = e.detail;
		});
	},

	_onEntityChanged: function(entity, oldEntity) {
		if (!entity) {
			return;
		}
		this._levelsHref = this._getLevelsLink(entity);
		this._criteriaCollectionHref = this._getCriteriaLink(entity);
		this._showContent = true;

		var selfLinkChanged = this._getSelfLink(entity) !== this._getSelfLink(oldEntity);
		var nameChanged = oldEntity ? entity.properties.name !== oldEntity.properties.name : true;
		if (selfLinkChanged || nameChanged) {
			this._updateName(entity, selfLinkChanged);
		}
	},

	_canCreateCriterion: function(entity) {
		return entity && entity.hasActionByName('create');
	},

	_getCriteriaLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Rubrics.criteria);
		return link && link.href || '';
	},

	_getLevelsLink: function(entity) {
		var link = entity && entity.getLinkByRel(this.HypermediaRels.Rubrics.levels);
		return link && link.href || '';
	},

	_getRubricStructureLabel: function(levelCounts, criterionCounts) {
		return this.localize('rubricStructure', 'levelCount', levelCounts, 'criteriaCount', criterionCounts);
	},

	_hasOutOf: function(entity) {
		return entity && (
			entity.hasClass(this.HypermediaClasses.rubrics.numeric) ||
			entity.hasClass(this.HypermediaClasses.rubrics.percentage)
		);
	},

	_handleAddCriterion: function() {
		var action = this._criteriaEntity.getActionByName('create');
		if (action) {
			const uuid = this.getUUID();
			this.perfMark(`criterionAddedStart-${uuid}`);
			// a new criterion is created before this sentence is finished
			announce(this.localize('levelLoading', 'name', 'criterion'));
			this.performSirenAction(action).then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-criterion-added', {
					bubbles: true,
					composed: true,
				}));
				setTimeout(function() {
					announce(this.localize('criterionAdded'));
				}.bind(this), 2000);

				this.perfMark(`criterionAddedEnd-${uuid}`);
				this.logCriterionAddedAction(`criterionAddedStart-${uuid}`, `criterionAddedEnd-${uuid}`);
			}.bind(this)).catch(function(err) {
				this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
					detail: {
						message: err.message,
					},
					bubbles: true,
					composed: true,
				}));
			}.bind(this));
		}
	},

	_handleSaveError: function(e) {
		this._clearAlerts();
		e.stopPropagation();
		// only handle generic errors (without details)
		if (e.detail.error && !e.detail.error.hasOwnProperty('stack')) {
			var errObj = e.detail.error.string ? e.detail.error.string : e.detail.error.json ? e.detail.error.json : e.detail.error;
			if (errObj.hasOwnProperty('properties')) {
				return;
			}
		}

		announce(this.localize('rubricSavingErrorAriaAlert'));

		this._addAlert('error', e.message, this.localize('rubricSavingErrorMessage'));
	},

	_canEditGroupName: function(entity) {
		return entity && entity.hasActionByName('update');
	},

	_getGroupHeadingText: function(groupName, showGroupName) {
		return this.localize('groupRegion', 'name', showGroupName ? groupName : '');
	},

	_nameBlurHandler: function(e) {
		if (this._groupNameChanging || !this._pendingGroupNameSaves && this._nameInvalid) {
			this._saveName(e.target.value);
		}
	},

	_nameInputHandler: function(e) {
		this._groupNameChanging = true;
		var value = e.target.value;
		this.debounce('input', function() {
			if (this._groupNameChanging) {
				this._saveName(value);
			}
		}.bind(this), 500);
	},

	_saveName: function(value) {
		this._groupNameChanging = false;
		this._groupName = value;
		var action = this.entity.getActionByName('update');
		if (action) {
			if (!value.trim()) {
				this.toggleBubble('_nameInvalid', true, 'group-name-bubble', this.localize('nameIsRequired'));
			} else {
				this.toggleBubble('_nameInvalid', false, 'group-name-bubble');
				var fields = [{'name': 'name', 'value': value}];
				this.performAutosaveAction(action, fields, '_pendingGroupNameSaves').then(function() {
					this.dispatchEvent(new CustomEvent('d2l-rubric-group-name-saved', {
						bubbles: true,
						composed: true,
					}));
				}.bind(this)).catch(function(err) {
					this.handleValidationError('group-name-bubble', '_nameInvalid', 'groupNameSaveFailed', err);
				}.bind(this)).finally(function() {
					this._updateName(this.entity, false);
				}.bind(this));
			}
		}
	},

	_updateName: function(entity, selfLinkChanged) {
		if (selfLinkChanged || !this._groupNameChanging && !this._pendingGroupNameSaves) {
			this.toggleBubble('_nameInvalid', false, 'group-name-bubble');
			this._groupName = entity.properties.name;
		}
	},

	_notifyResize: function() {
		afterNextRender(this.$$('d2l-rubric-levels-editor'), function() {
			this.$$('d2l-scroll-wrapper').notifyResize();
		}.bind(this));
	}
});
