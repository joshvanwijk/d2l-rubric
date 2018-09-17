/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures,
	{
		get criterion_cell_feedback_mod() {
			return {
				"class": [
					"criterion-cell",
					"overridden"
				],
				"properties": {
					"levelName": "Level 4",
					"points": 4
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
								"name": "update",
								"method": "PUT",
								"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/0.json",
								"fields": [
									{
										"type": "text",
										"name": "description",
										"value": "Proper use of grammar"
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
							"text": "You are a grammar rockstar!",
							"html": "You are a grammar rockstar!"
						},
						"actions": [
							{
								"name": "update",
								"method": "PUT",
								"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/0.json",
								"fields": [
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
							"https://rubrics.api.brightspace.com/rels/level"
						],
						"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1476.json"
					},
					{
						"rel": [
							"self"
						],
						"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623/0.json"
					},
					{
						"rel": [
							"up"
						],
						"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria/623.json"
					}
				]
			};
		}
	});
