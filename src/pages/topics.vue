<template>
  <div class="topic">
    <div v-for="item in topics" :key="item.id">
      <h1>{{item.title}}</h1>
      <p>{{item.content}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch("getTopics");
  },
  computed: {
    ...mapGetters({
      topics: "getTopics",
      count: "getCount"
    })
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.topic {
  display: flex;
  flex-direction: column;
  div {
    height: 200px;
    width: 100%;
    border: 1px solid;
  }
}
</style>