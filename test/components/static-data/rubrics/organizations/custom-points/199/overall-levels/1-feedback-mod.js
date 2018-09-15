/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures,
	{
		get overall_level_feedback_mod() {
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
							"text": "Proper use of grammar",
							"html": "Proper use of grammar"
						},
						"actions": [
							{
								"href": "static-data/rubrics/organizations/custom-points/199/overall-levels/1.json",
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
										"value": "Proper use of grammar"
									},
									{
										"type": "hidden",
										"name": "feedback",
										"value": "You are a grammar rockstar!"
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
							"text": "You are a grammar rockstar!",
							"html": "You are a grammar rockstar!"
						},
						"actions": [
							{
								"href": "static-data/rubrics/organizations/custom-points/199/overall-levels/1.json",
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
										"value": "Proper use of grammar"
									},
									{
										"type": "text",
										"name": "feedback",
										"value": "You are a grammar rockstar!"
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
						"href": "static-data/rubrics/organizations/custom-points/199/overall-levels/1.json"
					},
					{
						"rel": [
							"up"
						],
						"href": "static-data/rubrics/organizations/custom-points/199/overall-levels/overall-levels.json"
					},
					{
						"rel": [
							"next"
						],
						"href": "static-data/rubrics/organizations/custom-points/199/overall-levels/2.json"
					}
				],
				"actions": [
					{
						"href": "static-data/rubrics/organizations/custom-points/199/overall-levels/1.json",
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
								"value": "Proper use of grammar"
							},
							{
								"type": "hidden",
								"name": "feedback",
								"value": "You are a grammar rockstar!"
							}
						]
					},
					{
						"href": "static-data/rubrics/organizations/custom-points/199/overall-levels/1.json",
						"name": "delete",
						"method": "DELETE"
					}
				]
			};
		}
	});
