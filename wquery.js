/*!
 * wQueryObj JavaScript Library v2.0.0 alpha
 * https://www.weezeel.com/
 */

var WQConstructor;

!function () {

	var version = "2.0.0 alpha",
		wQueryObj  = {},
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

	wQueryObj = function () {
		this.version = version;
	};

	/*	  _____________________________________________________
		 |													   |
		 |			SETTTING UP THE wQueryObj OBJECT 			   |
		 |_____________________________________________________|
	*/


   /*  `setContext` process
	*  Set the property context of the future wQueryObj objects
	*/

	wQueryObj.prototype.setContext = function ( id ) {

		var ctx;

		if ( id.charAt(0) == '#' ) {

			ctx = document.getElementById( id.split('#')[1] );

			this.__defineGetter__('context' = function () {
				return ctx;
			});

			this.__defineSetter__('context' = function () {
				var err = "wQueryObj ERR: You can't modify this property";
				throw err;
			});

		} else {
			var err = "wQueryObj ERR: Context declaration is wrong";
			throw err;
		}

	}


   /*  `init` function
	*  Create a new wQueryObj object with the same syntax 
	*/
	wQueryObj.prototype.init = function ( selector ) {

		var match, elem;

		if ( !selector ) {
		
			return this;
		
		} else if ( typeof selector === "string" ) {

			if ( !this.context ) {

				match = document.querySelectorAll(selector);
				this.elements = match;
				return this;

			} else if ( this.context ) {

				match = this.context.querySelectorAll(selector);
				this.elements = match;
				return this;

			}

		} else if ( typeof selector === "function") {

			window.onload = selector;
		
		}

	};

	wQueryObj.prototype.get = function ( index ) {
		if ( index ) {
			return this.elements[ index ];
		} else {
			return this.elements;
		}
	}

	/*	  _____________________________________________________
		 |													   |
		 |			      ATTRIBUTES CATTEGORY  			   |
		 |_____________________________________________________|
	*/

	/* `hasClass` function 
	 * Check if an element(s) has a class(es)
	 */

	wQueryObj.prototype.hasClass = function ( classSearched ) {

		var classes = "";

		for (var i = 0; i < this.length; i++) {
			classes.concat(this[i].className + " ");
		};

		if (classes.indexOf( classSearched ) < 0 ) {
			return false;
		} else {
			return true;
		}

	};

	/* `attr` process
	 * Check if an element(s) has a class(es)
	 */

	wQueryObj.prototype.attr = function ( attr, value ) {

		if ( attr ) {

			if ( !value ) {

				return this[0].getAttribute( attr );

			} else {

				for (var i = 0; i < this.length; i++) {
					this[i].setAttribute( attr, value );
				};

				return this;

			}

		} else {

			var err = "wQueryObj ERR: `.attr` function needs an attribute";
			throw err;

		}

	};

	/* `addClass` process
	 * Add the class(es) to the whole collection of elements
	 */

	wQueryObj.prototype.addClass = function (  classNames  ) {

		var classArray = classNames.split(' ');

		for (var i = 0; i < this.length; i++) {
			for (var x = 0; i < classArray.length; x++) {
				if (this[i].indexOf( classArray[x] ) < 0) {
					this[i].className = this[i].className + " " + classArray[x];
				};
			};
		};

		return this;

	};

	/* `addClass` process
	 * Add the class(es) to the whole collection of elements
	 */

	wQueryObj.prototype.html = function ( HTMLInner ) {

		if ( !HTMLInner ) {
			return this[0].innerHTML;
		} else {
			for (var i = 0; i < this.length; i++) {
				this[i].innerHTML = HTMLInner;
			};
		}

	};

	/* `prop` process
	 * UNCOMPLETE
	 */

	wQueryObj.prototype.prop = function () {

		return function () {};

	};

	/* `removeAttr` process
	 * Remove the attribute form the current elements
	 */

	wQueryObj.prototype.removeAttr = function ( attr ) {

		if ( attr ) {

			for (var i = 0; i < this.length; i++) {
				this[i].removeAttribute( attr );
			};

			return this;

		} else {
			var err = "wQueryObj ERR: This function needs a parameter";
			throw err;
		}

	};

	/* `removeClass` process
	 * Remove the class(es) form the current elements
	 */

	wQueryObj.prototype.removeClass = function ( classes ) {

		if ( classes ) {

			var classCollection = classes.split(' ');

			for (var i = 0; i < this.length; i++) {

				var actClasses = this[i].className.split(' ');

				for (var x = 0; x < classCollection.length; x++) {
				
					if ( actClasses.indexOf( classCollection[x] ) > 0 ) {

						actClasses.splice( actClasses.indexOf( classCollection[x] ), 1 );

					}
				
				};

				this[i].className = actClasses.join(' ');

			};

			return this;

		} else {
			var err = "wQueryObj ERR: This function needs a parameter";
			throw err;
		}

	};

	/* `removeProp` process
	 *  UNCOMPLETE
	 */

	wQueryObj.prototype.removeProp = function () {

		return function () {};

	};

	/* `toggleClass` process
	 * 	Add or remove the class(es) passed in the arguments
	 */

	wQueryObj.prototype.toggleClass = function ( classes ) {

		if ( classes ) {

			var classCollection = classes.split(' ');

			for (var i = 0; i < this.length; i++) {

				var actClasses = this[i].className.split(' ');
				
				for (var x = 0; x < classCollection.length; x++) {

					if ( actClasses.indexOf( classCollection[ x ] ) < 0 ) {

						actClasses.push( classCollection[ x ] );

					} else {

						actClasses.splice( actClasses.indexOf( classCollection[ x ] ), 1 );

					}

				};

				this[i].className = actClasses.join(' ');

			};

			return this;

		} else {
			var err = 'wQueryObj ERR: This function needs a parameter';
			throw err;
		}

	};

	/* `val` process
	 * 	UNCOMPLETE
	 */

	wQueryObj.prototype.val = function () {

		return function () {};

	};

	/*	  _____________________________________________________
		 |													   |
		 |			               XXX  	         		   |
		 |_____________________________________________________|
	*/

   /*  `parent` function
	*  Returns the parent of the current element
	*/

	wQueryObj.prototype.parent = function () {

		if ( !this.context ) {

			for (var i = 0; i < this.length; i++) {
				this[i] = this[i].parentNode;
			};

			var parents = WQTools.removeDuplicated(this);

			parents.__proto__ = new wQueryObj();
			this = parents;

			return parents;

		} else {

			var parents = [];

			for (var i = 0; i < this.length; i++) {
			
				var node = this[i].parentNode;

				while( node != null) {

					if ( node == this.context ) {

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

			parents.__proto__ = new wQueryObj();
			this = parents;

			return parents;

		}

	};

   /* `parents` function
	* Returns all the parents for the selected elements
	*/

	wQueryObj.prototype.parents = function () {

		if ( !this.context ) {

			var parents = [];

			for (var i = 0; i < this.length; i++) {
				
				var node = this[0].parentNode;

				while ( node != document.getElementsByTagName('html')[0] ) {

					parents.push(node);
					node = node.parentNode;

				}

			};

			this.__defineGetter__('elements', function () {
				var array = [];

				for (var i = 0; i < parents.length; i++) {
					array.push(parents[i]);
				};

				return array;

			});

			this.__defineSetter__('elements', function () {
				var err = "wQueryObj ERR: You can't modify this property";
				throw err;
			});

			parents = WQTools.removeDuplicated(parents);
			parents.__proto__ = new wQueryObj();

			this = parents;

			return parents;

		} else {

			var parents = [];
			var eachPar = [];

			for (var i = 0; i < this.length; i++) {
				
				var node = this[i].parentNode;

				while ( node != null ) {

					if ( node == document.getElementsByTagName('body') ) {

						eachPar = [];
						node = null;

					} else if ( node == this.context ) {

						parents.push( node );
						eachPar = [];

						for (var i = 0; i < eachPar.length; i++) {
							parents.push( eachPar[i] );
						};

						node = null;

					} else {

						parents.push( this[i] );
						node = node.parentNode;

					}

				}

			};

			parents = WQTools.removeDuplicated( parents );
			parents.__proto__ = new wQueryObj();

			this = parents;

			return parents;

		}

	};

   /* `is` function
	* Returns true if one of the elements comply the function
	*/

	wQueryObj.prototype.is = function ( check ) {
			
		if ( check.atChar(0) == '#' ) {

			for (var i = 0; i < this.length; i++) {
				
				if ( this[i].id == check.split('#')[1] ) return true;

				if (i === this.length - 1 && this[i].id != check.split('#')[1] ) {
					return false;
				};

			};

		} else if ( check.atChar(0) == '.' ) {

			for (var i = 0; i < this.length; i++) {
				
				if ( this[i].className == check.split('.')[1] ) return true;

				if (i === this.length - 1 && this[i].className != check.split('.')[1] ) {
					return false;
				};

			};

		} else {

			for (var i = 0; i < this.length; i++) {
				
				if ( this[i].nodeName == check.toLowerCase() ) return true;

				if (i === this.length - 1 && this[i].nodeName != check.toLowerCase() ) {
					return false;
				};

			};

		}

	};

	/* `each` function
	 * Loop over the collection
	 */

	wQueryObj.prototype.each = function ( fn ) {
			
		var length = this.length,
		    stop   = false;

		for( var i = 0; i < length; i++ ){

			stop = false === fn.call( this[ i ], i, this[ i ] );

			if( stop ){
				break;
			}

		} 
		return this;

	};

	/* `css` method
	 * Get or set CSS properties
	 */
	wQueryObj.prototype.css = function ( name, value ) {

			if( typeof name === 'string' ){

				if( typeof value === 'undefined' ){

					value = window.getComputedStyle( this[ 0 ] );

					return value[ name ];

				}else{
					console.log('Not implemented');
				}

			}else{
				console.log('Not implemented');
			}

	};

	/* `add` function
	 * Make an union of 2 collection
	 */

	wQueryObj.prototype.add = function ( coll2 ) {

	 		var result = [];
	 		result.concat(this);

	 		if ( typeof coll2 === 'string' ) {

	 			var added;

	 			if ( !this.context ) {
	 				added = document.querySelectorAll(coll2);
	 			} else {
	 				added = this.context.querySelectorAll(coll2);
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

	 		result.__proto__ = new wQueryObj();
		 	return result;

	};

	WQConstructor = new wQueryObj();

}();

var wQuery = function ( selector ) {
	return new WQConstructor.init( selector );
}