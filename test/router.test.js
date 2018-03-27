const test = require('tape'); 
const router = require('../src/router'); 
const supertest = require('supertest'); 


test('Check tape is working', (t)=> {
    let num = 2; 
    t.equal(num, 2, 'Should return 2'); 
    t.end(); 
}); 

test('Check status code for home route is 200', (t)=>{
  supertest(router)
  .get("/")
  .expect(200)
  .expect('Content-Type', 'text/html')
  .end((err, res) =>{
      t.error(err); 
      t.end();
  }); 
}); 

test('Check 404 error for router', (t)=>{
    supertest(router)
    .get('/giulia')
    .expect(404)
    .expect('Content-Type', 'text/html')
    .end((err, res) =>{
        t.error(err); 
        t.equal(res.text, "Page not found", "404 on router message should be 'Page not found'")
        t.end();
    }); 
  }); 