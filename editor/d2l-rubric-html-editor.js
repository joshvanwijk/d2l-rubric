import '@polymer/polymer/polymer-legacy.js';
import 'd2l-html-editor/d2l-html-editor-client.js';
import 'd2l-html-editor/d2l-html-editor.js';
import 'd2l-inputs/d2l-input-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

let htmlEditorId = 0;
function getNextEditorId() {
	return ++htmlEditorId;
}

Polymer({
	_template: html`
		<style include="d2l-input-styles">

			:host {
				display: flex;
				width: 100%;
			}

			d2l-html-editor {
				word-wrap: break-word;
				display: flex;
				width: 100%;
			}

			.d2l-richtext-editor-container {
				@apply --d2l-input;
				@apply --d2l-input-textarea;
				/* The following transtion override is required to fix what appears to be a bug in Chrome with
					shadow DOM enabled related to contenteditable elements nested in multiple
					shadow roots. The transition on the border seems to cause the contenteditable
					cursor to not show the text style, and also causes the contenteditable to
					randomly immediately lose focus whenever you try and click on it.
				*/
				transition-property: none;
			}

			.d2l-richtext-editor-container:hover,
			.d2l-richtext-editor-container:focus,
			.d2l-richtext-editor-container:active,
			.d2l-richtext-editor-container.html-editor-container-hover {
				@apply --d2l-input-hover-focus;
			}

			d2l-html-editor.invalid > .d2l-richtext-editor-container {
				@apply --d2l-input-invalid;
			}

			d2l-html-editor .d2l-richtext-editor-container > p:last-of-type {
				margin-bottom: 0;
			}

			d2l-html-editor .d2l-richtext-editor-container > p:first-of-type {
				margin-top: 0;
			}

			d2l-html-editor .d2l-richtext-editor-container * {
				max-width: 100%;
			}

			@media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
				d2l-html-editor .d2l-richtext-editor-container * {
					max-width: none;
				}
			}

			d2l-html-editor.invalid > .d2l-richtext-editor-container:hover,
			d2l-html-editor.invalid > .d2l-richtext-editor-container:focus {
				@apply --d2l-input-invalid;
			}

			@media (max-width: 615px), (max-device-width: 960px) {
				d2l-html-editor > .d2l-richtext-editor-container {
					height: 3.9rem;
				}
			}

			[hidden] {
				display: none;
			}

		</style>
		<d2l-html-editor 
			editor-id="[[_uniqueId]]" 
			inline="1" 
			auto-focus="[[autoFocus]]" 
			auto-focus-end="" 
			min-rows="1" 
			max-rows="1000" 
			app-root="[[_appRoot]]" 
			fullpage-enabled="0" 
			toolbar="[[_toolbar]]" 
			plugins="[[_plugins]]" 
			object-resizing="[[objectResizing]]">

			<div id$="toolbar-shortcut-[[_uniqueId]]" hidden=""></div>
			<div class="d2l-richtext-editor-container" id="[[_uniqueId]]" role="textbox" placeholder$="[[placeholder]]" aria-label$="[[ariaLabel]]"></div>
			
		</d2l-html-editor>
`,

	is: 'd2l-rubric-html-editor',
	get importMeta() {
		return import.meta;
	},
	properties: {
		/**
		* Every html editor element on a page MUST have a unique ID
		*/
		_uniqueId: {
			type: String,
			value: function() {
				return 'htmleditor-' + getNextEditorId();
			},
		},
		ariaLabel: {
			type: String,
		},
		invalid: {
			type: Boolean,
			value: false,
			observer: '_invalidChanged',
		},
		inline: {
			type: Number,
			value: 1,
		},
		autoFocus: {
			type: Number,
			value: 0,
		},
		minRows: {
			type: Number,
			value: 1,
		},
		maxRows: {
			type: Number,
		},
		value: {
			type: String,
		},
		key: {
			type: String,
			observer: '_keyChanged',
		},
		_appRoot: {
			type: String,
			value: function() {
				return this.resolveUrl('../');
			},
		},
		placeholder: {
			type: String,
		},
		_toolbar: {
			type: String,
			value: 'bold italic bullist d2l_isf',
		},
		_plugins: {
			type: String,
			value: 'lists paste d2l_placeholder d2l_isf d2l_replacestring d2l_equation',
		},
		objectResizing: {
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

	behaviors: [
		window.D2L.Hypermedia.HMConstantsBehavior,
	],

	attached: function() {
		this._fetchConfig();
	},

	_fetchConfig: function() {
		window.D2L.Siren.EntityStore
			.get(this.HypermediaRels.richTextEditorConfig, this.token)
			.then(function(entity) {
				this.$$('d2l-html-editor').d2lPluginSettings = entity ? entity.properties : {};
			}.bind(this));
	},

	focus: function() {
		this.$$('d2l-html-editor').focus();
	},

	_getContent: function() {
		return this.$$('d2l-html-editor').getContent();
	},

	_invalidChanged: function(isInvalid) {
		var htmlEditor = this.$$('d2l-html-editor');
		this.toggleClass('invalid', isInvalid, htmlEditor);
	},

	_keyChanged: function(newKey, oldKey) {
		this.$$('#' + this._uniqueId).innerHTML = this.value;
	},
});
