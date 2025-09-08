## 1: Difference between var, let, and const
        **var** → Function-scoped, can be redeclared & updated.  
        **let** → Block-scoped, can be updated but not redeclared in the same scope.  
        **const** → Block-scoped, cannot be updated or redeclared (value fixed).  

## 2: Difference between map(), forEach(), and filter()
        **map()** → Returns a new array after applying a function to each element.  
        **forEach()** → Loops through elements but returns nothing.  
        **filter()** → Returns a new array with elements that pass a condition.

## 3: Arrow Functions in ES6

        **Short way to write functions ✍️
        **Do not have their own this (helpful in some cases)
        **example:
        // Normal function
        function add(a, b) {
                return a + b;
        }

        // Arrow function
        const add = (a, b) => a + b;

## 4: Destructuring Assignment

        **Extract values from arrays/objects easily:

        const [a, b] = [1, 2];
        const {name, age} = person;

## 5: Template Literals
        **Template literals in ES6 use backticks (`) to create strings. They allow embedding variables and expressions inside ${ }, and also support multi-line strings.
        
                Difference from string concatenation:

                **Template literals are more readable and cleaner.
                **No need for + to join strings.
                **Support multi-line strings without \n.

                👉 Example:
                let name = "Ali";
                let age = 22;
                
                console.log(`Hello ${name}, you are ${age} years old.`); // Template literal
                console.log("Hello " + name + ", you are " + age + " years old."); // Concatenation




