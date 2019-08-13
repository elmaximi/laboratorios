import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import firebase from '../components/config/firebase';
import Swal from 'sweetalert2';


function Header({ history }) {

    const [autenticacion, guardarAutenticacion] = useState(false);

    const logOut = () => {
        firebase.auth().signOut();
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Bien',
            text: 'Sesión cerrada con exito, vuelva pronto.',
            showConfirmButton: false,
            timer: 1500
        })
        history.replace('/');
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //El state se pone en true si el usuario esta logeado
            return guardarAutenticacion(true);
        } else {
            //El state se pone en false si el usuario esta logeado
            return guardarAutenticacion(false);
        }
    })

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 mb-5">
            {autenticacion ? (
                <div className="container-fluid">
                    <Link to="/laboratorios" className="navbar-brand">Sistema de Laboratorios | </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown show">
                                <NavLink
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    to="#"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                >Registros</NavLink>
                                <div className="dropdown-menu show" x-placement="bottom-start" >
                                    <NavLink
                                        to='/laboratorios'
                                        className="nav-link"
                                        activeClassName="active"
                                    >Laboratorios</NavLink>

                                    <NavLink
                                        to='/horarios'
                                        className="nav-link"
                                        activeClassName="active"
                                    >Horarios</NavLink>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/nuevo-marcador"
                                    className="nav-link"
                                    activeClassName="active"
                                >Generar Marcador</NavLink>
                            </li>
                        </ul>
                        <button className="btn btn-outline-success btn-sm" onClick={logOut} >Cerrar Sesión</button>
                    </div>
                </div>
            ) : <Link to="/" className="navbar-brand" >Sistema de laboratorios</Link>}
        </nav>
    )
}
export default withRouter(Header);