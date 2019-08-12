import React from 'react';
import Swal from 'sweetalert2';

const Marcador = ({auth}) => {
    
    function alerta () {
        Swal.fire({
            position: 'center',
            type: 'info',
            title: 'Aviso',
            text: 'Esta página está destinada para usarla solo en computadoras',
            showConfirmButton: true
        });
    }
    return (
        
        <div className="container">
            {auth ?(
            <div>
                <div className="embed-responsive embed-responsive-1by1 mt-5">
                    <iframe title="marcador" src="https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html" frameBorder="0" 
                        className="embed-responsive-item"
                        allowtransparency="true"
                        scrolling="no" 
                        onLoad={alerta}
                    ></iframe>
                </div>
                <p className="alert alert-info text-center">Generador de marcadores</p>
            </div>
            ): <h1 className="alert alert-danger p3 my-5 text-center text-uppercase font-weight-bold">Pagina no disponible.</h1>}
        </div>
    )
}
export default Marcador;