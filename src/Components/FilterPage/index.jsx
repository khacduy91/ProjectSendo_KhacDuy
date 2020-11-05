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
    this.props.getArrayFilter(this.props.query);
    this.props.getProductFilter(
      "",
      "",
      "",
      this.props.query,
      "96",
      "sortType=rank"
    );
    // this.props.getStatusFilter("startLoading");
  }

  handleCheckBox_PositionTop = (length) => {
    // this.props.getStatusFilter("startLoading");
    //Position Top
    let pathPositionTop = [];
    for (let i = 0; i < length; i++) {
      const eleId_PositionTop = document.getElementById(`PositionTopWeb${i}`);
      console.log(eleId_PositionTop, "checked");
      eleId_PositionTop.checked === true &&
        pathPositionTop.push(eleId_PositionTop.value);
    }

    this.setState(
      { pathPositionTop: `${pathPositionTop.join("&")}`, page: 1 },
      () => {
        console.log(pathPositionTop, "pathPositionTop");
        this.props.getProductFilter(
          this.state.pathPositionTop,
          this.state.pathDefault,
          this.state.pathGeneral,
          this.props.query,
          "96",
          this.state.sortType
        );
      }
    );
  };
  handleCheckBox_General = (length) => {
    // this.props.getStatusFilter("startLoading");
    //GeneralTerm
    let pathGeneral = [];
    for (let i = 0; i < length; i++) {
      const eleId_General = document.getElementById(`GeneralWeb${i}`);
      eleId_General.checked === true && pathGeneral.push(eleId_General.value);
    }

    this.setState({ pathGeneral: `&${pathGeneral.join("&")}`, page: 1 }, () => {
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        "96",
        this.state.sortType
      );
    });
  };

  handleCheckBox_Default = () => {
    // this.props.getStatusFilter("startLoading");
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
    const path = [];
    for (let i = 0; i < pathDefault_attribute_Key.length; i++) {
      const key = pathDefault_attribute_Key[i];
      const value = pathDefault_attribute_Value[i];
      path.push(`${key}=${value}`);
    }

    this.setState({ pathDefault: path.join("&"), page: 1 }, () => {
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        "96",
        this.state.sortType
      );
    });
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
    this.setState({ sortType: a, page: 1 }, () => {
      const elArr = document.getElementsByName("page-item");

      for (let i = 0; i < elArr.length; i++) {
        const eleId = document.getElementById(`page-item-${i + 1}`);
        eleId.classList.remove("active");
      }
      document
        .getElementById(`page-item-${this.state.page}`)
        .classList.add("active");
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        "96",
        this.state.sortType
      );
    });
  };

  //Page button
  handlePage = (a) => {
    this.setState({ ...this.state, page: a }, () => {
      const elArr = document.getElementsByName("page-item");
      console.log(elArr, "aaa");
      for (let i = 0; i < elArr.length; i++) {
        const eleId = document.getElementById(`page-item-${i + 1}`);
        eleId.classList.remove("active");
      }
      // document.getElementsByName("page-item").classList.remove("active");
      document
        .getElementById(`page-item-${this.state.page}`)
        .classList.add("active");
    });
  };
  handleNextPage = () => {
    this.setState(
      {
        ...this.state,
        page: this.state.page + 1 < 4 ? this.state.page + 1 : 4,
      },
      () => {
        const elArr = document.getElementsByName("page-item");
        console.log(elArr, "aaa");
        for (let i = 0; i < elArr.length; i++) {
          const eleId = document.getElementById(`page-item-${i + 1}`);
          eleId.classList.remove("active");
        }
        // document.getElementsByName("page-item").classList.remove("active");
        document
          .getElementById(`page-item-${this.state.page}`)
          .classList.add("active");
      }
    );
  };
  handlePrevPage = () => {
    this.setState(
      {
        ...this.state,
        page: this.state.page - 1 < 1 ? 1 : this.state.page - 1,
      },
      () => {
        const elArr = document.getElementsByName("page-item");
        console.log(elArr, "aaa");
        for (let i = 0; i < elArr.length; i++) {
          const eleId = document.getElementById(`page-item-${i + 1}`);
          eleId.classList.remove("active");
        }
        // document.getElementsByName("page-item").classList.remove("active");
        document
          .getElementById(`page-item-${this.state.page}`)
          .classList.add("active");
      }
    );
  };

  // Filter Mobile
  handleCloseFilter = (a) => {
    document.getElementById(`${a}`).style.left = "-100%";
    document.getElementById("root").style.position = "unset";
    document.getElementById("root").style.width = "100%";
    document.getElementById(`button${a}`).style.display = "none";
    document.getElementById(`${a}Title`).style.left = "-100%";
  };
  filterMobile = (a) => {
    document.getElementById(`${a}`).style.left = "0";
    document.getElementById(`${a}Title`).style.left = "0";
    document.getElementById("root").style.position = "fixed";
    document.getElementById("filterTermTitle").style.display = "block";
    document.getElementById("root").style.width = "100%";
    document.getElementById(`button${a}`).style.display = "block";
  };

  // Submit mobile
  getSelection = (a, b, c) => {
    //Position Top
    let pathPositionTop = [];
    for (let i = 0; i < a; i++) {
      const eleId_PositionTop = document.getElementById(`PositionTop${i}`);
      eleId_PositionTop.checked === true &&
        pathPositionTop.push(eleId_PositionTop.value);
    }

    //General
    let pathGeneral = [];
    for (let i = 0; i < b; i++) {
      const eleId_General = document.getElementById(`General${i}`);
      eleId_General.checked === true && pathGeneral.push(eleId_General.value);
    }

    //Default
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
    const path = [];
    for (let i = 0; i < pathDefault_attribute_Key.length; i++) {
      const key = pathDefault_attribute_Key[i];
      const value = pathDefault_attribute_Value[i];
      path.push(`${key}=${value}`);
    }

    //setState  3 path
    this.setState(
      {
        pathPositionTop: `${pathPositionTop.join("&")}`,
        pathGeneral: `&${pathGeneral.join("&")}`,
        pathDefault: path.join("&"),
        page: 1,
      },
      () => {
        const elArr = document.getElementsByName("page-item");
        for (let i = 0; i < elArr.length; i++) {
          const eleId = document.getElementById(`page-item-${i + 1}`);
          eleId.classList.remove("active");
        }
        document
          .getElementById(`page-item-${this.state.page}`)
          .classList.add("active");
      }
    );
  };
  handleSubmitMobile = () => {
    console.log("baby ah");
    this.props.getProductFilter(
      this.state.pathPositionTop,
      this.state.pathDefault,
      this.state.pathGeneral,
      this.props.query,
      "96",
      this.state.sortType
    );
    this.handleCloseFilter("filterTerm");
  };

  componentDidUpdate() {
    if (this.props.isUpdate) {
      console.log("isupdate");
      this.props.getProductFilter(
        this.state.pathPositionTop,
        this.state.pathDefault,
        this.state.pathGeneral,
        this.props.query,
        "96",
        this.state.sortType
      );
      const elArr = document.getElementsByName("page-item");
      console.log(elArr, "aaa");
      for (let i = 0; i < elArr.length; i++) {
        const eleId = document.getElementById(`page-item-${i + 1}`);
        eleId.classList.remove("active");
      }
      // document.getElementsByName("page-item").classList.remove("active");
      document
        .getElementById(`page-item-${this.state.page}`)
        .classList.add("active");
      this.props.change_isUpdate(false);
    }
  }
  //render
  render() {
    return (
      <div className="FilterPage-wraper">
        {/* filter Icon */}
        {this.props.generalTerm.length > 0 && (
          <div className="filterIcon">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="filter"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-filter fa-w-16 fa-3x"
              onClick={() => this.filterMobile("filterTerm")}
            >
              <path
                fill="currentColor"
                d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
                className=""
              ></path>
            </svg>
          </div>
        )}
        {/*End filter Icon */}

        {/* Filter Container Mobile  */}

        {this.props.generalTerm.length > 0 && (
          <div className="filterTerm" id="filterTerm">
            <p id="filterTermTitle">Bộ lọc sản phẩm</p>
            <button
              onClick={() => this.handleCloseFilter("filterTerm")}
              id="buttonfilterTerm"
            >
              x
            </button>
            {/* generalTerm_PositionTop */}
            <div
              onChange={() =>
                this.getSelection(
                  this.props.generalTerm_PositionTop.length,
                  this.props.generalTerm.length,
                  this.props.defaultTerm.length
                )
              }
            >
              {this.props.generalTerm_PositionTop &&
                this.props.generalTerm_PositionTop.map((ele, index) =>
                  index === 0 ? (
                    <div className="form-check-inline PositionTop" key={index}>
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
                    <div className="form-check-inline PositionTop" key={index}>
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

            {/* generalTerm */}
            <div
              onChange={() =>
                this.getSelection(
                  this.props.generalTerm_PositionTop.length,
                  this.props.generalTerm.length,
                  this.props.defaultTerm.length
                )
              }
            >
              {this.props.generalTerm.map((ele, index) => (
                <div className="form-check-inline" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`General${index}`}
                    value={`${ele.attribute_key}=${
                      ele.attribute_value[ele.attribute_key]
                    }`}
                  />
                  <label className="form-check-label">
                    {ele.attribute_name}
                  </label>
                </div>
              ))}
            </div>

            {/* defaultTerm */}
            <div
              onChange={() =>
                this.getSelection(
                  this.props.generalTerm_PositionTop.length,
                  this.props.generalTerm.length,
                  this.props.defaultTerm.length
                )
              }
            >
              {this.props.defaultTerm.map((ele, indexa) => (
                <div key={indexa}>
                  <p>{ele.attribute_name}</p>
                  {this.props.defaultTerm[indexa].attribute_value.map(
                    (ele, indexb) => (
                      <div className="form-check-inline" key={indexb}>
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={this.props.defaultTerm[indexa].attribute_key}
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
              ))}
            </div>
            {/* button Search */}
            <button id="mobileSearch" onClick={() => this.handleSubmitMobile()}>
              Search
            </button>
          </div>
        )}
        {/* End Filter Container Mobile */}
        <div className="FilterPage-wraper-left">
          {this.props.defaultTerm.length > 0 ? (
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
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`GeneralWeb${index}`}
                              value={`${ele.attribute_key}=${
                                ele.attribute_value[ele.attribute_key]
                              }`}
                            />
                            <label className="form-check-label">
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
          ) : (
            <div
              className="FilterPage-wraper-left-container-DefaultTerm"
              id="accordion"
            >
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
                    <div className="card-body DefaultTerm-header-body">
                      <div className="form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="General0"
                          value="is_pay_later=1"
                        />
                        <label className="form-check-label">
                          Mua trước trả sau
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="General1"
                          value="is_combo_discount=1"
                        />
                        <label className="form-check-label">
                          Mua gói siêu hời
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="General2"
                          value="is_quantity_discount=1"
                        />
                        <label className="form-check-label">
                          Mua nhiều giảm giá
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="General3"
                          value="is_promotion=1"
                        />
                        <label className="form-check-label">Khuyến mãi</label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="General4"
                          value="is_using_instant=1"
                        />
                        <label className="form-check-label">Hỏa tốc 3h</label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="General5"
                          value="promotion_app=1"
                        />
                        <label className="form-check-label">
                          Khuyến mãi app
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="General6"
                          value="is_installment=1"
                        />
                        <label className="form-check-label">Trả góp 0%</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="FilterPage-wraper-right">
          <div className="FilterPage-wraper-right-container-PositionTop">
            {this.props.generalTerm_PositionTop.length > 0 ? (
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
                            id={`PositionTopWeb${index}`}
                            value={`${ele.attribute_key}=${
                              ele.attribute_value[ele.attribute_key]
                            }`}
                            className="form-check-input checked"
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
                            id={`PositionTopWeb${index}`}
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
            ) : (
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
            )}
          </div>
          {/* <p>Sản phẩm</p> */}
          <div className="FilterPage-wraper-right-container-ProductCardFILTER">
            {this.props.statusFilter === "startLoading" && (
              <div className="loadingImg">
                <img
                  src="https://raw.githubusercontent.com/khacduy91/DuyVuCV/gh-pages/newgif.gif"
                  alt="loading"
                ></img>
              </div>
            )}
            <p>{this.props.errMsg}</p>
            {Object.keys(this.props.productFilter).length > 0 &&
              this.props.productFilter.map(
                (ele, index) =>
                  index < 24 * this.state.page &&
                  index >= 24 * (this.state.page - 1) && (
                    <ProductCardFILTER
                      product={ele}
                      key={index}
                      index={index}
                    />
                  )
              )}
          </div>

          {Object.keys(this.props.productFilter).length > 0 && (
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => this.handlePrevPage()}
                >
                  Previous
                </button>
              </li>
              <li
                className="page-item active"
                id="page-item-1"
                name="page-item"
              >
                <button
                  className="page-link"
                  onClick={() => this.handlePage(1)}
                >
                  1
                </button>
              </li>
              <li className="page-item" id="page-item-2" name="page-item">
                <button
                  className="page-link"
                  onClick={() => this.handlePage(2)}
                >
                  2
                </button>
              </li>
              <li className="page-item" id="page-item-3" name="page-item">
                <button
                  className="page-link"
                  onClick={() => this.handlePage(3)}
                >
                  3
                </button>
              </li>
              <li className="page-item" id="page-item-4" name="page-item">
                <button
                  className="page-link"
                  onClick={() => this.handlePage(4)}
                >
                  4
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => this.handleNextPage()}
                >
                  Next
                </button>
              </li>
            </ul>
          )}
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
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(FilterPage);
