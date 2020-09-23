import React from "react";
import "./index.scss";

class ProductCardTOPKEYWORD extends React.Component {
  render() {
    return (
      <a href="/" className="productCardTOPKEYWORD-Card">
        <img src={this.props.product.image} alt="" />
        <p>{this.props.product.name}</p>
        <div
          className="productCardTOPKEYWORD-Card-color"
          // style={{
          //   backgroundColor:
          //     this.props.index % 4 === 1
          //       ? "#f35963"
          //       : this.props.index % 4 === 2
          //       ? "#ace422"
          //       : this.props.index % 4 === 3
          //       ? "#ffa724"
          //       : "#82d8e3",
          // }}
        ></div>
      </a>
    );
  }
}

export default ProductCardTOPKEYWORD;
