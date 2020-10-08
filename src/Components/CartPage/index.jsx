import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProductToCart,
  deleteProductCart,
  change_Quanity,
} from "../../redux/action";

class CartPage extends React.Component {
  state = {
    // totalP: 0,
    // cartProducts: [],
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
    console.log(e.target.value, "value");
    console.log(index, "index");
    this.props.change_Quanity(e.target.value, index);
    this.setState({ ...this.state });
  };
  render() {
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
        </div>
        <table>
          <tr>
            <th>Sản phẩm</th>
            <th>Kích thước</th>
            <th>Màu sắc</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng cộng</th>
          </tr>
          {this.props.cartProducts.length > 0 &&
            this.props.cartProducts.map((ele, index) => (
              <tr key={index}>
                <td>
                  <p>{ele.name}</p>
                  <img
                    src={`https://media3.scdn.vn/${ele.thumbnail}`}
                    alt={ele.name}
                  />
                </td>
                <td>{ele["Kích thước"] ? ele["Kích thước"] : "none"}</td>
                <td>{ele["Màu sắc"] ? ele["Màu sắc"] : "none"}</td>
                <td>{ele.price.toLocaleString()}</td>
                <td className="quanity">
                  <input
                    type="number"
                    defaultValue={ele.quanity}
                    onChange={(e) => this.handleChange_Quanity(e, index)}
                  />
                </td>
                <td className="totalPrice">
                  <input
                    type="numer"
                    defaultValue={(ele.price * ele.quanity).toLocaleString()}
                    value={(ele.price * ele.quanity).toLocaleString()}
                  />{" "}
                  <button onClick={() => this.handleDelete(index)}>xoa</button>
                </td>
              </tr>
            ))}
        </table>
        <div>{totalP}</div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  cartProducts: state.cartProducts,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getProductToCart,
      deleteProductCart,
      change_Quanity,
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(CartPage);
