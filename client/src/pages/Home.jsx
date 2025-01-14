import React from "react";
import Hero from "../components/Home/Hero";
import RecentProducts from "../components/Home/RecentProducts";

const Home = () => {
    return (
        <div className="px-10 py-8">
            <Hero />
            <RecentProducts />
        </div>
    );
};

export default Home;
