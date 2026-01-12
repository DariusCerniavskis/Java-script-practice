let answer = {};

export const getArray = async (fetchLink) => {
    const response = await fetch(fetchLink);

    answer = await response.json();

    return answer;
};

export const getElement = async (fetchLink,elementId) => {
    const response = await fetch(fetchLink + elementId);

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

export const changeElementParameter = async (fetchLink,elementId,parameter,value) => {
 const parameterAndValue=`${parameter}: ${value}`
 
    const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ parameterAndValue })


}; 
     // laukiam kol įrašys
    answer = await response.json();

    console.log("isDelk keitimas")
    console.log(answer)
    return answer;
};

export const deleteElement = async (fetchLink, elementId) => {
    const response = await fetch(fetchLink + elementId, {
        method: "DELETE",
    });

    // laukiam kol įrašys
    answer = await response.json();

    return answer;
};
