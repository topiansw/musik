export function fromLink(value){
  try{
    const u=new URL(value.trim());
    if(!['https:','http:'].includes(u.protocol)||u.username||u.password)return null;
    const music=u.hostname==='music.youtube.com';
    const id=u.hostname==='youtu.be'?u.pathname.slice(1):
      ['youtube.com','www.youtube.com','m.youtube.com','music.youtube.com'].includes(u.hostname)&&u.pathname==='/watch'?u.searchParams.get('v'):null;
    if(!/^[\w-]{11}$/.test(id||''))return null;
    return {id,title:`Video ${id}`,artist:music?'YouTube Music':'YouTube',image:`https://i.ytimg.com/vi/${id}/mqdefault.jpg`};
  }catch{return null}
}

export function parseLrc(text){
  const offset=Number(text.match(/^\s*\[offset:([+-]?\d+)\]/im)?.[1]||0)/1000;
  return text.split(/\r?\n/).flatMap(line=>{
    const tags=[...line.matchAll(/\[(\d+):([0-5]\d)(?:\.(\d{1,3}))?\]/g)];
    const words=line.slice(tags.at(-1)?.index+ (tags.at(-1)?.[0].length||0)).trim();
    return tags.map(([,m,s,f])=>({at:Math.max(0,+m*60 + +s + Number('0.'+(f||0))-offset),words}));
  }).sort((a,b)=>a.at-b.at);
}