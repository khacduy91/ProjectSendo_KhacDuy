import React from "react";
import "./index.scss";

class ShopCardSENMALL extends React.Component {
  render() {
    return (
      <div className="shopSenMall-container">
        <div className="shopSenMall-container-row1">
          <div className="shopSenMall-container-row1-logo">
            <img
              src={this.props.shop.shop.shop_logo}
              alt={this.props.shop.shop.shop_name}
            />
          </div>
          <div className="shopSenMall-container-row1-shop">
            <p>{this.props.shop.shop.shop_name}</p>
            <p>
              <span style={{ color: "#4a90e2" }}>
                {this.props.shop.shop.total_product}
              </span>{" "}
              sản phẩm
            </p>
          </div>
        </div>
        <div className="shopSenMall-container-row2">
          {this.props.shop.products.map((ele, index) => (
            <img src={ele.image} alt="{this.shop.shop.shop_name}" key={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default ShopCardSENMALL;
