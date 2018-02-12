import { all } from '../../api/items';

// initial state
const state = {
  all: [],
};

// getters
const getters = {
  getItems: store => (filter) => {
    const items = store.all;

    if (!filter) return items;

    return items.filter(({ name, location, currency }) => {
      const regex = new RegExp(`${filter}`, 'ig');
      return regex.test(name) || regex.test(location) || regex.test(currency);
    });
  },
  getTotalCurrency(store) {
    return store.all.reduce((accumulator, item) => (
      accumulator + item.currency
    ), 0);
  },
};

// actions
const actions = {
  requestItems({ commit }) {
    all((err, items) => {
      if (items) commit('setItems', items);
    });
  },
};

// mutations
const mutations = {
  setItems(store, items) {
    store.all = items; // eslint-disable-line
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
