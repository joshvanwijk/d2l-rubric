/**
`d2l-rubric`
Polymer Web-Component to display rubrics

@demo demo/index.html
*/
import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/offscreen/offscreen.js';
import '@polymer/iron-media-query/iron-media-query.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-save-status/d2l-save-status.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import './assessment-behavior.js';
import './d2l-rubric-adapter.js';
import './d2l-rubric-criteria-groups.js';
import './d2l-rubric-entity-behavior.js';
import './d2l-rubric-loading.js';
import './d2l-rubric-overall-score.js';
import './localize-behavior.js';
import './telemetry-behavior.js';
import './rubric-siren-entity.js';
import './d2l-rubric-assessment-cache-primer.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { Polymer } from '@polymer/polymer/polymer-legacy.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="d2l-rubric">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;

				--shtml-h1: {
					display: block;
					font-weight: bold;
					font-size: 2em;
					margin: .67em 0;
				};

				--shtml-h2: {
					display: block;
					font-weight: bold;
					font-size: 1.5em;
					margin: .83em 0;
				};

				--shtml-h3: {
					display: block;
					font-weight: bold;
					font-size: 1.17em;
					margin: 1em 0;
				};

				--shtml-h4: {
					display: block;
					font-weight: bold;
					margin: 1.33em 0;
				};

				--shtml-h5: {
					display: block;
					font-weight: bold;
					font-size: 0.83em;
					margin: 1.67em 0;
				};

				--shtml-h6: {
					display: block;
					font-weight: bold;
					font-size: 0.67em;
					margin: 2.33em 0;
				};
			}
			:host([compact]) {
				padding: 8px;
				border: 1px solid var(--d2l-color-chromite);
				border-radius: 6px;
			}

			.out-of-score-container > d2l-rubric-editable-score {
				pointer-events: none;
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;
				padding-left: 0.6rem;
			}
			.out-of-score-container > d2l-rubric-editable-score.assessable {
				pointer-events: auto;
			}
			.out-of-score-container > d2l-rubric-editable-score.assessable:hover {
				color: var(--d2l-color-celestine);
				cursor: pointer;
			}
			:host(:not([compact])) .out-of-score-container > d2l-rubric-editable-score.assessable:hover {
				padding: calc(0.5rem - 1px) calc(0.5rem - 1px) calc(0.5rem - 1px) calc(0.6rem - 1px);
			}
			.out-of-score-container > d2l-rubric-editable-score.editing,
			.out-of-score-container > d2l-rubric-editable-score.assessable.editing:hover {
				padding: 0 0.5rem 0 0.6rem;
			}
			:host([compact]) .out-of-score-container > d2l-rubric-editable-score {
				padding: 0;
			}

			.out-of-score-container {
				display: inline-flex;
				align-items: center;
			}

			.clear-override-button {
				flex-grow: 1;
				flex-shrink: 1;
			}

			.print-rubric-button {
				float: right;
				padding-bottom: 0.5rem;
			}

			.out-of-container {
				border: 1px solid var(--d2l-color-mica);
				border-radius: 8px;
			}
			:host([compact]) .out-of-container {
				border: none;
				margin-top: 0;
				font-weight: bold;
			}

			.out-of-text {
				@apply --d2l-body-compact-text;
				margin-right: 1rem;
				margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-left: 20px;
				padding-right: 20px;
			}
			:host([compact]) .out-of-text {
				margin-right: 0;
				padding-left: 0;
				padding-right: 0;
				font-weight: bold;
			}

			.out-of-loader {
				margin-top: 24px;
				border: 1px solid var(--d2l-color-mica);
				border-radius: 8px;
				text-align: right;
				height: 30px;
			}

			.total {
				width: auto;
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;
			}
			:host([compact]) .total {
				padding: 0;
			}

			d2l-save-status {
				text-align: right;
			}

			.overall-feedback-header {
				@apply --d2l-label-text;
				padding-top: 1.5rem;
			}

			.overall-feedback-text {
				@apply --d2l-body-compact-text;
				display: inline-block;
			}

			.quotation-mark-icon {
				margin-right: 20px
			}

			#editor-save-status-container {
				padding-right: 0.12rem
			}
			:dir(rtl) #editor-save-status-container,
			:host(:dir(rtl)) #editor-save-status-container {
				padding-left: 0.12rem
			}

			.compact-divider {
				border: solid 0.5px var(--d2l-color-mica);
			}

			/* Fix for Polymer 2 */
			[hidden] {
				display: none !important;
			}
			
			.print-only {
				display: none;
			}

			@media print {

				.d2l-rubric-print-container {
					position: absolute;
					top: 0px;
					left: 0px;
				}

				.d2l-rubric-print-container.print-style-active {
					visibility: visible;
					display: block;
				}

				.out-of-container {
					page-break-inside: avoid;
					width: 99vw;
				}

				.print-only {
					display: block;
				}

				h1.print-only {
					@apply --d2l-heading-1;
					font-size: 1.6rem;
					margin-bottom: 0px;
				}

				div.print-only {
					@apply --d2l-body-standard-text;
					font-size: 0.8rem;
				}

				d2l-rubric-criteria-groups {
					margin-top: 0.8rem;
				}

			}

		</style>
		<iron-media-query query="(max-width: 614px)" query-matches="{{_isMobile}}"></iron-media-query>
		<rubric-siren-entity href="[[assessmentHref]]" token="[[token]]" entity="{{assessmentEntity}}"></rubric-siren-entity>
		<rubric-siren-entity href="[[assessedUserHref]]" token="[[token]]" entity="{{assessedUserEntity}}"></rubric-siren-entity>
		<d2l-rubric-assessment-cache-primer href="[[assessmentHref]]" token="[[token]]" primed="{{_cachePrimed}}"></d2l-rubric-assessment-cache-primer>
		<d2l-rubric-adapter
			rubric-name="[[_getRubricName(entity)]]"
			assessment-entity="[[assessmentEntity]]"
			has-alerts="[[_hasAlerts]]"
			compact="[[compact]]"
			detached-view="[[detachedView]]"
			score-text="[[_localizeCompactScoreText(entity, _totalScore)]]"
			include-statistics$="[[includeStatistics]]"
			statistics-href="[[_statisticsHref]]"
		>
			<template is="dom-repeat" items="[[_alerts]]">
				<d2l-alert slot="alerts" type="[[item.alertType]]" button-text="[[localize('refreshText')]]">
					[[item.alertMessage]]
				</d2l-alert>
			</template>
			<div id="editor-save-status-container" hidden="[[readOnly]]">
				<d2l-save-status aria-hidden="true" id="rubric-save-status"></d2l-save-status>
			</div>
			<d2l-button-subtle
				class="print-rubric-button"
				icon="d2l-tier1:print"
				text="[[localize('printRubric')]]"
				description="[[localize('clearOverrideTotal')]]"
				on-click="_onPrintRubricButtonClicked"
				hidden$="[[!printable]]">
			</d2l-button-subtle>
			<div style="clear:both" />
			<slot hidden$="[[compact]]"></slot>
			<div class="d2l-rubric-print-container">
				<d2l-rubric-loading hidden$="[[_hideLoading(_showContent,_hasAlerts)]]"></d2l-rubric-loading>
				<div hidden$="[[_hideLoading(_showContent,_hasAlerts)]]" class="out-of-loader"></div>
				<div hidden$="[[_hideOutOf(_showContent,_hasAlerts)]]">
					<h1 class="rubric-name-label print-only">[[_getRubricName(entity)]]</h1>
					<template is="dom-if" if="[[_hasAssessment(assessmentHref)]]">
						<div class="activity-name-label print-only">[[localize('activityNameLabel', 'name', _assessedActivityName)]]</div>
					</template>
					<div class="course-name-label print-only">[[localize('courseNameLabel', 'name', _courseName)]]</div>
					<template is="dom-if" if="[[_hasAssessment(assessmentHref)]]">
						<div class="student-name-label print-only">[[localize('studentNameLabel', 'name', _assessedUserDisplayName)]]</div>
					</template>
					<d2l-rubric-criteria-groups
						href="[[_getHref(_criteriaGroups)]]"
						assessment-href="[[_waitForCachePrimer(assessmentHref,_cachePrimed)]]"
						token="[[token]]"
						rubric-type="[[rubricType]]"
						enable-feedback-copy="[[enableFeedbackCopy]]"
						read-only="[[readOnly]]"
						compact="[[compact]]"
					>
						<div slot="total-score">
							<div class="out-of-container" hidden="[[!_hasOutOf(entity)]]">
								<div class="out-of-text" role="group" aria-labelledby="total-grouping-label">
									<d2l-offscreen id="total-grouping-label">[[localize('totalScoreLabel')]]</d2l-offscreen>
									<span hidden$="[[compact]]">
										[[localize('total')]]
									</span>
									<span hidden$="[[!compact]]">
										[[localize('totalMobile')]]
									</span>
									<div class="out-of-score-container">
										<d2l-button-subtle
											class="clear-override-button"
											icon="d2l-tier1:close-small"
											text="[[localize('clearOverride')]]"
											description="[[localize('clearOverrideTotal')]]"
											on-click="_clearTotalScoreOverride"
											hidden$="[[!_showClearTotalScoreButton(_canClearTotalScoreOverride, readOnly, compact)]]">
										</d2l-button-subtle>
										<d2l-rubric-editable-score
											id="total-score-inner"
											assessment-href="[[assessmentHref]]"
											token="[[token]]"
											read-only="[[readOnly]]"
											editing-score="{{editingScore}}"
											total-score="[[_totalScore]]"
											entity="[[entity]]">
										</d2l-rubric-editable-score>
									</div>
								</div>
							</div>
							<hr class="compact-divider" hidden$="[[!compact]]">
						</div>
					</d2l-rubric-criteria-groups>
				</div>
				<template is="dom-if" if="[[_hasOverallScore(entity)]]">
					<hr class="compact-divider" hidden$="[[!compact]]">
					<d2l-rubric-overall-score
						read-only="[[readOnly]]"
						href="[[_getOverallLevels(entity)]]"
						overall-level-assessment-href="[[_getOverallLevelAssessmentHref(assessmentEntity,_cachePrimed)]]"
						token="[[token]]"
						has-out-of="[[_hasOutOf(entity)]]"
						compact="[[compact]]">
					</d2l-rubric-overall-score>
				</template>
				<div hidden$="[[!_hasOverallFeedback(assessmentEntity)]]">
					<div class="overall-feedback-header"><h2>[[localize('overallFeedback')]]</h2></div>
					<img class="quotation-mark-icon" src="[[_quoteImage]]" height="22" width="22">
					<s-html class="overall-feedback-text" html$="[[_getOverallFeedback(assessmentEntity)]]"></s-html>
				</div>
			</div>
		</d2l-rubric-adapter>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-rubric',

	properties: {
		compact: {
			type: Boolean,
			computed: '_computeCompact(forceCompact, _isMobile)',
			readOnly: true,
			reflectToAttribute: true
		},
		detachedView: {
			type: Boolean,
			value: false
		},
		forceCompact: {
			type: Boolean,
			value: false
		},
		readOnly: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		printable: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		outcomesTitleText: {
			type: String,
			notify: true
		},
		_criteriaGroups: {
			type: Object
		},
		_showContent: {
			type: Boolean,
			value: false
		},
		editingScore: {
			type: Number,
			value: -1
		},
		_assessedActivityName: {
			type: String,
			computed: '_getAssessedActivityName(assessmentEntity)'
		},
		_studentName: {
			type: String,
			value: null
		},
		_courseName: {
			type: String,
			value: null
		},
		assessmentHref: {
			type: String,
			reflectToAttribute: true
		},
		assessedUserHref: {
			type: String,
			computed: '_getAssessedUserHref(assessmentEntity)'
		},
		rubricType: {
			type: String,
			value: null
		},
		enableFeedbackCopy: {
			type: Boolean,
			value: null,
		},
		_errored: {
			type: Boolean,
			value: false
		},
		_assessedUserDisplayName: {
			type: String,
			computed: '_getAssessedUserDisplayName(assessedUserEntity)'
		},
		_canOverrideTotalScore: {
			type: Boolean,
			computed: '_getCanOverrideTotalScore(assessmentEntity)'
		},
		_canClearTotalScoreOverride: {
			type: Boolean,
			computed: '_getCanClearTotalScoreOverride(assessmentEntity)'
		},
		_totalScore: {
			type: Number,
			computed: '_getTotalScore(assessmentEntity)'
		},
		includeStatistics: {
			type: Boolean,
			value: false
		},
		_statisticsHref: {
			type: String,
			value: null
		},
		_cachePrimed: {
			type: Boolean,
			value: false
		},
		_isMobile: Boolean,
		_quoteImage: {
			type: String,
			value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICA8ZGVmcz4NCiAgICA8cGF0aCBpZD0iYSIgZD0iTTAgMGgyNHYyNEgweiIvPg0KICA8L2RlZnM+DQogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0xKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+DQogICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+DQogICAgPC9tYXNrPg0KICAgIDxwYXRoIGQ9Ik02IDIyLjY2N0E0LjY2NyA0LjY2NyAwIDAgMCAxMC42NjcgMThjMC0xLjIyNy0uNTU5LTIuNS0xLjMzNC0zLjMzM0M4LjQ4MSAxMy43NSA3LjM1IDEzLjMzMyA2IDEzLjMzM2MtLjQxMSAwIDEuMzMzLTYuNjY2IDMtOSAxLjY2Ny0yLjMzMyAxLjMzMy0zIC4zMzMtM0M4IDEuMzMzIDUuMjUzIDQuNTg2IDQgNy4yNTUgMS43NzMgMTIgMS4zMzMgMTUuMzkyIDEuMzMzIDE4QTQuNjY3IDQuNjY3IDAgMCAwIDYgMjIuNjY3ek0xOCAyMi42NjdBNC42NjcgNC42NjcgMCAwIDAgMjIuNjY3IDE4YzAtMS4yMjctLjU1OS0yLjUtMS4zMzQtMy4zMzMtLjg1Mi0uOTE3LTEuOTgzLTEuMzM0LTMuMzMzLTEuMzM0LS40MTEgMCAxLjMzMy02LjY2NiAzLTkgMS42NjctMi4zMzMgMS4zMzMtMyAuMzMzLTMtMS4zMzMgMC00LjA4IDMuMjUzLTUuMzMzIDUuOTIyQzEzLjc3MyAxMiAxMy4zMzMgMTUuMzkyIDEzLjMzMyAxOEE0LjY2NyA0LjY2NyAwIDAgMCAxOCAyMi42Njd6IiBmaWxsPSIjRDNEOUUzIiBtYXNrPSJ1cmwoI2IpIi8+DQogIDwvZz4NCjwvc3ZnPg=='
		},
		performanceTelemetryFlag: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		errorLoggingEndpoint: {
			type: String,
			value: null
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Rubric.EntityBehavior,
		window.D2L.Hypermedia.HMConstantsBehavior,
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior,
		D2L.PolymerBehaviors.Rubric.AssessmentBehavior,
		D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior
	],

	observers: [
		'_onEntityChanged(entity)'
	],

	listeners: {
		'd2l-siren-entity-save-start': '_onEntitySave',
		'd2l-siren-entity-save-error': '_onEntitySave',
		'd2l-siren-entity-save-end': '_onEntitySave',
		'd2l-siren-entity-error': '_handleError',
		'd2l-alert-button-pressed': '_pageReload',
		'd2l-rubric-compact-view-accordion': '_onAccordionCollapseExpand',
		'd2l-rubric-action-error': '_onSirenActionError'
	},

	ready: function() {
		this._updateOutcomesTitleText();

		const telemetryData = {
			rubricMode: this.dataset.rubricMode,
			originTool: this.dataset.originTool,
			endpoint: this.dataset.telemetryEndpoint || window.document.documentElement.dataset.telemetryEndpoint,
			errorEndpoint: this.errorLoggingEndpoint,
			performanceTelemetryEnabled: this.performanceTelemetryFlag,
			hasAssessment: this.assessmentHref && this.assessmentHref !== ''
		};
		this.setTelemetryData(telemetryData);
		this.markRubricLoadedEventStart();
	},

	_onEntityChanged: function(entity) {
		if (entity) {
			this.rubricType = this._findRubricType(entity);
			this.enableFeedbackCopy = this._getEnableFeedbackCopy(entity);

			this._criteriaGroups = entity.getLinkByRel(this.HypermediaRels.Rubrics.criteriaGroups);
			this._showContent = true;
			this._courseName = entity.properties.courseName;
			if(this.includeStatistics) {
				const statisticsLink = this.assessmentEntity.getLinkByRel('rubric-assessment-stats');
				this._statisticsHref = statisticsLink && statisticsLink.href;
				console.log(this._statisticsHref);
				console.log(this.assessmentEntity);
				console.log(statisticsLink);
			}
		}
	},

	_onEntitySave: function(e) {
		var saveStateEl = this.$['rubric-save-status'];
		({
			'd2l-siren-entity-save-start': function() { saveStateEl.start(); },
			'd2l-siren-entity-save-end': function() {
				// for Polymer 1 sometimes we aren't getting all end events so reset on end event
				saveStateEl._saving = 1;
				saveStateEl.end();
			},
			'd2l-siren-entity-save-error': function() { saveStateEl.error(); }
		})[e.type]();
	},

	_onAccordionCollapseExpand: function(e) {
		e.detail.opened
			? this.setAttribute('compact-expanded', '')
			: this.removeAttribute('compact-expanded');

		this.dispatchEvent(new CustomEvent('d2l-rubric-compact-expanded-changed', {
			detail: {
				expanded: !!e.detail.opened,
			},
			composed: true,
			bubbles: true,
		}));
	},

	_getHref: function(link) {
		return link.href;
	},

	_getScore: function(entity) {
		var score = entity && entity.properties && entity.properties.score;
		if (!!score || score === 0) {
			return score.toString();
		}
	},

	_findRubricType: function(entity) {
		if (entity.hasClass(this.HypermediaClasses.rubrics.holistic)) {
			return 'holistic';
		} else if (entity.hasClass(this.HypermediaClasses.rubrics.analytic)) {
			return 'analytic';
		} else {
			return null;
		}
	},

	_getEnableFeedbackCopy: function(entity) {
		const actions = entity && entity.getActionByName('enable-feedback-copy');
		if (!actions) return false;

		const field = actions.getFieldByName('feedbackCopy');
		return field && field.value && field.value.selected;
	},

	_hasAssessment: function(href) {
		return href && href !== '';
	},

	_hasOutOf: function(entity) {
		var outOf = entity && entity.properties && entity.properties.outOf;
		return !!outOf || outOf === 0;
	},

	_hasOverallScore: function(entity) {
		return (
			entity &&
			entity.hasLink(this.HypermediaRels.Rubrics.overallLevels) &&
			!entity.hasClass(this.HypermediaClasses.rubrics.holistic)
		);
	},

	_getOverallLevels: function(entity) {
		return entity.getLink(this.HypermediaRels.Rubrics.overallLevels).href;
	},

	_localizeDashOutOf: function(entity) {
		if (!this._hasOutOf(entity)) return;
		return this.localize('dashOutOf', 'outOf', entity.properties.outOf.toString());
	},

	_localizeOutOf: function(entity, score) {
		if (!this._hasOutOf(entity) || !score) return;
		return this.localize('scoreOutOf', 'score', score, 'outOf', entity.properties.outOf.toString());
	},

	_localizeCompactScoreText: function(entity, score) {
		if (!this._hasOutOf(entity)) {
			return;
		}

		if (score === null || score === undefined) {
			return this.localize('dashOutOf', 'outOf', entity.properties.outOf.toString());
		}

		return this.localize('scoreOutOf', 'score', score, 'outOf', entity.properties.outOf.toString());
	},

	_hideLoading: function(showContent, hasAlerts) {
		return showContent || hasAlerts;
	},
	_hideOutOf: function(showContent, hasAlerts) {
		return !showContent || hasAlerts;
	},

	_hasOverallFeedback: function(entity) {
		return !!this.AssessmentHelper.getFeedbackText(entity);
	},

	_getOverallFeedback: function(entity) {
		return this.AssessmentHelper.getFeedbackHtml(entity);
	},

	_handleError: function(e) {
		if (e && e['target']) {
			this.logApiError(
				e.target.href,
				'GET',
				(e.detail && typeof e.detail['error'] === 'number') ? e.detail.error : null,
				(e.detail && e.detail.error && e.detail.error.message) || null
			);
		}

		if (this._errored) {
			return;
		}
		this._errored = true;
		this._clearAlerts();

		announce(this.localize('rubricLoadingErrorAriaAlert'));

		this._addAlert('error', e.detail.error.message, this.localize('errorText'));
	},

	_pageReload: function() {
		window.location.reload();
	},

	_showClearTotalScoreButton: function(canClearOverride, readOnly) {
		return !readOnly && canClearOverride;
	},

	_updateOutcomesTitleText: function() {
		if (!this.outcomesTitleText
			|| !this.outcomesTitleText.length > 0
			|| !D2L
		) {
			return;
		}

		D2L.Custom = D2L.Custom || {};
		D2L.Custom.Outcomes = D2L.Custom.Outcomes || {};
		D2L.Custom.Outcomes.TermTitleText = this.outcomesTitleText;
	},

	_isStaticView: function() {
		return this.readOnly || !this.assessmentHref;
	},

	_getRubricName: function(rubricEntity) {
		return rubricEntity && rubricEntity.properties && rubricEntity.properties.name;
	},

	_computeCompact: function(forceCompact, _isMobile) {
		return forceCompact || _isMobile;
	},

	_getAssessedActivityName: function(entity) {
		return entity && entity.properties && entity.properties.activityName;
	},

	_getAssessedUserHref: function(entity) {
		return entity && entity.getLinkByRel('https://api.brightspace.com/rels/user');
	},

	_getAssessedUserDisplayName: function(entity) {
		if (!entity) {
			return null;
		}
		const nameEntities = entity.getSubEntitiesByClasses(['display', 'name']);
		if (!nameEntities || nameEntities.length === 0) {
			return null;
		}
		const nameEntity = nameEntities[0];
		return nameEntity.properties && nameEntity.properties.name;
	},

	_getCanOverrideTotalScore: function(entity) {
		return this.AssessmentHelper.canOverrideTotalScore(entity);
	},

	_getCanClearTotalScoreOverride: function(entity) {
		return this.AssessmentHelper.canClearTotalScoreOverride(entity);
	},

	_getTotalScore: function(entity) {
		return this.AssessmentHelper.getTotalScore(entity);
	},

	_clearTotalScoreOverride: function() {
		this.AssessmentHelper.clearTotalScoreOverrideAsync(() => this.assessmentEntity);
	},

	_getOverallLevelAssessmentHref: function(entity, cachePrimed) {
		if (!entity || !cachePrimed) {
			return null;
		}
		const overallLevelAssessmentLink = entity.getLinkByRel(
			'https://assessments.api.brightspace.com/rels/assessment-overall-level'
		);
		return overallLevelAssessmentLink && overallLevelAssessmentLink.href;
	},

	_waitForCachePrimer: function(href, isPrimed) {
		return isPrimed ? href : null;
	},

	_onSirenActionError: function(event) {
		this.logApiError(
			event.detail.url,
			event.detail.method,
			(typeof event.detail.error === 'number') ? event.detail.error : null,
			(event.detail && event.detail.error && event.detail.error.message) || null
		);
		event.stopPropagation();
	},

	_onPrintRubricButtonClicked: function() {
		//TODO: consider case where parent window has imported style sheets instead of a <style> element
		const originalWindowStyle = document.getElementsByTagName('style')[0].innerHTML;

		//Temporarily hide all window elements that aren't part of the desired print output
		document.getElementsByTagName('style')[0].innerHTML += `
			@media print {
				* {
					visibility: hidden;
					height: 0;
					width: 0;
					margin: 0;
					padding: 0;
					border: none;
					overflow: visible !important;
				}
			}
		`;

		/*Use .print-style-active class to set the print container and its contents as visible
		  Use temporary class to style the print container instead of general @media print CSS selector
		  This ensures only the current rubric's print container is visible (in case there are multiple rubrics in a page)
		*/
		const printContainer = this.shadowRoot.querySelector('.d2l-rubric-print-container');
		printContainer.classList.add('print-style-active');

		//Perform print
		window.print();

		//Reset styles to avoid interfering with other print operations in the page
		document.getElementsByTagName('style')[0].innerHTML = originalWindowStyle;
		printContainer.classList.remove('print-style-active');
	},

});
