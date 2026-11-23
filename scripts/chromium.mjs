import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
const source=new URL('../firefox/',import.meta.url),out=new URL('../chromium/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('manifest.json',source),'utf8'));
delete manifest.browser_specific_settings;
manifest.background={service_worker:'launcher.js'};
manifest.minimum_chrome_version='102';
await mkdir(out,{recursive:true});
await writeFile(new URL('manifest.json',out),JSON.stringify(manifest,null,2)+'\n');
for(const name of ['launcher.js','skip.js'])await copyFile(new URL(name,source),new URL(name,out));