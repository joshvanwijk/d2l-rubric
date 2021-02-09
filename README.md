# d2l-rubric

[![Build Status](https://travis-ci.org/Brightspace/d2l-rubric.svg?branch=master)](https://travis-ci.org/Brightspace/d2l-rubric)

Polymer based web-component to display a rubric

## Prerequisites

- NPM (Installs with [NodeJS](https://nodejs.org))

## Setup

Run `npm i` in project root directory

## Version Bump

Run `npm version --no-git-tag-version [major | minor | patch]` in project
root directory, selecting the appropriate version increase type. This will bump
the version in both `package.json` and `package-lock.json` and leave it in your
working changes.

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


## Lang Term Update

#### Adding an new lang term

 1. Add the new term to `/lang/en.json`
 2. Run `npm run lang:copy` (this will copy term to other files)
 3. Manually add french translations to `/lang/fr.json` (google translate. This is in case auto-translations don't run in time, if we don't have french, we can get fined)
 4. Run `npm run lang:build`
 5. Run `npm run lang:lint -- --fix`


#### Modifying a lang term

 1. Modify the term in `/lang/en.json`
 2. Run `npm run lang:copy -- term1 term2...` (where `term1,term2` are the terms you'd like to modify).
 3. Manually modify french translations to `/lang/fr.json`
 4. Run `npm run lang:build`
 5. Run `npm run lang:lint -- --fix`





