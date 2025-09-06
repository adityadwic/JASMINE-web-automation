const fs = require('fs');
const path = require('path');

class TestReporter {
  constructor() {
    this.startTime = Date.now();
    this.suites = [];
    this.currentSuite = null;
  }

  jasmineStarted(suiteInfo) {
    this.startTime = Date.now();
    console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
  }

  suiteStarted(result) {
    this.currentSuite = {
      id: result.id,
      description: result.description,
      fullName: result.fullName,
      specs: [],
      startTime: Date.now()
    };
    this.suites.push(this.currentSuite);
  }

  specStarted(result) {
    if (!this.currentSuite) {
      this.currentSuite = {
        id: 'default',
        description: 'Default Suite',
        fullName: 'Default Suite',
        specs: [],
        startTime: Date.now()
      };
      this.suites.push(this.currentSuite);
    }
    
    this.currentSpec = {
      id: result.id,
      description: result.description,
      fullName: result.fullName,
      status: 'running',
      startTime: Date.now(),
      failedExpectations: []
    };
    
    this.currentSuite.specs.push(this.currentSpec);
  }

  specDone(result) {
    const spec = this.currentSuite.specs.find(s => s.id === result.id);
    if (spec) {
      spec.status = result.status;
      spec.duration = Date.now() - spec.startTime;
      spec.failedExpectations = result.failedExpectations || [];
      spec.passedExpectations = result.passedExpectations || [];
    }
  }

  suiteDone(result) {
    if (this.currentSuite && this.currentSuite.id === result.id) {
      this.currentSuite.duration = Date.now() - this.currentSuite.startTime;
      this.currentSuite.status = result.status;
    }
  }

  jasmineDone() {
    this.duration = Date.now() - this.startTime;
    this.generateReport();
  }

  generateReport() {
    const results = {
      startTime: new Date(this.startTime),
      endTime: new Date(),
      duration: this.duration,
      suites: this.suites,
      summary: this.calculateSummary(),
      environment: {
        platform: process.platform,
        nodeVersion: process.version,
        chrome: 'Chrome 139.0.7258.157',
        chromeDriver: 'ChromeDriver 139.0.7258.154'
      }
    };

    this.generateHTMLReport(results);
    this.generateJSONReport(results);
  }

  calculateSummary() {
    let total = 0;
    let passed = 0;
    let failed = 0;
    let skipped = 0;

    this.suites.forEach(suite => {
      suite.specs.forEach(spec => {
        total++;
        if (spec.status === 'passed') passed++;
        else if (spec.status === 'failed') failed++;
        else skipped++;
      });
    });

    return {
      total,
      passed,
      failed,
      skipped,
      successRate: total > 0 ? Math.round((passed / total) * 100) : 0
    };
  }

