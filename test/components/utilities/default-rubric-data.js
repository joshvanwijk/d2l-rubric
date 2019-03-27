var base;
var overall_levels;
var overall_level_1;
var overall_level_2;
var overall_level_3;
var overall_level_4;
var groups;
var group_1;
var levels;
var level_1;
var level_2;
var level_3;
var level_4;
var criteria;
var criteria_1;
var criteria_2;
var criteria_3;
var criteria_1_level_1;
var criteria_1_level_2;
var criteria_1_level_3;
var criteria_1_level_4;
var criteria_2_level_1;
var criteria_2_level_2;
var criteria_2_level_3;
var criteria_2_level_4;
var criteria_3_level_1;
var criteria_3_level_2;
var criteria_3_level_3;
var criteria_3_level_4;

base = {
	'class': [
		'rubric',
		'locked',
		'published',
		'analytic',
		'numeric'
	],
	'properties': {
		'name': 'Default Rubric',
		'outOf': 12.0
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'associations'
			],
			'rel': [
				'help'
			],
			'properties': {
				'titleLangTerm': '/rubrics.Shared:Help.hlpAssociationsTitle',
				'descriptionLangTerm': '/rubrics.Shared:Help.hlpAssociationsDescription'
			}
		},
		{
			'class': [
				'collection',
				'associations'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/allowed-associations'
			],
			'entities': [
				{
					'class': [
						'association'
					],
					'rel': [
						'item'
					],
					'title': 'Competencies',
					'properties': {
						'allowed': true
					},
					'actions': [
						{
							'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/allowedAssociations/Competency',
							'name': 'update',
							'method': 'PUT',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'allowed',
									'value': true
								}
							]
						}
					],
					'links': [
						{
							'rel': [
								'self'
							],
							'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/allowedAssociations/Competency'
						}
					]
				},
				{
					'class': [
						'association'
					],
					'rel': [
						'item'
					],
					'title': 'ePortfolio',
					'properties': {
						'allowed': true
					},
					'actions': [
						{
							'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/allowedAssociations/ePortfolio',
							'name': 'update',
							'method': 'PUT',
							'fields': [
								{
									'type': 'checkbox',
									'name': 'allowed',
									'value': true
								}
							]
						}
					],
					'links': [
						{
							'rel': [
								'self'
							],
							'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/allowedAssociations/ePortfolio'
						}
					]
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric'
		},
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criteria-groups'
			],
			'href': '/rubrics/default-rubric/groups'
		},
		{
			'rel': [
				'https://api.brightspace.com/rels/organization'
			],
			'href': '/rubrics/default-rubric'
		},
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/overall-levels'
			],
			'href': '/rubrics/default-rubric/overallLevels'
		}
	],
	'actions': [
		{
			'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/197',
			'name': 'update-visibility',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'radio',
					'name': 'visibility',
					'value': [
						{
							'value': 'AlwaysVisible',
							'selected': true
						},
						{
							'value': 'VisibleOnceFeedbackPosted',
							'selected': false
						},
						{
							'value': 'NeverVisible',
							'selected': false
						}
					]
				}
			]
		},
		{
			'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/197',
			'name': 'update-score-visibility',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'checkbox',
					'name': 'scoreVisible',
					'value': true
				}
			]
		},
		{
			'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/197',
			'name': 'update-status',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'radio',
					'name': 'rubric-status',
					'value': [
						{
							'value': 'Published',
							'title': 'Published',
							'selected': true
						},
						{
							'value': 'Archived',
							'title': 'Archived',
							'selected': false
						},
						{
							'value': 'Draft',
							'title': 'Draft',
							'selected': false
						}
					]
				}
			]
		}
	]
};

overall_levels = {
	'class': [
		'collection',
		'overall-levels'
	],
	'properties': {
		'total': 4
	},
	'entities': [
		{
			'class': [
				'overall-level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/overall-level'
			],
			'properties': {
				'name': 'Level 4',
				'rangeStart': 11.0
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/overallLevels/1467'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/overallLevels'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/default-rubric/overallLevels/1466'
				}
			]
		},
		{
			'class': [
				'overall-level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/overall-level'
			],
			'properties': {
				'name': 'Level 3',
				'rangeStart': 8.0
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/overallLevels/1466'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/overallLevels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/default-rubric/overallLevels/1467'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/default-rubric/overallLevels/1465'
				}
			]
		},
		{
			'class': [
				'overall-level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/overall-level'
			],
			'properties': {
				'name': 'Level 2',
				'rangeStart': 5.0
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/overallLevels/1465'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/overallLevels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/default-rubric/overallLevels/1466'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/default-rubric/overallLevels/1464'
				}
			]
		},
		{
			'class': [
				'overall-level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/overall-level'
			],
			'properties': {
				'name': 'Level 1',
				'rangeStart': 0.0
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/overallLevels/1464'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/overallLevels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/default-rubric/overallLevels/1465'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/overallLevels'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric'
		}
	]
};

