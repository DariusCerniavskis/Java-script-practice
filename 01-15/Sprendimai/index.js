import { v4 as uniqueID } from "uuid";

// // Task 3
const nameArray = ["Darius", "Petras", "Jonas", "Andrius"];

const sortedNames = [...nameArray].sort((a, b) => {
    return a.localeCompare(b);
});

console.log(nameArray); // original array unchanged
console.log(sortedNames); // sorted array

console.log(
    `\n-------------------------------------------------------------------\n`
);

// // Task4
const someId = uniqueID();

console.log(`My unique ID is: ${someId}`);

console.log(
    `\n-------------------------------------------------------------------\n`
);

// // Task5
const newUserID = (userName, workPlace) => {
    const userID = uniqueID();
    const user = {
        name: userName,
        workPlace: workPlace,
        ID: userID,
    };

    return user;
};

const myUser = newUserID("Andrius", "Factory");

console.log("New user");
console.log(myUser);
console.log(
    `\n-------------------------------------------------------------------\n`
);

// ----------------------------------------------------------------------------
// Task6

// Sort and remove dublicates

const nums = [4, 2, 7, 2, 4, 9];

const createUniqueNums = ([...nums].map = () => {
    const sortedNums = [...nums].sort((a, b) => {
        return a - b;
    });

    const uniqueArray = [...sortedNums].reduce((acc, curr) => {
        return acc.includes(curr) ? acc : [...acc, curr];

        // if (!acc.includes(curr)) {
        //     return [...acc, curr];
        // } else {
        //     return acc;
        // }
    }, []);
    return uniqueArray;
});

const orderedArray = createUniqueNums(nums);

console.log("Starting array");
console.log(nums);
console.log(`\nUniqu sorted array`);
console.log(orderedArray);

console.log(
    `\n-------------------------------------------------------------------\n`
);
