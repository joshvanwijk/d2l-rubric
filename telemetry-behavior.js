import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-telemetry-browser-client/d2l-telemetry-browser-client.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};

/**
 * Behavior for sending telemetry messages to the telemetry service
 * @polymerBehavior
 */
D2L.PolymerBehaviors.Rubric.TelemetryBehaviorImpl = {
	eventType: 'TelemetryEvent',
	sourceId: 'rubric',
	telemetryData: {},
	_loadedEntity: new Set(),
	_data: {
		sessionId: null
	},

	setTelemetryData: function(telemetryData) {
		if (!telemetryData || !telemetryData.endpoint) return;

		Object.assign(this.telemetryData, telemetryData);
		this._data.sessionId = this.getUUID();
	},

	getUUID: function() {
		return Math.random().toString(36).substring(2) + Date.now().toString(36);
	},

	logViewRubricEvent: function({ id, isMobile = false }) {
		const eventBody = this._createEventBody('View', this.telemetryData)
			.addCustom('isMobile', isMobile)
			.setObject(encodeURIComponent(id), 'Rubric', id);

		this._logEvent(eventBody, this.telemetryData, false);
		return eventBody;
	},

	perfMark: function(name) {
		if (!window.performance || !window.performance.mark) {
			return;
		}
		window.performance.mark(name);
	},

	logCriterionCellTappedAction: function(startMark, endMark) {
		return this._logAndDestroyPerformanceEvent({
			viewName: 'RubricCriterionCell',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricCriterionCellTapped'
		}, this.telemetryData);
	},

	logCriterionLevelAddedAction: function(startMark, endMark) {
		return this._logAndDestroyPerformanceEvent({
			viewName: 'RubricCriterionLevel',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricCriterionLevelAdded'
		}, this.telemetryData);
	},

	logCriterionAddedAction: function(startMark, endMark) {
		return this._logAndDestroyPerformanceEvent({
			viewName: 'RubricCriterion',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricCriterionAdded'
		}, this.telemetryData);
	},

	// Functions to track component loading status
	markRubricLoadedEventStart: function() {
		this.perfMark('rubricLoadStart');
	},

	markRubricLoadedEventEnd: function(source) {
		// If the component has assessment attached, we want both rubric/assessment entity to be loaded before logging the event
		this._loadedEntity.add(source);
		if (this.telemetryData.hasAssessment && this._loadedEntity.size !== 2) return;

		const self = this;
		this.debounce('markRubricLoadedEvent', function() {
			self.perfMark('rubricLoadEnd');
			self.logRubricLoadedEvent('rubricLoadStart', 'rubricLoadEnd');
		}, 100);
	},

	logRubricLoadedEvent: function(startMark, endMark) {
		// Logs from component inited -> render finished
		return this._logAndDestroyPerformanceEvent({
			viewName: 'Rubric',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricLoaded'
		}, this.telemetryData);
	},

	logRubricRenderedEvent: function(startMark, endMark) {
		// Logs from render started (after receiving response) -> render finished
		return this._logAndDestroyPerformanceEvent({
			viewName: 'Rubric',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricRendered'
		}, this.telemetryData);
	},

	logJavascriptError: function(message, error, source, line, column) {
		const errorInfo = {
			Name: (error && typeof error['name'] === 'string') ? error.name : typeof error,
			Message: message || '',
			Source: source || null,
			Line: typeof line === 'number' ? line : null,
			Column: typeof column === 'number' ? column : null,
			Details: (error && typeof error['toString'] === 'function') ? error.toString() : null
		};

		this._logEvent(
			this._createEventBody('JavascriptError', this.telemetryData, { Error: errorInfo }),
			this.telemetryData,
			true
		);
	},

	logApiError: function(url, method, statusCode) {
		const errorInfo = {
			RequestUrl: url,
			RequestMethod: method,
			ResponseStatus: statusCode
		};

		this._logEvent(
			this._createEventBody('ApiError', this.telemetryData, { Error: errorInfo }),
			this.telemetryData,
			true
		);
	},

	_logEvent: function(eventBody, { endpoint }, isError) {
		if (!eventBody || !endpoint) {
			return;
		}

		const client = new window.d2lTelemetryBrowserClient.Client({ endpoint: endpoint });

		const event = new window.d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType(isError ? 'ErrorEvent' : this.eventType)
			.setSourceId(this.sourceId)
			.setBody(eventBody);

		client.logUserEvent(event);
		return event;
	},

	_logAndDestroyPerformanceEvent: function({ viewName, startMark, endMark, actionName  }, telemetryData) {
		if (!window.performance || !window.performance.measure || !this._markExists(startMark) || !this._markExists(endMark) || !telemetryData.performanceTelemetryEnabled) {
			return;
		}

		window.performance.measure(viewName, startMark, endMark);

		const eventBody = this._createEventBody(actionName, telemetryData, null, true)
			.addUserTiming(window.performance.getEntriesByName(viewName));
		this._logEvent(eventBody, telemetryData, false);

		window.performance.clearMarks(startMark);
		window.performance.clearMarks(endMark);
		window.performance.clearMeasures(viewName);
		return eventBody;
	},

	_markExists: function(markName) {
		return window.performance.getEntriesByName(markName, 'mark').length > 0 ? true : false;
	},

	_createEventBody: function(action, telemetryData, customJson, isPerformanceLog) {
		const common = this._getCommonProperties();
		if (!customJson) {
			customJson = common;
		} else {
			for (const key in common) {
				customJson[key] = common[key];
			}
		}

		const eventBody = isPerformanceLog ?
			new window.d2lTelemetryBrowserClient.PerformanceEventBody() :
			new window.d2lTelemetryBrowserClient.EventBody();

		return eventBody
			.setAction(action)
			.setTenantUrl(location.hostname)
			.addCustom('rubricMode', (telemetryData || {}).rubricMode || 'unknown')
			.addCustom('originTool', (telemetryData || {}).originTool || 'unknown')
			.addCustom('sessionId', this._data.sessionId || '')
			.setCustomJson(customJson);
	},

	_getCommonProperties: function() {
		if (!this._commonProperties) {
			this._commonProperties = Object.freeze({
				PageUrl: location.href,
				ReferrerUrl: window.document.referrer,
				LmsVersion: window.document.documentElement.dataset.appVersion,
				BsiVersion: this._getBsiVersion()
			});
		}
		return this._commonProperties;
	},

	_getBsiVersion: function() {
		const scripts = Array.from(window.document.head.childNodes).filter(e => e.tagName === 'SCRIPT');
		const bsiRegex = /^https:\/\/s\.brightspace\.com\/lib\/bsi\/([^\/]+)\//;
		for (let i = 0; i < scripts.length; i++) {
			if (!scripts[i].src) continue;
			const matches = scripts[i].src.match(bsiRegex);
			if (matches && matches[1]) {
				return matches[1];
			}
		}
		return 'dev';
	}

};

/** @polymerBehavior */
D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior = [
	D2L.PolymerBehaviors.Rubric.TelemetryBehaviorImpl,
	window.D2L.Hypermedia.HMConstantsBehavior
];
