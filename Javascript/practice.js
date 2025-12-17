"use strict";
import SCRIPTS from "./SCRIPTS.js";
//*         ARRAYOLOGY. 
//TODO: The reverseArray takes an array as argument and produces a new array that has the same elements in the inverse order.

function reverseArray(arr) {
  "use strict";
  let newArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    let item = arr[i];
    newArr.push(item);
  }
  return newArr;
}

function reverseArrayInPlace(arr) {
    //Go through the front of the array and grab the preceeding half
    let j = arr.length-1;
    for (let i = 0; i < arr.length / 2; i++) {
      let frntItem = arr[i];
      arr[i]= arr[j];
      arr[j]= frntItem;
      j--;
      }
    return arr
}
//? THE DIFFERENCE BETWEEN ARRAY AND LIST
//  Write a function arrayToList. Also write a listToArray function
//  that produces an array from a list. 
//  element) or undefined when there is no such element.
//  If you haven’t already, also write a recursive version of nth

function arrayToList(arr) {
  let rest = null;
  let list = {};
  for (let i = arr.length - 1; i >= 0; i--) {
    list.value = arr[i];
    list.rest = rest;
    rest = list;
    list = {};
  }
  return rest;
}

function listToArray(list) {
  let arr = [];
  for (let node = list; node; node = node.rest) {
    arr.push(node.value)
  }
  return arr
}

//? DEEP COMPARISON

















//*         HIGHER ORDER FUNCTIONS
//1. Functions that create other functions.
function greaterThan(n) {
  return b => b > n
}

//2. Functions that change other functions.
function noisy (f) {
  return (...args) => {
    let result = f(...args);
    return result; 
  }
}

//3. Functions that provide a new type of control flow.
function unless (test, then) {
  if (!test) then();
}

//? FUNCTIONS AS A TOOL FOR DATA PROCESSING
//Sample Data
//1. Filtering Arrays
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test (element)) {
      passed.push(element);
    }
  }
  return passed
}

//2. Transforming with map
function map (array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

//3. Summarizing with Reduce or Fold
function reduce (array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(element, current);
  }
  return current;
}

function characterCount (script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from)
  }, 0)
}

//4. Composability -- composing operations e.g. filter and find the average of all living languages in an array.
function average (array) {
  return array.reduce((a, b) => a+b) / array.length;
}

function characterScript (code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    }))
  {return script.name}
  }
  return null;
}

//5. flattening

// EXERCISE: Use the reduce method with the concat method to "flatten" an array of arrays into a single array.
function flatten (arr) {
  return arr.reduce((a,b) => {
    let c = [];
    c = a.concat(b);
    return c;
  })
}

// EXERCISE: Write a higher order function that takes a value, a test fuction, an update function. 
function loopity (value, test, update, body) {

}

//EXERCISE:  Everything Analogous to the some method, arrays also have an every method. This one returns true when the given function returns true for every element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator. Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method

function every(arr, operation) {
  for(element of arr) {
    if(operation(element)== false) {
      return false;
    }
  }
  return true;
}



//*          OBJECT ORIENTED PROGRAMMING
/* The core idea in object-oriented programming is to divide programs into smaller pieces and make each piece responsible for managing its own state.
Such program pieces are modeled using objects. Their interface consists of a
specific set of methods and properties. Properties that are part of the interface are called public. The others, which outside code should not be touching, are called private.*/

//    *Encapsulation --
/* Separating interface from implementation is a great idea. It is usually called encapsulation.*/


//    *Methods -- Methods are properties that hold function values.
/* The speak method is a property of the rabbit object that holds a function.*/
let rabbit = {};
rabbit.speak = (line) => {
  console.log(`The rabbit says '${line}'`)
};

//    *Prototypes -- Prototypes contain backup for properties that certain objects must have aside their properties that may be listed. These backups may sometimes also have backup.
let empty = {};
empty.toString; //--> Output function toString() As though it has the method toString even though it is empty so the toString is in the prototype.
// console.log(Object.getPrototypeOf({}) == Object.prototype);
//So we can use the Object.create(***prototype you want to create***) to create a prototype.

//    *Classes
/*The prototype system to create prototypes and transfer them is outdated so in comes classes. 
A class defines the methods and properties of an object. The object is called an instance of a class. Prototypes are useful for defining properties for which all instances of a classs share.
Properties that differ should be stored in the object instance itself.
For example a class of animals can have an object rabbit with the rabbit named rabit but as the prototype all animals have a name probably undefined or general so once the rabbit name is changed to rabbit that is stored in the instance. */
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
  }
};
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}


