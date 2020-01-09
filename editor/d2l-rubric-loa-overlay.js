import { PolymerElement, html } from '@polymer/polymer';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-table/d2l-table-shared-styles.js';
import './d2l-rubric-editor-cell-styles.js';
import '../localize-behavior.js';
import '../rubric-siren-entity.js';

const MIN_HEADER_WIDTH = 8;
const MIN_HEADER_WIDTH_UNIT = 'rem';
const SLIDER_CENTER_OFFSET = 16;

class RubricLoaOverlay extends mixinBehaviors([
	window.D2L.Hypermedia.HMConstantsBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Siren.SirenActionBehavior
], PolymerElement) {
	static get properties() {
		return {
			_activeSlider: Object,
			_dragCaptureOverlay: Object,
			_dragCursorOffset: Number,
			_draggingLoaLevel: Object,
			_draggingSlider: Object,
			hasOutOf: {
				type: Boolean,
				value: false,
				observer: '_onOutOfChanged'
			},
			_headingsWidth: {
				type: Number,
				value: 1
			},
			_levels: Array,
			_loaLevels: Array,
			_loaMappingHref: String,
			_loaLevelEntity: {
				type: Object,
				value: null,
				observer: '_onLoaMappingEntityChanged'
			},
			outcomeAlignments: {
				type: Object,
				value: {},
				observer: '_onAlignmentsChanged'
			},
			_resizeElement: Object,
			_reversed: {
				type: Boolean,
				value: false,
				observer: '_onReversedChanged'
			},
			_rubricLevelOverrides: {
				type: Object,
				value: {},
				observer: '_onOverridesChanged'
			},
			_sliderLock: {
				type: Boolean,
				value: false
			},
			_sortedLevels: Array
		};
	}

	static get template() {
		return html`
            <style include="d2l-rubric-editor-cell-styles">
                #row-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                * {
                    box-sizing: border-box;
                }

                .cell {
                    background-color: #F1F5FB;
                    font-size: 14px;
                    height: 30px;
                }

                .loa-heading {
                    border-right-width: 0px;
                    font-weight: bold;
                    text-align: center;
                }

                .col-first {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    padding: var(--d2l-table-cell_-_padding);
                    padding-bottom: 0px;
                    padding-top: 0px;
                }
                .col-first[is-holistic], .col-last[is-holistic] {
                    padding-top: 3px;
                    padding-bottom: 3px;
                    width: 2.6rem;
                    border: none;
                    background-color: var(--d2l-table-body-background-color);
                }
                .col-first[is-holistic] {
                    padding-left: 0;
                }
                :dir(rtl) .col-first[is-holistic] {
                    padding-left: 0.5rem;
                    padding-right: 0;
                }
                .col-last[is-holistic] {
                    padding-right: 0;
                }
                :dir(rtl) .col-last[is-holistic] {
                    padding-right: 0.5rem;
                    padding-left: 0;
                }
                .col-last {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                }

                #row-data {
                    display: flex;
                    flex: 1 1 auto;
                    position: relative;
                }

                .slider {
                    border: 0px dashed;
                    border-radius: 15px;
                    height: 30px;
                    position: absolute;
                    width: 30px;
                }

                .slider.active {
                    background-color: transparent !important;
                    border-width: 2px;
                }

                .slider:hover {
                    cursor: pointer;
				}
				
				.fixed-slider:focus {
					outline: none;
					z-index: 10 !important;
				}

				.fixed-slider:focus + .slider-focus {
					background: white;
					border: 2px solid black;
					border-radius: 19px;
					height: 38px;
					left: -4px;
					position: absolute;
					top: -4px;
					width: 38px;
					z-index: 9;
				}

				.slider-focus .arrow {
					display: none;
					position: relative;
				}

				.fixed-slider:focus + .slider-focus .arrow {
					display: inline;
				}

				.slider-focus .arrow-right {
					left: 24px;
					top: 2px;
				}

				.slider-focus .arrow-left {
					left: -7px;
					top: 2px;
				}

                #motion-slider {
                    z-index: 20;
                }

                #motion-slider.hidden {
                    display: none;
                }

                #drag-capture-overlay {
                    bottom: 0;
                    left: 0;
                    position: fixed;
                    right: 0;
                    top: 0;
                    z-index: 100;
                }

                #drag-capture-overlay:hover,
                #motion-slider:hover {
                    cursor: grab;
                }
            </style>

            <rubric-siren-entity href="[[_loaMappingHref]]" token="[[token]]" entity="{{_loaLevelEntity}}"></rubric-siren-entity>
            <d2l-resize-aware id="row-container">
                <template is="dom-if" if="[[_hasLoaLevels(_loaMappingHref)]]">
                    <div class="gutter-left"></div>
                    <div class="cell col-first" is-holistic$="[[isHolistic]]">
                        [[_getLevelsLangTerm()]]
                    </div>
                    <div id="row-data">
                        <div id="motion-slider" class="slider hidden"></div>
                        <template is="dom-repeat" items="[[_loaLevels]]" as="loaLevel" index-as="loaIndex">
                            <div class="cell loa-heading" style$="[[_getHeaderStyle(loaLevel, _loaLevels, _sortedLevels, _rubricLevelOverrides, _reversed)]]" is-holistic$="[[isHolistic]]">
                                [[loaLevel.properties.name]]
							</div>
                            <div
                                class="slider fixed-slider"
								data-loa-level$="[[_getSelfLink(loaLevel)]]"
								on-keyUp="_onSliderKeyUp"
                                on-mouseDown="_onMouseDown"
								style$="[[_getSliderStyle(loaLevel, _loaLevels, _sortedLevels, _headingsWidth, _rubricLevelOverrides, _reversed)]]"
								tabindex="0"
							></div>
							<div class="slider-focus" style$="[[_getSliderFocusStyle(loaLevel, _loaLevels, _sortedLevels, _headingsWidth, _rubricLevelOverrides, _reversed)]]">
								<svg class="arrow arrow-left" viewBox="0 0 6 9" xmlns="http://www.w3.org/2000/svg" width="6" style$="[[_getSliderFocusArrowStyle(loaLevel)]]">
									<polygon points="6,0 0,4.5 6,9" />
								</svg>
								<svg class="arrow arrow-right" viewBox="0 0 6 9" xmlns="http://www.w3.org/2000/svg" width="6" style$="[[_getSliderFocusArrowStyle(loaLevel)]]">
									<polygon points="0,0 6,4.5 0,9" />
								</svg>
							</div>
                        </template>
                    </div>
                    <div class="cell col-last" text-only$="[[!hasOutOf]]" is-holistic$="[[isHolistic]]"></div>
                    <div class="gutter-right"></div>
                </template>
            </d2l-resize-aware>
        `;
	}

	attached() {
		afterNextRender(this, () => {
			this._resizeElement = this.$$('#row-container');
			this._resizeElement.addEventListener('d2l-resize-aware-resized', this.checkSize.bind(this));
			this.checkSize();
		});

		document.addEventListener('mousemove', this._onMouseMove.bind(this));
		document.addEventListener('mouseup', this._onMouseUp.bind(this));
	}

	detached() {
		if (this._resizeElement) {
			this._resizeElement.removeEventListener('d2l-resize-aware-resized', this.checkSize.bind(this));
		}

		document.removeEventListener('mousemove', this._onMouseMove.bind(this));
		document.removeEventListener('mouseup', this._onMouseUp.bind(this));
	}

	checkSize() {
		this.async(() => {
			const section = this.$$('#row-data');

			if (section) {
				this._headingsWidth = section.offsetWidth;
			}
		}, 1);
	}

	_onOutOfChanged() {
		this.checkSize();
	}

	_onEntityChanged(entity) {
		if (!entity) {
			return;
		}

		const levelEntities = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level).filter(level => level && !level.href);
		const mappingHref = this._getLoaMappingLink(entity);

		if (levelEntities.length > 0) {
			this._levels = levelEntities;
			this._sortedLevels = this._sortRubricLevels(this._levels);
			this._rubricLevelOverrides = {};
		} else {
			this._reloadHref(this.href);
		}

		if (mappingHref) {
			this._reloadHref(mappingHref);
		} else {
			this._loaLevelEntity = null;
		}
		this._loaMappingHref = mappingHref;

		this.checkSize();
	}

	_reloadHref(href) {
		return D2L.Siren.EntityStore.fetch(href, this.token, true);
	}

	_onLoaMappingEntityChanged(entity) {
		if (!entity) {
			return;
		}

		const loaLevelEntities = entity.getSubEntitiesByClass('level-of-achievement');

		const lastRubric = this._resolveRubricLevel(this._sortedLevels, this._getRubricLevelLink(loaLevelEntities[loaLevelEntities.length - 1]));
		const lastRubricIndex = this._getRubricLevelIndex(this._sortedLevels, lastRubric, false);

		if (lastRubricIndex === 0) {
			loaLevelEntities.reverse();
			this._reversed = true;
		} else {
			this._reversed = false;
		}

		this._loaLevels = loaLevelEntities;
		this._rubricLevelOverrides = {};
		this.checkSize();
	}

	_getHeaderStyle(loaLevel, loaLevels, sortedRubricLevels, _rubricLevelOverrides, reversed) {
		const colSpan = this._getLoaLevelSpan(loaLevel, loaLevels, sortedRubricLevels, _rubricLevelOverrides, reversed);

		if (colSpan === 0) {
			return 'display: none;';
		}

		return [
			`flex-grow: ${colSpan}`,
			'flex-basis: 0px',
			`min-width: ${MIN_HEADER_WIDTH * colSpan}${MIN_HEADER_WIDTH_UNIT}`
		].join(';');
	}

	_getSliderStyle(loaLevel, loaLevels, sortedRubricLevels, totalWidth, rubricLevelOverrides, reversed) {
		const color = loaLevel.properties.color;
		const effectiveRubricLevel = this._getVisualRubricLevel(loaLevel, sortedRubricLevels, rubricLevelOverrides);

		let offset = this._getRubricSliderPosition(effectiveRubricLevel, sortedRubricLevels, totalWidth, reversed);
		let zIndex = 2;

		if (this._isSliderStacked(loaLevel, loaLevels, sortedRubricLevels, rubricLevelOverrides)) {
			offset += 12;
			zIndex = 1;
		}

		return [
			`background-color: ${color}`,
			`border-color: ${color}`,
			`left: ${offset}px`,
			`z-index: ${zIndex}`
		].join(';');
	}

	_getSliderFocusStyle(loaLevel, loaLevels, sortedRubricLevels, totalWidth, rubricLevelOverrides, reversed) {
		const color = loaLevel.properties.color;
		const effectiveRubricLevel = this._getVisualRubricLevel(loaLevel, sortedRubricLevels, rubricLevelOverrides);

		let offset = this._getRubricSliderPosition(effectiveRubricLevel, sortedRubricLevels, totalWidth, reversed);
		offset -= 4; // Accounts for size difference between slider and focus border

		if (this._isSliderStacked(loaLevel, loaLevels, sortedRubricLevels, rubricLevelOverrides)) {
			offset += 12;
		}

		return [
			`border-color: ${color}`,
			`left: ${offset}px`
		].join(';');
	}

	_getSliderFocusArrowStyle(loaLevel) {
		const color = loaLevel.properties.color;
		return [
			`fill: ${color}`
		].join(';');
	}

	_getRubricSliderPosition(rubricLevel, sortedRubricLevels, totalWidth, reversed) {
		const nSections = sortedRubricLevels.length;
		const sectionWidth = totalWidth / nSections;

		const dist = this._getRubricLevelDist(sortedRubricLevels, sortedRubricLevels[0], rubricLevel, reversed) + (reversed ? 0 : 1);
		return dist * sectionWidth - SLIDER_CENTER_OFFSET;
	}

	_isSliderStacked(loaLevel, loaLevels, sortedRubricLevels, rubricLevelOverrides) {
		const currentRubricLevel = this._getVisualRubricLevel(loaLevel, sortedRubricLevels, rubricLevelOverrides);

		const prevLoa = this._getPrevLoaLevel(loaLevels, loaLevel);
		const prevRubric = this._getVisualRubricLevel(prevLoa, sortedRubricLevels, rubricLevelOverrides);

		return prevLoa !== null && this._getSelfLink(currentRubricLevel) === this._getSelfLink(prevRubric);
	}

	_getLoaLevelSpan(loaLevel, loaLevels, sortedRubricLevels, rubricLevelOverrides, reversed) {
		const adjLoa = this._reversed ? this._getNextLoaLevel(loaLevels, loaLevel) : this._getPrevLoaLevel(loaLevels, loaLevel);

		const currentRubric = this._getVisualRubricLevel(loaLevel, sortedRubricLevels, rubricLevelOverrides);
		const adjRubric = this._getVisualRubricLevel(adjLoa, sortedRubricLevels, rubricLevelOverrides);

		const dist = this._getRubricLevelDist(sortedRubricLevels, adjRubric, currentRubric, reversed) * (reversed ? -1 : 1);
		return dist;
	}

	_getVisualLoaLevelMapping(loaLevels, rubricLevels, rubricLevelOverrides, reversed) {
		if (!loaLevels) {
			return {};
		}

		const levelMap = {};

		levelMap.reversed = reversed;

		const startLoaLevel = this._getFixedLoaLevel(loaLevels, reversed);
		const startRubricLevel = this._resolveRubricLevel(rubricLevels, this._getRubricLevelLink(startLoaLevel));

		let currentLoa = null;
		let currentRubric = startRubricLevel;
		let nextLoa = startLoaLevel;
		let nextRubric = null;
		let newLevel = false;

		while (currentRubric !== null) {
			while (currentLoa === null || this._getSelfLink(currentRubric) === this._getSelfLink(nextRubric)) {
				newLevel = true;
				currentLoa = nextLoa;
				nextLoa = reversed ? this._getNextLoaLevel(loaLevels, currentLoa) : this._getPrevLoaLevel(loaLevels, currentLoa);

				const nextLoaLink = this._getSelfLink(nextLoa);
				const nextRubricLink = rubricLevelOverrides[nextLoaLink] !== undefined
					? rubricLevelOverrides[nextLoaLink]
					: this._getRubricLevelLink(nextLoa);

				nextRubric = this._resolveRubricLevel(rubricLevels, nextRubricLink);
			}

			levelMap[this._getSelfLink(currentRubric)] = {
				loaLevel: this._getSelfLink(currentLoa),
				isBound: newLevel
			};
			currentRubric = reversed ? this._getNextRubricLevel(rubricLevels, currentRubric) : this._getPreviousRubicLevel(rubricLevels, currentRubric);
			newLevel = false;
		}

		return levelMap;
	}

	_getVisualRubricLevel(loaLevel, rubricLevels, rubricLevelOverrides) {
		const currentId = this._getSelfLink(loaLevel);
		return rubricLevelOverrides[currentId] !== undefined
			? this._resolveRubricLevel(rubricLevels, rubricLevelOverrides[currentId])
			: this._resolveRubricLevel(rubricLevels, this._getRubricLevelLink(loaLevel));
	}

	_getLoaMappingLink(entity) {
		// TODO: Use constant
		var link = entity && entity.getLinkByRel('loa-levels');
		return link && link.href || '';
	}

	_getRubricLevelLink(entity) {
		// TODO: Use constant
		var link = entity && entity.getLinkByRel('https://rubrics.api.brightspace.com/rels/level');
		return link && link.href || '';
	}

	_getPrevLink(entity) {
		var link = entity && entity.getLinkByRel('prev');
		return link && link.href || '';
	}

	_getNextLink(entity) {
		var link = entity && entity.getLinkByRel('next');
		return link && link.href || '';
	}

	_getSelfLink(entity) {
		var link = entity && entity.getLinkByRel('self');
		return link && link.href || '';
	}

	_hasLoaLevels(href) {
		return href !== '';
	}

	_onMouseDown(e) {
		if (e.buttons !== 1 || this._sliderLock) {
			return;
		}

		e.preventDefault();

		this._activeSlider = e.target;
		this._activeSlider.blur(); // Get rid of keyboard-nav border in case slider is focused

		this._activeSlider.classList.add('active');
		this._draggingLoaLevel = this._resolveLoaLevel(this._loaLevels, this._activeSlider.getAttribute('data-loa-level'));

		this._draggingSlider = this.$$('#motion-slider');
		this._dragCursorOffset = e.offsetX;
		this._draggingSlider.style.backgroundColor = this._activeSlider.style.backgroundColor;
		this._draggingSlider.style.left = this._activeSlider.style.left;
		this._draggingSlider.classList.remove('hidden');

		this._dragCaptureOverlay = document.createElement('div');
		this._dragCaptureOverlay.setAttribute('id', 'drag-capture-overlay');

		this.root.appendChild(this._dragCaptureOverlay);
	}

	_onMouseMove(e) {
		if (this._draggingSlider) {
			const position = this._getSliderPosition(e.pageX);
			this._draggingSlider.style.left = `${position}px`;

			const rubricLevel = this._getSliderRubricLevel(position);
			this._updateRubricLevel(this._draggingLoaLevel, rubricLevel);
		}
	}

	_onMouseUp(e) {
		if (this._draggingSlider) {
			// Try commiting at dropped rubric level
			const position = this._getSliderPosition(e.pageX);
			const rubricLevel = this._getSliderRubricLevel(position);
			this._updateRubricLevel(this._draggingLoaLevel, rubricLevel, true);

			// Get rid of slider animation
			this._activeSlider.classList.remove('active');
			this._activeSlider = null;

			this._draggingSlider.classList.add('hidden');
			this._draggingSlider = null;

			this._dragCaptureOverlay.parentNode.removeChild(this._dragCaptureOverlay);
			this._dragCaptureOverlay = null;
		}
	}

	_onSliderKeyUp(e) {
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			e.preventDefault();
			e.stopPropagation();

			const loaLevel = this._resolveLoaLevel(this._loaLevels, e.target.getAttribute('data-loa-level'));
			const currentRubric = this._getVisualRubricLevel(loaLevel, this._levels, this._rubricLevelOverrides);

			if (e.key === 'ArrowLeft') {
				const newRubricLevel = this._getPreviousSliderLevel(this._sortedLevels, currentRubric, this._reversed);
				if (newRubricLevel !== false) {
					this._updateRubricLevel(loaLevel, newRubricLevel, true);
				}
			} else {
				const newRubricLevel = this._getNextSliderLevel(this._sortedLevels, currentRubric, this._reversed);
				if (newRubricLevel !== false) {
					this._updateRubricLevel(loaLevel, newRubricLevel, true);
				}
			}
		}
	}

	_getSliderPosition(mouseX) {
		const minBound = -SLIDER_CENTER_OFFSET;
		const maxBound = this._draggingSlider.parentNode.offsetWidth - SLIDER_CENTER_OFFSET;

		const parentOffset = this._draggingSlider.parentNode.getBoundingClientRect().left;
		const position = mouseX - parentOffset - this._dragCursorOffset;

		return Math.min(Math.max(minBound, position), maxBound);
	}

	_getSliderRubricLevel(sliderPosition) {
		const index = Math.round((sliderPosition + SLIDER_CENTER_OFFSET) / this._draggingSlider.parentNode.offsetWidth * this._levels.length) - (this._reversed ? 0 : 1);
		return (index < 0 || index >= this._sortedLevels.length) ? null : this._sortedLevels[index];
	}

	_resolveLoaLevel(loaLevels, loaLevelHref) {
		if (!loaLevels || !loaLevels.length) {
			return null;
		}

		for (let i = 0; i < loaLevels.length; i++) {
			const loaLevel = loaLevels[i];

			if (this._getSelfLink(loaLevel) === loaLevelHref) {
				return loaLevel;
			}
		}

		return null;
	}

	_resolveRubricLevel(rubricLevels, rubricLevelHref) {
		if (!rubricLevels || !rubricLevels.length) {
			return null;
		}

		for (let i = 0; i < rubricLevels.length; i++) {
			const rubricLevel = rubricLevels[i];

			if (this._getSelfLink(rubricLevel) === rubricLevelHref) {
				return rubricLevel;
			}
		}

		return null;
	}

	_getPreviousRubicLevel(rubricLevels, rubricLevelEntity) {
		const previousHref = this._getPrevLink(rubricLevelEntity);
		return this._resolveRubricLevel(rubricLevels, previousHref);
	}

	_getNextRubricLevel(rubricLevels, rubricLevelEntity) {
		const nextHref = this._getNextLink(rubricLevelEntity);
		return this._resolveRubricLevel(rubricLevels, nextHref);
	}

	_updateRubricLevel(loaLevelEntity, rubricLevelEntity, commit) {
		commit = commit || false;

		const currentLevel = this._getRubricLevelLink(loaLevelEntity);
		const newLevel = this._getSelfLink(rubricLevelEntity);
		const loaLink = this._getSelfLink(loaLevelEntity);

		if (currentLevel !== newLevel) {
			// Check if move is valid
			const nextLoa = this._getNextLoaLevel(this._loaLevels, loaLevelEntity);
			const prevLoa = this._getPrevLoaLevel(this._loaLevels, loaLevelEntity);

			const nextRubric = this._getVisualRubricLevel(nextLoa, this._sortedLevels, this._rubricLevelOverrides);
			const prevRubric = this._getVisualRubricLevel(prevLoa, this._sortedLevels, this._rubricLevelOverrides);

			let moveInvalid = (this._getSelfLink(loaLevelEntity) === this._getSelfLink(this._getFixedLoaLevel(this._loaLevels, this._reversed)));

			// Disallow skipping over levels if dragging
			if (this._draggingSlider) {
				if (
					(nextLoa && this._getRubricLevelDist(this._sortedLevels, rubricLevelEntity, nextRubric, this._reversed) < 0)
					|| (prevLoa && this._getRubricLevelDist(this._sortedLevels, rubricLevelEntity, prevRubric, this._reversed) > 0)
				) {
					moveInvalid = true;
				}
			}

			if (!moveInvalid && this._rubricLevelOverrides[loaLink] !== newLevel) {
				// Update front-end JS overrides
				const overrides = Object.assign({}, this._rubricLevelOverrides);
				overrides[loaLink] = newLevel;
				this._rubricLevelOverrides = overrides;
			}

			if (commit && this._rubricLevelOverrides[loaLink] !== undefined) {
				// Send change to server
				const action = loaLevelEntity.getActionByName('updateMapping'); // TODO: Change to constant
				if (action) {
					this._sliderLock = true;

					const fields = action.fields;
					const upperBoundField = fields.find(f => f.name === 'newUpperBound');
					if (upperBoundField) {
						const resolvedEntity = this._resolveRubricLevel(this._sortedLevels, this._rubricLevelOverrides[loaLink]);
						upperBoundField.value = resolvedEntity ? resolvedEntity.properties.id : null;
					}

					this.performSirenAction(action, fields)
						.catch(() => {
							// Do nothing
						}).finally((() => {
							this._sliderLock = false;
							this._rubricLevelOverrides = {};
						}).bind(this));
				} else {
					this._rubricLevelOverrides = {};
				}
			}
		} else {
			// Moved to original position, delete override
			const overrides = Object.assign({}, this._rubricLevelOverrides);
			if (overrides[loaLink] !== undefined) {
				delete overrides[loaLink];
				this._rubricLevelOverrides = overrides;
			}
		}
	}

	_onOverridesChanged(overrides) {
		const loaMapping = this._getVisualLoaLevelMapping(this._loaLevels, this._sortedLevels, overrides, this._reversed);
		this.fire('d2l-rubric-loa-overlay-level-mapping-changed', loaMapping);
	}

	_onReversedChanged(reversed) {
		const loaMapping = this._getVisualLoaLevelMapping(this._loaLevels, this._sortedLevels, this._rubricLevelOverrides, reversed);
		this.fire('d2l-rubric-loa-overlay-level-mapping-changed', loaMapping);
	}

	_onAlignmentsChanged() {
		this._reloadHref(this.href);
	}

	_getNextLoaLevel(loaLevels, loaLevelEntity) {
		for (let i = 1; i < loaLevels.length; i++) {
			const level = loaLevels[i - 1];

			if (this._getSelfLink(level) === this._getSelfLink(loaLevelEntity)) {
				return loaLevels[i];
			}
		}

		return null;
	}

	_getPrevLoaLevel(loaLevels, loaLevelEntity) {
		for (let i = 1; i < loaLevels.length; i++) {
			const level = loaLevels[i];

			if (this._getSelfLink(level) === this._getSelfLink(loaLevelEntity)) {
				return loaLevels[i - 1];
			}
		}

		return null;
	}

	/**
     * Returns the entity for the loa level whose mapping is fixed
     * (lowest scoring LOA level)
     */
	_getFixedLoaLevel(loaLevels, reversed) {
		return loaLevels[reversed ? 0 : (loaLevels.length - 1)];
	}

	_getRubricLevelDist(sortedRubricLevels, rubricLevelEntity1, rubricLevelEntity2, reversed) {
		const l = this._getRubricLevelIndex(sortedRubricLevels, rubricLevelEntity1, reversed);
		const r = this._getRubricLevelIndex(sortedRubricLevels, rubricLevelEntity2, reversed);

		return r - l;
	}

	_getRubricLevelIndex(sortedRubricLevels, rubricLevelEntity, reversed) {
		for (let i = 0; i < sortedRubricLevels.length; i++) {
			if (this._getSelfLink(rubricLevelEntity) === this._getSelfLink(sortedRubricLevels[i])) {
				return i;
			}
		}

		return reversed ? sortedRubricLevels.length : -1;
	}

	_getPreviousSliderLevel(sortedRubricLevels, currentRubricLevel, reversed) {
		const currentIndex = this._getRubricLevelIndex(sortedRubricLevels, currentRubricLevel, reversed);

		if (currentIndex > 0 + (reversed ? 0 : -1)) {
			return sortedRubricLevels[currentIndex - 1] || null;
		}

		return false;
	}

	_getNextSliderLevel(sortedRubricLevels, currentRubricLevel, reversed) {
		const currentIndex = this._getRubricLevelIndex(sortedRubricLevels, currentRubricLevel, reversed);

		if (currentIndex < sortedRubricLevels.length + (reversed ? 0 : -1)) {
			return sortedRubricLevels[currentIndex + 1] || null;
		}

		return false;
	}

	_sortRubricLevels(levelEntities) {
		const sorted = [];

		let first = null;
		for (let i = 0; i < levelEntities.length; i++) {
			if (this._getPrevLink(levelEntities[i]) === this._getPrevLink(null)) {
				first = levelEntities[i];
				break;
			}
		}

		if (first === null) {
			return [];
		}

		let current = first;
		while (current !== null) {
			sorted.push(current);
			current = this._getNextRubricLevel(levelEntities, current);
		}

		return sorted;
	}

	_getLevelsLangTerm() {
		return this.localize('loaOverlayHeading');
	}
}

customElements.define('d2l-rubric-loa-overlay', RubricLoaOverlay);
