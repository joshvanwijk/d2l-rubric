import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-table/d2l-table-shared-styles.js';
import './d2l-rubric-editor-cell-styles.js';
import '../rubric-siren-entity.js';

class RubricLoaOverlay extends mixinBehaviors([
    window.D2L.Hypermedia.HMConstantsBehavior,
    D2L.PolymerBehaviors.Siren.EntityBehavior
], PolymerElement) {
    static get properties() {
        return {
            _levels: Array,
            _loaLevels: Array,
            _loaMappingHref: String,
            _loaLevelEntity: {
                type: Object,
                value: null,
                observer: '_onLoaMappingEntityChanged'
            }
        };
    }

    static get template() {
        return html`
            <style include="d2l-rubric-editor-cell-styles">
                :host {
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
            </style>

            <rubric-siren-entity href="[[_loaMappingHref]]" token="[[token]]" entity="{{_loaLevelEntity}}"></rubric-siren-entity>
            <template is="dom-if" if="[[_hasLoaLevels(_loaMappingHref)]]">
                <div class="gutter-left"></div>
                <div class="cell col-first" is-holistic$="[[isHolistic]]">
                    Achievement Levels
                </div>
                <div id="row-data" style="display: inherit; flex: 1 1 auto;">
                    <template is="dom-repeat" items="[[_loaLevels]]" as="loaLevel">
                        <div class="cell loa-heading" style$="[[_getHeaderStyle(loaLevel)]]" is-holistic$="[[isHolistic]]">
                            [[loaLevel.properties.name]]
                        </div>
                    </template>
                </div>
                <div class="cell col-last" text-only$="[[!hasOutOf]]" is-holistic$="[[isHolistic]]"></div>
                <div class="gutter-right"></div>
            </template>
        `;
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
		return [
            `flex-grow: ${colSpan}`
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
