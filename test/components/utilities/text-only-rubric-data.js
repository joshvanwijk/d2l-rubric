var base;
var overall_levels;
var overall_level_1;
var overall_level_2;
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
		'published'
	],
	'properties': {
		'name': 'Text Only Rubric'
	},
	'actions': [
		{
			'href': '/rubrics/text-only',
			'name': 'update-name',
			'method': 'PATCH',
			'fields': [
				{
					'class': [
						'required'
					],
					'type': 'text',
					'name': 'name',
					'value': 'Text Only Rubric'
				}
			]
		},
		{
			'href': '/rubrics/text-only',
			'name': 'update-score-visibility',
			'method': 'PATCH',
			'fields': [
				{
					'class': [
						'required'
					],
					'type': 'checkbox',
					'name': 'scoreVisible',
					'value': 'false'
				}
			]
		},
		{
			'href': '/rubrics/text-only',
			'name': 'update-visibility',
			'method': 'PATCH',
			'fields': [
				{
					'type': 'radio',
					'name': 'visibility',
					'value': [
						{
							'value': 'AlwaysVisible',
							'selected': false
						},
						{
							'value': 'VisibleOnceFeedbackPosted',
							'selected': true
						},
						{
							'value': 'NeverVisible',
							'selected': false
						}
					]
				}
			]
		}
	],
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
			},
			'actions': [
				{
					'href': '/rubrics/text-only',
					'name': 'update-description',
					'method': 'PATCH',
					'fields': [
						{
							'type': 'text',
							'name': 'description',
							'value': ''
						}
					]
				}
			]
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
							'href': '/rubrics/text-only/allowedAssociations/Competency',
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
							'href': '/rubrics/text-only/allowedAssociations/Competency'
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
			'href': '/rubrics/text-only'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only'
		},
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criteria-groups'
			],
			'href': '/rubrics/text-only/groups'
		},
		{
			'rel': [
				'https://api.brightspace.com/rels/organization'
			],
			'href': '/rubrics/text-only'
		},
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/overall-levels'
			],
			'href': '/rubrics/text-only/overall-levels'
		}
	]
};

overall_levels = {
	'class': [
		'collection',
		'overall-levels'
	],
	'properties': {
		'total': 2
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
				'name': 'Level 2',
				'rangeStart': 3
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
						'text': 'Proper use of grammar',
						'html': 'Proper use of grammar'
					},
					'actions': [
						{
							'href': '/rubrics/text-only/overall-levels/1',
							'name': 'update',
							'method': 'PUT',
							'fields': [
								{
									'class': [
										'required'
									],
									'type': 'hidden',
									'name': 'name',
									'value': 'Level 2'
								},
								{
									'type': 'text',
									'name': 'description',
									'value': 'Proper use of grammar'
								},
								{
									'type': 'hidden',
									'name': 'feedback',
									'value': '5 stars for proper use of grammar!'
								}
							]
						}
					]
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
						'text': '5 stars for proper use of grammar!',
						'html': '5 stars for proper use of grammar!'
					},
					'actions': [
						{
							'href': '/rubrics/text-only/overall-levels/1',
							'name': 'update',
							'method': 'PUT',
							'fields': [
								{
									'class': [
										'required'
									],
									'type': 'hidden',
									'name': 'name',
									'value': 'Level 2'
								},
								{
									'type': 'hidden',
									'name': 'description',
									'value': 'Proper use of grammar'
								},
								{
									'type': 'text',
									'name': 'feedback',
									'value': '5 stars for proper use of grammar!'
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
					'href': '/rubrics/text-only/overall-levels/1'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/overall-levels'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/text-only/overall-levels/2'
				}
			],
			'actions': [
				{
					'href': '/rubrics/text-only/overall-levels/1',
					'name': 'update',
					'method': 'PUT',
					'fields': [
						{
							'class': [
								'required'
							],
							'type': 'text',
							'name': 'name',
							'value': 'Level 2'
						},
						{
							'type': 'hidden',
							'name': 'description',
							'value': 'Proper use of grammar'
						},
						{
							'type': 'hidden',
							'name': 'feedback',
							'value': '5 stars for proper use of grammar!'
						}
					]
				},
				{
					'href': '/rubrics/text-only/overall-levels/1',
					'name': 'delete',
					'method': 'DELETE'
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
				'rangeStart': 0
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
						'text': 'Proper use of grammar',
						'html': 'Proper use of grammar'
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
						'text': '5 stars for proper use of grammar!',
						'html': '5 stars for proper use of grammar!'
					}
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/overall-levels/2'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/overall-levels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/text-only/overall-levels/1'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/overall-levels'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only'
		}
	],
	'actions': [
		{
			'href': '/rubrics/text-only/overall-levels',
			'name': 'append',
			'method': 'POST',
			'fields': [
				{
					'type': 'hidden',
					'name': 'relativePosition',
					'value': 'Append'
				}
			]
		},
		{
			'href': '/rubrics/text-only/overall-levels',
			'name': 'prepend',
			'method': 'POST',
			'fields': [
				{
					'type': 'hidden',
					'name': 'relativePosition',
					'value': 'Prepend'
				}
			]
		}
	]
};

