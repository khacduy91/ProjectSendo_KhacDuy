import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePages from "./Components/HomePages/index.jsx";
import FilterPage from "./Components/FilterPage/index.jsx";
import Layout from "./Components/Layout";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Layout>
            <Switch>
              <Route
                exact
                path="/ProjectSendo_KhacDuy/"
                component={HomePages}
              />
              <Route
                exact
                path="/ProjectSendo_KhacDuy/filter"
                component={FilterPage}
              />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
