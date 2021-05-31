import '@brightspace-ui/core/components/inputs/input-text.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class AutosavingInput extends PolymerElement {

	static get is() {
		return 'd2l-rubric-autosaving-input';
	}

	static get template() {
		const template = html`
			<d2l-input-text
				id="input"
				value="[[_getDisplayedValue(_isFocused,invalid,pendingSaves,_enteredValue,value)]]"
				on-focus="_onFocus"
				on-blur="_onBlur"
				on-input="_onInput"
				aria-invalid="[[_boolString(invalid)]]"
				aria-label$="[[label]]"
				disabled="[[!enabled]]"
				prevent-submit=""
				size="[[size]]"
				novalidate
			></d2l-input-text>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			_isFocused: {
				type: Boolean,
				value: false
			},
			_enteredValue: {
				type: String
			},
			value: {
				type: String,
				notify: true
			},
			invalid: {
				type: Boolean
			},
			pendingSaves: {
				type: Number,
				value: 0
			},
			label: {
				type: String
			},
			enabled: {
				type: Boolean,
				value: true
			},
			editing: {
				type: Boolean,
				notify: true,
				readOnly: true,
				value: false
			},
			size: {
				type: Number
			}
		};
	}

	_onFocus(e) {
		this._enteredValue = e.target.value;
		this._isFocused = true;
	}

	_onBlur(e) {
		if (this.editing || !this.pendingSaves && this.invalid) {
			if (this._debouncer) {
				this._debouncer.cancel();
			}
			this._save(e.target.value);
		}
		this._isFocused = false;
	}

	_onInput(e) {
		this._setEditing(true);
		this._enteredValue = e.target.value;
		const value = e.target.value;
		this._debouncer = Debouncer.debounce(
			this._debouncer,
			timeOut.after(500),
			() => this.editing ? this._save(value) : null
		);
	}

	_save(value) {
		this._setEditing(false);
		const saveEvent = new CustomEvent('save');
		saveEvent.value = value;
		this.dispatchEvent(saveEvent);
	}

	_getDisplayedValue(isFocused, isInvalid, pendingSaves, enteredValue, savedValue) {
		return (isFocused || isInvalid || pendingSaves > 0) ? enteredValue : savedValue;
	}

	_boolString(boolVal) {
		return new Boolean(boolVal).toString();
	}

}

customElements.define(AutosavingInput.is, AutosavingInput);