//    *Class Notation -- 
//The class keyword starts the declaration. The constructor provides the constructor function which will be bound to the instance of the class. The others are packaged into the constructors prototype. 

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black")


//      *Overriding derived properties --
/*When you add a property to an object the property is added to the object itself. 
If that property existed in the prototype it will still be there but will not work on the object.*/

Rabbit.prototype.teeth = 'small';
killerRabbit.teeth = 'long and sharp'
/* console.log(killerRabbit.teeth) vs console.log(blackRabbit.teeth) The killer rabbit has a different teeth because it is no longer using the prototype teeth.*/


//    *Maps -- 
//A map is a data structure that associates values(keys) with other values. Objects are used for mapping. e.g let ages ={kevin: 30, sandra: 25, Lydia: 19}. Using plain objects as maps is dangerous. Below is how to safely create the map::::

//If you pass null to Object.create, the resulting object will not derive from the Object.prototype.
/*e.g
const ages = Object.create(null);
*/
//Object property names must be string. If you need a map whose keys can't be easily convertedto strings such as objects you cannot use an object as your map.
//Fortunately Js comes with a class called Map that is written for this.
let ages = new Map();
ages.set("Isaac", 22);
ages.set("Chris", 17);
ages.set("NanaKofi", 14);


/* console.log(`Isaac is ${ages.get("Isaac")}`);
/ console.log(ages.has("Chris"))*/


//     *Polymorphism -- 
/* Polymorphism is mutating a standard prototype of your object to suit the instance so that the method is suited to that particular instance. 
*/
Rabbit.prototype.toString = function() {
  return  `a ${this.type} rabbit`;
}
/*console.log(String(blackRabbit));*/ 


//      *Symbols --
/* Symbols are property names. It is possible for multiple interfaces to use the same property name for different things. 
So the name of the rabbit which falls under *Animal can be different from the name of the rabbit which falls under *Pet (saying this because we can have an animal which is rabbit and maybe wild rabbit but a pet name probably Toby. but one rabbit instance falls under both so what name would be chosen. That is why we use symbols.
*/
let sym = Symbol("name");
// console.log(sym == Symbol("name"));
Rabbit.prototype[sym] = "Rabbit";
/*
console.log(blackRabbit[sym])
*/
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};
/*
console.log([1,2].toString())
console.log([1,2,3][toStringSymbol]())
*/

//      *The Iterator Interface--
/*
The object given to a for/of loop is expected to be iterable.
e.g for (let char of "Hello World" ){console.log(char)};
so the string is iterable. This means that string class has a method named with the Symbol.iterator symbol. 
When called the method should return an object that provides a second interface, iterator. This is the actual thing that iterates. 

It has a next method that returns the next result. That result should be an object with a value property that provides the next value if there is one.

And a done property which should return true when there are no more results and false otherwise.
*/
let ok = "hello";
/*
let okIterator = ok[Symbol.iterator]();
console.log(okIterator.next());
 */


class Matrix {
  constructor(width, height, element = (x, y) => undefined){
    this.height = height;
    this.width = width;
    this.content = [];
  
    for (let y = 0; y < height; y++){
      for (let x = 0; x < width; x++){
        this.content[y * width + x] = element(x,y);
      }
    }
  }

  get (x, y) {
    return this.content[y * this.width + x];
  }

  set (x, y, value) {
    this.content[y * this.width + x] = value;
  }

}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return { done: true };
    let value = { x: this.x, y: this.y, value: this.matrix.get(this.x, this.y) };

    this.x++;

    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }

    return { value, done: false };
  }
}

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
}

let matrix = new Matrix(3, 3,(x, y) => `coords: row: ${y} column: ${x}`);

/*
console.log(matrix);

console.log(`The length of the matrix content is ${matrix.content.length}`);

for (let {x, y} of matrix){
  console.log(x, y)
}
*/



//      *Getters , Setters, and Statics -- Getters allow you to get values that would usually not be part of the constructors and may not be critical to the class but are helpful. Setters allow you to manipulate values in the objects and static allows you to create new instances without the new in a different way than the usual.
/*
 */

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  set fahrenheit(value) {
    return this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8)
  }

}

