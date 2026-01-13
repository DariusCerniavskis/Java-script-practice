const changeElementParameter = async (fetchLink, elementId, saveData) => {
    const updateData = { isDeleted: saveData };

    const fullLink = `${fetchLink}/${elementId}`;
    console.log(fullLink);
    const response = await fetch(fullLink, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        throw new Error("Failed to update element");
    }

    const answer = await response.json();
    console.log("isDeleted changed:", answer);
    return answer;
};

const saveDeleteStatus = async (fetchURL, fetchId) => {
    estateAfterAction = await changeElementParameter(fetchURL, fetchId, true);
};

const glDataArrayURL =
    "https://695e14ac2556fd22f6773e58.mockapi.io/realEstates";

const id = 5;

saveDeleteStatus(glDataArrayURL, id);
