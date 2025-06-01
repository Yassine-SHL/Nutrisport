import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Typewriter from "typewriter-effect";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <h1 className="logo">
                <Typewriter
                    options={{
                        strings: ["NUTRISPORT"],
                        autoStart: true,
                        loop: true,
                        delay: 150,
                    }}
                />
            </h1>

            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                {[
                    { name: "Acceuil", path: "/acceuil" },
                    { name: "Produits", path: "/produits" },
                    { name: "Articles", path: "/articles" },
                    { name: "Panier", path: "/panier" }
                ].map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
        </nav>
    );
};

export default Navbar;
