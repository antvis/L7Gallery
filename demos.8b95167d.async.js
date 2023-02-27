"use strict";(self.webpackChunkdistrict_data=self.webpackChunkdistrict_data||[]).push([[433],{15482:function(le,K,e){e.d(K,{H7:function(){return E},O6:function(){return P},Y2:function(){return V}});var U=e(78445),C=e(67473),Q=e.n(C),s=e(84893),X=e(12816),T=e.n(X),q=e(12450);function V(c){var v=(0,U.Z)(c).bbox||[-180,-90,180,90],x=1e3,Z=800,f=Q()({mapExtent:{left:v[0],bottom:v[1],right:v[2],top:v[3]},precision:8,attributes:["properties.adcode","properties.name",{property:"stroke",value:"blue",type:"static"},{property:"fill",value:"#aaa",type:"static"}],viewportSize:{width:x,height:Z},fitToViewBox:!0,outputFormat:"svg"}),F=f.convert(c).join();return'<svg width="'.concat(x,'" height="').concat(Z,'" xmlns="http://www.w3.org/2000/svg"> ').concat(F,"</svg>")}function E(c,v){console.log(c);var x={folder:v,types:{point:"".concat(v,"points"),polygon:"".concat(v,"polygons"),line:"".concat(v,"lines")}};s.download(c,x)}function S(c){return JSON.stringify(q.MM({data:c}))}function _(c){return JSON.stringify(c)}function J(c){var v=c.features.map(function(f){return f.properties});if(v.length!==0){var x=Object.keys(v[0]||{}),Z=[x.join(",")];return v.forEach(function(f){var F=x.map(function(ne){return f[ne]});Z.push(F.join(","))}),Z.join(`
`)}}function ee(c){var v=c.features.map(function(x){return x.properties});return JSON.stringify(v)}function $(c){var v=T()(c);return v}function P(c,v,x){var Z=x==="SVG"?V(v):x==="TopoJSON"?S(v):x==="GeoJSON"?_(v):x==="CSV"?J(v):x==="JSON"?ee(v):x==="KML"?$(v):"",f=document.createElement("a");f.download="".concat(c,".").concat(x.toLowerCase()),f.href="data:text/json;charset=utf-8,".concat(encodeURIComponent(Z)),f.target="_blank",f.rel="noreferrer",f.click()}},20668:function(le,K,e){e.r(K),e.d(K,{default:function(){return W}});var U=e(97857),C=e.n(U),Q=e(5574),s=e.n(Q),X=e(38244),T=e(76364),q=e(23672),V=e(18662),E=e(67294),S=e(15482),_=e(71721),J=e(74951),ee=e(3614),$=e.n(ee),P=e(85893),c=[{title:"name",dataIndex:"name",sorter:!0},{title:"adcode",dataIndex:"adcode"},{title:"city_type",dataIndex:"city_type"},{title:"city_adcode",dataIndex:"city_adcode"},{title:"name_en",dataIndex:"name_en"},{title:"name_var",dataIndex:"name_var"},{title:"province_adcode",dataIndex:"province_adcode"},{title:"province",dataIndex:"province"},{title:"province_type",dataIndex:"province_type"}],v=function(j){var B=(0,E.useState)(),w=s()(B,2),R=w[0],M=w[1],L=(0,E.useState)(!1),r=s()(L,2),u=r[0],n=r[1],a=function(){n(!0),fetch("https://unpkg.com/xingzhengqu@2023/data/city.pbf").then(function(o){return o.arrayBuffer()}).then(function(o){var p=J.decode(new($())(o));j==null||j.onDataLoad({city:p});var m=p.features.map(function(h){return h.properties});M(m),n(!1)})};return(0,E.useEffect)(function(){a()},[]),(0,P.jsx)(_.Z,{columns:c,rowKey:function(o){return o.adcode},dataSource:R,loading:u,size:"small",scroll:{x:1e3,y:500},pagination:{pageSize:20,simple:!0}})},x=v,Z=[{title:"name",dataIndex:"name",sorter:!0},{title:"adcode",dataIndex:"adcode"},{title:"county",dataIndex:"county"},{title:"county_type",dataIndex:"county_type"},{title:"city_type",dataIndex:"city_type"},{title:"county_adcode",dataIndex:"county_adcode"},{title:"city_adcode",dataIndex:"city_adcode"},{title:"name_en",dataIndex:"name_en"},{title:"name_var",dataIndex:"name_var"},{title:"province_adcode",dataIndex:"province_adcode"},{title:"province",dataIndex:"province"},{title:"province_type",dataIndex:"province_type"}],f=function(j){var B=(0,E.useState)(),w=s()(B,2),R=w[0],M=w[1],L=(0,E.useState)(!1),r=s()(L,2),u=r[0],n=r[1],a=function(){n(!0),fetch("https://unpkg.com/xingzhengqu@2023/data/county.pbf").then(function(o){return o.arrayBuffer()}).then(function(o){var p=J.decode(new($())(o));j==null||j.onDataLoad({county:p});var m=p.features.map(function(h){return h.properties});M(m),n(!1)})};return(0,E.useEffect)(function(){a()},[]),(0,P.jsx)(_.Z,{columns:Z,rowKey:function(o){return o.adcode},dataSource:R,loading:u,size:"small",scroll:{x:1e3,y:500},pagination:{pageSize:50,simple:!0}})},F=f,ne=[{title:"name",dataIndex:"name",sorter:!0,width:"20%"},{title:"name_en",dataIndex:"name_en",width:"20%"},{title:"name_var",dataIndex:"name_var"},{title:"adcode",dataIndex:"adcode"},{title:"province_adcode",dataIndex:"province_adcode"}],re=function(j){var B=(0,E.useState)(),w=s()(B,2),R=w[0],M=w[1],L=(0,E.useState)(!1),r=s()(L,2),u=r[0],n=r[1],a=function(){n(!0),fetch("https://unpkg.com/xingzhengqu@2023/data/province.pbf").then(function(o){return o.arrayBuffer()}).then(function(o){var p=J.decode(new($())(o));j==null||j.onDataLoad({province:p});var m=p.features.map(function(h){return h.properties});M(m),n(!1)})};return(0,E.useEffect)(function(){a()},[]),(0,P.jsx)(_.Z,{columns:ne,rowKey:function(o){return o.adcode},dataSource:R,loading:u,size:"small",pagination:{pageSize:20},scroll:{x:1e3,y:500}})},ue=re,te=function(){var j=(0,E.useState)("province"),B=s()(j,2),w=B[0],R=B[1],M=(0,E.useState)({}),L=s()(M,2),r=L[0],u=L[1],n=function(m){R(m)},a=function(m){u(C()(C()({},r),m))},i=[{key:"province",label:"\u7701\u7EA7",children:(0,P.jsx)(ue,{onDataLoad:a})},{key:"city",label:"\u5E02\u7EA7",children:(0,P.jsx)(x,{onDataLoad:a})},{key:"county",label:"\u53BF\u7EA7",children:(0,P.jsx)(F,{onDataLoad:a})}],o=[{key:"csv",label:"CSV \u683C\u5F0F"},{key:"json",label:"JSON \u683C\u5F0F"}];return(0,P.jsx)(T.Z,{tabBarExtraContent:{right:(0,P.jsx)(q.Z,{menu:{items:o,onClick:function(m){var h=m.key;console.log(w,r),(0,S.O6)(w,r[w],h)}},placement:"bottom",children:(0,P.jsx)(V.ZP,{type:"primary",shape:"round",icon:(0,P.jsx)(X.Z,{}),size:"middle",children:"\u5BFC\u51FA\u6570\u636E"})})},defaultActiveKey:"1",items:i,size:"large",style:{height:"650px"},onChange:n})},W=te},98504:function(le,K,e){e.r(K),e.d(K,{default:function(){return ae}});var U=e(19632),C=e.n(U),Q=e(15009),s=e.n(Q),X=e(99289),T=e.n(X),q=e(9783),V=e.n(q),E=e(97857),S=e.n(E),_=e(5574),J=e.n(_),ee=e(38244),$=e(58093),P=e(99290),c=e(98163),v=e(247),x=e(75081),Z=e(25968),f=e(6226),F=e(33394),ne=e(96074),re=e(27511),ue=e(72269),te=e(33573),W=e(18662),oe=e(79995),j=e(67294),B=e(15482),w={autoFit:!0,fillColor:"#377eb8",opacity:.3,strokeColor:"blue",lineWidth:.5,state:{active:{strokeColor:"green",lineWidth:1.5,lineOpacity:.8},select:{strokeColor:"red",lineWidth:1.5,lineOpacity:.8}}},R={mapType:"Gaode",mapOptions:{style:"light",center:[120.210792,30.246026],zoom:3,doubleClickZoom:!1}},M={country:"province",province:"city",city:"district"},L={district:"city",city:"province",province:"country",country:"",jiuduanxian:""},r=function(z){var Y=document.createElement("input");Y.value=z,document.body.appendChild(Y),Y.select(),document.execCommand("Copy"),Y.style.display="none",message.success("\u590D\u5236\u6210\u529F")},u=function(){return[{layer:"myChoroplethLayer",fields:[{field:"name",formatField:function(){return"\u540D\u79F0"}},{field:"adcode",formatField:"\u884C\u653F\u7F16\u53F7"}]}]},n=[{value:"DataVSource",label:"dataV\u6570\u636E\u6E90"},{value:"RDBSource",label:"\u6570\u636E\u6E90"}],a=[{key:"GeoJSON",value:"GeoJSON",label:"GeoJSON"},{key:"TopoJSON",value:"TopoJSON",label:"TopoJSON"},{key:"Shapefiles",value:"Shapefiles",label:"Shapefiles"},{key:"JSON",value:"JSON",label:"JSON"},{key:"CSV",value:"CSV",label:"CSV"},{key:"KML",value:"KML",label:"KML"}],i={DataVSource:[{value:"areas_v3",label:"areas_v3"},{value:"areas_v2",label:"areas_v2"}],RDBSource:[{value:"2023",label:"2023"},{value:"2022",label:"2022"}]},o=[{value:"low",label:"\u4F4E"},{value:"middle",label:"\u4E2D"},{value:"high",label:"\u9AD8"}],p={sourceType:"RDBSource",sourceVersion:"2023",currentLevel:"country",currentName:"\u4E2D\u56FD",currentCode:1e5,hasSubChildren:!0,childrenLevel:"province",datatype:"GeoJSON"},m=function(z){switch(z){case"country":return"country";case"province":return"country";case"city":return"province";case"county":return"city";default:return}},h=function(z){switch(z){case"country":return"province";case"province":return"city";case"city":return"county";case"county":return"county";default:return}},b=function(z){switch(console.log(z),z){case"country":return["province","city","county"];case"province":return["city","county"];case"city":return["county"];default:return[]}},t=e(85893),ae=function(){var H,z,Y,ve,Ce=(0,j.useState)({data:{type:"FeatureCollection",features:[]},parser:{type:"geojson"}}),me=J()(Ce,2),je=me[0],fe=me[1],ie="middle",Le=(0,j.useState)(p),ge=J()(Le,2),y=ge[0],pe=ge[1],Oe=(0,j.useState)([{currentLevel:"country",currentName:"\u4E2D\u56FD",currentCode:1e5}]),De=J()(Oe,2),he=De[0],Se=De[1],ye=(0,j.useMemo)(function(){return b(y.currentLevel)},[y.currentLevel]),se=function(D,d){pe(S()(S()({},y),{},V()({},D,d)))},Ee=(0,j.useState)(),xe=J()(Ee,2),A=xe[0],Ze=xe[1],ce=function(){var N=T()(s()().mark(function D(){var d,g,O,l,G,I;return s()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:if(d=y.currentLevel,g=y.hasSubChildren,O=y.childrenLevel,l=y.currentCode,g){k.next=9;break}return I=m(d),console.log(I,d,l),k.next=6,A==null?void 0:A.getChildrenData({parentLevel:d,parentAdcode:l,childrenLevel:d});case 6:G=k.sent,k.next=12;break;case 9:return k.next=11,A==null?void 0:A.getChildrenData({parentLevel:d,parentAdcode:l,childrenLevel:O});case 11:G=k.sent;case 12:return k.abrupt("return",G);case 13:case"end":return k.stop()}},D)}));return function(){return N.apply(this,arguments)}}(),Ae=function(){var N=T()(s()().mark(function D(){var d,g,O;return s()().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return d=y.datatype,g=y.currentName,G.next=3,ce();case 3:O=G.sent,d==="Shapefiles"?(0,B.H7)(O,g):(0,B.O6)(g,O,d);case 5:case"end":return G.stop()}},D)}));return function(){return N.apply(this,arguments)}}(),Ie=function(){var N=T()(s()().mark(function D(){var d,g;return s()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return d=y.currentName,l.next=3,ce();case 3:return g=l.sent,l.abrupt("return",(0,B.O6)(d,g,"SVG"));case 5:case"end":return l.stop()}},D)}));return function(){return N.apply(this,arguments)}}(),Te=function(){var N=T()(s()().mark(function D(){var d,g;return s()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,ce();case 2:if(d=l.sent,g=y.datatype,g!=="Shapefiles"){l.next=7;break}return v.ZP.warning("\u6682\u4E0D\u652F\u6301\u590D\u5236Shapefiles\u6570\u636E"),l.abrupt("return");case 7:navigator.clipboard.writeText(JSON.stringify(d)),v.ZP.success("\u590D\u5236\u6210\u529F");case 9:case"end":return l.stop()}},D)}));return function(){return N.apply(this,arguments)}}(),be=function(){var N=T()(s()().mark(function D(){var d,g;return s()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,ce();case 2:return d=l.sent,l.next=5,(0,B.Y2)(d);case 5:g=l.sent,navigator.clipboard.writeText(g),v.ZP.success("\u590D\u5236\u6210\u529F");case 8:case"end":return l.stop()}},D)}));return function(){return N.apply(this,arguments)}}();(0,j.useEffect)(function(){var N=y.sourceType,D=y.sourceVersion,d=new oe._q[N]({version:D});Ze(d),d.getData({level:"province",code:1e5}).then(function(g){fe(function(O){return S()(S()({},O),{},{data:g})})})},[y.sourceType,y.sourceVersion]);var Ne=function(){var N=T()(s()().mark(function D(d){var g,O,l;return s()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:if(g=h(y.currentLevel),g!=="county"){I.next=3;break}return I.abrupt("return");case 3:return O={currentLevel:g,currentName:d.feature.properties.name,currentCode:d.feature.properties.adcode},Se([].concat(C()(he),[O])),pe(S()(S()({},y),O)),I.next=8,A==null?void 0:A.getChildrenData({parentLevel:O.currentLevel,parentAdcode:O.currentCode,childrenLevel:h(g)});case 8:l=I.sent,fe(function(de){return S()(S()({},de),{},{data:l})});case 10:case"end":return I.stop()}},D)}));return function(d){return N.apply(this,arguments)}}(),Pe=function(){var N=T()(s()().mark(function D(){var d,g,O,l;return s()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:if(d=he.slice(0,he.length-1),g=d[d.length-1],O=y.currentLevel,O!=="country"){I.next=5;break}return I.abrupt("return");case 5:return pe(S()(S()({},y),g)),Se(d),I.next=9,A==null?void 0:A.getChildrenData({parentLevel:g.currentLevel,parentAdcode:g.currentCode,childrenLevel:O});case 9:l=I.sent,fe(function(de){return S()(S()({},de),{},{data:l})});case 11:case"end":return I.stop()}},D)}));return function(){return N.apply(this,arguments)}}(),Be=(0,j.useMemo)(function(){return u()},[y.sourceType,y.currentLevel]);return(0,t.jsx)(x.Z,{spinning:!1,children:(0,t.jsxs)("div",{style:{display:"flex"},children:[(0,t.jsxs)(c.$2,S()(S()({},R),{},{style:{height:"calc(100vh - 180px)",width:"calc(100% - 300px)"},children:[(0,t.jsx)(c.Co,S()(S()({},w),{},{source:je,onDblClick:Ne,onUndblclick:Pe,id:"myChoroplethLayer"})),(0,t.jsx)(c.Kh,{closeButton:!1,closeOnClick:!1,anchor:"bottom-left",trigger:"hover",items:Be}),(0,t.jsx)(c.w3,{position:"bottomright"})]})),(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsxs)(Z.Z,{className:"row",children:[(0,t.jsx)(f.Z,{span:4,className:"label",children:"\u6570\u636E\u6E90:"}),(0,t.jsx)(f.Z,{span:10,children:(0,t.jsx)(F.Z,{size:"small",value:y.sourceType,style:{width:"100%"},onChange:se.bind(null,"sourceType"),options:n})}),(0,t.jsx)(f.Z,{span:4,className:"label",children:"\u7248\u672C\uFF1A"}),(0,t.jsx)(f.Z,{span:6,children:(0,t.jsx)(F.Z,{value:y.sourceVersion,size:"small",onChange:se.bind(null,"sourceVersion"),options:i[y.sourceType]})})]}),(0,t.jsx)(ne.Z,{style:{margin:"8px 0"}}),(0,t.jsxs)(re.Z,{title:"\u5F53\u524D\u5730\u533A",children:[(0,t.jsx)(re.Z.Item,{style:{width:"160px"},label:"\u540D\u79F0",children:y.currentName}),(0,t.jsx)(re.Z.Item,{label:"adcode",children:y.currentCode})]}),(0,t.jsxs)(Z.Z,{className:"row",children:[(0,t.jsx)(f.Z,{span:12,className:"label",children:"\u5305\u542B\u5B50\u533A\u57DF:"}),(0,t.jsx)(f.Z,{span:12,style:{textAlign:"right"},children:(0,t.jsx)(ue.Z,{style:{width:"32px"},checked:y.hasSubChildren,onChange:se.bind(null,"hasSubChildren")})})]}),y.hasSubChildren&&(0,t.jsxs)(Z.Z,{className:"row",children:[(0,t.jsx)(f.Z,{span:10,className:"label",children:"\u5B50\u533A\u57DF\u7EA7\u522B:"}),(0,t.jsx)(f.Z,{span:14,style:{textAlign:"right"},children:(0,t.jsxs)(te.ZP.Group,{value:ye[0]||"province",size:ie,onChange:function(D){se("childrenLevel",D.target.value)},children:[ye.indexOf("province")!==-1&&(0,t.jsx)(te.ZP.Button,{value:"province",children:"\u7701"}),ye.indexOf("city")!==-1&&(0,t.jsx)(te.ZP.Button,{value:"city",children:"\u5E02"}),(0,t.jsx)(te.ZP.Button,{value:"county",children:"\u53BF"})]})})]}),(0,t.jsxs)(Z.Z,{className:"row",children:[(0,t.jsx)(f.Z,{span:6,className:"label",children:"\u6570\u636E\u4E0B\u8F7D:"}),(0,t.jsxs)(f.Z,{span:18,style:{textAlign:"right"},children:[(0,t.jsx)(F.Z,{value:y.datatype,style:{width:120},size:ie,options:a,onChange:se.bind(null,"datatype")}),(0,t.jsx)(W.ZP,{type:"primary",style:{marginLeft:"8px"},icon:(0,t.jsx)(ee.Z,{}),size:ie,onClick:Ae}),(0,t.jsx)(W.ZP,{type:"primary",style:{marginLeft:"8px"},icon:(0,t.jsx)($.Z,{}),onClick:Te,size:ie})]})]}),(0,t.jsxs)(Z.Z,{className:"row",children:[(0,t.jsx)(f.Z,{span:6,className:"label",children:"SVG\u4E0B\u8F7D:"}),(0,t.jsxs)(f.Z,{span:18,style:{textAlign:"right"},children:[(0,t.jsxs)(W.ZP,{style:{pointerEvents:"none",width:120},children:[" ",(0,t.jsx)(P.Z,{})," SVG"," "]}),(0,t.jsx)(W.ZP,{type:"primary",style:{marginLeft:"8px"},icon:(0,t.jsx)(ee.Z,{}),size:ie,onClick:Ie}),(0,t.jsx)(W.ZP,{type:"primary",style:{marginLeft:"8px"},icon:(0,t.jsx)($.Z,{}),onClick:be,size:ie})]})]}),(0,t.jsx)(Z.Z,{className:"row"}),(0,t.jsxs)("div",{className:"originData",style:{},children:[(0,t.jsx)("div",{children:"\u6570\u636E\u6765\u6E90\uFF1A"}),(0,t.jsx)("a",{href:"".concat(A==null||(H=A.info)===null||H===void 0||(z=H.desc)===null||z===void 0?void 0:z.href),children:"".concat(A==null||(Y=A.info)===null||Y===void 0||(ve=Y.desc)===null||ve===void 0?void 0:ve.text)})]})]})]})})}},61103:function(le,K,e){e.r(K);var U=e(70844),C=e(10438),Q=e(79995),s=e(67294),X=e(85893);K.default=function(){return(0,s.useEffect)(function(){var T=new U.Scene({id:"map",map:new C.Z({center:[121.4,31.258134],zoom:2,pitch:0,style:"normal",doubleClickZoom:!1})}),q=new Q.Ji({});q.getData({level:"province"}).then(function(V){var E=new U.PolygonLayer({autoFit:!0}).source(V).shape("fill").color("name",["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]).active(!1);T.addLayer(E)})},[]),(0,X.jsx)("div",{id:"map",style:{height:"500px",position:"relative"}})}},79995:function(le,K,e){e.d(K,{_q:function(){return w},Ji:function(){return B}});var U=e(15009),C=e.n(U),Q=e(99289),s=e.n(Q),X=e(12444),T=e.n(X),q=e(72004),V=e.n(q),E=e(25098),S=e.n(E),_=e(31996),J=e.n(_),ee=e(26037),$=e.n(ee),P=e(9783),c=e.n(P),v=e(97857),x=e.n(v),Z=V()(function R(M){T()(this,R),c()(this,"info",{}),c()(this,"options",{}),c()(this,"data",{country:void 0,province:void 0,city:void 0,county:void 0,jiuduanxian:void 0}),c()(this,"version",void 0),c()(this,"fetchJsonData",function(){var L=s()(C()().mark(function r(u){var n;return C()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,fetch(u);case 2:return n=i.sent,i.next=5,n.json();case 5:return i.abrupt("return",i.sent);case 6:case"end":return i.stop()}},r)}));return function(r){return L.apply(this,arguments)}}()),this.options=x()(x()({},this.getDefaultOptions()),M),this.version=this.options.version||"default"}),f={desc:{text:"DataV",href:"https://datav.aliyun.com/portal/school/atlas/area_selector"},url:"https://geo.datav.aliyun.com"},F=function(R){J()(L,R);var M=$()(L);function L(){var r;T()(this,L);for(var u=arguments.length,n=new Array(u),a=0;a<u;a++)n[a]=arguments[a];return r=M.call.apply(M,[this].concat(n)),c()(S()(r),"info",f),r}return V()(L,[{key:"getDefaultOptions",value:function(){return{version:"areas_v3"}}},{key:"getRenderData",value:function(u){throw new Error("Method not implemented.")}},{key:"getData",value:function(u){var n=u.code,a=u.full,i=this.fetchData(n,a);return i}},{key:"getChildrenData",value:function(u){var n=u.parentName,a=u.full,i=this.fetchData(n,a);return i}},{key:"fetchData",value:function(){var r=s()(C()().mark(function n(a,i){var o,p,m,h;return C()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(o="".concat(f.url,"/").concat(this.version,"/bound/").concat(a,".json"),p="".concat(f.url,"/").concat(this.version,"/bound/").concat(a,"_full.json"),!i){t.next=9;break}return t.next=5,this.fetchJsonData(p);case 5:return m=t.sent,t.abrupt("return",m);case 9:return t.next=11,this.fetchJsonData(o);case 11:return h=t.sent,t.abrupt("return",h);case 13:case"end":return t.stop()}},n,this)}));function u(n,a){return r.apply(this,arguments)}return u}()}]),L}(Z),ne=e(13365),re=e(74951),ue=e(3614),te=e.n(ue),W={desc:{text:"\u9510\u591A\u5B9D\u7684\u5730\u7406\u7A7A\u95F4",href:"https://github.com/ruiduobao/shengshixian.com"},url:"https://unpkg.com/xingzhengqu"},oe={high:1e-6,middle:1e-5,low:.005},j={country:"country",province:"province",city:"city",county:"county",jiuduanxian:"jiuduanxian"},B=function(R){J()(L,R);var M=$()(L);function L(){var r;T()(this,L);for(var u=arguments.length,n=new Array(u),a=0;a<u;a++)n[a]=arguments[a];return r=M.call.apply(M,[this].concat(n)),c()(S()(r),"info",W),c()(S()(r),"fetchArrayBuffer",function(){var i=s()(C()().mark(function o(p){var m;return C()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,fetch(p);case 2:return m=b.sent,b.next=5,m.arrayBuffer();case 5:return b.abrupt("return",b.sent);case 6:case"end":return b.stop()}},o)}));return function(o){return i.apply(this,arguments)}}()),r}return V()(L,[{key:"getDefaultOptions",value:function(){return{version:"2023"}}},{key:"getRenderData",value:function(){var r=s()(C()().mark(function n(a){return C()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.abrupt("return",this.getData(a));case 1:case"end":return o.stop()}},n,this)}));function u(n){return r.apply(this,arguments)}return u}()},{key:"getData",value:function(){var r=s()(C()().mark(function n(a){var i,o,p,m,h;return C()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=a.level,o=i===void 0?"country":i,p=a.precision,m=p===void 0?"low":p,t.next=3,this.fetchData(o);case 3:return h=t.sent,t.abrupt("return",this.simplifyData(h,m));case 5:case"end":return t.stop()}},n,this)}));function u(n){return r.apply(this,arguments)}return u}()},{key:"getChildrenData",value:function(){var r=s()(C()().mark(function n(a){var i,o,p,m,h,b;return C()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return i=a.parentAdcode,o=a.parentLevel,p=a.childrenLevel,m=a.precision,h=m===void 0?"low":m,ae.next=3,this.getData({level:p,precision:h});case 3:return b=ae.sent,i&&o&&i!==1e5&&(b.features=b.features.filter(function(H){var z="".concat(o,"_adcode"),Y=H.properties[z];return Y===i})),ae.abrupt("return",b);case 6:case"end":return ae.stop()}},n,this)}));function u(n){return r.apply(this,arguments)}return u}()},{key:"fetchData",value:function(){var r=s()(C()().mark(function n(a){var i,o,p;return C()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:if(!this.data[a]){h.next=2;break}return h.abrupt("return",this.data[a]);case 2:return i="".concat(W.url,"@").concat(this.version,"/data/").concat(j[a],".pbf"),h.next=5,this.fetchArrayBuffer(i);case 5:return o=h.sent,p=re.decode(new(te())(o)),this.data[a]=p,h.abrupt("return",p);case 9:case"end":return h.stop()}},n,this)}));function u(n){return r.apply(this,arguments)}return u}()},{key:"simplifyData",value:function(u,n){return(0,ne.Z)(u,{tolerance:oe[n],highQuality:!1})}}]),L}(Z),w={DataVSource:F,RDBSource:B}}}]);