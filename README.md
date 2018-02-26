# d2l-rubric
[![Build Status](https://travis-ci.org/Brightspace/d2l-rubric.svg?branch=master)](https://travis-ci.org/Brightspace/d2l-rubric)

Polymer based web-component to display a rubric

## Usage
Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import `d2l-rubric.html`:

#####Display a Rubric without it's title:
```html
<head>
	<link rel="import" href="../d2l-rubric/d2l-rubric.html">
	<d2l-rubric href="href for rubric" token="User token"/>
</head>
```
#####Display a Rubric with it's title:
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

## Viewing Your Element

```
$ polymer serve
```

The demo can be viewed at http://127.0.0.1:8081/#/elements/d2l-rubric/demos/demo/index.html

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
