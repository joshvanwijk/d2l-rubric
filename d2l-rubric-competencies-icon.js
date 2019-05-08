import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'd2l-button/d2l-button-subtle.js';
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
			<template is="dom-if" if="[[!mobile]]">
				<img id="icon-desktop" src="[[_getIconData('competency')]]"></img>
				<d2l-tooltip
					for="icon-desktop"
					position="[[tooltipPosition]]"
				>
					<span>[[_getTooltip(competencyNames)]]</span>
				</d2l-tooltip>
			</template>
			<template is="dom-if" if="[[mobile]]">
				<d2l-button-subtle id="icon-mobile" on-click="_onClick">
					<img src="[[_getIconData('competency')]]"></img>
				</d2l-button-subtle>
				<d2l-tooltip 
					for="icon-mobile" 
					position="[[tooltipPosition]]"
					force-show="[[_mobileTooltipOpen]]"
				>
					<span>[[_getTooltip(competencyNames)]]</span>
				</d2l-tooltip>
			</template>
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
			_mobileTooltipOpen: {
				type: Boolean,
				value: false
			}
		};
	}

	ready() {
		super.ready();
		this.addEventListener('blur', () => this._mobileTooltipOpen = false);
	}

	_onClick(event) {
		if (this.mobile && !this._mobileTooltipOpen) {
			this._mobileTooltipOpen = true;
		}
	}

	_getTooltip(competencyNames) {
		return competencyNames.join('\n');
	}

	_getIconData(icon) {
		return Icons[icon];
	}

}

customElements.define(RubricCompetenciesIcon.is, RubricCompetenciesIcon);
