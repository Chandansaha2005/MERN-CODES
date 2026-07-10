# Export and Import in JavaScript

## What is Export and Import?

Export and Import are used to share code between different files. They allow you to:
- Write code once in one file
- Use that code in other files
- Keep your code organized and modular

Think of it like this: if you have a useful function or variable in one file, you can export it so other files can import and use it.

---

## Why Use Export and Import?

When building large applications, you don't want to write all your code in a single file. Instead, you:
- Organize code into separate files by purpose or feature
- Make each file responsible for one thing
- Reuse code across multiple files
- Make your code easier to maintain and update

---

## Two Types of Exporting

### 1. Named Export

With named exports, you export specific variables, functions, or objects with their names. When importing, you must use the same names inside curly braces.

#### Example - Exporting (named.js):

```javascript
export const age = 21
export const name = 'Chandan saha'
export const sub = ['math', 'english', 'com. science']
```

Here we are exporting three separate items with specific names: `age`, `name`, and `sub`.

#### Example - Importing (script.js):

```javascript
import { age, sub } from './named.js'

console.log(age)  // Output: 21
console.log(sub)  // Output: ['math', 'english', 'com. science']
```

**Important rules for named imports:**
- You must use curly braces `{ }`
- The names must match exactly what was exported
- You can import one or multiple items
- You can import them in any order

---

### 2. Default Export

With default export, you export only one thing per file as the "default". When importing, you can give it any name you want.

#### Example - Exporting (default.js):

```javascript
var pokemon = 'pikachu'
export default pokemon
```

Here we are exporting one item as the default export. There can only be one default export per file.

#### Example - Exporting (test1.js):

```javascript
const a = 10
export default a
```

#### Example - Importing (script.js):

```javascript
import pokemon from './default.js'
console.log("who's this pokemon?!!!!!")
console.log("it's", pokemon)  // Output: it's pikachu
```

```javascript
import a from './test1.js'
console.log(a)  // Output: 10
```

**Important rules for default imports:**
- You don't use curly braces `{ }`
- You can name it anything you want
- Each file can have only ONE default export
- The name you use when importing doesn't have to match the exported name

---

## Comparison: Named vs Default Export

| Aspect | Named Export | Default Export |
|--------|--------------|-----------------|
| **Number per file** | Multiple (many named exports) | Only one per file |
| **Import syntax** | `import { name } from './file'` | `import name from './file'` |
| **Curly braces** | Required | Not used |
| **Name matching** | Must match exported name | Can use any name |
| **Use case** | Exporting multiple items | Exporting one main item |

---

## Real-World Example

Let's say you have a file called `user.js` that contains user information:

```javascript
// user.js
export const userName = 'John'
export const userAge = 25
export const getUserInfo = () => {
  return `${userName} is ${userAge} years old`
}
```

And you want to use this in your main file `app.js`:

```javascript
// app.js
import { userName, userAge, getUserInfo } from './user.js'

console.log(userName)      // Output: John
console.log(userAge)       // Output: 25
console.log(getUserInfo()) // Output: John is 25 years old
```

---

## Another Example - Default Export

```javascript
// message.js
const greeting = 'Welcome to React'
export default greeting
```

```javascript
// main.js
import myGreeting from './message.js'
console.log(myGreeting)  // Output: Welcome to React
```

Notice how we named it `myGreeting` instead of `greeting`. With default exports, the import name can be different from the export name.

---

## Common Mistake to Avoid

**Wrong** - Using curly braces with default import:
```javascript
import { pokemon } from './default.js'  // This won't work!
```

**Correct** - No curly braces for default import:
```javascript
import pokemon from './default.js'  // This works!
```

---

## Key Takeaway

- Use **named exports** when you want to export multiple related items from a file
- Use **default export** when you want to export one main thing from a file
- Always remember: named exports need curly braces, default exports don't
- Proper use of export and import keeps your code organized and reusable
