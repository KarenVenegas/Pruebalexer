import React, {useEffect} from 'react';
import {app} from "./fb"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoList from './cryptoList';
import Login from './Login'


function App() {
  const [usuario, setUsuario]= React.useState(null);
  useEffect(()=>{
    app.auth().onAuthStateChanged((usuarioFirebase)=>{
      console.log("sesion ya iniciadacon", usuarioFirebase);
      setUsuario(usuarioFirebase);
    })
  },[])

  return <> {usuario ? <CryptoList/> : <Login setUsuario={setUsuario}/>}
  </>;
}

export default App;
