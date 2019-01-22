import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-table/d2l-table-shared-styles.js';
import 'd2l-table/d2l-scroll-wrapper.js';
import '../d2l-rubric-entity-behavior.js';
import '../localize-behavior.js';
import './d2l-rubric-description-editor.js';
import './d2l-rubric-overall-level-editor.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-overall-levels-editor">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			:host {
				display: block;
			}

			* {
				box-sizing: border-box;
			}

			.gutter-left {
				margin-left: calc(var(--d2l-rubric-editor-start-gutter-width) - 0.3rem);
				margin-right: 1.45rem;
			}
			:dir(rtl) .gutter-left {
				margin-left: 1.45rem;
				margin-right: calc(var(--d2l-rubric-editor-start-gutter-width) - 0.3rem);
			}
			.gutter-right {
				margin-right: calc(var(--d2l-rubric-editor-end-gutter-width) - 0.3rem);
				margin-left: 0.5rem;
			}
			:dir(rtl) .gutter-right {
				margin-right: 0.5rem;
				margin-left: calc(var(--d2l-rubric-editor-end-gutter-width) - 0.3rem);
			}
			.gutter-left, .gutter-right {
				margin-top: 3px;
				margin-bottom: 3px;
			}
			.editor-section {
				display: flex;
				flex-direction: row;
				width: fit-content;
				width: -moz-fit-content;
			}

			.header {
				margin-left: var(--d2l-rubric-editor-start-gutter-width);
			}

			:dir(rtl) .header {
				margin-left: 0;
				margin-right: var(--d2l-rubric-editor-start-gutter-width);
			}

			.title {
				@apply --d2l-heading-3;
				margin-bottom: 10px;
			}

			.sub-title {
				@apply --d2l-body-compact-text;
				padding-bottom: 23px;
			}

			d2l-button-icon {
				border-radius: 0.3rem;
				border: 1px solid var(--d2l-color-mica);
				height: 100%;
				align-items: center;
				--d2l-button-icon-min-height: 100%;
			}

			.cell {
				padding: 0.5rem;
			}

			#description .cell {
				padding: 1px;
				border-bottom: var(--d2l-table-border);
			}

			d2l-rubric-description-editor {
				height: 100%;
			}

			.col-center {
				flex-grow: 1;
			}

			.col-center {
				display: flex;
				flex-direction: row;
			}

			.col-center div {
				min-width: 10rem;
			}

			:dir(rtl) .col-center div:first-of-type {
				border-right: var(--d2l-table-border);
			}

			.col-center div:last-of-type {
				border-right: var(--d2l-table-border);
			}

			:dir(rtl) .col-center div:last-of-type {
				border-right: 0;
			}

			#level-header .col-center {
				background-color: var(--d2l-table-header-background-color);
			}

			#level-header .col-center div:first-of-type {
				border-top-left-radius: var(--d2l-table-border-radius);
			}

			#level-header .col-center div:last-of-type {
				border-top-right-radius: var(--d2l-table-border-radius);
			}

			:dir(rtl) #level-header .col-center div:first-of-type {
				border-top-left-radius: 0;
				border-top-right-radius: var(--d2l-table-border-radius);
			}

			:dir(rtl) #level-header div.col-center div:last-of-type {
				border-top-right-radius: 0;
				border-top-left-radius: var(--d2l-table-border-radius);
			}

			#description .col-center div:first-of-type {
				border-bottom-left-radius: var(--d2l-table-border-radius);
			}

			#description .col-center div:last-of-type {
				border-bottom-right-radius: var(--d2l-table-border-radius);
			}

			:dir(rtl) #description .col-center div:first-of-type {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: var(--d2l-table-border-radius);
			}

			:dir(rtl) #description div.col-center div:last-of-type {
				border-bottom-right-radius: 0;
				border-bottom-left-radius: var(--d2l-table-border-radius);
			}
		</style>

		<div class="header">
			<div class="title">[[localize('overallScoreHeader')]]</div>
			<div class="sub-title">[[localize('overallScoreDescription')]]</div>
		</div>

		<d2l-scroll-wrapper id="scroll-wrapper" start-icon="d2l-tier1:chevron-left" end-icon="d2l-tier1:chevron-right" show-actions="" check-scroll-delta-value="1">
			<div id="level-header" class="editor-section">
				<div class="gutter-left">
					<d2l-button-icon on-tap="_handlePrependOverallLevel" on-focus="_onPrependFocus" icon="d2l-tier2:add" text="[[localize('addOverallLevelPrepend', 'name', '')]]" disabled="[[!_canPrepend]]" type="button">
					</d2l-button-icon>
				</div>
				<div class="col-center" id="level-header-center-section">
					<template is="dom-repeat" items="[[_overallLevels]]" as="overallLevel">
						<div class="cell">
							<d2l-rubric-overall-level-editor href="[[_getSelfLink(overallLevel)]]" token="[[token]]"></d2l-rubric-overall-level-editor>
						</div>
					</template>
				</div>
				<div class="gutter-right">
					<d2l-button-icon on-tap="_handleAppendOverallLevel" on-focus="_onAppendFocus" icon="d2l-tier2:add" text="[[localize('addOverallLevelAppend', 'name', '')]]" disabled="[[!_canAppend]]" type="button">
					</d2l-button-icon>
				</div>
			</div>
			<div id="description" class="editor-section">
				<div class="gutter-left"></div>
				<div class="col-center" id="description-center-section">
					<template is="dom-repeat" items="[[_overallLevels]]" as="overallLevel">
						<div class="cell">
							<d2l-rubric-description-editor href="[[_getSelfLink(overallLevel)]]" token="[[token]]" aria-label-langterm="overallDescriptionAriaLabel" rich-text-enabled="[[richTextEnabled]]"></d2l-rubric-description-editor>
						</div>
					</template>
				</div>
				<div class="gutter-right"></div>
			</div>
		</d2l-scroll-wrapper>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-overall-levels-editor',

	properties: {
		richTextEnabled: Boolean,
		_overallLevels: {
			type: Object
		},
		_canPrepend: {
			type: Boolean,
			computed: '_canPrependOverallLevel(entity)',
		},
		_canAppend: {
			type: Boolean,
			computed: '_canAppendOverallLevel(entity)',
		}
	},
	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		IronResizableBehavior
	],
	attached: function() {
		// Defer the offsetWidth/scrollWidth calculations until after the page has rendered
		afterNextRender(this, function() {
			if (this.isAttached) {
				this.listen(this, 'iron-resize', 'syncMiddleSectionSize');
				this.syncMiddleSectionSize();
			}
		}.bind(this));
	},
	detached: function() {
		this.unlisten(this, 'iron-resize', 'syncMiddleSectionSize');
	},
	syncMiddleSectionSize: function() {
		this.async(function() {
			var fromSection = this.$['level-header-center-section'];
			var toSection = this.$['description-center-section'];
			if (fromSection) {
				toSection.style = 'width: ' + fromSection.offsetWidth + 'px;';
			}
			this._notifyResize();
		}.bind(this), 1);
	},
	observers: [
		'_onEntityChanged(entity)',
	],
	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}
		this._overallLevels = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.overallLevels);
		this._notifyResize();
	},
	_getFirstLevelName: function() {
		var level = dom(this.root).querySelectorAll('d2l-rubric-overall-level-editor');
		return level.length ? level[0].entity.properties.name : '';
	},
	_getLastLevelName: function() {
		var levels = dom(this.root).querySelectorAll('d2l-rubric-overall-level-editor');
		return levels.length ? levels[levels.length - 1].entity.properties.name : '';
	},
	_canPrependOverallLevel: function(entity) {
		return entity && entity.hasActionByName('prepend');
	},
	_canAppendOverallLevel: function(entity) {
		return entity && entity.hasActionByName('append');
	},
	_onPrependFocus: function() {
		this.fire('iron-announce', { text: this.localize('addOverallLevelPrepend', 'name', this._getFirstLevelName()) }, { bubbles: true });
	},
	_onAppendFocus: function() {
		this.fire('iron-announce', { text: this.localize('addOverallLevelAppend', 'name', this._getLastLevelName()) }, { bubbles: true });
	},
	_handlePrependOverallLevel: function() {
		var action = this.entity.getActionByName('prepend');
		if (action) {
			var firstLevelName = this._getFirstLevelName();
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-overall-level-added');
				this.fire('iron-announce', { text: this.localize('addOverallLevelPrepend', 'name', firstLevelName) }, { bubbles: true });
			}.bind(this)).catch(function(err) {
				this.fire('d2l-rubric-editor-save-error', { message: err.message });
			}.bind(this));
		}
	},
	_handleAppendOverallLevel: function() {
		var action = this.entity.getActionByName('append');
		if (action) {
			var lastLevelName = this._getLastLevelName();
			this.performSirenAction(action).then(function() {
				this.fire('d2l-rubric-overall-level-added');
				this.fire('iron-announce', { text: this.localize('addOverallLevelAppend', 'name', lastLevelName) }, { bubbles: true });
			}.bind(this)).catch(function(err) {
				this.fire('d2l-rubric-editor-save-error', { message: err.message });
			}.bind(this));
		}
	},
	_notifyResize: function() {
		afterNextRender(this, function() {
			this.$$('d2l-scroll-wrapper').notifyResize();
		}.bind(this));
	}
});
