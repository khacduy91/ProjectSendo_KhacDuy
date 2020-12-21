import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get_HistoryProduct, change_isUpdate } from "../../redux/action";
import { Skeleton } from "antd";

class ProductCardFILTER extends React.Component {
  state = {
    loading: true,
  };

  handleHistoryProduct = (a, b, c, d) => {
    var product = Object();
    product.id = a;
    product.img = b;
    product.name = c;
    product.admin_id = d;
    this.props.get_HistoryProduct(product);
    this.props.change_isUpdate(!this.props.isUpdate);
  };

  render() {
    var styleElem = document.head.appendChild(document.createElement("style"));

    styleElem.innerHTML = `.rating${
      this.props.index
    }::before {background: linear-gradient(90deg, #e5101d ${
      20 * this.props.product.percent_star
    }%, #c7c7cd 0);}`;

    const autoShow = setTimeout(
      () => this.setState({ loading: false }, clearTimeout(autoShow)),
      1700
    );

    return (
      <div
        // to={`/ProjectSendo_KhacDuy/detail?id=${this.props.product.id}&name=${this.props.product.name}&adminid=${this.props.product.admin_id}`}
        className="productCardFILTER-Card"
        // onClick={(e) => this.handleClick_Overlay(e)}
      >
        <div className="productCardFILTER-Card-wraper">
          {this.state.loading ? (
            <Skeleton.Avatar
              active="true"
              shape="square"
              style={{ width: "200px", height: "200px" }}
            ></Skeleton.Avatar>
          ) : (
            <>
              <div className="productCardFILTER-Card-wraper-img">
                <Link
                  to={`/ProjectSendo_KhacDuy/detail?id=${this.props.product.id}&name=${this.props.product.name}&adminid=${this.props.product.admin_id}`}
                  id={this.props.product.id}
                  onClick={() =>
                    this.handleHistoryProduct(
                      this.props.product.id,
                      this.props.product.img_url,
                      this.props.product.name,
                      this.props.product.admin_id
                    )
                  }
                >
                  <img src={this.props.product.img_url} alt="" />
                </Link>
              </div>

              <div className="productCardFILTER-Card-wraper-title">
                {this.props.product.shop_badge_url && (
                  <img
                    className="productCardFILTER-Card-wraper-title-img"
                    src={this.props.product.shop_badge_url}
                    alt=""
                  />
                )}
                <Link
                  to={`/ProjectSendo_KhacDuy/detail?id=${this.props.product.id}&name=${this.props.product.name}&adminid=${this.props.product.admin_id}`}
                  id={this.props.product.id}
                  onClick={() =>
                    this.handleHistoryProduct(
                      this.props.product.id,
                      this.props.product.image,
                      this.props.product.name,
                      this.props.product.admin_id
                    )
                  }
                >
                  <p>{this.props.product.name}</p>
                </Link>
              </div>
              <div className="productCardFILTER-Card-wraper-price">
                <p className="finalPrice">
                  {this.props.product.final_price.toLocaleString()}đ
                </p>
                {this.props.product.promotion_percent !== 0 && (
                  <p className="priceMax">
                    {this.props.product.price_max.toLocaleString()}
                  </p>
                )}
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
            </>
          )}
        </div>
        {/* shop */}
        {this.state.loading ? (
          <Skeleton.Input
            style={{ width: "200px" }}
            loading="true"
          ></Skeleton.Input>
        ) : (
          <div className="shopName">
            <p className="shopName">{this.props.product.shop_name}</p>
          </div>
        )}
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  historyProduct: state.historyProduct,
  isUpdate: state.isUpdate,
  statusFilter: state.statusFilter,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      get_HistoryProduct,
      change_isUpdate,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(ProductCardFILTER);
