import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get_HistoryProduct } from "../../redux/action";

class ProductCardFLASHSALE extends React.Component {
  handleHistoryProduct = (a, b, c) => {
    var product = Object();
    product.id = a;
    product.img = b;
    product.name = c;
    this.props.get_HistoryProduct(product);
  };
  render() {
    const { product } = this.props;

    return (
      <div className="productCard_FLASHSALE">
        <Link
          to={`/ProjectSendo_KhacDuy/detail?id=${this.props.product.product_id}&name=${this.props.product.name}&adminid=${this.props.product.deal_id}`}
          className="productCardFILTER-Card"
          id={this.props.product.id}
          onClick={() =>
            this.handleHistoryProduct(
              this.props.product.product_id,
              this.props.product.mg_url_mob,
              this.props.product.name
            )
          }
        >
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
        </Link>
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  historyProduct: state.historyProduct,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      get_HistoryProduct,
    },
    dispatch
  ),
});
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(ProductCardFLASHSALE);
