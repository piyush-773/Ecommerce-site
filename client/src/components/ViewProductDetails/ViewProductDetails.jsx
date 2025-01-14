import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewProductDetails = () => {
    const {id} = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/v1/get-product/${id}`
            );
            console.log(response)
            setData(response.data.data);
        };
        fetch();
    }, []);
    return (
        <div className="px-12 py-8">
            <div className="rounded p-4 h-screen"></div>
            <div className="p-4"></div>
        </div>
    );
};

export default ViewProductDetails;
