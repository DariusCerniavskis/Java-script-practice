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
        document.getElementById(`fb${i}`).style.display = "none";
    }

    document.getElementById(`fb${number1}`).style.display = "flex";
    document.getElementById(`fb${number1}`).style.gridArea =
        "1 / 1 / span 1 /span 1";

    document.getElementById(`fb${number2}`).style.display = "flex";
    document.getElementById(`fb${number2}`).style.gridArea =
        "1 / 2 / span 1 /span 1";

    currentNumber = number1;
};

const changeImage = (number, isLeftSide) => {
    if (isLeftSide) {
        if (number == 0) {
            number = isImageVisible.length - 1;
        } else {
            number--;
        }
    } else {
        if (number == isImageVisible.length - 1) {
            number = 0;
        } else {
            number++;
        }
    }

    for (let i = 0; i < isImageVisible.length; i++) {
        isImageVisible[i] = i === number;
    }

    document.getElementById(
        `bacground-Image`
    ).style.backgroundImage = `url(./assest/images/gallery/gal-img${number}.jpg)`;

    currentImageNumber = number;
};

let isFeedbacksVisible = [true, true, false, false, false, false];
let currentNumber = 0;
changeFeedbackCouple(1, true);

let isImageVisible = [true, false, false, false];
let currentImageNumber = 0;
