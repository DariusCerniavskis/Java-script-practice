const nameInput = document.getElementById("name-input");
const realiseInput = document.getElementById("realise-input");
const imgUrlInput = document.getElementById("img-url-input");
const platformsInput = document.getElementById("platforms-input");
const rankInput = document.getElementById("rank-input");
const discriptionArea = document.getElementById("discription-area");
const inputButton = document.getElementById("input-btn");

const infoBax = document.getElementById("info-box");

inputButton.addEventListener("click", async () => {
    const newTopGame = {
        name: nameInput.value,
        RealiseYear: realiseInput.value,
        image: imgUrlInput.value,
        platforms: platformsInput.value,
        rank: rankInput.value,
        description: discriptionArea.value,
    };

    console.log(newTopGame);

    const response = await fetch(
        `https://695e14ac2556fd22f6773e58.mockapi.io/topGames`,
        {
            method: "POST",
            body: JSON.stringify(newTopGame),
            headers: { "Content-Type": "application/json" },
        }
    );

    const insertResponse = await response.json();
    console.log("insert: " + insertResponse);

    if (insertResponse) {
        infoBax.innerText = "Game added";

        setTimeout(() => {
            if (insertResponse) {
                window.location.replace("../index.html");
            }
        }, 2000);
    }
});
