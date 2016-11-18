const assert = require('chai').assert;

// Whhhhaaat? Yeah, you can import and use as you like.
const lighthouse = require('lighthouse');

// Define our test url
// You could just as easily start a local server to test as well
const testUrl = 'https://developer.chrome.com/devsummit/';

// Setup lighthouse options
const lighthouseOptions = {
  mobile: true,
  loadPage: true
};

// You can use your define custom Lighthouse configs, audits, and gatherers!
// You could also import pre-existing defines in the lighthouse repo, see:
// https://github.com/GoogleChrome/lighthouse/tree/master/lighthouse-core/config
// const perfConfig = require('lighthouse/lighthouse-core/config/perf.json');
const auditConfig = require('./audits.json');

// We'll process the results and then pass to our tests
// Based on Paul Irish's PWMetric sample
// https://github.com/paulirish/pwmetrics/
const ourMetrics = require('./metrics');

describe('Lighthouse PWA Testing', function() {

  // Failsafe; could be long depending on what you're trying to test
  this.timeout(15000);
  
  // We'll run our lighthouse set once and store for compare in this sample
  // you could very easily build a different sort of runner
  let _lhResult = null;

  before('Run Lighthouse base test', (done) => {
    lighthouse(testUrl, lighthouseOptions, auditConfig)
      .then((res) => { 
        _lhResult = ourMetrics.prepareData(res);
        done();
      });
  });

  it("should have service worker", (done) => {
    let sw = _lhResult.preparedResults.find(r => {
      return r.name === 'sw';
    });
    assert.equal(sw.value, true);
    done();
  });

  it("should have first meaningful paint < 500ms", (done) => {
    let ttfmp = _lhResult.preparedResults.find(r => {
      return r.name === 'ttfmp';
    });
    assert.isBelow(ttfmp.value, 500);
    done();
  });

  it("should have time to interactive < 1000ms", (done) => {
    let tti = _lhResult.preparedResults.find(r => {
      return r.name === 'tti';
    });
    assert.isBelow(tti.value, 1000);
    done();
  });
});