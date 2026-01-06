// const users = [
//   { name: "Alice", registered: "2023-12-10", score: 75 },
//   { name: "Bob", registered: "2024-01-05", score: 88 },
//   { name: "Charlie", registered: "2023-11-20", score: 95 },
//   { name: "Diana", registered: "2024-02-14", score: 68 },
//   { name: "Eve", registered: "2023-12-25", score: 88 },
// ];

// // 2023-12-01

// const filteredUsers = users.filter((u) => {
//   return new Date(u.registered) > new Date("2023-12-01");
// });

// console.log(filteredUsers);

// const sortedUsers = filteredUsers.sort((a, b) => b.score - a.score);

// console.log(sortedUsers);

// const transformetResults = sortedUsers.map((u) => {
//   return `${u.name} - ${u.score} points`;
// });

// console.log(transformetResults);

// const topResults = transformetResults.slice(0, 2);

// console.log(topResults);

// const enhacedUsers = topResults.map((u, idx) => {
//   return `Rank: ${idx + 1}, ${u}`;
// });
// console.log(enhacedUsers);

const users = [
  { id: 1, name: "Lina" },
  { id: 2, name: "Tomas" },
  { id: 3, name: "Greta" },
];

const orders = [
  { userId: 1, item: "Phone" },
  { userId: 2, item: "Laptop" },
  { userId: 1, item: "Charger" },
];

// const existingItems = ["Phone", "Table", "Mouse"];

// const modifiedOrders = orders.map((order) => {
//   const isProductExist = existingItems.includes(order.item);

//   return { ...order, isExist: isProductExist };
// });

// console.log(modifiedOrders);

const joinedOrder = orders.map((order) => {
  const user = users.find((u) => {
    return u.id === order.userId;
  });

  return { item: order.item, user: user.name };
});

console.log(joinedOrder);
