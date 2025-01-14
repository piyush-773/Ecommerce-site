import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
const RecentProducts = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/v1/get-recent-products`
            );
            setData(response.data.data);
        };
        fetch();
    }, []);
    return (
        <div className="mt-8 px-4">
            <h4 className="text-2xl">Recent products</h4>
            <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {data &&
                    data.map((item, index) => (
                        <div key={index}>
                            <ProductCard data={item} />{" "}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RecentProducts;
