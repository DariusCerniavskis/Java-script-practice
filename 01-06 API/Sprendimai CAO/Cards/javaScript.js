const cardWrapper = document.getElementById("card-ID");

fetch("https://randomuser.me/api/")
    .then((userData) => {
        return userData.json();
    })
    .then((jsonData) => {
        userData = jsonData.results[0];

        console.log(userData);

        const imageWrapper = document.createElement("div");
        imageWrapper.setAttribute("class", "image-wrapper");

        const image = document.createElement("img");
        image.setAttribute("class", "user-image");
        image.src = userData.picture.large;

        const userWrapper = document.createElement("div");
        userWrapper.setAttribute("class", "user-wrapper");

        const name = document.createElement("h3");
        name.innerText = `${userData.name.first} ${userData.name.last}`;

        const age = document.createElement("h3");
        age.setAttribute("class", "user-age");
        age.innerText = `${userData.dob.age} years old`;

        const email = document.createElement("h5");
        email.setAttribute("class", "user-email");
        email.innerText = userData.email;

        cardWrapper.append(imageWrapper);
        imageWrapper.append(image);
        cardWrapper.append(userWrapper);
        userWrapper.append(name);
        userWrapper.append(age);
        cardWrapper.append(email);
    });
