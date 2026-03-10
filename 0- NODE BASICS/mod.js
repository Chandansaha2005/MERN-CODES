// Suppose we have some functions and variables that we are using
// in multiple. Files so Instead of writing those functions. We can 
// just write it once in a single file and export the functions. 
// All the variables From that file to another file Using module.export

// We are using mod.js & mod_exporting.js To demonstrate this process.

//module.exports=5 //"module.exports Creates the object In this file"
// If the file that we are using to export This module have const ex = require("./mod") // will print 5

// module.exports sends an object If we don't have anything. In the main file we will have a blank object like this - {} 

// Just like that For exporting multiple files and variables, we can create a object of files and variables

const pi = 3.14
const sm = (a, b) => a + b

const ob = {
    pi : pi,
    sum : sm
};

module.exports=ob  // this will send "{ pi: 3.14, sum: [Function: sm] } to the file that requires it"

// we can also write it like this :-

// const pi = 3.14
// const sm = (a, b) => a + b  

// module.exports.ob = {
//     pi : pi,
//     sum : sm
// };

// module.exports.pi = 3.14
// module.exports.sm = (a, b) => a + b

// exports.pi = 3.14
// exports.sm = (a, b) => a + b

