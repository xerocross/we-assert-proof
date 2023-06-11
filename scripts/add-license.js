const fs = require('fs');
const path = require('path');

// Read the license banner file
const licenseBanner = fs.readFileSync(path.join(__dirname, '../LICENSE_BANNER.js'), 'utf-8');

// Read the webpack output bundle file
const bundleContent = fs.readFileSync(path.join(__dirname, '../dist/we-assert.js'), 'utf-8');

// Concatenate the license banner with the bundle content
const outputContent = `${licenseBanner}\n${bundleContent}`;

// Write the concatenated content back to the output file
fs.writeFileSync('./dist/we-assert.js', outputContent);