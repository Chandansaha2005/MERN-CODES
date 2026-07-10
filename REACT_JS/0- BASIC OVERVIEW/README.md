# React JS - Basic Overview

## What is React JS?

React JS is a JavaScript library created by Facebook. It is used to build user interfaces (UI) by making it easier to create interactive and dynamic web pages. React allows you to build complex UIs by breaking them down into smaller, reusable pieces called components.

To use React in a simple HTML file, you can include it from a CDN (Content Delivery Network):

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

---

## Why Do We Need React?

When building websites with plain JavaScript, we often need to:
- Manually update the HTML when data changes
- Write a lot of repetitive code
- Manage complex state and interactions
- Keep track of DOM updates manually

React solves these problems by:
- Automatically updating the UI when data changes
- Allowing you to write code once and reuse it many times
- Making it easier to manage how data flows in your application
- Handling DOM updates efficiently

---

## Prerequisites

Before learning React, you should know:
- **HTML basics** - Understanding HTML elements and structure
- **CSS basics** - How to style web pages
- **JavaScript basics** - Variables, functions, objects, arrays, and ES6 features like arrow functions and destructuring
- **DOM manipulation** - How JavaScript interacts with HTML (like we did with `createElement` in the example below)

---

## What is a Library?

A library is a collection of pre-written code that you can use to solve specific problems. It does one thing really well but doesn't control the entire structure of your project.

**Examples of libraries:**
- **GSAP** - A library for creating smooth animations
- **Lenis** - A library for smooth scrolling
- **React JS** - A library for building user interfaces

When using a library, you have control over your project structure. You can choose which parts of the library to use and when to use them.

---

## What is a Framework?

A framework is a complete structure that provides guidelines and tools for building applications. It controls the overall flow of your project and tells you how to organize your code.

**Examples of frameworks:**
- **Next JS** - A framework built on top of React that adds routing, server-side rendering, and more
- **Angular** - A complete framework for building web applications
- **Vue** - Another popular framework for building user interfaces

Frameworks are more opinionated than libraries. They define how your application should be structured and how different parts should work together.

---

## What's the Difference Between Library and Framework?

| Aspect | Library | Framework |
|--------|---------|-----------|
| **Control** | You control when and where to use it | Framework controls the flow of your application |
| **Flexibility** | More flexible, you decide the structure | Less flexible, follows strict rules |
| **Scope** | Solves a specific problem | Provides complete solution for building apps |
| **Learning Curve** | Easier to learn individual libraries | Takes time to learn the entire framework |
| **Examples** | GSAP, Lenis, React | Next JS, Angular, Vue |

---

## How to Create Elements Using JavaScript?

In plain JavaScript, you can create HTML elements dynamically using the `createElement()` method. Here's how:

### Example from our code:

```javascript
var h1 = document.createElement('h1')
console.log(h1)
h1.innerHTML = "Hello from js"
document.body.appendChild(h1)
```

### Breaking it down:

1. **`document.createElement('h1')`** - Creates a new h1 element in memory
2. **`console.log(h1)`** - Prints the element to see what was created
3. **`h1.innerHTML = "Hello from js"`** - Adds text content to the h1 element
4. **`document.body.appendChild(h1)`** - Adds the h1 element to the page (inside the body)

### What happens?

When you run this code, a heading "Hello from js" will appear on your web page. This is the basic concept behind React - creating and updating elements dynamically based on data.

With React, instead of manually writing all this code every time, you can describe what you want and React handles creating and updating the elements for you.

---

## Key Takeaway

React makes it easier to build complex, interactive user interfaces by letting you focus on what you want to display, rather than how to update the DOM manually.
