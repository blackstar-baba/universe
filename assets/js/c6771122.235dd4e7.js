"use strict";(self.webpackChunkblackstar_universe=self.webpackChunkblackstar_universe||[]).push([[3482],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=u(n),k=i,d=s["".concat(p,".").concat(k)]||s[k]||m[k]||a;return n?r.createElement(d,l(l({ref:t},c),{},{components:n})):r.createElement(d,l({ref:t},c))}));function k(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=s;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},5333:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const a={},l=void 0,o={unversionedId:"StarRocks/join_query_plan",id:"StarRocks/join_query_plan",title:"join_query_plan",description:"description",source:"@site/docs/StarRocks/join_query_plan.md",sourceDirName:"StarRocks",slug:"/StarRocks/join_query_plan",permalink:"/docs/StarRocks/join_query_plan",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"hotcold_partition",permalink:"/docs/StarRocks/hotcold_partition"},next:{title:"materialized_view_create",permalink:"/docs/StarRocks/materialized_view_create"}},p={},u=[{value:"description",id:"description",level:2},{value:"\u6982\u5ff5",id:"\u6982\u5ff5",level:3},{value:"\u539f\u5219",id:"\u539f\u5219",level:3},{value:"\u903b\u8f91\u4f18\u5316",id:"\u903b\u8f91\u4f18\u5316",level:3},{value:"join reorder\uff08join\u91cd\u6392\u5e8f\uff09",id:"join-reorderjoin\u91cd\u6392\u5e8f",level:3},{value:"\u5206\u5e03\u5f0fjoin\u89c4\u5212",id:"\u5206\u5e03\u5f0fjoin\u89c4\u5212",level:3},{value:"\u4f18\u5316\u539f\u5219",id:"\u4f18\u5316\u539f\u5219",level:4},{value:"link",id:"link",level:2}],c={toc:u};function m(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"description"},"description"),(0,i.kt)("h3",{id:"\u6982\u5ff5"},"\u6982\u5ff5"),(0,i.kt)("p",null,"Semi-join/Anti-Join \u601d\u60f3\u662f\u901a\u8fc7\u53f3\u8868\u8fc7\u6ee4\u5de6\u8868\uff0c\u53f3\u8868\u6570\u636e\u4e0d\u51fa\u73b0\u5728\u7ed3\u679c\u96c6\u4e2d\u3002"),(0,i.kt)("p",null,"Semi-join: \u534a\u8fde\u63a5\uff0cjoin\u6761\u4ef6\u6210\u7acb\u65f6\uff0c\u8fd4\u56de\u5de6\u8868\u6570\u636e\uff0c\u5982\u679c\u5de6\u8868\u6ee1\u8db3\u6761\u4ef6\u7684\u884c\u5728\u53f3\u8868\u4e2d\u51fa\u73b0\uff0c\u5219\u5305\u542b\u6b64\u884c\u3002"),(0,i.kt)("p",null,"anti-join\uff1a\u53cd\u5892\u8fde\u63a5\uff0cjoin\u6761\u4ef6\u4e0d\u6210\u7acb\u65f6\uff0c\u8fd4\u56de\u5de6\u8868\u6570\u636e\uff0c\u5982\u679c\u5de6\u8868\u6ee1\u8db3\u6761\u4ef6\u7684\u884c\u672a\u5728\u53f3\u8868\u4e2d\u51fa\u73b0\uff0c\u5219\u5305\u542b\u6b64\u884c\u3002"),(0,i.kt)("p",null,"\u5408\u53d6\u8c13\u8bcd\uff1aa1 = b1 and a2 = b2"),(0,i.kt)("p",null,"\u6790\u53d6\u8c13\u8bcd\uff1aa1 = b1 or a2=b2"),(0,i.kt)("h3",{id:"\u539f\u5219"},"\u539f\u5219"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Join\u7b97\u5b50\u6027\u80fd:Semi-Join/Anti-Join > Inner Join >Outer Join > Full Outer Join > Cross Join"),(0,i.kt)("li",{parentName:"ul"},"Hash Join\u6027\u80fd:\u5c0f\u8868\u6784\u5efaHashTable>\u5927\u8868\u6784\u5efaHashTable"),(0,i.kt)("li",{parentName:"ul"},"\u6709\u591a\u4e2aJoin\u65f6\uff0c\u9ad8\u9009\u62e9\u5ea6Join\u4f18\u5148\u4e8e\u4f4e\u9009\u62e9\u5ea6Join\uff08\u80fd\u591f\u5bf9\u6027\u80fd\u5e26\u6765\u63d0\u5347\u7684join\uff09"),(0,i.kt)("li",{parentName:"ul"},"\u51cf\u5c11Join\u8f93\u5165\u6570\u636e\u91cf\uff08\u8c13\u8bcd\u4e0b\u63a8\u3001\u8c13\u8bcd\u63d0\u53d6\u7b49\uff09"),(0,i.kt)("li",{parentName:"ul"},"\u5206\u5e03\u5f0f\u4e0b\u51cf\u5c11HashJoin\u8981\u6c42\u7684\u7f51\u7edc\u6210\u672c\uff08Colocate Join>shuffle join > boardcast join\uff09")),(0,i.kt)("h3",{id:"\u903b\u8f91\u4f18\u5316"},"\u903b\u8f91\u4f18\u5316"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u7c7b\u578b\u8f6c\u5316")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u8c13\u8bcd\u4e0b\u63a8")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u8c13\u8bcd\u63d0\u53d6")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u7b49\u4ef7\u63a8\u5bfc")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Limit\u4e0b\u63a8"))),(0,i.kt)("p",null,"\u5728\u4e00\u5b9a\u6761\u4ef6\u4e0b\uff0cjoin\u4f18\u5316\u53ef\u4ee5\u4ece\u6790\u53d6\u8c13\u8bcd\u63d0\u53d6\u5408\u53d6\u8c13\u8bcd\uff0c\u5e76\u8fdb\u884c",(0,i.kt)("strong",{parentName:"p"},"\u4e0b\u63a8"),"\u3002"),(0,i.kt)("h3",{id:"join-reorderjoin\u91cd\u6392\u5e8f"},"join reorder\uff08join\u91cd\u6392\u5e8f\uff09"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"join_order.png",src:n(3385).Z,width:"1844",height:"648"})),(0,i.kt)("p",null,"\u7b97\u6cd5\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Heuristic \uff08\u542f\u53d1\u5f0f\uff09")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Left-Deep\uff08\u5de6\u6df1\u6811\uff09")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Bushy\uff08\u7a20\u5bc6\u6811\uff09"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Exhaustive(Commutativity + Associativity) \u7a77\u4e3e\uff08\u4ea4\u6362\u6027\u4e0e\u7ed3\u5408\u6027\uff09"),(0,i.kt)("li",{parentName:"ul"},"Greedy\uff08\u8d2a\u5fc3\uff09"),(0,i.kt)("li",{parentName:"ul"},"Simulated annealing (",(0,i.kt)("strong",{parentName:"li"},"\u9000\u706b"),"\uff0c\u6539\u826f\u7248\u7684\u8d2a\u5fc3\u7b97\u6cd5)"),(0,i.kt)("li",{parentName:"ul"},"DP: DPsize, DPsub\uff0cDPccp\uff08\u52a8\u6001\u89c4\u5212\uff09"),(0,i.kt)("li",{parentName:"ul"},"Genetic \uff08",(0,i.kt)("strong",{parentName:"li"},"\u9057\u4f20"),"\uff09"),(0,i.kt)("li",{parentName:"ul"},"other")))),(0,i.kt)("h3",{id:"\u5206\u5e03\u5f0fjoin\u89c4\u5212"},"\u5206\u5e03\u5f0fjoin\u89c4\u5212"),(0,i.kt)("h4",{id:"\u4f18\u5316\u539f\u5219"},"\u4f18\u5316\u539f\u5219"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u51cf\u5c11\u7f51\u7edc\u5f00\u9500"),(0,i.kt)("li",{parentName:"ul"},"\u5408\u7406\u62c6\u5206fragement\uff0c\u5229\u7528MPP\u5e76\u53d1\u6267\u884c")),(0,i.kt)("h2",{id:"link"},"link"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u534a\u8fde\u63a5\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://help.aliyun.com/document_detail/73784.html"},"https://help.aliyun.com/document_detail/73784.html"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"https://www.bilibili.com/video/BV1bi4y1r7Td/?spm_id_from=333.788"},"https://www.bilibili.com/video/BV1bi4y1r7Td/?spm_id_from=333.788")))))}m.isMDXComponent=!0},3385:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/join_order-7d96fb9c6e4062cdad50c166dc8c92c1.png"}}]);