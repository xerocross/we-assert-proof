var fs = require('fs');

fs.readFile('./src/we-assert.test.ts', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    //var result = data.replace(/.\/we-assert/g, '../we-assert');
  
    fs.writeFile("./we-assert.test.ts", data, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});