  generateHTMLReport(results) {
    const htmlContent = this.generateHTMLContent(results);
    const reportDir = path.join(process.cwd(), 'reports', 'html');
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(reportDir, 'test-report.html'), htmlContent);
    console.log('\n📊 HTML Report generated: reports/html/test-report.html');
  }

  generateJSONReport(results) {
    const reportDir = path.join(process.cwd(), 'reports', 'json');
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(reportDir, 'test-results.json'), 
      JSON.stringify(results, null, 2)
    );
    console.log('📄 JSON Report generated: reports/json/test-results.json');
  }

  generateHTMLContent(results) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jasmine Test Report</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        .test-passed { color: #28a745; }
        .test-failed { color: #dc3545; }
        .test-skipped { color: #ffc107; }
        .spec-passed { background-color: rgba(40, 167, 69, 0.1); border-left: 4px solid #28a745; }
        .spec-failed { background-color: rgba(220, 53, 69, 0.1); border-left: 4px solid #dc3545; }
        .spec-pending { background-color: rgba(255, 193, 7, 0.1); border-left: 4px solid #ffc107; }
        
        @media (max-width: 768px) {
            .container-fluid { padding: 0.75rem !important; }
            .card-body { padding: 1rem !important; }
            h1 { font-size: 1.5rem !important; }
            .stat-card .card-body { padding: 0.75rem !important; }
        }
        
        @media (max-width: 576px) {
            .container-fluid { padding: 0.5rem !important; }
            .card-body { padding: 0.75rem !important; }
        }
    </style>
</head>
<body>
    <div class="container-fluid py-4">
        <!-- Header -->
        <div class="card mb-4">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-lg-8 col-md-7 text-center text-md-start">
                        <h1 class="mb-2 text-white"><i class="fas fa-robot me-2"></i>Jasmine Test Report</h1>
                        <p class="mb-0 text-light"><i class="fas fa-calendar me-2"></i>${results.startTime.toLocaleString()}</p>
                    </div>
                    <div class="col-lg-4 col-md-5 text-center text-md-end mt-3 mt-md-0">
                        <h3 class="mb-0 text-white">${results.summary.successRate}% Success</h3>
                        <small class="text-light">Duration: ${Math.round(results.duration / 1000)}s</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Summary Cards -->
        <div class="row mb-4 g-3">
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card stat-card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-center">
                        <i class="fas fa-list-ul fa-2x text-primary mb-2"></i>
                        <h3 class="mb-1 text-white">${results.summary.total}</h3>
                        <p class="text-light mb-0">Total Tests</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card stat-card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-center">
                        <i class="fas fa-check-circle fa-2x test-passed mb-2"></i>
                        <h3 class="mb-1 test-passed">${results.summary.passed}</h3>
                        <p class="text-light mb-0">Passed</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card stat-card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-center">
                        <i class="fas fa-times-circle fa-2x test-failed mb-2"></i>
                        <h3 class="mb-1 test-failed">${results.summary.failed}</h3>
                        <p class="text-light mb-0">Failed</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card stat-card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-center">
                        <i class="fas fa-minus-circle fa-2x test-skipped mb-2"></i>
                        <h3 class="mb-1 test-skipped">${results.summary.skipped}</h3>
                        <p class="text-light mb-0">Skipped</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Test Results -->
        <div class="row">
            <div class="col-lg-8 col-md-12 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 text-white"><i class="fas fa-clipboard-list me-2"></i>Test Results</h5>
                    </div>
                    <div class="card-body">
                        ${this.generateSuitesHTML(results.suites)}
                    </div>
                </div>
            </div>

            <!-- Environment Info -->
            <div class="col-lg-4 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 text-white"><i class="fas fa-cog me-2"></i>Environment</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <strong class="text-white"><i class="fab fa-chrome me-2"></i>Browser:</strong><br>
                            <small class="text-light">${results.environment.chrome}</small>
                        </div>
                        <div class="mb-3">
                            <strong class="text-white"><i class="fas fa-download me-2"></i>ChromeDriver:</strong><br>
                            <small class="text-light">${results.environment.chromeDriver}</small>
                        </div>
                        <div class="mb-3">
                            <strong class="text-white"><i class="fab fa-node-js me-2"></i>Node.js:</strong><br>
                            <small class="text-light">${results.environment.nodeVersion}</small>
                        </div>
                        <div class="mb-3">
                            <strong class="text-white"><i class="fas fa-desktop me-2"></i>Platform:</strong><br>
                            <small class="text-light">${results.environment.platform}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  generateSuitesHTML(suites) {
    return suites.map(suite => `
      <div class="suite-header p-3 mb-3 rounded" style="background: rgba(255, 255, 255, 0.1);">
        <h6 class="mb-2 text-white"><i class="fas fa-folder me-2"></i>${suite.description}</h6>
        <small class="text-light">
          <i class="fas fa-check test-passed me-1"></i>${suite.specs.filter(s => s.status === 'passed').length} passed
          <i class="fas fa-times test-failed ms-2 me-1"></i>${suite.specs.filter(s => s.status === 'failed').length} failed
        </small>
      </div>
      ${suite.specs.map(spec => `
        <div class="spec-item p-3 mb-2 rounded spec-${spec.status}">
          <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
              <span class="me-2">
                ${spec.status === 'passed' ? '<i class="fas fa-check-circle test-passed"></i>' : 
                  spec.status === 'failed' ? '<i class="fas fa-times-circle test-failed"></i>' : 
                  '<i class="fas fa-minus-circle test-skipped"></i>'}
              </span>
              <strong class="text-white">${spec.description}</strong>
              ${spec.failedExpectations.length > 0 ? `
                <div class="mt-2">
                  <small class="test-failed">
                    <i class="fas fa-exclamation-triangle me-1"></i>
                    ${spec.failedExpectations.map(e => e.message).join('<br>')}
                  </small>
                </div>
              ` : ''}
            </div>
            <small class="text-light">${spec.duration}ms</small>
          </div>
        </div>
      `).join('')}
    `).join('');
  }
}

module.exports = TestReporter;
