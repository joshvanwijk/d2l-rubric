import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-media-query/iron-media-query.js';
import 'd2l-accordion/d2l-accordion.js';
import 'd2l-accordion/d2l-accordion-collapse.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';

/**
 * An adapter for the Rubrics component to get platform-specific ordering of components without
 * owning the specific rendering logic.
 */
window.customElements.define('d2l-rubric-adapter', class RubricAdapter extends PolymerElement {
	static get properties() {
		return {
			compact: Boolean,
			hasAlerts: Boolean,
			rubricName: String,
			scoreText: String,
			_isMobile: {
				type: Boolean,
				value: false,
			},
		};
	}

	static get template() {
		return html`
			<style>
				.rubric-header-icon,
				.rubric-header-title {
					color: var(--d2l-color-celestine);
				}

				.rubric-header-title {
					font-size: 0.8rem;
					text-align: bottom;
				}

				.rubric-header-title-container {
					display: inline-flex;
					flex-direction: column;
					vertical-align: middle;
				}

				.rubric-header-out-of-container {
					height: 1.4rem;
					font-size: 0.8rem;
				}

				d2l-accordion-collapse[opened] .rubric-header-out-of-text {
					display: none;
				}
			</style>

			<slot name="alerts"></slot>
			<div hidden$="[[_hasAlerts(hasAlerts)]]">
				<template
					is="dom-if"
					id="compact-view-template"
					if="[[compact]]"
					restamp>
					<d2l-accordion flex>
						<d2l-accordion-collapse flex>
							<div slot="header">
								<d2l-icon
									class="rubric-header-icon"
									icon="[[_getRubricIcon(assessmentEntity)]]">
								</d2l-icon>
								<span class="rubric-header-title-container">
									<div class="rubric-header-title">[[rubricName]]</div>
									<div class="rubric-header-out-of-container">
										<span class="rubric-header-out-of-text">
											[[scoreText]]
										</span>
									</div>
								</span>
							</div>
							<slot></slot>
						</d2l-accordion-collapse>
					</d2l-accordion>
				</template>
				<template is="dom-if" if="[[!compact]]" restamp>
					<slot></slot>
				</template>
			</div>
		`;
	}

	connectedCallback() {
		super.connectedCallback();

		this._onConnected();
	}

	_hasAlerts(hasAlerts) {
		return !!hasAlerts;
	}

	_getRubricIcon(assessmentEntity) {
		const icon = assessmentEntity && assessmentEntity.hasClass('completed')
			? 'd2l-tier3:rubric-graded'
			: 'd2l-tier3:rubric';

		return icon;
	}

	_onConnected() {
		const domIf = this.$['compact-view-template'];

		domIf.addEventListener('dom-change', () => {
			const accordion = this.shadowRoot.querySelector('d2l-accordion-collapse');

			if (accordion) {
				if (this.___accordionMutationObserver) {
					return;
				}

				const el = this;

				el.dispatchEvent(new CustomEvent('d2l-rubric-compact-view-accordion', {
					detail: {
						opened: !!el.hasAttribute('opened'),
					},
					bubbles: true,
					composed: true,
				}));

				this.___accordionMutationObserver =
					new MutationObserver(function(mutationsList) {
						const lastMutation = mutationsList[mutationsList.length - 1];
						const isOpened = lastMutation.target.attributes['opened'];

						el.dispatchEvent(
							new CustomEvent('d2l-rubric-compact-view-accordion', {
								detail: {
									opened: !!isOpened,
								},
								bubbles: true,
								composed: true,
							})
						);
					});

				this.___accordionMutationObserver.observe(accordion, {
					attributes: true,
					attributeFilter: ['opened'],
				});
			} else if (this.___accordionMutationObserver) {
				/* MutationObserver lifecycle is tied to DOM element,
				   so will be garbage collected when DOM element is */
				this.___accordionMutationObserver = null;
			}
		});
	}
});
