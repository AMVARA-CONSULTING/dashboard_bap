(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{Afwt:function(t,n,e){"use strict";e.r(n),e.d(n,"AboutModule",function(){return N});var a=e("ofXK"),o=e("fXoL"),i=e("r4Kj"),r=e("EnSQ"),c=e("kiQV"),s=e("6mc2"),l=e("zO/h"),g=e("2Vo4"),b=e("AcyG"),p=e("NIO5"),m=e("sYmb"),d=e("dNgK"),u=e("7EHt"),h=e("kmnG"),f=e("d3UM"),_=e("3Pt+"),x=e("bTqV"),M=e("G/Qb"),k=e("FKr1"),O=e("H+bZ"),C=e("wd/R"),P=e("K1pJ");let L=(()=>{class t{constructor(t,n){this.config=t,this.api=n,this.date=new g.a(""),this.id=new g.a(""),this.name=new g.a("x"),this.hour=new g.a(""),this.type="",this.title=""}ngOnChanges(t){const n=t.type.currentValue;if(this.id.next(this.config.config.reports[this.config.config.target][this.config.config.scenario][n].id),0===this.api.reportDates[n].length)switch(n){case"orderBacklog":this.api.getSavedReportData(P.b.OrderBacklog).subscribe(t=>this.rollup(n));break;case"orderIntake":this.api.getSavedReportData(P.b.OrderIntake).subscribe(t=>this.rollup(n));break;case"productionProgram":this.api.getSavedReportData(P.b.ProductionProgram).subscribe(t=>this.rollup(n));break;case"allocation":this.api.getSavedReportData(P.b.Allocation).subscribe(t=>this.rollup(n));break;case"plantStock":this.api.getSavedReportData(P.b.PlantStock).subscribe(t=>this.rollup(n))}else this.rollup(n)}rollup(t){this.date.next(C(this.api.reportDates[t],"YYYY-MM-DDTHH:mm:ss.SSS[Z]").format("DD/MM/YYYY")),this.hour.next(C(this.api.reportDates[t],"YYYY-MM-DDTHH:mm:ss.SSS[Z]").format("HH:mm"));const n=["int","prod"],e=["trucks","vans"],a={orderBacklog:[],orderIntake:[],allocation:[],plantStock:[],productionProgram:[]};for(const o of Object.keys(a))for(const t of e)for(const e of n)this.config.config.reports[t][e][o].id&&a[o].push(this.config.config.reports[t][e][o].id);a.orderIntake.includes(this.id.getValue())&&this.name.next("MobileCockpit_V2_14.3_dev"),a.productionProgram.includes(this.id.getValue())&&this.name.next("Planning_Truck"),a.allocation.includes(this.id.getValue())&&this.name.next("Allocation_Truck"),a.plantStock.includes(this.id.getValue())&&this.name.next("Plant_Stock_Truck"),a.orderBacklog.includes(this.id.getValue())&&this.name.next("Order_Backlog_Truck")}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(i.a),o.Rb(O.a))},t.\u0275cmp=o.Lb({type:t,selectors:[["report-info"]],inputs:{type:"type",title:"title"},features:[o.Db],decls:23,vars:15,consts:[[1,"title"],[1,"container"],[1,"name"],[1,"prop"],[1,"val"],[1,"id"],[1,"date"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Lc(1),o.jc(2,"uppercase"),o.Wb(),o.Xb(3,"div",1),o.Xb(4,"div",2),o.Xb(5,"span",3),o.Lc(6,"ReportName:"),o.Wb(),o.Xb(7,"span",4),o.Lc(8),o.jc(9,"async"),o.Wb(),o.Wb(),o.Xb(10,"div",5),o.Xb(11,"span",3),o.Lc(12,"ID:"),o.Wb(),o.Xb(13,"span",4),o.Lc(14),o.jc(15,"async"),o.Wb(),o.Wb(),o.Xb(16,"div",6),o.Xb(17,"span",3),o.Lc(18,"Date:"),o.Wb(),o.Xb(19,"span",4),o.Lc(20),o.jc(21,"async"),o.jc(22,"async"),o.Wb(),o.Wb(),o.Wb()),2&t&&(o.Fb(1),o.Mc(o.kc(2,5,n.title)),o.Fb(7),o.Mc(o.kc(9,7,n.name)),o.Fb(6),o.Mc(o.kc(15,9,n.id)),o.Fb(6),o.Oc("",o.kc(21,11,n.date)," ",o.kc(22,13,n.hour),""))},pipes:[a.s,a.b],styles:["[_nghost-%COMP%]{display:block;margin:25px 0 15px}.container[_ngcontent-%COMP%]{display:flex}@media (max-width:800px){.container[_ngcontent-%COMP%]{flex-wrap:wrap}}.title[_ngcontent-%COMP%]{color:#f8b03b;font-size:1.1rem;margin-bottom:10px}.prop[_ngcontent-%COMP%]{flex:initial;color:hsla(0,0%,100%,.4)}@media (max-width:800px){.prop[_ngcontent-%COMP%]{flex:0 0 120px}}.val[_ngcontent-%COMP%]{margin-left:30px}@media (max-width:800px){.val[_ngcontent-%COMP%]{margin-left:0}}.date[_ngcontent-%COMP%]{justify-content:flex-end}@media (max-width:800px){.date[_ngcontent-%COMP%]{justify-content:flex-start}}.date[_ngcontent-%COMP%], .id[_ngcontent-%COMP%]{padding-left:20px}@media (max-width:800px){.date[_ngcontent-%COMP%], .id[_ngcontent-%COMP%]{padding-left:0}}.date[_ngcontent-%COMP%], .id[_ngcontent-%COMP%], .name[_ngcontent-%COMP%]{display:flex;flex:1 100%}"],changeDetection:0}),t})();function X(t,n){if(1&t&&(o.Xb(0,"mat-option",23),o.Lc(1),o.Wb()),2&t){const t=n.$implicit;o.pc("value",t.key),o.Fb(1),o.Mc(t.value)}}function W(t,n){if(1&t&&o.Sb(0,"report-info",24),2&t){const t=n.$implicit;o.pc("title",t.title)("type",t.type)}}function w(t,n){1&t&&(o.Xb(0,"div"),o.Xb(1,"b"),o.Lc(2,"Hint:"),o.Wb(),o.Lc(3," Press Alt + F11 everywhere to show current config in the Browser Console. "),o.Wb())}function y(t,n){if(1&t&&(o.Xb(0,"li"),o.Lc(1),o.Wb()),2&t){const t=n.$implicit;o.Fb(1),o.Mc(t)}}function v(t,n){if(1&t&&(o.Xb(0,"ul"),o.Jc(1,y,2,1,"li",21),o.Wb()),2&t){const t=o.ic().$implicit;o.Fb(1),o.pc("ngForOf",t.text)}}function F(t,n){if(1&t&&(o.Xb(0,"li"),o.Xb(1,"div",25),o.Lc(2),o.Wb(),o.Jc(3,v,2,1,"ul",19),o.Wb()),2&t){const t=n.$implicit;o.Fb(2),o.Mc(t.version),o.Fb(1),o.pc("ngIf",t.text.length>0)}}let S=(()=>{class t{constructor(t,n,e,a,i,r,s){this.config=t,this.translate=n,this.snack=e,this.data=a,this._tools=i,this._cognos=r,this._store=s,this.reportInfos=new g.a([]),this.data.currentLevel=1,this.angularVersion=o.P.full,this.momentVersion=this._tools.formatVersion(c.a.moment),this.hammerVersion=this._tools.formatVersion(c.a.hammerjs),this.ngx_translateVersion=this._tools.formatVersion(c.a["@ngx-translate/core"]),this.progressVersion=this._tools.formatVersion(c.a["angular-svg-round-progressbar"]),this.connectionVersion=this._tools.formatVersion(c.a["ng-connection-service"])}ngOnInit(){let t=[{title:"Order Intake",type:"orderIntake"},{title:"Order Backlog",type:"orderBacklog"},{title:"Production program",type:"productionProgram"},{title:"Allocation",type:"allocation"},{title:"Plant stock",type:"plantStock"}];const n=this._cognos.getLinksWithAccess().map(t=>t.text);this.config.config.debug&&console.log("Available links:",n),t=t.filter(t=>n.indexOf(t.title.toLowerCase().replace(/\ /g,"_"))>-1),this.reportInfos.next(t),this.config.config.debug&&console.log("Available reports:",t)}setLang(t){localStorage.setItem("lang",t),this.translate.use(t),this._store.dispatch(new p.a.SetParameter("language",t)),this.snack.open("Language changed successfully!","OK",{duration:3e3})}reloadLang(){this.translate.reloadLang(this.config.config.language),this.snack.open("Language reloaded successfully!","OK",{duration:3e3})}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(i.a),o.Rb(m.d),o.Rb(d.a),o.Rb(r.a),o.Rb(s.a),o.Rb(l.a),o.Rb(b.f))},t.\u0275cmp=o.Lb({type:t,selectors:[["about"]],hostBindings:function(t,n){1&t&&o.ec("swiperight",function(t){return n.data.goFrom("about",t)})("swipeleft",function(t){return n.data.goFrom("about",t)})},decls:105,vars:46,consts:[[3,"multi"],[3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["mat-raised-button","",1,"reload-translations",3,"click"],["href","https://material.io/","target","_blank"],["href","https://amvara.de/","target","_blank"],["href","https://www.ibm.com/products/cognos-analytics","target","_blank"],["href","https://angular.io/","target","_blank"],[1,"software"],["href","#","target","_blank"],["href","https://github.com/angular/angular/blob/master/LICENSE","target","_blank"],["href","https://github.com/hammerjs/hammer.js/blob/master/LICENSE.md","target","_blank"],["href","https://github.com/moment/moment/blob/develop/LICENSE","target","_blank"],["href","https://github.com/ngx-translate/core/blob/master/LICENSE","target","_blank"],["href","https://github.com/crisbeto/angular-svg-round-progressbar/blob/master/LICENSE","target","_blank"],["href","https://github.com/ultrasonicsoft/ng-connection-service/blob/master/LICENSE","target","_blank"],[1,"sw_status","enabled"],[1,"sw_status","disabled",2,"display","none"],[3,"title","type",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"changelog"],[4,"ngFor","ngForOf"],[1,"version"],[3,"value"],[3,"title","type"],[1,"change-title"]],template:function(t,n){if(1&t&&(o.Xb(0,"mat-accordion",0),o.Xb(1,"mat-expansion-panel"),o.Xb(2,"mat-expansion-panel-header"),o.Xb(3,"mat-panel-title"),o.Lc(4),o.jc(5,"translate"),o.Wb(),o.Wb(),o.Xb(6,"p"),o.Lc(7),o.jc(8,"translate"),o.Xb(9,"mat-form-field"),o.Xb(10,"mat-select",1),o.ec("ngModelChange",function(t){return n.setLang(t)})("ngModelChange",function(t){return n.config.config.language=t}),o.Jc(11,X,2,2,"mat-option",2),o.jc(12,"keyvalue"),o.Wb(),o.Wb(),o.Wb(),o.Xb(13,"button",3),o.ec("click",function(){return n.reloadLang()}),o.Lc(14),o.jc(15,"translate"),o.Wb(),o.Sb(16,"br"),o.Sb(17,"app-theme-switcher"),o.Wb(),o.Xb(18,"mat-expansion-panel"),o.Xb(19,"mat-expansion-panel-header"),o.Xb(20,"mat-panel-title"),o.Lc(21),o.jc(22,"translate"),o.Wb(),o.Wb(),o.Xb(23,"p"),o.Lc(24," We would like to thank Google for their UX Material design, which brings a new modern design and adaptable to any need. "),o.Xb(25,"a",4),o.Lc(26,"See Google Material Guidelines"),o.Wb(),o.Wb(),o.Wb(),o.Xb(27,"mat-expansion-panel"),o.Xb(28,"mat-expansion-panel-header"),o.Xb(29,"mat-panel-title"),o.Lc(30),o.jc(31,"translate"),o.Wb(),o.Wb(),o.Xb(32,"p"),o.Lc(33,"This mobile report has been developed by "),o.Xb(34,"a",5),o.Lc(35,"AMVARA CONSULTING"),o.Wb(),o.Lc(36," using "),o.Xb(37,"a",6),o.Lc(38,"IBM Cognos Analytics"),o.Wb(),o.Lc(39," and "),o.Xb(40,"a",7),o.Lc(41,"Angular"),o.Wb(),o.Lc(42,"."),o.Sb(43,"br"),o.Lc(44," The data queries were provided by the respective business department itself. "),o.Wb(),o.Wb(),o.Xb(45,"mat-expansion-panel"),o.Xb(46,"mat-expansion-panel-header"),o.Xb(47,"mat-panel-title"),o.Lc(48),o.jc(49,"translate"),o.Wb(),o.Wb(),o.Xb(50,"div",8),o.Xb(51,"ul"),o.Xb(52,"li"),o.Lc(53,"IBM Cognos Analytics 11: "),o.Xb(54,"a",9),o.Lc(55,"Consumer License"),o.Wb(),o.Wb(),o.Xb(56,"li"),o.Lc(57),o.Xb(58,"a",10),o.Lc(59,"MIT License"),o.Wb(),o.Wb(),o.Xb(60,"li"),o.Lc(61),o.Xb(62,"a",11),o.Lc(63,"MIT License"),o.Wb(),o.Wb(),o.Xb(64,"li"),o.Lc(65),o.Xb(66,"a",12),o.Lc(67,"MIT License"),o.Wb(),o.Wb(),o.Xb(68,"li"),o.Lc(69),o.Xb(70,"a",13),o.Lc(71,"MIT License"),o.Wb(),o.Wb(),o.Xb(72,"li"),o.Lc(73),o.Xb(74,"a",14),o.Lc(75,"MIT License"),o.Wb(),o.Wb(),o.Xb(76,"li"),o.Lc(77),o.Xb(78,"a",15),o.Lc(79,"MIT License"),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Xb(80,"mat-expansion-panel"),o.Xb(81,"mat-expansion-panel-header"),o.Xb(82,"mat-panel-title"),o.Lc(83),o.jc(84,"translate"),o.Wb(),o.Wb(),o.Lc(85),o.jc(86,"translate"),o.Xb(87,"span",16),o.Lc(88,"OK"),o.Wb(),o.Xb(89,"span",17),o.Lc(90,"Not running"),o.Wb(),o.Jc(91,W,1,2,"report-info",18),o.jc(92,"async"),o.Jc(93,w,4,0,"div",19),o.jc(94,"async"),o.Wb(),o.Xb(95,"mat-expansion-panel"),o.Xb(96,"mat-expansion-panel-header"),o.Xb(97,"mat-panel-title"),o.Lc(98),o.jc(99,"translate"),o.Wb(),o.Wb(),o.Xb(100,"div",20),o.Xb(101,"ul"),o.Jc(102,F,4,2,"li",21),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Xb(103,"div",22),o.Lc(104),o.Wb()),2&t){let t=null;o.pc("multi",!0),o.Fb(4),o.Nc(" ",o.kc(5,22,"about.config")," "),o.Fb(3),o.Nc(" ",o.kc(8,24,"about.lang"),": "),o.Fb(3),o.pc("ngModel",n.config.config.language),o.Fb(1),o.pc("ngForOf",o.kc(12,26,n.config.config.languageCodes)),o.Fb(3),o.Mc(o.kc(15,28,"about.reload_lang")),o.Fb(7),o.Nc(" ",o.kc(22,30,"about.thanks")," "),o.Fb(9),o.Nc(" ",o.kc(31,32,"about.software")," "),o.Fb(18),o.Nc(" ",o.kc(49,34,"about.licenses")," "),o.Fb(9),o.Nc("Angular ",n.angularVersion,": "),o.Fb(4),o.Nc("HammerJS ",n.hammerVersion,": "),o.Fb(4),o.Nc("MomentJS ",n.momentVersion,": "),o.Fb(4),o.Nc("@ngx-translate ",n.ngx_translateVersion,": "),o.Fb(4),o.Nc("angular-svg-round-progressbar ",n.progressVersion,": "),o.Fb(4),o.Nc("ng-connection-service ",n.connectionVersion,": "),o.Fb(6),o.Nc(" ",o.kc(84,36,"about.technical_information")," "),o.Fb(2),o.Nc(" ",o.kc(86,38,"about.connection"),": "),o.Fb(6),o.pc("ngForOf",o.kc(92,40,n.reportInfos)),o.Fb(2),o.pc("ngIf",null==(t=o.kc(94,42,n._cognos.userCapabilities))?null:t.admin),o.Fb(5),o.Nc(" ",o.kc(99,44,"about.changelog")," "),o.Fb(4),o.pc("ngForOf",n.config.config.changelog),o.Fb(2),o.Nc("Version: ",n.config.config.version,"")}},directives:[u.a,u.c,u.d,u.e,h.b,f.b,_.l,_.o,a.k,x.a,M.a,a.l,k.f,L],pipes:[m.c,a.f,a.b],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:block;padding:30px 20px;box-sizing:border-box;touch-action:pan-y!important;margin:0 auto;max-width:1000px}  .mat-expansion-panel,   .mat-expansion-panel-header{background-color:transparent!important;box-shadow:none!important}  .mat-expansion-indicator:after,   .mat-expansion-panel-header-title{color:#f8b03b}  .mat-expansion-panel-content{color:#fff}body[theme=light]   [_nghost-%COMP%]   a[_ngcontent-%COMP%]{color:#17687f!important;font-weight:700}.software[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style-type:none;line-height:25px}.software[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#28e8ff;position:relative}.software[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:after{width:100%}.software[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:-2px;left:0;right:0;margin:auto;height:2px;transition:width .2s ease-in-out;width:0;background-color:#28e8ff}p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#28e8ff;text-decoration:none}body[theme=light]   [_nghost-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#17687f!important;font-weight:700}p[_ngcontent-%COMP%]{line-height:25px}  .segment-key{color:#f8b03b!important}  .segment-value{color:#28e8ff!important;margin-left:10px!important}body[theme=light]   [_nghost-%COMP%]  .segment-value{color:#17687f!important}.changelog[_ngcontent-%COMP%]{line-height:25px;padding-left:15px}.changelog[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{color:#f8b03b;list-style-type:none}.changelog[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{padding-left:20px}.changelog[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{color:#fff;line-height:30px;list-style-type:none}.changelog[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:before{content:"\u2022";margin-right:10px;color:#fff}  .mat-form-field-appearance-legacy .mat-form-field-infix{padding:0}  .mat-form-field-appearance-legacy .mat-form-field-underline{display:none}  .mat-select-value-text{color:#fff}  .mat-select-arrow{color:#fff!important;opacity:.7}  .mat-select-content{background-color:rgba(41,41,49,.6)}  .mat-option:not(.mat-selected){color:#fff}  .mat-option.mat-selected{color:#f8b03b!important}  .mat-form-field{margin-left:20px}  .reload-translations{background-color:#f8b03b;color:rgba(0,0,0,.95);padding:0 10px!important;line-height:27px!important;margin:10px 0 15px!important}.sw_status[_ngcontent-%COMP%]{margin-left:10px;position:relative}.sw_status[_ngcontent-%COMP%]:before{content:"";display:inline-block;height:9px;width:9px;background-color:#d63232;border-radius:50%;margin-right:10px;position:relative;top:0}.sw_status.enabled[_ngcontent-%COMP%]:before{background-color:#43a047}.version[_ngcontent-%COMP%]{text-align:right;margin:40px 20px 20px 0;font-size:1.1rem;color:hsla(0,0%,100%,.4)}'],changeDetection:0}),t})();var j=e("tyNb"),I=e("FpXt");const V=[{path:"",component:S,data:{level:1}}];let N=(()=>{class t{}return t.\u0275mod=o.Pb({type:t}),t.\u0275inj=o.Ob({factory:function(n){return new(n||t)},imports:[[a.c,_.h,I.a,j.g.forChild(V)]]}),t})()},kiQV:function(t){t.exports=JSON.parse('{"a":{"@angular/animations":"^11.0.2","@angular/cdk":"^11.0.1","@angular/common":"^11.0.2","@angular/compiler":"^11.0.2","@angular/core":"^11.0.2","@angular/forms":"^11.0.2","@angular/http":"^7.2.16","@angular/material":"^11.0.1","@angular/platform-browser":"^11.0.2","@angular/platform-browser-dynamic":"^11.0.2","@angular/pwa":"^0.1100.2","@angular/router":"^11.0.2","@angular/service-worker":"^11.0.2","@ngx-translate/core":"^13.0.0","@ngx-translate/http-loader":"^6.0.0","@ngxs-labs/select-snapshot":"^2.0.1","@ngxs/logger-plugin":"^3.7.1","@ngxs/router-plugin":"^3.7.1","@ngxs/store":"^3.7.1","@swimlane/ngx-charts":"^16.0.0","@types/moment":"^2.13.0","angular-svg-round-progressbar":"^5.0.2","classlist.js":"1.1.20150312","core-js":"^3.7.0","faker":"^5.1.0","hammer-timejs":"^1.1.0","hammerjs":"^2.0.8","madge":"^3.12.0","memo-decorator":"^2.0.1","moment":"^2.29.1","ng-connection-service":"^1.0.4","number-to-locale-string":"^1.2.0","rxjs":"^6.6.3","web-animations-js":"^2.3.2","webpack-bundle-analyzer":"^4.1.0","zone.js":"~0.11.3"}}')}}]);