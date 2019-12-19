# d2l-rubric
[![Build Status](https://travis-ci.org/Brightspace/d2l-rubric.svg?branch=master)](https://travis-ci.org/Brightspace/d2l-rubric)

Polymer based web-component to display a rubric

## Usage
Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import `d2l-rubric.html`:

##### Display a Rubric without its title:
```html
<head>
	<link rel="import" href="../d2l-rubric/d2l-rubric.html">
	<d2l-rubric href="href for rubric" token="User token"/>
</head>
```

##### Display a Rubric with its title:
```html
<head>
	<link rel="import" href="../d2l-rubric/d2l-rubric.html">
	<link rel="import" href="../d2l-rubric/d2l-rubric-title.html">
	<d2l-rubric href="href for rubric" token="User token">
		<h3>
			<d2l-rubric-title href="href for rubric" token="User token"/>
		</h3>
	</d2l-rubric>
</head>
```

#### Display a Rubric with an assessment:
```html
<head>
	<link rel="import" href="../d2l-rubric/d2l-rubric.html">
	<d2l-rubric
		href="href for rubric"
		token="User token"
		assessment-href="href for assessment"
	/>
</head>
```

#### Display a Rubric with a read-only assessment:
Normally user permissions are used to determine which actions are available on an assessment
 (i.e. teacher vs student view of an assessment). However, you can have a teacher be able to
 see the assessment in readonly where they can't change feedback or assess levels.
 ```html
<head>
	<link rel="import" href="../d2l-rubric/d2l-rubric.html">
	<d2l-rubric
		href="href for rubric"
		token="User token"
		assessment-href="href for assessment"
		read-only
	/>
</head>
```

## Viewing Your Element

```
$ polymer serve
```

The demo can be viewed at http://127.0.0.1:8081/components/d2l-rubric/demo/index.html

The d2l-rubric-editor demo can be viewed at http://127.0.0.1:8081/components/d2l-rubric/demo/d2l-rubric-editor.html
To test outcome inside editor, change the URL and Token point to local LMS inside d2l-rubric-editor.html(inside demo file)

## Running Tests

```
$ npm run test:wct:local
```
#### Updating Test and Demo Data
The data used for the demo and for running test can be updated from QA sites.

```
$ npm run regenerate_data <qa site url> <daily pwd> (optional: copy_files)
```
If the optional argument copy_files is specified, the generated files will be automatically copied to the demo and test folders, otherwise they will stay in the regen_api_data folder
