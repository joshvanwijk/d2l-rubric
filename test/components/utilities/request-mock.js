/* eslint no-unused-vars: 0 */
import SirenParse from 'siren-parser';
import * as default_data from './default-rubric-data.js';
import * as text_only_data from './text-only-rubric-data.js';

window.d2lfetch.fetch = function(href) {
	return D2L.PolymerBehaviors.FetchSirenEntityBehavior._makeRequest({ url: href, formData: function() { return Promise.resolve(); } })
		.then(function(body) {
			return {
				ok: true,
				json: function() {
					return Promise.resolve(body);
				}
			};
		})
		.catch(function(err) {
			return {
				ok: false,
				text: function() {
					return Promise.resolve(err.message);
				}
			};
		});
};

D2L.PolymerBehaviors.FetchSirenEntityBehavior._makeRequest = function(request) {
	var href = request.url && request.url.href || request.url;
	switch (href) {
		// case 'test':
		// 	Promise.resolve(SirenParse(my_data))
		case '/rubrics/default-rubric':
			return Promise.resolve(SirenParse(default_data.base));

		case '/rubrics/default-rubric/overallLevels':
			return Promise.resolve(SirenParse(default_data.overall_levels));

		case '/rubrics/default-rubric/overallLevels/1467':
			return Promise.resolve(SirenParse(default_data.overall_level_1));

		case '/rubrics/default-rubric/overallLevels/1466':
			return Promise.resolve(SirenParse(default_data.overall_level_2));

		case '/rubrics/default-rubric/overallLevels/1465':
			return Promise.resolve(SirenParse(default_data.overall_level_3));

		case '/rubrics/default-rubric/overallLevels/1464':
			return Promise.resolve(SirenParse(default_data.overall_level_4));

		case '/rubrics/default-rubric/groups':
			return Promise.resolve(SirenParse(default_data.groups));

		case '/rubrics/default-rubric/groups/174':
			return Promise.resolve(SirenParse(default_data.group_1));

		case '/rubrics/default-rubric/groups/174/levels':
			return Promise.resolve(SirenParse(default_data.levels));

		case '/rubrics/default-rubric/groups/174/levels/1463':
			return Promise.resolve(SirenParse(default_data.level_1));

		case '/rubrics/default-rubric/groups/174/levels/1462':
			return Promise.resolve(SirenParse(default_data.level_2));

		case '/rubrics/default-rubric/groups/174/levels/1461':
			return Promise.resolve(SirenParse(default_data.level_3));

		case '/rubrics/default-rubric/groups/174/levels/1460':
			return Promise.resolve(SirenParse(default_data.level_4));

		case '/rubrics/default-rubric/groups/174/criteria':
			return Promise.resolve(SirenParse(default_data.criteria));

		case '/rubrics/default-rubric/groups/174/criteria/617':
			return Promise.resolve(SirenParse(default_data.criteria_1));

		case '/rubrics/default-rubric/groups/174/criteria/618':
			return Promise.resolve(SirenParse(default_data.criteria_2));

		case '/rubrics/default-rubric/groups/174/criteria/619':
			return Promise.resolve(SirenParse(default_data.criteria_3));

		case '/rubrics/default-rubric/groups/174/criteria/617/0':
			return Promise.resolve(SirenParse(default_data.criteria_1_level_1));

		case '/rubrics/default-rubric/groups/174/criteria/617/1':
			return Promise.resolve(SirenParse(default_data.criteria_1_level_2));

		case '/rubrics/default-rubric/groups/174/criteria/617/2':
			return Promise.resolve(SirenParse(default_data.criteria_1_level_3));

		case '/rubrics/default-rubric/groups/174/criteria/617/3':
			return Promise.resolve(SirenParse(default_data.criteria_1_level_4));

		case '/rubrics/default-rubric/groups/174/criteria/618/0':
			return Promise.resolve(SirenParse(default_data.criteria_2_level_1));

		case '/rubrics/default-rubric/groups/174/criteria/618/1':
			return Promise.resolve(SirenParse(default_data.criteria_2_level_2));

		case '/rubrics/default-rubric/groups/174/criteria/618/2':
			return Promise.resolve(SirenParse(default_data.criteria_2_level_3));

		case '/rubrics/default-rubric/groups/174/criteria/618/3':
			return Promise.resolve(SirenParse(default_data.criteria_2_level_4));

		case '/rubrics/default-rubric/groups/174/criteria/619/0':
			return Promise.resolve(SirenParse(default_data.criteria_3_level_1));

		case '/rubrics/default-rubric/groups/174/criteria/619/1':
			return Promise.resolve(SirenParse(default_data.criteria_3_level_2));

		case '/rubrics/default-rubric/groups/174/criteria/619/2':
			return Promise.resolve(SirenParse(default_data.criteria_3_level_3));

		case '/rubrics/default-rubric/groups/174/criteria/619/3':
			return Promise.resolve(SirenParse(default_data.criteria_3_level_4));

		case '/rubrics/text-only':
			return Promise.resolve(SirenParse(text_only_data.base));

		case '/rubrics/text-only/overallLevels':
			return Promise.resolve(SirenParse(text_only_data.overall_levels));

		case '/rubrics/text-only/overallLevels/1467':
			return Promise.resolve(SirenParse(text_only_data.overall_level_1));

		case '/rubrics/text-only/overallLevels/1466':
			return Promise.resolve(SirenParse(text_only_data.overall_level_2));

		case '/rubrics/text-only/overallLevels/1465':
			return Promise.resolve(SirenParse(text_only_data.overall_level_3));

		case '/rubrics/text-only/overallLevels/1464':
			return Promise.resolve(SirenParse(text_only_data.overall_level_4));

		case '/rubrics/text-only/groups':
			return Promise.resolve(SirenParse(text_only_data.groups));

		case '/rubrics/text-only/groups/174':
			return Promise.resolve(SirenParse(text_only_data.group_1));

		case '/rubrics/text-only/groups/174/levels':
			return Promise.resolve(SirenParse(text_only_data.levels));

		case '/rubrics/text-only/groups/174/levels/1463':
			return Promise.resolve(SirenParse(text_only_data.level_1));

		case '/rubrics/text-only/groups/174/levels/1462':
			return Promise.resolve(SirenParse(text_only_data.level_2));

		case '/rubrics/text-only/groups/174/levels/1461':
			return Promise.resolve(SirenParse(text_only_data.level_3));

		case '/rubrics/text-only/groups/174/levels/1460':
			return Promise.resolve(SirenParse(text_only_data.level_4));

		case '/rubrics/text-only/groups/174/criteria':
			return Promise.resolve(SirenParse(text_only_data.criteria));

		case '/rubrics/text-only/groups/174/criteria/617':
			return Promise.resolve(SirenParse(text_only_data.criteria_1));

		case '/rubrics/text-only/groups/174/criteria/618':
			return Promise.resolve(SirenParse(text_only_data.criteria_2));

		case '/rubrics/text-only/groups/174/criteria/619':
			return Promise.resolve(SirenParse(text_only_data.criteria_3));

		case '/rubrics/text-only/groups/174/criteria/617/0':
			return Promise.resolve(SirenParse(text_only_data.criteria_1_level_1));

		case '/rubrics/text-only/groups/174/criteria/617/1':
			return Promise.resolve(SirenParse(text_only_data.criteria_1_level_2));

		case '/rubrics/text-only/groups/174/criteria/617/2':
			return Promise.resolve(SirenParse(text_only_data.criteria_1_level_3));

		case '/rubrics/text-only/groups/174/criteria/617/3':
			return Promise.resolve(SirenParse(text_only_data.criteria_1_level_4));

		case '/rubrics/text-only/groups/174/criteria/618/0':
			return Promise.resolve(SirenParse(text_only_data.criteria_2_level_1));

		case '/rubrics/text-only/groups/174/criteria/618/1':
			return Promise.resolve(SirenParse(text_only_data.criteria_2_level_2));

		case '/rubrics/text-only/groups/174/criteria/618/2':
			return Promise.resolve(SirenParse(text_only_data.criteria_2_level_3));

		case '/rubrics/text-only/groups/174/criteria/618/3':
			return Promise.resolve(SirenParse(text_only_data.criteria_2_level_4));

		case '/rubrics/text-only/groups/174/criteria/619/0':
			return Promise.resolve(SirenParse(text_only_data.criteria_3_level_1));

		case '/rubrics/text-only/groups/174/criteria/619/1':
			return Promise.resolve(SirenParse(text_only_data.criteria_3_level_2));

		case '/rubrics/text-only/groups/174/criteria/619/2':
			return Promise.resolve(SirenParse(text_only_data.criteria_3_level_3));

		case '/rubrics/text-only/groups/174/criteria/619/3':
			return Promise.resolve(SirenParse(text_only_data.criteria_3_level_4));
		default:
			return Promise.reject(new Error('Not Found: ' + href));
	}
};
