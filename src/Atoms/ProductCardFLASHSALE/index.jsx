import React from "react";
import "./index.scss";

class ProductCardFLASHSALE extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div className="productCard_FLASHSALE">
        <a href="/">
          <img src={product.img_url_mob} alt={product.name} />
          <p className="productCard_FLASHSALE-price">
            {product.price.toLocaleString()}đ
          </p>
          <div className="progress">
            <p>{product.stock_description}</p>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${product.stock_percent}%` }}
            ></div>
          </div>
        </a>
      </div>
    );
  }
}

export default ProductCardFLASHSALE;
