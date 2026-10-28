const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function environment(){
  const elements=new Map();
  const element=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',style:{},className:'',textContent:''});return elements.get(id)};
  const context=vm.createContext({Intl,Date,console,setTimeout:()=>0,clearTimeout:()=>{},window:{scrollTo(){}},localStorage:{getItem:()=>null,setItem(){}},document:{getElementById:element,addEventListener(){}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8'),context);
  return source=>vm.runInContext(source,context);
}
test('initial data, financial totals and company filters',()=>{
  const run=environment();
  assert.equal(run('db.invoices.length'),24);
  assert.equal(run('total({base:1250,vat:21})'),1512.5);
  assert.equal(run("company='alba'; scope().length"),8);
  assert.equal(run("scope().every(invoice=>invoice.company==='alba')"),true);
  assert.equal(run("page='approvals'; filtered().every(invoice=>invoice.status==='validated')"),true);
  assert.equal(run("page='invoices'; query='inexistente'; filtered().length"),0);
});
test('validation rejects missing identity and invalid amounts',()=>{
  const run=environment();
  assert.equal(run("validationErrors({partner:'Demo',nif:'DEMO-123',base:100,vat:21}).length"),0);
  assert.equal(run("validationErrors({partner:'Demo',nif:'',base:-1,vat:7}).length"),3);
  assert.equal(run("validationErrors({partner:'Demo',nif:'DEMO-123',base:NaN,vat:21}).length"),1);
});
test('SAP failure preserves approval; retry succeeds exactly once',()=>{
  const run=environment();
  run("var invoice=db.invoices.find(item=>item.status==='approved'); var initial=db.transactions.length; db.failNext=true");
  assert.equal(run('exportInvoice(invoice)'),false);
  assert.equal(run('invoice.status'),'approved');
  assert.equal(run('db.transactions.length-initial'),0);
  assert.equal(run('exportInvoice(invoice)'),true);
  assert.equal(run('invoice.status'),'exported');
  assert.equal(run('db.transactions.length-initial'),1);
  assert.equal(run('exportInvoice(invoice)'),false);
  assert.equal(run('db.transactions.length-initial'),1);
});
test('reconciliation rejects mismatches and completes a valid movement once',()=>{
  const run=environment();
  run("var invoice=db.invoices.find(item=>item.status==='approved'); exportInvoice(invoice); var move=db.transactions.at(-1); var amount=move.amount; move.amount=1; match(move.id)");
  assert.equal(run('invoice.status'),'exported');
  run('move.amount=amount; match(move.id)');
  assert.equal(run('invoice.status'),'reconciled');
  assert.equal(run('move.matched'),true);
  const count=run('invoice.history.length');
  run('match(move.id)');
  assert.equal(run('invoice.history.length'),count);
});
test('render all views and escape contact data',()=>{
  const run=environment();
  assert.equal(run("Object.keys(pages).every(view=>{page=view;return renderPage().length>100})"),true);
  assert.equal(run("escapeHtml('<script>')"),'&lt;script&gt;');
});
