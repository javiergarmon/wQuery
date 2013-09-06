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
			
			if ( node.length ) {
				
				var arr = [],
					i   = node.length;

				while ( i-- ) {

					var obj = {};

					for ( index in node[i] ) {
						obj[ index ] = node[ index ];
					}		

					arr.push( obj );
				}

				i = arr.length;

				while ( i-- ) {
					if ( arr[i].parentNode == context ) arr[i].parentNode = null;
				}

				return arr;

			} else {

				var obj = {};

				for ( index in node ) {
					obj[ index ] = node[ index ];
				}

				if ( node.parentNode == context ) node.parentNode = null;
				return obj;

			}

		},

		is : function( element, selector ){
			return element[ matchesSelector ]( selector );
		}

	};

	var context  = undefined;

	var wQueryObj = function () {
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

				var newElement 		= new wQueryObj();
				newElement.elements = WQTools.convertToArray(document.querySelectorAll(selector));
				return newElement;

			} else if ( context ) {
				
				elements = WQTools.convertToArray(context.querySelectorAll(selector));

				var newElement 		= new wQueryObj();
				newElement.elements = WQTools.nodeReturn( elements );
				return newElement;

			} else if ( selector.charAt(0) == '<' && selector.charAt( selector.length - 1 ) == '>' ) {

				var element = document.createElement( selector.substr( selector.indexOf('<'), selector.indexOf('>') - selector.indexOf('<') ) ),
					newElement = new wQueryObj();

				selector = selector.substr( selector.indexOf('>') + 1 );
				element.innerHTML = selector.substr( 0, selector.indexOf('<') );

				newElement.elements = element;
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

			} else if ( typeof attr == 'object' ) {

				for (index in attr) {
					
					if ( typeof attr[index] != 'string' ) continue;

					for ( var i = 0; i < this.elements.length; i++ ) {
						this.elements[i].setAttribute( index, attr[ index ] );
					}

				};

			} else if ( typeof attr == 'function') {

				for (var i = this.elements.length - 1; i >= 0; i--) {
					this.elements[i]
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

	/* `add` function
	 * Make an union of 2 collection
	 */

	wQueryObj.prototype.add = function ( coll2, ctx ) {

 		var newElement = new wQueryObj();
 			result     = [];
		result = result.concat( this.elements );

 		if ( typeof coll2 === 'string' ) {

 			var added = [];

 			if ( coll2.charAt(0) == '<' && coll2.charAt( coll2.length - 1 ) == '>' ) {
 				result.push( document.createElement( coll2.substr( coll2.indexOf('<') + 1, coll2.indexOf('>') - coll2.indexOf('<') - 1 ) ) );
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

		var newElement 		= new wQueryObj();
		newElement.elements = ( context ) ? WQTools.nodeReturn( WQTools.removeDuplicated( result ) ) : WQTools.removeDuplicated( result );
		return newElement;

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

	}

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