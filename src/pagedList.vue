<template>
  <b-card no-body>
    <b-card-header>
      <b-row>
        <b-col md="8">
          <h3 class="card-label">
            {{ title }}
            <small>{{ subtitle }}</small>
          </h3>
        </b-col>
        <b-col md="2">
          <a class="text-white" @click="prevPage()" v-if="hasPrevPage()">
            <i class="fas fa-chevron-left mr-2"></i>
            {{ labelBack }}
          </a>
        </b-col>
        <b-col md="2" class="text-right">
          <a class="text-white" @click="nextPage()" v-if="hasNextPage()">
            {{ labelNext }}
            <i class="fas fa-chevron-right ml-2"></i>
          </a>
        </b-col>
      </b-row>
    </b-card-header>
    <b-card-body class="p-0">
      <b-list-group v-if="list.length > 0">
        <b-list-group-item>
          <b-row>
            <b-col :md="column.md" v-for="(column, i) in columns" :key="i">
              {{ column.label }}
            </b-col>
          </b-row>
        </b-list-group-item>
        <b-list-group-item v-for="item in list" :key="item.id">
          <b-row>
            <b-col :md="column.md" v-for="(column, i) in columns" :key="i">
              {{ item[column.prop] }}
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <div class="progress" style="position: relative;" v-if="list.length == 0">
        <div class="progress-bar bg-info progress-bar-striped indeterminate"></div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "PagedListWidget",
  props: ["title","subtitle","columns","list","action","pages","labelBack","labelNext"],
  data() {
    return {
      page: 1
    }
  },
  methods: {
    /**
     * Load List Items page by page
     */
    loadListItems() {
      this.$store.dispatch(this.action, { page: this.page });
    },
    /**
     * Load next page
     */
    nextPage() {
      if (this.hasNextPage()) {
        this.page++;
      }
      this.loadListItems();
    },
    /**
     * Check if there is a next page
     * @returns {boolean}
     */
    hasNextPage() {
      if (this.page <= this.pages - 1) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Check if there is a previous page
     * @returns {boolean}
     */
    hasPrevPage() {
      if (this.page > 1) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Load previous page
     */
    prevPage() {
      if (this.hasPrevPage()) {
        this.page--;
      }
      this.loadListItems();
    },
  }
}
</script>