// @vitest-environment jsdom
import React from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Lyrics,Studio} from '../src/Studio.jsx';

afterEach(()=>{cleanup();localStorage.clear()});
it('memvalidasi sumber lalu mengirim lagu Music ke pemutar yang sama',async()=>{
  const user=userEvent.setup(),play=vi.fn();render(<Studio play={play} likes={1} lists={0}/>);
  await user.type(screen.getByLabelText('Tautan lagu'),'https://music.youtube.com/watch?v=123456789_A');
  await user.selectOptions(screen.getByRole('combobox'),'YouTube');
  await user.click(screen.getByText('Putar lagu →'));expect(play).not.toHaveBeenCalled();
  await user.selectOptions(screen.getByRole('combobox'),'YouTube Music');
  await user.click(screen.getByText('Putar lagu →'));expect(play.mock.calls[0][0].list[0].source).toBe('YouTube Music');
});
it('mengikuti posisi seek termasuk kembali ke sebelum baris pertama',()=>{
  localStorage.setItem('nada:lyrics:abc',JSON.stringify([{at:1,words:'awal'},{at:4,words:'akhir'}]));
  const view=render(<Lyrics id="abc" pos={5}/>);expect(view.container.querySelector('.current').textContent).toBe('akhir');
  view.rerender(<Lyrics id="abc" pos={0}/>);expect(view.container.querySelector('.current').textContent).toBe('♪');
});