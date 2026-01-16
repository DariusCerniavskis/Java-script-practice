const getIDFetch = async () => {
    const response = await fetch("http://localhost:3000/ID");

    const UniquID = await response.json();

    console.log(UniquID);
    return UniquID;
};

const getID = async () => {
    const gotID = await getIDFetch();

    return gotID;
};

getID();
