/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get rubric_name_mod() {
		return {
			"class": [
				"rubric",
				"published"
			],
			"properties": {
				"name": "Superman Rubric"
			},
			"actions": [
				{
					"href": "static-data/rubrics/organizations/text-only/199.json",
					"name": "update-name",
					"method": "PATCH",
					"fields": [
						{
							"class": [
								"required"
							],
							"type": "text",
							"name": "name",
							"value": "Superman Rubric"
						}
					]
				}
			],
			"entities": [
				{
					"class": [
						"richtext",
						"description"
					],
					"rel": [
						"item"
					],
					"properties": {
						"text": "",
						"html": ""
					}
				}
			],
			"links": [
				{
					"rel": [
						"self"
					],
					"href": "static-data/rubrics/organizations/text-only/199.json"
				},
				{
					"rel": [
						"up"
					],
					"href": "static-data/rubrics/organizations/text-only.json"
				},
				{
					"rel": [
						"https://rubrics.api.brightspace.com/rels/criteria-groups"
					],
					"href": "static-data/rubrics/organizations/text-only/199/groups.json"
				},
				{
					"rel": [
						"https://api.brightspace.com/rels/organization"
					],
					"href": "static-data/rubrics/organizations/text-only.json"
				}
			]
		};
	}
});
