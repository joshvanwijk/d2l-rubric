import '@polymer/polymer/polymer-legacy.js';
import 'd2l-inputs/d2l-input-textarea.js';
import './d2l-rubric-html-editor.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
	_template: html`
		<style>
			:host {
				line-height: 1rem;
				display: flex;
			}

			[hidden] {
				display: none;
			}

			* {
				box-sizing: border-box;
			}

		</style>
		<template is="dom-if" if="[[!richTextEnabled]]">
			<d2l-input-textarea id="textEditor" hidden$="[[richTextEnabled]]" aria-invalid="[[ariaInvalid]]" aria-label="[[ariaLabel]]" disabled="[[disabled]]" value="[[value]]" on-change="_onInputChange"></d2l-input-textarea>
		</template>
		<template is="dom-if" if="[[richTextEnabled]]">
			<d2l-rubric-html-editor id="htmlEditor" token="[[token]]" hidden$="[[!richTextEnabled]]" aria-label="[[ariaLabel]]" invalid="[[_stringIsTrue(ariaInvalid)]]" placeholder="[[placeholder]]" value="[[value]]" key="[[key]]" min-rows="[[minRows]]" max-rows="[[maxRows]]" on-change="_onInputChange"></d2l-rubric-html-editor>
		</template>
`,

	is: 'd2l-rubric-text-editor',

	properties: {
		key: String,
		ariaLabel: {
			type: String,
		},
		ariaInvalid: {
			type: Boolean,
			value: false,
		},
		placeholder: {
			type: String,
		},
		value: {
			type: String,
			notify: true,
		},
		richTextEnabled: {
			type: Boolean,
			value: false,
		},
		disabled: {
			type: Boolean,
			value: false,
		},
		/**
		 * The user access token
		 */
		token: {
			type: String,
		},
	},

	focus: function() {
		if (this.richTextEnabled) {
			this.$$('#htmlEditor').focus();
		} else {
			this.$$('#textEditor').focus();
		}
	},

	_stringIsTrue: function(string) {
		return string && string === 'true';
	},

	_onInputChange: function(e) {
		e.stopPropagation();
		var value = (e.detail && e.detail.content) || e.target.value || '';
		this.fire('change', { value: value });
	}
});
