/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures,
	{
		get overall_level_description_mod() {
			return {
				"class": [
					"overall-level"
				],
				"rel": [
					"https://rubrics.api.brightspace.com/rels/overall-level"
				],
				"properties": {
					"name": "Level 2",
					"rangeStart": 3
				},
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
								"href": "static-data/rubrics/organizations/text-only/199/overall-levels/1.json",
								"name": "update",
								"method": "PUT",
								"fields": [
									{
										"class": [
											"required"
										],
										"type": "hidden",
										"name": "name",
										"value": "Level 2"
									},
									{
										"type": "text",
										"name": "description",
										"value": "Batman and Robin"
									},
									{
										"type": "hidden",
										"name": "feedback",
										"value": "5 stars for proper use of grammar!"
									}
								]
							}
						]
					},
					{
						"class": [
							"richtext",
							"feedback"
						],
						"rel": [
							"item"
						],
						"properties": {
							"text": "5 stars for proper use of grammar!",
							"html": "5 stars for proper use of grammar!"
						},
						"actions": [
							{
								"href": "static-data/rubrics/organizations/text-only/199/overall-levels/1.json",
								"name": "update",
								"method": "PUT",
								"fields": [
									{
										"class": [
											"required"
										],
										"type": "hidden",
										"name": "name",
										"value": "Level 2"
									},
									{
										"type": "hidden",
										"name": "description",
										"value": "Batman and Robin"
									},
									{
										"type": "text",
										"name": "feedback",
										"value": "5 stars for proper use of grammar!"
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
						"href": "static-data/rubrics/organizations/text-only/199/overall-levels/1.json"
					},
					{
						"rel": [
							"up"
						],
						"href": "static-data/rubrics/organizations/text-only/199/overall-levels/overall-levels.json"
					},
					{
						"rel": [
							"next"
						],
						"href": "static-data/rubrics/organizations/text-only/199/overall-levels/2"
					}
				],
				"actions": [
					{
						"href": "static-data/rubrics/organizations/text-only/199/overall-levels/1.json",
						"name": "update",
						"method": "PUT",
						"fields": [
							{
								"class": [
									"required"
								],
								"type": "text",
								"name": "name",
								"value": "Level 2"
							},
							{
								"type": "hidden",
								"name": "description",
								"value": "Batman and Robin"
							},
							{
								"type": "hidden",
								"name": "feedback",
								"value": "5 stars for proper use of grammar!"
							}
						]
					},
					{
						"href": "static-data/rubrics/organizations/text-only/199/overall-levels/1.json",
						"name": "delete",
						"method": "DELETE"
					}
				]
			};
		}
	});