/*
//let temp = Temperature.fromFahrenheit(212);
//console.log(temp) //-->Output Temperature { celsius: 100 }

let temp = new Temperature(100);
console.log(temp.fahrenheit); // --> Output 212
temp.fahrenheit = 71.6
console.log(temp)// --> Output Temperature { celsius: 21.999999999999996 }
 */

//      *Inheritance -- If we need a data structure that already exists but want to modify the prototypes we use inheritance. You are in short creating a new class with new definitions for some properties.

class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super (size, size, (x, y) => {
      if (x < y) return element (y, x);
      else return element (x, y);
    });
  }

  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}
/*
The use of the word extends indicates that this class shouldn't be directly based on the default Object prototype but on some other class.
To initialize a subclass instance the parent class called the superclass constructor is called through the super keyword.
*/


let symMatrix = new SymmetricMatrix(3, (a, b) => (`coords: col: ${a}, row: ${b};`));
/*
symMatrix.set(1, 1, "Cancelled");
console.log(symMatrix)
*/


//      *The Instanceof Operator --

// Occasionally used to determine the class of an object.
/*console.log(symMatrix instanceof Matrix); //-->true
console.log(symMatrix instanceof SymmetricMatrix); // --> true
console.log(matrix instanceof SymmetricMatrix); // --> false
console.log(matrix instanceof Matrix); // --> true
console.log([] instanceof Array); //--> true
*/



 /*EXERCISE: -Write a class Vec that represents a vector in two-dimensional space. 
 -It takes x and y parameters (numbers), which it should save to properties of the same name.
 -Give the Vec prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (this and the parameter) x and y values.
 -Add a getter property length to the prototype that computes the length 
*/
class Vec {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    let x = this.x + vec.x;
    let y = this.y + vec.y;
    return new Vec(x, y);

  }

  minus(vec) {
    let x = this.x - vec.x;
    let y = this.y - vec.y;
    return new Vec (x, y)
  }

  get length() {
    return (Math.sqrt(((this.x**2)+(this.y**2))))
  }
}

// let vector1 = new Vec(2,4);
// let vector2 = new Vec(3,-6);

// console.log(vector2.length)
// console.log(vector1.plus(vector2))

//        *GROUPS --The standard Js provides another data structure called set. A set holds a collection of values.  A value can be part of a set only once.

/* Write a class called Group (since Set is already taken). 
-Like Set, it has add, delete, and has methods. Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group. Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same. Give the class a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it.

*/

class Group{
  constructor(...items){
    this.group = {};
    items.forEach(element => {
      this.add(element)
    });
  };
  
  add(...something) {
    let status = [];
    something.forEach(element => {
      if (this.group.hasOwnProperty(element)){
        status.push(false)
      }else {
        this.group[element] = true;
        status.push(true)
      }
    }); 
    return status;
  }
  
  delete(...something) {
    let status = [];
    something.forEach(element => {
      if (this.group.hasOwnProperty(element)) {
        delete this.group[element];
        status.push(true);
      }else {
        status.push(false);
      }
    });
    return status;
    
  }
  
  has(something) {
    if(this.group.hasOwnProperty(something)) {
      return true
    }else {
      return false
    }
  }
}

/* Make the Group class from the previous exercise iterable. 
Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.
 If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.
 It is okay if your iterator behaves strangely when the group is modified during iteration.
*/

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
    this.keys = Object.keys(this.group.group);
  }

  next() {
    if (this.position == this.keys.length) return { done: true };
    
    let value = this.keys[this.position];
    this.position++
    return {value, done: false}
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this)
}




//        *THE ROBOT PROJECT
/* The state of objects is defined by their properties and their connections to other Objects, the behavior of Objects by their methods.

The task is to distribute parcels to the places in a village.

- Our robot will be moving around the village. There are parcels in various places, each addressed to some other place. 
- The robot picks up parcels when it comes to them and delivers them when it arrives at their destinations.
- The automaton must decide, at each point, where to go next. It has finished its task when all parcels have been delivered.
- To be able to simulate this process, we must define a virtual world that can describe it. This model tells us where the robot is and where the parcels are.
- When the robot has decided to move somewhere, we need to update the model to reflect the new situation.


- Instead, let’s condense the village’s state down to the minimal set of values that define it. 
- There’s the robot’s current location and the collection of unde
livered parcels, each of which has a current location and a destination address.
-  let’s make it so that we don’t change this state when the robot moves but rather compute a new state for the situation after the move.

*/

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Town Hall",
  "Marketplace-Shop",
  "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdge(from, to) {
    if(graph[from] == null) {
      graph[from] = [to];
    }else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcel) {
    this.place = place;
    this.parcel = parcel;
  }

  move (destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if(p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place !=p.address);
      return new VillageState(destination, parcels)
    }
  }
}
//        *Persistent Data
/*Data structures that don't change are called immutable or persistent.
Object.freeze changes an object so that writing to it's properties is ignored. Freezing does not require the computer to do some extra work.

This is about complexity management.

*/

