import React from "react";
import "./index.scss";
import queryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDataProduct,
  getProductFilter,
  getDetailProduct,
} from "../../redux/action";

class DetailPage extends React.Component {
  state = {
    quanity: 1,
    indexThumbnail: 0,
  };
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const id = parsed.id;
    this.props.getDetailProduct(id);
  }

  handleThumbnail = (i) => {
    this.setState({ indexThumbnail: i });
  };
  handleChose = (i, b) => {
    const ele_ByName = document.getElementsByName(`value${i}`);
    for (let i = 0; i < ele_ByName.length; i++) {
      const element = ele_ByName[i];
      element.classList.remove("chosenValue");
    }

    const ele_Id = document.getElementById(`value${i}${b}`);
    ele_Id.classList.add("chosenValue");
  };
  render() {
    var styleElem = document.head.appendChild(document.createElement("style"));
    Object.keys(this.props.detailProduct).length > 0 &&
      (styleElem.innerHTML = `.rating::before {background: linear-gradient(90deg, #e5101d ${
        20 * this.props.detailProduct.data.rating_info.percent_star
      }%, #c7c7cd 0);}`);
    return (
      <>
        {Object.keys(this.props.detailProduct).length > 0 && (
          <>
            <div className="detailPage-ProductInfo">
              <div className="detailPage-ProductInfo-Gallery">
                <div className="detailPage-ProductInfo-Gallery-image0">
                  <img
                    src={`https://media3.scdn.vn${
                      this.props.detailProduct.data.images[
                        this.state.indexThumbnail
                      ]
                    }`}
                    alt=""
                  />
                </div>
                {this.props.detailProduct.data.images.map(
                  (ele, index) =>
                    index < 5 && (
                      <div
                        className="detailPage-ProductInfo-Gallery-image"
                        key={index}
                        onClick={() => this.handleThumbnail(index)}
                      >
                        <img
                          src={`https://media3.scdn.vn${ele}`}
                          alt={`${index}`}
                        />
                      </div>
                    )
                )}
              </div>
              <div className="detailPage-ProductInfo-BasicInfo">
                <div className="detailPage-ProductInfo-BasicInfo-row-title">
                  <p>{this.props.detailProduct.data.name}</p>
                </div>
                <div className="detailPage-ProductInfo-BasicInfo-row-priceBox">
                  <div className="priceBox">
                    {this.props.detailProduct.data.final_promotion_percent >
                      0 && (
                      <div className="priceBox-Promotion">
                        <span>
                          Giảm
                          {
                            this.props.detailProduct.data
                              .final_promotion_percent
                          }
                          %
                        </span>{" "}
                      </div>
                    )}

                    <p id="finalPrice">
                      {this.props.detailProduct.data.final_price.toLocaleString()}
                      đ
                    </p>
                    {this.props.detailProduct.data.final_promotion_percent >
                      0 && (
                      <p id="price">
                        {this.props.detailProduct.data.price.toLocaleString()}đ
                      </p>
                    )}
                  </div>
                  {this.props.detailProduct.data.rating_info.total_rat !==
                    0 && (
                    <div className="rating">
                      <p>
                        ({this.props.detailProduct.data.rating_info.total_rat})
                        lượt đánh giá
                      </p>
                    </div>
                  )}
                  <div className="orderCount">
                    <svg
                      width="15px"
                      height="15px"
                      viewBox="0 0 32 32"
                      className="icon_Mf-x iconSmall_2eXS"
                    >
                      <path d="M27.292 15.496l-10.8-10.8A2.378 2.378 0 0014.808 4H6.4C5.08 4 4 5.08 4 6.4v8.4c0 .66.264 1.26.708 1.704l10.8 10.8A2.385 2.385 0 0017.2 28h.012c.658 0 1.253-.271 1.679-.708l8.4-8.4a2.342 2.342 0 00.708-1.68v-.013.001c0-.66-.276-1.272-.708-1.704zM8.2 10c-.996 0-1.8-.804-1.8-1.8s.804-1.8 1.8-1.8 1.8.804 1.8 1.8S9.196 10 8.2 10z"></path>
                    </svg>
                    <p>
                      ({this.props.detailProduct.data.order_count}) lượt mua
                    </p>
                  </div>
                </div>
                <div className="detailPage-ProductInfo-BasicInfo-row freeShip"></div>
                <div className="detailPage-ProductInfo-BasicInfo-row instant"></div>
                {Object.keys(this.props.detailProduct.data.attribute).length >
                  0 && (
                  <div className="detailPage-ProductInfo-BasicInfo-row-attribute">
                    {this.props.detailProduct.data.attribute.map(
                      (ele, index) => (
                        <div
                          id={`attribute${index}`}
                          className="attribute"
                          key={index}
                        >
                          <div className="attribute-name">
                            <p>{ele.name}</p>
                          </div>
                          <div className="attribute-value">
                            {ele.value.map((ele, indexb) =>
                              ele.name ? (
                                <input
                                  className="valueStyle"
                                  key={index}
                                  onClick={() =>
                                    this.handleChose(index, indexb)
                                  }
                                  value={ele.name}
                                  name={`value${index}`}
                                  id={`value${index}${indexb}`}
                                />
                              ) : (
                                <input
                                  className="valueStyle"
                                  key={indexb}
                                  onClick={() =>
                                    this.handleChose(index, indexb)
                                  }
                                  value={ele.value}
                                  name={`value${index}`}
                                  id={`value${index}${indexb}`}
                                />
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                    <div className="attribute">
                      <div className="attribute-name">
                        <p>Số lượng</p>
                      </div>
                      <div className="attribute-value">
                        <input type="number" value={this.state.quanity} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="detailPage-ProductInfo-BasicInfo-row-addToCart">
                  <button id="addToCart">Thêm vào giỏ hàng</button>
                  <button id="quickBuy">Mua ngay</button>
                </div>
                <div className="detailPage-ProductInfo-BasicInfo-row-benefit">
                  {this.props.detailProduct.data.customer_benefits.benefits.map(
                    (ele, index) => (
                      // index === 0 ? (
                      <div className="freeReturn" key={index}>
                        <div
                          className="freeReturn-title"
                          style={{
                            backgroundImage: `url(${ele.background_url}) `,
                          }}
                        >
                          <img src={ele.icon_url} alt="" />
                          <p>{ele.value}</p>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: ele.tooltip }} />
                      </div>
                    )
                    // ) : (
                    //   <div className="checkProduct-COD">
                    //     {ele.value} key={index}
                    //   </div>
                    // )
                  )}
                </div>
                <div className="detailPage-ProductInfo-BasicInfo-row benefit"></div>
              </div>
            </div>
            <div className="detailPage-Description">
              <p
                dangerouslySetInnerHTML={{
                  __html: this.props.detailProduct.data.description,
                }}
              />
            </div>
          </>
        )}
      </>
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
  detailProduct: state.detailProduct,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDataProduct,
      getProductFilter,
      getDetailProduct,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(DetailPage);
