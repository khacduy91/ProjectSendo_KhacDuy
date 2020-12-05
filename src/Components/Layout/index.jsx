import React from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer";
// import { BrowserRouter as Switch } from "react-router-dom";

class Layout extends React.Component {
  componentDidUpdate(prevProps) {
    if (window.location.pathname !== prevProps.window.location.pathname) {
      window.scrollTo(0, 0);
      console.log("aa");
    }
  }
  render(props) {
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
