import React,{useState} from 'react';
import {fromLink,parseLrc} from './studio.js';
import {read} from './services';

export function Studio({play,likes,lists,last}){
  const [url,U]=useState(''),[title,T]=useState(''),[source,S]=useState(''),[error,E]=useState('');
  function submit(e){
    e.preventDefault();const track=fromLink(url);
    if(!track){E('Gunakan tautan lagu /watch?v=… atau youtu.be/… yang valid.');return}
    if(source && source!==track.artist){E(`Tautan ini berasal dari ${track.artist}. Ubah sumber atau gunakan deteksi otomatis.`);return}
    track.source=track.artist;if(title.trim())track.title=title.trim();play({list:[track],id:track.id});E('');
  }
  return <section className="bento" aria-label="Studio musik">
    <form className="tile" onSubmit={submit}><small>01 / INPUT</small><h2>Putar dari tautan</h2>
      <label>Sumber <select value={source} onChange={e=>S(e.target.value)}><option value="">Deteksi otomatis</option><option>YouTube</option><option>YouTube Music</option></select></label>
      <input className="field" aria-label="Tautan lagu" placeholder="Tempel tautan lagu" required value={url} onChange={e=>U(e.target.value)}/><input className="field" aria-label="Judul koleksi" placeholder="Judul untuk koleksi (opsional)" value={title} onChange={e=>T(e.target.value)}/><button type="submit">Putar lagu →</button>{error&&<p role="alert">{error}</p>}</form>
    <div className="tile tally"><small>02 / PUSTAKA</small><strong>{likes}</strong> lagu disukai <p>{lists} playlist · tanpa login</p></div>
    <div className="tile recent"><small>03 / PUTAR ULANG</small>{last?<><img src={last.image} alt=""/><h2>{last.title}</h2><button onClick={()=>play({list:[last],id:last.id})}>Putar lagi</button></>:<><h2>Belum ada rekaman.</h2><p>Lagu terakhir Anda akan muncul di sini.</p></>}</div>
  </section>;
}

export function Lyrics({id,pos}){
  const key='lyrics:'+id,[lines,L]=useState(()=>read(key,[])),[error,E]=useState('');
  const active=lines.findLastIndex(row=>row.at<=pos);
  async function load(file){if(!file)return;try{if(file.size>256000)throw Error('Batas ukuran LRC adalah 250 KB.');const result=parseLrc(await file.text());if(!result.length)throw Error('LRC tidak memiliki penanda waktu yang valid.');L(result);localStorage.setItem('nada:'+key,JSON.stringify(result));E('')}catch(e){E(e.message)}}
  return <details className="lyrics"><summary>Lirik sinkron</summary>{lines[active-1]&&<p>{lines[active-1].words}</p>}<p className="current">{lines.length?(lines[active]?.words||'♪'):'Pilih berkas .lrc untuk lagu ini.'}</p>{lines[active+1]&&<p>{lines[active+1].words}</p>}<input type="file" accept=".lrc,text/plain" aria-label="Impor lirik LRC" onChange={e=>load(e.target.files[0])}/>{error&&<p role="alert">{error}</p>}</details>;
}