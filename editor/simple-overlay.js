/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
	_template: html`
    <style>
		:host {
			background: white;
			color: black;
			padding: 24px;
			box-shadow: rgba(0, 0, 0, 0.24) -2px 5px 12px 0px, rgba(0, 0, 0, 0.12) 0px 0px 12px 0px;
			z-index: 10000;
		}

	  	.with-margin {
            margin: 24px 40px;
        }

        .scrollable {
            border: 1px solid lightgray;
            padding: 24px;
            @apply --layout-scroll;
        }

    </style>
    <slot></slot>
`,

	is: 'simple-overlay',
	behaviors: [IronOverlayBehavior]
});
