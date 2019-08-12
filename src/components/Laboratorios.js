import React, { Fragment } from 'react';
import LaboratorioLista from './LaboratorioLista';
import { Link } from 'react-router-dom';

function Laboratorios({ laboratorios, guardarRecargarLaboratorios, auth }) {
    return (
        <Fragment>
            {auth ? (
                <div>
                    <h1 className="text-center">Laboratorios</h1>
                    <div className="col-md-12 text-center">
                        <Link to={`/nuevo-laboratorio`} className="btn btn-success mr-2">Agregar Laboratorio</Link>
                    </div>
                    <ul className="list-group mt-5">
                        {laboratorios.map(laboratorio => (
                            <LaboratorioLista
                                key={laboratorio.id}
                                laboratorio={laboratorio}
                                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                            />
                        ))}
                    </ul>
                </div>
            ) : <h1 className="text-center">Página no disponible</h1>}
        </Fragment>
    )
}
export default Laboratorios;