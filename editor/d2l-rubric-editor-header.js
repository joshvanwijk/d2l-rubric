import '@polymer/polymer/polymer-legacy.js';
import '../localize-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-rubric-editor-cell-styles.js';
import 'd2l-save-status/d2l-save-status.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-editor-header">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			#rubric-editor-header {
				margin-bottom: 1.0rem;
				margin-left: var(--d2l-rubric-editor-start-gutter-width);
				margin-right: var(--d2l-rubric-editor-end-gutter-width);
			}

			:dir(rtl) #rubric-editor-header {
				text-align: right;
				margin-left: var(--d2l-rubric-editor-end-gutter-width);
				margin-right: var(--d2l-rubric-editor-start-gutter-width);
			}

			#rubric-editor-header-content {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
			}

			#title {
				@apply --d2l-heading-1;
				margin-top: 0;
				margin-bottom: 0;
				display: flex;
				flex: 1;
				margin-right: 0.3rem;
			}

			:dir(rtl) #title {
				margin-right: unset;
				margin-left: 0.3rem;
			}

			#header-end-container {
				margin-top: 0.5rem;
			}

			#header-end-container > * {
				margin: 0 0.3rem;
			}

			#header-end-container > *:first-child {
				margin-left: unset;
				margin-right: 0.3rem;
			}

			#header-end-container > *:last-child {
				margin-left: 0.3rem;
				margin-right: -0.7rem; /** edge of dropdown arrow to align with rubric **/
			}

			:dir(rtl) #header-end-container > *:first-child {
				margin-left: 0.3rem;
				margin-right: unset;
			}

			:dir(rtl) #header-end-container > *:last-child {
				margin-left: -0.7rem; /** edge of dropdown arrow to align with rubric **/
				margin-right: 0.3rem;
			}

			#editor-save-status {
				display: inline-block;
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
		</style>
		<div id="rubric-editor-header">
			<div id="rubric-editor-header-content">
				<div id="title">
					<slot name="title"></slot>
					<slot name="title-dropdown-menu"></slot>
				</div>
				<div id="header-end-container">
					<d2l-save-status id="editor-save-status"></d2l-save-status>
					<slot name="header-end-content"></slot>
				</div>
			</div>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-editor-header',
	properties: {},
	behaviors: [
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
	],
	onEntitySave: function(e) {
		var saveStateEl = this.$['editor-save-status'];
		if (saveStateEl) {
			({
				'd2l-siren-entity-save-start': function() { saveStateEl.start(); },
				'd2l-siren-entity-save-end': function() { saveStateEl.end(); },
				'd2l-siren-entity-save-error': function() { saveStateEl.error(); }
			})[e.type]();
		}
	},
});
