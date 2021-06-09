import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../d2l-rubric-entity-behavior.js';
import '../d2l-rubric-loading.js';
import '../localize-behavior.js';
import './d2l-rubric-criteria-group-editor.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criteria-groups-editor">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			:host {
				display: block;
			}

			d2l-rubric-criteria-group-editor {
				padding-bottom: 24px;
			}

			d2l-rubric-criteria-group-editor:last-of-type {
				padding-bottom: 0px;
			}

			.groups-footer {
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				align-items: center;
				margin: 0;
				margin-left: var(--d2l-rubric-editor-start-gutter-width);
				margin-right: var(--d2l-rubric-editor-end-gutter-width);
			}

			:dir(rtl) .groups-footer {
				margin-right: var(--d2l-rubric-editor-start-gutter-width);
				margin-left: var(--d2l-rubric-editor-end-gutter-width);
			}

			.groups-footer > .footer-child {
				padding-top: 24px;
			}

			.out-of-text {
				display: flex;
				flex-direction: row;
			}

			.total-text {
				margin: 0 20px;
			}

			.reorder-offscreen {
				margin-top: 30px;
			}

			.reorder-button {
				display: block;
				color: #565a5c;
				background: none;
				width: 24px;
				height: 24px;
				padding: 0;
				border: 1px solid transparent;
				border-radius: 0.3rem;
				box-sizing: border-box;
				outline: none;
				margin: 0 3px 0 auto;
				cursor: pointer;
				user-select: none;
			}

			.reorder-button[disabled] {
				opacity: 0.5;
				cursor: default;
			}

			.reorder-button:focus, .reorder-button:hover {
				background-color: #f2f3f5;
				outline: none;
				border: 1px solid #d3d9e3;
			}

			[hidden] {
				display: none;
			}
		</style>

		<d2l-rubric-loading hidden$="[[_showContent]]"></d2l-rubric-loading>

		<template is="dom-repeat" items="[[_groups]]" on-dom-change="_groupsDomComplete" index-as="criteriaGroupIndex">
			<d2l-rubric-criteria-group-editor
				hidden$="[[!_showContent]]"
				href="[[_getSelfLink(item)]]"
				token="[[token]]"
				show-group-name="[[_showGroupName(entity)]]"
				is-holistic="[[isHolistic]]"
				percentage-format-alternate="[[percentageFormatAlternate]]"
				rich-text-enabled="[[richTextEnabled]]"
				rubrics-criterion-action="[[rubricsCriterionAction]]"
				outcomes-title="[[outcomesTitle]]"
				browse-outcomes-text="[[browseOutcomesText]]"
				align-outcomes-text="[[alignOutcomesText]]"
				outcomes-tool-integration-enabled="[[outcomesToolIntegrationEnabled]]"
				updating-levels="{{updatingLevels}}"
				is-reordered="[[_isReordered]]"
			>
				<div slot="criteria-group-reorder" class="reorder-offscreen">
					<button 
						id="up-toggle" 
						class="reorder-button" 
						hidden$="[[!_canReorder]]" 
						disabled$="[[_isFirstCriteriaGroup(criteriaGroupIndex, _criteriaGroupCount)]]" 
						data-index$=[[criteriaGroupIndex]] 
						on-click="_moveUp"
						title="[[_getReorderingButtonsLocalize('moveCriteriaGroupUp', criteriaGroupIndex)]]"
					>
						<d2l-icon icon="d2l-tier1:arrow-toggle-up"></d2l-icon>
					</button>
					<button 
						id="down-toggle" 
						class="reorder-button" 
						hidden$="[[!_canReorder]]" 
						disabled$="[[_isLastCriteriaGroup(criteriaGroupIndex, _criteriaGroupCount)]]" 
						data-index$=[[criteriaGroupIndex]] 
						on-click="_moveDown"
						title="[[_getReorderingButtonsLocalize('moveCriteriaGroupDown', criteriaGroupIndex)]]"
					>
						<d2l-icon icon="d2l-tier1:arrow-toggle-down"></d2l-icon>
					</button>
				</div>
			</d2l-rubric-criteria-group-editor>
		</template>

		<div class="groups-footer">
			<d2l-button class="footer-child" type="button" on-click="_handleAddCriteriaGroup" hidden="[[!_canCreate]]" aria-label$="[[localize('addCriteriaGroup')]]">
				[[localize('addCriteriaGroup')]]
			</d2l-button>

			<div class="out-of-text footer-child" hidden="[[!_hasTotalScore]]" aria-label$="[[localize('totalScoreAriaLabel','value',totalScore)]]">
				<span class="total-text">[[localize('total')]]</span><span>[[localize('dashOutOf', 'outOf', totalScore)]]</span>
			</div>
		</div>

	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criteria-groups-editor',

	properties: {
		_groups: {
			type: Array,
			value: function() { return []; }
		},

		_criteriaGroupCount: {
			type: Number,
			value: -1
		},

		_showContent: {
			type: Boolean,
			value: false
		},

		_canCreate: {
			type: Boolean,
			computed: '_canCreateCriteriaGroup(entity)'
		},

		_canReorder: {
			type: Boolean,
			computed: '_canReorderCriteriaGroup(entity, _criteriaGroupCount)'
		},

		_isReordered: {
			type: Boolean,
			value: false
		},

		_waitingForGroups: {
			type: Boolean,
			value: false
		},

		_hasTotalScore: {
			type: Boolean,
			value: false
		},

		totalScore: {
			type: String,
			observer: '_totalScoreChanged'
		},

		rubricsCriterionAction: {
			type: Boolean,
			value: false
		},
		rubricsCriterionGroupsReorder: {
			type: Boolean,
			value: false
		},
		richTextEnabled: Boolean,
		outcomesToolIntegrationEnabled: Boolean,
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
		updatingLevels: {
			type: Boolean,
			notify: true
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior
	],

	observers: [
		'_countCriteriaGroup(_groups)'
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._groups = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criteriaGroup);
		this._showContent = true;
	},
	_handleAddCriteriaGroup: function() {
		var action = this.entity.getActionByName('create');
		if (action) {
			this._waitingForGroups = true;
			announce(this.localize('levelLoading', 'name', 'criteriaGroup'));
			this.performSirenAction(action).then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-criteria-group-added', {
					bubbles: true,
					composed: true,
				}));
				setTimeout(function() {
					announce(this.localize('groupAdded'));
				}.bind(this), 2000);
			}.bind(this)).catch(function(err) {
				this._waitingForGroups = false;
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
	_canCreateCriteriaGroup: function(entity) {
		return entity && entity.hasActionByName('create');
	},
	_showGroupName: function(entity) {
		return entity.entities.length > 1;
	},
	_groupsDomComplete: function() {
		if (this._waitingForGroups) {
			this._waitingForGroups = false;
			this._refocus();
		}
	},
	_refocus: function() {
		var allGroups = dom(this.root).querySelectorAll('d2l-rubric-criteria-group-editor');

		if (!allGroups.length) {
			return;
		}

		var lastGroup = allGroups[allGroups.length - 1];

		afterNextRender(this, () => {
			lastGroup
				.shadowRoot.querySelector('d2l-input-text')
				.shadowRoot.querySelector('input').select();
		});
	},
	_totalScoreChanged: function(totalScore) {
		this._hasTotalScore = typeof totalScore !== 'undefined';
	},
	_canReorderCriteriaGroup: function(entity, count) {
		return entity && entity.hasActionByName('reorder') && (count > 1);
	},
	_countCriteriaGroup: function(criteriaGroupArray) {
		this._criteriaGroupCount = criteriaGroupArray.length;
	},
	_doReorder: function(oldIndex, newIndex) {
		const newPosition = newIndex + 1;
		const criteriaGroupName = this._getCriteriaGroupName(oldIndex);

		const action = this.entity.getActionByName('reorder');
		if (action) {
			const fields = [
				{'name': 'oldIndex', 'value': oldIndex},
				{'name': 'newIndex', 'value': newIndex}
			];
			this._isReordered = true;
			return this.performSirenAction(action, fields).then(function() {
				announce(this.localize('criterionMoved', 'name', criteriaGroupName, 'positionNumber', newPosition));
			}.bind(this)).catch(function(err) {
				this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
					detail: {
						message: err.message,
					},
					bubbles: true,
					composed: true
				}));
			}.bind(this));
		}
		return Promise.resolve();
	},
	_getCriteriaGroupName: function(index) {
		const criteriaGroups = dom(this.root).querySelectorAll('d2l-rubric-criteria-group-editor');
		return criteriaGroups && criteriaGroups[index] ? criteriaGroups[index].entity.properties.name : '';
	},
	_getReorderingButtonsLocalize: function(localizeString, index) {
		return this.localize(localizeString, 'positionNumber', index + 1);
	},
	_getUpButton: function(index) {
		const upButtons = dom(this.root).querySelectorAll('#up-toggle');
		for (let i = 0; i < upButtons.length; i++) {
			if (parseInt(upButtons[i].attributes['data-index'].value) === index) {
				return upButtons[i];
			}
		}
	},
	_getDownButton: function(index) {
		const downButtons = dom(this.root).querySelectorAll('#down-toggle');
		for (let i = 0; i < downButtons.length; i++) {
			if (parseInt(downButtons[i].attributes['data-index'].value) === index) {
				return downButtons[i];
			}
		}
	},
	// eslint-disable-next-line no-unused-vars
	_isFirstCriteriaGroup: function(index, count) {
		return index === 0;
	},
	_isLastCriteriaGroup: function(index, count) {
		return index === count - 1;
	},
	_moveUp: function(e) {
		if (!e) {
			return;
		}
		let upButton = e.currentTarget;
		let downButton = upButton.nextElementSibling;

		const oldIndex = +upButton.attributes['data-index'].value;
		const newIndex = oldIndex - 1;

		const afterReorder = function() {
			upButton = this._getUpButton(newIndex);
			downButton = this._getDownButton(newIndex);
			this.isReordered = true;
			if (!upButton.disabled) {
				upButton.focus();
			} else {
				downButton.focus();
			}
		}.bind(this);
		this._doReorder(oldIndex, newIndex).then(afterReorder);
	},
	_moveDown: function(e) {
		if (!e) {
			return;
		}
		let downButton = e.currentTarget;
		let upButton = downButton.previousElementSibling;

		const oldIndex = +downButton.attributes['data-index'].value;
		const newIndex = oldIndex + 1;

		const afterReorder = function() {
			upButton = this._getUpButton(newIndex);
			downButton = this._getDownButton(newIndex);
			this.isReordered = true;
			if (!downButton.disabled) {
				downButton.focus();
			} else {
				upButton.focus();
			}
		}.bind(this);
		this._doReorder(oldIndex, newIndex).then(afterReorder);
	}
});
