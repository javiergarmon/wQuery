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

			},

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

		}

	wQueryObj = function () {
		this.version = version;
	};


	var matchesSelector = 'matchesSelector';

	if( Element.prototype.matchesSelector ){
		matchesSelector = 'matchesSelector';
	}else if( Element.prototype.mozMatchesSelector ){
		matchesSelector = 'mozMatchesSelector';
	}else if( Element.prototype.webkitMatchesSelector ){
		matchesSelector = 'webkitMatchesSelector';
	}else if( Element.prototype.msMatchesSelector ){
		matchesSelector = 'msMatchesSelector';
	}

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

		if ( !selector ) {
		
			return this;
		
		} else if ( typeof selector === "string" ) {

			if ( !this.context ) {

				var newElement = new wQueryObj();
				newElement.elements = WQTools.convertToArray(document.querySelectorAll(selector));
				return newElement;

			} else if ( this.context ) {

				var newElement = new wQueryObj();
				newElement.elements = WQTools.convertToArray(this.context.querySelectorAll(selector));
				return newElement;

			}

		} else if ( typeof selector === "function") {

			window.onload = selector;
		
		}

	};

	// Revised and tested
	wQueryObj.prototype.get = function ( index ) {
		if ( typeof index === 'undefined' ) {
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
	 // Revised and tested
	wQueryObj.prototype.hasClass = function ( classSearched ) {

		classSearched = classSearched.toString();

		for( var i = 0, j = this.elements.length; i < j; i++ ){
			
			if( this.elements[ i ].classList.contains( classSearched ) ){
				return true;
			}

		};

		return false;

	};

	/* `attr` process
	 * Check if an element(s) has an attribute(s)
	 */
	// Revised and tested
	wQueryObj.prototype.attr = function ( attr, value ) {

		if ( attr ) {

			attr = attr.toString();
			
			if ( !value ) {

				var tmp = null;

				for( var i = 0, j = this.elements.length; i < j; i++ ){

					tmp = this.elements[ i ].getAttribute( attr );

					if( tmp !== null ){
						return tmp;
					}

				}

				return undefined;

			} else {

				value = value.toString();

				for (var i = 0, j = this.elements.length; i < j; i++) {
					this.elements[ i ].setAttribute( attr, value );
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
	// Revised and tested
	wQueryObj.prototype.addClass = function (  classNames  ) {

		classNames = classNames.split(' ');

		var tmp = null;

		for( var i = 0, j = this.elements.length; i < j; i++ ){

			tmp = this.elements[ i ].classList;
			tmp.add.apply( tmp, classNames );

		};

		return this;

	};

	/* `html` process
	 */

	wQueryObj.prototype.html = function ( HTMLInner ) {

		if ( !HTMLInner ) {
			return this.elements[0].innerHTML;
		} else {
			for (var i = 0; i < this.elements.length; i++) {
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
	// Revised and tested
	wQueryObj.prototype.removeAttr = function ( attr ) {

		if ( attr ) {

			attr = attr.toString().split(' ');

			var i = this.elements.length;
			var j = attr.length;

			while( i-- ){

				while( j-- ){
					this.elements[ i ].removeAttribute( attr[ j ] );
				}

				j = attr.length;

			}

		}

		return this;

	};

	/* `removeClass` process
	 * Remove the class(es) form the current elements
	 */
	// Revised and tested
	wQueryObj.prototype.removeClass = function ( classNames ) {

		if( typeof classNames !== 'undefined' ){

			classNames = classNames.toString().split(' ');

			var i   = this.elements.length;
			var tmp = null;

			while( i-- ){

				tmp = this.elements[ i ].classList;
				tmp.remove.apply( tmp, classNames );

			}

		}else{

			var i = this.elements.length;

			while( i-- ){
				this.elements[ i ].className = '';
			}

		}

		return this;

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
	// Revised and tested
	wQueryObj.prototype.toggleClass = function ( classes ) {

		if ( classes ) {

			var classes = classes.toString().split(' ');
			var i       = this.elements.length;
			var tmp     = null;

			while( i-- ){

				tmp = this.elements[ i ].classList;
				tmp.toggle.apply( tmp, classes );

			}

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

   /*  `eq` function
	*  Returns an object with the selected dom element
	*/
	// Revised and tested
	wQueryObj.prototype.eq = function ( index ) {

		var newObject = new wQueryObj();

		if( index < 0 ){
			index += this.elements.length;
		}

		if( typeof this.elements[ index ] !== 'undefined' ){
			newObject.elements = [ this.elements[ index ] ];
		}else{
			newObject.elements = [];
		}

		return newObject;

	}

   /*  `first` function
	*/
	// Revised and tested
	wQueryObj.prototype.first = function () {
		return this.eq( 0 );
	}

   /*  `last` function
	*/
	// Revised and tested
    wQueryObj.prototype.last = function () {
    	return this.eq( -1 );
    }

   /*  `slice` function
	*  Returns the elements from the collection indicated in the arguments
	*/
	// Revised and tested
	wQueryObj.prototype.slice = function ( start, end ) {

		if ( start ) {

			var result = [];
			var newElement = new wQueryObj();

			if ( start < 0 ) start = this.elements.length + start;
			if ( end < 0 )   end   = this.elements.length + end;	

			if ( end ) {

				if ( start < end ) {

					for ( ; start < end; start++ ) {
						result.push( this.elements[ start ] );
					};

					newElement.elements = result;
					return newElement;

				} else {

					newElement.elements = [];
					return newElement;

				}

			} else {

				for ( ; start < this.elements.length; start++) {
					result.push( this.elements[ start ] );
				};

				var newElement = new wQueryObj();
				newElement.elements = result;
				return newElement;

			}

		} else {

			return this;

		}

	}

   /*  `find` function
	*  Find the elements inside the selected elements
	*/

	wQueryObj.prototype.find = function ( selector ) {

		var newObject = new wQueryObj();

		if ( selector ) {

			var results = [];

			for (var i = 0; i < this.elements.length; i++) {
				results.push( this.elements[i].querySelectorAll( selector ) );
			};

			newObject.elements = WQTools.removeDuplicated(result);
			return newObject;

		} else {

			newObject.elements = [];
			return newObject;

		}

	}

   /*  `children` function
	*  Get the child with the same object as the parameter
	*/

	wQueryObj.prototype.children = function ( selector ) {

		var newObject = new wQueryObj();
		var result    = [];

		if ( selector ) {

			for( var i = 0, j = this.elements.length; i < j; i++ ) {

				for( var k = 0, m = this.elements[ i ].children.length; k < m; k++ ){

					if( this.elements[ i ].children[ k ][ matchesSelector ]( selector ) ){
						result.push( this.elements[ i ].children[ k ] );
					}

				}

			};

		} else {

			for( var i = 0, j = this.elements.length; i < j; i++ ) {

				for( var k = 0, m = this.elements[ i ].children.length; k < m; k++ ){
					result.push( this.elements[ i ].children );
				}

			}

		}

		newObject.elements = result;
		return newObject;

	}

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

			for (var i = 0; i < this.elements.length; i++) {
			
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

				while ( node != null ) {

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

		var i = this.elements.length;

		if( !i ){
			return false;
		}

		while( i-- ){

			if( this.elements[ i ][ matchesSelector ]( check ) ){
				return true;
			}

		}

		return false;

	};

	/* `each` function
	 * Loop over the collection
	 */
	// Revised and tested
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

	wQueryObj.prototype.add = function ( coll2, context ) {

 		var result = [];
		
		for (var i = 0; i < this.elements.length; i++) {
			result.push( this.elements[i] );
		};

 		if ( typeof coll2 === 'string' ) {

 			var added = [];

 			if ( coll2.charAt(0) == '<' && coll2.charAt( coll2.length - 1 ) == '>' ) {
 				result.push( document.createElement( coll2.substr( coll2.indexOf('<') + 1, coll2.indexOf('>') - coll2.indexOf('<') - 1 ) ) );
 			} else {

	 			if ( typeof context === 'string' ){
	 				
	 				var contextElements;

	 				if ( !this.context ) {
		 				contextElements = document.querySelectorAll( context );
		 			} else {
		 				contextElements = this.context.querySelectorAll( context );
		 			};

		 			for (var i = 0; i < contextElements.length; i++) {
		 				added.concat( contextElements[i].querySelectorAll( coll2 ));
		 			};

	 			} else if ( !this.context ) {
	 				added = document.querySelectorAll( coll2 );
	 			} else {
	 				added = this.context.querySelectorAll( coll2 );
	 			};

	 			for (var i = 0; i < added.length; i++) {
	 				if ( result.indexOf(added[i]) < 0 ) {
	 					result.push(added[i]);
	 				};
	 			};

	 		}

 		} else if ( typeof coll2 == "object" ) {

 			if ( coll2.elements ) {

 				for (var i = 0; i < coll2.elements.length; i++) {
 					result.push( coll2.elements[i] );
 				};

 			} else if ( coll2.length ) {

 				for (var i = 0; i < coll2.length; i++) {
 					result.push( coll2[i] );
 				};

 			} else {
 				result.push( coll2 );
 			}

 		} else {

	 		for (var i = 0; i < coll2.elements.length; i++) {
				
	 			result.push( coll2.elements[i] );

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