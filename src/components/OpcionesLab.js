import React,{Fragment} from 'react'

const OpcionesLab = ({dato}) => {
    return (
        <Fragment>
            <option value={dato.id}>{dato.nombreLaboratorio}</option>
        </Fragment>
    )
}

export default OpcionesLab;