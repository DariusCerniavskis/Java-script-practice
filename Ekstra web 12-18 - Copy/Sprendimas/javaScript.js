const changeFeedbackCouple = (number, isLeftSide) => {
    let number1 = number;
    let number2;

    if (isLeftSide) {
        if (number == 0) {
            number1 = isFeedbacksVisible.length - 1;
            number2 = 0;
        } else {
            number1--;
            number2 = number1 + 1;
        }
    } else {
        if (number == isFeedbacksVisible.length - 1) {
            number1 = 0;
            number2 = number1 + 1;
        } else if (number == isFeedbacksVisible.length - 2) {
            number1 = isFeedbacksVisible.length - 1;
            number2 = 0;
        } else {
            number1++;
            number2 = number1 + 1;
        }
    }

    for (let i = 0; i < isFeedbacksVisible.length; i++) {
        isFeedbacksVisible[i] = i === number1 || i === number2;
        document.getElementById(`fb${i}`).style.display = isFeedbacksVisible[i]
            ? "flex"
            : "none";
    }

    currentNumber = number1;
};

let isFeedbacksVisible = [true, true, false, false, false, false];
let currentNumber = 0;

// currentNumber = changeFeedbackCouple(currentNumber, false);

// console.log(`next ccurrent number is: ${currentNumber}`);
// console.log(isFeedbacksVisible);
