import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const NavbarAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <h1 className="logo">Nutrisport Admin</h1>

            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                {[ 
                    { name: "Acceuil", path: "/admin" },
                    { name: "Produits", path: "/admin/produits" },
                    { name: "Articles", path: "/admin/articles" },
                    { name: "Users", path: "/admin/utilisateurs" }
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

export default NavbarAdmin;
