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
		const eventBody = new window.d2lTelemetryBrowserClient.EventBody();
		eventBody.addCustom('isMobile', isMobile)
			.setAction('View')
			.setObject(encodeURIComponent(id), 'Rubric', id)
			.addCustom('rubricMode', telemetryData.rubricMode || 'unknown')
			.addCustom('originTool', telemetryData.originTool || 'unknown');

		this._logEvent(eventBody, telemetryData);
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

	_logEvent: function(eventBody, { endpoint }) {
		if (!eventBody || !endpoint) {
			return;
		}

		const client = new window.d2lTelemetryBrowserClient.Client({ endpoint: endpoint });

		const event = new window.d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType(this.eventType)
			.setSourceId(this.sourceId)
			.setBody(eventBody);

		client.logUserEvent(event);
		return event;
	},

	_logAndDestroyPerformanceEvent: function({ viewName, startMark, endMark, actionName  }, telemetryData) {
		if (!window.performance || !window.performance.measure || !this._markExists(startMark) || !this._markExists(endMark)) {
			return;
		}

		window.performance.measure(viewName, startMark, endMark);

		const eventBody = new window.d2lTelemetryBrowserClient.PerformanceEventBody()
			.setAction(actionName)
			.addCustom('rubricMode', telemetryData.rubricMode || 'unknown')
			.addCustom('originTool', telemetryData.originTool || 'unknown')
			.addUserTiming(window.performance.getEntriesByName(viewName));
		this._logEvent(eventBody, telemetryData);

		window.performance.clearMarks(startMark);
		window.performance.clearMarks(endMark);
		window.performance.clearMeasures(viewName);
		return eventBody;
	},

	_markExists: function(markName) {
		return window.performance.getEntriesByName(markName, 'mark').length > 0 ? true : false;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.Rubric.TelemetryResultBehavior = [
	D2L.PolymerBehaviors.Rubric.TelemetryBehaviorImpl,
	window.D2L.Hypermedia.HMConstantsBehavior
];
