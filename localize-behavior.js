import 'd2l-localize-behavior/d2l-localize-behavior.js';
import './lang/ar.js';
import './lang/da.js';
import './lang/de.js';
import './lang/en.js';
import './lang/es.js';
import './lang/fi.js';
import './lang/fr.js';
import './lang/ja.js';
import './lang/ko.js';
import './lang/nl.js';
import './lang/pt.js';
import './lang/sv.js';
import './lang/tr.js';
import './lang/zh-tw.js';
import './lang/zh.js';
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
					'fi': this.fi,
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
	D2L.PolymerBehaviors.Rubric.LocalizeBehavior.LangFiBehavior,
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
