(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{maCF:function(n,t,e){"use strict";e.r(t),e.d(t,"HelpModule",function(){return C});var o=e("ofXK"),i=e("tyNb"),a=e("r4Kj"),c=e("EnSQ"),g=e("fXoL");const r=["*"];let s=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=g.Lb({type:n,selectors:[["help-title"]],ngContentSelectors:r,decls:1,vars:0,template:function(n,t){1&n&&(g.oc(),g.nc(0))},styles:["[_nghost-%COMP%]{display:block;padding:15px 0;box-sizing:border-box;font-size:16px;color:#fff;border-bottom:1px solid #f8b03b;margin-bottom:30px}body[theme=light]   [_nghost-%COMP%]{color:#333}"],changeDetection:0}),n})();var l=e("G/Qb");const p=["*"];let d=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=g.Lb({type:n,selectors:[["contact"]],ngContentSelectors:p,decls:1,vars:0,template:function(n,t){1&n&&(g.oc(),g.nc(0))},styles:["[_nghost-%COMP%]{display:block;margin-bottom:20px}  description,   name,   tel{display:block;line-height:25px}  name{color:#fff;font-weight:700}body[theme=light]   [_nghost-%COMP%]  name{color:#17687f!important;font-weight:700}  tel{color:#f8b03b}"],changeDetection:0}),n})();var b=e("sYmb");function h(n,t){if(1&n&&(g.Xb(0,"contact"),g.Xb(1,"name"),g.Lc(2),g.Wb(),g.Xb(3,"description"),g.Lc(4),g.Wb(),g.Xb(5,"tel"),g.Lc(6),g.Wb(),g.Wb()),2&n){const n=t.$implicit;g.Fb(2),g.Mc(n.name),g.Fb(2),g.Mc(n.description),g.Fb(2),g.Mc(n.telephone)}}let _=(()=>{class n{constructor(n,t){this.config=n,this.data=t,this.contacts=[],t.currentLevel=1,this.contacts=n.config.contacts[this.config.config.target]}}return n.\u0275fac=function(t){return new(t||n)(g.Rb(a.a),g.Rb(c.a))},n.\u0275cmp=g.Lb({type:n,selectors:[["help"]],hostBindings:function(n,t){1&n&&g.ec("swiperight",function(n){return t.data.goFrom("help",n)})("swipeleft",function(n){return t.data.goFrom("help",n)})},decls:66,vars:28,consts:[[1,"contact-info"],[1,"category"],[1,"telephones"],["href","/internal/bi/","target","_blank"],[4,"ngFor","ngForOf"],[1,"helpers"],[1,"helper"],[1,"title","empty"],[1,"content"],[1,"hands"],[1,"title"],[1,"portrait_landscape"],[1,"scroll_swipe"],[1,"navigations"],[1,"navigation"],[1,"arrows"],[1,"item"],[1,"icon","arrow-down"],[1,"dropdowns"],[1,"icon","arrow-right"],[1,"text"],[1,"icon","arrow-left"],[1,"go-depth"]],template:function(n,t){1&n&&(g.Xb(0,"help-title"),g.Lc(1),g.jc(2,"translate"),g.Wb(),g.Xb(3,"div",0),g.Xb(4,"div",1),g.Lc(5," iBISS: "),g.Wb(),g.Xb(6,"div",2),g.Xb(7,"a",3),g.Lc(8),g.Wb(),g.Wb(),g.Wb(),g.Xb(9,"div",0),g.Xb(10,"div",1),g.Lc(11),g.Wb(),g.Xb(12,"div",2),g.Jc(13,h,7,3,"contact",4),g.Wb(),g.Wb(),g.Xb(14,"help-title"),g.Lc(15),g.jc(16,"translate"),g.Wb(),g.Xb(17,"p"),g.Lc(18),g.jc(19,"translate"),g.Wb(),g.Sb(20,"app-theme-switcher"),g.Xb(21,"p"),g.Lc(22),g.jc(23,"translate"),g.Wb(),g.Xb(24,"div",5),g.Xb(25,"div",6),g.Sb(26,"div",7),g.Xb(27,"div",8),g.Sb(28,"div",9),g.Wb(),g.Wb(),g.Xb(29,"div",6),g.Xb(30,"div",10),g.Lc(31,"Portrait & Landscape"),g.Wb(),g.Xb(32,"div",8),g.Sb(33,"div",11),g.Wb(),g.Wb(),g.Xb(34,"div",6),g.Xb(35,"div",10),g.Lc(36,"Scroll & Swipe"),g.Wb(),g.Xb(37,"div",8),g.Sb(38,"div",12),g.Wb(),g.Wb(),g.Wb(),g.Xb(39,"div",13),g.Xb(40,"div",14),g.Xb(41,"div",10),g.Lc(42),g.jc(43,"translate"),g.Wb(),g.Xb(44,"div",15),g.Xb(45,"div",16),g.Sb(46,"div",17),g.Wb(),g.Wb(),g.Xb(47,"div",8),g.Sb(48,"div",18),g.Wb(),g.Wb(),g.Xb(49,"div",14),g.Xb(50,"div",10),g.Lc(51),g.jc(52,"translate"),g.Wb(),g.Xb(53,"div",15),g.Xb(54,"div",16),g.Sb(55,"div",19),g.Xb(56,"div",20),g.Lc(57),g.jc(58,"translate"),g.Wb(),g.Wb(),g.Xb(59,"div",16),g.Sb(60,"div",21),g.Xb(61,"div",20),g.Lc(62),g.jc(63,"translate"),g.Wb(),g.Wb(),g.Wb(),g.Xb(64,"div",8),g.Sb(65,"div",22),g.Wb(),g.Wb(),g.Wb()),2&n&&(g.Fb(1),g.Mc(g.kc(2,12,"help.general")),g.Fb(7),g.Nc("Link to ",t.config.config.appTitle," Corporate Analytics Platform"),g.Fb(3),g.Nc(" ",t.config.config.appTitle," Support: "),g.Fb(2),g.pc("ngForOf",t.contacts),g.Fb(2),g.Oc("",t.config.config.appTitle," ",g.kc(16,14,"help.functions"),""),g.Fb(3),g.Mc(g.kc(19,16,"help.lightTheme")),g.Fb(4),g.Mc(g.kc(23,18,"help.device_adapted")),g.Fb(20),g.Mc(g.kc(43,20,"help.year_selector")),g.Fb(9),g.Mc(g.kc(52,22,"help.tree")),g.Fb(6),g.Mc(g.kc(58,24,"help.detail")),g.Fb(5),g.Mc(g.kc(63,26,"help.detail")))},directives:[s,o.k,l.a,d],pipes:[b.c],styles:['[_nghost-%COMP%]{display:block;padding:30px 20px;box-sizing:border-box;max-width:1000px;margin:0 auto;touch-action:pan-y!important}@media (min-width:600px) and (max-width:839.98px) and (orientation:portrait),(min-width:960px) and (max-width:1279.98px) and (orientation:landscape){[_nghost-%COMP%]{padding:30px 60px}}[_nghost-%COMP%]  app-theme-switcher{margin:30px 0}body[theme=light]   [_nghost-%COMP%]   a[_ngcontent-%COMP%]{color:#17687f!important;font-weight:700}.contact-info[_ngcontent-%COMP%]{display:flex}.contact-info[_ngcontent-%COMP%]:nth-child(2){margin-bottom:30px}.contact-info[_ngcontent-%COMP%]:last-child{margin-bottom:10px}.contact-info[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{flex:1 35%;line-height:25px;padding-left:30px;box-sizing:border-box}.contact-info[_ngcontent-%COMP%]   .telephones[_ngcontent-%COMP%]{flex:1 65%;line-height:25px}p[_ngcontent-%COMP%]{line-height:20px;text-align:justify}a[_ngcontent-%COMP%]{color:#28e8ff;position:relative;text-decoration:none}a[_ngcontent-%COMP%]:hover:after{width:100%}a[_ngcontent-%COMP%]:after{content:"";display:block;width:0;height:2px;opacity:.7;transition:width .2s ease-in-out;background-color:#28e8ff;bottom:-5px;left:0;border-radius:3px;right:0;position:absolute;margin:auto}.helpers[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]{flex:1 100%;display:flex;flex-direction:column}@media (min-width:800px){.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]{flex:1 33.333333%;max-width:33.333333%}}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .title.empty[_ngcontent-%COMP%]{flex:0 20px;margin-top:20px}@media (min-width:800px),(min-width:960px) and (max-width:1279.98px) and (orientation:landscape){.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .title.empty[_ngcontent-%COMP%]{flex:0 20px;margin:60px 0 50px}}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]:not(.empty){flex:0 20px;margin:60px 0 50px;display:flex;align-items:center;justify-content:center;font-weight:700}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{flex:1;display:flex;justify-content:center;align-items:center}.helpers[_ngcontent-%COMP%]   .portrait_landscape[_ngcontent-%COMP%]{height:140px;background-image:url(assets/img/portrait_landscape.svg)}.helpers[_ngcontent-%COMP%]   .portrait_landscape[_ngcontent-%COMP%], .helpers[_ngcontent-%COMP%]   .scroll_swipe[_ngcontent-%COMP%]{width:250px;background-size:contain;background-repeat:no-repeat}.helpers[_ngcontent-%COMP%]   .scroll_swipe[_ngcontent-%COMP%]{height:135px;background-image:url(assets/img/scroll_swipe.svg)}.helpers[_ngcontent-%COMP%]   .hands[_ngcontent-%COMP%]{width:100%;height:140px;background-repeat:no-repeat;background-size:contain;background-position:50%;background-image:url(assets/img/light/DIP_Helpgra_hands_white-11.png)}@media (min-width:800px){.helpers[_ngcontent-%COMP%]   .hands[_ngcontent-%COMP%]{height:120px}}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .hands[_ngcontent-%COMP%]{background-image:url(assets/img/dark/DIP_Helpgra_hands_black-01.png)}.navigations[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:100px;display:flex;flex-wrap:wrap}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]{flex:1 100%;align-items:center;justify-content:center;display:flex;flex-direction:column}@media (min-width:800px){.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]{flex:0 50%;max-width:50%}}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:16px;font-weight:700}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%], .navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;flex:0 100px;justify-content:center;align-items:center}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]{width:100%}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-around;width:130px}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{height:50px;width:50px;background-size:contain;background-repeat:no-repeat;background-position:50%}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon.arrow-down[_ngcontent-%COMP%]{background-image:url(assets/img/DIP_Helpgra_arrowdown_yellow-05.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon.arrow-right[_ngcontent-%COMP%]{background-image:url(assets/img/DIP_Helpgra_arrowright_yellow-06.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon.arrow-left[_ngcontent-%COMP%]{background-image:url(assets/img/DIP_Helpgra_arrowleft_yellow-07.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .dropdowns[_ngcontent-%COMP%]{width:300px;height:450px;background-image:url(assets/img/dark/DIP_Helpgra_selectors_black-09.png);background-size:contain;background-position:50%;background-repeat:no-repeat}body[theme=light]   [_nghost-%COMP%]   .navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .dropdowns[_ngcontent-%COMP%]{background-image:url(assets/img/light/DIP_Helpgra_selectors_white-08.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .go-depth[_ngcontent-%COMP%]{width:300px;height:450px;background-image:url(assets/img/dark/DIP_Helpgra_hierarchy_black-04-10.png);background-size:contain;background-position:50%;background-repeat:no-repeat}body[theme=light]   [_nghost-%COMP%]   .navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .go-depth[_ngcontent-%COMP%]{background-image:url(assets/img/light/DIP_Helpgra_hierarchy_white-04.png)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .portrait_landscape[_ngcontent-%COMP%]{background-image:url(assets/img/dark/DIP_Helpgra_mobile_black-02.png)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .scroll_swipe[_ngcontent-%COMP%]{background-image:url(assets/img/dark/DIP_Helpgra_tablet_black-03.png)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .hand1[_ngcontent-%COMP%]{background-image:url(assets/img/hand1.svg)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .hand2[_ngcontent-%COMP%]{background-image:url(assets/img/hand2.svg)}'],changeDetection:0}),n})();var P=e("FpXt");const M=[{path:"",component:_}];let C=(()=>{class n{}return n.\u0275mod=g.Pb({type:n}),n.\u0275inj=g.Ob({factory:function(t){return new(t||n)},imports:[[o.c,P.a,i.g.forChild(M)]]}),n})()}}]);