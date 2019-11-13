import { PolymerElement, html } from '@polymer/polymer';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-table/d2l-table-shared-styles.js';
import './d2l-rubric-editor-cell-styles.js';
import '../rubric-siren-entity.js';

const SLIDER_CENTER_OFFSET = 16;

class RubricLoaOverlay extends mixinBehaviors([
    window.D2L.Hypermedia.HMConstantsBehavior,
    D2L.PolymerBehaviors.Siren.EntityBehavior
], PolymerElement) {
    static get properties() {
        return {
            _activeSlider: Object,
            _currentSliderPosition: Number,
            _dragCaptureOverlay: Object,
            _dragCursorOffset: Number,
            _draggingSlider: Object,
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
            _resizeElement: Object
        };
    }

    static get template() {
        return html`
            <style include="d2l-rubric-editor-cell-styles">
                d2l-resize-aware {
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
            <d2l-resize-aware>
                <template is="dom-if" if="[[_hasLoaLevels(_loaMappingHref)]]">
                    <div class="gutter-left"></div>
                    <div class="cell col-first" is-holistic$="[[isHolistic]]">
                        Achievement Levels
                    </div>
                    <div id="row-data">
                        <div id="motion-slider" class="slider hidden"></div>
                        <template is="dom-repeat" items="[[_loaLevels]]" as="loaLevel" index-as="loaIndex">
                            <div class="cell loa-heading" style$="[[_getHeaderStyle(loaLevel)]]" is-holistic$="[[isHolistic]]">
                                [[loaLevel.properties.name]]
                            </div>
                            <div
                                class="slider"
                                on-mouseDown="_onDragSliderStart"
                                style$="[[_getSliderStyle(loaLevel, loaIndex, _headingsWidth)]]"
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
            this._resizeElement = this.$$('d2l-resize-aware');
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
                this.fire('d2l-rubric-loa-overlay-width-changed', { width: section.offsetWidth });
            }
		}, 1);
	}

    _onEntityChanged(entity) {
        if (!entity) {
            return;
        }

        this._levels = entity.getSubEntitiesByClass(this.HypermediaClasses.rubrics.level);
		this._loaMappingHref = this._getLoaMappingLink(entity);
    }

    _onLoaMappingEntityChanged(entity) {
        if (!entity) {
            return;
        }

        this._loaLevels = entity.getSubEntitiesByClass('level-of-achievement');
    }

    _getHeaderStyle(loaLevel) {
        const colSpan = this._getLoaLevelSpan(loaLevel);

        if (colSpan === 0) {
            return 'display: none;';
        }

		return [
            `flex-grow: ${colSpan}`
        ].join(';');
    }

    _getSliderStyle(loaLevel, index, totalWidth) {
        if (index === 0) {
            this._currentSliderPosition = -SLIDER_CENTER_OFFSET;
        }

        const nSections = this._levels.length;
        const sectionWidth = totalWidth / nSections;
        const colSpan = this._getLoaLevelSpan(loaLevel);

        const zIndex = colSpan === 0 ? 1 : 2;

        const color = loaLevel.properties.color;
        this._currentSliderPosition += sectionWidth * colSpan;
        let offset = this._currentSliderPosition;

        if (colSpan === 0) {
            offset += 12;
        }

        return [
            `background-color: ${color}`,
            `border-color: ${color}`,
            `left: ${offset}px`,
            `z-index: ${zIndex}`
        ].join(';');
    }
    
    _getLoaLevelSpan(loaLevel) {
        let count = 0;
        this._levels.forEach(rubricLevel => {
            if (this._getLoaLevelLink(rubricLevel) === this._getSelfLink(loaLevel)) {
                count++;
            }
        });
        return count;
    }

    _getLoaLevelLink(entity) {
		var link = entity && entity.getLinkByRel('https://achievements.api.brightspace.com/rels/level');
		return link && link.href || '';
	}

    _getLoaMappingLink(entity) {
		var link = entity && entity.getLinkByRel('loa-levels');
		return link && link.href || '';
    }

    _getSelfLink(entity) {
		var link = entity && entity.getLinkByRel('self');
		return link && link.href || '';
	}
    
    _hasLoaLevels(href) {
        return href !== '';
    }

    _onDragSliderStart(e) {
        e.preventDefault();

        this._activeSlider = e.target;
        this._activeSlider.classList.add('active');
        
        this._draggingSlider = this.$$('#motion-slider');
        this._dragCursorOffset = e.layerX;
        this._draggingSlider.style.backgroundColor = this._activeSlider.style.backgroundColor;
        this._draggingSlider.style.left = this._activeSlider.style.left;
        this._draggingSlider.classList.remove('hidden');

        this._dragCaptureOverlay = document.createElement('div');
        this._dragCaptureOverlay.setAttribute('id', 'drag-capture-overlay');

        this.root.appendChild(this._dragCaptureOverlay);
    }

    _onMouseMove(e) {
        if (this._draggingSlider) {
            const minBound = -SLIDER_CENTER_OFFSET;
            const maxBound = this._draggingSlider.parentNode.offsetWidth - SLIDER_CENTER_OFFSET;
            
            let position = e.pageX - this._draggingSlider.parentNode.offsetLeft - this._draggingSlider.offsetWidth - this._dragCursorOffset;
            position = Math.min(Math.max(minBound, position), maxBound);

            this._draggingSlider.style.left = `${position}px`;
        }
    }

    _onMouseUp(e) {
        if (this._draggingSlider) {
            this._activeSlider.classList.remove('active');
            this._activeSlider = null;

            this._draggingSlider.classList.add('hidden');
            this._draggingSlider = null;

            this._dragCaptureOverlay.parentNode.removeChild(this._dragCaptureOverlay);
            this._dragCaptureOverlay = null;
        }
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
}

customElements.define('d2l-rubric-loa-overlay', RubricLoaOverlay);
