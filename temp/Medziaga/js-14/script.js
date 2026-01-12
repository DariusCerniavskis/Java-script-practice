const gamesWrapper = document.getElementById("games-wrapper");

const buildScreen = async () => {
  const response = await fetch(
    "https://695dfc9f2556fd22f676eeca.mockapi.io/games"
  );

  const games = await response.json();

  games.forEach((g) => {
    const card = document.createElement("a");
    card.classList.add("card");
    const link = `./game/index.html?id=${g.id}`;
    card.href = link;

    const title = document.createElement("h2");
    title.innerText = g.name;

    const rating = document.createElement("h4");
    rating.textContent = `Rating: ${g.rating}`;

    const releaseYear = document.createElement("h4");
    releaseYear.innerText = `Year: ${g.releaseYear}`;

    const image = document.createElement("img");
    image.src = g.imgUrl;

    card.append(title, rating, releaseYear, image);
    gamesWrapper.append(card);
  });
};

buildScreen();
