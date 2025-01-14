import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
    return (
        <>
            <Link to={`/view-product-details/${data._id}`}>
                <div className="bg-zinc-300 rounded p-4">
                    <div className="rounded flex items-center justify-center">
                        <img src={data.url} alt="" className="h-[25vh]"/>
                    </div>
                    <h2 className="text-xl font-semibold">{data.title}</h2>
                    <p className="mt-2 font-semibold">by {data.author}</p>
                    <p className="mt-2 text-xl font-semibold">Rs {data.price}</p>
                </div>
            </Link>
        </>
    );
};

export default ProductCard;
