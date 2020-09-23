import React from "react";
import "./index.scss";

class ProductCardRECOMMEND extends React.Component {
  render() {
    return (
      <a href="/" className="productCardRECOMMEND-Card">
        <img src={this.props.product.product_list[0].img_url} alt="" />
        <p>{this.props.product.category_name}</p>
        <div
          className="productCardRECOMMEND-Card-color"
          style={{
            backgroundColor:
              this.props.index % 4 === 1
                ? "#f35963"
                : this.props.index % 4 === 2
                ? "#ace422"
                : this.props.index % 4 === 3
                ? "#ffa724"
                : "#82d8e3",
          }}
        ></div>
      </a>
    );
  }
}

export default ProductCardRECOMMEND;
