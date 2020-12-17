!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{maCF:function(t,e,o){"use strict";o.r(e),o.d(e,"HelpModule",function(){return x});var i,a,c=o("ofXK"),g=o("tyNb"),r=o("r4Kj"),s=o("EnSQ"),l=o("fXoL"),p=["*"],d=((i=function t(){n(this,t)}).\u0275fac=function(n){return new(n||i)},i.\u0275cmp=l.Lb({type:i,selectors:[["help-title"]],ngContentSelectors:p,decls:1,vars:0,template:function(n,t){1&n&&(l.oc(),l.nc(0))},styles:["[_nghost-%COMP%]{display:block;padding:15px 0;box-sizing:border-box;font-size:16px;color:#fff;border-bottom:1px solid #f8b03b;margin-bottom:30px}body[theme=light]   [_nghost-%COMP%]{color:#333}"],changeDetection:0}),i),h=o("G/Qb"),b=["*"],_=((a=function t(){n(this,t)}).\u0275fac=function(n){return new(n||a)},a.\u0275cmp=l.Lb({type:a,selectors:[["contact"]],ngContentSelectors:b,decls:1,vars:0,template:function(n,t){1&n&&(l.oc(),l.nc(0))},styles:["[_nghost-%COMP%]{display:block;margin-bottom:20px}  description,   name,   tel{display:block;line-height:25px}  name{color:#fff;font-weight:700}body[theme=light]   [_nghost-%COMP%]  name{color:#17687f!important;font-weight:700}  tel{color:#f8b03b}"],changeDetection:0}),a),P=o("sYmb");function M(n,t){if(1&n&&(l.Xb(0,"contact"),l.Xb(1,"name"),l.Lc(2),l.Wb(),l.Xb(3,"description"),l.Lc(4),l.Wb(),l.Xb(5,"tel"),l.Lc(6),l.Wb(),l.Wb()),2&n){var e=t.$implicit;l.Fb(2),l.Mc(e.name),l.Fb(2),l.Mc(e.description),l.Fb(2),l.Mc(e.telephone)}}var C,O,m=((C=function t(e,o){n(this,t),this.config=e,this.data=o,this.contacts=[],o.currentLevel=1,this.contacts=e.config.contacts[this.config.config.target]}).\u0275fac=function(n){return new(n||C)(l.Rb(r.a),l.Rb(s.a))},C.\u0275cmp=l.Lb({type:C,selectors:[["help"]],hostBindings:function(n,t){1&n&&l.ec("swiperight",function(n){return t.data.goFrom("help",n)})("swipeleft",function(n){return t.data.goFrom("help",n)})},decls:66,vars:28,consts:[[1,"contact-info"],[1,"category"],[1,"telephones"],["href","/internal/bi/","target","_blank"],[4,"ngFor","ngForOf"],[1,"helpers"],[1,"helper"],[1,"title","empty"],[1,"content"],[1,"hands"],[1,"title"],[1,"portrait_landscape"],[1,"scroll_swipe"],[1,"navigations"],[1,"navigation"],[1,"arrows"],[1,"item"],[1,"icon","arrow-down"],[1,"dropdowns"],[1,"icon","arrow-right"],[1,"text"],[1,"icon","arrow-left"],[1,"go-depth"]],template:function(n,t){1&n&&(l.Xb(0,"help-title"),l.Lc(1),l.jc(2,"translate"),l.Wb(),l.Xb(3,"div",0),l.Xb(4,"div",1),l.Lc(5," iBISS: "),l.Wb(),l.Xb(6,"div",2),l.Xb(7,"a",3),l.Lc(8),l.Wb(),l.Wb(),l.Wb(),l.Xb(9,"div",0),l.Xb(10,"div",1),l.Lc(11),l.Wb(),l.Xb(12,"div",2),l.Jc(13,M,7,3,"contact",4),l.Wb(),l.Wb(),l.Xb(14,"help-title"),l.Lc(15),l.jc(16,"translate"),l.Wb(),l.Xb(17,"p"),l.Lc(18),l.jc(19,"translate"),l.Wb(),l.Sb(20,"app-theme-switcher"),l.Xb(21,"p"),l.Lc(22),l.jc(23,"translate"),l.Wb(),l.Xb(24,"div",5),l.Xb(25,"div",6),l.Sb(26,"div",7),l.Xb(27,"div",8),l.Sb(28,"div",9),l.Wb(),l.Wb(),l.Xb(29,"div",6),l.Xb(30,"div",10),l.Lc(31,"Portrait & Landscape"),l.Wb(),l.Xb(32,"div",8),l.Sb(33,"div",11),l.Wb(),l.Wb(),l.Xb(34,"div",6),l.Xb(35,"div",10),l.Lc(36,"Scroll & Swipe"),l.Wb(),l.Xb(37,"div",8),l.Sb(38,"div",12),l.Wb(),l.Wb(),l.Wb(),l.Xb(39,"div",13),l.Xb(40,"div",14),l.Xb(41,"div",10),l.Lc(42),l.jc(43,"translate"),l.Wb(),l.Xb(44,"div",15),l.Xb(45,"div",16),l.Sb(46,"div",17),l.Wb(),l.Wb(),l.Xb(47,"div",8),l.Sb(48,"div",18),l.Wb(),l.Wb(),l.Xb(49,"div",14),l.Xb(50,"div",10),l.Lc(51),l.jc(52,"translate"),l.Wb(),l.Xb(53,"div",15),l.Xb(54,"div",16),l.Sb(55,"div",19),l.Xb(56,"div",20),l.Lc(57),l.jc(58,"translate"),l.Wb(),l.Wb(),l.Xb(59,"div",16),l.Sb(60,"div",21),l.Xb(61,"div",20),l.Lc(62),l.jc(63,"translate"),l.Wb(),l.Wb(),l.Wb(),l.Xb(64,"div",8),l.Sb(65,"div",22),l.Wb(),l.Wb(),l.Wb()),2&n&&(l.Fb(1),l.Mc(l.kc(2,12,"help.general")),l.Fb(7),l.Nc("Link to ",t.config.config.appTitle," Corporate Analytics Platform"),l.Fb(3),l.Nc(" ",t.config.config.appTitle," Support: "),l.Fb(2),l.pc("ngForOf",t.contacts),l.Fb(2),l.Oc("",t.config.config.appTitle," ",l.kc(16,14,"help.functions"),""),l.Fb(3),l.Mc(l.kc(19,16,"help.lightTheme")),l.Fb(4),l.Mc(l.kc(23,18,"help.device_adapted")),l.Fb(20),l.Mc(l.kc(43,20,"help.year_selector")),l.Fb(9),l.Mc(l.kc(52,22,"help.tree")),l.Fb(6),l.Mc(l.kc(58,24,"help.detail")),l.Fb(5),l.Mc(l.kc(63,26,"help.detail")))},directives:[d,c.k,h.a,_],pipes:[P.c],styles:['[_nghost-%COMP%]{display:block;padding:30px 20px;box-sizing:border-box;max-width:1000px;margin:0 auto;touch-action:pan-y!important}@media (min-width:600px) and (max-width:839.98px) and (orientation:portrait),(min-width:960px) and (max-width:1279.98px) and (orientation:landscape){[_nghost-%COMP%]{padding:30px 60px}}[_nghost-%COMP%]  app-theme-switcher{margin:30px 0}body[theme=light]   [_nghost-%COMP%]   a[_ngcontent-%COMP%]{color:#17687f!important;font-weight:700}.contact-info[_ngcontent-%COMP%]{display:flex}.contact-info[_ngcontent-%COMP%]:nth-child(2){margin-bottom:30px}.contact-info[_ngcontent-%COMP%]:last-child{margin-bottom:10px}.contact-info[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{flex:1 35%;line-height:25px;padding-left:30px;box-sizing:border-box}.contact-info[_ngcontent-%COMP%]   .telephones[_ngcontent-%COMP%]{flex:1 65%;line-height:25px}p[_ngcontent-%COMP%]{line-height:20px;text-align:justify}a[_ngcontent-%COMP%]{color:#28e8ff;position:relative;text-decoration:none}a[_ngcontent-%COMP%]:hover:after{width:100%}a[_ngcontent-%COMP%]:after{content:"";display:block;width:0;height:2px;opacity:.7;transition:width .2s ease-in-out;background-color:#28e8ff;bottom:-5px;left:0;border-radius:3px;right:0;position:absolute;margin:auto}.helpers[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]{flex:1 100%;display:flex;flex-direction:column}@media (min-width:800px){.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]{flex:1 33.333333%;max-width:33.333333%}}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .title.empty[_ngcontent-%COMP%]{flex:0 20px;margin-top:20px}@media (min-width:800px),(min-width:960px) and (max-width:1279.98px) and (orientation:landscape){.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .title.empty[_ngcontent-%COMP%]{flex:0 20px;margin:60px 0 50px}}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]:not(.empty){flex:0 20px;margin:60px 0 50px;display:flex;align-items:center;justify-content:center;font-weight:700}.helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{flex:1;display:flex;justify-content:center;align-items:center}.helpers[_ngcontent-%COMP%]   .portrait_landscape[_ngcontent-%COMP%]{height:140px;background-image:url(assets/img/portrait_landscape.svg)}.helpers[_ngcontent-%COMP%]   .portrait_landscape[_ngcontent-%COMP%], .helpers[_ngcontent-%COMP%]   .scroll_swipe[_ngcontent-%COMP%]{width:250px;background-size:contain;background-repeat:no-repeat}.helpers[_ngcontent-%COMP%]   .scroll_swipe[_ngcontent-%COMP%]{height:135px;background-image:url(assets/img/scroll_swipe.svg)}.helpers[_ngcontent-%COMP%]   .hands[_ngcontent-%COMP%]{width:100%;height:140px;background-repeat:no-repeat;background-size:contain;background-position:50%;background-image:url(assets/img/light/DIP_Helpgra_hands_white-11.png)}@media (min-width:800px){.helpers[_ngcontent-%COMP%]   .hands[_ngcontent-%COMP%]{height:120px}}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .hands[_ngcontent-%COMP%]{background-image:url(assets/img/dark/DIP_Helpgra_hands_black-01.png)}.navigations[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:100px;display:flex;flex-wrap:wrap}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]{flex:1 100%;align-items:center;justify-content:center;display:flex;flex-direction:column}@media (min-width:800px){.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]{flex:0 50%;max-width:50%}}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:16px;font-weight:700}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%], .navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;flex:0 100px;justify-content:center;align-items:center}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]{width:100%}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-around;width:130px}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{height:50px;width:50px;background-size:contain;background-repeat:no-repeat;background-position:50%}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon.arrow-down[_ngcontent-%COMP%]{background-image:url(assets/img/DIP_Helpgra_arrowdown_yellow-05.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon.arrow-right[_ngcontent-%COMP%]{background-image:url(assets/img/DIP_Helpgra_arrowright_yellow-06.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .icon.arrow-left[_ngcontent-%COMP%]{background-image:url(assets/img/DIP_Helpgra_arrowleft_yellow-07.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .dropdowns[_ngcontent-%COMP%]{width:300px;height:450px;background-image:url(assets/img/dark/DIP_Helpgra_selectors_black-09.png);background-size:contain;background-position:50%;background-repeat:no-repeat}body[theme=light]   [_nghost-%COMP%]   .navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .dropdowns[_ngcontent-%COMP%]{background-image:url(assets/img/light/DIP_Helpgra_selectors_white-08.png)}.navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .go-depth[_ngcontent-%COMP%]{width:300px;height:450px;background-image:url(assets/img/dark/DIP_Helpgra_hierarchy_black-04-10.png);background-size:contain;background-position:50%;background-repeat:no-repeat}body[theme=light]   [_nghost-%COMP%]   .navigations[_ngcontent-%COMP%]   .navigation[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .go-depth[_ngcontent-%COMP%]{background-image:url(assets/img/light/DIP_Helpgra_hierarchy_white-04.png)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .portrait_landscape[_ngcontent-%COMP%]{background-image:url(assets/img/dark/DIP_Helpgra_mobile_black-02.png)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .scroll_swipe[_ngcontent-%COMP%]{background-image:url(assets/img/dark/DIP_Helpgra_tablet_black-03.png)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .hand1[_ngcontent-%COMP%]{background-image:url(assets/img/hand1.svg)}body[theme=light]   [_nghost-%COMP%]   .helpers[_ngcontent-%COMP%]   .helper[_ngcontent-%COMP%]   .hand2[_ngcontent-%COMP%]{background-image:url(assets/img/hand2.svg)}'],changeDetection:0}),C),f=o("FpXt"),u=[{path:"",component:m}],x=((O=function t(){n(this,t)}).\u0275mod=l.Pb({type:O}),O.\u0275inj=l.Ob({factory:function(n){return new(n||O)},imports:[[c.c,f.a,g.g.forChild(u)]]}),O)}}])}();