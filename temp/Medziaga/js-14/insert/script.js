const sumbitBtn = document.getElementById("submit-btn");

const nameInput = document.getElementById("name");
const ratingInput = document.getElementById("rating");
const releaseYearInput = document.getElementById("release-year");
const imageUrlInput = document.getElementById("img-url");

sumbitBtn.addEventListener("click", async () => {
  const game = {
    name: nameInput.value,
    rating: ratingInput.value,
    releaseYear: releaseYearInput.value,
    imgUrl: imageUrlInput.value,
  };

  console.log(game);

  const response = await fetch(
    `https://695dfc9f2556fd22f676eeca.mockapi.io/games`,
    {
      method: "POST",
      body: JSON.stringify(game),
      headers: { "Content-Type": "application/json" },
    }
  );
  const gameRes = await response.json();

  setTimeout(() => {
    if (gameRes) {
      window.location.replace("../index.html");
    }
  }, 2000);
});
