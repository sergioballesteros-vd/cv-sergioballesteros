import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('index.html',import.meta.url),'utf8');
for(const file of ['app.js','i18n.js','domain.js','extraction.js','demo.css','sample-invoice.pdf'])readFileSync(new URL(file,import.meta.url));
for(const id of ['idle','processing','review','simulating','results','error'])if(!html.includes(`id="${id}"`))throw new Error(`Missing state ${id}`);
console.log('Static build verified: modules, stylesheet, sample PDF and workflow states. No compilation needed.');
