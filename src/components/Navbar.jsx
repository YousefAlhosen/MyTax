import React from "react";
import { Link, useLocation} from 'react-router-dom';
import '../styles/Navbar.css'

// Create a naviagation bar for switching between pages

const Navbar = () => {
    const location = useLocation(); 

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to= "/">Dashboard</Link>
                </li>
                <li className={location.pathname === "/incoices" ? "active" : ""}>
                    <Link to="/invoices">Invoices</Link>
                </li>
                <li className={location.pathname === "/tax-filing" ? "active" : ""}>
                    <Link to="/tax-filling">Tax Filling</Link>
                </li>
                <li className={location.pathname === "/reports" ? "active" : ""}>
                    <Link to="/reports">Reports</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;