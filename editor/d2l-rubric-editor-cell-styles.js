import '@polymer/polymer/polymer-legacy.js';
import 'd2l-table/d2l-table-shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-rubric-editor-cell-styles">
  <template>
	<style>
		:host {
			--d2l-rubric-editor-start-gutter-width: 1.5rem;
			--d2l-rubric-editor-end-gutter-width: 2.5rem; /* trash can width = 50px including halo */
		}

		#scroll-wrapper {
			--d2l-scroll-wrapper-background-color: var(--d2l-table-header-background-color);
			--d2l-scroll-wrapper-border-color: var(--d2l-color-galena);

			--d2l-scroll-wrapper-h-scroll: {
				overflow-y: hidden;
				border-left: 1px dashed var(--d2l-color-galena);
				border-right: 1px dashed var(--d2l-color-galena);
				margin-left: var(--d2l-rubric-editor-start-gutter-width);
				margin-right: var(--d2l-rubric-editor-end-gutter-width);
			};

			--d2l-scroll-wrapper-sticky: {
				margin-left: var(--d2l-rubric-editor-start-gutter-width);
				margin-right: var(--d2l-rubric-editor-end-gutter-width);
			};

			--d2l-scroll-wrapper-left: {
				overflow-y: hidden;
				border-left: none;
				margin-left: unset;
			};

			--d2l-scroll-wrapper-right: {
				overflow-y: hidden;
				border-right: none;
				margin-right: unset;
			};

		}

		.cell {
			border-right: 1px solid var(--d2l-color-galena);
			border-top: 1px solid var(--d2l-color-galena);
			flex: 1 1 0%;
			/* Min width chosen so that 4 levels are visible in standard LMS tab layout.
			After 4 levels scrolling will kick in */
			min-width: 8rem;
		}

		:dir(rtl) .cell {
			/* border-right: none;
			border-left: var(--d2l-table-border); */
		}

		.gutter-left, .gutter-right {
			flex: 0 0 auto;
			width: var(--d2l-rubric-editor-start-gutter-width);
			padding: 0;
			text-align: center;
		}

		.gutter-right {
			width: var(--d2l-rubric-editor-end-gutter-width);
		}

		.col-first {
			border-left: 1px solid var(--d2l-color-galena);
			flex: 0 0 auto;
			width: 10.5rem;
			min-width: auto;
			padding: 0;
		}

		:dir(rtl) .col-last {
			border-left: 1px solid var(--d2l-color-galena);
		}

		.col-last {
			flex: 0 0 auto;
			min-width: auto;
			width: 6rem;
		}

		.col-last[text-only] {
			width: calc(1rem + 2.2rem); /* button width = 44px including border */
		}

		:dir(rtl) .col-first {
			border-left: none;
		}

	</style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
