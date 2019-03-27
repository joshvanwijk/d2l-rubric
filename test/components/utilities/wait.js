/* eslint no-unused-vars: 0 */
var getLoadedElement = function(element, href, done) {
	function waitForLoad(e) {
		if (e.detail.entity.getLinkByRel('self').href === href) {
			element.removeEventListener('d2l-siren-entity-changed', waitForLoad);
			setTimeout(done, 0);
		}
	}
	element.addEventListener('d2l-siren-entity-changed', waitForLoad);
	element.href = href;
	element.token = 'foozleberries';
	return element;
};

var waitForLastSirenChangeEvent = function(el, event, lastEntityName) {
	//lastEntityName is the name of the last sirent entity you expect to
	//be called. You can figure this out by putting in a console.log in the
	//event listener.
	return new Promise(function(resolve) {
		const listener = function(e) {
			// console.log(e.detail.entity.properties)
			if (e.detail.entity.properties && e.detail.entity.properties.name === lastEntityName) {
				el.removeEventListener(e, listener);
				resolve(e);
			}
		};
		el.addEventListener(event, listener);
	});
};

var timePasses = function(ms) {
	return new Promise((resolve) => {
		window.setTimeout(() => {
			resolve();
		}, ms);
	});
};
