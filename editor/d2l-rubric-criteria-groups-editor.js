import '@polymer/polymer/polymer-legacy.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import '../d2l-rubric-entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../localize-behavior.js';
import '../d2l-rubric-loading.js';
import './d2l-rubric-criteria-group-editor.js';
import 'd2l-button/d2l-button.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';
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

			[hidden] {
				display: none;
			}
		</style>

		<d2l-rubric-loading hidden$="[[_showContent]]"></d2l-rubric-loading>

		<template is="dom-repeat" items="[[_groups]]" on-dom-change="_groupsDomComplete">
			<d2l-rubric-criteria-group-editor
				hidden$="[[!_showContent]]"
				href="[[_getSelfLink(item)]]"
				token="[[token]]"
				show-group-name="[[_showGroupName(entity)]]"
				is-holistic="[[isHolistic]]"
				percentage-format-alternate="[[percentageFormatAlternate]]"
				rich-text-enabled="[[richTextEnabled]]"
				outcomes-title="[[outcomesTitle]]"
				browse-outcomes-text="[[browseOutcomesText]]"
				align-outcomes-text="[[alignOutcomesText]]"
				outcomes-tool-integration-enabled="[[outcomesToolIntegrationEnabled]]"
				updating-levels="{{updatingLevels}}"
			>
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

		_showContent: {
			type: Boolean,
			value: false
		},

		_canCreate: {
			type: Boolean,
			computed: '_canCreateCriteriaGroup(entity)'
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
		},
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior
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
	}
});
