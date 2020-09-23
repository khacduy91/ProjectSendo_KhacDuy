export const IMAGE_URL = "https://media3.scdn.vn";
export const LINK_IMG = IMAGE_URL + "/img3/2019/12_10/7ThbzQ.jpg";
export const BASE_URL = "https://mapi.sendo.vn";
export const HOME_API =
  "https://cors-anywhere.herokuapp.com/https://mapi.sendo.vn/mob/home";
export const LOGIN_API = "http://localhost:4000/login";
export const RECOMMEND =
  "https://cors-anywhere.herokuapp.com/https://mapi.sendo.vn/mob/home/recommend";

export const makeProductDetailApi = (id) => {
  return `https://cors-anywhere.herokuapp.com/${BASE_URL}/mob/product/${id}/detail/`;
};

export const makeProductsApi = (page, query) => {
  return `https://cors-anywhere.herokuapp.com/${BASE_URL}/mob/product/search?p=${page}&q=${query}`;
};

export const makeShopDetailApi = (id) => {
  return `https://cors-anywhere.herokuapp.com/${BASE_URL}/mob/shop/${id}/detail`;
};
export const makeHomeApi = () => {
  return `https://cors-anywhere.herokuapp.com/${BASE_URL}/mob/home`;
};
export const makeRecommendProducts = () => {
  return `https://cors-anywhere.herokuapp.com/${BASE_URL}/mob/home/recommend`;
};
