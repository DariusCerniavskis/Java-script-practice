const getAreaOfCircle = (radius) => {
    const pi = Math.PI;
    return (pi * radius ** 2).toFixed(2);
};

radius = Number(prompt("What is circle radius?"));

const AreaOfCircle = getAreaOfCircle(radius);

console.log(`The area of circle with radius ${radius} is ${AreaOfCircle}`);
