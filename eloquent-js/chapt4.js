function range(min, max, step = 1) {
    let arrayOfRange = [];

    if (step > 0) {
        for (let i = min; i <= max; i += step) arrayOfRange.push(i);
    }
    else {
        for (let i = max; i <= min; i -= step) arrayOfRange.unshift(i);
    }
    // This does not handle step == 0.

    return arrayOfRange;
}

function sum(nums) {
    let counter = 0;
    for (let number of nums) counter += number;
    return counter;
}

function reverseArray(arr) {
    let newArray = [];
    for (let item of arr) newArray.unshift(item);
    return newArray;
}

function reverseArrayInPlace(arr) {
    for (let i = 0; i < arr.length/2; i++) {
        let temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
}

function arrayToList(arr) {
    let startOfCreatedList = null;

    for (let item of arr.reverse()) {
        startOfCreatedList = {
            value: item,
            rest: startOfCreatedList
        }
    }

    return startOfCreatedList;
}

function listToArray(list) {
    let newArray = [];

    while (list !== null) {
        newArray.push(list.value);
        list = list.rest;
    }

    return newArray;
}

function prepend(value, list) {
    return {value: value, rest: list};
}

function nth(list, index) {
    if (list === null) return undefined;
    if (index === 0) return list.value;
    return nth(list.rest, index - 1);
}

function deepEqual(a, b) {
    if (a === null) return b === null;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return a === b;
    for (let property of Object.keys(a)) if (!deepEqual(a[property], b[property])) return false; // Assure A <= B
    for (let property of Object.keys(b)) if (!property in Object.keys(a)) return false; // Assure B <= A
    return true;
}


console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
console.log(myArray);
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}))