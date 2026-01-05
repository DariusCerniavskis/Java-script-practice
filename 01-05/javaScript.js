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

const sortedUsers = [...filteredUsers1].sort((a, b) => {
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

// Task4
const topUsers = users.filter((user, index) => {
    if (index < 2) {
        return user;
    }
});

console.log("Task4: Get top 2 users");
console.log(topUsers);

// Task 5

const modifiedUsers = [...topUsers].map((user, index) => {
    return { ...user, rank: index + 1 };
});

console.log("Task5: Add rank to top 2 users");
console.log(modifiedUsers);

// ****************************************************************************************

const anotherUsers = [
    { id: 1, name: "Lina" },
    { id: 2, name: "Tomas" },
    { id: 3, name: "Greta" },
];

const orders = [
    { userId: 1, item: "Phone" },
    { userId: 2, item: "Laptop" },
    { userId: 1, item: "Charger" },
];

const existingItems = ["Phone", "Table", "Mouse"];

// Task6

const newOrders = [...orders].map((order) => {
    const isProductExist = existingItems.some((existingItem) => {
        return existingItem === order.item;
    });
    return {
        ...order,
        isProductExist: isProductExist,
    };
});

console.log(
    "Task6: Add isProductExist (true / False) if exist in existingItems"
);
console.log(newOrders);

// Task7

const UsersAndOrders = [...anotherUsers].map((user) => {
    const userItem = [...orders].reduce((acc, curr) => {
        return curr.userId == user.id ? [...acc, curr.item] : acc;
    }, []);

    return {
        name: user.name,
        item: userItem,
    };
});

console.log("Task7: Add users and orders");
console.log(UsersAndOrders);
