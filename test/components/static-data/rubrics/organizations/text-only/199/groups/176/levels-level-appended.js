/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get level_appended() {
		return {
			"class": [
				"collection",
				"levels"
			],
			"actions": [
				{
					"name": "append",
					"method": "POST",
					"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels.json",
					"fields": [
						{
							"type": "hidden",
							"name": "relativePosition",
							"value": "Append"
						}
					]
				},
				{
					"name": "prepend",
					"method": "POST",
					"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels.json",
					"fields": [
						{
							"type": "hidden",
							"name": "relativePosition",
							"value": "Prepend"
						}
					]
				}
			],
			"properties": {
				"total": 5
			},
			"entities": [
				{
					"class": [
						"level"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 4",
						"points": 0.0
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1476.json"
						},
						{
							"rel": [
								"up"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels.json"
						},
						{
							"rel": [
								"next"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1477.json"
						}
					]
				},
				{
					"class": [
						"level"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 3",
						"points": 0.0
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1477.json"
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
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1476.json"
						},
						{
							"rel": [
								"next"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1478.json"
						}
					]
				},
				{
					"class": [
						"level"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 2",
						"points": 0.0
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1478.json"
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
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1479.json"
						}
					]
				},
				{
					"class": [
						"level"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 1",
						"points": 0.0
					},
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
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1478.json"
						},
						{
							"rel": [
								"next"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1480.json"
						}
					]
				},
				{
					"class": [
						"level"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "New Level",
						"points": 0.0
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1480.json"
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
							"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels/1479.json"
						}
					]
				},
			],
			"links": [
				{
					"rel": [
						"self"
					],
					"href": "static-data/rubrics/organizations/text-only/199/groups/176/levels.json"
				},
				{
					"rel": [
						"up"
					],
					"href": "static-data/rubrics/organizations/text-only/199/groups/176.json"
				}
			]
		};
	}
});
