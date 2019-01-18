import '../localize-behavior.js';
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};

window.D2L.Rubric = window.D2L.Rubric || {};

/**
 * Behavior for Error Handling
 * @polymerBehavior
 */
D2L.PolymerBehaviors.Rubric.ErrorHandlingBehavior = {
	__rubricEditorBubbleCache: {
		bubble: null,
		host: null
	},
	behaviors: [
		D2L.PolymerBehaviors.Rubric.LocalizeBehavior
	],
	listeners: {
		'd2l-tooltip-show': '_onBubbleShow'
	},
	attached: function() {
		IronA11yAnnouncer.requestAvailability();
	},
	detached: function() {
		var cache = this.constructor.prototype.__rubricEditorBubbleCache;
		if (cache.host === this) {
			cache.host = null;
			cache.bubble = null;
		}
	},
	handleValidationError: function(bubbleId, property, langterm, error) {
		var msgText = this._getErrMsg(error, langterm);
		this.toggleBubble(property, true, bubbleId, msgText);
		this.fire('iron-announce', { text: msgText }, { bubbles: true });
	},
	_getErrMsg: function(e, altMsg) {
		if (e && !e.hasOwnProperty('stack')) {
			var errObj = e.string ? e.string : e.json;
			if (errObj.hasOwnProperty('properties')) {
				return errObj.properties.detail || errObj.properties.errors[0].message || this.localize(altMsg);
			}
		}
		return this.localize(altMsg);
	},
	toggleBubble: function(invalidId, show, bubbleId, errMsg) {
		var bubble = this.$$('#' + bubbleId);
		if (show) {
			this.set(invalidId, true);
			this.set(invalidId + 'Error', errMsg);
			if (bubble) {
				bubble.show();
			}
		} else {
			this.set(invalidId, false);
			this.set(invalidId + 'Error', '');
			bubble.forceShow = false;
			var cache = this.constructor.prototype.__rubricEditorBubbleCache;
			if (bubble && cache.bubble === bubble) {
				cache.bubble = null;
				cache.host = null;
			}
		}
	},
	isAriaInvalid: function(valueInvalidError) {
		return new Boolean(valueInvalidError).toString();
	},
	_onBubbleShow: function(e) {
		if (e.target.hidden) {
			return;
		}
		var cache = this.constructor.prototype.__rubricEditorBubbleCache;
		if (cache.bubble) {
			cache.bubble.forceShow = false;
		}

		e.target.forceShow = true;
		e.stopPropagation();
		cache.bubble = e.target;
		cache.host = this;
	}
};
