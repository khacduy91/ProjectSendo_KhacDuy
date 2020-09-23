import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getData,
  getBanner,
  getMenu,
  getDataSitemap,
  getThemeEvent,
  getProductFilter,
  getDataProduct,
} from "../../../redux/action";

class Header extends React.Component {
  state = {
    number: 0,
    x: new Date(),
  };
  componentDidMount() {
    this.props.getData();
    this.props.getDataSitemap();

  }

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

  render() {
    window.setTimeout(() => this.autoChange(), 7000);

    return (
      <div className="header">
        <div className="header-topBar">
          <div className="header-topBar-container">
            <div className="left_topBar">
              <p>Duy Vu CV Project</p>
            </div>
            <div className="right_topBar">
              <img
                src="https://raw.githubusercontent.com/khacduy91/ProjectSendo_KhacDuy/gh-pages/assets/images/avatarUser1.jpg"
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
              <img
                src="https://raw.githubusercontent.com/khacduy91/ProjectSendo_KhacDuy/db2a10ffeaf89a4546159370fe887f299bcf0ead/assets/images/sendoLogo.svg"
                alt="Sendo Logo"
              />
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
              <form>
                <input
                  type="text"
                  placeholder="Tìm kiếm trên Sendo"
                  className="main-row-item2-input searchBox"
                />
                <label>
                  <span>Label Name</span>
                  <span>x</span>
                </label>
                <input
                  type="submit"
                  value="Search"
                  className="main-row-item2-input searchButton"
                />
              </form>
            </div>
            <div className="mainMenu-row-item3">
              <span>Sản phẩm vừa xem</span>
              <div className="mainMenu-row-item3-images">
                <img src="assets/images/avatarUser1.jpg" alt="img1" />
                <img src="assets/images/avatarUser1.jpg" alt="img2" />
                <img src="assets/images/avatarUser1.jpg" alt="img3" />
              </div>
              <div className="mainMenu-row-item3-button showMoreButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="icon icon-medium"
                >
                  <g data-name="Layer 2">
                    <g data-name="Layer 1">
                      <path d="M17,14,12,9,7,14Z"></path>
                      <path d="M24,24H0V0H24Z" fill="none"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mainMenu-row-item4">
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
            </div>
          </div>
        </div>
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
              <a
                className="carousel-control-prev"
                href="#demo1"
                onClick={() => this.handlePrev()}
              >
                <span className="carousel-control-prev-icon"></span>
              </a>
              <a
                className="carousel-control-next"
                href="#demo1"
                onClick={() => this.handleNext()}
              >
                <span className="carousel-control-next-icon"></span>
              </a>

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
    },
    dispatch
  ),
});
export default connect(mapsStateToProps, mapDispatchToProps)(Header);
