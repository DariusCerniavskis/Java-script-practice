import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

const Page = () => {
    const [fetchedData, setFetchedData] = useState();

    const fetchData = async () => {
        const response = await axios.get("https://fakestoreapi.com/products");
        setFetchedData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <Main data={fetchedData} setData={setFetchedData} />
        </>
    );
};

export default Page;
