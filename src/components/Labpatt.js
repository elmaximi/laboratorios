import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import firebase from '../components/config/firebase';

export default class Labpatt extends Component{

  state = {val: true, resultado: [], respuesta: '' };
  
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
      <Marker parameters={{
          preset: "pattern",
          type: "pattern",
          url: "https://raw.githubusercontent.com/elmaximi/laboratoriopatt/master/pattern-LAB1.patt"
        }}>
      </Marker>

      <a-text 
        value={this.state.respuesta} 
        rotation="-90 0 0" 
        color="green" 
        height="2.5" 
        width="2.5" 
        position='0 0.5 0'>
      </a-text>
      <a-plane color="#CCC" height="1" width="2" rotation="-90 0 0"></a-plane>
    </AFrameRenderer>
  );
}
}