import {validateExtraction,normalize} from './domain.js';
/** @type {import('./domain.js').Invoice} */
export const sampleInvoice = {supplier:'Northlight Demo Energy',supply:'DEMO-SUPPLY-0001',tariff:'2.0TD',from:'2026-04-01',to:'2026-05-01',power1:4.6,power2:4.6,consumption1:85,consumption2:70,consumption3:125,energy:61.60,power:17.94,tax:3.18,rental:.90,vat:16.72,total:100.34};
export const stages = ['Document ingestion','Document content · mock','OCR + LLM extraction · mock','Schema validation','Domain normalization','Ready for human review'];
/** @param {{size:number,type:string,arrayBuffer:()=>Promise<ArrayBuffer>}} file */
export async function ingest(file) {
  if (file.size === 0 || file.size > 5*1024*1024) throw new Error('Choose a non-empty file up to 5 MB.');
  const types = ['application/pdf','image/png','image/jpeg'];
  if (!types.includes(file.type)) throw new Error('Supported formats: PDF, PNG and JPG/JPEG.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = String.fromCharCode(...bytes.slice(0,5)) === '%PDF-';
  const png = [137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n);
  const jpg = bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
  if (!(file.type==='application/pdf'&&pdf || file.type==='image/png'&&png || file.type==='image/jpeg'&&jpg)) throw new Error('File contents do not match its format. Try the sample invoice.');
  return {type:file.type,size:file.size}; // Discard bytes; never send them to a server.
}
/** Public implementation of the production extractor boundary; no OCR/model call. */
export class DemoExtractor {
  /** @param {(stage:number)=>void} onStage @param {AbortSignal} signal */
  async extract(onStage,signal) {
    let invoice = {...sampleInvoice};
    for(let i=0;i<stages.length;i++) {
      signal.throwIfAborted(); onStage(i);
      if(i===3) invoice=validateExtraction(invoice);
      if(i===4) normalize(invoice);
      await new Promise(resolve=>setTimeout(resolve,90));
    }
    signal.throwIfAborted();
    return {invoice,review:['consumption2'],source:'Synthetic fixture · mock provider'};
  }
}
