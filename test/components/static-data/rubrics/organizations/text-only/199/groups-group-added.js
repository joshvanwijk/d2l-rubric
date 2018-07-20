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
                        "criteria-group"
                    ],
                    "rel": [
                        "https://rubrics.api.brightspace.com/rels/criteria",
                        "item"
                    ],
                    "properties": {
                        "name": "Criteria 1"
                    },
                    "links": [
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/criteria"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups/176/criteria.json"
                        },
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/levels"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups/176/levels.json"
                        },
                        {
                            "rel": [
                                "self"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups/176.json"
                        },
                        {
                            "rel": [
                                "up"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups.json"
                        }
                    ]
                },
                {
                    "class": [
                        "criteria-group"
                    ],
                    "rel": [
                        "https://rubrics.api.brightspace.com/rels/criteria",
                        "item"
                    ],
                    "properties": {
                        "name": "Criteria 2"
                    },
                    "links": [
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/criteria"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups/183/criteria.json"
                        },
                        {
                            "rel": [
                                "https://rubrics.api.brightspace.com/rels/levels"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups/183/levels.json"
                        },
                        {
                            "rel": [
                                "self"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups/183.json"
                        },
                        {
                            "rel": [
                                "up"
                            ],
                            "href": "static-data/rubrics/organizations/text-only/199/groups.json"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "rel": [
                        "self"
                    ],
                    "href": "static-data/rubrics/organizations/text-only/199/groups.json"
                },
                {
                    "rel": [
                        "up"
                    ],
                    "href": "static-data/rubrics/organizations/text-only/199.json"
                }
            ],
            "actions": [
                {
                    "href": "static-data/rubrics/organizations/text-only/199/groups.json",
                    "name": "create",
                    "method": "POST"
                }
            ]
        };
    }
});
