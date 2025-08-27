
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="db7800dd-caa8-534d-a509-3ed235b652f1")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,9509950,e=>{"use strict";e.s(["TrackUserProjectActivity",()=>a]);var t=e.i(751170),r=e.i(4099374),c=e.i(3679047),u=e.i(9179314);function a(){return(0,t.jsx)(r.Suspense,{fallback:null,children:(0,t.jsx)(i,{})})}function i(){let e=(0,c.useParams)(),t=(0,r.useRef)(void 0);return(0,r.useEffect)(()=>{if(!e?.teamSlug||!e.project)return;let r=`${e.teamSlug}/${e.project}`;t.current!==r&&(t.current=r,(0,u.sendBeacon)(`/api/dashboard/projects/${e.project}/activity?teamId=${e.teamSlug}`,{}).catch(()=>{}))},[e?.project,e?.teamSlug]),null}}]);

//# sourceMappingURL=757886b909e29453.js.map
//# debugId=db7800dd-caa8-534d-a509-3ed235b652f1
