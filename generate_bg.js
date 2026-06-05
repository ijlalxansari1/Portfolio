const fs = require('fs');

const lokiContent = fs.readFileSync('app/components/LokiMultiverseBackground.tsx', 'utf8');

// TVA
const tvaSlides = `  const slides = [
    '/tva/tva2.png',
    '/tva/tva3.png',
    '/tva/tva4.png',
    '/tva/tva5.png',
    '/tva/tva6.png',
    '/tva/tva7.png',
    '/tva/tva9.png',
    '/tva/tva10.png',
    '/tva/tva11.png',
    '/tva/tva12.png',
  ];`;

let tvaContent = lokiContent
  .replace(/LokiMultiverseBackground/g, 'TvaBackground')
  .replace(/\"loki\"/g, '\"tva\"')
  .replace(/'loki'/g, "'tva'")
  .replace(/const slides = \[[\s\S]*?\];/, tvaSlides)
  .replace(/\/loki\/slide1\.png/g, '/tva/tva9.png')
  // Colors: 16, 163, 74 -> 255, 140, 0
  .replace(/16,\s*163,\s*74/g, '255, 140, 0')
  // Gradient stops for magic
  .replace(/20,\s*180,\s*120/g, '255, 160, 50')
  .replace(/120,\s*200,\s*20/g, '255, 200, 0')
  // Orbital trail
  .replace(/16,\s*255,\s*90/g, '255, 140, 0');

fs.writeFileSync('app/components/TvaBackground.tsx', tvaContent);

// VOID
const voidSlides = `  const slides = [
    '/images/loki-slide7.png',
    '/loki/slide1.png',
    '/images/loki-slide6.png',
    '/loki/slide4.png',
    '/tva/tva1.png',
  ];`;

let voidContent = lokiContent
  .replace(/LokiMultiverseBackground/g, 'VoidBackground')
  .replace(/\"loki\"/g, '\"void\"')
  .replace(/'loki'/g, "'void'")
  .replace(/const slides = \[[\s\S]*?\];/, voidSlides)
  .replace(/\/loki\/slide1\.png/g, '/images/loki-slide7.png')
  // Colors: 16, 163, 74 -> 147, 51, 234 (Purple)
  .replace(/16,\s*163,\s*74/g, '147, 51, 234')
  // Gradient stops for magic
  .replace(/20,\s*180,\s*120/g, '168, 85, 247')
  .replace(/120,\s*200,\s*20/g, '192, 132, 252')
  // Orbital trail
  .replace(/16,\s*255,\s*90/g, '147, 51, 234');

fs.writeFileSync('app/components/VoidBackground.tsx', voidContent);
console.log('Done!');
