import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All products", link: "/all-products" },
        { title: "cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];
    const [navView, setNavView] = useState("hidden");
    return (
        <>
            <nav className="navbar z-50 relative flex items-center justify-between px-8 py-4">
                <Link to="/" className="navleft flex items-center">
                    <img
                        className="h-14 me-4"
                        src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">ShopHere</h1>
                </Link>
                <div className="navright block md:flex gap-4 items-center">
                    <div className="hidden md:flex gap-4">
                        {links.map((item, index) => (
                            <Link
                                to={item.link}
                                className="hover: text-blue-500 transition-all duration-300"
                                key={index}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:flex">
                        <Link
                            to="/login"
                            className="px-4 py-1 hover: text-zinc-800 transition-all duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-1 hover: text-zinc-800 transition-all duration-300"
                        >
                            signUp
                        </Link>
                    </div>
                    <button
                        onClick={() =>
                            navView === "hidden"
                                ? setNavView("block")
                                : setNavView("hidden")
                        }
                        className="block md:hidden text-2xl hover:text-zinc-600"
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div
                className={` ${navView} h-screen bg-white absolute top-50 left-0 w-full z-40 flex flex-col gap-2 items-center justify-start`}
            >
                {links.map((item, index) => (
                    <Link
                        to={item.link}
                        className={` ${navView} hover: text-blue-500 transition-all duration-300 text-2xl`}
                        key={index}
                        onClick={() =>
                            navView === "hidden"
                                ? setNavView("block")
                                : setNavView("hidden")
                        }
                    >
                        {item.title}
                    </Link>
                ))}
                <Link
                    to="/login"
                    className={` ${navView} px-4 py-1 hover: text-zinc-800 transition-all duration-300 text-2xl`}
                    onClick={() =>
                        navView === "hidden"
                            ? setNavView("block")
                            : setNavView("hidden")
                    }
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className={` ${navView} px-4 py-1 hover: text-zinc-800 transition-all duration-300 text-2xl`}
                    onClick={() =>
                        navView === "hidden"
                            ? setNavView("block")
                            : setNavView("hidden")
                    }
                >
                    signUp
                </Link>
            </div>
        </>
    );
};

export default Navbar;
