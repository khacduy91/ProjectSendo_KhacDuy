import axios from "axios";

export const FILTER = "FILTER";

export const filter = (category) => ({
  type: FILTER,
});

export const TEST_COUNT_NUMBER_TANG = "TEST_COUNT_NUMBER_TANG";
export const testCountNumber_tang = (countNumber) => ({
  type: TEST_COUNT_NUMBER_TANG,
  countNumber,
});

export const TEST_COUNT_NUMBER_GIAM = "TEST_COUNT_NUMBER_GIAM";
export const testCountNumber_giam = (countNumber) => ({
  type: TEST_COUNT_NUMBER_GIAM,
  countNumber,
});

export const GET_SITEMAP = "GET_SITEMAP";
export const getSitemap = (sitemap) => ({
  type: GET_SITEMAP,
  sitemap,
});
export const GET_PRODUCT_FLASHSALE = "GET_PRODUCT_FLASHSALE";
export const getProduct_FlashSale = (productFlashSale) => ({
  type: GET_PRODUCT_FLASHSALE,
  productFlashSale,
});

export const GET_SHOP_SEN_MALL = "GET_SHOP_SEN_MALL";
export const getShop_SenMall = (shopSenMall) => ({
  type: GET_SHOP_SEN_MALL,
  shopSenMall,
});
export const GET_PRODUCT_RECOMMEND = "GET_PRODUCT_RECOMMEND";
export const getProduct_Recommend = (productRecommend) => ({
  type: GET_PRODUCT_RECOMMEND,
  productRecommend,
});

export const GET_PRODUCT_TOPKEYWORD = "GET_PRODUCT_TOPKEYWORD";
export const getProduct_TopKeyWord = (productTopKeyWord) => ({
  type: GET_PRODUCT_TOPKEYWORD,
  productTopKeyWord,
});

export const GET_PRODUCT_FILTER = "GET_PRODUCT_FILTER";
export const getProduct_Filter = (productFilter) => ({
  type: GET_PRODUCT_FILTER,
  productFilter,
});

export const GET_BANNER = "GET_BANNER";
export const getBanner = (banner) => ({
  type: GET_BANNER,
  banner,
});

export const GET_MENU = "GET_MENU";
export const getMenu = (menu) => ({
  type: GET_MENU,
  menu,
});

export const GET_THEME_EVENT = "GET_THEME_EVENT";
export const getThemeEvent = (themeEvent) => ({
  type: GET_THEME_EVENT,
  themeEvent,
});

export const getData = () => {
  return (dispatch) => {
    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://www.sendo.vn/m/wap_v2/home/basic?platform=web",
    })
      .then((res) => {
        dispatch(getBanner(res.data.result.data.data.list));
        dispatch(getMenu(res.data.result.data.menu.list));
        dispatch(getThemeEvent(res.data.result.data.theme_event));
      })

      .catch((err) => console.log(err));
  };
};

export const getDataSitemap = () => {
  return (dispatch) => {
    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://www.sendo.vn/m/wap_v2/category/sitemap",
    })
      .then((res) => {
        dispatch(getSitemap(res.data.result.data));
      })
      .catch((err) => console.log(err, "getSiteMap"));
  };
};

export const getDataProduct = () => {
  return (dispatch) => {
    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://mapi.sendo.vn/mob/home/flash-sale",
    })
      .then((res) => {
        dispatch(getProduct_FlashSale(res.data));
      })
      .catch((err) => console.log(err, "getProductFlashSale"));

    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://www.sendo.vn/m/wap_v2/mall/shop?v=2",
    })
      .then((res) => {
        dispatch(getShop_SenMall(res.data));
      })
      .catch((err) => console.log(err, "getShopSenMall"));

    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://mapi.sendo.vn/mob/home/recommend", //api thanh
      // "https://cors-anywhere.herokuapp.com/https://www.sendo.vn/m/wap_v2/home/recommend-category?",
    })
      .then((res) => {
        dispatch(getProduct_Recommend(res.data));
      })
      .catch((err) => console.log(err, "getProductRecommend"));

    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://www.sendo.vn/m/wap_v2/home/top-keyword",
    })
      .then((res) => {
        dispatch(getProduct_TopKeyWord(res.data));
      })
      .catch((err) => console.log(err, "getProduct_TopKeyWord"));
  };
};

export const getProductFilter = (
  page,
  query,
  quanity,
  is_shop_plus,
  is_promotion
) => {
  // page !== undefined ? (page = this.page) : (page = 1);
  // query !== undefined ? (query = this.query) : (query = "");
  // quanity !== undefined ? (quanity = this.quanity) : (quanity = 30);
  // is_shop_plus !== undefined
  //   ? (is_shop_plus = this.is_shop_plus)
  //   : (is_shop_plus = 0);
  // is_promotion !== undefined
  //   ? (is_promotion = this.is_promotion)
  //   : (is_promotion = 0);

  return (dispatch) => {
    let url = `https://cors-anywhere.herokuapp.com/https://www.sendo.vn/m/wap_v2/search/product?p=${page}&platform=web&q=${query}&s=${quanity}&is_shop_plus=${is_shop_plus}&is_promotion=${is_promotion}&sortType=rank`;
    console.log(url, "url");
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        dispatch(getProduct_Filter(res.data));
      })
      .catch((err) => console.log(err, "getProduct_Filter"));
  };
};
