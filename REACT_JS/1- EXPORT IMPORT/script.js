console.log(a) // not possible as the variable is in another file 

import a from './test1.js'
console.log(a) // will print 10 
//Default export from default.js




//Named export from named.js
// import {age} from './named.js'
// import {sub} from './named.js'
// or
import { age, sub } from './named.js'

console.log(age) //21
console.log(sub) //(3) ['math', 'english', 'com. science']


