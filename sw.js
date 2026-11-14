const V='qltb-v10',SHELL=['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
const CDN=['cdn.tailwindcss.com','cdnjs.cloudflare.com','cdnjs.cloudflare.com'];
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(u.origin!==location.origin&&!CDN.includes(u.hostname))return;
 if(u.pathname.endsWith('drive-config.js')){e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(k=>k.put(r,c))}return res}).catch(()=>caches.match(r)));return}
 e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>hit);return hit||net}))});
