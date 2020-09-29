import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataProduct, getProductFilter } from "../../redux/action";
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
    this.props.getProductFilter("");
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
  handleNext = () => {
    const number = this.state.number + 1;
    this.setState({
      number: number > this.props.banner.length - 1 ? 0 : number,
    });
  };
  handlePrev = () => {
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
  handleNextFlashSale = (a) => {
    document.getElementById(
      "productFlashSale-container"
    ).style.transform = `translateX(${
      this.state.numberSliderFlashSale === a - 6
        ? -205 * this.state.numberSliderFlashSale + 120
        : -205 * this.state.numberSliderFlashSale
    }px)`;
    this.setState({
      numberSliderFlashSale:
        this.state.numberSliderFlashSale + 1 > 14
          ? this.state.numberSliderFlashSale
          : this.state.numberSliderFlashSale + 1,
    });
  };
  handlePrevFlashSale = () => {
    this.state.numberSliderFlashSale === 1
      ? (document.getElementById(
          "productFlashSale-container"
        ).style.transform = `translateX(${
          0 * (this.state.numberSliderFlashSale - 2)
        }px)`)
      : (document.getElementById(
          "productFlashSale-container"
        ).style.transform = `translateX(${
          -205 * (this.state.numberSliderFlashSale - 2)
        }px)`);
    this.setState({
      numberSliderFlashSale:
        this.state.numberSliderFlashSale - 1 < 1
          ? 1
          : this.state.numberSliderFlashSale - 1,
    });
  };
  //SenMall
  handlePrevSenMall = () => {
    this.state.numberSliderSenMall === 1
      ? (document.getElementById(
          "shopSendMall"
        ).style.transform = `translateX(${
          0 * (this.state.numberSliderSenMall - 2)
        }px)`)
      : (document.getElementById(
          "shopSendMall"
        ).style.transform = `translateX(${
          -285 * (this.state.numberSliderSenMall - 2)
        }px)`);
    this.setState({
      numberSliderSenMall:
        this.state.numberSliderSenMall - 1 < 1
          ? 1
          : this.state.numberSliderSenMall - 1,
    });
  };

  handleNextSenMall = (a) => {
    document.getElementById("shopSendMall").style.transform = `translateX(${
      this.state.numberSliderSenMall === a - 5
        ? -285 * this.state.numberSliderSenMall + 228
        : -285 * this.state.numberSliderSenMall
    }px)`;
    this.setState({
      numberSliderSenMall:
        this.state.numberSliderSenMall + 1 > a - 5
          ? this.state.numberSliderSenMall
          : this.state.numberSliderSenMall + 1,
    });
  };

  // Recommend
  handlePrevRecommend = () => {
    this.state.numberSliderRecommend === 1
      ? (document.getElementById(
          "productRecommend-container"
        ).style.transform = `translateX(${
          0 * (this.state.numberSliderRecommend - 2)
        }px)`)
      : (document.getElementById(
          "productRecommend-container"
        ).style.transform = `translateX(${
          -210 * (this.state.numberSliderRecommend - 2)
        }px)`);
    this.setState({
      numberSliderRecommend:
        this.state.numberSliderRecommend - 1 < 1
          ? 1
          : this.state.numberSliderRecommend - 1,
    });
  };
  handleNextRecommend = (a) => {
    document.getElementById(
      "productRecommend-container"
    ).style.transform = `translateX(${
      this.state.numberSliderRecommend === a - 6
        ? -210 * this.state.numberSliderRecommend + 95
        : -210 * this.state.numberSliderRecommend
    }px)`;
    this.setState({
      numberSliderRecommend:
        this.state.numberSliderRecommend + 1 > a - 6
          ? this.state.numberSliderRecommend
          : this.state.numberSliderRecommend + 1,
    });
  };

  //TOPKEYWORD
  handlePrevTopKeyWord = () => {
    this.state.numberSliderRecommend === 1
      ? (document.getElementById(
          "productTopKeyWord-container"
        ).style.transform = `translateX(${
          0 * (this.state.numberSliderTopKeyWord - 2)
        }px)`)
      : (document.getElementById(
          "productTopKeyWord-container"
        ).style.transform = `translateX(${
          -110 * (this.state.numberSliderTopKeyWord - 2)
        }px)`);
    this.setState({
      numberSliderTopKeyWord:
        this.state.numberSliderTopKeyWord - 1 < 1
          ? 1
          : this.state.numberSliderTopKeyWord - 1,
    });
  };
  handleNextTopKeyWord = (a) => {
    document.getElementById(
      "productTopKeyWord-container"
    ).style.transform = `translateX(${
      this.state.numberSliderTopKeyWord === a - 12
        ? -110 * this.state.numberSliderTopKeyWord + 45
        : -110 * this.state.numberSliderTopKeyWord
    }px)`;
    this.setState({
      numberSliderTopKeyWord:
        this.state.numberSliderTopKeyWord + 1 > a - 12
          ? this.state.numberSliderTopKeyWord
          : this.state.numberSliderTopKeyWord + 1,
    });
  };

  //FILTER
  handlePrevFilter = () => {
    this.state.numberSliderFilter === 1
      ? (document.getElementById(
          "productFilter-container"
        ).style.transform = `translateX(${
          0 * (this.state.numberSliderFilter - 2)
        }px)`)
      : (document.getElementById(
          "productFilter-container"
        ).style.transform = `translateX(${
          -110 * (this.state.numberSliderFilter - 2)
        }px)`);
    this.setState({
      numberSliderFilter:
        this.state.numberSliderFilter - 1 < 1
          ? 1
          : this.state.numberSliderFilter - 1,
    });
  };
  handleNextFilter = (a) => {
    document.getElementById(
      "productFilter-container"
    ).style.transform = `translateX(${
      this.state.numberSliderFilter === a - 12
        ? -110 * this.state.numberSliderFilter + 45
        : -110 * this.state.numberSliderFilter
    }px)`;
    this.setState({
      numberSliderFilter:
        this.state.numberSliderFilter + 1 > a - 12
          ? this.state.numberSliderFilter
          : this.state.numberSliderFilter + 1,
    });
  };
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
      <div>
        {/* Header */}
        <div className="slider-container">
          {/* Boostrap caurosel */}
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
                    <img src={ele.image} alt={ele.title} />
                  </div>
                ) : (
                  <div
                    className="carousel-item"
                    style={{ backgroundColor: `${ele.background_color}` }}
                    key={index}
                  >
                    <img src={ele.image} alt={ele.title} />
                  </div>
                )
              )}
              {/* <!-- Left and right controls --> */}
              <span
                className="carousel-control-prev"
                onClick={() => this.handlePrev()}
              >
                <span className="carousel-control-prev-icon"></span>
              </span>
              <span
                className="carousel-control-next"
                onClick={() => this.handleNext()}
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

          <div
            id="demo1"
            className="carousel slide banner"
            // data-ride="carousel"
          >
            {/* Banner Container */}
            <div className="carousel-inner banner-container-inner">
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

            {this.props.banner.length > 0 && (
              <div className="navbar">
                {this.props.sitemap.map((ele, index) => (
                  <a href={`/${ele.url_path}`} key={index}>
                    <p>{ele.title}</p>
                  </a>
                ))}
              </div>
            )}
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
                    onClick={() => this.handlePrevFlashSale()}
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button
                    className="productFlashSale-next"
                    onClick={() =>
                      this.handleNextFlashSale(
                        this.props.productFlashSale.data.list.length
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
                onClick={() => this.handlePrevSenMall()}
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="shopSenMall-next"
                onClick={() =>
                  this.handleNextSenMall(
                    this.props.shopSenMall.result.data.length
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
                onClick={() => this.handlePrevRecommend()}
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="productRecommend-wraper-next"
                onClick={() =>
                  this.handleNextRecommend(
                    this.props.productRecommend.length - 1
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
                onClick={() => this.handlePrevTopKeyWord()}
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="productTopKeyWord-wraper-next"
                onClick={() =>
                  this.handleNextTopKeyWord(
                    this.props.productTopKeyWord.result.data.length
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
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(HomePage);
