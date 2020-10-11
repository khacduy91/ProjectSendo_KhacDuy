import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDataProduct,
  getProductFilter,
  getQuery,
  get_HistoryQuery,
} from "../../redux/action";
import { Link } from "react-router-dom";
import ProductCardFLASHSALE from "../../Atoms/ProductCardFLASHSALE";
import ShopCardSENMALL from "../../Atoms/ShopCardSENMALL";
import ProductCardTOPKEYWORD from "../../Atoms/ProductCardTOPKEYWORD";
import ProductCardFILTER from "../../Atoms/ProductCardFILTER";

import "../HomePages/index.scss";
import ProductCardRECOMMEND from "../../Atoms/ProductCardRECOMMEND";
import Countdown from "react-countdown";

class HomePage extends React.Component {
  state = {
    numberSliderFlashSale: 1,
    numberSliderSenMall: 1,
    numberSliderRecommend: 1,
    numberSliderTopKeyWord: 1,
    numberSliderFilter: 1,
    number: 0,
    end_time: "",
    x: new Date(),
  };
  componentDidMount() {
    this.props.getProductFilter("", "", "", "quần jean", "30", "sortType=rank");
    this.props.getDataProduct();
  }

  componentWillMount() {
    window.clearTimeout(this.autoChange);
  }

  //Header
  handleClick = (index) => {
    let z = new Date();
    this.setState({ number: index, x: z });
  };
  handleNextBanner = () => {
    const number = this.state.number + 1;
    this.setState({
      number: number > this.props.banner.length - 1 ? 0 : number,
    });
  };
  handlePrevBanner = () => {
    const number = this.state.number - 1;
    this.setState({
      number: number < 0 ? this.props.banner.length - 1 : number,
    });
  };
  handleThemeEventStyle = (a, b, c, d) => {
    const style = {
      position: `absolute`,
      top: `${a}%`,
      left: `${b}%`,
      width: `${c}%`,
      height: `${d}%`,
    };
    return style;
    // return style;
  };

  autoChange() {
    let y = new Date();

    y - this.state.x > 5000 &&
      this.setState({
        number:
          this.state.number + 1 > this.props.banner.length - 1
            ? 0
            : this.state.number + 1,
        x: y,
      });
  }
  //FlashSale
  handleNext = (a, b, c) => {
    let scrollWidth = document.getElementById(`${b}`).scrollWidth;
    let eleWidth = document.querySelector(`${c}`).offsetWidth;
    let scrollLeft = document.getElementById(`${b}`).scrollLeft;

    let widthPerSlide = scrollWidth / a;
    let numberSilder = Math.floor(scrollLeft / widthPerSlide);

    Math.floor(scrollLeft / widthPerSlide) < scrollLeft / widthPerSlide
      ? (numberSilder = Math.floor(scrollLeft / widthPerSlide) + 1)
      : (numberSilder = Math.floor(scrollLeft / widthPerSlide));

    scrollLeft >= scrollWidth - eleWidth
      ? (document.getElementById(`${b}`).scrollLeft = scrollWidth - eleWidth)
      : (document.getElementById(`${b}`).scrollLeft =
          widthPerSlide * (numberSilder + 1));
  };

  handlePrev = (a, b, c) => {
    let scrollWidth = document.getElementById(`${b}`).scrollWidth;

    let scrollLeft = document.getElementById(`${b}`).scrollLeft;
    let numberSilder = Math.floor(scrollLeft / (scrollWidth / a));
    let widthPerSlide = scrollWidth / a;

    scrollLeft <= 0
      ? (document.getElementById(`${b}`).scrollLeft = 0)
      : (document.getElementById(`${b}`).scrollLeft =
          widthPerSlide * numberSilder - 1);
  };
  // Navbar
  handleClick_Navbar = (a) => {
    this.props.getQuery(a);
    this.props.get_HistoryQuery(a);
  };
  // handleOnFocusNavBar = () => {
  //   console.log("ali34");
  //   const ele1 = document.getElementById("sliderContainer");
  //   const ele2 = document.querySelector(".carousel-inner");
  //   ele1.style.overflow = "visible";
  //   ele2.style.overflow = "visible";
  // };

