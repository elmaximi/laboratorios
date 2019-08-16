import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import firebase from '../components/config/firebase';

export default class Labpatt extends Component{

  state = {val: true, laboratorios: [], horarios: [] };
  
   consulta = () => {
		//hacer la consulta
    firebase.firestore().collection('horario').where('lab', '==', 'Laboratorio 1')
    .onSnapshot((snapshot) => {
			const datos = snapshot.docs.map((dato) => ({
				id: dato.id,
				...dato.data()
			}));
			this.setState({
				resultado: datos
			});

			var acumulador1 = '';
			for (var x = 0; x < this.state.resultado.length; x++) {
				acumulador1 =
					acumulador1 +
					this.state.resultado[x].materia +
					' :' +
					this.state.resultado[x].nombreDocente +
					'\n' +
					this.state.resultado[x].horainicio +
					' ' +
					this.state.resultado[x].horafin +
					'\n' +
					this.state.resultado[x].dia +
					'\n' +
					this.state.resultado[x].lab+ '\n--------------------------\n';
			}
			this.setState({
				respuesta: acumulador1
			});
		});
  };

  onCollectionLaboratorio = (querySnapshot) => {
    const laboratorios = [];
    querySnapshot.forEach((doc) => {
      laboratorios.push({
        key: doc.id,
        ...doc.data()
          });
    });
    this.setState({
      laboratorios: laboratorios
    });
  }


   onCollectionHorario = (querySnapshot) => {
    const horarios = [];
    querySnapshot.forEach((doc) => {
      horarios.push({
        key: doc.id,
        ...doc.data()
      });
    });
    this.setState({
      horarios: horarios
    });
  }
  
  componentDidMount(){
      firebase.firestore().collection('salas').onSnapshot(this.onCollectionLaboratorio);
      firebase.firestore().collection('horario').onSnapshot(this.onCollectionHorario);
  }

  render() {
    if (this.state.val) {
      this.consulta();
      console.log('consulta del lab 1');
      this.setState({
        val:false
      });
    }
  return (
    <AFrameRenderer arToolKit={{ sourceType: 'webcam' }}>
      {this.state.laboratorios.forEach(laboratorio => {
        const data = this.state.horarios.filter(horario => {
          return horario.lab === laboratorio.key
        });
        let mensaje = "";
        data.forEach(d=>{
            mensaje =d.materia +
            ' :' +
          d.nombreDocente +
            '\n' +
          d.horainicio +
            ' ' +
          d.horafin +
            '\n' +
          d.dia +
            '\n' +
          d.lab+ '\n--------------------------\n';
          return mensaje;
      })

        return(
          <>
          <Marker parameters={{
              preset: "pattern",
              type: "pattern",
              url: "https://firebasestorage.googleapis.com/v0/b/laboratorios-webapp.appspot.com/o/marcadores%2F"+laboratorio.patt+"?alt=media&token=7c5e46e8-98f5-4f75-b413-c92e7dda32ba"
            //  url: "https://raw.githubusercontent.com/elmaximi/laboratoriopatt/master/pattern-LAB1.patt"
            }}>
          </Marker>

          <a-text 
            value={mensaje} 
            rotation="-90 0 0" 
            color="green" 
            height="2.5" 
            width="2.5" 
            position='0 0.5 0'>
          </a-text>
          <a-plane color="#CCC" height="1" width="2" rotation="-90 0 0"></a-plane>
      </>
      )
      })}
    </AFrameRenderer>
  );
}
}