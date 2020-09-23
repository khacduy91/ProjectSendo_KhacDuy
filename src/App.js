import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePages from "./Components/HomePages/index.jsx";
import Layout from "./Components/Layout";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/ProjectSendo_KhacDuy" component={HomePages} />
        </Layout>
      </Router>
    );
  }
}

export default App;
