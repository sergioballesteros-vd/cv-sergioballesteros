/** @typedef {{supplier: string, supply: string, tariff: string, from: string, to: string, power1: number|null, power2: number|null, consumption1: number|null, consumption2: number|null, consumption3: number|null, energy: number|null, power: number|null, tax: number|null, rental: number|null, vat: number|null, total: number|null}} Invoice */
/** @typedef {{days:number, consumption:number[], power:number[], charges:{energy:number,power:number,tax:number,rental:number,vat:number,total:number}}} NormalizedInvoice */
export const numericFields = ['power1','power2','consumption1','consumption2','consumption3','energy','power','tax','rental','vat','total'];
/** @param {unknown} value */
export function parseNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'string' && typeof value !== 'number') throw new Error('Expected a number.');
  const text = String(value).trim();
  if (!/^(?:\d+(?:[.,]\d+)?|\.\d+)$/.test(text)) throw new Error('Use a non-negative number without thousands separators.');
  const n = Number(text.replace(',', '.'));
  if (!Number.isFinite(n) || n < 0 || n > 1000000) throw new Error('Value must be between 0 and 1,000,000.');
  return n;
}
/** @param {string} value */
function date(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Use valid billing dates.');
  const time = Date.parse(value+'T00:00:00Z');
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0,10) !== value) throw new Error('Use valid billing dates.');
  return time;
}
/** Validate untrusted extraction without turning missing data into zero. @param {unknown} input @returns {Invoice} */
export function validateExtraction(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid extraction payload.');
  const raw = /** @type {Record<string,unknown>} */ (input);
  /** @type {Record<string, unknown>} */ const output = {};
  for (const key of ['supplier','supply','tariff','from','to']) {
    const v = raw[key];
    if (typeof v !== 'string' || v.length > 120) throw new Error('Invalid document metadata.');
    output[key] = v.trim();
  }
  for (const key of numericFields) output[key] = parseNumber(raw[key]);
  return /** @type {Invoice} */ (output);
}
/** @param {Invoice} invoice @returns {NormalizedInvoice} */
export function normalize(invoice) {
  const checked = validateExtraction(invoice);
  const days = (date(checked.to)-date(checked.from))/86400000;
  if (days < 1 || days > 366) throw new Error('Billing period must be 1–366 days (end date exclusive).');
  if (checked.tariff !== '2.0TD') throw new Error('This public model supports electricity / 2.0TD only.');
  for (const key of numericFields) {
    if (/** @type {Record<string,unknown>} */ (checked)[key] === null) throw new Error('Complete all numeric fields before comparing scenarios. Missing is not zero.');
  }
  const n = /** @type {{[K in keyof Invoice]: NonNullable<Invoice[K]>}} */ (checked);
  const sum = n.energy+n.power+n.tax+n.rental+n.vat;
  if (Math.abs(sum-n.total) > .03) throw new Error('Invoice total must equal energy + power + tax + rental + VAT (within €0.03).');
  return {days,consumption:[n.consumption1,n.consumption2,n.consumption3],power:[n.power1,n.power2],charges:{energy:n.energy,power:n.power,tax:n.tax,rental:n.rental,vat:n.vat,total:n.total}};
}
export const demoTariffs = [
  {name:'Flex',energy:[.19,.19,.19],power:[.085,.035],daily:.04},
  {name:'Stable',energy:[.175,.175,.175],power:[.095,.04],daily:.08},
  {name:'Time-of-use',energy:[.26,.16,.095],power:[.09,.035],daily:.03},
];
/** @param {NormalizedInvoice} invoice */
export function simulate(invoice) {
  // The caller and the engine independently enforce the normalized boundary.
  if (!Number.isInteger(invoice.days) || invoice.days < 1 || invoice.days > 366 || invoice.consumption.length !== 3 || invoice.power.length !== 2 || [...invoice.consumption,...invoice.power,...['energy','power','tax','rental','vat','total'].map(key=>/** @type {Record<string,number>} */ (invoice.charges)[key])].some(n=>!Number.isFinite(n)||n<0)) throw new Error('Invalid simulation input.');
  const factor = 365/invoice.days;
  const baseline = Object.fromEntries(Object.entries(invoice.charges).map(([k,v])=>[k,v*factor]));
  const current = {name:'Current baseline',energy:baseline.energy,power:baseline.power,taxes:baseline.tax+baseline.vat,other:baseline.rental,annual:baseline.total,monthly:baseline.total/12,difference:0,percent:/** @type {number|null} */ (baseline.total === 0 ? null : 0)};
  return [current,...demoTariffs.map(t=>{
    const energy = invoice.consumption.reduce((sum,kwh,i)=>sum+kwh*t.energy[i],0)*factor;
    const power = invoice.power.reduce((sum,kw,i)=>sum+kw*t.power[i],0)*365;
    const other = t.daily*365;
    // Illustrative tax rates, intentionally not a regulatory implementation.
    const levy = (energy+power)*.04;
    const taxes = levy+(energy+power+levy+other)*.20;
    const annual = energy+power+other+taxes;
    const difference = annual-current.annual;
    return {name:t.name,energy,power,taxes,other,annual,monthly:annual/12,difference,percent:current.annual===0?null:difference/current.annual*100};
  })];
}
