import React from "react";
import "./index.scss";
import ProductCardTOPKEYWORD from "../../Atoms/ProductCardTOPKEYWORD";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProductToCart,
  deleteProductCart,
  change_Quanity,
  getDataProduct,
} from "../../redux/action";
import { Link } from "react-router-dom";

class CartPage extends React.Component {
  componentDidMount() {
    this.props.productTopKeyWord.length === 0 && this.props.getDataProduct();
  }
  state = {
    // totalP: 0,
    // cartProducts: [],
  };

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

  handleDelete = (i) => {
    console.log(this.props.cartProducts.length, "len");
    console.log(i, "index");
    let newCartProduct = this.props.cartProducts;
    newCartProduct.splice(i, 1);
    console.log(newCartProduct, "neeeew");
    this.props.deleteProductCart(newCartProduct);
    this.setState({ ...this.state });
  };

  handleChange_Quanity = (e, index) => {
    if (e.target.value >= 0) {
      this.props.change_Quanity(e.target.value, index);
      this.setState({ ...this.state });
    } else {
      this.props.change_Quanity(0, index);
      this.setState({ ...this.state });
    }
  };

  handleClick_Paid = () => {
    console.log(this.props.user.isLoggedSuccess, "status login");
    this.props.user.isLoggedSuccess
      ? alert("Bạn đã thanh toán thành công, cảm ơn bạn đã xem Project này")
      : alert("Bạn cần đăng nhập trước khi thanh toán");
  };

  //render
  render() {
    //total Price
    let totalP = 0;
    for (let i = 0; i < this.props.cartProducts.length; i++) {
      const ele_Price =
        this.props.cartProducts[i].price * this.props.cartProducts[i].quanity;
      totalP = ele_Price * 1 + totalP;
    }

    return (
      <div className="CartPage">
        <div className="CartPage-title">
          <p>Giỏ hàng của bạn</p>
          {this.props.cartProducts.length > 0 && (
            <span id="totalProduct">
              {this.props.cartProducts.length} sản phẩm
            </span>
          )}
          <span id="totalPrice">Tổng tiền: {totalP.toLocaleString()}</span>
        </div>

        {this.props.cartProducts.length > 0 ? (
          <>
            {this.props.cartProducts.map((ele, index) => (
              <div className="cartContainer" key={index}>
                <div className="cartContainer-Image">
                  <img
                    src={`https://media3.scdn.vn/${ele.thumbnail}`}
                    alt={ele.name}
                  />
                </div>
                <div className="cartContainer-Info">
                  <p>{ele.name}</p>
                  <p>
                    Kích thước :{ele["Kích thước"] ? ele["Kích thước"] : "none"}
                  </p>
                  <p>Màu sắc :{ele["Màu sắc"] ? ele["Màu sắc"] : "none"}</p>
                </div>
                <div className="cartContainer-Quanity">
                  <p>Số lượng</p>
                  <input
                    type="number"
                    defaultValue={ele.quanity}
                    onChange={(e) => this.handleChange_Quanity(e, index)}
                  />
                </div>
                <div className="cartContainer-Price">
                  <input
                    type="numer"
                    // defaultValue={(ele.price * ele.quanity).toLocaleString()}
                    readOnly
                    value={(ele.price * ele.quanity).toLocaleString()}
                  />
                  <button onClick={() => this.handleDelete(index)}>x</button>
                </div>
              </div>
            ))}
            <div className="cartButton">
              <Link to="/ProjectSendo_KhacDuy/filter">
                <button>Tiếp tục mua sắm</button>
              </Link>
              <button id="paid" onClick={() => this.handleClick_Paid()}>
                Thanh toán
              </button>
            </div>
          </>
        ) : (
          <div className="initialCart">
            <img
              src="https://pwa-web.scdn.vn/static/media/cart-empty.e2664e0f.svg"
              alt="gio hang trong"
            />
            <Link to="/ProjectSendo_KhacDuy/filter">
              <button>Tiếp tục mua sắm</button>
            </Link>
          </div>
        )}

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
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  cartProducts: state.cartProducts,
  productTopKeyWord: state.productTopKeyWord,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getProductToCart,
      deleteProductCart,
      change_Quanity,
      getDataProduct,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(CartPage);
