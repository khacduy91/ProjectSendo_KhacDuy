import React from "react";
import "./index.scss";

class ProductRelated extends React.Component {
  componentDidMount() {
    const arrayProductRelated = JSON.parse(
      "[" + this.props.ProductRelated + "]"
    );
    console.log(arrayProductRelated, "aa");
  }

  render() {
    return <p>{this.props.ProductRelated}</p>;
  }
}

export default ProductRelated;
