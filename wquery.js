/*!
 * wQuery JavaScript Library v1.0.0 alpha
 * https://www.weezeel.com/
 */

var WQConstructor;

!function () {

	var version = "2.0.0 alpha",
		wQuery  = {},
		WQTools = {

			/* removeDuplicated function
			// Remove duplicated elements from an array
			*/
			removeDuplicated: function ( array ) {

				var catche = [];

				for (var i = 0; i < array.length; i++) {
					
					if( catche.indexOf( array[i] ) < 0 ) {

						catche.push( array[i] );

					} 

				};

				return catche;

			}

		};

	wQuery  = function () {

		this.version = version;

	   /*  SetContext process
		*  Set the property context of the future wQuery objects
		*/
		this.__defineGetter__('setContext', function () {

			return function ( id ) {

				var ctx;

				if ( id.charAt(0) == '#' ) {

					ctx = document.getElementById( id.split('#')[1] );

					this.__defineGetter__('context', function () {
						return ctx;
					});

					this.__defineSetter__('context', function () {
						var err = "wQuery ERR: You can't modify this property";
						throw err;
					});

				} else {
					var err = "wQuery ERR: Context declaration is wrong";
					throw err;
				}

			}

		});

		this.__defineSetter__('setContext', function () {
			var err = "wQuery ERR: You can't modify this method";
			throw err;
		});

	   /*  init function
		*  Create a new wQuery object with the same syntax 
		*/
		this.__defineGetter__('init', function () {

			var self = this;

			return function ( selector ) {

				var match, elem;

				if ( !selector ) {
				
					return self;
				
				} else if ( typeof selector === "string" ) {

					var a = [];
					a.__proto__= new wQuery();

					if ( !self.context ) {

						match = document.querySelectorAll(selector);

						self.__defineGetter__('elements', function () {
							var array = [];

							for (var i = 0; i < match.length; i++) {
								array.push(match[i]);
							};

							return array;
						});

						self.__defineSetter__('elements', function () {
							var err = "You can't modify this property";
							throw err;
						});

						for (var i = 0; i < match.length; i++) {
							a[i] = match[i]
						};

						return a;

					} else if ( self.context ) {

						match = self.context.querySelectorAll(selector);

						self.__defineGetter__('elements', function () {
							return match;
						});

						self.__defineSetter__('elements', function () {
							var err = "You can't modify this property";
							throw err;
						});

						for (var i = 0; i < match.length; i++) {
							a[i] = match[i]
						};

						return a;

					}

				} else if ( typeof selector === "function") {

					window.onload = selector;
				
				}

			}

		});

		this.__defineSetter__('init', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

	   /*  parent function
		*  Returns the parent of the current element
		*/

		this.__defineGetter__('parent', function () {

			var self = this;

			return function () {

				if ( !self.context ) {

					for (var i = 0; i < self.length; i++) {
						self[i] = self[i].parentNode;
					};

					var parents = WQTools.removeDuplicated(self);

					this.__defineGetter__('elements', function () {
						var array = [];

						for (var i = 0; i < parents.length; i++) {
							array.push(parents[i]);
						};

						return array;
					});

					this.__defineSetter__('elements', function () {
						var err = "wQuery ERR: You can't modify this property";
						throw err;
					});

					parents.__proto__ = new wQuery();
					self = parents;

					return parents;

				} else {

					var parents = [];

					for (var i = 0; i < self.length; i++) {
					
						var node = self[i].parentNode;

						while( node != null) {

							if ( node == self.context ) {

								parents.push(node);
								node = null;

							} else if ( node == document.getElementById('body') ) {

								node = null;

							} else {

								node = node.parentNode;

							}

						}
					
					};

					parents = WQTools.removeDuplicated(parents);

					self.__defineGetter__('elements', function () {
						var array = [];

						for (var i = 0; i < parents.length; i++) {
							array.push(parents[i]);
						};

						return array;
					});

					self.__defineSetter__('elements', function () {
						var err = "wQuery ERR: You can't modify this property";
						throw err;
					});

					parents.__proto__ = new wQuery();
					self = parents;

					return parents;

				}

			};

		});

		this.__defineSetter__('parent', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

	   /* parents function
		* Returns all the parents for the selected elements
		*/

		this.__defineGetter__('parents', function () {

			var self = this;

			return function () {

				if ( !self.context ) {

					var parents = [];

					for (var i = 0; i < self.length; i++) {
						
						var node = self[0].parentNode;

						while ( node != null ) {

							if ( node == document.getElementById('body') ) {

								parents.push(node);
								node = null;

							} else {

								parents.push(node);
								node = node.parentNode;

							};

						}

					};

					self.__defineGetter__('elements', function () {
						var array = [];

						for (var i = 0; i < parents.length; i++) {
							array.push(parents[i]);
						};

						return array;

					});

					self.__defineSetter__('elements', function () {
						var err = "wQuery ERR: You can't modify this property";
						throw err;
					});

					parents = WQTools.removeDuplicated(parents);
					parents.__proto__ = new wQuery();

					self = parents;

					return parents;

				} else {

					var parents = [];
					var eachPar = [];

					for (var i = 0; i < self.length; i++) {
						
						var node = self[i].parentNode;

						while ( node != null ) {

							if ( node == document.getElementsByTagName('body') ) {

								eachPar = [];
								node = null;

							} else if ( node == self.context ) {

								parents.push( node );
								eachPar = [];

								for (var i = 0; i < eachPar.length; i++) {
									parents.push( eachPar[i] );
								};

								node = null;

							} else {

								parents.push( self[i] );
								node = node.parentNode;

							}

						}

					};

					parents = WQTools.removeDuplicated( parents );
					parents.__proto__ = new wQuery();

					self = parents;

					return parents;

				}

			}

		});

		this.__defineSetter__('parents', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

		/* each function
		 * Loop over the collection
		 */
		this.__defineGetter__('each', function () {

			var self = this;

			return function ( fn ) {
				
				var length = self.length,
				    stop   = false;

				for( var i = 0; i < length; i++ ){

					stop = false === fn.call( self[ i ], i, self[ i ] );

					if( stop ){
						break;
					}

				} 
				return self;

			};

		});

		this.__defineSetter__('each', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

		/* css method
		 * Get or set CSS properties
		 */
		this.__defineGetter__('css', function () {

			var self = this;

			return function ( name, value ) {

				if( typeof name === 'string' ){

					if( typeof value === 'undefined' ){

						value = window.getComputedStyle( self[ 0 ] );

						return value[ name ];

					}else{
						console.log('Not implemented');
					}

				}else{
					console.log('Not implemented');
				}
				
			};

		});

		this.__defineSetter__('css', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

	}

	WQConstructor = new wQuery();

}();

var wQuery = function ( selector ) {
	return new WQConstructor.init( selector );
}