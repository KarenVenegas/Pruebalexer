import React from 'react';
import {app} from './fb';

function Header(props) {
  const close =()=>{
    app.auth().signOut();
  }
  return (
    <nav class="navbar navbar-dark bg-dark">
     <span class="navbar-brand mb-0 h1">Cryptocurrency</span>
     <button onClick={close}>Log out</button>
    </nav>
  );
}

export default Header;
