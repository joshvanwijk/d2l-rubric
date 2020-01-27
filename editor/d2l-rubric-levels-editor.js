import '@polymer/polymer/polymer-legacy.js';
import 'd2l-table/d2l-table-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-button/d2l-button-icon.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '../d2l-rubric-entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../localize-behavior.js';
import '../telemetry-behavior.js';
import './d2l-rubric-level-editor.js';
import './d2l-rubric-editor-cell-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-levels-editor">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			:host {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			* {
				box-sizing: border-box;
			}
			.cell {
				padding: 0.5rem;
				background-color: var(--d2l-table-header-background-color);
			}

			#levels-section > div:first-of-type[is-holistic] { /* first col-inner */
				border-top-left-radius: var(--d2l-table-border-radius);
			}
			:dir(rtl) #levels-section > div:first-of-type[is-holistic] {
				border-top-left-radius: 0;
				border-right: 1px solid var(--d2l-color-galena);
				border-top-right-radius: var(--d2l-table-border-radius);
			}
			#levels-section > div:last-of-type[is-holistic] { /* last col-inner */
				border-right: 1px solid var(--d2l-color-galena);
				border-top-right-radius: var(--d2l-table-border-radius);
			}
			:dir(rtl) #levels-section > div:last-of-type[is-holistic] {
				border-right: none;
				border-top-right-radius: 0;
				border-top-left-radius: var(--d2l-table-border-radius);
			}

			d2l-button-icon {
				border-radius: 0.3rem;
				border: 1px solid var(--d2l-color-galena);
				background-color: var(--d2l-color-sylvite);
				height: 100%;
				align-items: center;
				--d2l-button-icon-min-height: 100%;
			}
			[is-holistic] d2l-button-icon {
				background-color: var(--d2l-color-regolith);
			}
			.col-first {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				border-top-left-radius: var(--d2l-table-border-radius);
			}
			.col-first[is-holistic], .col-last[is-holistic] {
				padding-top: 3px;
				padding-bottom: 3px;
				width: 2.6rem;
				border: none;
				background-color: var(--d2l-table-body-background-color);
			}
			.col-first[is-holistic] {
				padding-left: 0;
			}
			:dir(rtl) .col-first[is-holistic] {
				padding-left: 0.5rem;
				padding-right: 0;
			}
			.col-last[is-holistic] {
				padding-right: 0;
			}
			:dir(rtl) .col-last[is-holistic] {
				padding-right: 0.5rem;
				padding-left: 0;
			}
			:dir(rtl) .col-first {
				border-top-left-radius: 0;
				border-top-right-radius: var(--d2l-table-border-radius);
			}
			.col-last {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				border-top-right-radius: var(--d2l-table-border-radius);
			}
			 :dir(rtl) .col-last {
				border-top-right-radius: 0;
				border-top-left-radius: var(--d2l-table-border-radius);
			}
		</style>

		<div class="gutter-left"></div>
		<div class="cell col-first" is-holistic$="[[isHolistic]]">
			<slot name="group-name-slot"></slot>
			<d2l-button-icon on-click="_handlePrependLevel" on-focus="_onPrependFocus" icon="d2l-tier2:add" text="[[localize('addLevelPrepend', 'name', '')]]" disabled="[[!_canPrepend]]" type="button">
			</d2l-button-icon>
		</div>
		<div id="levels-section" style="display: inherit; flex: 1 1 auto;">
			<template is="dom-repeat" items="[[_levels]]" as="level">
				<div class="cell" is-holistic$="[[isHolistic]]">
					<d2l-rubric-level-editor href="[[_getSelfLink(level)]]" token="[[token]]" has-out-of="[[hasOutOf]]" percentage-format-alternate="[[percentageFormatAlternate]]" updating-levels="{{updatingLevels}}">
					</d2l-rubric-level-editor>
				</div>
			</template>
		</div>
		<div class="cell col-last" text-only$="[[!hasOutOf]]" is-holistic$="[[isHolistic]]">
			<d2l-button-icon on-click="_handleAppendLevel" on-focus="_onAppendFocus" icon="d2l-tier2:add" text="[[localize('addLevelAppend', 'name', '')]]" disabled="[[!_canAppend]]" type="button">
			</d2l-button-icon>
		</div>
		<div class="gutter-right"></div>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-levels-editor',

	properties: {
		_levels: Array,
		hasOutOf: {
			type: Boolean,
			value: false
		},
		isHolistic: {
			type: Boolean,
			value: false
		},
		percentageFormatAlternate: Boolean,
		_canPrepend: {
			type: Boolean,
			computed: '_canPrependLevel(entity)',
		},
		_canAppend: {
			type: Boolean,
			computed: '_canAppendLevel(entity)',
		},
		updatingLevels: {
			type: Boolean,
			notify: true
		},
		telemetryData: Object
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior,
		IronResizableBehavior
	],
	attached: function() {
		// Defer the offsetWidth/scrollWidth calculations until after the page has rendered
		afterNextRender(this, function() {
			if (this.isAttached) {
				this.listen(this, 'iron-resize', 'checkSize');
				this.checkSize();
			}
		}.bind(this));
	},
	detached: function() {
		this.unlisten(this, 'iron-resize', 'checkSize');
	},
	checkSize: function() {
		this.async(function() {
			var section = this.$['levels-section'];
			if (section) this.fire('d2l-rubric-editor-levels-width-changed', { width: section.offsetWidth });
		}.bind(this), 1);
	},
	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._levels = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level);
	},
	_canPrependLevel: function(entity) {
		return entity && entity.hasActionByName('prepend');
	},
	_canAppendLevel: function(entity) {
		return entity && entity.hasActionByName('append');
	},
	_handlePrependLevel: function() {
		var action = this.entity.getActionByName('prepend');
		if (action) {
			this.updatingLevels = true;
			this.perfMark('criterionLevelAddedStart');

			var firstLevelName = this._getFirstLevelName();
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-level-added');
				this.fire('iron-announce', { text: this.localize('levelPrepended', 'name', firstLevelName) }, { bubbles: true });
			}.bind(this)).catch(function(err) {
				this.fire('d2l-rubric-editor-save-error', { message: err.message });
			}.bind(this)).finally(function() {
				this.updatingLevels = false;
				this.perfMark('criterionLevelAddedEnd');
				this.logCriterionLevelAddedAction('criterionLevelAddedStart', 'criterionLevelAddedEnd', this.telemetryData);
			}.bind(this));
		}
	},
	_handleAppendLevel: function() {
		var action = this.entity.getActionByName('append');
		if (action) {
			this.updatingLevels = true;
			this.perfMark('criterionLevelAddedStart');

			var lastLevelName = this._getLastLevelName();
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-level-added');
				this.fire('iron-announce', { text: this.localize('levelAppended', 'name', lastLevelName) }, { bubbles: true });
			}.bind(this)).catch(function(err) {
				this.fire('d2l-rubric-editor-save-error', { message: err.message });
			}.bind(this)).finally(function() {
				this.updatingLevels = false;
				this.perfMark('criterionLevelAddedEnd');
				this.logCriterionLevelAddedAction('criterionLevelAddedStart', 'criterionLevelAddedEnd', this.telemetryData);
			}.bind(this));
		}
	},
	_getFirstLevelName: function() {
		var firstLevel = this.$$('d2l-rubric-level-editor');
		return firstLevel ? firstLevel.entity.properties.name : '';
	},
	_getLastLevelName: function() {
		var levels = dom(this.root).querySelectorAll('d2l-rubric-level-editor');
		return levels.length ? levels[levels.length - 1].entity.properties.name : '';
	},
	_onPrependFocus: function() {
		this.fire('iron-announce', { text: this.localize('addLevelPrepend', 'name', this._getFirstLevelName()) }, { bubbles: true });
	},
	_onAppendFocus: function() {
		this.fire('iron-announce', { text: this.localize('addLevelAppend', 'name', this._getLastLevelName()) }, { bubbles: true });
	}
});
