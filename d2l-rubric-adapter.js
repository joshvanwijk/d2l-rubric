import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@brightspace-ui-labs/accordion/accordion.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import './localize-behavior.js';
/**
 * An adapter for the Rubrics component to get platform-specific ordering of components without
 * owning the specific rendering logic.
 */
window.customElements.define('d2l-rubric-adapter', class RubricAdapter extends mixinBehaviors([
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior
], PolymerElement) {
	static get properties() {
		return {
			compact: Boolean,
			detachedView: Boolean,
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

				.rubric-header-icon-detached,
				.rubric-header-title-detached {
					color: var(--d2l-color-ferrite);
				}

				.rubric-label-detached {
					color: var(--d2l-color-ferrite);
					font-style: italic;
					font-size: 0.6rem;
					text-align: right;
				}

				.rubric-header-title,
				.rubric-header-title-detached {
					font-size: 0.8rem;
					text-align: bottom;
				}

				.rubric-header-title-container {
					display: inline-flex;
					flex-direction: column;
					vertical-align: middle;
				}

				.rubric-label-detached-container {
					float: right;
				}

				.rubric-header-out-of-container {
					height: 1.4rem;
					font-size: 0.8rem;
				}

				d2l-labs-accordion-collapse[opened] .rubric-header-out-of-text {
					display: none;
				}
			</style>

			<slot name="alerts"></slot>
			<div hidden$="[[_hasAlerts(hasAlerts)]]">
				<template
					is="dom-if"
					id="compact-view-template"
					if="[[_showAttachedCompactView(compact, detachedView)]]"
					restamp
				>
					<d2l-labs-accordion flex>
						<d2l-labs-accordion-collapse flex>
							<div slot="header">
								<d2l-icon
									class="rubric-header-icon"
									icon="[[_getRubricIcon(assessmentEntity, detachedView)]]">
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
						</d2l-labs-accordion-collapse>
					</d2l-labs-accordion>
				</template>
				<template
					is="dom-if"
					id="detached-compact-view-template"
					if="[[_showDetachedCompactView(compact, detachedView)]]"
					restamp
				>
					<div slot="header">
						<d2l-icon
							class="rubric-header-icon-detached"
							icon="[[_getRubricIcon(assessmentEntity, detachedView)]]">
						</d2l-icon>
						<span class="rubric-header-title-container">
							<div class="rubric-header-title-detached">[[rubricName]]</div>
						</span>
						<span class="rubric-label-detached-container">
							<div class="rubric-label-detached">[[localize('detached')]]</div>
							<div style="clear: both;" />
						</span>
					</div>
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

	_getRubricIcon(assessmentEntity, detachedView) {
		const tierName = detachedView
			? 'd2l-tier1'
			: 'd2l-tier3';
		const iconName = assessmentEntity && assessmentEntity.hasClass('completed')
			? 'rubric-graded'
			: 'rubric';

		return tierName + ':' + iconName;
	}

	_showAttachedCompactView(compact, detachedView) {
		return compact && !detachedView;
	}

	_showDetachedCompactView(compact, detachedView) {
		return compact && detachedView;
	}

	_onConnected() {
		const domIf = this.$['compact-view-template'];

		domIf.addEventListener('dom-change', () => {
			const accordion = this.shadowRoot.querySelector('d2l-labs-accordion-collapse');

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
