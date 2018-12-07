/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get rubric_association_mod() {
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
				},
				{
					"href": "static-data/rubrics/organizations/text-only/199.json",
					"name": "update-score-visibility",
					"method": "PATCH",
					"fields": [
						{
							"class": [
								"required"
							],
							"type": "checkbox",
							"name": "scoreVisible",
							"value": "false"
						}
					]
				},
				{
					"href": "static-data/rubrics/organizations/text-only/199.json",
					"name": "update-visibility",
					"method": "PATCH",
					"fields": [{
						"type": "radio",
						"name": "visibility",
						"value": [{
							"value": "AlwaysVisible",
							"selected": false
						}, {
							"value": "VisibleOnceFeedbackPosted",
							"selected": true
						}, {
							"value": "NeverVisible",
							"selected": false
						}]
					}]
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
									"value": ""
								}
							]
						}
					]
				},
				{
					"class": [
						"collection",
						"associations"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/allowed-associations"
					],
					"entities": [
						{
							"class": [
								"association"
							],
							"rel": [
								"item"
							],
							"title": "Competencies",
							"properties": {
								"allowed": false
							},
							"actions": [
								{
									"href": "static-data/rubrics/organizations/text-only/199/allowedAssociations/Competency",
									"name": "update",
									"method": "PUT",
									"fields": [
										{
											"type": "checkbox",
											"name": "allowed",
											"value": false
										}
									]
								}
							],
							"links": [
								{
									"rel": [
										"self"
									],
									"href": "static-data/rubrics/organizations/text-only/199/allowedAssociations/Competency"
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
