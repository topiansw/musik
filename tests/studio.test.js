import {expect,it} from 'vitest';
import {fromLink,parseLrc} from '../src/studio';
it('memakai ID yang sama untuk kedua layanan dan tautan pendek',()=>{
  const id='123456789_A';
  for(const url of [`https://music.youtube.com/watch?v=${id}`,`https://www.youtube.com/watch?v=${id}`,`https://youtu.be/${id}?t=2`])expect(fromLink(url)?.id).toBe(id);
  for(const url of ['invalid','https://music.youtube.com.example/watch?v='+id,'https://youtu.be/123'])expect(fromLink(url)).toBeNull();
});
it('mengurutkan timestamp berulang serta menyesuaikan offset LRC',()=>{
  expect(parseLrc('[offset:+100]\n[00:02.10][00:01.1]Nada\n[ar:A]')).toEqual([{at:1,words:'Nada'},{at:2,words:'Nada'}]);
});