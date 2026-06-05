const fs = require('fs');

const voidContent = fs.readFileSync('app/components/VoidBackground.tsx', 'utf8');

let newContent = voidContent
  .replace(/147, 51, 234/g, '0, 255, 255')   // Base purple to Cyan/Tenno blue
  .replace(/168, 85, 247/g, '0, 200, 255')   // Lighter purple to deep cyan
  .replace(/192, 132, 252/g, '120, 255, 255'); // Lightest purple to bright pale cyan

fs.writeFileSync('app/components/VoidBackground.tsx', newContent);
console.log('Done!');
