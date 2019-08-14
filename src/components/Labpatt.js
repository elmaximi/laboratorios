import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { AFrameRenderer, Marker } from 'react-web-ar';

export default function Labpatt (){
  return (
    <AFrameRenderer arToolKit={{ sourceType: 'webcam' }}>
      <Marker parameters={{
          preset: "pattern",
          type: "pattern",
          url: "https://github.com/elmaximi/laboratorios/blob/master/src/components/patts/LAB1.patt"
        }}>

      </Marker>
    </AFrameRenderer>
  )
}