import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  getData,
  getBanner,
  getMenu,
  getDataSitemap,
  getThemeEvent,
  getProductFilter,
  getDataProduct,
  getQuery,
  getArrayFilter,
  get_HistoryQuery,
  get_HistoryProduct,
  change_isUpdate,
} from "../../../redux/action";

class Header extends React.Component {
  state = {
    query: "",
    isMobileMenu: false,
    historyProduct: [],
  };
  componentDidMount() {
    this.props.getData();
    this.props.getDataSitemap();
  }
  handleSubmitValue = (e) => {
    this.props.getProductFilter("", "", "", e, "32", "sortType=rank");
    this.props.get_HistoryQuery(e);
    this.props.getArrayFilter(e);
    this.setState({ query: e });
  };
  handleSubmitSearch = (e) => {
    // e.preventDefault();

    this.props.getProductFilter(
      "",
      "",
      "",
      this.props.query,
      "32",
      "sortType=rank"
    );
    this.props.get_HistoryQuery(this.props.query);
    this.props.getArrayFilter(this.props.query);
    this.setState({ query: "" });
  };
  handleChangeSearch = (e) => {
    this.setState({ ...this.state, query: e.target.value }, () =>
      this.props.getQuery(this.state.query)
    );
  };

  handleMobileMenu = () => {
    this.state.isMobileMenu
      ? (document.getElementById("mobileMenu").style.left = "0")
      : (document.getElementById("mobileMenu").style.left = "-100%");
    this.setState({ isMobileMenu: !this.state.isMobileMenu });
  };

  componentDidUpdate() {
    if (this.props.isUpdate) {
      console.log("co khac do bay");
      this.setState({
        ...this.state,
      });
      this.props.change_isUpdate(!this.props.isUpdate);
    }
  }

