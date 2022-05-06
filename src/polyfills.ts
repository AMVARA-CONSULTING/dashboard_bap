/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/weak-map';
import 'core-js/es/set';
import 'core-js/es/promise';
import 'core-js/es/array';
import 'zone.js';  // Run `npm install --save classlist.js`.

/** IE10 and IE11 requires the following for the Reflect API. */
import 'core-js/es/reflect';


/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es/reflect';

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 */

// (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
// (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
// (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames

/*
* in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
* with the following flag, it will bypass `zone.js` patch for IE/Edge
*/
(window as any).__Zone_enable_cross_context_check = true;

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.

// Custom Polyfill to support .toLocaleString() in iOS devices
// https://github.com/willsp/polyfill-Number.toLocaleString-with-Locales
import 'number-to-locale-string'

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
(function () {
  Object.setPrototypeOf = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);

  function setProtoOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }

  function mixinProperties(obj, proto) {
    for (const prop in proto) {
      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = proto[prop];
      }
    }
    return obj;
  }
})();

// Support .remove() in IE 9+
// https://stackoverflow.com/questions/20428877/javascript-remove-doesnt-work-in-ie
if (!('remove' in Element.prototype)) {
  (Element.prototype['remove'] as any) = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}