import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDataProduct,
  getProductFilter,
  getArrayFilter,
  getPath_Default,
  change_isUpdate,
  getStatusFilter,
  handleSort,
} from "../../redux/action";
import ProductCardFILTER from "../../Atoms/ProductCardFILTER";

class FilterPage extends React.Component {
  state = {
    pathPositionTop: "",
    pathGeneral: "",
    pathDefault: "",
    sortType: "sortType=rank",
    page: 1,
  };

  componentDidMount() {
    // this.props.getArrayFilter(this.props.query);
    this.props.getProductFilter(
      this.props.query,
      this.props.page,
      false,
      this.props.productFilter
    );
    // this.props.getStatusFilter("startLoading");
  }

  componentDidUpdate() {
    if (this.props.isUpdate) {
      console.log("isupdate");
      this.setState({
        ...this.state,
      });
      this.props.change_isUpdate(false);
    }
  }
  //render
  render() {
    var body = document.getElementById("root");
    body.animate({ scrollTop: "0px" }, 0.2);
    // body.scrollTop = 0;
    return (
      <div className="FilterPage-wraper">
        <div className="productFilter">
          <div className="productFilter-wraper">
            <div className="productFilter-title">
              <p>KẾT QUẢ TÌM KIẾM</p>
              <div>
                <select
                  id="sort"
                  onChange={(e) =>
                    this.props.handleSort(
                      e.target.value,
                      this.props.productFilter
                    )
                  }
                >
                  <option value="sapxeptheo">Sắp xếp theo</option>
                  <option value="thapdencao">Giá thấp đến cao</option>
                  <option value="caodenthap">Giá cao đến thấp</option>
                  <option value="muanhieunhat">Mua nhiều nhất</option>
                  <option value="dangkhuyenmai">Đang khuyến mãi</option>
                </select>
              </div>
            </div>

            {Object.keys(this.props.productFilter).length > 0 && (
              <div
                className="productFilter-container"
                id="productFilter-container"
                // style={this.props.productFi }
              >
                {this.props.productFilter.map((ele, index) => (
                  <ProductCardFILTER product={ele} key={index} index={index} />
                ))}
              </div>
            )}
            {this.props.statusFilter === "startLoading" && (
              <div className="loadingImg">
                <img
                  src="https://raw.githubusercontent.com/khacduy91/DuyVuCV/gh-pages/newgif.gif"
                  alt="loading"
                ></img>
              </div>
            )}
            <div className="loadmore">
              <button
                onClick={() =>
                  this.props.getProductFilter(
                    this.props.query,
                    this.props.page + 1,
                    true,
                    this.props.productFilter
                  )
                }
              >
                Loadmore
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  productFilter: state.productFilter,
  defaultTerm: state.defaultTerm,
  generalTerm: state.generalTerm,
  generalTerm_PositionTop: state.generalTerm_PositionTop,
  query: state.query,
  page: state.page,
  pathDefault: state.pathDefault,
  errMsg: state.errMsg,
  isUpdate: state.isUpdate,
  statusFilter: state.statusFilter,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDataProduct,
      getProductFilter,
      getArrayFilter,
      getPath_Default,
      change_isUpdate,
      getStatusFilter,
      handleSort,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(FilterPage);
