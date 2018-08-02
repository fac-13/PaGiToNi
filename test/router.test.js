const test = require('tape');
const router = require('../src/router');
const supertest = require('supertest');
const nock = require('nock');
const dummy = require('./dummyResponse.json');

test('Check tape is working', (t) => {
  const num = 2;
  t.equal(num, 2, 'Should return 2');
  t.end();
});

// HOME ROUTE '/', STATIC ROUTE '/public' & 404

test('Check status code for home route is 200', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'text/html')
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

test('Check status code for static route is 200', (t) => {
  supertest(router)
    .get('/public/style.css')
    .expect(200)
    .expect('Content-Type', 'text/css')
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

test('Check 404 error for router', (t) => {
  supertest(router)
    .get('/giulia')
    .expect(404)
    .expect('Content-Type', 'text/html')
    .end((err, res) => {
      t.error(err);
      t.equal(
        res.text,
        'Page not found',
        "404 on router message should be 'Page not found'",
      );
      t.end();
    });
});

test('Check status code for static route is 200', (t) => {
  supertest(router)
    .get('/public/style.css')
    .expect(200)
    .expect('Content-Type', 'text/css')
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

test('Check 404 error for router', (t) => {
  supertest(router)
    .get('/public/giulia.com')
    .expect(500)
    .expect('Content-Type', 'text/html')
    .end((err, res) => {
      t.error(err);
      t.equal(
        res.text,
        "Sorry we can't find the static file",
        "500 on router message should be 'Sorry we can't find the static file'",
      );
      t.end();
    });
});

// LATEST ROUTE '/latest'

test('Check /latest route is working', (t) => {
  nock(/https:\/\/newsapi\.org/)
    .get(/\/v2\/top-headlines\?/)
    .reply(200, dummy);
  // .persist(); - add this if you want it to last for more than one interception

  supertest(router)
    .get('/latest')
    .expect(200)
    .expect('Content-Type', 'application/json')
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

// SEARCH ROUTE '/search'

test('Check /search route is working with valid query', (t) => {
  nock(/https:\/\/newsapi\.org/)
    .get(/\/v2\/everything\?/)
    .reply(200, dummy);

  supertest(router)
    .get('/search?q=test')
    .expect(200)
    .expect('Content-Type', 'application/json')
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

test('Check /search error handling for API response error is working', (t) => {
  nock(/https:\/\/newsapi\.org/)
    .get(/\/v2\/everything\?/)
    .reply(503, 'NewsAPI server down');

  supertest(router)
    .get('/search?q=test')
    .expect(500)
    .expect('Content-Type', 'application/json')
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

test('Check /search error handling is working for missing query', (t) => {
  supertest(router)
    .get('/search')
    .expect(400)
    .expect('Content-Type', 'application/json')
    .end((err, res) => {
      t.error(err);
      t.equal(
        JSON.parse(res.text).error,
        'Search call with empty or missing query',
        "Response to client on unparsable API response should read 'Search call with empty or missing query'",
      );
      t.end();
    });
});

test('Check /search error handling is working for unparsable API response', (t) => {
  nock(/https:\/\/newsapi\.org/)
    .get(/\/v2\/everything\?/)
    .reply(200, '');

  supertest(router)
    .get('/search?q=test')
    .expect(500)
    .expect('Content-Type', 'application/json')
    .end((err, res) => {
      t.error(err);
      console.log('this is res: ', JSON.parse(res.text));
      t.equal(
        JSON.parse(res.text).error,
        'Something went wrong',
        "Response to client on unparsable API response should read 'Something went wrong'",
      );
      t.end();
    });
});
