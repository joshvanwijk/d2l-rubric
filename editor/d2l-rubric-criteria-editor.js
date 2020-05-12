import '@polymer/polymer/polymer-legacy.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import 'd2l-table/d2l-table-shared-styles.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-button/d2l-button-subtle.js';
import 'd2l-dnd-sortable/d2l-dnd-sortable.js';
import '../d2l-rubric-entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../localize-behavior.js';
import '../telemetry-behavior.js';
import './d2l-rubric-criterion-editor.js';
import './d2l-rubric-editor-cell-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-criteria-editor">
	<template strip-whitespace="">
		<style include="d2l-rubric-editor-cell-styles">
			:host {
				display: block;
				flex: 1 1 auto;
			}

			* {
				box-sizing: border-box;
			}

			.fieldset {
				display: flex;
				position: relative;
				border: none;
				padding: 0;
				margin: 0;
			}

			.footer {
				display: flex;
			}

			.footer-buttons {
				text-align: center;
				padding: 0.45rem;
				flex: 1 1 auto;
				border: 1px solid var(--d2l-color-galena);
				border-bottom-left-radius: var(--d2l-table-border-radius);
				border-bottom-right-radius: var(--d2l-table-border-radius);
				background-color: var(--d2l-table-header-background-color);
			}

			.dnd-placeholder::after {
				margin: 0;
				margin-left: var(--d2l-rubric-editor-start-gutter-width);
				margin-right: var(--d2l-rubric-editor-end-gutter-width);
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				border-top: 1px solid var(--d2l-color-galena);
				background-color: white;
			}

			:dir(rtl) .dnd-placeholder::after {
				margin-right: var(--d2l-rubric-editor-start-gutter-width);
				margin-left: var(--d2l-rubric-editor-end-gutter-width);
			}

			.dnd-placeholder d2l-rubric-criterion-editor {
				visibility: hidden;
			}

			.dnd-mirror {
			}

			.dnd-touch-mirror::after {
				margin: 0 var(--d2l-rubric-editor-end-gutter-width);
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				background-color: white;
				background-image: url('./images/dnd-skeleton.svg');
				background-repeat: no-repeat;
				background-clip: padding-box;
				border: 1px solid var(--d2l-color-galena);
			}

			.dnd-drag-handle {
				cursor: move;
			}

			/* sao - weird css to work around a drag-drop render image bug */
			.reorder-offscreen {
				overflow: hidden;
				width: 0;
				height: 0;
			}

			.reorder-offscreen * {
				overflow: hidden;
				width: 0;
				height: 0;
			}

			.reorder-button {
				display: block;
				background: none;
				border: 1px solid transparent;
				padding: 0 0.2rem 0 0.2rem;
				min-height: 0;
				color: #565a5c;
				font-family: inherit;
				font-size: 0.7rem;
				line-height: 1rem;
				letter-spacing: 0.02rem;
				margin: 0;
				margin-left: auto;
				   margin-right: auto;
				border-radius: 0.3rem;
				box-sizing: border-box;
				cursor: pointer;
				user-select: none;
			}
			.reorder-button[disabled] {
				opacity: 0.5;
				cursor: default;
			}
			.reorder-button:focus, .reorder-button:hover {
				background-color: #f2f3f5;
				outline: none;
				border: 1px solid #d3d9e3;
			}
			d2l-rubric-criterion-editor {
				flex: 1 1 auto;
			}
			.force-hidden, [hidden] {
				display: none !important;
			}
		</style>
		<div>
			<d2l-dnd-sortable placeholder-class="dnd-placeholder" mirror-class="dnd-mirror" touch-mirror-class="dnd-touch-mirror" handle=".dnd-drag-handle" on-d2l-dnd-sorted="_handleDrag" disabled="[[!_canDrag]]">
				<template id="criteria-repeater" is="dom-repeat" items="[[_criteriaEntities]]" as="criterion" index-as="criterionIndex" rendered-item-count="{{criterionCount}}">
					<div class="fieldset">
						<span style="display:none">[[_getCriterionLegend(criterionIndex, criterionCount)]]</span>
						<d2l-rubric-criterion-editor
							animating="[[animating]]"
							href="[[_getSelfLink(criterion)]]"
							token="[[token]]"
							rubric-levels-href="[[_rubricLevelsHref]]"
							first-row="[[_isFirst(criterionIndex, criterionCount)]]"
							is-holistic="[[isHolistic]]"
							display-name-placeholder="[[_isFirst(criterionIndex, criterionCount)]]"
							rich-text-enabled="[[richTextEnabled]]"
							criterion-detail-width="[[criterionDetailWidth]]"
							outcomes-title="[[outcomesTitle]]"
							browse-outcomes-text="[[browseOutcomesText]]"
							align-outcomes-text="[[alignOutcomesText]]"
							outcomes-tool-integration-enabled="[[outcomesToolIntegrationEnabled]]"
							updating-levels="{{updatingLevels}}"
							rubric-level-loa-mapping="[[rubricLevelLoaMapping]]"
						>
							<div slot="gutter-left">
								<div class="reorder-offscreen" on-focusin="_onReorderGroupFocusIn" on-focusout="_onReorderGroupFocusOut" on-keydown="_onReorderGroupKeydown">
									<button id="up-button" class="reorder-button" title="[[_getPositionLocalize('moveCriterionUp', criterionIndex)]]" hidden$="[[!_canReorder]]" disabled$="[[_isFirst(criterionIndex, criterionCount)]]" data-index$="[[criterionIndex]]" on-click="_moveUp">
										<d2l-icon icon="d2l-tier1:arrow-toggle-up"></d2l-icon>
									</button>

									<button id="down-button" class="reorder-button" title="[[_getPositionLocalize('moveCriterionDown', criterionIndex)]]" hidden$="[[!_canReorder]]" disabled$="[[_isLast(criterionIndex, criterionCount)]]" data-index$="[[criterionIndex]]" on-click="_moveDown">
										<d2l-icon icon="d2l-tier1:arrow-toggle-down"></d2l-icon>
									</button>
								</div>

								<d2l-icon class="dnd-drag-handle" icon="d2l-tier1:dragger" hidden="[[_hideDragHandle(_canReorder, criterionIndex, criterionCount)]]"></d2l-icon>
							</div>
						</d2l-rubric-criterion-editor>
					</div>
				</template>
			</d2l-dnd-sortable>
		</div>
		<div class="footer" hidden$="[[isHolistic]]">
			<div class="gutter-left"></div>
			<div class="footer-buttons">
				<d2l-button-subtle on-click="_handleAddCriterion" icon="d2l-tier1:plus-default" text="[[localize('addCriterion')]]" disabled="[[!_canCreate]]" type="button">
				</d2l-button-subtle>
			</div>
			<div class="gutter-right"></div>
		</div>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric-criteria-editor',

	properties: {
		criterionDetailWidth: {
			type: Number
		},
		/**
		* Outcomes langterm set in config variables
		*/
		outcomesTitle: {
			type: String
		},
		browseOutcomesText: {
			type: String
		},
		alignOutcomesText: {
			type: String
		},
		_criteriaEntities: Array,
		animating: {
			type: Boolean,
			value: false
		},
		_canCreate: {
			type: Boolean,
			computed: '_canCreateCriterion(entity)',
		},
		_dragEnabled: {
			type: Boolean,
			value: true,
		},
		_canDrag: {
			type: Boolean,
			computed: '_canDragCriterion(_canReorder, _dragEnabled)',
		},
		_canReorder: {
			type: Boolean,
			computed: '_canReorderCriterion(entity)',
		},
		criterionCount: {
			type: Number,
		},
		richTextEnabled: Boolean,
		outcomesToolIntegrationEnabled: Boolean,
		isHolistic: {
			type: Boolean,
			value: false
		},
		updatingLevels: {
			type: Boolean
		},
		_rubricLevelsHref: String,
		rubricLevelLoaMapping: Object,
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],

	observers: [
		'_countCriteria(_criteriaEntities)'
	],
	_getPositionLocalize: function(localizeString, index) {
		return this.localize(localizeString, 'position', index + 1);
	},
	_onReorderGroupKeydown: function(e) {
		var upButton = e.currentTarget.querySelector('#up-button');
		var downButton = e.currentTarget.querySelector('#down-button');

		if (!upButton || !downButton) {
			return;
		}
		// up arrow = 38, down arrow = 40
		if (e.keyCode === 38 && !upButton.disabled) {
			e.preventDefault();
			upButton.click();
		}
		if (e.keyCode === 40 && !downButton.disabled) {
			e.preventDefault();
			downButton.click();
		}
	},
	_onReorderGroupFocusIn: function(e) {
		var currentElement = e.currentTarget;
		currentElement.classList.remove('reorder-offscreen');
		currentElement.nextElementSibling.classList.add('force-hidden');
	},
	_onReorderGroupFocusOut: function(e) {
		var currentElement = e.currentTarget;
		currentElement.classList.add('reorder-offscreen');
		currentElement.nextElementSibling.classList.remove('force-hidden');
	},
	_onEntityChanged: function(entity, oldEntity) {
		if (!entity) {
			return;
		}

		this._criteriaEntities = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.criterion);
		this._rubricLevelsHref = this._getRubricLevelsLink(entity);
		// EXPERIMENTAL animation/transition handling. If oldEntity is undefined, then
		// this represents the initial render so indicate to child components that we
		// are animating so that child components don't animate on initial render.
		// After render, reset the animation flag so that subsequently added criterion will animate.

		// NOTE: this is experimental and will not support use cases where an entity is inserted into
		// an existing list, in which case the oldEntity will be the entity that was previously
		// rendered by this component. Once we have that scenario we may have to store state with
		// each entity to indicate whether it was just newly created (should potentially animate) or
		// was simply updated.
		if (!oldEntity) {
			this.animating = true;
			afterNextRender(this, function() {
				this.animating = false;
			}.bind(this));
		}
	},

	_getRubricLevelsLink: function(entity) {
		var link = entity && entity.getLinkByRel('https://rubrics.api.brightspace.com/rels/levels');
		return link && link.href || '';
	},

	_getCriterionLegend: function(index, count) {
		return this.localize('criterionAriaLabel', 'index', index + 1, 'count', count);
	},
	// note: don't remove criterionCount otherwise, DD handle won't refresh when add and delete critierons
	_hideDragHandle: function(canReorder, index, criterionCount) {
		return !canReorder || (this._isFirst(index, criterionCount) && this._isLast(index, criterionCount));
	},
	// eslint-disable-next-line no-unused-vars
	_isFirst: function(index, criterionCount) {
		return index === 0;
	},
	// eslint-disable-next-line no-unused-vars
	_isLast: function(index, criterionCount) {
		return index === this._criteriaEntities.length - 1;
	},
	_canCreateCriterion: function(entity) {
		return entity && entity.hasActionByName('create');
	},
	_handleAddCriterion: function() {
		var action = this.entity.getActionByName('create');
		if (action) {
			const uuid = this.getUUID();
			this.perfMark(`criterionAddedStart-${uuid}`);

			this.performSirenAction(action).then(function() {
				this.dispatchEvent(new CustomEvent('d2l-rubric-criterion-added', {
					bubbles: true,
					composed: true,
				}));
				setTimeout(function() {
					announce(this.localize('criterionAdded'));
				}.bind(this), 2000);

				this.perfMark(`criterionAddedEnd-${uuid}`);
				this.logCriterionAddedAction(`criterionAddedStart-${uuid}`, `criterionAddedEnd-${uuid}`);
			}.bind(this)).catch(function(err) {
				this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
					detail: {
						message: err.message,
					},
					bubbles: true,
					composed: true,
				}));
			}.bind(this));
		}
	},

	_canReorderCriterion: function(entity) {
		return entity && entity.hasActionByName('reorder');
	},

	_canDragCriterion: function(canReorder, dragEnabled) {
		return canReorder && dragEnabled;
	},

	_handleDrag: function(e) {
		// Disable drag and drop whilst there is a drag operation in progress otherwise
		// we can have responses returning which are inconsistent with the current dragged state
		this._dragEnabled = false;

		// This hackery is necessary to keep the repeater's templates in the same order
		// as the actual DOM nodes following the drag and drop.
		const criteriaRepeater = this.$$('#criteria-repeater');
		criteriaRepeater.__instances.splice(e.detail.newIndex, 0, criteriaRepeater.__instances.splice(e.detail.oldIndex, 1)[0]);

		this._doReorder(e.detail.oldIndex, e.detail.newIndex).then(function() {
			this._dragEnabled = true;
		}.bind(this));
	},
	_moveUp: function(e) {
		var upButton = e.currentTarget;
		var downButton = upButton.nextElementSibling;

		var oldIndex = +upButton.attributes['data-index'].value;
		var newIndex = oldIndex - 1;

		var afterReorder = function() {
			upButton = this._getUpButton(newIndex);
			downButton = this._getDownButton(newIndex);
			if (!upButton.disabled) {
				upButton.focus();
			} else {
				downButton.focus();
			}
		}.bind(this);
		this._doReorder(oldIndex, newIndex).then(afterReorder);
	},
	_moveDown: function(e) {
		var downButton = e.currentTarget;
		var upButton = downButton.previousElementSibling;

		var oldIndex = +downButton.attributes['data-index'].value;
		var newIndex = oldIndex + 1;

		var afterReorder = function() {
			upButton = this._getUpButton(newIndex);
			downButton = this._getDownButton(newIndex);
			if (!downButton.disabled) {
				downButton.focus();
			} else {
				upButton.focus();
			}
		}.bind(this);
		this._doReorder(oldIndex, newIndex).then(afterReorder);
	},
	_doReorder: function(oldIndex, newIndex) {
		var newPosition = newIndex + 1;
		var criterionName = this._getCriterionlName(oldIndex);

		var action = this.entity.getActionByName('reorder');
		if (action) {
			// After reorder, the criteria API returns the entities in the correct SortOrder, but Polymer's dom-repeat
			// does not respect the order, and reverts the DOM back to before it was drag-dropped.
			// This manually updates '_criteriaEntities' by splicing the criterion from oldIndex and appending it at newIndex.
			this.splice('_criteriaEntities', newIndex, 0, this.splice('_criteriaEntities', oldIndex, 1)[0]);
			var fields = [
				{'name': 'oldIndex', 'value': oldIndex},
				{'name': 'newIndex', 'value': newIndex}
			];
			return this.performSirenAction(action, fields).then(function() {
				announce(this.localize('criterionMoved', 'name', criterionName, 'position', newPosition));
			}.bind(this)).catch(function(err) {
				this.dispatchEvent(new CustomEvent('d2l-rubric-editor-save-error', {
					detail: {
						message: err.message,
					},
					bubbles: true,
					composed: true,
				}));
			}.bind(this));
		}
		return Promise.resolve();
	},
	_getUpButton: function(index) {
		var upButtons = dom(this.root).querySelectorAll('#up-button');
		for (var i = 0; i < upButtons.length; i++) {
			if (parseInt(upButtons[i].attributes['data-index'].value) === index) {
				return upButtons[i];
			}
		}
	},
	_getDownButton: function(index) {
		var downButtons = dom(this.root).querySelectorAll('#down-button');
		for (var i = 0; i < downButtons.length; i++) {
			if (parseInt(downButtons[i].attributes['data-index'].value) === index) {
				return downButtons[i];
			}
		}
	},
	_getCriterionlName: function(index) {
		var elms = dom(this.root).querySelectorAll('d2l-rubric-criterion-editor');
		return elms.length && elms[index] ? elms[index].entity.properties.name : '';
	},
	_countCriteria: function(criteriaArray) {
		this.criterionCount = criteriaArray.length;
	}
});
