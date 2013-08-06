/*!
 * wQuery JavaScript Library v1.0.0 alpha
 * https://www.weezeel.com/
 */

var WQConstructor;

!function () {

	var version = "1.0.0 alpha",
		wQuery = {};

	wQuery = function () {

		var a = [];

		a.__proto__ = this;

		this.version = version;

		/* SetContext process
		// Set the property context of the future wQuery objects
		*/
		this.__defineGetter__('setContext', function () {

			return function ( id ) {

				var ctx;

				if ( id.atChar(0) == '#' ) {

					ctx = document.getElementById( id.split('#')[0] );

				} else if ( id.atChar(0) != '<' && id.atChar(0) != '.' ) {

					ctx = document.getElementById( id );

				}

				this.__defineGetter__('context', function () {
					return ctx;
				});

				this.__defineSetter__('context', function () {
					var err = "wQuery ERR: You can't modify this property";
				});

			}

		});

		this.__defineSetter__('setContext', function () {
			var err = "wQuery ERR: You can't modify this method";
			throw err;
		});

		/* init function
		// Create a new wQuery object with the same sintax 
		*/
		this.__defineGetter__('init', function () {

			var self = this;

			return function ( selector ) {

				var match, elem;

					if ( !selector ) {
					
						return self;
					
					} else if ( typeof selector === "string" ) {

						if ( !self.context ) {

							match = document.querySelectorAll('#wz');

							for (var i = 0; i < match.length; i++) {
								a[i] = match[i]
							};

							return a;

						} else if ( context ) {

							match = self.context.querySelectorAll(selector);

							for (var i = 0; i < match.length; i++) {
								self[i] = match[i]
							};

							return self;

						}

					} else if ( typeof selector === "function") {

						console.log(1);
						document.getElementTagName('body').onload = selector();

					}

			}

		});

		this.__defineSetter__('init', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

	}

	WQConstructor = new wQuery();

}();

var wQuery = function ( selector ) {

	return new WQConstructor.init( selector );

}