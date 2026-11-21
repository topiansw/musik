import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import {VitePWA} from 'vite-plugin-pwa';
const base = (process.env.PAGES_BASE || '/').replace(/\/?$/, '/');
export default defineConfig({base, plugins:[react(),tailwind(),VitePWA({manifestFilename:'manifest.json', registerType:'autoUpdate',manifest:{name:'Nada — Ruang musikmu',short_name:'Nada',lang:'id',start_url:base,scope:base,display:'standalone',theme_color:'#111616',background_color:'#111616',icons:[192,512].map(n=>({src:`icons/${n}.png`,sizes:`${n}x${n}`,type:'image/png',purpose:'any maskable'}))},workbox:{globPatterns:['**/*.{html,js,css,png,json}'],navigateFallback:`${base}index.html`}})]});