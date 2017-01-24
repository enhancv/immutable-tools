(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fromJS = exports.moveListItem = exports.updateRecursive = exports.traverseRecursive = undefined;

	var _immutable = __webpack_require__(1);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _lodash = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function moveListItemBase(fromIndex, toIndex, list) {
	    var from = list.get(fromIndex);
	    list = list.delete(fromIndex);

	    return list.insert(toIndex, from);
	}

	function fromJSBase(recordClasses, data) {
	    return _immutable2.default.fromJS(data, function (key, value) {
	        var record = value.get('record');

	        if (record) {
	            if (!recordClasses[record]) {
	                throw new Error('Record class ' + record + ' not found');
	            }

	            return new recordClasses[record](value.toObject());
	        } else {
	            return _immutable2.default.Iterable.isIndexed(value) ? value.toList() : value.toMap();
	        }
	    });
	}

	function updateRecursiveBase(Item, updater, item) {
	    if (item instanceof Item) {
	        return item.update(updater);
	    } else if (item instanceof _immutable2.default.List || item instanceof _immutable2.default.Map) {
	        return item.map(updateRecursive(Item, updater));
	    } else {
	        return item;
	    }
	}

	function traverseRecursiveBase(Item, path, callback, item, key) {
	    var currentPath = (0, _lodash.concat)(path, [key]);

	    if (item instanceof Item) {
	        callback(item, currentPath);
	        return item;
	    } else if (item instanceof _immutable2.default.List || item instanceof _immutable2.default.Map) {
	        return item.map(traverseRecursive(Item, currentPath, callback));
	    } else {
	        return item;
	    }
	}

	var traverseRecursive = exports.traverseRecursive = (0, _lodash.curry)(traverseRecursiveBase);
	var updateRecursive = exports.updateRecursive = (0, _lodash.curry)(updateRecursiveBase);
	var moveListItem = exports.moveListItem = (0, _lodash.curry)(moveListItemBase);
	var fromJS = exports.fromJS = (0, _lodash.curry)(fromJSBase);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ }
/******/ ])));