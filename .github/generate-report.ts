import fs from 'fs';

const results = JSON.parse(fs.readFileSync('results.json', 'utf8'));

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Test Report</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #111; color: #fff; }
    .test { margin: 10px 0; padding: 10px; border-radius: 8px; }
    .passed { color: #4ade80; }  /* green */
    .failed { color: #f87171; }  /* red */
  </style>
</head>
<body>
  <h1>🧪 Playwright Test Report</h1>
  ${results.suites
    .flatMap((suite: any) => suite.specs)
    .map((spec: any) => {
        const test = spec.tests[0];
        const status = test.results[0].status;
        const icon = status === 'passed' ? '✔' : '✖';
        const className = status === 'passed' ? 'passed' : 'failed';
        return `<div class="test ${className}">${icon} ${spec.title}</div>`;
    })
    .join('')}
</body>
</html>
`;

fs.writeFileSync('public/report.html', html);
console.log('✅ Report generated: public/report.html');
