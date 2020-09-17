import React from "react";
import { RepositoryDetail, RepositoryList } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div id="App">
        <header className="App-header">
          <h1>Github Repository Browser</h1>
        </header>

        <Switch>
          <Route exact={true} path="/">
            <RepositoryList />
          </Route>
          <Route path="/:owner/:name">
            <RepositoryDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
