/*
`d2l-rubric-loading`
Polymer Web-Component to display a loading rubric

*/
import '@brightspace-ui/core/components/loading-spinner/loading-spinner.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="d2l-rubric-loading">
	<template strip-whitespace="">
		<style>
		.out-of-container {
			margin-top: 24px;
			border: 1px solid var(--d2l-color-mica);
			border-radius: 8px;
			text-align: right;
		}

		.spinner-container {
			border: 1px solid var(--d2l-color-mica);
			border-radius: 8px;
		}
		.spinner-top {
			border-bottom: transparent;
			background-color: var(--d2l-color-regolith);
			height: 40px;
		}
		.spinner-bottom {
			align-content: center;
			height: 140px;
			text-align: center;
			vertical-align: middle;
		}
		.spinner {
			padding-top: 20px;
		}
		</style>
		<div class="spinner-container">
				<div class="spinner-top"></div>
				<div class="spinner-bottom">
					<d2l-loading-spinner class="spinner" size="100">
				</d2l-loading-spinner></div>
		</div>
	
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-rubric-loading'

});
