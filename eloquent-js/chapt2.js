function triangleLoop(){
    for (let i = "#"; i.length <= 7; i += "#"){
        console.log(i);
    }
}

function fizzbuzz() {
    for (let i = 1; i <= 100; i++){
        let sentenceToPrint = "";

        if (i % 3 === 0) sentenceToPrint += "Fizz";
        if (i % 5 === 0) sentenceToPrint += "Buzz";

        console.log(sentenceToPrint === "" ? i.toString() : sentenceToPrint);
    }
}

function printChessboardOfSize(size) {
    // Sidenote - could have implemented this with a boolean that flips between true and false aswell.
    for (let height = 0; height < size; height++) {
        let chessboardRowToPrint = "";

        for (let width = 0; width < size; width++) {
            chessboardRowToPrint += (((height + width) % 2) === 0) ? " " : "#";
        }

        console.log(chessboardRowToPrint);
    }
}



triangleLoop();
console.log("---");
fizzbuzz();
console.log("---");
printChessboardOfSize(8);