import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get_HistoryProduct, change_isUpdate } from "../../redux/action";
import { Skeleton } from "antd";

class ProductCardFLASHSALE extends React.Component {
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
    const { product } = this.props;
    // console.log(product.stock_percent, "stock");
    const autoShow = setTimeout(
      () => this.setState({ loading: false }, clearTimeout(autoShow)),
      1700
    );

    return (
      <div className="productCard_FLASHSALE">
        {this.state.loading ? (
          <Skeleton.Avatar
            active="true"
            shape="square"
            style={{ width: "200px", height: "200px" }}
          ></Skeleton.Avatar>
        ) : (
          <div className="productCard_FLASHSALE-Card">
            {product.stock_percent === 100 && (
              <img
                src="https://media3.scdn.vn/img2/2018/8_6/CET2Q5.png"
                alt="sold-out"
                id="sold-out"
              />
            )}
            <Link
              to={`/ProjectSendo_KhacDuy/detail?id=${this.props.product.product_id}&name=${this.props.product.name}&adminid=${this.props.product.deal_id}`}
              id={this.props.product.id}
              onClick={() =>
                this.handleHistoryProduct(
                  this.props.product.product_id,
                  this.props.product.img_url_mob,
                  this.props.product.name,
                  this.props.product.admin_id
                )
              }
            >
              <img src={product.img_url_mob} alt={product.name} />
            </Link>

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
          </div>
        )}
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  historyProduct: state.historyProduct,
  isUpdate: state.isUpdate,
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
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(ProductCardFLASHSALE);
