import React from "react";

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All products", link: "/all-products" },
        { title: "cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];
    return (
        <div className="navbar flex items-center justify-between px-8 py-4">
            <div className="navleft flex items-center">
                <img
                    className="h-14 me-4"
                    src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
                    alt="logo"
                />
                <h1 className="text-2xl font-semibold">ShopHere</h1>
            </div>
            <div className="navright flex gap-4 items-center">
                <div className="flex gap-4">
                    {links.map((item, index) => (
                        <div
                            className="hover: text-blue-500 transition-all duration-300"
                            key={index}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-1 hover: text-zinc-800 transition-all duration-300">
                        Login
                    </button>
                    <button className="px-4 py-1 hover: text-zinc-800 transition-all duration-300">
                        signUp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
