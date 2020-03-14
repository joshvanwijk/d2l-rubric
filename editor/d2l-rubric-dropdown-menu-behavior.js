import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};

window.D2L.Rubric = window.D2L.Rubric || {};

/**
 * Behavior for Dropdowns
 * @polymerBehavior
 */
D2L.PolymerBehaviors.Rubric.DropdownMenuBehavior = {
	behaviors: [],

	disableMenu: function(menuButton) {
		dom(menuButton).setAttribute('disabled', '');
	},

	enableMenu: function(menuButton) {
		dom(menuButton).removeAttribute('disabled');
	},
	resetSelectedMenuItem: function(menuButton, optionValue) {
		var items = dom(menuButton).querySelectorAll('d2l-menu-item-radio');
		for (var i = 0; i < items.length; i++) {
			if (items[i].value === optionValue) {
				items[i].setAttribute('selected', '');
			} else {
				items[i].removeAttribute('selected');
			}
		}
	},
	populateDropdownMenuOptions: function(menuId, options) {
		var menu = this.$[menuId];
		var selected = null;
		var oldItems = dom(menu).childNodes;
		for (var i = oldItems.length - 1; i >= 0; i--) {
			dom(menu).removeChild(oldItems[i]);
		}
		for (var j = 0; j < options.length; j++) {
			var option = options[j];
			var item = document.createElement('d2l-menu-item-radio');
			dom(item).setAttribute('text', option.title);
			dom(item).setAttribute('value', option.value);
			if (option.selected) {
				selected = option;
				dom(item).setAttribute('selected', '');
			}
			dom(menu).appendChild(item);
		}
		return selected;
	}
};
