/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this);
};

(function ($) {

  // Add segments to a slider
  $.fn.addSliderSegments = function (amount, orientation) {
    return this.each(function () {
      if (orientation === 'vertical') {
        var output = '';
        var i;
        for (i = 1; i <= amount - 2; i++) {
          output += '<div class="ui-slider-segment" style="top:' + 100 / (amount - 1) * i + '%;"></div>';
        }
        $(this).prepend(output);
      } else {
        var segmentGap = 100 / (amount - 1) + '%';
        var segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
        $(this).prepend(segment.repeat(amount - 2));
      }
    });
  };

  $(function () {

    // Todo list
    $('.todo').on('click', 'li', function () {
      $(this).toggleClass('todo-done');
    });

    // Custom Selects
    if ($('[data-toggle="select"]').length) {
      $('[data-toggle="select"]').select2();
    }

    // Checkboxes and Radio buttons
    $('[data-toggle="checkbox"]').radiocheck();
    $('[data-toggle="radio"]').radiocheck();

    // Tooltips
    $('[data-toggle=tooltip]').tooltip('show');

    // jQuery UI Sliders
    var $slider = $('#slider');
    if ($slider.length > 0) {
      $slider.slider({
        min: 1,
        max: 5,
        value: 3,
        orientation: 'horizontal',
        range: 'min'
      }).addSliderSegments($slider.slider('option').max);
    }

    var $verticalSlider = $('#vertical-slider');
    if ($verticalSlider.length) {
      $verticalSlider.slider({
        min: 1,
        max: 5,
        value: 3,
        orientation: 'vertical',
        range: 'min'
      }).addSliderSegments($verticalSlider.slider('option').max, 'vertical');
    }

    // Focus state for append/prepend inputs
    $('.input-group').on('focus', '.form-control', function () {
      $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-control', function () {
      $(this).closest('.input-group, .form-group').removeClass('focus');
    });

    // Make pagination demo work
    $('.pagination').on('click', 'a', function () {
      $(this).parent().siblings('li').removeClass('active').end().addClass('active');
    });

    $('.btn-group').on('click', 'a', function () {
      $(this).siblings().removeClass('active').end().addClass('active');
    });

    // Disable link clicks to prevent page scrolling
    $(document).on('click', 'a[href="#fakelink"]', function (e) {
      e.preventDefault();
    });

    // Switches
    if ($('[data-toggle="switch"]').length) {
      $('[data-toggle="switch"]').bootstrapSwitch();
    }

    // Typeahead
    if ($('#typeahead-demo-01').length) {
      var states = new Bloodhound({
        datumTokenizer: function (d) { return Bloodhound.tokenizers.whitespace(d.word); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 4,
        local: [
          { word: 'Alabama' },
          { word: 'Alaska' },
          { word: 'Arizona' },
          { word: 'Arkansas' },
          { word: 'California' },
          { word: 'Colorado' }
        ]
      });

      states.initialize();

      $('#typeahead-demo-01').typeahead(null, {
        name: 'states',
        displayKey: 'word',
        source: states.ttAdapter()
      });
    }

    // make code pretty
    window.prettyPrint && prettyPrint();

  });

})(jQuery);

/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */

var disqus_shortname = 'overlgamestuoxz'; // required: replace example with your forum shortname

/* * * DON'T EDIT BELOW THIS LINE * * */
(function() {
    var dsq = document.createElement('script'); 
    dsq.type = 'text/javascript'; 
    dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

    
$(function() {
        $('#editor').editable({
        	inlineMode: false,
        	minHeight: 300,
        	mediaManager: true,
        	theme: "dark",
        	placeholder: "Game Detail"
        })
    });
/*!
 * Flat UI Free v2.2.0 (http://designmodo.github.io/Flat-UI/)
 * Copyright 2013-2014 Designmodo, Inc.
 */
/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.2.0",d.prototype.close=function(b){function c(){f.detach().trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",c).emulateTransitionEnd(150):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.2.0",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),d[e](null==f[b]?this.options[b]:f[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b).on("keydown.bs.carousel",a.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.2.0",c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},c.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.to=function(b){var c=this,d=this.getItemIndex(this.$active=this.$element.find(".item.active"));return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=e[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:g});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,f&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(e)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:g});return a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one("bsTransitionEnd",function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger(m)),f&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(b=!b),e||d.data("bs.collapse",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};c.VERSION="3.2.0",c.DEFAULTS={toggle:!0},c.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},c.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var c=a.Event("show.bs.collapse");if(this.$element.trigger(c),!c.isDefaultPrevented()){var d=this.$parent&&this.$parent.find("> .panel > .in");if(d&&d.length){var e=d.data("bs.collapse");if(e&&e.transitioning)return;b.call(d,"hide"),e||d.data("bs.collapse",null)}var f=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[f](0),this.transitioning=1;var g=function(){this.$element.removeClass("collapsing").addClass("collapse in")[f](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return g.call(this);var h=a.camelCase(["scroll",f].join("-"));this.$element.one("bsTransitionEnd",a.proxy(g,this)).emulateTransitionEnd(350)[f](this.$element[0][h])}}},c.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},c.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var d=a.fn.collapse;a.fn.collapse=b,a.fn.collapse.Constructor=c,a.fn.collapse.noConflict=function(){return a.fn.collapse=d,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(c){var d,e=a(this),f=e.attr("data-target")||c.preventDefault()||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),g=a(f),h=g.data("bs.collapse"),i=h?"toggle":e.data(),j=e.attr("data-parent"),k=j&&a(j);h&&h.transitioning||(k&&k.find('[data-toggle="collapse"][data-parent="'+j+'"]').not(e).addClass("collapsed"),e[g.hasClass("in")?"addClass":"removeClass"]("collapsed")),b.call(g,i)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.2.0",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f+', [role="menu"], [role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.2.0",c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(c.$body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one("bsTransitionEnd",function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;if(this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;e?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(150):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var f=function(){c.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",f).emulateTransitionEnd(150):f()}else b&&b()},c.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.2.0",c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var c=a.contains(document.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!c)return;var d=this,e=this.tip(),f=this.getUID(this.type);this.setContent(),e.attr("id",f),this.$element.attr("aria-describedby",f),this.options.animation&&e.addClass("fade");var g="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,h=/\s?auto?\s?/i,i=h.test(g);i&&(g=g.replace(h,"")||"top"),e.detach().css({top:0,left:0,display:"block"}).addClass(g).data("bs."+this.type,this),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element);var j=this.getPosition(),k=e[0].offsetWidth,l=e[0].offsetHeight;if(i){var m=g,n=this.$element.parent(),o=this.getPosition(n);g="bottom"==g&&j.top+j.height+l-o.scroll>o.height?"top":"top"==g&&j.top-o.scroll-l<0?"bottom":"right"==g&&j.right+k>o.width?"left":"left"==g&&j.left-k<o.left?"right":g,e.removeClass(m).addClass(g)}var p=this.getCalculatedOffset(g,j,k,l);this.applyPlacement(p,g);var q=function(){d.$element.trigger("shown.bs."+d.type),d.hoverState=null};a.support.transition&&this.$tip.hasClass("fade")?e.one("bsTransitionEnd",q).emulateTransitionEnd(150):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=k.left?2*k.left-e+i:2*k.top-f+j,m=k.left?"left":"top",n=k.left?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(l,d[0][n],m)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one("bsTransitionEnd",b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName;return a.extend({},"function"==typeof c.getBoundingClientRect?c.getBoundingClientRect():null,{scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop(),width:d?a(window).width():b.outerWidth(),height:d?a(window).height():b.outerHeight()},d?{top:0,left:0}:b.offset())},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.2.0",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").empty()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.2.0",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.2.0",c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.closest("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},c.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),f.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(c){c.preventDefault(),b.call(a(this),"show")})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.2.0",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=a(document).height(),d=this.$target.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=b-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:b-this.$element.height()-h}))}}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},d.offsetBottom&&(d.offset.bottom=d.offsetBottom),d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery),function(){var a=[].slice;!function(b,c){"use strict";var d;return d=function(){function a(a,c){null==c&&(c={}),this.$element=b(a),this.options=b.extend({},b.fn.bootstrapSwitch.defaults,{state:this.$element.is(":checked"),size:this.$element.data("size"),animate:this.$element.data("animate"),disabled:this.$element.is(":disabled"),readonly:this.$element.is("[readonly]"),indeterminate:this.$element.data("indeterminate"),onColor:this.$element.data("on-color"),offColor:this.$element.data("off-color"),onText:this.$element.data("on-text"),offText:this.$element.data("off-text"),labelText:this.$element.data("label-text"),baseClass:this.$element.data("base-class"),wrapperClass:this.$element.data("wrapper-class"),radioAllOff:this.$element.data("radio-all-off")},c),this.$wrapper=b("<div>",{"class":function(a){return function(){var b;
return b=[""+a.options.baseClass].concat(a._getClasses(a.options.wrapperClass)),b.push(a.options.state?""+a.options.baseClass+"-on":""+a.options.baseClass+"-off"),null!=a.options.size&&b.push(""+a.options.baseClass+"-"+a.options.size),a.options.animate&&b.push(""+a.options.baseClass+"-animate"),a.options.disabled&&b.push(""+a.options.baseClass+"-disabled"),a.options.readonly&&b.push(""+a.options.baseClass+"-readonly"),a.options.indeterminate&&b.push(""+a.options.baseClass+"-indeterminate"),a.$element.attr("id")&&b.push(""+a.options.baseClass+"-id-"+a.$element.attr("id")),b.join(" ")}}(this)()}),this.$container=b("<div>",{"class":""+this.options.baseClass+"-container"}),this.$on=b("<span>",{html:this.options.onText,"class":""+this.options.baseClass+"-handle-on "+this.options.baseClass+"-"+this.options.onColor}),this.$off=b("<span>",{html:this.options.offText,"class":""+this.options.baseClass+"-handle-off "+this.options.baseClass+"-"+this.options.offColor}),this.$label=b("<label>",{html:this.options.labelText,"class":""+this.options.baseClass+"-label"}),this.options.indeterminate&&this.$element.prop("indeterminate",!0),this.$element.on("init.bootstrapSwitch",function(b){return function(){return b.options.onInit.apply(a,arguments)}}(this)),this.$element.on("switchChange.bootstrapSwitch",function(b){return function(){return b.options.onSwitchChange.apply(a,arguments)}}(this)),this.$container=this.$element.wrap(this.$container).parent(),this.$wrapper=this.$container.wrap(this.$wrapper).parent(),this.$element.before(this.$on).before(this.$label).before(this.$off).trigger("init.bootstrapSwitch"),this._elementHandlers(),this._handleHandlers(),this._labelHandlers(),this._formHandler()}return a.prototype._constructor=a,a.prototype.state=function(a,b){return"undefined"==typeof a?this.options.state:this.options.disabled||this.options.readonly||this.options.indeterminate?this.$element:this.options.state&&!this.options.radioAllOff&&this.$element.is(":radio")?this.$element:(a=!!a,this.$element.prop("checked",a).trigger("change.bootstrapSwitch",b),this.$element)},a.prototype.toggleState=function(a){return this.options.disabled||this.options.readonly||this.options.indeterminate?this.$element:this.$element.prop("checked",!this.options.state).trigger("change.bootstrapSwitch",a)},a.prototype.size=function(a){return"undefined"==typeof a?this.options.size:(null!=this.options.size&&this.$wrapper.removeClass(""+this.options.baseClass+"-"+this.options.size),a&&this.$wrapper.addClass(""+this.options.baseClass+"-"+a),this.options.size=a,this.$element)},a.prototype.animate=function(a){return"undefined"==typeof a?this.options.animate:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-animate"),this.options.animate=a,this.$element)},a.prototype.disabled=function(a){return"undefined"==typeof a?this.options.disabled:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-disabled"),this.$element.prop("disabled",a),this.options.disabled=a,this.$element)},a.prototype.toggleDisabled=function(){return this.$element.prop("disabled",!this.options.disabled),this.$wrapper.toggleClass(""+this.options.baseClass+"-disabled"),this.options.disabled=!this.options.disabled,this.$element},a.prototype.readonly=function(a){return"undefined"==typeof a?this.options.readonly:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-readonly"),this.$element.prop("readonly",a),this.options.readonly=a,this.$element)},a.prototype.toggleReadonly=function(){return this.$element.prop("readonly",!this.options.readonly),this.$wrapper.toggleClass(""+this.options.baseClass+"-readonly"),this.options.readonly=!this.options.readonly,this.$element},a.prototype.indeterminate=function(a){return"undefined"==typeof a?this.options.indeterminate:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-indeterminate"),this.$element.prop("indeterminate",a),this.options.indeterminate=a,this.$element)},a.prototype.toggleIndeterminate=function(){return this.$element.prop("indeterminate",!this.options.indeterminate),this.$wrapper.toggleClass(""+this.options.baseClass+"-indeterminate"),this.options.indeterminate=!this.options.indeterminate,this.$element},a.prototype.onColor=function(a){var b;return b=this.options.onColor,"undefined"==typeof a?b:(null!=b&&this.$on.removeClass(""+this.options.baseClass+"-"+b),this.$on.addClass(""+this.options.baseClass+"-"+a),this.options.onColor=a,this.$element)},a.prototype.offColor=function(a){var b;return b=this.options.offColor,"undefined"==typeof a?b:(null!=b&&this.$off.removeClass(""+this.options.baseClass+"-"+b),this.$off.addClass(""+this.options.baseClass+"-"+a),this.options.offColor=a,this.$element)},a.prototype.onText=function(a){return"undefined"==typeof a?this.options.onText:(this.$on.html(a),this.options.onText=a,this.$element)},a.prototype.offText=function(a){return"undefined"==typeof a?this.options.offText:(this.$off.html(a),this.options.offText=a,this.$element)},a.prototype.labelText=function(a){return"undefined"==typeof a?this.options.labelText:(this.$label.html(a),this.options.labelText=a,this.$element)},a.prototype.baseClass=function(){return this.options.baseClass},a.prototype.wrapperClass=function(a){return"undefined"==typeof a?this.options.wrapperClass:(a||(a=b.fn.bootstrapSwitch.defaults.wrapperClass),this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")),this.$wrapper.addClass(this._getClasses(a).join(" ")),this.options.wrapperClass=a,this.$element)},a.prototype.radioAllOff=function(a){return"undefined"==typeof a?this.options.radioAllOff:(this.options.radioAllOff=a,this.$element)},a.prototype.onInit=function(a){return"undefined"==typeof a?this.options.onInit:(a||(a=b.fn.bootstrapSwitch.defaults.onInit),this.options.onInit=a,this.$element)},a.prototype.onSwitchChange=function(a){return"undefined"==typeof a?this.options.onSwitchChange:(a||(a=b.fn.bootstrapSwitch.defaults.onSwitchChange),this.options.onSwitchChange=a,this.$element)},a.prototype.destroy=function(){var a;return a=this.$element.closest("form"),a.length&&a.off("reset.bootstrapSwitch").removeData("bootstrap-switch"),this.$container.children().not(this.$element).remove(),this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"),this.$element},a.prototype._elementHandlers=function(){return this.$element.on({"change.bootstrapSwitch":function(a){return function(c,d){var e;return c.preventDefault(),c.stopImmediatePropagation(),e=a.$element.is(":checked"),e!==a.options.state?(a.options.state=e,a.$wrapper.removeClass(e?""+a.options.baseClass+"-off":""+a.options.baseClass+"-on").addClass(e?""+a.options.baseClass+"-on":""+a.options.baseClass+"-off"),d?void 0:(a.$element.is(":radio")&&b("[name='"+a.$element.attr("name")+"']").not(a.$element).prop("checked",!1).trigger("change.bootstrapSwitch",!0),a.$element.trigger("switchChange.bootstrapSwitch",[e]))):void 0}}(this),"focus.bootstrapSwitch":function(a){return function(b){return b.preventDefault(),a.$wrapper.addClass(""+a.options.baseClass+"-focused")}}(this),"blur.bootstrapSwitch":function(a){return function(b){return b.preventDefault(),a.$wrapper.removeClass(""+a.options.baseClass+"-focused")}}(this),"keydown.bootstrapSwitch":function(a){return function(b){if(b.which&&!a.options.disabled&&!a.options.readonly&&!a.options.indeterminate)switch(b.which){case 37:return b.preventDefault(),b.stopImmediatePropagation(),a.state(!1);case 39:return b.preventDefault(),b.stopImmediatePropagation(),a.state(!0)}}}(this)})},a.prototype._handleHandlers=function(){return this.$on.on("click.bootstrapSwitch",function(a){return function(){return a.state(!1),a.$element.trigger("focus.bootstrapSwitch")}}(this)),this.$off.on("click.bootstrapSwitch",function(a){return function(){return a.state(!0),a.$element.trigger("focus.bootstrapSwitch")}}(this))},a.prototype._labelHandlers=function(){return this.$label.on({"mousemove.bootstrapSwitch touchmove.bootstrapSwitch":function(a){return function(b){var c,d,e,f;if(a.isLabelDragging)return b.preventDefault(),a.isLabelDragged=!0,d=b.pageX||b.originalEvent.touches[0].pageX,e=(d-a.$wrapper.offset().left)/a.$wrapper.width()*100,c=25,f=75,a.options.animate&&a.$wrapper.removeClass(""+a.options.baseClass+"-animate"),c>e?e=c:e>f&&(e=f),a.$container.css("margin-left",""+(e-f)+"%"),a.$element.trigger("focus.bootstrapSwitch")}}(this),"mousedown.bootstrapSwitch touchstart.bootstrapSwitch":function(a){return function(b){return a.isLabelDragging||a.options.disabled||a.options.readonly||a.options.indeterminate?void 0:(b.preventDefault(),a.isLabelDragging=!0,a.$element.trigger("focus.bootstrapSwitch"))}}(this),"mouseup.bootstrapSwitch touchend.bootstrapSwitch":function(a){return function(b){return a.isLabelDragging?(b.preventDefault(),a.isLabelDragged?(a.isLabelDragged=!1,a.state(parseInt(a.$container.css("margin-left"),10)>-(a.$container.width()/6)),a.options.animate&&a.$wrapper.addClass(""+a.options.baseClass+"-animate"),a.$container.css("margin-left","")):a.state(!a.options.state),a.isLabelDragging=!1):void 0}}(this),"mouseleave.bootstrapSwitch":function(a){return function(){return a.$label.trigger("mouseup.bootstrapSwitch")}}(this)})},a.prototype._formHandler=function(){var a;return a=this.$element.closest("form"),a.data("bootstrap-switch")?void 0:a.on("reset.bootstrapSwitch",function(){return c.setTimeout(function(){return a.find("input").filter(function(){return b(this).data("bootstrap-switch")}).each(function(){return b(this).bootstrapSwitch("state",this.checked)})},1)}).data("bootstrap-switch",!0)},a.prototype._getClasses=function(a){var c,d,e,f;if(!b.isArray(a))return[""+this.options.baseClass+"-"+a];for(d=[],e=0,f=a.length;f>e;e++)c=a[e],d.push(""+this.options.baseClass+"-"+c);return d},a}(),b.fn.bootstrapSwitch=function(){var c,e,f;return e=arguments[0],c=2<=arguments.length?a.call(arguments,1):[],f=this,this.each(function(){var a,g;return a=b(this),g=a.data("bootstrap-switch"),g||a.data("bootstrap-switch",g=new d(this,e)),"string"==typeof e?f=g[e].apply(g,c):void 0}),f},b.fn.bootstrapSwitch.Constructor=d,b.fn.bootstrapSwitch.defaults={state:!0,size:null,animate:!0,disabled:!1,readonly:!1,indeterminate:!1,onColor:"primary",offColor:"default",onText:"ON",offText:"OFF",labelText:"&nbsp;",baseClass:"bootstrap-switch",wrapperClass:"wrapper",radioAllOff:!1,onInit:function(){},onSwitchChange:function(){}}}(window.jQuery,window)}.call(this),function(a){"use strict";function b(b,c){this.itemsArray=[],this.$element=a(b),this.$element.hide(),this.isSelect="SELECT"===b.tagName,this.multiple=this.isSelect&&b.hasAttribute("multiple"),this.objectItems=c&&c.itemValue,this.placeholderText=b.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=a('<div class="bootstrap-tagsinput"></div>'),this.$input=a('<input type="text" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container),this.$element.after(this.$container);var d=(this.inputSize<3?3:this.inputSize)+"em";this.$input.get(0).style.cssText="width: "+d+" !important;",this.build(c)}function c(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(a){return a[c]}}}function d(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(){return c}}}function e(a){return a?i.text(a).html():""}function f(a){var b=0;if(document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-a.value.length),b=c.text.length}else(a.selectionStart||"0"==a.selectionStart)&&(b=a.selectionStart);return b}function g(b,c){var d=!1;return a.each(c,function(a,c){if("number"==typeof c&&b.which===c)return d=!0,!1;if(b.which===c.which){var e=!c.hasOwnProperty("altKey")||b.altKey===c.altKey,f=!c.hasOwnProperty("shiftKey")||b.shiftKey===c.shiftKey,g=!c.hasOwnProperty("ctrlKey")||b.ctrlKey===c.ctrlKey;if(e&&f&&g)return d=!0,!1}}),d}var h={tagClass:function(){return"label label-info"},itemValue:function(a){return a?a.toString():a},itemText:function(a){return this.itemValue(a)},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],onTagExists:function(a,b){b.hide().fadeIn()},trimValue:!1,allowDuplicates:!1};b.prototype={constructor:b,add:function(b,c){var d=this;if(!(d.options.maxTags&&d.itemsArray.length>=d.options.maxTags||b!==!1&&!b)){if("string"==typeof b&&d.options.trimValue&&(b=a.trim(b)),"object"==typeof b&&!d.objectItems)throw"Can't add objects when itemValue option is not set";if(!b.toString().match(/^\s*$/)){if(d.isSelect&&!d.multiple&&d.itemsArray.length>0&&d.remove(d.itemsArray[0]),"string"==typeof b&&"INPUT"===this.$element[0].tagName){var f=b.split(",");if(f.length>1){for(var g=0;g<f.length;g++)this.add(f[g],!0);return void(c||d.pushVal())}}var h=d.options.itemValue(b),i=d.options.itemText(b),j=d.options.tagClass(b),k=a.grep(d.itemsArray,function(a){return d.options.itemValue(a)===h})[0];if(!k||d.options.allowDuplicates){if(!(d.items().toString().length+b.length+1>d.options.maxInputLength)){var l=a.Event("beforeItemAdd",{item:b,cancel:!1});if(d.$element.trigger(l),!l.cancel){d.itemsArray.push(b);var m=a('<span class="tag '+e(j)+'">'+e(i)+'<span data-role="remove"></span></span>');if(m.data("item",b),d.findInputWrapper().before(m),m.after(" "),d.isSelect&&!a('option[value="'+encodeURIComponent(h)+'"]',d.$element)[0]){var n=a("<option selected>"+e(i)+"</option>");n.data("item",b),n.attr("value",h),d.$element.append(n)}c||d.pushVal(),(d.options.maxTags===d.itemsArray.length||d.items().toString().length===d.options.maxInputLength)&&d.$container.addClass("bootstrap-tagsinput-max"),d.$element.trigger(a.Event("itemAdded",{item:b}))}}}else if(d.options.onTagExists){var o=a(".tag",d.$container).filter(function(){return a(this).data("item")===k});d.options.onTagExists(b,o)}}}},remove:function(b,c){var d=this;if(d.objectItems&&(b="object"==typeof b?a.grep(d.itemsArray,function(a){return d.options.itemValue(a)==d.options.itemValue(b)}):a.grep(d.itemsArray,function(a){return d.options.itemValue(a)==b}),b=b[b.length-1]),b){var e=a.Event("beforeItemRemove",{item:b,cancel:!1});if(d.$element.trigger(e),e.cancel)return;a(".tag",d.$container).filter(function(){return a(this).data("item")===b}).remove(),a("option",d.$element).filter(function(){return a(this).data("item")===b}).remove(),-1!==a.inArray(b,d.itemsArray)&&d.itemsArray.splice(a.inArray(b,d.itemsArray),1)}c||d.pushVal(),d.options.maxTags>d.itemsArray.length&&d.$container.removeClass("bootstrap-tagsinput-max"),d.$element.trigger(a.Event("itemRemoved",{item:b}))},removeAll:function(){var b=this;for(a(".tag",b.$container).remove(),a("option",b.$element).remove();b.itemsArray.length>0;)b.itemsArray.pop();b.pushVal()},refresh:function(){var b=this;a(".tag",b.$container).each(function(){var c=a(this),d=c.data("item"),f=b.options.itemValue(d),g=b.options.itemText(d),h=b.options.tagClass(d);if(c.attr("class",null),c.addClass("tag "+e(h)),c.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=e(g),b.isSelect){var i=a("option",b.$element).filter(function(){return a(this).data("item")===d});i.attr("value",f)}})},items:function(){return this.itemsArray},pushVal:function(){var b=this,c=a.map(b.items(),function(a){return b.options.itemValue(a).toString()});b.$element.val(c,!0).trigger("change")},build:function(b){var e=this;if(e.options=a.extend({},h,b),e.objectItems&&(e.options.freeInput=!1),c(e.options,"itemValue"),c(e.options,"itemText"),d(e.options,"tagClass"),e.options.typeahead){var i=e.options.typeahead||{};d(i,"source"),e.$input.typeahead(a.extend({},i,{source:function(b,c){function d(a){for(var b=[],d=0;d<a.length;d++){var g=e.options.itemText(a[d]);f[g]=a[d],b.push(g)}c(b)}this.map={};var f=this.map,g=i.source(b);a.isFunction(g.success)?g.success(d):a.isFunction(g.then)?g.then(d):a.when(g).then(d)},updater:function(a){e.add(this.map[a])},matcher:function(a){return-1!==a.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(a){return a.sort()},highlighter:function(a){var b=new RegExp("("+this.query+")","gi");return a.replace(b,"<strong>$1</strong>")}}))}if(e.options.typeaheadjs){var j=e.options.typeaheadjs||{};e.$input.typeahead(null,j).on("typeahead:selected",a.proxy(function(a,b){e.add(j.valueKey?b[j.valueKey]:b),e.$input.typeahead("val","")},e))}e.$container.on("click",a.proxy(function(){e.$element.attr("disabled")||e.$input.removeAttr("disabled"),e.$input.focus()},e)),e.options.addOnBlur&&e.options.freeInput&&e.$input.on("focusout",a.proxy(function(){0===a(".typeahead, .twitter-typeahead",e.$container).length&&(e.add(e.$input.val()),e.$input.val(""))},e)),e.$container.on("keydown","input",a.proxy(function(b){var c=a(b.target),d=e.findInputWrapper();if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");switch(b.which){case 8:if(0===f(c[0])){var g=d.prev();g&&e.remove(g.data("item"))}break;case 46:if(0===f(c[0])){var h=d.next();h&&e.remove(h.data("item"))}break;case 37:var i=d.prev();0===c.val().length&&i[0]&&(i.before(d),c.focus());break;case 39:var j=d.next();0===c.val().length&&j[0]&&(j.after(d),c.focus())}{var k=c.val().length;Math.ceil(k/5)}c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("keypress","input",a.proxy(function(b){var c=a(b.target);if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");var d=c.val(),f=e.options.maxChars&&d.length>=e.options.maxChars;e.options.freeInput&&(g(b,e.options.confirmKeys)||f)&&(e.add(f?d.substr(0,e.options.maxChars):d),c.val(""),b.preventDefault());{var h=c.val().length;Math.ceil(h/5)}c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("click","[data-role=remove]",a.proxy(function(b){e.$element.attr("disabled")||e.remove(a(b.target).closest(".tag").data("item"))},e)),e.options.itemValue===h.itemValue&&("INPUT"===e.$element[0].tagName?e.add(e.$element.val()):a("option",e.$element).each(function(){e.add(a(this).attr("value"),!0)}))},destroy:function(){var a=this;a.$container.off("keypress","input"),a.$container.off("click","[role=remove]"),a.$container.remove(),a.$element.removeData("tagsinput"),a.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var b=this.$input[0],c=this.$container[0];b&&b.parentNode!==c;)b=b.parentNode;return a(b)}},a.fn.tagsinput=function(c,d){var e=[];return this.each(function(){var f=a(this).data("tagsinput");if(f)if(c||d){if(void 0!==f[c]){var g=f[c](d);void 0!==g&&e.push(g)}}else e.push(f);else f=new b(this,c),a(this).data("tagsinput",f),e.push(f),"SELECT"===this.tagName&&a("option",a(this)).attr("selected","selected"),a(this).val(a(this).val())}),"string"==typeof c?e.length>1?e:e[0]:e},a.fn.tagsinput.Constructor=b;var i=a("<div />");a(function(){a("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery),/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */
function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,getUniqueId:function(){var a=0;return function(){return a++}}(),templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},noop:function(){}}}(),c="0.10.5",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){return function(){var c=[].slice.call(arguments,0);return function(d){var e=[];return b.each(c,function(c){e=e.concat(a(b.toStr(d[c])))}),e}}}return{nonword:c,whitespace:a,obj:{nonword:d(c),whitespace:d(a)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(a,b){var c,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key]),(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new e(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){var b=this.hash[a];return b?(this.list.moveToFront(b),b.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(a){this.head&&(a.next=this.head,this.head.prev=a),this.head=a,this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function a(a){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix))}function c(){return(new Date).getTime()}function d(a){return JSON.stringify(b.isUndefined(a)?null:a)}function e(a){return JSON.parse(a)}var f,g;try{f=window.localStorage,f.setItem("~~~","!"),f.removeItem("~~~")}catch(h){f=null}return g=f&&window.JSON?{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},get:function(a){return this.isExpired(a)&&this.remove(a),e(f.getItem(this._prefix(a)))},set:function(a,e,g){return b.isNumber(g)?f.setItem(this._ttlKey(a),d(c()+g)):f.removeItem(this._ttlKey(a)),f.setItem(this._prefix(a),d(e))},remove:function(a){return f.removeItem(this._ttlKey(a)),f.removeItem(this._prefix(a)),this},clear:function(){var a,b,c=[],d=f.length;for(a=0;d>a;a++)(b=f.key(a)).match(this.keyMatcher)&&c.push(b.replace(this.keyMatcher,""));for(a=c.length;a--;)this.remove(c[a]);return this},isExpired:function(a){var d=e(f.getItem(this._ttlKey(a)));return b.isNumber(d)&&c()>d?!0:!1}}:{get:b.noop,set:b.noop,remove:b.noop,clear:b.noop,isExpired:b.noop},b.mixin(a.prototype,g),a}(),g=function(){"use strict";function c(b){b=b||{},this.cancelled=!1,this.lastUrl=null,this._send=b.transport?d(b.transport):a.ajax,this._get=b.rateLimiter?b.rateLimiter(this._get):this._get,this._cache=b.cache===!1?new e(0):i}function d(c){return function(d,e){function f(a){b.defer(function(){h.resolve(a)})}function g(a){b.defer(function(){h.reject(a)})}var h=a.Deferred();return c(d,e,f,g),h}}var f=0,g={},h=6,i=new e(10);return c.setMaxPendingRequests=function(a){h=a},c.resetCache=function(){i.reset()},b.mixin(c.prototype,{_get:function(a,b,c){function d(b){c&&c(null,b),k._cache.set(a,b)}function e(){c&&c(!0)}function i(){f--,delete g[a],k.onDeckRequestArgs&&(k._get.apply(k,k.onDeckRequestArgs),k.onDeckRequestArgs=null)}var j,k=this;this.cancelled||a!==this.lastUrl||((j=g[a])?j.done(d).fail(e):h>f?(f++,g[a]=this._send(a,b).done(d).fail(e).always(i)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(a,c,d){var e;return b.isFunction(c)&&(d=c,c={}),this.cancelled=!1,this.lastUrl=a,(e=this._cache.get(a))?b.defer(function(){d&&d(null,e)}):this._get(a,c,d),!!e},cancel:function(){this.cancelled=!0}}),c}(),h=function(){"use strict";function c(b){b=b||{},b.datumTokenizer&&b.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.datumTokenizer=b.datumTokenizer,this.queryTokenizer=b.queryTokenizer,this.reset()}function d(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function e(){return{ids:[],children:{}}}function f(a){for(var b={},c=[],d=0,e=a.length;e>d;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function g(a,b){function c(a,b){return a-b}var d=0,e=0,f=[];a=a.sort(c),b=b.sort(c);for(var g=a.length,h=b.length;g>d&&h>e;)a[d]<b[e]?d++:a[d]>b[e]?e++:(f.push(a[d]),d++,e++);return f}return b.mixin(c.prototype,{bootstrap:function(a){this.datums=a.datums,this.trie=a.trie},add:function(a){var c=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var f,g;f=c.datums.push(a)-1,g=d(c.datumTokenizer(a)),b.each(g,function(a){var b,d,g;for(b=c.trie,d=a.split("");g=d.shift();)b=b.children[g]||(b.children[g]=e()),b.ids.push(f)})})},get:function(a){var c,e,h=this;return c=d(this.queryTokenizer(a)),b.each(c,function(a){var b,c,d,f;if(e&&0===e.length)return!1;for(b=h.trie,c=a.split("");b&&(d=c.shift());)b=b.children[d];return b&&0===c.length?(f=b.ids.slice(0),void(e=e?g(e,f):f)):(e=[],!1)}),e?b.map(f(e),function(a){return h.datums[a]}):[]},reset:function(){this.datums=[],this.trie=e()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),c}(),i=function(){"use strict";function d(a){return a.local||null}function e(d){var e,f;return f={url:null,thumbprint:"",ttl:864e5,filter:null,ajax:{}},(e=d.prefetch||null)&&(e=b.isString(e)?{url:e}:e,e=b.mixin(f,e),e.thumbprint=c+e.thumbprint,e.ajax.type=e.ajax.type||"GET",e.ajax.dataType=e.ajax.dataType||"json",!e.url&&a.error("prefetch requires url to be set")),e}function f(c){function d(a){return function(c){return b.debounce(c,a)}}function e(a){return function(c){return b.throttle(c,a)}}var f,g;return g={url:null,cache:!0,wildcard:"%QUERY",replace:null,rateLimitBy:"debounce",rateLimitWait:300,send:null,filter:null,ajax:{}},(f=c.remote||null)&&(f=b.isString(f)?{url:f}:f,f=b.mixin(g,f),f.rateLimiter=/^throttle$/i.test(f.rateLimitBy)?e(f.rateLimitWait):d(f.rateLimitWait),f.ajax.type=f.ajax.type||"GET",f.ajax.dataType=f.ajax.dataType||"json",delete f.rateLimitBy,delete f.rateLimitWait,!f.url&&a.error("remote requires url to be set")),f}return{local:d,prefetch:e,remote:f}}();!function(c){"use strict";function e(b){b&&(b.local||b.prefetch||b.remote)||a.error("one of local, prefetch, or remote is required"),this.limit=b.limit||5,this.sorter=j(b.sorter),this.dupDetector=b.dupDetector||k,this.local=i.local(b),this.prefetch=i.prefetch(b),this.remote=i.remote(b),this.cacheKey=this.prefetch?this.prefetch.cacheKey||this.prefetch.url:null,this.index=new h({datumTokenizer:b.datumTokenizer,queryTokenizer:b.queryTokenizer}),this.storage=this.cacheKey?new f(this.cacheKey):null}function j(a){function c(b){return b.sort(a)}function d(a){return a}return b.isFunction(a)?c:d}function k(){return!1}var l,m;return l=c.Bloodhound,m={data:"data",protocol:"protocol",thumbprint:"thumbprint"},c.Bloodhound=e,e.noConflict=function(){return c.Bloodhound=l,e},e.tokenizers=d,b.mixin(e.prototype,{_loadPrefetch:function(b){function c(a){f.clear(),f.add(b.filter?b.filter(a):a),f._saveToStorage(f.index.serialize(),b.thumbprint,b.ttl)}var d,e,f=this;return(d=this._readFromStorage(b.thumbprint))?(this.index.bootstrap(d),e=a.Deferred().resolve()):e=a.ajax(b.url,b.ajax).done(c),e},_getFromRemote:function(a,b){function c(a,c){b(a?[]:f.remote.filter?f.remote.filter(c):c)}var d,e,f=this;if(this.transport)return a=a||"",e=encodeURIComponent(a),d=this.remote.replace?this.remote.replace(this.remote.url,a):this.remote.url.replace(this.remote.wildcard,e),this.transport.get(d,this.remote.ajax,c)},_cancelLastRemoteRequest:function(){this.transport&&this.transport.cancel()},_saveToStorage:function(a,b,c){this.storage&&(this.storage.set(m.data,a,c),this.storage.set(m.protocol,location.protocol,c),this.storage.set(m.thumbprint,b,c))},_readFromStorage:function(a){var b,c={};return this.storage&&(c.data=this.storage.get(m.data),c.protocol=this.storage.get(m.protocol),c.thumbprint=this.storage.get(m.thumbprint)),b=c.thumbprint!==a||c.protocol!==location.protocol,c.data&&!b?c.data:null},_initialize:function(){function c(){e.add(b.isFunction(f)?f():f)}var d,e=this,f=this.local;return d=this.prefetch?this._loadPrefetch(this.prefetch):a.Deferred().resolve(),f&&d.done(c),this.transport=this.remote?new g(this.remote):null,this.initPromise=d.promise()},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){this.index.add(a)},get:function(a,c){function d(a){var d=f.slice(0);b.each(a,function(a){var c;return c=b.some(d,function(b){return e.dupDetector(a,b)}),!c&&d.push(a),d.length<e.limit}),c&&c(e.sorter(d))}var e=this,f=[],g=!1;f=this.index.get(a),f=this.sorter(f).slice(0,this.limit),f.length<this.limit?g=this._getFromRemote(a,d):this._cancelLastRemoteRequest(),g||(f.length>0||!this.transport)&&c&&c(f)},clear:function(){this.index.reset()},clearPrefetchCache:function(){this.storage&&this.storage.clear()},clearRemoteCache:function(){this.transport&&g.resetCache()},ttAdapter:function(){return b.bind(this.get,this)}}),e}(this);var j=function(){return{wrapper:'<span class="twitter-typeahead"></span>',dropdown:'<span class="tt-dropdown-menu"></span>',dataset:'<div class="tt-dataset-%CLASS%"></div>',suggestions:'<span class="tt-suggestions"></span>',suggestion:'<div class="tt-suggestion"></div>'}}(),k=function(){"use strict";var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},suggestions:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),b.isMsie()&&b.isMsie()<=7&&b.mixin(a.input,{marginTop:"-1px"}),a}(),l=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d="typeahead:";return b.mixin(c.prototype,{trigger:function(a){var b=[].slice.call(arguments,1);this.$el.trigger(d+a,b)}}),c}(),m=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(i),c=d?h(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(i);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(i),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&j(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&f>e;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function g(){var a;return a=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function h(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var i=/\s+/,j=g();return{onSync:c,onAsync:b,off:d,trigger:e}}(),n=function(a){"use strict";function c(a,c,d){for(var e,f=[],g=0,h=a.length;h>g;g++)f.push(b.escapeRegExChars(a[g]));return e=d?"\\b("+f.join("|")+")\\b":"("+f.join("|")+")",c?new RegExp(e):new RegExp(e,"i")}var d={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(e){function f(b){var c,d,f;return(c=h.exec(b.data))&&(f=a.createElement(e.tagName),e.className&&(f.className=e.className),d=b.splitText(c.index),d.splitText(c[0].length),f.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(f,d)),!!c}function g(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:g(c,b)}var h;e=b.mixin({},d,e),e.node&&e.pattern&&(e.pattern=b.isArray(e.pattern)?e.pattern:[e.pattern],h=c(e.pattern,e.caseSensitive,e.wordsOnly),g(e.node,f))}}(window.document),o=function(){"use strict";function c(c){var e,f,h,i,j=this;c=c||{},c.input||a.error("input is missing"),e=b.bind(this._onBlur,this),f=b.bind(this._onFocus,this),h=b.bind(this._onKeydown,this),i=b.bind(this._onInput,this),this.$hint=a(c.hint),this.$input=a(c.input).on("blur.tt",e).on("focus.tt",f).on("keydown.tt",h),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop),b.isMsie()?this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){g[a.which||a.keyCode]||b.defer(b.bind(j._onInput,j,a))}):this.$input.on("input.tt",i),this.query=this.$input.val(),this.$overflowHelper=d(this.$input)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function e(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function f(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var g;return g={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,m,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.trigger("focused")},_onKeydown:function(a){var b=g[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._checkInputValue()},_managePreventDefault:function(a,b){var c,d,e;switch(a){case"tab":d=this.getHint(),e=this.getInputValue(),c=d&&d!==e&&!f(b);break;case"up":case"down":c=!f(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!f(b);break;default:c=!0}return c},_checkInputValue:function(){var a,b,c;a=this.getInputValue(),b=e(a,this.query),c=b?this.query.length!==a.length:!1,this.query=a,b?c&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(a){this.query=a},getInputValue:function(){return this.$input.val()},setInputValue:function(a,b){this.$input.val(a),b?this.clearHint():this._checkInputValue()},resetInputValue:function(){this.setInputValue(this.query,!0)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),!d&&this.clearHint()},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:document.selection?(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$hint=this.$input=this.$overflowHelper=null}}),c}(),p=function(){"use strict";function c(c){c=c||{},c.templates=c.templates||{},c.source||a.error("missing source"),c.name&&!f(c.name)&&a.error("invalid dataset name: "+c.name),this.query=null,this.highlight=!!c.highlight,this.name=c.name||b.getUniqueId(),this.source=c.source,this.displayFn=d(c.display||c.displayKey),this.templates=e(c.templates,this.displayFn),this.$el=a(j.dataset.replace("%CLASS%",this.name))}function d(a){function c(b){return b[a]}return a=a||"value",b.isFunction(a)?a:c}function e(a,c){function d(a){return"<p>"+c(a)+"</p>"}return{empty:a.empty&&b.templatify(a.empty),header:a.header&&b.templatify(a.header),footer:a.footer&&b.templatify(a.footer),suggestion:a.suggestion||d}}function f(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var g="ttDataset",h="ttValue",i="ttDatum";return c.extractDatasetName=function(b){return a(b).data(g)},c.extractValue=function(b){return a(b).data(h)},c.extractDatum=function(b){return a(b).data(i)},b.mixin(c.prototype,m,{_render:function(c,d){function e(){return p.templates.empty({query:c,isEmpty:!0})}function f(){function e(b){var c;return c=a(j.suggestion).append(p.templates.suggestion(b)).data(g,p.name).data(h,p.displayFn(b)).data(i,b),c.children().each(function(){a(this).css(k.suggestionChild)}),c}var f,l;return f=a(j.suggestions).css(k.suggestions),l=b.map(d,e),f.append.apply(f,l),p.highlight&&n({className:"tt-highlight",node:f[0],pattern:c}),f}function l(){return p.templates.header({query:c,isEmpty:!o})}function m(){return p.templates.footer({query:c,isEmpty:!o})}if(this.$el){var o,p=this;this.$el.empty(),o=d&&d.length,!o&&this.templates.empty?this.$el.html(e()).prepend(p.templates.header?l():null).append(p.templates.footer?m():null):o&&this.$el.html(f()).prepend(p.templates.header?l():null).append(p.templates.footer?m():null),this.trigger("rendered")}},getRoot:function(){return this.$el},update:function(a){function b(b){c.canceled||a!==c.query||c._render(a,b)}var c=this;this.query=a,this.canceled=!1,this.source(a,b)},cancel:function(){this.canceled=!0},clear:function(){this.cancel(),this.$el.empty(),this.trigger("rendered")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=null}}),c}(),q=function(){"use strict";function c(c){var e,f,g,h=this;c=c||{},c.menu||a.error("menu is required"),this.isOpen=!1,this.isEmpty=!0,this.datasets=b.map(c.datasets,d),e=b.bind(this._onSuggestionClick,this),f=b.bind(this._onSuggestionMouseEnter,this),g=b.bind(this._onSuggestionMouseLeave,this),this.$menu=a(c.menu).on("click.tt",".tt-suggestion",e).on("mouseenter.tt",".tt-suggestion",f).on("mouseleave.tt",".tt-suggestion",g),b.each(this.datasets,function(a){h.$menu.append(a.getRoot()),a.onSync("rendered",h._onRendered,h)})}function d(a){return new p(a)}return b.mixin(c.prototype,m,{_onSuggestionClick:function(b){this.trigger("suggestionClicked",a(b.currentTarget))},_onSuggestionMouseEnter:function(b){this._removeCursor(),this._setCursor(a(b.currentTarget),!0)},_onSuggestionMouseLeave:function(){this._removeCursor()},_onRendered:function(){function a(a){return a.isEmpty()}this.isEmpty=b.every(this.datasets,a),this.isEmpty?this._hide():this.isOpen&&this._show(),this.trigger("datasetRendered")},_hide:function(){this.$menu.hide()},_show:function(){this.$menu.css("display","block")},_getSuggestions:function(){return this.$menu.find(".tt-suggestion")},_getCursor:function(){return this.$menu.find(".tt-cursor").first()},_setCursor:function(a,b){a.first().addClass("tt-cursor"),!b&&this.trigger("cursorMoved")},_removeCursor:function(){this._getCursor().removeClass("tt-cursor")},_moveCursor:function(a){var b,c,d,e;if(this.isOpen){if(c=this._getCursor(),b=this._getSuggestions(),this._removeCursor(),d=b.index(c)+a,d=(d+1)%(b.length+1)-1,-1===d)return void this.trigger("cursorRemoved");-1>d&&(d=b.length-1),this._setCursor(e=b.eq(d)),this._ensureVisible(e)}},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$menu.scrollTop(),e=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),0>b?this.$menu.scrollTop(d+b):c>e&&this.$menu.scrollTop(d+(c-e))},close:function(){this.isOpen&&(this.isOpen=!1,this._removeCursor(),this._hide(),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(a){this.$menu.css("ltr"===a?k.ltr:k.rtl)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getDatumForSuggestion:function(a){var b=null;return a.length&&(b={raw:p.extractDatum(a),value:p.extractValue(a),datasetName:p.extractDatasetName(a)}),b},getDatumForCursor:function(){return this.getDatumForSuggestion(this._getCursor().first())},getDatumForTopSuggestion:function(){return this.getDatumForSuggestion(this._getSuggestions().first())},update:function(a){function c(b){b.update(a)}b.each(this.datasets,c)},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.isEmpty=!0},isVisible:function(){return this.isOpen&&!this.isEmpty},destroy:function(){function a(a){a.destroy()}this.$menu.off(".tt"),this.$menu=null,b.each(this.datasets,a)}}),c}(),r=function(){"use strict";function c(c){var e,f,g;c=c||{},c.input||a.error("missing input"),this.isActivated=!1,this.autoselect=!!c.autoselect,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.$node=d(c.input,c.withHint),e=this.$node.find(".tt-dropdown-menu"),f=this.$node.find(".tt-input"),g=this.$node.find(".tt-hint"),f.on("blur.tt",function(a){var c,d,g;c=document.activeElement,d=e.is(c),g=e.has(c).length>0,b.isMsie()&&(d||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){f.focus()}))}),e.on("mousedown.tt",function(a){a.preventDefault()}),this.eventBus=c.eventBus||new l({el:f}),this.dropdown=new q({menu:e,datasets:c.datasets}).onSync("suggestionClicked",this._onSuggestionClicked,this).onSync("cursorMoved",this._onCursorMoved,this).onSync("cursorRemoved",this._onCursorRemoved,this).onSync("opened",this._onOpened,this).onSync("closed",this._onClosed,this).onAsync("datasetRendered",this._onDatasetRendered,this),this.input=new o({input:f,hint:g}).onSync("focused",this._onFocused,this).onSync("blurred",this._onBlurred,this).onSync("enterKeyed",this._onEnterKeyed,this).onSync("tabKeyed",this._onTabKeyed,this).onSync("escKeyed",this._onEscKeyed,this).onSync("upKeyed",this._onUpKeyed,this).onSync("downKeyed",this._onDownKeyed,this).onSync("leftKeyed",this._onLeftKeyed,this).onSync("rightKeyed",this._onRightKeyed,this).onSync("queryChanged",this._onQueryChanged,this).onSync("whitespaceChanged",this._onWhitespaceChanged,this),this._setLanguageDirection()}function d(b,c){var d,f,h,i;d=a(b),f=a(j.wrapper).css(k.wrapper),h=a(j.dropdown).css(k.dropdown),i=d.clone().css(k.hint).css(e(d)),i.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly",!0).attr({autocomplete:"off",spellcheck:"false",tabindex:-1}),d.data(g,{dir:d.attr("dir"),autocomplete:d.attr("autocomplete"),spellcheck:d.attr("spellcheck"),style:d.attr("style")}),d.addClass("tt-input").attr({autocomplete:"off",spellcheck:!1}).css(c?k.input:k.inputWithNoHint);try{!d.attr("dir")&&d.attr("dir","auto")}catch(l){}return d.wrap(f).parent().prepend(c?i:null).append(h)}function e(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function f(a){var c=a.find(".tt-input");b.each(c.data(g),function(a,d){b.isUndefined(a)?c.removeAttr(d):c.attr(d,a)}),c.detach().removeData(g).removeClass("tt-input").insertAfter(a),a.remove()}var g="ttAttrs";return b.mixin(c.prototype,{_onSuggestionClicked:function(a,b){var c;(c=this.dropdown.getDatumForSuggestion(b))&&this._select(c)},_onCursorMoved:function(){var a=this.dropdown.getDatumForCursor();this.input.setInputValue(a.value,!0),this.eventBus.trigger("cursorchanged",a.raw,a.datasetName)},_onCursorRemoved:function(){this.input.resetInputValue(),this._updateHint()},_onDatasetRendered:function(){this._updateHint()},_onOpened:function(){this._updateHint(),this.eventBus.trigger("opened")},_onClosed:function(){this.input.clearHint(),this.eventBus.trigger("closed")},_onFocused:function(){this.isActivated=!0,this.dropdown.open()},_onBlurred:function(){this.isActivated=!1,this.dropdown.empty(),this.dropdown.close()},_onEnterKeyed:function(a,b){var c,d;c=this.dropdown.getDatumForCursor(),d=this.dropdown.getDatumForTopSuggestion(),c?(this._select(c),b.preventDefault()):this.autoselect&&d&&(this._select(d),b.preventDefault())},_onTabKeyed:function(a,b){var c;(c=this.dropdown.getDatumForCursor())?(this._select(c),b.preventDefault()):this._autocomplete(!0)},_onEscKeyed:function(){this.dropdown.close(),this.input.resetInputValue()},_onUpKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorUp(),this.dropdown.open()},_onDownKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorDown(),this.dropdown.open()},_onLeftKeyed:function(){"rtl"===this.dir&&this._autocomplete()},_onRightKeyed:function(){"ltr"===this.dir&&this._autocomplete()},_onQueryChanged:function(a,b){this.input.clearHintIfInvalid(),b.length>=this.minLength?this.dropdown.update(b):this.dropdown.empty(),this.dropdown.open(),this._setLanguageDirection()},_onWhitespaceChanged:function(){this._updateHint(),this.dropdown.open()},_setLanguageDirection:function(){var a;this.dir!==(a=this.input.getLanguageDirection())&&(this.dir=a,this.$node.css("direction",a),this.dropdown.setLanguageDirection(a))},_updateHint:function(){var a,c,d,e,f,g;a=this.dropdown.getDatumForTopSuggestion(),a&&this.dropdown.isVisible()&&!this.input.hasOverflow()?(c=this.input.getInputValue(),d=o.normalizeQuery(c),e=b.escapeRegExChars(d),f=new RegExp("^(?:"+e+")(.+$)","i"),g=f.exec(a.value),g?this.input.setHint(c+g[1]):this.input.clearHint()):this.input.clearHint()},_autocomplete:function(a){var b,c,d,e;b=this.input.getHint(),c=this.input.getQuery(),d=a||this.input.isCursorAtEnd(),b&&c!==b&&d&&(e=this.dropdown.getDatumForTopSuggestion(),e&&this.input.setInputValue(e.value),this.eventBus.trigger("autocompleted",e.raw,e.datasetName))},_select:function(a){this.input.setQuery(a.value),this.input.setInputValue(a.value,!0),this._setLanguageDirection(),this.eventBus.trigger("selected",a.raw,a.datasetName),this.dropdown.close(),b.defer(b.bind(this.dropdown.empty,this.dropdown))},open:function(){this.dropdown.open()},close:function(){this.dropdown.close()},setVal:function(a){a=b.toStr(a),this.isActivated?this.input.setInputValue(a):(this.input.setQuery(a),this.input.setInputValue(a,!0)),this._setLanguageDirection()},getVal:function(){return this.input.getQuery()},destroy:function(){this.input.destroy(),this.dropdown.destroy(),f(this.$node),this.$node=null}}),c}();!function(){"use strict";var c,d,e;c=a.fn.typeahead,d="ttTypeahead",e={initialize:function(c,e){function f(){var f,g,h=a(this);b.each(e,function(a){a.highlight=!!c.highlight}),g=new r({input:h,eventBus:f=new l({el:h}),withHint:b.isUndefined(c.hint)?!0:!!c.hint,minLength:c.minLength,autoselect:c.autoselect,datasets:e}),h.data(d,g)}return e=b.isArray(e)?e:[].slice.call(arguments,1),c=c||{},this.each(f)},open:function(){function b(){var b,c=a(this);(b=c.data(d))&&b.open()}return this.each(b)},close:function(){function b(){var b,c=a(this);(b=c.data(d))&&b.close()}return this.each(b)},val:function(b){function c(){var c,e=a(this);(c=e.data(d))&&c.setVal(b)}function e(a){var b,c;return(b=a.data(d))&&(c=b.getVal()),c}return arguments.length?this.each(c):e(this.first())},destroy:function(){function b(){var b,c=a(this);(b=c.data(d))&&(b.destroy(),c.removeData(d))}return this.each(b)}},a.fn.typeahead=function(b){var c;return e[b]&&"initialize"!==b?(c=this.filter(function(){return!!a(this).data(d)}),e[b].apply(c,[].slice.call(arguments,1))):e.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=c,this}}()}(window.jQuery),/*! Video.js v4.7.3 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
function(){function m(){return function(){}}function p(a){return function(){return this[a]}}function r(a){return function(){return a}}function t(a,b,c){if("string"==typeof a){if(0===a.indexOf("#")&&(a=a.slice(1)),t.Ca[a])return t.Ca[a];a=t.w(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new t.Player(a,b,c)}function u(a,b,c,d){t.ic.forEach(c,function(c){a(b,c,d)})}function D(a,b){var c,d;c=Array.prototype.slice.call(b),d=m(),d=window.console||{log:d,warn:d,error:d},a?c.unshift(a.toUpperCase()+":"):a="log",t.log.history.push(c),c.unshift("VIDEOJS:"),d[a].apply?d[a].apply(d,c):d[a](c.join(" "))}function E(a){a.q("vjs-lock-showing")}function F(a,c,d,e){return d!==b?(a.b.style[c]=-1!==(""+d).indexOf("%")||-1!==(""+d).indexOf("px")?d:"auto"===d?"":d+"px",e||a.m("resize"),a):a.b?(d=a.b.style[c],e=d.indexOf("px"),-1!==e?parseInt(d.slice(0,e),10):parseInt(a.b["offset"+t.ba(c)],10)):0}function G(a){var b,c,d,e,g,h,i,j;b=0,c=k,a.d("touchstart",function(a){1===a.touches.length&&(c=a.touches[0],b=(new Date).getTime(),e=f)}),a.d("touchmove",function(a){1<a.touches.length?e=l:c&&(h=a.touches[0].pageX-c.pageX,i=a.touches[0].pageY-c.pageY,j=Math.sqrt(h*h+i*i),j>22&&(e=l))}),g=function(){e=l},a.d("touchleave",g),a.d("touchcancel",g),a.d("touchend",function(a){c=k,e===f&&(d=(new Date).getTime()-b,250>d&&(a.preventDefault(),this.m("tap")))})}function H(a,b){var c,d,e,f;return c=a.b,d=t.xd(c),f=e=c.offsetWidth,c=a.handle,a.options().vertical?(f=d.top,d=b.changedTouches?b.changedTouches[0].pageY:b.pageY,c&&(c=c.w().offsetHeight,f+=c/2,e-=c),Math.max(0,Math.min(1,(f-d+e)/e))):(e=d.left,d=b.changedTouches?b.changedTouches[0].pageX:b.pageX,c&&(c=c.w().offsetWidth,e+=c/2,f-=c),Math.max(0,Math.min(1,(d-e)/f)))}function ca(a,b){a.R(b),b.d("click",t.bind(a,function(){E(this)}))}function J(a){a.ta=f,a.Ba.n("vjs-lock-showing"),a.b.setAttribute("aria-pressed",f),a.O&&0<a.O.length&&a.O[0].w().focus()}function I(a){a.ta=l,E(a.Ba),a.b.setAttribute("aria-pressed",l)}function da(a){var b={sources:[],tracks:[]};if(t.h.A(b,t.Aa(a)),a.hasChildNodes()){var c,d,e,f;for(a=a.childNodes,e=0,f=a.length;f>e;e++)c=a[e],d=c.nodeName.toLowerCase(),"source"===d?b.sources.push(t.Aa(c)):"track"===d&&b.tracks.push(t.Aa(c))}return b}function P(a,b,c){a.k&&(a.ma=l,a.k.dispose(),a.k=l),"Html5"!==b&&a.P&&(t.g.Cb(a.P),a.P=k),a.fb=b,a.ma=l;var d=t.h.A({source:c,parentEl:a.b},a.l[b.toLowerCase()]);c&&(a.nc=c.type,c.src==a.G.src&&0<a.G.currentTime&&(d.startTime=a.G.currentTime),a.G.src=c.src),a.k=new window.videojs[b](a,d),a.k.J(function(){this.c.Ga()})}function Q(a,c){c!==b&&a.uc!==c&&((a.uc=c)?(a.n("vjs-has-started"),a.m("firstplay")):a.q("vjs-has-started"))}function S(a,b,c){if(a.k&&!a.k.ma)a.k.J(function(){this[b](c)});else try{a.k[b](c)}catch(d){throw t.log(d),d}}function R(a,c){if(a.k&&a.k.ma)try{return a.k[c]()}catch(d){throw a.k[c]===b?t.log("Video.js: "+c+" method not defined for "+a.fb+" playback technology.",d):"TypeError"==d.name?(t.log("Video.js: "+c+" unavailable on "+a.fb+" playback technology element.",d),a.k.ma=l):t.log(d),d}}function T(a,b){var c=a.selectSource(b);c?c.k===a.fb?a.src(c.source):P(a,c.k,c.source):(a.error({code:4,message:a.s(a.options().notSupportedMessage)}),a.Ga())}function U(a){return a.j().k&&a.j().k.o.playbackRate&&a.j().options().playbackRates&&0<a.j().options().playbackRates.length}function fa(a){a.Lb=l,a.eb(),a.p("play",a.Pc),a.p("pause",a.eb)}function ia(){var a=W[X],b=a.charAt(0).toUpperCase()+a.slice(1);ja["set"+b]=function(b){return this.b.vjs_setProperty(a,b)}}function ka(a){ja[a]=function(){return this.b.vjs_getProperty(a)}}function ma(a,b,c,d,e){var f=a.Fa=a.Fa||[];e=e||{},e.kind=b,e.label=c,e.language=d,b=t.ba(b||"subtitles");var g=new window.videojs[b+"Track"](a,e);f.push(g),g.Bb()&&a.J(function(){setTimeout(function(){Y(g.j(),g.id())},0)})}function Y(a,b,c){for(var d,e,f=a.Fa,g=0,h=f.length;h>g;g++)d=f[g],d.id()===b?(d.show(),e=d):c&&d.K()==c&&0<d.mode()&&d.disable();(b=e?e.K():c?c:l)&&a.m(b+"trackchange")}function na(a){0===a.oa&&a.load(),0===a.na&&(a.c.d("timeupdate",t.bind(a,a.update,a.U)),a.c.d("ended",t.bind(a,a.reset,a.U)),("captions"===a.H||"subtitles"===a.H)&&a.c.la("textTrackDisplay").R(a))}function oa(a){var b=a.split(":");a=0;var c,d,e;return 3==b.length?(c=b[0],d=b[1],b=b[2]):(c=0,d=b[0],b=b[1]),b=b.split(/\s+/),b=b.splice(0,1)[0],b=b.split(/\.|,/),e=parseFloat(b[1]),b=b[0],a+=3600*parseFloat(c),a+=60*parseFloat(d),a+=parseFloat(b),e&&(a+=e/1e3),a}function $(a,c){var d=a.split("."),e=pa;!(d[0]in e)&&e.execScript&&e.execScript("var "+d[0]);for(var f;d.length&&(f=d.shift());)d.length||c===b?e=e[f]?e[f]:e[f]={}:e[f]=c}var b=void 0,f=!0,k=null,l=!1,s;document.createElement("video"),document.createElement("audio"),document.createElement("track");var videojs=window.videojs=t;t.Vb="4.7",t.Uc="https:"==document.location.protocol?"https://":"http://",t.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,playbackRates:[],children:{mediaLoader:{},posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{},errorDisplay:{}},language:document.getElementsByTagName("html")[0].getAttribute("lang")||navigator.Va&&navigator.Va[0]||navigator.ve||navigator.language||"en",languages:{},notSupportedMessage:"No compatible source was found for this video."},"GENERATED_CDN_VSN"!==t.Vb&&(videojs.options.flash.swf=t.Uc+"vjs.zencdn.net/"+t.Vb+"/video-js.swf"),t.fd=function(a,c){return t.options.languages[a]=t.options.languages[a]!==b?t.ha.Wa(t.options.languages[a],c):c,t.options.languages},t.Ca={},"function"==typeof define&&define.amd?define([],function(){return videojs}):"object"==typeof exports&&"object"==typeof module&&(module.exports=videojs),t.ra=t.CoreObject=m(),t.ra.extend=function(a){var b,c;a=a||{},b=a.init||a.i||this.prototype.init||this.prototype.i||m(),c=function(){b.apply(this,arguments)},c.prototype=t.h.create(this.prototype),c.prototype.constructor=c,c.extend=t.ra.extend,c.create=t.ra.create;for(var d in a)a.hasOwnProperty(d)&&(c.prototype[d]=a[d]);return c},t.ra.create=function(){var a=t.h.create(this.prototype);return this.apply(a,arguments),a},t.d=function(a,b,c){if(t.h.isArray(b))return u(t.d,a,b,c);var d=t.getData(a);d.D||(d.D={}),d.D[b]||(d.D[b]=[]),c.z||(c.z=t.z++),d.D[b].push(c),d.Y||(d.disabled=l,d.Y=function(b){if(!d.disabled){b=t.qc(b);var c=d.D[b.type];if(c)for(var c=c.slice(0),e=0,f=c.length;f>e&&!b.xc();e++)c[e].call(a,b)}}),1==d.D[b].length&&(a.addEventListener?a.addEventListener(b,d.Y,l):a.attachEvent&&a.attachEvent("on"+b,d.Y))},t.p=function(a,b,c){if(t.tc(a)){var d=t.getData(a);if(d.D){if(t.h.isArray(b))return u(t.p,a,b,c);if(b){var e=d.D[b];if(e){if(c){if(c.z)for(d=0;d<e.length;d++)e[d].z===c.z&&e.splice(d--,1)}else d.D[b]=[];t.kc(a,b)}}else for(e in d.D)b=e,d.D[b]=[],t.kc(a,b)}}},t.kc=function(a,b){var c=t.getData(a);0===c.D[b].length&&(delete c.D[b],a.removeEventListener?a.removeEventListener(b,c.Y,l):a.detachEvent&&a.detachEvent("on"+b,c.Y)),t.Ib(c.D)&&(delete c.D,delete c.Y,delete c.disabled),t.Ib(c)&&t.Gc(a)},t.qc=function(a){function b(){return f}function c(){return l}if(!a||!a.Jb){var d=a||window.event;a={};for(var e in d)"layerX"!==e&&"layerY"!==e&&"keyboardEvent.keyLocation"!==e&&("returnValue"==e&&d.preventDefault||(a[e]=d[e]));if(a.target||(a.target=a.srcElement||document),a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement,a.preventDefault=function(){d.preventDefault&&d.preventDefault(),a.returnValue=l,a.Bd=b,a.defaultPrevented=f},a.Bd=c,a.defaultPrevented=l,a.stopPropagation=function(){d.stopPropagation&&d.stopPropagation(),a.cancelBubble=f,a.Jb=b},a.Jb=c,a.stopImmediatePropagation=function(){d.stopImmediatePropagation&&d.stopImmediatePropagation(),a.xc=b,a.stopPropagation()},a.xc=c,a.clientX!=k){e=document.documentElement;var g=document.body;a.pageX=a.clientX+(e&&e.scrollLeft||g&&g.scrollLeft||0)-(e&&e.clientLeft||g&&g.clientLeft||0),a.pageY=a.clientY+(e&&e.scrollTop||g&&g.scrollTop||0)-(e&&e.clientTop||g&&g.clientTop||0)}a.which=a.charCode||a.keyCode,a.button!=k&&(a.button=1&a.button?0:4&a.button?1:2&a.button?2:0)}return a},t.m=function(a,b){var c=t.tc(a)?t.getData(a):{},d=a.parentNode||a.ownerDocument;return"string"==typeof b&&(b={type:b,target:a}),b=t.qc(b),c.Y&&c.Y.call(a,b),d&&!b.Jb()&&b.bubbles!==l?t.m(d,b):d||b.defaultPrevented||(c=t.getData(b.target),!b.target[b.type])||(c.disabled=f,"function"==typeof b.target[b.type]&&b.target[b.type](),c.disabled=l),!b.defaultPrevented},t.X=function(a,b,c){function d(){t.p(a,b,d),c.apply(this,arguments)}return t.h.isArray(b)?u(t.X,a,b,c):(d.z=c.z=c.z||t.z++,void t.d(a,b,d))};var v=Object.prototype.hasOwnProperty;t.e=function(a,b){var c;return b=b||{},c=document.createElement(a||"div"),t.h.Z(b,function(a,b){-1!==a.indexOf("aria-")||"role"==a?c.setAttribute(a,b):c[a]=b}),c},t.ba=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},t.h={},t.h.create=Object.create||function(a){function b(){}return b.prototype=a,new b},t.h.Z=function(a,b,c){for(var d in a)v.call(a,d)&&b.call(c||this,d,a[d])},t.h.A=function(a,b){if(!b)return a;for(var c in b)v.call(b,c)&&(a[c]=b[c]);return a},t.h.pd=function(a,b){var c,d,e;a=t.h.copy(a);for(c in b)v.call(b,c)&&(d=a[c],e=b[c],a[c]=t.h.Ta(d)&&t.h.Ta(e)?t.h.pd(d,e):b[c]);return a},t.h.copy=function(a){return t.h.A({},a)},t.h.Ta=function(a){return!!a&&"object"==typeof a&&"[object Object]"===a.toString()&&a.constructor===Object},t.h.isArray=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},t.bind=function(a,b,c){function d(){return b.apply(a,arguments)}return b.z||(b.z=t.z++),d.z=c?c+"_"+b.z:b.z,d},t.va={},t.z=1,t.expando="vdata"+(new Date).getTime(),t.getData=function(a){var b=a[t.expando];return b||(b=a[t.expando]=t.z++,t.va[b]={}),t.va[b]},t.tc=function(a){return a=a[t.expando],!(!a||t.Ib(t.va[a]))},t.Gc=function(a){var b=a[t.expando];if(b){delete t.va[b];try{delete a[t.expando]}catch(c){a.removeAttribute?a.removeAttribute(t.expando):a[t.expando]=k}}},t.Ib=function(a){for(var b in a)if(a[b]!==k)return l;return f},t.n=function(a,b){-1==(" "+a.className+" ").indexOf(" "+b+" ")&&(a.className=""===a.className?b:a.className+" "+b)},t.q=function(a,b){var c,d;if(-1!=a.className.indexOf(b)){for(c=a.className.split(" "),d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);a.className=c.join(" ")}},t.B=t.e("video"),t.M=navigator.userAgent,t.$c=/iPhone/i.test(t.M),t.Zc=/iPad/i.test(t.M),t.ad=/iPod/i.test(t.M),t.Yc=t.$c||t.Zc||t.ad;var aa=t,x,y=t.M.match(/OS (\d+)_/i);x=y&&y[1]?y[1]:b,aa.me=x,t.Wc=/Android/i.test(t.M);var ba=t,z,A=t.M.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),B,C;A?(B=A[1]&&parseFloat(A[1]),C=A[2]&&parseFloat(A[2]),z=B&&C?parseFloat(A[1]+"."+A[2]):B?B:k):z=k,ba.Ub=z,t.bd=t.Wc&&/webkit/i.test(t.M)&&2.3>t.Ub,t.Xc=/Firefox/i.test(t.M),t.ne=/Chrome/i.test(t.M),t.ec=!!("ontouchstart"in window||window.Vc&&document instanceof window.Vc),t.Ic=function(a,b){t.h.Z(b,function(b,c){c===k||"undefined"==typeof c||c===l?a.removeAttribute(b):a.setAttribute(b,c===f?"":c)})},t.Aa=function(a){var b,c,d,e;if(b={},a&&a.attributes&&0<a.attributes.length){c=a.attributes;for(var g=c.length-1;g>=0;g--)d=c[g].name,e=c[g].value,("boolean"==typeof a[d]||-1!==",autoplay,controls,loop,muted,default,".indexOf(","+d+","))&&(e=e!==k?f:l),b[d]=e}return b},t.pe=function(a,b){var c="";return document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(c=a["client"+b.substr(0,1).toUpperCase()+b.substr(1)]+"px"),c},t.Hb=function(a,b){b.firstChild?b.insertBefore(a,b.firstChild):b.appendChild(a)},t.Pa={},t.w=function(a){return 0===a.indexOf("#")&&(a=a.slice(1)),document.getElementById(a)},t.za=function(a,b){b=b||a;var c=Math.floor(a%60),d=Math.floor(a/60%60),e=Math.floor(a/3600),f=Math.floor(b/60%60),g=Math.floor(b/3600);return(isNaN(a)||1/0===a)&&(e=d=c="-"),e=e>0||g>0?e+":":"",e+(((e||f>=10)&&10>d?"0"+d:d)+":")+(10>c?"0"+c:c)},t.jd=function(){document.body.focus(),document.onselectstart=r(l)},t.ie=function(){document.onselectstart=r(f)},t.trim=function(a){return(a+"").replace(/^\s+|\s+$/g,"")},t.round=function(a,b){return b||(b=0),Math.round(a*Math.pow(10,b))/Math.pow(10,b)},t.Ab=function(a,b){return{length:1,start:function(){return a},end:function(){return b}}},t.get=function(a,b,c,d){var e,g,h,i;c=c||m(),"undefined"==typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(b){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(c){}throw Error("This browser does not support XMLHttpRequest.")}),g=new XMLHttpRequest,h=t.Vd(a),i=window.location,h.protocol+h.host===i.protocol+i.host||!window.XDomainRequest||"withCredentials"in g?(e="file:"==h.protocol||"file:"==i.protocol,g.onreadystatechange=function(){4===g.readyState&&(200===g.status||e&&0===g.status?b(g.responseText):c(g.responseText))}):(g=new window.XDomainRequest,g.onload=function(){b(g.responseText)},g.onerror=c,g.onprogress=m(),g.ontimeout=c);try{g.open("GET",a,f),d&&(g.withCredentials=f)}catch(j){return void c(j)}try{g.send()}catch(k){c(k)}},t.Zd=function(a){try{var b=window.localStorage||l;b&&(b.volume=a)}catch(c){22==c.code||1014==c.code?t.log("LocalStorage Full (VideoJS)",c):18==c.code?t.log("LocalStorage not allowed (VideoJS)",c):t.log("LocalStorage Error (VideoJS)",c)}},t.sc=function(a){return a.match(/^https?:\/\//)||(a=t.e("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href),a},t.Vd=function(a){var b,c,d,e;e="protocol hostname port pathname search hash host".split(" "),c=t.e("a",{href:a}),(d=""===c.host&&"file:"!==c.protocol)&&(b=t.e("div"),b.innerHTML='<a href="'+a+'"></a>',c=b.firstChild,b.setAttribute("style","display:none; position:absolute;"),document.body.appendChild(b)),a={};for(var f=0;f<e.length;f++)a[e[f]]=c[e[f]];return d&&document.body.removeChild(b),a},t.log=function(){D(k,arguments)},t.log.history=[],t.log.error=function(){D("error",arguments)},t.log.warn=function(){D("warn",arguments)},t.xd=function(a){var b,c;return a.getBoundingClientRect&&a.parentNode&&(b=a.getBoundingClientRect()),b?(a=document.documentElement,c=document.body,{left:t.round(b.left+(window.pageXOffset||c.scrollLeft)-(a.clientLeft||c.clientLeft||0)),top:t.round(b.top+(window.pageYOffset||c.scrollTop)-(a.clientTop||c.clientTop||0))}):{left:0,top:0}},t.ic={},t.ic.forEach=function(a,b,c){if(t.h.isArray(a)&&b instanceof Function)for(var d=0,e=a.length;e>d;++d)b.call(c||t,a[d],d,a);return a},t.ha={},t.ha.Wa=function(a,b){var c,d,e;a=t.h.copy(a);for(c in b)b.hasOwnProperty(c)&&(d=a[c],e=b[c],a[c]=t.h.Ta(d)&&t.h.Ta(e)?t.ha.Wa(d,e):b[c]);return a},t.a=t.ra.extend({i:function(a,b,c){if(this.c=a,this.l=t.h.copy(this.l),b=this.options(b),this.U=b.id||(b.el&&b.el.id?b.el.id:a.id()+"_component_"+t.z++),this.Id=b.name||k,this.b=b.el||this.e(),this.N=[],this.Qa={},this.Ra={},this.vc(),this.J(c),b.Hc!==l){var d,e;d=t.bind(this.j(),this.j().reportUserActivity),this.d("touchstart",function(){d(),clearInterval(e),e=setInterval(d,250)}),a=function(){d(),clearInterval(e)},this.d("touchmove",d),this.d("touchend",a),this.d("touchcancel",a)}}}),s=t.a.prototype,s.dispose=function(){if(this.m({type:"dispose",bubbles:l}),this.N)for(var a=this.N.length-1;a>=0;a--)this.N[a].dispose&&this.N[a].dispose();this.Ra=this.Qa=this.N=k,this.p(),this.b.parentNode&&this.b.parentNode.removeChild(this.b),t.Gc(this.b),this.b=k},s.c=f,s.j=p("c"),s.options=function(a){return a===b?this.l:this.l=t.ha.Wa(this.l,a)},s.e=function(a,b){return t.e(a,b)},s.s=function(a){var b=this.c.language(),c=this.c.Va();return c&&c[b]&&c[b][a]?c[b][a]:a},s.w=p("b"),s.ka=function(){return this.v||this.b},s.id=p("U"),s.name=p("Id"),s.children=p("N"),s.zd=function(a){return this.Qa[a]},s.la=function(a){return this.Ra[a]},s.R=function(a,b){var c,d;return"string"==typeof a?(d=a,b=b||{},c=b.componentClass||t.ba(d),b.name=d,c=new window.videojs[c](this.c||this,b)):c=a,this.N.push(c),"function"==typeof c.id&&(this.Qa[c.id()]=c),(d=d||c.name&&c.name())&&(this.Ra[d]=c),"function"==typeof c.el&&c.el()&&this.ka().appendChild(c.el()),c},s.removeChild=function(a){if("string"==typeof a&&(a=this.la(a)),a&&this.N){for(var b=l,c=this.N.length-1;c>=0;c--)if(this.N[c]===a){b=f,this.N.splice(c,1);break}b&&(this.Qa[a.id]=k,this.Ra[a.name]=k,(b=a.w())&&b.parentNode===this.ka()&&this.ka().removeChild(a.w()))}},s.vc=function(){var a,b,c,d;if(a=this,b=this.options().children)if(t.h.isArray(b))for(var e=0;e<b.length;e++)c=b[e],"string"==typeof c?(d=c,c={}):d=c.name,a[d]=a.R(d,c);else t.h.Z(b,function(b,c){c!==l&&(a[b]=a.R(b,c))})},s.T=r(""),s.d=function(a,b){return t.d(this.b,a,t.bind(this,b)),this},s.p=function(a,b){return t.p(this.b,a,b),this},s.X=function(a,b){return t.X(this.b,a,t.bind(this,b)),this},s.m=function(a){return t.m(this.b,a),this},s.J=function(a){return a&&(this.ma?a.call(this):(this.bb===b&&(this.bb=[]),this.bb.push(a))),this},s.Ga=function(){this.ma=f;var a=this.bb;if(a&&0<a.length){for(var b=0,c=a.length;c>b;b++)a[b].call(this);this.bb=[],this.m("ready")}},s.n=function(a){return t.n(this.b,a),this},s.q=function(a){return t.q(this.b,a),this},s.show=function(){return this.b.style.display="block",this},s.W=function(){return this.b.style.display="none",this},s.disable=function(){this.W(),this.show=m()},s.width=function(a,b){return F(this,"width",a,b)},s.height=function(a,b){return F(this,"height",a,b)},s.sd=function(a,b){return this.width(a,f).height(b)},t.t=t.a.extend({i:function(a,b){t.a.call(this,a,b),G(this),this.d("tap",this.r),this.d("click",this.r),this.d("focus",this.Za),this.d("blur",this.Ya)}}),s=t.t.prototype,s.e=function(a,b){var c;return b=t.h.A({className:this.T(),role:"button","aria-live":"polite",tabIndex:0},b),c=t.a.prototype.e.call(this,a,b),b.innerHTML||(this.v=t.e("div",{className:"vjs-control-content"}),this.yb=t.e("span",{className:"vjs-control-text",innerHTML:this.s(this.ua)||"Need Text"}),this.v.appendChild(this.yb),c.appendChild(this.v)),c},s.T=function(){return"vjs-control "+t.a.prototype.T.call(this)},s.r=m(),s.Za=function(){t.d(document,"keyup",t.bind(this,this.ea))},s.ea=function(a){(32==a.which||13==a.which)&&(a.preventDefault(),this.r())},s.Ya=function(){t.p(document,"keyup",t.bind(this,this.ea))},t.Q=t.a.extend({i:function(a,b){t.a.call(this,a,b),this.hd=this.la(this.l.barName),this.handle=this.la(this.l.handleName),this.d("mousedown",this.$a),this.d("touchstart",this.$a),this.d("focus",this.Za),this.d("blur",this.Ya),this.d("click",this.r),this.c.d("controlsvisible",t.bind(this,this.update)),a.d(this.Cc,t.bind(this,this.update)),this.S={},this.S.move=t.bind(this,this.ab),this.S.end=t.bind(this,this.Mb)}}),s=t.Q.prototype,s.e=function(a,b){return b=b||{},b.className+=" vjs-slider",b=t.h.A({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},b),t.a.prototype.e.call(this,a,b)},s.$a=function(a){a.preventDefault(),t.jd(),this.n("vjs-sliding"),t.d(document,"mousemove",this.S.move),t.d(document,"mouseup",this.S.end),t.d(document,"touchmove",this.S.move),t.d(document,"touchend",this.S.end),this.ab(a)},s.ab=m(),s.Mb=function(){t.ie(),this.q("vjs-sliding"),t.p(document,"mousemove",this.S.move,l),t.p(document,"mouseup",this.S.end,l),t.p(document,"touchmove",this.S.move,l),t.p(document,"touchend",this.S.end,l),this.update()},s.update=function(){if(this.b){var a,b=this.Gb(),c=this.handle,d=this.hd;if(isNaN(b)&&(b=0),a=b,c){a=this.b.offsetWidth;var e=c.w().offsetWidth;a=e?e/a:0,b*=1-a,a=b+a/2,c.w().style.left=t.round(100*b,2)+"%"}d&&(d.w().style.width=t.round(100*a,2)+"%")}},s.Za=function(){t.d(document,"keyup",t.bind(this,this.ea))},s.ea=function(a){37==a.which||40==a.which?(a.preventDefault(),this.Lc()):(38==a.which||39==a.which)&&(a.preventDefault(),this.Mc())},s.Ya=function(){t.p(document,"keyup",t.bind(this,this.ea))},s.r=function(a){a.stopImmediatePropagation(),a.preventDefault()},t.$=t.a.extend(),t.$.prototype.defaultValue=0,t.$.prototype.e=function(a,b){return b=b||{},b.className+=" vjs-slider-handle",b=t.h.A({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},b),t.a.prototype.e.call(this,"div",b)},t.ia=t.a.extend(),t.ia.prototype.e=function(){var a=this.options().lc||"ul";return this.v=t.e(a,{className:"vjs-menu-content"}),a=t.a.prototype.e.call(this,"div",{append:this.v,className:"vjs-menu"}),a.appendChild(this.v),t.d(a,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),a},t.I=t.t.extend({i:function(a,b){t.t.call(this,a,b),this.selected(b.selected)}}),t.I.prototype.e=function(a,b){return t.t.prototype.e.call(this,"li",t.h.A({className:"vjs-menu-item",innerHTML:this.l.label},b))},t.I.prototype.r=function(){this.selected(f)},t.I.prototype.selected=function(a){a?(this.n("vjs-selected"),this.b.setAttribute("aria-selected",f)):(this.q("vjs-selected"),this.b.setAttribute("aria-selected",l))},t.L=t.t.extend({i:function(a,b){t.t.call(this,a,b),this.Ba=this.xa(),this.R(this.Ba),this.O&&0===this.O.length&&this.W(),this.d("keyup",this.ea),this.b.setAttribute("aria-haspopup",f),this.b.setAttribute("role","button")}}),s=t.L.prototype,s.ta=l,s.xa=function(){var a=new t.ia(this.c);if(this.options().title&&a.ka().appendChild(t.e("li",{className:"vjs-menu-title",innerHTML:t.ba(this.options().title),fe:-1})),this.O=this.createItems())for(var b=0;b<this.O.length;b++)ca(a,this.O[b]);return a},s.wa=m(),s.T=function(){return this.className+" vjs-menu-button "+t.t.prototype.T.call(this)},s.Za=m(),s.Ya=m(),s.r=function(){this.X("mouseout",t.bind(this,function(){E(this.Ba),this.b.blur()})),this.ta?I(this):J(this)},s.ea=function(a){a.preventDefault(),32==a.which||13==a.which?this.ta?I(this):J(this):27==a.which&&this.ta&&I(this)},t.F=function(a){"number"==typeof a?this.code=a:"string"==typeof a?this.message=a:"object"==typeof a&&t.h.A(this,a),this.message||(this.message=t.F.qd[this.code]||"")},t.F.prototype.code=0,t.F.prototype.message="",t.F.prototype.status=k,t.F.Sa="MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" "),t.F.qd={1:"You aborted the video playback",2:"A network error caused the video download to fail part-way.",3:"The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",4:"The video could not be loaded, either because the server or network failed or because the format is not supported.",5:"The video is encrypted and we do not have the keys to decrypt it."};for(var K=0;K<t.F.Sa.length;K++)t.F[t.F.Sa[K]]=K,t.F.prototype[t.F.Sa[K]]=K;var L,M,N,O;for(L=["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),"webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),"webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),"mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "),"msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")],M=L[0],O=0;O<L.length;O++)if(L[O][1]in document){N=L[O];break}if(N)for(t.Pa.Fb={},O=0;O<N.length;O++)t.Pa.Fb[M[O]]=N[O];t.Player=t.a.extend({i:function(a,b,c){this.P=a,a.id=a.id||"vjs_video_"+t.z++,this.ge=a&&t.Aa(a),b=t.h.A(da(a),b),this.Ua=b.language||t.options.language,this.Gd=b.languages||t.options.languages,this.G={},this.Dc=b.poster,this.zb=b.controls,a.controls=l,b.Hc=l,t.a.call(this,this,b,c),this.n(this.controls()?"vjs-controls-enabled":"vjs-controls-disabled"),t.Ca[this.U]=this,b.plugins&&t.h.Z(b.plugins,function(a,b){this[a](b)},this);var d,e,g,h,i,j;d=t.bind(this,this.reportUserActivity),this.d("mousedown",function(){d(),clearInterval(e),e=setInterval(d,250)}),this.d("mousemove",function(a){(a.screenX!=i||a.screenY!=j)&&(i=a.screenX,j=a.screenY,d())}),this.d("mouseup",function(){d(),clearInterval(e)}),this.d("keydown",d),this.d("keyup",d),g=setInterval(t.bind(this,function(){this.qa&&(this.qa=l,this.userActive(f),clearTimeout(h),h=setTimeout(t.bind(this,function(){this.qa||this.userActive(l)}),2e3))}),250),this.d("dispose",function(){clearInterval(g),clearTimeout(h)})}}),s=t.Player.prototype,s.language=function(a){return a===b?this.Ua:(this.Ua=a,this)},s.Va=p("Gd"),s.l=t.options,s.dispose=function(){this.m("dispose"),this.p("dispose"),t.Ca[this.U]=k,this.P&&this.P.player&&(this.P.player=k),this.b&&this.b.player&&(this.b.player=k),this.k&&this.k.dispose(),t.a.prototype.dispose.call(this)},s.e=function(){var a,b=this.b=t.a.prototype.e.call(this,"div"),c=this.P;if(c.removeAttribute("width"),c.removeAttribute("height"),c.hasChildNodes()){var d,e,g,h,i;for(d=c.childNodes,e=d.length,i=[];e--;)g=d[e],h=g.nodeName.toLowerCase(),"track"===h&&i.push(g);for(d=0;d<i.length;d++)c.removeChild(i[d])}return a=t.Aa(c),t.h.Z(a,function(c){b.setAttribute(c,a[c])}),c.id+="_html5_api",c.className="vjs-tech",c.player=b.player=this,this.n("vjs-paused"),this.width(this.l.width,f),this.height(this.l.height,f),c.parentNode&&c.parentNode.insertBefore(b,c),t.Hb(c,b),this.b=b,this.d("loadstart",this.Nd),this.d("waiting",this.Td),this.d(["canplay","canplaythrough","playing","ended"],this.Sd),this.d("seeking",this.Qd),this.d("seeked",this.Pd),this.d("ended",this.Jd),this.d("play",this.Ob),this.d("firstplay",this.Ld),this.d("pause",this.Nb),this.d("progress",this.Od),this.d("durationchange",this.Ac),this.d("fullscreenchange",this.Md),b},s.Nd=function(){this.error(k),this.paused()?(Q(this,l),this.X("play",function(){Q(this,f)})):this.m("firstplay")},s.uc=l,s.Ob=function(){this.q("vjs-paused"),this.n("vjs-playing")},s.Td=function(){this.n("vjs-waiting")},s.Sd=function(){this.q("vjs-waiting")},s.Qd=function(){this.n("vjs-seeking")},s.Pd=function(){this.q("vjs-seeking")},s.Ld=function(){this.l.starttime&&this.currentTime(this.l.starttime),this.n("vjs-has-started")},s.Nb=function(){this.q("vjs-playing"),this.n("vjs-paused")},s.Od=function(){1==this.bufferedPercent()&&this.m("loadedalldata")},s.Jd=function(){this.l.loop&&(this.currentTime(0),this.play())},s.Ac=function(){var a=R(this,"duration");a&&(0>a&&(a=1/0),this.duration(a),1/0===a?this.n("vjs-live"):this.q("vjs-live"))},s.Md=function(){this.isFullscreen()?this.n("vjs-fullscreen"):this.q("vjs-fullscreen")},s.play=function(){return S(this,"play"),this},s.pause=function(){return S(this,"pause"),this},s.paused=function(){return R(this,"paused")===l?l:f},s.currentTime=function(a){return a!==b?(S(this,"setCurrentTime",a),this):this.G.currentTime=R(this,"currentTime")||0},s.duration=function(a){return a!==b?(this.G.duration=parseFloat(a),this):(this.G.duration===b&&this.Ac(),this.G.duration||0)},s.remainingTime=function(){return this.duration()-this.currentTime()},s.buffered=function(){var a=R(this,"buffered");return a&&a.length||(a=t.Ab(0,0)),a},s.bufferedPercent=function(){var a,b,c=this.duration(),d=this.buffered(),e=0;if(!c)return 0;for(var f=0;f<d.length;f++)a=d.start(f),b=d.end(f),b>c&&(b=c),e+=b-a;return e/c},s.volume=function(a){return a!==b?(a=Math.max(0,Math.min(1,parseFloat(a))),this.G.volume=a,S(this,"setVolume",a),t.Zd(a),this):(a=parseFloat(R(this,"volume")),isNaN(a)?1:a)},s.muted=function(a){return a!==b?(S(this,"setMuted",a),this):R(this,"muted")||l},s.Ea=function(){return R(this,"supportsFullScreen")||l},s.wc=l,s.isFullscreen=function(a){return a!==b?(this.wc=!!a,this):this.wc},s.isFullScreen=function(a){return t.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'),this.isFullscreen(a)},s.requestFullscreen=function(){var a=t.Pa.Fb;return this.isFullscreen(f),a?(t.d(document,a.fullscreenchange,t.bind(this,function(){this.isFullscreen(document[a.fullscreenElement]),this.isFullscreen()===l&&t.p(document,a.fullscreenchange,arguments.callee),this.m("fullscreenchange")})),this.b[a.requestFullscreen]()):this.k.Ea()?S(this,"enterFullScreen"):(this.pc(),this.m("fullscreenchange")),this},s.exitFullscreen=function(){var a=t.Pa.Fb;return this.isFullscreen(l),a?document[a.exitFullscreen]():this.k.Ea()?S(this,"exitFullScreen"):(this.Db(),this.m("fullscreenchange")),this},s.pc=function(){this.Cd=f,this.td=document.documentElement.style.overflow,t.d(document,"keydown",t.bind(this,this.rc)),document.documentElement.style.overflow="hidden",t.n(document.body,"vjs-full-window"),this.m("enterFullWindow")},s.rc=function(a){27===a.keyCode&&(this.isFullscreen()===f?this.exitFullscreen():this.Db())},s.Db=function(){this.Cd=l,t.p(document,"keydown",this.rc),document.documentElement.style.overflow=this.td,t.q(document.body,"vjs-full-window"),this.m("exitFullWindow")},s.selectSource=function(a){for(var b=0,c=this.l.techOrder;b<c.length;b++){var d=t.ba(c[b]),e=window.videojs[d];if(e){if(e.isSupported())for(var f=0,g=a;f<g.length;f++){var h=g[f];if(e.canPlaySource(h))return{source:h,k:d}}}else t.log.error('The "'+d+'" tech is undefined. Skipped browser support check for that tech.')}return l},s.src=function(a){return a===b?R(this,"src"):(t.h.isArray(a)?T(this,a):"string"==typeof a?this.src({src:a}):a instanceof Object&&(a.type&&!window.videojs[this.fb].canPlaySource(a)?T(this,[a]):(this.G.src=a.src,this.nc=a.type||"",this.J(function(){S(this,"src",a.src),"auto"==this.l.preload&&this.load(),this.l.autoplay&&this.play()}))),this)},s.load=function(){return S(this,"load"),this},s.currentSrc=function(){return R(this,"currentSrc")||this.G.src||""},s.od=function(){return this.nc||""},s.Da=function(a){return a!==b?(S(this,"setPreload",a),this.l.preload=a,this):R(this,"preload")},s.autoplay=function(a){return a!==b?(S(this,"setAutoplay",a),this.l.autoplay=a,this):R(this,"autoplay")},s.loop=function(a){return a!==b?(S(this,"setLoop",a),this.l.loop=a,this):R(this,"loop")},s.poster=function(a){return a===b?this.Dc:(this.Dc=a,S(this,"setPoster",a),void this.m("posterchange"))},s.controls=function(a){return a!==b?(a=!!a,this.zb!==a&&((this.zb=a)?(this.q("vjs-controls-disabled"),this.n("vjs-controls-enabled"),this.m("controlsenabled")):(this.q("vjs-controls-enabled"),this.n("vjs-controls-disabled"),this.m("controlsdisabled"))),this):this.zb},t.Player.prototype.Tb,s=t.Player.prototype,s.usingNativeControls=function(a){return a!==b?(a=!!a,this.Tb!==a&&((this.Tb=a)?(this.n("vjs-using-native-controls"),this.m("usingnativecontrols")):(this.q("vjs-using-native-controls"),this.m("usingcustomcontrols"))),this):this.Tb},s.da=k,s.error=function(a){return a===b?this.da:a===k?(this.da=a,this.q("vjs-error"),this):(this.da=a instanceof t.F?a:new t.F(a),this.m("error"),this.n("vjs-error"),t.log.error("(CODE:"+this.da.code+" "+t.F.Sa[this.da.code]+")",this.da.message,this.da),this)},s.ended=function(){return R(this,"ended")},s.seeking=function(){return R(this,"seeking")},s.qa=f,s.reportUserActivity=function(){this.qa=f},s.Sb=f,s.userActive=function(a){return a!==b?(a=!!a,a!==this.Sb&&((this.Sb=a)?(this.qa=f,this.q("vjs-user-inactive"),this.n("vjs-user-active"),this.m("useractive")):(this.qa=l,this.k&&this.k.X("mousemove",function(a){a.stopPropagation(),a.preventDefault()}),this.q("vjs-user-active"),this.n("vjs-user-inactive"),this.m("userinactive"))),this):this.Sb},s.playbackRate=function(a){return a!==b?(S(this,"setPlaybackRate",a),this):this.k&&this.k.o&&this.k.o.playbackRate?R(this,"playbackRate"):1},t.Ja=t.a.extend(),t.Ja.prototype.l={qe:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},liveDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{},playbackRateMenuButton:{}}},t.Ja.prototype.e=function(){return t.e("div",{className:"vjs-control-bar"})},t.Yb=t.a.extend({i:function(a,b){t.a.call(this,a,b)}}),t.Yb.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-live-controls vjs-control"});
return this.v=t.e("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.s("Stream Type")+"</span>"+this.s("LIVE"),"aria-live":"off"}),a.appendChild(this.v),a},t.ac=t.t.extend({i:function(a,b){t.t.call(this,a,b),a.d("play",t.bind(this,this.Ob)),a.d("pause",t.bind(this,this.Nb))}}),s=t.ac.prototype,s.ua="Play",s.T=function(){return"vjs-play-control "+t.t.prototype.T.call(this)},s.r=function(){this.c.paused()?this.c.play():this.c.pause()},s.Ob=function(){t.q(this.b,"vjs-paused"),t.n(this.b,"vjs-playing"),this.b.children[0].children[0].innerHTML=this.s("Pause")},s.Nb=function(){t.q(this.b,"vjs-playing"),t.n(this.b,"vjs-paused"),this.b.children[0].children[0].innerHTML=this.s("Play")},t.ib=t.a.extend({i:function(a,b){t.a.call(this,a,b),a.d("timeupdate",t.bind(this,this.ga))}}),t.ib.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});return this.v=t.e("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"}),a.appendChild(this.v),a},t.ib.prototype.ga=function(){var a=this.c.cb?this.c.G.currentTime:this.c.currentTime();this.v.innerHTML='<span class="vjs-control-text">'+this.s("Current Time")+"</span> "+t.za(a,this.c.duration())},t.jb=t.a.extend({i:function(a,b){t.a.call(this,a,b),a.d("timeupdate",t.bind(this,this.ga))}}),t.jb.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});return this.v=t.e("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.s("Duration Time")+"</span> 0:00","aria-live":"off"}),a.appendChild(this.v),a},t.jb.prototype.ga=function(){var a=this.c.duration();a&&(this.v.innerHTML='<span class="vjs-control-text">'+this.s("Duration Time")+"</span> "+t.za(a))},t.gc=t.a.extend({i:function(a,b){t.a.call(this,a,b)}}),t.gc.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},t.qb=t.a.extend({i:function(a,b){t.a.call(this,a,b),a.d("timeupdate",t.bind(this,this.ga))}}),t.qb.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});return this.v=t.e("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.s("Remaining Time")+"</span> -0:00","aria-live":"off"}),a.appendChild(this.v),a},t.qb.prototype.ga=function(){this.c.duration()&&(this.v.innerHTML='<span class="vjs-control-text">'+this.s("Remaining Time")+"</span> -"+t.za(this.c.remainingTime()))},t.Ka=t.t.extend({i:function(a,b){t.t.call(this,a,b)}}),t.Ka.prototype.ua="Fullscreen",t.Ka.prototype.T=function(){return"vjs-fullscreen-control "+t.t.prototype.T.call(this)},t.Ka.prototype.r=function(){this.c.isFullscreen()?(this.c.exitFullscreen(),this.yb.innerHTML=this.s("Fullscreen")):(this.c.requestFullscreen(),this.yb.innerHTML=this.s("Non-Fullscreen"))},t.pb=t.a.extend({i:function(a,b){t.a.call(this,a,b)}}),t.pb.prototype.l={children:{seekBar:{}}},t.pb.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-progress-control vjs-control"})},t.cc=t.Q.extend({i:function(a,b){t.Q.call(this,a,b),a.d("timeupdate",t.bind(this,this.pa)),a.J(t.bind(this,this.pa))}}),s=t.cc.prototype,s.l={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"},s.Cc="timeupdate",s.e=function(){return t.Q.prototype.e.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})},s.pa=function(){var a=this.c.cb?this.c.G.currentTime:this.c.currentTime();this.b.setAttribute("aria-valuenow",t.round(100*this.Gb(),2)),this.b.setAttribute("aria-valuetext",t.za(a,this.c.duration()))},s.Gb=function(){return this.c.currentTime()/this.c.duration()},s.$a=function(a){t.Q.prototype.$a.call(this,a),this.c.cb=f,this.ke=!this.c.paused(),this.c.pause()},s.ab=function(a){a=H(this,a)*this.c.duration(),a==this.c.duration()&&(a-=.1),this.c.currentTime(a)},s.Mb=function(a){t.Q.prototype.Mb.call(this,a),this.c.cb=l,this.ke&&this.c.play()},s.Mc=function(){this.c.currentTime(this.c.currentTime()+5)},s.Lc=function(){this.c.currentTime(this.c.currentTime()-5)},t.mb=t.a.extend({i:function(a,b){t.a.call(this,a,b),a.d("progress",t.bind(this,this.update))}}),t.mb.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.s("Loaded")+"</span>: 0%</span>"})},t.mb.prototype.update=function(){var a,b,c,d,e=this.c.buffered();a=this.c.duration();var f,g=this.c;for(f=g.buffered(),g=g.duration(),f=f.end(f.length-1),f>g&&(f=g),g=this.b.children,this.b.style.width=100*(f/a||0)+"%",a=0;a<e.length;a++)b=e.start(a),c=e.end(a),(d=g[a])||(d=this.b.appendChild(t.e())),d.style.left=100*(b/f||0)+"%",d.style.width=100*((c-b)/f||0)+"%";for(a=g.length;a>e.length;a--)this.b.removeChild(g[a-1])},t.$b=t.a.extend({i:function(a,b){t.a.call(this,a,b)}}),t.$b.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.s("Progress")+"</span>: 0%</span>"})},t.Ma=t.$.extend({i:function(a,b){t.$.call(this,a,b),a.d("timeupdate",t.bind(this,this.ga))}}),t.Ma.prototype.defaultValue="00:00",t.Ma.prototype.e=function(){return t.$.prototype.e.call(this,"div",{className:"vjs-seek-handle","aria-live":"off"})},t.Ma.prototype.ga=function(){var a=this.c.cb?this.c.G.currentTime:this.c.currentTime();this.b.innerHTML='<span class="vjs-control-text">'+t.za(a,this.c.duration())+"</span>"},t.sb=t.a.extend({i:function(a,b){t.a.call(this,a,b),a.k&&a.k.o&&a.k.o.volumeControl===l&&this.n("vjs-hidden"),a.d("loadstart",t.bind(this,function(){a.k.o&&a.k.o.volumeControl===l?this.n("vjs-hidden"):this.q("vjs-hidden")}))}}),t.sb.prototype.l={children:{volumeBar:{}}},t.sb.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-volume-control vjs-control"})},t.rb=t.Q.extend({i:function(a,b){t.Q.call(this,a,b),a.d("volumechange",t.bind(this,this.pa)),a.J(t.bind(this,this.pa))}}),s=t.rb.prototype,s.pa=function(){this.b.setAttribute("aria-valuenow",t.round(100*this.c.volume(),2)),this.b.setAttribute("aria-valuetext",t.round(100*this.c.volume(),2)+"%")},s.l={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"},s.Cc="volumechange",s.e=function(){return t.Q.prototype.e.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})},s.ab=function(a){this.c.muted()&&this.c.muted(l),this.c.volume(H(this,a))},s.Gb=function(){return this.c.muted()?0:this.c.volume()},s.Mc=function(){this.c.volume(this.c.volume()+.1)},s.Lc=function(){this.c.volume(this.c.volume()-.1)},t.hc=t.a.extend({i:function(a,b){t.a.call(this,a,b)}}),t.hc.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},t.tb=t.$.extend(),t.tb.prototype.defaultValue="00:00",t.tb.prototype.e=function(){return t.$.prototype.e.call(this,"div",{className:"vjs-volume-handle"})},t.ja=t.t.extend({i:function(a,b){t.t.call(this,a,b),a.d("volumechange",t.bind(this,this.update)),a.k&&a.k.o&&a.k.o.volumeControl===l&&this.n("vjs-hidden"),a.d("loadstart",t.bind(this,function(){a.k.o&&a.k.o.volumeControl===l?this.n("vjs-hidden"):this.q("vjs-hidden")}))}}),t.ja.prototype.e=function(){return t.t.prototype.e.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.s("Mute")+"</span></div>"})},t.ja.prototype.r=function(){this.c.muted(this.c.muted()?l:f)},t.ja.prototype.update=function(){var a=this.c.volume(),b=3;for(0===a||this.c.muted()?b=0:.33>a?b=1:.67>a&&(b=2),this.c.muted()?this.b.children[0].children[0].innerHTML!=this.s("Unmute")&&(this.b.children[0].children[0].innerHTML=this.s("Unmute")):this.b.children[0].children[0].innerHTML!=this.s("Mute")&&(this.b.children[0].children[0].innerHTML=this.s("Mute")),a=0;4>a;a++)t.q(this.b,"vjs-vol-"+a);t.n(this.b,"vjs-vol-"+b)},t.sa=t.L.extend({i:function(a,b){t.L.call(this,a,b),a.d("volumechange",t.bind(this,this.update)),a.k&&a.k.o&&a.k.o.Sc===l&&this.n("vjs-hidden"),a.d("loadstart",t.bind(this,function(){a.k.o&&a.k.o.Sc===l?this.n("vjs-hidden"):this.q("vjs-hidden")})),this.n("vjs-menu-button")}}),t.sa.prototype.xa=function(){var a=new t.ia(this.c,{lc:"div"}),b=new t.rb(this.c,t.h.A({vertical:f},this.l.we));return a.R(b),a},t.sa.prototype.r=function(){t.ja.prototype.r.call(this),t.L.prototype.r.call(this)},t.sa.prototype.e=function(){return t.t.prototype.e.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.s("Mute")+"</span></div>"})},t.sa.prototype.update=t.ja.prototype.update,t.bc=t.L.extend({i:function(a,b){t.L.call(this,a,b),this.Rc(),this.Qc(),a.d("loadstart",t.bind(this,this.Rc)),a.d("ratechange",t.bind(this,this.Qc))}}),s=t.bc.prototype,s.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-playback-rate vjs-menu-button vjs-control",innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">'+this.s("Playback Rate")+"</span></div>"});return this.yc=t.e("div",{className:"vjs-playback-rate-value",innerHTML:1}),a.appendChild(this.yc),a},s.xa=function(){var a=new t.ia(this.j()),b=this.j().options().playbackRates;if(b)for(var c=b.length-1;c>=0;c--)a.R(new t.ob(this.j(),{rate:b[c]+"x"}));return a},s.pa=function(){this.w().setAttribute("aria-valuenow",this.j().playbackRate())},s.r=function(){for(var a=this.j().playbackRate(),b=this.j().options().playbackRates,c=b[0],d=0;d<b.length;d++)if(b[d]>a){c=b[d];break}this.j().playbackRate(c)},s.Rc=function(){U(this)?this.q("vjs-hidden"):this.n("vjs-hidden")},s.Qc=function(){U(this)&&(this.yc.innerHTML=this.j().playbackRate()+"x")},t.ob=t.I.extend({lc:"button",i:function(a,b){var c=this.label=b.rate,d=this.Fc=parseFloat(c,10);b.label=c,b.selected=1===d,t.I.call(this,a,b),this.j().d("ratechange",t.bind(this,this.update))}}),t.ob.prototype.r=function(){t.I.prototype.r.call(this),this.j().playbackRate(this.Fc)},t.ob.prototype.update=function(){this.selected(this.j().playbackRate()==this.Fc)},t.La=t.t.extend({i:function(a,b){t.t.call(this,a,b),a.poster()&&this.src(a.poster()),(!a.poster()||!a.controls())&&this.W(),a.d("posterchange",t.bind(this,function(){this.src(a.poster())})),a.d("play",t.bind(this,this.W))}});var ea="backgroundSize"in t.B.style;t.La.prototype.e=function(){var a=t.e("div",{className:"vjs-poster",tabIndex:-1});return ea||a.appendChild(t.e("img")),a},t.La.prototype.src=function(a){var c=this.w();a!==b&&(ea?c.style.backgroundImage='url("'+a+'")':c.firstChild.src=a)},t.La.prototype.r=function(){this.j().controls()&&this.c.play()},t.Zb=t.a.extend({i:function(a,b){t.a.call(this,a,b)}}),t.Zb.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-loading-spinner"})},t.gb=t.t.extend(),t.gb.prototype.e=function(){return t.t.prototype.e.call(this,"div",{className:"vjs-big-play-button",innerHTML:'<span aria-hidden="true"></span>',"aria-label":"play video"})},t.gb.prototype.r=function(){this.c.play()},t.kb=t.a.extend({i:function(a,b){t.a.call(this,a,b),this.update(),a.d("error",t.bind(this,this.update))}}),t.kb.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-error-display"});return this.v=t.e("div"),a.appendChild(this.v),a},t.kb.prototype.update=function(){this.j().error()&&(this.v.innerHTML=this.s(this.j().error().message))},t.u=t.a.extend({i:function(a,b,c){b=b||{},b.Hc=l,t.a.call(this,a,b,c),this.o.progressEvents||(this.zc=f,this.Ec=setInterval(t.bind(this,function(){var a=this.j().bufferedPercent();this.kd!=a&&this.j().m("progress"),this.kd=a,1===a&&clearInterval(this.Ec)}),500)),this.o.timeupdateEvents||(this.Lb=f,this.j().d("play",t.bind(this,this.Pc)),this.j().d("pause",t.bind(this,this.eb)),this.X("timeupdate",function(){this.o.timeupdateEvents=f,fa(this)}));var d,e;e=this,d=this.j(),a=function(){if(d.controls()&&!d.usingNativeControls()){var a;e.d("mousedown",e.r),e.d("touchstart",function(){a=this.c.userActive()}),e.d("touchmove",function(){a&&this.j().reportUserActivity()}),e.d("touchend",function(a){a.preventDefault()}),G(e),e.d("tap",e.Rd)}},b=t.bind(e,e.Xd),this.J(a),d.d("controlsenabled",a),d.d("controlsdisabled",b),this.J(function(){this.networkState&&0<this.networkState()&&this.j().m("loadstart")})}}),s=t.u.prototype,s.Xd=function(){this.p("tap"),this.p("touchstart"),this.p("touchmove"),this.p("touchleave"),this.p("touchcancel"),this.p("touchend"),this.p("click"),this.p("mousedown")},s.r=function(a){0===a.button&&this.j().controls()&&(this.j().paused()?this.j().play():this.j().pause())},s.Rd=function(){this.j().userActive(!this.j().userActive())},s.Pc=function(){this.mc&&this.eb(),this.mc=setInterval(t.bind(this,function(){this.j().m("timeupdate")}),250)},s.eb=function(){clearInterval(this.mc),this.j().m("timeupdate")},s.dispose=function(){this.zc&&(this.zc=l,clearInterval(this.Ec)),this.Lb&&fa(this),t.a.prototype.dispose.call(this)},s.Qb=function(){this.Lb&&this.j().m("timeupdate")},s.Jc=m(),s.o={volumeControl:f,fullscreenResize:l,playbackRate:l,progressEvents:l,timeupdateEvents:l},t.media={},t.g=t.u.extend({i:function(a,b,c){for(this.o.volumeControl=t.g.md(),this.o.playbackRate=t.g.ld(),this.o.movingMediaElementInDOM=!t.Yc,this.o.fullscreenResize=f,this.o.progressEvents=f,t.u.call(this,a,b,c),c=t.g.lb.length-1;c>=0;c--)t.d(this.b,t.g.lb[c],t.bind(this,this.vd));if((b=b.source)&&this.b.currentSrc!==b.src&&(this.b.src=b.src),t.ec&&a.options().nativeControlsForTouch!==l){var d,e,g,h;d=this,e=this.j(),b=e.controls(),d.b.controls=!!b,g=function(){d.b.controls=f},h=function(){d.b.controls=l},e.d("controlsenabled",g),e.d("controlsdisabled",h),b=function(){e.p("controlsenabled",g),e.p("controlsdisabled",h)},d.d("dispose",b),e.d("usingcustomcontrols",b),e.usingNativeControls(f)}a.J(function(){this.P&&this.l.autoplay&&this.paused()&&(delete this.P.poster,this.play())}),this.Ga()}}),s=t.g.prototype,s.dispose=function(){t.g.Cb(this.b),t.u.prototype.dispose.call(this)},s.e=function(){var a,b=this.c,c=b.P;c&&this.o.movingMediaElementInDOM!==l||(c?(a=c.cloneNode(l),t.g.Cb(c),c=a,b.P=k):(c=t.e("video"),t.Ic(c,t.h.A(b.ge||{},{id:b.id()+"_html5_api","class":"vjs-tech"}))),c.player=b,t.Hb(c,b.w())),a=["autoplay","preload","loop","muted"];for(var d=a.length-1;d>=0;d--){var e=a[d],f={};"undefined"!=typeof b.l[e]&&(f[e]=b.l[e]),t.Ic(c,f)}return c},s.vd=function(a){"error"==a.type?this.j().error(this.error().code):(a.bubbles=l,this.j().m(a))},s.play=function(){this.b.play()},s.pause=function(){this.b.pause()},s.paused=function(){return this.b.paused},s.currentTime=function(){return this.b.currentTime},s.Qb=function(a){try{this.b.currentTime=a}catch(b){t.log(b,"Video is not ready. (Video.js)")}},s.duration=function(){return this.b.duration||0},s.buffered=function(){return this.b.buffered},s.volume=function(){return this.b.volume},s.de=function(a){this.b.volume=a},s.muted=function(){return this.b.muted},s.ae=function(a){this.b.muted=a},s.width=function(){return this.b.offsetWidth},s.height=function(){return this.b.offsetHeight},s.Ea=function(){return"function"!=typeof this.b.webkitEnterFullScreen||!/Android/.test(t.M)&&/Chrome|Mac OS X 10.5/.test(t.M)?l:f},s.oc=function(){var a=this.b;a.paused&&a.networkState<=a.le?(this.b.play(),setTimeout(function(){a.pause(),a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()},s.wd=function(){this.b.webkitExitFullScreen()},s.src=function(a){this.b.src=a},s.load=function(){this.b.load()},s.currentSrc=function(){return this.b.currentSrc},s.poster=function(){return this.b.poster},s.Jc=function(a){this.b.poster=a},s.Da=function(){return this.b.Da},s.ce=function(a){this.b.Da=a},s.autoplay=function(){return this.b.autoplay},s.Yd=function(a){this.b.autoplay=a},s.controls=function(){return this.b.controls},s.loop=function(){return this.b.loop},s.$d=function(a){this.b.loop=a},s.error=function(){return this.b.error},s.seeking=function(){return this.b.seeking},s.ended=function(){return this.b.ended},s.playbackRate=function(){return this.b.playbackRate},s.be=function(a){this.b.playbackRate=a},s.networkState=function(){return this.b.networkState},t.g.isSupported=function(){try{t.B.volume=.5}catch(a){return l}return!!t.B.canPlayType},t.g.wb=function(a){try{return!!t.B.canPlayType(a.type)}catch(b){return""}},t.g.md=function(){var a=t.B.volume;return t.B.volume=a/2+.1,a!==t.B.volume},t.g.ld=function(){var a=t.B.playbackRate;return t.B.playbackRate=a/2+.1,a!==t.B.playbackRate};var V,ga=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,ha=/^video\/mp4/i;t.g.Bc=function(){4<=t.Ub&&(V||(V=t.B.constructor.prototype.canPlayType),t.B.constructor.prototype.canPlayType=function(a){return a&&ga.test(a)?"maybe":V.call(this,a)}),t.bd&&(V||(V=t.B.constructor.prototype.canPlayType),t.B.constructor.prototype.canPlayType=function(a){return a&&ha.test(a)?"maybe":V.call(this,a)})},t.g.je=function(){var a=t.B.constructor.prototype.canPlayType;return t.B.constructor.prototype.canPlayType=V,V=k,a},t.g.Bc(),t.g.lb="loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" "),t.g.Cb=function(a){if(a){for(a.player=k,a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);if(a.removeAttribute("src"),"function"==typeof a.load)try{a.load()}catch(b){}}},t.f=t.u.extend({i:function(a,b,c){t.u.call(this,a,b,c);var d=b.source;c=b.parentEl;var e=this.b=t.e("div",{id:a.id()+"_temp_flash"}),f=a.id()+"_flash_api",g=a.l,g=t.h.A({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:g.autoplay,preload:g.Da,loop:g.loop,muted:g.muted},b.flashVars),h=t.h.A({wmode:"opaque",bgcolor:"#000000"},b.params),f=t.h.A({id:f,name:f,"class":"vjs-tech"},b.attributes);d&&(d.type&&t.f.Ed(d.type)?(d=t.f.Nc(d.src),g.rtmpConnection=encodeURIComponent(d.xb),g.rtmpStream=encodeURIComponent(d.Rb)):g.src=encodeURIComponent(t.sc(d.src))),t.Hb(e,c),b.startTime&&this.J(function(){this.load(),this.play(),this.currentTime(b.startTime)}),t.Xc&&this.J(function(){t.d(this.w(),"mousemove",t.bind(this,function(){this.j().m({type:"mousemove",bubbles:l})}))}),a.d("stageclick",a.reportUserActivity),this.b=t.f.ud(b.swf,e,g,h,f)}}),t.f.prototype.dispose=function(){t.u.prototype.dispose.call(this)},t.f.prototype.play=function(){this.b.vjs_play()},t.f.prototype.pause=function(){this.b.vjs_pause()},t.f.prototype.src=function(a){if(a===b)return this.currentSrc();if(t.f.Dd(a)?(a=t.f.Nc(a),this.se(a.xb),this.te(a.Rb)):(a=t.sc(a),this.b.vjs_src(a)),this.c.autoplay()){var c=this;setTimeout(function(){c.play()},0)}},t.f.prototype.setCurrentTime=function(a){this.Hd=a,this.b.vjs_setProperty("currentTime",a),t.u.prototype.Qb.call(this)},t.f.prototype.currentTime=function(){return this.seeking()?this.Hd||0:this.b.vjs_getProperty("currentTime")},t.f.prototype.currentSrc=function(){var a=this.b.vjs_getProperty("currentSrc");if(a==k){var b=this.rtmpConnection(),c=this.rtmpStream();b&&c&&(a=t.f.ee(b,c))}return a},t.f.prototype.load=function(){this.b.vjs_load()},t.f.prototype.poster=function(){this.b.vjs_getProperty("poster")},t.f.prototype.setPoster=m(),t.f.prototype.buffered=function(){return t.Ab(0,this.b.vjs_getProperty("buffered"))},t.f.prototype.Ea=r(l),t.f.prototype.oc=r(l);var ja=t.f.prototype,W="rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),la="error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "),X;for(X=0;X<W.length;X++)ka(W[X]),ia();for(X=0;X<la.length;X++)ka(la[X]);if(t.f.isSupported=function(){return 10<=t.f.version()[0]},t.f.wb=function(a){return a.type?(a=a.type.replace(/;.*/,"").toLowerCase(),a in t.f.yd||a in t.f.Oc?"maybe":void 0):""},t.f.yd={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},t.f.Oc={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},t.f.onReady=function(a){var b;(b=(a=t.w(a))&&a.parentNode&&a.parentNode.player)&&(a.player=b,t.f.checkReady(b.k))},t.f.checkReady=function(a){a.w()&&(a.w().vjs_getProperty?a.Ga():setTimeout(function(){t.f.checkReady(a)},50))},t.f.onEvent=function(a,b){t.w(a).player.m(b)},t.f.onError=function(a,b){var c=t.w(a).player,d="FLASH: "+b;c.error("srcnotfound"==b?{code:4,message:d}:d)},t.f.version=function(){var a="0,0,0";try{a=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(b){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(c){}}return a.split(",")},t.f.ud=function(a,b,c,d,e){a=t.f.Ad(a,c,d,e),a=t.e("div",{innerHTML:a}).childNodes[0],c=b.parentNode,b.parentNode.replaceChild(a,b);var f=c.childNodes[0];return setTimeout(function(){f.style.display="block"},1e3),a},t.f.Ad=function(a,b,c,d){var e="",f="",g="";return b&&t.h.Z(b,function(a,b){e+=a+"="+b+"&amp;"}),c=t.h.A({movie:a,flashvars:e,allowScriptAccess:"always",allowNetworking:"all"},c),t.h.Z(c,function(a,b){f+='<param name="'+a+'" value="'+b+'" />'}),d=t.h.A({data:a,width:"100%",height:"100%"},d),t.h.Z(d,function(a,b){g+=a+'="'+b+'" '}),'<object type="application/x-shockwave-flash"'+g+">"+f+"</object>"},t.f.ee=function(a,b){return a+"&"+b},t.f.Nc=function(a){var b={xb:"",Rb:""};if(!a)return b;var c,d=a.indexOf("&");return-1!==d?c=d+1:(d=c=a.lastIndexOf("/")+1,0===d&&(d=c=a.length)),b.xb=a.substring(0,d),b.Rb=a.substring(c,a.length),b},t.f.Ed=function(a){return a in t.f.Oc},t.f.dd=/^rtmp[set]?:\/\//i,t.f.Dd=function(a){return t.f.dd.test(a)},t.cd=t.a.extend({i:function(a,b,c){if(t.a.call(this,a,b,c),a.l.sources&&0!==a.l.sources.length)a.src(a.l.sources);else for(b=0,c=a.l.techOrder;b<c.length;b++){var d=t.ba(c[b]),e=window.videojs[d];if(e&&e.isSupported()){P(a,d);break}}}}),t.Player.prototype.textTracks=function(){return this.Fa=this.Fa||[]},t.C=t.a.extend({i:function(a,b){t.a.call(this,a,b),this.U=b.id||"vjs_"+b.kind+"_"+b.language+"_"+t.z++,this.Kc=b.src,this.rd=b["default"]||b.dflt,this.he=b.title,this.Ua=b.srclang,this.Fd=b.label,this.ca=[],this.ub=[],this.na=this.oa=0,this.c.d("fullscreenchange",t.bind(this,this.gd))}}),s=t.C.prototype,s.K=p("H"),s.src=p("Kc"),s.Bb=p("rd"),s.title=p("he"),s.language=p("Ua"),s.label=p("Fd"),s.nd=p("ca"),s.ed=p("ub"),s.readyState=p("oa"),s.mode=p("na"),s.gd=function(){this.b.style.fontSize=this.c.isFullScreen()?140*(screen.width/this.c.width())+"%":""},s.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-"+this.H+" vjs-text-track"})},s.show=function(){na(this),this.na=2,t.a.prototype.show.call(this)},s.W=function(){na(this),this.na=1,t.a.prototype.W.call(this)},s.disable=function(){2==this.na&&this.W(),this.c.p("timeupdate",t.bind(this,this.update,this.U)),this.c.p("ended",t.bind(this,this.reset,this.U)),this.reset(),this.c.la("textTrackDisplay").removeChild(this),this.na=0},s.load=function(){0===this.oa&&(this.oa=1,t.get(this.Kc,t.bind(this,this.Ud),t.bind(this,this.Kd)))},s.Kd=function(a){this.error=a,this.oa=3,this.m("error")},s.Ud=function(a){var b,c;a=a.split("\n");for(var d="",e=1,f=a.length;f>e;e++)if(d=t.trim(a[e])){for(-1==d.indexOf("-->")?(b=d,d=t.trim(a[++e])):b=this.ca.length,b={id:b,index:this.ca.length},c=d.split(/[\t ]+/),b.startTime=oa(c[0]),b.ya=oa(c[2]),c=[];a[++e]&&(d=t.trim(a[e]));)c.push(d);b.text=c.join("<br/>"),this.ca.push(b)}this.oa=2,this.m("loaded")},s.update=function(){if(0<this.ca.length){var a=this.c.options().trackTimeOffset||0,a=this.c.currentTime()+a;if(this.Pb===b||a<this.Pb||this.Xa<=a){var c,d,e,g,h=this.ca,i=this.c.duration(),j=0,k=l,m=[];for(a>=this.Xa||this.Xa===b?g=this.Eb!==b?this.Eb:0:(k=f,g=this.Kb!==b?this.Kb:h.length-1);;){if(e=h[g],e.ya<=a)j=Math.max(j,e.ya),e.Oa&&(e.Oa=l);else if(a<e.startTime){if(i=Math.min(i,e.startTime),e.Oa&&(e.Oa=l),!k)break}else k?(m.splice(0,0,e),d===b&&(d=g),c=g):(m.push(e),c===b&&(c=g),d=g),i=Math.min(i,e.ya),j=Math.max(j,e.startTime),e.Oa=f;if(k){if(0===g)break;g--}else{if(g===h.length-1)break;g++}}for(this.ub=m,this.Xa=i,this.Pb=j,this.Eb=c,this.Kb=d,c=this.ub,d="",a=0,h=c.length;h>a;a++)d+='<span class="vjs-tt-cue">'+c[a].text+"</span>";this.b.innerHTML=d,this.m("cuechange")}}},s.reset=function(){this.Xa=0,this.Pb=this.c.duration(),this.Kb=this.Eb=0},t.Wb=t.C.extend(),t.Wb.prototype.H="captions",t.dc=t.C.extend(),t.dc.prototype.H="subtitles",t.Xb=t.C.extend(),t.Xb.prototype.H="chapters",t.fc=t.a.extend({i:function(a,b,c){if(t.a.call(this,a,b,c),a.l.tracks&&0<a.l.tracks.length){b=this.c,a=a.l.tracks;for(var d=0;d<a.length;d++)c=a[d],ma(b,c.kind,c.label,c.language,c)}}}),t.fc.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-text-track-display"})},t.aa=t.I.extend({i:function(a,b){var c=this.fa=b.track;b.label=c.label(),b.selected=c.Bb(),t.I.call(this,a,b),this.c.d(c.K()+"trackchange",t.bind(this,this.update))}}),t.aa.prototype.r=function(){t.I.prototype.r.call(this),Y(this.c,this.fa.U,this.fa.K())},t.aa.prototype.update=function(){this.selected(2==this.fa.mode())},t.nb=t.aa.extend({i:function(a,b){b.track={K:function(){return b.kind},j:a,label:function(){return b.kind+" off"},Bb:r(l),mode:r(l)},t.aa.call(this,a,b),this.selected(f)}}),t.nb.prototype.r=function(){t.aa.prototype.r.call(this),Y(this.c,this.fa.U,this.fa.K())},t.nb.prototype.update=function(){for(var a,b=this.c.textTracks(),c=0,d=b.length,e=f;d>c;c++)a=b[c],a.K()==this.fa.K()&&2==a.mode()&&(e=l);this.selected(e)},t.V=t.L.extend({i:function(a,b){t.L.call(this,a,b),1>=this.O.length&&this.W()}}),t.V.prototype.wa=function(){var a,b=[];b.push(new t.nb(this.c,{kind:this.H}));for(var c=0;c<this.c.textTracks().length;c++)a=this.c.textTracks()[c],a.K()===this.H&&b.push(new t.aa(this.c,{track:a}));return b},t.Ha=t.V.extend({i:function(a,b,c){t.V.call(this,a,b,c),this.b.setAttribute("aria-label","Captions Menu")}}),t.Ha.prototype.H="captions",t.Ha.prototype.ua="Captions",t.Ha.prototype.className="vjs-captions-button",t.Na=t.V.extend({i:function(a,b,c){t.V.call(this,a,b,c),this.b.setAttribute("aria-label","Subtitles Menu")}}),t.Na.prototype.H="subtitles",t.Na.prototype.ua="Subtitles",t.Na.prototype.className="vjs-subtitles-button",t.Ia=t.V.extend({i:function(a,b,c){t.V.call(this,a,b,c),this.b.setAttribute("aria-label","Chapters Menu")}}),s=t.Ia.prototype,s.H="chapters",s.ua="Chapters",s.className="vjs-chapters-button",s.wa=function(){for(var a,b=[],c=0;c<this.c.textTracks().length;c++)a=this.c.textTracks()[c],a.K()===this.H&&b.push(new t.aa(this.c,{track:a}));return b},s.xa=function(){for(var a,c,d=this.c.textTracks(),e=0,f=d.length,g=this.O=[];f>e;e++)if(a=d[e],a.K()==this.H){if(0!==a.readyState()){c=a;break}a.load(),a.d("loaded",t.bind(this,this.xa))}if(d=this.Ba,d===b&&(d=new t.ia(this.c),d.ka().appendChild(t.e("li",{className:"vjs-menu-title",innerHTML:t.ba(this.H),fe:-1}))),c){a=c.ca;for(var h,e=0,f=a.length;f>e;e++)h=a[e],h=new t.hb(this.c,{track:c,cue:h}),g.push(h),d.R(h);this.R(d)}return 0<this.O.length&&this.show(),d},t.hb=t.I.extend({i:function(a,b){var c=this.fa=b.track,d=this.cue=b.cue,e=a.currentTime();b.label=d.text,b.selected=d.startTime<=e&&e<d.ya,t.I.call(this,a,b),c.d("cuechange",t.bind(this,this.update))}}),t.hb.prototype.r=function(){t.I.prototype.r.call(this),this.c.currentTime(this.cue.startTime),this.update(this.cue.startTime)},t.hb.prototype.update=function(){var a=this.cue,b=this.c.currentTime();this.selected(a.startTime<=b&&b<a.ya)},t.h.A(t.Ja.prototype.l.children,{subtitlesButton:{},captionsButton:{},chaptersButton:{}}),"undefined"!=typeof window.JSON&&"function"===window.JSON.parse)t.JSON=window.JSON;else{t.JSON={};var Z=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;t.JSON.parse=function(a,c){function d(a,e){var f,g,h=a[e];if(h&&"object"==typeof h)for(f in h)Object.prototype.hasOwnProperty.call(h,f)&&(g=d(h,f),g!==b?h[f]=g:delete h[f]);return c.call(a,e,h)}var e;if(a=String(a),Z.lastIndex=0,Z.test(a)&&(a=a.replace(Z,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"==typeof c?d({"":e},""):e;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")}}t.jc=function(){var a,c,d=document.getElementsByTagName("video");if(d&&0<d.length)for(var e=0,f=d.length;f>e;e++){if(!(c=d[e])||!c.getAttribute){t.vb();break}c.player===b&&(a=c.getAttribute("data-setup"),a!==k&&(a=t.JSON.parse(a||"{}"),videojs(c,a)))}else t.Tc||t.vb()},t.vb=function(){setTimeout(t.jc,1)},"complete"===document.readyState?t.Tc=f:t.X(window,"load",function(){t.Tc=f}),t.vb(),t.Wd=function(a,b){t.Player.prototype[a]=b};var pa=this;$("videojs",t),$("_V_",t),$("videojs.options",t.options),$("videojs.players",t.Ca),$("videojs.TOUCH_ENABLED",t.ec),$("videojs.cache",t.va),$("videojs.Component",t.a),t.a.prototype.player=t.a.prototype.j,t.a.prototype.options=t.a.prototype.options,t.a.prototype.init=t.a.prototype.i,t.a.prototype.dispose=t.a.prototype.dispose,t.a.prototype.createEl=t.a.prototype.e,t.a.prototype.contentEl=t.a.prototype.ka,t.a.prototype.el=t.a.prototype.w,t.a.prototype.addChild=t.a.prototype.R,t.a.prototype.getChild=t.a.prototype.la,t.a.prototype.getChildById=t.a.prototype.zd,t.a.prototype.children=t.a.prototype.children,t.a.prototype.initChildren=t.a.prototype.vc,t.a.prototype.removeChild=t.a.prototype.removeChild,t.a.prototype.on=t.a.prototype.d,t.a.prototype.off=t.a.prototype.p,t.a.prototype.one=t.a.prototype.X,t.a.prototype.trigger=t.a.prototype.m,t.a.prototype.triggerReady=t.a.prototype.Ga,t.a.prototype.show=t.a.prototype.show,t.a.prototype.hide=t.a.prototype.W,t.a.prototype.width=t.a.prototype.width,t.a.prototype.height=t.a.prototype.height,t.a.prototype.dimensions=t.a.prototype.sd,t.a.prototype.ready=t.a.prototype.J,t.a.prototype.addClass=t.a.prototype.n,t.a.prototype.removeClass=t.a.prototype.q,t.a.prototype.buildCSSClass=t.a.prototype.T,t.a.prototype.localize=t.a.prototype.s,t.Player.prototype.ended=t.Player.prototype.ended,t.Player.prototype.enterFullWindow=t.Player.prototype.pc,t.Player.prototype.exitFullWindow=t.Player.prototype.Db,t.Player.prototype.preload=t.Player.prototype.Da,t.Player.prototype.remainingTime=t.Player.prototype.remainingTime,t.Player.prototype.supportsFullScreen=t.Player.prototype.Ea,t.Player.prototype.currentType=t.Player.prototype.od,t.Player.prototype.language=t.Player.prototype.language,t.Player.prototype.languages=t.Player.prototype.Va,$("videojs.MediaLoader",t.cd),$("videojs.TextTrackDisplay",t.fc),$("videojs.ControlBar",t.Ja),$("videojs.Button",t.t),$("videojs.PlayToggle",t.ac),$("videojs.FullscreenToggle",t.Ka),$("videojs.BigPlayButton",t.gb),$("videojs.LoadingSpinner",t.Zb),$("videojs.CurrentTimeDisplay",t.ib),$("videojs.DurationDisplay",t.jb),$("videojs.TimeDivider",t.gc),$("videojs.RemainingTimeDisplay",t.qb),$("videojs.LiveDisplay",t.Yb),$("videojs.ErrorDisplay",t.kb),$("videojs.Slider",t.Q),$("videojs.ProgressControl",t.pb),$("videojs.SeekBar",t.cc),$("videojs.LoadProgressBar",t.mb),$("videojs.PlayProgressBar",t.$b),$("videojs.SeekHandle",t.Ma),$("videojs.VolumeControl",t.sb),$("videojs.VolumeBar",t.rb),$("videojs.VolumeLevel",t.hc),$("videojs.VolumeMenuButton",t.sa),$("videojs.VolumeHandle",t.tb),$("videojs.MuteToggle",t.ja),$("videojs.PosterImage",t.La),$("videojs.Menu",t.ia),$("videojs.MenuItem",t.I),$("videojs.MenuButton",t.L),$("videojs.PlaybackRateMenuButton",t.bc),t.L.prototype.createItems=t.L.prototype.wa,t.V.prototype.createItems=t.V.prototype.wa,t.Ia.prototype.createItems=t.Ia.prototype.wa,$("videojs.SubtitlesButton",t.Na),$("videojs.CaptionsButton",t.Ha),$("videojs.ChaptersButton",t.Ia),$("videojs.MediaTechController",t.u),t.u.prototype.features=t.u.prototype.o,t.u.prototype.o.volumeControl=t.u.prototype.o.Sc,t.u.prototype.o.fullscreenResize=t.u.prototype.o.oe,t.u.prototype.o.progressEvents=t.u.prototype.o.re,t.u.prototype.o.timeupdateEvents=t.u.prototype.o.ue,t.u.prototype.setPoster=t.u.prototype.Jc,$("videojs.Html5",t.g),t.g.Events=t.g.lb,t.g.isSupported=t.g.isSupported,t.g.canPlaySource=t.g.wb,t.g.patchCanPlayType=t.g.Bc,t.g.unpatchCanPlayType=t.g.je,t.g.prototype.setCurrentTime=t.g.prototype.Qb,t.g.prototype.setVolume=t.g.prototype.de,t.g.prototype.setMuted=t.g.prototype.ae,t.g.prototype.setPreload=t.g.prototype.ce,t.g.prototype.setAutoplay=t.g.prototype.Yd,t.g.prototype.setLoop=t.g.prototype.$d,t.g.prototype.enterFullScreen=t.g.prototype.oc,t.g.prototype.exitFullScreen=t.g.prototype.wd,t.g.prototype.playbackRate=t.g.prototype.playbackRate,t.g.prototype.setPlaybackRate=t.g.prototype.be,$("videojs.Flash",t.f),t.f.isSupported=t.f.isSupported,t.f.canPlaySource=t.f.wb,t.f.onReady=t.f.onReady,$("videojs.TextTrack",t.C),t.C.prototype.label=t.C.prototype.label,t.C.prototype.kind=t.C.prototype.K,t.C.prototype.mode=t.C.prototype.mode,t.C.prototype.cues=t.C.prototype.nd,t.C.prototype.activeCues=t.C.prototype.ed,$("videojs.CaptionsTrack",t.Wb),$("videojs.SubtitlesTrack",t.dc),$("videojs.ChaptersTrack",t.Xb),$("videojs.autoSetup",t.jc),$("videojs.plugin",t.Wd),$("videojs.createTimeRange",t.Ab),$("videojs.util",t.ha),t.ha.mergeOptions=t.ha.Wa,t.addLanguage=t.fd
}(),function(a){"undefined"==typeof a.fn.each2&&a.extend(a.fn,{each2:function(b){for(var c=a([0]),d=-1,e=this.length;++d<e&&(c.context=c[0]=this[d])&&b.call(c[0],d,c)!==!1;);return this}})}(jQuery),function(a,b){"use strict";function c(b){var c=a(document.createTextNode(""));b.before(c),c.before(b),c.remove()}function d(a){function b(a){return O[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function e(a,b){for(var c=0,d=b.length;d>c;c+=1)if(g(a,b[c]))return c;return-1}function f(){var b=a(N);b.appendTo("body");var c={width:b.width()-b[0].clientWidth,height:b.height()-b[0].clientHeight};return b.remove(),c}function g(a,c){return a===c?!0:a===b||c===b?!1:null===a||null===c?!1:a.constructor===String?a+""==c+"":c.constructor===String?c+""==a+"":!1}function h(b,c){var d,e,f;if(null===b||b.length<1)return[];for(d=b.split(c),e=0,f=d.length;f>e;e+=1)d[e]=a.trim(d[e]);return d}function i(a){return a.outerWidth(!1)-a.width()}function j(c){var d="keyup-change-value";c.on("keydown",function(){a.data(c,d)===b&&a.data(c,d,c.val())}),c.on("keyup",function(){var e=a.data(c,d);e!==b&&c.val()!==e&&(a.removeData(c,d),c.trigger("keyup-change"))})}function k(c){c.on("mousemove",function(c){var d=M;(d===b||d.x!==c.pageX||d.y!==c.pageY)&&a(c.target).trigger("mousemove-filtered",c)})}function l(a,c,d){d=d||b;var e;return function(){var b=arguments;window.clearTimeout(e),e=window.setTimeout(function(){c.apply(d,b)},a)}}function m(a,b){var c=l(a,function(a){b.trigger("scroll-debounced",a)});b.on("scroll",function(a){e(a.target,b.get())>=0&&c(a)})}function n(a){a[0]!==document.activeElement&&window.setTimeout(function(){var b,c=a[0],d=a.val().length;a.focus();var e=c.offsetWidth>0||c.offsetHeight>0;e&&c===document.activeElement&&(c.setSelectionRange?c.setSelectionRange(d,d):c.createTextRange&&(b=c.createTextRange(),b.collapse(!1),b.select()))},0)}function o(b){b=a(b)[0];var c=0,d=0;if("selectionStart"in b)c=b.selectionStart,d=b.selectionEnd-c;else if("selection"in document){b.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-b.value.length),c=e.text.length-d}return{offset:c,length:d}}function p(a){a.preventDefault(),a.stopPropagation()}function q(a){a.preventDefault(),a.stopImmediatePropagation()}function r(b){if(!J){var c=b[0].currentStyle||window.getComputedStyle(b[0],null);J=a(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),J.attr("class","select2-sizer"),a("body").append(J)}return J.text(b.val()),J.width()}function s(b,c,d){var e,f,g=[];e=a.trim(b.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0===this.indexOf("select2-")&&g.push(this)})),e=a.trim(c.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0!==this.indexOf("select2-")&&(f=d(this),f&&g.push(f))})),b.attr("class",g.join(" "))}function t(a,b,c,e){var f=d(a.toUpperCase()).indexOf(d(b.toUpperCase())),g=b.length;return 0>f?void c.push(e(a)):(c.push(e(a.substring(0,f))),c.push("<span class='select2-match'>"),c.push(e(a.substring(f,f+g))),c.push("</span>"),void c.push(e(a.substring(f+g,a.length))))}function u(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})}function v(c){var d,e=null,f=c.quietMillis||100,g=c.url,h=this;return function(i){window.clearTimeout(d),d=window.setTimeout(function(){var d=c.data,f=g,j=c.transport||a.fn.select2.ajaxDefaults.transport,k={type:c.type||"GET",cache:c.cache||!1,jsonpCallback:c.jsonpCallback||b,dataType:c.dataType||"json"},l=a.extend({},a.fn.select2.ajaxDefaults.params,k);d=d?d.call(h,i.term,i.page,i.context):null,f="function"==typeof f?f.call(h,i.term,i.page,i.context):f,e&&"function"==typeof e.abort&&e.abort(),c.params&&(a.isFunction(c.params)?a.extend(l,c.params.call(h)):a.extend(l,c.params)),a.extend(l,{url:f,dataType:c.dataType,data:d,success:function(a){var b=c.results(a,i.page,i);i.callback(b)},error:function(a,b,c){var d={hasError:!0,jqXHR:a,textStatus:b,errorThrown:c};i.callback(d)}}),e=j.call(h,l)},f)}}function w(b){var c,d,e=b,f=function(a){return""+a.text};a.isArray(e)&&(d=e,e={results:d}),a.isFunction(e)===!1&&(d=e,e=function(){return d});var g=e();return g.text&&(f=g.text,a.isFunction(f)||(c=g.text,f=function(a){return a[c]})),function(b){var c,d=b.term,g={results:[]};return""===d?void b.callback(e()):(c=function(e,g){var h,i;if(e=e[0],e.children){h={};for(i in e)e.hasOwnProperty(i)&&(h[i]=e[i]);h.children=[],a(e.children).each2(function(a,b){c(b,h.children)}),(h.children.length||b.matcher(d,f(h),e))&&g.push(h)}else b.matcher(d,f(e),e)&&g.push(e)},a(e().results).each2(function(a,b){c(b,g.results)}),void b.callback(g))}}function x(c){var d=a.isFunction(c);return function(e){var f=e.term,g={results:[]},h=d?c(e):c;a.isArray(h)&&(a(h).each(function(){var a=this.text!==b,c=a?this.text:this;(""===f||e.matcher(f,c))&&g.results.push(a?this:{id:this,text:this})}),e.callback(g))}}function y(b,c){if(a.isFunction(b))return!0;if(!b)return!1;if("string"==typeof b)return!0;throw new Error(c+" must be a string, function, or falsy value")}function z(b,c){if(a.isFunction(b)){var d=Array.prototype.slice.call(arguments,2);return b.apply(c,d)}return b}function A(b){var c=0;return a.each(b,function(a,b){b.children?c+=A(b.children):c++}),c}function B(a,c,d,e){var f,h,i,j,k,l=a,m=!1;if(!e.createSearchChoice||!e.tokenSeparators||e.tokenSeparators.length<1)return b;for(;;){for(h=-1,i=0,j=e.tokenSeparators.length;j>i&&(k=e.tokenSeparators[i],h=a.indexOf(k),!(h>=0));i++);if(0>h)break;if(f=a.substring(0,h),a=a.substring(h+k.length),f.length>0&&(f=e.createSearchChoice.call(this,f,c),f!==b&&null!==f&&e.id(f)!==b&&null!==e.id(f))){for(m=!1,i=0,j=c.length;j>i;i++)if(g(e.id(f),e.id(c[i]))){m=!0;break}m||d(f)}}return l!==a?a:void 0}function C(){var b=this;a.each(arguments,function(a,c){b[c].remove(),b[c]=null})}function D(b,c){var d=function(){};return d.prototype=new b,d.prototype.constructor=d,d.prototype.parent=b.prototype,d.prototype=a.extend(d.prototype,c),d}if(window.Select2===b){var E,F,G,H,I,J,K,L,M={x:0,y:0},E={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case E.LEFT:case E.RIGHT:case E.UP:case E.DOWN:return!0}return!1},isControl:function(a){var b=a.which;switch(b){case E.SHIFT:case E.CTRL:case E.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){return a=a.which?a.which:a,a>=112&&123>=a}},N="<div class='select2-measure-scrollbar'></div>",O={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};K=a(document),I=function(){var a=1;return function(){return a++}}(),F=D(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(c){var d,e,g=".select2-results";this.opts=c=this.prepareOpts(c),this.id=c.id,c.element.data("select2")!==b&&null!==c.element.data("select2")&&c.element.data("select2").destroy(),this.container=this.createContainer(),this.liveRegion=a("<span>",{role:"status","aria-live":"polite"}).addClass("select2-hidden-accessible").appendTo(document.body),this.containerId="s2id_"+(c.element.attr("id")||"autogen"+I()),this.containerEventName=this.containerId.replace(/([.])/g,"_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.container.attr("title",c.element.attr("title")),this.body=a("body"),s(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.attr("style",c.element.attr("style")),this.container.css(z(c.containerCss,this.opts.element)),this.container.addClass(z(c.containerCssClass,this.opts.element)),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.element.data("select2",this).attr("tabindex","-1").before(this.container).on("click.select2",p),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),s(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(z(c.dropdownCssClass,this.opts.element)),this.dropdown.data("select2",this),this.dropdown.on("click",p),this.results=d=this.container.find(g),this.search=e=this.container.find("input.select2-input"),this.queryCount=0,this.resultsPage=0,this.context=null,this.initContainer(),this.container.on("click",p),k(this.results),this.dropdown.on("mousemove-filtered",g,this.bind(this.highlightUnderEvent)),this.dropdown.on("touchstart touchmove touchend",g,this.bind(function(a){this._touchEvent=!0,this.highlightUnderEvent(a)})),this.dropdown.on("touchmove",g,this.bind(this.touchMoved)),this.dropdown.on("touchstart touchend",g,this.bind(this.clearTouchMoved)),this.dropdown.on("click",this.bind(function(){this._touchEvent&&(this._touchEvent=!1,this.selectHighlighted())})),m(80,this.results),this.dropdown.on("scroll-debounced",g,this.bind(this.loadMoreIfNeeded)),a(this.container).on("change",".select2-input",function(a){a.stopPropagation()}),a(this.dropdown).on("change",".select2-input",function(a){a.stopPropagation()}),a.fn.mousewheel&&d.mousewheel(function(a,b,c,e){var f=d.scrollTop();e>0&&0>=f-e?(d.scrollTop(0),p(a)):0>e&&d.get(0).scrollHeight-d.scrollTop()+e<=d.height()&&(d.scrollTop(d.get(0).scrollHeight-d.height()),p(a))}),j(e),e.on("keyup-change input paste",this.bind(this.updateResults)),e.on("focus",function(){e.addClass("select2-focused")}),e.on("blur",function(){e.removeClass("select2-focused")}),this.dropdown.on("mouseup",g,this.bind(function(b){a(b.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(b),this.selectHighlighted(b))})),this.dropdown.on("click mouseup mousedown touchstart touchend focusin",function(a){a.stopPropagation()}),this.nextSearchTerm=b,a.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),null!==c.maximumInputLength&&this.search.attr("maxlength",c.maximumInputLength);var h=c.element.prop("disabled");h===b&&(h=!1),this.enable(!h);var i=c.element.prop("readonly");i===b&&(i=!1),this.readonly(i),L=L||f(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this.focus(),this.search.attr("placeholder",c.searchInputPlaceholder)},destroy:function(){var a=this.opts.element,c=a.data("select2"),d=this;this.close(),a.length&&a[0].detachEvent&&a.each(function(){this.detachEvent("onpropertychange",d._sync)}),this.propertyObserver&&(this.propertyObserver.disconnect(),this.propertyObserver=null),this._sync=null,c!==b&&(c.container.remove(),c.liveRegion.remove(),c.dropdown.remove(),a.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus",this.autofocus||!1),this.elementTabIndex?a.attr({tabindex:this.elementTabIndex}):a.removeAttr("tabindex"),a.show()),C.call(this,"container","liveRegion","dropdown","results","search")},optionToData:function(a){return a.is("option")?{id:a.prop("value"),text:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:g(a.attr("locked"),"locked")||g(a.data("locked"),!0)}:a.is("optgroup")?{text:a.attr("label"),children:[],element:a.get(),css:a.attr("class")}:void 0},prepareOpts:function(c){var d,e,f,i,j=this;if(d=c.element,"select"===d.get(0).tagName.toLowerCase()&&(this.select=e=c.element),e&&a.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in c)throw new Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")}),c=a.extend({},{populateResults:function(d,e,f){var g,h=this.opts.id,i=this.liveRegion;(g=function(d,e,k){var l,m,n,o,p,q,r,s,t,u;d=c.sortResults(d,e,f);var v=[];for(l=0,m=d.length;m>l;l+=1)n=d[l],p=n.disabled===!0,o=!p&&h(n)!==b,q=n.children&&n.children.length>0,r=a("<li></li>"),r.addClass("select2-results-dept-"+k),r.addClass("select2-result"),r.addClass(o?"select2-result-selectable":"select2-result-unselectable"),p&&r.addClass("select2-disabled"),q&&r.addClass("select2-result-with-children"),r.addClass(j.opts.formatResultCssClass(n)),r.attr("role","presentation"),s=a(document.createElement("div")),s.addClass("select2-result-label"),s.attr("id","select2-result-label-"+I()),s.attr("role","option"),u=c.formatResult(n,s,f,j.opts.escapeMarkup),u!==b&&(s.html(u),r.append(s)),q&&(t=a("<ul></ul>"),t.addClass("select2-result-sub"),g(n.children,t,k+1),r.append(t)),r.data("select2-data",n),v.push(r[0]);e.append(v),i.text(c.formatMatches(d.length))})(e,d,0)}},a.fn.select2.defaults,c),"function"!=typeof c.id&&(f=c.id,c.id=function(a){return a[f]}),a.isArray(c.element.data("select2Tags"))){if("tags"in c)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+c.element.attr("id");c.tags=c.element.data("select2Tags")}if(e?(c.query=this.bind(function(a){var c,e,f,g={results:[],more:!1},h=a.term;f=function(b,c){var d;b.is("option")?a.matcher(h,b.text(),b)&&c.push(j.optionToData(b)):b.is("optgroup")&&(d=j.optionToData(b),b.children().each2(function(a,b){f(b,d.children)}),d.children.length>0&&c.push(d))},c=d.children(),this.getPlaceholder()!==b&&c.length>0&&(e=this.getPlaceholderOption(),e&&(c=c.not(e))),c.each2(function(a,b){f(b,g.results)}),a.callback(g)}),c.id=function(a){return a.id}):"query"in c||("ajax"in c?(i=c.element.data("ajax-url"),i&&i.length>0&&(c.ajax.url=i),c.query=v.call(c.element,c.ajax)):"data"in c?c.query=w(c.data):"tags"in c&&(c.query=x(c.tags),c.createSearchChoice===b&&(c.createSearchChoice=function(b){return{id:a.trim(b),text:a.trim(b)}}),c.initSelection===b&&(c.initSelection=function(b,d){var e=[];a(h(b.val(),c.separator)).each(function(){var b={id:this,text:this},d=c.tags;a.isFunction(d)&&(d=d()),a(d).each(function(){return g(this.id,b.id)?(b=this,!1):void 0}),e.push(b)}),d(e)}))),"function"!=typeof c.query)throw"query function not defined for Select2 "+c.element.attr("id");if("top"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.unshift(b)};else if("bottom"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.push(b)};else if("function"!=typeof c.createSearchChoicePosition)throw"invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";return c},monitorSource:function(){var c,d=this.opts.element,e=this;d.on("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()})),this._sync=this.bind(function(){var a=d.prop("disabled");a===b&&(a=!1),this.enable(!a);var c=d.prop("readonly");c===b&&(c=!1),this.readonly(c),s(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(z(this.opts.containerCssClass,this.opts.element)),s(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(z(this.opts.dropdownCssClass,this.opts.element))}),d.length&&d[0].attachEvent&&d.each(function(){this.attachEvent("onpropertychange",e._sync)}),c=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,c!==b&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new c(function(b){a.each(b,e._sync)}),this.propertyObserver.observe(d.get(0),{attributes:!0,subtree:!1}))},triggerSelect:function(b){var c=a.Event("select2-selecting",{val:this.id(b),object:b,choice:b});return this.opts.element.trigger(c),!c.isDefaultPrevented()},triggerChange:function(b){b=b||{},b=a.extend({},b,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(b),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()},isInterfaceEnabled:function(){return this.enabledInterface===!0},enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a===this.enabledInterface?!1:(this.container.toggleClass("select2-container-disabled",b),this.close(),this.enabledInterface=a,!0)},enable:function(a){a===b&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.enableInterface())},disable:function(){this.enable(!1)},readonly:function(a){a===b&&(a=!1),this._readonly!==a&&(this._readonly=a,this.opts.element.prop("readonly",a),this.enableInterface())},opened:function(){return this.container?this.container.hasClass("select2-dropdown-open"):!1},positionDropdown:function(){var b,c,d,e,f,g=this.dropdown,h=this.container.offset(),i=this.container.outerHeight(!1),j=this.container.outerWidth(!1),k=g.outerHeight(!1),l=a(window),m=l.width(),n=l.height(),o=l.scrollLeft()+m,p=l.scrollTop()+n,q=h.top+i,r=h.left,s=p>=q+k,t=h.top-k>=l.scrollTop(),u=g.outerWidth(!1),v=o>=r+u,w=g.hasClass("select2-drop-above");w?(c=!0,!t&&s&&(d=!0,c=!1)):(c=!1,!s&&t&&(d=!0,c=!0)),d&&(g.hide(),h=this.container.offset(),i=this.container.outerHeight(!1),j=this.container.outerWidth(!1),k=g.outerHeight(!1),o=l.scrollLeft()+m,p=l.scrollTop()+n,q=h.top+i,r=h.left,u=g.outerWidth(!1),v=o>=r+u,g.show(),this.focusSearch()),this.opts.dropdownAutoWidth?(f=a(".select2-results",g)[0],g.addClass("select2-drop-auto-width"),g.css("width",""),u=g.outerWidth(!1)+(f.scrollHeight===f.clientHeight?0:L.width),u>j?j=u:u=j,k=g.outerHeight(!1),v=o>=r+u):this.container.removeClass("select2-drop-auto-width"),"static"!==this.body.css("position")&&(b=this.body.offset(),q-=b.top,r-=b.left),v||(r=h.left+this.container.outerWidth(!1)-u),e={left:r,width:j},c?(e.top=h.top-k,e.bottom="auto",this.container.addClass("select2-drop-above"),g.addClass("select2-drop-above")):(e.top=q,e.bottom="auto",this.container.removeClass("select2-drop-above"),g.removeClass("select2-drop-above")),e=a.extend(e,z(this.opts.dropdownCss,this.opts.element)),g.css(e)},shouldOpen:function(){var b;return this.opened()?!1:this._enabled===!1||this._readonly===!0?!1:(b=a.Event("select2-opening"),this.opts.element.trigger(b),!b.isDefaultPrevented())},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")},open:function(){return this.shouldOpen()?(this.opening(),K.on("mousemove.select2Event",function(a){M.x=a.pageX,M.y=a.pageY}),!0):!1},opening:function(){var b,d=this.containerEventName,e="scroll."+d,f="resize."+d,g="orientationchange."+d;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body.children().last()[0]&&this.dropdown.detach().appendTo(this.body),b=a("#select2-drop-mask"),0==b.length&&(b=a(document.createElement("div")),b.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),b.hide(),b.appendTo(this.body),b.on("mousedown touchstart click",function(d){c(b);var e,f=a("#select2-drop");f.length>0&&(e=f.data("select2"),e.opts.selectOnBlur&&e.selectHighlighted({noFocus:!0}),e.close(),d.preventDefault(),d.stopPropagation())})),this.dropdown.prev()[0]!==b[0]&&this.dropdown.before(b),a("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),b.show(),this.positionDropdown(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active");var h=this;this.container.parents().add(window).each(function(){a(this).on(f+" "+e+" "+g,function(){h.opened()&&h.positionDropdown()})})},close:function(){if(this.opened()){var b=this.containerEventName,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.parents().add(window).each(function(){a(this).off(c).off(d).off(e)}),this.clearDropdownAlignmentPreference(),a("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),this.results.empty(),K.off("mousemove.select2Event"),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(a.Event("select2-close"))}},externalSearch:function(a){this.open(),this.search.val(a),this.updateResults(!1)},clearSearch:function(){},getMaximumSelectionSize:function(){return z(this.opts.maximumSelectionSize,this.opts.element)},ensureHighlightVisible:function(){var b,c,d,e,f,g,h,i,j=this.results;if(c=this.highlight(),!(0>c)){if(0==c)return void j.scrollTop(0);b=this.findHighlightableChoices().find(".select2-result-label"),d=a(b[c]),i=(d.offset()||{}).top||0,e=i+d.outerHeight(!0),c===b.length-1&&(h=j.find("li.select2-more-results"),h.length>0&&(e=h.offset().top+h.outerHeight(!0))),f=j.offset().top+j.outerHeight(!0),e>f&&j.scrollTop(j.scrollTop()+(e-f)),g=i-j.offset().top,0>g&&"none"!=d.css("display")&&j.scrollTop(j.scrollTop()+g)}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")},moveHighlight:function(b){for(var c=this.findHighlightableChoices(),d=this.highlight();d>-1&&d<c.length;){d+=b;var e=a(c[d]);if(e.hasClass("select2-result-selectable")&&!e.hasClass("select2-disabled")&&!e.hasClass("select2-selected")){this.highlight(d);break}}},highlight:function(b){var c,d,f=this.findHighlightableChoices();return 0===arguments.length?e(f.filter(".select2-highlighted")[0],f.get()):(b>=f.length&&(b=f.length-1),0>b&&(b=0),this.removeHighlight(),c=a(f[b]),c.addClass("select2-highlighted"),this.search.attr("aria-activedescendant",c.find(".select2-result-label").attr("id")),this.ensureHighlightVisible(),this.liveRegion.text(c.text()),d=c.data("select2-data"),void(d&&this.opts.element.trigger({type:"select2-highlight",val:this.id(d),choice:d})))},removeHighlight:function(){this.results.find(".select2-highlighted").removeClass("select2-highlighted")},touchMoved:function(){this._touchMoved=!0},clearTouchMoved:function(){this._touchMoved=!1},countSelectableResults:function(){return this.findHighlightableChoices().length},highlightUnderEvent:function(b){var c=a(b.target).closest(".select2-result-selectable");if(c.length>0&&!c.is(".select2-highlighted")){var d=this.findHighlightableChoices();this.highlight(d.index(c))}else 0==c.length&&this.removeHighlight()},loadMoreIfNeeded:function(){var a,b=this.results,c=b.find("li.select2-more-results"),d=this.resultsPage+1,e=this,f=this.search.val(),g=this.context;0!==c.length&&(a=c.offset().top-b.offset().top-b.height(),a<=this.opts.loadMorePadding&&(c.addClass("select2-active"),this.opts.query({element:this.opts.element,term:f,page:d,context:g,matcher:this.opts.matcher,callback:this.bind(function(a){e.opened()&&(e.opts.populateResults.call(this,b,a.results,{term:f,page:d,context:g}),e.postprocessResults(a,!1,!1),a.more===!0?(c.detach().appendTo(b).text(z(e.opts.formatLoadMore,e.opts.element,d+1)),window.setTimeout(function(){e.loadMoreIfNeeded()},10)):c.remove(),e.positionDropdown(),e.resultsPage=d,e.context=a.context,this.opts.element.trigger({type:"select2-loaded",items:a}))})})))},tokenize:function(){},updateResults:function(c){function d(){j.removeClass("select2-active"),m.positionDropdown(),m.liveRegion.text(k.find(".select2-no-results,.select2-selection-limit,.select2-searching").length?k.text():m.opts.formatMatches(k.find(".select2-result-selectable").length))}function e(a){k.html(a),d()}var f,h,i,j=this.search,k=this.results,l=this.opts,m=this,n=j.val(),o=a.data(this.container,"select2-last-term");if((c===!0||!o||!g(n,o))&&(a.data(this.container,"select2-last-term",n),c===!0||this.showSearchInput!==!1&&this.opened())){i=++this.queryCount;var p=this.getMaximumSelectionSize();if(p>=1&&(f=this.data(),a.isArray(f)&&f.length>=p&&y(l.formatSelectionTooBig,"formatSelectionTooBig")))return void e("<li class='select2-selection-limit'>"+z(l.formatSelectionTooBig,l.element,p)+"</li>");if(j.val().length<l.minimumInputLength)return e(y(l.formatInputTooShort,"formatInputTooShort")?"<li class='select2-no-results'>"+z(l.formatInputTooShort,l.element,j.val(),l.minimumInputLength)+"</li>":""),void(c&&this.showSearch&&this.showSearch(!0));if(l.maximumInputLength&&j.val().length>l.maximumInputLength)return void e(y(l.formatInputTooLong,"formatInputTooLong")?"<li class='select2-no-results'>"+z(l.formatInputTooLong,l.element,j.val(),l.maximumInputLength)+"</li>":"");l.formatSearching&&0===this.findHighlightableChoices().length&&e("<li class='select2-searching'>"+z(l.formatSearching,l.element)+"</li>"),j.addClass("select2-active"),this.removeHighlight(),h=this.tokenize(),h!=b&&null!=h&&j.val(h),this.resultsPage=1,l.query({element:l.element,term:j.val(),page:this.resultsPage,context:null,matcher:l.matcher,callback:this.bind(function(f){var h;if(i==this.queryCount){if(!this.opened())return void this.search.removeClass("select2-active");if(f.hasError!==b&&y(l.formatAjaxError,"formatAjaxError"))return void e("<li class='select2-ajax-error'>"+z(l.formatAjaxError,l.element,f.jqXHR,f.textStatus,f.errorThrown)+"</li>");if(this.context=f.context===b?null:f.context,this.opts.createSearchChoice&&""!==j.val()&&(h=this.opts.createSearchChoice.call(m,j.val(),f.results),h!==b&&null!==h&&m.id(h)!==b&&null!==m.id(h)&&0===a(f.results).filter(function(){return g(m.id(this),m.id(h))}).length&&this.opts.createSearchChoicePosition(f.results,h)),0===f.results.length&&y(l.formatNoMatches,"formatNoMatches"))return void e("<li class='select2-no-results'>"+z(l.formatNoMatches,l.element,j.val())+"</li>");
k.empty(),m.opts.populateResults.call(this,k,f.results,{term:j.val(),page:this.resultsPage,context:null}),f.more===!0&&y(l.formatLoadMore,"formatLoadMore")&&(k.append("<li class='select2-more-results'>"+l.escapeMarkup(z(l.formatLoadMore,l.element,this.resultsPage))+"</li>"),window.setTimeout(function(){m.loadMoreIfNeeded()},10)),this.postprocessResults(f,c),d(),this.opts.element.trigger({type:"select2-loaded",items:f})}})})}},cancel:function(){this.close()},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){n(this.search)},selectHighlighted:function(a){if(this._touchMoved)return void this.clearTouchMoved();var b=this.highlight(),c=this.results.find(".select2-highlighted"),d=c.closest(".select2-result").data("select2-data");d?(this.highlight(b),this.onSelect(d,a)):a&&a.noFocus&&this.close()},getPlaceholder:function(){var a;return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder||((a=this.getPlaceholderOption())!==b?a.text():b)},getPlaceholderOption:function(){if(this.select){var c=this.select.children("option").first();if(this.opts.placeholderOption!==b)return"first"===this.opts.placeholderOption&&c||"function"==typeof this.opts.placeholderOption&&this.opts.placeholderOption(this.select);if(""===a.trim(c.text())&&""===c.val())return c}},initContainerWidth:function(){function c(){var c,d,e,f,g,h;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){if(c=this.opts.element.attr("style"),c!==b)for(d=c.split(";"),f=0,g=d.length;g>f;f+=1)if(h=d[f].replace(/\s/g,""),e=h.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i),null!==e&&e.length>=1)return e[1];return"resolve"===this.opts.width?(c=this.opts.element.css("width"),c.indexOf("%")>0?c:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null}return a.isFunction(this.opts.width)?this.opts.width():this.opts.width}var d=c.call(this);null!==d&&this.container.css("width",d)}}),G=D(F,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>","   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>","   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>","</a>","<label for='' class='select2-offscreen'></label>","<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />","<div class='select2-drop select2-display-none'>","   <div class='select2-search'>","       <label for='' class='select2-offscreen'></label>","       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'","       aria-autocomplete='list' />","   </div>","   <ul class='select2-results' role='listbox'>","   </ul>","</div>"].join(""));return b},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.focusser.prop("disabled",!this.isInterfaceEnabled())},opening:function(){var c,d,e;this.opts.minimumResultsForSearch>=0&&this.showSearch(!0),this.parent.opening.apply(this,arguments),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.opts.shouldFocusInput(this)&&(this.search.focus(),c=this.search.get(0),c.createTextRange?(d=c.createTextRange(),d.collapse(!1),d.select()):c.setSelectionRange&&(e=this.search.val().length,c.setSelectionRange(e,e))),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.focusser.prop("disabled",!0).val(""),this.updateResults(!0),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&(this.parent.close.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},focus:function(){this.opened()?this.close():(this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},isFocused:function(){return this.container.hasClass("select2-container-active")},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus()},destroy:function(){a("label[for='"+this.focusser.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),C.call(this,"selection","focusser")},initContainer:function(){var b,d,e=this.container,f=this.dropdown,g=I();this.showSearch(this.opts.minimumResultsForSearch<0?!1:!0),this.selection=b=e.find(".select2-choice"),this.focusser=e.find(".select2-focusser"),b.find(".select2-chosen").attr("id","select2-chosen-"+g),this.focusser.attr("aria-labelledby","select2-chosen-"+g),this.results.attr("id","select2-results-"+g),this.search.attr("aria-owns","select2-results-"+g),this.focusser.attr("id","s2id_autogen"+g),d=a("label[for='"+this.opts.element.attr("id")+"']"),this.focusser.prev().text(d.text()).attr("for",this.focusser.attr("id"));var h=this.opts.element.attr("title");this.opts.element.attr("title",h||d.text()),this.focusser.attr("tabindex",this.elementTabIndex),this.search.attr("id",this.focusser.attr("id")+"_search"),this.search.prev().text(a("label[for='"+this.focusser.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&229!=a.keyCode){if(a.which===E.PAGE_UP||a.which===E.PAGE_DOWN)return void p(a);switch(a.which){case E.UP:case E.DOWN:return this.moveHighlight(a.which===E.UP?-1:1),void p(a);case E.ENTER:return this.selectHighlighted(),void p(a);case E.TAB:return void this.selectHighlighted({noFocus:!0});case E.ESC:return this.cancel(a),void p(a)}}})),this.search.on("blur",this.bind(function(){document.activeElement===this.body.get(0)&&window.setTimeout(this.bind(function(){this.opened()&&this.search.focus()}),0)})),this.focusser.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&a.which!==E.TAB&&!E.isControl(a)&&!E.isFunctionKey(a)&&a.which!==E.ESC){if(this.opts.openOnEnter===!1&&a.which===E.ENTER)return void p(a);if(a.which==E.DOWN||a.which==E.UP||a.which==E.ENTER&&this.opts.openOnEnter){if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return;return this.open(),void p(a)}return a.which==E.DELETE||a.which==E.BACKSPACE?(this.opts.allowClear&&this.clear(),void p(a)):void 0}})),j(this.focusser),this.focusser.on("keyup-change input",this.bind(function(a){if(this.opts.minimumResultsForSearch>=0){if(a.stopPropagation(),this.opened())return;this.open()}})),b.on("mousedown touchstart","abbr",this.bind(function(a){this.isInterfaceEnabled()&&(this.clear(),q(a),this.close(),this.selection.focus())})),b.on("mousedown touchstart",this.bind(function(d){c(b),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.opened()?this.close():this.isInterfaceEnabled()&&this.open(),p(d)})),f.on("mousedown touchstart",this.bind(function(){this.opts.shouldFocusInput(this)&&this.search.focus()})),b.on("focus",this.bind(function(a){p(a)})),this.focusser.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})).on("blur",this.bind(function(){this.opened()||(this.container.removeClass("select2-container-active"),this.opts.element.trigger(a.Event("select2-blur")))})),this.search.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.setPlaceholder()},clear:function(b){var c=this.selection.data("select2-data");if(c){var d=a.Event("select2-clearing");if(this.opts.element.trigger(d),d.isDefaultPrevented())return;var e=this.getPlaceholderOption();this.opts.element.val(e?e.val():""),this.selection.find(".select2-chosen").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),b!==!1&&(this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}))}},initSelection:function(){if(this.isPlaceholderOptionSelected())this.updateSelection(null),this.close(),this.setPlaceholder();else{var a=this;this.opts.initSelection.call(null,this.opts.element,function(c){c!==b&&null!==c&&(a.updateSelection(c),a.close(),a.setPlaceholder(),a.nextSearchTerm=a.opts.nextSearchTerm(c,a.search.val()))})}},isPlaceholderOptionSelected:function(){var a;return this.getPlaceholder()===b?!1:(a=this.getPlaceholderOption())!==b&&a.prop("selected")||""===this.opts.element.val()||this.opts.element.val()===b||null===this.opts.element.val()},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=a.find("option").filter(function(){return this.selected&&!this.disabled});b(c.optionToData(d))}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=c.val(),f=null;b.query({matcher:function(a,c,d){var h=g(e,b.id(d));return h&&(f=d),h},callback:a.isFunction(d)?function(){d(f)}:a.noop})}),b},getPlaceholder:function(){return this.select&&this.getPlaceholderOption()===b?b:this.parent.getPlaceholder.apply(this,arguments)},setPlaceholder:function(){var a=this.getPlaceholder();if(this.isPlaceholderOptionSelected()&&a!==b){if(this.select&&this.getPlaceholderOption()===b)return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.container.removeClass("select2-allowclear")}},postprocessResults:function(a,b,c){var d=0,e=this;if(this.findHighlightableChoices().each2(function(a,b){return g(e.id(b.data("select2-data")),e.opts.element.val())?(d=a,!1):void 0}),c!==!1&&this.highlight(b===!0&&d>=0?d:0),b===!0){var f=this.opts.minimumResultsForSearch;f>=0&&this.showSearch(A(a.results)>=f)}},showSearch:function(b){this.showSearchInput!==b&&(this.showSearchInput=b,this.dropdown.find(".select2-search").toggleClass("select2-search-hidden",!b),this.dropdown.find(".select2-search").toggleClass("select2-offscreen",!b),a(this.dropdown,this.container).toggleClass("select2-with-searchbox",b))},onSelect:function(a,b){if(this.triggerSelect(a)){var c=this.opts.element.val(),d=this.data();this.opts.element.val(this.id(a)),this.updateSelection(a),this.opts.element.trigger({type:"select2-selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.close(),b&&b.noFocus||!this.opts.shouldFocusInput(this)||this.focusser.focus(),g(c,this.id(a))||this.triggerChange({added:a,removed:d})}},updateSelection:function(a){var c,d,e=this.selection.find(".select2-chosen");this.selection.data("select2-data",a),e.empty(),null!==a&&(c=this.opts.formatSelection(a,e,this.opts.escapeMarkup)),c!==b&&e.append(c),d=this.opts.formatSelectionCssClass(a,e),d!==b&&e.addClass(d),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==b&&this.container.addClass("select2-allowclear")},val:function(){var a,c=!1,d=null,e=this,f=this.data();if(0===arguments.length)return this.opts.element.val();if(a=arguments[0],arguments.length>1&&(c=arguments[1]),this.select)this.select.val(a).find("option").filter(function(){return this.selected}).each2(function(a,b){return d=e.optionToData(b),!1}),this.updateSelection(d),this.setPlaceholder(),c&&this.triggerChange({added:d,removed:f});else{if(!a&&0!==a)return void this.clear(c);if(this.opts.initSelection===b)throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){e.opts.element.val(a?e.id(a):""),e.updateSelection(a),e.setPlaceholder(),c&&e.triggerChange({added:a,removed:f})})}},clearSearch:function(){this.search.val(""),this.focusser.val("")},data:function(a){var c,d=!1;return 0===arguments.length?(c=this.selection.data("select2-data"),c==b&&(c=null),c):(arguments.length>1&&(d=arguments[1]),void(a?(c=this.data(),this.opts.element.val(a?this.id(a):""),this.updateSelection(a),d&&this.triggerChange({added:a,removed:c})):this.clear(d)))}}),H=D(F,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["<ul class='select2-choices'>","  <li class='select2-search-field'>","    <label for='' class='select2-offscreen'></label>","    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi select2-display-none'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=[];a.find("option").filter(function(){return this.selected&&!this.disabled}).each2(function(a,b){d.push(c.optionToData(b))}),b(d)}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=h(c.val(),b.separator),f=[];b.query({matcher:function(c,d,h){var i=a.grep(e,function(a){return g(a,b.id(h))}).length;return i&&f.push(h),i},callback:a.isFunction(d)?function(){for(var a=[],c=0;c<e.length;c++)for(var h=e[c],i=0;i<f.length;i++){var j=f[i];if(g(h,b.id(j))){a.push(j),f.splice(i,1);break}}d(a)}:a.noop})}),b},selectChoice:function(a){var b=this.container.find(".select2-search-choice-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("select2-search-choice-focus"),a&&a.length&&(this.close(),a.addClass("select2-search-choice-focus"),this.opts.element.trigger("choice-selected",a)))},destroy:function(){a("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),C.call(this,"searchContainer","selection")},initContainer:function(){var b,c=".select2-choices";this.searchContainer=this.container.find(".select2-search-field"),this.selection=b=this.container.find(c);var d=this;this.selection.on("click",".select2-search-choice:not(.select2-locked)",function(){d.search[0].focus(),d.selectChoice(a(this))}),this.search.attr("id","s2id_autogen"+I()),this.search.prev().text(a("label[for='"+this.opts.element.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.search.on("input paste",this.bind(function(){this.search.attr("placeholder")&&0==this.search.val().length||this.isInterfaceEnabled()&&(this.opened()||this.open())})),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){++this.keydowns;var c=b.find(".select2-search-choice-focus"),d=c.prev(".select2-search-choice:not(.select2-locked)"),e=c.next(".select2-search-choice:not(.select2-locked)"),f=o(this.search);if(c.length&&(a.which==E.LEFT||a.which==E.RIGHT||a.which==E.BACKSPACE||a.which==E.DELETE||a.which==E.ENTER)){var g=c;return a.which==E.LEFT&&d.length?g=d:a.which==E.RIGHT?g=e.length?e:null:a.which===E.BACKSPACE?this.unselect(c.first())&&(this.search.width(10),g=d.length?d:e):a.which==E.DELETE?this.unselect(c.first())&&(this.search.width(10),g=e.length?e:null):a.which==E.ENTER&&(g=null),this.selectChoice(g),p(a),void(g&&g.length||this.open())}if((a.which===E.BACKSPACE&&1==this.keydowns||a.which==E.LEFT)&&0==f.offset&&!f.length)return this.selectChoice(b.find(".select2-search-choice:not(.select2-locked)").last()),void p(a);if(this.selectChoice(null),this.opened())switch(a.which){case E.UP:case E.DOWN:return this.moveHighlight(a.which===E.UP?-1:1),void p(a);case E.ENTER:return this.selectHighlighted(),void p(a);case E.TAB:return this.selectHighlighted({noFocus:!0}),void this.close();case E.ESC:return this.cancel(a),void p(a)}if(a.which!==E.TAB&&!E.isControl(a)&&!E.isFunctionKey(a)&&a.which!==E.BACKSPACE&&a.which!==E.ESC){if(a.which===E.ENTER){if(this.opts.openOnEnter===!1)return;if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return}this.open(),(a.which===E.PAGE_UP||a.which===E.PAGE_DOWN)&&p(a),a.which===E.ENTER&&p(a)}}})),this.search.on("keyup",this.bind(function(){this.keydowns=0,this.resizeSearch()})),this.search.on("blur",this.bind(function(b){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.selectChoice(null),this.opened()||this.clearSearch(),b.stopImmediatePropagation(),this.opts.element.trigger(a.Event("select2-blur"))})),this.container.on("click",c,this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").length>0||(this.selectChoice(null),this.clearPlaceholder(),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.open(),this.focusSearch(),b.preventDefault()))})),this.container.on("focus",c,this.bind(function(){this.isInterfaceEnabled()&&(this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.clearSearch()},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this.isInterfaceEnabled())},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var a=this;this.opts.initSelection.call(null,this.opts.element,function(c){c!==b&&null!==c&&(a.updateSelection(c),a.close(),a.clearSearch())})}},clearSearch:function(){var a=this.getPlaceholder(),c=this.getMaxSearchWidth();a!==b&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(a).addClass("select2-default"),this.search.width(c>0?c:this.container.css("width"))):this.search.val("").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.updateResults(!0),this.opts.shouldFocusInput(this)&&this.search.focus(),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&this.parent.close.apply(this,arguments)},focus:function(){this.close(),this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(b){var c=[],d=[],f=this;a(b).each(function(){e(f.id(this),c)<0&&(c.push(f.id(this)),d.push(this))}),b=d,this.selection.find(".select2-search-choice").remove(),a(b).each(function(){f.addSelectedChoice(this)}),f.postprocessResults()},tokenize:function(){var a=this.search.val();a=this.opts.tokenizer.call(this,a,this.data(),this.bind(this.onSelect),this.opts),null!=a&&a!=b&&(this.search.val(a),a.length>0&&this.open())},onSelect:function(a,c){this.triggerSelect(a)&&""!==a.text&&(this.addSelectedChoice(a),this.opts.element.trigger({type:"selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.clearSearch(),this.updateResults(),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(a,!1,this.opts.closeOnSelect===!0),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()?this.updateResults(!0):this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.updateResults(),this.search.select()),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:a}),c&&c.noFocus||this.focusSearch())},cancel:function(){this.close(),this.focusSearch()},addSelectedChoice:function(c){var d,e,f=!c.locked,g=a("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),h=a("<li class='select2-search-choice select2-locked'><div></div></li>"),i=f?g:h,j=this.id(c),k=this.getVal();d=this.opts.formatSelection(c,i.find("div"),this.opts.escapeMarkup),d!=b&&i.find("div").replaceWith("<div>"+d+"</div>"),e=this.opts.formatSelectionCssClass(c,i.find("div")),e!=b&&i.addClass(e),f&&i.find(".select2-search-choice-close").on("mousedown",p).on("click dblclick",this.bind(function(b){this.isInterfaceEnabled()&&(this.unselect(a(b.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),p(b),this.close(),this.focusSearch())})).on("focus",this.bind(function(){this.isInterfaceEnabled()&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))})),i.data("select2-data",c),i.insertBefore(this.searchContainer),k.push(j),this.setVal(k)},unselect:function(b){var c,d,f=this.getVal();if(b=b.closest(".select2-search-choice"),0===b.length)throw"Invalid argument: "+b+". Must be .select2-search-choice";if(c=b.data("select2-data")){var g=a.Event("select2-removing");if(g.val=this.id(c),g.choice=c,this.opts.element.trigger(g),g.isDefaultPrevented())return!1;for(;(d=e(this.id(c),f))>=0;)f.splice(d,1),this.setVal(f),this.select&&this.postprocessResults();return b.remove(),this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}),!0}},postprocessResults:function(a,b,c){var d=this.getVal(),f=this.results.find(".select2-result"),g=this.results.find(".select2-result-with-children"),h=this;f.each2(function(a,b){var c=h.id(b.data("select2-data"));e(c,d)>=0&&(b.addClass("select2-selected"),b.find(".select2-result-selectable").addClass("select2-selected"))}),g.each2(function(a,b){b.is(".select2-result-selectable")||0!==b.find(".select2-result-selectable:not(.select2-selected)").length||b.addClass("select2-selected")}),-1==this.highlight()&&c!==!1&&h.highlight(0),!this.opts.createSearchChoice&&!f.filter(".select2-result:not(.select2-selected)").length>0&&(!a||a&&!a.more&&0===this.results.find(".select2-no-results").length)&&y(h.opts.formatNoMatches,"formatNoMatches")&&this.results.append("<li class='select2-no-results'>"+z(h.opts.formatNoMatches,h.opts.element,h.search.val())+"</li>")},getMaxSearchWidth:function(){return this.selection.width()-i(this.search)},resizeSearch:function(){var a,b,c,d,e,f=i(this.search);a=r(this.search)+10,b=this.search.offset().left,c=this.selection.width(),d=this.selection.offset().left,e=c-(b-d)-f,a>e&&(e=c-f),40>e&&(e=c-f),0>=e&&(e=a),this.search.width(Math.floor(e))},getVal:function(){var a;return this.select?(a=this.select.val(),null===a?[]:a):(a=this.opts.element.val(),h(a,this.opts.separator))},setVal:function(b){var c;this.select?this.select.val(b):(c=[],a(b).each(function(){e(this,c)<0&&c.push(this)}),this.opts.element.val(0===c.length?"":c.join(this.opts.separator)))},buildChangeDetails:function(a,b){for(var b=b.slice(0),a=a.slice(0),c=0;c<b.length;c++)for(var d=0;d<a.length;d++)g(this.opts.id(b[c]),this.opts.id(a[d]))&&(b.splice(c,1),c>0&&c--,a.splice(d,1),d--);return{added:b,removed:a}},val:function(c,d){var e,f=this;if(0===arguments.length)return this.getVal();if(e=this.data(),e.length||(e=[]),!c&&0!==c)return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),void(d&&this.triggerChange({added:this.data(),removed:e}));if(this.setVal(c),this.select)this.opts.initSelection(this.select,this.bind(this.updateSelection)),d&&this.triggerChange(this.buildChangeDetails(e,this.data()));else{if(this.opts.initSelection===b)throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,function(b){var c=a.map(b,f.id);f.setVal(c),f.updateSelection(b),f.clearSearch(),d&&f.triggerChange(f.buildChangeDetails(e,f.data()))})}this.clearSearch()},onSortStart:function(){if(this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0),this.searchContainer.hide()},onSortEnd:function(){var b=[],c=this;this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){b.push(c.opts.id(a(this).data("select2-data")))}),this.setVal(b),this.triggerChange()},data:function(b,c){var d,e,f=this;return 0===arguments.length?this.selection.children(".select2-search-choice").map(function(){return a(this).data("select2-data")}).get():(e=this.data(),b||(b=[]),d=a.map(b,function(a){return f.opts.id(a)}),this.setVal(d),this.updateSelection(b),this.clearSearch(),c&&this.triggerChange(this.buildChangeDetails(e,this.data())),void 0)}}),a.fn.select2=function(){var c,d,f,g,h,i=Array.prototype.slice.call(arguments,0),j=["val","destroy","opened","open","close","focus","isFocused","container","dropdown","onSortStart","onSortEnd","enable","disable","readonly","positionDropdown","data","search"],k=["opened","isFocused","container","dropdown"],l=["val","data"],m={search:"externalSearch"};return this.each(function(){if(0===i.length||"object"==typeof i[0])c=0===i.length?{}:a.extend({},i[0]),c.element=a(this),"select"===c.element.get(0).tagName.toLowerCase()?h=c.element.prop("multiple"):(h=c.multiple||!1,"tags"in c&&(c.multiple=h=!0)),d=h?new window.Select2["class"].multi:new window.Select2["class"].single,d.init(c);else{if("string"!=typeof i[0])throw"Invalid arguments to select2 plugin: "+i;if(e(i[0],j)<0)throw"Unknown method: "+i[0];if(g=b,d=a(this).data("select2"),d===b)return;if(f=i[0],"container"===f?g=d.container:"dropdown"===f?g=d.dropdown:(m[f]&&(f=m[f]),g=d[f].apply(d,i.slice(1))),e(i[0],k)>=0||e(i[0],l)>=0&&1==i.length)return!1}}),g===b?this:g},a.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c,d){var e=[];return t(a.text,c.term,e,d),e.join("")},formatSelection:function(a,c,d){return a?d(a.text):b},sortResults:function(a){return a},formatResultCssClass:function(a){return a.css},formatSelectionCssClass:function(){return b},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(a){return a==b?null:a.id},matcher:function(a,b){return d(""+b).toUpperCase().indexOf(d(""+a).toUpperCase())>=0},separator:",",tokenSeparators:[],tokenizer:B,escapeMarkup:u,blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(a){return a},adaptDropdownCssClass:function(){return null},nextSearchTerm:function(){return b},searchInputPlaceholder:"",createSearchChoicePosition:"top",shouldFocusInput:function(a){var b="ontouchstart"in window||navigator.msMaxTouchPoints>0;return b&&a.opts.minimumResultsForSearch<0?!1:!0}},a.fn.select2.locales=[],a.fn.select2.locales.en={formatMatches:function(a){return 1===a?"One result is available, press enter to select it.":a+" results are available, use up and down arrow keys to navigate."},formatNoMatches:function(){return"No matches found"},formatAjaxError:function(){return"Loading failed"},formatInputTooShort:function(a,b){var c=b-a.length;return"Please enter "+c+" or more character"+(1==c?"":"s")},formatInputTooLong:function(a,b){var c=a.length-b;return"Please delete "+c+" character"+(1==c?"":"s")},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results…"},formatSearching:function(){return"Searching…"}},a.extend(a.fn.select2.defaults,a.fn.select2.locales.en),a.fn.select2.ajaxDefaults={transport:a.ajax,params:{type:"GET",cache:!1,dataType:"json"}},window.Select2={query:{ajax:v,local:w,tags:x},util:{debounce:l,markMatch:t,escapeMarkup:u,stripDiacritics:d},"class":{"abstract":F,single:G,multi:H}}}}(jQuery),/*!
 * jQuery UI Core 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
function(a,b){function c(b,c){var e,f,g,h=b.nodeName.toLowerCase();return"area"===h?(e=b.parentNode,f=e.name,b.href&&f&&"map"===e.nodeName.toLowerCase()?(g=a("img[usemap=#"+f+"]")[0],!!g&&d(g)):!1):(/input|select|textarea|button|object/.test(h)?!b.disabled:"a"===h?b.href||c:c)&&d(b)}function d(b){return a.expr.filters.visible(b)&&!a(b).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}var e=0,f=/^ui-id-\d+$/;a.ui=a.ui||{},a.extend(a.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),a.fn.extend({focus:function(b){return function(c,d){return"number"==typeof c?this.each(function(){var b=this;setTimeout(function(){a(b).focus(),d&&d.call(b)},c)}):b.apply(this,arguments)}}(a.fn.focus),scrollParent:function(){var b;return b=a.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.css(this,"position"))&&/(auto|scroll)/.test(a.css(this,"overflow")+a.css(this,"overflow-y")+a.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.css(this,"overflow")+a.css(this,"overflow-y")+a.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length)for(var d,e,f=a(this[0]);f.length&&f[0]!==document;){if(d=f.css("position"),("absolute"===d||"relative"===d||"fixed"===d)&&(e=parseInt(f.css("zIndex"),10),!isNaN(e)&&0!==e))return e;f=f.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})},removeUniqueId:function(){return this.each(function(){f.test(this.id)&&a(this).removeAttr("id")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function e(b,c,d,e){return a.each(f,function(){c-=parseFloat(a.css(b,"padding"+this))||0,d&&(c-=parseFloat(a.css(b,"border"+this+"Width"))||0),e&&(c-=parseFloat(a.css(b,"margin"+this))||0)}),c}var f="Width"===d?["Left","Right"]:["Top","Bottom"],g=d.toLowerCase(),h={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?h["inner"+d].call(this):this.each(function(){a(this).css(g,e(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return"number"!=typeof b?h["outer"+d].call(this,b):this.each(function(){a(this).css(g,e(this,b,!0,c)+"px")})}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(a.fn.removeData=function(b){return function(c){return arguments.length?b.call(this,a.camelCase(c)):b.call(this)}}(a.fn.removeData)),a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),a.support.selectstart="onselectstart"in document.createElement("div"),a.fn.extend({disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e,f=a.ui[b].prototype;for(e in d)f.plugins[e]=f.plugins[e]||[],f.plugins[e].push([c,d[e]])},call:function(a,b,c){var d,e=a.plugins[b];if(e&&a.element[0].parentNode&&11!==a.element[0].parentNode.nodeType)for(d=0;d<e.length;d++)a.options[e[d][0]]&&e[d][1].apply(a.element,c)}},hasScroll:function(b,c){if("hidden"===a(b).css("overflow"))return!1;var d=c&&"left"===c?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)}})}(jQuery),/*!
 * jQuery UI Widget 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
function(a,b){var c=0,d=Array.prototype.slice,e=a.cleanData;a.cleanData=function(b){for(var c,d=0;null!=(c=b[d]);d++)try{a(c).triggerHandler("remove")}catch(f){}e(b)},a.widget=function(b,c,d){var e,f,g,h,i={},j=b.split(".")[0];b=b.split(".")[1],e=j+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[j]=a[j]||{},f=a[j][b],g=a[j][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new g(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,d){return a.isFunction(d)?void(i[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},e=function(a){return c.prototype[b].apply(this,a)};return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(i[b]=d)}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix||b:b},i,{constructor:g,namespace:j,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g)},a.widget.extend=function(c){for(var e,f,g=d.call(arguments,1),h=0,i=g.length;i>h;h++)for(e in g[h])f=g[h][e],g[h].hasOwnProperty(e)&&f!==b&&(c[e]=a.isPlainObject(f)?a.isPlainObject(c[e])?a.widget.extend({},c[e],f):a.widget.extend({},f):f);return c},a.widget.bridge=function(c,e){var f=e.prototype.widgetFullName||c;a.fn[c]=function(g){var h="string"==typeof g,i=d.call(arguments,1),j=this;return g=!h&&i.length?a.widget.extend.apply(null,[g].concat(i)):g,this.each(h?function(){var d,e=a.data(this,f);return e?a.isFunction(e[g])&&"_"!==g.charAt(0)?(d=e[g].apply(e,i),d!==e&&d!==b?(j=d&&d.jquery?j.pushStack(d.get()):d,!1):void 0):a.error("no such method '"+g+"' for "+c+" widget instance"):a.error("cannot call methods on "+c+" prior to initialization; attempted to call method '"+g+"'")}:function(){var b=a.data(this,f);b?b.option(g||{})._init():a.data(this,f,new e(g,this))}),j}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(b,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=c++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=a.widget.extend({},this.options,this._getCreateOptions(),b),this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(c,d){var e,f,g,h=c;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof c)if(h={},e=c.split("."),c=e.shift(),e.length){for(f=h[c]=a.widget.extend({},this.options[c]),g=0;g<e.length-1;g++)f[e[g]]=f[e[g]]||{},f=f[e[g]];if(c=e.pop(),1===arguments.length)return f[c]===b?null:f[c];f[c]=d}else{if(1===arguments.length)return this.options[c]===b?null:this.options[c];h[c]=d}return this._setOptions(h),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!b).attr("aria-disabled",b),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){return b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled")?("string"==typeof g?f[g]:g).apply(f,arguments):void 0}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^(\w+)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(a,b){b=(b||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,a.unbind(b).undelegate(b)},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}})}(jQuery),/*!
 * jQuery UI Mouse 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
function(a){var b=!1;a(document).mouseup(function(){b=!1}),a.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){return!0===a.data(c.target,b.widgetName+".preventClickEvent")?(a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(c){if(!b){this._mouseStarted&&this._mouseUp(c),this._mouseDownEvent=c;var d=this,e=1===c.which,f="string"==typeof this.options.cancel&&c.target.nodeName?a(c.target).closest(this.options.cancel).length:!1;return e&&!f&&this._mouseCapture(c)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(c)&&this._mouseDelayMet(c)&&(this._mouseStarted=this._mouseStart(c)!==!1,!this._mouseStarted)?(c.preventDefault(),!0):(!0===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),c.preventDefault(),b=!0,!0)):!0}},_mouseMove:function(b){return a.ui.ie&&(!document.documentMode||document.documentMode<9)&&!b.button?this._mouseUp(b):this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target===this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}(jQuery),/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
function(a,b){function c(a,b,c){return[parseFloat(a[0])*(n.test(a[0])?b/100:1),parseFloat(a[1])*(n.test(a[1])?c/100:1)]}function d(b,c){return parseInt(a.css(b,c),10)||0}function e(b){var c=b[0];return 9===c.nodeType?{width:b.width(),height:b.height(),offset:{top:0,left:0}}:a.isWindow(c)?{width:b.width(),height:b.height(),offset:{top:b.scrollTop(),left:b.scrollLeft()}}:c.preventDefault?{width:0,height:0,offset:{top:c.pageY,left:c.pageX}}:{width:b.outerWidth(),height:b.outerHeight(),offset:b.offset()}}a.ui=a.ui||{};var f,g=Math.max,h=Math.abs,i=Math.round,j=/left|center|right/,k=/top|center|bottom/,l=/[\+\-]\d+(\.[\d]+)?%?/,m=/^\w+/,n=/%$/,o=a.fn.position;a.position={scrollbarWidth:function(){if(f!==b)return f;var c,d,e=a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),g=e.children()[0];return a("body").append(e),c=g.offsetWidth,e.css("overflow","scroll"),d=g.offsetWidth,c===d&&(d=e[0].clientWidth),e.remove(),f=c-d},getScrollInfo:function(b){var c=b.isWindow||b.isDocument?"":b.element.css("overflow-x"),d=b.isWindow||b.isDocument?"":b.element.css("overflow-y"),e="scroll"===c||"auto"===c&&b.width<b.element[0].scrollWidth,f="scroll"===d||"auto"===d&&b.height<b.element[0].scrollHeight;return{width:f?a.position.scrollbarWidth():0,height:e?a.position.scrollbarWidth():0}},getWithinInfo:function(b){var c=a(b||window),d=a.isWindow(c[0]),e=!!c[0]&&9===c[0].nodeType;return{element:c,isWindow:d,isDocument:e,offset:c.offset()||{left:0,top:0},scrollLeft:c.scrollLeft(),scrollTop:c.scrollTop(),width:d?c.width():c.outerWidth(),height:d?c.height():c.outerHeight()}}},a.fn.position=function(b){if(!b||!b.of)return o.apply(this,arguments);b=a.extend({},b);var f,n,p,q,r,s,t=a(b.of),u=a.position.getWithinInfo(b.within),v=a.position.getScrollInfo(u),w=(b.collision||"flip").split(" "),x={};return s=e(t),t[0].preventDefault&&(b.at="left top"),n=s.width,p=s.height,q=s.offset,r=a.extend({},q),a.each(["my","at"],function(){var a,c,d=(b[this]||"").split(" ");1===d.length&&(d=j.test(d[0])?d.concat(["center"]):k.test(d[0])?["center"].concat(d):["center","center"]),d[0]=j.test(d[0])?d[0]:"center",d[1]=k.test(d[1])?d[1]:"center",a=l.exec(d[0]),c=l.exec(d[1]),x[this]=[a?a[0]:0,c?c[0]:0],b[this]=[m.exec(d[0])[0],m.exec(d[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===b.at[0]?r.left+=n:"center"===b.at[0]&&(r.left+=n/2),"bottom"===b.at[1]?r.top+=p:"center"===b.at[1]&&(r.top+=p/2),f=c(x.at,n,p),r.left+=f[0],r.top+=f[1],this.each(function(){var e,j,k=a(this),l=k.outerWidth(),m=k.outerHeight(),o=d(this,"marginLeft"),s=d(this,"marginTop"),y=l+o+d(this,"marginRight")+v.width,z=m+s+d(this,"marginBottom")+v.height,A=a.extend({},r),B=c(x.my,k.outerWidth(),k.outerHeight());"right"===b.my[0]?A.left-=l:"center"===b.my[0]&&(A.left-=l/2),"bottom"===b.my[1]?A.top-=m:"center"===b.my[1]&&(A.top-=m/2),A.left+=B[0],A.top+=B[1],a.support.offsetFractions||(A.left=i(A.left),A.top=i(A.top)),e={marginLeft:o,marginTop:s},a.each(["left","top"],function(c,d){a.ui.position[w[c]]&&a.ui.position[w[c]][d](A,{targetWidth:n,targetHeight:p,elemWidth:l,elemHeight:m,collisionPosition:e,collisionWidth:y,collisionHeight:z,offset:[f[0]+B[0],f[1]+B[1]],my:b.my,at:b.at,within:u,elem:k})}),b.using&&(j=function(a){var c=q.left-A.left,d=c+n-l,e=q.top-A.top,f=e+p-m,i={target:{element:t,left:q.left,top:q.top,width:n,height:p},element:{element:k,left:A.left,top:A.top,width:l,height:m},horizontal:0>d?"left":c>0?"right":"center",vertical:0>f?"top":e>0?"bottom":"middle"};l>n&&h(c+d)<n&&(i.horizontal="center"),m>p&&h(e+f)<p&&(i.vertical="middle"),i.important=g(h(c),h(d))>g(h(e),h(f))?"horizontal":"vertical",b.using.call(this,a,i)}),k.offset(a.extend(A,{using:j}))})},a.ui.position={fit:{left:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollLeft:d.offset.left,f=d.width,h=a.left-b.collisionPosition.marginLeft,i=e-h,j=h+b.collisionWidth-f-e;b.collisionWidth>f?i>0&&0>=j?(c=a.left+i+b.collisionWidth-f-e,a.left+=i-c):a.left=j>0&&0>=i?e:i>j?e+f-b.collisionWidth:e:i>0?a.left+=i:j>0?a.left-=j:a.left=g(a.left-h,a.left)},top:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollTop:d.offset.top,f=b.within.height,h=a.top-b.collisionPosition.marginTop,i=e-h,j=h+b.collisionHeight-f-e;b.collisionHeight>f?i>0&&0>=j?(c=a.top+i+b.collisionHeight-f-e,a.top+=i-c):a.top=j>0&&0>=i?e:i>j?e+f-b.collisionHeight:e:i>0?a.top+=i:j>0?a.top-=j:a.top=g(a.top-h,a.top)}},flip:{left:function(a,b){var c,d,e=b.within,f=e.offset.left+e.scrollLeft,g=e.width,i=e.isWindow?e.scrollLeft:e.offset.left,j=a.left-b.collisionPosition.marginLeft,k=j-i,l=j+b.collisionWidth-g-i,m="left"===b.my[0]?-b.elemWidth:"right"===b.my[0]?b.elemWidth:0,n="left"===b.at[0]?b.targetWidth:"right"===b.at[0]?-b.targetWidth:0,o=-2*b.offset[0];0>k?(c=a.left+m+n+o+b.collisionWidth-g-f,(0>c||c<h(k))&&(a.left+=m+n+o)):l>0&&(d=a.left-b.collisionPosition.marginLeft+m+n+o-i,(d>0||h(d)<l)&&(a.left+=m+n+o))},top:function(a,b){var c,d,e=b.within,f=e.offset.top+e.scrollTop,g=e.height,i=e.isWindow?e.scrollTop:e.offset.top,j=a.top-b.collisionPosition.marginTop,k=j-i,l=j+b.collisionHeight-g-i,m="top"===b.my[1],n=m?-b.elemHeight:"bottom"===b.my[1]?b.elemHeight:0,o="top"===b.at[1]?b.targetHeight:"bottom"===b.at[1]?-b.targetHeight:0,p=-2*b.offset[1];0>k?(d=a.top+n+o+p+b.collisionHeight-g-f,a.top+n+o+p>k&&(0>d||d<h(k))&&(a.top+=n+o+p)):l>0&&(c=a.top-b.collisionPosition.marginTop+n+o+p-i,a.top+n+o+p>l&&(c>0||h(c)<l)&&(a.top+=n+o+p))}},flipfit:{left:function(){a.ui.position.flip.left.apply(this,arguments),a.ui.position.fit.left.apply(this,arguments)},top:function(){a.ui.position.flip.top.apply(this,arguments),a.ui.position.fit.top.apply(this,arguments)}}},function(){var b,c,d,e,f,g=document.getElementsByTagName("body")[0],h=document.createElement("div");b=document.createElement(g?"div":"body"),d={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},g&&a.extend(d,{position:"absolute",left:"-1000px",top:"-1000px"});for(f in d)b.style[f]=d[f];b.appendChild(h),c=g||document.documentElement,c.insertBefore(b,c.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",e=a(h).offset().left,a.support.offsetFractions=e>10&&11>e,b.innerHTML="",c.removeChild(b)}()}(jQuery),/*!
 * jQuery UI Button 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
function(a){var b,c="ui-button ui-widget ui-state-default ui-corner-all",d="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",e=function(){var b=a(this);setTimeout(function(){b.find(":ui-button").button("refresh")},1)},f=function(b){var c=b.name,d=b.form,e=a([]);return c&&(c=c.replace(/'/g,"\\'"),e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form})),e};a.widget("ui.button",{version:"1.10.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,e),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var d=this,g=this.options,h="checkbox"===this.type||"radio"===this.type,i=h?"":"ui-state-active";null===g.label&&(g.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(c).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){g.disabled||this===b&&a(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){g.disabled||a(this).removeClass(i)}).bind("click"+this.eventNamespace,function(a){g.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),h&&this.element.bind("change"+this.eventNamespace,function(){d.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return g.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(g.disabled)return!1;a(this).addClass("ui-state-active"),d.buttonElement.attr("aria-pressed","true");var b=d.element[0];f(b).not(b).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return g.disabled?!1:(a(this).addClass("ui-state-active"),b=this,void d.document.one("mouseup",function(){b=null}))}).bind("mouseup"+this.eventNamespace,function(){return g.disabled?!1:void a(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(b){return g.disabled?!1:void((b.keyCode===a.ui.keyCode.SPACE||b.keyCode===a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active"))}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",g.disabled),this._resetButton()},_determineButtonType:function(){var a,b,c;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(a=this.element.parents().last(),b="label[for='"+this.element.attr("id")+"']",this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible"),c=this.element.is(":checked"),c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",c)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(c+" ui-state-active "+d).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(a,b){return this._super(a,b),"disabled"===a?(this.element.prop("disabled",!!b),void(b&&this.buttonElement.removeClass("ui-state-focus"))):void this._resetButton()},refresh:function(){var b=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");b!==this.options.disabled&&this._setOption("disabled",b),"radio"===this.type?f(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return void(this.options.label&&this.element.val(this.options.label));var b=this.buttonElement.removeClass(d),c=a("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),e=this.options.icons,f=e.primary&&e.secondary,g=[];e.primary||e.secondary?(this.options.text&&g.push("ui-button-text-icon"+(f?"s":e.primary?"-primary":"-secondary")),e.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+e.primary+"'></span>"),e.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+e.secondary+"'></span>"),this.options.text||(g.push(f?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",a.trim(c)))):g.push("ui-button-text-only"),b.addClass(g.join(" "))}}),a.widget("ui.buttonset",{version:"1.10.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(a,b){"disabled"===a&&this.buttons.button("option",a,b),this._super(a,b)},refresh:function(){var b="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})}(jQuery),/*!
 * jQuery UI Slider 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
function(a){var b=5;a.widget("ui.slider",a.ui.mouse,{version:"1.10.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var b,c,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=[];for(c=d.values&&d.values.length||1,e.length>c&&(e.slice(c).remove(),e=e.slice(0,c)),b=e.length;c>b;b++)g.push(f);this.handles=e.add(a(g.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(b){a(this).data("ui-slider-handle-index",b)})},_createRange:function(){var b=this.options,c="";b.range?(b.range===!0&&(b.values?b.values.length&&2!==b.values.length?b.values=[b.values[0],b.values[0]]:a.isArray(b.values)&&(b.values=b.values.slice(0)):b.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=a("<div></div>").appendTo(this.element),c="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(c+("min"===b.range||"max"===b.range?" ui-slider-range-"+b.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){var a=this.handles.add(this.range).filter("a");this._off(a),this._on(a,this._handleEvents),this._hoverable(a),this._focusable(a)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(b){var c,d,e,f,g,h,i,j,k=this,l=this.options;return l.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),c={x:b.pageX,y:b.pageY},d=this._normValueFromMouse(c),e=this._valueMax()-this._valueMin()+1,this.handles.each(function(b){var c=Math.abs(d-k.values(b));(e>c||e===c&&(b===k._lastChangedValue||k.values(b)===l.min))&&(e=c,f=a(this),g=b)}),h=this._start(b,g),h===!1?!1:(this._mouseSliding=!0,this._handleIndex=g,f.addClass("ui-state-active").focus(),i=f.offset(),j=!a(b.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=j?{left:0,top:0}:{left:b.pageX-i.left-f.width()/2,top:b.pageY-i.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,g,d),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return"horizontal"===this.orientation?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),0>d&&(d=0),"vertical"===this.orientation&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),2===this.options.values.length&&this.options.range===!0&&(0===b&&c>d||1===b&&d>c)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._lastChangedValue=b,this._trigger("change",a,c)}},value:function(a){return arguments.length?(this.options.value=this._trimAlignValue(a),this._refreshValue(),void this._change(null,0)):this._value()},values:function(b,c){var d,e,f;if(arguments.length>1)return this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),void this._change(null,b);if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();for(d=this.options.values,e=arguments[0],f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;switch("range"===b&&this.options.range===!0&&("min"===c?(this.options.value=this._values(0),this.options.values=null):"max"===c&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments),b){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),d=0;e>d;d+=1)this._change(null,d);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b);if(this.options.values&&this.options.values.length){for(c=this.options.values.slice(),d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c}return[]},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return 2*Math.abs(c)>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b,c,d,e,f,g=this.options.range,h=this.options,i=this,j=this._animateOff?!1:h.animate,k={};this.options.values&&this.options.values.length?this.handles.each(function(d){c=(i.values(d)-i._valueMin())/(i._valueMax()-i._valueMin())*100,k["horizontal"===i.orientation?"left":"bottom"]=c+"%",a(this).stop(1,1)[j?"animate":"css"](k,h.animate),i.options.range===!0&&("horizontal"===i.orientation?(0===d&&i.range.stop(1,1)[j?"animate":"css"]({left:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({width:c-b+"%"},{queue:!1,duration:h.animate})):(0===d&&i.range.stop(1,1)[j?"animate":"css"]({bottom:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({height:c-b+"%"},{queue:!1,duration:h.animate}))),b=c}):(d=this.value(),e=this._valueMin(),f=this._valueMax(),c=f!==e?(d-e)/(f-e)*100:0,k["horizontal"===this.orientation?"left":"bottom"]=c+"%",this.handle.stop(1,1)[j?"animate":"css"](k,h.animate),"min"===g&&"horizontal"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({width:c+"%"},h.animate),"max"===g&&"horizontal"===this.orientation&&this.range[j?"animate":"css"]({width:100-c+"%"},{queue:!1,duration:h.animate}),"min"===g&&"vertical"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({height:c+"%"},h.animate),"max"===g&&"vertical"===this.orientation&&this.range[j?"animate":"css"]({height:100-c+"%"},{queue:!1,duration:h.animate}))},_handleEvents:{keydown:function(c){var d,e,f,g,h=a(c.target).data("ui-slider-handle-index");switch(c.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(c.preventDefault(),!this._keySliding&&(this._keySliding=!0,a(c.target).addClass("ui-state-active"),d=this._start(c,h),d===!1))return}switch(g=this.options.step,e=f=this.options.values&&this.options.values.length?this.values(h):this.value(),c.keyCode){case a.ui.keyCode.HOME:f=this._valueMin();break;case a.ui.keyCode.END:f=this._valueMax();break;case a.ui.keyCode.PAGE_UP:f=this._trimAlignValue(e+(this._valueMax()-this._valueMin())/b);break;case a.ui.keyCode.PAGE_DOWN:f=this._trimAlignValue(e-(this._valueMax()-this._valueMin())/b);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(e===this._valueMax())return;f=this._trimAlignValue(e+g);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(e===this._valueMin())return;f=this._trimAlignValue(e-g)}this._slide(c,h,f)},click:function(a){a.preventDefault()},keyup:function(b){var c=a(b.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(b,c),this._change(b,c),a(b.target).removeClass("ui-state-active"))}}})}(jQuery),/*!
 * jQuery UI Effects 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
function(a,b){var c="ui-effects-";a.effects={effect:{}},/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
function(a,b){function c(a,b,c){var d=l[b.type]||{};return null==a?c||!b.def?null:b.def:(a=d.floor?~~a:parseFloat(a),isNaN(a)?b.def:d.mod?(a+d.mod)%d.mod:0>a?0:d.max<a?d.max:a)}function d(b){var c=j(),d=c._rgba=[];return b=b.toLowerCase(),o(i,function(a,e){var f,g=e.re.exec(b),h=g&&e.parse(g),i=e.space||"rgba";return h?(f=c[i](h),c[k[i].cache]=f[k[i].cache],d=c._rgba=f._rgba,!1):void 0}),d.length?("0,0,0,0"===d.join()&&a.extend(d,f.transparent),c):f[b]}function e(a,b,c){return c=(c+1)%1,1>6*c?a+(b-a)*c*6:1>2*c?b:2>3*c?a+(b-a)*(2/3-c)*6:a}var f,g="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",h=/^([\-+])=\s*(\d+\.?\d*)/,i=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[2.55*a[1],2.55*a[2],2.55*a[3],a[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],j=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},k={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},l={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},m=j.support={},n=a("<p>")[0],o=a.each;n.style.cssText="background-color:rgba(1,1,1,.5)",m.rgba=n.style.backgroundColor.indexOf("rgba")>-1,o(k,function(a,b){b.cache="_"+a,b.props.alpha={idx:3,type:"percent",def:1}}),j.fn=a.extend(j.prototype,{parse:function(e,g,h,i){if(e===b)return this._rgba=[null,null,null,null],this;(e.jquery||e.nodeType)&&(e=a(e).css(g),g=b);var l=this,m=a.type(e),n=this._rgba=[];return g!==b&&(e=[e,g,h,i],m="array"),"string"===m?this.parse(d(e)||f._default):"array"===m?(o(k.rgba.props,function(a,b){n[b.idx]=c(e[b.idx],b)}),this):"object"===m?(e instanceof j?o(k,function(a,b){e[b.cache]&&(l[b.cache]=e[b.cache].slice())}):o(k,function(b,d){var f=d.cache;o(d.props,function(a,b){if(!l[f]&&d.to){if("alpha"===a||null==e[a])return;l[f]=d.to(l._rgba)}l[f][b.idx]=c(e[a],b,!0)}),l[f]&&a.inArray(null,l[f].slice(0,3))<0&&(l[f][3]=1,d.from&&(l._rgba=d.from(l[f])))}),this):void 0},is:function(a){var b=j(a),c=!0,d=this;return o(k,function(a,e){var f,g=b[e.cache];return g&&(f=d[e.cache]||e.to&&e.to(d._rgba)||[],o(e.props,function(a,b){return null!=g[b.idx]?c=g[b.idx]===f[b.idx]:void 0})),c}),c},_space:function(){var a=[],b=this;return o(k,function(c,d){b[d.cache]&&a.push(c)}),a.pop()},transition:function(a,b){var d=j(a),e=d._space(),f=k[e],g=0===this.alpha()?j("transparent"):this,h=g[f.cache]||f.to(g._rgba),i=h.slice();return d=d[f.cache],o(f.props,function(a,e){var f=e.idx,g=h[f],j=d[f],k=l[e.type]||{};null!==j&&(null===g?i[f]=j:(k.mod&&(j-g>k.mod/2?g+=k.mod:g-j>k.mod/2&&(g-=k.mod)),i[f]=c((j-g)*b+g,e)))}),this[e](i)},blend:function(b){if(1===this._rgba[3])return this;var c=this._rgba.slice(),d=c.pop(),e=j(b)._rgba;return j(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return null==a?b>2?1:0:a});return 1===c[3]&&(c.pop(),b="rgb("),b+c.join()+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){return null==a&&(a=b>2?1:0),b&&3>b&&(a=Math.round(100*a)+"%"),a});return 1===c[3]&&(c.pop(),b="hsl("),b+c.join()+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();return b&&c.push(~~(255*d)),"#"+a.map(c,function(a){return a=(a||0).toString(16),1===a.length?"0"+a:a}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),j.fn.parse.prototype=j.fn,k.hsla.to=function(a){if(null==a[0]||null==a[1]||null==a[2])return[null,null,null,a[3]];var b,c,d=a[0]/255,e=a[1]/255,f=a[2]/255,g=a[3],h=Math.max(d,e,f),i=Math.min(d,e,f),j=h-i,k=h+i,l=.5*k;return b=i===h?0:d===h?60*(e-f)/j+360:e===h?60*(f-d)/j+120:60*(d-e)/j+240,c=0===j?0:.5>=l?j/k:j/(2-k),[Math.round(b)%360,c,l,null==g?1:g]},k.hsla.from=function(a){if(null==a[0]||null==a[1]||null==a[2])return[null,null,null,a[3]];var b=a[0]/360,c=a[1],d=a[2],f=a[3],g=.5>=d?d*(1+c):d+c-d*c,h=2*d-g;return[Math.round(255*e(h,g,b+1/3)),Math.round(255*e(h,g,b)),Math.round(255*e(h,g,b-1/3)),f]},o(k,function(d,e){var f=e.props,g=e.cache,i=e.to,k=e.from;j.fn[d]=function(d){if(i&&!this[g]&&(this[g]=i(this._rgba)),d===b)return this[g].slice();var e,h=a.type(d),l="array"===h||"object"===h?d:arguments,m=this[g].slice();return o(f,function(a,b){var d=l["object"===h?a:b.idx];null==d&&(d=m[b.idx]),m[b.idx]=c(d,b)}),k?(e=j(k(m)),e[g]=m,e):j(m)},o(f,function(b,c){j.fn[b]||(j.fn[b]=function(e){var f,g=a.type(e),i="alpha"===b?this._hsla?"hsla":"rgba":d,j=this[i](),k=j[c.idx];return"undefined"===g?k:("function"===g&&(e=e.call(this,k),g=a.type(e)),null==e&&c.empty?this:("string"===g&&(f=h.exec(e),f&&(e=k+parseFloat(f[2])*("+"===f[1]?1:-1))),j[c.idx]=e,this[i](j)))})})}),j.hook=function(b){var c=b.split(" ");o(c,function(b,c){a.cssHooks[c]={set:function(b,e){var f,g,h="";if("transparent"!==e&&("string"!==a.type(e)||(f=d(e)))){if(e=j(f||e),!m.rgba&&1!==e._rgba[3]){for(g="backgroundColor"===c?b.parentNode:b;(""===h||"transparent"===h)&&g&&g.style;)try{h=a.css(g,"backgroundColor"),g=g.parentNode}catch(i){}e=e.blend(h&&"transparent"!==h?h:"_default")}e=e.toRgbaString()}try{b.style[c]=e}catch(i){}}},a.fx.step[c]=function(b){b.colorInit||(b.start=j(b.elem,c),b.end=j(b.end),b.colorInit=!0),a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}})},j.hook(g),a.cssHooks.borderColor={expand:function(a){var b={};return o(["Top","Right","Bottom","Left"],function(c,d){b["border"+d+"Color"]=a}),b}},f=a.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function c(b){var c,d,e=b.ownerDocument.defaultView?b.ownerDocument.defaultView.getComputedStyle(b,null):b.currentStyle,f={};if(e&&e.length&&e[0]&&e[e[0]])for(d=e.length;d--;)c=e[d],"string"==typeof e[c]&&(f[a.camelCase(c)]=e[c]);else for(c in e)"string"==typeof e[c]&&(f[c]=e[c]);return f}function d(b,c){var d,e,g={};for(d in c)e=c[d],b[d]!==e&&(f[d]||(a.fx.step[d]||!isNaN(parseFloat(e)))&&(g[d]=e));return g}var e=["add","remove","toggle"],f={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(b,c){a.fx.step[c]=function(a){("none"!==a.end&&!a.setAttr||1===a.pos&&!a.setAttr)&&(jQuery.style(a.elem,c,a.end),a.setAttr=!0)}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a.effects.animateClass=function(b,f,g,h){var i=a.speed(f,g,h);return this.queue(function(){var f,g=a(this),h=g.attr("class")||"",j=i.children?g.find("*").addBack():g;j=j.map(function(){var b=a(this);return{el:b,start:c(this)}}),f=function(){a.each(e,function(a,c){b[c]&&g[c+"Class"](b[c])})},f(),j=j.map(function(){return this.end=c(this.el[0]),this.diff=d(this.start,this.end),this}),g.attr("class",h),j=j.map(function(){var b=this,c=a.Deferred(),d=a.extend({},i,{queue:!1,complete:function(){c.resolve(b)}});return this.el.animate(this.diff,d),c.promise()}),a.when.apply(a,j.get()).done(function(){f(),a.each(arguments,function(){var b=this.el;a.each(this.diff,function(a){b.css(a,"")})}),i.complete.call(g[0])})})},a.fn.extend({addClass:function(b){return function(c,d,e,f){return d?a.effects.animateClass.call(this,{add:c},d,e,f):b.apply(this,arguments)}}(a.fn.addClass),removeClass:function(b){return function(c,d,e,f){return arguments.length>1?a.effects.animateClass.call(this,{remove:c},d,e,f):b.apply(this,arguments)}}(a.fn.removeClass),toggleClass:function(c){return function(d,e,f,g,h){return"boolean"==typeof e||e===b?f?a.effects.animateClass.call(this,e?{add:d}:{remove:d},f,g,h):c.apply(this,arguments):a.effects.animateClass.call(this,{toggle:d},e,f,g)}}(a.fn.toggleClass),switchClass:function(b,c,d,e,f){return a.effects.animateClass.call(this,{add:c,remove:b},d,e,f)}})}(),function(){function d(b,c,d,e){return a.isPlainObject(b)&&(c=b,b=b.effect),b={effect:b},null==c&&(c={}),a.isFunction(c)&&(e=c,d=null,c={}),("number"==typeof c||a.fx.speeds[c])&&(e=d,d=c,c={}),a.isFunction(d)&&(e=d,d=null),c&&a.extend(b,c),d=d||c.duration,b.duration=a.fx.off?0:"number"==typeof d?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,b.complete=e||c.complete,b}function e(b){return!b||"number"==typeof b||a.fx.speeds[b]?!0:"string"!=typeof b||a.effects.effect[b]?a.isFunction(b)?!0:"object"!=typeof b||b.effect?!1:!0:!0}a.extend(a.effects,{version:"1.10.4",save:function(a,b){for(var d=0;d<b.length;d++)null!==b[d]&&a.data(c+b[d],a[0].style[b[d]])},restore:function(a,d){var e,f;for(f=0;f<d.length;f++)null!==d[f]&&(e=a.data(c+d[f]),e===b&&(e=""),a.css(d[f],e))},setMode:function(a,b){return"toggle"===b&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e={width:b.width(),height:b.height()},f=document.activeElement;try{f.id}catch(g){f=document.body}return b.wrap(d),(b[0]===f||a.contains(b[0],f))&&a(f).focus(),d=b.parent(),"static"===b.css("position")?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),b.css(e),d.css(c).show()},removeWrapper:function(b){var c=document.activeElement;return b.parent().is(".ui-effects-wrapper")&&(b.parent().replaceWith(b),(b[0]===c||a.contains(b[0],c))&&a(c).focus()),b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(){function b(b){function d(){a.isFunction(f)&&f.call(e[0]),a.isFunction(b)&&b()}var e=a(this),f=c.complete,h=c.mode;(e.is(":hidden")?"hide"===h:"show"===h)?(e[h](),d()):g.call(e[0],c,d)}var c=d.apply(this,arguments),e=c.mode,f=c.queue,g=a.effects.effect[c.effect];return a.fx.off||!g?e?this[e](c.duration,c.complete):this.each(function(){c.complete&&c.complete.call(this)}):f===!1?this.each(b):this.queue(f||"fx",b)},show:function(a){return function(b){if(e(b))return a.apply(this,arguments);var c=d.apply(this,arguments);return c.mode="show",this.effect.call(this,c)}}(a.fn.show),hide:function(a){return function(b){if(e(b))return a.apply(this,arguments);var c=d.apply(this,arguments);return c.mode="hide",this.effect.call(this,c)}}(a.fn.hide),toggle:function(a){return function(b){if(e(b)||"boolean"==typeof b)return a.apply(this,arguments);var c=d.apply(this,arguments);return c.mode="toggle",this.effect.call(this,c)}}(a.fn.toggle),cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}})}(),function(){var b={};a.each(["Quad","Cubic","Quart","Quint","Expo"],function(a,c){b[c]=function(b){return Math.pow(b,a+2)}}),a.extend(b,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return 0===a||1===a?a:-Math.pow(2,8*(a-1))*Math.sin((80*(a-1)-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){for(var b,c=4;a<((b=Math.pow(2,--c))-1)/11;);return 1/Math.pow(4,3-c)-7.5625*Math.pow((3*b-2)/22-a,2)}}),a.each(b,function(b,c){a.easing["easeIn"+b]=c,a.easing["easeOut"+b]=function(a){return 1-c(1-a)},a.easing["easeInOut"+b]=function(a){return.5>a?c(2*a)/2:1-c(-2*a+2)/2}})}()}(jQuery),/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
function(a){function b(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var c,d=a.ui.mouse.prototype,e=d._mouseInit;d._touchStart=function(a){var d=this;!c&&d._mouseCapture(a.originalEvent.changedTouches[0])&&(c=!0,d._touchMoved=!1,b(a,"mouseover"),b(a,"mousemove"),b(a,"mousedown"))},d._touchMove=function(a){c&&(this._touchMoved=!0,b(a,"mousemove"))},d._touchEnd=function(a){c&&(b(a,"mouseup"),b(a,"mouseout"),this._touchMoved||b(a,"click"),c=!1)},d._mouseInit=function(){var b=this;b.element.bind("touchstart",a.proxy(b,"_touchStart")).bind("touchmove",a.proxy(b,"_touchMove")).bind("touchend",a.proxy(b,"_touchEnd")),e.call(b)}}}(jQuery),+function(a,b){"use strict";function c(c){return this.each(function(){var e=b(this),f=e.data("radiocheck"),g="object"==typeof c&&c;if(f||"destroy"!=c){f||e.data("radiocheck",f=new d(this,g)),"string"==typeof c&&f[c]();var h=/mobile|tablet|phone|ip(ad|od)|android|silk|webos/i.test(a.navigator.userAgent);h===!0&&e.parent().hover(function(){e.addClass("nohover")},function(){e.removeClass("nohover")})}})}var d=function(a,b){this.init("radiocheck",a,b)};d.DEFAULTS={checkboxClass:"custom-checkbox",radioClass:"custom-radio",checkboxTemplate:'<span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>',radioTemplate:'<span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>'},d.prototype.init=function(a,c,e){this.$element=b(c),this.options=b.extend({},d.DEFAULTS,this.$element.data(),e),"checkbox"==this.$element.attr("type")?(this.$element.addClass(this.options.checkboxClass),this.$element.after(this.options.checkboxTemplate)):"radio"==this.$element.attr("type")&&(this.$element.addClass(this.options.radioClass),this.$element.after(this.options.radioTemplate))},d.prototype.check=function(){this.$element.prop("checked",!0),this.$element.trigger("change.radiocheck").trigger("checked.radiocheck")},d.prototype.uncheck=function(){this.$element.prop("checked",!1),this.$element.trigger("change.radiocheck").trigger("unchecked.radiocheck")},d.prototype.toggle=function(){this.$element.prop("checked",function(a,b){return!b}),this.$element.trigger("change.radiocheck").trigger("toggled.radiocheck")},d.prototype.indeterminate=function(){this.$element.prop("indeterminate",!0),this.$element.trigger("change.radiocheck").trigger("indeterminated.radiocheck")},d.prototype.determinate=function(){this.$element.prop("indeterminate",!1),this.$element.trigger("change.radiocheck").trigger("determinated.radiocheck")},d.prototype.disable=function(){this.$element.prop("disabled",!0),this.$element.trigger("change.radiocheck").trigger("disabled.radiocheck")},d.prototype.enable=function(){this.$element.prop("disabled",!1),this.$element.trigger("change.radiocheck").trigger("enabled.radiocheck")},d.prototype.destroy=function(){this.$element.removeData().removeClass(this.options.checkboxClass+" "+this.options.radioClass).next(".icons").remove(),this.$element.trigger("destroyed.radiocheck")};var e=b.fn.radiocheck;b.fn.radiocheck=c,b.fn.radiocheck.Constructor=d,b.fn.radiocheck.noConflict=function(){return b.fn.radiocheck=e,this}}(this,jQuery);
/*!
 * froala_editor v1.2.1 (http://editor.froala.com)
 * Copyright 2014-2014 Froala
 */

if("undefined"==typeof jQuery)throw new Error("Froala requires jQuery");!function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,a(c).data(),"object"==typeof d&&d),this.browser=b.browser(),this.disabledList=[],this._id=++b.count,this.blurred=!0,this.init(c)};b.initializers=[],b.count=0,b.VALID_NODES=["P","PRE","BLOCKQUOTE","H1","H2","H3","H4","H5","H6","DIV","LI","TD","TH"],b.LANGS=[],b.DEFAULTS={allowedAttrs:["title","href","alt","src","style","width","height","target","rel","name","value","type","colspan","rowspan","size","color","cellpadding","cellspacing","valign","align","autocomplete","background","bgcolor","contenteditable","tabindex","data-.*","contenteditable","tabindex"],allowedTags:["div","p","h1","h2","h3","h4","h5","h6","hr","pre","blockquote","table","thead","tbody","tfoot","tr","th","td","span","b","u","i","strong","em","strike","img","ul","ol","li","iframe","object","a","main","section","article","nav","header","aside","figure","figurecaption","footer","details","summary","mark","time","sub","sup"],alwaysBlank:!1,alwaysVisible:!1,autosave:!1,autosaveInterval:1e4,blockTags:["n","p","blockquote","pre","h1","h2","h3","h4","h5","h6"],buttons:["bold","italic","underline","strikeThrough","fontSize","fontFamily","color","sep","formatBlock","blockStyle","align","insertOrderedList","insertUnorderedList","outdent","indent","sep","createLink","insertImage","insertVideo","insertHorizontalRule","undo","redo","html"],crossDomain:!0,customButtons:{},customDropdowns:{},customText:!1,defaultImageWidth:300,direction:"ltr",disableRightClick:!1,editInPopup:!1,editorClass:"",formatTags:["p","pre","blockquote","h1","h2","h3","h4","h5","h6","div","ul","ol","li","table","tbody","thead","tfoot","tr","th","td"],headers:{},height:"auto",icons:{},inlineMode:!0,initOnClick:!1,language:"en_us",linkList:[],linkText:!0,linkClasses:{},maxHeight:"auto",minHeight:"auto",noFollow:!0,paragraphy:!0,placeholder:"Type something",plainPaste:!1,preloaderSrc:"",saveURL:null,saveParams:{},saveRequestType:"POST",simpleAmpersand:!1,shortcuts:!0,spellcheck:!1,theme:null,toolbarFixed:!0,trackScroll:!1,unlinkButton:!0,tabSpaces:!0,typingTimer:200,pastedImagesUploadRequestType:"POST",pastedImagesUploadURL:null,width:"auto",withCredentials:!1,zIndex:1e3},b.prototype.destroy=function(){this.sync(),this.addFrTag(),this.hide(),this.isHTML&&this.html(),this.focus(),this.clearSelection(),this.$element.blur(),this.$bttn_wrapper&&this.$bttn_wrapper.html("").removeData().remove(),this.$editor&&this.$editor.html("").removeData().remove(),this.raiseEvent("destroy"),this.$popup_editor&&this.$popup_editor.html("").removeData().remove(),clearTimeout(this.ajaxInterval),clearTimeout(this.typingTimer),this.$element.off("mousedown mouseup click keydown keyup cut focus keypress touchstart touchend touch drop"),this.$element.off("mousedown mouseup click keydown keyup cut focus keypress touchstart touchend touch drop","**"),a(window).off("mouseup."+this._id),a(window).off("keydown."+this._id),a(window).off("keyup."+this._id),a(window).off("hide."+this._id),a(window).off("scroll."+this._id),a(window).off("orientationchange."+this._id),a(document).off("selectionchange."+this._id),void 0!==this.$upload_frame&&this.$upload_frame.remove(),this.$textarea&&(this.$box.remove(),this.$textarea.removeData("fa.editable"),this.$textarea.show());for(var b in this._events)delete this._events[b];this.isLink?this.$element.removeData("fa.editable"):(this.$element.replaceWith(this.getHTML()),this.$box&&!this.editableDisabled&&(this.$box.removeClass("froala-box"),this.$box.find(".html-switch").remove(),this.$box.removeData("fa.editable"),clearTimeout(this.typingTimer)))},b.prototype.triggerEvent=function(b,c,d){void 0===d&&(d=!0);var e=!0,f=b+"Callback";return this.options[f]&&a.isFunction(this.options[f])&&(e=c?this.options[f].apply(this,c):this.options[f].call(this)),c||(c=[]),e=this.$textarea?this.$textarea.triggerHandler("editable."+b,a.merge([this],c)):this.$box.triggerHandler("editable."+b,a.merge([this],c)),d===!0&&(this.sync(),this.isResizing()||this.editableDisabled||this.android()||this.imageMode||this.cleanify()),void 0===e?!0:e},b.prototype.syncCleanHTML=function(a,b){var c;if(b)for(c=a.replace(/<span((?!class\s*=\s*["']?f-marker["']?)[^>])*?><\/span>/gi,"");a!=c;)a=c,c=a.replace(/<span((?!class\s*=\s*["']?f-marker["']?)[^>])*?><\/span>/gi,"");else for(c=a.replace(/<span[^>]*?><\/span>/g,"");a!=c;)a=c,c=a.replace(/<span[^>]*?><\/span>/g,"");return a},b.prototype.syncClean=function(b,c){var d="span:empty";c&&(d="span:empty:not(.f-marker)");for(var e=!1,f=function(b,c){0===c.attributes.length&&(a(c).remove(),e=!1)},g=b.find(d);g.length&&e===!1;)e=!0,g.each(f),g=b.find(d)},b.prototype.sync=function(){if(!this.isHTML){this.raiseEvent("sync"),this.disableImageResize(),this.isLink||this.isImage||this.$element.trigger("placeholderCheck");var a=this.getHTML();this.isHTML||(this.trackHTML!==a&&null!=this.trackHTML?(this.triggerEvent("contentChanged",[],!1),this.refreshImageList(),this.refreshButtons(),this.trackHTML=a):null==this.trackHTML&&(this.trackHTML=a)),this.$textarea&&this.$textarea.val(a)}},b.prototype.emptyElement=function(b){if("IMG"==b.tagName||a(b).find("img").length>0)return!1;if(a(b).find("input, iframe").length>0)return!1;for(var c=a(b).text(),d=0;d<c.length;d++)if("\n"!==c[d]&&"\r"!==c[d]&&"	"!==c[d])return!1;return!0},b.prototype.continueInit=function(){this.browserFixes(),this.editableDisabled||(this.initUndoRedo(),this.enableTyping(),this.initShortcuts()),this.initTabs(),this.initEditor(),this.isLink||this.initDrag();for(var b=0;b<a.Editable.initializers.length;b++)a.Editable.initializers[b].call(this);this.initOptions(),this.initEditorSelection(),this.initAjaxSaver(),this.setLanguage(),this.setCustomText(),this.isImage||this.isLink||this.registerPaste(),this.$element.blur(),this.initialized=!0,this.refreshButtons(!0),this.triggerEvent("initialized",[],!1)},b.prototype.init=function(b){this.initElement(b),this.initElementStyle(),this.options.initOnClick?(this.editableDisabled||this.$element.attr("contenteditable",!0),this.$element.bind("mousedown",a.proxy(function(){this.$element.unbind("mousedown"),this.$element.attr("contenteditable",!1),this.saveSelectionByMarkers(),this.continueInit(),this.restoreSelectionByMarkers(),this.hideOtherEditors()},this))):this.continueInit()},b.prototype.mobile=function(){return this.iOS()||this.android()||this.blackberry()},b.prototype.iOS=function(){return/(iPad|iPhone|iPod)/g.test(navigator.userAgent)},b.prototype.iPad=function(){return/(iPad)/g.test(navigator.userAgent)},b.prototype.iPhone=function(){return/(iPhone)/g.test(navigator.userAgent)},b.prototype.iPod=function(){return/(iPod)/g.test(navigator.userAgent)},b.prototype.android=function(){return/(Android)/g.test(navigator.userAgent)},b.prototype.blackberry=function(){return/(Blackberry)/g.test(navigator.userAgent)},b.prototype.initOnTextarea=function(b){this.$textarea=a(b),void 0!==this.$textarea.attr("placeholder")&&"Type something"==this.options.placeholder&&(this.options.placeholder=this.$textarea.attr("placeholder")),this.$element=a("<div>").html(this.$textarea.val()),this.$textarea.before(this.$element).hide(),this.$textarea.parents("form").bind("submit",a.proxy(function(){this.isHTML?this.html():this.sync()},this))},b.prototype.initOnLink=function(b){this.isLink=!0,this.selectionDisabled=!0,this.editableDisabled=!0,this.options.buttons=[],this.$element=a(b),this.options.paragraphy=!1,this.$box=this.$element},b.prototype.initOnImage=function(b){var c=a(b).css("float");"A"==a(b).parent().get(0).tagName&&(b=a(b).parent()),this.isImage=!0,this.editableDisabled=!0,this.imageList=[],this.options.buttons=[],this.options.paragraphy=!1,this.options.imageMargin="auto",a(b).wrap("<div>"),this.$element=a(b).parent(),this.$element.css("display","inline-block"),this.$element.css("max-width","100%"),this.$element.css("margin-left","auto"),this.$element.css("margin-right","auto"),this.$element.css("float",c),this.$element.addClass("f-image"),this.$box=a(b)},b.prototype.initForPopup=function(b){this.$element=a(b),this.$box=this.$element,this.editableDisabled=!0,this.options.buttons=[],this.$element.on("click",a.proxy(function(a){a.preventDefault()},this))},b.prototype.initOnDefault=function(b){"DIV"!=b.tagName&&this.options.buttons.indexOf("formatBlock")>=0&&this.disabledList.push("formatBlock"),this.$element=a(b)},b.prototype.initElement=function(b){"TEXTAREA"==b.tagName?this.initOnTextarea(b):"A"==b.tagName?this.initOnLink(b):"IMG"==b.tagName?this.initOnImage(b):this.options.editInPopup?this.initForPopup(b):this.initOnDefault(b),this.editableDisabled||(this.$box=this.$element,this.$element=a("<div>"),this.setHTML(this.$box.html(),!1),this.$box.html(this.$element).addClass("froala-box"),this.$element.on("keyup",a.proxy(function(a){var b=a.which;13==b&&this.webkitParagraphy()},this))),this.$element.on("drop",a.proxy(function(){setTimeout(a.proxy(function(){a("html").click(),this.$element.find(".f-img-wrap").each(function(b,c){0===a(c).find("img").length&&a(c).remove()}),this.$element.find("p:empty").remove()},this),1)},this)),this.sync()},b.prototype.webkitParagraphy=function(){this.$element.find("*").each(a.proxy(function(b,c){if(this.emptyElement(c)&&"DIV"==c.tagName&&this.options.paragraphy===!0){var d=a("<p><br/></p>");a(c).replaceWith(d),this.setSelection(d.get(0))}},this))},b.prototype.trim=function(a){return String(a).replace(/^\s+|\s+$/g,"")},b.prototype.unwrapText=function(){this.options.paragraphy||this.$element.find("div").each(function(b,c){void 0===a(c).attr("style")&&a(c).replaceWith(a(c).html()+"<br/>")})},b.prototype.wrapTextInElement=function(b){var c=[],d=["SPAN","A","B","I","EM","U","S","STRONG","STRIKE","FONT","IMG","SUB","SUP"],e=this,f=function(){if(0!==c.length){var b;b=a(e.options.paragraphy===!0?"<p>":"<div>");var d=a(c[0]);if(1==c.length&&"f-marker"==d.attr("class"))return void(c=[]);for(var f=0;f<c.length;f++){var g=a(c[f]);b.append(g.clone()),f==c.length-1?g.replaceWith(b):g.remove()}c=[]}};b.contents().filter(function(){var b=a(this);this.nodeType==Node.TEXT_NODE&&b.text().trim().length>0||d.indexOf(this.tagName)>=0?c.push(this):this.nodeType==Node.TEXT_NODE&&0===b.text().trim().length?b.remove():f()}),f(),b.find("> p, > div").each(function(b,c){0===a(c).text().trim().length&&0===a(c).find("img").length&&0===a(c).find("br").length&&a(c).append("<br/>")}),b.find("div:empty, > br").remove()},b.prototype.wrapText=function(){return this.isImage||this.isLink?!1:(this.webkitParagraphy(),void this.wrapTextInElement(this.$element))},b.prototype.setHTML=function(a,b){this.no_verify=!0,void 0===b&&(b=!0),a=this.clean(a,!0,!1),a=a.replace(/>\s+</g,"><"),this.$element.html(a),this.imageList=[],this.refreshImageList(),this.options.paragraphy&&this.wrapText(),b===!0&&(this.restoreSelectionByMarkers(),this.sync()),this.no_verify=!1,this.$element.find("span").data("fr-verified",!0)},b.prototype.breakHtml=function(b){this.removeMarkers(),this.insertHTML("<break></break>"),this.$element.find("break").remove(),this.pasting=!1,this.$element.trigger("placeholderCheck"),this.pasting=!0;var c=this.getSelectionElements()[0];if(c==this.$element.get(0))return this.insertHTML(b),!0;this.insertHTML("<break></break>");for(var d,e,f=a("<div></div>").append(a(c).clone()).html(),g=[],h={},i=[],j=0,k=0;k<f.length;k++)if(e=f.charAt(k),"<"==e){var l=f.indexOf(">",k+1);if(-1!==l){d=f.substring(k,l+1);var m=this.tagName(d);if(k=l,"break"==m){if(!this.isClosingTag(d)){for(var n=g.length-1;n>=0;n--){var o=this.tagName(g[n]);i.push("</"+o+">")}i.push(b);for(var p=0;p<g.length;p++)i.push(g[p]);i.push('<span class="f-marker" data-type="true" data-id="0" data-fr-verified="true"></span><span class="f-marker" data-type="false" data-id="0" data-fr-verified="true"></span>')}}else if(i.push(d),!this.isSelfClosingTag(d))if(this.isClosingTag(d)){var q=h[m].pop();g.splice(q,1)}else g.push(d),void 0===h[m]&&(h[m]=[]),h[m].push(g.length-1)}}else j++,i.push(e);a(c).replaceWith(i.join("")),this.restoreSelectionByMarkers()},b.prototype.beforePaste=function(){this.pasting=!0,this.saveSelection(),this.scrollPosition=a(window).scrollTop(),this.$pasteDiv=a('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; width: 0; z-index: 99999;"></div>').appendTo("body"),this.$pasteDiv.focus()},b.prototype.processPaste=function(){var b=this.$pasteDiv.html();if(this.$pasteDiv.remove(),b=b.replace(/<img /gi,'<img data-fr-image-pasted="true" '),a(window).scrollTop(this.scrollPosition),this.restoreSelection(),this.options.plainPaste)this.insertHTML(b.replace(/<(?!br\s*\/?)[^>]+>/g,""));else{var c;c=b.match(/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/gi)?this.wordClean(b):this.clean(b,!1,!0);for(var d=!1,e=a("<div>").append(c).find("*"),f=0;f<e.length;f++)if(a.Editable.VALID_NODES.indexOf(e[f].tagName)>=0){this.breakHtml(c),d=!0;break}d||this.insertHTML(c),this.$element.find("li").each(a.proxy(function(b,c){this.wrapTextInElement(a(c))},this))}this.afterPaste()},b.prototype.afterPaste=function(){this.focus(),this.uploadPastedImages(),this.sync(),this.cleanify(),this.$element.trigger("placeholderCheck"),this.pasting=!1,this.triggerEvent("afterPaste")},b.prototype.registerPaste=function(){this.$element.get(0).onpaste=a.proxy(function(b){if(!this.isHTML){if(!this.triggerEvent("beforePaste",[],!1))return!1;if(this.clipboardPaste(b))return!1;this.beforePaste(),window.setTimeout(a.proxy(this.processPaste,this),1)}},this)},b.prototype.clipboardPaste=function(b){if(b&&b.clipboardData&&b.clipboardData.items){var c=b.clipboardData.items[0].getAsFile();if(c){var d=new FileReader;return d.onload=a.proxy(function(a){var b=a.target.result;this.insertHTML('<img data-fr-image-pasted="true" src="'+b+'" />'),this.afterPaste()},this),d.readAsDataURL(c),!0}}return!1},b.prototype.uploadPastedImages=function(){this.$element.find("img[data-fr-image-pasted]").each(a.proxy(function(b,c){0===c.src.indexOf("data:")?(this.options.pastedImagesUploadURL&&(setTimeout(a.proxy(function(){this.showImageLoader(),this.$progress_bar.find("span").css("width","100%").text("Please wait!"),this.showByCoordinates(a(c).offset().left+a(c).width()/2,a(c).offset().top+a(c).height()+10),this.isDisabled=!0},this),10),a.ajax({type:this.options.pastedImagesUploadRequestType,url:this.options.pastedImagesUploadURL,data:{image:decodeURIComponent(c.src)},crossDomain:this.options.crossDomain,xhrFields:{withCredentials:this.options.withCredentials},headers:this.options.headers,dataType:"json"}).done(a.proxy(function(b){try{if(b.link){var d=new Image;d.onerror=a.proxy(function(){this.throwImageError(1)},this),d.onload=a.proxy(function(){c.src=b.link,this.hideImageLoader(),this.hide(),this.enable(),this.triggerEvent("afterUploadPastedImage",[a(c)])},this),d.src=b.link}else b.error?this.throwImageErrorWithMessage(b.error):this.throwImageError(2)}catch(e){this.throwImageError(4)}},this)).fail(a.proxy(function(){this.throwImageError(3)},this))),a(c).removeAttr("data-fr-image-pasted")):0!==c.src.indexOf("http")&&a(c).remove()},this))},b.prototype.disable=function(){this.isDisabled=!0,this.$element.blur()},b.prototype.enable=function(){this.isDisabled=!1},b.prototype.wordClean=function(a){a=a.replace(/<p(.*?)class="MsoListParagraph"([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ul><li><p>$3</p></li></ul>"),a=a.replace(/<p(.*?)class="MsoListParagraphCxSpFirst"([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ul><li><p>$3</p></li>"),a=a.replace(/<p(.*?)class="MsoListParagraphCxSpMiddle"([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li><p>$3</p></li>"),a=a.replace(/<p(.*?)class="MsoListParagraphCxSpLast"([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li><p>$3</p></li></ul>"),a=a.replace(/<span([^<]*?)style="mso-list:Ignore"([\s\S]*?)>([\s\S]*?)<span/gi,"<span><span"),a=a.replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi,""),a=a.replace(/(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/gi," "),a=a.replace(/<!--[\s\S]*?-->/gi,""),a=a.replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi,"");for(var b=["style","script","applet","embed","noframes","noscript"],c=0;c<b.length;c++){var d=new RegExp("<"+b[c]+".*?"+b[c]+"(.*?)>","gi");a=a.replace(d,"")}a=a.replace(/([\w\-]*)=("[^<>"]*"|'[^<>']*'|\w+)/gi,""),a=a.replace(/&nbsp;/gi,"");var e;do e=a,a=a.replace(/<[^\/>][^>]*><\/[^>]+>/gi,"");while(a!=e);return a},b.prototype.tabs=function(a){for(var b="",c=0;a>c;c++)b+="  ";return b},b.prototype.cleanTags=function(a,b){void 0===b&&(b=!1);var c,d,e,f,g=this.options.formatTags,h=[],i=[],j=!1;for(d=0;d<a.length;d++)if(c=a.charAt(d),"<"==c){var k=a.indexOf(">",d+1);if(-1!==k){var l=a.substring(d,k+1),m=this.tagName(l),n=this.isClosingTag(l);if("pre"===m&&(j=n?!1:!0),this.isSelfClosingTag(l))i.push("br"===m&&j?"\n":l);else if(n)for(e=!1,f=!0;e===!1&&void 0!==f;)f=h.pop(),void 0!==f&&f.tag_name!==m?i.splice(f.i,1):(e=!0,void 0!==f&&i.push(l));else i.push(l),h.push({tag_name:m,i:i.length-1});d=k}}else"\n"===c?b&&j&&i.push("<br/>"):i.push(c);for(;h.length>0;)f=h.pop(),i.splice(f.i,1);for(a="",h=0,d=0;d<i.length;d++)1==i[d].length?a+=i[d]:g.indexOf(this.tagName(i[d]).toLowerCase())<0?a+=i[d]:this.isSelfClosingTag(i[d])?a+=i[d]:this.isClosingTag(i[d])?(h-=1,a.length>0&&"\n"==a[a.length-1]&&(a+=this.tabs(h)),a+=i[d]+"\n"):(a+="\n"+this.tabs(h)+i[d],h+=1);return"\n"==a[0]&&(a=a.substring(1,a.length)),"\n"==a[a.length-1]&&(a=a.substring(0,a.length-1)),a},b.prototype.clean=function(b,c,d,e,f){f||(f=this.options.allowedAttrs),e||(e=this.options.allowedTags),c===!0&&(f.push("id"),f.push("class")),b=b.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");var g=new RegExp("<\\/?((?!(?:"+e.join("|")+"))\\w+)[^>]*?>","gi");b=b.replace(g,"");var h=new RegExp("( (?!(?:"+f.join("|")+"))\\S+)=((?:.(?!\\s+(?:\\S+)=|[>]|(\\/>)))+.)","gi");b=b.replace(h,"");var i=new RegExp('<([^>]*)(src|href)=(\'[^\']*\'|""[^""]*""|[^\\s>]+)([^>]*)>',"gi");if(b=b.replace(i,a.proxy(function(a,b,c,d,e){return"<"+b+c+'="'+this.sanitizeURL(d.replace(/^["'](.*)["']\/?$/gi,"$1"))+'"'+e+">"},this)),d){var j=new RegExp('style="[a-zA-Z0-9:;\\.\\s\\(\\)\\-\\,]*"',"gi");b=b.replace(j,"")}return b=this.cleanTags(b,!0)},b.prototype.cleanNewLine=function(a){var b=new RegExp("\\n","g");return a.replace(b,"")},b.prototype.initElementStyle=function(){this.editableDisabled||this.$element.attr("contenteditable",!0);var a="froala-element "+this.options.editorClass;this.browser.msie&&b.getIEversion()<9&&(a+=" ie8"),this.$element.css("outline",0),this.browser.msie||(a+=" not-msie"),this.$element.addClass(a)},b.prototype.initUndoRedo=function(){(this.isEnabled("undo")||this.isEnabled("redo"))&&(this.undoStack=[],this.undoIndex=0,this.saveUndoStep()),this.disableBrowserUndo()},b.prototype.enableTyping=function(){this.typingTimer=null,this.$element.on("keydown cut",a.proxy(function(){clearTimeout(this.typingTimer),this.ajaxSave=!1,this.oldHTML=this.getHTML(),this.typingTimer=setTimeout(a.proxy(function(){var a=this.getHTML();a!=this.oldHTML&&(this.saveUndoStep(),this.sync())},this),Math.max(this.options.typingTimer,200))},this))},b.prototype.removeMarkersByRegex=function(a){return a.replace(/<span[^>]*? class\s*=\s*["']?f-marker["']?[^>]+>([\S\s][^\/])*<\/span>/gi,"")},b.prototype.getImageHTML=function(){return JSON.stringify({src:this.$element.find("img").attr("src"),style:this.$element.find("img").attr("style"),alt:this.$element.find("img").attr("alt"),width:this.$element.find("img").attr("width"),link:this.$element.find("a").attr("href"),link_title:this.$element.find("a").attr("title"),link_target:this.$element.find("a").attr("target")})},b.prototype.getLinkHTML=function(){return JSON.stringify({body:this.$element.html(),href:this.$element.attr("href"),title:this.$element.attr("title"),popout:this.$element.hasClass("popout"),nofollow:"nofollow"==this.$element.attr("ref"),blank:"_blank"==this.$element.attr("target"),left:this.$element.parents(".navbar-left").length>0,"class":this.$element.attr("class").replace(/froala-element/,"").replace(/not-msie/,"").replace(/ +(?= )/g,"").split(" ").sort().join(" ")})},b.prototype.addFrTag=function(){this.$element.find("p, h1, h2, h3, h4, h5, h6, pre, blockquote, table, ul, ol, img").addClass("fr-tag")},b.prototype.getHTML=function(b,c){if(void 0===c&&(c=!1),void 0===b&&(b=!1),this.isHTML)return this.$html_area.val();if(this.isImage)return this.getImageHTML();if(this.isLink)return this.getLinkHTML();this.$element.find("a").data("fr-link",!0),c&&this.addFrTag(),this.$element.find(".f-img-editor > img").each(a.proxy(function(b,c){this.addImageClass(a(c),this.getImageClass(a(c).parent().attr("class")))},this)),this.$element.find("pre").each(a.proxy(function(b,c){var d=a(c),e=d.html(),f=e.replace(/\&nbsp;/gi," ");e!=f&&(this.saveSelectionByMarkers(),d.html(f),this.restoreSelectionByMarkers())},this));var d=this.$element.html();return this.$element.find(".f-img-editor > img").removeClass("fr-fin fr-fil fr-fir"),this.$element.find("p, h1, h2, h3, h4, h5, h6, pre, blockquote, table, ul, ol, img").removeClass("fr-tag"),d=this.syncCleanHTML(d,b),d=d.replace(/<a[^>]*?><\/a>/g,""),b||(d=this.removeMarkersByRegex(d)),d=d.replace(/<span[^>]*? class\s*=\s*["']?f-img-handle[^>]+><\/span>/gi,""),d=d.replace(/^([\S\s]*)<span[^>]*? class\s*=\s*["']?f-img-editor[^>]+>([\S\s]*)<\/span>([\S\s]*)$/gi,"$1$2$3"),d=d.replace(/^([\S\s]*)<span[^>]*? class\s*=\s*["']?f-img-wrap[^>]+>([\S\s]*)<\/span>([\S\s]*)$/gi,"$1$2$3"),d=d.replace(/\&amp;/gi,"&"),this.options.simpleAmpersand&&(d=d.replace(/\&amp;/gi,"&")),d=d.replace(/ data-fr-verified="true"/gi,""),d=d.replace(/\n/gi,""),d=d.replace(/\u200B/gi,"")},b.prototype.getText=function(){return this.$element.text()},b.prototype.initAjaxSaver=function(){this.ajaxHTML=this.getHTML(),this.ajaxSave=!0,this.ajaxInterval=setInterval(a.proxy(function(){var a=this.getHTML();this.ajaxHTML!=a&&this.ajaxSave&&(this.options.autosave&&this.save(),this.ajaxHTML=a),this.ajaxSave=!0},this),Math.max(this.options.autosaveInterval,100))},b.prototype.disableBrowserUndo=function(){a("body").keydown(function(a){var b=a.which,c=(a.ctrlKey||a.metaKey)&&!a.altKey;if(!this.isHTML&&c){if(75==b)return a.preventDefault(),!1;if(90==b&&a.shiftKey)return a.preventDefault(),!1;if(90==b)return a.preventDefault(),!1}})},b.prototype.saveUndoStep=function(){if(this.isEnabled("undo")||this.isEnabled("redo")){for(;this.undoStack.length>this.undoIndex;)this.undoStack.pop();var a=this.getHTML(!0);if(this.undoStack[this.undoIndex-1]&&this.removeMarkersByRegex(this.undoStack[this.undoIndex-1])==a)return!1;this.selectionInEditor()&&this.$element.is(":focus")&&this.saveSelectionByMarkers(),this.undoStack.push(this.getHTML(!0)),this.undoIndex++,this.selectionInEditor()&&this.$element.is(":focus")&&this.restoreSelectionByMarkers(!1),this.refreshUndoRedo()}},b.prototype.initShortcuts=function(){this.options.shortcuts&&this.$element.on("keydown",a.proxy(function(a){var b=a.which,c=(a.ctrlKey||a.metaKey)&&!a.altKey;if(!this.isHTML&&c){if(70==b)return this.show(null),!1;if(66==b)return this.execDefaultShortcut("bold");if(73==b)return this.execDefaultShortcut("italic");if(85==b)return this.execDefaultShortcut("underline");if(75==b)return this.execDefaultShortcut("createLink");if(80==b)return this.repositionEditor(),this.execDefaultShortcut("insertImage");if(65==b)return this.execDefaultShortcut("selectAll");if(221==b)return this.execDefaultShortcut("indent");if(219==b)return this.execDefaultShortcut("outdent");if(72==b)return this.execDefaultShortcut("html");if(48==b)return this.execDefaultShortcut("formatBlock","n");if(49==b)return this.execDefaultShortcut("formatBlock","h1");if(50==b)return this.execDefaultShortcut("formatBlock","h2");if(51==b)return this.execDefaultShortcut("formatBlock","h3");if(52==b)return this.execDefaultShortcut("formatBlock","h4");if(53==b)return this.execDefaultShortcut("formatBlock","h5");if(54==b)return this.execDefaultShortcut("formatBlock","h6");if(222==b)return this.execDefaultShortcut("formatBlock","blockquote");if(220==b)return this.execDefaultShortcut("formatBlock","pre");if(83==b)return this.execDefaultShortcut("strikeThrough");if(90==b&&a.shiftKey)return this.redo(),a.stopPropagation(),!1;if(90==b)return this.undo(),a.stopPropagation(),!1}},this))},b.prototype.initTabs=function(){this.$element.on("keydown",a.proxy(function(a){var b,c=a.which;if(9!=c||a.shiftKey)9==c&&a.shiftKey&&(this.raiseEvent("shift+tab")?(b=this.currentCell(),this.options.tabSpaces&&!b?a.preventDefault():b&&this.prevCell()&&(a.preventDefault(),this.setSelection(this.prevCell()))):a.preventDefault());else if(this.raiseEvent("tab"))if(b=this.currentCell(),this.options.tabSpaces&&!b){a.preventDefault();var d="&nbsp;&nbsp;&nbsp;&nbsp;",e=this.getSelectionElements()[0];"PRE"===e.tagName&&(d="    "),this.insertHTML(d,!1)}else b&&this.nextCell()&&(a.preventDefault(),this.setSelection(this.nextCell()));else a.preventDefault()},this))},b.prototype.textEmpty=function(b){var c=a(b).text().replace(/(\r\n|\n|\r|\t)/gm,"");return(""===c||b===this.$element.get(0))&&0===a(b).find("br").length},b.prototype.focus=function(a){if(void 0===a&&(a=!0),""!==this.text())return void this.$element.focus();if(!this.isHTML){a&&!this.pasting&&this.$element.focus(),this.pasting&&!this.$element.is(":focus")&&this.$element.focus();var c=this.getRange();if(""===this.text()&&c&&(0===c.startOffset||c.startContainer===this.$element.get(0))){var d,e,f=this.getSelectionElements();if(f.length>=1&&f[0]!==this.$element.get(0))for(d=0;d<f.length;d++)if(e=f[d],!this.textEmpty(e))return void this.setSelection(e);for(f=this.$element.find(b.VALID_NODES.join(",")),d=0;d<f.length;d++)if(e=f[d],!this.textEmpty(e))return void this.setSelection(e);this.setSelection(this.$element.get(0))}}},b.prototype.insertHTML=function(a,b){void 0===b&&(b=!0),!this.isHTML&&b&&this.focus();var c,d;if(window.getSelection){if(c=window.getSelection(),c.getRangeAt&&c.rangeCount){d=c.getRangeAt(0),d.deleteContents();var e=document.createElement("div");e.innerHTML=a;for(var f,g,h=document.createDocumentFragment();f=e.firstChild;)g=h.appendChild(f);d.insertNode(h),g&&(d=d.cloneRange(),d.collapse(!1),c.removeAllRanges(),c.addRange(d))}}else if((c=document.selection)&&"Control"!=c.type){var i=c.createRange();i.collapse(!0),c.createRange().pasteHTML(a),selectPastedContent&&(d=c.createRange(),d.setEndPoint("StartToStart",i),d.select())}},b.prototype.execDefaultShortcut=function(a,b){return this.isEnabled(a)?(this.exec(a,b),!1):!0},b.prototype.initEditor=function(){var c="froala-editor";this.isTouch()&&(c+=" touch"),this.browser.msie&&b.getIEversion()<9&&(c+=" ie8"),this.$editor=a('<div class="'+c+'" style="display: none;">'),a("body").append(this.$editor),this.options.inlineMode?this.initInlineEditor():this.initBasicEditor()},b.prototype.toolbarTop=function(){a(window).on("scroll resize",a.proxy(function(){this.options.toolbarFixed||this.options.inlineMode||(a(window).scrollTop()>this.$box.offset().top&&a(window).scrollTop()<this.$box.offset().top+this.$box.height()?(this.$editor.addClass("f-scroll"),this.$box.css("padding-top",this.$editor.height()),this.$editor.css("top",a(window).scrollTop()-this.$box.offset().top)):a(window).scrollTop()<this.$box.offset().top&&(this.$editor.removeClass("f-scroll"),this.$box.css("padding-top",""),this.$editor.css("top","")))},this))},b.prototype.initBasicEditor=function(){this.$element.addClass("f-basic"),this.$popup_editor=this.$editor.clone(),this.$popup_editor.appendTo(a("body")),this.$editor.addClass("f-basic").show(),this.$editor.insertBefore(this.$element),this.toolbarTop()},b.prototype.initInlineEditor=function(){this.$popup_editor=this.$editor},b.prototype.initDrag=function(){this.drag_support={filereader:"undefined"!=typeof FileReader,formdata:!!window.FormData,progress:"upload"in new XMLHttpRequest}},b.prototype.initOptions=function(){this.setDimensions(),this.editableDisabled||(this.setPlaceholder(),this.setPlaceholderEvents()),this.setSpellcheck(),this.setImageUploadURL(),this.setButtons(),this.setDirection(),this.setTextNearImage(),this.setZIndex(),this.setTheme(),this.options.editInPopup&&this.buildEditPopup()},b.prototype.isTouch=function(){return WYSIWYGModernizr.touch&&void 0!==window.Touch},b.prototype.initEditorSelection=function(){a(window).on("hide."+this._id,a.proxy(function(){this.isResizing()||this.hide(!1)},this)),this.$element.on("focus",a.proxy(function(){this.blurred&&(this.blurred=!1,this.triggerEvent("focus",[],!1))},this)),this.$element.on("mousedown touchstart",a.proxy(function(){return this.isDisabled?!1:void(this.isResizing()||(this.closeImageMode(),this.hide()))},this)),this.options.disableRightClick&&this.$element.contextmenu(a.proxy(function(a){return a.preventDefault(),this.options.inlineMode&&this.$element.focus(),!1},this)),this.$element.on("mouseup touchend",a.proxy(function(b){if(this.isDisabled)return!1;if(!this.isResizing()){var c=this.text();b.stopPropagation(),!(""!==c||this.options.alwaysVisible||this.options.editInPopup||(3==b.which||2==b.button)&&this.options.inlineMode&&!this.isImage&&this.options.disableRightClick)||this.link||this.imageMode?this.options.inlineMode||this.refreshButtons():setTimeout(a.proxy(function(){c=this.text(),!(""!==c||this.options.alwaysVisible||this.options.editInPopup||(3==b.which||2==b.button)&&this.options.inlineMode&&!this.isImage&&this.options.disableRightClick)||this.link||this.imageMode||(this.show(b),this.options.editInPopup&&this.showEditPopup())},this),0),this.imageMode=!1}},this)),this.$editor.on("mouseup",a.proxy(function(a){return this.isDisabled?!1:void(this.isResizing()||(a.stopPropagation(),this.options.inlineMode===!1&&this.hide()))},this)),this.$editor.on("mousedown",".fr-dropdown-menu",a.proxy(function(a){return this.isDisabled?!1:(a.stopPropagation(),void(this.noHide=!0))},this)),this.$popup_editor.on("mousedown",".fr-dropdown-menu",a.proxy(function(a){return this.isDisabled?!1:(a.stopPropagation(),void(this.noHide=!0))},this)),this.$popup_editor.on("mouseup",a.proxy(function(a){return this.isDisabled?!1:void(this.isResizing()||a.stopPropagation())},this)),this.$edit_popup_wrapper&&this.$edit_popup_wrapper.on("mouseup",a.proxy(function(a){return this.isDisabled?!1:void(this.isResizing()||a.stopPropagation())},this)),this.setDocumentSelectionChangeEvent(),this.setWindowMouseUpEvent(),this.setWindowKeyDownEvent(),this.setWindowKeyUpEvent(),this.setWindowOrientationChangeEvent(),this.options.trackScroll&&this.setWindowScrollEvent()},b.prototype.setWindowOrientationChangeEvent=function(){a(window).on("orientationchange."+this._id,a.proxy(function(){setTimeout(a.proxy(function(){this.hide()},this),10)},this)),a(window).on("orientationchange",function(b){a(window).trigger("orientationchange."+this._id,[b])})},b.prototype.setDocumentSelectionChangeEvent=function(){a(document).on("selectionchange."+this._id,a.proxy(function(b){return this.isDisabled?!1:void(this.isResizing()||this.isScrolling||(clearTimeout(this.selectionChangedTimeout),this.selectionChangedTimeout=setTimeout(a.proxy(function(){if(this.options.inlineMode&&this.selectionInEditor()&&this.link!==!0&&this.isTouch()){var a=this.text();""!==a?(this.iPhone()||this.iPod()?this.hide():this.show(null),b.stopPropagation()):(this.hide(),this.closeImageMode(),this.imageMode=!1)}},this),75)))},this)),a(document).on("selectionchange",function(b){a(document).trigger("selectionchange."+this._id,[b])})},b.prototype.setWindowMouseUpEvent=function(){a(window).on("mouseup."+this._id,a.proxy(function(){return this.isDisabled?!1:void(this.isResizing()||this.isScrolling||(this.$bttn_wrapper.find("button[data-cmd]").removeClass("active"),this.selectionInEditor()&&""!==this.text()&&!this.isTouch()?this.show(null):this.$popup_editor.is(":visible")&&(this.hide(),this.closeImageMode(),this.imageMode=!1),this.blurred||this.pasting||(this.selectionDisabled=!0,this.triggerEvent("blur",[]),this.clearSelection(),this.selectionDisabled=!1,this.blurred=!0)))},this)),a(window).on("mouseup",a.proxy(function(){a(window).trigger("window."+this._id)
},this))},b.prototype.setWindowKeyDownEvent=function(){a(window).bind("keydown."+this._id,a.proxy(function(a){if(this.isDisabled)return!0;var b=a.which;if(this.imageMode){if(13==b)return this.$element.find(".f-img-editor").parents(".f-img-wrap").before("<br/>"),this.sync(),this.$element.find(".f-img-editor img").click(),!1;if(46==b||8==b)return this.removeImage(this.$element.find(".f-img-editor")),!1}var c=(a.ctrlKey||a.metaKey)&&!a.altKey;!c&&this.$popup_editor.is(":visible")&&(27==b||this.$bttn_wrapper.is(":visible")&&this.options.inlineMode)&&(this.hide(),this.closeImageMode())},this)),a(window).bind("keydown",function(b){a(window).trigger("keydown."+this._id,[b])})},b.prototype.setWindowKeyUpEvent=function(){a(window).bind("keyup."+this._id,a.proxy(function(){return this.isDisabled?!1:void(this.selectionInEditor()&&""!==this.text()&&!this.$popup_editor.is(":visible")&&this.repositionEditor())},this)),a(window).bind("keyup",function(b){a(window).trigger("keyup."+this._id,[b])})},b.prototype.setWindowScrollEvent=function(){a(window).bind("scroll."+this._id,a.proxy(function(){return this.isDisabled?!1:(clearTimeout(this.scrollTimer),this.isScrolling=!0,void(this.scrollTimer=setTimeout(a.proxy(function(){this.isScrolling=!1},this),2500)))},this)),a(window).on("scroll",a.proxy(function(){a(window).trigger("scroll."+this._id)},this))},b.prototype.setTextNearImage=function(a){void 0!==a&&(this.options.textNearImage=a),this.options.textNearImage===!0?this.$element.removeClass("f-tni"):this.$element.addClass("f-tni")},b.prototype.setPlaceholder=function(a){a&&(this.options.placeholder=a),this.$textarea&&this.$textarea.attr("placeholder",this.options.placeholder),this.$element.attr("data-placeholder",this.options.placeholder)},b.prototype.isEmpty=function(){var a=this.$element.text().replace(/(\r\n|\n|\r|\t|\u0020)/gm,"");return""===a&&0===this.$element.find("img, table, iframe, input").length&&0===this.$element.find("p > br, div > br").length&&0===this.$element.find("li, h1, h2, h3, h4, h5, h6, blockquote, pre").length},b.prototype.fakeEmpty=function(a){void 0===a&&(a=this.$element);var b=a.text().replace(/(\r\n|\n|\r|\t)/gm,"");return""===b&&1==a.find("p, div").length&&1==a.find("p > br, div > br").length&&0===a.find("img, table, iframe, input").length},b.prototype.setPlaceholderEvents=function(){this.$element.on("focus",a.proxy(function(){return this.isDisabled?!1:void(""!==this.$element.text()||this.pasting||this.focus(!1))},this)),this.$element.on("keyup keydown focus placeholderCheck",a.proxy(function(){if(this.isDisabled)return!1;if(this.pasting)return!1;if(!this.isHTML)if(this.isEmpty()&&!this.fakeEmpty()){var c,d=this.selectionInEditor()||this.$element.is(":focus");this.options.paragraphy?(c=a("<p><br/></p>"),this.$element.html(c),d&&this.setSelection(c.get(0)),this.$element.addClass("f-placeholder")):this.$element.addClass("f-placeholder")}else!this.$element.find("p").length&&this.options.paragraphy?(this.wrapText(),this.$element.find("p, div").length&&""===this.text()?this.setSelection(this.$element.find("p, div")[0],this.$element.find("p, div").text().length,null,this.$element.find("p, div").text().length):this.$element.removeClass("f-placeholder")):this.fakeEmpty()===!1||this.$element.find(b.VALID_NODES.join(",")).length>1?this.$element.removeClass("f-placeholder"):this.$element.addClass("f-placeholder")},this)),this.$element.trigger("placeholderCheck")},b.prototype.setDimensions=function(a,b,c,d){a&&(this.options.height=a),b&&(this.options.width=b),c&&(this.options.minHeight=c),d&&(this.options.maxHeight=d),"auto"!=this.options.height&&this.$element.css("height",this.options.height),"auto"!=this.options.minHeight&&this.$element.css("minHeight",this.options.minHeight),"auto"!=this.options.maxHeight&&this.$element.css("maxHeight",this.options.maxHeight),"auto"!=this.options.width&&this.$box.css("width",this.options.width)},b.prototype.setDirection=function(a){a&&(this.options.direction=a),"ltr"!=this.options.direction&&"rtl"!=this.options.direction&&(this.options.direction="ltr"),"rtl"==this.options.direction?(this.$element.addClass("f-rtl"),this.$editor.addClass("f-rtl"),this.$popup_editor.addClass("f-rtl"),this.$image_modal&&this.$image_modal.addClass("f-rtl")):(this.$element.removeClass("f-rtl"),this.$editor.removeClass("f-rtl"),this.$popup_editor.removeClass("f-rtl"),this.$image_modal&&this.$image_modal.removeClass("f-rtl"))},b.prototype.setZIndex=function(a){a&&(this.options.zIndex=a),this.$editor.css("z-index",this.options.zIndex),this.$popup_editor.css("z-index",this.options.zIndex+1),this.$overlay&&this.$overlay.css("z-index",this.options.zIndex+2),this.$image_modal&&this.$image_modal.css("z-index",this.options.zIndex+3)},b.prototype.setTheme=function(a){a&&(this.options.theme=a),null!=this.options.theme&&(this.$editor.addClass(this.options.theme+"-theme"),this.$popup_editor.addClass(this.options.theme+"-theme"),this.$box&&this.$box.addClass(this.options.theme+"-theme"),this.$image_modal&&this.$image_modal.addClass(this.options.theme+"-theme"))},b.prototype.setSpellcheck=function(a){void 0!==a&&(this.options.spellcheck=a),this.$element.attr("spellcheck",this.options.spellcheck)},b.prototype.customizeText=function(b){if(b){var c=this.$editor.find("[title]").add(this.$popup_editor.find("[title]"));this.$image_modal&&(c=c.add(this.$image_modal.find("[title]"))),c.each(a.proxy(function(c,d){for(var e in b)a(d).attr("title").toLowerCase()==e.toLowerCase()&&a(d).attr("title",b[e])},this)),c=this.$editor.find('[data-text="true"]').add(this.$popup_editor.find('[data-text="true"]')),this.$image_modal&&(c=c.add(this.$image_modal.find('[data-text="true"]'))),c.each(a.proxy(function(c,d){for(var e in b)a(d).text().toLowerCase()==e.toLowerCase()&&a(d).text(b[e])},this))}},b.prototype.setLanguage=function(b){void 0!==b&&(this.options.language=b),a.Editable.LANGS[this.options.language]&&(this.customizeText(a.Editable.LANGS[this.options.language].translation),a.Editable.LANGS[this.options.language].direction&&this.setDirection(a.Editable.LANGS[this.options.language].direction),a.Editable.LANGS[this.options.language].translation[this.options.placeholder]&&this.setPlaceholder(a.Editable.LANGS[this.options.language].translation[this.options.placeholder]))},b.prototype.setCustomText=function(a){a&&(this.options.customText=a),this.options.customText&&this.customizeText(this.options.customText)},b.prototype.execHTML=function(){this.html()},b.prototype.initHTMLArea=function(){this.$html_area=a('<textarea wrap="hard">').keydown(function(b){var c=b.keyCode||b.which;if(9==c){b.preventDefault();var d=a(this).get(0).selectionStart,e=a(this).get(0).selectionEnd;a(this).val(a(this).val().substring(0,d)+"	"+a(this).val().substring(e)),a(this).get(0).selectionStart=a(this).get(0).selectionEnd=d+1}}).focus(a.proxy(function(){this.blurred&&(this.blurred=!1,this.triggerEvent("focus",[],!1))},this)).mouseup(a.proxy(function(){this.blurred&&(this.blurred=!1,this.triggerEvent("focus",[],!1))},this))},b.prototype.command_dispatcher={align:function(a){var b=this.buildDropdownAlign(a),c=this.buildDropdownButton(a,b,"fr-selector");this.$bttn_wrapper.append(c)},formatBlock:function(a){var b=this.buildDropdownFormatBlock(a),c=this.buildDropdownButton(a,b);this.$bttn_wrapper.append(c)},undo:function(a){var b=this.buildDefaultButton(a);this.$bttn_wrapper.append(b)},redo:function(a){var b=this.buildDefaultButton(a);this.$bttn_wrapper.append(b)},html:function(b){var c=this.buildDefaultButton(b);this.$bttn_wrapper.append(c),this.options.inlineMode&&this.$box.append(a(c).clone(!0).addClass("html-switch").attr("title","Hide HTML").click(a.proxy(this.execHTML,this))),this.initHTMLArea()}},b.prototype.setButtons=function(a){a&&(this.options.buttons=a),this.$editor.append('<div class="bttn-wrapper" id="bttn-wrapper-'+this._id+'">'),this.$bttn_wrapper=this.$editor.find("#bttn-wrapper-"+this._id),this.isTouch()&&this.$bttn_wrapper.addClass("touch");for(var c,d,e=0;e<this.options.buttons.length;e++){var f=this.options.buttons[e];if("sep"!=f){var g=b.commands[f];if(void 0!==g){g.cmd=f;var h=this.command_dispatcher[g.cmd];h?h.apply(this,[g]):(g.seed?(c=this.buildDefaultDropdown(g),d=this.buildDropdownButton(g,c)):d=this.buildDefaultButton(g),this.$bttn_wrapper.append(d))}else{if(g=this.options.customButtons[f],void 0===g){if(g=this.options.customDropdowns[f],void 0===g)continue;d=this.buildCustomDropdown(g,f),this.$bttn_wrapper.append(d);continue}d=this.buildCustomButton(g,f),this.$bttn_wrapper.append(d)}}else this.$bttn_wrapper.append(this.options.inlineMode?'<div class="f-clear"></div><hr/>':'<span class="f-sep"></span>')}this.$bttn_wrapper.find('button[data-cmd="undo"], button[data-cmd="redo"]').prop("disabled",!0),this.bindButtonEvents()},b.prototype.buildDefaultButton=function(a){var b='<button type="button" class="fr-bttn" title="'+a.title+'" data-cmd="'+a.cmd+'">';return b+=void 0===this.options.icons[a.cmd]?this.addButtonIcon(a):this.prepareIcon(this.options.icons[a.cmd],a.title),b+="</button>"},b.prototype.prepareIcon=function(a,b){switch(a.type){case"font":return this.addButtonIcon({icon:a.value});case"img":return this.addButtonIcon({icon_img:a.value,title:b});case"txt":return this.addButtonIcon({icon_txt:a.value})}},b.prototype.addButtonIcon=function(a){return a.icon?'<i class="'+a.icon+'"></i>':a.icon_alt?'<i class="for-text">'+a.icon_alt+"</i>":a.icon_img?'<img src="'+a.icon_img+'" alt="'+a.title+'"/>':a.icon_txt?"<i>"+a.icon_txt+"</i>":a.title},b.prototype.buildCustomButton=function(b,c){var d=a('<button type="button" class="fr-bttn" data-name="'+c+'" title="'+b.title+'">'+this.prepareIcon(b.icon,b.title)+"</button>");return d.on("click touchend",a.proxy(function(a){a.stopPropagation(),a.preventDefault(),b.callback.apply(this)},this)),d},b.prototype.callDropdown=function(b,c,d){b.on("click touch",a.proxy(function(){c.options[d].apply(this)},this))},b.prototype.buildCustomDropdown=function(b,c){var d='<div class="fr-bttn fr-dropdown">';d+='<button type="button" class="fr-trigger" title="'+b.title+'" data-name="'+c+'">'+this.prepareIcon(b.icon,b.title)+"</button>";var e=a('<ul class="fr-dropdown-menu"></ul>');for(var f in b.options){var g=a('<a href="#">'+f+"</a>"),h=a("<li>").append(g);this.callDropdown(g,b,f),e.append(h)}return a(d).append(e)},b.prototype.buildDropdownButton=function(a,b,c){c=c||"";var d='<div class="fr-bttn fr-dropdown '+c+'" data-name="'+a.cmd+'">',e='<button type="button" class="fr-trigger" title="'+a.title+'">'+this.addButtonIcon(a)+"</button>";return d+=e,d+=b,d+="</div>"},b.prototype.buildDropdownAlign=function(a){for(var b='<ul class="fr-dropdown-menu f-align">',c=0;c<a.seed.length;c++){var d=a.seed[c];b+='<li data-cmd="'+d.cmd+'" title="'+d.title+'"><a href="#"><i class="'+d.icon+'"></i></a></li>'}return b+="</ul>"},b.prototype.buildDropdownFormatBlock=function(b){for(var c='<ul class="fr-dropdown-menu">',d=0;d<b.seed.length;d++){var e=b.seed[d];if(-1!=a.inArray(e.value,this.options.blockTags)){var f='<li data-cmd="'+b.cmd+'" data-val="'+e.value+'">';f+='<a href="#" data-text="true" class="format-'+e.value+'" title="'+e.title+'">'+e.title+"</a></li>",c+=f}}return c+="</ul>"},b.prototype.buildDefaultDropdown=function(a){for(var b='<ul class="fr-dropdown-menu">',c=0;c<a.seed.length;c++){var d=a.seed[c],e='<li data-cmd="'+(d.cmd||a.cmd)+'" data-val="'+d.value+'" data-param="'+(d.param||a.param)+'">';e+='<a href="#" data-text="true" class="'+d.value+'" title="'+d.title+'">'+d.title+"</a></li>",b+=e}return b+="</ul>"},b.prototype.createEditPopupHTML=function(){var a='<div class="froala-popup froala-text-popup" style="display:none;">';return a+='<h4><span data-text="true">Edit text</span><i title="Cancel" class="fa fa-times" id="f-text-close-'+this._id+'"></i></h4></h4>',a+='<div class="f-popup-line"><input type="text" placeholder="http://www.example.com" class="f-lu" id="f-ti-'+this._id+'">',a+='<button data-text="true" type="button" class="f-ok" id="f-edit-popup-ok-'+this._id+'">OK</button>',a+="</div>",a+="</div>"},b.prototype.buildEditPopup=function(){this.$edit_popup_wrapper=a(this.createEditPopupHTML()),this.$popup_editor.append(this.$edit_popup_wrapper),this.$edit_popup_wrapper.find("#f-ti-"+this._id).on("mouseup keydown",function(a){a.stopPropagation()}),this.addListener("hidePopups",a.proxy(function(){this.$edit_popup_wrapper.hide()},this)),this.$edit_popup_wrapper.on("click","#f-edit-popup-ok-"+this._id,a.proxy(function(){this.$element.text(this.$edit_popup_wrapper.find("#f-ti-"+this._id).val()),this.sync(),this.hide()},this)),this.$edit_popup_wrapper.on("click","i#f-text-close-"+this._id,a.proxy(function(){this.hide()},this))},b.prototype.createCORSRequest=function(a,b){var c=new XMLHttpRequest;if("withCredentials"in c){c.open(a,b,!0),this.options.withCredentials&&(c.withCredentials=!0);for(var d in this.options.headers)c.setRequestHeader(d,this.options.headers[d])}else"undefined"!=typeof XDomainRequest?(c=new XDomainRequest,c.open(a,b)):c=null;return c},b.prototype.isEnabled=function(b){return a.inArray(b,this.options.buttons)>=0},b.prototype.bindButtonEvents=function(){this.bindDropdownEvents(),this.bindCommandEvents()},b.prototype.canTouch=function(b){var c=b.currentTarget;return"touchend"==b.type&&a(c).data("touched",!0),"mouseup"==b.type&&1!=b.which?!1:"mouseup"==b.type&&a(c).data("touched")?!1:!0},b.prototype.bindDropdownEvents=function(){var b=this;this.$bttn_wrapper.on("mouseup touchend",".fr-dropdown .fr-trigger:not([disabled])",function(c){return b.isDisabled?!1:(c.stopPropagation(),c.preventDefault(),b.canTouch(c)?("touchend"==c.type&&b.android()&&(b.saveSelectionByMarkers(),setTimeout(function(){b.restoreSelectionByMarkers()},10)),b.options.inlineMode===!1&&b.hide(),a(this).toggleClass("active").trigger("blur"),b.closeImageMode(),b.refreshButtons(),b.imageMode=!1,void b.$bttn_wrapper.find(".fr-dropdown").not(a(this).parent()).find(".fr-trigger").removeClass("active")):!1)}),a(window).on("mouseup selectionchange",a.proxy(function(){return this.isDisabled?!1:void this.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active")},this)),this.$element.on("mouseup","img, a",a.proxy(function(){return this.isDisabled?!1:void this.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active")},this)),this.$bttn_wrapper.find(".fr-selector button.fr-bttn").bind("select",function(){return this.isDisabled?!1:void a(this).parents(".fr-selector").find(" > button > i").attr("class",a(this).find("i").attr("class"))}).on("click touch",function(){return this.isDisabled?!1:(a(this).parents("ul").find("button").removeClass("active"),a(this).parents(".fr-selector").removeClass("active").trigger("mouseout"),void a(this).trigger("select"))}),this.$bttn_wrapper.on("click","li[data-cmd] > a",function(a){a.preventDefault()})},b.prototype.bindCommandEvents=function(){var b=this;this.$bttn_wrapper.on("mouseup touchend touchmove","button[data-cmd], li[data-cmd], span[data-cmd], a[data-cmd]",a.proxy(function(c){if(b.isDisabled)return!1;var d=c.currentTarget;if(this.iOS()&&"mouseup"===c.type)return!0;if("touchmove"!=c.type){if(c.stopPropagation(),c.preventDefault(),!this.canTouch(c))return!1;if(a(d).data("dragging"))return a(d).removeData("dragging"),!1;var e=a(d).data("cmd"),f=a(d).data("val"),g=a(d).data("param");"touchend"==c.type&&b.android()&&this.saveSelectionByMarkers(),b.exec(e,f,g),b.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active"),"touchend"==c.type&&b.android()&&this.restoreSelectionByMarkers()}else a(d).data("dragging",!0)},this))},b.prototype.undo=function(){if(this.undoIndex>1){var a=this.getHTML(),b=this.undoStack[--this.undoIndex-1];this.$element.html(b),this.restoreSelectionByMarkers(),this.triggerEvent("undo",[this.getHTML(),a]),""!==this.text()?this.repositionEditor():this.hide(),this.refreshUndoRedo(),this.focus(),this.refreshButtons()}},b.prototype.redo=function(){if(this.undoIndex<this.undoStack.length){var a=this.$element.html(),b=this.undoStack[this.undoIndex++];this.$element.html(b),this.restoreSelectionByMarkers(),this.triggerEvent("redo",[this.getHTML(),a]),""!==this.text()?this.repositionEditor():this.hide(),this.refreshUndoRedo(),this.focus(),this.refreshButtons()}},b.prototype.save=function(){if(!this.triggerEvent("beforeSave",[],!1))return!1;if(this.options.saveURL){var b={};for(var c in this.options.saveParams){var d=this.options.saveParams[c];b[c]="function"==typeof d?d.call(this):d}a.ajax({type:this.options.saveRequestType,url:this.options.saveURL,data:a.extend({body:this.getHTML()},this.options.saveParams),crossDomain:this.options.crossDomain,xhrFields:{withCredentials:this.options.withCredentials},headers:this.options.headers}).done(a.proxy(function(a){this.triggerEvent("afterSave",[a])},this)).fail(a.proxy(function(){this.triggerEvent("saveError",["Save request failed on the server."])},this))}else this.triggerEvent("saveError",["Missing save URL."])},b.prototype.sanitizeURL=function(a){if(/^https?:\/\//.test(a)){a=String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");var b=/\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;if(!b.test(a))return""}else a=encodeURIComponent(a).replace(/%23/g,"#").replace(/%2F/g,"/").replace(/%25/g,"%").replace(/mailto%3A/g,"mailto:").replace(/data%3A/g,"data:").replace(/webkit-fake-url%3A/g,"webkit-fake-url:").replace(/%3F/g,"?").replace(/%3D/g,"=").replace(/%26/g,"&").replace(/%2C/g,",").replace(/%3B/g,";").replace(/%2B/g,"+").replace(/%40/g,"@");return a},b.prototype.option=function(b,c){if(void 0===b)return this.options;if(b instanceof Object)this.options=a.extend({},this.options,b),this.initOptions(),this.setCustomText(),this.setLanguage();else{if(void 0===c)return this.options[b];switch(this.options[b]=c,b){case"direction":this.setDirection();break;case"height":case"width":case"minHeight":case"maxHeight":this.setDimensions();break;case"spellcheck":this.setSpellcheck();break;case"placeholder":this.setPlaceholder();break;case"customText":this.setCustomText();break;case"language":this.setLanguage();break;case"textNearImage":this.setTextNearImage();break;case"zIndex":this.setZIndex();break;case"theme":this.setTheme()}}};var c=a.fn.editable;a.fn.editable=function(c){for(var d=[],e=0;e<arguments.length;e++)d.push(arguments[e]);if("string"==typeof c){var f=[];return this.each(function(){var b=a(this),e=b.data("fa.editable");if(!e[c])return a.error("Method "+c+" does not exist in Froala Editor.");var g=e[c].apply(e,d.slice(1));void 0===g?f.push(this):0===f.length&&f.push(g)}),1==f.length?f[0]:f}return"object"!=typeof c&&c?void 0:this.each(function(){var d=this,e=a(d),f=e.data("fa.editable");f||e.data("fa.editable",f=new b(d,c))})},a.fn.editable.Constructor=b,a.Editable=b,a.fn.editable.noConflict=function(){return a.fn.editable=c,this}}(window.jQuery),function(a){a.Editable.commands={bold:{title:"Bold",icon:"fa fa-bold",shortcut:"(Ctrl + B)"},italic:{title:"Italic",icon:"fa fa-italic",shortcut:"(Ctrl + I)"},underline:{cmd:"underline",title:"Underline",icon:"fa fa-underline",shortcut:"(Ctrl + U)"},strikeThrough:{title:"Strikethrough",icon:"fa fa-strikethrough"},subscript:{title:"Subscript",icon:"fa fa-subscript"},superscript:{title:"Superscript",icon:"fa fa-superscript"},formatBlock:{title:"Format Block",icon:"fa fa-paragraph",seed:[{value:"n",title:"Normal"},{value:"p",title:"Paragraph"},{value:"pre",title:"Code"},{value:"blockquote",title:"Quote"},{value:"h1",title:"Heading 1"},{value:"h2",title:"Heading 2"},{value:"h3",title:"Heading 3"},{value:"h4",title:"Heading 4"},{value:"h5",title:"Heading 5"},{value:"h6",title:"Heading 6"}]},align:{title:"Alignment",icon:"fa fa-align-center",seed:[{cmd:"justifyLeft",title:"Align Left",icon:"fa fa-align-left"},{cmd:"justifyCenter",title:"Align Center",icon:"fa fa-align-center"},{cmd:"justifyRight",title:"Align Right",icon:"fa fa-align-right"},{cmd:"justifyFull",title:"Justify",icon:"fa fa-align-justify"}]},outdent:{title:"Indent Less",icon:"fa fa-dedent",activeless:!0,shortcut:"(Ctrl + <)"},indent:{title:"Indent More",icon:"fa fa-indent",activeless:!0,shortcut:"(Ctrl + >)"},selectAll:{title:"Select All",icon:"fa fa-file-text",shortcut:"(Ctrl + A)"},createLink:{title:"Insert Link",icon:"fa fa-link",shortcut:"(Ctrl + K)"},insertImage:{title:"Insert Image",icon:"fa fa-picture-o",activeless:!0,shortcut:"(Ctrl + P)"},undo:{title:"Undo",icon:"fa fa-undo",activeless:!0,shortcut:"(Ctrl+Z)",disabled:function(){return!0}},redo:{title:"Redo",icon:"fa fa-repeat",activeless:!0,shortcut:"(Shift+Ctrl+Z)",disabled:function(){return!0}},html:{title:"Show HTML",icon:"fa fa-code"},save:{title:"Save",icon:"fa fa-floppy-o"},insertHorizontalRule:{title:"Insert Horizontal Line",icon:"fa fa-minus"}},a.Editable.prototype.execCommand={formatBlock:function(a,b){this.formatBlock(b)},createLink:function(){this.insertLink()},insertImage:function(){this.insertImage()},indent:function(){this.indent()},outdent:function(){this.outdent(!0)},justifyLeft:function(a){this.align(a)},justifyRight:function(a){this.align(a)},justifyCenter:function(a){this.align(a)},justifyFull:function(a){this.align(a)},undo:function(){this.undo()},redo:function(){this.redo()},html:function(){this.html()},save:function(){this.save()},selectAll:function(a,b){this.$element.focus(),this.execDefault(a,b)},removeFormat:function(){this.removeFormat()},insertHorizontalRule:function(a,b){this.execDefault(a,b),this.hide()}},a.Editable.prototype.cmds_without_focus=["html","undo","redo","selectAll","save","insertImage","insertVideo","insertTable","createLink"],a.Editable.prototype.cmds_in_default=["bold","italic","underline","strikeThrough","subscript","superscript"],a.Editable.prototype.exec=function(a,b,c){if(!this.selectionInEditor()&&this.cmds_without_focus.indexOf(a)<0)return!1;if(this.selectionInEditor()&&""===this.text()){if(this.cmds_in_default.indexOf(a)>=0)return this._startInDefault(a),!1;if("fontSize"==a)return this._startInFontExec("font-size",a,b),!1;if("fontFamily"==a)return this._startInFontExec("font-family",a,b),!1;if("backColor"==a)return this._startInFontExec("background-color",a,b),!1;if("foreColor"==a)return this._startInFontExec("color",a,b),!1}this.execCommand[a]?this.execCommand[a].apply(this,[a,b,c]):this.execDefault(a,b);var d=["undo","redo","selectAll","createLink","insertImage","html","insertVideo"];d.indexOf(a)<0&&this.saveUndoStep(),"createLink"!=a&&"insertImage"!=a&&this.refreshButtons()},a.Editable.prototype.html=function(){var a;this.isHTML?(this.isHTML=!1,a=this.$html_area.val(),a=this.clean(a,!0,!1),this.$box.removeClass("f-html"),this.$html_area.blur(),this.no_verify=!0,this.$element.html(a),this.cleanify(!1),this.no_verify=!1,this.$element.attr("contenteditable",!0),this.$editor.find('.fr-bttn:not([data-cmd="html"]), .fr-trigger').removeAttr("disabled"),this.$editor.find('.fr-bttn[data-cmd="html"]').removeClass("active"),this.saveUndoStep(),this.options.paragraphy&&this.wrapText(),this.$element.blur(),this.focus(),this.refreshButtons(),this.triggerEvent("htmlHide",[a])):(this.$element.removeClass("f-placeholder"),this.cleanify(!1),a=this.options.inlineMode?"\n\n"+this.cleanTags(this.getHTML(!1,!1)):this.cleanTags(this.getHTML(!1,!1)),a=a.replace(/\&amp;/g,"&"),this.$html_area.val(a).trigger("resize"),this.$html_area.css("height",this.$element.height()-1),this.$element.html("").append(this.$html_area).removeAttr("contenteditable"),this.$box.addClass("f-html"),this.$editor.find('button.fr-bttn:not([data-cmd="html"]), button.fr-trigger').attr("disabled",!0),this.$editor.find('.fr-bttn[data-cmd="html"]').addClass("active"),this.hide(),this.imageMode=!1,this.isHTML=!0,this.$element.blur(),this.$element.removeAttr("contenteditable"),this.triggerEvent("htmlShow",[a]))},a.Editable.prototype.formatBlock=function(b,c,d){if(this.disabledList.indexOf("formatBlock")>=0)return!1;if(this.browser.msie&&a.Editable.getIEversion()<9)return document.execCommand("formatBlock",!1,"<"+b+">"),!1;this.saveSelectionByMarkers(),this.wrapText(),this.restoreSelectionByMarkers();var e=this.getSelectionElements();e[0]==this.$element.get(0)&&(e=this.$element.find("> "+a.Editable.VALID_NODES.join(", >"))),this.saveSelectionByMarkers();for(var f,g=0;g<e.length;g++){var h=a(e[g]);if(!this.fakeEmpty(h))if(f="n"==b?this.options.paragraphy?a("<div>").html(h.html()):h.html()+"<br/>":a("<"+b+">").html(h.html()),h.get(0)!=this.$element.get(0)&&"LI"!==f.get(0).tagName&&"TD"!==f.get(0).tagName&&"TH"!==f.get(0).tagName){var i=h.prop("attributes");if(f.attr)for(var j=0;j<i.length;j++)"class"!==i[j].name&&f.attr(i[j].name,i[j].value);var k;this.options.blockStyles&&this.options.blockStyles[b],void 0===k&&(k=this.options.defaultBlockStyle);try{if(h.hasClass(c)&&h.get(0).tagName.toLowerCase()===b)f.addClass(h.attr("class")).removeClass(c);else{if(void 0===h.attr("class")||void 0===k||!this.options.blockStylesToggle&&"toggle"!=d)f.addClass(h.attr("class"));else for(var l=h.attr("class").split(" "),m=0;m<l.length;m++){var n=l[m];void 0===k[n]&&void 0===d?f.addClass(n):void 0!==k[n]&&"toggle"===d&&f.addClass(n),h.get(0).tagName.toLowerCase()!==b&&void 0!==k[n]&&f.addClass(n)}"*"!=c&&f.addClass(c)}}catch(o){}"LI"==h.get(0).tagName||"TD"==h.get(0).tagName||"TH"==h.get(0).tagName?h.html(f):h.replaceWith(f)}else h.html(f)}this.unwrapText(),this.restoreSelectionByMarkers(),this.triggerEvent("formatBlock"),this.repositionEditor()},a.Editable.prototype.align=function(b){if(this.browser.msie&&a.Editable.getIEversion()<9)return document.execCommand(b,!1,!1),!1;var c=this.getSelectionElements();"justifyLeft"==b?b="left":"justifyRight"==b?b="right":"justifyCenter"==b?b="center":"justifyFull"==b&&(b="justify");for(var d=0;d<c.length;d++)a(c[d]).css("text-align",b);this.repositionEditor(),this.triggerEvent("align",[b])},a.Editable.prototype.indent=function(b){if(this.browser.msie&&a.Editable.getIEversion()<9)return b?document.execCommand("outdent",!1,!1):document.execCommand("indent",!1,!1),!1;var c=20;b&&(c=-20),this.saveSelectionByMarkers(),this.wrapText(),this.restoreSelectionByMarkers();var d=this.getSelectionElements();this.saveSelectionByMarkers();for(var e=0;e<d.length;e++){var f=a(d[e]);if(f.parentsUntil(this.$element,"li").length>0&&(f=f.closest("li")),"LI"===f.get(0).tagName&&a.isFunction(this.indentLi)){b?this.outdentLi(f):this.indentLi(f);for(var g=this.$element.find("ul, ol").find("ol + ol, ul + ul"),h=0;h<g.length;h++){var i=a(g[h]);i.prev().append(i.html()),i.remove()}}else if(f.get(0)!=this.$element.get(0)){var j=parseInt(f.css("margin-left").replace(/px/,""),10),k=Math.max(0,j+c);f.css("marginLeft",k)}else{var l=a("<div>").html(f.html());f.html(l),l.css("marginLeft",Math.max(0,c))}}a.isFunction(this.cleanupLists)&&this.cleanupLists(),this.unwrapText(),this.restoreSelectionByMarkers(),this.repositionEditor(),b||this.triggerEvent("indent")},a.Editable.prototype.outdent=function(){this.indent(!0),this.triggerEvent("outdent")},a.Editable.prototype.execDefault=function(a,b){document.execCommand(a,!1,b),this.triggerEvent(a)},a.Editable.prototype._startInDefault=function(a){this.$element.focus(),this.$bttn_wrapper.find('[data-cmd="'+a+'"]').toggleClass("active"),document.execCommand(a,!1,!1)},a.Editable.prototype._startInFontExec=function(b,c,d){this.$element.focus();try{var e=this.getRange(),f=e.cloneRange();f.collapse(!1);var g=a('<span data-inserted="true" data-fr-verified="true" style="'+b+": "+d+';">&#8203;</span>',document);f.insertNode(g[0]),f.detach(),g=this.$element.find("[data-inserted]"),g.removeAttr("data-inserted"),this.setSelection(g.get(0),1)}catch(h){}},a.Editable.prototype.removeFormat=function(){document.execCommand("removeFormat",!1,!1),document.execCommand("unlink",!1,!1)},a.Editable.prototype.inlineStyle=function(b,c,d){if(this.browser.webkit&&"font-size"!=b){var e=function(a){return a.attr("style").indexOf("font-size")>=0};this.$element.find("span").each(function(b,c){var d=a(c);d.attr("style")&&e(d)&&(d.data("font-size",d.css("font-size")),d.css("font-size",""))})}document.execCommand("fontSize",!1,4),this.saveSelectionByMarkers(),this.browser.webkit&&"font-size"!=b&&this.$element.find("span").each(function(b,c){var d=a(c);d.data("font-size")&&(d.css("font-size",d.data("font-size")),d.removeData("font-size"))});var f=function(c,e){var f=a(e);f.css(b)!=d&&f.css(b,""),""===f.attr("style")&&f.replaceWith(f.html())};this.$element.find("font").each(function(c,e){var g=a('<span data-fr-verified="true" style="'+b+": "+d+';">'+a(e).html()+"</span>");a(e).replaceWith(g),g.find("span").each(f)}),this.restoreSelectionByMarkers(),this.repositionEditor(),this.triggerEvent(c,[d])}}(jQuery),function(a){a.Editable.prototype._events={},a.Editable.prototype.addListener=function(a,b){var c=this._events,d=c[a]=c[a]||[];d.push(b)},a.Editable.prototype.raiseEvent=function(a,b){void 0===b&&(b=[]);var c=!0,d=this._events[a];if(d)for(var e=0,f=d.length;f>e;e++)c=d[e].apply(this,b);return void 0===c&&(c=!0),c}}(jQuery),function(a){a.Editable.prototype.active_dispatcher={fontFamily:function(a,b){return this._isActiveFontFamily(b)},fontSize:function(a,b){return this._isActiveFontSize(b)},backColor:function(a,b){return this._isActiveBackColor(b)},foreColor:function(a,b){return this._isActiveForeColor(b)},formatBlock:function(a,b){return this._isActiveFormatBlock(b)},insertOrderedList:function(){return this._isActiveList("ol")},insertUnorderedList:function(){return this._isActiveList("ul")},justifyLeft:function(a){return this._isActiveAlign(a)},justifyRight:function(a){return this._isActiveAlign(a)},justifyCenter:function(a){return this._isActiveAlign(a)},justifyFull:function(a){return this._isActiveAlign(a)},html:function(){return this._isActiveHTML()}},a.Editable.prototype.refresh_disabled=["undo","redo","save","createLink","insertImage","insertVideo"],a.Editable.prototype.isActive=function(a,b){return this.refresh_disabled.indexOf(a)>=0?!1:this.active_dispatcher[a]?this.active_dispatcher[a].apply(this,[a,b]):this._isActiveDefault(a,b)},a.Editable.prototype._isActiveFontFamily=function(b){var c=this.getSelectionElement();return a(c).css("fontFamily").replace(/ /g,"")===b.replace(/ /g,"")?!0:!1},a.Editable.prototype._isActiveFontSize=function(b){var c=this.getSelectionElement();return a(c).css("fontSize")===b?!0:!1},a.Editable.prototype._isActiveBackColor=function(b){for(var c=this.getSelectionElement();a(c).get(0)!=this.$element.get(0);){if(a(c).css("background-color")===b)return!0;if("transparent"!=a(c).css("background-color")&&"rgba(0, 0, 0, 0)"!=a(c).css("background-color"))return!1;c=a(c).parent()}return!1},a.Editable.prototype._isActiveForeColor=function(a){try{if(document.queryCommandValue("foreColor")===a)return!0}catch(b){}return!1},a.Editable.prototype._isActiveFormatBlock=function(b){"CODE"===b.toUpperCase()?b="PRE":"N"===b.toUpperCase()&&(b="DIV");var c=a(this.getSelectionElements()[0]);return c.get(0).tagName==b.toUpperCase()?!0:!1},a.Editable.prototype._isActiveAlign=function(b){var c=this.getSelectionElements();return"justifyLeft"==b?b="left":"justifyRight"==b?b="right":"justifyCenter"==b?b="center":"justifyFull"==b&&(b="justify"),b==a(c[0]).css("text-align")?!0:!1},a.Editable.prototype._isActiveHTML=function(){return this.isHTML?!0:!1},a.Editable.prototype._isActiveDefault=function(a){try{if(document.queryCommandState(a)===!0)return!0}catch(b){}return!1}}(jQuery),function(a){a.Editable.prototype.refresh_disabled=["createLink","insertImage","undo","redo","save"],a.Editable.prototype.refresh_dispatcher={fontSize:function(a){this.refreshFontSize(a)},fontFamily:function(a){this.refreshFontFamily(a)},formatBlock:function(a){this.refreshFormatBlock(a)},justifyLeft:function(a){this.refreshAlign(a)},justifyRight:function(a){this.refreshAlign(a)
},justifyCenter:function(a){this.refreshAlign(a)},justifyFull:function(a){this.refreshAlign(a)},html:function(b){this.isActive("html")?a(b).addClass("active"):a(b).removeClass("active")}},a.Editable.prototype.registerRefreshEvent=function(a,b){this.refresh_dispatcher[a]=b},a.Editable.prototype.refreshBlocks=function(){this.$bttn_wrapper.find('[data-cmd="formatBlock"]').each(a.proxy(function(a,b){this.refreshFormatBlock(b)},this))},a.Editable.prototype.refreshButtons=function(b){if(!(this.selectionInEditor()&&!this.isHTML||this.browser.msie&&a.Editable.getIEversion()<9||b))return!1;this.refreshBlocks();for(var c=0;c<this.options.buttons.length;c++){var d=this.options.buttons[c];void 0!==a.Editable.commands[d]&&(void 0!==a.Editable.commands[d].disabled?this.$editor.find('[data-name="'+d+'"] button').prop("disabled",!0):this.$editor.find('[data-name="'+d+'"] button').removeAttr("disabled"))}this.refreshUndoRedo(),this.raiseEvent("refresh"),this.$bttn_wrapper.find("[data-cmd]").not('[data-cmd="formatBlock"]').each(a.proxy(function(b,c){var d=a(c).data("cmd");this.refresh_dispatcher[d]?this.refresh_dispatcher[d].apply(this,[c]):this.refreshDefault(c)},this))},a.Editable.prototype.refreshFormatBlock=function(b){this.disabledList.indexOf("formatBlock")>=0&&a(b).parents(".fr-dropdown").attr("data-disabled",!0),a(b).removeClass("active"),this.isActive(a(b).data("cmd"),a(b).data("val"))&&a(b).addClass("active")},a.Editable.prototype.refreshUndoRedo=function(){if(this.isEnabled("undo")||this.isEnabled("redo")){if(void 0===this.$editor)return;this.$bttn_wrapper.find('[data-cmd="undo"], [data-cmd="redo"]').removeAttr("disabled"),(0===this.undoStack.length||this.undoIndex<=1||this.isHTML)&&this.$bttn_wrapper.find('[data-cmd="undo"]').prop("disabled",!0),(this.undoIndex==this.undoStack.length||this.isHTML)&&this.$bttn_wrapper.find('[data-cmd="redo"]').prop("disabled",!0)}},a.Editable.prototype.refreshDefault=function(b){a(b).removeClass("active"),this.isActive(a(b).data("cmd"))&&a(b).addClass("active")},a.Editable.prototype.refreshAlign=function(b){var c=a(b).data("cmd");this.isActive(c)&&(a(b).parents("ul").find("li").removeClass("active"),a(b).addClass("active"),a(b).parents(".fr-dropdown").find(".fr-trigger i").attr("class",a(b).find("i").attr("class")))},a.Editable.prototype.refreshForeColor=function(b){a(b).removeClass("active"),this.isActive("foreColor",b.style.backgroundColor)&&a(b).addClass("active")},a.Editable.prototype.refreshBackColor=function(b){a(b).removeClass("active"),this.isActive("backColor",b.style.backgroundColor)&&a(b).addClass("active")},a.Editable.prototype.refreshFontSize=function(b){a(b).removeClass("active"),this.isActive("fontSize",a(b).data("val"))&&a(b).addClass("active")},a.Editable.prototype.refreshFontFamily=function(b){a(b).removeClass("active"),this.isActive("fontFamily",a(b).data("val"))&&a(b).addClass("active")}}(jQuery),function(a){a.Editable.prototype.text=function(){var a="";return window.getSelection?a=window.getSelection():document.getSelection?a=document.getSelection():document.selection&&(a=document.selection.createRange().text),a.toString()},a.Editable.prototype.selectionInEditor=function(){var b=this.getSelectionParent(),c=!1;return b==this.$element.get(0)&&(c=!0),c===!1&&a(b).parents().each(a.proxy(function(a,b){b==this.$element.get(0)&&(c=!0)},this)),c},a.Editable.prototype.getSelection=function(){var a="";return a=window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange()},a.Editable.prototype.getRange=function(){var a=this.getRanges();return a.length>0?a[0]:null},a.Editable.prototype.getRanges=function(){var a=this.getSelection();if(a.getRangeAt&&a.rangeCount){for(var b=[],c=0;c<a.rangeCount;c++)b.push(a.getRangeAt(c));return b}return document.createRange?[document.createRange()]:[]},a.Editable.prototype.clearSelection=function(){var a=this.getSelection();a.removeAllRanges?a.removeAllRanges():a.empty?a.empty():a.clear&&a.clear()},a.Editable.prototype.getSelectionElement=function(){var b=this.getSelection();if(b.rangeCount){var c=this.getRange(),d=c.startContainer;if(1!=d.nodeType)d=d.parentNode;else{var e=!1;d.children.length>0&&d.children[c.startOffset]&&a(d.children[c.startOffset]).text()===this.text()&&(d=d.children[c.startOffset],e=!0),!e&&d.children.length>0&&a(d.children[0]).text()===this.text()&&(d=d.children[0])}for(var f=d;f&&"BODY"!=f.tagName;){if(f==this.$element.get(0))return d;f=a(f).parent()[0]}}return this.$element.get(0)},a.Editable.prototype.getSelectionParent=function(){var b,c=null;return window.getSelection?(b=window.getSelection(),b.rangeCount&&(c=b.getRangeAt(0).commonAncestorContainer,1!=c.nodeType&&(c=c.parentNode))):(b=document.selection)&&"Control"!=b.type&&(c=b.createRange().parentElement()),null!=c&&(a.inArray(this.$element.get(0),a(c).parents())>=0||c==this.$element.get(0))?c:null},a.Editable.prototype.nodeInRange=function(a,b){var c;if(a.intersectsNode)return a.intersectsNode(b);c=b.ownerDocument.createRange();try{c.selectNode(b)}catch(d){c.selectNodeContents(b)}return-1==a.compareBoundaryPoints(Range.END_TO_START,c)&&1==a.compareBoundaryPoints(Range.START_TO_END,c)},a.Editable.prototype.getElementFromNode=function(b){for(1!=b.nodeType&&(b=b.parentNode);null!==b&&a.Editable.VALID_NODES.indexOf(b.tagName)<0;)b=b.parentNode;return null!=b&&"LI"==b.tagName&&a(b).find(a.Editable.VALID_NODES.join()).length>0?null:a.makeArray(a(b).parents()).indexOf(this.$element.get(0))>=0?b:null},a.Editable.prototype.nextNode=function(a,b){if(a.hasChildNodes())return a.firstChild;for(;a&&!a.nextSibling&&a!=b;)a=a.parentNode;return a&&a!=b?a.nextSibling:null},a.Editable.prototype.getRangeSelectedNodes=function(a){var b=[],c=a.startContainer,d=a.endContainer;if(c==d&&"TR"!=c.tagName){if(c.hasChildNodes()&&0!==c.children.length){for(var e=c.children,f=a.startOffset;f<a.endOffset;f++)e[f]&&b.push(e[f]);return 0===b.length&&b.push(c),b}return[c]}if(c==d&&"TR"==c.tagName){var g=c.childNodes,h=a.startOffset;if(g.length>h&&h>=0){var i=g[h];if("TD"==i.tagName||"TH"==i.tagName)return[i]}}for(;c&&c!=d;)b.push(c=this.nextNode(c,d));for(c=a.startContainer;c&&c!=a.commonAncestorContainer;)b.unshift(c),c=c.parentNode;return b},a.Editable.prototype.getSelectedNodes=function(){if(window.getSelection){var b=window.getSelection();if(!b.isCollapsed){for(var c=this.getRanges(),d=[],e=0;e<c.length;e++)d=a.merge(d,this.getRangeSelectedNodes(c[e]));return d}if(this.selectionInEditor()){var f=b.getRangeAt(0).startContainer;return 3==f.nodeType?[f.parentNode]:[f]}}return[]},a.Editable.prototype.getSelectionElements=function(){var b=this.getSelectedNodes(),c=[];return a.each(b,a.proxy(function(a,b){if(null!==b){var d=this.getElementFromNode(b);c.indexOf(d)<0&&d!=this.$element.get(0)&&null!==d&&c.push(d)}},this)),0===c.length&&c.push(this.$element.get(0)),c},a.Editable.prototype.getSelectionLink=function(){var b=this.getSelectionLinks();return b.length>0?a(b[0]).attr("href"):null},a.Editable.prototype.saveSelection=function(){if(!this.selectionDisabled){var a,b,c,d=this.getSelection();if(d.getRangeAt&&d.rangeCount){for(c=[],a=0,b=d.rangeCount;b>a;a+=1)c.push(d.getRangeAt(a));this.savedRanges=c}else this.savedRanges=null}},a.Editable.prototype.restoreSelection=function(){if(!this.selectionDisabled){var a,b,c=this.getSelection();if(this.savedRanges)for(c.removeAllRanges(),a=0,b=this.savedRanges.length;b>a;a+=1)c.addRange(this.savedRanges[a])}},a.Editable.prototype.insertMarkersAtPoint=function(a){var b=a.clientX,c=a.clientY;this.removeMarkers();var d,e=null;if("undefined"!=typeof document.caretPositionFromPoint?(d=document.caretPositionFromPoint(b,c),e=document.createRange(),e.setStart(d.offsetNode,d.offset),e.setEnd(d.offsetNode,d.offset)):"undefined"!=typeof document.caretRangeFromPoint&&(d=document.caretRangeFromPoint(b,c),e=document.createRange(),e.setStart(d.startContainer,d.startOffset),e.setEnd(d.startContainer,d.startOffset)),null!==e&&"undefined"!=typeof window.getSelection){var f=window.getSelection();f.removeAllRanges(),f.addRange(e)}else if("undefined"!=typeof document.body.createTextRange){e=document.body.createTextRange(),e.moveToPoint(b,c);var g=e.duplicate();g.moveToPoint(b,c),e.setEndPoint("EndToEnd",g),e.select()}this.placeMarker(e,!1,0),this.placeMarker(e,!0,0)},a.Editable.prototype.saveSelectionByMarkers=function(){if(!this.selectionDisabled){var a=this.getRanges();this.removeMarkers();for(var b=0;b<a.length;b++)this.placeMarker(a[b],!0,b),this.placeMarker(a[b],!1,b)}},a.Editable.prototype.hasSelectionByMarkers=function(){var a=this.$element.find('.f-marker[data-type="true"]');return a.length>0?!0:!1},a.Editable.prototype.restoreSelectionByMarkers=function(b){if(void 0===b&&(b=!0),!this.selectionDisabled){var c=this.$element.find('.f-marker[data-type="true"]');if(0===c.length)return!1;var d=this.getSelection();this.mobile()?this.$element.is(":focus")||this.$element.focus():this.focus(),!b&&1===c.length&&1===d.rangeCount&&this.getRange().collapsed&&a(c[0]).attr("data-collapsed")||(this.clearSelection(),b=!0);for(var e=0;e<c.length;e++){var f,g=a(c[e]).data("id"),h=c[e],i=this.$element.find('.f-marker[data-type="false"][data-id="'+g+'"]');if(f=b?document.createRange():this.getRange(),i.length>0){i=i[0];try{f.setStartAfter(h),f.setEndBefore(i)}catch(j){}}b&&d.addRange(f)}this.editableDisabled||this.isHTML||this.$element.attr("contenteditable",!0),this.removeMarkers()}},a.Editable.prototype.setSelection=function(a,b,c,d){var e=this.getSelection();if(e){this.clearSelection();try{c||(c=a),void 0===b&&(b=0),void 0===d&&(d=b);var f=this.getRange();f.setStart(a,b),f.setEnd(c,d),e.addRange(f)}catch(g){}}},a.Editable.prototype.buildMarker=function(b,c,d){return void 0===d&&(d=""),a('<span class="f-marker"'+d+' style="display:none; line-height: 0;" data-fr-verified="true" data-id="'+c+'" data-type="'+b+'">',document)[0]},a.Editable.prototype.placeMarker=function(a,b,c){try{var d=a.cloneRange();d.collapse(b);var e="";a.collapsed&&(e=' data-collapsed="true"'),d.insertNode(this.buildMarker(b,c,e)),d.detach()}catch(f){}},a.Editable.prototype.removeMarkers=function(){this.$element.find(".f-marker").remove()},a.Editable.prototype.getSelectionTextInfo=function(a){var b,c,d=!1,e=!1;if(window.getSelection){var f=window.getSelection();f.rangeCount&&(b=f.getRangeAt(0),c=b.cloneRange(),c.selectNodeContents(a),c.setEnd(b.startContainer,b.startOffset),d=""===c.toString(),c.selectNodeContents(a),c.setStart(b.endContainer,b.endOffset),e=""===c.toString())}else document.selection&&"Control"!=document.selection.type&&(b=document.selection.createRange(),c=b.duplicate(),c.moveToElementText(a),c.setEndPoint("EndToStart",b),d=""===c.text,c.moveToElementText(a),c.setEndPoint("StartToEnd",b),e=""===c.text);return{atStart:d,atEnd:e}},a.Editable.prototype.endsWith=function(a,b){return-1!==a.indexOf(b,a.length-b.length)}}(jQuery),function(a){a.Editable.hexToRGB=function(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return c?{r:parseInt(c[1],16),g:parseInt(c[2],16),b:parseInt(c[3],16)}:null},a.Editable.hexToRGBString=function(a){var b=this.hexToRGB(a);return b?"rgb("+b.r+", "+b.g+", "+b.b+")":""},a.Editable.getIEversion=function(){var a,b,c=-1;return"Microsoft Internet Explorer"==navigator.appName?(a=navigator.userAgent,b=new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"),null!==b.exec(a)&&(c=parseFloat(RegExp.$1))):"Netscape"==navigator.appName&&(a=navigator.userAgent,b=new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"),null!==b.exec(a)&&(c=parseFloat(RegExp.$1))),c},a.Editable.browser=function(){var a={};if(this.getIEversion()>0)a.msie=!0;else{var b=navigator.userAgent.toLowerCase(),c=/(chrome)[ \/]([\w.]+)/.exec(b)||/(webkit)[ \/]([\w.]+)/.exec(b)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||b.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b)||[],d={browser:c[1]||"",version:c[2]||"0"};c[1]&&(a[d.browser]=!0),parseInt(d.version,10)<9&&a.msie&&(a.oldMsie=!0),a.chrome?a.webkit=!0:a.webkit&&(a.safari=!0)}return a}}(jQuery),function(a){a.Editable.prototype.show=function(b){if(void 0!==b){if(this.options.inlineMode||this.options.editInPopup)if(null!==b&&"touchend"!==b.type){var c=b.pageX,d=b.pageY;c<this.$element.offset().left&&(c=this.$element.offset().left),c>this.$element.offset().left+this.$element.width()&&(c=this.$element.offset().left+this.$element.width()),d<this.$element.offset.top&&(d=this.$element.offset().top),d>this.$element.offset().top+this.$element.height()&&(d=this.$element.offset().top+this.$element.height()),20>c&&(c=20),0>d&&(d=0),this.showByCoordinates(c,d),a(".froala-editor:not(.f-basic)").hide(),this.$editor.show(),0!==this.options.buttons.length||this.options.editInPopup||this.$editor.hide()}else a(".froala-editor:not(.f-basic)").hide(),this.$editor.show(),this.repositionEditor();this.hidePopups(),this.options.editInPopup||this.showEditPopupWrapper(),this.$bttn_wrapper.show(),this.refreshButtons(),this.imageMode=!1}},a.Editable.prototype.hideDropdowns=function(){this.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active"),this.$bttn_wrapper.find(".fr-dropdown .fr-trigger")},a.Editable.prototype.hide=function(a){return this.initialized?(void 0===a&&(a=!0),a?this.hideOtherEditors():(this.closeImageMode(),this.imageMode=!1),this.$popup_editor.hide(),this.hidePopups(!1),this.hideDropdowns(),void(this.link=!1)):!1},a.Editable.prototype.hideOtherEditors=function(){for(var b=1;b<=a.Editable.count;b++)b!=this._id&&a(window).trigger("hide."+b)},a.Editable.prototype.hideBttnWrapper=function(){this.options.inlineMode&&this.$bttn_wrapper.hide()},a.Editable.prototype.showBttnWrapper=function(){this.options.inlineMode&&this.$bttn_wrapper.show()},a.Editable.prototype.showEditPopupWrapper=function(){this.$edit_popup_wrapper&&(this.$edit_popup_wrapper.show(),setTimeout(a.proxy(function(){this.$edit_popup_wrapper.find("input").val(this.$element.text()).focus().select()},this),1))},a.Editable.prototype.hidePopups=function(a){void 0===a&&(a=!0),a&&this.hideBttnWrapper(),this.raiseEvent("hidePopups")},a.Editable.prototype.showEditPopup=function(){this.showEditPopupWrapper()}}(jQuery),function(a){a.Editable.prototype.getBoundingRect=function(){var b;if(this.isLink){b={};var c=this.$element;b.left=c.offset().left-a(window).scrollLeft(),b.top=c.offset().top-a(window).scrollTop(),b.width=c.outerWidth(),b.height=parseInt(c.css("padding-top").replace("px",""))+c.height(),b.right=1,b.bottom=1,b.ok=!0}else if(this.getRange().collapsed){var d=a(this.getSelectionElement());this.saveSelectionByMarkers();var e=this.$element.find(".f-marker:first");e.css("display","inline");var f=e.offset();e.css("display","none"),b={},b.left=f.left-a(window).scrollLeft(),b.width=0,b.height=(parseInt(d.css("line-height").replace("px",""))||10)-10-a(window).scrollTop(),b.top=f.top,b.right=1,b.bottom=1,b.ok=!0,this.removeMarkers()}else b=this.getRange().getBoundingClientRect();return b},a.Editable.prototype.repositionEditor=function(b){var c,d,e;if(this.options.inlineMode||b){if(c=this.getBoundingRect(),this.showBttnWrapper(),c.ok||c.left>=0&&c.top>=0&&c.right>0&&c.bottom>0)d=c.left+c.width/2,e=c.top+c.height,this.iPad()||(d+=a(window).scrollLeft(),e+=a(window).scrollTop()),this.showByCoordinates(d,e);else if(this.options.alwaysVisible)this.hide();else{var f=this.$element.offset();this.showByCoordinates(f.left,f.top+10)}0===this.options.buttons.length&&this.hide()}},a.Editable.prototype.showByCoordinates=function(b,c){b-=20,c+=15;var d=Math.max(this.$popup_editor.width(),250);b+d>=a(window).width()-50&&b+40-d>0?(this.$popup_editor.addClass("right-side"),b=a(window).width()-(b+40),this.$popup_editor.css("top",c),this.$popup_editor.css("right",b),this.$popup_editor.css("left","auto")):b+d<a(window).width()-50?(this.$popup_editor.removeClass("right-side"),this.$popup_editor.css("top",c),this.$popup_editor.css("left",b),this.$popup_editor.css("right","auto")):(this.$popup_editor.removeClass("right-side"),this.$popup_editor.css("top",c),this.$popup_editor.css("left",Math.max(a(window).width()-d,10)/2),this.$popup_editor.css("right","auto")),this.$popup_editor.show()},a.Editable.prototype.positionPopup=function(b){if(a(this.$editor.find('button.fr-bttn[data-cmd="'+b+'"]')).length){var c=this.$editor.find('button.fr-bttn[data-cmd="'+b+'"]'),d=c.width(),e=c.height()-15,f=c.offset().left+d/2,g=c.offset().top+e;this.showByCoordinates(f,g)}}}(jQuery),function(a){a.Editable.image_commands={floatImageLeft:{title:"Float Left",icon:{type:"font",value:"fa fa-align-left"}},floatImageNone:{title:"Float None",icon:{type:"font",value:"fa fa-align-justify"}},floatImageRight:{title:"Float Right",icon:{type:"font",value:"fa fa-align-right"}},linkImage:{title:"Insert Link",icon:{type:"font",value:"fa fa-link"}},replaceImage:{title:"Replace Image",icon:{type:"font",value:"fa fa-exchange"}},removeImage:{title:"Remove Image",icon:{type:"font",value:"fa fa-trash-o"}}},a.Editable.DEFAULTS=a.extend(a.Editable.DEFAULTS,{allowedImageTypes:["jpeg","jpg","png","gif"],imageButtons:["floatImageLeft","floatImageNone","floatImageRight","linkImage","replaceImage","removeImage"],imageDeleteURL:null,imageDeleteParams:{},imageMove:!0,imageResize:!0,imageLink:!0,imageUpload:!0,imageUploadParams:{},imageUploadParam:"file",imageUploadToS3:!1,imageUploadURL:"http://i.froala.com/upload",maxImageSize:10485760,textNearImage:!0}),a.Editable.prototype.hideImageEditorPopup=function(){this.$image_editor&&this.$image_editor.hide()},a.Editable.prototype.showImageEditorPopup=function(){this.$image_editor&&this.$image_editor.show(),this.options.imageMove||this.$element.attr("contenteditable",!1)},a.Editable.prototype.showImageWrapper=function(){this.$image_wrapper&&this.$image_wrapper.show()},a.Editable.prototype.hideImageWrapper=function(a){this.$image_wrapper&&(this.$element.attr("data-resize")||a||(this.closeImageMode(),this.imageMode=!1),this.$image_wrapper.hide())},a.Editable.prototype.showInsertImage=function(){this.hidePopups(),this.showImageWrapper()},a.Editable.prototype.showImageEditor=function(){this.hidePopups(),this.showImageEditorPopup()},a.Editable.prototype.insertImageHTML=function(){var b='<div class="froala-popup froala-image-popup" style="display: none;"><h4><span data-text="true">Insert image</span><span data-text="true">Uploading image</span><i title="Cancel" class="fa fa-times" id="f-image-close-'+this._id+'"></i></h4>';return b+='<div id="f-image-list-'+this._id+'">',this.options.imageUpload&&(b+='<div class="f-popup-line drop-upload">',b+='<div class="f-upload" id="f-upload-div-'+this._id+'"><strong data-text="true">Drop Image</strong><br>(<span data-text="true">or click</span>)<form target="frame-'+this._id+'" enctype="multipart/form-data" encoding="multipart/form-data" action="'+this.options.imageUploadURL+'" method="post" id="f-upload-form-'+this._id+'"><input id="f-file-upload-'+this._id+'" type="file" name="'+this.options.imageUploadParam+'" accept="image/*"></form></div>',this.browser.msie&&a.Editable.getIEversion()<=9&&(b+='<iframe id="frame-'+this._id+'" name="frame-'+this._id+'" src="javascript:false;" style="width:0; height:0; border:0px solid #FFF; position: fixed; z-index: -1;" data-loaded="true"></iframe>'),b+="</div>"),this.options.imageLink&&(b+='<div class="f-popup-line"><label><span data-text="true">Enter URL</span>: </label><input id="f-image-url-'+this._id+'" type="text" placeholder="http://example.com"><button class="f-browse" id="f-browser-'+this._id+'"><i class="fa fa-search"></i></button><button data-text="true" class="f-ok" id="f-image-ok-'+this._id+'">OK</button></div>'),b+="</div>",b+='<p class="f-progress" id="f-progress-'+this._id+'"><span></span></p>',b+="</div>"},a.Editable.prototype.iFrameLoad=function(){var a=this.$image_wrapper.find("iframe#frame-"+this._id);if(!a.data("loaded"))return a.data("loaded",!0),!1;try{var b=this.$image_wrapper.find("#f-upload-form-"+this._id);if(this.options.imageUploadToS3){var c=b.attr("action"),d=b.find('input[name="key"]').val(),e=c+d;this.writeImage(e),this.options.imageUploadToS3.callback&&this.options.imageUploadToS3.callback.call(this,e,d)}else{var f=a.contents().text();this.parseImageResponse(f)}}catch(g){this.throwImageError(7)}},a.Editable.prototype.initImage=function(){this.buildInsertImage(),(!this.isLink||this.isImage)&&(this.initImageEvents(),this.initImagePopup()),this.addListener("destroy",this.destroyImage)},a.Editable.initializers.push(a.Editable.prototype.initImage),a.Editable.prototype.destroyImage=function(){this.$image_editor.html("").removeData().remove(),this.$image_wrapper.html("").removeData().remove()},a.Editable.prototype.buildInsertImage=function(){this.$image_wrapper=a(this.insertImageHTML()),this.$popup_editor.append(this.$image_wrapper);var b=this;if(this.$image_wrapper.on("mouseup",a.proxy(function(a){this.isResizing()||a.stopPropagation()},this)),this.addListener("hidePopups",a.proxy(function(){this.hideImageWrapper(!0)}),this),this.$progress_bar=this.$image_wrapper.find("p#f-progress-"+this._id),this.options.imageUpload){if(this.browser.msie&&a.Editable.getIEversion()<=9){var c=this.$image_wrapper.find("iframe").get(0);c.attachEvent?c.attachEvent("onload",function(){b.iFrameLoad()}):c.onload=function(){b.iFrameLoad()}}this.$image_wrapper.on("change",'input[type="file"]',function(){if(void 0!==this.files)b.uploadImage(this.files);else{var c=a(this).parents("form");c.find('input[type="hidden"]').remove();var d;for(d in b.options.imageUploadParams)c.prepend('<input type="hidden" name="'+d+'" value="'+b.options.imageUploadParams[d]+'" />');if(b.options.imageUploadToS3!==!1){for(d in b.options.imageUploadToS3.params)c.prepend('<input type="hidden" name="'+d+'" value="'+b.options.imageUploadToS3.params[d]+'" />');c.prepend('<input type="hidden" name="success_action_status" value="201" />'),c.prepend('<input type="hidden" name="X-Requested-With" value="xhr" />'),c.prepend('<input type="hidden" name="Content-Type" value="" />'),c.prepend('<input type="hidden" name="key" value="'+b.options.imageUploadToS3.keyStart+(new Date).getTime()+"-"+a(this).val().match(/[^\/\\]+$/)+'" />')}else c.prepend('<input type="hidden" name="XHR_CORS_TRARGETORIGIN" value="'+window.location.href+'" />');b.$image_wrapper.find("#f-image-list-"+b._id).hide(),b.$progress_bar.show(),b.$progress_bar.find("span").css("width","100%").text("Please wait!"),b.showInsertImage(),c.submit()}a(this).val("")}),this.buildDragUpload()}this.$image_wrapper.on("mouseup keydown","#f-image-url-"+this._id,a.proxy(function(a){var b=a.which;b&&27===b||a.stopPropagation()},this)),this.$image_wrapper.on("click","#f-image-ok-"+this._id,a.proxy(function(){this.writeImage(this.$image_wrapper.find("#f-image-url-"+this._id).val(),!0)},this)),this.$image_wrapper.on("click","#f-image-close-"+this._id,a.proxy(function(){this.$bttn_wrapper.show(),this.hideImageWrapper(!0),this.options.inlineMode&&0===this.options.buttons.length&&(this.imageMode?this.showImageEditor():this.hide()),this.imageMode||this.restoreSelectionByMarkers(),this.options.inlineMode||this.imageMode?this.imageMode&&this.showImageEditor():this.hide()},this)),this.$image_wrapper.on("click",function(a){a.stopPropagation()}),this.$image_wrapper.on("click","*",function(a){a.stopPropagation()})},a.Editable.prototype.deleteImage=function(b){if(this.options.imageDeleteURL){var c=this.options.imageDeleteParams;c.info=b.data("info"),c.src=b.attr("src"),a.ajax({type:"POST",url:this.options.imageDeleteURL,data:c,crossDomain:this.options.crossDomain,xhrFields:{withCredentials:this.options.withCredentials},headers:this.options.headers}).done(a.proxy(function(a){b.parent().parent().hasClass("f-image-list")?b.parent().remove():b.parent().removeClass("f-img-deleting"),this.triggerEvent("imageDeleteSuccess",[a],!1)},this)).fail(a.proxy(function(){b.parent().removeClass("f-img-deleting"),this.triggerEvent("imageDeleteError",["Error during image delete."],!1)},this))}else b.parent().removeClass("f-img-deleting"),this.triggerEvent("imageDeleteError",["Missing imageDeleteURL option."],!1)},a.Editable.prototype.imageHandle=function(){var b=this,c=a('<span data-fr-verified="true">').addClass("f-img-handle").on({movestart:function(c){b.hide(),b.$element.addClass("f-non-selectable").attr("contenteditable",!1),b.$element.attr("data-resize",!0),a(this).attr("data-start-x",c.startX),a(this).attr("data-start-y",c.startY)},move:function(c){var d=a(this),e=c.pageX-parseInt(d.attr("data-start-x"),10);d.attr("data-start-x",c.pageX),d.attr("data-start-y",c.pageY);var f=d.prevAll("img"),g=f.width();d.hasClass("f-h-ne")||d.hasClass("f-h-se")?f.attr("width",g+e):f.attr("width",g-e),b.triggerEvent("imageResize",[],!1)},moveend:function(){a(this).removeAttr("data-start-x"),a(this).removeAttr("data-start-y"),b.$element.removeClass("f-non-selectable"),b.isImage||b.$element.attr("contenteditable",!0),b.triggerEvent("imageResizeEnd"),a(this).trigger("mouseup")},touchend:function(){a(this).trigger("moveend")}});return c},a.Editable.prototype.disableImageResize=function(){if(this.browser.mozilla)try{document.execCommand("enableObjectResizing",!1,!1),document.execCommand("enableInlineTableEditing",!1,!1)}catch(a){}},a.Editable.prototype.isResizing=function(){return this.$element.attr("data-resize")},a.Editable.prototype.getImageClass=function(a){var b=a.split(" ");return b.indexOf("fr-fir")>=0?"fr-fir":b.indexOf("fr-fil")>=0?"fr-fil":"fr-fin"},a.Editable.prototype.addImageClass=function(a,b){a.removeClass("fr-fin fr-fir fr-fil").addClass(b)},a.Editable.prototype.initImageEvents=function(){this.disableImageResize();var b=this;document.addEventListener&&document.addEventListener("drop",a.proxy(function(){setTimeout(a.proxy(function(){b.closeImageMode(),b.imageMode=!1,b.hide(),this.sync(),this.clearSelection()},this),10)},this)),this.$element.on("mousedown",'img:not([contenteditable="false"])',function(a){return b.isDisabled?!1:void(b.isResizing()||(a.stopPropagation(),(!b.options.imageMove||b.browser.msie)&&b.$element.attr("contenteditable",!1)))}),this.$element.on("mouseup",'img:not([contenteditable="false"])',function(){return b.isDisabled?!1:void(b.isResizing()||b.options.imageMove||b.isImage||b.isHTML||b.$element.attr("contenteditable",!0))}),this.$element.on("click touchend",'img:not([contenteditable="false"])',function(c){if(b.isDisabled)return!1;if(!b.isResizing()){c.preventDefault(),c.stopPropagation(),b.closeImageMode(),b.$element.blur(),b.$image_editor.find("button").removeClass("active");var d=a(this).css("float");if(a(this).hasClass("fr-fil")?d="left":a(this).hasClass("fr-fir")&&(d="right"),b.$image_editor.find('button[data-cmd="floatImage'+d.charAt(0).toUpperCase()+d.slice(1)+'"]').addClass("active"),b.$image_editor.find('.f-image-alt input[type="text"]').val(a(this).attr("alt")||a(this).attr("title")),b.showImageEditor(),!a(this).parent().hasClass("f-img-editor")||"SPAN"!=a(this).parent().get(0).tagName){var e=b.getImageClass(a(this).attr("class"));a(this).wrap('<span data-fr-verified="true" class="f-img-editor '+e+'"></span>'),0!==a(this).parents(".f-img-wrap").length||b.isImage?b.addImageClass(a(this).parents(".f-img-wrap"),e):a(this).parents("a").length>0?a(this).parents("a:first").wrap('<span data-fr-verified="true" class="f-img-wrap '+e+'"></span>'):a(this).parent().wrap('<span data-fr-verified="true" class="f-img-wrap '+e+'"></span>')}var f=b.imageHandle();a(this).parent().find(".f-img-handle").remove(),b.options.imageResize&&(a(this).parent().append(f.clone(!0).addClass("f-h-ne")),a(this).parent().append(f.clone(!0).addClass("f-h-se")),a(this).parent().append(f.clone(!0).addClass("f-h-sw")),a(this).parent().append(f.clone(!0).addClass("f-h-nw"))),b.clearSelection(),b.showByCoordinates(a(this).offset().left+a(this).width()/2,a(this).offset().top+a(this).height()),b.imageMode=!0,b.$bttn_wrapper.find(".fr-bttn").removeClass("active")}}),this.$element.on("mousedown touchstart",".f-img-handle",a.proxy(function(){return b.isDisabled?!1:void this.$element.attr("data-resize",!0)},this)),this.$element.on("mouseup",".f-img-handle",a.proxy(function(c){if(b.isDisabled)return!1;var d=a(c.target).prevAll("img");setTimeout(a.proxy(function(){this.$element.removeAttr("data-resize"),d.click()},this),0)},this))},a.Editable.prototype.initImagePopup=function(){this.$image_editor=a('<div class="froala-popup froala-image-editor-popup" style="display: none">');for(var b=a('<div class="f-popup-line f-popup-toolbar">').appendTo(this.$image_editor),c=0;c<this.options.imageButtons.length;c++){var d=this.options.imageButtons[c];if(void 0!==a.Editable.image_commands[d]){var e=a.Editable.image_commands[d],f='<button class="fr-bttn" data-cmd="'+d+'" title="'+e.title+'">';f+=void 0!==this.options.icons[d]?this.prepareIcon(this.options.icons[d],e.title):this.prepareIcon(e.icon,e.title),f+="</button>",b.append(f)}}this.addListener("hidePopups",this.hideImageEditorPopup),a('<div class="f-popup-line f-image-alt">').append('<label><span data-text="true">Title</span>: </label>').append(a('<input type="text">').on("mouseup keydown",function(a){var b=a.which;b&&27===b||a.stopPropagation()})).append('<button class="f-ok" data-text="true" data-cmd="setImageAlt" title="OK">OK</button>').appendTo(this.$image_editor);var g=this;this.$image_editor.find("button").click(function(b){b.stopPropagation(),g[a(this).attr("data-cmd")](g.$element.find("span.f-img-editor"))}),this.$popup_editor.append(this.$image_editor)},a.Editable.prototype.floatImageLeft=function(a){this.addImageClass(a,"fr-fil"),this.isImage&&this.$element.css("float","left"),this.saveUndoStep(),this.triggerEvent("imageFloatedLeft"),a.find("img").click()},a.Editable.prototype.floatImageNone=function(a){this.addImageClass(a,"fr-fin"),this.isImage||(a.parent().get(0)==this.$element.get(0)?a.wrap('<div style="text-align: center;"></div>'):a.parents(".f-img-wrap:first").css("text-align","center")),this.isImage&&this.$element.css("float","none"),this.saveUndoStep(),this.triggerEvent("imageFloatedNone"),a.find("img").click()},a.Editable.prototype.floatImageRight=function(a){this.addImageClass(a,"fr-fir"),this.isImage&&this.$element.css("float","right"),this.saveUndoStep(),this.triggerEvent("imageFloatedRight"),a.find("img").click()},a.Editable.prototype.linkImage=function(a){this.showInsertLink(),this.imageMode=!0,"A"==a.parent().get(0).tagName?(this.$link_wrapper.find('input[type="text"]').val(a.parent().attr("href")),this.$link_wrapper.find(".f-external-link").attr("href",a.parent().attr("href")),"_blank"==a.parent().attr("target")?this.$link_wrapper.find('input[type="checkbox"]').prop("checked",!0):this.$link_wrapper.find('input[type="checkbox"]').prop("checked",!1)):(this.$link_wrapper.find('input[type="text"]').val("http://"),this.$link_wrapper.find(".f-external-link").attr("href","#"),this.$link_wrapper.find('input[type="checkbox"]').prop("checked",this.options.alwaysBlank))},a.Editable.prototype.replaceImage=function(a){this.showInsertImage(),this.imageMode=!0,this.$image_wrapper.find('input[type="text"]').val(a.find("img").attr("src"));var b=a.find("img");this.showByCoordinates(b.offset().left+b.width()/2,b.offset().top+b.height())},a.Editable.prototype.removeImage=function(b){var c=b.find("img").get(0),d="Are you sure? Image will be deleted.";a.Editable.LANGS[this.options.language]&&(d=a.Editable.LANGS[this.options.language].translation[d]),confirm(d)?this.triggerEvent("beforeRemoveImage",[a(c)],!1)&&(b.parents(".f-img-wrap").length?b.parents(".f-img-wrap").remove():b.remove(),this.refreshImageList(!0),this.hide(),this.saveUndoStep(),this.wrapText(),this.triggerEvent("afterRemoveImage",[a(c)]),this.focus(),this.imageMode=!1):b.find("img").click()},a.Editable.prototype.setImageAlt=function(a){a.find("img").attr("alt",this.$image_editor.find('.f-image-alt input[type="text"]').val()),a.find("img").attr("title",this.$image_editor.find('.f-image-alt input[type="text"]').val()),this.saveUndoStep(),this.hide(),this.closeImageMode(),this.triggerEvent("imageAltSet")
},a.Editable.prototype.buildDragUpload=function(){var b=this;b.$image_wrapper.on("dragover","#f-upload-div-"+this._id,function(){return a(this).addClass("f-hover"),!1}),b.$image_wrapper.on("dragend","#f-upload-div-"+this._id,function(){return a(this).removeClass("f-hover"),!1}),b.$image_wrapper.on("drop","#f-upload-div-"+this._id,function(c){a(this).removeClass("f-hover"),c.preventDefault(),c.stopPropagation(),b.uploadImage(c.originalEvent.dataTransfer.files)}),b.$element.on("dragover dragend",function(a){return a.originalEvent.dataTransfer&&a.originalEvent.dataTransfer.files&&a.originalEvent.dataTransfer.files.length?!1:void 0}),b.$element.on("drop",function(a){if(a.originalEvent.dataTransfer&&a.originalEvent.dataTransfer.files&&a.originalEvent.dataTransfer.files.length){if(b.isDisabled)return!1;b.insertMarkersAtPoint(a.originalEvent),b.uploadImage(a.originalEvent.dataTransfer.files),a.preventDefault(),a.stopPropagation()}})},a.Editable.prototype.imagePreviewInsert=function(b,c){void 0===c&&(c=!0),this.enable(),this.restoreSelectionByMarkers(),this.focus();var d='<img class="fr-fin" data-fr-image-preview="'+c+'" alt="Image title" src="'+b+'" width="'+this.options.defaultImageWidth+'">',e=this.getSelectionElements()[0],f=this.getRange(),g=!this.browser.msie&&a.Editable.getIEversion()>8?a(f.startContainer):null;g&&g.hasClass("f-img-wrap")?(1===f.startOffset?(g.after('<p><span class="f-marker" data-type="true" data-id="0"></span><br/><span class="f-marker" data-type="false" data-id="0"></span></p>'),this.restoreSelectionByMarkers(),this.getSelection().collapseToStart()):0===f.startOffset&&(g.before('<p><span class="f-marker" data-type="true" data-id="0"></span><br/><span class="f-marker" data-type="false" data-id="0"></span></p>'),this.restoreSelectionByMarkers(),this.getSelection().collapseToStart()),this.insertHTML(d)):this.getSelectionTextInfo(e).atStart&&e!=this.$element.get(0)&&"TD"!=e.tagName&&"TH"!=e.tagName&&"LI"!=e.tagName?a(e).before("<p>"+d+"</p>"):this.insertHTML(d),c&&setTimeout(a.proxy(function(){var a=this.$element.find('img[data-fr-image-preview="true"]');a.length&&this.showByCoordinates(a.offset().left+a.width()/2,a.offset().top+a.height()+10)},this),10),this.disable()},a.Editable.prototype.imagePreview=function(b){if(this.files_to_upload=!0,"undefined"!=typeof FileReader){var c=new FileReader;c.onload=a.proxy(function(b){return this.isDisabled?(this.restoreSelectionByMarkers(),this.preview_image=new Image,this.preview_image.onload=a.proxy(function(){return this.isDisabled?void this.imagePreviewInsert(this.preview_image.src):!1},this),void(this.preview_image.src=b.target.result)):!1},this),c.readAsDataURL(b)}},a.Editable.prototype.showImageLoader=function(){this.$image_wrapper.find("h4").addClass("uploading"),this.$image_wrapper.find("#f-image-list-"+this._id).hide(),this.$progress_bar.show(),this.showInsertImage()},a.Editable.prototype.hideImageLoader=function(){this.$progress_bar.hide(),this.$progress_bar.find("span").css("width","0%").text(""),this.$image_wrapper.find("#f-image-list-"+this._id).show(),this.$image_wrapper.find("h4").removeClass("uploading")},a.Editable.prototype.writeImage=function(b,c){c&&(b=this.sanitizeURL(b));var d=new Image;return d.onerror=a.proxy(function(){this.hideImageLoader(),this.throwImageError(1)},this),this.imageMode?(d.onload=a.proxy(function(){var a=this.$element.find(".f-img-editor > img");a.attr("src",b),this.hide(),this.hideImageLoader(),this.$image_editor.show(),this.saveUndoStep(),this.triggerEvent("imageReplaced",[a])},this),d.src=b,!1):(d.onload=a.proxy(function(){this.insertLoadedImage(b,c)},this),void(d.src=b))},a.Editable.prototype.insertLoadedImage=function(a){this.triggerEvent("imageLoaded",[a],!1);var b=this.$element.find("img[data-fr-image-preview]");b.length?b.attr("src",a).removeAttr("data-fr-image-preview"):this.imagePreviewInsert(a),this.browser.msie&&this.$element.find("img").each(function(a,b){b.oncontrolselect=function(){return!1}}),this.enable(),this.hide(),this.hideImageLoader(),this.saveUndoStep(),this.focus(),this.wrapText(),this.triggerEvent("imageInserted",[a])},a.Editable.prototype.throwImageErrorWithMessage=function(a){this.enable(),this.$element.find("img[data-fr-image-preview]").remove(),this.triggerEvent("imageError",[{message:a,code:0}],!1),this.hideImageLoader()},a.Editable.prototype.throwImageError=function(a){this.enable(),this.$element.find("img[data-fr-image-preview]").remove();var b="Unknown image upload error.";1==a?b="Bad link.":2==a?b="No link in upload response.":3==a?b="Error during file upload.":4==a?b="Parsing response failed.":5==a?b="Image too large.":6==a?b="Invalid image type.":7==a&&(b="Image can be uploaded only to same domain in IE 8 and IE 9."),this.triggerEvent("imageError",[{code:a,message:b}],!1),this.hideImageLoader()},a.Editable.prototype.uploadImage=function(b){if(!this.triggerEvent("beforeImageUpload",[b],!1))return!1;if(void 0!==b&&b.length>0){var c;if(this.drag_support.formdata&&(c=this.drag_support.formdata?new FormData:null),c){var d;for(d in this.options.imageUploadParams)c.append(d,this.options.imageUploadParams[d]);if(this.options.imageUploadToS3!==!1){for(d in this.options.imageUploadToS3.params)c.append(d,this.options.imageUploadToS3.params[d]);c.append("success_action_status","201"),c.append("X-Requested-With","xhr"),c.append("Content-Type",b[0].type),c.append("key",this.options.imageUploadToS3.keyStart+(new Date).getTime()+"-"+b[0].name)}if(c.append(this.options.imageUploadParam,b[0]),b[0].size>this.options.maxImageSize)return this.throwImageError(5),!1;if(this.options.allowedImageTypes.indexOf(b[0].type.replace(/image\//g,""))<0)return this.throwImageError(6),!1}if(c){var e;this.options.crossDomain?e=this.createCORSRequest("POST",this.options.imageUploadURL):(e=new XMLHttpRequest,e.open("POST",this.options.imageUploadURL)),e.onload=a.proxy(function(){this.$progress_bar.find("span").css("width","100%").text("Please wait!");try{this.options.imageUploadToS3?201==e.status?this.parseImageResponseXML(e.responseXML):this.throwImageError(3):e.status>=200&&e.status<300?this.parseImageResponse(e.responseText):this.throwImageError(3)}catch(a){this.throwImageError(4)}},this),e.onerror=a.proxy(function(){this.throwImageError(3)},this),e.upload.onprogress=a.proxy(function(a){if(a.lengthComputable){var b=a.loaded/a.total*100|0;this.$progress_bar.find("span").css("width",b+"%")}},this),this.disable(),this.imagePreview(b[0]),e.send(c),this.showImageLoader()}}},a.Editable.prototype.parseImageResponse=function(b){try{var c=a.parseJSON(b);c.link?this.writeImage(c.link):c.error?this.throwImageErrorWithMessage(c.error):this.throwImageError(2)}catch(d){this.throwImageError(4)}},a.Editable.prototype.parseImageResponseXML=function(b){try{var c=a(b).find("Location").text(),d=a(b).find("Key").text();this.options.imageUploadToS3.callback.call(this,c,d),c?this.writeImage(c):this.throwImageError(2)}catch(e){this.throwImageError(4)}},a.Editable.prototype.setImageUploadURL=function(a){a&&(this.options.imageUploadURL=a),this.options.imageUploadToS3&&(this.options.imageUploadURL="https://"+this.options.imageUploadToS3.bucket+"."+this.options.imageUploadToS3.region+".amazonaws.com/")},a.Editable.prototype.closeImageMode=function(){this.$element.find("span.f-img-editor > img").each(a.proxy(function(b,c){this.addImageClass(a(c),this.getImageClass(a(c).parent().attr("class"))),a(c).parents(".f-img-wrap").length>0?"A"==a(c).parent().parent().get(0).tagName?a(c).siblings("span.f-img-handle").remove().end().unwrap().parent().unwrap():a(c).siblings("span.f-img-handle").remove().end().unwrap().unwrap():a(c).siblings("span.f-img-handle").remove().end().unwrap()},this)),this.$element.find("span.f-img-editor").length&&(this.$element.find("span.f-img-editor").remove(),this.$element.parents("span.f-img-editor").remove()),this.$element.removeClass("f-non-selectable"),this.editableDisabled||this.isHTML||this.$element.attr("contenteditable",!0),this.$image_editor&&this.$image_editor.hide(),this.$link_wrapper&&this.$link_wrapper.find('input[type="text"].f-lt').parent().removeClass("fr-hidden")},a.Editable.prototype.refreshImageList=function(b){if(!this.isLink&&!this.options.editInPopup){var c=[],d=[],e=this;if(this.$element.find("img").each(function(b,f){var g=a(f);if(c.push(g.attr("src")),d.push(g),0===g.parents(".f-img-editor").length&&!g.hasClass("fr-fil")&&!g.hasClass("fr-fir")&&!g.hasClass("fr-fin")){var h;"right"==g.css("float")?(h=g.parent(),h.hasClass("f-img-editor")?h.addClass("fr-fir"):g.addClass("fr-fir")):"left"==g.css("float")?(h=g.parent(),h.hasClass("f-img-editor")?h.addClass("fr-fil"):g.addClass("fr-fil")):(h=g.parent(),h.hasClass("f-img-editor")?h.addClass("fr-fin"):g.addClass("fr-fin"))}e.options.textNearImage?g.removeClass("fr-tni"):g.addClass("fr-tni"),g.css("margin",""),g.css("float","")}),void 0===b)for(var f=0;f<this.imageList.length;f++)c.indexOf(this.imageList[f].attr("src"))<0&&this.triggerEvent("afterRemoveImage",[this.imageList[f]],!1);this.imageList=d}},a.Editable.prototype.insertImage=function(){this.closeImageMode(),this.imageMode=!1,this.showInsertImage(),this.saveSelectionByMarkers(),this.options.inlineMode||this.positionPopup("insertImage"),this.imageMode=!1,this.$image_wrapper.find('input[type="text"]').val("")}}(jQuery),function(a){a.Editable.prototype.showLinkWrapper=function(){this.$link_wrapper&&(this.$link_wrapper.show(),this.$link_wrapper.trigger("hideLinkList"),this.$link_wrapper.trigger("hideLinkClassList"),this.imageMode?this.$link_wrapper.find('input[type="text"].f-lt').parent().addClass("fr-hidden"):this.$link_wrapper.find('input[type="text"].f-lt').parent().removeClass("fr-hidden"),setTimeout(a.proxy(function(){this.$link_wrapper.find('input[type="text"].f-lu').focus().select()},this),0),this.link=!0)},a.Editable.prototype.hideLinkWrapper=function(){this.$link_wrapper&&this.$link_wrapper.hide()},a.Editable.prototype.showInsertLink=function(){this.hidePopups(),this.showLinkWrapper()},a.Editable.prototype.initLinkEvents=function(){var b=this,c=function(a){a.stopPropagation(),a.preventDefault()},d=function(c){if(c.stopPropagation(),c.preventDefault(),b.isDisabled)return!1;b.link=!0,b.clearSelection(),b.removeMarkers(),b.selectionDisabled||(a(this).before('<span class="f-marker" data-type="true" data-id="0" data-fr-verified="true"></span>'),a(this).after('<span class="f-marker" data-type="false" data-id="0" data-fr-verified="true"></span>')),b.restoreSelectionByMarkers(),b.exec("createLink");var d=a(this).attr("href")||"";b.$link_wrapper.find("input.f-lt").val(a(this).text()),b.isLink?("#"==d&&(d=""),b.$link_wrapper.find("input#f-lu-"+b._id).val(d.replace(/\&amp;/g,"&")),b.$link_wrapper.find(".f-external-link").attr("href",d||"#")):(b.$link_wrapper.find("input.f-lu").val(d.replace(/\&amp;/g,"&")),b.$link_wrapper.find(".f-external-link").attr("href",d)),b.$link_wrapper.find('input[type="checkbox"]').prop("checked","_blank"==a(this).attr("target")),b.$link_wrapper.find("li.f-choose-link-class").each(a.proxy(function(b,c){a(this).hasClass(a(c).data("class"))&&a(c).click()},this)),a(this).hasClass("fr-file")?b.$link_wrapper.find("input.f-lu").parent().addClass("fr-hidden"):b.$link_wrapper.find("input.f-lu").parent().removeClass("fr-hidden"),b.showByCoordinates(a(this).offset().left+a(this).outerWidth()/2,a(this).offset().top+(parseInt(a(this).css("padding-top"))||0)+a(this).height()),b.$link_wrapper.find("input.f-lu").focus(),b.showInsertLink(),b.closeImageMode()};this.$element.on("mousedown","a",a.proxy(function(a){this.isResizing()||a.stopPropagation()},this)),this.isLink?this.iOS()?(this.$element.on("click",c),this.$element.on("touchend",d)):this.$element.on("click",d):this.iOS()?(this.$element.on("click",'a:not([contenteditable="false"])',c),this.$element.on("touchend",'a:not([contenteditable="false"])',d),this.$element.on("click",'a[contenteditable="false"]',c),this.$element.on("touchend",'a[contenteditable="false"]',c)):(this.$element.on("click",'a:not([contenteditable="false"])',d),this.$element.on("click",'a[contenteditable="false"]',c))},a.Editable.prototype.destroyLink=function(){this.$link_wrapper.html("").removeData().remove()},a.Editable.prototype.initLink=function(){this.buildCreateLink(),this.initLinkEvents(),this.addListener("destroy",this.destroyLink)},a.Editable.initializers.push(a.Editable.prototype.initLink),a.Editable.prototype.writeLink=function(b,c,d,e,f){var g;this.options.noFollow&&(f=!0),this.options.alwaysBlank&&(e=!0);var h="",i="";if(f===!0&&/^https?:\/\//.test(b)&&(h='rel="nofollow"'),e===!0&&(i='target="_blank"'),b=this.sanitizeURL(b),this.imageMode){if(""!==b){if("A"!=this.$element.find(".f-img-editor").parent().get(0).tagName)this.$element.find(".f-img-editor").wrap('<a data-fr-link="true" href="'+b+'" '+i+" "+h+"></a>");else{var j=this.$element.find(".f-img-editor").parent();e===!0?j.attr("target","_blank"):j.removeAttr("target"),f===!0?j.attr("rel","nofollow"):j.removeAttr("rel"),j.removeClass(Object.keys(this.options.linkClasses).join(" ")),j.attr("href",b).addClass(d)}this.triggerEvent("imageLinkInserted",[b])}else"A"==this.$element.find(".f-img-editor").parent().get(0).tagName&&a(this.$element.find(".f-img-editor").get(0)).unwrap(),this.triggerEvent("imageLinkRemoved");this.saveUndoStep(),this.showImageEditor(),this.$element.find(".f-img-editor").find("img").click(),this.link=!1}else{var k=null;if(this.isLink?""===c&&(c=this.$element.text()):(this.restoreSelection(),g=this.getSelectionLinks(),g.length>0&&(k=g[0].attributes),this.saveSelectionByMarkers(),document.execCommand("unlink",!1,b),this.$element.find('span[data-fr-link="true"]').each(function(b,c){a(c).replaceWith(a(c).html())}),this.restoreSelectionByMarkers()),""!==b){this.isLink?(this.$element.text(c),g=[this.$element.attr("href",b).get(0)]):(this.removeMarkers(),this.insertHTML('<span class="f-marker" data-fr-verified="true" data-id="0" data-type="true"></span>'+(c||b)+'<span class="f-marker" data-fr-verified="true" data-id="0" data-type="false"></span>'),this.restoreSelectionByMarkers(),document.execCommand("createLink",!1,b),g=this.getSelectionLinks());for(var l=0;l<g.length;l++){if(k)for(var m=0;m<k.length;m++)"href"!=k[m].nodeName&&a(g[l]).attr(k[m].nodeName,k[m].nodeValue);e===!0?a(g[l]).attr("target","_blank"):a(g[l]).removeAttr("target"),f===!0&&/^https?:\/\//.test(b)?a(g[l]).attr("rel","nofollow"):a(g[l]).removeAttr("rel"),a(g[l]).data("fr-link",!0),a(g[l]).removeClass(Object.keys(this.options.linkClasses).join(" ")),a(g[l]).addClass(d)}this.$element.find("a:empty").remove(),this.triggerEvent("linkInserted",[b])}else this.isLink||this.$element.find("a:empty").remove(),this.triggerEvent("linkRemoved");this.saveUndoStep(),this.hideLinkWrapper(),this.$bttn_wrapper.show(),(!this.options.inlineMode||this.isLink)&&this.hide(),this.link=!1}},a.Editable.prototype.createLinkHTML=function(){var a='<div class="froala-popup froala-link-popup" style="display: none;">';a+='<h4><span data-text="true">Insert link</span><a target="_blank" title="Open Link" class="f-external-link" href="#"><i class="fa fa-external-link"></i></a><i title="Cancel" class="fa fa-times" id="f-link-close-'+this._id+'"></i></h4>',this.options.linkText&&(a+='<div class="f-popup-line"><input type="text" placeholder="Text" class="f-lt" id="f-lt-'+this._id+'"></div>');var b="";if(this.options.linkList.length&&(b="f-bi"),a+='<div class="f-popup-line"><input type="text" placeholder="http://www.example.com" class="f-lu '+b+'" id="f-lu-'+this._id+'"/>',this.options.linkList.length){a+='<button class="f-browse-links" id="f-browse-links-'+this._id+'"><i class="fa fa-chevron-down"></i></button>',a+='<ul id="f-link-list-'+this._id+'">';for(var c=0;c<this.options.linkList.length;c++){var d=this.options.linkList[c];a+='<li class="f-choose-link" data-nofollow="'+d.nofollow+'" data-blank="'+d.blank+'" data-body="'+d.body+'" data-title="'+d.title+'" data-href="'+d.href+'">'+d.body+"</li>"}a+="</ul>"}if(a+="</div>",Object.keys(this.options.linkClasses).length){a+='<div class="f-popup-line"><input type="text" placeholder="Choose link type" class="f-lu f-bi" id="f-luc-'+this._id+'" disabled="disabled"/>',a+='<button class="f-browse-links" id="f-links-class-'+this._id+'"><i class="fa fa-chevron-down"></i></button>',a+='<ul id="f-link-class-list-'+this._id+'">';for(var e in this.options.linkClasses){var f=this.options.linkClasses[e];a+='<li class="f-choose-link-class" data-class="'+e+'">'+f+"</li>"}a+="</ul>",a+="</div>"}return a+='<div class="f-popup-line"><input type="checkbox" id="f-checkbox-'+this._id+'"> <label data-text="true" for="f-checkbox-'+this._id+'">Open in new tab</label><button data-text="true" type="button" class="f-ok" id="f-ok-'+this._id+'">OK</button>',this.options.unlinkButton&&(a+='<button type="button" data-text="true" class="f-ok f-unlink" id="f-unlink-'+this._id+'">UNLINK</button>'),a+="</div></div>"},a.Editable.prototype.buildCreateLink=function(){this.$link_wrapper=a(this.createLinkHTML()),this.$popup_editor.append(this.$link_wrapper);var b=this;this.addListener("hidePopups",this.hideLinkWrapper),this.$link_wrapper.on("mouseup",a.proxy(function(a){this.isResizing()||(a.stopPropagation(),this.$link_wrapper.trigger("hideLinkList"))},this)),this.options.linkText&&this.$link_wrapper.on("mouseup keydown","input#f-lt-"+this._id,a.proxy(function(a){var b=a.which;b&&27===b||a.stopPropagation(),this.$link_wrapper.trigger("hideLinkList"),this.$link_wrapper.trigger("hideLinkClassList")},this)),this.$link_wrapper.on("mouseup keydown","input#f-lu-"+this._id,a.proxy(function(a){var b=a.which;b&&27===b||a.stopPropagation(),this.$link_wrapper.trigger("hideLinkList"),this.$link_wrapper.trigger("hideLinkClassList")},this)),this.$link_wrapper.on("click keydown","input#f-checkbox-"+this._id,function(a){var b=a.which;b&&27===b||a.stopPropagation()}),this.$link_wrapper.on("touchend","button#f-ok-"+this._id,function(a){a.stopPropagation()}).on("click","button#f-ok-"+this._id,a.proxy(function(){var a,b=this.$link_wrapper.find("input#f-lt-"+this._id),c=this.$link_wrapper.find("input#f-lu-"+this._id),d=this.$link_wrapper.find("input#f-luc-"+this._id),e=this.$link_wrapper.find("input#f-checkbox-"+this._id);a=b?b.val():"";var f=c.val();this.isLink&&""===f&&(f="#");var g="";d&&(g=d.data("class")),this.writeLink(f,a,g,e.prop("checked"))},this)),this.$link_wrapper.on("click touch","button#f-unlink-"+this._id,a.proxy(function(){this.link=!0;var a=this.$link_wrapper.find("input#f-checkbox-"+this._id);this.writeLink("","","",a.prop("checked"))},this)),this.options.linkList.length&&(this.$link_wrapper.on("click touch","li.f-choose-link",function(){var c=b.$link_wrapper.find("button#f-browse-links-"+b._id),d=b.$link_wrapper.find("input#f-lt-"+b._id),e=b.$link_wrapper.find("input#f-lu-"+b._id),f=b.$link_wrapper.find("input#f-checkbox-"+b._id);d&&d.val(a(this).data("body")),e.val(a(this).data("href")),f.prop("checked",a(this).data("blank")),c.click()}).on("mouseup","li.f-choose-link",function(a){a.stopPropagation()}),this.$link_wrapper.on("click","button#f-browse-links-"+this._id,function(c){c.stopPropagation();var d=b.$link_wrapper.find("ul#f-link-list-"+b._id);b.$link_wrapper.trigger("hideLinkClassList"),a(this).find("i").toggleClass("fa-chevron-down"),a(this).find("i").toggleClass("fa-chevron-up"),d.toggle()}).on("mouseup","button#f-browse-links-"+this._id,function(a){a.stopPropagation()}),this.$link_wrapper.bind("hideLinkList",function(){var a=b.$link_wrapper.find("ul#f-link-list-"+b._id),c=b.$link_wrapper.find("button#f-browse-links-"+b._id);a&&a.is(":visible")&&c.click()})),Object.keys(this.options.linkClasses).length&&(this.$link_wrapper.on("mouseup keydown","input#f-luc-"+this._id,a.proxy(function(a){var b=a.which;b&&27===b||a.stopPropagation(),this.$link_wrapper.trigger("hideLinkList"),this.$link_wrapper.trigger("hideLinkClassList")},this)),this.$link_wrapper.on("click touch","li.f-choose-link-class",function(){var c=b.$link_wrapper.find("input#f-luc-"+b._id);c.val(a(this).text()),c.data("class",a(this).data("class")),b.$link_wrapper.trigger("hideLinkClassList")}).on("mouseup","li.f-choose-link-class",function(a){a.stopPropagation()}),this.$link_wrapper.on("click","button#f-links-class-"+this._id,function(c){c.stopPropagation(),b.$link_wrapper.trigger("hideLinkList");var d=b.$link_wrapper.find("ul#f-link-class-list-"+b._id);a(this).find("i").toggleClass("fa-chevron-down"),a(this).find("i").toggleClass("fa-chevron-up"),d.toggle()}).on("mouseup","button#f-links-class-"+this._id,function(a){a.stopPropagation()}),this.$link_wrapper.bind("hideLinkClassList",function(){var a=b.$link_wrapper.find("ul#f-link-class-list-"+b._id),c=b.$link_wrapper.find("button#f-links-class-"+b._id);a&&a.is(":visible")&&c.click()})),this.$link_wrapper.on("click","i#f-link-close-"+this._id,a.proxy(function(){this.$bttn_wrapper.show(),this.hideLinkWrapper(),(!this.options.inlineMode&&!this.imageMode||this.isLink||0===this.options.buttons.length)&&this.hide(),this.imageMode?this.showImageEditor():this.restoreSelection()},this))},a.Editable.prototype.getSelectionLinks=function(){var a,b,c,d,e=[];if(window.getSelection){var f=window.getSelection();if(f.getRangeAt&&f.rangeCount){d=document.createRange();for(var g=0;g<f.rangeCount;++g)if(a=f.getRangeAt(g),b=a.commonAncestorContainer,1!=b.nodeType&&(b=b.parentNode),"a"==b.nodeName.toLowerCase())e.push(b);else{c=b.getElementsByTagName("a");for(var h=0;h<c.length;++h)d.selectNodeContents(c[h]),d.compareBoundaryPoints(a.END_TO_START,a)<1&&d.compareBoundaryPoints(a.START_TO_END,a)>-1&&e.push(c[h])}d.detach()}}else if(document.selection&&"Control"!=document.selection.type)if(a=document.selection.createRange(),b=a.parentElement(),"a"==b.nodeName.toLowerCase())e.push(b);else{c=b.getElementsByTagName("a"),d=document.body.createTextRange();for(var i=0;i<c.length;++i)d.moveToElementText(c[i]),d.compareEndPoints("StartToEnd",a)>-1&&d.compareEndPoints("EndToStart",a)<1&&e.push(c[i])}return e},a.Editable.prototype.insertLink=function(){this.options.inlineMode||(this.closeImageMode(),this.imageMode=!1,this.positionPopup("createLink")),this.showInsertLink(),this.saveSelection();var b=this.getSelectionLink()||"",c=this.getSelectionLinks();c.length>0?(this.$link_wrapper.find('input[type="checkbox"]').prop("checked","_blank"==a(c[0]).attr("target")),this.$link_wrapper.find('input[type="text"].f-lt').val(a(c[0]).text()||""),a(c[0]).hasClass("fr-file")?this.$link_wrapper.find('input[type="text"].f-lu').parent().addClass("fr-hidden"):this.$link_wrapper.find('input[type="text"].f-lu').parent().removeClass("fr-hidden")):(this.$link_wrapper.find('input[type="checkbox"]').prop("checked",this.options.alwaysBlank),this.$link_wrapper.find('input[type="text"].f-lt').val(this.text()),this.$link_wrapper.find('input[type="text"].f-lu').parent().removeClass("fr-hidden")),this.$link_wrapper.find(".f-external-link").attr("href",b||"#"),this.$link_wrapper.find('input[type="text"].f-lu').val(b.replace(/\&amp;/g,"&")||"http://")}}(jQuery),function(a){a.Editable.prototype.browserFixes=function(){this.preBlockquoteEnter(),this.domInsert()},a.Editable.prototype.preBlockquoteEnter=function(){this.isImage||this.isLink||this.options.editInPopup||this.$element.on("keydown",a.proxy(function(b){var c=b.which,d=["PRE","BLOCKQUOTE"],e=this.getSelectionElements()[0];if(13==c&&""===this.text()&&d.indexOf(e.tagName)>=0&&0===a(e).parents("ul, ol").length)if(this.getSelectionTextInfo(e).atEnd&&!b.shiftKey){b.preventDefault();var f=a("<p><br></p>");a(e).after(f),this.setSelection(f.get(0))}else(this.browser.webkit||this.browser.msie)&&(b.preventDefault(),this.insertHTML(this.endsWith(a(e).html(),"<br>")||!this.getSelectionTextInfo(e).atEnd?"<br>":"<br><br>"))},this))},a.Editable.prototype.domInsert=function(){this.$element.on("DOMNodeInserted",a.proxy(function(b){"SPAN"!=b.target.tagName||a(b.target).attr("data-fr-verified")||this.no_verify||(a(b.target).before(a(b.target).contents()),a(b.target).remove())},this))}}(jQuery),function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a,b){function c(a){function b(){d?(c(),M(b),e=!0,d=!1):e=!1}var c=a,d=!1,e=!1;this.kick=function(){d=!0,e||b()},this.end=function(a){var b=c;a&&(e?(c=d?function(){b(),a()}:a,d=!0):a())}}function d(){return!0}function e(){return!1}function f(a){a.preventDefault()}function g(a){N[a.target.tagName.toLowerCase()]||a.preventDefault()}function h(a){return 1===a.which&&!a.ctrlKey&&!a.altKey}function i(a,b){var c,d;if(a.identifiedTouch)return a.identifiedTouch(b);for(c=-1,d=a.length;++c<d;)if(a[c].identifier===b)return a[c]}function j(a,b){var c=i(a.changedTouches,b.identifier);if(c&&(c.pageX!==b.pageX||c.pageY!==b.pageY))return c}function k(a){var b;h(a)&&(b={target:a.target,startX:a.pageX,startY:a.pageY,timeStamp:a.timeStamp},J(document,O.move,l,b),J(document,O.cancel,m,b))}function l(a){var b=a.data;s(a,b,a,n)}function m(){n()}function n(){K(document,O.move,l),K(document,O.cancel,m)}function o(a){var b,c;N[a.target.tagName.toLowerCase()]||(b=a.changedTouches[0],c={target:b.target,startX:b.pageX,startY:b.pageY,timeStamp:a.timeStamp,identifier:b.identifier},J(document,P.move+"."+b.identifier,p,c),J(document,P.cancel+"."+b.identifier,q,c))}function p(a){var b=a.data,c=j(a,b);c&&s(a,b,c,r)}function q(a){var b=a.data,c=i(a.changedTouches,b.identifier);c&&r(b.identifier)}function r(a){K(document,"."+a,p),K(document,"."+a,q)}function s(a,b,c,d){var e=c.pageX-b.startX,f=c.pageY-b.startY;I*I>e*e+f*f||v(a,b,c,e,f,d)}function t(){return this._handled=d,!1}function u(a){try{a._handled()}catch(b){return!1}}function v(a,b,c,d,e,f){{var g,h;b.target}g=a.targetTouches,h=a.timeStamp-b.timeStamp,b.type="movestart",b.distX=d,b.distY=e,b.deltaX=d,b.deltaY=e,b.pageX=c.pageX,b.pageY=c.pageY,b.velocityX=d/h,b.velocityY=e/h,b.targetTouches=g,b.finger=g?g.length:1,b._handled=t,b._preventTouchmoveDefault=function(){a.preventDefault()},L(b.target,b),f(b.identifier)}function w(a){var b=a.data.timer;a.data.touch=a,a.data.timeStamp=a.timeStamp,b.kick()}function x(a){var b=a.data.event,c=a.data.timer;y(),D(b,c,function(){setTimeout(function(){K(b.target,"click",e)},0)})}function y(){K(document,O.move,w),K(document,O.end,x)}function z(a){var b=a.data.event,c=a.data.timer,d=j(a,b);d&&(a.preventDefault(),b.targetTouches=a.targetTouches,a.data.touch=d,a.data.timeStamp=a.timeStamp,c.kick())}function A(a){var b=a.data.event,c=a.data.timer,d=i(a.changedTouches,b.identifier);d&&(B(b),D(b,c))}function B(a){K(document,"."+a.identifier,z),K(document,"."+a.identifier,A)}function C(a,b,c){var d=c-a.timeStamp;a.type="move",a.distX=b.pageX-a.startX,a.distY=b.pageY-a.startY,a.deltaX=b.pageX-a.pageX,a.deltaY=b.pageY-a.pageY,a.velocityX=.3*a.velocityX+.7*a.deltaX/d,a.velocityY=.3*a.velocityY+.7*a.deltaY/d,a.pageX=b.pageX,a.pageY=b.pageY}function D(a,b,c){b.end(function(){return a.type="moveend",L(a.target,a),c&&c()})}function E(){return J(this,"movestart.move",u),!0}function F(){return K(this,"dragstart drag",f),K(this,"mousedown touchstart",g),K(this,"movestart",u),!0}function G(a){"move"!==a.namespace&&"moveend"!==a.namespace&&(J(this,"dragstart."+a.guid+" drag."+a.guid,f,b,a.selector),J(this,"mousedown."+a.guid,g,b,a.selector))}function H(a){"move"!==a.namespace&&"moveend"!==a.namespace&&(K(this,"dragstart."+a.guid+" drag."+a.guid),K(this,"mousedown."+a.guid))}var I=6,J=a.event.add,K=a.event.remove,L=function(b,c,d){a.event.trigger(c,d,b)},M=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){return window.setTimeout(function(){a()},25)}}(),N={textarea:!0,input:!0,select:!0,button:!0},O={move:"mousemove",cancel:"mouseup dragstart",end:"mouseup"},P={move:"touchmove",cancel:"touchend",end:"touchend"};a.event.special.movestart={setup:E,teardown:F,add:G,remove:H,_default:function(a){function d(){C(f,g.touch,g.timeStamp),L(a.target,f)}var f,g;a._handled()&&(f={target:a.target,startX:a.startX,startY:a.startY,pageX:a.pageX,pageY:a.pageY,distX:a.distX,distY:a.distY,deltaX:a.deltaX,deltaY:a.deltaY,velocityX:a.velocityX,velocityY:a.velocityY,timeStamp:a.timeStamp,identifier:a.identifier,targetTouches:a.targetTouches,finger:a.finger},g={event:f,timer:new c(d),touch:b,timeStamp:b},a.identifier===b?(J(a.target,"click",e),J(document,O.move,w,g),J(document,O.end,x,g)):(a._preventTouchmoveDefault(),J(document,P.move+"."+a.identifier,z,g),J(document,P.end+"."+a.identifier,A,g)))}},a.event.special.move={setup:function(){J(this,"movestart.move",a.noop)},teardown:function(){K(this,"movestart.move",a.noop)}},a.event.special.moveend={setup:function(){J(this,"movestart.moveend",a.noop)},teardown:function(){K(this,"movestart.moveend",a.noop)}},J(document,"mousedown.move",k),J(document,"touchstart.move",o),"function"==typeof Array.prototype.indexOf&&!function(a){for(var b=["changedTouches","targetTouches"],c=b.length;c--;)-1===a.event.props.indexOf(b[c])&&a.event.props.push(b[c])}(a)}),window.WYSIWYGModernizr=function(a,b,c){function d(a){n.cssText=a}function e(a,b){return typeof a===b}var f,g,h,i="2.7.1",j={},k=b.documentElement,l="modernizr",m=b.createElement(l),n=m.style,o=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),p={},q=[],r=q.slice,s=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:l+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',l,'">',a,"</style>"].join(""),j.id=l,(m?j:n).innerHTML+=f,n.appendChild(j),m||(n.style.background="",n.style.overflow="hidden",i=k.style.overflow,k.style.overflow="hidden",k.appendChild(n)),g=c(j,a),m?j.parentNode.removeChild(j):(n.parentNode.removeChild(n),k.style.overflow=i),!!g},t=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return s("@media "+b+" { #"+l+" { position: absolute; } }",function(b){d="absolute"==(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position}),d},u={}.hasOwnProperty;h=e(u,"undefined")||e(u.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return u.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=r.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(r.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(r.call(arguments)))};return d}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:s(["@media (",o.join("touch-enabled),("),l,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c};for(var v in p)h(p,v)&&(g=v.toLowerCase(),j[g]=p[v](),q.push((j[g]?"":"no-")+g));return j.addTest=function(a,b){if("object"==typeof a)for(var d in a)h(a,d)&&j.addTest(d,a[d]);else{if(a=a.toLowerCase(),j[a]!==c)return j;b="function"==typeof b?b():b,"undefined"!=typeof enableClasses&&enableClasses&&(k.className+=" "+(b?"":"no-")+a),j[a]=b}return j},d(""),m=f=null,j._version=i,j._prefixes=o,j.mq=t,j.testStyles=s,j}(this,this.document),!function(a){a.Editable.TAG_ORDER=["table","thead","tbody","tfoot","tr","th","td","ul","ol","li","h1","h2","h3","h4","h5","h6","pre","blockquote","p","div","a","strong","em","strike","u","span","iframe","object","param"],a.Editable.SEPARATE=["th","td","li","h1","h2","h3","h4","h5","h6","pre","blockquote","p","div"],a.Editable.END_AT_SAME_INDEX=["table","thead","tbody","tfoot","tr","th","td","a","span","iframe","div","object","param"],a.Editable.prototype.isClosingTag=function(a){return null!==a.match(/^<\/([a-zA-Z0-9]+)([^<]+)*>$/gi)},a.Editable.prototype.tagName=function(a){return a.replace(/^<\/?([a-zA-Z0-9]+)([^<]+)*>$/gi,"$1").toLowerCase()},a.Editable.SELF_CLOSING_TAGS=["br","button","input","img","hr","param"],a.Editable.prototype.isSelfClosingTag=function(b){var c=this.tagName(b);
return a.Editable.SELF_CLOSING_TAGS.indexOf(c)>=0},a.Editable.prototype.tagKey=function(a){return a.type+(a.attrs||[]).sort().join("|")},a.Editable.prototype.extendedKey=function(a){return this.tagKey(a)+JSON.stringify(a.style)},a.Editable.prototype.mergeStyle=function(b,c){for(var d={},e=a.merge(Object.keys(b.style),Object.keys(c.style)),f=0;f<e.length;f++){var g=e[f];d[g]=null!=c.style[g]?c.style[g]:b.style[g]}return d},a.Editable.prototype.mapDOM=function(b){for(var c,d,e,f,g=0,h=0,i=[],j="",k=[],l={},m={},n=0;n<b.length;n++)if(c=b.charAt(n),"<"==c){var o=b.indexOf(">",n+1);if(-1!==o){if(h++,d=b.substring(n,o+1),f=this.tagName(d),"b"==f&&(f="strong"),"i"==f&&(f="em"),this.isSelfClosingTag(d)){m[g]||(m[g]=[]),m[g].push({i:h,content:d}),n=o;continue}var p=this.isClosingTag(d),q=null,r=d.replace(/^<[\S\s]* style=("[^"]+"|'[^']+')[\S\s]*>$/gi,"$1"),s={};if(r!=d&&(r=r.substring(1,r.length-1),matches=r.match(/([^:]*):([^:;]*;|$)/gi)))for(var t=0;t<matches.length;t++){var u=matches[t].split(":"),v=u.slice(1).join(":").trim();";"==v[v.length-1]&&(v=v.substr(0,v.length-1)),s[u[0]]=v}if(q=d.match(/([\w\-]*)=("[^<>"]*"|'[^<>']*'|\w+)/gi))for(var w=0;w<q.length;w++)0===q[w].indexOf("style=")&&q.splice(w,1);if(p){var x=l[f].pop();g==i[x].start&&a.Editable.END_AT_SAME_INDEX.indexOf(f)>=0&&(m[g]||(m[g]=[]),m[g].push({i:i[x].i,content:i[x].original}),m[g].push({i:h,content:d}))}else i.push({type:f,attrs:q,style:s,start:g,i:h,original:d}),l[f]||(l[f]=[]),l[f].push(i.length-1);n=o}}else{j+=c,k[g]={};for(f in l){e=l[f];for(var y=0;y<e.length;y++){d=i[e[y]];var z=this.tagKey(d);k[g][z]?k[g][z].style=this.mergeStyle(k[g][z],d):k[g][z]=a.extend({},d)}}g++}var A=[];for(n=0;n<k.length;n++){A[n]={};for(var B in k[n])A[n][this.extendedKey(k[n][B])]=k[n][B]}return{text:j,format:A,simple_tags:m}},a.Editable.prototype.froalaDOM=function(b){for(var c,d=[],e={},f=0;f<b.length;f++){var g=b[f];for(c in e)g[c]||(e[c].end=f,d.push(a.extend({},e[c])),delete e[c]);for(var h in g)e[h]||(g[h].start=f,e[h]=g[h])}for(c in e)e[c].end=b.length,d.push(e[c]);return d},a.Editable.prototype.sortNodes=function(b,c){return a.Editable.TAG_ORDER.indexOf(b.type)-a.Editable.TAG_ORDER.indexOf(c.type)},a.Editable.prototype.sortSimpleTags=function(a,b){return a.i-b.i},a.Editable.prototype.openTag=function(a){var b="<"+a.type;if(a.attrs){a.attrs.sort();for(var c=0;c<a.attrs.length;c++)b+=" "+a.attrs[c]}var d="";for(var e in a.style)null!=a.style[e]&&(d+=e.replace("_","-")+": "+a.style[e]+"; ");return""!==d&&(b+=' style="'+d.trim()+'"'),b+=">"},a.Editable.prototype.cleanOutput=function(b){var c,d,e,f,g=this.mapDOM(b),h=this.froalaDOM(g.format),i=g.simple_tags,j=g.text,k={};for(d=0;d<h.length;d++)c=h[d],k[c.start]||(k[c.start]=[]),k[c.start].push(c);var l={};for(b="",d=0;d<=j.length;d++){var m=[];if(i[d])for(i[d]=i[d].sort(this.sortSimpleTags),f=0;f<i[d].length;f++)b+=i[d][f].content;if(l[d]){for(var n in l)if(n>d)for(e=0;e<l[n].length;e++){var o=l[n][e];o.start>=l[d][l[d].length-1].start&&a.Editable.TAG_ORDER.indexOf(o.type)>a.Editable.TAG_ORDER.indexOf(l[d][l[d].length-1].type)&&a.Editable.SEPARATE.indexOf(o.type)<0&&(b+="</"+o.type+">",m.push(o),l[n].splice(e,1))}for(e=0;e<l[d].length;e++)b+="</"+l[d][e].type+">"}for(k[d]||(k[d]=[]);m.length>0;){var p=m.pop();p.start=d,k[d].push(p)}if(k[d])for(k[d]=k[d].sort(this.sortNodes),e=0;e<k[d].length;e++)c=k[d][e],l[c.end]||(l[c.end]=[]),l[c.end].push(c),b+=this.openTag(c);d!=j.length&&(b+=j[d])}return b},a.Editable.prototype.cleanify=function(b){var c,d="p, h1, h2, h3, h4, h5, h6, div, td, th, pre, li, blockquote";if(this.isHTML)return!1;void 0===b&&(b=!0),this.no_verify=!0,this.saveSelectionByMarkers(),c=b?this.getSelectionElements():this.$element.find(d);var e,f;if(c[0]!=this.$element.get(0))for(var g=0;g<c.length;g++){var h=a(c[g]);e=h.html(),f=this.cleanOutput(e),f!==e&&h.html(f)}else 0===this.$element.find(d).length&&(e=this.$element.html(),f=this.cleanOutput(e),f!==e&&this.$element.html(f));this.restoreSelectionByMarkers(),this.$element.is(":focus")&&this.focus(),this.$element.find("span").attr("data-fr-verified",!0),this.no_verify=!1}}(jQuery);
/*!
 * froala_editor v1.2.1 (http://editor.froala.com)
 * Copyright 2014-2014 Froala
 */

Array.prototype.indexOf||(Array.prototype.indexOf=function(a){if(void 0===this||null===this)throw TypeError();var b=Object(this),c=b.length>>>0;if(0===c)return-1;var d=0;if(arguments.length>0&&(d=Number(arguments[1]),isNaN(d)?d=0:0!==d&&d!==1/0&&d!==-(1/0)&&(d=(d>0||-1)*Math.floor(Math.abs(d)))),d>=c)return-1;for(var e=d>=0?d:Math.max(c-Math.abs(d),0);c>e;e++)if(e in b&&b[e]===a)return e;return-1}),String.prototype.trim||(String.prototype.trim=function(){return String(this).replace(/^\s+/,"").replace(/\s+$/,"")}),Object.keys||(Object.keys=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b});var Node=Node||{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3};$.Editable.prototype.saveSelection=function(){var a=window.document.selection;this.savedSelection="None"!=a.type?a.createRange():null},$.Editable.prototype.restoreSelection=function(){this.selectionDisabled||this.savedSelection&&this.savedSelection.select()},$.Editable.prototype.getSelectionTextInfo=function(){return!1};
(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() <= 0) {
      return $('#home_top_nav').fadeOut();
    } else {
      return $('#home_top_nav').fadeIn();
    }
  });

}).call(this);
/**
* @preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/

;(function(window, document) {
/*jshint evil:true */
  /** version */
  var version = '3.7.2';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          // assign a false positive if unable to shiv
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
        }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if(typeof elements != 'string'){
      elements = elements.join(' ');
    }
    if(typeof newElements != 'string'){
      newElements = newElements.join(' ');
    }
    html5.elements = elements +' '+ newElements;
    shivDocument(ownerDocument);
  }

   /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
    }
    if (!data) {
        data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
        node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for(;i<l;i++){
        clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
          return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
        ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,

    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

}(this, document));
(function() {


}).call(this);
(function() {
  $('#editor').wysiwyg();

}).call(this);
// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview
 * some functions for browser-side pretty printing of code contained in html.
 *
 * <p>
 * For a fairly comprehensive set of languages see the
 * <a href="http://google-code-prettify.googlecode.com/svn/trunk/README.html#langs">README</a>
 * file that came with this source.  At a minimum, the lexer should work on a
 * number of languages including C and friends, Java, Python, Bash, SQL, HTML,
 * XML, CSS, Javascript, and Makefiles.  It works passably on Ruby, PHP and Awk
 * and a subset of Perl, but, because of commenting conventions, doesn't work on
 * Smalltalk, Lisp-like, or CAML-like languages without an explicit lang class.
 * <p>
 * Usage: <ol>
 * <li> include this source file in an html page via
 *   {@code <script type="text/javascript" src="/path/to/prettify.js"></script>}
 * <li> define style rules.  See the example page for examples.
 * <li> mark the {@code <pre>} and {@code <code>} tags in your source with
 *    {@code class=prettyprint.}
 *    You can also use the (html deprecated) {@code <xmp>} tag, but the pretty
 *    printer needs to do more substantial DOM manipulations to support that, so
 *    some css styles may not be preserved.
 * </ol>
 * That's it.  I wanted to keep the API as simple as possible, so there's no
 * need to specify which language the code is in, but if you wish, you can add
 * another class to the {@code <pre>} or {@code <code>} element to specify the
 * language, as in {@code <pre class="prettyprint lang-java">}.  Any class that
 * starts with "lang-" followed by a file extension, specifies the file type.
 * See the "lang-*.js" files in this directory for code that implements
 * per-language file handlers.
 * <p>
 * Change log:<br>
 * cbeust, 2006/08/22
 * <blockquote>
 *   Java annotations (start with "@") are now captured as literals ("lit")
 * </blockquote>
 * @requires console
 */

// JSLint declarations
/*global console, document, navigator, setTimeout, window, define */

/** @define {boolean} */

var IN_GLOBAL_SCOPE = true;

/**
 * Split {@code prettyPrint} into multiple timeouts so as not to interfere with
 * UI events.
 * If set to {@code false}, {@code prettyPrint()} is synchronous.
 */
window['PR_SHOULD_USE_CONTINUATION'] = true;

/**
 * Pretty print a chunk of code.
 * @param {string} sourceCodeHtml The HTML to pretty print.
 * @param {string} opt_langExtension The language name to use.
 *     Typically, a filename extension like 'cpp' or 'java'.
 * @param {number|boolean} opt_numberLines True to number lines,
 *     or the 1-indexed number of the first line in sourceCodeHtml.
 * @return {string} code as html, but prettier
 */
var prettyPrintOne;
/**
 * Find all the {@code <pre>} and {@code <code>} tags in the DOM with
 * {@code class=prettyprint} and prettify them.
 *
 * @param {Function} opt_whenDone called when prettifying is done.
 * @param {HTMLElement|HTMLDocument} opt_root an element or document
 *   containing all the elements to pretty print.
 *   Defaults to {@code document.body}.
 */
var prettyPrint;


(function () {
  var win = window;
  // Keyword lists for various languages.
  // We use things that coerce to strings to make them compact when minified
  // and to defeat aggressive optimizers that fold large string constants.
  var FLOW_CONTROL_KEYWORDS = ["break,continue,do,else,for,if,return,while"];
  var C_KEYWORDS = [FLOW_CONTROL_KEYWORDS,"auto,case,char,const,default," + 
      "double,enum,extern,float,goto,inline,int,long,register,short,signed," +
      "sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"];
  var COMMON_KEYWORDS = [C_KEYWORDS,"catch,class,delete,false,import," +
      "new,operator,private,protected,public,this,throw,true,try,typeof"];
  var CPP_KEYWORDS = [COMMON_KEYWORDS,"alignof,align_union,asm,axiom,bool," +
      "concept,concept_map,const_cast,constexpr,decltype,delegate," +
      "dynamic_cast,explicit,export,friend,generic,late_check," +
      "mutable,namespace,nullptr,property,reinterpret_cast,static_assert," +
      "static_cast,template,typeid,typename,using,virtual,where"];
  var JAVA_KEYWORDS = [COMMON_KEYWORDS,
      "abstract,assert,boolean,byte,extends,final,finally,implements,import," +
      "instanceof,interface,null,native,package,strictfp,super,synchronized," +
      "throws,transient"];
  var CSHARP_KEYWORDS = [JAVA_KEYWORDS,
      "as,base,by,checked,decimal,delegate,descending,dynamic,event," +
      "fixed,foreach,from,group,implicit,in,internal,into,is,let," +
      "lock,object,out,override,orderby,params,partial,readonly,ref,sbyte," +
      "sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort," +
      "var,virtual,where"];
  var COFFEE_KEYWORDS = "all,and,by,catch,class,else,extends,false,finally," +
      "for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then," +
      "throw,true,try,unless,until,when,while,yes";
  var JSCRIPT_KEYWORDS = [COMMON_KEYWORDS,
      "debugger,eval,export,function,get,null,set,undefined,var,with," +
      "Infinity,NaN"];
  var PERL_KEYWORDS = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for," +
      "goto,if,import,last,local,my,next,no,our,print,package,redo,require," +
      "sub,undef,unless,until,use,wantarray,while,BEGIN,END";
  var PYTHON_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "and,as,assert,class,def,del," +
      "elif,except,exec,finally,from,global,import,in,is,lambda," +
      "nonlocal,not,or,pass,print,raise,try,with,yield," +
      "False,True,None"];
  var RUBY_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "alias,and,begin,case,class," +
      "def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo," +
      "rescue,retry,self,super,then,true,undef,unless,until,when,yield," +
      "BEGIN,END"];
   var RUST_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "as,assert,const,copy,drop," +
      "enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv," +
      "pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"];
  var SH_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "case,done,elif,esac,eval,fi," +
      "function,in,local,set,then,until"];
  var ALL_KEYWORDS = [
      CPP_KEYWORDS, CSHARP_KEYWORDS, JSCRIPT_KEYWORDS, PERL_KEYWORDS,
      PYTHON_KEYWORDS, RUBY_KEYWORDS, SH_KEYWORDS];
  var C_TYPES = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/;

  // token style names.  correspond to css classes
  /**
   * token style for a string literal
   * @const
   */
  var PR_STRING = 'str';
  /**
   * token style for a keyword
   * @const
   */
  var PR_KEYWORD = 'kwd';
  /**
   * token style for a comment
   * @const
   */
  var PR_COMMENT = 'com';
  /**
   * token style for a type
   * @const
   */
  var PR_TYPE = 'typ';
  /**
   * token style for a literal value.  e.g. 1, null, true.
   * @const
   */
  var PR_LITERAL = 'lit';
  /**
   * token style for a punctuation string.
   * @const
   */
  var PR_PUNCTUATION = 'pun';
  /**
   * token style for plain text.
   * @const
   */
  var PR_PLAIN = 'pln';

  /**
   * token style for an sgml tag.
   * @const
   */
  var PR_TAG = 'tag';
  /**
   * token style for a markup declaration such as a DOCTYPE.
   * @const
   */
  var PR_DECLARATION = 'dec';
  /**
   * token style for embedded source.
   * @const
   */
  var PR_SOURCE = 'src';
  /**
   * token style for an sgml attribute name.
   * @const
   */
  var PR_ATTRIB_NAME = 'atn';
  /**
   * token style for an sgml attribute value.
   * @const
   */
  var PR_ATTRIB_VALUE = 'atv';

  /**
   * A class that indicates a section of markup that is not code, e.g. to allow
   * embedding of line numbers within code listings.
   * @const
   */
  var PR_NOCODE = 'nocode';

  
  
  /**
   * A set of tokens that can precede a regular expression literal in
   * javascript
   * http://web.archive.org/web/20070717142515/http://www.mozilla.org/js/language/js20/rationale/syntax.html
   * has the full list, but I've removed ones that might be problematic when
   * seen in languages that don't support regular expression literals.
   *
   * <p>Specifically, I've removed any keywords that can't precede a regexp
   * literal in a syntactically legal javascript program, and I've removed the
   * "in" keyword since it's not a keyword in many languages, and might be used
   * as a count of inches.
   *
   * <p>The link above does not accurately describe EcmaScript rules since
   * it fails to distinguish between (a=++/b/i) and (a++/b/i) but it works
   * very well in practice.
   *
   * @private
   * @const
   */
  var REGEXP_PRECEDER_PATTERN = '(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*';
  
  // CAVEAT: this does not properly handle the case where a regular
  // expression immediately follows another since a regular expression may
  // have flags for case-sensitivity and the like.  Having regexp tokens
  // adjacent is not valid in any language I'm aware of, so I'm punting.
  // TODO: maybe style special characters inside a regexp as punctuation.

  /**
   * Given a group of {@link RegExp}s, returns a {@code RegExp} that globally
   * matches the union of the sets of strings matched by the input RegExp.
   * Since it matches globally, if the input strings have a start-of-input
   * anchor (/^.../), it is ignored for the purposes of unioning.
   * @param {Array.<RegExp>} regexs non multiline, non-global regexs.
   * @return {RegExp} a global regex.
   */
  function combinePrefixPatterns(regexs) {
    var capturedGroupIndex = 0;
  
    var needToFoldCase = false;
    var ignoreCase = false;
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.ignoreCase) {
        ignoreCase = true;
      } else if (/[a-z]/i.test(regex.source.replace(
                     /\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ''))) {
        needToFoldCase = true;
        ignoreCase = false;
        break;
      }
    }
  
    var escapeCharToCodeUnit = {
      'b': 8,
      't': 9,
      'n': 0xa,
      'v': 0xb,
      'f': 0xc,
      'r': 0xd
    };
  
    function decodeEscape(charsetPart) {
      var cc0 = charsetPart.charCodeAt(0);
      if (cc0 !== 92 /* \\ */) {
        return cc0;
      }
      var c1 = charsetPart.charAt(1);
      cc0 = escapeCharToCodeUnit[c1];
      if (cc0) {
        return cc0;
      } else if ('0' <= c1 && c1 <= '7') {
        return parseInt(charsetPart.substring(1), 8);
      } else if (c1 === 'u' || c1 === 'x') {
        return parseInt(charsetPart.substring(2), 16);
      } else {
        return charsetPart.charCodeAt(1);
      }
    }
  
    function encodeEscape(charCode) {
      if (charCode < 0x20) {
        return (charCode < 0x10 ? '\\x0' : '\\x') + charCode.toString(16);
      }
      var ch = String.fromCharCode(charCode);
      return (ch === '\\' || ch === '-' || ch === ']' || ch === '^')
          ? "\\" + ch : ch;
    }
  
    function caseFoldCharset(charSet) {
      var charsetParts = charSet.substring(1, charSet.length - 1).match(
          new RegExp(
              '\\\\u[0-9A-Fa-f]{4}'
              + '|\\\\x[0-9A-Fa-f]{2}'
              + '|\\\\[0-3][0-7]{0,2}'
              + '|\\\\[0-7]{1,2}'
              + '|\\\\[\\s\\S]'
              + '|-'
              + '|[^-\\\\]',
              'g'));
      var ranges = [];
      var inverse = charsetParts[0] === '^';
  
      var out = ['['];
      if (inverse) { out.push('^'); }
  
      for (var i = inverse ? 1 : 0, n = charsetParts.length; i < n; ++i) {
        var p = charsetParts[i];
        if (/\\[bdsw]/i.test(p)) {  // Don't muck with named groups.
          out.push(p);
        } else {
          var start = decodeEscape(p);
          var end;
          if (i + 2 < n && '-' === charsetParts[i + 1]) {
            end = decodeEscape(charsetParts[i + 2]);
            i += 2;
          } else {
            end = start;
          }
          ranges.push([start, end]);
          // If the range might intersect letters, then expand it.
          // This case handling is too simplistic.
          // It does not deal with non-latin case folding.
          // It works for latin source code identifiers though.
          if (!(end < 65 || start > 122)) {
            if (!(end < 65 || start > 90)) {
              ranges.push([Math.max(65, start) | 32, Math.min(end, 90) | 32]);
            }
            if (!(end < 97 || start > 122)) {
              ranges.push([Math.max(97, start) & ~32, Math.min(end, 122) & ~32]);
            }
          }
        }
      }
  
      // [[1, 10], [3, 4], [8, 12], [14, 14], [16, 16], [17, 17]]
      // -> [[1, 12], [14, 14], [16, 17]]
      ranges.sort(function (a, b) { return (a[0] - b[0]) || (b[1]  - a[1]); });
      var consolidatedRanges = [];
      var lastRange = [];
      for (var i = 0; i < ranges.length; ++i) {
        var range = ranges[i];
        if (range[0] <= lastRange[1] + 1) {
          lastRange[1] = Math.max(lastRange[1], range[1]);
        } else {
          consolidatedRanges.push(lastRange = range);
        }
      }
  
      for (var i = 0; i < consolidatedRanges.length; ++i) {
        var range = consolidatedRanges[i];
        out.push(encodeEscape(range[0]));
        if (range[1] > range[0]) {
          if (range[1] + 1 > range[0]) { out.push('-'); }
          out.push(encodeEscape(range[1]));
        }
      }
      out.push(']');
      return out.join('');
    }
  
    function allowAnywhereFoldCaseAndRenumberGroups(regex) {
      // Split into character sets, escape sequences, punctuation strings
      // like ('(', '(?:', ')', '^'), and runs of characters that do not
      // include any of the above.
      var parts = regex.source.match(
          new RegExp(
              '(?:'
              + '\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]'  // a character set
              + '|\\\\u[A-Fa-f0-9]{4}'  // a unicode escape
              + '|\\\\x[A-Fa-f0-9]{2}'  // a hex escape
              + '|\\\\[0-9]+'  // a back-reference or octal escape
              + '|\\\\[^ux0-9]'  // other escape sequence
              + '|\\(\\?[:!=]'  // start of a non-capturing group
              + '|[\\(\\)\\^]'  // start/end of a group, or line start
              + '|[^\\x5B\\x5C\\(\\)\\^]+'  // run of other characters
              + ')',
              'g'));
      var n = parts.length;
  
      // Maps captured group numbers to the number they will occupy in
      // the output or to -1 if that has not been determined, or to
      // undefined if they need not be capturing in the output.
      var capturedGroups = [];
  
      // Walk over and identify back references to build the capturedGroups
      // mapping.
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          // groups are 1-indexed, so max group index is count of '('
          ++groupIndex;
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue) {
            if (decimalValue <= groupIndex) {
              capturedGroups[decimalValue] = -1;
            } else {
              // Replace with an unambiguous escape sequence so that
              // an octal escape sequence does not turn into a backreference
              // to a capturing group from an earlier regex.
              parts[i] = encodeEscape(decimalValue);
            }
          }
        }
      }
  
      // Renumber groups and reduce capturing groups to non-capturing groups
      // where possible.
      for (var i = 1; i < capturedGroups.length; ++i) {
        if (-1 === capturedGroups[i]) {
          capturedGroups[i] = ++capturedGroupIndex;
        }
      }
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          ++groupIndex;
          if (!capturedGroups[groupIndex]) {
            parts[i] = '(?:';
          }
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue && decimalValue <= groupIndex) {
            parts[i] = '\\' + capturedGroups[decimalValue];
          }
        }
      }
  
      // Remove any prefix anchors so that the output will match anywhere.
      // ^^ really does mean an anchored match though.
      for (var i = 0; i < n; ++i) {
        if ('^' === parts[i] && '^' !== parts[i + 1]) { parts[i] = ''; }
      }
  
      // Expand letters to groups to handle mixing of case-sensitive and
      // case-insensitive patterns if necessary.
      if (regex.ignoreCase && needToFoldCase) {
        for (var i = 0; i < n; ++i) {
          var p = parts[i];
          var ch0 = p.charAt(0);
          if (p.length >= 2 && ch0 === '[') {
            parts[i] = caseFoldCharset(p);
          } else if (ch0 !== '\\') {
            // TODO: handle letters in numeric escapes.
            parts[i] = p.replace(
                /[a-zA-Z]/g,
                function (ch) {
                  var cc = ch.charCodeAt(0);
                  return '[' + String.fromCharCode(cc & ~32, cc | 32) + ']';
                });
          }
        }
      }
  
      return parts.join('');
    }
  
    var rewritten = [];
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.global || regex.multiline) { throw new Error('' + regex); }
      rewritten.push(
          '(?:' + allowAnywhereFoldCaseAndRenumberGroups(regex) + ')');
    }
  
    return new RegExp(rewritten.join('|'), ignoreCase ? 'gi' : 'g');
  }

  /**
   * Split markup into a string of source code and an array mapping ranges in
   * that string to the text nodes in which they appear.
   *
   * <p>
   * The HTML DOM structure:</p>
   * <pre>
   * (Element   "p"
   *   (Element "b"
   *     (Text  "print "))       ; #1
   *   (Text    "'Hello '")      ; #2
   *   (Element "br")            ; #3
   *   (Text    "  + 'World';")) ; #4
   * </pre>
   * <p>
   * corresponds to the HTML
   * {@code <p><b>print </b>'Hello '<br>  + 'World';</p>}.</p>
   *
   * <p>
   * It will produce the output:</p>
   * <pre>
   * {
   *   sourceCode: "print 'Hello '\n  + 'World';",
   *   //                     1          2
   *   //           012345678901234 5678901234567
   *   spans: [0, #1, 6, #2, 14, #3, 15, #4]
   * }
   * </pre>
   * <p>
   * where #1 is a reference to the {@code "print "} text node above, and so
   * on for the other text nodes.
   * </p>
   *
   * <p>
   * The {@code} spans array is an array of pairs.  Even elements are the start
   * indices of substrings, and odd elements are the text nodes (or BR elements)
   * that contain the text for those substrings.
   * Substrings continue until the next index or the end of the source.
   * </p>
   *
   * @param {Node} node an HTML DOM subtree containing source-code.
   * @param {boolean} isPreformatted true if white-space in text nodes should
   *    be considered significant.
   * @return {Object} source code and the text nodes in which they occur.
   */
  function extractSourceSpans(node, isPreformatted) {
    var nocode = /(?:^|\s)nocode(?:\s|$)/;
  
    var chunks = [];
    var length = 0;
    var spans = [];
    var k = 0;
  
    function walk(node) {
      var type = node.nodeType;
      if (type == 1) {  // Element
        if (nocode.test(node.className)) { return; }
        for (var child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
        var nodeName = node.nodeName.toLowerCase();
        if ('br' === nodeName || 'li' === nodeName) {
          chunks[k] = '\n';
          spans[k << 1] = length++;
          spans[(k++ << 1) | 1] = node;
        }
      } else if (type == 3 || type == 4) {  // Text
        var text = node.nodeValue;
        if (text.length) {
          if (!isPreformatted) {
            text = text.replace(/[ \t\r\n]+/g, ' ');
          } else {
            text = text.replace(/\r\n?/g, '\n');  // Normalize newlines.
          }
          // TODO: handle tabs here?
          chunks[k] = text;
          spans[k << 1] = length;
          length += text.length;
          spans[(k++ << 1) | 1] = node;
        }
      }
    }
  
    walk(node);
  
    return {
      sourceCode: chunks.join('').replace(/\n$/, ''),
      spans: spans
    };
  }

  /**
   * Apply the given language handler to sourceCode and add the resulting
   * decorations to out.
   * @param {number} basePos the index of sourceCode within the chunk of source
   *    whose decorations are already present on out.
   */
  function appendDecorations(basePos, sourceCode, langHandler, out) {
    if (!sourceCode) { return; }
    var job = {
      sourceCode: sourceCode,
      basePos: basePos
    };
    langHandler(job);
    out.push.apply(out, job.decorations);
  }

  var notWs = /\S/;

  /**
   * Given an element, if it contains only one child element and any text nodes
   * it contains contain only space characters, return the sole child element.
   * Otherwise returns undefined.
   * <p>
   * This is meant to return the CODE element in {@code <pre><code ...>} when
   * there is a single child element that contains all the non-space textual
   * content, but not to return anything where there are multiple child elements
   * as in {@code <pre><code>...</code><code>...</code></pre>} or when there
   * is textual content.
   */
  function childContentWrapper(element) {
    var wrapper = undefined;
    for (var c = element.firstChild; c; c = c.nextSibling) {
      var type = c.nodeType;
      wrapper = (type === 1)  // Element Node
          ? (wrapper ? element : c)
          : (type === 3)  // Text Node
          ? (notWs.test(c.nodeValue) ? element : wrapper)
          : wrapper;
    }
    return wrapper === element ? undefined : wrapper;
  }

  /** Given triples of [style, pattern, context] returns a lexing function,
    * The lexing function interprets the patterns to find token boundaries and
    * returns a decoration list of the form
    * [index_0, style_0, index_1, style_1, ..., index_n, style_n]
    * where index_n is an index into the sourceCode, and style_n is a style
    * constant like PR_PLAIN.  index_n-1 <= index_n, and style_n-1 applies to
    * all characters in sourceCode[index_n-1:index_n].
    *
    * The stylePatterns is a list whose elements have the form
    * [style : string, pattern : RegExp, DEPRECATED, shortcut : string].
    *
    * Style is a style constant like PR_PLAIN, or can be a string of the
    * form 'lang-FOO', where FOO is a language extension describing the
    * language of the portion of the token in $1 after pattern executes.
    * E.g., if style is 'lang-lisp', and group 1 contains the text
    * '(hello (world))', then that portion of the token will be passed to the
    * registered lisp handler for formatting.
    * The text before and after group 1 will be restyled using this decorator
    * so decorators should take care that this doesn't result in infinite
    * recursion.  For example, the HTML lexer rule for SCRIPT elements looks
    * something like ['lang-js', /<[s]cript>(.+?)<\/script>/].  This may match
    * '<script>foo()<\/script>', which would cause the current decorator to
    * be called with '<script>' which would not match the same rule since
    * group 1 must not be empty, so it would be instead styled as PR_TAG by
    * the generic tag rule.  The handler registered for the 'js' extension would
    * then be called with 'foo()', and finally, the current decorator would
    * be called with '<\/script>' which would not match the original rule and
    * so the generic tag rule would identify it as a tag.
    *
    * Pattern must only match prefixes, and if it matches a prefix, then that
    * match is considered a token with the same style.
    *
    * Context is applied to the last non-whitespace, non-comment token
    * recognized.
    *
    * Shortcut is an optional string of characters, any of which, if the first
    * character, gurantee that this pattern and only this pattern matches.
    *
    * @param {Array} shortcutStylePatterns patterns that always start with
    *   a known character.  Must have a shortcut string.
    * @param {Array} fallthroughStylePatterns patterns that will be tried in
    *   order if the shortcut ones fail.  May have shortcuts.
    *
    * @return {function (Object)} a
    *   function that takes source code and returns a list of decorations.
    */
  function createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns) {
    var shortcuts = {};
    var tokenizer;
    (function () {
      var allPatterns = shortcutStylePatterns.concat(fallthroughStylePatterns);
      var allRegexs = [];
      var regexKeys = {};
      for (var i = 0, n = allPatterns.length; i < n; ++i) {
        var patternParts = allPatterns[i];
        var shortcutChars = patternParts[3];
        if (shortcutChars) {
          for (var c = shortcutChars.length; --c >= 0;) {
            shortcuts[shortcutChars.charAt(c)] = patternParts;
          }
        }
        var regex = patternParts[1];
        var k = '' + regex;
        if (!regexKeys.hasOwnProperty(k)) {
          allRegexs.push(regex);
          regexKeys[k] = null;
        }
      }
      allRegexs.push(/[\0-\uffff]/);
      tokenizer = combinePrefixPatterns(allRegexs);
    })();

    var nPatterns = fallthroughStylePatterns.length;

    /**
     * Lexes job.sourceCode and produces an output array job.decorations of
     * style classes preceded by the position at which they start in
     * job.sourceCode in order.
     *
     * @param {Object} job an object like <pre>{
     *    sourceCode: {string} sourceText plain text,
     *    basePos: {int} position of job.sourceCode in the larger chunk of
     *        sourceCode.
     * }</pre>
     */
    var decorate = function (job) {
      var sourceCode = job.sourceCode, basePos = job.basePos;
      /** Even entries are positions in source in ascending order.  Odd enties
        * are style markers (e.g., PR_COMMENT) that run from that position until
        * the end.
        * @type {Array.<number|string>}
        */
      var decorations = [basePos, PR_PLAIN];
      var pos = 0;  // index into sourceCode
      var tokens = sourceCode.match(tokenizer) || [];
      var styleCache = {};

      for (var ti = 0, nTokens = tokens.length; ti < nTokens; ++ti) {
        var token = tokens[ti];
        var style = styleCache[token];
        var match = void 0;

        var isEmbedded;
        if (typeof style === 'string') {
          isEmbedded = false;
        } else {
          var patternParts = shortcuts[token.charAt(0)];
          if (patternParts) {
            match = token.match(patternParts[1]);
            style = patternParts[0];
          } else {
            for (var i = 0; i < nPatterns; ++i) {
              patternParts = fallthroughStylePatterns[i];
              match = token.match(patternParts[1]);
              if (match) {
                style = patternParts[0];
                break;
              }
            }

            if (!match) {  // make sure that we make progress
              style = PR_PLAIN;
            }
          }

          isEmbedded = style.length >= 5 && 'lang-' === style.substring(0, 5);
          if (isEmbedded && !(match && typeof match[1] === 'string')) {
            isEmbedded = false;
            style = PR_SOURCE;
          }

          if (!isEmbedded) { styleCache[token] = style; }
        }

        var tokenStart = pos;
        pos += token.length;

        if (!isEmbedded) {
          decorations.push(basePos + tokenStart, style);
        } else {  // Treat group 1 as an embedded block of source code.
          var embeddedSource = match[1];
          var embeddedSourceStart = token.indexOf(embeddedSource);
          var embeddedSourceEnd = embeddedSourceStart + embeddedSource.length;
          if (match[2]) {
            // If embeddedSource can be blank, then it would match at the
            // beginning which would cause us to infinitely recurse on the
            // entire token, so we catch the right context in match[2].
            embeddedSourceEnd = token.length - match[2].length;
            embeddedSourceStart = embeddedSourceEnd - embeddedSource.length;
          }
          var lang = style.substring(5);
          // Decorate the left of the embedded source
          appendDecorations(
              basePos + tokenStart,
              token.substring(0, embeddedSourceStart),
              decorate, decorations);
          // Decorate the embedded source
          appendDecorations(
              basePos + tokenStart + embeddedSourceStart,
              embeddedSource,
              langHandlerForExtension(lang, embeddedSource),
              decorations);
          // Decorate the right of the embedded section
          appendDecorations(
              basePos + tokenStart + embeddedSourceEnd,
              token.substring(embeddedSourceEnd),
              decorate, decorations);
        }
      }
      job.decorations = decorations;
    };
    return decorate;
  }

  /** returns a function that produces a list of decorations from source text.
    *
    * This code treats ", ', and ` as string delimiters, and \ as a string
    * escape.  It does not recognize perl's qq() style strings.
    * It has no special handling for double delimiter escapes as in basic, or
    * the tripled delimiters used in python, but should work on those regardless
    * although in those cases a single string literal may be broken up into
    * multiple adjacent string literals.
    *
    * It recognizes C, C++, and shell style comments.
    *
    * @param {Object} options a set of optional parameters.
    * @return {function (Object)} a function that examines the source code
    *     in the input job and builds the decoration list.
    */
  function sourceDecorator(options) {
    var shortcutStylePatterns = [], fallthroughStylePatterns = [];
    if (options['tripleQuotedStrings']) {
      // '''multi-line-string''', 'single-line-string', and double-quoted
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
           null, '\'"']);
    } else if (options['multiLineStrings']) {
      // 'multi-line-string', "multi-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
           null, '\'"`']);
    } else {
      // 'single-line-string', "single-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,
           /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
           null, '"\'']);
    }
    if (options['verbatimStrings']) {
      // verbatim-string-literal production from the C# grammar.  See issue 93.
      fallthroughStylePatterns.push(
          [PR_STRING, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
    }
    var hc = options['hashComments'];
    if (hc) {
      if (options['cStyleComments']) {
        if (hc > 1) {  // multiline hash comments
          shortcutStylePatterns.push(
              [PR_COMMENT, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, '#']);
        } else {
          // Stop C preprocessor declarations at an unclosed open comment
          shortcutStylePatterns.push(
              [PR_COMMENT, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
               null, '#']);
        }
        // #include <stdio.h>
        fallthroughStylePatterns.push(
            [PR_STRING,
             /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,
             null]);
      } else {
        shortcutStylePatterns.push([PR_COMMENT, /^#[^\r\n]*/, null, '#']);
      }
    }
    if (options['cStyleComments']) {
      fallthroughStylePatterns.push([PR_COMMENT, /^\/\/[^\r\n]*/, null]);
      fallthroughStylePatterns.push(
          [PR_COMMENT, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
    }
    var regexLiterals = options['regexLiterals'];
    if (regexLiterals) {
      /**
       * @const
       */
      var regexExcls = regexLiterals > 1
        ? ''  // Multiline regex literals
        : '\n\r';
      /**
       * @const
       */
      var regexAny = regexExcls ? '.' : '[\\S\\s]';
      /**
       * @const
       */
      var REGEX_LITERAL = (
          // A regular expression literal starts with a slash that is
          // not followed by * or / so that it is not confused with
          // comments.
          '/(?=[^/*' + regexExcls + '])'
          // and then contains any number of raw characters,
          + '(?:[^/\\x5B\\x5C' + regexExcls + ']'
          // escape sequences (\x5C),
          +    '|\\x5C' + regexAny
          // or non-nesting character sets (\x5B\x5D);
          +    '|\\x5B(?:[^\\x5C\\x5D' + regexExcls + ']'
          +             '|\\x5C' + regexAny + ')*(?:\\x5D|$))+'
          // finally closed by a /.
          + '/');
      fallthroughStylePatterns.push(
          ['lang-regex',
           RegExp('^' + REGEXP_PRECEDER_PATTERN + '(' + REGEX_LITERAL + ')')
           ]);
    }

    var types = options['types'];
    if (types) {
      fallthroughStylePatterns.push([PR_TYPE, types]);
    }

    var keywords = ("" + options['keywords']).replace(/^ | $/g, '');
    if (keywords.length) {
      fallthroughStylePatterns.push(
          [PR_KEYWORD,
           new RegExp('^(?:' + keywords.replace(/[\s,]+/g, '|') + ')\\b'),
           null]);
    }

    shortcutStylePatterns.push([PR_PLAIN,       /^\s+/, null, ' \r\n\t\xA0']);

    var punctuation =
      // The Bash man page says

      // A word is a sequence of characters considered as a single
      // unit by GRUB. Words are separated by metacharacters,
      // which are the following plus space, tab, and newline: { }
      // | & $ ; < >
      // ...
      
      // A word beginning with # causes that word and all remaining
      // characters on that line to be ignored.

      // which means that only a '#' after /(?:^|[{}|&$;<>\s])/ starts a
      // comment but empirically
      // $ echo {#}
      // {#}
      // $ echo \$#
      // $#
      // $ echo }#
      // }#

      // so /(?:^|[|&;<>\s])/ is more appropriate.

      // http://gcc.gnu.org/onlinedocs/gcc-2.95.3/cpp_1.html#SEC3
      // suggests that this definition is compatible with a
      // default mode that tries to use a single token definition
      // to recognize both bash/python style comments and C
      // preprocessor directives.

      // This definition of punctuation does not include # in the list of
      // follow-on exclusions, so # will not be broken before if preceeded
      // by a punctuation character.  We could try to exclude # after
      // [|&;<>] but that doesn't seem to cause many major problems.
      // If that does turn out to be a problem, we should change the below
      // when hc is truthy to include # in the run of punctuation characters
      // only when not followint [|&;<>].
      '^.[^\\s\\w.$@\'"`/\\\\]*';
    if (options['regexLiterals']) {
      punctuation += '(?!\s*\/)';
    }

    fallthroughStylePatterns.push(
        // TODO(mikesamuel): recognize non-latin letters and numerals in idents
        [PR_LITERAL,     /^@[a-z_$][a-z_$@0-9]*/i, null],
        [PR_TYPE,        /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
        [PR_PLAIN,       /^[a-z_$][a-z_$@0-9]*/i, null],
        [PR_LITERAL,
         new RegExp(
             '^(?:'
             // A hex number
             + '0x[a-f0-9]+'
             // or an octal or decimal number,
             + '|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
             // possibly in scientific notation
             + '(?:e[+\\-]?\\d+)?'
             + ')'
             // with an optional modifier like UL for unsigned long
             + '[a-z]*', 'i'),
         null, '0123456789'],
        // Don't treat escaped quotes in bash as starting strings.
        // See issue 144.
        [PR_PLAIN,       /^\\[\s\S]?/, null],
        [PR_PUNCTUATION, new RegExp(punctuation), null]);

    return createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns);
  }

  var decorateSource = sourceDecorator({
        'keywords': ALL_KEYWORDS,
        'hashComments': true,
        'cStyleComments': true,
        'multiLineStrings': true,
        'regexLiterals': true
      });

  /**
   * Given a DOM subtree, wraps it in a list, and puts each line into its own
   * list item.
   *
   * @param {Node} node modified in place.  Its content is pulled into an
   *     HTMLOListElement, and each line is moved into a separate list item.
   *     This requires cloning elements, so the input might not have unique
   *     IDs after numbering.
   * @param {boolean} isPreformatted true iff white-space in text nodes should
   *     be treated as significant.
   */
  function numberLines(node, opt_startLineNum, isPreformatted) {
    var nocode = /(?:^|\s)nocode(?:\s|$)/;
    var lineBreak = /\r\n?|\n/;
  
    var document = node.ownerDocument;
  
    var li = document.createElement('li');
    while (node.firstChild) {
      li.appendChild(node.firstChild);
    }
    // An array of lines.  We split below, so this is initialized to one
    // un-split line.
    var listItems = [li];
  
    function walk(node) {
      var type = node.nodeType;
      if (type == 1 && !nocode.test(node.className)) {  // Element
        if ('br' === node.nodeName) {
          breakAfter(node);
          // Discard the <BR> since it is now flush against a </LI>.
          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
        } else {
          for (var child = node.firstChild; child; child = child.nextSibling) {
            walk(child);
          }
        }
      } else if ((type == 3 || type == 4) && isPreformatted) {  // Text
        var text = node.nodeValue;
        var match = text.match(lineBreak);
        if (match) {
          var firstLine = text.substring(0, match.index);
          node.nodeValue = firstLine;
          var tail = text.substring(match.index + match[0].length);
          if (tail) {
            var parent = node.parentNode;
            parent.insertBefore(
              document.createTextNode(tail), node.nextSibling);
          }
          breakAfter(node);
          if (!firstLine) {
            // Don't leave blank text nodes in the DOM.
            node.parentNode.removeChild(node);
          }
        }
      }
    }
  
    // Split a line after the given node.
    function breakAfter(lineEndNode) {
      // If there's nothing to the right, then we can skip ending the line
      // here, and move root-wards since splitting just before an end-tag
      // would require us to create a bunch of empty copies.
      while (!lineEndNode.nextSibling) {
        lineEndNode = lineEndNode.parentNode;
        if (!lineEndNode) { return; }
      }
  
      function breakLeftOf(limit, copy) {
        // Clone shallowly if this node needs to be on both sides of the break.
        var rightSide = copy ? limit.cloneNode(false) : limit;
        var parent = limit.parentNode;
        if (parent) {
          // We clone the parent chain.
          // This helps us resurrect important styling elements that cross lines.
          // E.g. in <i>Foo<br>Bar</i>
          // should be rewritten to <li><i>Foo</i></li><li><i>Bar</i></li>.
          var parentClone = breakLeftOf(parent, 1);
          // Move the clone and everything to the right of the original
          // onto the cloned parent.
          var next = limit.nextSibling;
          parentClone.appendChild(rightSide);
          for (var sibling = next; sibling; sibling = next) {
            next = sibling.nextSibling;
            parentClone.appendChild(sibling);
          }
        }
        return rightSide;
      }
  
      var copiedListItem = breakLeftOf(lineEndNode.nextSibling, 0);
  
      // Walk the parent chain until we reach an unattached LI.
      for (var parent;
           // Check nodeType since IE invents document fragments.
           (parent = copiedListItem.parentNode) && parent.nodeType === 1;) {
        copiedListItem = parent;
      }
      // Put it on the list of lines for later processing.
      listItems.push(copiedListItem);
    }
  
    // Split lines while there are lines left to split.
    for (var i = 0;  // Number of lines that have been split so far.
         i < listItems.length;  // length updated by breakAfter calls.
         ++i) {
      walk(listItems[i]);
    }
  
    // Make sure numeric indices show correctly.
    if (opt_startLineNum === (opt_startLineNum|0)) {
      listItems[0].setAttribute('value', opt_startLineNum);
    }
  
    var ol = document.createElement('ol');
    ol.className = 'linenums';
    var offset = Math.max(0, ((opt_startLineNum - 1 /* zero index */)) | 0) || 0;
    for (var i = 0, n = listItems.length; i < n; ++i) {
      li = listItems[i];
      // Stick a class on the LIs so that stylesheets can
      // color odd/even rows, or any other row pattern that
      // is co-prime with 10.
      li.className = 'L' + ((i + offset) % 10);
      if (!li.firstChild) {
        li.appendChild(document.createTextNode('\xA0'));
      }
      ol.appendChild(li);
    }
  
    node.appendChild(ol);
  }
  /**
   * Breaks {@code job.sourceCode} around style boundaries in
   * {@code job.decorations} and modifies {@code job.sourceNode} in place.
   * @param {Object} job like <pre>{
   *    sourceCode: {string} source as plain text,
   *    sourceNode: {HTMLElement} the element containing the source,
   *    spans: {Array.<number|Node>} alternating span start indices into source
   *       and the text node or element (e.g. {@code <BR>}) corresponding to that
   *       span.
   *    decorations: {Array.<number|string} an array of style classes preceded
   *       by the position at which they start in job.sourceCode in order
   * }</pre>
   * @private
   */
  function recombineTagsAndDecorations(job) {
    var isIE8OrEarlier = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
    isIE8OrEarlier = isIE8OrEarlier && +isIE8OrEarlier[1] <= 8;
    var newlineRe = /\n/g;
  
    var source = job.sourceCode;
    var sourceLength = source.length;
    // Index into source after the last code-unit recombined.
    var sourceIndex = 0;
  
    var spans = job.spans;
    var nSpans = spans.length;
    // Index into spans after the last span which ends at or before sourceIndex.
    var spanIndex = 0;
  
    var decorations = job.decorations;
    var nDecorations = decorations.length;
    // Index into decorations after the last decoration which ends at or before
    // sourceIndex.
    var decorationIndex = 0;
  
    // Remove all zero-length decorations.
    decorations[nDecorations] = sourceLength;
    var decPos, i;
    for (i = decPos = 0; i < nDecorations;) {
      if (decorations[i] !== decorations[i + 2]) {
        decorations[decPos++] = decorations[i++];
        decorations[decPos++] = decorations[i++];
      } else {
        i += 2;
      }
    }
    nDecorations = decPos;
  
    // Simplify decorations.
    for (i = decPos = 0; i < nDecorations;) {
      var startPos = decorations[i];
      // Conflate all adjacent decorations that use the same style.
      var startDec = decorations[i + 1];
      var end = i + 2;
      while (end + 2 <= nDecorations && decorations[end + 1] === startDec) {
        end += 2;
      }
      decorations[decPos++] = startPos;
      decorations[decPos++] = startDec;
      i = end;
    }
  
    nDecorations = decorations.length = decPos;
  
    var sourceNode = job.sourceNode;
    var oldDisplay;
    if (sourceNode) {
      oldDisplay = sourceNode.style.display;
      sourceNode.style.display = 'none';
    }
    try {
      var decoration = null;
      while (spanIndex < nSpans) {
        var spanStart = spans[spanIndex];
        var spanEnd = spans[spanIndex + 2] || sourceLength;
  
        var decEnd = decorations[decorationIndex + 2] || sourceLength;
  
        var end = Math.min(spanEnd, decEnd);
  
        var textNode = spans[spanIndex + 1];
        var styledText;
        if (textNode.nodeType !== 1  // Don't muck with <BR>s or <LI>s
            // Don't introduce spans around empty text nodes.
            && (styledText = source.substring(sourceIndex, end))) {
          // This may seem bizarre, and it is.  Emitting LF on IE causes the
          // code to display with spaces instead of line breaks.
          // Emitting Windows standard issue linebreaks (CRLF) causes a blank
          // space to appear at the beginning of every line but the first.
          // Emitting an old Mac OS 9 line separator makes everything spiffy.
          if (isIE8OrEarlier) {
            styledText = styledText.replace(newlineRe, '\r');
          }
          textNode.nodeValue = styledText;
          var document = textNode.ownerDocument;
          var span = document.createElement('span');
          span.className = decorations[decorationIndex + 1];
          var parentNode = textNode.parentNode;
          parentNode.replaceChild(span, textNode);
          span.appendChild(textNode);
          if (sourceIndex < spanEnd) {  // Split off a text node.
            spans[spanIndex + 1] = textNode
                // TODO: Possibly optimize by using '' if there's no flicker.
                = document.createTextNode(source.substring(end, spanEnd));
            parentNode.insertBefore(textNode, span.nextSibling);
          }
        }
  
        sourceIndex = end;
  
        if (sourceIndex >= spanEnd) {
          spanIndex += 2;
        }
        if (sourceIndex >= decEnd) {
          decorationIndex += 2;
        }
      }
    } finally {
      if (sourceNode) {
        sourceNode.style.display = oldDisplay;
      }
    }
  }

  /** Maps language-specific file extensions to handlers. */
  var langHandlerRegistry = {};
  /** Register a language handler for the given file extensions.
    * @param {function (Object)} handler a function from source code to a list
    *      of decorations.  Takes a single argument job which describes the
    *      state of the computation.   The single parameter has the form
    *      {@code {
    *        sourceCode: {string} as plain text.
    *        decorations: {Array.<number|string>} an array of style classes
    *                     preceded by the position at which they start in
    *                     job.sourceCode in order.
    *                     The language handler should assigned this field.
    *        basePos: {int} the position of source in the larger source chunk.
    *                 All positions in the output decorations array are relative
    *                 to the larger source chunk.
    *      } }
    * @param {Array.<string>} fileExtensions
    */
  function registerLangHandler(handler, fileExtensions) {
    for (var i = fileExtensions.length; --i >= 0;) {
      var ext = fileExtensions[i];
      if (!langHandlerRegistry.hasOwnProperty(ext)) {
        langHandlerRegistry[ext] = handler;
      } else if (win['console']) {
        console['warn']('cannot override language handler %s', ext);
      }
    }
  }
  function langHandlerForExtension(extension, source) {
    if (!(extension && langHandlerRegistry.hasOwnProperty(extension))) {
      // Treat it as markup if the first non whitespace character is a < and
      // the last non-whitespace character is a >.
      extension = /^\s*</.test(source)
          ? 'default-markup'
          : 'default-code';
    }
    return langHandlerRegistry[extension];
  }
  registerLangHandler(decorateSource, ['default-code']);
  registerLangHandler(
      createSimpleLexer(
          [],
          [
           [PR_PLAIN,       /^[^<?]+/],
           [PR_DECLARATION, /^<!\w[^>]*(?:>|$)/],
           [PR_COMMENT,     /^<\!--[\s\S]*?(?:-\->|$)/],
           // Unescaped content in an unknown language
           ['lang-',        /^<\?([\s\S]+?)(?:\?>|$)/],
           ['lang-',        /^<%([\s\S]+?)(?:%>|$)/],
           [PR_PUNCTUATION, /^(?:<[%?]|[%?]>)/],
           ['lang-',        /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
           // Unescaped content in javascript.  (Or possibly vbscript).
           ['lang-js',      /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
           // Contains unescaped stylesheet content
           ['lang-css',     /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
           ['lang-in.tag',  /^(<\/?[a-z][^<>]*>)/i]
          ]),
      ['default-markup', 'htm', 'html', 'mxml', 'xhtml', 'xml', 'xsl']);
  registerLangHandler(
      createSimpleLexer(
          [
           [PR_PLAIN,        /^[\s]+/, null, ' \t\r\n'],
           [PR_ATTRIB_VALUE, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, '\"\'']
           ],
          [
           [PR_TAG,          /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
           [PR_ATTRIB_NAME,  /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
           ['lang-uq.val',   /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
           [PR_PUNCTUATION,  /^[=<>\/]+/],
           ['lang-js',       /^on\w+\s*=\s*\"([^\"]+)\"/i],
           ['lang-js',       /^on\w+\s*=\s*\'([^\']+)\'/i],
           ['lang-js',       /^on\w+\s*=\s*([^\"\'>\s]+)/i],
           ['lang-css',      /^style\s*=\s*\"([^\"]+)\"/i],
           ['lang-css',      /^style\s*=\s*\'([^\']+)\'/i],
           ['lang-css',      /^style\s*=\s*([^\"\'>\s]+)/i]
           ]),
      ['in.tag']);
  registerLangHandler(
      createSimpleLexer([], [[PR_ATTRIB_VALUE, /^[\s\S]+/]]), ['uq.val']);
  registerLangHandler(sourceDecorator({
          'keywords': CPP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true,
          'types': C_TYPES
        }), ['c', 'cc', 'cpp', 'cxx', 'cyc', 'm']);
  registerLangHandler(sourceDecorator({
          'keywords': 'null,true,false'
        }), ['json']);
  registerLangHandler(sourceDecorator({
          'keywords': CSHARP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true,
          'verbatimStrings': true,
          'types': C_TYPES
        }), ['cs']);
  registerLangHandler(sourceDecorator({
          'keywords': JAVA_KEYWORDS,
          'cStyleComments': true
        }), ['java']);
  registerLangHandler(sourceDecorator({
          'keywords': SH_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true
        }), ['bash', 'bsh', 'csh', 'sh']);
  registerLangHandler(sourceDecorator({
          'keywords': PYTHON_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'tripleQuotedStrings': true
        }), ['cv', 'py', 'python']);
  registerLangHandler(sourceDecorator({
          'keywords': PERL_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': 2  // multiline regex literals
        }), ['perl', 'pl', 'pm']);
  registerLangHandler(sourceDecorator({
          'keywords': RUBY_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': true
        }), ['rb', 'ruby']);
  registerLangHandler(sourceDecorator({
          'keywords': JSCRIPT_KEYWORDS,
          'cStyleComments': true,
          'regexLiterals': true
        }), ['javascript', 'js']);
  registerLangHandler(sourceDecorator({
          'keywords': COFFEE_KEYWORDS,
          'hashComments': 3,  // ### style block comments
          'cStyleComments': true,
          'multilineStrings': true,
          'tripleQuotedStrings': true,
          'regexLiterals': true
        }), ['coffee']);
  registerLangHandler(sourceDecorator({
          'keywords': RUST_KEYWORDS,
          'cStyleComments': true,
          'multilineStrings': true
        }), ['rc', 'rs', 'rust']);
  registerLangHandler(
      createSimpleLexer([], [[PR_STRING, /^[\s\S]+/]]), ['regex']);

  function applyDecorator(job) {
    var opt_langExtension = job.langExtension;

    try {
      // Extract tags, and convert the source code to plain text.
      var sourceAndSpans = extractSourceSpans(job.sourceNode, job.pre);
      /** Plain text. @type {string} */
      var source = sourceAndSpans.sourceCode;
      job.sourceCode = source;
      job.spans = sourceAndSpans.spans;
      job.basePos = 0;

      // Apply the appropriate language handler
      langHandlerForExtension(opt_langExtension, source)(job);

      // Integrate the decorations and tags back into the source code,
      // modifying the sourceNode in place.
      recombineTagsAndDecorations(job);
    } catch (e) {
      if (win['console']) {
        console['log'](e && e['stack'] || e);
      }
    }
  }

  /**
   * Pretty print a chunk of code.
   * @param sourceCodeHtml {string} The HTML to pretty print.
   * @param opt_langExtension {string} The language name to use.
   *     Typically, a filename extension like 'cpp' or 'java'.
   * @param opt_numberLines {number|boolean} True to number lines,
   *     or the 1-indexed number of the first line in sourceCodeHtml.
   */
  function $prettyPrintOne(sourceCodeHtml, opt_langExtension, opt_numberLines) {
    var container = document.createElement('div');
    // This could cause images to load and onload listeners to fire.
    // E.g. <img onerror="alert(1337)" src="nosuchimage.png">.
    // We assume that the inner HTML is from a trusted source.
    // The pre-tag is required for IE8 which strips newlines from innerHTML
    // when it is injected into a <pre> tag.
    // http://stackoverflow.com/questions/451486/pre-tag-loses-line-breaks-when-setting-innerhtml-in-ie
    // http://stackoverflow.com/questions/195363/inserting-a-newline-into-a-pre-tag-ie-javascript
    container.innerHTML = '<pre>' + sourceCodeHtml + '</pre>';
    container = container.firstChild;
    if (opt_numberLines) {
      numberLines(container, opt_numberLines, true);
    }

    var job = {
      langExtension: opt_langExtension,
      numberLines: opt_numberLines,
      sourceNode: container,
      pre: 1
    };
    applyDecorator(job);
    return container.innerHTML;
  }

   /**
    * Find all the {@code <pre>} and {@code <code>} tags in the DOM with
    * {@code class=prettyprint} and prettify them.
    *
    * @param {Function} opt_whenDone called when prettifying is done.
    * @param {HTMLElement|HTMLDocument} opt_root an element or document
    *   containing all the elements to pretty print.
    *   Defaults to {@code document.body}.
    */
  function $prettyPrint(opt_whenDone, opt_root) {
    var root = opt_root || document.body;
    var doc = root.ownerDocument || document;
    function byTagName(tn) { return root.getElementsByTagName(tn); }
    // fetch a list of nodes to rewrite
    var codeSegments = [byTagName('pre'), byTagName('code'), byTagName('xmp')];
    var elements = [];
    for (var i = 0; i < codeSegments.length; ++i) {
      for (var j = 0, n = codeSegments[i].length; j < n; ++j) {
        elements.push(codeSegments[i][j]);
      }
    }
    codeSegments = null;

    var clock = Date;
    if (!clock['now']) {
      clock = { 'now': function () { return +(new Date); } };
    }

    // The loop is broken into a series of continuations to make sure that we
    // don't make the browser unresponsive when rewriting a large page.
    var k = 0;
    var prettyPrintingJob;

    var langExtensionRe = /\blang(?:uage)?-([\w.]+)(?!\S)/;
    var prettyPrintRe = /\bprettyprint\b/;
    var prettyPrintedRe = /\bprettyprinted\b/;
    var preformattedTagNameRe = /pre|xmp/i;
    var codeRe = /^code$/i;
    var preCodeXmpRe = /^(?:pre|code|xmp)$/i;
    var EMPTY = {};

    function doWork() {
      var endTime = (win['PR_SHOULD_USE_CONTINUATION'] ?
                     clock['now']() + 250 /* ms */ :
                     Infinity);
      for (; k < elements.length && clock['now']() < endTime; k++) {
        var cs = elements[k];

        // Look for a preceding comment like
        // <?prettify lang="..." linenums="..."?>
        var attrs = EMPTY;
        {
          for (var preceder = cs; (preceder = preceder.previousSibling);) {
            var nt = preceder.nodeType;
            // <?foo?> is parsed by HTML 5 to a comment node (8)
            // like <!--?foo?-->, but in XML is a processing instruction
            var value = (nt === 7 || nt === 8) && preceder.nodeValue;
            if (value
                ? !/^\??prettify\b/.test(value)
                : (nt !== 3 || /\S/.test(preceder.nodeValue))) {
              // Skip over white-space text nodes but not others.
              break;
            }
            if (value) {
              attrs = {};
              value.replace(
                  /\b(\w+)=([\w:.%+-]+)/g,
                function (_, name, value) { attrs[name] = value; });
              break;
            }
          }
        }

        var className = cs.className;
        if ((attrs !== EMPTY || prettyPrintRe.test(className))
            // Don't redo this if we've already done it.
            // This allows recalling pretty print to just prettyprint elements
            // that have been added to the page since last call.
            && !prettyPrintedRe.test(className)) {

          // make sure this is not nested in an already prettified element
          var nested = false;
          for (var p = cs.parentNode; p; p = p.parentNode) {
            var tn = p.tagName;
            if (preCodeXmpRe.test(tn)
                && p.className && prettyPrintRe.test(p.className)) {
              nested = true;
              break;
            }
          }
          if (!nested) {
            // Mark done.  If we fail to prettyprint for whatever reason,
            // we shouldn't try again.
            cs.className += ' prettyprinted';

            // If the classes includes a language extensions, use it.
            // Language extensions can be specified like
            //     <pre class="prettyprint lang-cpp">
            // the language extension "cpp" is used to find a language handler
            // as passed to PR.registerLangHandler.
            // HTML5 recommends that a language be specified using "language-"
            // as the prefix instead.  Google Code Prettify supports both.
            // http://dev.w3.org/html5/spec-author-view/the-code-element.html
            var langExtension = attrs['lang'];
            if (!langExtension) {
              langExtension = className.match(langExtensionRe);
              // Support <pre class="prettyprint"><code class="language-c">
              var wrapper;
              if (!langExtension && (wrapper = childContentWrapper(cs))
                  && codeRe.test(wrapper.tagName)) {
                langExtension = wrapper.className.match(langExtensionRe);
              }

              if (langExtension) { langExtension = langExtension[1]; }
            }

            var preformatted;
            if (preformattedTagNameRe.test(cs.tagName)) {
              preformatted = 1;
            } else {
              var currentStyle = cs['currentStyle'];
              var defaultView = doc.defaultView;
              var whitespace = (
                  currentStyle
                  ? currentStyle['whiteSpace']
                  : (defaultView
                     && defaultView.getComputedStyle)
                  ? defaultView.getComputedStyle(cs, null)
                  .getPropertyValue('white-space')
                  : 0);
              preformatted = whitespace
                  && 'pre' === whitespace.substring(0, 3);
            }

            // Look for a class like linenums or linenums:<n> where <n> is the
            // 1-indexed number of the first line.
            var lineNums = attrs['linenums'];
            if (!(lineNums = lineNums === 'true' || +lineNums)) {
              lineNums = className.match(/\blinenums\b(?::(\d+))?/);
              lineNums =
                lineNums
                ? lineNums[1] && lineNums[1].length
                  ? +lineNums[1] : true
                : false;
            }
            if (lineNums) { numberLines(cs, lineNums, preformatted); }

            // do the pretty printing
            prettyPrintingJob = {
              langExtension: langExtension,
              sourceNode: cs,
              numberLines: lineNums,
              pre: preformatted
            };
            applyDecorator(prettyPrintingJob);
          }
        }
      }
      if (k < elements.length) {
        // finish up in a continuation
        setTimeout(doWork, 250);
      } else if ('function' === typeof opt_whenDone) {
        opt_whenDone();
      }
    }

    doWork();
  }

  /**
   * Contains functions for creating and registering new language handlers.
   * @type {Object}
   */
  var PR = win['PR'] = {
        'createSimpleLexer': createSimpleLexer,
        'registerLangHandler': registerLangHandler,
        'sourceDecorator': sourceDecorator,
        'PR_ATTRIB_NAME': PR_ATTRIB_NAME,
        'PR_ATTRIB_VALUE': PR_ATTRIB_VALUE,
        'PR_COMMENT': PR_COMMENT,
        'PR_DECLARATION': PR_DECLARATION,
        'PR_KEYWORD': PR_KEYWORD,
        'PR_LITERAL': PR_LITERAL,
        'PR_NOCODE': PR_NOCODE,
        'PR_PLAIN': PR_PLAIN,
        'PR_PUNCTUATION': PR_PUNCTUATION,
        'PR_SOURCE': PR_SOURCE,
        'PR_STRING': PR_STRING,
        'PR_TAG': PR_TAG,
        'PR_TYPE': PR_TYPE,
        'prettyPrintOne':
           IN_GLOBAL_SCOPE
             ? (win['prettyPrintOne'] = $prettyPrintOne)
             : (prettyPrintOne = $prettyPrintOne),
        'prettyPrint': prettyPrint =
           IN_GLOBAL_SCOPE
             ? (win['prettyPrint'] = $prettyPrint)
             : (prettyPrint = $prettyPrint)
      };

  // Make PR available via the Asynchronous Module Definition (AMD) API.
  // Per https://github.com/amdjs/amdjs-api/wiki/AMD:
  // The Asynchronous Module Definition (AMD) API specifies a
  // mechanism for defining modules such that the module and its
  // dependencies can be asynchronously loaded.
  // ...
  // To allow a clear indicator that a global define function (as
  // needed for script src browser loading) conforms to the AMD API,
  // any global define function SHOULD have a property called "amd"
  // whose value is an object. This helps avoid conflict with any
  // other existing JavaScript code that could have defined a define()
  // function that does not conform to the AMD API.
  if (typeof define === "function" && define['amd']) {
    define("google-code-prettify", [], function () {
      return PR; 
    });
  }
})();
(function() {


}).call(this);


!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){u(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))};if(c.ajax=f,c.queue=d,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,maxw:/\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var g,h,i,j=a.document,k=j.documentElement,l=[],m=[],n=[],o={},p=30,q=j.getElementsByTagName("head")[0]||k,r=j.getElementsByTagName("base")[0],s=q.getElementsByTagName("link"),t=function(){var a,b=j.createElement("div"),c=j.body,d=k.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=j.createElement("body"),c.style.background="none"),k.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&k.insertBefore(c,k.firstChild),a=b.offsetWidth,f?k.removeChild(c):c.removeChild(b),k.style.fontSize=d,e&&(c.style.fontSize=e),a=i=parseFloat(a)},u=function(b){var c="clientWidth",d=k[c],e="CSS1Compat"===j.compatMode&&d||j.body[c]||d,f={},o=s[s.length-1],r=(new Date).getTime();if(b&&g&&p>r-g)return a.clearTimeout(h),h=a.setTimeout(u,p),void 0;g=r;for(var v in l)if(l.hasOwnProperty(v)){var w=l[v],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?i||t():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?i||t():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(m[w.rules]))}for(var C in n)n.hasOwnProperty(C)&&n[C]&&n[C].parentNode===q&&q.removeChild(n[C]);n.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=j.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,q.insertBefore(E,o.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(j.createTextNode(F)),n.push(E)}},v=function(a,b,d){var e=a.replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var g=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},h=!f&&d;b.length&&(b+="/"),h&&(f=1);for(var i=0;f>i;i++){var j,k,n,o;h?(j=d,m.push(g(a))):(j=e[i].match(c.regex.findStyles)&&RegExp.$1,m.push(RegExp.$2&&g(RegExp.$2))),n=j.split(","),o=n.length;for(var p=0;o>p;p++)k=n[p],l.push({media:k.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:m.length-1,hasquery:k.indexOf("(")>-1,minw:k.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:k.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}u()},w=function(){if(d.length){var b=d.shift();f(b.href,function(c){v(c,b.href,b.media),o[b.href]=!0,a.setTimeout(function(){w()},0)})}},x=function(){for(var b=0;b<s.length;b++){var c=s[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!o[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(v(c.styleSheet.rawCssText,e,f),o[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!r||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}w()};x(),c.update=x,c.getEmValue=t,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);
(function() {


}).call(this);
$(function () {
        $('[data-toggle=tooltip]').tooltip();
      });
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




;
