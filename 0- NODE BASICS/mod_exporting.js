// Here we are exporting Functions and objects from mod.js using 
// "module.exports"

const ex = require("./mod") // will print 5
console.log(ex)

//"require() : It is a built in function to include 
// external modules that exist in separate files"

console.log(ex.sum(2,2)) // using the Function that we are exporting