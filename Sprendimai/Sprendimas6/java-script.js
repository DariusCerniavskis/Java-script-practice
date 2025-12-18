const drawSquare = (width) => {
    const topBottom = "#".repeat(width);
    const squareMiddle = "#" + " ".repeat(width - 2) + "#";

    console.log("1.   " + topBottom);

    for (let i = 2; i < width; i++) {
        console.log(i + "." + " ".repeat(i < 10 ? 3 : 2) + squareMiddle);
    }
    console.log(width + "." + " ".repeat(width < 10 ? 3 : 2) + topBottom);
};

width = Number(prompt("How big is square?"));
drawSquare(width);
console.log(`The task is done`);