overall_level_1 = {
	'class': [
		'overall-level'
	],
	'rel': [
		'https://rubrics.api.brightspace.com/rels/overall-level'
	],
	'properties': {
		'name': 'Level 2',
		'rangeStart': 3
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
				'text': 'Proper use of grammar',
				'html': 'Proper use of grammar'
			},
			'actions': [
				{
					'href': '/rubrics/text-only/overall-levels/1',
					'name': 'update',
					'method': 'PUT',
					'fields': [
						{
							'class': [
								'required'
							],
							'type': 'hidden',
							'name': 'name',
							'value': 'Level 2'
						},
						{
							'type': 'text',
							'name': 'description',
							'value': 'Proper use of grammar'
						},
						{
							'type': 'hidden',
							'name': 'feedback',
							'value': '5 stars for proper use of grammar!'
						}
					]
				}
			]
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
				'text': '5 stars for proper use of grammar!',
				'html': '5 stars for proper use of grammar!'
			},
			'actions': [
				{
					'href': '/rubrics/text-only/overall-levels/1',
					'name': 'update',
					'method': 'PUT',
					'fields': [
						{
							'class': [
								'required'
							],
							'type': 'hidden',
							'name': 'name',
							'value': 'Level 2'
						},
						{
							'type': 'hidden',
							'name': 'description',
							'value': 'Proper use of grammar'
						},
						{
							'type': 'text',
							'name': 'feedback',
							'value': '5 stars for proper use of grammar!'
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
			'href': '/rubrics/text-only/overall-levels/1'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/overall-levels'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/text-only/overall-levels/2'
		}
	],
	'actions': [
		{
			'href': '/rubrics/text-only/overall-levels/1',
			'name': 'update',
			'method': 'PUT',
			'fields': [
				{
					'class': [
						'required'
					],
					'type': 'text',
					'name': 'name',
					'value': 'Level 2'
				},
				{
					'type': 'hidden',
					'name': 'description',
					'value': 'Proper use of grammar'
				},
				{
					'type': 'hidden',
					'name': 'feedback',
					'value': '5 stars for proper use of grammar!'
				}
			]
		},
		{
			'href': '/rubrics/text-only/overall-levels/1',
			'name': 'delete',
			'method': 'DELETE'
		}
	]
};

overall_level_2 = {
	'class': [
		'overall-level'
	],
	'rel': [
		'https://rubrics.api.brightspace.com/rels/overall-level'
	],
	'properties': {
		'name': 'Level 1',
		'rangeStart': 0
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
				'text': 'Proper use of grammar',
				'html': 'Proper use of grammar'
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
				'text': '5 stars for proper use of grammar!',
				'html': '5 stars for proper use of grammar!'
			}
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/overall-levels/2'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/overall-levels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/text-only/overall-levels/1'
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
				'criteria-group'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criteria',
				'item'
			],
			'properties': {
				'name': 'Criteria'
			},
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/criteria'
					],
					'href': '/rubrics/text-only/groups/176/criteria'
				},
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/levels'
					],
					'href': '/rubrics/text-only/groups/176/levels'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only'
		}
	],
	'actions': [
		{
			'href': '/rubrics/text-only/groups',
			'name': 'create',
			'method': 'POST'
		}
	]
};

group_1 = {
	'class': [
		'criteria-group'
	],
	'properties': {
		'name': 'Criteria'
	},
	'actions': [
		{
			'name': 'update',
			'method': 'PUT',
			'href': '/rubrics/text-only/groups/176'
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criteria'
			],
			'href': '/rubrics/text-only/groups/176/criteria'
		},
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/levels'
			],
			'href': '/rubrics/text-only/groups/176/levels'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups'
		}
	]
};

