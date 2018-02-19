<template>
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th
              scope="col"
              v-for="field in fields"
              v-bind:key="field"
              class="field"
            >
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="field in fields"
              v-bind:key="field"
            >
              {{ item[field] }}
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-dark btn-sm float-right"
                @click="back"
              >Back</button>
            </td>
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

    return {
      fields,
    };
  },
  computed: {
    item() {
      return this.$store.getters.getItemById(this.$route.params.id);
    },
  },
  mounted() {
    if (!this.item) this.back();
  },
  methods: {
    back() {
      this.$router.push({ name: 'Table' });
    },
  },
};
</script>

<style>
  .field {
    cursor: pointer;
    text-transform: capitalize;
    user-select: none;
  }
  .title {
    color: #fff;
    background-color: #212529;
    border-color: #32383e;
  }
  .filter {
    margin-bottom: 10px;
    width: 250px;
  }
  .capitalize {
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
