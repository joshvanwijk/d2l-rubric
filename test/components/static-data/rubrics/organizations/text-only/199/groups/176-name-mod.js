/*eslint quotes: 0 */
window.testFixtures = window.testFixtures || {};

Object.assign(window.testFixtures, {
	get group_name_mod() {
        return {
            "class": [
                "criteria-group"
            ],
            "properties": {
                "name": "New Group Name"
            },
            "actions": [
                {
                    "name": "update",
                    "method": "PUT",
                    "href": "static-data/rubrics/organizations/text-only/199/groups/176.json"                    
                }
            ],
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
        }
    }
});