levels = {
	'class': [
		'collection',
		'levels'
	],
	'actions': [
		{
			'name': 'append',
			'method': 'POST',
			'href': '/rubrics/text-only/groups/176/levels',
			'fields': [
				{
					'type': 'hidden',
					'name': 'relativePosition',
					'value': 'Append'
				}
			]
		},
		{
			'name': 'prepend',
			'method': 'POST',
			'href': '/rubrics/text-only/groups/176/levels',
			'fields': [
				{
					'type': 'hidden',
					'name': 'relativePosition',
					'value': 'Prepend'
				}
			]
		}
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
				'points': 0.0
			},
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/levels/1476'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/levels'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/text-only/groups/176/levels/1477'
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
				'points': 0.0
			},
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/levels/1477'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/levels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/text-only/groups/176/levels/1476'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/text-only/groups/176/levels/1478'
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
				'points': 0.0
			},
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/levels/1478'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/levels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/text-only/groups/176/levels/1477'
				},
				{
					'rel': [
						'next'
					],
					'href': '/rubrics/text-only/groups/176/levels/1479'
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
				'points': 0.0
			},
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/levels/1479'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/levels'
				},
				{
					'rel': [
						'prev'
					],
					'href': '/rubrics/text-only/groups/176/levels/1478'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/levels'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176'
		}
	]
};

level_1 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'New Level',
		'points': 0.0
	},
	'actions': [{
		'name': 'update',
		'method': 'PUT',
		'href': '/rubrics/text-only/groups/176/levels/1475',
		'fields': [{
			'class': ['required'],
			'type': 'text',
			'name': 'name',
			'value': 'New Level'
		}]
	}],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/levels/1475'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/levels'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/text-only/groups/176/levels/1476'
		}
	]
};

level_2 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'Level 4',
		'points': 0.0
	},
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/levels/1476'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/levels'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/text-only/groups/176/levels/1477'
		}
	]
};

level_3 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'Level 3',
		'points': 0.0
	},
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/levels/1477'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/levels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/text-only/groups/176/levels/1477'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/text-only/groups/176/levels/1478'
		}
	]
};

level_4 = {
	'class': [
		'level'
	],
	'properties': {
		'name': 'Level 2',
		'points': 0.0
	},
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/levels/1478'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/levels'
		},
		{
			'rel': [
				'prev'
			],
			'href': '/rubrics/text-only/groups/176/levels/1477'
		},
		{
			'rel': [
				'next'
			],
			'href': '/rubrics/text-only/groups/176/levels/1478'
		}
	]
};

criteria = {
	'class': [
		'collection',
		'criteria'
	],
	'actions': [
		{
			'name': 'create',
			'method': 'POST',
			'href': '/rubrics/text-only/groups/176/criteria',
			'fields': []
		},
		{
			'name': 'reorder',
			'method': 'POST',
			'href': '/rubrics/text-only/groups/176/criteria-reorder',
			'fields': [
				{
					'name': 'newIndex',
					'type': 'number'
				},
				{
					'name': 'oldIndex',
					'type': 'number'
				}
			]
		}
	],
	'entities': [
		{
			'class': [
				'criterion'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criterion'
			],
			'properties': {
				'name': 'Criterion 1'
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
								'text': 'Proper use of grammar',
								'html': 'Proper use of grammar'
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
							'href': '/rubrics/text-only/groups/176/levels/1476'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623/0'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623'
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
							'href': '/rubrics/text-only/groups/176/levels/1477'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623/1'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623'
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
							'href': '/rubrics/text-only/groups/176/levels/1478'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623/2'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623'
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
							'href': '/rubrics/text-only/groups/176/levels/1479'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623/3'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/623'
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria'
				}
			]
		},
		{
			'class': [
				'criterion'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criterion'
			],
			'properties': {
				'name': 'Criterion 2'
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
							'href': '/rubrics/text-only/groups/176/levels/1476'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624/0'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624'
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
							'href': '/rubrics/text-only/groups/176/levels/1477'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624/1'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624'
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
							'href': '/rubrics/text-only/groups/176/levels/1478'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624/2'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624'
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
							'href': '/rubrics/text-only/groups/176/levels/1479'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624/3'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/624'
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria'
				}
			]
		},
		{
			'class': [
				'criterion'
			],
			'rel': [
				'https://rubrics.api.brightspace.com/rels/criterion'
			],
			'properties': {
				'name': 'Criterion 3'
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
							'href': '/rubrics/text-only/groups/176/levels/1476'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625/0'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625'
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
							'href': '/rubrics/text-only/groups/176/levels/1477'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625/1'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625'
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
							'href': '/rubrics/text-only/groups/176/levels/1478'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625/2'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625'
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
							'href': '/rubrics/text-only/groups/176/levels/1479'
						},
						{
							'rel': [
								'self'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625/3'
						},
						{
							'rel': [
								'up'
							],
							'href': '/rubrics/text-only/groups/176/criteria/625'
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176'
		}
	]
};

