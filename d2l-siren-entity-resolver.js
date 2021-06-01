import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class SirenEntityResolver extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior
], PolymerElement) {
	static get properties() {
		return {
			map: {
				type: Object,
				notify: true,
				value: {}
			}
		};
	}

	static get template() {
		return html`
<style>
    :host {
        display: none;
    }
</style>
        `;
	}

	_onEntityChanged(entity) {
		if (!this.href) return;

		const mapping = Object.assign({}, this.map); // Copy the original

		if (entity && entity.links) {
			mapping[this.href] = entity;
		} else if (mapping[this.href]) {
			delete mapping[this.href];
		}

		this.map = mapping;
	}
}

customElements.define('d2l-siren-entity-resolver', SirenEntityResolver);
