import Vue from 'vue';
import Router from 'vue-router';
import Table from '@/components/Table';
import Item from '@/components/Item';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table,
    },
    {
      path: '/:id/edit',
      name: 'Item',
      component: Item,
    },
  ],
});
