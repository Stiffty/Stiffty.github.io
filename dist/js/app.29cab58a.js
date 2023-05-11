(function(){"use strict";var e={3847:function(e,t,n){var a=n(5102),r=n(9269),u=n(3201);function l(e,t,n,a,l,o){const i=(0,r.up)("q-btn"),f=(0,r.up)("q-toolbar-title"),c=(0,r.up)("q-toolbar"),d=(0,r.up)("q-header"),s=(0,r.up)("q-item-label"),m=(0,r.up)("q-icon"),w=(0,r.up)("q-item-section"),p=(0,r.up)("q-item"),v=(0,r.up)("q-list"),h=(0,r.up)("q-drawer"),_=(0,r.up)("TreeTest"),b=(0,r.up)("q-page-container"),W=(0,r.up)("q-layout");return(0,r.wg)(),(0,r.j4)(W,{view:"lHh Lpr lFf"},{default:(0,r.w5)((()=>[(0,r.Wm)(d,{elevated:"",class:"glossy"},{default:(0,r.w5)((()=>[(0,r.Wm)(c,null,{default:(0,r.w5)((()=>[(0,r.Wm)(i,{flat:"",dense:"",round:"",onClick:t[0]||(t[0]=e=>a.leftDrawerOpen=!a.leftDrawerOpen),"aria-label":"Menu",icon:"menu"}),(0,r.Wm)(f,null,{default:(0,r.w5)((()=>[(0,r.Uk)(" Quasar App ")])),_:1}),(0,r._)("div",null,"Quasar v"+(0,u.zw)(e.$q.version),1)])),_:1})])),_:1}),(0,r.Wm)(h,{modelValue:a.leftDrawerOpen,"onUpdate:modelValue":t[1]||(t[1]=e=>a.leftDrawerOpen=e),"show-if-above":"",bordered:"",class:"bg-grey-2"},{default:(0,r.w5)((()=>[(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[(0,r.Wm)(s,{header:""},{default:(0,r.w5)((()=>[(0,r.Uk)("Essential Links")])),_:1}),(0,r.Wm)(p,{clickable:"",tag:"a",target:"_blank",href:"https://quasar.dev"},{default:(0,r.w5)((()=>[(0,r.Wm)(w,{avatar:""},{default:(0,r.w5)((()=>[(0,r.Wm)(m,{name:"school"})])),_:1}),(0,r.Wm)(w,null,{default:(0,r.w5)((()=>[(0,r.Wm)(s,null,{default:(0,r.w5)((()=>[(0,r.Uk)("Docs")])),_:1}),(0,r.Wm)(s,{caption:""},{default:(0,r.w5)((()=>[(0,r.Uk)("quasar.dev")])),_:1})])),_:1})])),_:1}),(0,r.Wm)(p,{clickable:"",tag:"a",target:"_blank",href:"https://github.com/quasarframework/"},{default:(0,r.w5)((()=>[(0,r.Wm)(w,{avatar:""},{default:(0,r.w5)((()=>[(0,r.Wm)(m,{name:"code"})])),_:1}),(0,r.Wm)(w,null,{default:(0,r.w5)((()=>[(0,r.Wm)(s,null,{default:(0,r.w5)((()=>[(0,r.Uk)("Github")])),_:1}),(0,r.Wm)(s,{caption:""},{default:(0,r.w5)((()=>[(0,r.Uk)("github.com/quasarframework")])),_:1})])),_:1})])),_:1}),(0,r.Wm)(p,{clickable:"",tag:"a",target:"_blank",href:"https://chat.quasar.dev"},{default:(0,r.w5)((()=>[(0,r.Wm)(w,{avatar:""},{default:(0,r.w5)((()=>[(0,r.Wm)(m,{name:"chat"})])),_:1}),(0,r.Wm)(w,null,{default:(0,r.w5)((()=>[(0,r.Wm)(s,null,{default:(0,r.w5)((()=>[(0,r.Uk)("Discord Chat Channel")])),_:1}),(0,r.Wm)(s,{caption:""},{default:(0,r.w5)((()=>[(0,r.Uk)("chat.quasar.dev")])),_:1})])),_:1})])),_:1}),(0,r.Wm)(p,{clickable:"",tag:"a",target:"_blank",href:"https://forum.quasar.dev"},{default:(0,r.w5)((()=>[(0,r.Wm)(w,{avatar:""},{default:(0,r.w5)((()=>[(0,r.Wm)(m,{name:"forum"})])),_:1}),(0,r.Wm)(w,null,{default:(0,r.w5)((()=>[(0,r.Wm)(s,null,{default:(0,r.w5)((()=>[(0,r.Uk)("Forum")])),_:1}),(0,r.Wm)(s,{caption:""},{default:(0,r.w5)((()=>[(0,r.Uk)("forum.quasar.dev")])),_:1})])),_:1})])),_:1}),(0,r.Wm)(p,{clickable:"",tag:"a",target:"_blank",href:"https://twitter.com/quasarframework"},{default:(0,r.w5)((()=>[(0,r.Wm)(w,{avatar:""},{default:(0,r.w5)((()=>[(0,r.Wm)(m,{name:"rss_feed"})])),_:1}),(0,r.Wm)(w,null,{default:(0,r.w5)((()=>[(0,r.Wm)(s,null,{default:(0,r.w5)((()=>[(0,r.Uk)("Twitter")])),_:1}),(0,r.Wm)(s,{caption:""},{default:(0,r.w5)((()=>[(0,r.Uk)("@quasarframework")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,r.Wm)(b,null,{default:(0,r.w5)((()=>[(0,r.Wm)(_)])),_:1})])),_:1})}var o=n(6237),i=n(5708);const f=(0,r._)("div",{id:"rend"},null,-1),c={name:"TreeTest"};var d=Object.assign(c,{setup(e){function t(){const e=new i.xsS,t=new i.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),n=new i.CP7,a=new i.DvJ(1,1,1),r=new i.vBJ({color:65280}),u=new i.Kj0(a,r);function l(){requestAnimationFrame(l),u.rotation.x+=.01,u.rotation.y+=.01,n.render(e,t)}n.setSize(window.innerWidth,window.innerHeight),document.getElementById("rend").appendChild(n.domElement),e.add(u),t.position.z=5,l()}return(e,n)=>{const a=(0,r.up)("q-btn");return(0,r.wg)(),(0,r.iD)(r.HY,null,[f,(0,r.Wm)(a,{onClick:t,color:"white","text-color":"black",label:"Standard"})],64)}}}),s=n(4306),m=n(1410),w=n.n(m);const p=d;var v=p;w()(d,"components",{QBtn:s.Z});var h={name:"LayoutDefault",components:{TreeTest:v},setup(){return{leftDrawerOpen:(0,o.iH)(!1)}}},_=n(7617),b=n(2446),W=n(7454),k=n(366),g=n(8623),q=n(7644),O=n(2146),y=n(3712),Q=n(5246),Z=n(2278),U=n(4633),T=n(6974);const j=(0,_.Z)(h,[["render",l]]);var D=j;w()(h,"components",{QLayout:b.Z,QHeader:W.Z,QToolbar:k.Z,QBtn:s.Z,QToolbarTitle:g.Z,QDrawer:q.Z,QList:O.Z,QItemLabel:y.Z,QItem:Q.Z,QItemSection:Z.Z,QIcon:U.Z,QPageContainer:T.Z});var C=n(9458),x={config:{},plugins:{}};(0,a.ri)(D).use(C.Z,x).mount("#app")}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var u=t[a]={exports:{}};return e[a].call(u.exports,u,u.exports,n),u.exports}n.m=e,function(){var e=[];n.O=function(t,a,r,u){if(!a){var l=1/0;for(c=0;c<e.length;c++){a=e[c][0],r=e[c][1],u=e[c][2];for(var o=!0,i=0;i<a.length;i++)(!1&u||l>=u)&&Object.keys(n.O).every((function(e){return n.O[e](a[i])}))?a.splice(i--,1):(o=!1,u<l&&(l=u));if(o){e.splice(c--,1);var f=r();void 0!==f&&(t=f)}}return t}u=u||0;for(var c=e.length;c>0&&e[c-1][2]>u;c--)e[c]=e[c-1];e[c]=[a,r,u]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,u,l=a[0],o=a[1],i=a[2],f=0;if(l.some((function(t){return 0!==e[t]}))){for(r in o)n.o(o,r)&&(n.m[r]=o[r]);if(i)var c=i(n)}for(t&&t(a);f<l.length;f++)u=l[f],n.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return n.O(c)},a=self["webpackChunktreejstest"]=self["webpackChunktreejstest"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(3847)}));a=n.O(a)})();
//# sourceMappingURL=app.29cab58a.js.map