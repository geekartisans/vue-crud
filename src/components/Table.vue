<template>
  <div
    class="row"
  >
    <div class="col-12">
      <input
        class="filter float-right"
        type="text"
        placeholder="Filter"
        v-model="filter"
      >
    </div>
    <div class="col-12">
      <table class="table table-hover">
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
            <th class="field">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            v-bind:key="item.id"
          >
            <td
              v-for="field in fields"
              v-bind:key="field"
              @dblclick="edit($event, item.id, field)"
              :class="{ editing: item.id === editing.id && field === editing.field }"
              v-cloak
            >
              <div class="view">
                {{ item[field] }}
              </div>
              <div class="edit">
                <input
                  :type="field === 'currency' ? 'number' : 'text'"
                  :value="item[field]"
                  @input="update($event, item.id, field)"
                  @blur="edit($event)"
                >
              </div>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-dark btn-sm"
                @click="more(item.id)"
              >More</button>
            </td>
          </tr>
           <tr class="table-info">
            <td>Total:</td>
            <td></td>
            <td></td>
            <td>{{ total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Table',
  components: {},
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
      editing: {},
    };
  },
  computed: {
    items() {
      const { filter, orderKey } = this;
      const order = this.order[orderKey] || 1;
      let items = this.$store.getters.getItems;

      if (filter) {
        items = items.filter(({ name, location, currency }) => {
          const regex = new RegExp(`${filter}`, 'ig');
          return regex.test(name) || regex.test(location) || regex.test(currency);
        });
      }
      if (orderKey) {
        items = [...items].sort((first, second) => {
          const a = first[orderKey];
          const b = second[orderKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order; // eslint-disable-line
        });
      }

      return items;
    },
    total() {
      return this.items.reduce((acc, item) => {
        const currency = parseInt(item.currency, 10);
        return isNaN(currency) ? 0 : acc + currency;
      }, 0);
    },
  },
  methods: {
    orderBy(key) {
      this.orderKey = key;
      this.order[key] = this.order[key] * -1;
    },
    edit(event, id = null, field = null) {
      this.editing = { id, field };
    },
    update(e, id, field) {
      this.$store.dispatch('updateItem', {
        id,
        [field]: e.target.value,
      });
    },
    more(id) {
      this.$router.push({ name: 'Item', params: { id } });
    },
  },
  mounted() {
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
  [v-cloak] {
    display: none;
  }
  .view {
    cursor: pointer;
  }
  .edit {
    display: none;
  }
  .editing .edit {
    display: block
  }
  .editing .view {
    display: none;
  }
</style>
