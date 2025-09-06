#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ReportGenerator {
  constructor() {
    this.reportsDir = path.join(process.cwd(), 'reports');
    this.htmlDir = path.join(this.reportsDir, 'html');
    this.jsonDir = path.join(this.reportsDir, 'json');
  }

  generateDashboard() {
    console.log('🚀 Generating Modern Test Dashboard...');
    
    // Ensure directories exist
    [this.htmlDir, this.jsonDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Read test results if available
    let testResults = null;
    const resultsFile = path.join(this.jsonDir, 'test-results.json');
    
    if (fs.existsSync(resultsFile)) {
      testResults = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    }

    // Generate dashboard HTML
    const dashboardHTML = this.generateDashboardHTML(testResults);
    fs.writeFileSync(path.join(this.htmlDir, 'dashboard.html'), dashboardHTML);

    // Generate index file
    const indexHTML = this.generateIndexHTML();
    fs.writeFileSync(path.join(this.htmlDir, 'index.html'), indexHTML);

    console.log('✅ Dashboard generated successfully!');
    console.log(`📊 View reports at: file://${this.htmlDir}/index.html`);
    console.log(`🌐 Or run: npm run serve:report`);
  }

  generateDashboardHTML(testResults) {
    const stats = testResults ? testResults.summary : {
      total: 0, passed: 0, failed: 0, skipped: 0, successRate: 0
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automation Test Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .dashboard-card { backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.95); }
        .stat-card { transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .glass-effect { backdrop-filter: blur(15px); background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); }
        .gradient-text { background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
</head>
<body>
    <div class="container-fluid py-5">
        <!-- Header -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-10">
                <div class="card dashboard-card border-0 shadow-lg">
                    <div class="card-body p-5 text-center">
                        <h1 class="display-4 gradient-text mb-3">
                            <i class="fas fa-robot me-3"></i>Automation Test Dashboard
                        </h1>
                        <p class="lead text-muted">Modern Test Reporting for Jasmine Web Automation</p>
                        <div class="row mt-4">
                            <div class="col-md-4">
                                <i class="fas fa-flask fa-2x text-primary mb-2"></i>
                                <h5>Framework</h5>
                                <small class="text-muted">Jasmine + Protractor</small>
                            </div>
                            <div class="col-md-4">
                                <i class="fas fa-layer-group fa-2x text-success mb-2"></i>
                                <h5>Pattern</h5>
                                <small class="text-muted">Page Object Model</small>
                            </div>
                            <div class="col-md-4">
                                <i class="fas fa-globe fa-2x text-info mb-2"></i>
                                <h5>Target</h5>
                                <small class="text-muted">automationexercise.com</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-10">
                <div class="row g-4">
                    <div class="col-md-3">
                        <div class="card stat-card border-0 h-100 glass-effect text-white">
                            <div class="card-body text-center">
                                <i class="fas fa-list-ul fa-3x mb-3"></i>
                                <h2>${stats.total}</h2>
                                <p class="mb-0">Total Tests</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card border-0 h-100 glass-effect text-white">
                            <div class="card-body text-center">
                                <i class="fas fa-check-circle fa-3x mb-3 text-success"></i>
                                <h2 class="text-success">${stats.passed}</h2>
                                <p class="mb-0">Passed</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card border-0 h-100 glass-effect text-white">
                            <div class="card-body text-center">
                                <i class="fas fa-times-circle fa-3x mb-3 text-danger"></i>
                                <h2 class="text-danger">${stats.failed}</h2>
                                <p class="mb-0">Failed</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card border-0 h-100 glass-effect text-white">
                            <div class="card-body text-center">
                                <i class="fas fa-percentage fa-3x mb-3 text-warning"></i>
                                <h2 class="text-warning">${stats.successRate}%</h2>
                                <p class="mb-0">Success Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-10">
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="card dashboard-card border-0 shadow-lg">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-chart-pie me-2"></i>Test Results Distribution</h5>
                                <canvas id="pieChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card dashboard-card border-0 shadow-lg">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-chart-bar me-2"></i>Success Rate</h5>
                                <canvas id="barChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reports Links -->
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card dashboard-card border-0 shadow-lg">
                    <div class="card-body p-4">
                        <h5 class="card-title mb-4"><i class="fas fa-file-alt me-2"></i>Available Reports</h5>
                        <div class="row g-3">
                            <div class="col-md-4">
                                <a href="test-report.html" class="btn btn-primary w-100 py-3">
                                    <i class="fas fa-file-code me-2"></i>
                                    Detailed HTML Report
                                </a>
                            </div>
                            <div class="col-md-4">
                                <a href="../json/test-results.json" class="btn btn-secondary w-100 py-3" target="_blank">
                                    <i class="fas fa-code me-2"></i>
                                    JSON Test Results
                                </a>
                            </div>
                            <div class="col-md-4">
                                <a href="#" onclick="alert('Run: npm run allure:serve')" class="btn btn-info w-100 py-3">
                                    <i class="fas fa-chart-line me-2"></i>
                                    Allure Report
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Pie Chart
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Passed', 'Failed', 'Skipped'],
                datasets: [{
                    data: [${stats.passed}, ${stats.failed}, ${stats.skipped}],
                    backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Bar Chart
        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Success Rate'],
                datasets: [{
                    label: 'Percentage',
                    data: [${stats.successRate}],
                    backgroundColor: ['#667eea'],
                    borderRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    </script>
</body>
</html>`;
  }

  generateIndexHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automation Test Reports</title>
    <meta http-equiv="refresh" content="0; url=dashboard.html">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container { text-align: center; }
        .spinner { 
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Redirecting to Test Dashboard...</h1>
        <div class="spinner"></div>
        <p>If not redirected, <a href="dashboard.html" style="color: white;">click here</a></p>
    </div>
</body>
</html>`;
  }
}

// Execute if run directly
if (require.main === module) {
  const generator = new ReportGenerator();
  generator.generateDashboard();
}

module.exports = ReportGenerator;
