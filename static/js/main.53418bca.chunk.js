(this.webpackJsonpblog=this.webpackJsonpblog||[]).push([[0],{15:function(o,s,e){},16:function(o,s,e){},19:function(o,s,e){"use strict";e.r(s);var t=e(0),p=e(1),l=e.n(p),r=e(8),n=e.n(r),i=(e(15),e(7)),a=e(9),c=e(3),d=(e(16),e(21)),f=e(6),u=e.n(f),b=[];!function(){for(var o=0;o<200;o++)b.push("white")}();var h=[{pos:200,fill:"blue"},{pos:201,fill:"blue"},{pos:202,fill:"blue"},{pos:203,fill:"blue"},{pos:204,fill:"blue"},{pos:205,fill:"blue"},{pos:206,fill:"blue"},{pos:207,fill:"blue"},{pos:208,fill:"blue"},{pos:209,fill:"blue"}],j=function(o){var s=[].concat(b);return[].concat(h,Object(c.a)(o.slice(0,4))).forEach((function(o){s[o.pos]=o.fill})),s},O=[[{pos:4,fill:"red"},{pos:5,fill:"red"},{pos:14,fill:"red"},{pos:15,fill:"red"},{rotated:"0",name:"O",pos:500,fill:"white"}],[{pos:4,fill:"red"},{pos:14,fill:"red"},{pos:24,fill:"red"},{pos:34,fill:"red"},{rotated:"0",name:"I",pos:500,fill:"white"}],[{pos:4,fill:"red"},{pos:14,fill:"red"},{pos:23,fill:"red"},{pos:24,fill:"red"},{rotated:"0",name:"J",pos:500,fill:"white"}],[{pos:5,fill:"red"},{pos:14,fill:"red"},{pos:15,fill:"red"},{pos:24,fill:"red"},{rotated:"0",name:"S",pos:500,fill:"white"}],[{pos:4,fill:"red"},{pos:14,fill:"red"},{pos:15,fill:"red"},{pos:25,fill:"red"},{rotated:"0",name:"Z",pos:500,fill:"white"}],[{pos:4,fill:"red"},{pos:14,fill:"red"},{pos:15,fill:"red"},{pos:24,fill:"red"},{rotated:"0",name:"T",pos:500,fill:"white"}],[{pos:4,fill:"red"},{pos:14,fill:"red"},{pos:24,fill:"red"},{pos:25,fill:"red"},{rotated:"0",name:"L",pos:500,fill:"white"}]],v=Object(c.a)(O[u.a.random(6)]),m=function(){var o=Object(p.useState)(b),s=Object(a.a)(o,2),e=s[0],l=s[1];Object(p.useEffect)((function(){r()}),[]);var r=function(){console.log(h),f(),v=[],Object(c.a)(O[u.a.random(6)]).forEach((function(o){v.push(Object(i.a)({},o))})),l(j(v))},n=function(o){var s=!1;return o.forEach((function(o){s||(s=h.some((function(s){return s.pos===o.pos+10})))})),s},f=function(){h.sort((function(o,s){return o.pos>s.pos?1:-1}))};return Object(t.jsxs)("div",{className:"field",children:[Object(t.jsx)("h1",{children:"tetris"}),Object(t.jsx)("button",{type:"button",onClick:function(){return n(o=v)?(Object(c.a)(o.slice(0,4)).forEach((function(o){o.fill="blue",h.push(Object(i.a)({},o))})),o.splice(0,6)):o.forEach((function(o){o.pos+=10})),void l(j(o));var o},children:"MOVE DOWN"}),Object(t.jsx)("button",{type:"button",onClick:function(){return(o=v).forEach((function(o){o.pos-=1})),void l(j(o));var o},children:"MOVE Left"}),Object(t.jsx)("button",{type:"button",onClick:function(){return(o=v).forEach((function(o){o.pos+=1})),void l(j(o));var o},children:"MOVE Right"}),Object(t.jsx)("button",{disabled:!v,type:"button",onClick:function(){return function(o){if(0!==o.length){var s=o[4].name,e=o[4].rotated;switch(s){case"I":"0"===e?(o[0].pos+=19,o[1].pos+=10,o[2].pos+=1,o[3].pos-=8,o[4].rotated="90"):"90"===e?(o[0].pos-=19,o[1].pos-=10,o[2].pos-=1,o[3].pos+=8,o[4].rotated="180"):"180"===e?(o[0].pos+=19,o[1].pos+=10,o[2].pos+=1,o[3].pos-=8,o[4].rotated="270"):(o[0].pos-=19,o[1].pos-=10,o[2].pos-=1,o[3].pos+=8,o[4].rotated="0");break;case"J":"0"===e?(o[0].pos+=-2,o[1].pos+=-2,o[2].pos+=-10,o[3].pos+=-10,o[4].rotated="90"):"90"===e?(o[0].pos+=1,o[1].pos+=-8,o[2].pos+=0,o[3].pos+=9,o[4].rotated="180"):"180"===e?(o[0].pos+=-1,o[1].pos+=-1,o[2].pos+=-9,o[3].pos+=-9,o[4].rotated="270"):(o[0].pos+=2,o[1].pos+=11,o[2].pos+=19,o[3].pos+=10,o[4].rotated="0");break;case"L":"0"===e?(o[0].pos+=-1,o[1].pos+=-10,o[2].pos+=-19,o[3].pos+=-12,o[4].rotated="90"):"90"===e?(o[0].pos+=1,o[1].pos+=1,o[2].pos+=10,o[3].pos+=12,o[4].rotated="180"):"180"===e?(o[0].pos+=1,o[1].pos+=8,o[2].pos+=-1,o[3].pos+=-10,o[4].rotated="270"):(o[0].pos+=-1,o[1].pos+=1,o[2].pos+=10,o[3].pos+=10,o[4].rotated="0");break;case"Z":console.log("Z"),"0"===e?(o[0].pos+=0,o[1].pos+=-9,o[2].pos+=-2,o[3].pos+=-11,o[4].rotated="90"):"90"===e?(o[0].pos+=0,o[1].pos+=9,o[2].pos+=2,o[3].pos+=11,o[4].rotated="180"):"180"===e?(o[0].pos+=0,o[1].pos+=-9,o[2].pos+=-2,o[3].pos+=-11,o[4].rotated="270"):(o[0].pos+=0,o[1].pos+=9,o[2].pos+=2,o[3].pos+=11,o[4].rotated="0");break;case"S":console.log("S"),"0"===e?(o[0].pos+=-1,o[1].pos+=-9,o[2].pos+=0,o[3].pos+=-8,o[4].rotated="90"):"90"===e?(o[0].pos+=1,o[1].pos+=9,o[2].pos+=0,o[3].pos+=8,o[4].rotated="180"):"180"===e?(o[0].pos+=-1,o[1].pos+=-9,o[2].pos+=0,o[3].pos+=-8,o[4].rotated="270"):(o[0].pos+=1,o[1].pos+=9,o[2].pos+=0,o[3].pos+=8,o[4].rotated="0");break;case"T":"0"===e?(o[0].pos+=-1,o[1].pos+=-10,o[2].pos+=-10,o[3].pos+=-10,o[4].rotated="90"):"90"===e?(o[0].pos+=1,o[1].pos+=9,o[2].pos+=9,o[3].pos+=10,o[4].rotated="180"):"180"===e?(o[0].pos+=0,o[1].pos+=0,o[2].pos+=0,o[3].pos+=-9,o[4].rotated="270"):(o[0].pos+=0,o[1].pos+=1,o[2].pos+=1,o[3].pos+=9,o[4].rotated="0");break;default:console.log("defaults")}l(j(o))}}(v)},children:"Rotate"}),Object(t.jsx)("button",{type:"button",onClick:function(){return r()},children:"New Figure"}),Object(t.jsx)("div",{className:"row",children:Object(t.jsx)("div",{className:"col-xs-12 griden",children:e.map((function(o,s){return s<200&&Object(t.jsx)("div",{className:"cell",style:{backgroundColor:o}},Object(d.a)())}))})})]})},g=function(o){o&&o instanceof Function&&e.e(3).then(e.bind(null,22)).then((function(s){var e=s.getCLS,t=s.getFID,p=s.getFCP,l=s.getLCP,r=s.getTTFB;e(o),t(o),p(o),l(o),r(o)}))};n.a.render(Object(t.jsx)(l.a.StrictMode,{children:Object(t.jsx)(m,{})}),document.getElementById("root")),g()}},[[19,1,2]]]);
//# sourceMappingURL=main.53418bca.chunk.js.map