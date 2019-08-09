import React from 'react';
import { Link } from 'react-router-dom';
const Header =() =>(
    <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <Link to ="/productos" className="navbar-brand">
                React CRUD y Routing
                </Link>
        </div>
    </nav>
);

export default Header;