overall_level_1 = {
	'class': [
		'overall-level'
	],
	'properties': {
		'name': 'Level 4',
		'rangeStart': 11.0
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/overallLevels/1467'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/overallLevels'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/default-rubric/overallLevels/1466'
		}
	]
};

overall_level_2 = {
	'class': [
		'overall-level'
	],
	'properties': {
		'name': 'Level 3',
		'rangeStart': 8.0
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/overallLevels/1466'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/overallLevels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/default-rubric/overallLevels/1467'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/default-rubric/overallLevels/1465'
		}
	]
};

overall_level_3 = {
	'class': [
		'overall-level'
	],
	'properties': {
		'name': 'Level 2',
		'rangeStart': 5.0
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/overallLevels/1465'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/overallLevels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/default-rubric/overallLevels/1466'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/default-rubric/overallLevels/1464'
		}
	]
};

overall_level_4 = {
	'class': [
		'overall-level'
	],
	'properties': {
		'name': 'Level 1',
		'rangeStart': 0.0
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/overallLevels/1464'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/overallLevels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/default-rubric/overallLevels/1465'
		}
	]
};

groups = {
	'class': [
		'collection',
		'criteria-groups'
	],
	'entities': [
		{
			'class': [
				'criteria-group',
				'numeric'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criteria',
				'item'
			],
			'properties': {
				'name': 'Criteria',
				'outOf': 12.0
			},
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/criteria'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria'
				},
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/levels'
					],
					'href': '/rubrics/default-rubric/groups/174/levels'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric'
		}
	]
};

group_1 = {
	'class': [
		'criteria-group',
		'numeric'
	],
	'properties': {
		'name': 'Criteria',
		'outOf': 12.0
	},
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criteria'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria'
		},
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/levels'
			],
			'href': '/rubrics/default-rubric/groups/174/levels'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups'
		}
	]
};

levels = {
	'class': [
		'collection',
		'levels'
	],
	'properties': {
		'total': 4
	},
	'entities': [
		{
			'class': [
				'level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'properties': {
				'name': 'Level 4',
				'points': 4.0
			},
			'actions': [
				{
					'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1460',
					'name': 'delete',
					'method': 'DELETE'
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1460'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/levels'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1461'
				}
			]
		},
		{
			'class': [
				'level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'properties': {
				'name': 'Level 3',
				'points': 3.0
			},
			'actions': [
				{
					'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1461',
					'name': 'delete',
					'method': 'DELETE'
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1461'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/levels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1460'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1462'
				}
			]
		},
		{
			'class': [
				'level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'properties': {
				'name': 'Level 2',
				'points': 2.0
			},
			'actions': [
				{
					'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1462',
					'name': 'delete',
					'method': 'DELETE'
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1462'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/levels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1461'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1463'
				}
			]
		},
		{
			'class': [
				'level'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'properties': {
				'name': 'Level 1',
				'points': 1.0
			},
			'actions': [
				{
					'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1463',
					'name': 'delete',
					'method': 'DELETE'
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1463'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/levels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1462'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/levels'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174'
		}
	]
};

level_1 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'Level 1',
		'points': 1.0
	},
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1463'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/levels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1462'
		}
	],
	'actions': [
		{
			'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1463',
			'name': 'delete',
			'method': 'DELETE'
		}
	]
};

level_2 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'Level 2',
		'points': 2.0
	},
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1462'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/levels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1461'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1463'
		}
	],
	'actions': [
		{
			'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1462',
			'name': 'delete',
			'method': 'DELETE'
		}
	]
};

level_3 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'Level 3',
		'points': 3.0
	},
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1461'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/levels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1460'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1462'
		}
	],
	'actions': [
		{
			'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1461',
			'name': 'delete',
			'method': 'DELETE'
		}
	]
};

level_4 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'Level 4',
		'points': 4.0
	},
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1460'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/levels'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1461'
		}
	],
	'actions': [
		{
			'href': 'https://619e40dd-5f06-45aa-b45f-97d035a7ef96.rubrics.api.dev.brightspace.com/131646/groups/174/levels/1460',
			'name': 'delete',
			'method': 'DELETE'
		}
	]
};

