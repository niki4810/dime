export const FETCH_STATUS = {
  INITIAL: 'INITIAL',
  REQUESTING: 'REQUESTING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};

export const PAGES = {
  HOME: 'HOME',
  ADD_EXPENSE : 'ADD_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
  CHART: 'CHART'
};

export const CATEGORIES = [
  {value: 'fa-utensils', label: 'Food'},
  {value: 'fa-plane', label: 'Travel'},
  {value: 'fa-film', label: 'Movies'},
  {value: 'fa-gas-pump', label: 'Fuel'},
  {value: 'fa-shopping-cart', label: 'Groceries'},
  {value: 'fa-tshirt', label: 'Shopping'},
  {value: 'fa-cubes', label: 'Miscellaneous'},
  {value: 'fa-medkit', label: 'Health'}
];
export const CATEGORIES_MAP = {
  'fa-utensils': 'Food',
  'fa-plane': 'Travel',
  'fa-film': 'Movies',
  'fa-gas-pump': 'Fuel',
  'fa-shopping-cart': 'Groceries',
  'fa-tshirt': 'Shopping',
  'fa-cubes': 'Miscellaneous',
  'fa-medkit': 'Health'
};

// export const CATEGORIES_COLORS_MAP = [
//   "#dce7c5",
//   "#aaac84",
//   "#e3a51a",
//   "#cccc5a",
//   "#7e909b",
//   "#938e9f",
//   "#75ac8b"
// ];

export const CATEGORIES_COLORS_MAP = [
  "#99b433",
  '#ffb27c', //"#ff0097",
  "#9f00a7",
  "#603cba",
  "#00aba9",
  "#2b5797",
  "#e3a21a",
  "#7e909b",
];

// export const CATEGORIES_COLORS_MAP = [
//   '#ffffe0',
//   '#ffdaa3',
//   '#ffb27c',
//   '#fb8768',
//   '#eb5f5b',
//   '#d3394a',
//   '#b3152f',
//   '#8b0000'
// ];