import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header =() =>(
    <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link to ="/laboratorios" className="navbar-brand">
                Sistema de Laboratorios |
                </Link>
            <ul className="navbar-nav mr-auto"> 
                <li className="nav-item">
                   <NavLink
                    to='/laboratorios'
                    className="nav-link"
                    activeClassName="active"
                   >Laboratorios</NavLink> 
                </li>

                <li className="nav-item">
                   <NavLink
                    to='/nuevo-laboratorio'
                    className="nav-link"
                    activeClassName="active"
                   >Nuevo Laboratorio</NavLink> 
                </li>

            </ul>
        </div>
    </nav>
);

export default Header;