criteria_1 = {
	'class': [
		'criterion'
	],
	'properties': {
		'name': 'Criterion 1'
	},
	'actions': [
		{
			'name': 'update',
			'method': 'PUT',
			'href': '/rubrics/text-only/groups/176/criteria/623',
			'fields': [
				{
					'class': ['required'],
					'type': 'text',
					'name': 'name',
					'value': 'Criterion 1'
				}
			]
		},
		{
			'href': '/rubrics/text-only/groups/176/criteria/623',
			'name': 'delete',
			'method': 'DELETE'
		}
	],
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
						'text': 'Proper use of grammar',
						'html': 'Proper use of grammar'
					},
					'actions': [
						{
							'name': 'update',
							'method': 'PUT',
							'href': '/rubrics/text-only/groups/176/criteria/623/0',
							'fields': [
								{
									'type': 'text',
									'name': 'description',
									'value': 'Proper use of grammar'
								},
								{
									'type': 'hidden',
									'name': 'feedback',
									'value': '5 stars for proper use of grammar!'
								}
							]
						}
					]
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
						'text': '5 stars for proper use of grammar!',
						'html': '5 stars for proper use of grammar!'
					},
					'actions': [
						{
							'name': 'update',
							'method': 'PUT',
							'href': '/rubrics/text-only/groups/176/criteria/623/0',
							'fields': [
								{
									'type': 'hidden',
									'name': 'description',
									'value': 'Proper use of grammar'
								},
								{
									'type': 'text',
									'name': 'feedback',
									'value': '5 stars for proper use of grammar!'
								}
							]
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/text-only/groups/176/levels/1476'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623/0'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623'
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
					'href': '/rubrics/text-only/groups/176/levels/1477'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623/1'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623'
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
					},
					'actions': [
						{
							'name': 'update',
							'method': 'PUT',
							'href': '/rubrics/text-only/groups/176/criteria/623/2',
							'fields': [
								{
									'type': 'text',
									'name': 'description',
									'value': ''
								},
								{
									'type': 'hidden',
									'name': 'feedback',
									'value': ''
								}
							]
						}
					]
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
					},
					'actions': [
						{
							'name': 'update',
							'method': 'PUT',
							'href': '/rubrics/text-only/groups/176/criteria/623/2',
							'fields': [
								{
									'type': 'hidden',
									'name': 'description',
									'value': ''
								},
								{
									'type': 'text',
									'name': 'feedback',
									'value': ''
								}
							]
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/text-only/groups/176/levels/1478'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623/2'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623'
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
					},
					'actions': [
						{
							'name': 'update',
							'method': 'PUT',
							'href': '/rubrics/text-only/groups/176/criteria/623/3',
							'fields': [
								{
									'type': 'text',
									'name': 'description',
									'value': ''
								},
								{
									'type': 'hidden',
									'name': 'feedback',
									'value': ''
								}
							]
						}
					]
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
					},
					'actions': [
						{
							'name': 'update',
							'method': 'PUT',
							'href': '/rubrics/text-only/groups/176/criteria/623/3',
							'fields': [
								{
									'type': 'hidden',
									'name': 'description',
									'value': ''
								},
								{
									'type': 'text',
									'name': 'feedback',
									'value': ''
								}
							]
						}
					]
				}
			],
			'links': [
				{
					'rel': [
						'https://rubrics.api.brightspace.com/rels/level'
					],
					'href': '/rubrics/text-only/groups/176/levels/1479'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623/3'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/623'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria'
		}
	]
};

criteria_2 = {
	'class': [
		'criterion'
	],
	'properties': {
		'name': 'Criterion 2'
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
					'href': '/rubrics/text-only/groups/176/levels/1476'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624/0'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624'
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
					'href': '/rubrics/text-only/groups/176/levels/1477'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624/1'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624'
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
					'href': '/rubrics/text-only/groups/176/levels/1478'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624/2'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624'
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
					'href': '/rubrics/text-only/groups/176/levels/1479'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624/3'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/624'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria'
		}
	]
};

