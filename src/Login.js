import React from "react";
import { app } from "./fb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [isRegistro, setIsRegistro] = React.useState(false);

  const createUser = (email, password) => {
    app.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        props.setUsuario(usuarioFirebase);
        toast.success("User created successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const start = (email, password) => {
    
    app.auth()
      .signInWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        props.setUsuario(usuarioFirebase);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.emailField.value;
    const password = e.target.passwordField.value;

    

    if (isRegistro) {
      createUser(email, password);
    }
    if (!isRegistro) {
      start(email, password);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h1 className="card-title text-center">
            {isRegistro ? "Create account" : "Log in"}
          </h1>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="emailField">Email</label>
              <input type="email" id="emailField" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="passwordField">Password</label>
              <input type="password" id="passwordField" className="form-control" />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-dark"
              >
                {isRegistro ? "Create account" : "Log in"}
              </button>
              <button
                onClick={() => setIsRegistro(!isRegistro)}
                className="btn btn-link"
              >
                {isRegistro ? "Access" : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Login;
