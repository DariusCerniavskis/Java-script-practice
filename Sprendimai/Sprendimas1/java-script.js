const getRightTriangleArea = (side1, side2) => {
    return (side1 * side2) / 2;
};

side1 = Number(
    prompt("The first side at the right angle of right triangle is:")
);
side2 = Number(
    prompt("The second side at the right angle of right triangle is:")
);

const rightTriangleArea = getRightTriangleArea(side1, side2);

console.log(
    `Area of right triangle with sides ${side1} and ${side2} is: ${rightTriangleArea}`
);