criteria_3 = {
	'class': [
		'criterion'
	],
	'properties': {
		'name': 'Criterion 3'
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
					'href': '/rubrics/text-only/groups/176/levels/1476'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625/0'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625'
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
					'href': '/rubrics/text-only/groups/176/levels/1477'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625/1'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625'
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
					'href': '/rubrics/text-only/groups/176/levels/1478'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625/2'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625'
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
					'href': '/rubrics/text-only/groups/176/levels/1479'
				},
				{
					'rel': [
						'self'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625/3'
				},
				{
					'rel': [
						'up'
					],
					'href': '/rubrics/text-only/groups/176/criteria/625'
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria'
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
				'text': 'Proper use of grammar',
				'html': 'Proper use of grammar'
			},
			'actions': [
				{
					'name': 'update',
					'method': 'PUT',
					'href': '/rubrics/text-only/groups/176/criteria/623/0',
					'fields': [
						{
							'type': 'text',
							'name': 'description',
							'value': 'Proper use of grammar'
						},
						{
							'type': 'hidden',
							'name': 'feedback',
							'value': '5 stars for proper use of grammar!'
						}
					]
				}
			]
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
				'text': '5 stars for proper use of grammar!',
				'html': '5 stars for proper use of grammar!'
			},
			'actions': [
				{
					'name': 'update-feedback',
					'method': 'PATCH',
					'href': '/rubrics/text-only/groups/176/criteria/623/0',
					'fields': [
						{
							'type': 'text',
							'name': 'feedback',
							'value': '5 stars for proper use of grammar!'
						}
					]
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/text-only/groups/176/levels/1476'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623/0'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623'
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
			'href': '/rubrics/text-only/groups/176/levels/1477'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623/1'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623'
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
			},
			'actions': [
				{
					'name': 'update',
					'method': 'PUT',
					'href': '/rubrics/text-only/groups/176/criteria/623/2',
					'fields': [
						{
							'type': 'text',
							'name': 'description',
							'value': ''
						},
						{
							'type': 'hidden',
							'name': 'feedback',
							'value': ''
						}
					]
				}
			]
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
			},
			'actions': [
				{
					'name': 'update',
					'method': 'PUT',
					'href': '/rubrics/text-only/groups/176/criteria/623/2',
					'fields': [
						{
							'type': 'hidden',
							'name': 'description',
							'value': ''
						},
						{
							'type': 'text',
							'name': 'feedback',
							'value': ''
						}
					]
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/text-only/groups/176/levels/1478'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623/2'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623'
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
			},
			'actions': [
				{
					'name': 'update',
					'method': 'PUT',
					'href': '/rubrics/text-only/groups/176/criteria/623/3',
					'fields': [
						{
							'type': 'text',
							'name': 'description',
							'value': ''
						},
						{
							'type': 'hidden',
							'name': 'feedback',
							'value': ''
						}
					]
				}
			]
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
			},
			'actions': [
				{
					'name': 'update',
					'method': 'PUT',
					'href': '/rubrics/text-only/groups/176/criteria/623/3',
					'fields': [
						{
							'type': 'hidden',
							'name': 'description',
							'value': ''
						},
						{
							'type': 'text',
							'name': 'feedback',
							'value': ''
						}
					]
				}
			]
		}
	],
	'links': [
		{
			'rel': [
				'https://rubrics.api.brightspace.com/rels/level'
			],
			'href': '/rubrics/text-only/groups/176/levels/1479'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623/3'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/623'
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
			'href': '/rubrics/text-only/groups/176/levels/1476'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624/0'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624'
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
			'href': '/rubrics/text-only/groups/176/levels/1477'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624/1'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624'
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
			'href': '/rubrics/text-only/groups/176/levels/1478'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624/2'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624'
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
			'href': '/rubrics/text-only/groups/176/levels/1479'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624/3'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/624'
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
			'href': '/rubrics/text-only/groups/176/levels/1476'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625/0'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625'
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
			'href': '/rubrics/text-only/groups/176/levels/1477'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625/1'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625'
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
			'href': '/rubrics/text-only/groups/176/levels/1478'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625/2'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625'
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
			'href': '/rubrics/text-only/groups/176/levels/1479'
		},
		{
			'rel': [
				'self'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625/3'
		},
		{
			'rel': [
				'up'
			],
			'href': '/rubrics/text-only/groups/176/criteria/625'
		}
	]
};

export { base };
export { overall_levels };
export { overall_level_1 };
export { overall_level_2 };
export { groups };
export { group_1 };
export { levels };
export { level_1 };
export { level_2 };
export { level_3 };
export { level_4 };
export { criteria };
export { criteria_1 };
export { criteria_2 };
export { criteria_3 };
export { criteria_1_level_1 };
export { criteria_1_level_2 };
export { criteria_1_level_3 };
export { criteria_1_level_4 };
export { criteria_2_level_1 };
export { criteria_2_level_2 };
export { criteria_2_level_3 };
export { criteria_2_level_4 };
export { criteria_3_level_1 };
export { criteria_3_level_2 };
export { criteria_3_level_3 };
export { criteria_3_level_4 };
