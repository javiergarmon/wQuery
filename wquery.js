/*!
 * wQueryObj JavaScript Library v2.0.0 alpha
 * https://www.weezeel.com/
 */

var WQConstructor;

!function () {
	var version    = "2.0.0 alpha";
	var undefined  = ({}).a;
	var matchesSelector = 'matchesSelector';
	var WQTools = {

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

		},

		/* clone function
		// Clone an wQuery object
		*/
		clone: function ( object, dataEvents, deepDataEvents ) {

			var objects =  [];

			if ( dataEvents ) {
				objects = object.elements;
				return objects;
			}

			if ( deepDataEvents ) {

				objects = object.elements;
				return objects;

			} 

			if ( !dataEvents && deepDataEvents ) {
				objects = object.elements;
				return objects;
			};

		},

		/* getChildren
		// Get the full children collection in the single array
		*/
		getChildren: function ( object ) {

			for (var i = 0; i < object.length; i++) {
				
				if ( !object[i].childNodes ) {

					elements -= 1;
					continue;

				} else {

					object = object.concat( this.convertToArray( object[i].childNodes ) )	;
					elements = object.length;

				};

			};

			return object;

		},

		/* cleanArray
		// Remove non-DOM objects from the array (not nodeList)
		*/
		cleanArray: function ( array ) {

			var clean = [];

			for (var i = 0; i < array.length; i++) {
				if( array[i].nodeType == 1 || array[i].nodeType == 8 ) clean.push(array[i]);
			};

			return clean;

		},

		is : function( element, selector ){
			return element[ matchesSelector ]( selector );
		}


	};
	var wQueryObj = function () {
		var elements = [];
		var context  = undefined;
		this.version = version;
	};

	// Browser prefixes
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
			context = ctx;

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

			if ( !context ) {

				var newElement = new wQueryObj();
				elements = WQTools.convertToArray(document.querySelectorAll(selector));
				return newElement;

			} else if ( context ) {

				var newElement = new wQueryObj();
				elements = WQTools.convertToArray(context.querySelectorAll(selector));
				return newElement;

			} else if ( selector.atChar(0) == '<' && selector.atChar( selector.length - 1 ) == '>' ) {

				var element = document.createElement( selector.substr( selector.indexOf('<'), selector.indexOf('>') - selector.indexOf('<') ) ),
					newElement = new wQueryObj();

				selector = selector.substr( selector.indexOf('>') + 1 );
				element.innerHTML = selector.substr( 0, selector.indexOf('<') );

				elements = element;
				return newElement;


			}

		} else if ( typeof selector === "function") {

			window.onload = selector;
		
		}

	};

	// Revised and tested
	wQueryObj.prototype.get = function ( index ) {

		if ( context ) {
			
			if ( index  == undefined ) {
				var clone = [],
					i     =  elements.length;

				while ( i-- ) {
					clone.push( elements[ i ].cloneNode() );
				}

				return clone;

			} else { 
 				var clone = elements[ index ].cloneNode();
				return clone;
			}

		} else {

			if ( index ) {
				return elements[ index ];
			} else {
				return elements;
			}

		}
	
	};

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
	 * Return the first element innerHTML or change all objects' innerHTML
	 */

	wQueryObj.prototype.html = function ( HTMLInner ) {

		if ( HTMLInner ) {
			
			if ( HTMLInner ) {

				if ( typeof HTMLInner == 'string' ) {

					for (var i = 0; i < this.elements.length; i++) {
						this.elements[i].innerHTML = HTMLInner;
					};

					return this;

				} else if ( typeof HTMLInner == 'function' ) {

					var result = HTMLInner();

					for (var i = 0; i < this.elements.length; i++) {
						this.elements[i].innerHTML = result;
					};

					return this;

				} else {

					for (var i = 0; i < this.elements.length; i++) {
						this.elements[i].innerHTML = HTMLInner.toString();
					};

					return this;

				}

			}

		} else {
			return this.elements[0].innerHTML;
		}

	};

	/* `insertBefore` process
	 * Insert an element before other
	 */

	wQueryObj.prototype.insertBefore = function ( elements ) {
	
		if ( elements ) {

			var nodes = [];

			if ( typeof elements == 'string' ) {

				if ( context ) {
					nodes = WQTools.convertToArray( context.querySelectorAll( elements ) );
				} else {
					nodes = WQTools.convertToArray( document.querySelectorAll( elements ) );
				}

				for (var i = 0; i < nodes.length; i++) {

					var parent = nodes[i]

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertBefore( this.elements[x], nodes[i] );
					};

				};

			} else if ( typeof elements == 'object' ) {

				if ( elements.elements ) {
					nodes = elements.elements;
				} else if ( elements.length ) {
					nodes = WQTools.convertToArray( elements );
				} else if ( elements.nodeType == 1 ) {
					nodes = elements;
				} else {
					return this;
				}

				if ( context ) {

					var valid = [];

					for (var i = 0; i < nodes.length; i++) {
						
						var node = nodes[i].parentNode;
						
						while ( node ) {

							if ( node == context ) {
								valid.push( nodes[i] );
							} else {
								node = node.parentNode;
							}

						};

					};

					nodes = valid;

				}

				for (var i = 0; i < nodes.length; i++) {

					var parent = nodes[i]

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertBefore( this.elements[x], nodes[i] );
					};

				};

			}

		} else {
			return this;
		}

	};

	/* `insertAfter` process
	 * Insert an element after other
	 */

	wQueryObj.prototype.insertAfter = function ( elements ) {
	
		if ( elements ) {

			var nodes = [];

			if ( typeof elements == 'string' ) {

				if ( context ) {
					nodes = WQTools.convertToArray( context.querySelectorAll( elements ) );
				} else {
					nodes = WQTools.convertToArray( document.querySelectorAll( elements ) );
				}

				for (var i = 0; i < nodes.length; i++) {

					var parent = nodes[i]

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertAfter( this.elements[x], nodes[i].nextSibling );
					};

				};

			} else if ( typeof elements == 'object' ) {

				if ( elements.elements ) {
					nodes = elements.elements;
				} else if ( elements.length ) {
					nodes = WQTools.convertToArray( elements );
				} else if ( elements.nodeType == 1 ) {
					nodes = elements;
				} else {
					return this;
				}

				if ( context ) {

					var valid = [];

					for (var i = 0; i < nodes.length; i++) {
						
						var node = nodes[i].parentNode;
						
						while ( node ) {

							if ( node == context ) {
								valid.push( nodes[i] );
							} else {
								node = node.parentNode;
							}

						};

					};

					nodes = valid;

				}

				for (var i = 0; i < nodes.length; i++) {

					var parent = nodes[i]

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertBefore( this.elements[x], nodes[i].nextSibling );
					};

				};

			}

		} else {
			return this;
		}

	};

	/* `empty` process
	 * Remove all child nodes of the actuals objects
	 */

	wQueryObj.prototype.empty = function () {

		for (var i = 0; i < this.elements.length; i++) {
			var children = WQTools.convertToArray( this.elements[i].childNodes );
			for (var x = 0; x < children.length; x++) {
				this.elements[ i ].removeChild( children[ x ] );
			};
		};

	};

	/* `contents` process
	 * Get the children elements, included commented, from the actual elements
	 */

	wQueryObj.prototype.contents = function () {

		var newObject = new wQueryObj(),
			result = [];

		for (var i = 0; i < this.elements.length; i++) {
			result = result.concat( WQTools.convertToArray( this.elements[i].childNodes ) );
		};

		elements = WQTools.cleanArray( WQTools.removeDuplicated( result ) );
		return newObject;

	};

	/* `prop` process
	 * UNCOMPLETE
	 */

	wQueryObj.prototype.prop = function () {

		return function () {};

	};


	/* `remove` process
	 * Remove the attribute form the current elements
	 */

	wQueryObj.prototype.remove = function ( selector ) {

		if ( selector ) {
			for (var i = 0; i < this.elements.length; i++) {
				if ( this.elements[i][ matchesSelector ]( selector ) ) this.elements[i].parentNode.removeChild( this.elements[i] );
 			};
		} else {
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].parentNode.removeChild( this.elements[i] );
			};
		}

		var newObject = new wQueryObj();
		elements = this.elements;

		return newObject;

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
			elements = [ this.elements[ index ] ];
		}else{
			elements = [];
		}

		return newObject;

	};

   /*  `first` function
	*/
	// Revised and tested
	wQueryObj.prototype.first = function () {
		return this.eq( 0 );
	};

   /*  `last` function
	*/
	// Revised and tested
    wQueryObj.prototype.last = function () {
    	return this.eq( -1 );
    };

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

					elements = result;
					return newElement;

				} else {

					elements = [];
					return newElement;

				}

			} else {

				for ( ; start < this.elements.length; start++) {
					result.push( this.elements[ start ] );
				};

				var newElement = new wQueryObj();
				elements = result;
				return newElement;

			}

		} else {

			return this;

		}

	};

   /*  `find` function
	*  Find the elements inside the selected elements
	*/

	wQueryObj.prototype.find = function ( selector ) {

		var newObject = new wQueryObj();

		if ( selector ) {

			var results = [];
			var tmp     = [];

			for( var i = 0, j = this.elements.length; i < j; i++ ) {
				tmp = tmp.concat( WQTools.convertToArray( this.elements[ i ].querySelectorAll( selector ) ) );
			}

			if ( typeof selector == 'string' ) {

				for (var i = 0; i < tmp.length; i++) {
					if ( tmp[i][ matchesSelector ]( selector ) ) results.push( tmp[i] );
				};

			} else if ( typeof selector == 'object' ) {

				if ( selector.elements ) {

					for (var i = 0; i < tmp.length; i++) {
						for (var x = 0; x < selector.elements.length; x++) {
							if ( selector.elements[x] == tmp[i] ) result.push( tmp[i] );
						};
					};

				} else if ( selector.length ) {

					for (var i = 0; i < tmp.length; i++) {
						for (var x = 0; x < selector.length; x++) {
							if ( selector[x] == tmp[i] ) result.push( tmp[i] );
						};
					};

				} else if ( selector.nodeType == 1 ) {
					for (var i = 0; i < tmp.length; i++) {
						if ( selector == tmp[i] ) result.push( tmp[i] );
					};	
				}

			}

			elements = WQTools.removeDuplicated( results );
			return newObject;

		} else {

			elements = [];
			return newObject;

		}

	};

   /*  `filter` function
	*  Filter elements inside the selected elements
	*/

	wQueryObj.prototype.filter = function ( selector ) {

		var newObject = new wQueryObj();

		if ( selector ) {

			var results = [];

			if ( typeof selector == 'string' ) {

				if ( selector.atChar(0) == '<' && selector.atChar( selector.length - 1 ) == '>' ) {

					for (var i = 0; i < this.elements.length; i++) {
						if ( this.elements[i].toString() == selector ) results.push( this.elements[i] );
					};

				}

				for( var i = 0, j = this.elements.length; i < j; i++ ) {

					if( WQTools.is( this.elements[ i ], selector ) ){
						results.push( this.elements[ i ] );
					}
					
				}

			} else if ( typeof selector == 'object' ) {

				if ( selector.elements ) {

					for (var i = 0; i < this.elements.length; i++) {
						for (var x = 0; x < selector.elements.length; x++) {
							if ( this.elements[i] == selector.elements[x]) result.push( this.elements[i]);
						};
					};

				} else if ( selector.length ) {

					for (var i = 0; i < this.elements.length; i++) {
						for (var x = 0; x < selector.length; x++) {
							if ( this.elements[i] == selector[x] ) result.push( this.elements[i]);
						};
					};

				} else if ( selector.nodeType == 1 ) {

					for (var i = 0; i < this.elements.length; i++) {
						if ( this.elements[i] == selector) result.push( this.elements[i]);
					};

				}

			} else if ( typeof selector == 'function' ) {

			}

			elements = results;
			return newObject;

		} else {

			elements = [];
			return newObject;

		}

	};

   /*  `filter` function
	*  Filter elements inside the selected elements
	*/

	wQueryObj.prototype.has = function ( selector ) {

		var newObject = new wQueryObj(),
			result = [];

		if ( selector ) {

			if ( typeof selector == "string" ) {

				if ( selector.atChar(0) == '<' && selector.atChar( selector.length - 1 ) == '>' ) {

					for (var i = 0; i < this.elements.length; i++) {
						if ( this.elements[i].toString() == selector ) result.push( this.elements[i] );
					};

				} else {

					for (var i = 0; i < this.elements.length; i++) {
						if ( this.elements[i][ matchesSelector ]( selector ) ) result.push( this.elements[i] );
					};

				}

				elements = result;
				return newObject;

			} else if ( selector.nodeType == 1 ) {

				for (var i = 0; i < this.elements.length; i++) {
					if ( this.elements[i] == selector ) result.push( this.elements[i] );
				};

				elements = result;
				return newObject;

			}

		} else {
			return this;
		}

	};

   /*  `find` function
	*  Find the elements inside the selected elements
	*/

	wQueryObj.prototype.clone = function ( dataAndEvents, deepDataAndEvents ) {
		
		var newObject = new wQueryObj();
		elements = WQTools.clone( this, dataAndEvents, deepDataAndEvents );

		return newObject;

	};

   /*  `children` function
	*  Get the child with the same object as the parameter
	*/

	wQueryObj.prototype.children = function ( selector ) {

		var newObject = new wQueryObj();
		var result    = [];

		if ( selector ) {

			for( var i = 0, j = this.elements.length; i < j; i++ ) {

				for( var k = 0, m = this.elements[ i ].children.length; k < m; k++ ){

					if( WQTools.is( this.elements[ i ].children[ k ], selector ) ){
						result.push( this.elements[ i ].children[ k ] );
					}

				}

			};

		} else {

			result = WQTools.cleanArray(WQTools.getChildren(this.elements));

		}

		elements = result;
		return newObject;

	};

   /*  `parent` function
	*  Returns the parent of the current element
	*/

	wQueryObj.prototype.parent = function ( selector ) {

		var newElement = new wQueryObj(),
			parents    = [];

		if ( !context ) {

			var parents = [];

			for (var i = 0; i < this.elements.length; i++) {

				if ( selector ) {
					if ( this.elements[i].parentNode[ matchesSelector ]( selector ) ) {
						parents.push(this.elements[i].parentNode);
					}
				} else {
					parents.push(this.elements[i].parentNode);
				}

			};

			elements = WQTools.removeDuplicated(parents);

			return newElement;

		} else {

			var parents = [];

			for (var i = 0; i < this.elements.length; i++) {
			
				var node = this.elements[i].parentNode;

				while( node ) {

					if ( node === context ) {

						if ( selector ) {
							if ( this.elements[i].parentNode[ matchesSelector ]( selector ) ) {
								parents.push(this.elements[i].parentNode);
							}
							node = null;
						} else {
							parents.push( this.elements[i].parentNode );
							node = null;
						}

					} else {

						node = node.parentNode;

					}

				}
			
			};

			var newElement = new wQueryObj();
			elements = WQTools.removeDuplicated(parents);

			return newElement;

		}

	};

   /* `parents` function
	* Returns all the parents for the selected elements
	*/

	wQueryObj.prototype.parents = function ( selector ) {

		var newElement = new wQueryObj(),
			parents = [];

		if ( !context ) {

			for (var i = 0; i < this.elements.length; i++) {
				
				var node = this.elements[i].parentNode;

				while ( node ) {

					if ( selector ) {

						if ( node[ matchesSelector ]( selector ) ) {
							parents.push(node);
						}
						node = node.parentNode;

					} else {
						parents.push(node);
						node = node.parentNode;
					}

				}

			};

			elements = WQTools.removeDuplicated(parents);
			return newElement;

		} else {

			var eachPar = [];

			for (var i = 0; i < this.elements.length; i++) {
				
				var node = this.elements[i].parentNode;

				while ( node ) {

					if ( node === document.getElementsByTagName('body')[0] ) {

						eachPar = [];
						node = undefined;

					} else if ( node === context ) {

						parents = eachPar;
						node = undefined;

					} else {

						if ( selector ) {
							if ( node[ matchesSelector ]( selector ) ) {
								eachPar.push( node )
							}
						} else {
							eachPar.push( node );
						}

						node = node.parentNode;
					
					}

				}

			};
			
			var newElement = new wQueryObj();
			elements = WQTools.removeDuplicated(parents);

			return newElement;

		}

	};

   /* `parentsUntil` function
	* Returns all the parents for the selected elements till the selector
	*/

	wQueryObj.prototype.parentsUntil = function ( selector, filter ) {

		var newObject = new wQueryObj(),
			parents   = [];

		if ( context ) {

			var eachNode = [];

			if ( selector ) {

				for (var i = 0; i < this.elements.length; i++) {
					var node = this.elements[i].parentNode;

					while ( node ) {

						if ( node == context ) {

							elements = parents;
							return newObject;

						} else if ( node == document.getElementsByTagName('body')[0] ) {

							parents = [];

						} else if ( node[ matchesSelector ](selector) ) {

							parents = eachNode;
							node 	= node.parentNode;

						} else {

							eachNode = parents.push(node);
							node = node.parentNode;

						}

					}

				};

			} else {
				return this.parents();
			}

		} else {

			if ( selector ) {

				for (var i = 0; i < this.elements.length; i++) {
					var node = this.elements[i].node;

					while ( node ) {

						if ( node[ matchesSelector ]( selector ) ) {
							node = undefined;
						} else {

							if ( filter ) {

								if ( node[ matchesSelector ](selector) ) {
									parents.push( node );
								}

								node = node.parentNode;

							} else {

								parents.push( node );
								node = node.parentNode;

							}

						}	

					}

				};

			} else {
				return this.parents();
			}

		}

		elements = parents;
		return newObject;

	};

   /* `closest` function
	* Returns the element(s)'s parents which are
	*/

	wQueryObj.prototype.closest = function ( selector, context ) {

		var newObject = new wQueryObj();
		var result    = [];
		var elements  = [];

		if ( selector ) {

			if ( typeof selector === 'string' ) {

				if ( selector.atChar(0) == '<' && selector.charAt( selector.length - 1 ) == ' >') {
					selector = document.createElement( selector.charAt( selector.indexOf('<'), selector.indexOf('>') - selector.indexOf('<') -1 ) );
				};

				if ( context ) {

					if ( typeof context == 'string' ) {

						if ( context.charAt(0) == '#' ) {
							context = document.getElementsByClassName( context.splice('#')[1] );
						} else if ( context.charAt(0) == '.' ) {
							context = document.getElementsByClassName( context.splice('.')[1] );
						} else {
							context = document.getElementsByTagName( context );
						}

					}; 

					if ( typeof context == 'object') {

						var valid;

						if ( context.elements ) {

							for (var i = 0; i < context.elements.length; i++) {
								if ( context.elements[i].nodeType && context.elements[i].nodeType == 1 ) valid.push( context.elements[i] );
							};

							context = valid;

						} else if ( context.length ) {

							for (var i = 0; i < context.length; i++) {
								if ( context.elements[i].nodeType && context[i].nodeType == 1 ) valid.push( context[i] );
							};

							context = valid;

						}

					};

					if ( context ) {

						var validContext = [],
							i = context.length - 1;  

						while ( i-- ) {

							var node = context[i].parentNode;

							while ( node ) {

								if ( node == context ) {
									validContext.push ( context[i] );
								} else if ( node == document.getElementsByTagName('body') ) {
									node = undefined;
								} else {
									node = node.parentNode;
								}

							}

						};

						context = validContext;

					}

				} else {

					if ( context ) {
						context = [ context ];
					} else {
						context = [ document ];
					}

				}

				for (var i = 0; i < this.elements.length; i++) {
					var node = this.elements[i].parentNode;

					while ( node ) {

						if (node[ matchesSelector ](selector)) {
							elements.push( node );
						} 

					}

				};

				if ( context == document ) {
					
					result = elements;
					elements = result;

					return newObject;

				} else {

					for (var i = 0; i < elements.length; i++) {
						
						var node = elements[i].parentNode;

						while ( node ) {

							for (var i = 0; i < context.length; i++) {
								if ( node == context[i] ) {
									result.push( node );
								} else {
									node = node.parentNode;
								}
							};

						}

					};

					elements = result;
					return newObject

				}

			} else if ( typeof selector === 'object' ) {

				if ( selector.elements ) {

					for (var i = 0; i < this.elements.length; i++) {
							
						var node = this.elements[i].parentNode;

						for (var x = 0; x < selector.elements.length; x++) {
							
							while ( node ) {

								if ( node == selector.elements[x] ) {
									elements.push( node );
								} else {	
									node = node.parentNode;
								}

							}

						};

					};

				} else if ( selector.length ) {

					for (var i = 0; i < this.elements.length; i++) {
							
						var node = this.elements[i].parentNode;

						for (var x = 0; x < selector.length; x++) {
							
							while ( node ) {

								if ( node == selector[x] ) {
									elements.push( node );
								} else {	
									node = node.parentNode;
								}

							}

						};

					}; 

				} else {

					for (var i = 0; i < this.elements.length; i++) {
							
						var node = this.elements[i].parentNode;
							
						while ( node ) {

							if ( node == selector ) {
								elements.push( node );
							} else {	
								node = node.parentNode;
							}

						}

					}; 			

				};

				if ( context ) {

					for (var i = 0; i < elements.length; i++) {
						
						var node = elements[i].parentNode;

						while ( node ) {

							if ( node == context ) {
								result.push( node );
							} else {
								node = node.parentNode;
							}

						}

					};

				}

				elements = result;
				return newObject;

			} else {
				elements = this.elements;
				return newObject;
			}

		} else {
			elements = this.elements;
			return newObject;
		}

	};

   /* `is` function
	* Returns true if one of the elements comply the function
	*/

	wQueryObj.prototype.is = function ( check ) {

		if ( check ) {

			if ( typeof check == 'string' ) {

				if ( check.atChat(0) == '<' && check.atChar( check.length - 1 ) == '>' ) {

					for (var i = 0; i < this.elements.length; i++) {
						if ( this.elements[i].toString() == check ) return true;
					};

					return false;

				}

				var i = this.elements.length;

				if( !i ){
					return false;
				}

				while( i-- ){

					if( WQTools.is( this.elements[ i ], check ) ){
						return true;
					}

				}

			} else if ( typeof check == 'object' ) {

				if ( check.elements ) {

					for (var i = 0; i < this.elements.length; i++) {
						for (var x = 0; x < check.elements.length; x++) {
							if ( this.elements[i] == check.elements[x] ) return true;
						};
					};

					return false

				} else if ( check.length ) {

					for (var i = 0; i < this.elements.length; i++) {
						for (var x = 0; x < check.elements.length; x++) {
							if ( this.elements[i] == check[x] ) return true;
						};
					};

					return false

				} else if ( check.nodeType == 1) {

					for (var i = 0; i < this.elements.length; i++) {
						if ( this.elements[i] == check ) return true;
					};

					return false

				}

			} else if ( typeof check == 'function' ) {



			}

		} else {
			return false;
		}

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

	/* `offset` method
	 * Get the coordinates of the first collection element
	 */

	wQueryObj.prototype.offset = function ( coordinates ) {

		if ( coordinates ) {

			if ( typeof coordinates == 'object' && coordinates.top && coordinates.left ) {


			};

		} else {

			var coordinates = {

				top: this.elements[0].offsetTop,
				left:  this.elements[0].offsetLeft

			};

			return coordinates;

		}

	};

	/* `add` function
	 * Make an union of 2 collection
	 */

	wQueryObj.prototype.add = function ( coll2, context ) {

 		var result = [];
		result = result.concat( this.elements );

 		if ( typeof coll2 === 'string' ) {

 			var added = [];

 			if ( coll2.charAt(0) == '<' && coll2.charAt( coll2.length - 1 ) == '>' ) {
 				result.push( document.createElement( coll2.substr( coll2.indexOf('<') + 1, coll2.indexOf('>') - coll2.indexOf('<') - 1 ) ) );
 			} else {

	 			if ( context ) {

	 				if ( context.atChar(0) == '#' ) {
	 					context = [ document.getElementById( context.splice('#')[1] ) ];
	 				} else if ( context.atChar(0) == '.' ) {
	 					context = document.getElementsByClassName( context.splice('.')[1] );
	 				} else {
	 					context = document.getElementsByTagName( context );
	 				};

	 				if ( context ) {

	 					var valid = [];

	 					for (var i = 0; i < context.length; i++) {
	 						
	 						var node = context[i];

	 						while ( node ) {

	 							if ( node == context ) {
	 								valid.push( context[i] );
	 							} else {
	 								node = node.parentNode;
	 							}

	 						}

	 					};

	 					context = valid;

	 				};

	 			} else {

	 				if ( context ) {
	 					context = context;
	 				} else {
	 					context = document;
	 				}
	 				
	 			}

	 		}

	 		for (var i = 0; i < context.length; i++) {
	 			result = result.concat( WQTools.convertToArray( context[i].querySelectorAll( coll2 ) ) );
	 		};

 		} else if ( typeof coll2 == "object" ) {

 			if ( coll2.elements ) {

 				if ( context ) {

 				} else {

	 				for (var i = 0; i < coll2.elements.length; i++) {
	 					result.push( coll2.elements[i] );
	 				};

	 			}

 			} else if ( coll2.length ) {

 				if ( context ) {

	 			} else {

	 				for (var i = 0; i < coll2.length; i++) {
	 					result.push( coll2[i] );
	 				};

	 			}

 			} else {
 				result.push( coll2 );
 			}

 		}

 		if ( context ) {

 			var valid = [];
 			valid = valid.concat( this.elements );

 			for (var i = 0; i < result.length; i++) {
 				var node = result[i].parentNode;

 				while( node ) {

 					if ( node == context ) {
 						valid.push( result[i] );
 					} else {
 						node = node.parentNode;
 					}

 				}

 			};

 			result = valid;

 		}

		var newElement = new wQueryObj();
		elements = WQTools.removeDuplicated(result);

		return newElement;

	};

	/* `prev` function
	 * Get the provious element of the first element in the collection
	 */

	wQueryObj.prototype.prev = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [];

		if ( selector ) {

			for (var i = 0; i < this.elements.length; i++) {
				var parentContext = this.elements[i].parentNode,
					element       = parentContext.children[ parentContext.children.indexOf( this.elements[0] ) - 1 ];
				
				if ( element && element[ matchesSelector ]( selector ) ) result.push( element );

			}

		} else {

			for (var i = 0; i < this.elements.length; i++) {
				var parentContext = this.elements[i].parentNode,
					element       = parentContext.children[ parentContext.children.indexOf( this.elements[0] ) - 1 ];
				
				if ( element ) result.push( element );

			}

		}

		elements = result;
		return newObject;

	};

	/* `prevAll` function
	 * Get the provious elements of the first element in the collection
	 */

	wQueryObj.prototype.prevAll = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [];

		for (var i = 0; i < this.elements.length; i++) {
			
			var parent = this.elements[i].parentNode,
				index  = parent.children.indexOf( this.elements[i] );

			for (var x = 0; x < index - 1; x++) {
				
				if ( selector ) {
					if ( parent.children[x][ matchesSelector ]( selector ) ) result.push( parent.children[x] );
				} else {
					result.push( parent.children[x] );
				}

			};

		};

	};

	/* `prevUntil` function
	 * Get the provious element of the first element in the collection until selector
	 */

	wQueryObj.prototype.prevUntil = function ( selec, filter ) {

		var newObject = new wQueryObj(),
			result    = [];

		if ( elements ) {

			for ( var i = 0; i < this.elements.length; i++ ) {
				var parent = this.elements[i].parentNode,
					index  = parent.children.indexOf( this.elements[ i ] );

				for ( var x = index - 1; x >= 0; x-- ) {
					
					if ( parent.children[x][ matchesSelector ]( selector ) ) {
						break;
					} else {

						if ( filter ) {

							if ( parent.children[x][ matchesSelector ]( selector ) ) result.push( parent.children[x] );

						} else {
							result.push( parent.children[x] );
						}

					}

				};

			};

			elements = result;
			return newObject;

		} else {
			return this.prevAll;
		}

	}

	/* `detach` function
	 * Remove DOM elements
	 */

	wQueryObj.prototype.detach = function ( selector ) {

		for (var i = 0; i < this.elements.length; i++) {
			var parent = this.elements[i].parentNode;
			if ( selector ) {
				if ( this.elements[i][ matchesSelector ]( selector ) ) parent.removeChild( this.elements[i] );
			} else {
				parent.removeChild( this.elements[i] );
			}

		};

	};

	/* `siblings` function
	 * Return the sibling elements of the actual collection
	 */

	wQueryObj.prototype.siblings = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [];

		for (var i = 0; i < this.elements.length; i++) {
			var parent = this.elements[i].parentNode,
				index  = parent.children.indexOf( this.elements[i] );

			for (var x = 0; x < parent.children.length; x++) {
					
				if ( x == index ) {
					continue;
				} else {

					if ( selector ) {
						if ( parent.children[x][ matchesSelector ]( selector ) ) result.push( parent.children[x] );
					} else {
						result.push( parent.children[x] );
					}

				}

			};

		};

		elements = result;
		return newObject;

	}

	/* `next` function
	 * Return the sibling element of the actual collection
	 */

	wQueryObj.prototype.next = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [];

		if ( this.elements ) {

			for (var i = 0; i < this.elements.length; i++) {

				var parentContext = this.elements[i];

				if ( selector ) {
					
					while ( index ) {

						var index = parentContext.indexOf( this.elements[i] ) + 1;
							next  = parentContext.children( index );

						if ( next[ matchesSelector ](selector) ) {
							result.push( next );
						} else {
							index == parentContext.children.length ? index = undefined : index += 1;						
						}

					}

				} else {

					var next = parentContext.children( parentContext.indexOf( this.elements[i] ) + 1 );
					if ( next ) result.push( next );

				}
			};

		} else {
			return this;
		}

		elements = result;
		return newObject;

	};

	/* `nextAll` function
	 * Return the siblings elements of the actual collection
	 */

	wQueryObj.prototype.nextAll = function ( selector ) {

		var newObject = new wQueryObj(),
			result = [];

		if ( selector ) {

			for (var i = 0; i < this.elements.length; i++) {
				
				var parentNode = this.elements[i].parentNode;
				var initIndex  = parentNode.children.indexOf( this.elements[i] );

				for (var x = initIndex + 1; x < parentNode.length; x++) {
					
					if ( parentNode.children[ x ][ matchesSelector ]( selector ) ) {
						result.push( parentNode.children[ x ] );
					}

				};

			};

			elements = result;
			return newObject;

		} else {

			for (var i = 0; i < this.elements.length; i++) {
				
				var parentNode = this.elements[i].parentNode;
				var initIndex  = parentNode.children.indexOf( this.elements[i] );

				for (var x = initIndex + 1; x < parentNode.length; x++) {
					result.push( parentNode.children[ x ] );
				};

			};

			elements = result;
			return newObject;

		}

	};

	/* `nextUntil` function
	 * Return the siblings elements of the actual collection until the selector
	 */

	wQueryObj.prototype.nextUntil = function ( selector, filter ) {

		var newObject = new wQueryObj(),
			result    = []; 

		if ( selector ) {

			for (var i = 0; i < this.elements.length; i++) {
				var parentNode = this.elements[i].parentNode;
					index      = parentNode.children.indexOf( this.elements[i] ) + 1;

				for (var x = index; x < parentNode.length; x++) {
					if ( filter ) {

						if ( parentNode.children[ index ][ matchesSelector ](selector) ) {
							break;
						} else {
							if ( parentNode.children[ index ][ matchesSelector ](filter) ) {
								result.push( parentNode.children[ index ] );
							}
						};

					} else {

						if ( parentNode.children[ index ][ matchesSelector ](selector) ) {
							break;
						} else {
							result.push( parentNode.children[ index ] );
						}

					}
				};

			};

		} else {

			for (var i = 0; i < this.elements.length; i++) {
				var parentNode = this.elements[i].parentNode,
					index      = parentNode.indexOf( this.elements[i] ) + 1;

				for (var x = index; x < parentNode.length; x++) {
					result.push( parentNode.children[x] );
				};

			};

		}

		elements = result;
		return newObject;

	};

	/* `addBack` function
	 * Returns a new wQuery object with the actual element(s) an the elements at its(their) back
	 */

	wQueryObj.prototype.addBack = function ( selector ) {

		var newObject = new wQueryObj();
		var result = [];

		if ( selector ) {

			for (var i = 0; i < this.elements.length; i++) {
				
				var parent   = this.elements[i].parentNode;
				var children = WQTools.convertToArray(parent.childNodes);

				for (var x = children.indexOf( this.elements[ i ] ); x < children.length; x++) {

					if (  children[ x ][ matchesSelector ]( selector ) ) {
						result.push( children[ x ] );
					}
					
				};

			};

		} else {

			for (var i = 0; i < this.elements.length; i++) {
				
				var parent   = this.elements[i].parentNode;
				var children = WQTools.convertToArray(parent.childNodes);

				for (var x = children.indexOf( this.elements[ i ] ); x < children.length; x++) {
					result.push( children[ x ] );
				};

			};

		}

		elements = WQTools.cleanArray(result);
		return newObject;

	};

	/* `delay` function
	 * Set a timer to delay execution of subsequent items in the queue.
	 */
	 // QUEUEs not added 
	wQueryObj.prototype.delay = function ( time, queueName ) {

		if ( time ) {

			if ( time.toLowerCase() == "fast" ) {
				setTimeout(function() { return this }, 300);
			} else if ( time.toLowerCase() == "slow" ) {
				setTimeout(function() { return this }, 600);
			} else if ( typeof time == "number" ) {
				setTimeout(function() { return this }, time);
			}

		} else {
			return this;
		}

	};

	WQConstructor = new wQueryObj();

}();

var wQuery = function ( selector ) {
	return WQConstructor.init( selector );
}

$ = wQuery;