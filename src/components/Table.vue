<template>
  <div class="row">
    <div class="col-12">
      <input
        class="filter float-right"
        type="text"
        v-model="filter"
      >
    </div>
    <div class="col-12">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th
              v-for="field in fields"
              v-bind:key="field"
              class="field"
              :class="{ acitve: orderKey === field }"
              @click="orderBy(field)"
            >
              {{ field }}
              <span class="arrow" :class="order[field] > 0 ? 'asc' : 'desc'"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items()"
            v-bind:key="item.id"
          >
            <td
              v-for="field in fields"
              v-bind:key="field"
            >
              {{ item[field] }}
            </td>
          </tr>
           <tr v-if="!filter" class="table-info">
            <td>Total:</td>
            <td></td>
            <td>{{ total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Table',
  data() {
    const fields = ['name', 'location', 'currency'];
    const order = fields.reduce((accum, curr) => ({
      ...accum, 
      [curr]: 1,
    }), {});

    return {
      filter: '',
      fields,
      order,
      orderKey: '',
    };
  },
  computed: mapGetters({
    total: 'getTotalCurrency',
  }),
  methods: {
    orderBy(key) {
      this.orderKey = key;
      this.order[key] = this.order[key] * -1;
    },
    items() {
      const { filter, orderKey } = this;
      const items = this.$store.getters.getItems(filter);
      const order = this.order[orderKey] || 1;

      if (orderKey) {
        return [...items].sort((a, b) => {
          a = a[orderKey];
          b = b[orderKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }

      return items;
    }
  },
  created() {
    this.$store.dispatch('requestItems');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .filter {
    margin-bottom: 10px;
    width: 250px;
  }

  .field {
    cursor: pointer;
    text-transform: capitalize;
    user-select: none;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.5;
  }

  .acitve .arrow {
    opacity: 1;
  }

  .arrow.asc {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
  }

  .arrow.desc{
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
  }
</style>