criteria = {
	'class': [
		'collection',
		'criteria'
	],
	'entities': [
		{
			'class': [
				'criterion',
				'numeric'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criterion'
			],
			'properties': {
				'name': 'Criterion 1',
				'outOf': 4.0
			},
			'entities': [
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 4'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1460'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617/0'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 3'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1461'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617/1'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 2'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1462'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617/2'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 1'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1463'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617/3'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/617'
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria'
				}
			]
		},
		{
			'class': [
				'criterion',
				'numeric'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criterion'
			],
			'properties': {
				'name': 'Criterion 2',
				'outOf': 4.0
			},
			'entities': [
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 4'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1460'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618/0'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 3'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1461'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618/1'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 2'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1462'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618/2'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 1'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1463'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618/3'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/618'
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria'
				}
			]
		},
		{
			'class': [
				'criterion',
				'numeric'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criterion'
			],
			'properties': {
				'name': 'Criterion 3',
				'outOf': 4.0
			},
			'entities': [
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 4'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1460'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619/0'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 3'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1461'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619/1'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 2'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1462'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619/2'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619'
						}
					]
				},
				{
					'class': [
						'criterion-cell'
					],
					'rel': [
						'item',
						'https://rubrics.api.brightspace.com/rels/criterion-cell'
					],
					'properties': {
						'levelName': 'Level 1'
					},
					'entities': [
						{
							'class': [
								'richtext',
								'description'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						},
						{
							'class': [
								'richtext',
								'feedback'
							],
							'rel': [
								'item'
							],
							'properties': {
								'text': '',
								'html': ''
							}
						}
					],
					'links': [
						{
							'rel': [
								'https://rubrics.api.brightspace.com/rels/level'
							],
							'href': '/rubrics/default-rubric/groups/174/levels/1463'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619/3'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/default-rubric/groups/174/criteria/619'
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174'
		}
	]
};

criteria_1 = {
	'class': [
		'criterion',
		'numeric'
	],
	'properties': {
		'name': 'Criterion 1',
		'outOf': 4.0
	},
	'entities': [
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 4'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1460'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617/0'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 3'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1461'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617/1'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 2'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1462'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617/2'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 1'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1463'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617/3'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/617'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria'
		}
	]
};

criteria_2 = {
	'class': [
		'criterion',
		'numeric'
	],
	'properties': {
		'name': 'Criterion 2',
		'outOf': 4.0
	},
	'entities': [
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 4'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1460'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618/0'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 3'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1461'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618/1'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 2'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1462'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618/2'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 1'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1463'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618/3'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/618'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria'
		}
	]
};

criteria_3 = {
	'class': [
		'criterion',
		'numeric'
	],
	'properties': {
		'name': 'Criterion 3',
		'outOf': 4.0
	},
	'entities': [
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 4'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1460'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619/0'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 3'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1461'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619/1'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 2'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1462'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619/2'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619'
				}
			]
		},
		{
			'class': [
				'criterion-cell'
			],
			'rel': [
				'item',
				'https://rubrics.api.brightspace.com/rels/criterion-cell'
			],
			'properties': {
				'levelName': 'Level 1'
			},
			'entities': [
				{
					'class': [
						'richtext',
						'description'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				},
				{
					'class': [
						'richtext',
						'feedback'
					],
					'rel': [
						'item'
					],
					'properties': {
						'text': '',
						'html': ''
					}
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/default-rubric/groups/174/levels/1463'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619/3'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/default-rubric/groups/174/criteria/619'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria'
		}
	]
};

criteria_1_level_1 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 4'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1460'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617/0'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617'
		}
	]
};

criteria_1_level_2 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 3'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1461'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617/1'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617'
		}
	]
};

criteria_1_level_3 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 2'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1462'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617/2'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617'
		}
	]
};

criteria_1_level_4 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 1'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1463'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617/3'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/617'
		}
	]
};

criteria_2_level_1 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 4'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1460'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618/0'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618'
		}
	]
};

criteria_2_level_2 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 3'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1461'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618/1'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618'
		}
	]
};

criteria_2_level_3 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 2'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1462'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618/2'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618'
		}
	]
};

criteria_2_level_4 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 1'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1463'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618/3'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/618'
		}
	]
};

criteria_3_level_1 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 4'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1460'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619/0'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619'
		}
	]
};

criteria_3_level_2 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 3'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1461'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619/1'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619'
		}
	]
};

criteria_3_level_3 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 2'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1462'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619/2'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619'
		}
	]
};

criteria_3_level_4 = {
	'class': [
		'criterion-cell'
	],
	'properties': {
		'levelName': 'Level 1'
	},
	'entities': [
		{
			'class': [
				'richtext',
				'description'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		},
		{
			'class': [
				'richtext',
				'feedback'
			],
			'rel': [
				'item'
			],
			'properties': {
				'text': '',
				'html': ''
			}
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/default-rubric/groups/174/levels/1463'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619/3'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/default-rubric/groups/174/criteria/619'
		}
	]
};

export { base };
export { overall_levels };
export { overall_level_1 };
export {  overall_level_2 };
export {  overall_level_3 };
export {  overall_level_4 };
export {  groups };
export {  group_1 };
export {  levels };
export {  level_1 };
export {  level_2 };
export {  level_3 };
export {  level_4 };
export {  criteria };
export {  criteria_1 };
export {  criteria_2 };
export {  criteria_3 };
export {  criteria_1_level_1 };
export {  criteria_1_level_2 };
export {  criteria_1_level_3 };
export {  criteria_1_level_4 };
export {  criteria_2_level_1 };
export {  criteria_2_level_2 };
export {  criteria_2_level_3 };
export {  criteria_2_level_4 };
export {  criteria_3_level_1 };
export {  criteria_3_level_2 };
export {  criteria_3_level_3 };
export {  criteria_3_level_4 };
