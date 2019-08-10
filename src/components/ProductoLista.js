import React from 'react';
import { Link } from 'react-router-dom';

function ProductoLista({producto}){
    return(
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between 
        alig-items-center">
            <p>
                {producto.nombrePlatillo} {'  '}
                <span className="font-weight-blod">${producto.precioPlatillo}</span>
            </p>
            <div>

            </div>
        </li>
    )
}

export default ProductoLista;