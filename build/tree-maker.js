var treeMaker;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{t.r(e),t.d(e,{default:()=>s});let n,r=1,o=[],i=0,c="5px",d="#000000";function s(t,e){const s=document.getElementById(e.id);s.querySelector("#tree__svg-container")&&(s.innerHTML=""),n=void 0===e.treeParams?{}:e.treeParams,void 0!==e.link_width&&(c=e.link_width),void 0!==e.link_color&&(d=e.link_color),r=1,o=[];const f=document.createElement("div");f.id="tree__svg-container",s.appendChild(f);const u=document.createElementNS("http://www.w3.org/2000/svg","svg");u.id="tree__svg-container__svg",f.appendChild(u);const p=document.createElement("div");p.id="tree__container",s.appendChild(p);const g=document.createElement("div");g.classList="tree__container__step__card",g.id="tree__container__step__card__first",p.appendChild(g);const m=void 0!==n[Object.keys(t)[0]]&&void 0!==n[Object.keys(t)[0]].trad?n[Object.keys(t)[0]].trad:Object.keys(t)[0].trad;g.innerHTML=`<p class="tree__container__step__card__p" id="card_${Object.keys(t)[0]}">${m}</p>`,l(n[Object.keys(t)[0]],Object.keys(t)[0]),a(t[Object.keys(t)[0]],!0,"tree__container__step__card__first"),p.style.width=250*i+"px",_(),document.querySelectorAll(".tree__container__step__card__p").forEach((t=>{t.addEventListener("click",(function(t){"function"==typeof e.card_click&&e.card_click(t.target)}))})),window.onresize=function(){f.setAttribute("height","0"),f.setAttribute("width","0"),_()}}function _(){const t=document.getElementById("tree__svg-container__svg");for(let e=0;o.length>e;e++)p(t,document.getElementById(o[e][0]),document.getElementById(o[e][1]),document.getElementById(o[e][2]))}function a(t,e,s){const _=document.getElementById("tree__svg-container__svg"),f=document.createElement("div");f.classList.add("tree__container__branch",`from_${s}`),document.getElementById(s).after(f);for(const u in t){const p=void 0!==n[u]&&void 0!==n[u].trad?n[u].trad:u;if(document.getElementById(`card_${u}`)||(f.innerHTML+=`<div class="tree__container__step"><div class="tree__container__step__card" id="${u}"><p id="card_${u}" class="tree__container__step__card__p">${p}</p></div></div>`,l(n[u],u)),s&&!e||e){const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.id="path"+r,t.setAttribute("stroke",d),t.setAttribute("fill","none"),t.setAttribute("stroke-width",c),_.appendChild(t),o.push(["path"+r,s||"tree__container__step__card__first",u]),r++}Object.keys(t[u]).length>0?a(t[u],!1,u):i++}}function l(t,e){if(void 0!==t&&void 0!==t.styles){const r=document.getElementById("card_"+e);for(const o in n[e].styles)r.style[o]=t.styles[o]}}function f(t){return t<0?-1:1}function u(t){return t<0?-t:t}function p(t,e,n,r){const o=document.getElementById("tree__svg-container");if(n.offsetTop>r.offsetTop){const t=n;n=r,r=t}const i=o.offsetTop,c=o.offsetLeft;!function(t,e,n,r,o,i){const c=parseFloat(e.getAttribute("stroke-width"));t.getAttribute("height")<i&&t.setAttribute("height",i),t.getAttribute("width")<n+c&&t.setAttribute("width",n+c),t.getAttribute("width")<o+c&&t.setAttribute("width",o+c);const d=.15*(o-n),s=.15*(i-r),_=s<u(d)?s:u(d);let a=0,l=1;n>o&&(a=1,l=0),e.setAttribute("d","M"+n+" "+r+" V"+(r+_)+" A"+_+" "+_+" 0 0 "+a+" "+(n+_*f(d))+" "+(r+2*_)+" H"+(o-_*f(d))+" A"+_+" "+_+" 0 0 "+l+" "+o+" "+(r+3*_)+" V"+i)}(t,e,n.offsetLeft+.5*n.offsetWidth-c,n.offsetTop+n.offsetHeight-i,r.offsetLeft+.5*r.offsetWidth-c,r.offsetTop-i)}})(),treeMaker=e})();