<template>
  <div class="row">
    <div class="col-12">
      <input class="filter float-right" type="text" @keyup="changeFilter">
    </div>
    <div class="col-12">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items(filter)"
            v-bind:key="item.id"
          >
            <td>{{item.name}}</td>
            <td>{{item.location}}</td>
            <td>{{item.currency}}</td>
          </tr>
           <tr v-if="!filter" class="table-info">
            <td>Total:</td>
            <td></td>
            <td>{{ total}}</td>
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
    return {
      filter: '',
    }
  },
  computed: mapGetters({
    total: 'getTotalCurrency',
  }),
  methods: {
    changeFilter(event) {
      this.filter = event.target.value;
    },
    items(filter = '') {
      return this.$store.getters.getItems(filter);
    } 
  },
  created() {
    this.$store.dispatch('requestItems');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter {
    margin-bottom: 10px;
    width: 250px;
  }
</style>
