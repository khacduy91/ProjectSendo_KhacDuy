import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getQuery,
  get_HistoryQuery,
  change_isUpdate,
} from "../../redux/action";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

class ProductCardRECOMMEND extends React.Component {
  state = {
    loading: true,
  };
  handleClickRECOMMEND = () => {
    this.props.getQuery(this.props.product.category_name);
    this.props.get_HistoryQuery(this.props.product.category_name);
    this.props.change_isUpdate(!this.props.isUpdate);
  };
  render() {
    const autoShow = setTimeout(
      () => this.setState({ loading: false }, clearTimeout(autoShow)),
      1700
    );
    return (
      <>
        {this.state.loading ? (
          <Skeleton.Avatar
            active="true"
            shape="square"
            style={{ width: "200px", height: "200px" }}
          ></Skeleton.Avatar>
        ) : (
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
        )}
      </>
    );
  }
}
const mapsStateToProps = (state) => ({
  query: state.query,
  isUpdate: state.isUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getQuery,
      get_HistoryQuery,
      change_isUpdate,
    },
    dispatch
  ),
});
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(ProductCardRECOMMEND);
