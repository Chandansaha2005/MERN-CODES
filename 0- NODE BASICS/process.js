// process : This object provides information about,
// and control over, the current  .

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

let args = process.argv
for(let i = 0 ; i <args.length ; i++){
    print("hello",args[i])
}

// hello C:\Program Files\nodejs\node.exe
// hello F:\WEB DEVELOPMENT\MERN\BACKEND LESSONS\NODE-BACKEND-TUTORIAL\0- NODE BASICS\process.js
// hello chandan
// hello saha
// hello is
// hello a
// hello boy