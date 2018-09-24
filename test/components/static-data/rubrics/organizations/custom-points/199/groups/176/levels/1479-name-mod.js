/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get level_name_mod() {
		return {
			"class": [
				"level",
				"overridden"
			],
			"rel": [
				"https://rubrics.api.brightspace.com/rels/level"
			],
			"properties": {
				"name": "Superman"
			},
			"actions": [
				{
					"name": "update-name",
					"method": "PATCH",
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1479.json",
					"fields": [{
						"class": ["required"],
						"type": "text",
						"name": "name",
						"value": "Superman"
					}]
				},
			],
			"links": [
				{
					"rel": [
						"self"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1479.json"
				},
				{
					"rel": [
						"up"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels.json"
				},
				{
					"rel": [
						"prev"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1477.json"
				},
				{
					"rel": [
						"next"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1478.json"
				}
			]
		};
	}
});
