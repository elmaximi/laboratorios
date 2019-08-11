import React,{ Fragment} from 'react';
import HorarioLista from './HorarioLista';

function Horarios({horarios, guardarRecargarLaboratorios}){
    return (
        <Fragment>
            <h1 className="text-center">Horarios</h1>
            <ul className="list-group mt-5">
                {horarios.map(horario => (
                    <HorarioLista
                        key={horario.id}
                        horario={horario}
                        guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Horarios;