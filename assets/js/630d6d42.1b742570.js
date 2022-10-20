"use strict";(self.webpackChunkblackstar_universe=self.webpackChunkblackstar_universe||[]).push([[5207],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(r),d=a,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||i;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3952:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const i={},o=void 0,l={unversionedId:"OS/Linux/threads",id:"OS/Linux/threads",title:"threads",description:"description",source:"@site/docs/OS/Linux/threads.md",sourceDirName:"OS/Linux",slug:"/OS/Linux/threads",permalink:"/docs/OS/Linux/threads",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"sed",permalink:"/docs/OS/Linux/sed"},next:{title:"virtual_disk_add",permalink:"/docs/OS/Linux/virtual_disk_add"}},s={},c=[{value:"description",id:"description",level:2},{value:"link",id:"link",level:2}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"description"},"description"),(0,a.kt)("p",null,"The kernel parameter threads-max controls the maximum number of threads. This parameter is defined in the file /proc/sys/kernel/threads-max.Let\u2019s view this file using the cat command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ cat /proc/sys/kernel/threads-max\n63704\n")),(0,a.kt)("p",null,"Here, the output 63704 indicates that the kernel can execute a maximum of 63,704 threads.Alternatively, we can use the sysctl command to retrieve the threads-max value:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ sysctl -a | grep threads-max\nkernel.threads-max = 63704\n")),(0,a.kt)("p",null,"The pid_max parameter specifies the value at which PIDs wrap around:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ cat /proc/sys/kernel/pid_max \n131072\n")),(0,a.kt)("p",null,"The kernel.pid_max value of 131072 above means the kernel can execute a maximum of 131,072 processes simultaneously. The max_map_count parameter specifies the maximum number of Virtual Memory Areas (VMAs) that a process can own:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cat /proc/sys/vm/max_map_count\n65530\n")),(0,a.kt)("h2",{id:"link"},"link"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.baeldung.com/linux/max-threads-per-process"},"https://www.baeldung.com/linux/max-threads-per-process"))))}u.isMDXComponent=!0}}]);