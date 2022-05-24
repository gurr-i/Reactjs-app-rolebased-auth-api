// import './App.css';
// import ApiComponent from './components/apiComponent';
// import { useState, useEffect } from 'react';

// function App() {
//   // const makeAPICall = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:8080/api/tutorials/', { mode: 'cors' });
//   //     const data = await response.json();
//   //     console.log({ data })
//   //   }
//   //   catch (e) {
//   //     console.log(e)
//   //   }
//   // }
//   // useEffect(() => {
//   //   makeAPICall();
//   // }, [])
//   return (
//     <div className="App">
//       <ApiComponent />
//     </div>
//   );
// }

// export default App;

// import ApiComponent from './components/apiComponent';

import React, { useState, useEffect, Component } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import { Link } from "react-router-dom";

class App2 extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      isloggedin: false,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        isloggedin: true,
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    else {
      this.setState({
        isloggedin: false,
        currentUser: undefined,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <>
        <div>
          <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/"} className="navbar-brand m-2 p-2">
                Logo
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item col">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
                {showModeratorBoard && (
                  <li className="nav-item col">
                    <Link to={"/mod"} className="nav-link">
                      Moderator Board
                    </Link>
                  </li>
                )}
                {showAdminBoard && (
                  <li className="nav-item col">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item col">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                )}
              </div>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item col">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item col">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link col">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link col">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </nav>

            <Routes>
              {/* Mapping multiple path for one component */}

              {/* Home */}
              {["/", "/home", "/Home"].map((path) => (
                <Route exact path={path} element={<Home />} key={path.uid} />
              ))}

              {/* login */}
              {["/login"].map((path) => (
                <Route exact path={path} element={<Login />} key={path.uid} />
              ))}

              {/* register */}
              {["/register"].map((path) => (
                <Route exact path={path} element={<Register />} key={path.uid} />
              ))}

              {/* profile */}
              {["/profile"].map((path) => (
                <Route exact path={path} element={<Profile />} key={path.uid} />
              ))}

              {/* user */}
              {["/user"].map((path) => (
                <Route path={path} element={<BoardUser />} key={path.uid} />
              ))}

              {/* mod */}
              {["/mod"].map((path) => (
                <Route path={path} element={<BoardModerator />} key={path.uid} />
              ))}

              {/* admin */}
              {["/admin"].map((path) => (
                <Route path={path} element={<BoardAdmin />} key={path.uid} />
              ))}
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}
export default App2;