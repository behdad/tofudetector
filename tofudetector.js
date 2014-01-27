	/**
	 * Detect tofu
	 *
	 * Create a temporary span in the page with fontsize 72px and font-family
	 * sans-serif for each letter of the text.
	 * For each of these spans, calculate the width and height. If they are same
	 * for all spans, we can understand that each of the letter is rendered using
	 * same glyph - it must be a tofu.
	 *
	 * @param {string} text
	 * @return {boolean}
	 */
	function detectTofu( text ) {
		var index,
			$fixture,
			width = {},
			height = {},
			length = Math.min( 4, text.length ),
			detected = false;

		$fixture = $( '<span>' )
			.css( {
				fontSize: '72px',
				fontFamily: 'sans-serif'
			} )
			.appendTo( 'body' );

		for ( index = 0; index < length; index++ ) {
			$fixture.text( text[index] );
			width[index] = $fixture.width() || width[index-1];
			height[index] = $fixture.height();

			if( index > 0 &&
				( width[index] !== width[index - 1] ||
					height[index] !== height[index - 1] )
			) {
				detected = false;
				break;
			}
		}

		$fixture.remove();

		if ( index === length ) {
			detected = true;
		}

		return detected;
	}
