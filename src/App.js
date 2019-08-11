import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './components/config/firebase';

import Login from './components/autentificacion/Login';
import Header from './components/Header';
import Laboratorios from './components/Laboratorios';
import AgregarLaboratorio from './components/AgregarLaboratorio';
import EditarLaboratorio from './components/EditarLaboratorio';
import Laboratorio from './components/Laboratorio';

import Horarios from './components/Horarios';
import AgregarHorario from './components/AgregarHorario';


function App() {

  const [ laboratorios, guardarLaboratorios ] = useState([]);
  const [horarios, guardarHorarios ] = useState([]);

  const [ recargarLaboratorios, guardarRecargarLaboratorios ] = useState(true);

  
  useEffect(() => {
    if(recargarLaboratorios){
        firebase.firestore().collection('salas').onSnapshot((snapshot)=>{
        const datos = snapshot.docs.map((dato)=>({
          id: dato.id,
          ...dato.data()
        }))
        console.log(datos);
        guardarLaboratorios(datos);
      });
      firebase.firestore().collection('horario').onSnapshot((snapshot)=>{
        const datos = snapshot.docs.map((dato)=>({
          id: dato.id,
          ...dato.data()
        }))
        guardarHorarios(datos);
      });
      //cambiar a false la recarga de los datos
      guardarRecargarLaboratorios(false);
    }
  }, [recargarLaboratorios]);

  return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/" component ={Login}/>
          {/*aqui empieza las rutas de los laboratorisos*/}
          <Route exact path="/laboratorios" 
            render={ () => (
              <Laboratorios
                laboratorios={laboratorios}
                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
              />
            )}
          />
          <Route exact path="/nuevo-laboratorio" 
            render={() => (
              <AgregarLaboratorio 
                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
              />
            )}/>
          <Route exact path="/laboratorios/:id" component={Laboratorio}/>
          <Route exact path="/laboratorios/editar/:id"
            render={props =>{
              // tomar el id del laboratorio
              const idLaboratorio = props.match.params.id;
              
              //el lab que se pasa al state
              const laboratorio = laboratorios.filter(laboratorio => laboratorio.id ===
              idLaboratorio);
              return(
                <EditarLaboratorio
                laboratorio = {laboratorio[0]}
                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                />
              )
            }}
          />
            {/*aqui empieza las rutas de los horarios*/}
            <Route exact path="/horarios" 
            render={ () => (
              <Horarios
                horarios={horarios}
              />
            )}
          />
          <Route exact path="/nuevo-horario" 
            render={() => (
              <AgregarHorario 
                datos={laboratorios}
              />
            )}/>

        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
}

export default App;
