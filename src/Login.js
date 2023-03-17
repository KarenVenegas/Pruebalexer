import React from "react";
import {app} from './fb';

const Login = (props) => {
    const [isRegistro, setIsRegistro] = React.useState(false);

    const createUser = (email, password) =>{
        app.auth().createUserWithEmailAndPassword(email,password).then((usuarioFirebase)=>{
            console.log("usuario creado: ", usuarioFirebase);
            props.setUsuario(usuarioFirebase);
        });
    };

    const start = (email, password)=>{
        app.auth().signInWithEmailAndPassword(email,password).then((usuarioFirebase)=>{
            console.log("sesioon iniciada con:", usuarioFirebase.user);
            props.setUsuario(usuarioFirebase);
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const email = e.target.emailField.value;
        const password = e.target.passwordField.value;
         
        if(isRegistro){
            createUser(email, password);
        }
        if(!isRegistro){
            start(email, password);
        }
       
    }



    return (
        <div>
            <h1> { isRegistro ?"Create account" : "Log in"}</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="emailField">Email</label>
                <input type="email" id="emailField" />
                <label htmlFor="passwordField">Password</label>
                <input type="password" id="passwordField" />
                <button type="submit" > { isRegistro ?"Create account" : "Log in"} </button>
            </form>
            <button onClick={()=> setIsRegistro(!isRegistro)}> { isRegistro ?"Access" : "Sign up"}</button>
        </div>
    )
}
export default Login