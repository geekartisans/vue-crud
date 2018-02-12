import Vue from 'vue';
import Vuex from 'vuex';
import items from './modules/items';

// import createLogger from '/src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    items,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
