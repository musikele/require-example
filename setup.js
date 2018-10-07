const fs = require('fs');

myRequire.cache = Object.create(null); 

function myRequire(name) {   
    console.log(`Evaluating file ${name}`)
    if (!(name in myRequire.cache)) {
        console.log(`${name} is not in cache; reading from disk`)
        let code = fs.readFileSync(name, 'utf8');     
        let module = {exports: {}};
        myRequire.cache[name] = module;     
        let wrapper = Function("require, exports, module", code);     
        wrapper(myRequire, module.exports, module);
    }
    console.log(`${name} is in cache. Returning it...`)
    return myRequire.cache[name].exports;
}

const stuff = myRequire('./main.js')

console.log(stuff)