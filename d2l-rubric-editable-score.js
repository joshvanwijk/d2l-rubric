import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-ui/core/components/offscreen/offscreen.js';
import '@brightspace-ui/core/components/tooltip/tooltip.js';
import '@polymer/polymer/polymer-legacy.js';
import './localize-behavior.js';
import './assessment-behavior.js';
import './editor/d2l-rubric-error-handling-behavior.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import './rubric-siren-entity.js';
import '@polymer/iron-media-query/iron-media-query.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-editable-score">
	<template strip-whitespace="">
		<style>
			:host {
				display: inline;
				align-items: center;
			}
			#editable-container {
				display: block;
				outline: none;
				border: thin solid transparent;
				padding: 0.5rem;
				padding-left: 0.6rem;
			}
			:host([overridden-styling]) #editable-container {
				border-radius: 0.3rem;
				background-color: var(--d2l-color-celestine-plus-2);
			}
			:host(.assessable:not([editor-styling])) #editable-container:focus,
			:host(.assessable:not([editor-styling])) #editable-container:hover {
				border-radius: 0.3rem;
				border-color: var(--d2l-color-celestine);
			}
			:host([editor-styling]) #editable-container {
				padding-top: 0;
				padding-bottom: 0;
			}
			.total-score-container {
				display: flex;
				justify-content: center;
			}
			.criterion-score-container {
				display: flex;
				justify-content: space-between;
			}
			.editing-component {
				display: inline;
			}
			d2l-input-text {
				width: 75px;
			}
			.score-out-of.overridden {
				color: var(--d2l-color-celestine);
				display: inline-flex;
			}
			.star {
				display: none;
			}
			.score-out-of.overridden .star {
				display: inline-flex;
			}

			#out-of {
				margin-left: 3px;
				display: inline;
				line-height: 2.2rem;
			}
			:dir(rtl) #out-of {
				margin-left: 0px;
				margin-right: 3px;
			}

			.editing-component {
				margin-right: 0;
			}

			#clear-button {
				margin: auto 10px;
				float: left;
			}

			#clear-button:dir(rtl) {
				float: right;
			}

			#editable-container {
				float: right;
			}

			#editable-container:dir(rtl) {
				float: left;
			}

			[hidden] {
				display: none !important;
			}
		</style>
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[criterionHref]]" token="[[token]]" entity="{{entity}}"></rubric-siren-entity>
		<div id="editable-container">
			<div class$="[[_getContainerClassName(criterionHref)]]" hidden="[[!_isEditingScore]]">
				<template is="dom-if" if="[[_showClearCriterionOverrideButton(assessmentEntity, 'compact', compact, totalScore)]]">
					<d2l-button-icon
						id="clear-button"
						icon="tier1:close-small"
						class="clear-override-button"
						text="[[localize('clearOverride')]]"
						on-click="_clearCriterionOverride"
						hidden$="[[!scoreOverridden]]">
					</d2l-button-icon>
				</template>
				<div class="editing-component">
					<d2l-input-text id="text-area" value="[[_score]]" type="number" step="any" min="0" max="100000" novalidate on-change="_changeHandler" on-input="_inputHandler" on-blur="_blurHandler" on-keypress="_handleKey" aria-invalid="[[isAriaInvalid(scoreInvalid)]]" prevent-submit="">
					</d2l-input-text>
					<div id="out-of">
						[[_localizeOutOf(entity)]]
					</div>
				</div>
				<template is="dom-if" if="[[scoreInvalid]]">
					<d2l-tooltip announced id="score-bubble" for="text-area" class="is-error" position="bottom">[[scoreInvalidError]]</d2l-tooltip>
				</template>
			</div>
			<template is="dom-if" if="[[!_isEditingScore]]">
				<div
					aria-labelledby="score-label"
					class$="[[_getOutOfClassName(scoreOverridden, readOnly)]]"
					tabindex$="[[_getOutOfTabIndex(readOnly)]]"
				>
					<d2l-offscreen id="score-label">[[_getCriterionContext(criterionName)]]</d2l-offscreen>
					[[_localizeOutOf(entity, _score)]]
					<div class="star" id="score-overridden-star" aria-hidden="true">*</div>
					<template is="dom-if" if="[[scoreOverridden]]">
						<d2l-offscreen>[[_localizeStarLabel(totalScore)]]</d2l-offscreen>
					</template>
				</div>
			</template>
		</div>
		<template is="dom-if" if="[[_showClearCriterionOverrideButton(assessmentEntity, 'full', compact, totalScore)]]">
			<d2l-button-subtle
				id="clear-button"
				class="clear-override-button"
				icon="d2l-tier1:close-small"
				text="[[localize('clearOverride')]]"
				description="[[localize('clearOverrideFor', 'criterionName', criterionName)]]"
				on-click="_clearCriterionOverride"
				hidden$="[[!scoreOverridden]]">
			</d2l-button-subtle>
		</template>
		<d2l-tooltip aria-hidden="true" align="start" hidden="[[_handleTooltip(scoreOverridden, _isEditingScore)]]" position="top">[[_localizeStarLabel(totalScore)]]</d2l-tooltip>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-editable-score',

	properties: {
		compact: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		criterionHref: String,

		/* Entity could be a criterionEntity or a rubricEntity */
		entity: Object,
		assessmentHref: {
			type: String,
			value: null
		},
		assessmentEntity: Object,
		token: String,

		/* For desktop criteria, this will be the criterion number.
		   For mobile and total score, this will be 1 for true, -1 for false */
		editingScore: {
			type: Number,
			value: -1,
			notify: true,
			observer: '_editingScoreChanged'
		},
		_isEditingScore: {
			type: Boolean,
			value: false,
			computed: '_computeIsEditingScore(criterionNum, editingScore, scoreInvalid)'
		},
		_score: {
			type: Number
		},
		_scoreModified: {
			type: Boolean,
			value: false
		},
		_pendingScoreSaves: {
			type: Number,
			value: 0
		},
		scoreOverridden: {
			type: Boolean,
			value: false
		},
		scoreInvalid: {
			type: Boolean,
			value: false,
			notify: true,
			reflectToAttribute: true
		},
		scoreInvalidError: {
			type: String,
			value: null
		},
		overriddenStyling: {
			type: Boolean,
			value: false,
			reflectToAttribute: true,
			notify: true
		},
		editorStyling: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		totalScore: {
			type: String,
			value: null
		},
		criterionNum: {
			type: Number,
			value: 1
		},
		criterionName: {
			type: String,
			value: null,
			computed: '_getCriterionName(entity)'
		},
		readOnly: {
			type: Boolean,
			value: true
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior,
		D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior
	],

	observers: [
		'_onAssessmentResultChanged(entity, assessmentEntity, criterionHref)',
		'_totalScoreChanged(totalScore, entity)',
		'_editingState(entity, _isEditingScore)',
		'_updateAssessable(readOnly, assessmentHref)'
	],
	ready: function() {
		['click', 'keydown', 'focus'].forEach((eventType) => {
			this.addEventListener(eventType, (e) => {
				if (eventType === 'keydown' && e.keyCode !== 13) {
					return;
				}

				if (!this.readOnly && this.editingScore === -1) {
					this.editingScore = this.criterionNum;
				}
			});
		});
	},

	_updateAssessable: function(readOnly, assessmentHref, editingScore) {
		const isAssessable = !readOnly && assessmentHref;
		const isEditing = editingScore !== -1;

		this.classList.toggle('assessable', isAssessable);
		this.classList.toggle('editing', isEditing);

		const editableContainer = this.shadowRoot.querySelector('#editable-container');

		isAssessable
			? editableContainer.setAttribute('tabindex', '0')
			: editableContainer.removeAttribute('tabindex');
	},

	_onAssessmentResultChanged: function(entity, assessmentEntity, criterionHref) {
		if (!entity || !assessmentEntity) {
			return;
		}
		if (!this.scoreInvalid) {
			this._updateScore(entity, assessmentEntity, this.totalScore, !!criterionHref);
		}

		if (this.criterionHref) {
			this.scoreOverridden = assessmentEntity.hasClass('overridden');
			if (!this._isStaticView() && !this._isEditingScore) {
				this.overriddenStyling = this.scoreOverridden;
			}
			return;
		}
		this.scoreOverridden = assessmentEntity.hasAction('clear-total-score-override');
		if (!this._isStaticView() && !this._isEditingScore) {
			this.overriddenStyling = this.scoreOverridden;
		}
	},

	focus: function() {
		var elem = this.$['text-area'];
		elem.focus();
		var inputElem = elem.shadowRoot && elem.shadowRoot.querySelector('input');
		if (inputElem && !this.compact) {
			inputElem.select();
		}
	},

	_editingScoreChanged: function(newValue) {
		if (!this.scoreInvalid && this.criterionNum === newValue) {
			afterNextRender(this, function() {
				this.focus();
			}.bind(this));
		}
	},

	_handleKey: function(e) {
		if (e.keyCode === 13) { // enter key
			e.target.blur();
			e.stopPropagation();

			this._blurHandler(e);
			this.dispatchEvent(new CustomEvent('d2l-rubric-editable-score-commit', {
				bubbles: true,
				composed: true
			}));
		}
	},

	// on firefox, when changing the score with the arrow keys/buttons, d2l-input-text only fires change event and not input event
	_changeHandler: function() {
		this._scoreModified = true;
	},

	_inputHandler: function() {
		this._scoreModified = true;
	},

	_blurHandler: function(event) {
		if (event.relatedTarget && event.relatedTarget.id === 'clear-button') {
			return;
		}
		var innerInput = event.target.shadowRoot && event.target.shadowRoot.querySelector('input');
		if (!innerInput || !innerInput.checkValidity()) {
			return;
		}
		this.editingScore = -1;

		if (this._scoreModified || this.scoreInvalid) {
			this._scoreModified = false;
			this.toggleBubble('scoreInvalid', false);
			var action;
			var newScore = event.target.value;
			if (newScore === '') {
				action = this._clearOverride();
			} else {
				var oldScore = this.getScore(this.entity, this.assessmentEntity, this.totalScore);
				if (parseFloat(newScore) === oldScore) {
					// score didn't change so don't save it
					return;
				}
				action = this._saveScore(newScore);
			}
			this._pendingScoreSaves++;
			this._score = newScore;
			action.catch(function(err) {
				this.handleValidationError('score-bubble', 'scoreInvalid', 'pointsSaveFailed', err);
			}.bind(this)).finally(function() {
				this._pendingScoreSaves--;
				this._updateScore(this.entity, this.assessmentEntity, this.totalScore, !!this.criterionHref);
			}.bind(this));
		}
	},

	_updateScore: function(entity, assessmentEntity, totalScore, isCriterion) {
		if (!this._scoreModified && !this._pendingScoreSaves) {
			this.toggleBubble('scoreInvalid', false);
			this._score = this.getScore(entity, assessmentEntity, totalScore, isCriterion);
		}
	},

	_saveScore: function(score) {
		if (this.criterionHref) {
			return this.CriterionAssessmentHelper.overrideScoreAsync(() => this.assessmentEntity, score);
		} else {
			return this.AssessmentHelper.overrideTotalScoreAsync(() => this.assessmentEntity, score);
		}
	},

	_clearOverride: function() {
		if (this.criterionHref) {
			return this.clearCriterionOverride(this.criterionHref);
		} else {
			return this.clearTotalScoreOverride();
		}
	},

	_clearCriterionOverride: function(event) {
		event.stopPropagation();

		this.toggleBubble('scoreInvalid', false);
		this.editingScore = -1;
		this._pendingScoreSaves++;
		this.CriterionAssessmentHelper.clearScoreOverride(() => this.assessmentEntity)
			.finally(() => {
				this._pendingScoreSaves--;
			})
			.then(() => {
				this._scoreModified = false;
				this._updateScore(this.entity, this.assessmentEntity, this.totalScore, !!this.criterionHref);
			})
			.catch((err) => {
				this.handleValidationError('score-bubble', 'scoreInvalid', 'pointsSaveFailed', err);
			});
	},

	getScore: function(entity, assessmentEntity, totalScore, isCriterion) {
		if (!entity || !assessmentEntity) {
			return;
		}
		if (totalScore) {
			return totalScore;
		}

		if (isCriterion) {
			return this.CriterionAssessmentHelper.getScore(assessmentEntity);
		} else {
			return this.AssessmentHelper.getTotalScore(assessmentEntity);
		}
	},

	_localizeOutOf: function(entity, score) {
		if (!entity || !entity.properties || !entity.properties.outOf) {
			return null;
		}

		if (score || score === 0) {
			return this.localize('scoreOutOf', 'score', score.toString(), 'outOf', entity.properties.outOf.toString());
		}
		return this.localize('outOf', 'outOf', entity.properties.outOf.toString());
	},

	_getOutOfClassName: function(scoreOverridden, readOnly) {
		var className = 'score-out-of';
		if (scoreOverridden && !readOnly) {
			className += ' overridden';
		}
		return className;
	},

	_getOutOfTabIndex: function(readOnly) {
		return readOnly ? undefined : 0;
	},

	_getContainerClassName: function(criterionHref) {
		if (!criterionHref) {
			return 'total-score-container';
		}
		return 'criterion-score-container';
	},

	_computeIsEditingScore: function(criterionNum, editingScore, scoreInvalid) {
		return criterionNum === editingScore || scoreInvalid;
	},

	_localizeStarLabel: function(totalScore) {
		if (totalScore) {
			return this.localize('overriddenTotalScoreTip');
		} else {
			return this.localize('overriddenScoreTip');
		}
	},

	_totalScoreChanged: function(score, entity) {
		var outOf;

		if (entity && entity.properties) {
			outOf = entity.properties.outOf;
		}
		if (score != null) {
			const detail = {
				score: score,
			};

			if (outOf != null) {
				detail.outOf = outOf.toString();
			}

			this.dispatchEvent(new CustomEvent('d2l-rubric-total-score-changed', {
				detail: detail,
				bubbles: true,
				composed: true,
			}));
		}
	},

	_editingState: function(entity, isEditingScore) {
		if (!entity) {
			return;
		}
		if (isEditingScore) {
			this.editorStyling = true;
			this.overriddenStyling = false;
		} else {
			this.editorStyling = false;
			if (this.scoreOverridden && !this._isStaticView()) {
				this.overriddenStyling = true;
			}
		}
	},

	_handleTooltip: function(scoreOverridden, isEditingScore) {
		return !scoreOverridden || isEditingScore;
	},

	_isStaticView: function() {
		return this.readOnly || !this.assessmentHref;
	},

	_showClearCriterionOverrideButton: function(entity, targetView, compact, totalScore) {
		if (totalScore) {
			return false;
		}

		if (!this.CriterionAssessmentHelper.canUpdateAssessment(entity)) {
			return false;
		}

		const forCompact = targetView === 'compact';
		return forCompact === compact;
	},

	_getCriterionContext: function(criterion) {
		if (criterion && criterion.length > 0) {
			if (this._isStaticView()) {
				return this.localize('scoreOf', 'criterion', criterion);
			} else {
				return this.localize('scoreOfEditable', 'criterion', criterion);
			}
		}
		return '';
	},

	_getCriterionName: function(entity) {
		if (entity && entity.properties) {
			return entity.properties.name || '';
		}
		return '';
	}
});
