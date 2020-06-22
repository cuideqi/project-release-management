import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import Header from "./pages/Header";
import Backend from "./pages/back-end/Backend";
import Frontend from "./pages/front-end/Frontend";
import Nav from "./pages/Nav";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="left-nav">
          <Nav />
        </div>
        <div className="content">
          <Switch>
            <Route path="/frontend" exact component={Frontend} />
            <Route path="/backend" component={Backend} />
            <Redirect from="/" to="/frontend" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
