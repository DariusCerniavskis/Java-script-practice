let servicesMeniu = [];

for (let i = 0; i < 3; i++) {
    const elementsGroup = {
        plus: document.getElementById(`sb${i}0`),

        minus: document.getElementById(`sb${i}1`),
        paragraph: document.getElementById(`p${i}`),
    };
    servicesMeniu.push(elementsGroup);
}

// inicialization
for (let i = 0; i < 3; i++) {
    servicesMeniu[i].plus.style.display = "flex";
    servicesMeniu[i].minus.style.display = "none";
    servicesMeniu[i].paragraph.style.display = "none";
}

for (let i = 0; i < 3; i++) {
    servicesMeniu[i].plus.addEventListener("click", () => {
        // plus click
        servicesMeniu[i].plus.style.display = "none";
        servicesMeniu[i].minus.style.display = "flex";
        servicesMeniu[i].paragraph.style.display = "flex";
    });

    servicesMeniu[i].minus.addEventListener("click", () => {
        // minus click
        servicesMeniu[i].plus.style.display = "flex";
        servicesMeniu[i].minus.style.display = "none";
        servicesMeniu[i].paragraph.style.display = "none";
    });
}
