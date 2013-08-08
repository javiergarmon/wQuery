/*!
 * wQuery JavaScript Library v2.0.0 alpha
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

		},

	wQuery  = function () {


		/*	  _____________________________________________________
			 |													   |
			 |			SETTTING UP THE WQUERY OBJECT 			   |
			 |_____________________________________________________|
		*/

		this.version = version;

	   /*  `setContext` process
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

	   /*  `init` function
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

		/*	  _____________________________________________________
			 |													   |
			 |			      ATTRIBUTES CATTEGORY  			   |
			 |_____________________________________________________|
		*/

		/* `hasClass` function 
		 * Check if an element(s) has a class(es)
		 */

		this.__defineGetter__('hasClass', function () {

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

		this.__defineSetter__('hasClass', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

		/* `attr` process
		 * Check if an element(s) has a class(es)
		 */

		this.__defineGetter__('attr', function () {

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

		this.__defineSetter__('attr', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

		/* `addClass` process
		 * Add the class(es) to the whole collection of elements
		 */

		this.__defineGetter__('addClass', function () {

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

		this.__defineSetter__('addClass', function () {
			var err = "wQuery ERR: You can't modify this process";
			throw err;
		});

		/* `addClass` process
		 * Add the class(es) to the whole collection of elements
		 */

		this.__defineGetter__('html', function () {
			
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

		this.__defineSetter__('html', function () {
			var err = "wQuery ERR: You can't modify this process";
			throw err;
		});

		/* `prop` process
		 * UNCOMPLETE
		 */

		this.__defineGetter__('prop', function () {

			return function () {};

		});

		this.__defineSetter__('prop', function () {
			var err = "You can't modify this process";
			throw err;
		});

		/* `removeAttr` process
		 * Remove the attribute form the current elements
		 */

		this.__defineGetter__('removeAttr', function () {

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

		this.__defineSetter__('removeAttr', function () {
			var err = "wQuery ERR: You can't modify this process";
			throw err;
		})

		/* `removeClass` process
		 * Remove the class(es) form the current elements
		 */

		this.__defineGetter__('removeClass', function () {

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

		this.__defineSetter__('removeClass', function () {
			var err = "wQuery ERR: You can't modify this process";
			throw err;
		});

		/* `removeProp` process
		 *  UNCOMPLETE
		 */

		this.__defineSetter__('removeProp', function () {

			return function () {};

		});

		this.__defineSetter__('removeProp', function () {
			var err = "wQuery ERR: You can't modify this process";
			throw err;
		})

		/* `toggleClass` process
		 * 	Add or remove the class(es) passed in the arguments
		 */

		this.__defineGetter__('toggleClass', function () {

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

		this.__defineSetter__('toggleClass', function () {
			var err = "wQuery ERR: You can't modify this process";
			throw err;
		});

		/* `val` process
		 * 	UNCOMPLETE
		 */

		this.__defineGetter__('val', function () {

			return function () {};

		});

		this.__defineSetter__('val', function () {
			var err = "wQuery ERR: You can't modify this process";
			throw err;
		});

		/*	  _____________________________________________________
			 |													   |
			 |			               XXX  	         		   |
			 |_____________________________________________________|
		*/

	   /*  `parent` function
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

	   /* `parents` function
		* Returns all the parents for the selected elements
		*/

		this.__defineGetter__('parents', function () {
			
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

		this.__defineSetter__('parents', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		});

	   /* `is` function
		* Returns true if one of the elements comply the function
		*/

		this.__defineGetter__('is', function () {

			return function ( check ) {
				
				if ( check.atChar(0) == '#' ) {

					for (var i = 0; i < self.length; i++) {
						
						if ( self[i].id == check.split('#')[1] ) return true;

						if (i === self.length - 1 && self[i].id != check.split('#')[1] ) {
							return false;
						};

					};

				} else if ( check.atChar(0) == '.' ) {

					for (var i = 0; i < self.length; i++) {
						
						if ( self[i].className == check.split('.')[1] ) return true;

						if (i === self.length - 1 && self[i].className != check.split('.')[1] ) {
							return false;
						};

					};

				} else {

					for (var i = 0; i < self.length; i++) {
						
						if ( self[i].nodeName == check.toLowerCase() ) return true;

						if (i === self.length - 1 && self[i].nodeName != check.toLowerCase() ) {
							return false;
						};

					};

				}

			}

		});

		this.__defineSetter__('is', function () {
			var err = "wQuery ERR: You can't modify this function";
			throw err;
		})

		/* `each` function
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

		/* `css` method
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

		/* `add` function
		 * Make an union of 2 collection
		 */

		this.__defineGetter__('add', function () {

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

		this.__defineSetter__('add', function () {
		 	var err = "wQuery ERR: You can't modify this function";
		 	throw err;
		});


	}

	WQConstructor = new wQuery();

}();

var wQuery = function ( selector ) {
	return new WQConstructor.init( selector );
}