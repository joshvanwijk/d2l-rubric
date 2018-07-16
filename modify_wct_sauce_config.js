var fs = require('fs');

var json_contents = {
	"plugins": {
	  "local": {
			"browsers": [{
				"browserName": "chrome"
			}],
			"browserOptions": {
        "chrome": ["headless", "disable-gpu", "no-sandbox"]
      }
		},
		"istanbul": {
      "dir": "./coverage",
      "reporters": ["text-summary", "lcov"],
      "include": [
        "**/*.js"
      ],
      "exclude": [
        "/polymer/polymer.js",
        "/platform/platform.js"
      ]
    },
	  "sauce": {
      }
    }
}

var platform_array =  [
    {
      "browserName": "chrome",
      "platform": "OS X 10.12",
      "version": ""
    },
    {
      "browserName": "chrome",
      "platform": "Windows 10",
      "version": ""
    },
    {
      "browserName": "firefox",
      "platform": "OS X 10.12",
      "version": ""
    },
    {
      "browserName": "firefox",
      "platform": "Windows 10",
      "version": ""
    },
    {
      "browserName": "safari",
      "platform": "OS X 10.12",
      "version": ""
    },
    {
      "browserName": "microsoftedge",
      "platform": "Windows 10",
      "version": ""
    },
    {
      "browserName": "internet explorer",
      "platform": "Windows 10",
      "version": ""
    }
  ]

//add two random platforms to the json
platform_array.sort(function() {return 0.5 - Math.random() });
json_contents.plugins.sauce['browsers'] = [platform_array[0]]
json_contents.plugins.sauce['browsers'].push(platform_array[1]);

fs.writeFileSync('wct.conf.json',JSON.stringify(json_contents));
