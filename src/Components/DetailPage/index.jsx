import React from "react";
import "./index.scss";
import queryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDataProduct,
  getProductFilter,
  getDetailProduct,
  getDetailShop,
  getProductToCart,
  change_isUpdate,
} from "../../redux/action";
import ProductRelated from "../../Atoms/ProductRelated";

class DetailPage extends React.Component {
  state = {
    quanity: 1,
    indexThumbnail: 0,
    arrAttribute: [],
    arrValue: [],
    product_AddToCart: {},
    updated: true,
  };
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const id = parsed.id;
    // const adminid = parsed.adminid;

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

    /*Chose*/

    let attributeName = this.props.detailProduct.data.attribute[i].name;

    let valueAtt;
    this.props.detailProduct.data.attribute[i].value[b].name
      ? (valueAtt = this.props.detailProduct.data.attribute[i].value[b].name)
      : (valueAtt = this.props.detailProduct.data.attribute[i].value[b].value);

    let arrAttribute = this.state.arrAttribute;
    let arrValue = this.state.arrValue;

    arrAttribute.push(attributeName);
    arrValue.push(valueAtt);

    for (let i = 0; i < arrAttribute.length - 1; i++) {
      const arrAttribute_ele = arrAttribute[i];
      if (arrAttribute_ele === attributeName) {
        arrValue[i] = valueAtt;
        arrValue.splice(arrAttribute.length - 1, 1);
        arrAttribute.splice(arrAttribute.length - 1, 1);
      }
    }
    this.setState({ arrAttribute: arrAttribute }, () =>
      console.log(this.state.arrAttribute)
    );
    this.setState({ arrValue: arrValue }, () =>
      console.log(this.state.arrValue)
    );
  };

  handleAddToCart = () => {
    if (
      this.state.arrAttribute.length <
      this.props.detailProduct.data.attribute.length
    ) {
      alert("dien day du thong tin moi mua dc ");
    } else {
      var product_AddToCart = {};
      for (let i = 0; i < this.state.arrAttribute.length; i++) {
        product_AddToCart[this.state.arrAttribute[i]] = this.state.arrValue[i];
      }
      product_AddToCart.quanity = this.state.quanity;
      product_AddToCart.name = this.props.detailProduct.data.name;
      product_AddToCart.thumbnail = this.props.detailProduct.data.images[0];
      product_AddToCart.price = this.props.detailProduct.data.final_price;
      product_AddToCart.totalPrice =
        this.props.detailProduct.data.final_price * this.state.quanity;
      console.log(product_AddToCart, "product_AddToCart");
      this.props.getProductToCart(product_AddToCart);
      this.props.change_isUpdate(!this.props.isUpdate);
    }
  };

  handleChangeQuanity = (e) => {
    console.log(e.target.value, "value");

    e.target.value < 0
      ? this.setState({ quanity: 0 })
      : this.setState({ quanity: e.target.value });
  };

  // componentDidUpdate() {
  //   if ((this.props.detailProduct.length > 0) & (this.state.updated === true)) {
  //     this.setState({ ...this.state, updated: false });
  //     this.props.getDetailShop(this.props.detailProduct.data.admin_id);
  //     console.log("oo");
  //   }
  // }
  render() {
    var styleElem = document.head.appendChild(document.createElement("style"));
    Object.keys(this.props.detailProduct).length > 0 &&
      (styleElem.innerHTML = `.rating::before {background: linear-gradient(90deg, #e5101d ${
        20 * this.props.detailProduct.data.rating_info.percent_star
      }%, #c7c7cd 0);}`);

    var styleElemShop = document.head.appendChild(
      document.createElement("style")
    );
    Object.keys(this.props.detailShop).length > 0 &&
      (styleElemShop.innerHTML = `.ratingShop::before {background: linear-gradient(90deg, #e5101d ${
        20 * this.props.detailShop.data.rating_info.percent_star
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
                                  type="button"
                                  key={indexb}
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
                                  type="button"
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
                        <input
                          type="number"
                          value={this.state.quanity}
                          onChange={(e) => this.handleChangeQuanity(e)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="detailPage-ProductInfo-BasicInfo-row-addToCart">
                  <button id="addToCart" onClick={() => this.handleAddToCart()}>
                    Thêm vào giỏ hàng
                  </button>
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
                  )}
                </div>
                <div className="detailPage-ProductInfo-BasicInfo-row benefit"></div>
              </div>
            </div>
            {Object.keys(this.props.detailShop).length > 0 && (
              <div className="detailPage-ShopInfo">
                <div className="detailPage-ShopInfo-Left">
                  <div className="detailPage-ShopInfo-Left-Image">
                    <img
                      src={this.props.detailShop.data.shop_logo}
                      alt={this.props.detailShop.data.shop_name}
                    />
                  </div>
                  <div className="detailPage-ShopInfo-Left-Info">
                    <a
                      href={this.props.detailShop.data.website}
                      className="detailPage-ShopInfo-Left-Info-Name"
                    >
                      {this.props.detailShop.data.shop_name}
                    </a>
                    {this.props.detailShop.data.rating_info !== 0 && (
                      <div className={`percentStar ratingShop`}>
                        <p>
                          {this.props.detailShop.data.rating_info.percent_star}
                        </p>
                        <p>{` (${this.props.detailShop.data.rating_info.total_rat} đánh giá) `}</p>
                      </div>
                    )}
                    <p>
                      Kho hàng:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {this.props.detailShop.data.warehouse_city_name}
                      </span>
                    </p>

                    <p>
                      Liên hệ :{" "}
                      <span style={{ color: "darkgreen" }}>
                        {this.props.detailShop.data.telephone}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="detailPage-ShopInfo-Right">
                  <div className="detailPage-ShopInfo-Right-Row">
                    <div className="detailPage-ShopInfo-Right-Row-item">
                      <p>Đã hoạt động</p>
                      <p id="shopAge">
                        {this.props.detailShop.data.created_at_str}
                      </p>
                    </div>
                    <div className="detailPage-ShopInfo-Right-Row-item">
                      <p>Tổng sản phẩm</p>
                      <p id="productAmount">
                        {this.props.detailShop.data.product_total}
                      </p>
                    </div>
                    <div className="detailPage-ShopInfo-Right-Row-item">
                      <p>Thời gian phản hồi</p>
                      <p id="responseTime">
                        {this.props.detailShop.data.response_time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {Object.keys(this.props.detailProduct).length > 0 && (
              <ProductRelated
                ProductRelated={this.props.detailProduct.data.product_relateds}
              />
            )}

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
  detailShop: state.detailShop,
  isUpdate: state.isUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDataProduct,
      getProductFilter,
      getDetailProduct,
      getDetailShop,
      getProductToCart,
      change_isUpdate,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(DetailPage);
