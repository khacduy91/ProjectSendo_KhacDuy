import {
  FILTER,
  TEST_COUNT_NUMBER_TANG,
  TEST_COUNT_NUMBER_GIAM,
  GET_PRODUCT_FLASHSALE,
  GET_BANNER,
  GET_MENU,
  GET_SITEMAP,
  GET_THEME_EVENT,
  GET_SHOP_SEN_MALL,
  GET_PRODUCT_RECOMMEND,
  GET_PRODUCT_TOPKEYWORD,
  GET_PRODUCT_FILTER,
} from "./action";

const initialState = {
  countNumber: 0,
  productFlashSale: [],
  productRecommend: [],
  productTopKeyWord: [],
  productFilter: [],
  shopSenMall: [],
  banner: [],
  menu: [],
  sitemap: [],
  themeEvent: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER: {
      return { ...state, category: action.category };
    }
    case TEST_COUNT_NUMBER_TANG: {
      initialState.countNumber++;
      return { ...state, countNumber: initialState.countNumber };
    }
    case TEST_COUNT_NUMBER_GIAM: {
      initialState.countNumber = initialState.countNumber - 1;
      return { ...state, countNumber: initialState.countNumber };
    }
    case GET_PRODUCT_FLASHSALE: {
      return { ...state, productFlashSale: action.productFlashSale };
    }
    case GET_BANNER: {
      return { ...state, banner: action.banner };
    }
    case GET_MENU: {
      return { ...state, menu: action.menu };
    }
    case GET_SITEMAP: {
      return { ...state, sitemap: action.sitemap };
    }
    case GET_THEME_EVENT: {
      return { ...state, themeEvent: action.themeEvent };
    }
    case GET_SHOP_SEN_MALL: {
      return { ...state, shopSenMall: action.shopSenMall };
    }
    case GET_PRODUCT_RECOMMEND: {
      return { ...state, productRecommend: action.productRecommend };
    }
    case GET_PRODUCT_TOPKEYWORD: {
      return { ...state, productTopKeyWord: action.productTopKeyWord };
    }
    case GET_PRODUCT_FILTER: {
      return { ...state, productFilter: action.productFilter };
    }
    default:
      return state;
  }
};
export default reducer;
