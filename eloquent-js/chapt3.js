function min(a, b) {
    return a > b ? b : a;
}

function isEven(num) {
    function recursiveEvennessSearch(x) {
        if (x === 0) return true;
        else if (x === 1) return false;
        else return recursiveEvennessSearch(x - 2);
    }

    if (num < 0) num = -num;

    return recursiveEvennessSearch(num);
}

function countChar(string, searchedChar) {
    let counter = 0;
    for (let i = 0; i < string.length; i++) if (string[i] === searchedChar) counter++;
    return counter;
}

function countBs(string) {
    return countChar(string, "B");
}

console.log(min(0, 10));
console.log(min(0, -10));
console.log("---");
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));
console.log("---");
console.log(countBs("BOB"));
console.log(countChar("kakkerlak", "k"));