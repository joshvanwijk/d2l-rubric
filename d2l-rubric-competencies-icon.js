import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'd2l-tooltip/d2l-tooltip.js';
import Icons from './icons.js';

class RubricCompetenciesIcon extends PolymerElement {

	static get is() {
		return 'd2l-rubric-competencies-icon';
	}

	static get template() {
		const template = html`
			<style>
				d2l-tooltip > span {
					white-space: pre;
				}
			</style>
			
			<img
				id="icon"
				src="[[_getIconData('competency')]]"
				tabindex="0"
			></img>
			<d2l-tooltip
				for="icon"
				position="[[tooltipPosition]]"
				force-show="[[_hasFocus]]"
			>
				<span>[[_getTooltip(competencyNames)]]</span>
			</d2l-tooltip>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			competencyNames: Array,
			mobile: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			tooltipPosition: {
				type: String,
				value: 'top'
			},
			_hasFocus: {
				type: Boolean,
				value: false
			}
		};
	}

	ready() {
		super.ready();
		this.addEventListener('blur', () => this._hasFocus = false);
		this.addEventListener('focus', () => this._hasFocus = true);
	}

	_getTooltip(competencyNames) {
		return competencyNames.join('\n');
	}

	_getIconData(icon) {
		return Icons[icon];
	}

}

customElements.define(RubricCompetenciesIcon.is, RubricCompetenciesIcon);
