const test = require('tape'); 
const router = require('../src/router'); 
const supertest = require('supertest'); 
const nock = require('nock');
const path = require('path');


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

test('Check status code for static route is 200', (t)=>{
    supertest(router)
    .get("/public/style.css")
    .expect(200)
    .expect('Content-Type', 'text/css')
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

test('Check status code for static route is 200', (t)=>{
    supertest(router)
    .get("/public/style.css")
    .expect(200)
    .expect('Content-Type', 'text/css')
    .end((err, res) =>{
        t.error(err); 
        t.end();
    }); 
  }); 

  test('Check 404 error for router', (t)=>{
    supertest(router)
    .get('/public/giulia.com')
    .expect(500)
    .expect('Content-Type', 'text/html')
    .end((err, res) =>{
        t.error(err); 
        t.equal(res.text, "Sorry we can't find the static file", "500 on router message should be 'Sorry we can't find the static file'")
        t.end();
    }); 
  }); 


  test('Check /latest route is working', (t)=>{
    supertest(router)
    .get("/latest")
    .expect(200)
    .expect('Content-Type', 'application/json')
    .end((err, res) =>{
        t.error(err); 
        t.end();
    }); 
  }); 
