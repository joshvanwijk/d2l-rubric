/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get level_prepended() {
		return {
			"class": [
				"collection",
				"levels"
			],
			"actions": [
				{
					"name": "append",
					"method": "POST",
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels.json",
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
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels.json",
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
						"level",
						"overridden"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "New Level"
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1475.json"
						},
						{
							"rel": [
								"up"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels.json"
						},
						{
							"rel": [
								"next"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1476.json"
						}
					]
				},
				{
					"class": [
						"level",
						"overridden"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 4"
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1476.json"
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
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1475.json"
						},
						{
							"rel": [
								"next"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1477.json"
						}
					]
				},
				{
					"class": [
						"level",
						"overridden"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 3"
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1477.json"
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
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1476.json"
						},
						{
							"rel": [
								"next"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1478.json"
						}
					]
				},
				{
					"class": [
						"level",
						"overridden"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 2"
					},
					"links": [
						{
							"rel": [
								"self"
							],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1478.json"
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
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1479.json"
						}
					]
				},
				{
					"class": [
						"level",
						"overridden"
					],
					"rel": [
						"https://rubrics.api.brightspace.com/rels/level"
					],
					"properties": {
						"name": "Level 1"
					},
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
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels/1478.json"
						}
					]
				}
			],
			"links": [
				{
					"rel": [
						"self"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels.json"
				},
				{
					"rel": [
						"up"
					],
					"href": "static-data/rubrics/organizations/custom-points/199/groups/176.json"
				}
			]
		};
	}
});
