// process : This object provides information about,
// and control over, the current Node.js process.

// process.argv : returns an array containing the 
// command-line arguments passed when the Node.js
// process was launched.

let print = console.log;
print(process.argv) 

// node process.js
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'F:\\WEB DEVELOPMENT\\MERN\\BACKEND LESSONS\\NODE-BACKEND-TUTORIAL\\0- NODE BASICS\\process.js'
// ]

// node process.js chandan saha is a boy
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'F:\\WEB DEVELOPMENT\\MERN\\BACKEND LESSONS\\NODE-BACKEND-TUTORIAL\\0- NODE BASICS\\process.js',      
//   'chandan',
//   'saha',
//   'is',
//   'a',
//   'boy'
// ]
