import '../localize-behavior.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

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
	},
	_getErrMsg: function(e, altMsg) {
		if (e && !e.hasOwnProperty('stack')) {
			var errObj = e.string ? e.string : e.json;
			if (errObj && errObj.hasOwnProperty('properties')) {
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
			} else {
				afterNextRender(this, function() {
					var newBubble = this.$$('#' + bubbleId);
					newBubble.show();
				}.bind(this));
			}
		} else {
			this.set(invalidId, false);
			this.set(invalidId + 'Error', '');
			if (bubble) {
				bubble.forceShow = false;
				var cache = this.constructor.prototype.__rubricEditorBubbleCache;
				if (cache.bubble === bubble) {
					cache.bubble = null;
					cache.host = null;
				}
			}
		}
	},
	isAriaInvalid: function(valueInvalidError) {
		return new Boolean(valueInvalidError).toString();
	},
	_onBubbleShow: function(e) {
		var targets = e.composedPath();
		var target;
		if (targets.length > 0) {
			target = targets[0];
		}
		// filter out d2l-tooltips that are not being used for errors
		if (!target.classList.contains('is-error')) {
			return;
		}
		var cache = this.constructor.prototype.__rubricEditorBubbleCache;
		if (cache.bubble) {
			cache.bubble.forceShow = false;
		}
		target.forceShow = true;
		e.stopPropagation();
		cache.bubble = target;
		cache.host = this;
	}
};
