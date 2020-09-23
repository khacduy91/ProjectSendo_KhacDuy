import React from "react";
import "./index.scss";

class ProductCardFILTER extends React.Component {
  render() {
    console.log(20 * this.props.product.percent_star, this.props.index);
    var styleElem = document.head.appendChild(document.createElement("style"));

    styleElem.innerHTML = `.rating${
      this.props.index
    }::before {background: linear-gradient(90deg, #e5101d ${
      20 * this.props.product.percent_star
    }%, #c7c7cd 0);}`;
    return (
      <a href="/" className="productCardFILTER-Card">
        <img
          className="productCardFILTER-Card-img"
          src={this.props.product.image}
          alt=""
        />
        <div className="productCardFILTER-Card-title">
          {this.props.product.shop_badge_url && (
            <img
              className="productCardFILTER-Card-title-img"
              src={this.props.product.shop_badge_url}
              alt=""
            />
          )}
          <p>{this.props.product.name}</p>
        </div>
        <div className="productCardFILTER-Card-price">
          <p className="finalPrice">
            {this.props.product.final_price.toLocaleString()}đ
          </p>
          <p className="priceMax">
            {this.props.product.price_max.toLocaleString()}
          </p>
        </div>

        {/* rating star */}

        <div className={`percentStar rating${this.props.index}`}>
          <p>{this.props.product.percent_star}</p>
        </div>
      </a>
    );
  }
}

export default ProductCardFILTER;
