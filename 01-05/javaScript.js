const users = [
    { name: "Alice", registered: "2023-12-10", score: 75 },
    { name: "Bob", registered: "2024-01-05", score: 88 },
    { name: "Charlie", registered: "2023-11-20", score: 95 },
    { name: "Diana", registered: "2024-02-14", score: 68 },
    { name: "Eve", registered: "2023-12-25", score: 88 },
];

// Task1
const filteredUsers1 = users.filter((user) => {
    return user.registered >= "2023-12-01";
});

const filteredUsers2 = [...users].reduce((acc, curr) => {
    return curr.registered >= "2023-12-01" ? [...acc, curr] : acc;
}, []);

console.log("Task1: Users registred after 2023-01-01 (filter)");
console.log(filteredUsers1);
console.log("Task1: Users registred after 2023-01-01 (reduce)");
console.log(filteredUsers2);

// Task2

const sortedUsers = [...filteredUsers].sort((a, b) => {
    return b.score - a.score;
});

console.log("Task2: Task1 users sorted to the lowest by score:");
console.log(sortedUsers);

// Task3

const mappedUsers = [...users].map((user) => {
    return {
        nameAndPoint: `${user.name} - ${user.score} point`,
        registred: user.registered,
    };
});

console.log("Task3: Formated array");
console.log(mappedUsers);
