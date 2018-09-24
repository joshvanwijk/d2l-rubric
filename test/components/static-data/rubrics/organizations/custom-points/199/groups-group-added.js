/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get criteria_group_added() {
		return {
            "class": [
                "collection",
                "criteria-groups"
            ],
            "entities": [
                {
                    "class": [
						"criteria-group",
						"numeric"
                    ],
                    "rel": [
                        "https://rubrics.api.brightspace.com/rels/criteria",
                        "item"
                    ],
                    "properties": {
						"name": "Criteria 1",
						"outOf": 12
                    },
                    "links": [
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/criteria"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/criteria.json"
                        },
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/levels"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176/levels.json"
                        },
                        {
                            "rel": [
                                "self"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/176.json"
                        },
                        {
                            "rel": [
                                "up"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups.json"
                        }
                    ]
                },
                {
                    "class": [
						"criteria-group",
						"numeric"
                    ],
                    "rel": [
                        "https://rubrics.api.brightspace.com/rels/criteria",
                        "item"
                    ],
                    "properties": {
						"name": "Criteria 2",
						"outOf": 12
                    },
                    "links": [
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/criteria"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/183/criteria.json"
                        },
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/levels"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/183/levels.json"
                        },
                        {
                            "rel": [
                                "self"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups/183.json"
                        },
                        {
                            "rel": [
                                "up"
                            ],
							"href": "static-data/rubrics/organizations/custom-points/199/groups.json"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "rel": [
                        "self"
                    ],
					"href": "static-data/rubrics/organizations/custom-points/199/groups.json"
                },
                {
                    "rel": [
                        "up"
                    ],
					"href": "static-data/rubrics/organizations/custom-points/199.json"
                }
            ],
            "actions": [
                {
					"href": "static-data/rubrics/organizations/custom-points/199/groups.json",
                    "name": "create",
                    "method": "POST"
                }
            ]
        };
    }
});
