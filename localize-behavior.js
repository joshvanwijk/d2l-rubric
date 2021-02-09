import 'd2l-localize-behavior/d2l-localize-behavior.js';
import './build/lang/ar.js';
import './build/lang/da.js';
import './build/lang/de.js';
import './build/lang/en.js';
import './build/lang/es.js';
import './build/lang/fr.js';
import './build/lang/ja.js';
import './build/lang/ko.js';
import './build/lang/nl.js';
import './build/lang/pt.js';
import './build/lang/sv.js';
import './build/lang/tr.js';
import './build/lang/zh-tw.js';
import './build/lang/zh.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Rubric = window.D2L.PolymerBehaviors.Rubric || {};

/** @polymerBehavior D2L.PolymerBehaviors.Rubric.LocalizeBehavior */
D2L.PolymerBehaviors.Rubric.LocalizeBehaviorImpl = {
	properties: {
		resources: {
			value: function() {
				return {
					'ar': this.ar,
					'da': this.daDk,
					'de': this.de,
					'en': this.en,
					'es': this.es,
					'fr': this.fr,
					'ja': this.ja,
					'ko': this.ko,
					'nl': this.nl,
					'pt': this.pt,
					'sv': this.sv,
					'tr': this.tr,
					'zh': this.zh,
					'zh-TW': this.zhTw
				};
			}
		}
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.Rubric.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehaviorImpl,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangArBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangDaBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangDeBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangEnBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangEsBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangFrBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangJaBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangKoBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangNlBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangPtBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangSvBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangTrBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangZhBehavior,
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangZhTwBehavior
];
