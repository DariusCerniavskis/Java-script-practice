const drawSpinningTop = (height) => {
    for (i = height; i > 0; i--) {
        let width = (i - 1) * 2 + 1;
        let gap = height - i;

        console.log(" ".repeat(gap) + "#".repeat(width));
    }
};

topHeight = Number(prompt("What is height of spinning top?"));

drawSpinningTop(topHeight);

console.log(`The task is done`);
