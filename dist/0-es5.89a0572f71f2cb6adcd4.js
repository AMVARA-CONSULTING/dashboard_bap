function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{FpXt:function(e,t,i){"use strict";i.d(t,"a",(function(){return s})),i.d(t,"b",(function(){return o}));var n=i("k5Gf"),o=function(e){return new n.a(e,"./assets/i18n/",".json")},s=function e(){_classCallCheck(this,e)}},Gi4r:function(e,t,i){"use strict";i.d(t,"a",(function(){return n})),i("SVse"),i("IheW"),i("8Y7J"),i("cUpR"),i("LRne"),i("z6cu"),i("cp0P"),i("vkgz"),i("lJxs"),i("JIr8"),i("nYR2"),i("w1tV"),i("IzEk"),i("KCVW"),i("Xd0L");var n=function e(){_classCallCheck(this,e)}},JjoW:function(e,t,i){"use strict";i.d(t,"d",(function(){return I})),i.d(t,"b",(function(){return O})),i.d(t,"a",(function(){return b})),i.d(t,"c",(function(){return C})),i("GS7A");var n=i("5GAg"),o=i("KCVW"),s=i("8bJo"),r=i("dvZr"),a=(i("QQfA"),i("8Y7J")),l=i("Xd0L"),c=i("XNiG"),h=i("NXyV"),u=i("VRyK"),_=i("JX91"),p=i("eIep"),f=i("IzEk"),g=i("pLZG"),d=i("lJxs"),y=i("/uUt"),v=i("1G5W"),m=0,b=new a.InjectionToken("mat-select-scroll-strategy");function O(e){return function(){return e.scrollStrategies.reposition()}}var k=function e(t,i){_classCallCheck(this,e),this.source=t,this.value=i},C=function(e){function t(e,i,n,o,s,r,l,y,v,b,O,k,C){var I;return _classCallCheck(this,t),(I=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this,s,o,l,y,b)))._viewportRuler=e,I._changeDetectorRef=i,I._ngZone=n,I._dir=r,I._parentFormField=v,I.ngControl=b,I._liveAnnouncer=C,I._panelOpen=!1,I._required=!1,I._scrollTop=0,I._multiple=!1,I._compareWith=function(e,t){return e===t},I._uid="mat-select-".concat(m++),I._destroy=new c.a,I._triggerFontSize=0,I._onChange=function(){},I._onTouched=function(){},I._optionIds="",I._transformOrigin="top",I._panelDoneAnimatingStream=new c.a,I._offsetY=0,I._positions=[{originX:"start",originY:"top",overlayX:"start",overlayY:"top"},{originX:"start",originY:"bottom",overlayX:"start",overlayY:"bottom"}],I._disableOptionCentering=!1,I._focused=!1,I.controlType="mat-select",I.ariaLabel="",I.optionSelectionChanges=Object(h.a)((function(){var e=I.options;return e?e.changes.pipe(Object(_.a)(e),Object(p.a)((function(){return Object(u.a).apply(void 0,_toConsumableArray(e.map((function(e){return e.onSelectionChange}))))}))):I._ngZone.onStable.asObservable().pipe(Object(f.a)(1),Object(p.a)((function(){return I.optionSelectionChanges})))})),I.openedChange=new a.EventEmitter,I._openedStream=I.openedChange.pipe(Object(g.a)((function(e){return e})),Object(d.a)((function(){}))),I._closedStream=I.openedChange.pipe(Object(g.a)((function(e){return!e})),Object(d.a)((function(){}))),I.selectionChange=new a.EventEmitter,I.valueChange=new a.EventEmitter,I.ngControl&&(I.ngControl.valueAccessor=_assertThisInitialized(I)),I._scrollStrategyFactory=k,I._scrollStrategy=I._scrollStrategyFactory(),I.tabIndex=parseInt(O)||0,I.id=I.id,I}return _inherits(t,e),_createClass(t,[{key:"ngOnInit",value:function(){var e=this;this._selectionModel=new s.b(this.multiple),this.stateChanges.next(),this._panelDoneAnimatingStream.pipe(Object(y.a)(),Object(v.a)(this._destroy)).subscribe((function(){e.panelOpen?(e._scrollTop=0,e.openedChange.emit(!0)):(e.openedChange.emit(!1),e.overlayDir.offsetX=0,e._changeDetectorRef.markForCheck())})),this._viewportRuler.change().pipe(Object(v.a)(this._destroy)).subscribe((function(){e._panelOpen&&(e._triggerRect=e.trigger.nativeElement.getBoundingClientRect(),e._changeDetectorRef.markForCheck())}))}},{key:"ngAfterContentInit",value:function(){var e=this;this._initKeyManager(),this._selectionModel.onChange.pipe(Object(v.a)(this._destroy)).subscribe((function(e){e.added.forEach((function(e){return e.select()})),e.removed.forEach((function(e){return e.deselect()}))})),this.options.changes.pipe(Object(_.a)(null),Object(v.a)(this._destroy)).subscribe((function(){e._resetOptions(),e._initializeSelection()}))}},{key:"ngDoCheck",value:function(){this.ngControl&&this.updateErrorState()}},{key:"ngOnChanges",value:function(e){e.disabled&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval)}},{key:"ngOnDestroy",value:function(){this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}},{key:"toggle",value:function(){this.panelOpen?this.close():this.open()}},{key:"open",value:function(){var e=this;!this.disabled&&this.options&&this.options.length&&!this._panelOpen&&(this._triggerRect=this.trigger.nativeElement.getBoundingClientRect(),this._triggerFontSize=parseInt(getComputedStyle(this.trigger.nativeElement).fontSize||"0"),this._panelOpen=!0,this._keyManager.withHorizontalOrientation(null),this._calculateOverlayPosition(),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this._ngZone.onStable.asObservable().pipe(Object(f.a)(1)).subscribe((function(){e._triggerFontSize&&e.overlayDir.overlayRef&&e.overlayDir.overlayRef.overlayElement&&(e.overlayDir.overlayRef.overlayElement.style.fontSize="".concat(e._triggerFontSize,"px"))})))}},{key:"close",value:function(){this._panelOpen&&(this._panelOpen=!1,this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched())}},{key:"writeValue",value:function(e){this.options&&this._setSelectionByValue(e)}},{key:"registerOnChange",value:function(e){this._onChange=e}},{key:"registerOnTouched",value:function(e){this._onTouched=e}},{key:"setDisabledState",value:function(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}},{key:"_isRtl",value:function(){return!!this._dir&&"rtl"===this._dir.value}},{key:"_handleKeydown",value:function(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}},{key:"_handleClosedKeydown",value:function(e){var t=e.keyCode,i=t===r.b||t===r.l||t===r.g||t===r.i,n=this._keyManager;if((t===r.d||t===r.j)&&!Object(r.o)(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){var o=this.selected;t===r.f||t===r.c?(t===r.f?n.setFirstItemActive():n.setLastItemActive(),e.preventDefault()):n.onKeydown(e);var s=this.selected;this._liveAnnouncer&&s&&o!==s&&this._liveAnnouncer.announce(s.viewValue,1e4)}}},{key:"_handleOpenKeydown",value:function(e){var t=e.keyCode,i=t===r.b||t===r.l,n=this._keyManager;if(t===r.f||t===r.c)e.preventDefault(),t===r.f?n.setFirstItemActive():n.setLastItemActive();else if(i&&e.altKey)e.preventDefault(),this.close();else if(t!==r.d&&t!==r.j||!n.activeItem||Object(r.o)(e))if(this._multiple&&t===r.a&&e.ctrlKey){e.preventDefault();var o=this.options.some((function(e){return!e.disabled&&!e.selected}));this.options.forEach((function(e){e.disabled||(o?e.select():e.deselect())}))}else{var s=n.activeItemIndex;n.onKeydown(e),this._multiple&&i&&e.shiftKey&&n.activeItem&&n.activeItemIndex!==s&&n.activeItem._selectViaInteraction()}else e.preventDefault(),n.activeItem._selectViaInteraction()}},{key:"_onFocus",value:function(){this.disabled||(this._focused=!0,this.stateChanges.next())}},{key:"_onBlur",value:function(){this._focused=!1,this.disabled||this.panelOpen||(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}},{key:"_onAttached",value:function(){var e=this;this.overlayDir.positionChange.pipe(Object(f.a)(1)).subscribe((function(){e._changeDetectorRef.detectChanges(),e._calculateOverlayOffsetX(),e.panel.nativeElement.scrollTop=e._scrollTop}))}},{key:"_getPanelTheme",value:function(){return this._parentFormField?"mat-".concat(this._parentFormField.color):""}},{key:"_initializeSelection",value:function(){var e=this;Promise.resolve().then((function(){e._setSelectionByValue(e.ngControl?e.ngControl.value:e._value),e.stateChanges.next()}))}},{key:"_setSelectionByValue",value:function(e){var t=this;if(this.multiple&&e){if(!Array.isArray(e))throw Error("Value must be an array in multiple-selection mode.");this._selectionModel.clear(),e.forEach((function(e){return t._selectValue(e)})),this._sortValues()}else{this._selectionModel.clear();var i=this._selectValue(e);i?this._keyManager.setActiveItem(i):this.panelOpen||this._keyManager.setActiveItem(-1)}this._changeDetectorRef.markForCheck()}},{key:"_selectValue",value:function(e){var t=this,i=this.options.find((function(i){try{return null!=i.value&&t._compareWith(i.value,e)}catch(n){return Object(a.isDevMode)()&&console.warn(n),!1}}));return i&&this._selectionModel.select(i),i}},{key:"_initKeyManager",value:function(){var e=this;this._keyManager=new n.b(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withAllowedModifierKeys(["shiftKey"]),this._keyManager.tabOut.pipe(Object(v.a)(this._destroy)).subscribe((function(){e.focus(),e.close()})),this._keyManager.change.pipe(Object(v.a)(this._destroy)).subscribe((function(){e._panelOpen&&e.panel?e._scrollActiveOptionIntoView():e._panelOpen||e.multiple||!e._keyManager.activeItem||e._keyManager.activeItem._selectViaInteraction()}))}},{key:"_resetOptions",value:function(){var e=this,t=Object(u.a)(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Object(v.a)(t)).subscribe((function(t){e._onSelect(t.source,t.isUserInput),t.isUserInput&&!e.multiple&&e._panelOpen&&(e.close(),e.focus())})),Object(u.a).apply(void 0,_toConsumableArray(this.options.map((function(e){return e._stateChanges})))).pipe(Object(v.a)(t)).subscribe((function(){e._changeDetectorRef.markForCheck(),e.stateChanges.next()})),this._setOptionIds()}},{key:"_onSelect",value:function(e,t){var i=this._selectionModel.isSelected(e);null!=e.value||this._multiple?(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())):(e.deselect(),this._selectionModel.clear(),this._propagateChanges(e.value)),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}},{key:"_sortValues",value:function(){var e=this;if(this.multiple){var t=this.options.toArray();this._selectionModel.sort((function(i,n){return e.sortComparator?e.sortComparator(i,n,t):t.indexOf(i)-t.indexOf(n)})),this.stateChanges.next()}}},{key:"_propagateChanges",value:function(e){var t;t=this.multiple?this.selected.map((function(e){return e.value})):this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(new k(this,t)),this._changeDetectorRef.markForCheck()}},{key:"_setOptionIds",value:function(){this._optionIds=this.options.map((function(e){return e.id})).join(" ")}},{key:"_highlightCorrectOption",value:function(){this._keyManager&&(this.empty?this._keyManager.setFirstItemActive():this._keyManager.setActiveItem(this._selectionModel.selected[0]))}},{key:"_scrollActiveOptionIntoView",value:function(){var e=this._keyManager.activeItemIndex||0,t=Object(l.x)(e,this.options,this.optionGroups);this.panel.nativeElement.scrollTop=Object(l.y)(e+t,this._getItemHeight(),this.panel.nativeElement.scrollTop,256)}},{key:"focus",value:function(e){this._elementRef.nativeElement.focus(e)}},{key:"_getOptionIndex",value:function(e){return this.options.reduce((function(t,i,n){return void 0===t?e===i?n:void 0:t}),void 0)}},{key:"_calculateOverlayPosition",value:function(){var e=this._getItemHeight(),t=this._getItemCount(),i=Math.min(t*e,256),n=t*e-i,o=this.empty?0:this._getOptionIndex(this._selectionModel.selected[0]);o+=Object(l.x)(o,this.options,this.optionGroups);var s=i/2;this._scrollTop=this._calculateOverlayScroll(o,s,n),this._offsetY=this._calculateOverlayOffsetY(o,s,n),this._checkOverlayWithinViewport(n)}},{key:"_calculateOverlayScroll",value:function(e,t,i){var n=this._getItemHeight();return Math.min(Math.max(0,n*e-t+n/2),i)}},{key:"_getAriaLabel",value:function(){return this.ariaLabelledby?null:this.ariaLabel||this.placeholder}},{key:"_getAriaLabelledby",value:function(){return this.ariaLabelledby?this.ariaLabelledby:this._parentFormField&&this._parentFormField._hasFloatingLabel()&&!this._getAriaLabel()&&this._parentFormField._labelId||null}},{key:"_getAriaActiveDescendant",value:function(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}},{key:"_calculateOverlayOffsetX",value:function(){var e,t=this.overlayDir.overlayRef.overlayElement.getBoundingClientRect(),i=this._viewportRuler.getViewportSize(),n=this._isRtl(),o=this.multiple?56:32;if(this.multiple)e=40;else{var s=this._selectionModel.selected[0]||this.options.first;e=s&&s.group?32:16}n||(e*=-1);var r=0-(t.left+e-(n?o:0)),a=t.right+e-i.width+(n?0:o);r>0?e+=r+8:a>0&&(e-=a+8),this.overlayDir.offsetX=Math.round(e),this.overlayDir.overlayRef.updatePosition()}},{key:"_calculateOverlayOffsetY",value:function(e,t,i){var n,o=this._getItemHeight(),s=(o-this._triggerRect.height)/2,r=Math.floor(256/o);return this._disableOptionCentering?0:(n=0===this._scrollTop?e*o:this._scrollTop===i?(e-(this._getItemCount()-r))*o+(o-(this._getItemCount()*o-256)%o):t-o/2,Math.round(-1*n-s))}},{key:"_checkOverlayWithinViewport",value:function(e){var t=this._getItemHeight(),i=this._viewportRuler.getViewportSize(),n=this._triggerRect.top-8,o=i.height-this._triggerRect.bottom-8,s=Math.abs(this._offsetY),r=Math.min(this._getItemCount()*t,256)-s-this._triggerRect.height;r>o?this._adjustPanelUp(r,o):s>n?this._adjustPanelDown(s,n,e):this._transformOrigin=this._getOriginBasedOnOption()}},{key:"_adjustPanelUp",value:function(e,t){var i=Math.round(e-t);this._scrollTop-=i,this._offsetY-=i,this._transformOrigin=this._getOriginBasedOnOption(),this._scrollTop<=0&&(this._scrollTop=0,this._offsetY=0,this._transformOrigin="50% bottom 0px")}},{key:"_adjustPanelDown",value:function(e,t,i){var n=Math.round(e-t);if(this._scrollTop+=n,this._offsetY+=n,this._transformOrigin=this._getOriginBasedOnOption(),this._scrollTop>=i)return this._scrollTop=i,this._offsetY=0,void(this._transformOrigin="50% top 0px")}},{key:"_getOriginBasedOnOption",value:function(){var e=this._getItemHeight(),t=(e-this._triggerRect.height)/2;return"50% ".concat(Math.abs(this._offsetY)-t+e/2,"px 0px")}},{key:"_getItemCount",value:function(){return this.options.length+this.optionGroups.length}},{key:"_getItemHeight",value:function(){return 3*this._triggerFontSize}},{key:"setDescribedByIds",value:function(e){this._ariaDescribedby=e.join(" ")}},{key:"onContainerClick",value:function(){this.focus(),this.open()}},{key:"focused",get:function(){return this._focused||this._panelOpen},set:function(e){this._focused=e}},{key:"placeholder",get:function(){return this._placeholder},set:function(e){this._placeholder=e,this.stateChanges.next()}},{key:"required",get:function(){return this._required},set:function(e){this._required=Object(o.b)(e),this.stateChanges.next()}},{key:"multiple",get:function(){return this._multiple},set:function(e){if(this._selectionModel)throw Error("Cannot change `multiple` mode of select after initialization.");this._multiple=Object(o.b)(e)}},{key:"disableOptionCentering",get:function(){return this._disableOptionCentering},set:function(e){this._disableOptionCentering=Object(o.b)(e)}},{key:"compareWith",get:function(){return this._compareWith},set:function(e){if("function"!=typeof e)throw Error("`compareWith` must be a function.");this._compareWith=e,this._selectionModel&&this._initializeSelection()}},{key:"value",get:function(){return this._value},set:function(e){e!==this._value&&(this.writeValue(e),this._value=e)}},{key:"id",get:function(){return this._id},set:function(e){this._id=e||this._uid,this.stateChanges.next()}},{key:"panelOpen",get:function(){return this._panelOpen}},{key:"selected",get:function(){return this.multiple?this._selectionModel.selected:this._selectionModel.selected[0]}},{key:"triggerValue",get:function(){if(this.empty)return"";if(this._multiple){var e=this._selectionModel.selected.map((function(e){return e.viewValue}));return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}},{key:"empty",get:function(){return!this._selectionModel||this._selectionModel.isEmpty()}},{key:"shouldLabelFloat",get:function(){return this._panelOpen||!this.empty}}]),t}(Object(l.A)(Object(l.D)(Object(l.B)(Object(l.C)((function e(t,i,n,o,s){_classCallCheck(this,e),this._elementRef=t,this._defaultErrorStateMatcher=i,this._parentForm=n,this._parentFormGroup=o,this.ngControl=s})))))),I=function e(){_classCallCheck(this,e)}}}]);