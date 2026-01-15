import { v4 as uniqueID } from "uuid";

console.log("Task 3");
const nameArray = ["Darius", "Petras", "Jonas", "Andrius"];

const sortedNames = [...nameArray].sort((a, b) => {
    return a.localeCompare(b);
});

console.log(nameArray); // original array unchanged
console.log(sortedNames); // sorted array

console.log(
    `\n-------------------------------------------------------------------\n`
);

console.log("Task 4");
const someId = uniqueID();

console.log(`My unique ID is: ${someId}`);

console.log(
    `\n-------------------------------------------------------------------\n`
);

console.log("Task 5");
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
console.log("Task 6");

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

console.log("Task 7");

// Group objects by category.

const items = [
    { name: "Apple", category: "fruit" },
    { name: "Carrot", category: "vegetable" },
    { name: "Banana", category: "fruit" },
];

// Result
// {
//   fruit: [...],
//   vegetable: [...]
// }

// Only categories
const sortedObject = (items) => {
    const categories = [...items].map((item) => {
        return item.category;
    });

    // object with names
    const newObject = categories.reduce((acc, curr) => {
        if (!acc[curr]) {
            // current categories objects array
            const categoryItems = [...items].filter((item) => {
                if (item.category == curr) {
                    return item.name;
                }
            });

            // current categories names
            const names = [...categoryItems].map((item) => {
                return item.name;
            });

            acc[curr] = names;
        }
        return acc;
    }, {});

    return newObject;
};

console.log("answer");

console.log(sortedObject(items));

// const isUniqueItem = items
//     .map(item => item.category)
//     .includes(category);

// console.log(isUniqueItem);

// const uniqueCategory = items.reduce((acc, curr) => {
//     const uniqueItem=acc.includes((a,curr)=>{
//         return acc.category=curr.category
//     })
//     return acc.category.includes(curr.category) ? acc : [...acc, curr];
// }, []);

// console.log(uniqueCategory);

// const fruit = items.filter((item) => {
//     return item.category === "fruit";
// });

// console.log(fruit);
