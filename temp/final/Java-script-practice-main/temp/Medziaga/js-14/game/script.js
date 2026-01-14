const gameWrapper = document.getElementById("game-wrapper");
const deleteBtn = document.getElementById("delete-btn");

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

const buildScreen = async () => {
  const response = await fetch(
    `https://695dfc9f2556fd22f676eeca.mockapi.io/games/${id}`
  );

  const game = await response.json();

  console.log(game);

  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.innerText = game.name;

  const rating = document.createElement("h4");
  rating.textContent = `Rating: ${game.rating}`;

  const releaseYear = document.createElement("h4");
  releaseYear.innerText = `Year: ${game.releaseYear}`;

  const image = document.createElement("img");
  image.src = game.imgUrl;

  card.append(title, rating, releaseYear, image);
  gameWrapper.append(card);
};

buildScreen();

deleteBtn.addEventListener("click", async () => {
  const response = await fetch(
    `https://695dfc9f2556fd22f676eeca.mockapi.io/games/${id}`,
    {
      method: "DELETE",
    }
  );

  const game = await response.json();

  setTimeout(() => {
    if (game) {
      window.location.replace("../index.html");
    }
  }, 2000);

  console.log(game);
});
