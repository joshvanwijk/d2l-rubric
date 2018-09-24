/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get criterion_name_mod() {
		return {
			"class": [
				"criterion",
				"numeric"
			],
			"properties": {
				"name": "Batman and Robin",
				"outOf": 4
			},
			"actions": [{
				"name": "update",
				"method": "PUT",
				"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623.json",
				"fields": [{
					"type": "text",
					"name": "name",
					"value": "Batman and Robin"
				}]
			}],
			"entities": [
				{
					"class": [
						"criterion-cell",
						"overridden"
					],
					"rel": [
						"item",
						"https://rubrics.api.brightspace.com/rels/criterion-cell"
					],
					"properties": {
						"levelName": "Level 4",
						"points": 4
					},
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/0.json"
				},
				{
					"class": [
						"criterion-cell",
						"overridden"
					],
					"rel": [
						"item",
						"https://rubrics.api.brightspace.com/rels/criterion-cell"
					],
					"properties": {
						"levelName": "Level 3",
						"points": 3
					},
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/1.json"
				},
				{
					"class": [
						"criterion-cell",
						"overridden"
					],
					"rel": [
						"item",
						"https://rubrics.api.brightspace.com/rels/criterion-cell"
					],
					"properties": {
						"levelName": "Level 2",
						"points": 2
					},
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/2.json"
				},
				{
					"class": [
						"criterion-cell",
						"overridden"
					],
					"rel": [
						"item",
						"https://rubrics.api.brightspace.com/rels/criterion-cell"
					],
					"properties": {
						"levelName": "Level 1",
						"points": 1
					},
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/3.json"
				}
			],
			"links": [
				{
					"rel": [
						"self"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623.json"
				},
				{
					"rel": [
						"up"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria.json"
				}
			]
		};
	}
});
