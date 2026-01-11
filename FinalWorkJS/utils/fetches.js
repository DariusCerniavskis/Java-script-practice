let answer = {};

export const buildScreen = async (fetchLink) => {
    const response = await fetch(fetchLink);

    answer = await response.json();

    return answer;
};

export const addNewElement = async (fetchLink, elementsObj) => {
    const response = await fetch(await fetch(fetchLink), {
        method: "POST",
        body: JSON.stringify(elementsObj),
        headers: { "Content-Type": "application/json" },
    });

    // laukiam kol įrašys
    answer = await response.json();

    return answer;
};

export const deleteElement = async (fetchLink, elementID) => {
    const responseDelete = await fetch(fetchLink + elementID, {
        method: "DELETE",
    });

    // laukiam kol įrašys
    answer = await response.json();

    return answer;
};
