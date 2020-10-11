import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getQuery, get_HistoryQuery } from "../../redux/action";
import { Link } from "react-router-dom";

class ProductCardRECOMMEND extends React.Component {
  handleClickRECOMMEND = () => {
    this.props.getQuery(this.props.product.category_name);
    this.props.get_HistoryQuery(this.props.product.category_name);
  };
  render() {
    return (
      <div className="productCardRECOMMEND-Card">
        <Link
          to="/ProjectSendo_KhacDuy/filter"
          onClick={() => this.handleClickRECOMMEND()}
        >
          <img src={this.props.product.product_list[0].img_url} alt="" />
        </Link>

        <Link
          to="/ProjectSendo_KhacDuy/filter"
          onClick={() => this.handleClickRECOMMEND()}
        >
          <p>{this.props.product.category_name}</p>
        </Link>
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
    },
    dispatch
  ),
});
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(ProductCardRECOMMEND);
