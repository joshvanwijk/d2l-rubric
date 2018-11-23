/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get rubric_description_mod() {
		return {
			"class": [
				"rubric",
				"published"
			],
			"properties": {
				"name": "Text Only Rubric"
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
							"value": "Text Only Rubric"
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
						"text": "Batman and Robin",
						"html": "Batman and Robin"
					},
					"actions": [
						{
							"href": "static-data/rubrics/organizations/text-only/199.json",
							"name": "update-description",
							"method": "PATCH",
							"fields": [
								{
									"type": "text",
									"name": "description",
									"value": "Batman and Robin"
								}
							]
						}
					]
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
