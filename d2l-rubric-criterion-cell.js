import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './localize-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import './d2l-rubric-entity-behavior.js';
import 's-html/s-html.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-colors/d2l-colors.js';
import './assessment-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-criterion-cell">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}

			.criterion-description-richtext {
				display: block;
				overflow-x: hidden;
				color: var(--d2l-color-ferrite);
			}
			.custom-points {
				color: var(--d2l-color-tungsten);
				margin-bottom: 0.5rem;
			}
			.check-icon {
				text-align: center;
				position: absolute;
			}
			.check-icon.center {
				top: calc(50% - 12px);
				width: calc(100% - 2rem); /* Table cells have 1rem padding */
			}
			.check-icon.corner {
				position: absolute;
				bottom: 12px;
				right: 12px;
			}
			.check-icon.center .tier1-check {
				display: none;
			}
			.check-icon.corner .tier2-check {
				display: none;
			}
			.check-icon d2l-icon {
				color: var(--d2l-color-celestine-minus-1);
				margin: 0 auto;
			}
			.cell-container {
				@apply --d2l-body-small-text;
				min-width: 130px;
			}
			.cell-container.no-text {
				min-width: 80px;
			}

			@media print {
				.cell-container {
					min-width: 0;
				}
				.cell-container.no-text {
					min-width: 0;
				}

				/* Adjust checkmark to handle no minimum column width when printing */
				.check-icon.center {
					width: 75%
				}
				.check-icon.corner {
					position: absolute;
					right: 10%;
				}
	
			}
		</style>
		<div class$="[[_getCellClassName(entity)]]" aria-label$="[[_getEmptyLabel(entity)]]">
			<div class="points custom-points" hidden="[[!_hasCustomPoints(entity)]]">
				[[_localizeCustomPoints(entity)]]
			</div>
			<s-html class="criterion-description-richtext" html="[[_getDescription(entity)]]"></s-html>
			<div class$="[[_getCheckIconClass(entity, cellAssessment)]]" hidden="[[!_showSelectedIcon(entity, cellAssessment)]]">
				<d2l-icon class="tier1-check" icon="d2l-tier1:check"></d2l-icon>
				<d2l-icon class="tier2-check" icon="d2l-tier2:check"></d2l-icon>
			</div>
		</div>

	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criterion-cell',

	properties: {
		assessmentHref: String,
		cellAssessment: Object
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior
	],

	_hasCustomPoints: function(criterionCell) {
		return criterionCell && criterionCell.properties &&
			(!!criterionCell.properties.points || criterionCell.properties.points === 0);
	},

	_localizeCustomPoints: function(criterionCell) {
		if (this._hasCustomPoints(criterionCell)) {
			return this.localize('points', 'number', criterionCell.properties.points.toString());
		}
	},

	_getDescription: function(entity) {
		var description = entity && entity.getSubEntityByClass(this.HypermediaClasses.rubrics.description);
		var descHtml = description && description.properties && description.properties.html || '';
		if (descHtml) {
			// Remove the margin of any paragraph elements in the description
			var paragraphStyle = '<style> p { margin: 0; } </style>';
			return paragraphStyle + descHtml;
		}
		return descHtml;
	},

	_getCellClassName: function(entity) {
		if (this._getDescription(entity) === '') {
			return 'cell-container no-text';
		}
		return 'cell-container';
	},

	_getEmptyLabel: function(entity) {
		if (entity && this._getDescription(entity) === '') {
			return '';
		}
	},

	_showSelectedIcon: function(entity, cellAssessment) {
		return this.href && this.CriterionCellAssessmentHelper.isSelected(cellAssessment);
	},

	_getCheckIconClass: function(entity, cellAssessment) {
		var className = 'check-icon';
		if (!entity || !cellAssessment) {
			return className;
		}

		var descriptionText = this._getDescription(entity);
		var hasDescription = this.href && this.CriterionCellAssessmentHelper.isSelected(cellAssessment) && descriptionText !== '';
		var hasCustomPoints = this._hasCustomPoints(entity);

		if (hasDescription || hasCustomPoints) {
			className += ' corner';
		} else {
			className += ' center';
		}
		return className;
	}
});
