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

class HomePage extends React.Component {
  state = {
    numberSliderFlashSale: 1,
    numberSliderSenMall: 1,
    numberSliderRecommend: 1,
    numberSliderTopKeyWord: 1,
    numberSliderFilter: 1,
  };
  componentDidMount() {
    this.props.getProductFilter(1, "ao khoac", 30, 0, 1);
    this.props.getDataProduct();
  }

  countDownClock = (a) => {
    const countDownDate = new Date(a);

    var countDownDateTime = new Date(countDownDate).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDateTime - now;

      // Time calculations for days, hours, minutes and seconds
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById(
        "countdown"
      ).innerHTML = `${hours}h:${minutes}m:${seconds}s`;

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
      }
    }, 1000);
  };
  //FlashSale
  handleNext = (a) => {
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
  handlePrev = () => {
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
    return (
      <div>
        <div>
          {Object.keys(this.props.productFlashSale).length > 0 && (
            <div>
              <div className="productFlashSale">
                <button
                  className="productFlashSale-prev"
                  onClick={() => this.handlePrev()}
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button
                  className="productFlashSale-next"
                  onClick={() =>
                    this.handleNext(
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
                  <p id="countdown">
                    {this.countDownClock(
                      this.props.productFlashSale.data.end_time * 1000
                    )}
                  </p>
                  <div></div>
                </div>
                <div
                  className="productFlashSale-container"
                  id="productFlashSale-container"
                >
                  {Object.keys(this.props.productFlashSale).length > 0 &&
                    this.props.productFlashSale.data.list.map((ele, index) => (
                      <ProductCardFLASHSALE
                        product={ele}
                        index={index}
                        key={index}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
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