  render() {
    window.onclick = function (event) {
      if (event.target.className !== "main-row-item2-input searchBox") {
        document.getElementById("historyQuery").style.transform = "scale(0)";
        document.getElementById("historyQuery").style.opacity = "0";
      }
    };
    return (
      <div className="header">
        <div className="header-topBar">
          <div className="header-topBar-container">
            <div className="left_topBar">
              <p>Duy Vu CV Project</p>
            </div>
            <div className="right_topBar">
              <img
                src="https://raw.githubusercontent.com/khacduy91/ProjectSendo_KhacDuy/756b0ba8fe27f822ebaf2dbc88a5d2b89422b6f8/assets/images/avatarUser1.jpg"
                alt="avatartUser1"
                className="avatarUser"
              />
              <p>Vũ Khắc Duy</p>
            </div>
          </div>
        </div>
        <div className="mainMenu">
          <div className="mainMenu-row">
            <div className="mainMenu-row-item1">
              <Link to="/ProjectSendo_KhacDuy">
                <img
                  src="https://raw.githubusercontent.com/khacduy91/ProjectSendo_KhacDuy/756b0ba8fe27f822ebaf2dbc88a5d2b89422b6f8/assets/images/sendoLogo.svg"
                  alt="Sendo Logo"
                />
              </Link>
              <div>
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    d="M3 19h18v-2H3v2zm0-6h8v-2H3v2zm0-8v2h18V5H3zm10 5l4 4 4-4z"
                    fill="#FFF"
                  ></path>
                </svg>
                <a href="/">TẤT CẢ DANH MỤC</a>
              </div>
            </div>
            <div className="mainMenu-row-item2">
              <form
                onSubmit={() => (
                  <Link to="/ProjectSendo_KhacDuy/filter">
                    {(e) => this.handleSubmitSearch(e)}
                  </Link>
                )}
              >
                <div id="historyQuery">
                  {this.props.historyQuery.length > 0 &&
                    this.props.historyQuery.map((ele, index) => (
                      <input
                        type="button"
                        key={index}
                        value={ele}
                        onClick={(e) => this.handleSubmitValue(e.target.value)}
                      />
                    ))}
                </div>

                <input
                  onChange={(e) => this.handleChangeSearch(e)}
                  type="text"
                  placeholder="Tìm kiếm trên Sendo"
                  className="main-row-item2-input searchBox"
                  onClick={() =>
                    this.props.historyQuery.length > 0 &&
                    ((document.getElementById("historyQuery").style.transform =
                      "scale(1)"),
                    (document.getElementById("historyQuery").style.opacity =
                      "1"))
                  }
                  defaultValue={this.state.query}
                  value={this.state.query}
                />

                {this.state.query === "" ? (
                  <button className="main-row-item2-input searchButton">
                    Search
                  </button>
                ) : (
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    className="main-row-item2-input searchButton"
                  >
                    <button
                      className="main-row-item2-input searchButton"
                      onClick={(e) => this.handleSubmitSearch(e)}
                    >
                      Search
                    </button>
                  </Link>
                )}
              </form>
            </div>
            <div className="mainMenu-row-item3">
              <div className="mainMenu-row-item3-images">
                {this.props.historyProduct.length > 0 && (
                  <div style={{ display: "flex" }}>
                    <span>Sản phẩm vừa xem</span>
                    {this.props.historyProduct.map((ele, index) => (
                      <img src={ele.img} alt={ele.name} key={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mainMenu-row-item4">
              <Link to="/ProjectSendo_KhacDuy/cart">
                <svg
                  width="34px"
                  height="34px"
                  viewBox="0 0 24 24"
                  className="iconCart_2ayd"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 18c-1.104 0-1.99.895-1.99 2 0 1.104.886 2 1.99 2a2 2 0 000-4m10 0c-1.104 0-1.99.895-1.99 2 0 1.104.886 2 1.99 2a2 2 0 000-4M4 2H1.999v1.999H4l3.598 7.588-1.353 2.451A2 2 0 008 17h12v-2H8.423a.249.249 0 01-.249-.25l.03-.121L9.102 13h7.449c.752 0 1.408-.415 1.75-1.029l3.574-6.489A1 1 0 0021 3.999H6.213l-.406-.854A1.997 1.997 0 004 2"
                  ></path>
                </svg>
                <span
                  style={{
                    display: this.props.cartProducts.length === 0 && "none",
                  }}
                >
                  {this.props.cartProducts.length !== 0 &&
                    this.props.cartProducts.length}
                </span>
              </Link>
            </div>
            {/* mobileMenu */}
            <div className="mobileMenu">
              <svg
                width="34px"
                height="34px"
                viewBox="0 0 24 24"
                onClick={() => this.handleMobileMenu()}
              >
                <path
                  d="M3 19h18v-2H3v2zm0-6h8v-2H3v2zm0-8v2h18V5H3zm10 5l4 4 4-4z"
                  fill="#FFF"
                ></path>
              </svg>

              <div className="mobileMenu-container" id="mobileMenu">
                <div className="mobileMenu-container-title">
                  <p>Demo React Shopping App</p>
                  <button onClick={() => this.handleMobileMenu()}>X</button>
                </div>

                <Link to="/">Trang chủ</Link>
                <Link to="/">Đăng ký</Link>
                <Link to="/">Đăng nhập</Link>
                <Link to="/">Sản phẩm vừa xem</Link>
                <Link to="/">Giới thiệu</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  countNumber: state.countNumber,
  banner: state.banner,
  menu: state.menu,
  sitemap: state.sitemap,
  themeEvent: state.themeEvent,
  query: state.query,
  arrayFilter: state.arrayFilter,
  historyQuery: state.historyQuery,
  historyProduct: state.historyProduct,
  isUpdate: state.isUpdate,
  cartProducts: state.cartProducts,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDataSitemap,
      getData,
      getBanner,
      getMenu,
      getThemeEvent,
      getDataProduct,
      getProductFilter,
      getQuery,
      getArrayFilter,
      get_HistoryQuery,
      get_HistoryProduct,
      change_isUpdate,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(Header);
