import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePages from "./Components/HomePages/index.jsx";
import FilterPage from "./Components/FilterPage/index.jsx";
import CartPage from "./Components/CartPage/index.jsx";
import Layout from "./Components/Layout";
import "./App.css";
import DetailPage from "./Components/DetailPage/index.jsx";

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
              <Route
                // exact
                path="/ProjectSendo_KhacDuy/detail"
                component={DetailPage}
              />
              <Route
                exact
                path="/ProjectSendo_KhacDuy/cart"
                component={CartPage}
              />
              <Redirect to="/ProjectSendo_KhacDuy" />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
