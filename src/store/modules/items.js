import Api from '../../api/items';


// initial state
const state = {
  all: [],
};

// getters
const getters = {
  getItems(store) {
    return store.all;
  },
  getItemById: store => id => (
    store.all.find(item => item.id === id)
  ),
};

// actions
const actions = {
  requestItems(store) {
    Api.all((err, items) => {
      if (items) store.commit('setItems', items);
    });
  },
  updateItem(store, item) {
    store.commit('updateItem', item);
  },
};

// mutations
const mutations = {
  setItems(store, items) {
    store.all = items; // eslint-disable-line
  },
  updateItem(store, item) {
    const items = store.all;
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      store.all[index] = Object.assign(items[index], item); // eslint-disable-line
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
