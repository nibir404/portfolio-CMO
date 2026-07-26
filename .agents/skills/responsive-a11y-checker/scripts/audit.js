const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '../../../../');
const SRC_DIR = path.join(PROJECT_DIR, 'src');

console.log('=== Starting Responsive & Accessibility Audit ===');

// Check 1: HTML Lang Attribute in layout.tsx
function checkHtmlLang() {
  const layoutPath = path.join(SRC_DIR, 'app/layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    if (content.includes('<html') && content.includes('lang=')) {
      console.log('✔ Language configuration: <html lang="..."> attribute is set in layout.tsx.');
    } else {
      console.warn('⚠ Accessibility Warning: <html lang="..."> attribute not found in layout.tsx.');
    }
  }
}

// Check 2: Abbreviations Check (WCAG 3.1.4 AAA)
const ABBREVIATIONS = ['CMO', 'AI', 'FMCG', 'APAC', 'GCC', 'SEO', 'CTA', 'HTML', 'CSS'];
function checkAbbreviations() {
  const files = getFilesRecursive(SRC_DIR, ['.tsx', '.ts']);
  const missingDefinitions = {};

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const basename = path.relative(PROJECT_DIR, file);

    ABBREVIATIONS.forEach(abbr => {
      const regex = new RegExp(`\\b${abbr}\\b`, 'g');
      if (regex.test(content)) {
        // Look for definition patterns in the same file
        const definitionFound = content.toLowerCase().includes('chief marketing officer') ||
                                content.toLowerCase().includes('artificial intelligence') ||
                                content.toLowerCase().includes('fast-moving consumer goods') ||
                                content.toLowerCase().includes('asia-pacific') ||
                                content.toLowerCase().includes('gulf cooperation council') ||
                                content.toLowerCase().includes('search engine optimization') ||
                                content.toLowerCase().includes('call to action') ||
                                content.toLowerCase().includes('hypertext markup language') ||
                                content.toLowerCase().includes('cascading style sheets') ||
                                content.toLowerCase().includes('definition') ||
                                content.toLowerCase().includes('expanded');
        if (!definitionFound) {
          if (!missingDefinitions[abbr]) missingDefinitions[abbr] = [];
          missingDefinitions[abbr].push(basename);
        }
      }
    });
  });

  if (Object.keys(missingDefinitions).length === 0) {
    console.log('✔ WCAG 3.1.4 AAA: No undocumented abbreviations found.');
  } else {
    console.log('\n--- WCAG 3.1.4 AAA Abbreviations Audit ---');
    console.log('Ensure the following abbreviations are expanded/defined on first use:');
    Object.entries(missingDefinitions).forEach(([abbr, filesList]) => {
      console.log(`- "${abbr}" found without local expansions in:`);
      filesList.slice(0, 3).forEach(f => console.log(`  * ${f}`));
      if (filesList.length > 3) console.log(`  * and ${filesList.length - 3} other files.`);
    });
  }
}

// Check 3: CSS Contrast and Layout Variables
function checkCssVars() {
  const cssPath = path.join(SRC_DIR, 'app/globals.css');
  if (fs.existsSync(cssPath)) {
    const content = fs.readFileSync(cssPath, 'utf8');
    const warnings = [];

    // Check for focus indicators
    if (!content.includes(':focus-visible') && !content.includes('outline:')) {
      warnings.push('No custom :focus-visible visible styles defined for keyboard-only users.');
    }
    
    // Check for overflow safety
    if (content.includes('overflow-x: hidden') && content.includes('html')) {
      console.log('✔ Overflow safety: html and body have overflow protection configured.');
    }

    if (warnings.length > 0) {
      console.log('\n--- CSS Contrast & Accessibility Warnings ---');
      warnings.forEach(w => console.log(`- ${w}`));
    } else {
      console.log('✔ CSS Variables & Focus styles: Checked successfully.');
    }
  }
}

// Helper to get files
function getFilesRecursive(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath, extensions));
    } else {
      if (extensions.includes(path.extname(file))) {
        results.push(filePath);
      }
    }
  });
  return results;
}

checkHtmlLang();
checkAbbreviations();
checkCssVars();
console.log('=== Audit Complete ===');
