import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { storage } from "../../../firebase/firebaseConfig"; //storage cua FireBase
import firebaseApp from "../../../firebase/firebaseConfig";
import {
  getData,
  getBanner,
  getMenu,
  // getDataSitemap,
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
    isLoggedSuccess: false,
    notRegister: false,
    isLogged: false,
    name: "",
    photo: "",
    photoUrl: "",
  };

  componentDidMount() {
    this.props.getData();
    // this.props.getDataSitemap();
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
      "96",
      "sortType=rank"
    );
    this.props.get_HistoryQuery(this.props.query);
    this.props.getArrayFilter(this.props.query);
    this.setState({ ...this.state, query: "" });
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
  // Login
  clearErrors = () => {
    document.getElementById("register_Error").innerHTML = "";
    document.getElementById("login_Error").innerHTML = "";
  };
  clearInput = () => {
    document.getElementById("login_Email").value = "";
    document.getElementById("login_Password").value = "";
    document.getElementById("register_Email").value = "";
    document.getElementById("register_Password").value = "";
  };
  handleCloseModal = () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("loginSuccess").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("root").style.position = "unset";
    document.getElementById("root").style.width = "100%";
    document.querySelector(".modal-wraper").style.display = "none";
  };
  handleLogin = () => {
    this.setState({ ...this.state, notRegister: true });
    document.getElementById("login").style.display = "flex";
    document.getElementById("logout").style.display = "none";
    document.getElementById("loginSuccess").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("root").style.position = "fixed";
    document.getElementById("root").style.width = "100%";
    document.querySelector(".modal-wraper").style.display = "flex";
  };

  handleRegister = () => {
    this.setState({ ...this.state, notRegister: false });
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("loginSuccess").style.display = "none";
    document.getElementById("register").style.display = "flex";
    document.getElementById("root").style.position = "fixed";
    document.getElementById("root").style.width = "100%";
    document.querySelector(".modal-wraper").style.display = "flex";
  };
  handleLogout = () => {
    this.setState({ ...this.state, notRegister: true, isLoggedSuccess: false });
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "flex";
    document.getElementById("loginSuccess").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("root").style.position = "fixed";
    document.getElementById("root").style.width = "100%";
    document.querySelector(".modal-wraper").style.display = "flex";
  };

  // FireBase
  // Login Firebase
  loginFireBase = () => {
    let email = document.getElementById("login_Email").value;
    let password = document.getElementById("login_Password").value;
    // Login Function
    this.clearErrors();
    this.clearInput();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...this.state, isLoggedSuccess: true, isLogged: true });
        firebaseApp.auth().onAuthStateChanged();
        let user = firebaseApp.auth().currentUser;
        if (user != null) {
          this.setState({
            ...this.state,
            name: user.displayName,
            photoUrl: user.photoURL,
          });
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        // document.getElementById("errorLogin").innerHTML = errorCode;
        switch (errorCode) {
          case "auth/invalid-email":
            document.getElementById("login_Error").innerHTML =
              "Email phải đúng định dạng";
            break;
          case "auth/wrong-password":
            document.getElementById("login_Error").innerHTML =
              "Bạn đã điền sai Password";
            break;
          case "auth/user-not-found":
            document.getElementById("login_Error").innerHTML =
              "Email này chưa được đăng ký";
            break;
          default:
            break;
        }
      });
  };
  // Logout FireBase
  logoutFireBase = () => {
    document.querySelector(".modal-wraper").style.display = "none";
    document.getElementById("root").style.position = "unset";
    document.getElementById("root").style.width = "100%";
    firebaseApp
      .auth()
      .signOut()
      .then(() => this.setState({ ...this.state, isLogged: false }));
  };

  // Register FireBase
  registerFireBase = () => {
    let email = document.getElementById("register_Email").value;
    let password = document.getElementById("register_Password").value;
    let name = document.getElementById("register_Name").value;

    this.clearInput();
    this.clearErrors();
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //Khai bai User da dang nhap FireBase
        let user = firebaseApp.auth().currentUser;

        console.log(this.state.photo);
        //Upload avatart len FireBase de lay URL
        const uploadTask = storage
          .ref(`images/${this.state.photo.name}`)
          .put(this.state.photo);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(this.state.photo.name)
              .getDownloadURL()
              .then((url) => {
                this.setState({ ...this.state, photoUrl: url });
                console.log(this.state.photoUrl);
              })
              .then(() => {
                //Cap nhat vao provide User
                user
                  .updateProfile({
                    displayName: name,
                    photoURL: this.state.photoUrl,
                  })
                  .then(function (res) {
                    // Update successful.
                  })
                  .catch(function (error) {
                    // An error happened.
                    console.log(error, "eee");
                  });
              });
          }
        );
      })
      .then(() =>
        this.setState({
          ...this.state,
          isLogged: true,
          isLoggedSuccess: true,
        })
      )
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        // document.getElementById("errorLogin").innerHTML = errorCode;
        switch (errorCode) {
          case "auth/email-already-in-use":
            document.getElementById("register_Error").innerHTML =
              "Email đã được đăng ký";
            break;
          case "auth/invalid-email":
            document.getElementById("register_Error").innerHTML =
              "Email phải đúng định dạng";
            break;
          case "auth/weak-password":
            document.getElementById("register_Error").innerHTML =
              "Password cần it nhất 6";
            break;
          default:
            break;
        }
      });
  };

  //NavBar
  handleClick_Navbar = (a) => {
    this.props.getQuery(a);
    this.props.get_HistoryQuery(a);
    this.props.change_isUpdate(!this.props.isUpdate);
  };

  componentDidUpdate() {
    if (this.props.isUpdate) {
      this.setState({
        ...this.state,
      });
      this.props.change_isUpdate(!this.props.isUpdate);
    }

    if (this.state.isLoggedSuccess) {
      document.getElementById("logout").style.display = "none";
      document.getElementById("login").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementById("loginSuccess").style.display = "flex";
      let user = firebaseApp.auth().currentUser;
      console.log(user, "user");
    }
  }

  render() {
    window.onclick = function (event) {
      if (event.target.className !== "main-row-item2-input searchBox") {
        document.getElementById("historyQuery").style.transform = "scale(0)";
        document.getElementById("historyQuery").style.opacity = "0";
      }
      if (event.target.className === "modalLogin-wraper") {
        document.querySelector(".modalLogin-wraper").style.display = "none";
        document.getElementById("root").style.position = "unset";
        document.getElementById("root").style.width = "100%";
      }
      // console.log(event.target.className, "target");
    };

    return (
      <div className="header" id="header">
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
              {!this.state.isLogged && (
                <button onClick={() => this.handleLogin()}>Login</button>
              )}
              {this.state.isLogged && (
                <button onClick={() => this.handleLogout()}>Logout</button>
              )}
              {this.state.isLogged === false && (
                <button onClick={() => this.handleRegister()}>Register</button>
              )}
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
              <div id="navbarHover">
                <div className="navbar-header">
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Thời trang nữ")}
                    className="navbar-header-link"
                  >
                    Thời trang nữ
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Đầm nữ")}
                    className="navbar-header-link"
                  >
                    Đầm nữ
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Sandal nữ")}
                    className="navbar-header-link"
                  >
                    Sandal nữ
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("thời trang nam")}
                    className="navbar-header-link"
                  >
                    Thời trang nam
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Dép nam")}
                    className="navbar-header-link"
                  >
                    Dép nam
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Áo thun nam")}
                    className="navbar-header-link"
                  >
                    Áo thun nam
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Điện thoại")}
                    className="navbar-header-link"
                  >
                    Điện thoại
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Laptop")}
                    className="navbar-header-link"
                  >
                    Laptop
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Phụ kiện gia dụng")}
                    className="navbar-header-link"
                  >
                    Phụ kiện gia dụng
                  </Link>
                  <Link
                    to="/ProjectSendo_KhacDuy/filter"
                    onClick={() => this.handleClick_Navbar("Điện máy")}
                    className="navbar-header-link"
                  >
                    Điện máy
                  </Link>
                </div>
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    d="M3 19h18v-2H3v2zm0-6h8v-2H3v2zm0-8v2h18V5H3zm10 5l4 4 4-4z"
                    fill="#FFF"
                  ></path>
                </svg>
                <a href="#root">TẤT CẢ DANH MỤC</a>
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
                  value={this.state.query}
                  defaultValue={this.state.query}
                  // value={this.state.query}
                />

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
              </form>
            </div>
            <div className="mainMenu-row-item3">
              <div className="mainMenu-row-item3-images">
                {this.props.historyProduct.length > 0 && (
                  <div style={{ display: "flex" }}>
                    <span>Sản phẩm vừa xem</span>
                    {this.props.historyProduct.map((ele, index) => (
                      <Link
                        to={`/ProjectSendo_KhacDuy/detail?id=${ele.id}&name=${ele.name}&adminid=${ele.admin_id}`}
                        key={index}
                      >
                        <img src={ele.img} alt={ele.name} />
                      </Link>
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
        {/* Login Modal */}
        <div className="modal-wraper">
          <div className="modal-title">
            {this.state.notRegister ? <p>Login</p> : <p>Register</p>}
            <button onClick={() => this.handleCloseModal()}>x</button>
          </div>
          <div className="modal-body">
            <div className="modal-container" id="login">
              <input type="text" placeholder="Email" id="login_Email" />
              <input
                type="password"
                placeholder="Password"
                id="login_Password"
              />
              <p id="login_Error"></p>

              <div className="modal-container-button">
                <button onClick={() => this.loginFireBase()}>Đăng nhập</button>
                <p>
                  Bạn chưa có tài khoản?
                  <button onClick={() => this.handleRegister()}>Đăng ký</button>
                </p>
              </div>
            </div>
            <div className="modal-container" id="loginSuccess">
              <p>Xin chào ....</p>
              <button onClick={() => this.handleCloseModal()}>
                Bắt đầu mùa sắm nào!
              </button>
            </div>
            <div className="modal-container" id="logout">
              <p>Bạn muốn đăng xuất?</p>
              <button onClick={() => this.logoutFireBase()}>Có</button>
              <button onClick={() => this.handleCloseModal()}>Không</button>
            </div>
            <div className="modal-container" id="register">
              <input type="text" placeholder="Email" id="register_Email" />
              <input
                type="password"
                placeholder="Password"
                id="register_Password"
              />
              <input type="text" placeholder="Name" id="register_Name" />
              <input
                type="file"
                id="register_PhotoUrl"
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  this.setState({ ...this.state, photo: e.target.files[0] })
                }
              />

              <p id="register_Error"></p>
              <div className="modal-container-button">
                <button onClick={() => this.registerFireBase()}>Đăng ký</button>
                <p>
                  Bạn đã có tài khoản ?
                  <button onClick={() => this.handleLogin()}>Đăng nhập</button>
                </p>
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
      // getDataSitemap,
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
