/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get level_points_mod() {
		return {
			"class": [
				"level"
			],
			"rel": [
				"https://rubrics.api.brightspace.com/rels/level"
			],
			"properties": {
				"name": "Level 1",
				"points": 12.6
			},
			"actions": [{
				"name": "update",
				"method": "PUT",
				"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1479.json",
				"fields": [{
					"type": "text",
					"name": "name",
					"value": "Level 1"
				}]
			},
			{
				"name": "update-points",
				"method": "PATCH",
				"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1479.json",
				"fields": [{
					"type": "number",
					"name": "points",
					"value": 12.6
				}]
			}],
			"links": [
				{
					"rel": [
						"self"
					],
					"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1479.json"
				},
				{
					"rel": [
						"up"
					],
					"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels.json"
				},
				{
					"rel": [
						"prev"
					],
					"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1477.json"
				},
				{
					"rel": [
						"next"
					],
					"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1478.json"
				}
			]
		};
	}
});
