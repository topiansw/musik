// @vitest-environment jsdom
import React from 'react';
import {expect,it,vi} from 'vitest';
import {act,render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Player,{nextIndex} from '../src/Player';
const list=['a','b'].map(id=>({id,title:id,artist:'Nada',image:'https://example.org/cover.png'}));
it('repeat one tidak mengulang video gagal; repeat all berhenti jika semuanya gagal',()=>{
  expect(nextIndex(list,0,new Set(),'one',true)).toBe(0);
  expect(nextIndex(list,0,new Set(['a']),'one',false)).toBe(1);
  expect(nextIndex(list,1,new Set(),'all',true)).toBe(0);
  expect(nextIndex(list,1,new Set(['a','b']),'all',false)).toBe(-1);
});
it('mengikuti event iframe, mencatat PLAYING sekali, melewati 150, dan membersihkan player',async()=>{
  let events,id,state=-1;const p={loadVideoById:vi.fn(v=>{id=v}),getVideoData:()=>({video_id:id}),getPlayerState:()=>state,pauseVideo:vi.fn(),destroy:vi.fn(),getDuration:()=>100,getCurrentTime:()=>0,getVolume:()=>100,isMuted:()=>false};
  window.YT={Player:class{constructor(el,opts){events=opts.events;return p}}};const played=vi.fn(),notify=vi.fn(),user=userEvent.setup();
  const view=render(<Player request={{list,id:'a'}} onPlayed={played} notify={notify}/>);
  await waitFor(()=>expect(events).toBeDefined());act(()=>events.onReady({target:p}));expect(id).toBe('a');
  function emit(data){state=data;act(()=>events.onStateChange({target:p,data}))}emit(1);emit(1);expect(played).toHaveBeenCalledTimes(1);
  await user.click(screen.getByRole('button',{name:'Jeda'}));expect(p.pauseVideo).toHaveBeenCalled();emit(2);expect(screen.getByRole('button',{name:'Putar'})).toBeTruthy();
  act(()=>events.onError({target:p,data:150}));expect(id).toBe('b');emit(0);expect(p.loadVideoById).toHaveBeenCalledTimes(2);view.unmount();expect(p.destroy).toHaveBeenCalledOnce();
});
