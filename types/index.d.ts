/**
 * @fileoverview
 *
 * Additional type declarations for errors flagged by `checkJs` being enabled
 * due to anti-patterns.
 */

namespace window {
	D2L: {
		/**
		 * TS doesn't particularly like the builder pattern, so declare
		 * the `Rubric` namespace explicitly
		 */
		Rubric: object
	};
}
