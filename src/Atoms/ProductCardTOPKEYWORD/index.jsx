import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getQuery,
  get_HistoryQuery,
  getProductFilter,
  getArrayFilter,
} from "../../redux/action";

class ProductCardTOPKEYWORD extends React.Component {
  handleClick_TOPKEYWORD = () => {
    this.props.getQuery(this.props.product.name);
    this.props.get_HistoryQuery(this.props.product.name);
    // this.props.getProductFilter(
    //   "",
    //   "",
    //   "",
    //   this.props.product.name,
    //   "32",
    //   "sortType=rank"
    // );
    // this.props.getArrayFilter(this.props.product.name);
  };
  render() {
    return (
      <div className="productCardTOPKEYWORD-Card">
        <Link
          to="/ProjectSendo_KhacDuy/filter"
          onClick={() => this.handleClick_TOPKEYWORD()}
        >
          <img src={this.props.product.image} alt="" />
          <p>{this.props.product.name}</p>
        </Link>

        <div className="productCardTOPKEYWORD-Card-color"></div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  query: state.query,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getQuery,
      get_HistoryQuery,
      getProductFilter,
      getArrayFilter,
    },
    dispatch
  ),
});
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(ProductCardTOPKEYWORD);
