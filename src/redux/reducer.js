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
  GET_ARRAY_FILTER,
  GET_QUERY,
  GET_PATH_DEFAULT,
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
  query: "",
  themeEvent: [],
  arrayFilter: {
    defaultTerm: [],
    generalTerm: [],
    generalTerm_PositionTop: [],
  },
  pathDefault: [],
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
    case GET_PATH_DEFAULT: {
      let { pathDefault } = state;
      const newArray_PathDefault = [...pathDefault, action.pathDefault];

      console.log(newArray_PathDefault, "ss");
      return { ...state, pathDefault: newArray_PathDefault };
    }
    case GET_PRODUCT_FILTER: {
      return { ...state, productFilter: action.productFilter };
    }
    case GET_ARRAY_FILTER: {
      const { arrayFilter } = state;

      const newArrayFilter = { ...state.arrayFilter, ...action.arrayFilter };
      for (let i = 0; i < newArrayFilter.result.data.length; i++) {
        newArrayFilter.result.data[i].attribute_term === "DefaultTerm" &&
          arrayFilter.defaultTerm.push(newArrayFilter.result.data[i]);
      }

      for (let i = 0; i < newArrayFilter.result.data.length; i++) {
        if (
          (newArrayFilter.result.data[i].attribute_term === "GeneralTerm") &
          (newArrayFilter.result.data[i].position !== "top")
        ) {
          arrayFilter.generalTerm.push(newArrayFilter.result.data[i]);
        }
      }
      for (let i = 0; i < newArrayFilter.result.data.length; i++) {
        if (
          (newArrayFilter.result.data[i].attribute_term === "GeneralTerm") &
          (newArrayFilter.result.data[i].position === "top")
        ) {
          arrayFilter.generalTerm_PositionTop.push(
            newArrayFilter.result.data[i]
          );
        }
      }

      return {
        ...state,
        arrayFilter: action.arrayFilter,
        defaultTerm: arrayFilter.defaultTerm,
        generalTerm: arrayFilter.generalTerm,
        generalTerm_PositionTop: arrayFilter.generalTerm_PositionTop,
      };
    }
    case GET_QUERY: {
      return { ...state, query: action.query };
    }
    default:
      return state;
  }
};
export default reducer;
