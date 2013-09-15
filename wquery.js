/*!
 * wQueryObj JavaScript Library v2.0.0 alpha
 * https://www.weezeel.com/
 */

var WQConstructor;

!function () {
	var version    		= "2.0.0 alpha";
	var undefined  		= ({}).a;
	var matchesSelector = 'matchesSelector';
	var context  		= undefined;
	var store			= {};
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

			var objects = [];

			if ( dataEvents ) {
				objects = object.elements;
				return objects;
			}

			if ( deepDataEvents ) {

				objects = object.elements;
				return objects;

			}

			if ( !dataEvents ) {
				for (var i = 0; i < object.elements.length; i++) {
					objects.push( object.elements[i] );
				};
				return objects;
			}

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

		/* nodeReturn
		// Clone the passed nodes to an valid type of element for the jail
		*/

		nodeReturn: function ( node, context ) {
			
			var result = [];

			for (var i = 0; i < node.length; i++) {
				
				var obj = {};

				for ( index in node[i] ) {
					obj[ index ] = node[i][ index ];
				}

				if ( obj.parentNode == context ) obj.parentNode = null;

				result.push( obj );

			};

			return result;

		},

		/* convertToHTML
		// Convert a HTML a string
		*/

		convertToHTML: function ( string ) {
			var container = document.createElement('div');
			container.innerHTML = string;
			var newElement = container.children[0].cloneNode( true );
			container = null;
			return newElement;	
		},

		is : function( element, selector ){
			
			return element[ matchesSelector ]( selector );

		}

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

	var wQueryObj = function ( antecesor ) {
		
		this.version   = version;
		var components = antecesor;

		this.addBack = function () {
			if ( components ) {
				var newObject = new wQueryObj();
				newObject.elements = context ? WQTools.nodeReturn( components ) : components;
				return newObject;
			} else {
				return this;
			}
		};

		this.data    = function ( key, value ) {

			if ( key && typeof key == 'string' ) {

				if ( this.elements.length <= 0 ) {

					if ( value ) {
						store[ key ] = value;
					} else {
						return store[ key ];
					}

				} else {

					if ( !value ) {
						return this.elements[0][ key ];
					} else {
						
						for (var i = 0; i < this.elements.length; i++) {
							this.elements[i][ key ] = value
						};

					}

				}

			} else if ( key && typeof key == 'object' ) {

				for ( index in key ) {

					if ( this.elements.length <= 0 ) {
						store[index] = key[ index ];
					} else {
						
						for ( var x = 0; x < this.elements.length; x++ ) {

							this.elements[x][ index ] = key[ index ];

						};

					};

				};

			};

		};

	};

   /*  `setContext` process
	*  Set the property context of the future wQueryObj objects
	*/

	wQueryObj.prototype.setContext = function ( id ) {

		var ctx;

		if ( !context ) {

			if ( id.charAt(0) === '#' ) {

				ctx = document.getElementById( id.slice( 1 ) );
				context = ctx;

			} else {
				var err = "wQueryObj ERR: Context declaration is wrong";
				throw err;
			}

		} else {
			var err = "wQueryObj ERR: You can't modify the context";
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
			
			if ( selector.charAt(0) == '<' && selector.charAt( selector.length - 1 ) == '>' ) {

				var element    = WQTools.convertToHTML( selector );
					newElement = new wQueryObj();

				newElement.elements = element;
				return newElement;

			} else {

				if ( !context ) {

					var newElement 		= new wQueryObj();
					newElement.elements = WQTools.convertToArray(document.querySelectorAll(selector));
					return newElement;

				} else if ( context ) {
					
					elements = WQTools.convertToArray(context.querySelectorAll(selector));

					var newElement 		= new wQueryObj();
					newElement.elements = WQTools.nodeReturn( elements, context );
					return newElement;

				} 

			}

		} else if ( typeof selector === "function") {

			window.onload = selector;
		
		}

	};

   /*  `get` function
	*  Get the element in the current collection with the same index
	*/
	// Revised and tested
	wQueryObj.prototype.get = function ( index ) {

		if ( context ) {
			
			if ( index  == undefined ) {
				var clone = [],
					i     = this.elements.length;

				while ( i-- ) {
					clone.push( this.elements[ i ].cloneNode() );
				}

				return clone;

			} else { 
 				var clone = this.elements[ index ].cloneNode();
				return clone;
			}

		} else {

			if ( index ) {
				return this.elements[ index ];
			} else {
				return this.elements;
			}

		}
	
	};

   /*  `index` function
	*  Returns the index of the element in the current collection
	*/

	wQueryObj.prototype.index = function ( contrast ) {

		if ( contrast ) {

			if ( typeof contrast == 'string' ) {



			} else if ( contrast.nodeType == 1 ) {

				for (var i = 0; i < this.elements.length; i++) {
					if ( this.elements[i] == contrast ) return i;
				};

			} else if ( contrast.elements ) {

				for (var i = 0; i < this.elements.length; i++) {
					if ( this.elements[i] == contrast.elements[0] ) return i;
				};

			}

		} else {

			return WQTools.convertToArray( this.elements[0].parentNode.children ).indexOf( this.elements[0] );

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

		if ( classSearched ) {

			classSearched = classSearched.toString();

			for( var i = 0, j = this.elements.length; i < j; i++ ){
				
				if( this.elements[ i ].classList.contains( classSearched ) ){
					return true;
				}

			};

		};

		return false;

	};

	/* `attr` process
	 * Check if an element(s) has an attribute(s)
	 */
	// Revised and tested
	wQueryObj.prototype.attr = function ( attr, value ) {

		if ( attr ) {

			if ( typeof attr == 'string' ) {
			
				if ( typeof value == 'function' ) {

					for (var i = 0; i < this.elements.length; i++) {
						var attrVal = value.apply( this.elements[i], [ i, attr ] );
						this.elements[i].setAttribute( attr, attrVal );
					};

					return this;

				} else {

					if ( !value ) {

						var tmp = null;

						for( var i = 0, j = this.elements.length; i < j; i++ ){

							tmp = this.elements[ i ].getAttribute( attr );

							if( tmp !== null ){
								return tmp;
								break;
							}

						}

						return tmp;

					} else {

						value = value.toString();

						for (var i = 0, j = this.elements.length; i < j; i++) {
							this.elements[ i ].setAttribute( attr, value );
						};

						return this;

					}

				}

			} else if ( typeof attr == 'object' ) {

				for (index in attr) {
					
					if ( typeof attr[index] != 'string' ) continue;

					for ( var i = 0; i < this.elements.length; i++ ) {
						this.elements[i].setAttribute( index, attr[ index ] );
					}

				};

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

		if ( classNames ) {

			if ( typeof classNames == 'string' ) {

				classNames = classNames.split(' ');

				var tmp = null;

				for( var i = 0; i < this.elements.length; i++ ){
					tmp = this.elements[ i ].classList;
					tmp.add.apply( tmp, classNames );
				};

			} else if ( typeof classNames == 'function' ) {

				for (var i = 0; i < this.elements.length; i++) {
					var className = classNames.apply( this.elements[i], [ i, this.elements[i].className ] );
					this.elements[i].className = className;
				};

			}

		}

		return this;

	};

	/* `html` process
	 * Return the first element innerHTML or change all objects' innerHTML
	 */

	wQueryObj.prototype.html = function ( HTMLInner ) {

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

		} else {
			return this.elements[0].innerHTML;
		}

	};

	/* `width` function
	 * Get/set the current width of the first element of the list
	 */

	wQueryObj.prototype.width = function () {
		return getComputedStyle( this.elements[0] ).width;
	}

	/* `height` function
	 * Get/set the current height of the first element of the list
	 */

	wQueryObj.prototype.height = function () {
		return getComputedStyle( this.elements[0] ).height;
	}

	/* `innerWidth` function
	 * Get/set the current height of the first element of the list
	 */

	wQueryObj.prototype.innerWidth = function () {
		var style = getComputedStyle( this.elements[0] );
		return parseInt(style.width.split('px')[0]) + parseInt(style.padding-left.split('px')[0]) + parseInt(style.padding-right.split('px')[0]) + 'px';
	}	

	/* `innerHeight` function
	 * Get/set the current height of the first element of the list
	 */

	wQueryObj.prototype.innerHeight = function () {
		var style = getComputedStyle( this.elements[0] );
		return parseInt(style.width.split('px')[0]) + parseInt(style.padding-top.split('px')[0]) + parseInt(style.padding-bottom.split('px')[0]) + 'px';
	}

	/* `outterWidth` function
	 * Get/set the current height of the first element of the list
	 */

	wQueryObj.prototype.outterWidth = function ( margin ) {
		var style = getComputedStyle( this.elements[0] );
		return ( margin ) ? parseInt(style.width.split('px')[0]) + parseInt(style.padding-left.split('px')[0]) + parseInt(style.padding-right.split('px')[0]) + parseInt(style.margin-right.split('px')[0]) + parseInt(style.margin-bottom.split('px')[0]) : parseInt(style.width.split('px')[0]) + parseInt(style.padding-left.split('px')[0]) + parseInt(style.padding-right.split('px')[0]) + 'px';
	}	

	/* `outterHeight` function
	 * Get/set the current height of the first element of the list
	 */

	wQueryObj.prototype.outterHeight = function ( margin ) {
		var style = getComputedStyle( this.elements[0] );
		return ( margin ) ? parseInt(style.height.split('px')[0]) + parseInt(style.padding-top.split('px')[0]) + parseInt(style.padding-bottom.split('px')[0]) + parseInt(style.margin-top.split('px')[0]) + parseInt(style.margin-bottom.split('px')[0]) : parseInt(style.height.split('px')[0]) + parseInt(style.padding-top.split('px')[0]) + (style.padding-bottom.split('px')[0]);
	}

	/* `insertBefore` process
	 * Insert an element before other
	 */

	wQueryObj.prototype.insertBefore = function ( elementss ) {
	
		if ( elementss ) {

			var nodes = [];

			if ( typeof elementss == 'string' ) {

				if ( context ) {
					nodes = WQTools.convertToArray( context.querySelectorAll( elementss ) );
				} else {
					nodes = WQTools.convertToArray( document.querySelectorAll( elementss ) );
				}

				for (var i = 0; i < nodes.length; i++) {

					var parent = nodes[i]

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertBefore( this.elements[x], nodes[i] );
					};

				};

				return this;

			} else if ( typeof elementss == 'object' ) {

				if ( elementss.elements ) {
					nodes = elementss.elements;
				} else if ( elementss.length ) {
					nodes = WQTools.convertToArray( elementss );
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

					var parent = nodes[i].parentNode;

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertBefore( this.elements[x], nodes[i] );
					};

				};

				return this;

			}

		} else {
			return this;
		}

	};

	/* `insertAfter` process
	 * Insert an element after other
	 */

	wQueryObj.prototype.insertAfter = function ( elementss ) {
	
		if ( elementss ) {

			var nodes = [];

			if ( typeof elementss == 'string' ) {

				if ( context ) {
					nodes = WQTools.convertToArray( context.querySelectorAll( elementss ) );
				} else {
					nodes = WQTools.convertToArray( document.querySelectorAll( elementss ) );
				}

				for (var i = 0; i < nodes.length; i++) {

					var parent = nodes[i]

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertAfter( this.elements[x], nodes[i].nextSibling );
					};

				};

			} else if ( typeof elementss == 'object' ) {

				if ( elementss.elements ) {
					nodes = elementss.elements;
				} else if ( elementss.length ) {
					nodes = WQTools.convertToArray( elementss );
				} else if ( elementss.nodeType == 1 ) {
					nodes = elementss;
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

					var parent = nodes[i].parentNode;

					for (var x = 0; x < this.elements.length; x++) {
						parent.insertBefore( this.elements[x], nodes[i].nextSibling );
					};

				};

			}

		} else {
			return this;
		}

	};

	/* `before` process
	 * Insert content, specified by the parameter, before each element in the set of matched elements.
	 */

	wQueryObj.prototype.before = function () {

		for (var i = 0; i < arguments.length; i++) {
			
			if ( typeof arguments[i] == 'string' && ( arguments[i].charAt(0) == '<' && arguments[i].charAt( arguments[i].length - 1 ) == '>' ) ) {

				for ( var x = 0; x < this.elements.length; x++ ) {

					var parent  = this.elements[x].parentNode,
						content = WQTools.convertToHTML( arguments[i] );

					parent.insertBefore( content, this.elements[x] );

				}

			} else if ( typeof arguments[i] == 'function' ) {

				for (var x = 0; x < this.elements.length; x++) {
				
					var content = arguments[i].apply( this.elements[ x ], [ x ] ),
						parent  = this.elements[x].parentNode;

					parent.insertBefore( content, this.elements[x] );

				};

			} else if ( typeof arguments[i] == 'object' ) {

				if ( arguments[i].elements ) {

					for ( var y = 0; y < arguments[i].elements.length; y++ ) {
						
						for ( var x = 0; x < this.elements.length; x++ ) {

							if ( arguments[i].elements[y].nodeType == 1 ) {

								if ( arguments[i].elements[y].nodeType == 1 ) this.elements[x].parentNode.insertBefore( arguments[i].elements[y], this.elements[x] );

							}

						}

					}

				} else if ( arguments[i].length ) {

					for ( var y = 0; y < arguments[i].length; y++ ) {
						
						for ( var x = 0; x < this.elements.length; x++ ) {

							if ( arguments[i][y].nodeType == 1 ) {

								if ( arguments[i][y].nodeType == 1 ) this.elements[x].parentNode.insertBefore( arguments[i][y], this.elements[x] );

							}

						}

					}

				} else if ( arguments[i].nodeType == 1 ) {

					for (var x = 0; x < this.elements.length; x++) {

						this.elements[x].parentNode.insertBefore( arguments[i], this.elements[x] );

					};

				};

			};

		};

	}

	/* `after` process
	 * Insert content, specified by the parameter, after each element in the set of matched elements.
	 */

	wQueryObj.prototype.after = function () {

		for (var i = 0; i < arguments.length; i++) {
			
			if ( typeof arguments[i] == 'string' && ( arguments[i].charAt(0) == '<' && arguments[i].charAt( arguments[i].length - 1 ) == '>' ) ) {

				for ( var x = 0; x < this.elements.length; x++ ) {

					var parent  = this.elements[x].parentNode,
						content = WQTools.convertToHTML( arguments[i] );

					parent.insertBefore( content, this.elements[x].nextSibling );

				}

			} else if ( typeof arguments[i] == 'function' ) {

				for (var x = 0; x < this.elements.length; x++) {
				
					var content = arguments[i].apply( this.elements[ x ], [ x ] ),
						parent  = this.elements[x].parentNode;

					parent.insertBefore( content, this.elements[x].nextSibling );

				};

			} else if ( typeof arguments[i] == 'object' ) {

				if ( arguments[i].elements ) {

					for ( var y = 0; y < arguments[i].elements.length; y++ ) {
						
						for ( var x = 0; x < this.elements.length; x++ ) {

							if ( arguments[i].elements[y].nodeType == 1 ) {

								if ( arguments[i].elements[y].nodeType == 1 ) this.elements[x].parentNode.insertBefore( arguments[i].elements[y], this.elements[x].nextSibling );

							}

						}

					}

				} else if ( arguments[i].length ) {

					for ( var y = 0; y < arguments[i].length; y++ ) {
						
						for ( var x = 0; x < this.elements.length; x++ ) {

							if ( arguments[i][y].nodeType == 1 ) {

								if ( arguments[i][y].nodeType == 1 ) this.elements[x].parentNode.insertBefore( arguments[i][y], this.elements[x].nextSibling );

							}

						}

					}

				} else if ( arguments[i].nodeType == 1 ) {

					for (var x = 0; x < this.elements.length; x++) {

						this.elements[x].parentNode.insertBefore( arguments[i], this.elements[i].nextSibling );

					};

				};

			};

		};

	};

	/* `append` process
	 * Insert the content passed by parameter at the end of each element of the collection
	 */

	wQueryObj.prototype.append = function () {

		for ( var i = 0; i < arguments.length; i++) {

			if ( typeof arguments[i] == 'string' && ( arguments[i].charAt(0) == '<' && arguments[i].charAt( arguments.length - 1 ) ) ) {

				for ( var x = 0; x < this.elements.length; x++ ) {

					this.elements[x].appendChild( WQTools.convertToHTML( arguments[i] ) );

				};

			} else if ( typeof arguments[i] == 'function' ) {

				for ( var x = 0; x < this.elements.length; x++ ) {

					var content = arguments[i].apply( this.elements[x], [ x ] );

					if ( content.nodeType == 1 ) this.elements.appendChild( content );

				}

			} else if ( typeof arguments[i] == 'object' ) {

				if ( arguments[i].elements ) {

					for ( var y = 0; y < arguments[i].elements.length; y++ ) {

						for ( var x = 0; x < this.elements.length; x++ ) {

							if ( arguments[i].elements[y].nodeType == 1 ) this.elements.appendChild( arguments[i].elements[y] );

						}

					}

				} else if ( arguments[i].length ) {

					for ( var y = 0; y < arguments[i].length; y++ ) {

						for ( var x = 0; x < this.elements.length; x++ ) {

							if ( arguments[i][y].nodeType == 1 ) this.elements.appendChild( arguments[i][y] );

						}

					}

				} else if ( arguments[i].nodeType == 1 ) {

					for ( var x = 0; x < this.elements; x++) {

						this.elements[x].appendChild( arguments[i] );

					};

				};

			};

		};

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

		return this;

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

		result = WQTools.cleanArray( WQTools.removeDuplicated( result ) );

		newObject.elements = context ? WQTools.nodeReturn( result ) : result;
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

		return this;

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

			var i   = this.elements.length,
				x   = classNames.length;

			for (var i = 0; i < this.elements.length; i++) {
				for (var x = 0; x < classNames.length; x++) {
					this.elements[i].classList.remove( classNames[x] );
				};
			};

			return this;

		} else {

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

	/* `add` process
	 * 	
	 */

	wQueryObj.prototype.add = function ( coll2, ctx ) {

		var result     = [];
		result 		= result.concat( this.elements );

		if ( typeof coll2 === 'string' ) {

			var added = [];

			if ( coll2.charAt(0) == '<' && coll2.charAt( coll2.length - 1 ) == '>' ) {
				result.push( document.createElement( coll2.substr( coll2.indexOf('<') + 1, coll2.indexOf('>') - coll2.indexOf('<') - 1 ) ) );
				components.push( document.createElement( coll2.substr( coll2.indexOf('<') + 1, coll2.indexOf('>') - coll2.indexOf('<') - 1 ) ) )
			} else {

 			if ( ctx ) {

				var node = ctx.parentNode;

				while ( node ) {

					if ( node == context ) {
						node = undefined;
					} else if ( node == document.getElementsByTagName('html')[0] ) {
						ctx  = context;
						node = undefined;
					} else {
						node = node.parentNode;
					}

				}

 			} else {

 				if ( context ) {
 					ctx = context;
 				} else {
 					ctx = document;
 				}
 				
 			}

 			result = result.concat( WQTools.convertToArray( ctx.querySelectorAll( coll2 ) ) );

 		}

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
			valid = valid.concat( elements );

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

		var newElement		= new wQueryObj( WQTools.convertToArray( this.elements ) );
		newElement.elements = ( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result );
		return newElement;

	};

	/* `map` process
	 * 	Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.
	 */

	wQueryObj.prototype.map = function ( funct ) {

		var newColl    = [],
			newElement = new  wQueryObj();

		if ( typeof funct == 'function' ) {

			for (var i = 0; i < this.elements.length; i++) {
				newColl.push( funct.apply( this.elements[i], [ i, this.elements[i] ] ) ;
			};

		}

		newElement.elements = ( context ) ? WQTools.nodeReturn( newColl ) : newColl;
		return newElement; 

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

		newObject.elements = [ this.elements[ index ] ] ? this.elements[ index ] : [];
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

	};

   /*  `find` function
	*  Find the elements inside the selected elements
	*/

	wQueryObj.prototype.find = function ( selector ) {

		var newObject = new wQueryObj();

		if ( selector ) {

			var results = [],
				tmp     = [];

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
							if ( selector.elements[x] == tmp[i] ) results.push( tmp[i] );
						};
					};

				} else if ( selector.length ) {

					for (var i = 0; i < tmp.length; i++) {
						for (var x = 0; x < selector.length; x++) {
							if ( selector[x] == tmp[i] ) results.push( tmp[i] );
						};
					};

				} else if ( selector.nodeType == 1 ) {
					for (var i = 0; i < tmp.length; i++) {
						if ( selector == tmp[i] ) results.push( tmp[i] );
					};	
				}

			}

			results = WQTools.removeDuplicated( results )

			newObject.elements = ( (context) ? WQTools.nodeReturn( results ) : results );
			return newObject;

		} else {

			newObject.elements = [];
			return newObject;

		}

	};

   /*  `filter` function
	*  Filter elements inside the selected elements
	*/

	wQueryObj.prototype.filter = function ( selector ) {

		var newObject = new wQueryObj(),
			results   = [];

		if ( selector ) {

			if ( typeof selector == 'string' ) {

				if ( selector.charAt(0) == '<' && selector.charAt( selector.length - 1 ) == '>' ) {

					for (var i = 0; i < this.elements.length; i++) {
						if ( this.elements[i].toString() == selector ) results.push( this.elements[i] );
					};

				}

				for( var i = 0, j = this.elements.length; i < j; i++ ) {

					if( this.elements[ i ][ matchesSelector ](selector) ){
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

			} else if ( selector.nodeType == 1 ) {

				for (var i = 0; i < this.elements.length; i++) {
					if (this.elements[i] == selector) results.push(this.elements[i]);
				};

			} else if ( typeof selector == 'function' ) {

			}

		} 

		newObject.elements = results;
		return newObject;

	};

   /*  `hasClass` function
	*  Filter elements inside the selected elements
	*/

	wQueryObj.prototype.has = function ( selector ) {

		var newObject = new wQueryObj(),
			result = [];

		if ( selector ) {

			if ( typeof selector == "string" ) {

				if ( selector.charAt(0) == '<' && selector.charAt( selector.length - 1 ) == '>' ) {

					for (var i = 0; i < this.elements.length; i++) {

						var nodes = this.elements[i].children;

						for (var x = 0; x < nodes.length; x++) {
							if ( nodes[x] == selector ) result.push( this.elements[i] );
						};
						 
					};

				} else {

					for (var i = 0; i < this.elements.length; i++) {

						var nodes = this.elements[i].children;

						for (var x = 0; x < nodes.length; x++) {
							if ( nodes[x][ matchesSelector ](selector) ) result.push( this.elements[i] );
						};

					};

				}

				newObject.elements = result;
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
		newObject.elements = WQTools.clone( this, dataAndEvents, deepDataAndEvents );
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

				for( var k = 0; k < this.elements[ i ].children.length; k++ ){

					if( WQTools.is( this.elements[ i ].children[ k ], selector ) ){
						result.push( this.elements[ i ].children[ k ] );
					}

				}

			};

		} else {

			for (var i = 0; i < this.elements.length; i++) {
				var childrens = this.elements[i].children;
				for (var x = 0; x < childrens.length; x++) {
					result.push( childrens[x] );
				};
			};

		}

		newObject.elements = ( ( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result ) );
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

			newElement.elements = (( context ) ? WQTools.nodeReturn(WQTools.removeDuplicated(parents)) : WQTools.removeDuplicated(parents) );
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
			newElement.elements = (( context ) ? WQTools.nodeReturn(WQTools.removeDuplicated(parents)) : WQTools.removeDuplicated(parents) );
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

				while ( node != document ) {

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

			newElement.elements = ( (context) ? WQTools.nodeReturn(WQTools.removeDuplicated(parents)) : WQTools.removeDuplicated(parents));
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
			ewElement.elements = ( (context) ? WQTools.nodeReturn(WQTools.removeDuplicated(parents)) : WQTools.removeDuplicated(parents));
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

							newObject.elements = ( (context) ? WQTools.nodeReturn(WQTools.removeDuplicated(parents)) : WQTools.removeDuplicated(parents));
							node = undefined;

						} else if ( node == document.getElementsByTagName('body')[0] ) {

							parents = [];

						} else if ( node[ matchesSelector ](selector) ) {

							parents = eachNode;
							node 	= node.parentNode;

						} else {

							if ( filter ) {

								if ( node[ matchesSelector ]( filter ) ) parents.push( node );
								node = node.parentNode;

							} else {

								parents.push( node );
								node = node.parentNode;

							}

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
					var node = this.elements[i].parentNode;

					while ( node ) {

						if ( node[ matchesSelector ]( selector ) ) {
							newObject.elements = ( (context) ? WQTools.nodeReturn(WQTools.removeDuplicated(parents)) : WQTools.removeDuplicated(parents));
							node = undefined;
						} else {

							if ( filter ) {

								if ( node[ matchesSelector ]( filter ) ) parents.push( node );
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

		return newObject;

	};

   /* `closest` function
	* Returns the element(s)'s parents which are
	*/

	wQueryObj.prototype.closest = function ( selector, ctx ) {	

		var newObject = new wQueryObj(),
			closest   = [],
			result    = [];

		if ( selector ) {

			if ( ctx ) {

				if ( context ) {

					var node = ctx.parentNode;

					while ( node ) {

						if ( node == context ) {
							node = undefined;
						} else if ( node == document.getElementsByTagName('html')[0] ) {
							ctx  = context;	
							node = undefined;
						} else {
							node = node.parentNode;
						}

					}

				}

			} else {
				ctx = ( context ) ? context : undefined;
			}

			for (var i = 0; i < this.elements.length; i++) {
				var node = this.elements[i].parentNode;

				while ( node ) {

					if ( node[ matchesSelector ]( selector ) ) {
						closest.push( node );
						node = undefined;
					} else {
						node = node.parentNode;
					}

				}

			};

			if ( !ctx ) {
				result = closest;
			} else {

				for (var i = 0; i < closest.length; i++) {
					
					var node = closest[i].parentNode;

					while ( node ) {
						if ( node == ctx ) {
							result.push( closest[i] );
						} else {	
							node = node.parentNode;
						}
					}

				};

			}

		}

		newObject.elements = ( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result );
		return newObject;

	};

   /* `is` function
	* Returns true if one of the elements comply the function
	*/

	wQueryObj.prototype.is = function ( check ) {

		if ( check ) {

			var result = false;

			if ( typeof check == 'string' ) {

				for (var i = 0; i < this.elements.length; i++) {
					if ( this.elements[i][ matchesSelector ]( check ) ) return true;
				};

			} else if ( typeof check == 'object' && check.elements ) {

				for (var i = 0; i < this.elements.length; i++) {
					for (var x = 0; x < check.length; x++) {
						if ( this.elements[i] == check.elements[x] ) return true;
					};
				};

			} else if ( typeof check == 'object' && check.nodeType == 1 ) {
				for (var i = 0; i < this.elements.length; i++) {
					if ( this.elements[i] == check ) return true;
				};
			} else if ( typeof check == 'function' ) {
				//FALTA	
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
			
		var stop   = false;

		for( var i = 0; i < this.elements.length; i++ ){

			stop = false === fn.call( i, this.elements[ i ] );

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
				value = window.getComputedStyle( this.selements[ 0 ] );

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

	/* `scrollLeft` method
	 * Get/Set the scrollLeft of the elements
	 */

	wQueryObj.prototype.scrollLeft = function ( value ) {

		if ( !value ) {
			return this.elements[0].scrollLeft;
		} else {
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].scrollLeft = value;
			};

			return this;
		}

	};

	/* `scrollTop` method
	 * Get/Set the scrollTop of the elements
	 */

	wQueryObj.prototype.scrollTop = function ( value ) {
		
		if ( !value ) {
			return this.elements[0].scrollTop;
		} else {
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].scrollTop = value;
			};

			return this;
		}

	};

	/* `prev` function
	 * Get the provious element of the first element in the collection
	 */

	wQueryObj.prototype.prev = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [],
			element;

		if ( selector ) {

			for (var i = 0; i < this.elements.length; i++) {

				var parentContext = this.elements[i].parentNode,
					children 	  = WQTools.convertToArray(parentContext.children),
					index 		  = children.indexOf( this.elements[0] ) - 1,
					element       = parentContext.children[ index ];
				
				if ( element && element[ matchesSelector ]( selector ) ) result.push( element );

			}

		} else {

			for (var i = 0; i < this.elements.length; i++) {
				var parentContext = this.elements[i].parentNode,
					children 	  = WQTools.convertToArray(parentContext.children),
					index 		  = children.indexOf( this.elements[0] ) - 1,
					element       = parentContext.children[ index ];
				
				if ( element ) result.push( element );

			}

		}

		newObject.elements =  (( context ) ? WQTools.nodeReturn(result) : result);
		return newObject;

	};

	/* `prevAll` function
	 * Get the provious elements of the first element in the collection
	 */

	wQueryObj.prototype.prevAll = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [];

		for (var i = 0; i < this.elements.length; i++) {
			
			var parent    = this.elements[i].parentNode,
				children  = WQTools.convertToArray( parent.children ),
				index 	  = children.indexOf( this.elements[i] );

			for (var x = 0; x < index; x++) {
				
				if ( selector ) {
					if ( parent.children[x][ matchesSelector ]( selector ) ) result.push( parent.children[x] );
				} else {
					result.push( parent.children[x] );
				}

			};

		};

		newObject.elements = ( ( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result ) );
		return newObject;

	};

	/* `prevUntil` function
	 * Get the provious element of the first element in the collection until selector
	 */

	wQueryObj.prototype.prevUntil = function ( selector, filter ) {

		var newObject = new wQueryObj(),
			result    = [];

		if ( selector ) {

			for ( var i = 0; i < this.elements.length; i++ ) {
				var parent 		= this.elements[i].parentNode,
					children 	= WQTools.convertToArray( parent.children ),
					index 		= children.indexOf( this.elements[i] );

				for ( var x = index - 1; x >= 0; x-- ) {
					
					if ( parent.children[x][ matchesSelector ]( selector ) ) {
						break;
					} else {

						if ( filter ) {
							if ( parent.children[x][ matchesSelector ]( filter ) ) result.push( parent.children[x] );
						} else {
							result.push( parent.children[x] );
						}

					}

				};

			};

			newObject.elements = (( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result ) );
			return newObject;

		} else {
			return this.prevAll;
		}

	};

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

		return this;

	};

	/* `siblings` function
	 * Return the sibling elements of the actual collection
	 */

	wQueryObj.prototype.siblings = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [];

		for (var i = 0; i < this.elements.length; i++) {
			
			var parent = this.elements[i].parentNode,
 				children   = WQTools.convertToArray( parent.children ),
				index 	   = children.indexOf( this.elements[i] );

			for (var x = 0; x <  children.length; x++) {
					
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

		newObject.elements = (( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result ) );
		return newObject;

	};

	/* `next` function
	 * Return the sibling element of the actual collection
	 */

	wQueryObj.prototype.next = function ( selector ) {

		var newObject = new wQueryObj(),
			result    = [];

		for (var i = 0; i < this.elements.length; i++) {

			if ( this.elements[i].nextElementSibling ) {
				
				if ( !selector ) {
					result.push( this.elements[i].nextElementSibling );
				} else {
					if ( this.elements[i].nextElementSibling[ matchesSelector ]( selector ) ) result.push( this.elements[i].nextElementSibling );
				}

			}

		};

		newObject.elements = (( context ) ? WQTools.nodeReturn( result ) : result );
		return newObject;

	};

	/* `nextAll` function
	 * Return the siblings elements of the actual collection
	 */

	wQueryObj.prototype.nextAll = function ( selector ) {

		var newObject = new wQueryObj(),
			result = [];

		for (var i = 0; i < this.elements.length; i++) {
			
			var children   = WQTools.convertToArray(this.elements[i].parentNode.children),
			    initIndex  = children.indexOf( this.elements[i] );

			for (var x = initIndex + 1; x < children.length; x++) {
				
				if ( !selector ) {
					result.push( children[ x ] );
				} else {
					if ( children[ x ][ matchesSelector ]( selector ) ) result.push( children[ x ] );
				}

			};

		};

		newObject.elements = (( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result ) );
		return newObject;

	};

	/* `nextUntil` function
	 * Return the siblings elements of the actual collection until the selector
	 */

	wQueryObj.prototype.nextUntil = function ( selector, filter ) {

		var newObject = new wQueryObj(),
			result    = []; 

		for (var i = 0; i < this.elements.length; i++) {
			
			var children = WQTools.convertToArray( this.elements[i].parentNode.children ),
				index    = children.indexOf( this.elements[ i ] ) + 1;

			for (var i = index; i < children.length; i++) {
		
				if ( selector ) {

					if ( children[i][ matchesSelector ]( selector ) ) {
						break;
					} else {

						if ( !filter ) {
							result.push( children[i] );
						} else {
							if ( children[i][ matchesSelector ]( filter ) ) result.push( children[i] );
						}
					
					}

				} else {
					return this.nextAll();
				}

			};

		};

		newObject.elements = (( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result ) );
		return newObject;

	};

	/* `wrap` function
	 * Wrap the collection elements inside the passed element
	 */

	wQueryObj.prototype.wrap = function ( element ) {

		if ( element ) {

			if ( typeof element == 'string' ) {

				if ( element.charAt(0) == '<' && element.charAt( element.length - 1 )) {
					
					for (var i = 0; i < this.elements.length; i++) {
								
						var parent = this.elements[i].parentNode;
						var clone  = WQTools.convertToHTML( element );
						parent.appendChild( clone );
						
						var node = clone.children[0];

						if ( !node ) {
							node.appendChild( this.elements[i] );
						} else {

							while ( node ) {

								if ( !node.children[0] ) {
									node.appendChild( this.elements[i] );
									node = null;
								} else {
									node = node.children[0];
								}

							}

						}

					};

				} else {

					element = ( context ) ? context.querySelectorAll(element) : document.querySelectorAll(element);

					for (var i = 0; i < element.length; i++) {
						
						for (var x = 0; x < this.elements.length; x++) {
							
							var parent = this.elements[x].parentNode;
							var clone  = element[i].cloneNode( true );
							var inbef  = parent.childNodes[( WQTools.convertToArray( parent.children ) ).indexOf( this.elements[x] ) + 1 ];

							parent.insertBefore( clone, inbef );
							
							var node = clone.children[0];

							if ( !node ) {
								node.appendChild( this.elements[i] );
							} else {
								
								while ( node ) {

									if ( !node.children[0] ) {
										node.appendChild( this.elements[i] );
										node = null;
									} else {
										node = node.children[0];
									}

								}

							}

						};

					};

				}

			} else if ( typeof element == 'function' ) {
				
				for (var i = 0; i < this.elements.length; i++) {
					
					var clone  = element.apply( this.elements[i], [ i ] );
					var parent = this.elements[x].parentNode;
					var inbef  = parent.childNodes[( WQTools.convertToArray( parent.children ) ).indexOf( this.elements[x] ) + 1 ];

					parent.insertBefore( clone, inbef );
					
					var node = clone.children[0];

					if ( !node ) {
						node.appendChild(this.elements[i]);
					} else {

						while ( node ) {

							if ( !node.children[0] ) {
								node.appendChild(this.elements[i]);
								node = null;
							} else {
								node = node.children[0];
							}

						}

					}

				};

			} else if ( typeof element == 'object' && element.elements ) {

				for (var i = 0; i < element.elements.length; i++) {
					
					for (var x = 0; x < this.elements.length; x++) {
						
						var parent = this.elements[x].parentNode;
						var clone  = element.elements[i].cloneNode( true );
						parent.appendChild( clone );
						
						var node = clone.children[0];

						if ( !node ) {
							node.appendChild(this.elements[x]);
						} else {

							while ( node ) {

								if ( !node.children[0] ) {
									node.appendChild(this.elements[x]);
									node = null;
								} else {
									node = node.children[0];
								}

							}

						};

					};

				};

			} else if ( typeof element == 'object' && element.nodeType == 1 ) {

				for (var i = 0; i < this.elements.length; i++) {
							
					var parent = this.elements[i].parentNode;
					var clone  = element.cloneNode( true );
					parent.appendChild( clone );
					
					var node = clone.children[0];

					if ( !node ) {
						node.appendChild( this.elements[i] );
					} else {

						while ( node ) {

							if ( !node.children[0] ) {
								node.appendChild( this.elements[i] );
								node = null;
							} else {
								node = node.children[0];
							}

						}

					}

				};

			} else if ( typeof element == 'object' && element.length ) {

				for (var i = 0; i < element.length; i++) {
					
					for (var x = 0; x < this.elements.length; x++) {
						
						if ( element[i].nodeType === 1 ) {

							var parent = this.elements[x].parentNode;
							var clone  = element.elements[i].cloneNode( true );
							parent.appendChild( clone );
							
							var node = clone.children[0];

							if ( !node ) {
								node.appendChild( this.elements[i] );
							} else {
								
								while ( node ) {

									if ( !node.children[0] ) {
										node.appendChild(this.elements[x]);
										node = null;
									} else {
										node = node.children[0];
									}

								}

							}

						}

					};

				};

			} 

		}

		return this;

	};

	/* `unwrap` function
	 * remove the parent element of the current element collection
	 */

	wQueryObj.prototype.unwrap = function () {

		var parents  = [],
			children = [];

		for (var i = 0; i <  this.elements.length; i++) {
			if( parents.indexOf( this.elements[i].parentNode ) < 0 ) parents.push( this.elements[i].parentNode );
		};

		for (var i = 0; i < parents.length; i++) {
			
			var parent = parents[i].parentNode,
				inbef  = parent.childNodes[ ( (WQTools.convertToArray( parent )).indexOf( parents[i] ) + 1 ) ];
				child  = parents[i].children,
				x      = 0;

			while( x < child.length ) {
				children.push( child[x].cloneNode( true ) );
				x += 1;
			};

			parent.removeChild( parents[i] );

			for (var x = 0; x < children.length; x++) {
				( inbef && inbef.nodeType == 1 ) ? parent.insertBefore( children[x], inbef ) : parent.appendChild( children[x] );
			};

		};

		return this;

	};

	/* `unwrap` function
	 * remove the parent element of the current element collection
	 */

	wQueryObj.prototype.wrapInner = function ( objects ) {

		if ( objects ) {

			if ( typeof objects == 'string' ) {

				if ( objects.charAt(0) == '<' && objects.charAt( objects.length - 1 )) {

					for (var x = 0; x < this.elements.length; x++) {
						
						var content  = this.elements[x].cloneNode(true).children;

						this.elements[x].innerHTML = "";
						this.elements[x].appendChild( WQTools.convertToHTML( objects ) );

						var node = this.elements[x].children[0];

						if ( !node ) {
							newWrap.innerHTML = content;
						} else {

							while ( node ) {

								if ( node.children[0] ) {
									node = node.children[0];
								} else {
									console.log( node );
									for (var y = 0; y < content.length; y++) {
										node.appendChild( content[y].cloneNode( true ) );
									};

									node = undefined;
								}

							}

						}

					};

				} else {

					objects = ( context ) ? context.querySelectorAll( objects ) : document.querySelectorAll( objects );

					for (var i = 0; i < objects.length; i++) {
						
						for (var x = 0; x < this.elements.length; x++) {
							
							var content  = this.elements[x].cloneNode(true).children;

							this.elements[x].innerHTML = "";
							this.elements[x].appendChild( objects[i].cloneNode( true ) );

							var node = this.elements[x].children[0]

							if ( !node ) {
								newWrap.innerHTML = content;
							} else {

								while ( node ) {

									if ( node.children[0] ) {
										node = node.children[0];
									} else {
										console.log( node );
										for (var y = 0; y < content.length; y++) {
											node.appendChild( content[y].cloneNode( true ) );
										};

										node = undefined;
									}

								}

							}

						};

					};

				}	

			} else if ( typeof objects == 'function' ) {	
					
				for (var x = 0; x < this.elements.length; x++) {
					
					var object   = objects.apply( this.elements[x], [] );
					var content  = this.elements[x].cloneNode(true).children;

					this.elements[x].innerHTML = "";
					this.elements[x].appendChild( object.cloneNode( true ) );

					var node = this.elements[x].children[0]

					if ( !node ) {
						newWrap.innerHTML = content;
					} else {

						while ( node ) {

							if ( node.children[0] ) {
								node = node.children[0];
							} else {
								console.log( node );
								for (var y = 0; y < content.length; y++) {
									node.appendChild( content[y].cloneNode( true ) );
								};

								node = undefined;
							}

						}

					}

				};

			} else if ( typeof objects == 'object' && objects.elements ) {

				for (var i = 0; i < objects.elements.length; i++) {
					
					for (var x = 0; x < this.elements.length; x++) {
						
						var content  = this.elements[x].cloneNode(true).children;

						this.elements[x].innerHTML = "";
						this.elements[x].appendChild( objects.elements[i].cloneNode( true ) );

						var node = this.elements[x].children[0]

						if ( !node ) {
							newWrap.innerHTML = content;
						} else {

							while ( node ) {

								if ( node.children[0] ) {
									node = node.children[0];
								} else {
									console.log( node );
									for (var y = 0; y < content.length; y++) {
										node.appendChild( content[y].cloneNode( true ) );
									};

									node = undefined;
								}

							}

						}

					};

				};

			} else if ( typeof objects == 'object' && objects.nodeType == 1 ) {
					
				for (var x = 0; x < this.elements.length; x++) {
					
					var content  = this.elements[x].cloneNode(true).children;

					this.elements[x].innerHTML = "";
					this.elements[x].appendChild( objects.cloneNode( true ) );

					var node = this.elements[x].children[0];

					if ( !node ) {
						newWrap.innerHTML = content;
					} else {

						while ( node ) {

							if ( node.children[0] ) {
								node = node.children[0];
							} else {
								console.log( node );
								for (var y = 0; y < content.length; y++) {
									node.appendChild( content[y].cloneNode( true ) );
								};

								node = undefined;
							}

						}

					}

				};

			} else if ( typeof objects == 'object' && objects.length ) {

				for (var i = 0; i < objects.length; i++) {
					
					for (var x = 0; x < this.elements.length; x++) {
						
						var content  = this.elements[x].cloneNode(true).children;

						this.elements[x].innerHTML = "";
						this.elements[x].appendChild( objects[i].cloneNode( true ) );

						var node = this.elements[x].children[0]

						if ( !node ) {
							newWrap.innerHTML = content;
						} else {

							while ( node ) {

								if ( node.children[0] ) {
									node = node.children[0];
								} else {
									console.log( node );
									for (var y = 0; y < content.length; y++) {
										node.appendChild( content[y].cloneNode( true ) );
									};

									node = undefined;
								}

							}

						}

					};

				};

			};

		}
			
		return this;

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

var interout    = [];

const interval  = function ( funct, time ) {
	return interout.push( setInterval( funct, time ) );
};

const clearInt  = function ( index ) {
	clearInterval(interout[ index - 1 ]);
};

const timeout   = function ( funct, time ) {
	return interout.push( setTimeout( funct, time ) );
};

const clearTime = function () {
	clearTimeout(interout[ index - 1 ]);
};

var wQuery = function ( selector ) {
	return WQConstructor.init( selector );
};

$ = wQuery;