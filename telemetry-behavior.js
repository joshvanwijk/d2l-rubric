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

	logViewRubricEvent: function({ id, isMobile = false }, telemetryData) {
		const eventBody = this._createEventBody('View', telemetryData)
			.addCustom('isMobile', isMobile)
			.setObject(encodeURIComponent(id), 'Rubric', id);

		this._logEvent(eventBody, telemetryData, false);
		return eventBody;
	},

	perfMark: function(name) {
		if (!window.performance || !window.performance.mark) {
			return;
		}
		window.performance.mark(name);
	},

	logCriterionCellTappedAction: function(startMark, endMark, telemetryData) {
		return this._logAndDestroyPerformanceEvent({
			viewName: 'RubricCriterionCell',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricCriterionCellTapped'
		}, telemetryData);
	},

	logCriterionLevelAddedAction: function(startMark, endMark, telemetryData) {
		return this._logAndDestroyPerformanceEvent({
			viewName: 'RubricCriterionLevel',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricCriterionLevelAdded'
		}, telemetryData);
	},

	logCriterionAddedAction: function(startMark, endMark, telemetryData) {
		return this._logAndDestroyPerformanceEvent({
			viewName: 'RubricCriterion',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricCriterionAdded'
		}, telemetryData);
	},

	logRubricLoadedEvent: function(startMark, endMark, telemetryData) {
		// Logs from reuqest sent -> render finished
		return this._logAndDestroyPerformanceEvent({
			viewName: 'Rubric',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricLoaded'
		}, telemetryData);
	},

	logRubricRenderedEvent: function(startMark, endMark, telemetryData) {
		// Logs from render started (after receiving response) -> render finished
		return this._logAndDestroyPerformanceEvent({
			viewName: 'Rubric',
			startMark: startMark,
			endMark: endMark,
			actionName: 'RubricRendered'
		}, telemetryData);
	},

	logJavascriptError: function(message, error, telemetryData, source, line, column) {
		const errorInfo = {
			Name: (error instanceof Error) ? error.name : typeof error,
			Message: message || '',
			Source: source || null,
			Line: typeof line === 'number' ? line : null,
			Column: typeof column === 'number' ? column : null,
			Details: (error && typeof error['toString'] === 'function') ? error.toString() : null
		};

		this._logEvent(
			this._createEventBody('JavascriptError', telemetryData, { Error: errorInfo }),
			telemetryData,
			true
		);
	},

	logApiError: function(url, method, statusCode, telemetryData) {
		const errorInfo = {
			RequestUrl: url,
			RequestMethod: method,
			ResponseStatus: statusCode
		};

		this._logEvent(
			this._createEventBody('ApiError', telemetryData, { Error: errorInfo }),
			telemetryData,
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

		const eventBody = this._createEventBody(actionName, telemetryData)
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

	_createEventBody: function(action, telemetryData, customJson) {
		const common = this._getCommonProperties();
		if (!customJson) {
			customJson = common;
		} else {
			for (const key in common) {
				customJson[key] = common[key];
			}
		}

		return new window.d2lTelemetryBrowserClient.EventBody()
			.setAction(action)
			.setTenantUrl(location.hostname)
			.addCustom('rubricMode', (telemetryData || {}).rubricMode || 'unknown')
			.addCustom('originTool', (telemetryData || {}).originTool || 'unknown')
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
