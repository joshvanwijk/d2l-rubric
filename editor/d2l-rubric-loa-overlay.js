import { PolymerElement, html } from '@polymer/polymer';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-table/d2l-table-shared-styles.js';
import './d2l-rubric-editor-cell-styles.js';
import '../rubric-siren-entity.js';

const MIN_HEADER_WIDTH = 8;
const MIN_HEADER_WIDTH_UNIT = 'rem';
const SLIDER_CENTER_OFFSET = 16;

class RubricLoaOverlay extends mixinBehaviors([
    window.D2L.Hypermedia.HMConstantsBehavior,
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

                #motion-slider {
                    z-index: 3;
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
                    z-index: 2;
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
                        Achievement Levels
                    </div>
                    <div id="row-data">
                        <div id="motion-slider" class="slider hidden"></div>
                        <template is="dom-repeat" items="[[_loaLevels]]" as="loaLevel" index-as="loaIndex">
                            <div class="cell loa-heading" style$="[[_getHeaderStyle(loaLevel, _sortedLevels, _rubricLevelOverrides)]]" is-holistic$="[[isHolistic]]">
                                [[loaLevel.properties.name]]
                            </div>
                            <div
                                class="slider"
                                data-loa-level$="[[_getSelfLink(loaLevel)]]"
                                on-mouseDown="_onMouseDown"
                                style$="[[_getSliderStyle(loaLevel, _sortedLevels, _headingsWidth, _rubricLevelOverrides, _reversed)]]"
                            ></div>
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

        const lastRubric = this._resolveRubricLevel(this._getRubricLevelLink(loaLevelEntities[loaLevelEntities.length - 1]));
        const lastRubricIndex = this._getRubricLevelIndex(lastRubric);
        
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

    _getHeaderStyle(loaLevel, rubricLevels, _rubricLevelOverrides) {
        const colSpan = this._getLoaLevelSpan(loaLevel, _rubricLevelOverrides);

        if (colSpan === 0) {
            return 'display: none;';
        }

		return [
            `flex-grow: ${colSpan}`,
            `flex-basis: 0px`,
            `min-width: ${MIN_HEADER_WIDTH * colSpan}${MIN_HEADER_WIDTH_UNIT}`
        ].join(';');
    }

    _getSliderStyle(loaLevel, rubricLevels, totalWidth, rubricLevelOverrides, reversed) {
        const color = loaLevel.properties.color;
        const effectiveRubricLevel = this._getVisualRubricLevel(loaLevel, rubricLevelOverrides);

        let offset = this._getRubricSliderPosition(effectiveRubricLevel, rubricLevels, totalWidth, reversed);
        let zIndex = 2;

        // Check for stacked sliders
        const prevLoa = this._getPrevLoaLevel(loaLevel);
        const prevRubric = this._getVisualRubricLevel(prevLoa, rubricLevelOverrides);
        
        if (prevLoa !== null && this._getSelfLink(effectiveRubricLevel) === this._getSelfLink(prevRubric)) {
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

    _getRubricSliderPosition(rubricLevel, rubricLevels, totalWidth, reversed) {
        const nSections = rubricLevels.length;
        const sectionWidth = totalWidth / nSections;

        const dist = this._getRubricLevelDist(this._sortedLevels[0], rubricLevel) + (reversed ? 0 : 1);
        return dist * sectionWidth - SLIDER_CENTER_OFFSET;
    }
    
    _getLoaLevelSpan(loaLevel, rubricLevelOverrides) {
        const adjLoa = this._reversed ? this._getNextLoaLevel(loaLevel) : this._getPrevLoaLevel(loaLevel);

        const currentRubric = this._getVisualRubricLevel(loaLevel, rubricLevelOverrides);
        const adjRubric = this._getVisualRubricLevel(adjLoa, rubricLevelOverrides);

        const dist = this._getRubricLevelDist(adjRubric, currentRubric) * (this._reversed ? -1 : 1);
        return dist;
    }

    _getVisualLoaLevelMapping(rubricLevelOverrides, reversed) {
        if (!this._loaLevels) {
            return {};
        }

        const levelMap = {};

        levelMap.reversed = reversed;

        const startLoaLevel = this._getFixedLoaLevel();
        const startRubricLevel = this._resolveRubricLevel(this._getRubricLevelLink(startLoaLevel));

        let currentLoa = null;
        let currentRubric = startRubricLevel;
        let nextLoa = startLoaLevel;
        let nextRubric = null;
        let newLevel = false;

        while (currentRubric !== null) {
            while (currentLoa === null || this._getSelfLink(currentRubric) === this._getSelfLink(nextRubric)) {
                newLevel = true;
                currentLoa = nextLoa;
                nextLoa = this._reversed ? this._getNextLoaLevel(currentLoa) : this._getPrevLoaLevel(currentLoa);

                const nextLoaLink = this._getSelfLink(nextLoa);
                const nextRubricLink = rubricLevelOverrides[nextLoaLink] !== undefined
                    ? rubricLevelOverrides[nextLoaLink]
                    : this._getRubricLevelLink(nextLoa);
                
                nextRubric = this._resolveRubricLevel(nextRubricLink);
            }
            
            levelMap[this._getSelfLink(currentRubric)] = {
                loaLevel: this._getSelfLink(currentLoa),
                isBound: newLevel
            };
            currentRubric = this._reversed ? this._getNextRubricLevel(currentRubric) : this._getPreviousRubicLevel(currentRubric);
            newLevel = false;
        }

        return levelMap;
    }

    _getVisualRubricLevel(loaLevel, rubricLevelOverrides) {
        const currentId = this._getSelfLink(loaLevel);
        return rubricLevelOverrides[currentId] !== undefined
            ? this._resolveRubricLevel(rubricLevelOverrides[currentId])
            : this._resolveRubricLevel(this._getRubricLevelLink(loaLevel));
    }

    _getLoaMappingLink(entity) {
		var link = entity && entity.getLinkByRel('loa-levels');
		return link && link.href || '';
    }

    _getRubricLevelLink(entity) {
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
        this._activeSlider.classList.add('active');
        this._draggingLoaLevel = this._resolveLoaLevel(this._activeSlider.getAttribute('data-loa-level'));

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

    _resolveLoaLevel(loaLevelHref) {
		if (!this._loaLevels || !this._loaLevels.length) {
			return null;
		}

		for (let i = 0; i < this._loaLevels.length; i++) {
			const loaLevel = this._loaLevels[i];

			if (this._getSelfLink(loaLevel) === loaLevelHref) {
				return loaLevel;
			}
		}

		return null;
	}

    _resolveRubricLevel(rubricLevelHref) {
		if (!this._levels || !this._levels.length) {
			return null;
        }
        
		for (let i = 0; i < this._levels.length; i++) {
			const rubricLevel = this._levels[i];

			if (this._getSelfLink(rubricLevel) === rubricLevelHref) {
				return rubricLevel;
			}
		}

		return null;
    }

    _getPreviousRubicLevel(rubricLevelEntity) {
        const previousHref = this._getPrevLink(rubricLevelEntity);
        return this._resolveRubricLevel(previousHref);
    }

    _getNextRubricLevel(rubricLevelEntity) {
        const nextHref = this._getNextLink(rubricLevelEntity);
        return this._resolveRubricLevel(nextHref);
    }
    
    _updateRubricLevel(loaLevelEntity, rubricLevelEntity, commit) {
        commit = commit || false;

        const currentLevel = this._getRubricLevelLink(loaLevelEntity);
        const newLevel = this._getSelfLink(rubricLevelEntity);
        const loaLink = this._getSelfLink(loaLevelEntity);

        if (currentLevel !== newLevel) {
            // Check if move is valid
            const nextLoa = this._getNextLoaLevel(loaLevelEntity);
            const prevLoa = this._getPrevLoaLevel(loaLevelEntity);

            const nextRubric = this._getVisualRubricLevel(nextLoa, this._rubricLevelOverrides);
            const prevRubric = this._getVisualRubricLevel(prevLoa, this._rubricLevelOverrides);

            const moveInvalid = (nextLoa && this._getRubricLevelDist(rubricLevelEntity, nextRubric) < 0)
                || (prevLoa && this._getRubricLevelDist(rubricLevelEntity, prevRubric) > 0)
                || (this._getSelfLink(loaLevelEntity) === this._getSelfLink(this._getFixedLoaLevel()));

            if (!moveInvalid && this._rubricLevelOverrides[loaLink] !== newLevel) {
                // Update front-end JS overrides
                const overrides = Object.assign({}, this._rubricLevelOverrides);
                overrides[loaLink] = newLevel;
                this._rubricLevelOverrides = overrides;
            }

            if (commit && this._rubricLevelOverrides[loaLink] !== undefined) {
                // Send change to server
                const action = loaLevelEntity.getActionByName('updateMapping');
                if (action) {
                    this._sliderLock = true;

                    const fields = action.fields;
                    const upperBoundField = fields.find(f => f.name === 'newUpperBound');
                    if (upperBoundField) {
                        const resolvedEntity = this._resolveRubricLevel(this._rubricLevelOverrides[loaLink]);
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
        const loaMapping = this._getVisualLoaLevelMapping(overrides, this._reversed);
        this.fire('d2l-rubric-loa-overlay-level-mapping-changed', loaMapping);
    }

    _onReversedChanged(reversed) {
        const loaMapping = this._getVisualLoaLevelMapping(this._rubricLevelOverrides, reversed);
        this.fire('d2l-rubric-loa-overlay-level-mapping-changed', loaMapping);
    }

    _getNextLoaLevel(loaLevelEntity) {
        for (let i = 1; i < this._loaLevels.length; i++) {
            const level = this._loaLevels[i - 1];

            if (this._getSelfLink(level) === this._getSelfLink(loaLevelEntity)) {
                return this._loaLevels[i];
            }
        }

        return null;
    }

    _getPrevLoaLevel(loaLevelEntity) {
        for (let i = 1; i < this._loaLevels.length; i++) {
            const level = this._loaLevels[i];

            if (this._getSelfLink(level) === this._getSelfLink(loaLevelEntity)) {
                return this._loaLevels[i - 1];
            }
        }

        return null;
    }

    /**
     * Returns the entity for the loa level whose mapping is fixed
     * (lowest scoring LOA level)
     */
    _getFixedLoaLevel() {
        return this._loaLevels[this._reversed ? 0 : (this._loaLevels.length - 1)];
    }

    _getRubricLevelDist(rubricLevelEntity1, rubricLevelEntity2) {
        const l = this._getRubricLevelIndex(rubricLevelEntity1);
        const r = this._getRubricLevelIndex(rubricLevelEntity2);

        return r - l;
    }

    _getRubricLevelIndex(rubricLevelEntity) {
        for (let i = 0; i < this._sortedLevels.length; i++) {
            if (this._getSelfLink(rubricLevelEntity) === this._getSelfLink(this._sortedLevels[i])) {
                return i;
            }
        }

        return this._reversed ? this._sortedLevels.length : -1;
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
            current = this._getNextRubricLevel(current);
        }

        return sorted;
    }
}

customElements.define('d2l-rubric-loa-overlay', RubricLoaOverlay);
