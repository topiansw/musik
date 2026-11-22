import React,{useState} from 'react';
import {fromLink,parseLrc} from './studio.js';
import {read} from './services';

export function Studio({play,likes,lists}){
  const [url,U]=useState(''),[title,T]=useState(''),[error,E]=useState('');
  return <section className="bento" aria-label="Studio musik"><form className="tile" onSubmit={e=>{e.preventDefault();const track=fromLink(url);if(!track){E('Gunakan tautan lagu /watch?v=… atau youtu.be/… yang valid.');return}if(title.trim())track.title=title.trim();play({list:[track],id:track.id});E('')}}><small>01 / INPUT</small><h2>Putar dari tautan</h2><p>YouTube atau YouTube Music · tanpa API key</p><input className="field" aria-label="Tautan lagu" placeholder="Tempel tautan lagu" required value={url} onChange={e=>U(e.target.value)}/><input className="field" aria-label="Judul koleksi" placeholder="Judul untuk koleksi (opsional)" value={title} onChange={e=>T(e.target.value)}/><button>Putar lagu</button>{error&&<p role="alert">{error}</p>}</form><div className="tile tally"><small>02 / KOLEKSI LOKAL</small><strong>{likes}</strong> lagu disukai <p>{lists} playlist · tanpa login</p></div></section>;
}

export function Lyrics({id,pos}){
  const key='lyrics:'+id,[lines,L]=useState(()=>read(key,[])),[error,E]=useState('');
  const line=lines.findLast(row=>row.at<=pos);
  async function load(file){if(!file)return;try{if(file.size>256000)throw Error('Batas ukuran LRC adalah 250 KB.');const result=parseLrc(await file.text());if(!result.length)throw Error('LRC tidak memiliki penanda waktu yang valid.');L(result);localStorage.setItem('nada:'+key,JSON.stringify(result));E('')}catch(e){E(e.message)}}
  return <details className="lyrics"><summary>Lirik sinkron</summary><p>{lines.length?(line?.words||'♪'):'Pilih berkas .lrc untuk lagu ini.'}</p><input type="file" accept=".lrc,text/plain" aria-label="Impor lirik LRC" onChange={e=>load(e.target.files[0])}/>{error&&<p role="alert">{error}</p>}</details>;
}