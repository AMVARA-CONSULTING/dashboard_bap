!function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{Hvvo:function(t,e,o){"use strict";o.d(e,"a",function(){return a});var n=o("R0Ic"),a=Object(n.o)("routerTransition",[Object(n.n)(":increment",[Object(n.i)(":enter, :leave",Object(n.m)({overflow:"hidden"}),{optional:!0}),Object(n.g)([Object(n.i)(":enter",[Object(n.m)({transform:"translateX(100%)"}),Object(n.e)("0.5s ease-in-out",Object(n.m)({transform:"translateX(0%)"}))],{optional:!0}),Object(n.i)(":leave",[Object(n.m)({transform:"translateX(0%)"}),Object(n.e)("0.5s ease-in-out",Object(n.m)({transform:"translateX(-100%)"}))],{optional:!0})])]),Object(n.n)(":decrement",[Object(n.i)(":enter, :leave",Object(n.m)({overflow:"hidden"}),{optional:!0}),Object(n.g)([Object(n.i)(":enter",[Object(n.m)({transform:"translateX(-100%)"}),Object(n.e)("0.5s ease-in-out",Object(n.m)({transform:"translateX(0%)"}))],{optional:!0}),Object(n.i)(":leave",[Object(n.m)({transform:"translateX(0%)"}),Object(n.e)("0.5s ease-in-out",Object(n.m)({left:0,transform:"translateX(100%)"}))],{optional:!0})])])])},NZ8W:function(t,o,n){"use strict";n.d(o,"a",function(){return s}),n.d(o,"b",function(){return l});var a=n("Y8Bm"),r=n("NIO5"),i=n("fXoL"),c=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},s=function(){var t=function t(){var o=this;e(this,t),this.transform=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return l(t,e,n,o.language)}};return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=i.Qb({name:"toNumber",type:t,pure:!0}),function(t,e,o,n){var a,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(i=(r<3?a(i):r>3?a(e,o,i):a(e,o))||i);r>3&&i&&Object.defineProperty(e,o,i)}([Object(a.b)(r.b.GetLanguage),c("design:type",String)],t.prototype,"language",void 0),t}();function l(t){var e,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"en";return isNaN(t)?"-":0==(t=Math.round(t))?"0":(e=t>0?o?"+ "+parseInt(Math.abs(t).toFixed(0),10).toLocaleString(a):t<0?"- "+parseInt(Math.abs(t).toFixed(0),10).toLocaleString(a):parseInt(Math.abs(t).toFixed(0),10).toLocaleString(a):o||t<0?"- "+parseInt(Math.abs(t).toFixed(0),10).toLocaleString(a):parseInt(Math.abs(t).toFixed(0),10).toLocaleString(a),n?e:e.replace(/[,.]/g,""))}},buvp:function(o,n,a){"use strict";a.d(n,"a",function(){return p});var r=a("EnSQ"),i=a("fXoL"),c=a("Qu3c"),s=a("ofXK"),l=a("eANF"),u=a("NZ8W"),b=function(t){return{negative:t}},p=function(){var o=function(){function o(t){e(this,o),this.data=t,this.clockwise_actual=!1,this.clockwise_previous=!1,this.actualNegative=!1,this.previousNegative=!1,this.actual=0,this.previous=0}var n,a,r;return n=o,(a=[{key:"setActual",set:function(t){this.actual=isNaN(t)?0:Math.abs(t),this.clockwise_actual=t>=0}},{key:"setPrevious",set:function(t){this.previous=isNaN(t)?0:Math.abs(t),this.clockwise_previous=t>=0}}])&&t(n.prototype,a),r&&t(n,r),o}();return o.\u0275fac=function(t){return new(t||o)(i.Rb(r.a))},o.\u0275cmp=i.Lb({type:o,selectors:[["dip-circular-meters"]],inputs:{actualValue:"actualValue",previousValue:"previousValue",setActual:["actual","setActual"],setPrevious:["previous","setPrevious"]},decls:12,vars:32,consts:[[1,"meter"],["matTooltipPosition","above","matTooltipClass","actual",1,"container",3,"matTooltip"],[1,"percent","cyan",3,"ngClass"],["background","rgba(0, 172, 193, .2)",3,"clockwise","duration","animation","animationDelay","max","radius","stroke","current","color"],["matTooltipPosition","above","matTooltipClass","previous",1,"container",3,"matTooltip"],[1,"percent","orange",3,"ngClass"],["background","rgba(248, 176, 59, .2)",3,"clockwise","duration","animation","animationDelay","max","radius","stroke","current","color"]],template:function(t,e){1&t&&(i.Wb(0,"div",0),i.Wb(1,"div",1),i.ic(2,"toNumber"),i.Wb(3,"div",2),i.Ic(4),i.Vb(),i.Sb(5,"round-progress",3),i.Vb(),i.Vb(),i.Wb(6,"div",0),i.Wb(7,"div",4),i.ic(8,"toNumber"),i.Wb(9,"div",5),i.Ic(10),i.Vb(),i.Sb(11,"round-progress",6),i.Vb(),i.Vb()),2&t&&(i.Fb(1),i.oc("matTooltip",i.jc(2,24,e.actualValue)),i.Fb(2),i.oc("ngClass",i.qc(28,b,!e.clockwise_actual)),i.Fb(1),i.Kc("",e.actual,"%"),i.Fb(1),i.oc("clockwise",e.clockwise_actual)("duration",1e3)("animation","easeInOutCubic")("animationDelay",200)("max",100)("radius",60)("stroke",13)("current",e.actual)("color",e.data.lightTheme?"#17687F":"#00acc1"),i.Fb(2),i.oc("matTooltip",i.jc(8,26,e.previousValue)),i.Fb(2),i.oc("ngClass",i.qc(30,b,!e.clockwise_previous)),i.Fb(1),i.Kc("",e.previous,"%"),i.Fb(1),i.oc("clockwise",e.clockwise_previous)("duration",1e3)("animation","easeInOutCubic")("animationDelay",200)("max",100)("radius",60)("stroke",13)("current",e.previous)("color",e.data.lightTheme?"#E59123":"#f8b03b"))},directives:[c.a,s.j,l.a],pipes:[u.a],styles:["[_nghost-%COMP%]{display:flex;flex:1 100%;height:170px;position:relative;background:linear-gradient(180deg,transparent,rgba(52,52,69,.5));border-bottom:3px solid rgba(0,0,0,.05)}[_nghost-%COMP%]   .meter[_ngcontent-%COMP%]{flex:1 50%;height:100%}[_nghost-%COMP%]   .meter[_ngcontent-%COMP%]:nth-child(2){border-left:3px solid rgba(0,0,0,.35)}[_nghost-%COMP%]   .meter[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:120px;height:120px;margin:20px auto 0;position:relative}[_nghost-%COMP%]   .meter[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]{position:absolute;height:30px;width:100%;margin:auto;text-align:center;top:0;bottom:0;font-size:27px}  .mat-tooltip.actual{border-color:#00acc1}  .mat-tooltip.previous{border-color:#f8b03b}body[theme=light]   [_nghost-%COMP%]{border-bottom-color:#fff;background:linear-gradient(180deg,#fff,#e6e6e6)}body[theme=light]   [_nghost-%COMP%]   .cyan[_ngcontent-%COMP%]{color:#17687f}body[theme=light]   [_nghost-%COMP%]   .orange[_ngcontent-%COMP%]{color:#e59123}body[theme=light]   [_nghost-%COMP%]   .meter[_ngcontent-%COMP%]{border-left-color:transparent}body[theme=light][_ngcontent-%COMP%]     .mat-tooltip.actual{border-color:#17687f}body[theme=light][_ngcontent-%COMP%]     .mat-tooltip.previous{border-color:#e59123}"],changeDetection:0}),o}()}}])}();