/*!
 * wQuery JavaScript Library v1.0.0 alpha
 * https://www.weezeel.com/
 */

var WQConstructor;

!function () {

	var version = "2.0.0 alpha",
		wQuery  = {},
		WQTools = {

			setterErrorMessage : function(){
				throw "wQuery ERR: You can't modify this method";
			},

			fnOrFn : function( fn1, fn2 ){

				if( typeof fn1 === 'function' ){
					return fn1;
				}else if( typeof fn2 === 'function' ){
					return fn2;
				}else{
					throw "wQuery ERR: Params are not valid";
				}

			},

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

		},

	wQuery  = function () {


		/*	  _____________________________________________________
			 |													   |
			 |			SETTTING UP THE WQUERY OBJECT 			   |
			 |_____________________________________________________|
		*/

		this.version = version;

		/* defineMethod function
		// Define Getter and Setter of a method
		*/
		this.__defineGetter__('defineMethod', function () {

			return function ( name, getter, setter ) {

				if( typeof getter !== 'function' ){
					throw 'wQuery ERR: Getter is not a valid function';
				}

				name = name.toString();

				this.__defineGetter__( name, getter );
				this.__defineSetter__( name, WQTools.fnOrFn( setter, WQTools.setterErrorMessage ) );

			}

		});

		this.__defineSetter__( 'defineMethod', WQTools.setterErrorMessage );

	   /*  `setContext` process
		*  Set the property context of the future wQuery objects
		*/
		this.defineMethod( 'setContext', function () {

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

	   /*  `init` function
		*  Create a new wQuery object with the same syntax 
		*/
		this.defineMethod( 'init', function () {

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

		/*	  _____________________________________________________
			 |													   |
			 |			      ATTRIBUTES CATTEGORY  			   |
			 |_____________________________________________________|
		*/

		/* `hasClass` function 
		 * Check if an element(s) has a class(es)
		 */

		this.defineMethod( 'hasClass', function () {

			var self = this;

			return function ( classSearched ) {

				var classes = "";

				for (var i = 0; i < self.length; i++) {
					classes.concat(self[i].className + " ");
				};

				if (classes.indexOf( classSearched ) < 0 ) {
					return false;
				} else {
					return true;
				}

			}

		});

		/* `attr` process
		 * Check if an element(s) has a class(es)
		 */

		this.defineMethod( 'attr', function () {

			var self = this

			return function ( attr, value ) {

				if (attr) {

					if ( !value ) {

						return self[0].getAttribute( attr );

					} else {

						for (var i = 0; i < self.length; i++) {
							self[i].setAttribute( attr, value );
						};

						return self;

					}

				} else {

					var err = "wQuery ERR: `.attr` function needs an attribute";
					throw err;

				}

			}

		});

		/* `addClass` process
		 * Add the class(es) to the whole collection of elements
		 */

		this.defineMethod( 'addClass', function () {

			var self = this;

			return function ( classNames ) {

				var classArray = classNames.split(' ');

				for (var i = 0; i < self.length; i++) {
					for (var x = 0; i < classArray.length; x++) {
						if (self[i].indexOf( classArray[x] ) < 0) {
							self[i].className = self[i].className + " " + classArray[x];
						};
					};
				};

				return self;

			}

		});

		/* `addClass` process
		 * Add the class(es) to the whole collection of elements
		 */

		this.defineMethod( 'html', function () {
			
			return function ( HTMLInner ) {

				if ( !HTMLInner ) {
					return self[0].innerHTML;
				} else {
					for (var i = 0; i < self.length; i++) {
						self[i].innerHTML = HTMLInner;
					};
				}

			}

		});

		/* `prop` process
		 * UNCOMPLETE
		 */

		this.defineMethod( 'prop', function () {

			return function () {};

		});

		/* `removeAttr` process
		 * Remove the attribute form the current elements
		 */

		this.defineMethod( 'removeAttr', function () {

			var self = this;

			return function ( attr ) {

				if ( attr ) {

					for (var i = 0; i < self.length; i++) {
						self[i].removeAttribute( attr );
					};

					return self;

				} else {
					var err = "wQuery ERR: This function needs a parameter";
					throw err;
				}

			}

		});

		/* `removeClass` process
		 * Remove the class(es) form the current elements
		 */

		this.defineMethod( 'removeClass', function () {

			return function ( classes ) {

				if ( classes ) {

					var classCollection = classes.split(' ');

					for (var i = 0; i < self.length; i++) {

						var actClasses = self[i].className.split(' ');

						for (var x = 0; x < classCollection.length; x++) {
						
							if ( actClasses.indexOf( classCollection[x] ) > 0 ) {

								actClasses.splice( actClasses.indexOf( classCollection[x] ), 1 );

							}
						
						};

						self[i].className = actClasses.join(' ');

					};

					return self;

				} else {
					var err = "wQuery ERR: This function needs a parameter";
					throw err;
				}

			}

		});

		/* `removeProp` process
		 *  UNCOMPLETE
		 */

		this.defineMethod( 'removeProp', function () {

			return function () {};

		});

		/* `toggleClass` process
		 * 	Add or remove the class(es) passed in the arguments
		 */

		this.defineMethod( 'toggleClass', function () {

			var self = this;

			return function ( classes ) {

				if ( classes ) {

					var classCollection = classes.split(' ');

					for (var i = 0; i < self.length; i++) {

						var actClasses = self[i].className.split(' ');
						
						for (var x = 0; x < classCollection.length; x++) {

							if ( actClasses.indexOf( classCollection[ x ] ) < 0 ) {

								actClasses.push( classCollection[ x ] );

							} else {

								actClasses.splice( actClasses.indexOf( classCollection[ x ] ), 1 );

							}

						};

						self[i].className = actClasses.join(' ');

					};

					return self;

				} else {
					var err = 'wQuery ERR: This function needs a parameter';
					throw err;
				}

			}

		});

		/* `val` process
		 * 	UNCOMPLETE
		 */

		this.defineMethod( 'val', function () {

			return function () {};

		});
		
		/*	  _____________________________________________________
			 |													   |
			 |			               XXX  	         		   |
			 |_____________________________________________________|
		*/

	   /*  `parent` function
		*  Returns the parent of the current element
		*/

		this.defineMethod( 'parent', function () {

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

	   /* `parents` function
		* Returns all the parents for the selected elements
		*/

		this.defineMethod( 'parents', function () {
			
			var self = this;

			return function () {

				if ( !self.context ) {

					var parents = [];

					for (var i = 0; i < self.length; i++) {
						
						var node = self[0].parentNode;

						while ( node != document.getElementsByTagName('html')[0] ) {

							parents.push(node);
							node = node.parentNode;

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

		/* `each` function
		 * Loop over the collection
		 */
		this.defineMethod( 'each', function () {

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

		/* `css` method
		 * Get or set CSS properties
		 */
		this.defineMethod( 'css', function () {

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

		/* `add` function
		 * Make an union of 2 collection
		 */

		this.defineMethod( 'add', function () {

		 	var self = this;

		 	return function ( coll2 ) {

		 		var result = [];
		 		result.concat(self);

		 		if ( typeof coll2 === 'string' ) {

		 			var added;

		 			if ( !self.context ) {
		 				added = document.querySelectorAll(coll2);
		 			} else {
		 				added = self.context.querySelectorAll(coll2);
		 			};

		 			for (var i = 0; i < added.length; i++) {
		 				if ( result.indexOf(added[i]) < 0 ) {
		 					result.push(added[i]);
		 				};
		 			};

		 		} else {

			 		for (var i = 0; i < coll2.length; i++) {
			 			if (result.indexOf( coll2[i] ) < 0) {
			 				coll2[i];
			 			}
			 		};

			 	}

		 		result.__proto__ = new wQuery();
			 	self = result;
			 	return result;

		 	}

		});


	}

	WQConstructor = new wQuery();

}();

var wQuery = function ( selector ) {
	return new WQConstructor.init( selector );
}