  // changeOverFlow = (e) => {
  //   const elSlider = document.querySelector(".slider-container");
  //   const elBanner = document.querySelector(".banner-container-inner");
  //   let elClass = e.target.className;
  //   console.log(elClass, "ee");
  //   elClass =
  //     "navbar-link" &&
  //     ((elSlider.style.overflow = "visible"),
  //     (elBanner.style.overflow = "visible"));
  // };
  render() {
    window.setTimeout(() => this.autoChange(), 7000);
    // console.log("endtime", this.state.end_time);\

    const renderer = ({ hours, minutes, seconds }) => {
      return (
        <div className="block-countdown">
          <span>{hours}h:</span>
          <span>{minutes}m:</span>
          <span>{seconds}s</span>
        </div>
      );
    };

    return (
      <div className="homepage">
        {/* Header */}
        <div className="slider-container" id="sliderContainer">
          {/* Boostrap caurosel */}

          <div className="banner-background">
            {this.props.banner.map((ele, index) =>
              index === this.state.number ? (
                <div
                  className="carousel-item active banner-container-inner-color"
                  style={{ backgroundColor: `${ele.background_color}` }}
                  key={index}
                ></div>
              ) : (
                <div
                  className="carousel-item banner-container-inner-color"
                  style={{ backgroundColor: `${ele.background_color}` }}
                  key={index}
                ></div>
              )
            )}
          </div>

          {/* Banner Container */}
          <div className="carousel-inner banner-container-inner">
            {/* Nav bar */}

            {/* <div className="navbar" onMouseOver={(e) => this.changeOverFlow(e)}> */}
            <div className="navbar">
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Thời trang nữ")}
                className="navbar-link"
              >
                Thời trang nữ
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Đầm nữ")}
                className="navbar-link"
              >
                Đầm nữ
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Sandal nữ")}
                className="navbar-link"
              >
                Sandal nữ
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("thời trang nam")}
                className="navbar-link"
              >
                Thời trang nam
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Dép nam")}
                className="navbar-link"
              >
                Dép nam
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Áo thun nam")}
                className="navbar-link"
              >
                Áo thun nam
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Điện thoại")}
                className="navbar-link"
              >
                Điện thoại
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Laptop")}
                className="navbar-link"
              >
                Laptop
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Phụ kiện gia dụng")}
                className="navbar-link"
              >
                Phụ kiện gia dụng
              </Link>
              <Link
                to="/ProjectSendo_KhacDuy/filter"
                onClick={() => this.handleClick_Navbar("Điện máy")}
                className="navbar-link"
              >
                Điện máy
              </Link>
            </div>

            <div
              id="demo2"
              className="carousel slide slider-container-image"
              // data-ride="carousel"
            >
              {/* Image Caurosel */}
              <div className="carousel-inner slider-container-image-inner">
                {this.props.banner.map((ele, index) =>
                  index === this.state.number ? (
                    <div
                      className="carousel-item active"
                      style={{ backgroundColor: `${ele.background_color}` }}
                      key={index}
                    >
                      <a
                        href={ele.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={ele.image} alt={ele.title} />
                      </a>
                    </div>
                  ) : (
                    <div
                      className="carousel-item"
                      style={{ backgroundColor: `${ele.background_color}` }}
                      key={index}
                    >
                      <a
                        href={ele.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={ele.image} alt={ele.title} />
                      </a>
                    </div>
                  )
                )}
                {/* <!-- Left and right controls --> */}
                <span
                  className="carousel-control-prev"
                  onClick={() => this.handlePrevBanner()}
                >
                  <span className="carousel-control-prev-icon"></span>
                </span>
                <span
                  className="carousel-control-next"
                  onClick={() => this.handleNextBanner()}
                >
                  <span className="carousel-control-next-icon"></span>
                </span>

                {/* Horizon Button */}
                <ul className="carousel-indicators">
                  {this.props.banner.map((ele, index) =>
                    index === this.state.number ? (
                      <li
                        // data-target="#demo1 #demo2"
                        // data-target="#demo2"
                        // data-slide-to={index}
                        className="active"
                        key={index}
                        index={index}
                        onClick={() => this.handleClick(index)}
                      ></li>
                    ) : (
                      <li
                        // data-target="#demo1 #demo2"
                        // data-target="#demo2"
                        // data-slide-to={index}
                        key={index}
                        index={index}
                        onClick={() => this.handleClick(index)}
                      ></li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="menu">
          <div className="menu-container">
            {this.props.menu.map((ele, index) => (
              <a href={`https://sendo.vn${ele.link}`} key={index}>
                <img src={ele.icon} alt={`iconImage${index}`} />
                <p dangerouslySetInnerHTML={{ __html: ele.label }} />
              </a>
            ))}
          </div>
        </div>
        <div className="themeEvent">
          {Object.keys(this.props.themeEvent).length > 0 && (
            <div>
              <img src={this.props.themeEvent.image.lg} alt="themeEvent" />
              {this.props.themeEvent.links.map((ele, index) => (
                <a
                  href={ele.url}
                  key={index}
                  style={this.handleThemeEventStyle(
                    ele.top,
                    ele.left,
                    ele.width,
                    ele.height
                  )}
                >
                  {" "}
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          {Object.keys(this.props.productFlashSale).length > 0 &&
            (() =>
              this.countDownClock(
                this.props.productFlashSale.data.end_time * 1000
              ),
            (
              //   this.setState({
              //   ...this.state,
              //   end_time: this.props.productFlashSale.data.end_time,
              // }),
              <div>
                <div className="productFlashSale">
                  <button
                    className="productFlashSale-prev"
                    onClick={() =>
                      this.handlePrev(
                        this.props.productFlashSale.data.list.length,
                        "productFlashSale-container",
                        ".productFlashSale"
                      )
                    }
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button
                    className="productFlashSale-next"
                    onClick={() =>
                      this.handleNext(
                        this.props.productFlashSale.data.list.length,
                        "productFlashSale-container",
                        ".productFlashSale"
                      )
                    }
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                  <div className="productFlashSale-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#FFF"
                        fillRule="evenodd"
                        d="M6.408 0l-2.7 8.298h2.794L3 16l8.744-10.587H8.447L11.937 0z"
                      ></path>
                    </svg>
                    <p>FlashSale</p>
                    <div id="countdown">
                      <Countdown
                        date={this.props.productFlashSale.data.end_time * 1000}
                        renderer={renderer}
                      />
                    </div>
                    <div></div>
                  </div>
                  <div
                    className="productFlashSale-container"
                    id="productFlashSale-container"
                  >
                    {Object.keys(this.props.productFlashSale).length > 0 &&
                      this.props.productFlashSale.data.list.map(
                        (ele, index) => (
                          <ProductCardFLASHSALE
                            product={ele}
                            index={index}
                            key={index}
                          />
                        )
                      )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="shopSenMall-wraper">
          {Object.keys(this.props.shopSenMall).length > 0 && (
            <div>
              <button
                className="shopSenMall-prev"
                onClick={() =>
                  this.handlePrev(
                    this.props.shopSenMall.result.data.length,
                    "shopSendMall",
                    ".shopSenMall-wraper"
                  )
                }
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="shopSenMall-next"
                onClick={() =>
                  this.handleNext(
                    this.props.shopSenMall.result.data.length,
                    "shopSendMall",
                    ".shopSenMall-wraper"
                  )
                }
              >
                <span className="carousel-control-next-icon"></span>
              </button>
              <div className="shopSenMall-wraper-title">
                <p>Gian hàng chính hãng</p>
              </div>
              <div className="shopSenMall" id="shopSendMall">
                {this.props.shopSenMall.result.data.map((ele, index) => (
                  <ShopCardSENMALL shop={ele} key={index} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="productRecommend">
          {Object.keys(this.props.productRecommend).length > 0 && (
            <div className="productRecommend-wraper">
              <button
                className="productRecommend-wraper-prev"
                onClick={() =>
                  this.handlePrev(
                    this.props.productRecommend.length - 1,
                    "productRecommend-container",
                    ".productRecommend-wraper"
                  )
                }
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="productRecommend-wraper-next"
                onClick={() =>
                  this.handleNext(
                    this.props.productRecommend.length - 1,
                    "productRecommend-container",
                    ".productRecommend-wraper"
                  )
                }
              >
                <span className="carousel-control-next-icon"></span>
              </button>
              <div className="productRecommend-title">
                <p>ĐỀ CỬ CHO BẠN</p>
              </div>

              <div
                className="productRecommend-container"
                id="productRecommend-container"
              >
                {this.props.productRecommend.map(
                  (ele, index) =>
                    index !== 0 && (
                      <ProductCardRECOMMEND
                        product={ele}
                        key={index}
                        index={index}
                      />
                    )
                )}
              </div>
            </div>
          )}
        </div>

        <div className="productTopKeyWord">
          {Object.keys(this.props.productTopKeyWord).length > 0 && (
            <div className="productTopKeyWord-wraper">
              <button
                className="productTopKeyWord-wraper-prev"
                onClick={() =>
                  this.handlePrev(
                    this.props.productTopKeyWord.result.data.length,
                    "productTopKeyWord-container",
                    ".productTopKeyWord-wraper"
                  )
                }
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="productTopKeyWord-wraper-next"
                onClick={() =>
                  this.handleNext(
                    this.props.productTopKeyWord.result.data.length,
                    "productTopKeyWord-container",
                    ".productTopKeyWord-wraper"
                  )
                }
              >
                <span className="carousel-control-next-icon"></span>
              </button>
              <div className="productTopKeyWord-title">
                <p>XU HƯỚNG TÌM KIẾM</p>
              </div>

              <div
                className="productTopKeyWord-container"
                id="productTopKeyWord-container"
              >
                {this.props.productTopKeyWord.result.data.map((ele, index) => (
                  <ProductCardTOPKEYWORD
                    product={ele}
                    key={index}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="productFilter">
          {Object.keys(this.props.productFilter).length > 0 && (
            <div className="productFilter-wraper">
              <button
                className="productFilter-wraper-prev"
                onClick={() => this.handlePrevFilter()}
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="productFilter-wraper-next"
                onClick={() =>
                  this.handleNextFilter(
                    this.props.productFilter.result.data.length
                  )
                }
              >
                <span className="carousel-control-next-icon"></span>
              </button>
              <div className="productFilter-title">
                <p>DÀNH RIÊNG CHO BẠN</p>
              </div>

              <div
                className="productFilter-container"
                id="productFilter-container"
              >
                {this.props.productFilter.result.data.map((ele, index) => (
                  <ProductCardFILTER product={ele} key={index} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  productFlashSale: state.productFlashSale,
  productRecommend: state.productRecommend,
  shopSenMall: state.shopSenMall,
  productTopKeyWord: state.productTopKeyWord,
  productFilter: state.productFilter,
  banner: state.banner,
  menu: state.menu,
  sitemap: state.sitemap,
  themeEvent: state.themeEvent,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDataProduct,
      getProductFilter,
      getQuery,
      get_HistoryQuery,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(HomePage);
