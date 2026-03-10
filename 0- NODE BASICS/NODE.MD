# Node.js Basics - Beginner's Guide

## What is Node.js?

Node.js is a JavaScript runtime that lets you run JavaScript outside the browser. Instead of running JavaScript in the browser (frontend), you can now run it on the server (backend). This means you can build entire applications using JavaScript.

**Without Node.js:** JavaScript only works in browsers
**With Node.js:** JavaScript can work on servers, create files, access databases, etc.

---

## What is NPM?

**NPM** = Node Package Manager

NPM is a package manager for Node.js. It helps you:
- Install packages/libraries that other developers created
- Manage your project dependencies
- Share your own code as packages

### npm vs Node.js
- **Node.js** = JavaScript runtime (executes code)
- **npm** = Tool to install/manage packages (libraries)

When you install Node.js, npm comes automatically installed.

---

## package.json - Your Project's Profile

`package.json` is a file that describes your project and lists all the packages (dependencies) your project needs.

```json
{
  "name": "0--node-basics",
  "version": "1.0.0",
  "description": "Learning Node.js basics",
  "author": "chandan saha",
  "type": "module",
  "main": "index.js"
}
```

**Important fields:**
- `name`: Your project name
- `version`: Version number of your project
- `type`: "module" means you can use ES6 imports, "commonjs" means you use require()
- `main`: Which file should run first
- `dependencies`: List of packages your project needs
- `devDependencies`: Packages needed only for development

### Creating package.json

```bash
npm init
```

---

## node_modules Folder

When you install a package using npm, it goes into the `node_modules` folder:

```bash
npm install express
```

This creates a `node_modules` folder containing the package and all its dependencies.

**Important:** The `node_modules` folder is usually HUGE and should be added to `.gitignore` because:
- It takes up a lot of space
- Anyone can recreate it using `npm install`
- Git doesn't need to track it

---

## package-lock.json

`package-lock.json` is automatically created when you install packages. It locks the exact versions of packages you installed.

**Why?**
- Ensures everyone working on the project uses the same package versions
- Prevents version conflicts

**You don't edit this file manually** - npm creates and updates it automatically.

---

## Installing Packages: Local vs Global

### Local Installation (Default)
Installs package only in your current project's `node_modules` folder:

```bash
npm install express
```

Use this for most packages your project depends on.

### Global Installation
Installs package on your computer, available everywhere:

```bash
npm install -g nodemon
```

Use global for tools/CLIs you want to use in terminal commands.

---

## Modules - Breaking Code Into Files

In large projects, you write code in multiple files, then import them where needed.

### Method 1: CommonJS (require/module.exports)

Export from `mod.js`:
```javascript
const pi = 3.14
const sum = (a, b) => a + b

module.exports = {
  pi: pi,
  sum: sum
}
```

Import in another file:
```javascript
const math = require("./mod.js")

console.log(math.sum(2, 2))  // 4
console.log(math.pi)          // 3.14
```

**How it works:**
- `module.exports` sends values/functions from one file
- `require()` receives them in another file
- Creates an object with all exported items

### Method 2: ES6 Modules (import/export)

Export from `mod_import.js`:
```javascript
export const pi = 3.14
export const sum = (a, b) => a + b
```

Import in another file:
```javascript
import { sum, pi } from "./mod_import.js"

console.log(sum(1, 2))  // 3
console.log(pi)         // 3.14
```

**Note:** To use ES6 imports, add `"type": "module"` in your `package.json`

### Importing Entire Folders

If you have a folder with multiple files:

```
Pokemons/
  index.js
  pikachu.js
  charizard.js
```

In `Pokemons/index.js`:
```javascript
const pikachu = require("./pikachu")
const charizard = require("./charizard")

module.exports = [pikachu, charizard]
```

Now other files can import the entire folder:
```javascript
const pokemon = require("./Pokemons")
```

---

## The Process Object

The `process` object gives you information about the current Node.js process running.

### process.argv

Returns an array of command-line arguments passed when running your file:

```javascript
console.log(process.argv)
```

Run:
```bash
node process.js hello world
```

Output:
```
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\path\\to\\process.js',
  'hello',
  'world'
]
```

The first two items are always the Node.js executable and your file path. Everything after are arguments you passed.

---

## Common npm Commands

```bash
npm init              # Create package.json
npm install           # Install all packages from package.json
npm install express   # Install a specific package
npm uninstall express # Remove a package
npm update            # Update all packages
npm -v                # Check npm version
```

---

## Summary

✅ **Node.js** = JavaScript runtime (runs outside browser)
✅ **npm** = Package manager (installs libraries)
✅ **package.json** = Project file listing dependencies
✅ **node_modules** = Folder containing installed packages
✅ **package-lock.json** = Locks package versions
✅ **Modules** = Way to organize code in multiple files
✅ **process** = Object with info about current execution

That's it! You now know the basics of Node.js. 🚀
