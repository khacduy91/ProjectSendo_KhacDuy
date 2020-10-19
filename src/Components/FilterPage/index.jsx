import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDataProduct,
  getProductFilter,
  getArrayFilter,
  getPath_Default,
} from "../../redux/action";
import ProductCardFILTER from "../../Atoms/ProductCardFILTER";

class FilterPage extends React.Component {
  state = {
    pathPositionTop: "",
    pathGeneral: "",
    pathDefault: "",
    sortType: "sortType=rank",
  };

  componentDidMount() {
    this.props.getArrayFilter(this.props.query);
    this.props.getProductFilter(
      "",
      "",
      "",
      this.props.query,
      "32",
      "sortType=rank"
    );
  }

  handleCheckBox_PositionTop = (length) => {
    //Position Top
    let pathPositionTop = [];
    for (let i = 0; i < length; i++) {
      const eleId_PositionTop = document.getElementById(`PositionTop${i}`);
      eleId_PositionTop.checked === true &&
        pathPositionTop.push(eleId_PositionTop.value);
    }

    this.setState({ pathPositionTop: `${pathPositionTop.join("&")}` }, () =>
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        "32",
        this.state.sortType
      )
    );
  };
  handleCheckBox_General = (length) => {
    //GeneralTerm
    let pathGeneral = [];
    for (let i = 0; i < length; i++) {
      const eleId_General = document.getElementById(`General${i}`);
      eleId_General.checked === true && pathGeneral.push(eleId_General.value);
    }

    this.setState({ pathGeneral: `&${pathGeneral.join("&")}` }, () =>
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        "32",
        this.state.sortType
      )
    );
  };

  handleCheckBox_Default = () => {
    //GeneralTerm
    let pathDefault_attribute_Key = [];
    let pathDefault_attribute_Value = [];
    const ele_Default = document.getElementsByName("defaultTerm");
    for (let i = 0; i < ele_Default.length; i++) {
      const ele_Default_ByName = ele_Default[i];

      if (ele_Default_ByName.checked === true) {
        pathDefault_attribute_Key.push(ele_Default_ByName.id);
        pathDefault_attribute_Value.push(ele_Default_ByName.value);
        for (let i = 0; i < pathDefault_attribute_Key.length - 1; i++) {
          const checkKey = pathDefault_attribute_Key[i];
          if (
            checkKey ===
            pathDefault_attribute_Key[pathDefault_attribute_Key.length - 1]
          ) {
            pathDefault_attribute_Key.splice(
              pathDefault_attribute_Key.length - 1,
              1
            );
            pathDefault_attribute_Value.splice(
              pathDefault_attribute_Value.lenght - 1,
              1
            );
            pathDefault_attribute_Value[
              i
            ] = `${pathDefault_attribute_Value[i]},${ele_Default_ByName.value}`;
          }
        }
      }
    }
    console.log(pathDefault_attribute_Value, "value");
    console.log(pathDefault_attribute_Key, "key");
    const path = [];
    for (let i = 0; i < pathDefault_attribute_Key.length; i++) {
      const key = pathDefault_attribute_Key[i];
      const value = pathDefault_attribute_Value[i];
      path.push(`${key}=${value}`);
    }

    this.setState({ pathDefault: path.join("&") }, () =>
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        "32",
        this.state.sortType
      )
    );
  };

  handleSort = (a, b) => {
    const ele_ByName = document.getElementsByName("listOption");
    console.log(ele_ByName.length);
    for (let i = 0; i < ele_ByName.length; i++) {
      const element = ele_ByName[i];
      element.classList.remove("activeSort");
    }

    const ele_Id = document.getElementById(b);
    ele_Id.classList.add("activeSort");

    this.setState({ sortType: a }, () =>
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        32,
        this.state.sortType
      )
    );
  };
  render() {
    return (
      <div className="FilterPage-wraper">
        <div className="FilterPage-wraper-left">
          {this.props.defaultTerm.length > 0 && (
            <div
              className="FilterPage-wraper-left-container-DefaultTerm"
              id="accordion"
            >
              {this.props.generalTerm.length > 0 && (
                <div className="DefaultTerm">
                  <div className="card">
                    <div className="card-header DefaultTerm-header">
                      <a
                        className="card-link DefaultTerm-header-link"
                        data-toggle="collapse"
                        href="#general"
                      >
                        BỘ LỌC SẢN PHẨM
                      </a>
                    </div>
                    <div id="general" className="collapse show">
                      <div
                        className="card-body DefaultTerm-header-body"
                        onChange={() =>
                          this.handleCheckBox_General(
                            this.props.generalTerm.length
                          )
                        }
                      >
                        {this.props.generalTerm.map((ele, index) => (
                          <div className="form-check-inline" key={index}>
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`General${index}`}
                                value={`${ele.attribute_key}=${
                                  ele.attribute_value[ele.attribute_key]
                                }`}
                              />
                              {ele.attribute_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.props.defaultTerm.map((ele, indexa) => (
                <div className="DefaultTerm" key={`a${indexa}`}>
                  <div className="card">
                    <div className="card-header DefaultTerm-header">
                      <a
                        className="card-link DefaultTerm-header-link"
                        data-toggle="collapse"
                        href={`#collapse${indexa}`}
                      >
                        {ele.attribute_name}
                      </a>
                    </div>
                    <div id={`collapse${indexa}`} className="collapse show">
                      <div
                        className="card-body DefaultTerm-header-body"
                        onChange={() =>
                          this.handleCheckBox_Default(
                            this.props.defaultTerm[indexa].attribute_value
                              .length,
                            this.props.defaultTerm[indexa].attribute_key,
                            indexa
                          )
                        }
                      >
                        {this.props.defaultTerm[indexa].attribute_value.map(
                          (ele, indexb) => (
                            <div className="form-check-inline" key={indexb}>
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={
                                    this.props.defaultTerm[indexa].attribute_key
                                  }
                                  // value={`${this.props.defaultTerm[indexa].attribute_key}=${ele.option_id}`}
                                  value={ele.option_id}
                                  name="defaultTerm"
                                />
                                {ele.option_name}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="FilterPage-wraper-right">
          <div className="FilterPage-wraper-right-container-PositionTop">
            {this.props.generalTerm_PositionTop.length > 0 && (
              <>
                <div
                  className="FilterPage-wraper-right-container-PositionTop-left"
                  onChange={() =>
                    this.handleCheckBox_PositionTop(
                      this.props.generalTerm_PositionTop.length
                    )
                  }
                >
                  {this.props.generalTerm_PositionTop.map((ele, index) =>
                    index === 0 ? (
                      <div
                        className="form-check-inline PositionTop"
                        key={index}
                      >
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            id={`PositionTop${index}`}
                            value={`${ele.attribute_key}=${
                              ele.attribute_value[ele.attribute_key]
                            }`}
                            className="form-check-input"
                          />
                          {ele.attribute_img && (
                            <img src={ele.attribute_img} alt="isEvent" />
                          )}

                          {ele.attribute_name}
                        </label>
                      </div>
                    ) : (
                      <div
                        className="form-check-inline PositionTop"
                        key={index}
                      >
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            id={`PositionTop${index}`}
                            className="form-check-input"
                            value={`${ele.attribute_key}=${
                              ele.attribute_value[ele.attribute_key]
                            }`}
                          />
                          {ele.attribute_name}
                        </label>
                      </div>
                    )
                  )}
                </div>

                <div className="FilterPage-wraper-right-container-PositionTop-right">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-danger button sortType=rank activeSort"
                      id="sortType=rank"
                      name="listOption"
                      onClick={(e) =>
                        this.handleSort("sortType=rank", "sortType=rank")
                      }
                    >
                      Đề cử
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger button sortType=norder_30_desc"
                      name="listOption"
                      id="sortType=norder_30_desc"
                      onClick={(e) =>
                        this.handleSort(
                          "sortType=norder_30_desc",
                          "sortType=norder_30_desc"
                        )
                      }
                    >
                      Bán Chạy
                    </button>
                    <div className="btn-group btn-danger">
                      <select
                        id="listOption"
                        className="listOption sortType=price_asc sortType=price_desc sortType=like_desc"
                        name="listOption"
                        onChange={(e) =>
                          this.handleSort(e.target.value, "listOption")
                        }
                      >
                        <option
                          value="sortType=price_asc"
                          id="sortType=price_asc"
                        >
                          Gía thấp
                        </option>
                        <option
                          value="sortType=price_desc"
                          id="sortType=price_desc"
                        >
                          Giá cao
                        </option>
                        <option
                          value="sortType=like_desc"
                          id="sortType=like_desc"
                        >
                          Lượt yêu thích
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="FilterPage-wraper-right-container-ProductCardFILTER">
            {Object.keys(this.props.productFilter).length > 0 &&
              this.props.productFilter.result.data.map((ele, index) => (
                <ProductCardFILTER product={ele} key={index} index={index} />
              ))}
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
  pathDefault: state.pathDefault,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDataProduct,
      getProductFilter,
      getArrayFilter,
      getPath_Default,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(FilterPage);
