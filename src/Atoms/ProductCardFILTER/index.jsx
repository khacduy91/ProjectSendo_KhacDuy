import React from "react";
import "./index.scss";

class ProductCardFILTER extends React.Component {
  render() {
    var styleElem = document.head.appendChild(document.createElement("style"));

    styleElem.innerHTML = `.rating${
      this.props.index
    }::before {background: linear-gradient(90deg, #e5101d ${
      20 * this.props.product.percent_star
    }%, #c7c7cd 0);}`;
    return (
      <a href="/" className="productCardFILTER-Card">
        <div className="productCardFILTER-Card-wraper">
          <img
            className="productCardFILTER-Card-wraper-img"
            src={this.props.product.image}
            alt=""
          />
          <div className="productCardFILTER-Card-wraper-title">
            {this.props.product.shop_badge_url && (
              <img
                className="productCardFILTER-Card-wraper-title-img"
                src={this.props.product.shop_badge_url}
                alt=""
              />
            )}
            <p>{this.props.product.name}</p>
          </div>
          <div className="productCardFILTER-Card-wraper-price">
            <p className="finalPrice">
              {this.props.product.final_price.toLocaleString()}đ
            </p>
            <p className="priceMax">
              {this.props.product.price_max.toLocaleString()}
            </p>
          </div>

          {/* rating star */}

          {this.props.product.total_rated !== 0 && (
            <div className={`percentStar rating${this.props.index}`}>
              {/* <p>{`(${this.props.product.percent_star})`}</p> */}
              <p>{`(${this.props.product.total_rated})`}</p>
            </div>
          )}

          {/* Order Count */}
          {this.props.product.order_count !== 0 && (
            <div className="orderCount">
              <svg
                width="10px"
                height="10px"
                viewBox="0 0 32 32"
                className="icon_Mf-x iconSmall_2eXS"
              >
                <path d="M27.292 15.496l-10.8-10.8A2.378 2.378 0 0014.808 4H6.4C5.08 4 4 5.08 4 6.4v8.4c0 .66.264 1.26.708 1.704l10.8 10.8A2.385 2.385 0 0017.2 28h.012c.658 0 1.253-.271 1.679-.708l8.4-8.4a2.342 2.342 0 00.708-1.68v-.013.001c0-.66-.276-1.272-.708-1.704zM8.2 10c-.996 0-1.8-.804-1.8-1.8s.804-1.8 1.8-1.8 1.8.804 1.8 1.8S9.196 10 8.2 10z"></path>
              </svg>
              <p>{this.props.product.order_count}</p>
            </div>
          )}

          {/* promotion Percent */}
          {this.props.product.promotion_percent !== 0 && (
            <div className="promotionPercent">
              <span>-{this.props.product.promotion_percent}%</span>
            </div>
          )}
        </div>
        {/* shop */}
        <div className="shopName">
          <p>{this.props.product.shop_name}</p>
        </div>
      </a>
    );
  }
}

export default ProductCardFILTER;
