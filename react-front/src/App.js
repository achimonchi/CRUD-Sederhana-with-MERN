import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter , Switch, Route, Link } from 'react-router-dom'

import Create from './components/create.component'
import Index from './components/index.component'
import Login from './components/login.component'
import LoginAdmin from './components/loginAdmin.component'
import User from './components/user/edit.component'
import AdminIndex from './components/admin/admin.index'
import EditUser from './components/admin/editUser'

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to={'/'} className="navbar-brand" >Challange HosCloud</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={'/daftar'} className="nav-link">Daftar</Link>
              </li>
              <li className="nav-item">
                <Link to={'/index'} className="nav-link">Index</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">Login as User</Link>
              </li>
              <li className="nav-item">
                <Link to={'/loginAdmin'} className="nav-link">Login as Admin</Link>
              </li>
            </ul>

          </div>
        </nav>
        <br />
        <h1>Challange dari Bang Tommy</h1>
        <br />
        <Switch>
          <Route exact path="/daftar" component={Create} />
          <Route exact path="/index" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/loginAdmin" component={LoginAdmin} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/admin/" component={AdminIndex} />
          <Route exact path="/admin/ubahUser/:id" component={EditUser} />
        </Switch>

      </div>
    );
  }
}

export default App;
