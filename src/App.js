import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './components/config/firebase';

import Login from './components/autentificacion/Login';
import Header from './components/Header';
import Marcador from './components/Marcador';
import Home from './components/Home';
import AR from './components/AR';

import Laboratorios from './components/Laboratorios';
import AgregarLaboratorio from './components/AgregarLaboratorio';
import EditarLaboratorio from './components/EditarLaboratorio';

import Horarios from './components/Horarios';
import AgregarHorario from './components/AgregarHorario';
import EditarHorario from './components/EditarHorario';



function App() {
  
  const [laboratorios, guardarLaboratorios] = useState([]);
  const [horarios, guardarHorarios] = useState([]);

  const [recargarLaboratorios, guardarRecargarLaboratorios] = useState(true);
  const [autenticacion, guardarAutenticacion] = useState(false);


  useEffect(() => {
    if (recargarLaboratorios) {
      firebase.firestore().collection('salas').onSnapshot((snapshot) => {
        const datos = snapshot.docs.map((dato) => ({
          id: dato.id,
          ...dato.data()
        }))
        guardarLaboratorios(datos);
      });
      firebase.firestore().collection('horario').onSnapshot((snapshot) => {
        const datos = snapshot.docs.map((dato) => ({
          id: dato.id,
          ...dato.data()
        }))
        guardarHorarios(datos);
      });
    }
    //cambiar a false la recarga de los datos para que no se esté consultando a la API a cada rato
    guardarRecargarLaboratorios(false);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //El state se pone en true si el usuario esta logeado
        return guardarAutenticacion(true);
      } else {
        //El state se pone en false si el usuario esta logeado
        return guardarAutenticacion(false);
      }
    })
  }, [recargarLaboratorios])

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          {/*aqui empieza las rutas*/}
          <Route exact path="/"
            render={() => (
              <Login
                recargar={guardarRecargarLaboratorios}
              />
            )}
          />
          <Route exact path="/nuevo-marcador"
            render={() => (
              <Marcador
                auth={autenticacion}
              />
            )}
          />
          <Route exact path="/arjs"
                component={AR}
              />
          <Route exact path="/home" component={Home} />
          <Route exact path="/laboratorios"
            render={() => (
              <Laboratorios
                laboratorios={laboratorios}
                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                auth={autenticacion}
              />
            )}
          />
          <Route exact path="/nuevo-laboratorio"
            render={() => (
              <AgregarLaboratorio
                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                auth={autenticacion}
              />
            )} />
          <Route exact path="/horarios"
            render={() => (
              <Horarios
                horarios={horarios}
                auth={autenticacion}
              />
            )}
          />
          <Route exact path="/nuevo-horario"
            render={() => (
              <AgregarHorario
                datos={laboratorios}
                auth={autenticacion}
              />
            )} />
          <Route exact path="/laboratorios/editar/:id"
            render={props => {
              // tomar el id del laboratorio
              const idLaboratorio = props.match.params.id;

              //el lab que se pasa al state
              const laboratorio = laboratorios.filter(laboratorio => laboratorio.id ===
                idLaboratorio);
              return (
                <EditarLaboratorio
                  laboratorio={laboratorio[0]}
                />
              )
            }}
          />
          <Route exact path="/horarios/editar/:id"
            render={props => {
              // tomar el id del horario
              const idHorario = props.match.params.id;

              //el lab que se pasa al state
              const horario = horarios.filter(horario => horario.id ===
                idHorario);
              return (
                <EditarHorario
                  horario={horario[0]}
                  datos={laboratorios}
                />
              )
            }}
          />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
}

export default App;
