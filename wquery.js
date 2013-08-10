/*!
 * wQueryObj JavaScript Library v2.0.0 alpha
 * https://www.weezeel.com/
 */

var WQConstructor;

!function () {

	var version = "2.0.0 alpha",
		undefined  = ({}).a, 
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

			/* removeDuplicated function
			// Remove duplicated elements from an array
			*/
			convertToArray: function ( element ) {

				var array = [];

				for (var i = 0; i < element.length; i++) {
					array.push(element[i]);
				};

				return array;

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

		if ( id.charAt(0) === '#' ) {

			ctx = document.getElementById( id.slice( 1 ) );

			this.context = ctx;

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
				this.elements = WQTools.convertToArray(match);
				return this;

			} else if ( this.context ) {

				match = this.context.querySelectorAll(selector);
				this.elements = WQTools.convertToArray(match);
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
			classes.concat(this.elements[i].className + " ");
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

				return this.elements[0].getAttribute( attr );

			} else {

				for (var i = 0; i < this.length; i++) {
					this.elements[i].setAttribute( attr, value );
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
				if (this.elements[i].indexOf( classArray[x] ) < 0) {
					this.elements[i].className = this.elements[i].className + " " + classArray[x];
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
			return this.elements[0].innerHTML;
		} else {
			for (var i = 0; i < this.length; i++) {
				this.elements[i].innerHTML = HTMLInner;
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
				this.elements[i].removeAttribute( attr );
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

				var actClasses = this.elements[i].className.split(' ');

				for (var x = 0; x < classCollection.length; x++) {
				
					if ( actClasses.indexOf( classCollection[x] ) > 0 ) {

						actClasses.splice( actClasses.indexOf( classCollection[x] ), 1 );

					}
				
				};

				this.elements[i].className = actClasses.join(' ');

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

				var actClasses = this.elements[i].className.split(' ');
				
				for (var x = 0; x < classCollection.length; x++) {

					if ( actClasses.indexOf( classCollection[ x ] ) < 0 ) {

						actClasses.push( classCollection[ x ] );

					} else {

						actClasses.splice( actClasses.indexOf( classCollection[ x ] ), 1 );

					}

				};

				this.elements[i].className = actClasses.join(' ');

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

			var parents = [];

			for (var i = 0; i < this.elements.length; i++) {
				parents.push(this.elements[i].parentNode);
			};

			var newElement = new wQueryObj();
			newElement.elements = WQTools.removeDuplicated(parents);

			return newElement;

		} else {

			var parents = [];

			for (var i = 0; i < this.length; i++) {
			
				var node = this.elements[i].parentNode;

				while( node != null) {

					if ( node === this.context ) {

						parents.push(node);
						node = null;

					} else if ( node === document.getElementById('body') ) {

						node = null;

					} else {

						node = node.parentNode;

					}

				}
			
			};

			var newElement = new wQueryObj();
			newElement.elements = WQTools.removeDuplicated(parents);

			return newElement;

		}

	};

   /* `parents` function
	* Returns all the parents for the selected elements
	*/

	wQueryObj.prototype.parents = function () {

		if ( !this.context ) {

			var parents = [];

			for (var i = 0; i < this.elements.length; i++) {
				
				var node = this.elements[i].parentNode;

				while ( node != document.getElementsByTagName('html')[0] ) {

					parents.push(node);
					node = node.parentNode;

				}

			};

			var newElement = new wQueryObj();
			newElement.elements = WQTools.removeDuplicated(parents);

			return newElement;


		} else {

			var parents = [];
			var eachPar = [];

			for (var i = 0; i < this.elements.length; i++) {
				
				var node = this.elements[i].parentNode;

				while ( node != null ) {

					if ( node === document.getElementsByTagName('body') ) {

						eachPar = [];
						node = null;

					} else if ( node === this.context ) {

						parents.push( node );
						eachPar = [];

						for (var i = 0; i < eachPar.length; i++) {
							parents.push( eachPar[i] );
						};

						node = null;

					} else {

						parents.push( this.elements[i] );
						node = node.parentNode;

					}

				}

			};
			
			var newElement = new wQueryObj();
			newElement.elements = WQTools.removeDuplicated(parents);

			return newElement;

		}

	};

   /* `is` function
	* Returns true if one of the elements comply the function
	*/

	wQueryObj.prototype.is = function ( check ) {
			
		if ( check.atChar(0) === '#' ) {

			for (var i = 0; i < this.length; i++) {
				
				if ( this.elements[i].id === check.slice( 1 ) ) return true;

				if (i === this.length - 1 && this.elements[i].id != check.slice( 1 ) ) {
					return false;
				};

			};

		} else if ( check.atChar(0) === '.' ) {

			for (var i = 0; i < this.length; i++) {
				
				if ( this.elements[i].className === check.split('.')[1] ) return true;

				if (i === this.length - 1 && this.elements[i].className != check.split('.')[1] ) {
					return false;
				};

			};

		} else {

			for (var i = 0; i < this.length; i++) {
				
				if ( this.elements[i].nodeName === check.toLowerCase() ) return true;

				if (i === this.length - 1 && this.elements[i].nodeName != check.toLowerCase() ) {
					return false;
				};

			};

		}

	};

	/* `each` function
	 * Loop over the collection
	 */

	wQueryObj.prototype.each = function ( fn ) {
			
		var length = this.elements.length;
		var stop   = false;

		for( var i = 0; i < length; i++ ){

			stop = false === fn.call( this.elements[ i ], i, this.elements[ i ] );

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

				// Get all rules
				value = window.getComputedStyle( this.elements[ 0 ] );

				if( typeof value[ name ] !== 'undefined' ){
					return value[ name ];
				}else if( value [ '-moz-' + name ] !== 'undefined' ){
					return value [ '-moz-' + name ];
				}else if( value[ '-webkit-' + name ] !== 'undefined' ){
					return value[ '-webkit-' + name ];
				}else{
					return undefined;
				}

			}else{

				this.each( function(){
					this.style[ name ] = value;
				});

				return this;

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

		var newElement = new wQueryObj();
		newElement.elements = WQTools.removeDuplicated(result);

		return newElement;

	};

	WQConstructor = new wQueryObj();

}();

var wQuery = function ( selector ) {
	return WQConstructor.init( selector );
}