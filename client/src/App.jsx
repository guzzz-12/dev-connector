import React, {useEffect} from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import {loadUser} from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

//Configuración de Redux
import {Provider} from "react-redux";
import store from "./store"; 

//Verificar si existe token de usuario en el storage
//Si existe token, enviarlo al backend para tomar la data del usuario
if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  //Cargar el usuario cuando el componente se haya creado
  //Versión de componentDidMount() para componentes funcionales
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
