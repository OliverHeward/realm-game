import React, {useContext} from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/auth";
import AuthRoute from './utils/AuthRoute';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quest from "./pages/Quest";
import Forum from "./pages/Forum";
import Missions from "./pages/Missions";

import Footer from "./components/Footer/Footer";
import Layout from "./hoc/Layout/Layout";
import Account from "./pages/Account";
import Inventory from "./pages/Inventory";


function App() {

  const {user} = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Layout>
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/quest" component={Quest} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/missions" component={Missions} />
        <Route path="/account" component={Account} />
        <Route exact path="/forum" component={Forum} />
        </Layout>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
