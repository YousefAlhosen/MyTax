import React from "react";
import { Link} from 'react-router-dom';

// Create a naviagation bar for switching between pages

const Navbar = () => {
    return (
        <nav>
            <url>
                <li><Link to= "/">Dashboard</Link></li>
                <li><Link to="/invoices">invoices</Link></li>
                <li><Link to="/tax-filling">Tax Filling</Link></li>
                <li><Link to="/reports">Reports</Link></li>
            </url>
        </nav>
    );
}

export default Navbar;