import React,{ Fragment} from 'react';
import LaboratorioLista from './LaboratorioLista';

function Laboratorios({laboratorios, guardarRecargarLaboratorios}){
    return (
        <Fragment>
            <h1 className="text-center">Laboratorios</h1>
            <ul className="list-group mt-5">
                {laboratorios.map(laboratorio => (
                    <LaboratorioLista
                        key={laboratorio.id}
                        laboratorio={laboratorio}
                        guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Laboratorios;