//        *Simulation
/* A delivery bot looks at the world and decides in which direction it wants to move. As such we could say that a robot is a function that takes a villageState object and returns the name of a nearby place.

*/

//        *The Mail Truck's Route

//        *PathFinding


//        *EXERCISES



//*                     BUGS AND ERRORS
/* Flaws in computer programs are called bugs. It makes programmers feel good to imagine them as little things that just happen to crawl into our work.
Bugs can often be categorized into those caused by thoughts and those caused by mistakes introduced while converting a thought into code.
We put the bugs there.

*/
//*                     LANGUGE

/* JavaScript's looseness is a hindrance to the computer automatically pointing out many of our mistakes. Its concept of bindings and properties is vague enough that it will rarely catch typos before running the program. And it allows many nonsensical computations such as "true * 'monkey'".
Js will complain about a program that does not follow the languages grammar. It will also complain about calling something that is not a function, looking up a property on an undefined value.

The process of finding mistakes -bugs - in programs is called debugging.

*/


//*                     STRICT MODE
/* JavaScript can be made a little stricter by enabling strict mode. This is done by putting the string "use strict" at the top of a file or a function body.

Strict mode disallows giving a function multiple parameters with the same name and removes certain problematic language features entirely(such as with statement.)

*/
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

// canYouSpotTheProblem() //Normally when you forget to put let in front of your binding. Js quietly creates a global binding and uses that. 


//*                     TYPES
/*Some languages want to know the types of all your bindings and expressions before even running a program. They will tell you right away when a type is used in an incosistent way.

One thing about types is that they need to introduce their own complexity to be able to describe enough code to be useful.

When the types of a program are known it is possible for the computer to check them for you. 

You'd need to introduce a type variable, T, which can stand in for any type so that you can give randomPick a type ([T]) if randomPick is a function that returns a random element from an array.

*/

//*                     TESTING
/* Sometimes we have to find the mistakes ourselves and by running the program and checking the results we can do that. But doing this is a bad idea.
Computers are good at repetitive tasks and testing is the ideal repetitive task. Automated testing is the process of writing a program that tests another program. 
Writing tests is a bit more work than testing manually. but once you've done it, you gain a kind of superpower: it takes you only few seconds to verify that your program still behaves properly in all situations you wrote tests for. 
There are applications for testing which are called test runners. The more external objects that the code interacts with, the harder it is to set up the context in which to test it.

*/

//*                     DEBUGGING


//*                     ERROR PROPAGATION
/* If your code communicates with the outside world then sometimes it may recieve malformed input, to become overloaded with work or to have the network fail. 

Sometimes the best thing to do is to take the bad input in stride and continue running. In other cases, it is better to report to the user what went wrong and then give up.

Say you want a function promptNumber that asks the user for a number and returns it. What should it return if the user inputs "orange"?
common choices for such are null, undefined or -1.
What if the function you'll use can already return every possible kind of value. In such a function, you'll have to do something like wrap the result in an object to be able to distinguish success from failure.

*/

//*                     EXCEPTIONS
/* When a function cannot proceed normally, what we would like to do is just stop what we are doing and immediately jump to a place that knows how to handle the problem. This is called exception handling.

*/
//?E.g
function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  }else {
    return "two angry bears";
  }
}

// try {
//   console.log("You see", look());
// } catch (error) {
//   console.error("Something went wrong: " + error);
// }
//The throw keyword is used to raise an exception. Catching one is done by wrapping a piece of code in a try block, followed by the keyword catch.


//*                     CLEANING UP AFTER EXCEPTIONS

/* The effect of an exception is another kind of control flow. Every action that might cause an exception, which is pretty much every function call and property access, might cause to suddenly leave your code. 
Finally is used to help execute no matter the error

*/




//*                     SELECTIVE CATCHING

//*                     ASSERTIONS


//*                     EXERCISES




















































