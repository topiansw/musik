const cache = new Map();
export async function discover(key, query, page, signal) {
  const id=JSON.stringify([key,query,page]);
  if ((cache.get(id)?.expires || 0)>Date.now()) return cache.get(id).data;
  const params=new URLSearchParams({key,part:'snippet',maxResults:'16',videoCategoryId:'10',...(query?{type:'video',q:query,videoEmbeddable:'true'}:{chart:'mostPopular',regionCode:'ID'}),...(page?{pageToken:page}:{})});
  const response=await fetch(`https://www.googleapis.com/youtube/v3/${query?'search':'videos'}?${params}`,{signal,cache:'no-store'});
  const body=await response.json();
  if(!response.ok){const reason=body.error?.errors?.[0]?.reason || ''; throw Error(/quota|limit/i.test(reason)?'Kuota YouTube habis. Coba kembali nanti; koleksi lokal tetap tersedia.':`Permintaan ditolak (${response.status}). Periksa key, izin YouTube Data API v3, dan pembatasan situs di Settings.`)}
  const data={items:body.items.map(({id,snippet:s})=>({id:typeof id==='string'?id:id.videoId,title:s.title,artist:s.channelTitle,image:s.thumbnails.medium?.url||s.thumbnails.default.url})),next:body.nextPageToken};
  if(cache.size>=64)cache.delete(cache.keys().next().value); cache.set(id,{data,expires:Date.now()+300000});return data;
}
let loading;
export function youtube(){
  if(window.YT?.Player)return Promise.resolve(window.YT);
  if(!loading)loading=new Promise((resolve,reject)=>{const script=document.createElement('script');const fail=()=>{clearTimeout(timer);script.remove();loading=null;reject(Error('Pemutar YouTube tidak dapat dimuat. Periksa koneksi dan coba lagi.'))};const timer=setTimeout(fail,20000);window.onYouTubeIframeAPIReady=()=>{clearTimeout(timer);resolve(window.YT)};script.onerror=fail;script.src='https://www.youtube.com/iframe_api';document.head.append(script)});
  return loading;
}
export function read(name,fallback){try{return JSON.parse(localStorage.getItem('nada:'+name))??fallback}catch{return fallback}}