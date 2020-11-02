import React from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer";
// import { BrowserRouter as Switch } from "react-router-dom";

class Layout extends React.Component {
  render(props) {
    console.log(this.props.children, "aa");
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
