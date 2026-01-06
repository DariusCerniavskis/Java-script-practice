fetch("https://party-wedding.glitch.me/v1/wedding")
    .then((userData) => {
        return userData.json();
    })
    .then((jsonData) => {
        userData = jsonData.results[0];

        console.log(userData);
    });
