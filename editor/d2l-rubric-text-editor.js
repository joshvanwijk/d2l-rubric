import '@polymer/polymer/polymer-legacy.js';
import '@brightspace-ui/core/components/inputs/input-textarea.js';
import './d2l-rubric-html-editor.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

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

			d2l-input-textarea {
				width: 100%;
				--d2l-input-border-radius: 0;
				--d2l-input-border-color: transparent;
			}

			* {
				box-sizing: border-box;
			}

		</style>
		<template is="dom-if" if="[[!richTextEnabled]]">
			<d2l-input-textarea id="textEditor" hidden$="[[richTextEnabled]]" aria-invalid="[[ariaInvalid]]" aria-label$="[[ariaLabel]]" disabled="[[disabled]]" rows="1" max-rows="-1" value="{{value}}" on-blur="_onInputBlur" on-input="_duringInputChange"></d2l-input-textarea>
		</template>
		<template is="dom-if" if="[[richTextEnabled]]">
			<d2l-rubric-html-editor id="htmlEditor" token="[[token]]" hidden$="[[!richTextEnabled]]" aria-label$="[[ariaLabel]]" invalid="[[_stringIsTrue(ariaInvalid)]]" placeholder="[[placeholder]]" value="[[value]]" key="[[key]]" min-rows="[[minRows]]" max-rows="[[maxRows]]" on-change="_duringInputChange"></d2l-rubric-html-editor>
		</template>
`,

	is: 'd2l-rubric-text-editor',

	properties: {
		key: String,
		ariaLabel: {
			type: String,
		},
		ariaInvalid: {
			type: String,
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
		inputChanging: {
			type: Boolean,
			value: false,
			notify: true
		},
		pendingSaves :{
			type: Number
		}
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

	_onInputBlur: function(e) {
		e.stopPropagation();
		if (this.inputChanging || !this.pendingSaves && this.ariaInvalid === 'true') {
			this.inputChanging = false;
			var value = this._getTextValue(e);
			this.dispatchEvent(new CustomEvent('text-changed', {
				detail: {
					value: value,
				},
				bubbles: true,
				composed: true,
			}));
		}
	},

	_duringInputChange: function(e) {
		e.stopPropagation();
		var value = this._getTextValue(e);
		if (this.richTextEnabled) {
			this.value = value;
			/* In the HTML Editor case, this function is called when the change
			   event fires, which occurs only when pasting text or unfocusing
			   the cell, so there is no reason to use debounce here. */
			this.dispatchEvent(new CustomEvent('text-changed', {
				detail: {
					value: value,
				},
				bubbles: true,
				composed: true,
			}));
		} else {
			this.inputChanging = true;
			this.debounce('input', function() {
				if (this.inputChanging) {
					this.inputChanging = false;
					this.dispatchEvent(new CustomEvent('text-changed', {
						detail: {
							value: value,
						},
						bubbles: true,
						composed: true,
					}));
				}
			}.bind(this), 500);
		}
	},

	_getTextValue: function(e) {
		return (e.detail && e.detail.hasOwnProperty('content')) ?
			e.detail.content : e.target.value || '';
	}
});
