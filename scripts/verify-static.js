const fs = require('fs');
const required = ['index.html', 'src/main.js', 'src/styles.css'];
for (const file of required) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.trim()) throw new Error(`${file} is empty`);
}
const html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('src/main.js') || !html.includes('src/styles.css')) {
  throw new Error('index.html must load the static reader assets');
}
console.log('Static assets verified');
