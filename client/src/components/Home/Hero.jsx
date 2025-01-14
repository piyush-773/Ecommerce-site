import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
            <div className="w-3/6 flex flex-col items-center lg:items-start justify-center">
                <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-800 text-center lg:text-left">
                    Welcome to the world of products
                </h1>
                <p className="mt-4 text-xl text-gray-700 text-center lg:text-left">
                    Discover a wide variety of items tailored to meet your every
                    need. Shop now and experience quality like never before.
                </p>
                <div className="mt-8">
                    <Link
                        to="/all-products"
                        className="text-xl lg:text-2xl font-semibold border border-yellow-300 px-10 py-3 hover:bg-zinc-800 rounded-full"
                    >
                        Discover products
                    </Link>
                </div>
            </div>
            <div className="w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
                <img
                    src="https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg"
                    alt="hero"
                />
            </div>
        </div>
    );
};

export default Hero;
